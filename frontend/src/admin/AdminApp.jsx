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


/* ==========================================================================
   STATIC PLACEHOLDER COMPONENT FOR UPCOMING SERVICES PAGE
   ========================================================================== */
const Facilities = () => (
  <div className="luxury-card p-4">
    <h3 className="brand-font text-navy">Hotel Facilities</h3>
    <p className="text-muted mb-0">Facilities and spa reservation module coming in next step...</p>
  </div>
);

const Messages = () => (
  <div className="luxury-card p-4">
    <h3 className="brand-font text-navy">Guest Communications</h3>
    <p className="text-muted mb-0">Concierge messaging module coming in next step...</p>
  </div>
);


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

        {/* Unknown /admin/... URL -> Dashboard */}
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Route>
    </Routes>
  );
}

export default AdminApp;