// Loads every model and defines the relations between them.
import Room from './Room.js';
import Booking from './Booking.js';
import Customer from './Customer.js';
import Restaurant from './Restaurant.js';
import MenuItem from './MenuItem.js';
import GalleryImage from './GalleryImage.js';
import Service from './Service.js';
import Message from './Message.js';

// A booking belongs to one room. If the room is deleted the booking stays (roomId becomes NULL).
Room.hasMany(Booking, { foreignKey: 'roomId', onDelete: 'SET NULL' });
Booking.belongsTo(Room, { foreignKey: 'roomId' });

export { Room, Booking, Customer, Restaurant, MenuItem, GalleryImage, Service, Message };
