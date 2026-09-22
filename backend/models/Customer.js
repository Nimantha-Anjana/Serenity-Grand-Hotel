import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Customer = sequelize.define('Customer', {
  name: { type: DataTypes.STRING(150), allowNull: false },
  email: { type: DataTypes.STRING(150), allowNull: false, unique: true, validate: { isEmail: true } },
  phone: { type: DataTypes.STRING(50) },
  address: { type: DataTypes.STRING(300) },
  regDate: { type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW },
  totalBookings: { type: DataTypes.INTEGER, defaultValue: 0, validate: { min: 0 } },
  lastVisit: { type: DataTypes.DATEONLY },
  status: { type: DataTypes.ENUM('New', 'Returning', 'Active'), defaultValue: 'New' },
  avatar: { type: DataTypes.STRING(500) },
});

export default Customer;
