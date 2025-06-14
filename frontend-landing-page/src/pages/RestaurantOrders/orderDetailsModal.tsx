import { type FC } from "react";
import Modal from "../../components/modal";
import { type Order } from "./types";
import OrderHeader from "./orderHeader";
import OrderDetailsCard from "./orderDetailsCard";

interface OrderDetailsModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

const OrderDetailsModal: FC<OrderDetailsModalProps> = ({
  order,
  isOpen,
  onClose,
}) => {
  if (!order) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Order Details">
      <div className="p-6">
        <OrderHeader order={order} />

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Order Information */}
          <div className="space-y-4">
            <OrderDetailsCard
              title="Date & Time"
              value={order.date}
              color="blue"
            />
            <OrderDetailsCard title="Table" value={order.table} color="green" />
          </div>

          {/* Menu Information */}
          <div className="space-y-4">
            <OrderDetailsCard
              title="Menu Item"
              value={order.menu}
              color="orange"
            />
            <OrderDetailsCard
              title="Order Status"
              value={order.status}
              color="purple"
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default OrderDetailsModal;
