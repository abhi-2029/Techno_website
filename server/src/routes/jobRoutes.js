/**
 * CARD Technocrats & Engineers LLP - Express Endpoint Router
 * 
 * Senior Developer Notes:
 * - Directs endpoints for jobs listings, applicant filings, and admin dashboards.
 * - Protects applicant review list controls behind admin check validation layers.
 */

import { Router } from 'express';
import {
  getOpenJobs,
  submitApplication,
  getApplications,
  updateApplicationStatus,
  deleteApplication,
  createJob,
  updateJob,
  deleteJob
} from '../controllers/jobController.js';
import { protect } from '../middleware/auth.js';
import { adminOnly } from '../middleware/admin.js';

const router = Router();

// Public recruitment pipelines
router.get('/jobs', getOpenJobs);
router.post('/apply', submitApplication);

// Admin dashboard recruitment routes
router.get('/applications', protect, adminOnly, getApplications);
router
  .route('/applications/:id')
  .patch(protect, adminOnly, updateApplicationStatus)
  .delete(protect, adminOnly, deleteApplication);

// Admin dashboard job posting management
router.post('/jobs', protect, adminOnly, createJob);
router
  .route('/jobs/:id')
  .put(protect, adminOnly, updateJob)
  .delete(protect, adminOnly, deleteJob);

export default router;
