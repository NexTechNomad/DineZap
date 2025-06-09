import { Router, Request, Response, NextFunction } from 'express';
import { getMenuAndTable, trackOrder, getRestaurantInfo } from '../controllers/customerController';
import { body, validationResult } from 'express-validator';

const router = Router();

router.get('/menu/:restaurantSlug/table/:tableNumber', getMenuAndTable);

router.post('/orders/track', [
  body('orderId').notEmpty().withMessage('Order ID is required'),
], (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  next();
}, trackOrder);

router.get('/restaurants/:slug/info', getRestaurantInfo);

export default router;