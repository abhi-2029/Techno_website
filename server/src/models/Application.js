/**
 * CARD Technocrats & Engineers LLP - Mongoose Database Schema Definition
 * 
 * Senior Developer Notes:
 * - Handles service application submissions, including company data, 
 *   entity specifications, and whitelisted file attachment properties.
 * - Tracks registration lifecycle status (Pending -> Reviewing -> Approved -> Rejected).
 */

import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema(
  {
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
      required: [true, 'Service reference is required'],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    serviceTitle: {
      type: String,
      required: true,
    },
    applicantName: {
      type: String,
      required: [true, 'Applicant name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email',
      ],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    companyName: {
      type: String,
      trim: true,
      default: '',
    },
    entityType: {
      type: String,
      enum: ['Proprietorship', 'Partnership', 'LLP', 'Pvt Ltd', 'Public Ltd', 'Individual'],
      default: 'Individual',
    },
    solvencyAmount: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['Pending', 'Reviewing', 'Approved', 'Rejected'],
      default: 'Pending',
    },
    paymentStatus: {
      type: String,
      enum: ['Pending', 'Completed', 'Failed', 'N/A'],
      default: 'Pending',
    },
    amountDue: {
      type: Number,
      default: 0,
    },
    documents: [
      {
        name: { type: String, required: true },
        url: { type: String, required: true }
      }
    ],
    notes: {
      type: String,
      trim: true,
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

applicationSchema.index({ status: 1, createdAt: -1 });
applicationSchema.index({ createdAt: -1 });

const Application = mongoose.model('Application', applicationSchema);

export default Application;
