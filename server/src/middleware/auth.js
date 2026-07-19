/**
 * CARD Technocrats & Engineers LLP - Express Request Middleware Filter
 * 
 * Senior Developer Notes:
 * - Intercepts incoming payloads for JWT decoding, uploads, or error mapping.
 */

import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import ApiError from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';

export const protect = asyncHandler(async (req, _res, next) => {
  let token;

  if (req.cookies && req.cookies.jwt) {
    token = req.cookies.jwt;
  } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    throw new ApiError(401, 'Not authorized. No token provided.');
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // Executes a queries read operation on the database collection
  const user = await User.findById(decoded.id).select('-password');

  if (!user) {
    throw new ApiError(401, 'User belonging to this token no longer exists.');
  }

  req.user = user;
  next();
});
