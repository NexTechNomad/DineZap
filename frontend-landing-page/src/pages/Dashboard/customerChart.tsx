import { type FC, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const weeklyData = [
  { day: "Mon", inRestaurant: 30, onlineOrder: 15 },
  { day: "Tue", inRestaurant: 45, onlineOrder: 25 },
  { day: "Wed", inRestaurant: 55, onlineOrder: 30 },
  { day: "Thu", inRestaurant: 35, onlineOrder: 20 },
  { day: "Fri", inRestaurant: 65, onlineOrder: 40 },
  { day: "Sat", inRestaurant: 75, onlineOrder: 45 },
  { day: "Sun", inRestaurant: 40, onlineOrder: 25 },
];

const monthlyData = [
  { day: "Week 1", inRestaurant: 280, onlineOrder: 150 },
  { day: "Week 2", inRestaurant: 320, onlineOrder: 180 },
  { day: "Week 3", inRestaurant: 350, onlineOrder: 200 },
  { day: "Week 4", inRestaurant: 410, onlineOrder: 220 },
];

const todayData = [
  { day: "9AM", inRestaurant: 10, onlineOrder: 5 },
  { day: "12PM", inRestaurant: 25, onlineOrder: 15 },
  { day: "3PM", inRestaurant: 15, onlineOrder: 10 },
  { day: "6PM", inRestaurant: 30, onlineOrder: 20 },
  { day: "9PM", inRestaurant: 20, onlineOrder: 12 },
];

const CustomerChart: FC = () => {
  const [period, setPeriod] = useState<"Weekly" | "Monthly" | "Today">(
    "Weekly"
  );

  const data =
    period === "Weekly"
      ? weeklyData
      : period === "Monthly"
      ? monthlyData
      : todayData;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold">Customer Map</h2>
          <div className="flex items-center gap-4 mt-1">
            <div className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 rounded-full bg-purple-600"></span>
              <p className="text-gray-500 text-sm">In Restaurant</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 rounded-full bg-purple-300"></span>
              <p className="text-gray-500 text-sm">Online Order</p>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            className={`px-3 py-1 rounded-lg text-sm ${
              period === "Monthly"
                ? "bg-purple-600 text-white"
                : "text-gray-600"
            }`}
            onClick={() => setPeriod("Monthly")}
          >
            Monthly
          </button>
          <button
            className={`px-3 py-1 rounded-lg text-sm ${
              period === "Weekly" ? "bg-purple-600 text-white" : "text-gray-600"
            }`}
            onClick={() => setPeriod("Weekly")}
          >
            Weekly
          </button>
          <button
            className={`px-3 py-1 rounded-lg text-sm ${
              period === "Today" ? "bg-purple-600 text-white" : "text-gray-600"
            }`}
            onClick={() => setPeriod("Today")}
          >
            Today
          </button>
        </div>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f3f4f6"
            />
            <XAxis dataKey="day" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip />
            <Bar
              dataKey="inRestaurant"
              name="In Restaurant"
              fill="#8b5cf6"
              radius={[5, 5, 0, 0]}
            />
            <Bar
              dataKey="onlineOrder"
              name="Online Order"
              fill="#c4b5fd"
              radius={[5, 5, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CustomerChart;
