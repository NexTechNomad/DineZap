import { type FC, useState } from "react";
import Table from "@/components/table";
import SearchHeader from "@/components/search-header";
import { type Order } from "./types";
import { generateOrders } from "./orderGenerator";
import { orderColumns } from "./orderTableConfig";
import OrderDetailsModal from "./orderDetailsModal";
import OrderFilters from "./orderFilters";

const Orders: FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    name: "",
    orderId: "",
    date: "",
    status: "",
  });
  const itemsPerPage = 10;

  // Generate 50 sample orders
  const orders: Order[] = generateOrders(50);

  // Apply filters
  const filteredOrders = orders.filter((order) => {
    if (
      filters.name &&
      !order.customerName.toLowerCase().includes(filters.name.toLowerCase())
    )
      return false;
    if (
      filters.orderId &&
      !order.id.toLowerCase().includes(filters.orderId.toLowerCase())
    )
      return false;
    if (filters.status && order.status !== filters.status) return false;
    if (filters.date) {
      const orderDate = new Date(order.date).toDateString();
      const filterDate = new Date(filters.date).toDateString();
      if (orderDate !== filterDate) return false;
    }
    return true;
  });

  // Calculate pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = filteredOrders.slice(startIndex, endIndex);

  const handleRowClick = (order: Order) => {
    setSelectedOrder(order);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const clearFilters = () => {
    setFilters({ name: "", orderId: "", date: "", status: "" });
    setCurrentPage(1);
  };

  return (
    <main className="flex-1 ml-0 lg:ml-16 p-4 lg:p-8">
      <SearchHeader
        title="Orders"
        description="Here is a list of all orders"
        searchPlaceholder="Search for orders"
      />

      {/* Filter Toggle Button */}
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={toggleFilters}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z"
            />
          </svg>
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>

        {/* Active filters indicator */}
        {(filters.name ||
          filters.orderId ||
          filters.date ||
          filters.status) && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">
              {Object.values(filters).filter(Boolean).length} filter(s) active
            </span>
            <button
              onClick={clearFilters}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <OrderFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          orders={orders}
        />
      )}

      <Table
        columns={orderColumns}
        data={currentOrders}
        currentPage={currentPage}
        totalItems={filteredOrders.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        onRowClick={handleRowClick}
      />

      <OrderDetailsModal
        order={selectedOrder}
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </main>
  );
};

export default Orders;
