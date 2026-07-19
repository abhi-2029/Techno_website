/**
 * CARD Technocrats & Engineers LLP - API Controller Handlers
 * 
 * Senior Developer Notes:
 * - Controls travel booking operations.
 * - Saves client bookings to MongoDB and lets admin retrieve/update statuses.
 */

import Booking from '../models/Booking.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';
import { sendBookingEmail } from '../utils/emailService.js';
import { notifyAdminOfBooking } from '../utils/sendEmail.js';
import jwt from 'jsonwebtoken';

// @desc    Create a new travel ticket booking (public)
// @route   POST /api/v1/bookings
// @access  Public
export const createBooking = asyncHandler(async (req, res) => {
  const {
    bookingType,
    from,
    to,
    departureDate,
    travelClass,
    carrierName,
    price,
    passengers,
    contactEmail,
    contactPhone
  } = req.body;

  let userId = null;
  if (req.cookies && req.cookies.jwt) {
    try {
      const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
      userId = decoded.id;
    } catch (error) {
      // Ignore token errors for public routes
    }
  }

  const booking = await Booking.create({
    bookingType,
    from,
    to,
    departureDate,
    travelClass,
    carrierName,
    price,
    passengers: passengers || [],
    contactEmail,
    contactPhone,
    userId
  });

  if (contactEmail) {
    sendBookingEmail(contactEmail, bookingType, passengers?.[0]?.fullName || 'Valued Client');
  }

  // Send admin notification
  try {
    await notifyAdminOfBooking({
      type: bookingType,
      user: { name: passengers?.[0]?.fullName || 'Guest', email: contactEmail || 'N/A' },
      from,
      to,
      date: departureDate,
      passengers: passengers?.length || 1
    });
  } catch (err) {
    console.error('Failed to send admin notification for booking:', err.message);
  }

  const response = new ApiResponse(
    201,
    'Your travel ticket request has been logged successfully. Our booking desk will contact you with the seat block details.',
    { booking }
  );

  res.status(response.statusCode).json(response);
});

// @desc    Get all bookings (admin, paginated, filterable)
// @route   GET /api/v1/bookings
// @access  Private/Admin
export const getAllBookings = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 20;
  const skip = (page - 1) * limit;

  const filter = {};
  if (req.query.bookingType) filter.bookingType = req.query.bookingType;
  if (req.query.status) filter.status = req.query.status;

  const [bookings, total] = await Promise.all([
    Booking.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Booking.countDocuments(filter),
  ]);

  const response = new ApiResponse(200, 'Bookings retrieved successfully', {
    bookings,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  });

  res.status(response.statusCode).json(response);
});

// @desc    Update booking status or attach ticket URL
// @route   PATCH /api/v1/bookings/:id
// @access  Private/Admin
export const updateBookingStatus = asyncHandler(async (req, res) => {
  const { status, ticketUrl } = req.body;

  const booking = await Booking.findById(req.params.id);
  if (!booking) {
    throw new ApiError(404, 'Booking record not found');
  }

  if (status) booking.status = status;
  if (ticketUrl !== undefined) booking.ticketUrl = ticketUrl;

  await booking.save();

  const response = new ApiResponse(200, 'Booking status updated successfully', { booking });
  res.status(response.statusCode).json(response);
});

// @desc    Delete a booking
// @route   DELETE /api/v1/bookings/:id
// @access  Private/Admin
export const deleteBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) {
    throw new ApiError(404, 'Booking record not found');
  }

  await booking.deleteOne();

  const response = new ApiResponse(200, 'Booking record deleted successfully');
  res.status(response.statusCode).json(response);
});
