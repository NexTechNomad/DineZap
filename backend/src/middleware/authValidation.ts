import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import { Restaurant } from '../models/Restaurant';
import { verifyToken } from '../utils/jwt';

export const validateRegister = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('phone').notEmpty().withMessage('Phone number is required'),
  body('address.street').notEmpty().withMessage('Street address is required'),
  body('address.city').notEmpty().withMessage('City is required'),
  body('address.state').notEmpty().withMessage('State is required'),
  body('address.zipCode').notEmpty().withMessage('Zip code is required'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    next();
  },
];

export const validateLogin = [
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').notEmpty().withMessage('Password is required'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    next();
  },
];

export const authenticateToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Get token from header
    const authHeader = req.headers['authorization'];
    console.log('Auth Header:', authHeader);
    const token = authHeader && authHeader.split(' ')[1];
    console.log('Token:', token);

    if (!token) {
      res.status(401).json({ message: 'No token provided' });
      return;
    }

    // Verify token
    const decoded = verifyToken(token) as { id: string; email: string };
    console.log('Decoded token:', decoded);

    // Get restaurant from database
    const restaurant = await Restaurant.findById(decoded.id);
    console.log('Found restaurant:', restaurant);

    if (!restaurant) {
      res.status(404).json({ message: 'Restaurant not found' });
      return;
    }

    // Check if the current path is subscription-related
    const isSubscriptionEndpoint = req.path.includes('/subscription/') || 
                                 req.path.includes('/activate') || 
                                 req.path.includes('/subscribe');
    console.log('Is subscription endpoint:', isSubscriptionEndpoint);
    console.log('Current path:', req.path);

    // Check subscription status
    console.log('Restaurant subscription status:', restaurant.subscription.status);
    if (restaurant.subscription.status !== 'active' && !isSubscriptionEndpoint) {
      res.status(403).json({ message: 'Access denied - Subscription not active' });
      return;
    }

    // Add restaurant to request object
    req.restaurant = restaurant;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(403).json({ message: 'Invalid token' });
    return;
  }
};