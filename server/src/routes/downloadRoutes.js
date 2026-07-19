/**
 * CARD Technocrats & Engineers LLP - Express Endpoint Router
 * 
 * Senior Developer Notes:
 * - Registers routing configurations to corresponding controller actions.
 * - Mounts authentication filters or admin check middlewares where needed.
 */

import { Router } from 'express';
import {
  getAllDownloads,
  createDownload,
  updateDownload,
  deleteDownload,
  incrementDownload,
} from '../controllers/downloadController.js';
import { protect } from '../middleware/auth.js';
import { adminOnly } from '../middleware/admin.js';
import { uploadSingle } from '../middleware/upload.js';
import { validate } from '../middleware/validate.js';

const router = Router();

router
  .route('/')
  .get(getAllDownloads)
  .post(protect, adminOnly, uploadSingle('file'), validate(['title', 'category']), createDownload);

router
  .route('/:id')
  .put(protect, adminOnly, uploadSingle('file'), updateDownload)
  .delete(protect, adminOnly, deleteDownload);

router.route('/:id/download').patch(incrementDownload);

export default router;
