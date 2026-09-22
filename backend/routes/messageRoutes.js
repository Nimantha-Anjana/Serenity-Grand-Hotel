import { Router } from 'express';
import messages from '../controllers/messageController.js';
import { adminOnly } from '../middleware/auth.js';

const router = Router();

router.post('/', messages.create); // public: website contact form
router.get('/', adminOnly, messages.getAll);
router.get('/:id', adminOnly, messages.getOne);
router.put('/:id', adminOnly, messages.update); // e.g. mark as read
router.delete('/:id', adminOnly, messages.remove);

export default router;
