import Service from '../models/Service.js';
import { crudController } from './crudController.js';

export default crudController(Service, { order: [['id', 'ASC']] });
