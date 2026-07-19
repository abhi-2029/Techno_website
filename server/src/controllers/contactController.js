/**
 * CARD Technocrats & Engineers LLP - API Controller Handlers
 * 
 * Senior Developer Notes:
 * - Receives HTTP requests, validates params, and interacts with MongoDB models.
 * - Encapsulated in async error boundaries to prevent server crashes.
 */

import Contact from '../models/Contact.js';
import { notifyAdminOfContact } from '../utils/sendEmail.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

// @desc    Create a contact inquiry (public) + send email notification
// @route   POST /api/v1/contacts
// @access  Public
export const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  const contact = await Contact.create({ name, email, phone, subject, message });

  // Send notification email to admin
  try {
    await notifyAdminOfContact({ name, email, phone, subject, message });
  } catch (emailError) {
    // Log error but don't fail the contact creation
    console.error('Failed to send contact notification email:', emailError.message);
  }

  const response = new ApiResponse(
    201,
    'Your inquiry has been submitted successfully. We will get back to you soon.',
    { contact }
  );

  res.status(response.statusCode).json(response);
});

// @desc    Get all contacts (admin, paginated)
// @route   GET /api/v1/contacts
// @access  Private/Admin
export const getAllContacts = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 20;
  const skip = (page - 1) * limit;

  const filter = {};

  if (req.query.isRead !== undefined) {
    filter.isRead = req.query.isRead === 'true';
  }

  const [contacts, total] = await Promise.all([
    Contact.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Contact.countDocuments(filter),
  ]);

  const response = new ApiResponse(200, 'Contacts retrieved successfully', {
    contacts,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  });

  res.status(response.statusCode).json(response);
});

// @desc    Mark contact as read
// @route   PATCH /api/v1/contacts/:id/read
// @access  Private/Admin
export const markAsRead = asyncHandler(async (req, res) => {
  const contact = await Contact.findByIdAndUpdate(
    req.params.id,
    { isRead: true },
    { new: true }
  );

  if (!contact) {
    throw new ApiError(404, 'Contact not found');
  }

  const response = new ApiResponse(200, 'Contact marked as read', { contact });

  res.status(response.statusCode).json(response);
});

// @desc    Delete a contact
// @route   DELETE /api/v1/contacts/:id
// @access  Private/Admin
export const deleteContact = asyncHandler(async (req, res) => {
  // Executes a queries read operation on the database collection
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    throw new ApiError(404, 'Contact not found');
  }

  await contact.deleteOne();

  const response = new ApiResponse(200, 'Contact deleted successfully');

  res.status(response.statusCode).json(response);
});
