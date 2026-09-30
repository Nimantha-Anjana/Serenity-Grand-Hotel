import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const { login, API } = useAuth();

  const [mode, setMode] = useState('login'); // 'login' | 'forgot' | 'reset-sent'
  const [form, setForm] = useState({ email: '', password: '' });
  const [forgotEmail, setForgotEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  }

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed.');
      login(data.token, data.customer);
      navigate('/profile');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleForgotPassword(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API}/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: forgotEmail }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Error sending reset email.');
      setSuccess(data.message);
      setMode('reset-sent');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      <div className="login-backdrop" />

      <div className="login-card">
        {/* Header */}
        <div className="login-header">
          <Link to="/" className="login-brand">
            <span className="login-brand-main">SERENITY</span>
            <span className="login-brand-sub">GRAND HOTEL</span>
          </Link>

          {mode === 'login' && <h2 className="login-title">Welcome Back</h2>}
          {mode === 'forgot' && <h2 className="login-title">Forgot Password</h2>}
          {mode === 'reset-sent' && <h2 className="login-title">Check Your Email</h2>}
        </div>

        {/* ── LOGIN FORM ── */}
        {mode === 'login' && (
          <form className="login-form" onSubmit={handleLogin} noValidate>
            <p className="login-subtitle">Sign in to access your profile and bookings</p>

            {error && <div className="auth-error">{error}</div>}

            <div className="form-group">
              <label htmlFor="login-email">Email Address</label>
              <div className="input-icon-wrap">
                <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <input
                  id="login-email"
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="login-password">Password</label>
              <div className="input-icon-wrap">
                <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                  )}
                </button>
              </div>
            </div>

            <div className="login-forgot-row">
              <button type="button" className="link-btn" onClick={() => { setMode('forgot'); setError(''); }}>
                Forgot Password?
              </button>
            </div>

            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? <span className="spinner" /> : 'Sign In'}
            </button>

            <p className="auth-switch">
              Don't have an account?{' '}
              <Link to="/signup" className="auth-switch-link">Create Account</Link>
            </p>
          </form>
        )}

        {/* ── FORGOT PASSWORD FORM ── */}
        {mode === 'forgot' && (
          <form className="login-form" onSubmit={handleForgotPassword} noValidate>
            <p className="login-subtitle">Enter your email and we'll send a password reset link.</p>
            {error && <div className="auth-error">{error}</div>}

            <div className="form-group">
              <label htmlFor="forgot-email">Email Address</label>
              <div className="input-icon-wrap">
                <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <input
                  id="forgot-email"
                  type="email"
                  placeholder="your@email.com"
                  value={forgotEmail}
                  onChange={(e) => { setForgotEmail(e.target.value); setError(''); }}
                  required
                />
              </div>
            </div>

            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? <span className="spinner" /> : 'Send Reset Link'}
            </button>

            <p className="auth-switch">
              <button type="button" className="link-btn" onClick={() => { setMode('login'); setError(''); }}>
                ← Back to Login
              </button>
            </p>
          </form>
        )}

        {/* ── RESET EMAIL SENT ── */}
        {mode === 'reset-sent' && (
          <div className="login-form">
            <div className="success-icon">✉️</div>
            <p className="login-subtitle success-text">{success}</p>
            <button
              type="button"
              className="auth-submit-btn"
              onClick={() => { setMode('login'); setSuccess(''); setForgotEmail(''); }}
            >
              Back to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
