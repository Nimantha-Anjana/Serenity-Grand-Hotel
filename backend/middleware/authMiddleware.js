import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';

export function signToken(user) {
  return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
}

export async function protect(req, res, next) {
  try {
    const header = req.get('authorization') || '';
    if (!header.startsWith('Bearer ')) return res.status(401).json({ message: 'Authentication required.' });
    const token = header.slice(7);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);
    if (!user || user.status !== 'active') return res.status(401).json({ message: 'Invalid or inactive account.' });
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
}

export function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: 'Authentication required.' });
    if (!roles.includes(req.user.role)) return res.status(403).json({ message: 'You do not have permission to access this resource.' });
    next();
  };
}

export const adminOnly = [protect, requireRole('admin')];
export const customerOnly = [protect, requireRole('customer')];
