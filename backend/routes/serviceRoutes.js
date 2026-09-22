import { Router } from 'express';
import services from '../controllers/serviceController.js';
import { adminOnly } from '../middleware/auth.js';

const router = Router();

router.get('/', services.getAll); // public
router.get('/:id', services.getOne); // public
router.post('/', adminOnly, services.create);
router.put('/:id', adminOnly, services.update);
router.delete('/:id', adminOnly, services.remove);

export default router;
