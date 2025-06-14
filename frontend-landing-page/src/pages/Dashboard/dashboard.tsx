import { type FC } from "react";
import SearchHeader from "@/components/search-header";
import StatsGrid from "./statsGrid";
import RevenueChart from "./revenueChart";
import CustomerChart from "./customerChart";
import OrdersSummary from "./ordersSummary";
import TrendingMenus from "./trendingMenus";

const Dashboard: FC = () => {
  return (
    <main className="flex-1 ml-0 lg:ml-16 p-4 lg:p-8">
      <SearchHeader
        title="Overview"
        description="Discover whatever you need easily"
        searchPlaceholder="Search for something"
      />

      <StatsGrid />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        <RevenueChart />
        <CustomerChart />
        <OrdersSummary />
        <TrendingMenus />
      </div>
    </main>
  );
};

export default Dashboard;
