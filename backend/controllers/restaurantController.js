import { Restaurant } from '../models/index.js';
import { crudController } from './crudController.js';
export default crudController(Restaurant, { order: [['id','ASC']], include: [] });
