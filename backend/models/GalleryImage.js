import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const GalleryImage = sequelize.define('GalleryImage', {
 id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
 categoryId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, field: 'category_id' },
 title: { type: DataTypes.STRING(150) },
 description: { type: DataTypes.TEXT },
 imageUrl: { type: DataTypes.STRING(1000), allowNull: false, field: 'image_url' },
 status: { type: DataTypes.ENUM('Published','Draft'), allowNull: false, defaultValue: 'Published' },
 displayOrder: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0, field: 'display_order' },
}, { tableName: 'gallery_images', timestamps: true, underscored: true });

export default GalleryImage;
