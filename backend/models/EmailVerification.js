import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const EmailVerification = sequelize.define('EmailVerification', {
 id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
 userId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, field: 'user_id' },
 otpCode: { type: DataTypes.STRING(10), allowNull: false, field: 'otp_code' },
 expiresAt: { type: DataTypes.DATE, allowNull: false, field: 'expires_at' },
 verifiedAt: { type: DataTypes.DATE, field: 'verified_at' },
}, { tableName: 'email_verifications', timestamps: false, underscored: true, createdAt: 'created_at', updatedAt: false });

export default EmailVerification;
