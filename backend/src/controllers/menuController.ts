import { Request, Response } from "express";
import { Menu } from "../models/Menu";

export const getPublicMenu = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { slug } = req.params;
    if (typeof slug !== "string" || !slug) {
      res.status(400).json({ message: "Invalid slug" });
      return;
    }
    const restaurant = await (
      await import("../models/Restaurant")
    ).Restaurant.findOne({
      slug: { $eq: slug },
    });
    const menu = await Menu.findOne({ restaurantId: { $eq: restaurant?._id } });
    if (!menu) {
      res.status(404).json({ message: "Menu not found" });
      return;
    }
    res.status(200).json(menu);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAdminMenu = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const menu = await Menu.findOne({ restaurantId: id });
    if (!menu) {
      res.status(404).json({ message: "Menu not found" });
      return;
    }
    res.status(200).json(menu);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateMenu = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { categories } = req.body;
    let menu = await Menu.findOne({ restaurantId: id });
    if (!menu) {
      menu = await Menu.create({ restaurantId: id, categories });
    } else {
      menu.categories = categories;
      await menu.save();
    }
    res.status(200).json(menu);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const addMenuItem = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { categoryName, item } = req.body;
    let menu = await Menu.findOne({ restaurantId: id });
    if (!menu) {
      menu = await Menu.create({
        restaurantId: id,
        categories: [{ name: categoryName, items: [item] }],
      });
    } else {
      const category = menu.categories.find((cat) => cat.name === categoryName);
      if (category) {
        category.items.push(item);
      } else {
        menu.categories.push({ name: categoryName, items: [item] });
      }
      await menu.save();
    }
    res.status(201).json(menu);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateMenuItem = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id, itemId } = req.params;
    const { categoryName, item } = req.body;
    const menu = await Menu.findOne({ restaurantId: id });
    if (!menu) {
      res.status(404).json({ message: "Menu not found" });
      return;
    }
    const category = menu.categories.find((cat) => cat.name === categoryName);
    if (!category) {
      res.status(404).json({ message: "Category not found" });
      return;
    }
    const itemIndex = category.items.findIndex(
      (i) => i._id.toString() === itemId
    );
    if (itemIndex === -1) {
      res.status(404).json({ message: "Item not found" });
      return;
    }
    category.items[itemIndex] = { ...category.items[itemIndex], ...item };
    await menu.save();
    res.status(200).json(menu);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteMenuItem = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id, itemId } = req.params;
    const { categoryName } = req.body;
    const menu = await Menu.findOne({ restaurantId: id });
    if (!menu) {
      res.status(404).json({ message: "Menu not found" });
      return;
    }
    const category = menu.categories.find((cat) => cat.name === categoryName);
    if (!category) {
      res.status(404).json({ message: "Category not found" });
      return;
    }
    category.items = category.items.filter((i) => i._id.toString() !== itemId);
    await menu.save();
    res.status(200).json({ message: "Item deleted" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
