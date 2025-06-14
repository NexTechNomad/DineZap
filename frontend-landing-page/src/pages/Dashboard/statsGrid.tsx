import { type FC } from "react";
import {
  MenuIcon,
  DollarSignIcon,
  ShoppingCartIcon,
  UsersIcon,
} from "lucide-react";

const StatsGrid: FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-2xl sm:text-3xl font-semibold mb-1">459</h3>
            <p className="text-gray-500 text-sm">TOTAL MENU</p>
          </div>
          <div className="p-2 bg-purple-100 rounded-lg">
            <MenuIcon className="w-6 h-6 text-purple-600" />
          </div>
        </div>
      </div>
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-2xl sm:text-3xl font-semibold mb-1">90,000</h3>
            <p className="text-gray-500 text-sm">TOTAL REVENUE</p>
          </div>
          <div className="p-2 bg-purple-100 rounded-lg">
            <DollarSignIcon className="w-6 h-6 text-purple-600" />
          </div>
        </div>
      </div>
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-2xl sm:text-3xl font-semibold mb-1">800</h3>
            <p className="text-gray-500 text-sm">TOTAL ORDERS</p>
          </div>
          <div className="p-2 bg-purple-100 rounded-lg">
            <ShoppingCartIcon className="w-6 h-6 text-purple-600" />
          </div>
        </div>
      </div>
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-2xl sm:text-3xl font-semibold mb-1">2000</h3>
            <p className="text-gray-500 text-sm">TOTAL VISITORS</p>
          </div>
          <div className="p-2 bg-purple-100 rounded-lg">
            <UsersIcon className="w-6 h-6 text-purple-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsGrid;
