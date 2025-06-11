import { Request, Response } from 'express';
import { Restaurant } from '../models/Restaurant';
import { initializeTransaction, processPayment } from '../services/paystackService';

export const activateSubscription = async (req: Request, res: Response): Promise<void> => {
  try {
    const restaurant = req.restaurant!;
    const { plan = 'basic', callbackUrl } = req.body;

    if (!['basic', 'premium'].includes(plan)) {
      res.status(400).json({ message: 'Invalid plan' });
      return;
    }

    // Initialize transaction
    const amount = plan === 'basic' ? 500000 : 1000000; // Amount in kobo
    const transaction = await initializeTransaction(
      restaurant.email,
      amount,
      callbackUrl || `${process.env.CORS_ORIGIN}/payment/callback`,
      { restaurantId: (restaurant._id as any).toString(), plan }
    );

    if (!transaction.status) {
      res.status(400).json({ message: transaction.message });
      return;
    }

    res.status(200).json({
      message: 'Transaction initialized',
      data: {
        authorizationUrl: transaction.data.authorization_url,
        reference: transaction.data.reference,
      },
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyPayment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { reference } = req.body;
    const restaurant = req.restaurant!;

    if (!reference) {
      res.status(400).json({ message: 'Reference is required' });
      return;
    }

    // Process payment and update subscription
    await processPayment(restaurant, reference, req.body.plan || 'basic');

    res.status(200).json({
      message: 'Subscription activated',
      subscription: restaurant.subscription,
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