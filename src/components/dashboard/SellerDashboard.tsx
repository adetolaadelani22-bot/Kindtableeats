import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { OrderStatus } from "../../types";
import { 
  ChefHat, 
  Clock, 
  DollarSign, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  Eye, 
  ShieldCheck, 
  ShoppingBag, 
  Star,
  Users,
  Settings,
  Sparkles,
  ArrowRight
} from "lucide-react";

export const SellerDashboard: React.FC = () => {
  const { 
    orders, 
    updateOrderStatus, 
    meals, 
    cooks, 
    navigateToOrder,
    navigateToKitchen,
    addToast,
    formatPrice
  } = useApp();

  // Active Cook for demo is Amara
  const currentCook = cooks.find(c => c.id === "cook-amara") || cooks[0];
  const cookOrders = orders.filter(o => o.cookId === currentCook.id || o.cookId === "cook-amara");
  const cookMeals = meals.filter(m => m.cookId === currentCook.id || m.cookId === "cook-amara");

  const [isKitchenOpen, setIsKitchenOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<"orders" | "menu" | "earnings" | "safety">("orders");

  // Quick portion adjustment simulation
  const [localMeals, setLocalMeals] = useState(cookMeals);

  const togglePortions = (mealId: string, delta: number) => {
    setLocalMeals(prev => prev.map(m => {
      if (m.id === mealId) {
        const newCount = Math.max(0, m.portionsAvailable + delta);
        return { ...m, portionsAvailable: newCount };
      }
      return m;
    }));
    addToast({
      title: "Portion count updated",
      message: "Live marketplace updated instantly",
      type: "info"
    });
  };

  const totalEarnings = cookOrders.reduce((sum, o) => sum + (o.subtotal * 0.88) + o.cookTip, 0);
  const activeOrdersCount = cookOrders.filter(o => o.status !== "delivered" && o.status !== "cancelled").length;

  return (
    <div className="py-10 bg-[#F8F5EF] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Strip */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EDE5D8] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={currentCook.avatar}
              alt={currentCook.name}
              className="w-16 h-16 rounded-2xl object-cover border border-[#EDE5D8]"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#202522]">
                  {currentCook.kitchenName}
                </h1>
                <span className="bg-[#24483A]/10 text-[#24483A] text-[11px] font-bold px-2.5 py-0.5 rounded">
                  Cook Hub
                </span>
              </div>
              <p className="text-xs text-[#6D716C] mt-0.5">
                Head Cook: <strong>{currentCook.name}</strong> • {currentCook.location}
              </p>
            </div>
          </div>

          {/* Kitchen Open Toggle & View Public Profile */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                setIsKitchenOpen(!isKitchenOpen);
                addToast({
                  title: isKitchenOpen ? "Kitchen Closed for Today" : "Kitchen Open for Orders",
                  message: isKitchenOpen ? "Dishes marked as sold out" : "Accepting neighborhood orders",
                  type: "info"
                });
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                isKitchenOpen
                  ? "bg-[#24483A] text-white border-[#24483A]"
                  : "bg-[#F8F5EF] text-[#6D716C] border-[#EDE5D8]"
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${isKitchenOpen ? "bg-[#C8A96B] animate-pulse" : "bg-[#6D716C]"}`} />
              <span>{isKitchenOpen ? "Kitchen: Open & Simmering" : "Kitchen: Taking Break"}</span>
            </button>

            <button
              onClick={() => navigateToKitchen(currentCook.id)}
              className="flex items-center gap-1.5 bg-[#F8F5EF] hover:bg-[#EDE5D8] text-[#202522] border border-[#EDE5D8] px-4 py-2.5 rounded-xl text-xs font-semibold"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Public Page</span>
            </button>
          </div>
        </div>

        {/* Real Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-[#EDE5D8] shadow-2xs">
            <div className="flex items-center justify-between text-xs text-[#6D716C]">
              <span>Active Orders</span>
              <Clock className="w-4 h-4 text-[#B86B4B]" />
            </div>
            <span className="font-serif text-2xl sm:text-3xl font-bold text-[#202522] mt-2 block">
              {activeOrdersCount}
            </span>
            <span className="text-[11px] text-[#24483A] font-medium">
              Requires kitchen action
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#EDE5D8] shadow-2xs">
            <div className="flex items-center justify-between text-xs text-[#6D716C]">
              <span>Net Take-Home</span>
              <DollarSign className="w-4 h-4 text-[#24483A]" />
            </div>
            <span className="font-serif text-2xl sm:text-3xl font-bold text-[#24483A] mt-2 block">
              {formatPrice(totalEarnings)}
            </span>
            <span className="text-[11px] text-[#6D716C]">
              88% split + 100% direct tips
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#EDE5D8] shadow-2xs">
            <div className="flex items-center justify-between text-xs text-[#6D716C]">
              <span>Community Rating</span>
              <Star className="w-4 h-4 fill-[#C8A96B] text-[#C8A96B]" />
            </div>
            <span className="font-serif text-2xl sm:text-3xl font-bold text-[#202522] mt-2 block">
              {currentCook.rating.toFixed(2)}★
            </span>
            <span className="text-[11px] text-[#6D716C]">
              {currentCook.reviewsCount} verified reviews
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#EDE5D8] shadow-2xs">
            <div className="flex items-center justify-between text-xs text-[#6D716C]">
              <span>Hygiene Compliance</span>
              <ShieldCheck className="w-4 h-4 text-[#24483A]" />
            </div>
            <span className="font-serif text-2xl sm:text-3xl font-bold text-[#202522] mt-2 block">
              5/5 Stars
            </span>
            <span className="text-[11px] text-[#24483A] font-medium">
              FSA Registered & Audited
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-[#EDE5D8] pb-1">
          <button
            onClick={() => setActiveTab("orders")}
            className={`pb-3 px-3 text-xs sm:text-sm font-bold transition-all relative ${
              activeTab === "orders" ? "text-[#24483A]" : "text-[#6D716C] hover:text-[#202522]"
            }`}
          >
            Live Kitchen Orders ({cookOrders.length})
            {activeTab === "orders" && <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#24483A]" />}
          </button>

          <button
            onClick={() => setActiveTab("menu")}
            className={`pb-3 px-3 text-xs sm:text-sm font-bold transition-all relative ${
              activeTab === "menu" ? "text-[#24483A]" : "text-[#6D716C] hover:text-[#202522]"
            }`}
          >
            Today's Dishes & Portions ({localMeals.length})
            {activeTab === "menu" && <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#24483A]" />}
          </button>

          <button
            onClick={() => setActiveTab("earnings")}
            className={`pb-3 px-3 text-xs sm:text-sm font-bold transition-all relative ${
              activeTab === "earnings" ? "text-[#24483A]" : "text-[#6D716C] hover:text-[#202522]"
            }`}
          >
            Earnings & Direct Payouts
            {activeTab === "earnings" && <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#24483A]" />}
          </button>
        </div>

        {/* TAB 1: Live Orders */}
        {activeTab === "orders" && (
          <div className="space-y-4">
            {cookOrders.length === 0 ? (
              <div className="bg-white p-12 rounded-2xl border border-[#EDE5D8] text-center">
                <p className="text-sm text-[#6D716C]">No orders received yet today.</p>
              </div>
            ) : (
              cookOrders.map((order) => (
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
                        <span className="text-xs bg-[#EDE5D8] text-[#24483A] font-semibold px-2.5 py-0.5 rounded">
                          {order.fulfillmentType === "delivery" ? "Local Delivery" : "Kitchen Collection"}
                        </span>
                      </div>
                      <p className="text-xs text-[#6D716C] mt-0.5">
                        Customer: <strong className="text-[#202522]">{order.customerName}</strong> ({order.customerPhone}) • {order.orderTime}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-[#24483A] capitalize bg-[#24483A]/10 px-3 py-1 rounded-lg">
                        Status: {order.status.replace("_", " ")}
                      </span>
                      <button
                        onClick={() => navigateToOrder(order.id)}
                        className="text-xs text-[#24483A] font-semibold hover:underline"
                      >
                        Live Tracking View
                      </button>
                    </div>
                  </div>

                  {/* Items List */}
                  <div className="space-y-2">
                    {order.items.map((item) => (
                      <div key={item.meal.id} className="flex justify-between text-xs text-[#202522]">
                        <span className="font-medium">{item.quantity}x {item.meal.name}</span>
                        <span className="font-bold">{formatPrice(item.meal.price * item.quantity)}</span>
                      </div>
                    ))}
                    {order.notesToCook && (
                      <p className="text-xs text-[#B86B4B] italic bg-[#F8F5EF] p-2 rounded-lg">
                        Note from diner: "{order.notesToCook}"
                      </p>
                    )}
                  </div>

                  {/* Order Status Management Action Buttons */}
                  <div className="pt-3 border-t border-[#EDE5D8] flex flex-wrap items-center justify-between gap-3">
                    <div className="text-xs text-[#6D716C]">
                      Order Value: <strong className="text-[#24483A]">{formatPrice(order.total)}</strong> (Includes {formatPrice(order.cookTip)} direct tip)
                    </div>

                    <div className="flex items-center gap-2">
                      {order.status === "received" && (
                        <button
                          onClick={() => updateOrderStatus(order.id, "accepted")}
                          className="bg-[#24483A] hover:bg-[#193329] text-white px-4 py-2 rounded-xl text-xs font-semibold"
                        >
                          Accept Order & Start Prep
                        </button>
                      )}

                      {order.status === "accepted" && (
                        <button
                          onClick={() => updateOrderStatus(order.id, "cooking")}
                          className="bg-[#B86B4B] hover:bg-[#9E5638] text-white px-4 py-2 rounded-xl text-xs font-semibold"
                        >
                          Mark as Cooking in Pot
                        </button>
                      )}

                      {order.status === "cooking" && (
                        <button
                          onClick={() => updateOrderStatus(order.id, "ready")}
                          className="bg-[#C8A96B] hover:bg-[#B39353] text-[#202522] px-4 py-2 rounded-xl text-xs font-bold"
                        >
                          Mark as Packaged & Ready
                        </button>
                      )}

                      {order.status === "ready" && (
                        <button
                          onClick={() => updateOrderStatus(order.id, "out_for_delivery")}
                          className="bg-[#24483A] hover:bg-[#193329] text-white px-4 py-2 rounded-xl text-xs font-semibold"
                        >
                          Handover to Courier / Customer
                        </button>
                      )}

                      {order.status === "out_for_delivery" && (
                        <button
                          onClick={() => updateOrderStatus(order.id, "delivered")}
                          className="bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-xl text-xs font-semibold"
                        >
                          Mark as Completed & Delivered
                        </button>
                      )}

                      {order.status === "delivered" && (
                        <span className="text-xs text-emerald-800 font-bold bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                          ✓ Completed & Paid
                        </span>
                      )}
                    </div>
                  </div>

                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 2: Menu Management */}
        {activeTab === "menu" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#202522]">
                  Manage Today's Portions
                </h3>
                <p className="text-xs text-[#6D716C]">
                  Adjust portions remaining so diners don't order more than you cooked.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {localMeals.map((meal) => (
                <div key={meal.id} className="bg-white p-5 rounded-2xl border border-[#EDE5D8] shadow-xs space-y-4">
                  <div className="aspect-16/9 rounded-xl overflow-hidden bg-[#EDE5D8]">
                    <img src={meal.imageUrl} alt={meal.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-serif text-base font-bold text-[#202522]">{meal.name}</h4>
                    <p className="text-xs text-[#24483A] font-bold mt-0.5">{formatPrice(meal.price)} per plate</p>
                  </div>

                  <div className="p-3 bg-[#F8F5EF] rounded-xl border border-[#EDE5D8] flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-[#6D716C] block">Portions Available</span>
                      <span className="font-bold text-sm text-[#202522]">
                        {meal.portionsAvailable} plates left
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => togglePortions(meal.id, -1)}
                        className="w-7 h-7 rounded-lg bg-white border border-[#EDE5D8] text-xs font-bold hover:bg-[#EDE5D8]"
                      >
                        -1
                      </button>
                      <button
                        onClick={() => togglePortions(meal.id, 5)}
                        className="px-2.5 py-1 rounded-lg bg-[#24483A] text-white text-xs font-semibold hover:bg-[#193329]"
                      >
                        +5
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: Earnings & Payouts */}
        {activeTab === "earnings" && (
          <div className="bg-white p-8 rounded-3xl border border-[#EDE5D8] space-y-6">
            <h3 className="font-serif text-2xl font-bold text-[#202522]">
              Dignified & Transparent Cook Payouts
            </h3>
            <p className="text-xs text-[#6D716C] leading-relaxed max-w-2xl">
              KindTableEats operates on a community-first 88/12 model. Home cooks retain 88% of all dish revenue plus 100% of all customer tips. Payouts are transferred directly to your bank every Monday.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#EDE5D8]">
              <div className="p-4 bg-[#F8F5EF] rounded-xl border border-[#EDE5D8]">
                <span className="text-xs text-[#6D716C] block">Dish Gross Payout (88%)</span>
                <span className="font-serif text-2xl font-bold text-[#202522] block mt-1">
                  {formatPrice(Math.max(0, totalEarnings - 9))}
                </span>
              </div>

              <div className="p-4 bg-[#F8F5EF] rounded-xl border border-[#EDE5D8]">
                <span className="text-xs text-[#6D716C] block">100% Direct Tips</span>
                <span className="font-serif text-2xl font-bold text-[#B86B4B] block mt-1">
                  {formatPrice(9.00)}
                </span>
              </div>

              <div className="p-4 bg-[#24483A] text-white rounded-xl">
                <span className="text-xs text-[#EDE5D8] block">Total Ready for Payout</span>
                <span className="font-serif text-2xl font-bold text-[#C8A96B] block mt-1">
                  {formatPrice(totalEarnings)}
                </span>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
