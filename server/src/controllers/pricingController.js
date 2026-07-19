/**
 * CARD Technocrats & Engineers LLP - API Controller Handlers
 * 
 * Senior Developer Notes:
 * - Receives HTTP requests, validates params, and interacts with MongoDB models.
 * - Encapsulated in async error boundaries to prevent server crashes.
 */

import Pricing from '../models/Pricing.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

// @desc    Get all pricing plans
// @route   GET /api/v1/pricing
// @access  Public
export const getAllPricing = asyncHandler(async (req, res) => {
  const filter = {};

  if (!req.query.showAll) {
    filter.isActive = true;
  }

  // Executes a queries read operation on the database collection
  const pricing = await Pricing.find(filter).sort({ order: 1, createdAt: -1 });

  const response = new ApiResponse(200, 'Pricing plans retrieved successfully', {
    pricing,
  });

  res.status(response.statusCode).json(response);
});

// @desc    Get pricing by slug
// @route   GET /api/v1/pricing/:slug
// @access  Public
export const getPricingBySlug = asyncHandler(async (req, res) => {
  // Executes a queries read operation on the database collection
  const pricing = await Pricing.findOne({ slug: req.params.slug });

  if (!pricing) {
    throw new ApiError(404, 'Pricing plan not found');
  }

  const response = new ApiResponse(200, 'Pricing plan retrieved successfully', {
    pricing,
  });

  res.status(response.statusCode).json(response);
});

// @desc    Create a pricing plan
// @route   POST /api/v1/pricing
// @access  Private/Admin
export const createPricing = asyncHandler(async (req, res) => {
  const pricing = await Pricing.create(req.body);

  const response = new ApiResponse(201, 'Pricing plan created successfully', {
    pricing,
  });

  res.status(response.statusCode).json(response);
});

// @desc    Update a pricing plan
// @route   PUT /api/v1/pricing/:id
// @access  Private/Admin
export const updatePricing = asyncHandler(async (req, res) => {
  // Executes a queries read operation on the database collection
  let pricing = await Pricing.findById(req.params.id);

  if (!pricing) {
    throw new ApiError(404, 'Pricing plan not found');
  }

  Object.assign(pricing, req.body);
  // Persists modifications asynchronously to the remote MongoDB cluster
  await pricing.save();

  const response = new ApiResponse(200, 'Pricing plan updated successfully', {
    pricing,
  });

  res.status(response.statusCode).json(response);
});

// @desc    Delete a pricing plan
// @route   DELETE /api/v1/pricing/:id
// @access  Private/Admin
export const deletePricing = asyncHandler(async (req, res) => {
  // Executes a queries read operation on the database collection
  const pricing = await Pricing.findById(req.params.id);

  if (!pricing) {
    throw new ApiError(404, 'Pricing plan not found');
  }

  await pricing.deleteOne();

  const response = new ApiResponse(200, 'Pricing plan deleted successfully');

  res.status(response.statusCode).json(response);
});
