/**
 * CARD Technocrats & Engineers LLP - Mongoose Database Schema Definition
 * 
 * Senior Developer Notes:
 * - Governs document structures, indexes, and relations in MongoDB Atlas.
 * - Enforces data validation rules before database commits.
 */

import mongoose from 'mongoose';
import slugify from 'slugify';
import Category from './Category.js';

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Service title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    slug: {
      type: String,
      unique: true,
    },
    icon: {
      type: String,
      default: '',
    },
    shortDescription: {
      type: String,
      required: [true, 'Short description is required'],
      maxlength: [500, 'Short description cannot exceed 500 characters'],
    },
    fullDescription: {
      type: String,
      default: '',
    },
    requiredDocuments: [
      {
        type: String,
        trim: true,
      },
    ],
    eligibility: {
      type: String,
      default: '',
    },
    processingTime: {
      type: String,
      default: '',
    },
    governmentFees: {
      type: String,
      default: '',
    },
    professionalCharges: {
      type: String,
      default: '',
    },
    benefits: [
      {
        type: String,
        trim: true,
      },
    ],
    faqs: [
      {
        question: { type: String, required: true },
        answer: { type: String, required: true },
      },
    ],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

serviceSchema.index({ category: 1 });
serviceSchema.index({ isActive: 1 });

serviceSchema.pre('save', function (next) {
  if (this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

const Service = mongoose.model('Service', serviceSchema);

export default Service;
