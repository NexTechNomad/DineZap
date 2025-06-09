import { Schema, model, Document } from 'mongoose';

export interface ITable extends Document {
  restaurantId: Schema.Types.ObjectId;
  tableNumber: number;
  qrCode: string;
  status: 'available' | 'occupied' | 'reserved';
  currentOrderId: Schema.Types.ObjectId | null;
}

const tableSchema = new Schema<ITable>(
  {
    restaurantId: { type: Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    tableNumber: { type: Number, required: true },
    qrCode: { type: String, required: true },
    status: { 
      type: String, 
      enum: ['available', 'occupied', 'reserved'], 
      default: 'available' 
    },
    currentOrderId: { type: Schema.Types.ObjectId, ref: 'Order' }
  },
  { timestamps: true }
);

export const Table = model<ITable>('Table', tableSchema);