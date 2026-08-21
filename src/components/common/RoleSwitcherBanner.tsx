import React from "react";
import { useApp } from "../../context/AppContext";
import { UserRole, ViewRoute } from "../../types";
import { Sparkles, Shield, User, ChefHat, Eye, ArrowRight } from "lucide-react";

export const RoleSwitcherBanner: React.FC = () => {
  const { userRole, setUserRole, setCurrentRoute, currentRoute, orders, applications } = useApp();

  const activeOrdersCount = orders.filter(o => o.status === "cooking" || o.status === "received" || o.status === "accepted" || o.status === "out_for_delivery").length;

  return (
    <aside aria-label="KindTable Community Announcement" className="bg-[#24483A] text-[#F8F5EF] text-xs py-2 px-4 border-b border-[#193329]">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        
        {/* Left Indicator */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 bg-[#C8A96B]/20 text-[#C8A96B] px-2.5 py-0.5 rounded font-semibold text-[11px] uppercase tracking-wider">
            <Sparkles className="w-3 h-3" /> Fresh Today
          </span>
          <span className="hidden sm:inline text-[#D9D0C1]">
            Authentic home-cooked meals by local single mothers • 100% of cook tips supported
          </span>
        </div>

        {/* Quick Portal Switcher */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-[#193329] p-1 rounded-lg">
            <button
              onClick={() => {
                setUserRole("customer");
                if (currentRoute.startsWith("seller-") || currentRoute.startsWith("admin-")) {
                  setCurrentRoute("discover");
                }
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-medium transition-all ${
                userRole === "customer"
                  ? "bg-[#F8F5EF] text-[#24483A] font-bold shadow-xs"
                  : "text-[#D9D0C1] hover:text-white"
              }`}
            >
              <User className="w-3 h-3" />
              <span>Customer Portal</span>
            </button>

            <button
              onClick={() => {
                setUserRole("seller");
                setCurrentRoute("seller-dashboard");
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-medium transition-all ${
                userRole === "seller"
                  ? "bg-[#F8F5EF] text-[#24483A] font-bold shadow-xs"
                  : "text-[#D9D0C1] hover:text-white"
              }`}
            >
              <ChefHat className="w-3 h-3" />
              <span>Cook Hub</span>
            </button>

            <button
              onClick={() => {
                setUserRole("admin");
                setCurrentRoute("admin-dashboard");
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-medium transition-all ${
                userRole === "admin"
                  ? "bg-[#F8F5EF] text-[#24483A] font-bold shadow-xs"
                  : "text-[#D9D0C1] hover:text-white"
              }`}
            >
              <Shield className="w-3 h-3" />
              <span>Admin</span>
            </button>
          </div>

          {/* Quick Action Link */}
          {activeOrdersCount > 0 && (
            <button
              onClick={() => setCurrentRoute("order-tracking")}
              className="bg-[#B86B4B] hover:bg-[#9E5638] text-white text-[11px] font-bold px-2.5 py-1 rounded-md transition-colors flex items-center gap-1.5 animate-pulse"
            >
              <span>Track Live Order</span>
              <span className="w-4 h-4 bg-white text-[#B86B4B] rounded-full text-[10px] flex items-center justify-center font-bold">
                {activeOrdersCount}
              </span>
            </button>
          )}

          <button
            onClick={() => setCurrentRoute("become-a-cook")}
            className="text-[11px] text-[#C8A96B] hover:underline font-semibold hidden md:inline"
          >
            Register as Cook →
          </button>
        </div>

      </div>
    </aside>
  );
};
