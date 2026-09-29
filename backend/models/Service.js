import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Service = sequelize.define('Service', {
 id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
 name: { type: DataTypes.STRING(150), allowNull: false },
 category: { type: DataTypes.STRING(100) },
 shortDescription: { type: DataTypes.STRING(300), field: 'short_description' },
 fullDescription: { type: DataTypes.TEXT, field: 'full_description' },
 price: { type: DataTypes.STRING(100) },
 availability: { type: DataTypes.STRING(100) },
 openingTime: { type: DataTypes.TIME, field: 'opening_time' },
 closingTime: { type: DataTypes.TIME, field: 'closing_time' },
 icon: { type: DataTypes.STRING(100) },
 image: { type: DataTypes.STRING(1000) },
 status: { type: DataTypes.ENUM('Active','Inactive'), allowNull: false, defaultValue: 'Active' },
 isFeatured: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false, field: 'is_featured' },
}, { tableName: 'services', timestamps: true, underscored: true });

export default Service;
