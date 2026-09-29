import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const SystemSetting = sequelize.define('SystemSetting', {
 id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
 language: { type: DataTypes.STRING(20), allowNull: false, defaultValue: 'en' },
 timezone: { type: DataTypes.STRING(100), allowNull: false, defaultValue: 'Asia/Colombo' },
 dateFormat: { type: DataTypes.STRING(30), allowNull: false, defaultValue: 'YYYY-MM-DD', field: 'date_format' },
 timeFormat: { type: DataTypes.STRING(30), allowNull: false, defaultValue: '12-hour', field: 'time_format' },
 itemsPerPage: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, defaultValue: 10, field: 'items_per_page' },
 theme: { type: DataTypes.STRING(50), allowNull: false, defaultValue: 'light' },
}, { tableName: 'system_settings', timestamps: true, underscored: true });

export default SystemSetting;
