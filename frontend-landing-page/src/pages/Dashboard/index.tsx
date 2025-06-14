import { type FC } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "@/components/sidebar";
import DashboardOverview from "./dashboard";
import RestaurantOrders from "@/pages/RestaurantOrders";
import OrderDetails from "@/pages/OrderDetails";

const App: FC = () => {
  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <Sidebar />
      <Routes>
        <Route path="/" element={<DashboardOverview />} />
        <Route path="/orders" element={<RestaurantOrders />} />
        <Route path="/order-details" element={<OrderDetails />} />
      </Routes>
    </div>
  );
};

export default App;
