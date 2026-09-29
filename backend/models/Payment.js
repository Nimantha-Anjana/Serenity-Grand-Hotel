import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Payment = sequelize.define('Payment', {
 id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
 bookingId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, field: 'booking_id' },
 transactionReference: { type: DataTypes.STRING(100), allowNull: false, field: 'transaction_reference' },
 amount: { type: DataTypes.DECIMAL(10,2), allowNull: false },
 paymentMethod: { type: DataTypes.STRING(50), allowNull: false, field: 'payment_method' },
 paymentStatus: { type: DataTypes.ENUM('Pending','Successful','Failed','Refunded'), allowNull: false, defaultValue: 'Pending', field: 'payment_status' },
 paidAt: { type: DataTypes.DATE, field: 'paid_at' },
}, { tableName: 'payments', timestamps: true, underscored: true });

export default Payment;
