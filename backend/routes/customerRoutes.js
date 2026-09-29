import { Router } from 'express';
import { User, CustomerProfile } from '../models/index.js';
import { adminOnly } from '../middleware/auth.js';
const router=Router();
router.get('/', ...adminOnly, async(req,res,next)=>{try{const users=await User.findAll({where:{role:'customer'},attributes:{exclude:['passwordHash']},include:[{model:CustomerProfile,as:'customerProfile'}],order:[['createdAt','DESC']]});res.json(users);}catch(e){next(e);}});
router.get('/:id', ...adminOnly, async(req,res,next)=>{try{const u=await User.findOne({where:{id:req.params.id,role:'customer'},attributes:{exclude:['passwordHash']},include:[{model:CustomerProfile,as:'customerProfile'}]});if(!u)return res.status(404).json({message:'Customer not found.'});res.json(u);}catch(e){next(e);}});
router.put('/:id', ...adminOnly, async(req,res,next)=>{try{const u=await User.findOne({where:{id:req.params.id,role:'customer'}});if(!u)return res.status(404).json({message:'Customer not found.'});const allowed=['name','phone','status','isVerified','avatar'];const data={};for(const k of allowed)if(req.body[k]!==undefined)data[k]=req.body[k];await u.update(data);res.json(u);}catch(e){next(e);}});
router.delete('/:id', ...adminOnly, async(req,res,next)=>{try{const u=await User.findOne({where:{id:req.params.id,role:'customer'}});if(!u)return res.status(404).json({message:'Customer not found.'});await u.destroy();res.json({message:'Customer deleted.'});}catch(e){next(e);}});
export default router;
