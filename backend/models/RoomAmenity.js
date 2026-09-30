import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const RoomAmenity = sequelize.define('RoomAmenity', {
 id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
 roomId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, field: 'room_id' },
 amenityId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, field: 'amenity_id' },
}, { tableName: 'room_amenities', timestamps: true, createdAt: 'created_at', updatedAt: false, underscored: true });

export default RoomAmenity;
