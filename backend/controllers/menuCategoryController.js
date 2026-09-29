import { MenuCategory } from '../models/index.js';
import { crudController } from './crudController.js';
export default crudController(MenuCategory, { order: [['name','ASC']], include: [] });
