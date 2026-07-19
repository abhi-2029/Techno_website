/**
 * CARD Technocrats & Engineers LLP - Mongoose Database Schema Definition
 * 
 * Senior Developer Notes:
 * - Governs document structures, indexes, and relations in MongoDB Atlas.
 * - Enforces data validation rules before database commits.
 */

import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    role: {
      type: String,
      default: '',
      trim: true,
    },
    company: {
      type: String,
      default: '',
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'Testimonial content is required'],
      maxlength: [1000, 'Content cannot exceed 1000 characters'],
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot exceed 5'],
    },
    avatar: {
      type: String,
      default: '',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

testimonialSchema.index({ isActive: 1 });
testimonialSchema.index({ order: 1 });

const Testimonial = mongoose.model('Testimonial', testimonialSchema);

export default Testimonial;
