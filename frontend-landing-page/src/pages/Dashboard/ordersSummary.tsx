import { type FC, useState } from "react";

type TimePeriod = "monthly" | "weekly" | "today";

const mockData = {
  monthly: {
    percentage: 88,
    onDelivery: 156,
    delivered: 1250,
    cancelled: 45,
  },
  weekly: {
    percentage: 95,
    onDelivery: 25,
    delivered: 95,
    cancelled: 5,
  },
  today: {
    percentage: 92,
    onDelivery: 12,
    delivered: 35,
    cancelled: 2,
  },
};

const OrdersSummary: FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>("weekly");
  const data = mockData[selectedPeriod];
  const rotationDegree = (data.percentage / 100) * 360;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold">Orders Summary</h2>
          <p className="text-gray-500 text-sm">
            Lorem ipsum dolor sit amet consectetur
          </p>
        </div>
        <div className="flex gap-2">
          <button
            className={`px-3 py-1 rounded-lg text-sm ${
              selectedPeriod === "monthly" ? "bg-purple-600 text-white" : ""
            }`}
            onClick={() => setSelectedPeriod("monthly")}
          >
            Monthly
          </button>
          <button
            className={`px-3 py-1 rounded-lg text-sm ${
              selectedPeriod === "weekly" ? "bg-purple-600 text-white" : ""
            }`}
            onClick={() => setSelectedPeriod("weekly")}
          >
            Weekly
          </button>
          <button
            className={`px-3 py-1 rounded-lg text-sm ${
              selectedPeriod === "today" ? "bg-purple-600 text-white" : ""
            }`}
            onClick={() => setSelectedPeriod("today")}
          >
            Today
          </button>
        </div>
      </div>
      <div className="flex items-center justify-center mb-6">
        <div className="relative">
          <div className="w-32 h-32 rounded-full border-[16px] border-gray-200">
            <div
              className="absolute top-0 left-0 w-32 h-32 rounded-full border-[16px] border-purple-600"
              style={{
                transform: `rotate(${rotationDegree}deg)`,
                clipPath: "inset(0 0 0 50%)",
              }}
            ></div>
            <div
              className="absolute top-0 left-0 w-32 h-32 rounded-full border-[16px] border-purple-600"
              style={{ clipPath: "inset(0 50% 0 0)" }}
            ></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold">
              {data.percentage}%
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-2xl font-semibold">{data.onDelivery}</p>
          <p className="text-gray-500 text-sm">On Delivery</p>
        </div>
        <div>
          <p className="text-2xl font-semibold">{data.delivered}</p>
          <p className="text-gray-500 text-sm">Delivered</p>
        </div>
        <div>
          <p className="text-2xl font-semibold">{data.cancelled}</p>
          <p className="text-gray-500 text-sm">Cancelled</p>
        </div>
      </div>
    </div>
  );
};

export default OrdersSummary;
