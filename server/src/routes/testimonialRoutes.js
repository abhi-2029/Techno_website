/**
 * CARD Technocrats & Engineers LLP - Express Endpoint Router
 * 
 * Senior Developer Notes:
 * - Registers routing configurations to corresponding controller actions.
 * - Mounts authentication filters or admin check middlewares where needed.
 */

import { Router } from 'express';
import {
  getAllTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from '../controllers/testimonialController.js';
import { protect } from '../middleware/auth.js';
import { adminOnly } from '../middleware/admin.js';
import { validate } from '../middleware/validate.js';

const router = Router();

router
  .route('/')
  .get(getAllTestimonials)
  .post(protect, adminOnly, validate(['name', 'role', 'content']), createTestimonial);

router
  .route('/:id')
  .put(protect, adminOnly, updateTestimonial)
  .delete(protect, adminOnly, deleteTestimonial);

export default router;
