export interface Order {
  _id: string;
  orderId: string;
  restaurantId: string;
  tableNumber: number;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    modifications?: string;
    totalPrice: number;
    _id: string;
  }>;
  totalAmount: number;
  status: string;
  customerPhone: string;
  specialInstructions?: string;
  timestamps: {
    ordered: string;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface OrderDetailsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  gradient: string;
  size?: "sm" | "md" | "lg";
}

export interface StatusUpdateSectionProps {
  order: Order;
  onStatusUpdate: (newStatus: string) => void;
}
