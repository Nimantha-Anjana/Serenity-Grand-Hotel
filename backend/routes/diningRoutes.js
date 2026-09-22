import { Router } from 'express';
import { restaurants, menuItems } from '../controllers/diningController.js';
import { adminOnly } from '../middleware/auth.js';

const router = Router();

// Restaurants: /api/dining/restaurants
router.get('/restaurants', restaurants.getAll); // public
router.get('/restaurants/:id', restaurants.getOne); // public
router.post('/restaurants', adminOnly, restaurants.create);
router.put('/restaurants/:id', adminOnly, restaurants.update);
router.delete('/restaurants/:id', adminOnly, restaurants.remove);

// Menu items: /api/dining/menu
router.get('/menu', menuItems.getAll); // public
router.get('/menu/:id', menuItems.getOne); // public
router.post('/menu', adminOnly, menuItems.create);
router.put('/menu/:id', adminOnly, menuItems.update);
router.delete('/menu/:id', adminOnly, menuItems.remove);

export default router;
