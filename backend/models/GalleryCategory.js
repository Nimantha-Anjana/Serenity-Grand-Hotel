import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const GalleryCategory = sequelize.define('GalleryCategory', {
 id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
 name: { type: DataTypes.STRING(100), allowNull: false, unique: true },
 status: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
}, { tableName: 'gallery_categories', timestamps: true, underscored: true });

export default GalleryCategory;
