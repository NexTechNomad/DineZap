import axios from 'axios';
import { Restaurant, IRestaurant } from '../models/Restaurant';
import dotenv from 'dotenv';

// Ensure environment variables are loaded
dotenv.config();

const PAYSTACK_BASE_URL = 'https://api.paystack.co';
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

if (!PAYSTACK_SECRET_KEY) {
  console.error('PAYSTACK_SECRET_KEY is missing in environment variables');
  process.exit(1);
}

const paystackClient = axios.create({
  baseURL: PAYSTACK_BASE_URL,
  headers: {
    Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
    'Content-Type': 'application/json',
  },
});

interface InitializeTransactionResponse {
  status: boolean;
  message: string;
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}

interface VerifyTransactionResponse {
  status: boolean;
  message: string;
  data: {
    status: string;
    amount: number;
    currency: string;
    customer: {
      email: string;
    };
    reference: string;
  };
}

export const initializeTransaction = async (
  email: string,
  amount: number,
  callbackUrl: string,
  metadata: { restaurantId: string; plan: 'basic' | 'premium' }
): Promise<InitializeTransactionResponse> => {
  try {
    const response = await paystackClient.post('/transaction/initialize', {
      email,
      amount,
      callback_url: callbackUrl,
      metadata,
    });
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(`Paystack Error: ${error.response.data.message}`);
    }
    throw new Error(`Failed to initialize transaction: ${error.message}`);
  }
};

export const verifyTransaction = async (reference: string): Promise<VerifyTransactionResponse> => {
  try {
    const response = await axios.get(
      `${PAYSTACK_BASE_URL}/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(`Failed to verify transaction: ${error.response?.data?.message || error.message}`);
  }
};

export const processPayment = async (
  restaurant: IRestaurant,
  reference: string,
  plan: 'basic' | 'premium'
): Promise<void> => {
  const verification = await verifyTransaction(reference);

  if (!verification.status || verification.data.status !== 'success') {
    throw new Error('Payment verification failed');
  }

  // Verify amount (e.g., 5000 NGN = 500000 kobo for basic plan)
  const expectedAmount = plan === 'basic' ? 500000 : 1000000; // Adjust amounts as needed
  if (verification.data.amount !== expectedAmount) {
    throw new Error('Invalid payment amount');
  }

  // Update subscription
  restaurant.subscription.plan = plan;
  restaurant.subscription.status = 'active';
  restaurant.subscription.nextBilling = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
  await restaurant.save();
};