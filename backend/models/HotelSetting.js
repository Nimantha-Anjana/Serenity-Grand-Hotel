import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const HotelSetting = sequelize.define('HotelSetting', {
 id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
 hotelName: { type: DataTypes.STRING(200), allowNull: false, field: 'hotel_name' },
 hotelEmail: { type: DataTypes.STRING(150), field: 'hotel_email' },
 description: { type: DataTypes.TEXT },
 primaryPhone: { type: DataTypes.STRING(50), field: 'primary_phone' },
 alternativePhone: { type: DataTypes.STRING(50), field: 'alternative_phone' },
 address: { type: DataTypes.STRING(300) },
 city: { type: DataTypes.STRING(100) },
 country: { type: DataTypes.STRING(100), defaultValue: 'Sri Lanka' },
 postalCode: { type: DataTypes.STRING(20), field: 'postal_code' },
 logoUrl: { type: DataTypes.STRING(1000), field: 'logo_url' },
}, { tableName: 'hotel_settings', timestamps: true, underscored: true });

export default HotelSetting;
