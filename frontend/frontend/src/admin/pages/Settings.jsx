import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Settings.css';

/**
 * Settings Page Component for Serenity Grand Hotel Admin Panel.
 * Includes General, Website, Booking, Notification, Social Media, System, and Security settings.
 * Fully interactive UI state with save alerts, logo preview, and default resetting.
 */
const Settings = () => {
  // Active Tab State
  const [activeTab, setActiveTab] = useState('general');
  const [successAlert, setSuccessAlert] = useState('');

  // 1. General Settings State
  const initialGeneral = {
    hotelName: 'Serenity Grand Hotel',
    description: 'A luxury hotel offering premium accommodation, dining and exceptional guest experiences.',
    email: 'info@serenitygrand.com',
    phone: '+94 11 234 5678',
    altPhone: '+94 77 123 4567',
    address: 'Colombo, Sri Lanka',
    city: 'Colombo',
    country: 'Sri Lanka',
    postalCode: '00100',
    logoUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=200&q=80'
  };
  const [generalSettings, setGeneralSettings] = useState(initialGeneral);

  // 2. Website Settings State
  const initialWebsite = {
    websiteName: 'Serenity Grand Hotel',
    websiteTitle: 'Luxury Hotel in Sri Lanka',
    websiteDescription: 'Experience luxury, comfort and exceptional hospitality.',
    websiteUrl: 'www.serenitygrand.com',
    isActive: true,
    maintenanceMode: false,
    showBookingBtn: true,
    showContactInfo: true,
    showSocialLinks: true
  };
  const [websiteSettings, setWebsiteSettings] = useState(initialWebsite);

  // 3. Booking Settings State
  const initialBooking = {
    checkInTime: '14:00',
    checkOutTime: '12:00',
    minStay: 1,
    maxStay: 30,
    maxGuests: 4,
    allowCancellation: true,
    allowSameDay: true,
    requirePhone: true,
    requireEmail: true,
    confirmationType: 'Automatic',
    defaultCurrency: 'USD'
  };
  const [bookingSettings, setBookingSettings] = useState(initialBooking);

  // 4. Notification Settings State
  const initialNotifications = {
    emailNewBooking: true,
    emailCancellation: true,
    emailRegistration: true,
    emailContactMsg: true,
    emailAdminMsg: true,
    emailRoomStatus: false,
    emailSystemAlerts: true,
    browserNotifications: true
  };
  const [notificationSettings, setNotificationSettings] = useState(initialNotifications);

  // 5. Social Media Settings State
  const initialSocial = {
    facebook: 'https://facebook.com/serenitygrand',
    instagram: 'https://instagram.com/serenitygrand',
    whatsapp: '+94 77 123 4567',
    youtube: 'https://youtube.com/c/serenitygrand',
    tiktok: 'https://tiktok.com/@serenitygrand',
    twitter: 'https://twitter.com/serenitygrand'
  };
  const [socialSettings, setSocialSettings] = useState(initialSocial);

  // 6. System Settings State
  const initialSystem = {
    language: 'English',
    timezone: 'Asia/Colombo',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '12 Hour',
    currency: 'USD',
    itemsPerPage: 10,
    theme: 'Light',
    enableLogs: true
  };
  const [systemSettings, setSystemSettings] = useState(initialSystem);

  // 7. Security Settings State
  const initialSecurity = {
    twoFactor: false,
    loginNotifications: true,
    sessionTimeout: '30 minutes',
    maxLoginAttempts: 5,
    autoLogout: true,
    showLoginActivity: true
  };
  const [securitySettings, setSecuritySettings] = useState(initialSecurity);

  // Save Feedback Trigger
  const triggerSaveFeedback = (sectionName) => {
    setSuccessAlert(`${sectionName} settings saved successfully.`);
    setTimeout(() => {
      setSuccessAlert('');
    }, 4000);
  };

  // Image Upload Handler
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newUrl = URL.createObjectURL(file);
      setGeneralSettings({ ...generalSettings, logoUrl: newUrl });
    }
  };

  return (
    <div className="settings-container">
      {/* Page Header & Breadcrumbs */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
        <div>
          <h2 className="brand-font page-title">Settings</h2>
          <p className="text-muted small mb-0">Manage hotel, website, and system preferences.</p>
        </div>
      </div>

      {/* Success Alert Banner */}
      {successAlert && (
        <div className="alert alert-success custom-alert d-flex align-items-center mb-4" role="alert">
          <i className="bi bi-check-circle-fill me-2 fs-5"></i>
          <div>{successAlert}</div>
        </div>
      )}

      {/* Main Settings Split Layout */}
      <div className="row g-4">
        {/* Navigation Menu Sidebar (Left) */}
        <div className="col-12 col-lg-3">
          <div className="luxury-card settings-nav-card p-2 p-md-3">
            <ul className="nav flex-column settings-nav">
              <li className="nav-item">
                <button
                  type="button"
                  className={`nav-link-btn ${activeTab === 'general' ? 'active' : ''}`}
                  onClick={() => setActiveTab('general')}
                >
                  <i className="bi bi-building me-2"></i>
                  <span>General</span>
                </button>
              </li>
              <li className="nav-item">
                <button
                  type="button"
                  className={`nav-link-btn ${activeTab === 'website' ? 'active' : ''}`}
                  onClick={() => setActiveTab('website')}
                >
                  <i className="bi bi-globe me-2"></i>
                  <span>Website</span>
                </button>
              </li>
              <li className="nav-item">
                <button
                  type="button"
                  className={`nav-link-btn ${activeTab === 'booking' ? 'active' : ''}`}
                  onClick={() => setActiveTab('booking')}
                >
                  <i className="bi bi-calendar-check me-2"></i>
                  <span>Booking</span>
                </button>
              </li>
              <li className="nav-item">
                <button
                  type="button"
                  className={`nav-link-btn ${activeTab === 'notifications' ? 'active' : ''}`}
                  onClick={() => setActiveTab('notifications')}
                >
                  <i className="bi bi-bell me-2"></i>
                  <span>Notifications</span>
                </button>
              </li>
              <li className="nav-item">
                <button
                  type="button"
                  className={`nav-link-btn ${activeTab === 'social' ? 'active' : ''}`}
                  onClick={() => setActiveTab('social')}
                >
                  <i className="bi bi-share me-2"></i>
                  <span>Social Media</span>
                </button>
              </li>
              <li className="nav-item">
                <button
                  type="button"
                  className={`nav-link-btn ${activeTab === 'system' ? 'active' : ''}`}
                  onClick={() => setActiveTab('system')}
                >
                  <i className="bi bi-sliders me-2"></i>
                  <span>System</span>
                </button>
              </li>
              <li className="nav-item">
                <button
                  type="button"
                  className={`nav-link-btn ${activeTab === 'security' ? 'active' : ''}`}
                  onClick={() => setActiveTab('security')}
                >
                  <i className="bi bi-shield-lock me-2"></i>
                  <span>Security</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Content Area (Right) */}
        <div className="col-12 col-lg-9">
          {/* 1. GENERAL SETTINGS */}
          {activeTab === 'general' && (
            <div className="luxury-card p-4">
              <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
                <h5 className="section-title brand-font mb-0">Hotel Information</h5>
                <i className="bi bi-building text-gold fs-4"></i>
              </div>

              {/* Logo Preview Section */}
              <div className="d-flex align-items-center gap-3 mb-4 p-3 bg-light-cream rounded border">
                <img src={generalSettings.logoUrl} alt="Hotel Logo" className="logo-preview-img" />
                <div>
                  <h6 className="mb-1 fw-bold text-navy">Hotel Brand Logo</h6>
                  <p className="extra-small text-muted mb-2">Recommended resolution: 200x200px (PNG or JPG)</p>
                  <label htmlFor="logo-upload" className="btn btn-sm btn-luxury-navy">
                    <i className="bi bi-camera me-1"></i>Change Logo
                    <input type="file" id="logo-upload" accept="image/*" className="d-none" onChange={handleLogoChange} />
                  </label>
                </div>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); triggerSaveFeedback('General'); }}>
                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold">Hotel Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={generalSettings.hotelName}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, hotelName: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold">Hotel Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={generalSettings.email}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label small fw-semibold">Hotel Description</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      value={generalSettings.description}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, description: e.target.value })}
                    ></textarea>
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold">Primary Phone</label>
                    <input
                      type="text"
                      className="form-control"
                      value={generalSettings.phone}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, phone: e.target.value })}
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold">Alternative Phone</label>
                    <input
                      type="text"
                      className="form-control"
                      value={generalSettings.altPhone}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, altPhone: e.target.value })}
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold">Address</label>
                    <input
                      type="text"
                      className="form-control"
                      value={generalSettings.address}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, address: e.target.value })}
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold">City</label>
                    <input
                      type="text"
                      className="form-control"
                      value={generalSettings.city}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, city: e.target.value })}
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold">Country</label>
                    <input
                      type="text"
                      className="form-control"
                      value={generalSettings.country}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, country: e.target.value })}
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold">Postal Code</label>
                    <input
                      type="text"
                      className="form-control"
                      value={generalSettings.postalCode}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, postalCode: e.target.value })}
                    />
                  </div>
                </div>

                <div className="d-flex justify-content-end gap-2 mt-4 pt-3 border-top">
                  <button type="button" className="btn btn-outline-secondary" onClick={() => setGeneralSettings(initialGeneral)}>
                    Reset
                  </button>
                  <button type="submit" className="btn btn-luxury-gold">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* 2. WEBSITE SETTINGS */}
          {activeTab === 'website' && (
            <div className="luxury-card p-4">
              <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
                <h5 className="section-title brand-font mb-0">Website Configuration</h5>
                <i className="bi bi-globe text-gold fs-4"></i>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); triggerSaveFeedback('Website'); }}>
                <div className="row g-3 mb-4">
                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold">Website Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={websiteSettings.websiteName}
                      onChange={(e) => setWebsiteSettings({ ...websiteSettings, websiteName: e.target.value })}
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold">SEO Title</label>
                    <input
                      type="text"
                      className="form-control"
                      value={websiteSettings.websiteTitle}
                      onChange={(e) => setWebsiteSettings({ ...websiteSettings, websiteTitle: e.target.value })}
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label small fw-semibold">Meta Description</label>
                    <textarea
                      className="form-control"
                      rows="2"
                      value={websiteSettings.websiteDescription}
                      onChange={(e) => setWebsiteSettings({ ...websiteSettings, websiteDescription: e.target.value })}
                    ></textarea>
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold">Website URL</label>
                    <input
                      type="text"
                      className="form-control"
                      value={websiteSettings.websiteUrl}
                      onChange={(e) => setWebsiteSettings({ ...websiteSettings, websiteUrl: e.target.value })}
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold">Favicon Upload (UI Mock)</label>
                    <input type="file" className="form-control" />
                  </div>
                </div>

                <h6 className="fw-bold text-navy mb-3">Homepage Toggles</h6>
                <div className="p-3 bg-light-cream rounded border mb-4">
                  <div className="form-check form-switch mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="websiteActive"
                      checked={websiteSettings.isActive}
                      onChange={(e) => setWebsiteSettings({ ...websiteSettings, isActive: e.target.checked })}
                    />
                    <label className="form-check-label fw-semibold small" htmlFor="websiteActive">
                      Website Active (Publicly accessible)
                    </label>
                  </div>
                  <div className="form-check form-switch mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="maintenanceMode"
                      checked={websiteSettings.maintenanceMode}
                      onChange={(e) => setWebsiteSettings({ ...websiteSettings, maintenanceMode: e.target.checked })}
                    />
                    <label className="form-check-label fw-semibold small" htmlFor="maintenanceMode">
                      Maintenance Mode
                    </label>
                  </div>
                  <div className="form-check form-switch mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="showBookingBtn"
                      checked={websiteSettings.showBookingBtn}
                      onChange={(e) => setWebsiteSettings({ ...websiteSettings, showBookingBtn: e.target.checked })}
                    />
                    <label className="form-check-label fw-semibold small" htmlFor="showBookingBtn">
                      Show Direct Booking Button
                    </label>
                  </div>
                  <div className="form-check form-switch mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="showContactInfo"
                      checked={websiteSettings.showContactInfo}
                      onChange={(e) => setWebsiteSettings({ ...websiteSettings, showContactInfo: e.target.checked })}
                    />
                    <label className="form-check-label fw-semibold small" htmlFor="showContactInfo">
                      Show Contact Information
                    </label>
                  </div>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="showSocialLinks"
                      checked={websiteSettings.showSocialLinks}
                      onChange={(e) => setWebsiteSettings({ ...websiteSettings, showSocialLinks: e.target.checked })}
                    />
                    <label className="form-check-label fw-semibold small" htmlFor="showSocialLinks">
                      Show Social Media Links
                    </label>
                  </div>
                </div>

                <div className="d-flex justify-content-end gap-2 pt-3 border-top">
                  <button type="button" className="btn btn-outline-secondary" onClick={() => setWebsiteSettings(initialWebsite)}>
                    Reset
                  </button>
                  <button type="submit" className="btn btn-luxury-gold">
                    Save Website Settings
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* 3. BOOKING SETTINGS */}
          {activeTab === 'booking' && (
            <div className="luxury-card p-4">
              <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
                <h5 className="section-title brand-font mb-0">Booking Configuration</h5>
                <i className="bi bi-calendar-check text-gold fs-4"></i>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); triggerSaveFeedback('Booking'); }}>
                <div className="row g-3 mb-4">
                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold">Check-in Time</label>
                    <input
                      type="time"
                      className="form-control"
                      value={bookingSettings.checkInTime}
                      onChange={(e) => setBookingSettings({ ...bookingSettings, checkInTime: e.target.value })}
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold">Check-out Time</label>
                    <input
                      type="time"
                      className="form-control"
                      value={bookingSettings.checkOutTime}
                      onChange={(e) => setBookingSettings({ ...bookingSettings, checkOutTime: e.target.value })}
                    />
                  </div>
                  <div className="col-12 col-md-4">
                    <label className="form-label small fw-semibold">Minimum Stay (Nights)</label>
                    <input
                      type="number"
                      className="form-control"
                      value={bookingSettings.minStay}
                      onChange={(e) => setBookingSettings({ ...bookingSettings, minStay: e.target.value })}
                    />
                  </div>
                  <div className="col-12 col-md-4">
                    <label className="form-label small fw-semibold">Maximum Stay (Nights)</label>
                    <input
                      type="number"
                      className="form-control"
                      value={bookingSettings.maxStay}
                      onChange={(e) => setBookingSettings({ ...bookingSettings, maxStay: e.target.value })}
                    />
                  </div>
                  <div className="col-12 col-md-4">
                    <label className="form-label small fw-semibold">Max Guests / Room</label>
                    <input
                      type="number"
                      className="form-control"
                      value={bookingSettings.maxGuests}
                      onChange={(e) => setBookingSettings({ ...bookingSettings, maxGuests: e.target.value })}
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold">Booking Confirmation Policy</label>
                    <select
                      className="form-select"
                      value={bookingSettings.confirmationType}
                      onChange={(e) => setBookingSettings({ ...bookingSettings, confirmationType: e.target.value })}
                    >
                      <option value="Automatic">Automatic Confirmation</option>
                      <option value="Manual">Manual Approval Required</option>
                    </select>
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold">Default Currency</label>
                    <select
                      className="form-select"
                      value={bookingSettings.defaultCurrency}
                      onChange={(e) => setBookingSettings({ ...bookingSettings, defaultCurrency: e.target.value })}
                    >
                      <option value="USD">USD ($)</option>
                      <option value="LKR">LKR (Rs)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                    </select>
                  </div>
                </div>

                <h6 className="fw-bold text-navy mb-3">Booking Controls</h6>
                <div className="p-3 bg-light-cream rounded border mb-4">
                  <div className="form-check form-switch mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="allowCancellation"
                      checked={bookingSettings.allowCancellation}
                      onChange={(e) => setBookingSettings({ ...bookingSettings, allowCancellation: e.target.checked })}
                    />
                    <label className="form-check-label fw-semibold small" htmlFor="allowCancellation">
                      Allow Guest Cancellations
                    </label>
                  </div>
                  <div className="form-check form-switch mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="allowSameDay"
                      checked={bookingSettings.allowSameDay}
                      onChange={(e) => setBookingSettings({ ...bookingSettings, allowSameDay: e.target.checked })}
                    />
                    <label className="form-check-label fw-semibold small" htmlFor="allowSameDay">
                      Allow Same-Day Booking
                    </label>
                  </div>
                  <div className="form-check form-switch mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="requirePhone"
                      checked={bookingSettings.requirePhone}
                      onChange={(e) => setBookingSettings({ ...bookingSettings, requirePhone: e.target.checked })}
                    />
                    <label className="form-check-label fw-semibold small" htmlFor="requirePhone">
                      Require Guest Phone Number
                    </label>
                  </div>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="requireEmail"
                      checked={bookingSettings.requireEmail}
                      onChange={(e) => setBookingSettings({ ...bookingSettings, requireEmail: e.target.checked })}
                    />
                    <label className="form-check-label fw-semibold small" htmlFor="requireEmail">
                      Require Guest Email Address
                    </label>
                  </div>
                </div>

                <div className="d-flex justify-content-end gap-2 pt-3 border-top">
                  <button type="button" className="btn btn-outline-secondary" onClick={() => setBookingSettings(initialBooking)}>
                    Reset
                  </button>
                  <button type="submit" className="btn btn-luxury-gold">
                    Save Booking Settings
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* 4. NOTIFICATION SETTINGS */}
          {activeTab === 'notifications' && (
            <div className="luxury-card p-4">
              <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
                <h5 className="section-title brand-font mb-0">Notification Preferences</h5>
                <i className="bi bi-bell text-gold fs-4"></i>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); triggerSaveFeedback('Notification'); }}>
                <h6 className="fw-bold text-navy mb-3">Email Notifications</h6>
                <div className="p-3 bg-light-cream rounded border mb-4">
                  <div className="form-check form-switch mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="emailNewBooking"
                      checked={notificationSettings.emailNewBooking}
                      onChange={(e) => setNotificationSettings({ ...notificationSettings, emailNewBooking: e.target.checked })}
                    />
                    <label className="form-check-label fw-semibold small" htmlFor="emailNewBooking">
                      New Booking Alert
                    </label>
                  </div>
                  <div className="form-check form-switch mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="emailCancellation"
                      checked={notificationSettings.emailCancellation}
                      onChange={(e) => setNotificationSettings({ ...notificationSettings, emailCancellation: e.target.checked })}
                    />
                    <label className="form-check-label fw-semibold small" htmlFor="emailCancellation">
                      Booking Cancellation Alert
                    </label>
                  </div>
                  <div className="form-check form-switch mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="emailRegistration"
                      checked={notificationSettings.emailRegistration}
                      onChange={(e) => setNotificationSettings({ ...notificationSettings, emailRegistration: e.target.checked })}
                    />
                    <label className="form-check-label fw-semibold small" htmlFor="emailRegistration">
                      New Customer Registration
                    </label>
                  </div>
                  <div className="form-check form-switch mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="emailContactMsg"
                      checked={notificationSettings.emailContactMsg}
                      onChange={(e) => setNotificationSettings({ ...notificationSettings, emailContactMsg: e.target.checked })}
                    />
                    <label className="form-check-label fw-semibold small" htmlFor="emailContactMsg">
                      New Contact Message
                    </label>
                  </div>
                  <div className="form-check form-switch mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="emailAdminMsg"
                      checked={notificationSettings.emailAdminMsg}
                      onChange={(e) => setNotificationSettings({ ...notificationSettings, emailAdminMsg: e.target.checked })}
                    />
                    <label className="form-check-label fw-semibold small" htmlFor="emailAdminMsg">
                      New Internal Concierge Message
                    </label>
                  </div>
                  <div className="form-check form-switch mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="emailRoomStatus"
                      checked={notificationSettings.emailRoomStatus}
                      onChange={(e) => setNotificationSettings({ ...notificationSettings, emailRoomStatus: e.target.checked })}
                    />
                    <label className="form-check-label fw-semibold small" htmlFor="emailRoomStatus">
                      Room Status Changes
                    </label>
                  </div>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="emailSystemAlerts"
                      checked={notificationSettings.emailSystemAlerts}
                      onChange={(e) => setNotificationSettings({ ...notificationSettings, emailSystemAlerts: e.target.checked })}
                    />
                    <label className="form-check-label fw-semibold small" htmlFor="emailSystemAlerts">
                      Critical System Security Alerts
                    </label>
                  </div>
                </div>

                <h6 className="fw-bold text-navy mb-3">Browser Alerts</h6>
                <div className="p-3 bg-light-cream rounded border mb-4">
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="browserNotifications"
                      checked={notificationSettings.browserNotifications}
                      onChange={(e) => setNotificationSettings({ ...notificationSettings, browserNotifications: e.target.checked })}
                    />
                    <label className="form-check-label fw-semibold small" htmlFor="browserNotifications">
                      Enable Desktop Push Notifications
                    </label>
                  </div>
                </div>

                <div className="d-flex justify-content-end gap-2 pt-3 border-top">
                  <button type="button" className="btn btn-outline-secondary" onClick={() => setNotificationSettings(initialNotifications)}>
                    Reset
                  </button>
                  <button type="submit" className="btn btn-luxury-gold">
                    Save Notification Settings
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* 5. SOCIAL MEDIA SETTINGS */}
          {activeTab === 'social' && (
            <div className="luxury-card p-4">
              <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
                <h5 className="section-title brand-font mb-0">Social Media Links</h5>
                <i className="bi bi-share text-gold fs-4"></i>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); triggerSaveFeedback('Social Media'); }}>
                <div className="row g-3 mb-4">
                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold">Facebook</label>
                    <div className="input-group">
                      <span className="input-group-text bg-white"><i className="bi bi-facebook text-primary"></i></span>
                      <input
                        type="text"
                        className="form-control"
                        value={socialSettings.facebook}
                        onChange={(e) => setSocialSettings({ ...socialSettings, facebook: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold">Instagram</label>
                    <div className="input-group">
                      <span className="input-group-text bg-white"><i className="bi bi-instagram text-danger"></i></span>
                      <input
                        type="text"
                        className="form-control"
                        value={socialSettings.instagram}
                        onChange={(e) => setSocialSettings({ ...socialSettings, instagram: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold">WhatsApp</label>
                    <div className="input-group">
                      <span className="input-group-text bg-white"><i className="bi bi-whatsapp text-success"></i></span>
                      <input
                        type="text"
                        className="form-control"
                        value={socialSettings.whatsapp}
                        onChange={(e) => setSocialSettings({ ...socialSettings, whatsapp: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold">YouTube</label>
                    <div className="input-group">
                      <span className="input-group-text bg-white"><i className="bi bi-youtube text-danger"></i></span>
                      <input
                        type="text"
                        className="form-control"
                        value={socialSettings.youtube}
                        onChange={(e) => setSocialSettings({ ...socialSettings, youtube: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold">TikTok</label>
                    <div className="input-group">
                      <span className="input-group-text bg-white"><i className="bi bi-tiktok text-dark"></i></span>
                      <input
                        type="text"
                        className="form-control"
                        value={socialSettings.tiktok}
                        onChange={(e) => setSocialSettings({ ...socialSettings, tiktok: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold">X / Twitter</label>
                    <div className="input-group">
                      <span className="input-group-text bg-white"><i className="bi bi-twitter-x text-dark"></i></span>
                      <input
                        type="text"
                        className="form-control"
                        value={socialSettings.twitter}
                        onChange={(e) => setSocialSettings({ ...socialSettings, twitter: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-end gap-2 pt-3 border-top">
                  <button type="button" className="btn btn-outline-secondary" onClick={() => setSocialSettings(initialSocial)}>
                    Reset
                  </button>
                  <button type="submit" className="btn btn-luxury-gold">
                    Save Social Media Settings
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* 6. SYSTEM SETTINGS */}
          {activeTab === 'system' && (
            <div className="luxury-card p-4">
              <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
                <h5 className="section-title brand-font mb-0">System Preferences</h5>
                <i className="bi bi-sliders text-gold fs-4"></i>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); triggerSaveFeedback('System'); }}>
                <div className="row g-3 mb-4">
                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold">Admin Panel Language</label>
                    <select
                      className="form-select"
                      value={systemSettings.language}
                      onChange={(e) => setSystemSettings({ ...systemSettings, language: e.target.value })}
                    >
                      <option value="English">English</option>
                      <option value="Sinhala">Sinhala</option>
                      <option value="French">French</option>
                      <option value="German">German</option>
                    </select>
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold">Timezone</label>
                    <select
                      className="form-select"
                      value={systemSettings.timezone}
                      onChange={(e) => setSystemSettings({ ...systemSettings, timezone: e.target.value })}
                    >
                      <option value="Asia/Colombo">Asia/Colombo (GMT+5:30)</option>
                      <option value="UTC">UTC (GMT+0:00)</option>
                      <option value="America/New_York">America/New_York (GMT-5:00)</option>
                    </select>
                  </div>

                  <div className="col-12 col-md-4">
                    <label className="form-label small fw-semibold">Date Format</label>
                    <select
                      className="form-select"
                      value={systemSettings.dateFormat}
                      onChange={(e) => setSystemSettings({ ...systemSettings, dateFormat: e.target.value })}
                    >
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>

                  <div className="col-12 col-md-4">
                    <label className="form-label small fw-semibold">Time Format</label>
                    <select
                      className="form-select"
                      value={systemSettings.timeFormat}
                      onChange={(e) => setSystemSettings({ ...systemSettings, timeFormat: e.target.value })}
                    >
                      <option value="12 Hour">12 Hour (AM/PM)</option>
                      <option value="24 Hour">24 Hour</option>
                    </select>
                  </div>

                  <div className="col-12 col-md-4">
                    <label className="form-label small fw-semibold">Items Per Page</label>
                    <select
                      className="form-select"
                      value={systemSettings.itemsPerPage}
                      onChange={(e) => setSystemSettings({ ...systemSettings, itemsPerPage: e.target.value })}
                    >
                      <option value={10}>10 Items</option>
                      <option value={20}>20 Items</option>
                      <option value={50}>50 Items</option>
                    </select>
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold">Theme Aesthetics</label>
                    <select
                      className="form-select"
                      value={systemSettings.theme}
                      onChange={(e) => setSystemSettings({ ...systemSettings, theme: e.target.value })}
                    >
                      <option value="Light">Luxury Light (Default)</option>
                      <option value="Dark">Navy Dark</option>
                      <option value="System Default">System Default</option>
                    </select>
                  </div>
                </div>

                <h6 className="fw-bold text-navy mb-3">System Audit Controls</h6>
                <div className="p-3 bg-light-cream rounded border mb-4">
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="enableLogs"
                      checked={systemSettings.enableLogs}
                      onChange={(e) => setSystemSettings({ ...systemSettings, enableLogs: e.target.checked })}
                    />
                    <label className="form-check-label fw-semibold small" htmlFor="enableLogs">
                      Enable System Activity Logs
                    </label>
                  </div>
                </div>

                <div className="d-flex justify-content-end gap-2 pt-3 border-top">
                  <button type="button" className="btn btn-outline-secondary" onClick={() => setSystemSettings(initialSystem)}>
                    Reset
                  </button>
                  <button type="submit" className="btn btn-luxury-gold">
                    Save System Settings
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* 7. SECURITY SETTINGS */}
          {activeTab === 'security' && (
            <div className="luxury-card p-4">
              <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
                <h5 className="section-title brand-font mb-0">Security Preferences</h5>
                <i className="bi bi-shield-lock text-gold fs-4"></i>
              </div>

              {/* Security Warning Box */}
              <div className="alert alert-warning border-warning d-flex align-items-center mb-4">
                <i className="bi bi-exclamation-triangle-fill text-warning fs-4 me-3"></i>
                <div className="small">
                  <strong>Security Notice:</strong> Security settings directly affect administrator access and account protection across the portal.
                </div>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); triggerSaveFeedback('Security'); }}>
                <div className="row g-3 mb-4">
                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold">Session Timeout</label>
                    <select
                      className="form-select"
                      value={securitySettings.sessionTimeout}
                      onChange={(e) => setSecuritySettings({ ...securitySettings, sessionTimeout: e.target.value })}
                    >
                      <option value="15 minutes">15 minutes</option>
                      <option value="30 minutes">30 minutes</option>
                      <option value="1 hour">1 hour</option>
                    </select>
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold">Max Login Attempts</label>
                    <input
                      type="number"
                      className="form-control"
                      value={securitySettings.maxLoginAttempts}
                      onChange={(e) => setSecuritySettings({ ...securitySettings, maxLoginAttempts: e.target.value })}
                    />
                  </div>
                </div>

                <h6 className="fw-bold text-navy mb-3">Security Controls</h6>
                <div className="p-3 bg-light-cream rounded border mb-4">
                  <div className="form-check form-switch mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="twoFactor"
                      checked={securitySettings.twoFactor}
                      onChange={(e) => setSecuritySettings({ ...securitySettings, twoFactor: e.target.checked })}
                    />
                    <label className="form-check-label fw-semibold small" htmlFor="twoFactor">
                      Two-Factor Authentication (2FA)
                    </label>
                  </div>

                  <div className="form-check form-switch mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="loginNotifications"
                      checked={securitySettings.loginNotifications}
                      onChange={(e) => setSecuritySettings({ ...securitySettings, loginNotifications: e.target.checked })}
                    />
                    <label className="form-check-label fw-semibold small" htmlFor="loginNotifications">
                      New Login Email Notifications
                    </label>
                  </div>

                  <div className="form-check form-switch mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="autoLogout"
                      checked={securitySettings.autoLogout}
                      onChange={(e) => setSecuritySettings({ ...securitySettings, autoLogout: e.target.checked })}
                    />
                    <label className="form-check-label fw-semibold small" htmlFor="autoLogout">
                      Auto Logout on Inactivity
                    </label>
                  </div>

                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="showLoginActivity"
                      checked={securitySettings.showLoginActivity}
                      onChange={(e) => setSecuritySettings({ ...securitySettings, showLoginActivity: e.target.checked })}
                    />
                    <label className="form-check-label fw-semibold small" htmlFor="showLoginActivity">
                      Track Recent Login Activity
                    </label>
                  </div>
                </div>

                <div className="d-flex justify-content-end gap-2 pt-3 border-top">
                  <button type="button" className="btn btn-outline-secondary" onClick={() => setSecuritySettings(initialSecurity)}>
                    Reset
                  </button>
                  <button type="submit" className="btn btn-luxury-gold">
                    Save Security Settings
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;