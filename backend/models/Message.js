import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

// Messages sent from the website Contact form (shown on the admin "Messages" page)
const Message = sequelize.define('Message', {
  name: { type: DataTypes.STRING(150), allowNull: false },
  email: { type: DataTypes.STRING(150), allowNull: false, validate: { isEmail: true } },
  phone: { type: DataTypes.STRING(50) },
  subject: { type: DataTypes.STRING(200) },
  message: { type: DataTypes.TEXT, allowNull: false },
  isRead: { type: DataTypes.BOOLEAN, defaultValue: false },
});

export default Message;
