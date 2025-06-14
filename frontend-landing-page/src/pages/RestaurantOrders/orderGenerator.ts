import type { Order } from "./types";

export const generateOrders = (count: number): Order[] => {
  const statuses = [
    "New Order",
    "Preparing",
    "Delivered",
    "Cancel",
    "Completed",
  ];
  const menus = [
    "Jollof Rice and Chicken",
    "Fried Rice and Fish",
    "Egusi Soup and Pounded Yam",
    "Pepper Soup",
    "Suya Platter",
    "Chicken Shawarma",
  ];
  const names = [
    "Roberto Carlo",
    "John Smith",
    "Sarah Johnson",
    "Michael Brown",
    "Emma Wilson",
    "David Lee",
  ];

  return Array.from({ length: count }, () => ({
    id: `#${Math.floor(100000 + Math.random() * 900000)}`,
    customerName: names[Math.floor(Math.random() * names.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    total: +(10 + Math.random() * 40).toFixed(2),
    date: new Date(
      Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
    ).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }),
    menu: menus[Math.floor(Math.random() * menus.length)],
    table: `Table ${Math.floor(Math.random() * 20) + 1}`,
  }));
};
