import { Router } from 'express';
import gallery from '../controllers/galleryController.js';
import { adminOnly } from '../middleware/auth.js';

const router = Router();

router.get('/', gallery.getAll); // public
router.get('/:id', gallery.getOne); // public
router.post('/', adminOnly, gallery.create);
router.put('/:id', adminOnly, gallery.update);
router.delete('/:id', adminOnly, gallery.remove);

export default router;
