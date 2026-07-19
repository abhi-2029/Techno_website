/**
 * CARD Technocrats & Engineers LLP - Mongoose Database Schema Definition
 * 
 * Senior Developer Notes:
 * - Governs document structures, indexes, and relations in MongoDB Atlas.
 * - Enforces data validation rules before database commits.
 */

import mongoose from 'mongoose';

const downloadSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    description: {
      type: String,
      default: '',
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    fileUrl: {
      type: String,
      required: [true, 'File URL is required'],
    },
    fileName: {
      type: String,
      required: [true, 'File name is required'],
    },
    fileSize: {
      type: String,
      default: '',
    },
    fileType: {
      type: String,
      enum: ['pdf', 'doc', 'xlsx', 'zip'],
      required: [true, 'File type is required'],
    },
    category: {
      type: String,
      enum: ['tender-forms', 'application-forms', 'brochures', 'others'],
      default: 'others',
    },
    downloadCount: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

downloadSchema.index({ category: 1 });
downloadSchema.index({ isActive: 1 });

const Download = mongoose.model('Download', downloadSchema);

export default Download;
