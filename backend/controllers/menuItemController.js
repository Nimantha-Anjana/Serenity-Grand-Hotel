import { MenuItem } from '../models/index.js';
import { crudController } from './crudController.js';
export default crudController(MenuItem, { order: [['id','ASC']], include: [{association:'restaurant'},{association:'category'}] });
