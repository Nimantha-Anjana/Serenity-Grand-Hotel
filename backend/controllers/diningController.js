import Restaurant from '../models/Restaurant.js';
import MenuItem from '../models/MenuItem.js';
import { crudController } from './crudController.js';

export const restaurants = crudController(Restaurant, { order: [['id', 'ASC']] });
export const menuItems = crudController(MenuItem, {
  order: [['category', 'ASC'], ['name', 'ASC']],
});
