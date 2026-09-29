import { CustomerProfile, AdminProfile } from '../models/index.js';
import { asyncHandler, pickFields } from './crudController.js';
export const get=asyncHandler(async(req,res)=>{const Model=req.user.role==='admin'?AdminProfile:CustomerProfile;res.json(await Model.findOne({where:{userId:req.user.id}}));});
export const update=asyncHandler(async(req,res)=>{const Model=req.user.role==='admin'?AdminProfile:CustomerProfile;let row=await Model.findOne({where:{userId:req.user.id}});if(!row)row=await Model.create({userId:req.user.id});const data=pickFields(Model,req.body);delete data.userId;await row.update(data);res.json(row);});
