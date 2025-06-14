import { type FC } from "react";

interface OrderDetailsCardProps {
  title: string;
  value: string;
  color: string;
}

const OrderDetailsCard: FC<OrderDetailsCardProps> = ({
  title,
  value,
  color,
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center mb-2">
        <div className={`w-2 h-2 bg-${color}-500 rounded-full mr-3`}></div>
        <h4 className="font-semibold text-gray-700 uppercase tracking-wide text-sm">
          {title}
        </h4>
      </div>
      <p className="text-gray-900 font-medium text-lg">{value}</p>
    </div>
  );
};

export default OrderDetailsCard;
