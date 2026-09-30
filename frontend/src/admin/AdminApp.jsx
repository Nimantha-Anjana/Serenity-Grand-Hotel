import React, { useState } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';

// Bootstrap + icons + admin layout styles.
// These are imported here (not in main.jsx) because this whole admin app is lazy-loaded,
// so Bootstrap only affects the /admin pages and never the public website.
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

// Layout Components
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';

// Page Components (Real Imported Pages)
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Rooms from './pages/Rooms';
import Bookings from './pages/Bookings';
import Customers from './pages/Customers';
import Dining from './pages/Dining';
import Gallery from './pages/Gallery';
import Services from './pages/Services';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Facilities from './pages/Facilities';
import Messages from './pages/Messages';
import Activities from './pages/Activities';

// Form Pages (Add / Edit forms - each one is its own page, opened from the list page buttons)
import RoomForm from './forms/RoomForm';
import ActivityForm from './forms/ActivityForm';
import BookingForm from './forms/BookingForm';
import CustomerForm from './forms/CustomerForm';
import RestaurantForm from './forms/RestaurantForm';
import MenuItemForm from './forms/MenuItemForm';
import FacilityForm from './forms/FacilityForm';
import GalleryForm from './forms/GalleryForm';
import ServiceForm from './forms/ServiceForm';

// Shared dummy data so list pages and form pages see the same records
import AdminDataProvider from './context/AdminDataProvider';



/* ==========================================================================
   STATIC PLACEHOLDER COMPONENT FOR UPCOMING SERVICES PAGE
   ========================================================================== */





/* ==========================================================================
   MAIN ADMIN LAYOUT WRAPPER COMPONENT
   ========================================================================== */
const AdminLayout = () => {
  // Mobile sidebar open/close state toggle
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="admin-layout">
      {/* 1. Fixed Left Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* 2. Main Wrapper (Topbar + Content Area) */}
      <div className="main-wrapper">
        {/* Sticky Header Topbar */}
        <Topbar toggleSidebar={toggleSidebar} />

        {/* Dynamic Page Content Outlet */}
        <main className="content-wrapper">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

/* ==========================================================================
   ADMIN ROUTER CONFIGURATION
   The main App.jsx mounts this component at "/admin/*", so the paths below
   are RELATIVE to /admin  (index = /admin, "rooms" = /admin/rooms, ...).
   BrowserRouter lives in src/App.jsx.
   ========================================================================== */
function AdminApp() {
  return (
    <AdminDataProvider>
    <Routes>
      {/* Standalone Login Route (Sidebar සහ Topbar රහිතව දිස් වේ) */}
      <Route path="login" element={<Login />} />

      {/* Dashboard & Inner Pages with Admin Layout */}
      <Route element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="rooms" element={<Rooms />} />
        <Route path="bookings" element={<Bookings />} />
        <Route path="customers" element={<Customers />} />
        <Route path="dining" element={<Dining />} />
        <Route path="facilities" element={<Facilities />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="services" element={<Services />} />
        <Route path="messages" element={<Messages />} />
        <Route path="settings" element={<Settings />} />
        <Route path="profile" element={<Profile />} />
        <Route path="activities" element={<Activities />} />

        {/* ---------- Form pages (Add / Edit) ---------- */}
        <Route path="rooms/add" element={<RoomForm />} />
        <Route path="rooms/edit/:id" element={<RoomForm />} />

        <Route path="bookings/add" element={<BookingForm />} />

        <Route path="customers/add" element={<CustomerForm />} />
        <Route path="customers/edit/:id" element={<CustomerForm />} />

        <Route path="dining/restaurants/add" element={<RestaurantForm />} />
        <Route path="dining/restaurants/edit/:id" element={<RestaurantForm />} />
        <Route path="dining/menu/add" element={<MenuItemForm />} />
        <Route path="dining/menu/edit/:id" element={<MenuItemForm />} />

        <Route path="activities/add" element={<ActivityForm />} />
        <Route path="activities/edit/:id" element={<ActivityForm />} />

        <Route path="facilities/add" element={<FacilityForm />} />
        <Route path="facilities/edit/:id" element={<FacilityForm />} />

        <Route path="gallery/add" element={<GalleryForm />} />
        <Route path="gallery/edit/:id" element={<GalleryForm />} />

        <Route path="services/add" element={<ServiceForm />} />
        <Route path="services/edit/:id" element={<ServiceForm />} />

        {/* Unknown /admin/... URL -> Dashboard */}
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Route>
    </Routes>
    </AdminDataProvider>
  );
}

export default AdminApp;