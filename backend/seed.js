import 'dotenv/config';
import bcrypt from 'bcryptjs';
import connectDB, { sequelize } from './config/db.js';
import { User, AdminProfile, NotificationSetting, HotelSetting, WebsiteSetting, BookingSetting, SystemSetting, Room, Amenity, Service, Facility, Activity, Restaurant, MenuCategory, GalleryCategory, SocialLink } from './models/index.js';

await connectDB();
try {
 const adminEmail=process.env.SEED_ADMIN_EMAIL||'admin@serenitygrand.com'; const adminPassword=process.env.SEED_ADMIN_PASSWORD||'admin123';
 let admin=await User.findOne({where:{email:adminEmail}}); if(!admin){admin=await User.create({name:'Serenity Administrator',email:adminEmail,passwordHash:await bcrypt.hash(adminPassword,12),role:'admin',isVerified:true,status:'active'});await AdminProfile.create({userId:admin.id});await NotificationSetting.create({userId:admin.id});console.log(`Admin created: ${adminEmail}`);}else console.log('Admin already exists.');
 if(await HotelSetting.count()===0)await HotelSetting.create({id:1,hotelName:'Serenity Grand Hotel',hotelEmail:'info@serenitygrand.com',country:'Sri Lanka'});
 if(await WebsiteSetting.count()===0)await WebsiteSetting.create({id:1,websiteName:'Serenity Grand Hotel'});
 if(await BookingSetting.count()===0)await BookingSetting.create({id:1});
 if(await SystemSetting.count()===0)await SystemSetting.create({id:1});
 if(await Amenity.count()===0)await Amenity.bulkCreate([{name:'Free Wi-Fi',icon:'bi-wifi'},{name:'Air Conditioning',icon:'bi-snow'},{name:'Mini Bar',icon:'bi-cup-straw'},{name:'Breakfast',icon:'bi-egg-fried'}]);
 if(await Room.count()===0)await Room.bulkCreate([{roomNumber:'101',roomName:'Deluxe Ocean View',roomType:'Deluxe Room',pricePerNight:320,maxGuests:2},{roomNumber:'102',roomName:'Deluxe Garden View',roomType:'Deluxe Room',pricePerNight:270,maxGuests:2},{roomNumber:'201',roomName:'Executive Room',roomType:'Executive Room',pricePerNight:380,maxGuests:2},{roomNumber:'202',roomName:'Executive Suite',roomType:'Suite',pricePerNight:520,maxGuests:3},{roomNumber:'301',roomName:'Family Suite',roomType:'Family Room',pricePerNight:610,maxGuests:4},{roomNumber:'401',roomName:'Presidential Suite',roomType:'Presidential Suite',pricePerNight:1100,maxGuests:4}]);
 if(await Service.count()===0)await Service.bulkCreate([{name:'Airport Transfer',category:'Transportation',shortDescription:'Comfortable private transfer.',price:'From LKR 8,000',status:'Active',isFeatured:true},{name:'Spa Treatment',category:'Wellness',shortDescription:'Relaxing spa experience.',price:'From LKR 7,500',status:'Active',isFeatured:true}]);
 if(await Facility.count()===0)await Facility.bulkCreate([{name:'Swimming Pool',description:'Outdoor swimming pool.',status:'Active'},{name:'Fitness Centre',description:'Modern fitness centre.',status:'Active'}]);
 if(await Activity.count()===0)await Activity.bulkCreate([{name:'City Tour',category:'Tours',shortDescription:'Explore local attractions.',price:0,priceType:'Complimentary',status:'Active',isFeatured:true},{name:'Sunset Experience',category:'Experiences',shortDescription:'Enjoy a guided sunset experience.',price:2500,priceType:'Paid',status:'Active'}]);
 if(await Restaurant.count()===0)await Restaurant.bulkCreate([{name:'Serenity Restaurant',cuisine:'International',openingTime:'07:00:00',closingTime:'22:00:00',location:'Ground Floor',status:'Open'}]);
 if(await MenuCategory.count()===0)await MenuCategory.bulkCreate([{name:'Breakfast',description:'Breakfast selections.'},{name:'Main Course',description:'Main course selections.'},{name:'Desserts',description:'Desserts.'}]);
 if(await GalleryCategory.count()===0)await GalleryCategory.bulkCreate([{name:'Hotel'},{name:'Rooms'},{name:'Dining'},{name:'Facilities'},{name:'Events'}]);
 if(await SocialLink.count()===0)await SocialLink.bulkCreate([{platform:'Facebook',url:'https://facebook.com/',displayOrder:1},{platform:'Instagram',url:'https://instagram.com/',displayOrder:2}]);
 console.log('Seed complete.');
} finally { await sequelize.close(); }
