/**
 * CARD Technocrats & Engineers LLP - API Controller Handlers
 * 
 * Senior Developer Notes:
 * - Receives HTTP requests, validates params, and interacts with MongoDB models.
 * - Encapsulated in async error boundaries to prevent server crashes.
 */

import Testimonial from '../models/Testimonial.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

// @desc    Get all testimonials (only active, ordered)
// @route   GET /api/v1/testimonials
// @access  Public
export const getAllTestimonials = asyncHandler(async (req, res) => {
  const filter = {};

  if (!req.query.showAll) {
    filter.isActive = true;
  }

  // Executes a queries read operation on the database collection
  const testimonials = await Testimonial.find(filter).sort({
    order: 1,
    createdAt: -1,
  });

  const response = new ApiResponse(
    200,
    'Testimonials retrieved successfully',
    { testimonials }
  );

  res.status(response.statusCode).json(response);
});

// @desc    Create a testimonial
// @route   POST /api/v1/testimonials
// @access  Private/Admin
export const createTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.create(req.body);

  const response = new ApiResponse(201, 'Testimonial created successfully', {
    testimonial,
  });

  res.status(response.statusCode).json(response);
});

// @desc    Update a testimonial
// @route   PUT /api/v1/testimonials/:id
// @access  Private/Admin
export const updateTestimonial = asyncHandler(async (req, res) => {
  // Executes a queries read operation on the database collection
  const testimonial = await Testimonial.findById(req.params.id);

  if (!testimonial) {
    throw new ApiError(404, 'Testimonial not found');
  }

  Object.assign(testimonial, req.body);
  // Persists modifications asynchronously to the remote MongoDB cluster
  await testimonial.save();

  const response = new ApiResponse(200, 'Testimonial updated successfully', {
    testimonial,
  });

  res.status(response.statusCode).json(response);
});

// @desc    Delete a testimonial
// @route   DELETE /api/v1/testimonials/:id
// @access  Private/Admin
export const deleteTestimonial = asyncHandler(async (req, res) => {
  // Executes a queries read operation on the database collection
  const testimonial = await Testimonial.findById(req.params.id);

  if (!testimonial) {
    throw new ApiError(404, 'Testimonial not found');
  }

  await testimonial.deleteOne();

  const response = new ApiResponse(200, 'Testimonial deleted successfully');

  res.status(response.statusCode).json(response);
});
