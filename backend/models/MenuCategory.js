import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const MenuCategory = sequelize.define('MenuCategory', {
 id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
 name: { type: DataTypes.STRING(100), allowNull: false, unique: true },
 description: { type: DataTypes.TEXT },
 status: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
}, { tableName: 'menu_categories', timestamps: true, underscored: true });

export default MenuCategory;
