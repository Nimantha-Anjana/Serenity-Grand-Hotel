import { GalleryImage } from '../models/index.js';
import { crudController } from './crudController.js';
export default crudController(GalleryImage, { order: [['displayOrder','ASC'],['id','DESC']], include: [{association:'category'}] });
