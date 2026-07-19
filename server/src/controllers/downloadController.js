/**
 * CARD Technocrats & Engineers LLP - API Controller Handlers
 * 
 * Senior Developer Notes:
 * - Receives HTTP requests, validates params, and interacts with MongoDB models.
 * - Encapsulated in async error boundaries to prevent server crashes.
 */

import Download from '../models/Download.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

// @desc    Get all downloads (with category filter)
// @route   GET /api/v1/downloads
// @access  Public
export const getAllDownloads = asyncHandler(async (req, res) => {
  const filter = {};

  if (req.query.category) {
    filter.category = req.query.category;
  }

  if (!req.query.showAll) {
    filter.isActive = true;
  }

  // Executes a queries read operation on the database collection
  const downloads = await Download.find(filter).sort({
    createdAt: -1,
  });

  const response = new ApiResponse(200, 'Downloads retrieved successfully', {
    downloads,
  });

  res.status(response.statusCode).json(response);
});

// @desc    Create a download entry (with file upload)
// @route   POST /api/v1/downloads
// @access  Private/Admin
export const createDownload = asyncHandler(async (req, res) => {
  const { title, description, fileType, category } = req.body;

  if (!req.file) {
    throw new ApiError(400, 'Please upload a file');
  }

  const download = await Download.create({
    title,
    description,
    fileUrl: req.file.path,
    fileName: req.file.originalname,
    fileSize: req.file.size ? `${(req.file.size / 1024).toFixed(1)} KB` : '',
    fileType,
    category,
  });

  const response = new ApiResponse(201, 'Download created successfully', {
    download,
  });

  res.status(response.statusCode).json(response);
});

// @desc    Update a download entry
// @route   PUT /api/v1/downloads/:id
// @access  Private/Admin
export const updateDownload = asyncHandler(async (req, res) => {
  // Executes a queries read operation on the database collection
  const download = await Download.findById(req.params.id);

  if (!download) {
    throw new ApiError(404, 'Download not found');
  }

  // Update file if uploaded
  if (req.file) {
    req.body.fileUrl = req.file.path;
    req.body.fileName = req.file.originalname;
    req.body.fileSize = req.file.size
      ? `${(req.file.size / 1024).toFixed(1)} KB`
      : '';
  }

  Object.assign(download, req.body);
  // Persists modifications asynchronously to the remote MongoDB cluster
  await download.save();

  const response = new ApiResponse(200, 'Download updated successfully', {
    download,
  });

  res.status(response.statusCode).json(response);
});

// @desc    Delete a download entry
// @route   DELETE /api/v1/downloads/:id
// @access  Private/Admin
export const deleteDownload = asyncHandler(async (req, res) => {
  // Executes a queries read operation on the database collection
  const download = await Download.findById(req.params.id);

  if (!download) {
    throw new ApiError(404, 'Download not found');
  }

  await download.deleteOne();

  const response = new ApiResponse(200, 'Download deleted successfully');

  res.status(response.statusCode).json(response);
});

// @desc    Increment download count
// @route   PATCH /api/v1/downloads/:id/download
// @access  Public
export const incrementDownload = asyncHandler(async (req, res) => {
  const download = await Download.findByIdAndUpdate(
    req.params.id,
    { $inc: { downloadCount: 1 } },
    { new: true }
  );

  if (!download) {
    throw new ApiError(404, 'Download not found');
  }

  const response = new ApiResponse(200, 'Download count incremented', {
    download,
  });

  res.status(response.statusCode).json(response);
});
