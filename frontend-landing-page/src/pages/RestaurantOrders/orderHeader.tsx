import { type FC } from "react";
import { type Order } from "./types";

interface OrderHeaderProps {
  order: Order;
}

const OrderHeader: FC<OrderHeaderProps> = ({ order }) => {
  return (
    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 mb-6 border border-purple-100">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">{order.id}</h3>
          <p className="text-purple-600 font-medium">{order.customerName}</p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-gray-900">
            ${order.total.toFixed(2)}
          </div>
          <span
            className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
              order.status === "New Order"
                ? "bg-red-100 text-red-800"
                : order.status === "Preparing"
                ? "bg-yellow-100 text-yellow-800"
                : order.status === "Delivered"
                ? "bg-blue-100 text-blue-800"
                : order.status === "Cancel"
                ? "bg-gray-100 text-gray-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            {order.status}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderHeader;
