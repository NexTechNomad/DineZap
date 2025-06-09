import { Request, Response } from 'express';
import { Restaurant } from '../models/Restaurant';
import { generateToken } from '../utils/jwt';
import { RegisterRestaurantDto, LoginRestaurantDto } from '../types/auth';

export const registerRestaurant = async (req: Request<{}, {}, RegisterRestaurantDto>, res: Response): Promise<void> => {
  try {
    const { name, email, password, phone, address } = req.body;

    const existingRestaurant = await Restaurant.findOne({ email });
    if (existingRestaurant) {
      res.status(400).json({ message: 'Restaurant already exists' });
      return;
    }

    const slug = name.toLowerCase().replace(/\s+/g, '-');
    
    const restaurant = await Restaurant.create({
      name,
      email,
      password,
      phone,
      address,
      slug
    });

    const token = generateToken(restaurant);

    res.status(201).json({
      token,
      restaurant: {
        id: restaurant._id,
        name: restaurant.name,
        email: restaurant.email,
        phone: restaurant.phone,
        address: restaurant.address,
        slug: restaurant.slug
      }
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const loginRestaurant = async (req: Request<{}, {}, LoginRestaurantDto>, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const restaurant = await Restaurant.findOne({ email });
    if (!restaurant) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const isPasswordValid = await restaurant.comparePassword(password);
    if (!isPasswordValid) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const token = generateToken(restaurant);

    res.status(200).json({
      token,
      restaurant: {
        id: restaurant._id,
        name: restaurant.name,
        email: restaurant.email,
        slug: restaurant.slug
      }
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const logoutRestaurant = async (req: Request, res: Response): Promise<void> => {
  try {
    // Since JWT is stateless, logout is handled client-side by removing the token
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getRestaurantInfo = async (req: Request, res: Response): Promise<void> => {
  try {
    const restaurant = req.restaurant;

    // Basic info always visible
    const responseData = {
      id: restaurant?._id,
      name: restaurant?.name,
      email: restaurant?.email,
      phone: restaurant?.phone,
      address: restaurant?.address,
      slug: restaurant?.slug
    };

    // Include settings and subscription for active subscriptions
    if (restaurant?.subscription?.status === 'active') {
      Object.assign(responseData, {
        settings: restaurant.settings,
        subscription: restaurant.subscription
      });
    }

    res.status(200).json({ restaurant: responseData });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};