import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Review = sequelize.define('Review', {
 id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
 customerId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, field: 'customer_id' },
 bookingId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, field: 'booking_id' },
 roomId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, field: 'room_id' },
 rating: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, validate: { min: 1, max: 5 } },
 reviewText: { type: DataTypes.TEXT, field: 'review_text' },
 status: { type: DataTypes.ENUM('Pending','Approved','Rejected'), allowNull: false, defaultValue: 'Pending' },
}, { tableName: 'reviews', timestamps: true, underscored: true });

export default Review;
