/**
 * CARD Technocrats & Engineers LLP - Express Endpoint Router
 * 
 * Senior Developer Notes:
 * - Registers routing configurations to corresponding controller actions.
 * - Mounts authentication filters or admin check middlewares where needed.
 */

import { Router } from 'express';
import {
  subscribe,
  getAllSubscribers,
  unsubscribe,
} from '../controllers/newsletterController.js';
import { protect } from '../middleware/auth.js';
import { adminOnly } from '../middleware/admin.js';
import { validate } from '../middleware/validate.js';

const router = Router();

// Mounts router endpoint path to request controller chain
router.post('/subscribe', validate(['email']), subscribe);
// Mounts router endpoint path to request controller chain
router.get('/', protect, adminOnly, getAllSubscribers);
// Mounts router endpoint path to request controller chain
router.delete('/:id', protect, adminOnly, unsubscribe);

export default router;
