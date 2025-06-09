import { Router } from 'express';
import { activateSubscription, getSubscriptionStatus } from '../controllers/subscriptionController';
import { authenticateToken } from '../middleware/authValidation';

const router = Router();

router.post('/activate', authenticateToken, activateSubscription);
router.get('/status', authenticateToken, getSubscriptionStatus);

export default router;