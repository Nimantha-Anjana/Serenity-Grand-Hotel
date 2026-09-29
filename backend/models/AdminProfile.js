import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const AdminProfile = sequelize.define('AdminProfile', {
 id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
 userId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, unique: true, field: 'user_id' },
 dateOfBirth: { type: DataTypes.DATEONLY, field: 'date_of_birth' },
 gender: { type: DataTypes.STRING(30) },
 city: { type: DataTypes.STRING(100) },
 country: { type: DataTypes.STRING(100), defaultValue: 'Sri Lanka' },
 address: { type: DataTypes.STRING(300) },
}, { tableName: 'admin_profiles', timestamps: true, underscored: true });

export default AdminProfile;
