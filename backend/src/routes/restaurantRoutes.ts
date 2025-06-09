import { Router } from 'express';
import { getRestaurantBySlug, updateRestaurant, getRestaurantAnalytics, createTables } from '../controllers/restaurantController';
import { authenticateToken } from '../middleware/authValidation';

const router = Router();

router.get('/:slug', getRestaurantBySlug);
router.put('/:id', authenticateToken, updateRestaurant);
router.get('/:id/analytics', authenticateToken, getRestaurantAnalytics);
router.post('/:id/tables', authenticateToken, createTables);

export default router;