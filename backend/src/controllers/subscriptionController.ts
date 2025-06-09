import { Request, Response } from 'express';
import { Restaurant } from '../models/Restaurant';

export const activateSubscription = async (req: Request, res: Response): Promise<void> => {
  try {
    const restaurant = req.restaurant;
    // Placeholder for payment verification (e.g., Stripe)
    // const payment = await verifyPayment(req.body.paymentId);
    
    restaurant!.subscription.status = 'active';
    restaurant!.subscription.nextBilling = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
    await restaurant!.save();

    res.status(200).json({
      message: 'Subscription activated',
      subscription: restaurant!.subscription
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getSubscriptionStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const restaurant = req.restaurant;
    res.status(200).json(restaurant!.subscription);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};