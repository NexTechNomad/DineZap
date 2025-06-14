import { type FC, useState } from "react";
import {
  Package,
  User,
  Clock,
  DollarSign,
  MapPin,
  UtensilsCrossed,
  MessageSquare,
} from "lucide-react";
import SearchHeader from "@/components/search-header";
import Modal from "@/components/modal";
import type { Order } from "./types";
import OrderDetailsCard from "./orderDetailsCard";
import StatusUpdateSection from "./statusUpdateSection";

const OrderDetails: FC = () => {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState<Order | null>(null);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  const handleSubmit = () => {
    // Mock API response for orderId "PIZ-20250609-211"
    if (orderId === "PIZ-20250609-211") {
      setOrder({
        _id: "6846ed2585ea65a2732e14c0",
        orderId: "PIZ-20250609-211",
        restaurantId: "6846e30b4900a0e8f0b93158",
        tableNumber: 1,
        items: [
          {
            name: "Garlic Bread",
            price: 5.99,
            quantity: 2,
            modifications: "No garlic",
            totalPrice: 11.98,
            _id: "6846ed2585ea65a2732e14c1",
          },
        ],
        totalAmount: 11.98,
        status: "cooking",
        customerPhone: "1234567890",
        specialInstructions: "Quick service",
        timestamps: {
          ordered: "2025-06-09T14:18:13.772Z",
        },
        createdAt: "2025-06-09T14:18:13.774Z",
        updatedAt: "2025-06-09T14:33:37.773Z",
        __v: 0,
      });
    } else {
      setOrder(null);
      setIsErrorModalOpen(true);
    }
  };

  // New function to handle status updates
  const handleStatusUpdate = (newStatus: string) => {
    if (order) {
      const updatedOrder = {
        ...order,
        status: newStatus,
        updatedAt: new Date().toISOString(),
      };
      setOrder(updatedOrder);
    }
  };

  return (
    <main className="flex-1 ml-0 lg:ml-16 p-4 lg:p-8">
      <SearchHeader
        title="Order Details"
        description="Search and view detailed order information"
        searchPlaceholder="Search for something"
      />

      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Order ID Lookup
        </label>
        <input
          type="text"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="Enter order ID (try PIZ-20250609-211)"
        />
        <button
          onClick={handleSubmit}
          className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Submit
        </button>
      </div>
      {order && (
        <>
          <div className="grid grid-cols-4 gap-4 max-w-5xl mx-auto">
            <div className="col-span-4 sm:col-span-2">
              <OrderDetailsCard
                title="Items"
                value={order.items
                  .map(
                    (item) =>
                      `${item.quantity}x ${item.name}${
                        item.modifications ? ` (${item.modifications})` : ""
                      }`
                  )
                  .join(", ")}
                icon={<UtensilsCrossed className="w-5 h-5" />}
                gradient="from-indigo-500 to-purple-600"
                size="lg"
              />
            </div>
            <div className="col-span-4 sm:col-span-2">
              <OrderDetailsCard
                title="Customer Phone"
                value={order.customerPhone}
                icon={<User className="w-5 h-5" />}
                gradient="from-blue-500 to-cyan-600"
                size="lg"
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <OrderDetailsCard
                title="Order ID"
                value={order.orderId}
                icon={<Package className="w-5 h-5" />}
                gradient="from-violet-500 to-purple-600"
                size="md"
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <OrderDetailsCard
                title="Status"
                value={
                  order.status.charAt(0).toUpperCase() + order.status.slice(1)
                }
                icon={<Clock className="w-5 h-5" />}
                gradient="from-green-500 to-emerald-600"
                size="md"
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <OrderDetailsCard
                title="Total"
                value={`$${order.totalAmount.toFixed(2)}`}
                icon={<DollarSign className="w-5 h-5" />}
                gradient="from-orange-500 to-amber-600"
                size="md"
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <OrderDetailsCard
                title="Table"
                value={`Table ${order.tableNumber}`}
                icon={<MapPin className="w-5 h-5" />}
                gradient="from-pink-500 to-rose-600"
                size="md"
              />
            </div>
            <div className="col-span-4">
              <OrderDetailsCard
                title="Ordered"
                value={new Date(order.timestamps.ordered).toLocaleString()}
                icon={<Clock className="w-5 h-5" />}
                gradient="from-red-500 to-pink-600"
                size="sm"
              />
            </div>
            {order.specialInstructions && (
              <div className="col-span-4">
                <OrderDetailsCard
                  title="Special Instructions"
                  value={order.specialInstructions}
                  icon={<MessageSquare className="w-5 h-5" />}
                  gradient="from-purple-500 to-indigo-600"
                  size="sm"
                />
              </div>
            )}
          </div>

          {/* New Status Update Section */}
          <div className="max-w-5xl mx-auto">
            <StatusUpdateSection
              order={order}
              onStatusUpdate={handleStatusUpdate}
            />
          </div>
        </>
      )}

      <Modal
        isOpen={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
        title="Order Not Found"
        size="sm"
      >
        <div className="text-center">
          <div className="mb-4 text-red-500">
            <svg
              className="w-12 h-12 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="text-gray-600 mb-4">
            The order you're looking for could not be found.
          </p>
          <p className="text-sm text-gray-500">
            Try using the sample order ID: PIZ-20250609-211
          </p>
          <button
            onClick={() => setIsErrorModalOpen(false)}
            className="mt-6 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Close
          </button>
        </div>
      </Modal>
    </main>
  );
};

export default OrderDetails;
