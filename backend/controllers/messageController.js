import Message from '../models/Message.js';
import { crudController, asyncHandler } from './crudController.js';

const crud = crudController(Message);

// Public: the website Contact form. Only these fields are accepted, and isRead can't be set by the visitor.
const create = asyncHandler(async (req, res) => {
  const { name, email, phone, subject, message } = req.body || {};
  const item = await Message.create({ name, email, phone, subject, message });
  res.status(201).json({ message: 'Message received', id: item.id });
});

export default { ...crud, create };
