import { IRestaurant } from '../models/Restaurant';

export interface RegisterRestaurantDto {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

export interface LoginRestaurantDto {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  restaurant: {
    id: string;
    name: string;
    email: string;
    slug: string;
  };
}

declare global {
  namespace Express {
    interface Request {
      restaurant?: IRestaurant;
    }
  }
}