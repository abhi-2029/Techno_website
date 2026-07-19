import { Router } from 'express';
import { getMyApplications, getMyBookings } from '../controllers/clientController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

// Protect all client routes
router.use(protect);

router.get('/applications', getMyApplications);
router.get('/bookings', getMyBookings);

export default router;
