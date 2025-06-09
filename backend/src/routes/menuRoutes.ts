import { Router, Request, Response, NextFunction } from 'express';
import { getPublicMenu, getAdminMenu, updateMenu, addMenuItem, updateMenuItem, deleteMenuItem } from '../controllers/menuController';
import { authenticateToken } from '../middleware/authValidation';
import { body, validationResult } from 'express-validator';

const router = Router();

router.get('/:slug/menu', getPublicMenu);
router.get('/:id/menu/admin', authenticateToken, getAdminMenu);
router.put('/:id/menu', authenticateToken, [
  body('categories').isArray().withMessage('Categories must be an array'),
], (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  next();
}, updateMenu);

router.post('/:id/menu/items', authenticateToken, [
  body('categoryName').notEmpty().withMessage('Category name is required'),
  body('item.name').notEmpty().withMessage('Item name is required'),
  body('item.price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
], (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  next();
}, addMenuItem);

router.put('/:id/menu/items/:itemId', authenticateToken, updateMenuItem);
router.delete('/:id/menu/items/:itemId', authenticateToken, [
  body('categoryName').notEmpty().withMessage('Category name is required'),
], (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  next();
}, deleteMenuItem);

export default router;