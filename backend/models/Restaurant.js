import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Restaurant = sequelize.define('Restaurant', {
 id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
 name: { type: DataTypes.STRING(150), allowNull: false },
 cuisine: { type: DataTypes.STRING(200) },
 openingTime: { type: DataTypes.TIME, field: 'opening_time' },
 closingTime: { type: DataTypes.TIME, field: 'closing_time' },
 location: { type: DataTypes.STRING(200) },
 status: { type: DataTypes.ENUM('Open','Closed'), allowNull: false, defaultValue: 'Open' },
 image: { type: DataTypes.STRING(500) },
 description: { type: DataTypes.TEXT },
}, { tableName: 'restaurants', timestamps: true, underscored: true });

export default Restaurant;
