import { Request, Response } from "express";
import { Restaurant } from "../models/Restaurant";
import { Order } from "../models/Order";
import { Table } from "../models/Table";
import QRCode from "qrcode";

export const getRestaurantBySlug = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { slug } = req.params;
    const restaurant = await Restaurant.findOne({ slug });
    if (!restaurant) {
      res.status(404).json({ message: "Restaurant not found" });
      return;
    }
    res.status(200).json({
      id: restaurant._id,
      name: restaurant.name,
      email: restaurant.email,
      phone: restaurant.phone,
      address: restaurant.address,
      slug: restaurant.slug,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateRestaurant = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    // First get the current restaurant
    const currentRestaurant = await Restaurant.findById(id);
    if (!currentRestaurant) {
      res.status(404).json({ message: "Restaurant not found" });
      return;
    }

    // Check table limit if settings are being updated
    if (req.body.settings?.tablesCount) {
      const newTablesCount = req.body.settings.tablesCount;
      if (
        currentRestaurant.subscription.plan === "basic" &&
        newTablesCount > 20
      ) {
        res.status(400).json({
          message:
            "Basic plan is limited to 20 tables. Please upgrade to premium for unlimited tables.",
        });
        return;
      }
    }

    // Now proceed with the update
    const restaurant = await Restaurant.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!restaurant) {
      res.status(404).json({ message: "Restaurant not found" });
      return;
    }

    res.status(200).json({
      id: restaurant._id,
      name: restaurant.name,
      email: restaurant.email,
      phone: restaurant.phone,
      address: restaurant.address,
      slug: restaurant.slug,
      settings: restaurant.settings,
      subscription: restaurant.subscription,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getRestaurantAnalytics = async (
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
    const popularItems = await Order.aggregate([
      { $match: { restaurantId: id } },
      { $unwind: "$items" },
      { $group: { _id: "$items.name", count: { $sum: "$items.quantity" } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);
    res.status(200).json({ totalRevenue, orderCount, popularItems });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createTables = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { tablesCount } = req.body;

    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      res.status(404).json({ message: "Restaurant not found" });
      return;
    }

    // Check table limit based on subscription plan
    if (restaurant.subscription.plan === "basic" && tablesCount > 20) {
      res.status(400).json({
        message:
          "Basic plan is limited to 20 tables. Please upgrade to premium for unlimited tables.",
      });
      return;
    }

    await Table.deleteMany({ restaurantId: id });
    const tables = [];
    for (let i = 1; i <= tablesCount; i++) {
      const qrCode = await QRCode.toDataURL(
        `/menu/${restaurant.slug}/table/${i}`
      );
      tables.push({
        restaurantId: id,
        tableNumber: i,
        qrCode,
        status: "available",
      });
    }
    await Table.insertMany(tables);
    restaurant.settings.tablesCount = tablesCount;
    await restaurant.save();
    res.status(201).json(tables);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
