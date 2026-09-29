import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const MenuItem = sequelize.define('MenuItem', {
 id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
 restaurantId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, field: 'restaurant_id' },
 categoryId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, field: 'category_id' },
 name: { type: DataTypes.STRING(150), allowNull: false },
 price: { type: DataTypes.DECIMAL(10,2), allowNull: false, defaultValue: 0 },
 availability: { type: DataTypes.ENUM('Available','Out of Stock'), allowNull: false, defaultValue: 'Available' },
 description: { type: DataTypes.TEXT },
 image: { type: DataTypes.STRING(500) },
}, { tableName: 'menu_items', timestamps: true, underscored: true });

export default MenuItem;
