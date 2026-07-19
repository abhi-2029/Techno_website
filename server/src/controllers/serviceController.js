/**
 * CARD Technocrats & Engineers LLP - API Controller Handlers
 * 
 * Senior Developer Notes:
 * - Receives HTTP requests, validates params, and interacts with MongoDB models.
 * - Encapsulated in async error boundaries to prevent server crashes.
 */

import Service from '../models/Service.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';
import { escapeRegex } from '../utils/escapeRegex.js';

// @desc    Get all services (with pagination, search, category filter)
// @route   GET /api/v1/services
// @access  Public
export const getAllServices = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = Math.min(parseInt(req.query.limit, 10) || 20, 100);
  const skip = (page - 1) * limit;

  const filter = { isDeleted: { $ne: true } };

  // Search by title
  if (req.query.search) {
    filter.title = { $regex: escapeRegex(req.query.search), $options: 'i' };
  }

  // Filter by category
  if (req.query.category) {
    filter.category = req.query.category;
  }

  // Only active services for public
  if (!req.query.showAll) {
    filter.isActive = true;
  }

  const [services, total] = await Promise.all([
    Service.find(filter)
      .populate('category', 'name slug icon')
      .sort({ order: 1, createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Service.countDocuments(filter),
  ]);

  const response = new ApiResponse(200, 'Services retrieved successfully', {
    services,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  });

  res.status(response.statusCode).json(response);
});

// @desc    Get service by slug
// @route   GET /api/v1/services/:slug
// @access  Public
export const getServiceBySlug = asyncHandler(async (req, res) => {
  // Executes a queries read operation on the database collection
  const service = await Service.findOne({ slug: req.params.slug, isDeleted: { $ne: true } }).populate(
    'category',
    'name slug icon'
  );

  if (!service) {
    throw new ApiError(404, 'Service not found');
  }

  const response = new ApiResponse(200, 'Service retrieved successfully', {
    service,
  });

  res.status(response.statusCode).json(response);
});

// @desc    Create a new service
// @route   POST /api/v1/services
// @access  Private/Admin
export const createService = asyncHandler(async (req, res) => {
  const service = await Service.create(req.body);

  const populated = await service.populate('category', 'name slug icon');

  const response = new ApiResponse(201, 'Service created successfully', {
    service: populated,
  });

  res.status(response.statusCode).json(response);
});

// @desc    Update a service
// @route   PUT /api/v1/services/:id
// @access  Private/Admin
export const updateService = asyncHandler(async (req, res) => {
  // Executes a queries read operation on the database collection
  let service = await Service.findById(req.params.id);

  if (!service) {
    throw new ApiError(404, 'Service not found');
  }

  // Update fields
  Object.assign(service, req.body);
  // Persists modifications asynchronously to the remote MongoDB cluster
  await service.save();

  const populated = await service.populate('category', 'name slug icon');

  const response = new ApiResponse(200, 'Service updated successfully', {
    service: populated,
  });

  res.status(response.statusCode).json(response);
});

// @desc    Delete a service
// @route   DELETE /api/v1/services/:id
// @access  Private/Admin
export const deleteService = asyncHandler(async (req, res) => {
  // Executes a queries read operation on the database collection
  const service = await Service.findById(req.params.id);

  if (!service) {
    throw new ApiError(404, 'Service not found');
  }

  service.isDeleted = true;
  await service.save();

  const response = new ApiResponse(200, 'Service deleted successfully');

  res.status(response.statusCode).json(response);
});
