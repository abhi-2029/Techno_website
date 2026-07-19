/**
 * CARD Technocrats & Engineers LLP - Mongoose Database Schema Definition
 * 
 * Senior Developer Notes:
 * - Governs document structures, indexes, and relations in MongoDB Atlas.
 * - Enforces data validation rules before database commits.
 */

import mongoose from 'mongoose';
import slugify from 'slugify';

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Blog title is required'],
      trim: true,
      maxlength: [300, 'Title cannot exceed 300 characters'],
    },
    slug: {
      type: String,
      unique: true,
    },
    content: {
      type: String,
      required: [true, 'Blog content is required'],
    },
    excerpt: {
      type: String,
      maxlength: [500, 'Excerpt cannot exceed 500 characters'],
    },
    coverImage: {
      type: String,
      default: '',
    },
    tags: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],
    category: {
      type: String,
      default: 'General',
      trim: true,
    },
    author: {
      type: String,
      default: 'CARD Technocrats',
      trim: true,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

blogSchema.index({ isPublished: 1 });
blogSchema.index({ tags: 1 });
blogSchema.index({ category: 1 });

blogSchema.pre('save', function (next) {
  if (this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }

  // Auto-generate excerpt from content if not provided
  if (this.isModified('content') && !this.excerpt) {
    const plainText = this.content.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    this.excerpt = plainText.substring(0, 160);
  }

  next();
});

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
