import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Conversation = sequelize.define('Conversation', {
 id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
 subject: { type: DataTypes.STRING(200) },
 bookingId: { type: DataTypes.BIGINT.UNSIGNED, field: 'booking_id' },
}, { tableName: 'conversations', timestamps: true, underscored: true });

export default Conversation;
