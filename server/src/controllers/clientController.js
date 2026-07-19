import Application from '../models/Application.js';
import Booking from '../models/Booking.js';
import ApiResponse from '../utils/ApiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

// @desc    Get logged-in user's applications
// @route   GET /api/v1/client/applications
// @access  Private (User)
export const getMyApplications = asyncHandler(async (req, res) => {
  const applications = await Application.find({ 
    userId: req.user._id, 
    isDeleted: { $ne: true } 
  })
    .populate('service', 'title category')
    .sort({ createdAt: -1 });

  res.status(200).json(new ApiResponse(200, 'Applications retrieved successfully', { applications }));
});

// @desc    Get logged-in user's bookings
// @route   GET /api/v1/client/bookings
// @access  Private (User)
export const getMyBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ 
    userId: req.user._id 
  })
    .sort({ createdAt: -1 });

  res.status(200).json(new ApiResponse(200, 'Bookings retrieved successfully', { bookings }));
});
