import { Request, Response } from "express";
import { Restaurant } from "../models/Restaurant";
import { Menu } from "../models/Menu";
import { Table } from "../models/Table";
import { Order } from "../models/Order";

export const getMenuAndTable = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { restaurantSlug, tableNumber } = req.params;

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
    const menu = await Menu.findOne({ restaurantId: restaurant._id });
    const tableNum = parseInt(tableNumber);
    if (isNaN(tableNum)) {
      res.status(400).json({ message: "Invalid table number" });
      return;
    }
    const table = await Table.findOne({
      restaurantId: { $eq: restaurant._id },
      tableNumber: { $eq: tableNum },
    });
    if (!table) {
      res.status(404).json({ message: "Table not found" });
      return;
    }
    res.status(200).json({
      restaurant: {
        id: restaurant._id,
        name: restaurant.name,
        slug: restaurant.slug,
      },
      menu,
      table,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const trackOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { orderId } = req.body;
    const order = await Order.findOne({ orderId }).populate(
      "restaurantId",
      "name slug"
    );
    if (!order) {
      res.status(404).json({ message: "Order not found" });
      return;
    }
    res.status(200).json(order);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getRestaurantInfo = async (
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
