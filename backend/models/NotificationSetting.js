import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const NotificationSetting = sequelize.define('NotificationSetting', {
 id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
 userId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, unique: true, field: 'user_id' },
 emailNotifications: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true, field: 'email_notifications' },
 browserAlerts: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true, field: 'browser_alerts' },
 bookingNotifications: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true, field: 'booking_notifications' },
 messageNotifications: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true, field: 'message_notifications' },
}, { tableName: 'notification_settings', timestamps: true, underscored: true });

export default NotificationSetting;
