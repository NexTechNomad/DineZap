import { type Column } from "../../components/table";
import { type Order } from "./types";
import StatusBadge from "./statusBadge";

export const orderColumns: Column<Order>[] = [
  {
    header: "Order ID",
    accessor: "id",
  },
  {
    header: "Date",
    accessor: "date",
  },
  {
    header: "Customer Name",
    accessor: "customerName",
  },
  {
    header: "Menu",
    accessor: "menu",
  },
  {
    header: "Table",
    accessor: "table",
  },
  {
    header: "Total",
    accessor: "total",
    render: (value: unknown) => `$${(value as number).toFixed(2)}`,
  },
  {
    header: "Status",
    accessor: "status",
    render: (value: unknown) => <StatusBadge status={value as string} />,
  },
];
