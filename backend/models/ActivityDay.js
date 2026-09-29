import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const ActivityDay = sequelize.define('ActivityDay', {
 id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
 activityId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, field: 'activity_id' },
 dayOfWeek: { type: DataTypes.ENUM('Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'), allowNull: false, field: 'day_of_week' },
}, { tableName: 'activity_days', timestamps: false, underscored: true, createdAt: 'created_at', updatedAt: false });

export default ActivityDay;
