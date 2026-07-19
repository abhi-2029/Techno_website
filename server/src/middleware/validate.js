/**
 * CARD Technocrats & Engineers LLP - Express Request Middleware Filter
 * 
 * Senior Developer Notes:
 * - Intercepts incoming payloads for JWT decoding, uploads, or error mapping.
 */

import ApiError from '../utils/ApiError.js';

/**
 * Middleware factory for validating request body fields.
 * @param {string[]} requiredFields - Array of field names that must be present.
 * @returns Express middleware function
 */
export const validate = (requiredFields) => {
  return (req, _res, next) => {
    const missingFields = [];

    for (const field of requiredFields) {
      const value = req.body[field];
      if (value === undefined || value === null || value === '') {
        missingFields.push(field);
      }
    }

    if (missingFields.length > 0) {
      throw new ApiError(
        400,
        `Missing required fields: ${missingFields.join(', ')}`
      );
    }

    next();
  };
};
