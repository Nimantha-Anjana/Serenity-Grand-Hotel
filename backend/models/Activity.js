import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Activity = sequelize.define('Activity', {
 id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
 name: { type: DataTypes.STRING(150), allowNull: false },
 category: { type: DataTypes.STRING(100) },
 shortDescription: { type: DataTypes.STRING(300), field: 'short_description' },
 fullDescription: { type: DataTypes.TEXT, field: 'full_description' },
 duration: { type: DataTypes.STRING(100) },
 location: { type: DataTypes.STRING(200) },
 price: { type: DataTypes.DECIMAL(10,2), allowNull: false, defaultValue: 0 },
 priceType: { type: DataTypes.ENUM('Paid','Complimentary'), allowNull: false, defaultValue: 'Paid', field: 'price_type' },
 displayOrder: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0, field: 'display_order' },
 startingTime: { type: DataTypes.TIME, field: 'starting_time' },
 endingTime: { type: DataTypes.TIME, field: 'ending_time' },
 image: { type: DataTypes.STRING(500) },
 status: { type: DataTypes.ENUM('Active','Inactive'), allowNull: false, defaultValue: 'Active' },
 isFeatured: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false, field: 'is_featured' },
}, { tableName: 'activities', timestamps: true, underscored: true });

export default Activity;
