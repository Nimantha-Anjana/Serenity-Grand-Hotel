import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const AuditLog = sequelize.define('AuditLog', {
 id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
 userId: { type: DataTypes.BIGINT.UNSIGNED, field: 'user_id' },
 action: { type: DataTypes.STRING(100), allowNull: false },
 module: { type: DataTypes.STRING(100) },
 description: { type: DataTypes.TEXT },
 ipAddress: { type: DataTypes.STRING(45), field: 'ip_address' },
 userAgent: { type: DataTypes.TEXT, field: 'user_agent' },
}, { tableName: 'audit_logs', timestamps: false, underscored: true, createdAt: 'created_at', updatedAt: false });

export default AuditLog;
