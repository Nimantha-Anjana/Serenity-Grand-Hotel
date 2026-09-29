import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Facility = sequelize.define('Facility', {
 id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
 name: { type: DataTypes.STRING(150), allowNull: false },
 description: { type: DataTypes.TEXT },
 openingTime: { type: DataTypes.TIME, field: 'opening_time' },
 closingTime: { type: DataTypes.TIME, field: 'closing_time' },
 icon: { type: DataTypes.STRING(100) },
 image: { type: DataTypes.STRING(500) },
 status: { type: DataTypes.ENUM('Active','Inactive'), allowNull: false, defaultValue: 'Active' },
}, { tableName: 'facilities', timestamps: true, underscored: true });

export default Facility;
