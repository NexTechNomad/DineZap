import { type FC } from "react";

const trendingMenus = [
  {
    name: "Chicken Pizza",
    price: "$2.4",
    orderRate: "89%",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&h=300&fit=crop",
  },
  {
    name: "Lorem ipsum dolor sit amet",
    price: "$2.4",
    orderRate: "85%",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=300&fit=crop",
  },
  {
    name: "Chicken Classic sandwich Rice",
    price: "$2.4",
    orderRate: "85%",
    image:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=300&h=300&fit=crop",
  },
  {
    name: "Paneer Classic",
    price: "$2.4",
    orderRate: "85%",
    image:
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=300&h=300&fit=crop",
  },
];

const TrendingMenus: FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold">Daily Trending Menus</h2>
          <p className="text-gray-500 text-sm">Lorem ipsum dolor sit amet</p>
        </div>
      </div>
      <div className="space-y-4">
        {trendingMenus.map((menu, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={menu.image}
                alt={menu.name}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div>
                <h3 className="font-medium">{menu.name}</h3>
                <p className="text-gray-500">{menu.price}</p>
              </div>
            </div>
            <button className="px-3 py-1 rounded-lg text-sm text-purple-600 border border-purple-200">
              Order {menu.orderRate}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingMenus;
