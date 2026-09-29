import { Router } from 'express';
import * as c from '../controllers/reviewController.js';
import { protect } from '../middleware/auth.js';
const router=Router();router.get('/',protect,c.list);router.post('/',protect,c.create);router.put('/:id',protect,c.update);router.delete('/:id',protect,c.remove);export default router;
