import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    applicationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Application',
      required: true,
    },
    amount: {
      type: Number,
      required: true, // In INR Paise (1 INR = 100 Paise)
    },
    currency: {
      type: String,
      default: 'INR',
    },
    status: {
      type: String,
      enum: ['Pending', 'Completed', 'Failed'],
      default: 'Pending',
    },
    razorpayOrderId: {
      type: String,
      required: true,
    },
    razorpayPaymentId: {
      type: String,
    },
    razorpaySignature: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

paymentSchema.index({ userId: 1 });
paymentSchema.index({ applicationId: 1 });
paymentSchema.index({ razorpayOrderId: 1 });

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;
