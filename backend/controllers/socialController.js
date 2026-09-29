import { SocialLink } from '../models/index.js';
import { crudController } from './crudController.js';
export default crudController(SocialLink, { order: [['displayOrder','ASC']], include: [] });
