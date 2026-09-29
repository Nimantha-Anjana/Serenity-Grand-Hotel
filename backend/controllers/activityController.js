import { Activity } from '../models/index.js';
import { crudController } from './crudController.js';
export default crudController(Activity, { order: [['displayOrder','ASC'],['id','ASC']], include: [{association:'days'}] });
