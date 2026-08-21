import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { OrderStatus } from "../../types";
import { 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Phone, 
  MessageSquare, 
  ChefHat, 
  ShieldCheck, 
  ArrowLeft, 
  Star, 
  Sparkles,
  ShoppingBag
} from "lucide-react";

export const OrderTrackingPage: React.FC = () => {
  const { 
    selectedOrderId, 
    orders, 
    updateOrderStatus, 
    setCurrentRoute, 
    navigateToKitchen, 
    addReview, 
    addToast,
    formatPrice
  } = useApp();

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [messageText, setMessageText] = useState("");

  const activeOrder = orders.find((o) => o.id === selectedOrderId) || orders[0];

  if (!activeOrder) {
    return (
      <div className="py-20 max-w-md mx-auto text-center px-4">
        <h2 className="font-serif text-2xl font-bold text-[#202522] mb-3">
          No Order Selected
        </h2>
        <button
          onClick={() => setCurrentRoute("discover")}
          className="bg-[#24483A] text-white px-6 py-3 rounded-xl text-xs font-semibold"
        >
          Explore Meals
        </button>
      </div>
    );
  }

  const handleNextStatusSimulation = () => {
    const sequence: OrderStatus[] = [
      "received",
      "accepted",
      "cooking",
      "ready",
      "out_for_delivery",
      "delivered"
    ];
    const currentIdx = sequence.indexOf(activeOrder.status);
    if (currentIdx < sequence.length - 1) {
      const nextStatus = sequence[currentIdx + 1];
      updateOrderStatus(activeOrder.id, nextStatus);
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addReview({
      cookId: activeOrder.cookId,
      mealId: activeOrder.items[0]?.meal.id,
      mealName: activeOrder.items[0]?.meal.name,
      customerName: activeOrder.customerName,
      customerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
      rating: reviewRating,
      comment: reviewText || "Absolutely wonderful home-cooked food. Fresh, flavorful, and made with love!"
    });
    setIsReviewModalOpen(false);
    setReviewText("");
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    setIsContactModalOpen(false);
    setMessageText("");
    addToast({
      title: "Message sent to cook",
      message: `${activeOrder.cookName} received your message.`,
      type: "success"
    });
  };

  return (
    <div className="py-12 bg-[#F8F5EF] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Back & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EDE5D8] pb-6">
          <div>
            <button
              onClick={() => setCurrentRoute("customer-orders")}
              className="flex items-center gap-1.5 text-xs font-semibold text-[#24483A] hover:underline mb-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Past Orders</span>
            </button>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#202522]">
              Order #{activeOrder.orderNumber}
            </h1>
            <p className="text-xs text-[#6D716C]">
              Placed {activeOrder.orderTime} • {activeOrder.fulfillmentType === "delivery" ? "Local Delivery" : "Kitchen Door Pickup"}
            </p>
          </div>

          {/* Prototype Simulation Bar */}
          <div className="bg-[#EDE5D8] p-2.5 rounded-xl border border-[#D9D0C1] flex items-center gap-2">
            <div className="text-[11px] font-semibold text-[#24483A] hidden md:block">
              🧪 Live Status Simulator:
            </div>
            {activeOrder.status !== "delivered" ? (
              <button
                onClick={handleNextStatusSimulation}
                className="bg-[#24483A] hover:bg-[#193329] text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 shadow-2xs"
              >
                <span>Advance to Next Status</span>
                <Sparkles className="w-3 h-3 text-[#C8A96B]" />
              </button>
            ) : (
              <span className="text-xs font-bold text-[#24483A] bg-white px-3 py-1.5 rounded-lg border border-[#EDE5D8]">
                ✓ Order Completed & Delivered
              </span>
            )}
          </div>
        </div>

        {/* Live Status Hero Banner */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#EDE5D8] shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#B86B4B]">
                Current Progress
              </span>
              <h2 className="font-serif text-2xl font-bold text-[#202522] capitalize mt-0.5">
                {activeOrder.status === "received" && "Order Received by Kitchen"}
                {activeOrder.status === "accepted" && "Cook Confirmed Preparation"}
                {activeOrder.status === "cooking" && "Simmering Fresh in Kitchen"}
                {activeOrder.status === "ready" && "Packaged & Ready for Handover"}
                {activeOrder.status === "out_for_delivery" && "Local Courier On the Way"}
                {activeOrder.status === "delivered" && "Delivered & Ready to Enjoy!"}
              </h2>
              <p className="text-xs text-[#6D716C] mt-1">
                Estimated arrival: <strong className="text-[#24483A]">{activeOrder.estimatedDeliveryTime}</strong>
              </p>
            </div>

            {activeOrder.status === "delivered" && (
              <button
                onClick={() => setIsReviewModalOpen(true)}
                className="bg-[#B86B4B] hover:bg-[#9E5638] text-white px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 self-start shadow-xs"
              >
                <Star className="w-3.5 h-3.5 fill-white" />
                <span>Write Cook Review</span>
              </button>
            )}
          </div>

          {/* Timeline Visualizer */}
          <div className="relative pt-4 pb-2">
            <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
              {activeOrder.timeline.map((step, idx) => (
                <div
                  key={step.status}
                  className={`p-3.5 rounded-xl border transition-all text-left flex flex-col justify-between ${
                    step.current
                      ? "bg-[#24483A] text-white border-[#24483A] shadow-sm"
                      : step.completed
                      ? "bg-[#F8F5EF] text-[#202522] border-[#EDE5D8]"
                      : "bg-white/50 text-[#6D716C] border-[#EDE5D8]/60 opacity-60"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider">
                        Step 0{idx + 1}
                      </span>
                      {step.completed && (
                        <CheckCircle2 className={`w-3.5 h-3.5 ${step.current ? "text-[#C8A96B]" : "text-[#24483A]"}`} />
                      )}
                    </div>
                    <h4 className="font-serif text-xs font-bold leading-tight">
                      {step.label}
                    </h4>
                  </div>
                  <span className={`text-[10px] block mt-2 ${step.current ? "text-[#EDE5D8]" : "text-[#6D716C]"}`}>
                    {step.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cook & Order Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Cook Card (5 cols) */}
          <div className="md:col-span-5 bg-white p-6 rounded-2xl border border-[#EDE5D8] shadow-xs space-y-5">
            <h3 className="font-serif text-lg font-bold text-[#202522] border-b border-[#EDE5D8] pb-3">
              Your Home Cook
            </h3>

            <div className="flex items-center gap-3">
              <img
                src={activeOrder.cookAvatar}
                alt={activeOrder.cookName}
                className="w-14 h-14 rounded-2xl object-cover border border-[#EDE5D8]"
              />
              <div>
                <h4 className="font-serif text-base font-bold text-[#202522]">
                  {activeOrder.cookName}
                </h4>
                <p className="text-xs text-[#6D716C]">
                  {activeOrder.kitchenName}
                </p>
                <div className="flex items-center gap-1.5 text-[11px] text-[#24483A] font-semibold mt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#24483A]" />
                  <span>5/5 FSA Hygiene Audited</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={() => setIsContactModalOpen(true)}
                className="flex-1 flex items-center justify-center gap-2 bg-[#F8F5EF] hover:bg-[#EDE5D8] text-[#202522] py-2.5 rounded-xl text-xs font-semibold border border-[#EDE5D8] transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#24483A]" />
                <span>Message Cook</span>
              </button>

              <button
                onClick={() => navigateToKitchen(activeOrder.cookId)}
                className="flex-1 flex items-center justify-center gap-2 bg-[#F8F5EF] hover:bg-[#EDE5D8] text-[#202522] py-2.5 rounded-xl text-xs font-semibold border border-[#EDE5D8] transition-colors"
              >
                <ChefHat className="w-3.5 h-3.5 text-[#B86B4B]" />
                <span>View Kitchen</span>
              </button>
            </div>

            <div className="p-3.5 bg-[#F8F5EF] rounded-xl border border-[#EDE5D8] text-xs text-[#6D716C] space-y-1.5">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#B86B4B] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#202522] block font-serif">Destination Address</strong>
                  <p>{activeOrder.deliveryAddress}</p>
                </div>
              </div>
              {activeOrder.notesToCook && (
                <div className="pt-2 border-t border-[#EDE5D8]">
                  <strong className="text-[#202522] block">Special Instructions:</strong>
                  <p className="italic">"{activeOrder.notesToCook}"</p>
                </div>
              )}
            </div>
          </div>

          {/* Dishes & Breakdown (7 cols) */}
          <div className="md:col-span-7 bg-white p-6 rounded-2xl border border-[#EDE5D8] shadow-xs space-y-5">
            <h3 className="font-serif text-lg font-bold text-[#202522] border-b border-[#EDE5D8] pb-3">
              Dishes in This Order
            </h3>

            <div className="space-y-3">
              {activeOrder.items.map((item, idx) => {
                const itemPrice = item.unitPrice ?? item.meal.price;
                const itemTotal = itemPrice * item.quantity;
                const hasCustom = item.selectedCustomizations && item.selectedCustomizations.length > 0;

                return (
                  <div
                    key={item.id || `${item.meal.id}-${idx}`}
                    className="p-3.5 bg-[#F8F5EF] rounded-xl border border-[#EDE5D8] space-y-2"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={item.meal.imageUrl}
                          alt={item.meal.name}
                          className="w-14 h-14 rounded-lg object-cover bg-[#EDE5D8] shrink-0"
                        />
                        <div className="min-w-0">
                          <h5 className="font-serif text-sm font-bold text-[#202522] leading-tight">
                            {item.quantity}x {item.meal.name}
                          </h5>
                          <p className="text-xs text-[#24483A] font-semibold mt-0.5">
                            {formatPrice(itemPrice)} each
                          </p>
                        </div>
                      </div>

                      <span className="font-bold text-sm text-[#202522] shrink-0">
                        {formatPrice(itemTotal)}
                      </span>
                    </div>

                    {hasCustom && (
                      <div className="pt-2 border-t border-[#EDE5D8]/70 space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#6D716C] block">
                          Custom Choices:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {item.selectedCustomizations!.map((c, i) => (
                            <span
                              key={i}
                              className="text-[11px] bg-white text-[#24483A] font-medium px-2 py-0.5 rounded-md border border-[#EDE5D8]"
                            >
                              {c.optionName} {c.price > 0 && `(+${formatPrice(c.price)})`}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {item.specialInstructions && (
                      <p className="text-[11px] text-[#6D716C] italic bg-white/70 p-1.5 rounded border border-[#EDE5D8]/50">
                        Note: {item.specialInstructions}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Financial Summary */}
            <div className="pt-3 border-t border-[#EDE5D8] space-y-1.5 text-xs text-[#6D716C]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-[#202522] font-medium">{formatPrice(activeOrder.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Fulfillment ({activeOrder.fulfillmentType})</span>
                <span className="text-[#202522] font-medium">
                  {activeOrder.deliveryFee === 0 ? "Free" : formatPrice(activeOrder.deliveryFee)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Platform Care Fee</span>
                <span className="text-[#202522] font-medium">{formatPrice(activeOrder.serviceFee)}</span>
              </div>
              {activeOrder.cookTip > 0 && (
                <div className="flex justify-between text-[#B86B4B]">
                  <span>Cook Tip (100% to {activeOrder.cookName})</span>
                  <span className="font-medium">{formatPrice(activeOrder.cookTip)}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-bold text-[#202522] pt-2 border-t border-[#EDE5D8]">
                <span>Paid via {activeOrder.paymentMethod}</span>
                <span className="text-[#24483A]">{formatPrice(activeOrder.total)}</span>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Review Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-xs" onClick={() => setIsReviewModalOpen(false)} />
          <div className="min-h-full flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-xl border border-[#EDE5D8] relative z-10 space-y-4">
              <h3 className="font-serif text-xl font-bold text-[#202522]">
                Leave a Review for {activeOrder.cookName}
              </h3>
              <p className="text-xs text-[#6D716C]">
                Your feedback encourages our home cooks and helps neighbors discover genuine local meals.
              </p>

              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#202522] mb-1">
                    Rating (Stars)
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setReviewRating(star)}
                        className="p-1 focus:outline-none"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= reviewRating
                              ? "fill-[#C8A96B] text-[#C8A96B]"
                              : "text-[#D9D0C1]"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#202522] mb-1">
                    Your Review Notes
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="How was the flavor, warmth, and portion size?"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    className="w-full text-xs p-3 bg-[#F8F5EF] border border-[#EDE5D8] rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#24483A]"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsReviewModalOpen(false)}
                    className="flex-1 py-2.5 text-xs font-semibold text-[#6D716C] hover:bg-[#F8F5EF] rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-[#24483A] text-white py-2.5 text-xs font-semibold rounded-xl hover:bg-[#193329]"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Message Modal */}
      {isContactModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-xs" onClick={() => setIsContactModalOpen(false)} />
          <div className="min-h-full flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-xl border border-[#EDE5D8] relative z-10 space-y-4">
              <h3 className="font-serif text-xl font-bold text-[#202522]">
                Message {activeOrder.cookName}
              </h3>
              <p className="text-xs text-[#6D716C]">
                Ask questions regarding spice level, pickup timing, or allergen precautions.
              </p>

              <form onSubmit={handleSendMessage} className="space-y-4">
                <textarea
                  rows={3}
                  required
                  placeholder="e.g. Hi Amara, I am running 5 minutes late for pickup..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  className="w-full text-xs p-3 bg-[#F8F5EF] border border-[#EDE5D8] rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#24483A]"
                />
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsContactModalOpen(false)}
                    className="flex-1 py-2.5 text-xs font-semibold text-[#6D716C] hover:bg-[#F8F5EF] rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-[#24483A] text-white py-2.5 text-xs font-semibold rounded-xl hover:bg-[#193329]"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
