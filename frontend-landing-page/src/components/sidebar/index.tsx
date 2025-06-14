import { type FC, useState } from "react";
import { Link } from "react-router-dom";
import { LayoutGrid, Settings, LogOut, X, Store } from "lucide-react";

const Sidebar: FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full bg-purple-600 flex flex-col items-center py-6 transition-all duration-300 z-50 
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0 lg:left-4 lg:top-4 lg:h-[90vh] lg:min-h-[760px] lg:rounded-xl
        w-[280px] lg:w-16`}
      >
        {/* Mobile Close Button */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute top-4 right-4 text-white lg:hidden"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Navigation Links */}
        <nav className="flex-1 w-full pt-8 lg:pt-0">
          <ul className="space-y-6 px-4 flex flex-col items-center">
            {[
              { path: "/dashboard", icon: LayoutGrid, label: "Overview" },
              { path: "/dashboard/orders", icon: Store, label: "Orders" },
              { path: "/dashboard/order-details", icon: Store, label: "Order Details" },
              {
                path: "/dashboard/settings",
                icon: Settings,
                label: "Settings",
              },
            ].map(({ path, icon: Icon, label }) => {
              const isActive = location.pathname === path;
              return (
                <li key={path} className="w-full lg:w-auto">
                  <Link
                    to={path}
                    className={`flex items-center lg:justify-center w-full lg:w-12 h-12 rounded-xl transition-colors pl-4 lg:pl-0 ${
                      isActive
                        ? "text-white bg-white/10"
                        : "text-white/60 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                    <span className="ml-3 lg:hidden text-center flex-1 mr-7">
                      {label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout Button */}
        <button
          className="flex items-center lg:justify-center w-full lg:w-12 h-12 text-white/60 hover:text-white hover:bg-white/10 rounded-xl transition-colors mx-4 mb-4 pl-4 lg:pl-0"
          onClick={() => {
            // Add logout logic here
            console.log("Logout clicked");
          }}
        >
          <LogOut className="w-6 h-6" />
          <span className="ml-3 lg:hidden text-center flex-1 mr-7">Logout</span>
        </button>
      </div>

      {/* Mobile Toggle Button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="fixed left-4 top-4 w-12 h-12 rounded-xl bg-purple-600 text-white flex items-center justify-center lg:hidden z-30"
      >
        <LayoutGrid className="w-6 h-6" />
      </button>
    </>
  );
};

export default Sidebar;
