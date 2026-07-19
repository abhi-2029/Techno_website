/**
 * CARD Technocrats & Engineers LLP - Express Endpoint Router
 * 
 * Senior Developer Notes:
 * - Directs endpoints for client registration submissions and admin operations.
 * - Protects admin read/write operations behind authorization middlewares.
 */

import { Router } from 'express';
import {
  createApplication,
  getAllApplications,
  updateApplicationStatus,
  deleteApplication,
  trackApplication
} from '../controllers/applicationController.js';
import { protect } from '../middleware/auth.js';
import { adminOnly } from '../middleware/admin.js';
import { validate } from '../middleware/validate.js';

const router = Router();

router.get('/track/:query', trackApplication);

router
  .route('/')
  .post(validate(['serviceId', 'applicantName', 'email', 'phone']), createApplication)
  .get(protect, adminOnly, getAllApplications);

router
  .route('/:id')
  .patch(protect, adminOnly, updateApplicationStatus)
  .delete(protect, adminOnly, deleteApplication);

export default router;
