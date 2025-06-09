import jwt from 'jsonwebtoken';
import { IRestaurant } from '../models/Restaurant';

export const generateToken = (restaurant: IRestaurant): string => {
  return jwt.sign(
    { 
      id: restaurant._id,
      email: restaurant.email 
    },
    process.env.JWT_SECRET!,
    { expiresIn: '30d' }
  );
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET!);
};