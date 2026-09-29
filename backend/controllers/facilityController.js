import { Facility } from '../models/index.js';
import { crudController } from './crudController.js';
export default crudController(Facility, { order: [['id','ASC']], include: [] });
