import { type FC, useState } from "react";
import {
  Package,
  Clock,
  UtensilsCrossed,
  Edit3,
  CheckCircle,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import type { StatusUpdateSectionProps } from "./types";

const StatusUpdateSection: FC<StatusUpdateSectionProps> = ({
  order,
  onStatusUpdate,
}) => {
  const [selectedStatus, setSelectedStatus] = useState(order.status);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const statusOptions = [
    {
      value: "pending",
      label: "Pending",
      color: "bg-yellow-500",
      icon: <Clock className="w-4 h-4" />,
    },
    {
      value: "confirmed",
      label: "Confirmed",
      color: "bg-blue-500",
      icon: <CheckCircle className="w-4 h-4" />,
    },
    {
      value: "cooking",
      label: "Cooking",
      color: "bg-orange-500",
      icon: <UtensilsCrossed className="w-4 h-4" />,
    },
    {
      value: "ready",
      label: "Ready",
      color: "bg-green-500",
      icon: <CheckCircle className="w-4 h-4" />,
    },
    {
      value: "delivered",
      label: "Delivered",
      color: "bg-purple-500",
      icon: <Package className="w-4 h-4" />,
    },
    {
      value: "cancelled",
      label: "Cancelled",
      color: "bg-red-500",
      icon: <AlertCircle className="w-4 h-4" />,
    },
  ];

  const handleStatusUpdate = async () => {
    setIsUpdating(true);
    setUpdateSuccess(false);

    // Simulate API call
    setTimeout(() => {
      onStatusUpdate(selectedStatus);
      setIsUpdating(false);
      setUpdateSuccess(true);

      // Hide success message after 3 seconds
      setTimeout(() => setUpdateSuccess(false), 3000);
    }, 1000);
  };

  const getCurrentStatusInfo = () => {
    return (
      statusOptions.find((option) => option.value === order.status) ||
      statusOptions[0]
    );
  };

  const currentStatusInfo = getCurrentStatusInfo();

  return (
    <div className="mt-8 bg-white/90 backdrop-blur-md rounded-2xl border border-white/30 shadow-md p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-md">
          <Edit3 className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Update Order Status
          </h3>
          <p className="text-sm text-gray-600">
            Change the current status of this order
          </p>
        </div>
      </div>

      {/* Current Status Display */}
      <div className="mb-6 p-4 bg-gray-50 rounded-xl">
        <div className="flex items-center gap-3">
          <div
            className={`p-2 rounded-lg ${currentStatusInfo.color} text-white`}
          >
            {currentStatusInfo.icon}
          </div>
          <div>
            <p className="text-sm text-gray-600">Current Status</p>
            <p className="font-semibold text-gray-900">
              {currentStatusInfo.label}
            </p>
          </div>
          <div className="ml-auto">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Status Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Select New Status
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {statusOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setSelectedStatus(option.value)}
              className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                selectedStatus === option.value
                  ? "border-purple-500 bg-purple-50 shadow-md"
                  : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
              }`}
            >
              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded ${option.color} text-white`}>
                  {option.icon}
                </div>
                <span
                  className={`text-sm font-medium ${
                    selectedStatus === option.value
                      ? "text-purple-700"
                      : "text-gray-700"
                  }`}
                >
                  {option.label}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Update Button and Status */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleStatusUpdate}
          disabled={isUpdating || selectedStatus === order.status}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
            selectedStatus === order.status
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : isUpdating
              ? "bg-purple-400 text-white cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700 text-white shadow-md hover:shadow-lg"
          }`}
        >
          {isUpdating ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              Updating...
            </>
          ) : (
            <>
              <CheckCircle className="w-4 h-4" />
              Update Status
            </>
          )}
        </button>

        {updateSuccess && (
          <div className="flex items-center gap-2 text-green-600 animate-fade-in">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">Status updated successfully!</span>
          </div>
        )}
      </div>

      {/* Last Updated Time */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          Last updated: {new Date(order.updatedAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default StatusUpdateSection;
