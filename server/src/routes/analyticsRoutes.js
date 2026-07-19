/**
 * CARD Technocrats & Engineers LLP - Express Endpoint Router
 * 
 * Senior Developer Notes:
 * - Registers routing configurations to corresponding controller actions.
 * - Mounts authentication filters or admin check middlewares where needed.
 */

import { Router } from 'express';
import { getStats } from '../controllers/analyticsController.js';
import { protect } from '../middleware/auth.js';
import { adminOnly } from '../middleware/admin.js';

const router = Router();

// Mounts router endpoint path to request controller chain
router.get('/stats', protect, adminOnly, getStats);

export default router;
