import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { KitchenCard } from "../cards/KitchenCard";
import { 
  ShoppingBag, 
  Heart, 
  User, 
  Clock, 
  ArrowRight, 
  Star, 
  MapPin, 
  ShieldCheck,
  Sparkles
} from "lucide-react";

export const CustomerDashboard: React.FC = () => {
  const { 
    currentUser, 
    orders, 
    cooks, 
    navigateToOrder, 
    navigateToKitchen, 
    setCurrentRoute,
    formatPrice
  } = useApp();

  const [activeTab, setActiveTab] = useState<"orders" | "favorites" | "impact">("orders");

  const customerOrders = orders; // For demo, all active orders belong to current session
  const favoriteCooks = cooks.filter((c) => currentUser.favoriteCookIds.includes(c.id));

  return (
    <div className="py-10 bg-[#F8F5EF] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Profile Card */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EDE5D8] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-16 h-16 rounded-2xl object-cover border border-[#EDE5D8]"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-2xl font-bold text-[#202522]">
                  {currentUser.name}
                </h1>
                <span className="bg-[#24483A]/10 text-[#24483A] text-[11px] font-bold px-2 py-0.5 rounded">
                  Community Diner
                </span>
              </div>
              <p className="text-xs text-[#6D716C] mt-0.5">
                {currentUser.email} • Member since {currentUser.memberSince}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentRoute("discover")}
              className="flex items-center gap-1.5 bg-[#24483A] hover:bg-[#193329] text-white px-5 py-2.5 rounded-xl text-xs font-semibold shadow-xs"
            >
              <span>Explore Today's Menu</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-2 border-b border-[#EDE5D8] pb-1">
          <button
            onClick={() => setActiveTab("orders")}
            className={`pb-3 px-3 text-xs sm:text-sm font-bold transition-all relative ${
              activeTab === "orders" ? "text-[#24483A]" : "text-[#6D716C] hover:text-[#202522]"
            }`}
          >
            My Orders ({customerOrders.length})
            {activeTab === "orders" && <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#24483A]" />}
          </button>

          <button
            onClick={() => setActiveTab("favorites")}
            className={`pb-3 px-3 text-xs sm:text-sm font-bold transition-all relative ${
              activeTab === "favorites" ? "text-[#24483A]" : "text-[#6D716C] hover:text-[#202522]"
            }`}
          >
            Favorite Kitchens ({favoriteCooks.length})
            {activeTab === "favorites" && <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#24483A]" />}
          </button>

          <button
            onClick={() => setActiveTab("impact")}
            className={`pb-3 px-3 text-xs sm:text-sm font-bold transition-all relative ${
              activeTab === "impact" ? "text-[#24483A]" : "text-[#6D716C] hover:text-[#202522]"
            }`}
          >
            My Community Impact
            {activeTab === "impact" && <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#24483A]" />}
          </button>
        </div>

        {/* TAB 1: Orders */}
        {activeTab === "orders" && (
          <div className="space-y-4">
            {customerOrders.length === 0 ? (
              <div className="bg-white p-12 rounded-2xl border border-[#EDE5D8] text-center space-y-3">
                <ShoppingBag className="w-8 h-8 mx-auto text-[#6D716C] opacity-50" />
                <h3 className="font-serif text-lg font-bold text-[#202522]">No Orders Yet</h3>
                <p className="text-xs text-[#6D716C]">Explore local home-cooked dishes to place your first order.</p>
                <button
                  onClick={() => setCurrentRoute("discover")}
                  className="bg-[#24483A] text-white px-4 py-2 rounded-xl text-xs font-semibold"
                >
                  Explore Meals
                </button>
              </div>
            ) : (
              customerOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white p-6 rounded-2xl border border-[#EDE5D8] shadow-xs space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EDE5D8] pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-serif text-base font-bold text-[#202522]">
                          Order #{order.orderNumber}
                        </span>
                        <span className="text-xs bg-[#EDE5D8] text-[#24483A] font-semibold px-2 py-0.5 rounded">
                          {order.kitchenName}
                        </span>
                      </div>
                      <p className="text-xs text-[#6D716C] mt-0.5">
                        Placed {order.orderTime} • {order.fulfillmentType === "delivery" ? "Local Delivery" : "Collection"}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-[#24483A] capitalize bg-[#24483A]/10 px-3 py-1 rounded-lg">
                        {order.status.replace("_", " ")}
                      </span>
                      <button
                        onClick={() => navigateToOrder(order.id)}
                        className="bg-[#24483A] hover:bg-[#193329] text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1"
                      >
                        <span>Track Order</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Items preview */}
                  <div className="space-y-1.5 text-xs text-[#202522]">
                    {order.items.map((item) => (
                      <div key={item.meal.id} className="flex justify-between">
                        <span>{item.quantity}x {item.meal.name}</span>
                        <span className="font-semibold">{formatPrice(item.meal.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 flex justify-between items-center text-xs text-[#6D716C] border-t border-[#EDE5D8]">
                    <span>Total Paid (includes tip): <strong className="text-[#24483A]">{formatPrice(order.total)}</strong></span>
                    <button
                      onClick={() => navigateToKitchen(order.cookId)}
                      className="text-[#24483A] font-semibold hover:underline"
                    >
                      Visit {order.cookName}'s Kitchen
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 2: Favorites */}
        {activeTab === "favorites" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteCooks.map((cook) => (
              <KitchenCard key={cook.id} cook={cook} />
            ))}
          </div>
        )}

        {/* TAB 3: Community Impact */}
        {activeTab === "impact" && (
          <div className="bg-white p-8 rounded-3xl border border-[#EDE5D8] space-y-6">
            <div className="flex items-center gap-2 text-[#B86B4B] text-xs font-bold uppercase tracking-widest">
              <Heart className="w-4 h-4 fill-[#B86B4B]" /> Your Solidarity Footprint
            </div>

            <h2 className="font-serif text-3xl font-bold text-[#202522]">
              You have supported 14 home-cooked meals by local single mothers.
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#EDE5D8]">
              <div className="p-4 bg-[#F8F5EF] rounded-xl border border-[#EDE5D8]">
                <span className="text-xs text-[#6D716C] block">Direct Income Generated</span>
                <span className="font-serif text-2xl font-bold text-[#24483A] block mt-1">
                  {formatPrice(148.50)}
                </span>
                <span className="text-[11px] text-[#6D716C]">Directly into family accounts</span>
              </div>

              <div className="p-4 bg-[#F8F5EF] rounded-xl border border-[#EDE5D8]">
                <span className="text-xs text-[#6D716C] block">Kitchens Supported</span>
                <span className="font-serif text-2xl font-bold text-[#202522] block mt-1">
                  3 Mothers
                </span>
                <span className="text-[11px] text-[#6D716C]">In Peckham & Hackney</span>
              </div>

              <div className="p-4 bg-[#F8F5EF] rounded-xl border border-[#EDE5D8]">
                <span className="text-xs text-[#6D716C] block">Plastic Packaging Avoided</span>
                <span className="font-serif text-2xl font-bold text-[#B86B4B] block mt-1">
                  100%
                </span>
                <span className="text-[11px] text-[#6D716C]">Compostable packaging used</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
