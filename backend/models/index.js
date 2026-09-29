import User from './User.js';
import CustomerProfile from './CustomerProfile.js';
import AdminProfile from './AdminProfile.js';
import Room from './Room.js';
import Amenity from './Amenity.js';
import RoomAmenity from './RoomAmenity.js';
import Booking from './Booking.js';
import BookingGuest from './BookingGuest.js';
import Payment from './Payment.js';
import Restaurant from './Restaurant.js';
import MenuCategory from './MenuCategory.js';
import MenuItem from './MenuItem.js';
import Facility from './Facility.js';
import Service from './Service.js';
import Activity from './Activity.js';
import ActivityDay from './ActivityDay.js';
import GalleryCategory from './GalleryCategory.js';
import GalleryImage from './GalleryImage.js';
import Conversation from './Conversation.js';
import ConversationParticipant from './ConversationParticipant.js';
import Message from './Message.js';
import MessageAttachment from './MessageAttachment.js';
import Review from './Review.js';
import HotelSetting from './HotelSetting.js';
import WebsiteSetting from './WebsiteSetting.js';
import BookingSetting from './BookingSetting.js';
import NotificationSetting from './NotificationSetting.js';
import SocialLink from './SocialLink.js';
import SystemSetting from './SystemSetting.js';
import PasswordResetToken from './PasswordResetToken.js';
import EmailVerification from './EmailVerification.js';
import AuditLog from './AuditLog.js';

User.hasOne(CustomerProfile, { foreignKey: 'userId', as: 'customerProfile', onDelete: 'CASCADE' });
CustomerProfile.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasOne(AdminProfile, { foreignKey: 'userId', as: 'adminProfile', onDelete: 'CASCADE' });
AdminProfile.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Room.belongsToMany(Amenity, { through: RoomAmenity, foreignKey: 'roomId', otherKey: 'amenityId', as: 'amenities' });
Amenity.belongsToMany(Room, { through: RoomAmenity, foreignKey: 'amenityId', otherKey: 'roomId', as: 'rooms' });

User.hasMany(Booking, { foreignKey: 'customerId', as: 'bookings' });
Booking.belongsTo(User, { foreignKey: 'customerId', as: 'customer' });
Room.hasMany(Booking, { foreignKey: 'roomId', as: 'bookings' });
Booking.belongsTo(Room, { foreignKey: 'roomId', as: 'room' });
Booking.hasMany(BookingGuest, { foreignKey: 'bookingId', as: 'guests', onDelete: 'CASCADE' });
BookingGuest.belongsTo(Booking, { foreignKey: 'bookingId', as: 'booking' });
Booking.hasMany(Payment, { foreignKey: 'bookingId', as: 'payments' });
Payment.belongsTo(Booking, { foreignKey: 'bookingId', as: 'booking' });

Restaurant.hasMany(MenuItem, { foreignKey: 'restaurantId', as: 'menuItems', onDelete: 'CASCADE' });
MenuItem.belongsTo(Restaurant, { foreignKey: 'restaurantId', as: 'restaurant' });
MenuCategory.hasMany(MenuItem, { foreignKey: 'categoryId', as: 'items' });
MenuItem.belongsTo(MenuCategory, { foreignKey: 'categoryId', as: 'category' });

Activity.hasMany(ActivityDay, { foreignKey: 'activityId', as: 'days', onDelete: 'CASCADE' });
ActivityDay.belongsTo(Activity, { foreignKey: 'activityId', as: 'activity' });
GalleryCategory.hasMany(GalleryImage, { foreignKey: 'categoryId', as: 'images', onDelete: 'RESTRICT' });
GalleryImage.belongsTo(GalleryCategory, { foreignKey: 'categoryId', as: 'category' });

Booking.hasMany(Conversation, { foreignKey: 'bookingId', as: 'conversations', onDelete: 'SET NULL' });
Conversation.belongsTo(Booking, { foreignKey: 'bookingId', as: 'booking' });
Conversation.hasMany(ConversationParticipant, { foreignKey: 'conversationId', as: 'participants', onDelete: 'CASCADE' });
ConversationParticipant.belongsTo(Conversation, { foreignKey: 'conversationId', as: 'conversation' });
User.hasMany(ConversationParticipant, { foreignKey: 'userId', as: 'conversationParticipants', onDelete: 'CASCADE' });
ConversationParticipant.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Conversation.hasMany(Message, { foreignKey: 'conversationId', as: 'messages', onDelete: 'CASCADE' });
Message.belongsTo(Conversation, { foreignKey: 'conversationId', as: 'conversation' });
User.hasMany(Message, { foreignKey: 'senderId', as: 'sentMessages' });
Message.belongsTo(User, { foreignKey: 'senderId', as: 'sender' });
Message.hasMany(MessageAttachment, { foreignKey: 'messageId', as: 'attachments', onDelete: 'CASCADE' });
MessageAttachment.belongsTo(Message, { foreignKey: 'messageId', as: 'message' });

User.hasMany(Review, { foreignKey: 'customerId', as: 'reviews' });
Review.belongsTo(User, { foreignKey: 'customerId', as: 'customer' });
Booking.hasOne(Review, { foreignKey: 'bookingId', as: 'review' });
Review.belongsTo(Booking, { foreignKey: 'bookingId', as: 'booking' });
Room.hasMany(Review, { foreignKey: 'roomId', as: 'reviews' });
Review.belongsTo(Room, { foreignKey: 'roomId', as: 'room' });

User.hasOne(NotificationSetting, { foreignKey: 'userId', as: 'notificationSettings', onDelete: 'CASCADE' });
NotificationSetting.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(PasswordResetToken, { foreignKey: 'userId', as: 'passwordResetTokens', onDelete: 'CASCADE' });
PasswordResetToken.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(EmailVerification, { foreignKey: 'userId', as: 'emailVerifications', onDelete: 'CASCADE' });
EmailVerification.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(AuditLog, { foreignKey: 'userId', as: 'auditLogs', onDelete: 'SET NULL' });
AuditLog.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export {
  User, CustomerProfile, AdminProfile, Room, Amenity, RoomAmenity,
  Booking, BookingGuest, Payment, Restaurant, MenuCategory, MenuItem,
  Facility, Service, Activity, ActivityDay, GalleryCategory, GalleryImage,
  Conversation, ConversationParticipant, Message, MessageAttachment, Review,
  HotelSetting, WebsiteSetting, BookingSetting, NotificationSetting, SocialLink,
  SystemSetting, PasswordResetToken, EmailVerification, AuditLog,
};
