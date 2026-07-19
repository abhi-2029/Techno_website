/**
 * CARD Technocrats & Engineers LLP - Mongoose Database Schema Definition
 * 
 * Senior Developer Notes:
 * - Stores candidate application profiles, contact info, and resumes.
 * - Links each submission back to the relevant Job posting.
 */

import mongoose from 'mongoose';

const jobApplicationSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: [true, 'Job listing association is required'],
    },
    name: {
      type: String,
      required: [true, 'Candidate name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, 'Contact phone is required'],
      trim: true,
    },
    coverLetter: {
      type: String,
      required: [true, 'Cover letter text or profile brief is required'],
      maxlength: [2000, 'Cover letter cannot exceed 2000 characters'],
    },
    resumeUrl: {
      type: String,
      required: [true, 'Resume document link is required'],
    },
    status: {
      type: String,
      required: [true, 'Application status is required'],
      enum: ['Applied', 'Shortlisted', 'Interviewing', 'Selected', 'Rejected'],
      default: 'Applied',
    }
  },
  {
    timestamps: true,
  }
);

// Indexes
jobApplicationSchema.index({ jobId: 1, status: 1 });
jobApplicationSchema.index({ email: 1 });

const JobApplication = mongoose.models.JobApplication || mongoose.model('JobApplication', jobApplicationSchema);
export default JobApplication;
