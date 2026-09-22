import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Room = sequelize.define('Room', {
  number: { type: DataTypes.STRING(20), allowNull: false, unique: true },
  name: { type: DataTypes.STRING(150), allowNull: false },
  type: { type: DataTypes.STRING(100), allowNull: false }, // Deluxe Room, Suite, Family Room ...
  price: { type: DataTypes.DECIMAL(10, 2), allowNull: false, validate: { min: 0 } }, // per night
  guests: { type: DataTypes.INTEGER, defaultValue: 2, validate: { min: 1 } },
  bedType: { type: DataTypes.STRING(100) },
  status: {
    type: DataTypes.ENUM('Available', 'Occupied', 'Reserved', 'Maintenance'),
    defaultValue: 'Available',
  },
  size: { type: DataTypes.STRING(50) },
  view: { type: DataTypes.STRING(100) },
  description: { type: DataTypes.TEXT },
  amenities: { type: DataTypes.JSON, defaultValue: [] }, // ["Wi-Fi", "Mini Bar", ...]
  image: { type: DataTypes.STRING(500) },
});

export default Room;
