import { Router, Request, Response, NextFunction } from 'express';
import { createOrder, getOrder, getRestaurantOrders, updateOrderStatus, getTodayOrders, getOrderAnalytics } from '../controllers/orderController';
import { authenticateToken } from '../middleware/authValidation';
import { body, validationResult } from 'express-validator';

const router = Router();

router.post('/', [
  body('restaurantSlug').notEmpty().withMessage('Restaurant slug is required'),
  body('tableNumber').isInt({ min: 1 }).withMessage('Valid table number is required'),
  body('items').isArray().withMessage('Items must be an array'),
  body('totalAmount').isFloat({ min: 0 }).withMessage('Total amount must be a positive number'),
], (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  next();
}, (req: Request, res: Response) => createOrder(req, res, (req as any).io));

router.get('/:orderId', getOrder);

router.get('/restaurants/:id/orders', authenticateToken, getRestaurantOrders);

router.put('/:orderId/status', authenticateToken, [
  body('status').isIn(['pending', 'cooking', 'ready', 'served', 'cancelled']).withMessage('Invalid status'),
], (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  next();
}, (req: Request, res: Response) => updateOrderStatus(req, res, (req as any).io));

router.get('/restaurants/:id/orders/today', authenticateToken, getTodayOrders);

router.get('/restaurants/:id/orders/analytics', authenticateToken, getOrderAnalytics);

export default router;