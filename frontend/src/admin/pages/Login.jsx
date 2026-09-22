import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Login.css';

/**
 * Login Page Component for Serenity Grand Hotel Admin Portal.
 * Features demo credentials validation, password visibility toggling,
 * loading spinner feedback, and full responsive split-screen presentation.
 */
const Login = () => {
  const navigate = useNavigate();

  // Form Fields State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  // UI Control States
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  // Form Validation Logic
  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      errors.email = 'Email address is required.';
    } else if (!emailRegex.test(email)) {
      errors.email = 'Please enter a valid email address.';
    }

    if (!password) {
      errors.password = 'Password is required.';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Demo Login Handler
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulated API authentication delay
    setTimeout(() => {
      // Demo Credentials Verification
      if (email === 'admin@serenitygrand.com' && password === 'admin123') {
        setIsLoading(false);
        navigate('/admin');
      } else {
        setIsLoading(false);
        setErrorMessage('Invalid email or password.');
      }
    }, 1000);
  };

  return (
    <div className="login-wrapper">
      <div className="container-fluid p-0 h-100">
        <div className="row g-0 h-100">
          {/* LEFT SIDE: Luxury Hotel Hero Image Overlay */}
          <div className="col-lg-6 d-none d-lg-block login-hero-side">
            <div className="login-hero-overlay">
              <div className="hero-content-box">
                <div className="hero-brand-badge mb-3">
                  <i className="bi bi-bank2 me-2"></i>
                  <span>SERENITY GRAND HOTEL</span>
                </div>
                <h1 className="hero-heading brand-font">Luxury • Comfort • Excellence</h1>
                <div className="gold-accent-line my-3"></div>
                <p className="hero-subtext">
                  Manage your hotel operations, guest stays, and reservations from one powerful dashboard.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Admin Login Form Area */}
          <div className="col-12 col-lg-6 login-form-side">
            <div className="form-center-box">
              {/* Header Logo & Titles */}
              <div className="text-center mb-4">
                <div className="login-logo-icon mx-auto mb-2">
                  <i className="bi bi-bank2"></i>
                </div>
                <h2 className="brand-font login-title mb-1">Welcome Back</h2>
                <p className="text-muted small">Sign in to access the admin dashboard.</p>
              </div>

              {/* Demo Credentials Helper Box */}
              <div className="demo-credentials-box mb-3">
                <i className="bi bi-info-circle-fill me-2 text-gold"></i>
                <span><strong>Demo:</strong> admin@serenitygrand.com | admin123</span>
              </div>

              {/* Error Alert Message */}
              {errorMessage && (
                <div className="alert alert-danger custom-alert d-flex align-items-center mb-3" role="alert">
                  <i className="bi bi-exclamation-triangle-fill me-2 fs-5"></i>
                  <div>{errorMessage}</div>
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleLoginSubmit} noValidate>
                {/* Email Field */}
                <div className="mb-3">
                  <label className="form-label small fw-semibold">Email Address</label>
                  <div className="input-group">
                    <span className="input-group-text bg-white border-end-0">
                      <i className="bi bi-envelope text-muted"></i>
                    </span>
                    <input
                      type="email"
                      className={`form-control border-start-0 ${fieldErrors.email ? 'is-invalid' : ''}`}
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoading}
                    />
                    {fieldErrors.email && (
                      <div className="invalid-feedback d-block">{fieldErrors.email}</div>
                    )}
                  </div>
                </div>

                {/* Password Field */}
                <div className="mb-3">
                  <label className="form-label small fw-semibold">Password</label>
                  <div className="input-group">
                    <span className="input-group-text bg-white border-end-0">
                      <i className="bi bi-lock text-muted"></i>
                    </span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className={`form-control border-start-0 border-end-0 ${fieldErrors.password ? 'is-invalid' : ''}`}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-toggle-password border-start-0"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                    </button>
                    {fieldErrors.password && (
                      <div className="invalid-feedback d-block">{fieldErrors.password}</div>
                    )}
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="rememberMeCheck"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <label className="form-check-label small text-muted" htmlFor="rememberMeCheck">
                      Remember me
                    </label>
                  </div>
                  <button
                    type="button"
                    className="btn btn-link p-0 text-decoration-none small forgot-link"
                    onClick={() => alert('Password reset is disabled in demo mode.')}
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn btn-luxury-gold-login w-100 py-2 fw-semibold"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In <i className="bi bi-box-arrow-in-right ms-2"></i>
                    </>
                  )}
                </button>
              </form>

              {/* Login Footer */}
              <div className="text-center mt-5 pt-3 border-top">
                <p className="extra-small text-muted mb-0">© 2026 Serenity Grand Hotel</p>
                <span className="extra-small text-gold fw-bold">Admin Portal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;