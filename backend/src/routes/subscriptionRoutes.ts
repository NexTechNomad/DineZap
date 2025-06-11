import { Router } from 'express';
import { activateSubscription, getSubscriptionStatus, verifyPayment } from '../controllers/subscriptionController';
import { authenticateToken } from '../middleware/authValidation';

const router = Router();

router.post('/activate', authenticateToken, activateSubscription);
router.post('/verify', authenticateToken, verifyPayment);
router.get('/status', authenticateToken, getSubscriptionStatus);

export default router;