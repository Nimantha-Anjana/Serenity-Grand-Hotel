import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import CustomerProfile from '../models/CustomerProfile.js';
import { sendOtpEmail, sendResetEmail } from '../utils/sendEmail.js';

/* ─── helpers ─────────────────────────────────────────────────────────────── */

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function signToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

function safeCustomer(customer) {
  const { passwordHash, otpCode, otpExpiry, resetToken, resetTokenExpiry, ...safe } = customer.toJSON();
  return safe;
}

/* ─── REGISTER ────────────────────────────────────────────────────────────── */

export async function register(req, res) {
  try {
    const { name, email, phone, address, nicNumber, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email and password are required.' });
    }

    const existing = await CustomerProfile.findOne({ where: { email } });
    if (existing) {
      return res.status(409).json({ message: 'Email is already registered.' });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const otpCode = generateOtp();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 min

    // Handle avatar (uploaded file)
    const avatar = req.file ? `/uploads/${req.file.filename}` : null;

    const customer = await CustomerProfile.create({
      name,
      email,
      phone,
      address,
      nicNumber,
      passwordHash,
      avatar,
      otpCode,
      otpExpiry,
      isVerified: false,
    });

    // Send OTP email (non-blocking — don't fail registration if email fails)
    sendOtpEmail(email, otpCode).catch((err) =>
      console.error('OTP email error:', err.message)
    );

    res.status(201).json({
      message: 'Registration successful. Please check your email for the OTP code.',
      customerId: customer.id,
      email: customer.email,
      devOtp: process.env.NODE_ENV !== 'production' ? otpCode : undefined,
    });
  } catch (err) {
    console.error('register error:', err);
    res.status(500).json({ message: err.message || 'Server error during registration.' });
  }
}

/* ─── VERIFY OTP ──────────────────────────────────────────────────────────── */

export async function verifyOtp(req, res) {
  try {
    const { email, otp } = req.body;

    const customer = await CustomerProfile.findOne({ where: { email } });
    if (!customer) {
      return res.status(404).json({ message: 'Account not found.' });
    }
    if (customer.isVerified) {
      return res.status(400).json({ message: 'Email already verified.' });
    }
    if (customer.otpCode !== otp) {
      return res.status(400).json({ message: 'Incorrect OTP code.' });
    }
    if (new Date() > new Date(customer.otpExpiry)) {
      return res.status(400).json({ message: 'OTP code has expired. Request a new one.' });
    }

    await customer.update({ isVerified: true, otpCode: null, otpExpiry: null });

    const token = signToken(customer.id);
    res.json({ message: 'Email verified successfully!', token, customer: safeCustomer(customer) });
  } catch (err) {
    console.error('verifyOtp error:', err);
    res.status(500).json({ message: 'Server error during OTP verification.' });
  }
}

/* ─── RESEND OTP ──────────────────────────────────────────────────────────── */

export async function resendOtp(req, res) {
  try {
    const { email } = req.body;

    const customer = await CustomerProfile.findOne({ where: { email } });
    if (!customer) return res.status(404).json({ message: 'Account not found.' });
    if (customer.isVerified) return res.status(400).json({ message: 'Email already verified.' });

    const otpCode = generateOtp();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    await customer.update({ otpCode, otpExpiry });
    sendOtpEmail(email, otpCode).catch((err) => console.error('OTP resend error:', err.message));

    res.json({ message: 'A new OTP has been sent to your email.' });
  } catch (err) {
    console.error('resendOtp error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
}

/* ─── LOGIN ───────────────────────────────────────────────────────────────── */

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const customer = await CustomerProfile.findOne({ where: { email } });
    if (!customer) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }
    if (!customer.isVerified) {
      return res.status(403).json({ message: 'Please verify your email before logging in.' });
    }

    const match = await bcrypt.compare(password, customer.passwordHash);
    if (!match) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const token = signToken(customer.id);
    res.json({ message: 'Login successful.', token, customer: safeCustomer(customer) });
  } catch (err) {
    console.error('login error:', err);
    res.status(500).json({ message: 'Server error during login.' });
  }
}

/* ─── FORGOT PASSWORD ─────────────────────────────────────────────────────── */

export async function forgotPassword(req, res) {
  try {
    const { email } = req.body;
    const customer = await CustomerProfile.findOne({ where: { email } });

    // Always return 200 so we don't leak whether the email exists
    if (!customer) {
      return res.json({ message: 'If that email is registered you will receive a reset link.' });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await customer.update({ resetToken, resetTokenExpiry });

    const clientOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:5173';
    const resetLink = `${clientOrigin}/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`;

    sendResetEmail(email, resetLink).catch((err) =>
      console.error('Reset email error:', err.message)
    );

    res.json({ message: 'If that email is registered you will receive a reset link.' });
  } catch (err) {
    console.error('forgotPassword error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
}

/* ─── RESET PASSWORD ──────────────────────────────────────────────────────── */

export async function resetPassword(req, res) {
  try {
    const { email, token, newPassword } = req.body;

    const customer = await CustomerProfile.findOne({ where: { email, resetToken: token } });
    if (!customer) {
      return res.status(400).json({ message: 'Invalid or expired reset link.' });
    }
    if (new Date() > new Date(customer.resetTokenExpiry)) {
      return res.status(400).json({ message: 'Reset link has expired.' });
    }

    const passwordHash = await bcrypt.hash(newPassword, 12);
    await customer.update({ passwordHash, resetToken: null, resetTokenExpiry: null });

    res.json({ message: 'Password reset successfully. You can now log in.' });
  } catch (err) {
    console.error('resetPassword error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
}

/* ─── GET PROFILE (protected) ─────────────────────────────────────────────── */

export async function getProfile(req, res) {
  res.json(safeCustomer(req.customer));
}

/* ─── UPDATE PROFILE (protected) ─────────────────────────────────────────── */

export async function updateProfile(req, res) {
  try {
    const { name, phone, address, nicNumber } = req.body;
    const updateData = {};

    if (name !== undefined) updateData.name = name;
    if (phone !== undefined) updateData.phone = phone;
    if (address !== undefined) updateData.address = address;
    if (nicNumber !== undefined) updateData.nicNumber = nicNumber;

    if (req.file) {
      updateData.avatar = `/uploads/${req.file.filename}`;
    }

    await req.customer.update(updateData);

    // Re-fetch so we return fresh data
    const updated = await CustomerProfile.findByPk(req.customer.id, {
      attributes: { exclude: ['passwordHash', 'otpCode', 'otpExpiry', 'resetToken', 'resetTokenExpiry'] },
    });

    res.json({ message: 'Profile updated successfully.', customer: updated });
  } catch (err) {
    console.error('updateProfile error:', err);
    res.status(500).json({ message: 'Server error updating profile.' });
  }
}

/* ─── CHANGE PASSWORD (protected) ─────────────────────────────────────────── */

export async function changePassword(req, res) {
  try {
    const { currentPassword, newPassword } = req.body;
    const customer = await CustomerProfile.findByPk(req.customer.id);

    const match = await bcrypt.compare(currentPassword, customer.passwordHash);
    if (!match) {
      return res.status(400).json({ message: 'Current password is incorrect.' });
    }

    const passwordHash = await bcrypt.hash(newPassword, 12);
    await customer.update({ passwordHash });

    res.json({ message: 'Password changed successfully.' });
  } catch (err) {
    console.error('changePassword error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
}
