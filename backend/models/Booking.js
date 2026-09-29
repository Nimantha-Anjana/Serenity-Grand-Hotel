import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Booking = sequelize.define('Booking', {
 id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
 bookingReference: { type: DataTypes.STRING(30), allowNull: false, unique: true, field: 'booking_reference' },
 customerId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, field: 'customer_id' },
 roomId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, field: 'room_id' },
 checkIn: { type: DataTypes.DATEONLY, allowNull: false, field: 'check_in' },
 checkOut: { type: DataTypes.DATEONLY, allowNull: false, field: 'check_out' },
 adults: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, defaultValue: 1 },
 children: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, defaultValue: 0 },
 specialRequests: { type: DataTypes.TEXT, field: 'special_requests' },
 roomPrice: { type: DataTypes.DECIMAL(10,2), allowNull: false, defaultValue: 0, field: 'room_price' },
 totalAmount: { type: DataTypes.DECIMAL(10,2), allowNull: false, defaultValue: 0, field: 'total_amount' },
 paymentStatus: { type: DataTypes.ENUM('Pending','Deposit Paid','Paid in Full','Refunded','Failed'), allowNull: false, defaultValue: 'Pending', field: 'payment_status' },
 bookingStatus: { type: DataTypes.ENUM('Pending','Confirmed','Checked In','Completed','Cancelled'), allowNull: false, defaultValue: 'Pending', field: 'booking_status' },
}, { tableName: 'bookings', timestamps: true, underscored: true });

export default Booking;
