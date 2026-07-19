/**
 * CARD Technocrats & Engineers LLP - Express Endpoint Router
 * 
 * Senior Developer Notes:
 * - Registers routing configurations to corresponding controller actions.
 * - Mounts authentication filters or admin check middlewares where needed.
 */

import { Router } from 'express';
import { register, login, getMe, logout } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';
import { validateZod } from '../middleware/validateZod.js';
import { registerSchema, loginSchema } from '../schemas/authSchema.js';
import rateLimit from 'express-rate-limit';

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login requests per windowMs
  message: 'Too many login attempts from this IP, please try again after 15 minutes'
});

const router = Router();

// Mounts router endpoint path to request controller chain
// Mounts router endpoint path to request controller chain
router.post('/register', validateZod(registerSchema), register);
// Mounts router endpoint path to request controller chain
router.post('/login', loginLimiter, validateZod(loginSchema), login);
// Mounts router endpoint path to request controller chain
router.get('/me', protect, getMe);
// Mounts router endpoint path to request controller chain
router.post('/logout', protect, logout);

export default router;
