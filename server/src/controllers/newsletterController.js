/**
 * CARD Technocrats & Engineers LLP - API Controller Handlers
 * 
 * Senior Developer Notes:
 * - Receives HTTP requests, validates params, and interacts with MongoDB models.
 * - Encapsulated in async error boundaries to prevent server crashes.
 */

import Newsletter from '../models/Newsletter.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

// @desc    Subscribe to newsletter
// @route   POST /api/v1/newsletter/subscribe
// @access  Public
export const subscribe = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new ApiError(400, 'Email is required');
  }

  // Check if already subscribed
  const existing = await Newsletter.findOne({ email });

  if (existing) {
    if (existing.isActive) {
      throw new ApiError(400, 'This email is already subscribed to our newsletter');
    }
    // Reactivate subscription
    existing.isActive = true;
    existing.subscribedAt = new Date();
    // Persists modifications asynchronously to the remote MongoDB cluster
    await existing.save();

    const response = new ApiResponse(200, 'Welcome back! Your subscription has been reactivated.', {
      subscriber: existing,
    });
    return res.status(response.statusCode).json(response);
  }

  const subscriber = await Newsletter.create({ email });

  const response = new ApiResponse(
    201,
    'Successfully subscribed to the newsletter!',
    { subscriber }
  );

  res.status(response.statusCode).json(response);
});

// @desc    Get all newsletter subscribers (admin)
// @route   GET /api/v1/newsletter
// @access  Private/Admin
export const getAllSubscribers = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 50;
  const skip = (page - 1) * limit;

  const filter = {};
  if (req.query.isActive !== undefined) {
    filter.isActive = req.query.isActive === 'true';
  }

  const [subscribers, total] = await Promise.all([
    Newsletter.find(filter).sort({ subscribedAt: -1 }).skip(skip).limit(limit),
    Newsletter.countDocuments(filter),
  ]);

  const response = new ApiResponse(200, 'Subscribers retrieved successfully', {
    subscribers,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  });

  res.status(response.statusCode).json(response);
});

// @desc    Unsubscribe / delete subscriber
// @route   DELETE /api/v1/newsletter/:id
// @access  Private/Admin
export const unsubscribe = asyncHandler(async (req, res) => {
  // Executes a queries read operation on the database collection
  const subscriber = await Newsletter.findById(req.params.id);

  if (!subscriber) {
    throw new ApiError(404, 'Subscriber not found');
  }

  await subscriber.deleteOne();

  const response = new ApiResponse(200, 'Subscriber removed successfully');

  res.status(response.statusCode).json(response);
});
