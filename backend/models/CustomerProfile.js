import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const CustomerProfile = sequelize.define(
  'CustomerProfile',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    phone: {
      type: DataTypes.STRING(50),
    },
    address: {
      type: DataTypes.STRING(300),
    },
    nicNumber: {
      type: DataTypes.STRING(20),
    },
    passwordHash: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING(500),
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    otpCode: {
      type: DataTypes.STRING(6),
    },
    otpExpiry: {
      type: DataTypes.DATE,
    },
    resetToken: {
      type: DataTypes.STRING(255),
    },
    resetTokenExpiry: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: 'Customer_Profile',
    timestamps: true,
  }
);

export default CustomerProfile;
