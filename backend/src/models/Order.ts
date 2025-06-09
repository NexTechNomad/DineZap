import { Schema, model, Document } from 'mongoose';

export interface IOrder extends Document {
  orderId: string;
  restaurantId: Schema.Types.ObjectId;
  tableNumber: number;
  items: {
    name: string;
    price: number;
    quantity: number;
    modifications: string;
    totalPrice: number;
  }[];
  totalAmount: number;
  status: 'pending' | 'cooking' | 'ready' | 'served' | 'cancelled';
  customerPhone: string;
  specialInstructions: string;
  timestamps: {
    ordered: Date;
    startedCooking: Date;
    ready: Date;
    served: Date;
  };
}

const orderSchema = new Schema<IOrder>(
  {
    orderId: { type: String, unique: true, required: true },
    restaurantId: { type: Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    tableNumber: { type: Number, required: true },
    items: [{
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
      modifications: String,
      totalPrice: { type: Number, required: true }
    }],
    totalAmount: { type: Number, required: true },
    status: { 
      type: String, 
      enum: ['pending', 'cooking', 'ready', 'served', 'cancelled'], 
      default: 'pending' 
    },
    customerPhone: String,
    specialInstructions: String,
    timestamps: {
      ordered: { type: Date, default: Date.now },
      startedCooking: Date,
      ready: Date,
      served: Date
    }
  },
  { timestamps: true }
);

export const Order = model<IOrder>('Order', orderSchema);