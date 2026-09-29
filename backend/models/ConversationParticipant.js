import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const ConversationParticipant = sequelize.define('ConversationParticipant', {
 id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
 conversationId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, field: 'conversation_id' },
 userId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, field: 'user_id' },
 joinedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW, field: 'joined_at' },
}, { tableName: 'conversation_participants', timestamps: false, underscored: true, createdAt: 'created_at', updatedAt: false });

export default ConversationParticipant;
