import { Conversation, ConversationParticipant, Message, MessageAttachment, User } from '../models/index.js';
import { asyncHandler } from './crudController.js';
import { audit } from '../utils/audit.js';

export const conversations=asyncHandler(async(req,res)=>{
 const rows=await Conversation.findAll({include:[{model:ConversationParticipant,as:'participants',include:[{model:User,as:'user',attributes:['id','name','email','role','avatar']}]},{model:Message,as:'messages',limit:1,order:[['sentAt','DESC']]}],order:[['updatedAt','DESC']]});
 const filtered=req.user.role==='admin'?rows:rows.filter(c=>c.participants.some(p=>p.userId===req.user.id)); res.json(filtered);
});
export const createConversation=asyncHandler(async(req,res)=>{
 const {participantId,subject,bookingId,firstMessage}=req.body; if(req.user.role==='customer'&&!participantId)return res.status(400).json({message:'participantId is required.'});
 const otherId=participantId||req.body.customerId; if(!otherId)return res.status(400).json({message:'Recipient is required.'});
 const other=await User.findByPk(otherId);if(!other)return res.status(404).json({message:'Recipient not found.'});
 const c=await Conversation.create({subject,bookingId}); await ConversationParticipant.bulkCreate([{conversationId:c.id,userId:req.user.id},{conversationId:c.id,userId:other.id}]);
 if(firstMessage){const m=await Message.create({conversationId:c.id,senderId:req.user.id,messageText:firstMessage});if(Array.isArray(req.body.attachments))await MessageAttachment.bulkCreate(req.body.attachments.map(a=>({messageId:m.id,fileName:a.fileName,fileUrl:a.fileUrl,fileType:a.fileType,fileSize:a.fileSize})));}
 await audit(req,'CREATE','message',`Created conversation ${c.id}`); res.status(201).json(await Conversation.findByPk(c.id,{include:[{model:ConversationParticipant,as:'participants',include:[{model:User,as:'user',attributes:{exclude:['passwordHash']}}]},{model:Message,as:'messages'}]}));
});
export const getMessages=asyncHandler(async(req,res)=>{const c=await Conversation.findByPk(req.params.id,{include:[{model:ConversationParticipant,as:'participants'}]});if(!c)return res.status(404).json({message:'Conversation not found.'});if(req.user.role!=='admin'&&!c.participants.some(p=>p.userId===req.user.id))return res.status(403).json({message:'Access denied.'});res.json(await Message.findAll({where:{conversationId:c.id},include:[{model:User,as:'sender',attributes:['id','name','email','role','avatar']},{model:MessageAttachment,as:'attachments'}],order:[['sentAt','ASC']]}));});
export const sendMessage=asyncHandler(async(req,res)=>{const c=await Conversation.findByPk(req.params.id,{include:[{model:ConversationParticipant,as:'participants'}]});if(!c)return res.status(404).json({message:'Conversation not found.'});if(req.user.role!=='admin'&&!c.participants.some(p=>p.userId===req.user.id))return res.status(403).json({message:'Access denied.'});if(!req.body.messageText)return res.status(400).json({message:'Message text is required.'});const m=await Message.create({conversationId:c.id,senderId:req.user.id,messageText:req.body.messageText});await c.update({updatedAt:new Date()});res.status(201).json(await Message.findByPk(m.id,{include:[{model:User,as:'sender',attributes:['id','name','email','role','avatar']}] }));});
export const markRead=asyncHandler(async(req,res)=>{const [count]=await Message.update({isRead:true},{where:{conversationId:req.params.id}});res.json({updated:count});});
