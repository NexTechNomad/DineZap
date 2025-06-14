import { type FC } from "react";

interface StatusBadgeProps {
  status: string;
}

const StatusBadge: FC<StatusBadgeProps> = ({ status }) => {
  return (
    <span
      className={`px-2 py-1 rounded-full text-xs ${
        status === "New Order"
          ? "bg-red-100 text-red-800"
          : status === "Preparing"
          ? "bg-yellow-100 text-yellow-800"
          : status === "Delivered"
          ? "bg-blue-100 text-blue-800"
          : status === "Cancel"
          ? "bg-gray-100 text-gray-800"
          : status === "Completed"
          ? "bg-green-100 text-green-800"
          : "bg-gray-100 text-gray-800"
      }`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
