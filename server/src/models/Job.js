/**
 * CARD Technocrats & Engineers LLP - Mongoose Database Schema Definition
 * 
 * Senior Developer Notes:
 * - Stores job positions for hiring, qualifications, and categories.
 * - Enforces indexes for fast search filters by department or status.
 */

import mongoose from 'mongoose';
import slugify from 'slugify';

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Job title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    slug: {
      type: String,
      unique: true,
    },
    department: {
      type: String,
      required: [true, 'Department is required'],
      enum: ['Engineering', 'Corporate Compliance', 'Sales & Advisory', 'Admin Operations'],
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      default: 'Patna, Bihar',
    },
    salaryRange: {
      type: String,
      default: 'Negotiable',
    },
    experienceRequired: {
      type: String,
      default: '1-3 Years',
    },
    description: {
      type: String,
      required: [true, 'Job description is required'],
    },
    requirements: [
      {
        type: String,
        trim: true,
      }
    ],
    responsibilities: [
      {
        type: String,
        trim: true,
      }
    ],
    isClosed: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
  }
);

// Indexes for fast searching
jobSchema.index({ slug: 1 });
jobSchema.index({ department: 1, isClosed: 1 });

// Slug creation middleware
jobSchema.pre('save', function (next) {
  if (this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true, strict: true }) + '-' + Math.random().toString(36).slice(-4);
  }
  next();
});

const Job = mongoose.models.Job || mongoose.model('Job', jobSchema);
export default Job;
