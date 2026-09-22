import { Router } from 'express';
import bookings from '../controllers/bookingController.js';
import { adminOnly } from '../middleware/auth.js';

const router = Router();

router.post('/', bookings.create); // public: website booking form
router.get('/', adminOnly, bookings.getAll);
router.get('/:id', adminOnly, bookings.getOne);
router.put('/:id', adminOnly, bookings.update); // e.g. change status
router.delete('/:id', adminOnly, bookings.remove);

export default router;
