import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const CustomerProfile = sequelize.define('CustomerProfile', {
 id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
 userId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, unique: true, field: 'user_id' },
 nicNumber: { type: DataTypes.STRING(20), field: 'nic_number' },
 address: { type: DataTypes.STRING(300) },
 city: { type: DataTypes.STRING(100) },
 country: { type: DataTypes.STRING(100), defaultValue: 'Sri Lanka' },
 dateOfBirth: { type: DataTypes.DATEONLY, field: 'date_of_birth' },
 gender: { type: DataTypes.STRING(30) },
}, { tableName: 'customer_profiles', timestamps: true, underscored: true });

export default CustomerProfile;
