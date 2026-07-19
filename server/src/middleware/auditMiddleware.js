import AuditLog from '../models/AuditLog.js';

export const auditLogger = (req, res, next) => {
  // We only want to log mutations (POST, PUT, PATCH, DELETE)
  const method = req.method;
  if (method === 'GET' || method === 'OPTIONS') {
    return next();
  }

  // Determine action
  let action;
  if (method === 'POST') action = 'CREATE';
  else if (method === 'DELETE') action = 'DELETE';
  else action = 'UPDATE';

  // Extract target info from URL (e.g., /api/v1/services/60f3b...)
  const pathParts = req.originalUrl.split('?')[0].split('/').filter(Boolean);
  
  if (pathParts.length < 3) return next();
  
  const targetModel = pathParts[2]; // e.g., 'services'
  const targetId = pathParts[3] || null;

  // We hook into res.on('finish') to only log if the request was successful
  res.on('finish', () => {
    // Only log if the action succeeded and an authenticated admin performed it
    if (res.statusCode >= 200 && res.statusCode < 300 && req.user) {
      AuditLog.create({
        adminId: req.user._id,
        action,
        targetModel,
        targetId,
        // Strip sensitive data from logs
        details: req.body ? { ...req.body, password: '[REDACTED]' } : {},
        ipAddress: req.ip || req.connection?.remoteAddress,
      }).catch(err => console.error('Failed to write audit log:', err));
    }
  });

  next();
};
