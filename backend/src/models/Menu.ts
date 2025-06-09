import { Schema, model, Document } from "mongoose";

export interface IMenu extends Document {
  restaurantId: Schema.Types.ObjectId;
  categories: {
    name: string;
    items: {
      _id: Schema.Types.ObjectId;
      name: string;
      description: string;
      price: number;
      image: string;
      available: boolean;
      prepTime: number;
      tags: string[];
    }[];
  }[];
}

const menuSchema = new Schema<IMenu>(
  {
    restaurantId: {
      type: Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    categories: [
      {
        name: { type: String, required: true },
        items: [
          {
            name: { type: String, required: true },
            description: String,
            price: { type: Number, required: true },
            image: String,
            available: { type: Boolean, default: true },
            prepTime: { type: Number, default: 15 },
            tags: [String],
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

export const Menu = model<IMenu>("Menu", menuSchema);
