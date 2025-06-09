import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IRestaurant extends Document {
  name: string;
  slug: string;
  email: string;
  password: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  settings: {
    tablesCount: number;
    acceptOrders: boolean;
    estimatedWaitTime: number;
  };
  subscription: {
    plan: 'basic' | 'premium';
    status: 'active' | 'inactive';
    nextBilling: Date;
  };
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const restaurantSchema = new Schema<IRestaurant>(
  {
    name: { type: String, required: true },
    slug: { type: String, unique: true, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String
    },
    settings: {
      tablesCount: { type: Number, default: 20 },
      acceptOrders: { type: Boolean, default: true },
      estimatedWaitTime: { type: Number, default: 15 }
    },
    subscription: {
      plan: { type: String, enum: ['basic', 'premium'], default: 'basic' },
      status: { type: String, enum: ['active', 'inactive'], default: 'inactive' },
      nextBilling: Date
    }
  },
  { timestamps: true }
);

// Hash password before saving
restaurantSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Compare password method
restaurantSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export const Restaurant = model<IRestaurant>('Restaurant', restaurantSchema);