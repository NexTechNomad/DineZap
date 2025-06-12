import express, { Express } from "express";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { Server } from "socket.io";
import authRoutes from "./routes/authRoutes";
import restaurantRoutes from "./routes/restaurantRoutes";
import menuRoutes from "./routes/menuRoutes";
import orderRoutes from "./routes/orderRoutes";
import customerRoutes from "./routes/customerRoutes";
import subscriptionRoutes from "./routes/subscriptionRoutes";
import { processPayment } from "./services/paystackService";
import { Restaurant } from "./models/Restaurant";
import { Request, Response } from "express";
import {
  globalLimiter,
  authLimiter,
  apiLimiter,
} from "./middleware/rateLimiter";

dotenv.config();

const app: Express = express();

// Middleware
app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(helmet());
app.use(express.json());

// Apply global rate limiter to all routes
app.use(globalLimiter);

// Webhook for Paystack (must be before routes to avoid JSON parsing issues for webhook)
app.post(
  "/api/paystack/webhook",
  express.raw({ type: "application/json" }),
  async (req: Request, res: Response) => {
    try {
      const signature = req.headers["x-paystack-signature"] as string;
      if (!signature) {
        res.status(400).json({ message: "No signature provided" });
        return;
      }

      const event = JSON.parse(req.body.toString());
      if (event.event === "charge.success") {
        const { reference, metadata } = event.data;
        const restaurant = await Restaurant.findById(metadata.restaurantId);
        if (!restaurant) {
          res.status(404).json({ message: "Restaurant not found" });
          return;
        }
        await processPayment(restaurant, reference, metadata.plan);
      }

      res.status(200).send("Webhook received");
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Apply stricter rate limiting to auth routes
app.use("/api/auth/restaurant", authLimiter, authRoutes);

// Routes with API rate limiting
app.use("/api/restaurants", apiLimiter, restaurantRoutes);
app.use("/api", apiLimiter, menuRoutes);
app.use(
  "/api/orders",
  apiLimiter,
  (req, res, next) => {
    (req as any).io = (app as any).io;
    next();
  },
  orderRoutes
);
app.use("/api", apiLimiter, customerRoutes);
app.use("/api/subscription", apiLimiter, subscriptionRoutes);

app.get("/", (req, res) => {
  res.send("DineZap API is running");
});

// Database connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI!);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export { app, connectDB };
