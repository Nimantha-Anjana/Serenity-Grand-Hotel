import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const WebsiteSetting = sequelize.define('WebsiteSetting', {
 id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
 websiteName: { type: DataTypes.STRING(200), allowNull: false, field: 'website_name' },
 seoTitle: { type: DataTypes.STRING(255), field: 'seo_title' },
 metaDescription: { type: DataTypes.TEXT, field: 'meta_description' },
 websiteUrl: { type: DataTypes.STRING(500), field: 'website_url' },
 faviconUrl: { type: DataTypes.STRING(1000), field: 'favicon_url' },
 showBooking: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true, field: 'show_booking' },
 showGallery: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true, field: 'show_gallery' },
 showServices: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true, field: 'show_services' },
 showActivities: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true, field: 'show_activities' },
}, { tableName: 'website_settings', timestamps: true, underscored: true });

export default WebsiteSetting;
