import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Footer.css';

function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      alert('Thank you for subscribing to Serenity Grand Hotel newsletter!');
      setEmail('');
    }
  };

  return (
    <footer className="footer-container">
      <div className="footer-content">
        {/* Column 1: Hotel Information */}
        <div className="footer-col brand-col">
          <div className="footer-logo">
            <span className="logo-main">SERENITY</span>
            <span className="logo-sub">GRAND HOTEL</span>
          </div>
          <p className="brand-description">
            Experience exceptional hospitality, modern comfort and unforgettable moments at Serenity Grand Hotel.
          </p>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-icon" aria-label="Facebook">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-icon" aria-label="Instagram">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="social-icon" aria-label="YouTube">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="social-icon" aria-label="TikTok">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.67 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.82.57-1.33 1.55-1.3 2.55.01.95.49 1.88 1.27 2.42.8.56 1.86.7 2.77.42.92-.27 1.68-1.03 1.96-1.96.17-.61.16-1.25.16-1.88.01-4.83.01-9.67.01-14.5z"/></svg>
            </a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="footer-col">
          <h3 className="footer-title">Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/rooms">Rooms</Link></li>
            <li><Link to="/dining">Dining</Link></li>
            <li><Link to="/facilities">Facilities</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/booking">Book Now</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Column 3: Contact Us */}
        <div className="footer-col">
          <h3 className="footer-title">Contact Us</h3>
          <ul className="contact-info">
            <li>
              <span className="contact-icon">📍</span>
              <span>123 Galle Road, Colombo, Sri Lanka</span>
            </li>
            <li>
              <span className="contact-icon">📞</span>
              <span>+94 11 234 5678</span>
            </li>
            <li>
              <span className="contact-icon">✉️</span>
              <span>info@serenitygrand.com</span>
            </li>
            <li>
              <span className="contact-icon">⏰</span>
              <span>Reception: Open 24 Hours</span>
            </li>
          </ul>
        </div>

        {/* Column 4: Newsletter */}
        <div className="footer-col">
          <h3 className="footer-title">Stay Updated</h3>
          <p className="newsletter-text">
            Subscribe to receive hotel news, special offers and exclusive updates.
          </p>
          <form className="newsletter-form" onSubmit={handleSubscribe}>
            <input 
              type="email" 
              placeholder="Enter your email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              required 
              className="newsletter-input"
            />
            <button type="submit" className="newsletter-btn">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>© 2026 Serenity Grand Hotel. All Rights Reserved.</p>
          <div className="legal-links">
            <span className="legal-link">Privacy Policy</span>
            <span className="legal-divider">•</span>
            <span className="legal-link">Terms & Conditions</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;