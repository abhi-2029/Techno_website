/**
 * CARD Technocrats & Engineers LLP - Mongoose Database Schema Definition
 * 
 * Senior Developer Notes:
 * - Handles auxiliary travel services whitelisting ticket requests.
 * - Stores passenger names, travel routing coordinates, carrier metadata, and ticket statuses.
 */

import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    bookingType: {
      type: String,
      enum: ['Flight', 'Train'],
      required: [true, 'Booking type (Flight or Train) is required'],
    },
    from: {
      type: String,
      required: [true, 'Departure city is required'],
      trim: true,
    },
    to: {
      type: String,
      required: [true, 'Destination city is required'],
      trim: true,
    },
    departureDate: {
      type: Date,
      required: [true, 'Departure date is required'],
    },
    travelClass: {
      type: String,
      required: [true, 'Travel class is required'],
    },
    carrierName: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    passengers: [
      {
        name: { type: String, required: true },
        age: { type: Number, required: true },
        identityNumber: { type: String, default: '', select: false } // PAN / Aadhaar / Passport
      }
    ],
    contactEmail: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    contactPhone: {
      type: String,
      required: [true, 'Contact phone is required'],
      trim: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Cancelled'],
      default: 'Pending',
    },
    ticketUrl: {
      type: String,
      default: '',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
  }
);

bookingSchema.index({ status: 1 });
bookingSchema.index({ createdAt: -1 });

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
