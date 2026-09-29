import crypto from 'crypto';
export function randomToken(bytes = 32) { return crypto.randomBytes(bytes).toString('hex'); }
export function otp() { return String(crypto.randomInt(100000, 1000000)); }
export function bookingReference() { return `SGH-${Date.now().toString(36).toUpperCase()}-${crypto.randomInt(100,1000)}`; }
