/**
 * CARD Technocrats & Engineers LLP - API Controller Handlers
 * 
 * Senior Developer Notes:
 * - Handles service registration / application actions.
 * - Saves client submissions to MongoDB Atlas database.
 * - Provides admin list query, status update controllers, and document delete endpoints.
 */

import Application from '../models/Application.js';
import Service from '../models/Service.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';
import { sendEmail, sendApplicationEmail } from '../utils/emailService.js';
import jwt from 'jsonwebtoken';

// @desc    Submit a new service application (public)
// @route   POST /api/v1/applications
// @access  Public
export const createApplication = asyncHandler(async (req, res) => {
  const { serviceId, applicantName, email, phone, companyName, entityType, solvencyAmount, documents, notes } = req.body;

  const service = await Service.findById(serviceId);
  if (!service) {
    throw new ApiError(404, 'The requested service does not exist');
  }

  let userId = null;
  if (req.cookies && req.cookies.jwt) {
    try {
      const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
      userId = decoded.id;
    } catch (error) {
      // Ignore token errors for public routes
    }
  }

  const application = await Application.create({
    service: serviceId,
    userId,
    serviceTitle: service.title,
    applicantName,
    email,
    phone,
    companyName,
    entityType,
    solvencyAmount,
    documents: documents || [],
    notes
  });

  // Dispatch email notification to applicant asynchronously
  if (email) {
    sendApplicationEmail(email, service.title, applicantName);
  }

  // Dispatch email notification to admin asynchronously
  const adminEmail = process.env.CONTACT_EMAIL || 'admin@cardtechno.com';
  const mailHtml = `
    <div style="background-color: #0b0f19; color: #f3f4f6; font-family: sans-serif; padding: 24px; border-radius: 16px; border: 1px solid #1f2937; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #3b82f6; border-bottom: 1px solid #1f2937; padding-bottom: 12px; margin-top: 0;">New Registration Alert</h2>
      <p style="font-size: 14px; color: #9ca3af;">A client has submitted a new service registration application on the CARD Technocrats portal.</p>
      
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 13px;">
        <tr>
          <td style="padding: 8px 0; color: #9ca3af; font-weight: bold; width: 140px;">Applicant Name:</td>
          <td style="padding: 8px 0; color: #ffffff;">${applicantName}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #9ca3af; font-weight: bold;">Applied Service:</td>
          <td style="padding: 8px 0; color: #3b82f6; font-weight: bold;">${service.title}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #9ca3af; font-weight: bold;">Firm Type:</td>
          <td style="padding: 8px 0; color: #ffffff;">${entityType} (${companyName || 'N/A'})</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #9ca3af; font-weight: bold;">Solvency Value:</td>
          <td style="padding: 8px 0; color: #10b981; font-weight: bold;">₹${Number(solvencyAmount).toLocaleString()}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #9ca3af; font-weight: bold;">Contact Phone:</td>
          <td style="padding: 8px 0; color: #ffffff; font-family: monospace;">${phone}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #9ca3af; font-weight: bold;">Email Address:</td>
          <td style="padding: 8px 0; color: #ffffff; font-family: monospace;">${email}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #9ca3af; font-weight: bold;">Client Notes:</td>
          <td style="padding: 8px 0; color: #9ca3af; font-style: italic;">"${notes || 'None'}"</td>
        </tr>
      </table>
      
      <div style="border-top: 1px solid #1f2937; padding-top: 16px; text-align: center;">
        <a href="${process.env.CLIENT_URL || 'http://localhost:5173'}/admin/applications" style="background-color: #2563eb; color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 13px; display: inline-block;">
          View in Admin Dashboard &rarr;
        </a>
      </div>
    </div>
  `;

  sendEmail({
    to: adminEmail,
    subject: `🚨 New Registration: ${applicantName} - ${service.title}`,
    html: mailHtml
  });

  const response = new ApiResponse(
    201,
    'Your registration application has been submitted successfully. Our team will review your documents shortly.',
    { application }
  );

  res.status(response.statusCode).json(response);
});

// @desc    Get all applications (admin, paginated, filterable)
// @route   GET /api/v1/applications
// @access  Private/Admin
export const getAllApplications = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 20;
  const skip = (page - 1) * limit;

  const filter = { isDeleted: { $ne: true } };
  if (req.query.status) {
    filter.status = req.query.status;
  }

  const [applications, total] = await Promise.all([
    Application.find(filter)
      .populate('service', 'title category')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Application.countDocuments(filter),
  ]);

  const response = new ApiResponse(200, 'Applications retrieved successfully', {
    applications,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  });

  res.status(response.statusCode).json(response);
});

// @desc    Update application status or notes
// @route   PATCH /api/v1/applications/:id
// @access  Private/Admin
export const updateApplicationStatus = asyncHandler(async (req, res) => {
  const { status, notes, amountDue } = req.body;

  const application = await Application.findOne({ _id: req.params.id, isDeleted: { $ne: true } });
  if (!application) {
    throw new ApiError(404, 'Application not found');
  }

  if (status) application.status = status;
  if (notes !== undefined) application.notes = notes;
  if (amountDue !== undefined) application.amountDue = Number(amountDue);

  await application.save();

  const response = new ApiResponse(200, 'Application status updated successfully', { application });
  res.status(response.statusCode).json(response);
});

// @desc    Delete an application
// @route   DELETE /api/v1/applications/:id
// @access  Private/Admin
export const deleteApplication = asyncHandler(async (req, res) => {
  const application = await Application.findById(req.params.id);
  if (!application) {
    throw new ApiError(404, 'Application not found');
  }

  application.isDeleted = true;
  await application.save();

  const response = new ApiResponse(200, 'Application deleted successfully');
  res.status(response.statusCode).json(response);
});

// @desc    Track a public application status by ID, phone, or email
// @route   GET /api/v1/applications/track/:query
// @access  Public
export const trackApplication = asyncHandler(async (req, res) => {
  const { query } = req.params;

  let application;
  const isObjectId = /^[0-9a-fA-F]{24}$/.test(query);

  if (isObjectId) {
    application = await Application.findOne({ _id: query, isDeleted: { $ne: true } });
  } else {
    application = await Application.findOne({
      $or: [
        { phone: query },
        { email: query.trim().toLowerCase() }
      ],
      isDeleted: { $ne: true }
    }).sort({ createdAt: -1 });
  }

  if (!application) {
    throw new ApiError(404, 'No application registration found matching this tracking reference key.');
  }

  // Prevent PII exposure (remove phone, email, solvencyAmount, documents)
  const safeApplication = {
    _id: application._id,
    serviceTitle: application.serviceTitle,
    applicantName: application.applicantName, 
    status: application.status,
    createdAt: application.createdAt,
    updatedAt: application.updatedAt
  };

  const response = new ApiResponse(
    200,
    'Application status retrieved successfully.',
    { application: safeApplication }
  );

  res.status(response.statusCode).json(response);
});
