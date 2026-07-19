/**
 * CARD Technocrats & Engineers LLP - API Controller Handlers
 * 
 * Senior Developer Notes:
 * - Receives HTTP requests, validates params, and interacts with MongoDB models.
 * - Encapsulated in async error boundaries to prevent server crashes.
 */

import Service from '../models/Service.js';
import Blog from '../models/Blog.js';
import Contact from '../models/Contact.js';
import Download from '../models/Download.js';
import Newsletter from '../models/Newsletter.js';
import Gallery from '../models/Gallery.js';
import Testimonial from '../models/Testimonial.js';
import ApiResponse from '../utils/ApiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

// @desc    Get dashboard analytics stats
// @route   GET /api/v1/analytics/stats
// @access  Private/Admin
export const getStats = asyncHandler(async (_req, res) => {
  const [
    totalServices,
    totalBlogs,
    totalContacts,
    unreadContacts,
    totalDownloads,
    totalSubscribers,
    totalGallery,
    totalTestimonials,
    recentContacts,
    popularServices,
  ] = await Promise.all([
    Service.countDocuments({ isActive: true }),
    Blog.countDocuments({ isPublished: true }),
    Contact.countDocuments(),
    Contact.countDocuments({ isRead: false }),
    Download.countDocuments({ isActive: true }),
    Newsletter.countDocuments({ isActive: true }),
    Gallery.countDocuments(),
    Testimonial.countDocuments({ isActive: true }),
    Contact.find().sort({ createdAt: -1 }).limit(5).lean(),
    Service.find({ isActive: true })
      .sort({ order: 1 })
      .limit(5)
      .select('title slug shortDescription icon')
      .lean(),
  ]);

  const response = new ApiResponse(200, 'Analytics retrieved successfully', {
    stats: {
      services: totalServices,
      blogs: totalBlogs,
      contacts: {
        total: totalContacts,
        unread: unreadContacts,
      },
      downloads: totalDownloads,
      subscribers: totalSubscribers,
      gallery: totalGallery,
      testimonials: totalTestimonials,
    },
    recentContacts,
    popularServices,
  });

  res.status(response.statusCode).json(response);
});
