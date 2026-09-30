import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import '../css/Sidebar.css';

/**
 * Sidebar component for Serenity Grand Hotel Admin Panel.
 * Supports active route highlighting via React Router NavLink,
 * collapsible mobile menu props, and quick action buttons.
 */
const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();

  // Navigation links metadata configuration
  const navItems = [
    { path: '/admin', label: 'Dashboard', icon: 'bi-grid-1x2-fill', end: true },
    { path: '/admin/rooms', label: 'Rooms', icon: 'bi-door-open-fill' },
    { path: '/admin/bookings', label: 'Bookings', icon: 'bi-calendar-check-fill' },
    { path: '/admin/customers', label: 'Customers', icon: 'bi-people-fill' },
    { path: '/admin/dining', label: 'Dining', icon: 'bi-cup-hot-fill' },
    { path: '/admin/activities', label: 'Activities', icon: 'bi-compass-fill' },
    { path: '/admin/facilities', label: 'Facilities', icon: 'bi-stars' },
    { path: '/admin/gallery', label: 'Gallery', icon: 'bi-images' },
    { path: '/admin/services', label: 'Services', icon: 'bi-gear-wide-connected' },
    { path: '/admin/messages', label: 'Messages', icon: 'bi-chat-left-text-fill', badge: '3' },
    { path: '/admin/settings', label: 'Settings', icon: 'bi-gear-fill' },
  ];

  const handleLogout = () => {
    // Navigate directly to the login page
    navigate('/admin/login');
  };

  return (
    <>
      {/* Dark backdrop overlay for mobile view when sidebar is open */}
      {isOpen && (
        <div 
          className="sidebar-backdrop d-lg-none" 
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}

      <aside className={`sidebar-container ${isOpen ? 'mobile-open' : ''}`}>
        {/* 1. Header & Hotel Branding */}
        <div className="sidebar-header">
          <Link to="/admin" className="brand-logo-wrapper" onClick={() => isOpen && toggleSidebar()}>
            <div className="brand-icon-box">
              <i className="bi bi-bank2 brand-icon"></i>
            </div>
            <div className="brand-text-container">
              <h2 className="brand-title">Serenity Grand</h2>
              <span className="brand-subtitle">HOTEL & RESORT ADMIN</span>
            </div>
          </Link>
          {/* Close button for small screens */}
          <button 
            type="button" 
            className="btn-close-sidebar d-lg-none" 
            onClick={toggleSidebar}
            aria-label="Close Sidebar"
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        {/* Divider line with gold touch */}
        <div className="sidebar-divider"></div>

        {/* 2. Main Navigation Items */}
        <div className="sidebar-nav-wrapper">
          <span className="nav-section-label">MAIN NAVIGATION</span>
          <ul className="sidebar-nav">
            {navItems.map((item) => (
              <li key={item.path} className="nav-item">
                <NavLink
                  to={item.path}
                  end={item.end}
                  className={({ isActive }) =>
                    `nav-link ${isActive ? 'active' : ''}`
                  }
                  onClick={() => isOpen && toggleSidebar()}
                >
                  <i className={`bi ${item.icon} nav-icon`}></i>
                  <span className="nav-label">{item.label}</span>
                  {item.badge && (
                    <span className="badge nav-badge">{item.badge}</span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* 3. Footer / Logout Area */}
        <div className="sidebar-footer">
          <div className="sidebar-divider mb-3"></div>
          <button 
            type="button" 
            className="btn-logout" 
            onClick={handleLogout}
          >
            <i className="bi bi-box-arrow-right logout-icon"></i>
            <span>Log Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;