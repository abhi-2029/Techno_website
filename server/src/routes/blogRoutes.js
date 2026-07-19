/**
 * CARD Technocrats & Engineers LLP - Express Endpoint Router
 * 
 * Senior Developer Notes:
 * - Registers routing configurations to corresponding controller actions.
 * - Mounts authentication filters or admin check middlewares where needed.
 */

import { Router } from 'express';
import {
  getAllBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
} from '../controllers/blogController.js';
import { protect } from '../middleware/auth.js';
import { adminOnly } from '../middleware/admin.js';
import { validate } from '../middleware/validate.js';

const router = Router();

router
  .route('/')
  .get(getAllBlogs)
  .post(protect, adminOnly, validate(['title', 'content']), createBlog);

router.route('/:slug').get(getBlogBySlug);

router
  .route('/:id')
  .put(protect, adminOnly, updateBlog)
  .delete(protect, adminOnly, deleteBlog);

export default router;
