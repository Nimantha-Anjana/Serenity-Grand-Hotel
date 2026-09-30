import { useState } from 'react';
import { AdminDataContext } from './adminDataContext';

import { INITIAL_ROOMS } from '../data/rooms';
import { INITIAL_ACTIVITIES } from '../data/activities';
import { INITIAL_BOOKINGS } from '../data/bookings';
import { INITIAL_CUSTOMERS } from '../data/customers';
import { INITIAL_RESTAURANTS, INITIAL_MENU_ITEMS } from '../data/dining';
import { INITIAL_FACILITIES } from '../data/facilities';
import { INITIAL_IMAGES } from '../data/gallery';
import { INITIAL_SERVICES } from '../data/services';

/**
 * Holds the admin panel's dummy data in one place so that list pages
 * and form pages can share it. Mounted once in AdminApp.
 */
export default function AdminDataProvider({ children }) {
  const [rooms, setRooms] = useState(INITIAL_ROOMS);
  const [activities, setActivities] = useState(INITIAL_ACTIVITIES);
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);
  const [customers, setCustomers] = useState(INITIAL_CUSTOMERS);
  const [restaurants, setRestaurants] = useState(INITIAL_RESTAURANTS);
  const [menuItems, setMenuItems] = useState(INITIAL_MENU_ITEMS);
  const [facilities, setFacilities] = useState(INITIAL_FACILITIES);
  const [images, setImages] = useState(INITIAL_IMAGES);
  const [services, setServices] = useState(INITIAL_SERVICES);

  const value = {
    rooms, setRooms,
    activities, setActivities,
    bookings, setBookings,
    customers, setCustomers,
    restaurants, setRestaurants,
    menuItems, setMenuItems,
    facilities, setFacilities,
    images, setImages,
    services, setServices,
  };

  return <AdminDataContext.Provider value={value}>{children}</AdminDataContext.Provider>;
}
