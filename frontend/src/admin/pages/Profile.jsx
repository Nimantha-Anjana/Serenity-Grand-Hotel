import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Profile.css';

/**
 * Profile Page Component for Serenity Grand Hotel Admin Panel.
 * Handles profile information viewing/editing, local image preview upload,
 * account status overview, interactive password update validation, and account activity timeline.
 */
const Profile = () => {
  // 1. Profile Image & Personal Info State
  const [profileImage, setProfileImage] = useState(
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
  );

  const [personalInfo, setPersonalInfo] = useState({
    fullName: 'Admin User',
    email: 'admin@serenitygrand.com',
    phone: '+94 77 123 4567',
    dob: '1995-05-15',
    gender: 'Male',
    address: 'No. 123, Galle Road, Colombo 03',
    city: 'Colombo',
    country: 'Sri Lanka'
  });

  // 2. Change Password State
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  // Alerts & Messages
  const [personalSuccessMsg, setPersonalSuccessMsg] = useState('');
  const [passSuccessMsg, setPassSuccessMsg] = useState('');
  const [passErrorMsg, setPassErrorMsg] = useState('');

  // 3. Image Upload Preview Handler (Frontend Only)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  // 4. Personal Info Form Submit Handler
  const handlePersonalSubmit = (e) => {
    e.preventDefault();
    setPersonalSuccessMsg('Personal information updated successfully!');
    setTimeout(() => setPersonalSuccessMsg(''), 4000);
  };

  // 5. Password Update Form Submit Handler & Validation
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setPassErrorMsg('');
    setPassSuccessMsg('');

    if (!passwordData.currentPassword) {
      setPassErrorMsg('Current password is required.');
      return;
    }
    if (!passwordData.newPassword) {
      setPassErrorMsg('New password is required.');
      return;
    }
    if (passwordData.newPassword.length < 6) {
      setPassErrorMsg('New password must be at least 6 characters.');
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPassErrorMsg('New password and confirmation do not match.');
      return;
    }

    setPassSuccessMsg('Password updated successfully! (UI Demo)');
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });

    setTimeout(() => setPassSuccessMsg(''), 4000);
  };

  // Static Activity List Data
  const recentActivities = [
    {
      id: 1,
      title: 'Logged in to admin panel',
      desc: 'Successful authentication from IP 192.168.1.45',
      time: 'Today, 09:45 AM',
      icon: 'bi-box-arrow-in-right',
      type: 'login'
    },
    {
      id: 2,
      title: 'Updated profile information',
      desc: 'Changed phone number and personal details',
      time: 'Yesterday, 04:20 PM',
      icon: 'bi-person-check',
      type: 'profile'
    },
    {
      id: 3,
      title: 'Added a new room',
      desc: 'Created Room #501 (Presidential Penthouse)',
      time: 'Sep 18, 2026, 02:15 PM',
      icon: 'bi-door-open',
      type: 'room'
    },
    {
      id: 4,
      title: 'Updated hotel settings',
      desc: 'Modified tax configuration and default currency',
      time: 'Sep 15, 2026, 11:30 AM',
      icon: 'bi-sliders',
      type: 'settings'
    },
    {
      id: 5,
      title: 'Changed account password',
      desc: 'Security credentials updated successfully',
      time: 'Aug 28, 2026, 10:00 AM',
      icon: 'bi-shield-lock',
      type: 'security'
    }
  ];

  return (
    <div className="profile-container">
      {/* 1. Page Header & Breadcrumbs */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
        <div>
          <h2 className="brand-font page-title">Admin Profile</h2>
          <p className="text-muted small mb-0">Manage your personal information, security, and account settings.</p>
        </div>
      </div>

      {/* 2. Large Profile Header Card */}
      <div className="luxury-card profile-header-card p-4 mb-4">
        <div className="d-flex flex-column flex-sm-row align-items-center gap-4">
          {/* Avatar with Camera Overlay */}
          <div className="profile-avatar-wrapper">
            <img src={profileImage} alt="Admin Avatar" className="profile-avatar-img" />
            <label htmlFor="avatar-upload" className="btn-change-photo" title="Change Photo">
              <i className="bi bi-camera-fill"></i>
              <input
                type="file"
                id="avatar-upload"
                accept="image/*"
                onChange={handleImageChange}
                className="d-none"
              />
            </label>
          </div>

          {/* Profile Header Details */}
          <div className="profile-header-details text-center text-sm-start flex-grow-1">
            <div className="d-flex flex-column flex-sm-row align-items-center gap-2 mb-1">
              <h3 className="brand-font profile-name mb-0">{personalInfo.fullName}</h3>
              <span className="badge badge-active">
                <i className="bi bi-circle-fill me-1"></i>Active
              </span>
            </div>
            <p className="profile-role text-gold fw-semibold mb-2">Administrator</p>

            <div className="d-flex flex-wrap justify-content-center justify-content-sm-start gap-3 profile-meta-list text-muted small">
              <span><i className="bi bi-envelope me-1"></i>{personalInfo.email}</span>
              <span><i className="bi bi-telephone me-1"></i>{personalInfo.phone}</span>
              <span><i className="bi bi-calendar3 me-1"></i>Member since Jan 2026</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout Grid */}
      <div className="row g-4">
        {/* LEFT COLUMN: Personal Info & Account Info */}
        <div className="col-12 col-xl-8">
          {/* Personal Information Form Card */}
          <div className="luxury-card p-4 mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="section-title brand-font mb-0">Personal Information</h5>
              <i className="bi bi-person-lines-fill text-gold fs-5"></i>
            </div>

            {personalSuccessMsg && (
              <div className="alert alert-success py-2 px-3 small d-flex align-items-center mb-3">
                <i className="bi bi-check-circle-fill me-2"></i>{personalSuccessMsg}
              </div>
            )}

            <form onSubmit={handlePersonalSubmit}>
              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <label className="form-label small fw-semibold">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={personalInfo.fullName}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, fullName: e.target.value })}
                    required
                  />
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label small fw-semibold">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    value={personalInfo.email}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                    required
                  />
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label small fw-semibold">Phone Number</label>
                  <input
                    type="text"
                    className="form-control"
                    value={personalInfo.phone}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                  />
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label small fw-semibold">Date of Birth</label>
                  <input
                    type="date"
                    className="form-control"
                    value={personalInfo.dob}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, dob: e.target.value })}
                  />
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label small fw-semibold">Gender</label>
                  <select
                    className="form-select"
                    value={personalInfo.gender}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, gender: e.target.value })}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label small fw-semibold">City</label>
                  <input
                    type="text"
                    className="form-control"
                    value={personalInfo.city}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, city: e.target.value })}
                  />
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label small fw-semibold">Country</label>
                  <input
                    type="text"
                    className="form-control"
                    value={personalInfo.country}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, country: e.target.value })}
                  />
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label small fw-semibold">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    value={personalInfo.address}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, address: e.target.value })}
                  />
                </div>
              </div>

              <div className="d-flex justify-content-end gap-2 mt-4">
                <button type="button" className="btn btn-outline-secondary btn-sm px-3">
                  Cancel
                </button>
                <button type="submit" className="btn btn-luxury-gold btn-sm px-4">
                  Save Changes
                </button>
              </div>
            </form>
          </div>

          {/* Account Information Card */}
          <div className="luxury-card p-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="section-title brand-font mb-0">Account Information</h5>
              <i className="bi bi-shield-check text-navy fs-5"></i>
            </div>

            <div className="row g-3 account-info-grid">
              <div className="col-12 col-sm-6 col-md-4">
                <div className="info-box p-3 rounded bg-light-cream">
                  <span className="extra-small text-muted d-block">Username</span>
                  <span className="fw-bold text-navy">admin</span>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-4">
                <div className="info-box p-3 rounded bg-light-cream">
                  <span className="extra-small text-muted d-block">Role</span>
                  <span className="fw-bold text-navy">Administrator</span>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-4">
                <div className="info-box p-3 rounded bg-light-cream">
                  <span className="extra-small text-muted d-block">Account Status</span>
                  <span className="badge badge-active mt-1">Active</span>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-6">
                <div className="info-box p-3 rounded bg-light-cream">
                  <span className="extra-small text-muted d-block">Last Login</span>
                  <span className="fw-semibold text-navy">Today, 09:45 AM</span>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-6">
                <div className="info-box p-3 rounded bg-light-cream">
                  <span className="extra-small text-muted d-block">Account Created</span>
                  <span className="fw-semibold text-navy">January 10, 2026</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Change Password & Recent Activity */}
        <div className="col-12 col-xl-4">
          {/* Change Password Card */}
          <div className="luxury-card p-4 mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="section-title brand-font mb-0">Change Password</h5>
              <i className="bi bi-key-fill text-gold fs-5"></i>
            </div>

            {passSuccessMsg && (
              <div className="alert alert-success py-2 px-3 small d-flex align-items-center mb-3">
                <i className="bi bi-check-circle-fill me-2"></i>{passSuccessMsg}
              </div>
            )}

            {passErrorMsg && (
              <div className="alert alert-danger py-2 px-3 small d-flex align-items-center mb-3">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>{passErrorMsg}
              </div>
            )}

            <form onSubmit={handlePasswordSubmit}>
              {/* Current Password */}
              <div className="mb-3">
                <label className="form-label small fw-semibold">Current Password</label>
                <div className="input-group">
                  <span className="input-group-text bg-white border-end-0">
                    <i className="bi bi-lock text-muted"></i>
                  </span>
                  <input
                    type={showCurrentPass ? 'text' : 'password'}
                    className="form-control border-start-0 border-end-0"
                    placeholder="Enter current password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary border-start-0 btn-toggle-pass"
                    onClick={() => setShowCurrentPass(!showCurrentPass)}
                  >
                    <i className={`bi ${showCurrentPass ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div className="mb-3">
                <label className="form-label small fw-semibold">New Password</label>
                <div className="input-group">
                  <span className="input-group-text bg-white border-end-0">
                    <i className="bi bi-lock text-muted"></i>
                  </span>
                  <input
                    type={showNewPass ? 'text' : 'password'}
                    className="form-control border-start-0 border-end-0"
                    placeholder="Min 6 characters"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary border-start-0 btn-toggle-pass"
                    onClick={() => setShowNewPass(!showNewPass)}
                  >
                    <i className={`bi ${showNewPass ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                  </button>
                </div>
              </div>

              {/* Confirm New Password */}
              <div className="mb-4">
                <label className="form-label small fw-semibold">Confirm New Password</label>
                <div className="input-group">
                  <span className="input-group-text bg-white border-end-0">
                    <i className="bi bi-lock text-muted"></i>
                  </span>
                  <input
                    type={showConfirmPass ? 'text' : 'password'}
                    className="form-control border-start-0 border-end-0"
                    placeholder="Re-enter new password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary border-start-0 btn-toggle-pass"
                    onClick={() => setShowConfirmPass(!showConfirmPass)}
                  >
                    <i className={`bi ${showConfirmPass ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                  </button>
                </div>
              </div>

              <button type="submit" className="btn btn-luxury-navy w-100">
                Update Password
              </button>
            </form>
          </div>

          {/* Recent Account Activity Card */}
          <div className="luxury-card p-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="section-title brand-font mb-0">Recent Activity</h5>
              <i className="bi bi-clock-history text-navy fs-5"></i>
            </div>

            <div className="activity-timeline">
              {recentActivities.map((act) => (
                <div key={act.id} className="activity-item d-flex gap-3 mb-3">
                  <div className={`activity-icon-box ${act.type}`}>
                    <i className={`bi ${act.icon}`}></i>
                  </div>
                  <div className="activity-content flex-grow-1">
                    <h6 className="activity-title mb-0 fw-semibold text-navy">{act.title}</h6>
                    <p className="activity-desc text-muted mb-1 extra-small">{act.desc}</p>
                    <span className="activity-time extra-small text-muted">{act.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;