/**
 * CARD Technocrats & Engineers LLP - API Controller Handlers
 * 
 * Senior Developer Notes:
 * - Receives HTTP requests, validates params, and interacts with MongoDB models.
 * - Encapsulated in async error boundaries to prevent server crashes.
 */

import Gallery from '../models/Gallery.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';
import { escapeRegex } from '../utils/escapeRegex.js';

// @desc    Get all gallery items (with projectType filter)
// @route   GET /api/v1/gallery
// @access  Public
export const getAllGallery = asyncHandler(async (req, res) => {
  const filter = {};

  if (req.query.projectType) {
    filter.projectType = { $regex: escapeRegex(req.query.projectType), $options: 'i' };
  }

  if (req.query.featured === 'true') {
    filter.isFeatured = true;
  }

  // Executes a queries read operation on the database collection
  const gallery = await Gallery.find(filter).sort({
    isFeatured: -1,
    createdAt: -1,
  });

  const response = new ApiResponse(200, 'Gallery items retrieved successfully', {
    gallery,
  });

  res.status(response.statusCode).json(response);
});

// @desc    Get gallery item by ID
// @route   GET /api/v1/gallery/:id
// @access  Public
export const getGalleryById = asyncHandler(async (req, res) => {
  // Executes a queries read operation on the database collection
  const gallery = await Gallery.findById(req.params.id);

  if (!gallery) {
    throw new ApiError(404, 'Gallery item not found');
  }

  const response = new ApiResponse(200, 'Gallery item retrieved successfully', {
    gallery,
  });

  res.status(response.statusCode).json(response);
});

// @desc    Create gallery item (with image upload)
// @route   POST /api/v1/gallery
// @access  Private/Admin
export const createGallery = asyncHandler(async (req, res) => {
  const { title, description, projectType, location, completionDate, isFeatured, videos } =
    req.body;

  // Build images array from uploaded files
  const images = [];
  if (req.files && req.files.length > 0) {
    for (const file of req.files) {
      images.push({
        url: file.path,
        caption: '',
      });
    }
  }

  // Parse images from body if provided as JSON
  if (req.body.images) {
    try {
      const bodyImages =
        typeof req.body.images === 'string'
          ? JSON.parse(req.body.images)
          : req.body.images;
      images.push(...bodyImages);
    } catch {
      // Ignore parse errors
    }
  }

  const parsedVideos = videos
    ? typeof videos === 'string'
      ? JSON.parse(videos)
      : videos
    : [];

  const gallery = await Gallery.create({
    title,
    description,
    images,
    videos: parsedVideos,
    projectType,
    location,
    completionDate,
    isFeatured: isFeatured === 'true' || isFeatured === true,
  });

  const response = new ApiResponse(201, 'Gallery item created successfully', {
    gallery,
  });

  res.status(response.statusCode).json(response);
});

// @desc    Update gallery item
// @route   PUT /api/v1/gallery/:id
// @access  Private/Admin
export const updateGallery = asyncHandler(async (req, res) => {
  // Executes a queries read operation on the database collection
  const gallery = await Gallery.findById(req.params.id);

  if (!gallery) {
    throw new ApiError(404, 'Gallery item not found');
  }

  // Handle new image uploads
  if (req.files && req.files.length > 0) {
    const newImages = req.files.map((file) => ({
      url: file.path,
      caption: '',
    }));
    gallery.images.push(...newImages);
  }

  // Update other fields
  const fieldsToUpdate = [
    'title',
    'description',
    'projectType',
    'location',
    'completionDate',
    'isFeatured',
  ];

  for (const field of fieldsToUpdate) {
    if (req.body[field] !== undefined) {
      if (field === 'isFeatured') {
        gallery[field] = req.body[field] === 'true' || req.body[field] === true;
      } else {
        gallery[field] = req.body[field];
      }
    }
  }

  // Handle images from body
  if (req.body.images) {
    try {
      gallery.images =
        typeof req.body.images === 'string'
          ? JSON.parse(req.body.images)
          : req.body.images;
    } catch {
      // Ignore parse errors
    }
  }

  // Handle videos from body
  if (req.body.videos) {
    try {
      gallery.videos =
        typeof req.body.videos === 'string'
          ? JSON.parse(req.body.videos)
          : req.body.videos;
    } catch {
      // Ignore parse errors
    }
  }

  // Persists modifications asynchronously to the remote MongoDB cluster
  await gallery.save();

  const response = new ApiResponse(200, 'Gallery item updated successfully', {
    gallery,
  });

  res.status(response.statusCode).json(response);
});

// @desc    Delete gallery item
// @route   DELETE /api/v1/gallery/:id
// @access  Private/Admin
export const deleteGallery = asyncHandler(async (req, res) => {
  // Executes a queries read operation on the database collection
  const gallery = await Gallery.findById(req.params.id);

  if (!gallery) {
    throw new ApiError(404, 'Gallery item not found');
  }

  await gallery.deleteOne();

  const response = new ApiResponse(200, 'Gallery item deleted successfully');

  res.status(response.statusCode).json(response);
});
