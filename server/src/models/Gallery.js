/**
 * CARD Technocrats & Engineers LLP - Mongoose Database Schema Definition
 * 
 * Senior Developer Notes:
 * - Governs document structures, indexes, and relations in MongoDB Atlas.
 * - Enforces data validation rules before database commits.
 */

import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Gallery title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    description: {
      type: String,
      default: '',
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
    images: [
      {
        url: { type: String, required: true },
        caption: { type: String, default: '' },
      },
    ],
    videos: [
      {
        url: { type: String, required: true },
        caption: { type: String, default: '' },
        thumbnail: { type: String, default: '' },
      },
    ],
    projectType: {
      type: String,
      default: '',
      trim: true,
    },
    location: {
      type: String,
      default: '',
      trim: true,
    },
    completionDate: {
      type: Date,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

gallerySchema.index({ projectType: 1 });
gallerySchema.index({ isFeatured: 1 });

const Gallery = mongoose.model('Gallery', gallerySchema);

export default Gallery;
