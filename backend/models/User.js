import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const User = sequelize.define('User', {
 id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
 name: { type: DataTypes.STRING(150), allowNull: false },
 email: { type: DataTypes.STRING(150), allowNull: false, unique: true, validate: { isEmail: true } },
 passwordHash: { type: DataTypes.STRING(255), allowNull: false, field: 'password_hash' },
 phone: { type: DataTypes.STRING(50) },
 role: { type: DataTypes.ENUM('admin','customer'), allowNull: false, defaultValue: 'customer' },
 avatar: { type: DataTypes.STRING(500) },
 status: { type: DataTypes.ENUM('active','inactive','blocked'), allowNull: false, defaultValue: 'active' },
 isVerified: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false, field: 'is_verified' },
 lastLoginAt: { type: DataTypes.DATE, field: 'last_login_at' },
}, { tableName: 'users', timestamps: true, underscored: true });

export default User;
