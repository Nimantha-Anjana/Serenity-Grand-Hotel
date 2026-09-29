import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const BookingSetting = sequelize.define('BookingSetting', {
 id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
 checkInTime: { type: DataTypes.TIME, allowNull: false, defaultValue: '14:00:00', field: 'check_in_time' },
 checkOutTime: { type: DataTypes.TIME, allowNull: false, defaultValue: '12:00:00', field: 'check_out_time' },
 minimumStay: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, defaultValue: 1, field: 'minimum_stay' },
 maximumStay: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, defaultValue: 30, field: 'maximum_stay' },
 maxGuestsPerRoom: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, defaultValue: 4, field: 'max_guests_per_room' },
 confirmationPolicy: { type: DataTypes.ENUM('Automatic','Manual'), allowNull: false, defaultValue: 'Manual', field: 'confirmation_policy' },
 defaultCurrency: { type: DataTypes.STRING(10), allowNull: false, defaultValue: 'LKR', field: 'default_currency' },
}, { tableName: 'booking_settings', timestamps: true, underscored: true });

export default BookingSetting;
