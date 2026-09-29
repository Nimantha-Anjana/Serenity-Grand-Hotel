import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Amenity = sequelize.define('Amenity', {
 id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
 name: { type: DataTypes.STRING(100), allowNull: false, unique: true },
 icon: { type: DataTypes.STRING(100) },
 status: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
}, { tableName: 'amenities', timestamps: true, underscored: true });

export default Amenity;
