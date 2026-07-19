/**
 * CARD Technocrats & Engineers LLP - Express Endpoint Router
 * 
 * Senior Developer Notes:
 * - Registers routing configurations to corresponding controller actions.
 * - Mounts authentication filters or admin check middlewares where needed.
 */

import { Router } from 'express';
import {
  createContact,
  getAllContacts,
  markAsRead,
  deleteContact,
} from '../controllers/contactController.js';
import { protect } from '../middleware/auth.js';
import { adminOnly } from '../middleware/admin.js';
import { validate } from '../middleware/validate.js';

const router = Router();

router
  .route('/')
  .post(validate(['name', 'email', 'subject', 'message']), createContact)
  .get(protect, adminOnly, getAllContacts);

// Mounts router endpoint path to request controller chain
router.patch('/:id/read', protect, adminOnly, markAsRead);
// Mounts router endpoint path to request controller chain
router.delete('/:id', protect, adminOnly, deleteContact);

export default router;
