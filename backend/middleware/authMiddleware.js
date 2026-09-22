import jwt from 'jsonwebtoken';
import CustomerProfile from '../models/CustomerProfile.js';

/**
 * Protects customer-facing routes.
 * Expects: Authorization: Bearer <token>
 */
export async function protect(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Not authorised — no token' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Attach the customer record (without passwordHash) to the request
    const customer = await CustomerProfile.findByPk(decoded.id, {
      attributes: { exclude: ['passwordHash', 'otpCode', 'otpExpiry', 'resetToken', 'resetTokenExpiry'] },
    });

    if (!customer) {
      return res.status(401).json({ message: 'User no longer exists' });
    }

    req.customer = customer;
    next();
  } catch {
    return res.status(401).json({ message: 'Token invalid or expired' });
  }
}
