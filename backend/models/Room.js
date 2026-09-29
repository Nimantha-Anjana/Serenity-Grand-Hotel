import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Room = sequelize.define('Room', {
 id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
 roomNumber: { type: DataTypes.STRING(20), allowNull: false, unique: true, field: 'room_number' },
 roomName: { type: DataTypes.STRING(150), allowNull: false, field: 'room_name' },
 roomType: { type: DataTypes.STRING(100), allowNull: false, field: 'room_type' },
 pricePerNight: { type: DataTypes.DECIMAL(10,2), allowNull: false, defaultValue: 0, field: 'price_per_night' },
 maxGuests: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, defaultValue: 1, field: 'max_guests' },
 bedType: { type: DataTypes.STRING(100), field: 'bed_type' },
 roomSize: { type: DataTypes.STRING(50), field: 'room_size' },
 viewType: { type: DataTypes.STRING(100), field: 'view_type' },
 description: { type: DataTypes.TEXT },
 status: { type: DataTypes.ENUM('Available','Occupied','Reserved','Maintenance'), allowNull: false, defaultValue: 'Available' },
 image: { type: DataTypes.STRING(500) },
}, { tableName: 'rooms', timestamps: true, underscored: true });

export default Room;
