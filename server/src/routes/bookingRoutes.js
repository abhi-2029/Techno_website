/**
 * CARD Technocrats & Engineers LLP - Express Endpoint Router
 * 
 * Senior Developer Notes:
 * - Directs endpoints for travel booking submissions and admin operations.
 * - Protects admin read/write operations behind authorization middlewares.
 */

import { Router } from 'express';
import {
  createBooking,
  getAllBookings,
  updateBookingStatus,
  deleteBooking
} from '../controllers/bookingController.js';
import { protect } from '../middleware/auth.js';
import { adminOnly } from '../middleware/admin.js';
import { validate } from '../middleware/validate.js';

const router = Router();

router
  .route('/')
  .post(
    validate(['bookingType', 'from', 'to', 'departureDate', 'travelClass', 'carrierName', 'price', 'contactEmail', 'contactPhone']),
    createBooking
  )
  .get(protect, adminOnly, getAllBookings);

router
  .route('/:id')
  .patch(protect, adminOnly, updateBookingStatus)
  .delete(protect, adminOnly, deleteBooking);

export default router;
