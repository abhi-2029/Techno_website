/**
 * CARD Technocrats & Engineers LLP - API Controller Handlers
 * 
 * Senior Developer Notes:
 * - Receives HTTP requests, validates params, and interacts with MongoDB models.
 * - Encapsulated in async error boundaries to prevent server crashes.
 */

import Blog from '../models/Blog.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';
import { escapeRegex } from '../utils/escapeRegex.js';

// @desc    Get all blogs (with pagination, search, tag filter, category filter)
// @route   GET /api/v1/blogs
// @access  Public
export const getAllBlogs = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = Math.min(parseInt(req.query.limit, 10) || 10, 100); // Cap at 100
  const skip = (page - 1) * limit;

  const filter = {};

  // Search by title or content
  if (req.query.search) {
    const safeSearch = escapeRegex(req.query.search);
    filter.$or = [
      { title: { $regex: safeSearch, $options: 'i' } },
      { content: { $regex: safeSearch, $options: 'i' } },
    ];
  }

  // Filter by tag
  if (req.query.tag) {
    filter.tags = { $in: [req.query.tag.toLowerCase()] };
  }

  // Filter by category
  if (req.query.category) {
    filter.category = req.query.category;
  }

  // Only published for public
  if (!req.query.showAll) {
    filter.isPublished = true;
  }

  const [blogs, total] = await Promise.all([
    Blog.find(filter)
      .select('-content')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Blog.countDocuments(filter),
  ]);

  const response = new ApiResponse(200, 'Blogs retrieved successfully', {
    blogs,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  });

  res.status(response.statusCode).json(response);
});

// @desc    Get blog by slug (increment views)
// @route   GET /api/v1/blogs/:slug
// @access  Public
export const getBlogBySlug = asyncHandler(async (req, res) => {
  const blog = await Blog.findOneAndUpdate(
    { slug: req.params.slug },
    { $inc: { views: 1 } },
    { new: true }
  );

  if (!blog) {
    throw new ApiError(404, 'Blog post not found');
  }

  const response = new ApiResponse(200, 'Blog post retrieved successfully', {
    blog,
  });

  res.status(response.statusCode).json(response);
});

// @desc    Create a blog post
// @route   POST /api/v1/blogs
// @access  Private/Admin
export const createBlog = asyncHandler(async (req, res) => {
  const { title, content, excerpt, coverImage, tags, category, author, isPublished } = req.body;
  const blog = await Blog.create({ title, content, excerpt, coverImage, tags, category, author, isPublished });

  const response = new ApiResponse(201, 'Blog post created successfully', {
    blog,
  });

  res.status(response.statusCode).json(response);
});

// @desc    Update a blog post
// @route   PUT /api/v1/blogs/:id
// @access  Private/Admin
export const updateBlog = asyncHandler(async (req, res) => {
  // Executes a queries read operation on the database collection
  let blog = await Blog.findById(req.params.id);

  if (!blog) {
    throw new ApiError(404, 'Blog post not found');
  }

  const { title, content, excerpt, coverImage, tags, category, author, isPublished } = req.body;
  if (title !== undefined) blog.title = title;
  if (content !== undefined) blog.content = content;
  if (excerpt !== undefined) blog.excerpt = excerpt;
  if (coverImage !== undefined) blog.coverImage = coverImage;
  if (tags !== undefined) blog.tags = tags;
  if (category !== undefined) blog.category = category;
  if (author !== undefined) blog.author = author;
  if (isPublished !== undefined) blog.isPublished = isPublished;

  // Persists modifications asynchronously to the remote MongoDB cluster
  await blog.save();

  const response = new ApiResponse(200, 'Blog post updated successfully', {
    blog,
  });

  res.status(response.statusCode).json(response);
});

// @desc    Delete a blog post
// @route   DELETE /api/v1/blogs/:id
// @access  Private/Admin
export const deleteBlog = asyncHandler(async (req, res) => {
  // Executes a queries read operation on the database collection
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    throw new ApiError(404, 'Blog post not found');
  }

  await blog.deleteOne();

  const response = new ApiResponse(200, 'Blog post deleted successfully');

  res.status(response.statusCode).json(response);
});
