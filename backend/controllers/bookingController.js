import { Op } from 'sequelize';
import { sequelize } from '../config/db.js';
import { Booking, BookingGuest, Payment, Room, User, BookingSetting } from '../models/index.js';
import { asyncHandler } from './crudController.js';
import { bookingReference } from '../utils/reference.js';
import { audit } from '../utils/audit.js';

const include=[{model:Room,as:'room'},{model:User,as:'customer',attributes:{exclude:['passwordHash']}},{model:BookingGuest,as:'guests'},{model:Payment,as:'payments'}];
const nightsBetween=(a,b)=>Math.ceil((new Date(`${b}T00:00:00Z`)-new Date(`${a}T00:00:00Z`))/86400000);
async function uniqueReference(){let r;do{r=bookingReference();}while(await Booking.findOne({where:{bookingReference:r}}));return r;}

export const create = asyncHandler(async(req,res)=>{
 const body=req.body||{}; const customerId=req.user?.id || body.customerId;
 if(!customerId)return res.status(401).json({message:'Login is required to create a booking.'});
 const {roomId,checkIn,checkOut,adults=1,children=0,specialRequests,guests=[]}=body;
 if(!roomId||!checkIn||!checkOut)return res.status(400).json({message:'Room, check-in and check-out are required.'});
 const nights=nightsBetween(checkIn,checkOut); if(nights<1)return res.status(400).json({message:'Check-out must be after check-in.'});
 const settings=await BookingSetting.findByPk(1); const min=settings?.minimumStay||1,max=settings?.maximumStay||30;if(nights<min||nights>max)return res.status(400).json({message:`Stay must be between ${min} and ${max} nights.`});
 const room=await Room.findByPk(roomId); if(!room)return res.status(404).json({message:'Room not found.'}); if(room.status==='Maintenance')return res.status(409).json({message:'Room is under maintenance.'});
 const totalGuests=Number(adults)+Number(children); if(totalGuests>room.maxGuests)return res.status(400).json({message:`This room allows a maximum of ${room.maxGuests} guests.`});
 const conflict=await Booking.findOne({where:{roomId,bookingStatus:{[Op.not]:'Cancelled'},[Op.and]:[{checkIn:{[Op.lt]:checkOut}},{checkOut:{[Op.gt]:checkIn}}]}}); if(conflict)return res.status(409).json({message:'Room is not available for the selected dates.'});
 const amount=Number(room.pricePerNight)*nights;
 const transaction=await sequelize.transaction(); try{
  const booking=await Booking.create({bookingReference:await uniqueReference(),customerId,roomId,checkIn,checkOut,adults:Number(adults),children:Number(children),specialRequests,roomPrice:room.pricePerNight,totalAmount:amount,bookingStatus:settings?.confirmationPolicy==='Automatic'?'Confirmed':'Pending',paymentStatus:'Pending'},{transaction});
  if(Array.isArray(guests)) for(const g of guests) await BookingGuest.create({bookingId:booking.id,fullName:g.fullName,email:g.email,phone:g.phone,guestType:g.guestType||'adult'},{transaction});
  await transaction.commit(); await audit(req,'CREATE','booking',`Created booking ${booking.bookingReference}`); res.status(201).json(await Booking.findByPk(booking.id,{include}));
 }catch(e){await transaction.rollback();throw e;}
});
export const list=asyncHandler(async(req,res)=>{const where={};if(req.user.role==='customer')where.customerId=req.user.id;else if(req.query.customerId)where.customerId=req.query.customerId;if(req.query.status)where.bookingStatus=req.query.status;res.json(await Booking.findAll({where,include,order:[['createdAt','DESC']]}));});
export const getOne=asyncHandler(async(req,res)=>{const b=await Booking.findByPk(req.params.id,{include});if(!b)return res.status(404).json({message:'Booking not found.'});if(req.user.role==='customer'&&b.customerId!==req.user.id)return res.status(403).json({message:'Access denied.'});res.json(b);});
export const update=asyncHandler(async(req,res)=>{const b=await Booking.findByPk(req.params.id);if(!b)return res.status(404).json({message:'Booking not found.'});if(req.user.role==='customer'&&b.customerId!==req.user.id)return res.status(403).json({message:'Access denied.'});const allowed=req.user.role==='admin'?['paymentStatus','bookingStatus','specialRequests']:['specialRequests'];const data={};for(const k of allowed)if(req.body[k]!==undefined)data[k]=req.body[k];await b.update(data);await audit(req,'UPDATE','booking',`Updated booking ${b.bookingReference}`);res.json(await Booking.findByPk(b.id,{include}));});
export const remove=asyncHandler(async(req,res)=>{if(req.user.role!=='admin')return res.status(403).json({message:'Admin only.'});const b=await Booking.findByPk(req.params.id);if(!b)return res.status(404).json({message:'Booking not found.'});await b.destroy();res.json({message:'Booking deleted.'});});
export const availability=asyncHandler(async(req,res)=>{const {roomId,checkIn,checkOut}=req.query;if(!roomId||!checkIn||!checkOut)return res.status(400).json({message:'roomId, checkIn and checkOut are required.'});const conflict=await Booking.findOne({where:{roomId,bookingStatus:{[Op.not]:'Cancelled'},[Op.and]:[{checkIn:{[Op.lt]:checkOut}},{checkOut:{[Op.gt]:checkIn}}]}});res.json({available:!conflict});});
export const payments=asyncHandler(async(req,res)=>{const b=await Booking.findByPk(req.params.id);if(!b)return res.status(404).json({message:'Booking not found.'});if(req.user.role==='customer'&&b.customerId!==req.user.id)return res.status(403).json({message:'Access denied.'});res.json(await Payment.findAll({where:{bookingId:b.id},order:[['createdAt','DESC']]}));});
export const addPayment=asyncHandler(async(req,res)=>{if(req.user.role!=='admin')return res.status(403).json({message:'Admin only.'});const b=await Booking.findByPk(req.params.id);if(!b)return res.status(404).json({message:'Booking not found.'});const p=await Payment.create({bookingId:b.id,transactionReference:req.body.transactionReference||`PAY-${Date.now()}`,amount:req.body.amount,paymentMethod:req.body.paymentMethod||'Manual',paymentStatus:req.body.paymentStatus||'Successful',paidAt:req.body.paidAt||new Date()});if(p.paymentStatus==='Successful'){const total=Number(b.totalAmount), paid=(await Payment.sum('amount',{where:{bookingId:b.id,paymentStatus:'Successful'}}))||0;await b.update({paymentStatus:paid>=total?'Paid in Full':'Deposit Paid'});}res.status(201).json(p);});
