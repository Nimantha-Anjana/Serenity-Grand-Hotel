import crypto from 'crypto';

// Temporary protection for admin-only routes: the caller must send the secret
// from ADMIN_API_KEY in the "x-admin-key" header.
// TODO: replace with real admin login (e.g. JWT) before going live.
export const adminOnly = (req, res, next) => {
  const expected = process.env.ADMIN_API_KEY;
  if (!expected) {
    return res.status(500).json({ message: 'ADMIN_API_KEY is not configured on the server.' });
  }

  const provided = String(req.get('x-admin-key') || '');
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  const ok = a.length === b.length && crypto.timingSafeEqual(a, b);

  if (!ok) return res.status(401).json({ message: 'Admin access only.' });
  next();
};
