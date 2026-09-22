import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const MenuItem = sequelize.define('MenuItem', {
  name: { type: DataTypes.STRING(150), allowNull: false },
  category: { type: DataTypes.STRING(100), allowNull: false }, // Breakfast, Main Course, Dessert ...
  price: { type: DataTypes.DECIMAL(10, 2), allowNull: false, validate: { min: 0 } },
  availability: { type: DataTypes.STRING(50), defaultValue: 'Available' },
  description: { type: DataTypes.TEXT },
  image: { type: DataTypes.STRING(500) },
});

export default MenuItem;
