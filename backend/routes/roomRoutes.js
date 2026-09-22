import { Router } from 'express';
import rooms from '../controllers/roomController.js';
import { adminOnly } from '../middleware/auth.js';

const router = Router();

router.get('/', rooms.getAll); // public
router.get('/:id', rooms.getOne); // public
router.post('/', adminOnly, rooms.create);
router.put('/:id', adminOnly, rooms.update);
router.delete('/:id', adminOnly, rooms.remove);

export default router;
