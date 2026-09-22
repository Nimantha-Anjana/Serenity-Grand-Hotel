import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import './SignUp.css';

function SignUp() {
  const navigate = useNavigate();
  const { login, API } = useAuth();

  const [step, setStep] = useState(1); // 1 = Details, 2 = OTP
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Step 1 data
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    nicNumber: '',
    password: '',
    confirmPassword: '',
  });
  const [avatar, setAvatar] = useState(null);
  
  // Step 2 data
  const [otp, setOtp] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleFileChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    
    if (form.password !== form.confirmPassword) {
      return setError('Passwords do not match');
    }

    setLoading(true);
    try {
      const formData = new FormData();
      Object.keys(form).forEach(key => {
        if (key !== 'confirmPassword') formData.append(key, form[key]);
      });
      if (avatar) formData.append('avatar', avatar);

      const res = await fetch(`${API}/register`, {
        method: 'POST',
        body: formData, // fetch automatically sets multipart/form-data boundary
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.message || 'Registration failed');
      
      if (data.devOtp) {
        setOtp(data.devOtp);
      }
      setStep(2); // Move to OTP
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const res = await fetch(`${API}/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, otp }),
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.message || 'Invalid OTP');
      
      login(data.token, data.customer);
      navigate('/profile');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      await fetch(`${API}/resend-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email }),
      });
      alert('A new OTP has been sent to your email.');
    } catch (err) {
      alert('Error resending OTP');
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-backdrop" />
      
      <div className="signup-card">
        <div className="signup-header">
          <h2 className="signup-title">{step === 1 ? 'Create Account' : 'Verify Email'}</h2>
          <p className="signup-subtitle">
            {step === 1 ? 'Join Serenity Grand Hotel' : `Enter the 6-digit code sent to ${form.email}`}
          </p>
        </div>

        <div className="signup-content">
          {error && <div className="auth-error">{error}</div>}

          {step === 1 && (
            <form onSubmit={handleRegister} className="signup-form">
              
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input type="text" name="name" value={form.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Email Address *</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} required />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="tel" name="phone" value={form.phone} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>NIC Number</label>
                  <input type="text" name="nicNumber" value={form.nicNumber} onChange={handleChange} />
                </div>
              </div>

              <div className="form-group">
                <label>Address</label>
                <input type="text" name="address" value={form.address} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>Profile Photo (Optional)</label>
                <input type="file" accept="image/*" onChange={handleFileChange} className="file-input" />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Password *</label>
                  <input type="password" name="password" value={form.password} onChange={handleChange} required minLength="6" />
                </div>
                <div className="form-group">
                  <label>Confirm Password *</label>
                  <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required />
                </div>
              </div>

              <button type="submit" className="auth-submit-btn" disabled={loading}>
                {loading ? <span className="spinner" /> : 'Create Account'}
              </button>

              <p className="auth-switch">
                Already have an account? <Link to="/login" className="auth-switch-link">Sign In</Link>
              </p>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleVerifyOtp} className="signup-form otp-form">
              <div className="form-group">
                <label>OTP Code</label>
                <input 
                  type="text" 
                  value={otp} 
                  onChange={(e) => setOtp(e.target.value)} 
                  placeholder="Enter 6-digit code"
                  maxLength="6"
                  required
                  className="otp-input"
                />
              </div>

              <button type="submit" className="auth-submit-btn" disabled={loading || otp.length < 6}>
                {loading ? <span className="spinner" /> : 'Verify & Complete'}
              </button>

              <div className="resend-row">
                <button type="button" onClick={handleResendOtp} className="link-btn">
                  Didn't receive it? Resend Code
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default SignUp;
