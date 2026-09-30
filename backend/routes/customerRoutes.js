import { Router } from 'express';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { NotificationSetting } from '../models/index.js';
import { User, CustomerProfile } from '../models/index.js';
import { adminOnly } from '../middleware/auth.js';
const router=Router();
router.get('/', ...adminOnly, async(req,res,next)=>{try{const users=await User.findAll({where:{role:'customer'},attributes:{exclude:['passwordHash']},include:[{model:CustomerProfile,as:'customerProfile'}],order:[['createdAt','DESC']]});res.json(users);}catch(e){next(e);}});
router.post('/', ...adminOnly, async(req,res,next)=>{try{
  const {name,email,phone,address}=req.body||{};
  if(!name||!email)return res.status(400).json({message:'Name and email are required.'});
  const normalized=String(email).trim().toLowerCase();
  if(await User.findOne({where:{email:normalized}}))return res.status(409).json({message:'Email is already registered.'});
  // Admin-created guests get a random password; they can use "Forgot password" to set their own.
  const u=await User.create({name:String(name).trim(),email:normalized,phone:phone||null,passwordHash:await bcrypt.hash(`SGH-${crypto.randomUUID()}`,10),role:'customer',isVerified:true,status:'active'});
  await CustomerProfile.create({userId:u.id,address:address||null});
  await NotificationSetting.create({userId:u.id});
  res.status(201).json(await User.findByPk(u.id,{attributes:{exclude:['passwordHash']},include:[{model:CustomerProfile,as:'customerProfile'}]}));
}catch(e){next(e);}});
router.get('/:id', ...adminOnly, async(req,res,next)=>{try{const u=await User.findOne({where:{id:req.params.id,role:'customer'},attributes:{exclude:['passwordHash']},include:[{model:CustomerProfile,as:'customerProfile'}]});if(!u)return res.status(404).json({message:'Customer not found.'});res.json(u);}catch(e){next(e);}});
router.put('/:id', ...adminOnly, async(req,res,next)=>{try{const u=await User.findOne({where:{id:req.params.id,role:'customer'}});if(!u)return res.status(404).json({message:'Customer not found.'});const allowed=['name','phone','status','isVerified','avatar'];const data={};for(const k of allowed)if(req.body[k]!==undefined)data[k]=req.body[k];await u.update(data);if(req.body.address!==undefined){const [profile]=await CustomerProfile.findOrCreate({where:{userId:u.id},defaults:{userId:u.id}});await profile.update({address:req.body.address||null});}res.json(await User.findByPk(u.id,{attributes:{exclude:['passwordHash']},include:[{model:CustomerProfile,as:'customerProfile'}]}));}catch(e){next(e);}});
router.delete('/:id', ...adminOnly, async(req,res,next)=>{try{const u=await User.findOne({where:{id:req.params.id,role:'customer'}});if(!u)return res.status(404).json({message:'Customer not found.'});await u.destroy();res.json({message:'Customer deleted.'});}catch(e){next(e);}});
export default router;
