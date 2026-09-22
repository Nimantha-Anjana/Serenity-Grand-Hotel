import { Router } from 'express';
import customers from '../controllers/customerController.js';
import { adminOnly } from '../middleware/auth.js';

const router = Router();

// Customer data is private: every route is admin-only
router.use(adminOnly);

router.get('/', customers.getAll);
router.get('/:id', customers.getOne);
router.post('/', customers.create);
router.put('/:id', customers.update);
router.delete('/:id', customers.remove);

export default router;
