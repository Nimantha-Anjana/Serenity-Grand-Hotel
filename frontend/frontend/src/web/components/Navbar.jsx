import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../css/Navbar.css';

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useAuth();

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="navbar-header">
      <nav className="navbar-container" aria-label="Main Navigation">
        {/* Left Side: Text-Based Logo */}
        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
          <span className="logo-main">SERENITY</span>
          <span className="logo-sub">GRAND HOTEL</span>
        </Link>

        {/* Center / Right Navigation Links (Desktop) */}
        <ul className="nav-links">
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/rooms" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              Rooms
            </NavLink>
          </li>
          <li>
            <NavLink to="/dining" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              Dining
            </NavLink>
          </li>
          <li>
            <NavLink to="/facilities" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              Facilities
            </NavLink>
          </li>
          {/* ADDED ACTIVITIES LINK */}
          <li>
            <NavLink to="/activities" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              Activities
            </NavLink>
          </li>
          <li>
            <NavLink to="/services" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              Services
            </NavLink>
          </li>
          <li>
            <NavLink to="/gallery" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              Gallery
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              Contact
            </NavLink>
          </li>
        </ul>

        {/* Right Side Actions */}
        <div className="navbar-actions">
          {user ? (
            <Link to="/profile" className="nav-profile-btn" onClick={closeMobileMenu}>
              <img 
                src={user.avatar ? `http://localhost:5000${user.avatar}` : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'} 
                alt="Profile" 
                className="nav-avatar" 
              />
              <span className="nav-profile-name">{user.name.split(' ')[0]}</span>
            </Link>
          ) : (
            <Link to="/login" className="nav-login-btn">
              LOGIN
            </Link>
          )}

          <Link to="/booking" className="btn-book-now">
            BOOK NOW
          </Link>
        </div>

        {/* Hamburger Menu */}
        <button 
          className="hamburger-btn" 
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
        >
          <span className={`hamburger-bar ${isMobileMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-bar ${isMobileMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-bar ${isMobileMenuOpen ? 'open' : ''}`}></span>
        </button>
      </nav>

      {/* Mobile Drawer Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <ul className="mobile-nav-links">
          <li>
            <NavLink to="/" onClick={closeMobileMenu} className="mobile-link">Home</NavLink>
          </li>
          <li>
            <NavLink to="/rooms" onClick={closeMobileMenu} className="mobile-link">Rooms</NavLink>
          </li>
          <li>
            <NavLink to="/dining" onClick={closeMobileMenu} className="mobile-link">Dining</NavLink>
          </li>
          <li>
            <NavLink to="/facilities" onClick={closeMobileMenu} className="mobile-link">Facilities</NavLink>
          </li>
          {/* ADDED MOBILE ACTIVITIES LINK */}
          <li>
            <NavLink to="/activities" onClick={closeMobileMenu} className="mobile-link">Activities</NavLink>
          </li>
          <li>
            <NavLink to="/services" onClick={closeMobileMenu} className="mobile-link">Services</NavLink>
          </li>
          <li>
            <NavLink to="/gallery" onClick={closeMobileMenu} className="mobile-link">Gallery</NavLink>
          </li>
          <li>
            <NavLink to="/contact" onClick={closeMobileMenu} className="mobile-link">Contact</NavLink>
          </li>
          {user ? (
            <li>
              <Link to="/profile" onClick={closeMobileMenu} className="mobile-link auth-mobile-link">My Profile</Link>
            </li>
          ) : (
            <li>
              <Link to="/login" onClick={closeMobileMenu} className="mobile-link auth-mobile-link">Login</Link>
            </li>
          )}
          <li>
            <Link to="/booking" onClick={closeMobileMenu} className="mobile-btn-book">BOOK NOW</Link>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Navbar;