/**
 * CARD Technocrats & Engineers LLP - Express Endpoint Router
 * 
 * Senior Developer Notes:
 * - Registers routing configurations to corresponding controller actions.
 * - Mounts authentication filters or admin check middlewares where needed.
 */

import { Router } from 'express';
import {
  getAllGallery,
  getGalleryById,
  createGallery,
  updateGallery,
  deleteGallery,
} from '../controllers/galleryController.js';
import { protect } from '../middleware/auth.js';
import { adminOnly } from '../middleware/admin.js';
import { uploadMultiple } from '../middleware/upload.js';
import { validate } from '../middleware/validate.js';

const router = Router();

router
  .route('/')
  .get(getAllGallery)
  .post(protect, adminOnly, uploadMultiple('images', 5), validate(['title', 'projectType']), createGallery);

router
  .route('/:id')
  .get(getGalleryById)
  .put(protect, adminOnly, uploadMultiple('images', 5), updateGallery)
  .delete(protect, adminOnly, deleteGallery);

export default router;
