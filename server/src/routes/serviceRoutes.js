/**
 * CARD Technocrats & Engineers LLP - Express Endpoint Router
 * 
 * Senior Developer Notes:
 * - Registers routing configurations to corresponding controller actions.
 * - Mounts authentication filters or admin check middlewares where needed.
 */

import { Router } from 'express';
import {
  getAllServices,
  getServiceBySlug,
  createService,
  updateService,
  deleteService,
} from '../controllers/serviceController.js';
import { protect } from '../middleware/auth.js';
import { adminOnly } from '../middleware/admin.js';
import { validate } from '../middleware/validate.js';

const router = Router();

router
  .route('/')
  .get(getAllServices)
  .post(protect, adminOnly, validate(['title', 'shortDescription']), createService);

router.route('/:slug').get(getServiceBySlug);

router
  .route('/:id')
  .put(protect, adminOnly, updateService)
  .delete(protect, adminOnly, deleteService);

export default router;
