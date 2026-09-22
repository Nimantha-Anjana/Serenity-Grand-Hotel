import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const GalleryImage = sequelize.define('GalleryImage', {
  title: { type: DataTypes.STRING(150), allowNull: false },
  category: { type: DataTypes.STRING(100), allowNull: false }, // Hotel, Rooms, Dining, Facilities, Events
  status: { type: DataTypes.ENUM('Published', 'Draft'), defaultValue: 'Published' },
  description: { type: DataTypes.TEXT },
  url: { type: DataTypes.STRING(1000), allowNull: false },
  displayOrder: { type: DataTypes.INTEGER, defaultValue: 0 },
});

export default GalleryImage;
