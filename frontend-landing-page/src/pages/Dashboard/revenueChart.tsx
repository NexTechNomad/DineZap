import { type FC, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const monthlyData = [
  { label: "Jan", value: 2500 },
  { label: "Feb", value: 3200 },
  { label: "Mar", value: 4100 },
  { label: "Apr", value: 3750 },
  { label: "May", value: 4500 },
  { label: "Jun", value: 4750 },
  { label: "Jul", value: 4250 },
  { label: "Aug", value: 5150 },
  { label: "Sep", value: 5250 },
  { label: "Oct", value: 5850 },
  { label: "Nov", value: 6900 },
  { label: "Dec", value: 7650 },
];

const weeklyData = [
  { label: "Mon", value: 1200 },
  { label: "Tue", value: 1450 },
  { label: "Wed", value: 1800 },
  { label: "Thu", value: 1350 },
  { label: "Fri", value: 2100 },
  { label: "Sat", value: 2500 },
  { label: "Sun", value: 1900 },
];

const todayData = [
  { label: "9AM", value: 350 },
  { label: "11AM", value: 420 },
  { label: "1PM", value: 680 },
  { label: "3PM", value: 450 },
  { label: "5PM", value: 520 },
  { label: "7PM", value: 780 },
  { label: "9PM", value: 600 },
];

const RevenueChart: FC = () => {
  const [period, setPeriod] = useState<"Monthly" | "Weekly" | "Today">(
    "Monthly"
  );

  const data =
    period === "Monthly"
      ? monthlyData
      : period === "Weekly"
      ? weeklyData
      : todayData;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold">Revenue</h2>
          <p className="text-gray-500 text-sm">Revenue trends over time</p>
        </div>
        <select
          className="px-3 py-1 rounded-lg border border-purple-200 text-purple-600 text-sm"
          value={period}
          onChange={(e) =>
            setPeriod(e.target.value as "Monthly" | "Weekly" | "Today")
          }
        >
          <option value="Monthly">Monthly</option>
          <option value="Weekly">Weekly</option>
          <option value="Today">Today</option>
        </select>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f3f4f6"
            />
            <XAxis dataKey="label" axisLine={false} tickLine={false} />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip formatter={(value) => [`$${value}`, "Revenue"]} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#8b5cf6"
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;
