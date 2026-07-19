/**
 * CARD Technocrats & Engineers LLP - Mongoose Database Schema Definition
 * 
 * Senior Developer Notes:
 * - Governs document structures, indexes, and relations in MongoDB Atlas.
 * - Enforces data validation rules before database commits.
 */

import mongoose from 'mongoose';
import slugify from 'slugify';

const pricingSchema = new mongoose.Schema(
  {
    serviceName: {
      type: String,
      required: [true, 'Service name is required'],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    tiers: [
      {
        name: {
          type: String,
          required: true,
          enum: ['Basic', 'Standard', 'Premium'],
        },
        price: {
          type: String,
          required: true,
        },
        features: [{ type: String }],
        isPopular: {
          type: Boolean,
          default: false,
        },
      },
    ],
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

pricingSchema.pre('save', function (next) {
  if (this.isModified('serviceName')) {
    this.slug = slugify(this.serviceName, { lower: true, strict: true });
  }
  next();
});

const Pricing = mongoose.model('Pricing', pricingSchema);

export default Pricing;
