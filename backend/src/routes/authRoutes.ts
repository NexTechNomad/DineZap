import { Router } from 'express';
import { registerRestaurant, loginRestaurant, logoutRestaurant, getRestaurantInfo } from '../controllers/authController';
import { validateRegister, validateLogin, authenticateToken } from '../middleware/authValidation';

const router = Router();

router.post('/register', validateRegister, registerRestaurant);
router.post('/login', validateLogin, loginRestaurant);
router.post('/logout', authenticateToken, logoutRestaurant);
router.get('/me', authenticateToken, getRestaurantInfo);

export default router;