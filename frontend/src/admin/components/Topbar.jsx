import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import '../css/Topbar.css';

/**
 * Topbar Component for Serenity Grand Hotel Admin Panel.
 * Dynamically displays current route titles, notification center with unread counters,
 * profile navigation options, and mobile sidebar toggle trigger.
 */
const Topbar = ({ toggleSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Dropdown visibility toggles
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  // References for outside click dismissal
  const notifRef = useRef(null);
  const profileRef = useRef(null);

  // Dynamic route titles map
  const getPageDetails = () => {
    const path = location.pathname;
    switch (path) {
      case '/admin/rooms':
        return { title: 'Room Management', subtitle: 'Overview of suites & availability' };
      case '/admin/bookings':
        return { title: 'Bookings & Reservations', subtitle: 'Manage guest check-ins & stays' };
      case '/admin/customers':
        return { title: 'Guest Directory', subtitle: 'VIP profile & customer history' };
      case '/admin/dining':
        return { title: 'Dining & Room Service', subtitle: 'Restaurant reservations & room orders' };
      case '/admin/facilities':
        return { title: 'Hotel Facilities', subtitle: 'Spa, pool & event amenities' };
      case '/admin/gallery':
        return { title: 'Gallery Management', subtitle: 'Hotel showcase photos & media' };
      case '/admin/services':
        return { title: 'Hotel Services', subtitle: 'Special amenities & guest services' };
      case '/admin/profile':
        return { title: 'Admin Profile', subtitle: 'Manage personal details & security' };
      case '/admin/messages':
        return { title: 'Guest Communications', subtitle: 'Inquiries & concierge requests' };
      case '/admin/settings':
        return { title: 'System Settings', subtitle: 'Hotel configuration & preferences' };
      case '/admin':
      default:
        return { title: 'Dashboard Overview', subtitle: 'Welcome back, Serenity Grand Management' };
    }
  };

  const { title, subtitle } = getPageDetails();

  // Dummy notifications list
  const notifications = [
    {
      id: 1,
      title: 'New Booking Received',
      desc: 'Alexander Wright booked Presidential Suite for 3 nights.',
      time: '5 min ago',
      icon: 'bi-calendar-check',
      type: 'booking'
    },
    {
      id: 2,
      title: 'New Guest Registered',
      desc: 'Sophia Martinez created a new guest account.',
      time: '32 min ago',
      icon: 'bi-person-plus',
      type: 'customer'
    },
    {
      id: 3,
      title: 'Concierge Inquiry',
      desc: 'Room 402 requested airport limousine transfer.',
      time: '1 hour ago',
      icon: 'bi-chat-left-text',
      type: 'message'
    }
  ];

  // Navigation Handlers
  const handleProfileClick = () => {
    setShowProfileMenu(false);
    navigate('/admin/profile');
  };

  const handleSettingsClick = () => {
    setShowProfileMenu(false);
    navigate('/admin/settings');
  };

  const handleLogoutClick = () => {
    setShowProfileMenu(false);
    navigate('/admin/login');
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="topbar-container">
      {/* 1. Left Section: Hamburger Button & Page Title */}
      <div className="topbar-left">
        <button 
          type="button" 
          className="btn-toggle-sidebar d-lg-none"
          onClick={toggleSidebar}
          aria-label="Toggle Sidebar Navigation"
        >
          <i className="bi bi-list"></i>
        </button>

        <div className="topbar-title-box">
          <h1 className="topbar-page-title">{title}</h1>
          <span className="topbar-subtitle d-none d-sm-block">{subtitle}</span>
        </div>
      </div>

      {/* 2. Right Section: Search, Notifications & Profile */}
      <div className="topbar-right">
        {/* Search Bar Container */}
        <div className={`topbar-search-box ${showSearch ? 'mobile-expanded' : ''}`}>
          <i className="bi bi-search search-icon"></i>
          <input 
            type="text" 
            className="search-input" 
            placeholder="Search bookings, guests, rooms..." 
          />
          {showSearch && (
            <button 
              className="btn-close-search d-sm-none" 
              onClick={() => setShowSearch(false)}
            >
              <i className="bi bi-x"></i>
            </button>
          )}
        </div>

        {/* Mobile Search Icon Toggle */}
        <button 
          className="topbar-icon-btn d-sm-none" 
          onClick={() => setShowSearch(!showSearch)}
          aria-label="Toggle Search"
        >
          <i className="bi bi-search"></i>
        </button>

        {/* Notification Bell & Dropdown */}
        <div className="dropdown-wrapper" ref={notifRef}>
          <button 
            type="button" 
            className={`topbar-icon-btn ${showNotifications ? 'active' : ''}`}
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            aria-label="View Notifications"
          >
            <i className="bi bi-bell"></i>
            <span className="notification-badge">3</span>
          </button>

          {showNotifications && (
            <div className="topbar-dropdown notification-dropdown">
              <div className="dropdown-header">
                <h6 className="dropdown-title">Notifications</h6>
                <span className="badge badge-gold">3 New</span>
              </div>
              
              <div className="notification-list">
                {notifications.map((item) => (
                  <div key={item.id} className="notification-item">
                    <div className={`notif-icon-box ${item.type}`}>
                      <i className={`bi ${item.icon}`}></i>
                    </div>
                    <div className="notif-content">
                      <p className="notif-title">{item.title}</p>
                      <p className="notif-desc">{item.desc}</p>
                      <span className="notif-time">{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="dropdown-footer">
                <button type="button" className="btn-view-all">Mark all as read</button>
              </div>
            </div>
          )}
        </div>

        <div className="topbar-divider"></div>

        {/* Admin Profile & Dropdown */}
        <div className="dropdown-wrapper" ref={profileRef}>
          <button 
            type="button" 
            className="profile-trigger-btn"
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
          >
            <div className="avatar-box">
              <span className="avatar-text">AU</span>
              <span className="online-indicator"></span>
            </div>
            
            <div className="profile-info d-none d-md-flex">
              <span className="profile-name">Admin User</span>
              <span className="profile-role">Administrator</span>
            </div>

            <i className={`bi bi-chevron-down chevron-icon ${showProfileMenu ? 'open' : ''}`}></i>
          </button>

          {showProfileMenu && (
            <div className="topbar-dropdown profile-dropdown">
              <div className="dropdown-header d-md-none">
                <p className="profile-name mb-0">Admin User</p>
                <span className="profile-role">Administrator</span>
              </div>
              <div className="dropdown-divider d-md-none"></div>

              <ul className="profile-menu-list">
                <li>
                  <button type="button" className="dropdown-item-btn" onClick={handleProfileClick}>
                    <i className="bi bi-person-circle"></i>
                    <span>My Profile</span>
                  </button>
                </li>
                <li>
                  <button type="button" className="dropdown-item-btn" onClick={handleSettingsClick}>
                    <i className="bi bi-sliders"></i>
                    <span>Settings</span>
                  </button>
                </li>
                <li className="dropdown-divider"></li>
                <li>
                  <button type="button" className="dropdown-item-btn danger" onClick={handleLogoutClick}>
                    <i className="bi bi-box-arrow-right"></i>
                    <span>Logout</span>
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;