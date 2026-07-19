/**
 * CARD Technocrats & Engineers LLP - Express Request Middleware Filter
 * 
 * Senior Developer Notes:
 * - Intercepts incoming payloads for JWT decoding, uploads, or error mapping.
 */

import ApiError from '../utils/ApiError.js';

export const adminOnly = (req, _res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  throw new ApiError(403, 'Access denied. Admin privileges required.');
};
