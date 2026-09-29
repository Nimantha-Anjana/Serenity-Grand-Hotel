import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const PasswordResetToken = sequelize.define('PasswordResetToken', {
 id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
 userId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, field: 'user_id' },
 token: { type: DataTypes.STRING(255), allowNull: false, unique: true },
 expiresAt: { type: DataTypes.DATE, allowNull: false, field: 'expires_at' },
 usedAt: { type: DataTypes.DATE, field: 'used_at' },
}, { tableName: 'password_reset_tokens', timestamps: false, underscored: true, createdAt: 'created_at', updatedAt: false });

export default PasswordResetToken;
