import Razorpay from 'razorpay';
import crypto from 'crypto';
import Payment from '../models/Payment.js';
import Application from '../models/Application.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

// Initialize Razorpay
// For production, these MUST be set in .env
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_dummykey123',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'dummysecret123',
});

// @desc    Create a new Razorpay order
// @route   POST /api/v1/payments/create-order
// @access  Private (User)
export const createOrder = asyncHandler(async (req, res) => {
  const { applicationId } = req.body;

  const application = await Application.findOne({ _id: applicationId, userId: req.user._id });
  if (!application) {
    throw new ApiError(404, 'Application not found or unauthorized');
  }
  
  if (application.paymentStatus === 'Completed') {
    throw new ApiError(400, 'This application has already been paid for.');
  }
  
  if (application.amountDue <= 0) {
    throw new ApiError(400, 'No pending payment for this application. Please wait for admin invoice.');
  }

  const amountInPaise = application.amountDue * 100;

  const options = {
    amount: amountInPaise,
    currency: 'INR',
    receipt: `rcpt_${applicationId.toString().slice(-10)}`,
  };

  const order = await razorpay.orders.create(options);

  // Track the pending payment in our DB
  await Payment.create({
    userId: req.user._id,
    applicationId,
    amount: amountInPaise,
    razorpayOrderId: order.id,
  });

  const response = new ApiResponse(200, 'Order created successfully', {
    orderId: order.id,
    amount: order.amount,
    currency: order.currency,
    keyId: process.env.RAZORPAY_KEY_ID || 'rzp_test_dummykey123'
  });

  res.status(response.statusCode).json(response);
});

// @desc    Verify Razorpay payment signature
// @route   POST /api/v1/payments/verify
// @access  Private (User)
export const verifyPayment = asyncHandler(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const payment = await Payment.findOne({ razorpayOrderId: razorpay_order_id, userId: req.user._id });
  if (!payment) {
    throw new ApiError(404, 'Payment record not found');
  }

  const secret = process.env.RAZORPAY_KEY_SECRET || 'dummysecret123';
  const body = razorpay_order_id + '|' + razorpay_payment_id;

  // Cryptographic signature verification
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(body.toString())
    .digest('hex');

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    payment.status = 'Completed';
    payment.razorpayPaymentId = razorpay_payment_id;
    payment.razorpaySignature = razorpay_signature;
    await payment.save();

    // Mark the application as paid
    const application = await Application.findById(payment.applicationId);
    if (application) {
      application.paymentStatus = 'Completed';
      await application.save();
    }

    res.status(200).json(new ApiResponse(200, 'Payment verified successfully'));
  } else {
    payment.status = 'Failed';
    await payment.save();
    throw new ApiError(400, 'Invalid payment signature. Potential spoofing detected.');
  }
});
