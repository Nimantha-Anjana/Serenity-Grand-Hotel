import { Service } from '../models/index.js';
import { crudController } from './crudController.js';
export default crudController(Service, { order: [['id','ASC']], include: [] });
