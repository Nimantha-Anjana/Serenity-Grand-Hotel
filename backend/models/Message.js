import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Message = sequelize.define('Message', {
 id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
 conversationId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, field: 'conversation_id' },
 senderId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, field: 'sender_id' },
 messageText: { type: DataTypes.TEXT, allowNull: false, field: 'message_text' },
 isRead: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false, field: 'is_read' },
 sentAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW, field: 'sent_at' },
}, { tableName: 'messages', timestamps: true, underscored: true });

export default Message;
