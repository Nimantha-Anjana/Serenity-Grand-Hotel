import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { User, CustomerProfile, AdminProfile, EmailVerification, PasswordResetToken, NotificationSetting } from '../models/index.js';
import { signToken } from '../middleware/authMiddleware.js';
import { otp, randomToken } from '../utils/reference.js';
import { sendOtpEmail, sendResetEmail } from '../utils/sendEmail.js';

const safeUser = user => { const x=user.toJSON(); delete x.passwordHash; return x; };
const profileFields = profile => profile ? profile.toJSON() : {};
const publicUser = (user, profile) => ({ ...safeUser(user), ...profileFields(profile) });

export async function register(req,res,next){
  try {
    const {name,email,phone,password,nicNumber,address,city,country,dateOfBirth,gender}=req.body;
    if(!name||!email||!password) return res.status(400).json({message:'Name, email and password are required.'});
    if(password.length<6) return res.status(400).json({message:'Password must be at least 6 characters.'});
    const normalized=email.trim().toLowerCase();
    if(await User.findOne({where:{email:normalized}})) return res.status(409).json({message:'Email is already registered.'});
    const user=await User.create({name,email:normalized,phone,passwordHash:await bcrypt.hash(password,12),role:'customer',avatar:req.file?`/uploads/${req.file.filename}`:null,isVerified:false});
    await CustomerProfile.create({userId:user.id,nicNumber,address,city,country,dateOfBirth,gender});
    await NotificationSetting.create({userId:user.id});
    const code=otp();
    await EmailVerification.create({userId:user.id,otpCode:code,expiresAt:new Date(Date.now()+10*60*1000)});
    await sendOtpEmail(normalized,code).catch(e=>console.error('OTP email:',e.message));
    res.status(201).json({message:'Registration successful. Verify your email.',userId:user.id,email:normalized,devOtp:process.env.NODE_ENV==='production'?undefined:code});
  } catch(e){next(e);}
}

export async function verifyOtp(req,res,next){try{
 const {email,otp:code}=req.body; const user=await User.findOne({where:{email:email?.trim().toLowerCase()}}); if(!user)return res.status(404).json({message:'Account not found.'});
 const v=await EmailVerification.findOne({where:{userId:user.id,otpCode:code,verifiedAt:null},order:[['createdAt','DESC']]});
 if(!v)return res.status(400).json({message:'Incorrect OTP code.'}); if(new Date()>new Date(v.expiresAt))return res.status(400).json({message:'OTP code has expired.'});
 await v.update({verifiedAt:new Date()}); await user.update({isVerified:true});
 const profile = await CustomerProfile.findOne({ where: { userId: user.id } });
 res.json({message:'Email verified successfully.',token:signToken(user),user:publicUser(user, profile),customer:publicUser(user, profile)});
}catch(e){next(e);}}

export async function resendOtp(req,res,next){try{
 const email=req.body.email?.trim().toLowerCase(); const user=await User.findOne({where:{email}}); if(!user)return res.status(404).json({message:'Account not found.'}); if(user.isVerified)return res.status(400).json({message:'Email is already verified.'});
 const code=otp(); await EmailVerification.create({userId:user.id,otpCode:code,expiresAt:new Date(Date.now()+10*60*1000)}); await sendOtpEmail(email,code).catch(e=>console.error(e.message));
 res.json({message:'A new OTP has been sent.',devOtp:process.env.NODE_ENV==='production'?undefined:code});
}catch(e){next(e);}}

export async function login(req,res,next){try{
 const {email,password,role}=req.body; if(!email||!password)return res.status(400).json({message:'Email and password are required.'});
 const user=await User.findOne({where:{email:email.trim().toLowerCase()}}); if(!user)return res.status(401).json({message:'Invalid email or password.'});
 if(role && user.role!==role)return res.status(403).json({message:`This account is not a ${role} account.`});
 if(!user.isVerified)return res.status(403).json({message:'Please verify your email before logging in.'});
 if(user.status!=='active')return res.status(403).json({message:'This account is not active.'});
 if(!(await bcrypt.compare(password,user.passwordHash)))return res.status(401).json({message:'Invalid email or password.'});
 await user.update({lastLoginAt:new Date()});
 res.json({message:'Login successful.',token:signToken(user),user:safeUser(user)});
}catch(e){next(e);}}

export async function forgotPassword(req,res,next){try{
 const email=req.body.email?.trim().toLowerCase(); const user=await User.findOne({where:{email}});
 if(user){const token=randomToken(); await PasswordResetToken.create({userId:user.id,token,expiresAt:new Date(Date.now()+60*60*1000)}); const link=`${process.env.CLIENT_ORIGIN||'http://localhost:5173'}/reset-password?token=${token}&email=${encodeURIComponent(email)}`; await sendResetEmail(email,link).catch(e=>console.error(e.message));}
 res.json({message:'If that email is registered, a reset link has been sent.'});
}catch(e){next(e);}}

export async function resetPassword(req,res,next){try{
 const {email,token,newPassword}=req.body; if(!email||!token||!newPassword)return res.status(400).json({message:'Email, token and new password are required.'});
 const user=await User.findOne({where:{email:email.trim().toLowerCase()}}); const row=user&&await PasswordResetToken.findOne({where:{userId:user.id,token,usedAt:null},order:[['createdAt','DESC']]});
 if(!row||new Date()>new Date(row.expiresAt))return res.status(400).json({message:'Invalid or expired reset token.'});
 await user.update({passwordHash:await bcrypt.hash(newPassword,12)}); await row.update({usedAt:new Date()}); res.json({message:'Password reset successfully.'});
}catch(e){next(e);}}

export async function me(req,res){
 const include=req.user.role==='admin'?[{model:AdminProfile,as:'adminProfile'}]:[{model:CustomerProfile,as:'customerProfile'}];
 const user=await User.findByPk(req.user.id,{include});
 const profile = req.user.role === 'admin' ? user.adminProfile : user.customerProfile;
 res.json(publicUser(user, profile));
}

export async function updateProfile(req,res,next){try{
 const user=await User.findByPk(req.user.id); const {name,phone}=req.body; if(name!==undefined)user.name=name;if(phone!==undefined)user.phone=phone;if(req.file)user.avatar=`/uploads/${req.file.filename}`; await user.save();
 const Profile=req.user.role==='admin'?AdminProfile:CustomerProfile; let profile=await Profile.findOne({where:{userId:user.id}}); if(!profile)profile=await Profile.create({userId:user.id});
 const allowed=req.user.role==='admin'?['dateOfBirth','gender','city','country','address']:['nicNumber','address','city','country','dateOfBirth','gender']; const data={}; for(const k of allowed)if(req.body[k]!==undefined)data[k]=req.body[k]; await profile.update(data);
 res.json({message:'Profile updated.',user:publicUser(user, profile),customer:publicUser(user, profile),profile});
}catch(e){next(e);}}

export async function changePassword(req,res,next){try{const {currentPassword,newPassword}=req.body;if(!currentPassword||!newPassword)return res.status(400).json({message:'Current and new password are required.'});const user=await User.findByPk(req.user.id);if(!(await bcrypt.compare(currentPassword,user.passwordHash)))return res.status(400).json({message:'Current password is incorrect.'});await user.update({passwordHash:await bcrypt.hash(newPassword,12)});res.json({message:'Password changed successfully.'});}catch(e){next(e);}}

export async function adminBootstrap(req,res,next){try{
 const {name,email,password}=req.body; if(!name||!email||!password)return res.status(400).json({message:'Name, email and password are required.'});
 if(await User.findOne({where:{role:'admin'}}))return res.status(409).json({message:'An admin account already exists.'});
 const user=await User.create({name,email:email.toLowerCase(),passwordHash:await bcrypt.hash(password,12),role:'admin',isVerified:true,status:'active'}); await AdminProfile.create({userId:user.id}); await NotificationSetting.create({userId:user.id}); res.status(201).json({message:'Admin created.',user:safeUser(user)});
}catch(e){next(e);}}
