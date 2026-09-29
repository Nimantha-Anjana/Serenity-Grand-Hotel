import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const BookingGuest = sequelize.define('BookingGuest', {
 id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
 bookingId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, field: 'booking_id' },
 fullName: { type: DataTypes.STRING(150), allowNull: false, field: 'full_name' },
 email: { type: DataTypes.STRING(150) },
 phone: { type: DataTypes.STRING(50) },
 guestType: { type: DataTypes.ENUM('adult','child'), allowNull: false, defaultValue: 'adult', field: 'guest_type' },
}, { tableName: 'booking_guests', timestamps: false, underscored: true, createdAt: 'created_at', updatedAt: false });

export default BookingGuest;
