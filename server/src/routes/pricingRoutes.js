/**
 * CARD Technocrats & Engineers LLP - Express Endpoint Router
 * 
 * Senior Developer Notes:
 * - Registers routing configurations to corresponding controller actions.
 * - Mounts authentication filters or admin check middlewares where needed.
 */

import { Router } from 'express';
import {
  getAllPricing,
  getPricingBySlug,
  createPricing,
  updatePricing,
  deletePricing,
} from '../controllers/pricingController.js';
import { protect } from '../middleware/auth.js';
import { adminOnly } from '../middleware/admin.js';
import { validate } from '../middleware/validate.js';

const router = Router();

router
  .route('/')
  .get(getAllPricing)
  .post(protect, adminOnly, validate(['serviceName', 'tiers']), createPricing);

router.route('/:slug').get(getPricingBySlug);

router
  .route('/:id')
  .put(protect, adminOnly, updatePricing)
  .delete(protect, adminOnly, deletePricing);

export default router;
