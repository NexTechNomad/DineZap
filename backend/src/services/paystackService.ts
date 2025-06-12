import axios from "axios";
import { Restaurant, IRestaurant } from "../models/Restaurant";
import dotenv from "dotenv";

// Ensure environment variables are loaded
dotenv.config();

// Hardcode allowed Paystack endpoints to prevent SSRF
const ALLOWED_ENDPOINTS = {
  INITIALIZE: "/transaction/initialize",
  VERIFY: "/transaction/verify",
};

const PAYSTACK_BASE_URL = "https://api.paystack.co";
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

if (!PAYSTACK_SECRET_KEY) {
  console.error("PAYSTACK_SECRET_KEY is missing in environment variables");
  process.exit(1);
}

// Create a single axios instance with proper configuration
const paystackClient = axios.create({
  baseURL: PAYSTACK_BASE_URL,
  headers: {
    Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
    "Content-Type": "application/json",
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

// Validate transaction reference format
const isValidTransactionReference = (reference: string): boolean => {
  // Paystack reference format: typically alphanumeric, certain length
  return /^[a-zA-Z0-9_-]{10,50}$/.test(reference);
};

// Validate callback URL to prevent SSRF
const isValidCallbackUrl = (url: string): boolean => {
  try {
    const parsedUrl = new URL(url);
    // Only allow your application's domain
    return (
      parsedUrl.hostname === "your-app-domain.com" ||
      parsedUrl.hostname === "localhost" ||
      parsedUrl.hostname.endsWith(".your-app-domain.com")
    );
  } catch {
    return false;
  }
};

export const initializeTransaction = async (
  email: string,
  amount: number,
  callbackUrl: string,
  metadata: { restaurantId: string; plan: "basic" | "premium" }
): Promise<InitializeTransactionResponse> => {
  // Validate callback URL
  if (!isValidCallbackUrl(callbackUrl)) {
    throw new Error("Invalid callback URL");
  }

  try {
    const response = await paystackClient.post(ALLOWED_ENDPOINTS.INITIALIZE, {
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

export const verifyTransaction = async (
  reference: string
): Promise<VerifyTransactionResponse> => {
  // Validate transaction reference format
  if (!isValidTransactionReference(reference)) {
    throw new Error("Invalid transaction reference format");
  }

  try {
    // Use the paystackClient instance instead of creating a new axios request
    const response = await paystackClient.get(
      `${ALLOWED_ENDPOINTS.VERIFY}/${reference}`
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      `Failed to verify transaction: ${
        error.response?.data?.message || error.message
      }`
    );
  }
};

export const processPayment = async (
  restaurant: IRestaurant,
  reference: string,
  plan: "basic" | "premium"
): Promise<void> => {
  // Validate transaction reference format
  if (!isValidTransactionReference(reference)) {
    throw new Error("Invalid transaction reference format");
  }

  const verification = await verifyTransaction(reference);

  if (!verification.status || verification.data.status !== "success") {
    throw new Error("Payment verification failed");
  }

  // Verify amount (e.g., 5000 NGN = 500000 kobo for basic plan)
  const expectedAmount = plan === "basic" ? 500000 : 1000000; // Adjust amounts as needed
  if (verification.data.amount !== expectedAmount) {
    throw new Error("Invalid payment amount");
  }

  // Update subscription
  restaurant.subscription.plan = plan;
  restaurant.subscription.status = "active";
  restaurant.subscription.nextBilling = new Date(
    Date.now() + 30 * 24 * 60 * 60 * 1000
  ); // 30 days
  await restaurant.save();
};
