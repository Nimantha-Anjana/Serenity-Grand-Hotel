import { Op } from 'sequelize';
import { User, Room, Booking, Message, Review, Payment } from '../models/index.js';
import { asyncHandler } from './crudController.js';
export const dashboard=asyncHandler(async(req,res)=>{
 const [totalRooms,availableRooms,totalCustomers,totalBookings,pendingBookings,unreadMessages,pendingReviews,revenue]=await Promise.all([
  Room.count(),Room.count({where:{status:'Available'}}),User.count({where:{role:'customer'}}),Booking.count(),Booking.count({where:{bookingStatus:'Pending'}}),Message.count({where:{isRead:false}}),Review.count({where:{status:'Pending'}}),Payment.sum('amount',{where:{paymentStatus:'Successful'}})
 ]);
 res.json({totalRooms,availableRooms,totalCustomers,totalBookings,pendingBookings,unreadMessages,pendingReviews,totalRevenue:Number(revenue||0)});
});
