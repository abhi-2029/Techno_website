/**
 * CARD Technocrats & Engineers LLP - Express Request Middleware Filter
 * 
 * Senior Developer Notes:
 * - Intercepts incoming payloads for JWT decoding, uploads, or error mapping.
 */

import ApiError from '../utils/ApiError.js';

const errorHandler = (err, req, res, _next) => {
  let error = { ...err };
  error.message = err.message;
  error.stack = err.stack;

  // Mongoose bad ObjectId (CastError)
  if (err.name === 'CastError') {
    const message = `Resource not found with id: ${err.value}`;
    error = new ApiError(404, message);
  }

  // Mongoose duplicate key (code 11000)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue).join(', ');
    const message = `Duplicate value entered for field: ${field}`;
    error = new ApiError(400, message);
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((val) => val.message);
    const message = messages.join('. ');
    error = new ApiError(400, message);
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    error = new ApiError(401, 'Invalid token. Please log in again.');
  }

  if (err.name === 'TokenExpiredError') {
    error = new ApiError(401, 'Token expired. Please log in again.');
  }

  const statusCode = error.statusCode || 500;
  const message = error.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
  });
};

export default errorHandler;
