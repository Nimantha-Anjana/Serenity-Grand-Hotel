import { Amenity } from '../models/index.js';
import { crudController } from './crudController.js';
export default crudController(Amenity, { order: [['name','ASC']], include: [] });
