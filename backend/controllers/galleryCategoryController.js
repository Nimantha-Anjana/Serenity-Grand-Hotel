import { GalleryCategory } from '../models/index.js';
import { crudController } from './crudController.js';
export default crudController(GalleryCategory, { order: [['name','ASC']], include: [] });
