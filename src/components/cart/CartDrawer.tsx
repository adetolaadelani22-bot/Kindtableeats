import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Heart } from "lucide-react";

export const CartDrawer: React.FC = () => {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    updateCartQuantity, 
    removeFromCart, 
    clearCart,
    cartSubtotal, 
    setCurrentRoute,
    formatPrice
  } = useApp();

  const [fulfillmentType, setFulfillmentType] = useState<"delivery" | "pickup">("delivery");
  const [tipAmount, setTipAmount] = useState<number>(3.00);

  if (!isCartOpen) return null;

  const deliveryFee = fulfillmentType === "delivery" ? 2.50 : 0.00;
  const serviceFee = cart.length > 0 ? 1.50 : 0.00;
  const total = cartSubtotal + deliveryFee + serviceFee + (cart.length > 0 ? tipAmount : 0);

  const cookName = cart[0]?.meal.cookName || "Your Home Cook";
  const kitchenName = cart[0]?.meal.kitchenName || "Home Kitchen";

  const handleCheckout = () => {
    setIsCartOpen(false);
    setCurrentRoute("checkout");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#F8F5EF] shadow-2xl flex flex-col border-l border-[#EDE5D8] animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-6 bg-white border-b border-[#EDE5D8] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#24483A] text-white flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-[#202522]">
                  Your Basket
                </h3>
                {cart.length > 0 && (
                  <p className="text-xs text-[#6D716C]">
                    Simmering at {kitchenName}
                  </p>
                )}
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-[#6D716C] hover:text-[#202522] hover:bg-[#EDE5D8] rounded-lg transition-colors"
              aria-label="Close basket"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Content */}
          {cart.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-[#EDE5D8] flex items-center justify-center mb-4 text-[#24483A]">
                <ShoppingBag className="w-8 h-8 opacity-60" />
              </div>
              <h4 className="font-serif text-xl font-bold text-[#202522] mb-2">
                Your basket is empty
              </h4>
              <p className="text-xs text-[#6D716C] max-w-xs leading-relaxed mb-6">
                Discover nourishing home-cooked meals prepared with care by verified home cooks across the universe.
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setCurrentRoute("discover");
                }}
                className="bg-[#24483A] text-white text-xs font-semibold px-6 py-3 rounded-xl hover:bg-[#193329] transition-colors"
              >
                Explore Worldwide Meals
              </button>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* Fulfillment Switcher */}
              <div className="bg-[#EDE5D8]/70 p-1.5 rounded-xl flex gap-1 border border-[#D9D0C1]/60">
                <button
                  onClick={() => setFulfillmentType("delivery")}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                    fulfillmentType === "delivery"
                      ? "bg-white text-[#24483A] shadow-xs"
                      : "text-[#6D716C] hover:text-[#202522]"
                  }`}
                >
                  Local Courier ({formatPrice(2.50)})
                </button>
                <button
                  onClick={() => setFulfillmentType("pickup")}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                    fulfillmentType === "pickup"
                      ? "bg-white text-[#24483A] shadow-xs"
                      : "text-[#6D716C] hover:text-[#202522]"
                  }`}
                >
                  Door Pickup (Free)
                </button>
              </div>

              {/* Items List */}
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-[#6D716C] font-medium border-b border-[#EDE5D8] pb-2">
                  <span>Selected Dishes ({cart.length})</span>
                  <button onClick={clearCart} className="text-[#B86B4B] hover:underline">
                    Clear basket
                  </button>
                </div>

                {cart.map((item) => {
                  const effectiveUnitPrice = item.unitPrice ?? item.meal.price;
                  const itemTotal = effectiveUnitPrice * item.quantity;
                  const hasCustomizations = item.selectedCustomizations && item.selectedCustomizations.length > 0;

                  return (
                    <div
                      key={item.id}
                      className="bg-white p-4 rounded-xl border border-[#EDE5D8] flex gap-3 shadow-xs"
                    >
                      <img
                        src={item.meal.imageUrl}
                        alt={item.meal.name}
                        className="w-16 h-16 rounded-lg object-cover bg-[#EDE5D8] shrink-0"
                      />

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-serif text-sm font-bold text-[#202522] leading-tight line-clamp-2">
                            {item.meal.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-[#6D716C] hover:text-[#B86B4B] p-1 rounded-md transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <p className="text-xs text-[#24483A] font-semibold mt-1">
                          {formatPrice(effectiveUnitPrice)} each
                        </p>

                        {/* Selected Customizations List */}
                        {hasCustomizations && (
                          <div className="mt-2 pt-2 border-t border-[#EDE5D8]/70 space-y-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6D716C] block">
                              Custom Selections:
                            </span>
                            <div className="flex flex-wrap gap-1">
                              {item.selectedCustomizations!.map((opt, optIdx) => (
                                <span
                                  key={`${opt.groupId}-${opt.optionId}-${optIdx}`}
                                  className="text-[10px] bg-[#F8F5EF] text-[#202522] px-2 py-0.5 rounded-md border border-[#EDE5D8] leading-tight"
                                >
                                  {opt.optionName}
                                  {opt.price > 0 && ` (+${formatPrice(opt.price)})`}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {item.specialInstructions && (
                          <p className="text-[11px] text-[#6D716C] italic mt-1.5 line-clamp-2 bg-[#F8F5EF]/60 p-1.5 rounded">
                            Note: {item.specialInstructions}
                          </p>
                        )}

                        {/* Quantity Controller & Price */}
                        <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#EDE5D8]/60">
                          <div className="flex items-center border border-[#EDE5D8] rounded-lg bg-[#F8F5EF]">
                            <button
                              onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                              className="p-1 text-[#6D716C] hover:text-[#202522]"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-2.5 text-xs font-bold text-[#202522]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                              className="p-1 text-[#6D716C] hover:text-[#202522]"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <span className="text-xs font-bold text-[#202522]">
                            {formatPrice(itemTotal)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Cook Tip Selector */}
              <div className="bg-white p-4 rounded-xl border border-[#EDE5D8]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#202522] flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5 text-[#B86B4B] fill-[#B86B4B]" />
                    Direct Tip for {cookName}
                  </span>
                  <span className="text-xs font-semibold text-[#24483A]">
                    100% goes to cook
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {[1.50, 3.00, 5.00, 0.00].map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setTipAmount(amount)}
                      className={`py-1.5 text-xs font-medium rounded-lg border transition-all ${
                        tipAmount === amount
                          ? "bg-[#24483A] text-white border-[#24483A]"
                          : "bg-[#F8F5EF] text-[#202522] border-[#EDE5D8] hover:border-[#D9D0C1]"
                      }`}
                    >
                      {amount === 0 ? "None" : formatPrice(amount)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dignity & Hygiene Trust Notice */}
              <div className="bg-[#24483A]/5 border border-[#24483A]/20 p-3.5 rounded-xl flex items-start gap-2.5 text-xs text-[#24483A]">
                <ShieldCheck className="w-4 h-4 text-[#24483A] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold leading-tight">Dignity-Assured Home Kitchen</p>
                  <p className="text-[11px] text-[#6D716C] mt-0.5">
                    All ingredients prepared according to audited Food Safety & Standards practices worldwide.
                  </p>
                </div>
              </div>

            </div>
          )}

          {/* Cart Footer */}
          {cart.length > 0 && (
            <div className="p-6 bg-white border-t border-[#EDE5D8] space-y-4">
              <div className="space-y-1.5 text-xs text-[#6D716C]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#202522]">{formatPrice(cartSubtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>{fulfillmentType === "delivery" ? "Local Delivery" : "Kitchen Pickup"}</span>
                  <span className="font-medium text-[#202522]">
                    {deliveryFee === 0 ? "Free" : formatPrice(deliveryFee)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Community Platform Care Fee</span>
                  <span className="font-medium text-[#202522]">{formatPrice(serviceFee)}</span>
                </div>
                {tipAmount > 0 && (
                  <div className="flex justify-between text-[#B86B4B]">
                    <span>Cook Tip ({cookName})</span>
                    <span className="font-medium">{formatPrice(tipAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-bold text-[#202522] pt-2 border-t border-[#EDE5D8]">
                  <span>Total</span>
                  <span className="text-[#24483A] font-serif text-lg">{formatPrice(total)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full flex items-center justify-center gap-2 bg-[#24483A] hover:bg-[#193329] text-white py-3.5 rounded-xl font-semibold text-sm transition-all shadow-md active:scale-98"
              >
                <span>Continue to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
