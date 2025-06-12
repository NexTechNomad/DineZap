import { Request, Response } from "express";
import { Schema } from "mongoose";
import { Order } from "../models/Order";
import { Restaurant } from "../models/Restaurant";
import { Table } from "../models/Table";
import { Server } from "socket.io";

export const createOrder = async (
  req: Request,
  res: Response,
  io: Server
): Promise<void> => {
  try {
    const {
      restaurantSlug,
      tableNumber,
      items,
      totalAmount,
      customerPhone,
      specialInstructions,
    } = req.body;
    if (typeof restaurantSlug !== "string" || !restaurantSlug) {
      res.status(400).json({ message: "Invalid restaurant slug" });
      return;
    }
    const restaurant = await Restaurant.findOne({
      slug: { $eq: restaurantSlug },
    });
    if (!restaurant) {
      res.status(404).json({ message: "Restaurant not found" });
      return;
    }
    const table = await Table.findOne({
      restaurantId: { $eq: restaurant._id },
      tableNumber: { $eq: tableNumber },
    });
    if (!table) {
      res.status(404).json({ message: "Table not found" });
      return;
    }
    const orderId = `${restaurantSlug.toUpperCase().slice(0, 3)}-${new Date()
      .toISOString()
      .slice(0, 10)
      .replace(/-/g, "")}-${Math.floor(100 + Math.random() * 900)}`;
    const order = await Order.create({
      orderId,
      restaurantId: restaurant._id,
      tableNumber,
      items,
      totalAmount,
      customerPhone,
      specialInstructions,
    });
    table.status = "occupied";
    table.currentOrderId = order._id as Schema.Types.ObjectId;
    await table.save();
    io.to(`kitchen-${restaurantSlug}`).emit("new-order", order);
    res.status(201).json(order);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { orderId } = req.params;
    if (typeof orderId !== "string" || !orderId) {
      res.status(400).json({ message: "Invalid order ID" });
      return;
    }
    const order = await Order.findOne({ orderId: { $eq: orderId } });
    if (!order) {
      res.status(404).json({ message: "Order not found" });
      return;
    }
    res.status(200).json(order);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getRestaurantOrders = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { status, startDate, endDate } = req.query;
    const query: any = { restaurantId: id };
    if (status) query.status = status;
    if (startDate && endDate) {
      query.createdAt = {
        $gte: new Date(startDate as string),
        $lte: new Date(endDate as string),
      };
    }
    const orders = await Order.find(query);
    res.status(200).json(orders);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateOrderStatus = async (
  req: Request,
  res: Response,
  io: Server
): Promise<void> => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const order = await Order.findOne({ orderId });
    if (!order) {
      res.status(404).json({ message: "Order not found" });
      return;
    }
    order.status = status;
    if (status === "cooking") order.timestamps.startedCooking = new Date();
    if (status === "ready") order.timestamps.ready = new Date();
    if (status === "served") {
      order.timestamps.served = new Date();
      const table = await Table.findOne({ currentOrderId: order._id });
      if (table) {
        table.status = "available";
        table.currentOrderId = null;
        await table.save();
      }
    }
    await order.save();
    io.to(`order-${orderId}`).emit("status-update", { orderId, status });
    res.status(200).json(order);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getTodayOrders = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const orders = await Order.find({
      restaurantId: id,
      createdAt: { $gte: today },
    });
    res.status(200).json(orders);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getOrderAnalytics = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { startDate, endDate } = req.query;
    const query: any = { restaurantId: id };
    if (startDate && endDate) {
      query.createdAt = {
        $gte: new Date(startDate as string),
        $lte: new Date(endDate as string),
      };
    }
    const orders = await Order.find(query);
    const totalRevenue = orders.reduce(
      (sum, order) => sum + order.totalAmount,
      0
    );
    const orderCount = orders.length;
    const averageOrderTime =
      orders
        .filter((o) => o.timestamps.ready && o.timestamps.ordered)
        .reduce(
          (sum, o) =>
            sum +
            (o.timestamps.ready!.getTime() - o.timestamps.ordered!.getTime()),
          0
        ) /
        orderCount /
        1000 /
        60 || 0;
    res.status(200).json({ totalRevenue, orderCount, averageOrderTime });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
