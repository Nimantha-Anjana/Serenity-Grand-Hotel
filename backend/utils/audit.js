import { AuditLog } from '../models/index.js';
export async function audit(req, action, module, description='') {
  try { await AuditLog.create({ userId: req.user?.id || null, action, module, description, ipAddress: req.ip, userAgent: req.get('user-agent') || null }); } catch (e) { console.error('Audit log failed:', e.message); }
}
