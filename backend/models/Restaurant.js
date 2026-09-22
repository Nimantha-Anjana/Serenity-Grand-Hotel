import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Restaurant = sequelize.define('Restaurant', {
  name: { type: DataTypes.STRING(150), allowNull: false },
  cuisine: { type: DataTypes.STRING(200) },
  hours: { type: DataTypes.STRING(100) }, // "07:00 AM - 11:00 PM"
  location: { type: DataTypes.STRING(200) },
  status: { type: DataTypes.ENUM('Open', 'Closed'), defaultValue: 'Open' },
  image: { type: DataTypes.STRING(500) },
});

export default Restaurant;
