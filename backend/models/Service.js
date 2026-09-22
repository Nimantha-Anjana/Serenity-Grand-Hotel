import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Service = sequelize.define('Service', {
  name: { type: DataTypes.STRING(150), allowNull: false },
  shortDesc: { type: DataTypes.STRING(300) },
  fullDesc: { type: DataTypes.TEXT },
  category: { type: DataTypes.STRING(100), allowNull: false }, // Wellness, Transportation, Dining ...
  price: { type: DataTypes.STRING(100) }, // text on purpose: "From $35", "Contact us"
  availability: { type: DataTypes.STRING(100) },
  openingTime: { type: DataTypes.STRING(5), defaultValue: '00:00' }, // "HH:MM"
  closingTime: { type: DataTypes.STRING(5), defaultValue: '23:59' },
  icon: { type: DataTypes.STRING(100) }, // bootstrap-icons class used by the admin panel
  image: { type: DataTypes.STRING(1000) },
  status: { type: DataTypes.ENUM('Active', 'Inactive'), defaultValue: 'Active' },
  isFeatured: { type: DataTypes.BOOLEAN, defaultValue: false },
});

export default Service;
