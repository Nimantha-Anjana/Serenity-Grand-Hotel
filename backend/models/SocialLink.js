import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const SocialLink = sequelize.define('SocialLink', {
 id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
 platform: { type: DataTypes.STRING(50), allowNull: false },
 url: { type: DataTypes.STRING(1000), allowNull: false },
 isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true, field: 'is_active' },
 displayOrder: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0, field: 'display_order' },
}, { tableName: 'social_links', timestamps: true, underscored: true });

export default SocialLink;
