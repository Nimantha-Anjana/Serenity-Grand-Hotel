import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const MessageAttachment = sequelize.define('MessageAttachment', {
 id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
 messageId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, field: 'message_id' },
 fileName: { type: DataTypes.STRING(255), allowNull: false, field: 'file_name' },
 fileUrl: { type: DataTypes.STRING(1000), allowNull: false, field: 'file_url' },
 fileType: { type: DataTypes.STRING(100), field: 'file_type' },
 fileSize: { type: DataTypes.BIGINT.UNSIGNED, field: 'file_size' },
}, { tableName: 'message_attachments', timestamps: false, underscored: true, createdAt: 'created_at', updatedAt: false });

export default MessageAttachment;
