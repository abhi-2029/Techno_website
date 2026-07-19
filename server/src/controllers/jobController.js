/**
 * CARD Technocrats & Engineers LLP - API Controller Handlers
 * 
 * Senior Developer Notes:
 * - Controls careers portal recruitment workflows.
 * - Handles candidate resume submissions and provides admin recruitment boards.
 */

import Job from '../models/Job.js';
import JobApplication from '../models/JobApplication.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';
import { notifyAdminOfApplication } from '../utils/sendEmail.js';

// @desc    Get all open jobs (public)
// @route   GET /api/v1/careers/jobs
// @access  Public
export const getOpenJobs = asyncHandler(async (req, res) => {
  const query = { isClosed: false };

  // Support department filtering
  if (req.query.department) {
    query.department = req.query.department;
  }

  const jobs = await Job.find(query).sort({ createdAt: -1 });

  const response = new ApiResponse(
    200,
    'Jobs fetched successfully.',
    { jobs }
  );

  res.status(response.statusCode).json(response);
});

// @desc    Submit a job application (public)
// @route   POST /api/v1/careers/apply
// @access  Public
export const submitApplication = asyncHandler(async (req, res) => {
  const { jobId, name, email, phone, coverLetter, resumeUrl } = req.body;

  if (!jobId || !name || !email || !phone || !coverLetter || !resumeUrl) {
    throw new ApiError(400, 'Please complete all required candidate details.');
  }

  // Check if job exists
  const targetJob = await Job.findById(jobId);
  if (!targetJob) {
    throw new ApiError(404, 'The selected job position does not exist.');
  }

  const application = await JobApplication.create({
    jobId,
    name,
    email,
    phone,
    coverLetter,
    resumeUrl
  });

  // Send admin notification
  try {
    await notifyAdminOfApplication({
      jobTitle: targetJob.title,
      name,
      email,
      phone,
      coverLetter,
      resumeUrl
    });
  } catch (err) {
    console.error('Failed to send admin notification for application:', err.message);
  }

  const response = new ApiResponse(
    201,
    'Your application has been received successfully. Our hiring managers will review your profile.',
    { application }
  );

  res.status(response.statusCode).json(response);
});

// @desc    Get all candidate applications (admin only)
// @route   GET /api/v1/careers/applications
// @access  Private/Admin
export const getApplications = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const total = await JobApplication.countDocuments({});
  const applications = await JobApplication.find({})
    .populate('jobId', 'title department')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const response = new ApiResponse(
    200,
    'Candidate applications fetched successfully.',
    {
      applications,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    }
  );

  res.status(response.statusCode).json(response);
});

// @desc    Update candidate application status (admin only)
// @route   PATCH /api/v1/careers/applications/:id
// @access  Private/Admin
export const updateApplicationStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  if (!status) {
    throw new ApiError(400, 'Recruitment status is required.');
  }

  const application = await JobApplication.findById(req.params.id);
  if (!application) {
    throw new ApiError(404, 'Candidate application not found.');
  }

  application.status = status;
  await application.save();

  const response = new ApiResponse(
    200,
    `Candidate status updated to ${status}.`,
    { application }
  );

  res.status(response.statusCode).json(response);
});

// @desc    Delete candidate application record (admin only)
// @route   DELETE /api/v1/careers/applications/:id
// @access  Private/Admin
export const deleteApplication = asyncHandler(async (req, res) => {
  const application = await JobApplication.findById(req.params.id);
  if (!application) {
    throw new ApiError(404, 'Candidate application not found.');
  }

  await JobApplication.deleteOne({ _id: req.params.id });

  const response = new ApiResponse(
    200,
    'Candidate record deleted successfully.'
  );

  res.status(response.statusCode).json(response);
});

// @desc    Create a new job posting (admin only)
// @route   POST /api/v1/careers/jobs
// @access  Private/Admin
export const createJob = asyncHandler(async (req, res) => {
  const { title, department, location, type, description, requirements, responsibilities } = req.body;

  if (!title || !department || !location || !type || !description) {
    throw new ApiError(400, 'Please provide all required job fields (title, department, location, type, description).');
  }

  const job = await Job.create({
    title,
    department,
    location,
    type,
    description,
    requirements: requirements || [],
    responsibilities: responsibilities || [],
    isClosed: false
  });

  const response = new ApiResponse(
    201,
    'Job posting created successfully.',
    { job }
  );

  res.status(response.statusCode).json(response);
});

// @desc    Update a job posting (admin only)
// @route   PUT /api/v1/careers/jobs/:id
// @access  Private/Admin
export const updateJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);
  
  if (!job) {
    throw new ApiError(404, 'Job posting not found.');
  }

  const updatedJob = await Job.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true, runValidators: true }
  );

  const response = new ApiResponse(
    200,
    'Job posting updated successfully.',
    { job: updatedJob }
  );

  res.status(response.statusCode).json(response);
});

// @desc    Delete a job posting (admin only)
// @route   DELETE /api/v1/careers/jobs/:id
// @access  Private/Admin
export const deleteJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);
  
  if (!job) {
    throw new ApiError(404, 'Job posting not found.');
  }

  await Job.deleteOne({ _id: req.params.id });
  // Also delete all applications related to this job to avoid orphans
  await JobApplication.deleteMany({ jobId: req.params.id });

  const response = new ApiResponse(
    200,
    'Job posting and related applications deleted successfully.'
  );

  res.status(response.statusCode).json(response);
});

