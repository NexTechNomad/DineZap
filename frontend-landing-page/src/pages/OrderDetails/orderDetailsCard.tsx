import { type FC } from "react";
import type { OrderDetailsCardProps } from "./types";

const OrderDetailsCard: FC<OrderDetailsCardProps> = ({
  title,
  value,
  icon,
  gradient,
  size = "md",
}) => {
  const sizeClasses = {
    sm: "p-4 h-32",
    md: "p-6 h-48",
    lg: "p-8 h-64",
  };

  return (
    <div
      className={`group relative bg-white/90 backdrop-blur-md rounded-2xl border border-white/30 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 overflow-hidden ${sizeClasses[size]}`}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
      ></div>
      <div className="relative z-10 h-full flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <div
            className={`p-2 rounded-xl bg-gradient-to-br ${gradient} shadow-md`}
          >
            <div className="text-white">{icon}</div>
          </div>
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
        </div>
        <div>
          <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
            {title}
          </h4>
          <p
            className={`font-bold text-gray-900 leading-tight ${
              size === "lg"
                ? "text-2xl"
                : size === "sm"
                ? "text-base"
                : "text-lg"
            }`}
          >
            {value}
          </p>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
};

export default OrderDetailsCard;
