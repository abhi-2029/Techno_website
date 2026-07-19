import { Router } from 'express';
import { createOrder, verifyPayment } from '../controllers/paymentController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

// Protect all payment routes
router.use(protect);

router.post('/create-order', createOrder);
router.post('/verify', verifyPayment);

export default router;
