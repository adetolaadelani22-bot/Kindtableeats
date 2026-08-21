import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { 
  ShieldCheck, 
  Lock, 
  CreditCard, 
  MapPin, 
  Phone, 
  Mail, 
  User, 
  Heart, 
  ArrowLeft, 
  CheckCircle2,
  Clock,
  Smartphone,
  Building2,
  Globe2,
  Wallet,
  Coins,
  DollarSign,
  HelpCircle,
  Sparkles,
  QrCode,
  Check
} from "lucide-react";
import { GLOBAL_CURRENCIES } from "../../data/mockData";
import { Currency } from "../../types";

export const CheckoutPage: React.FC = () => {
  const { 
    cart, 
    cartSubtotal, 
    currentUser, 
    placeOrder, 
    setCurrentRoute, 
    navigateToOrder,
    currency,
    setCurrency,
    formatPrice,
    savedPaymentMethods,
    addSavedPaymentMethod
  } = useApp();

  const [fulfillmentType, setFulfillmentType] = useState<"delivery" | "pickup">("delivery");
  const [fullName, setFullName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [phone, setPhone] = useState("+1 (555) 234-5678");
  const [country, setCountry] = useState("Universal / Worldwide");
  const [address, setAddress] = useState("742 Evergreen Terrace / Victoria Island / 18 Camberwell Grove");
  const [notesToCook, setNotesToCook] = useState("");
  const [cookTip, setCookTip] = useState(3.00);

  // Payment Category State
  // "card" | "saved" | "wallet" | "paypal" | "bnpl" | "bank" | "mobile_money" | "crypto" | "cash"
  const [paymentType, setPaymentType] = useState<string>("card");

  // Selected Saved Method
  const [selectedSavedId, setSelectedSavedId] = useState<string>(
    savedPaymentMethods[0]?.id || ""
  );

  // Card Form State
  const [cardNumber, setCardNumber] = useState("4242 •••• •••• 4242");
  const [cardHolder, setCardHolder] = useState(currentUser.name);
  const [cardExpiry, setCardExpiry] = useState("12/28");
  const [cardCvv, setCardCvv] = useState("884");
  const [saveCardForLater, setSaveCardForLater] = useState(true);

  // Mobile Money State
  const [momoProvider, setMomoProvider] = useState<"flutterwave" | "mpesa" | "paystack" | "opay" | "momo">("flutterwave");
  const [momoPhone, setMomoPhone] = useState("+234 803 123 4567");

  // Bank Transfer State
  const [selectedBank, setSelectedBank] = useState("Chase / Barclays / GTBank Instant Wire");

  // Crypto State
  const [selectedCrypto, setSelectedCrypto] = useState<"USDC" | "USDT" | "BTC" | "ETH" | "SOL">("USDC");

  // Processing State
  const [isProcessing, setIsProcessing] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="py-20 max-w-md mx-auto text-center px-4">
        <div className="w-16 h-16 rounded-full bg-[#24483A]/10 text-[#24483A] flex items-center justify-center mx-auto mb-4">
          <Globe2 className="w-8 h-8" />
        </div>
        <h2 className="font-serif text-2xl font-bold text-[#202522] mb-3">
          Your basket is currently empty
        </h2>
        <p className="text-xs text-[#6D716C] mb-6">
          Explore delicious home-cooked dishes from kitchens across the universe before heading to checkout.
        </p>
        <button
          onClick={() => setCurrentRoute("discover")}
          className="bg-[#24483A] text-white px-6 py-3 rounded-xl text-xs font-semibold hover:bg-[#193329] transition-all"
        >
          Explore Worldwide Meals
        </button>
      </div>
    );
  }

  const deliveryFee = fulfillmentType === "delivery" ? 2.50 : 0.00;
  const serviceFee = 1.50;
  const total = cartSubtotal + deliveryFee + serviceFee + cookTip;
  const cookName = cart[0]?.meal.cookName || "Home Cook";

  const getPaymentSummaryLabel = () => {
    switch (paymentType) {
      case "saved":
        const saved = savedPaymentMethods.find(m => m.id === selectedSavedId);
        return saved ? `${saved.title} (${saved.subtitle})` : "Saved Card";
      case "card":
        return `Credit/Debit Card (${cardNumber.slice(-4) || "•••• 4242"})`;
      case "wallet":
        return "Apple Pay / Google Pay Instant";
      case "paypal":
        return "PayPal Express";
      case "bnpl":
        return "Klarna / Afterpay (Pay in 4)";
      case "bank":
        return `Instant Bank Wire (${selectedBank})`;
      case "mobile_money":
        return `${momoProvider.toUpperCase()} (${momoPhone})`;
      case "crypto":
        return `Web3 Crypto (${selectedCrypto} Instant)`;
      case "cash":
        return fulfillmentType === "delivery" ? "Cash on Delivery" : "Cash on Kitchen Pickup";
      default:
        return "Credit Card";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    if (paymentType === "card" && saveCardForLater) {
      addSavedPaymentMethod({
        type: "card",
        title: "Credit Card",
        subtitle: `•••• ${cardNumber.replace(/\s+/g, "").slice(-4) || "4242"}`,
        last4: cardNumber.replace(/\s+/g, "").slice(-4) || "4242",
        brand: "visa",
        expiry: cardExpiry,
        isDefault: false
      });
    }

    setTimeout(() => {
      const newOrder = placeOrder({
        customerName: fullName,
        customerEmail: email,
        customerPhone: phone,
        deliveryAddress: `${address} (${country})`,
        fulfillmentType,
        cookTip,
        paymentMethod: getPaymentSummaryLabel(),
        notesToCook
      });

      setIsProcessing(false);
      navigateToOrder(newOrder.id);
    }, 1000);
  };

  return (
    <div className="py-10 bg-[#F8F5EF] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Breadcrumb & Currency Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <button
            onClick={() => setCurrentRoute("discover")}
            className="flex items-center gap-2 text-xs font-semibold text-[#24483A] hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Worldwide Menu</span>
          </button>

          {/* Universal Currency selector in Checkout */}
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-[#EDE5D8] shadow-xs">
            <Globe2 className="w-3.5 h-3.5 text-[#B86B4B]" />
            <span className="text-[11px] font-semibold text-[#6D716C]">Pay in:</span>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as Currency)}
              className="text-xs font-bold text-[#24483A] bg-transparent focus:outline-none cursor-pointer"
            >
              {GLOBAL_CURRENCIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.code} ({c.symbol})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Page Header */}
        <div className="border-b border-[#EDE5D8] pb-6 mb-8">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#B86B4B] bg-[#B86B4B]/10 px-2.5 py-0.5 rounded-md">
              Universal Global Checkout
            </span>
            <span className="text-xs text-[#6D716C]">• 100% Encrypted & Insured</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-[#202522] mt-2">
            Complete Your Home Kitchen Order
          </h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column (7 cols): Fulfillment, Address, and Payment */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* 1. Fulfillment Type */}
              <div className="bg-white p-6 rounded-2xl border border-[#EDE5D8] shadow-xs space-y-4">
                <h3 className="font-serif text-lg font-bold text-[#202522] flex items-center justify-between">
                  <span>1. Choose Fulfillment Mode</span>
                  <span className="text-xs text-[#6D716C] font-sans font-normal">Everywhere in Universe</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFulfillmentType("delivery")}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      fulfillmentType === "delivery"
                        ? "border-[#24483A] bg-[#24483A]/5 ring-1 ring-[#24483A]"
                        : "border-[#EDE5D8] hover:border-[#D9D0C1]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-serif text-sm font-bold text-[#202522]">
                        Global Courier Delivery
                      </span>
                      <span className="text-xs font-bold text-[#24483A] bg-white px-2 py-0.5 rounded border border-[#EDE5D8]">
                        {formatPrice(2.50)}
                      </span>
                    </div>
                    <span className="text-xs text-[#6D716C] block leading-relaxed">
                      Hot insulated packaging delivered directly to your doorstep or apartment.
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFulfillmentType("pickup")}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      fulfillmentType === "pickup"
                        ? "border-[#24483A] bg-[#24483A]/5 ring-1 ring-[#24483A]"
                        : "border-[#EDE5D8] hover:border-[#D9D0C1]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-serif text-sm font-bold text-[#202522]">
                        Kitchen Door Collection
                      </span>
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        FREE
                      </span>
                    </div>
                    <span className="text-xs text-[#6D716C] block leading-relaxed">
                      Collect directly from {cookName}'s warm verified home kitchen.
                    </span>
                  </button>
                </div>
              </div>

              {/* 2. Contact & Delivery Address (Universal) */}
              <div className="bg-white p-6 rounded-2xl border border-[#EDE5D8] shadow-xs space-y-4">
                <h3 className="font-serif text-lg font-bold text-[#202522]">
                  2. Contact & Location Information
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#202522] mb-1">
                      Recipient Full Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full text-xs pl-9 pr-3 py-2.5 bg-[#F8F5EF] border border-[#EDE5D8] rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#24483A]"
                      />
                      <User className="w-4 h-4 text-[#6D716C] absolute left-3 top-3" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#202522] mb-1">
                      Phone Number (for Courier SMS updates)
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full text-xs pl-9 pr-3 py-2.5 bg-[#F8F5EF] border border-[#EDE5D8] rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#24483A]"
                      />
                      <Phone className="w-4 h-4 text-[#6D716C] absolute left-3 top-3" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#202522] mb-1">
                      Email Address (Receipt & Live Tracking)
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full text-xs pl-9 pr-3 py-2.5 bg-[#F8F5EF] border border-[#EDE5D8] rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#24483A]"
                      />
                      <Mail className="w-4 h-4 text-[#6D716C] absolute left-3 top-3" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#202522] mb-1">
                      Country / Region (Universal)
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder="e.g. USA, UK, Nigeria, Japan, France, Jamaica"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full text-xs pl-9 pr-3 py-2.5 bg-[#F8F5EF] border border-[#EDE5D8] rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#24483A]"
                      />
                      <Globe2 className="w-4 h-4 text-[#B86B4B] absolute left-3 top-3" />
                    </div>
                  </div>
                </div>

                {fulfillmentType === "delivery" && (
                  <div>
                    <label className="block text-xs font-semibold text-[#202522] mb-1">
                      Street Address, Apt / Suite & Postcode
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder="Enter full universe street address, building or coordinates"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full text-xs pl-9 pr-3 py-2.5 bg-[#F8F5EF] border border-[#EDE5D8] rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#24483A]"
                      />
                      <MapPin className="w-4 h-4 text-[#B86B4B] absolute left-3 top-3" />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-[#202522] mb-1">
                    Special Door / Kitchen Notes for Cook
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Ring top apartment buzzer, leave on front porch, or knock softly"
                    value={notesToCook}
                    onChange={(e) => setNotesToCook(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 bg-[#F8F5EF] border border-[#EDE5D8] rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#24483A]"
                  />
                </div>
              </div>

              {/* 3. Comprehensive Global Payment Methods */}
              <div className="bg-white p-6 rounded-2xl border border-[#EDE5D8] shadow-xs space-y-5">
                <div className="flex items-center justify-between border-b border-[#EDE5D8] pb-3">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#202522]">
                      3. Select Payment Method
                    </h3>
                    <p className="text-xs text-[#6D716C]">
                      Choose from global cards, digital wallets, mobile money, or instant bank wires
                    </p>
                  </div>
                  <span className="flex items-center gap-1 text-[11px] text-[#24483A] font-semibold bg-[#24483A]/10 px-2 py-1 rounded-md">
                    <Lock className="w-3.5 h-3.5" /> 256-Bit SSL
                  </span>
                </div>

                {/* Primary Payment Mode Buttons */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentType("card")}
                    className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                      paymentType === "card"
                        ? "border-[#24483A] bg-[#24483A]/5 text-[#24483A] font-bold shadow-xs"
                        : "border-[#EDE5D8] hover:border-[#D9D0C1] text-[#202522]"
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-[#B86B4B]" />
                    <span className="text-[11px]">Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentType("wallet")}
                    className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                      paymentType === "wallet"
                        ? "border-[#24483A] bg-[#24483A]/5 text-[#24483A] font-bold shadow-xs"
                        : "border-[#EDE5D8] hover:border-[#D9D0C1] text-[#202522]"
                    }`}
                  >
                    <Smartphone className="w-5 h-5 text-[#24483A]" />
                    <span className="text-[11px]">Apple / Google</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentType("paypal")}
                    className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                      paymentType === "paypal"
                        ? "border-[#24483A] bg-[#24483A]/5 text-[#24483A] font-bold shadow-xs"
                        : "border-[#EDE5D8] hover:border-[#D9D0C1] text-[#202522]"
                    }`}
                  >
                    <Wallet className="w-5 h-5 text-blue-600" />
                    <span className="text-[11px]">PayPal</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentType("mobile_money")}
                    className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                      paymentType === "mobile_money"
                        ? "border-[#24483A] bg-[#24483A]/5 text-[#24483A] font-bold shadow-xs"
                        : "border-[#EDE5D8] hover:border-[#D9D0C1] text-[#202522]"
                    }`}
                  >
                    <Coins className="w-5 h-5 text-amber-600" />
                    <span className="text-[11px]">Mobile Money</span>
                  </button>
                </div>

                {/* Secondary payment type toggles */}
                <div className="flex flex-wrap gap-2 pt-1 text-[11px]">
                  <button
                    type="button"
                    onClick={() => setPaymentType("saved")}
                    className={`px-3 py-1.5 rounded-lg border font-medium transition-all ${
                      paymentType === "saved"
                        ? "bg-[#24483A] text-white border-[#24483A]"
                        : "bg-[#F8F5EF] text-[#202522] border-[#EDE5D8] hover:border-[#24483A]"
                    }`}
                  >
                    ⭐ Saved Wallets ({savedPaymentMethods.length})
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentType("bnpl")}
                    className={`px-3 py-1.5 rounded-lg border font-medium transition-all ${
                      paymentType === "bnpl"
                        ? "bg-[#24483A] text-white border-[#24483A]"
                        : "bg-[#F8F5EF] text-[#202522] border-[#EDE5D8] hover:border-[#24483A]"
                    }`}
                  >
                    🛍️ Klarna / Afterpay (4x Split)
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentType("bank")}
                    className={`px-3 py-1.5 rounded-lg border font-medium transition-all ${
                      paymentType === "bank"
                        ? "bg-[#24483A] text-white border-[#24483A]"
                        : "bg-[#F8F5EF] text-[#202522] border-[#EDE5D8] hover:border-[#24483A]"
                    }`}
                  >
                    🏦 Instant Bank Wire / Open Banking
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentType("crypto")}
                    className={`px-3 py-1.5 rounded-lg border font-medium transition-all ${
                      paymentType === "crypto"
                        ? "bg-[#24483A] text-white border-[#24483A]"
                        : "bg-[#F8F5EF] text-[#202522] border-[#EDE5D8] hover:border-[#24483A]"
                    }`}
                  >
                    ⚡ Crypto / Web3 (USDC)
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentType("cash")}
                    className={`px-3 py-1.5 rounded-lg border font-medium transition-all ${
                      paymentType === "cash"
                        ? "bg-[#24483A] text-white border-[#24483A]"
                        : "bg-[#F8F5EF] text-[#202522] border-[#EDE5D8] hover:border-[#24483A]"
                    }`}
                  >
                    💵 Cash on Hand
                  </button>
                </div>

                {/* --- DETAILS FOR SELECTED METHOD --- */}

                {/* 1. Credit/Debit Card Details */}
                {paymentType === "card" && (
                  <div className="p-4 bg-[#F8F5EF] rounded-xl border border-[#EDE5D8] space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#202522] uppercase tracking-wider">
                        Card Details (Visa, Mastercard, Amex, Verve, UnionPay)
                      </span>
                      <div className="flex items-center gap-1.5 text-[10px] text-[#6D716C]">
                        <span>💳 Global Acceptance</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-[#202522] mb-1">
                        Card Number
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          placeholder="4242 4242 4242 4242"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full text-xs font-mono pl-9 pr-3 py-2.5 bg-white border border-[#EDE5D8] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#24483A]"
                        />
                        <CreditCard className="w-4 h-4 text-[#B86B4B] absolute left-3 top-3" />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div className="col-span-1 sm:col-span-2">
                        <label className="block text-[11px] font-semibold text-[#202522] mb-1">
                          Cardholder Name
                        </label>
                        <input
                          type="text"
                          required
                          value={cardHolder}
                          onChange={(e) => setCardHolder(e.target.value)}
                          className="w-full text-xs px-3 py-2.5 bg-white border border-[#EDE5D8] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#24483A]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-[#202522] mb-1">
                          Expiry (MM/YY)
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="12/28"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full text-xs font-mono px-3 py-2.5 bg-white border border-[#EDE5D8] rounded-xl text-center focus:outline-none focus:ring-1 focus:ring-[#24483A]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-[#202522] mb-1">
                          Security Code (CVV / CVC)
                        </label>
                        <input
                          type="password"
                          maxLength={4}
                          required
                          placeholder="•••"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          className="w-full text-xs font-mono px-3 py-2.5 bg-white border border-[#EDE5D8] rounded-xl text-center focus:outline-none focus:ring-1 focus:ring-[#24483A]"
                        />
                      </div>

                      <div className="flex items-center pt-5">
                        <label className="flex items-center gap-2 cursor-pointer text-xs text-[#202522]">
                          <input
                            type="checkbox"
                            checked={saveCardForLater}
                            onChange={(e) => setSaveCardForLater(e.target.checked)}
                            className="accent-[#24483A] w-4 h-4 rounded"
                          />
                          <span>Save card for 1-click checkout</span>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. Saved Cards & Wallets */}
                {paymentType === "saved" && (
                  <div className="p-4 bg-[#F8F5EF] rounded-xl border border-[#EDE5D8] space-y-3">
                    <span className="text-xs font-bold text-[#202522] uppercase tracking-wider block">
                      Select Your Saved Payment Profile
                    </span>
                    {savedPaymentMethods.map((m) => (
                      <label
                        key={m.id}
                        onClick={() => setSelectedSavedId(m.id)}
                        className={`flex items-center justify-between p-3 bg-white rounded-xl border cursor-pointer transition-all ${
                          selectedSavedId === m.id
                            ? "border-[#24483A] ring-1 ring-[#24483A]"
                            : "border-[#EDE5D8] hover:border-[#D9D0C1]"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="saved_method"
                            checked={selectedSavedId === m.id}
                            onChange={() => setSelectedSavedId(m.id)}
                            className="accent-[#24483A]"
                          />
                          <div>
                            <span className="text-xs font-bold text-[#202522] block">{m.title}</span>
                            <span className="text-[11px] text-[#6D716C]">{m.subtitle}</span>
                          </div>
                        </div>
                        {m.isDefault && (
                          <span className="text-[10px] font-bold text-[#24483A] bg-[#24483A]/10 px-2 py-0.5 rounded">
                            Default
                          </span>
                        )}
                      </label>
                    ))}
                  </div>
                )}

                {/* 3. Apple Pay & Google Pay */}
                {paymentType === "wallet" && (
                  <div className="p-5 bg-[#F8F5EF] rounded-xl border border-[#EDE5D8] text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center mx-auto shadow-md">
                      <Smartphone className="w-6 h-6" />
                    </div>
                    <h4 className="font-serif text-sm font-bold text-[#202522]">
                      1-Click Express Digital Wallet
                    </h4>
                    <p className="text-xs text-[#6D716C] max-w-sm mx-auto leading-relaxed">
                      Authorize with Face ID, Touch ID, or Google Password Manager instantly at {formatPrice(total)}.
                    </p>
                    <div className="pt-2">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Biometric Token Detected
                      </span>
                    </div>
                  </div>
                )}

                {/* 4. PayPal */}
                {paymentType === "paypal" && (
                  <div className="p-5 bg-[#F8F5EF] rounded-xl border border-[#EDE5D8] space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-base">
                        P
                      </div>
                      <div>
                        <h4 className="font-serif text-sm font-bold text-[#202522]">PayPal Express & Pay Later</h4>
                        <p className="text-xs text-[#6D716C]">Pay with PayPal balance or connected bank worldwide</p>
                      </div>
                    </div>
                    <div className="p-3 bg-white rounded-lg border border-[#EDE5D8] text-xs text-[#202522] flex justify-between items-center">
                      <span>Connected account:</span>
                      <span className="font-semibold text-blue-700">{email}</span>
                    </div>
                  </div>
                )}

                {/* 5. Klarna / Afterpay (Buy Now Pay Later) */}
                {paymentType === "bnpl" && (
                  <div className="p-4 bg-[#F8F5EF] rounded-xl border border-[#EDE5D8] space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#202522] uppercase tracking-wider">
                        4 Interest-Free Payments (Klarna / Afterpay)
                      </span>
                      <span className="text-[10px] font-bold bg-pink-100 text-pink-800 px-2 py-0.5 rounded">
                        0% APR
                      </span>
                    </div>
                    <div className="grid grid-cols-4 gap-2 text-center pt-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="bg-white p-2.5 rounded-lg border border-[#EDE5D8]">
                          <span className="text-[10px] text-[#6D716C] block">Payment {i}</span>
                          <span className="text-xs font-bold text-[#24483A]">
                            {formatPrice(total / 4)}
                          </span>
                          <span className="text-[9px] text-[#6D716C] block mt-0.5">
                            {i === 1 ? "Today" : `In ${i * 2} wks`}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 6. Bank Transfer / Open Banking */}
                {paymentType === "bank" && (
                  <div className="p-4 bg-[#F8F5EF] rounded-xl border border-[#EDE5D8] space-y-3">
                    <span className="text-xs font-bold text-[#202522] uppercase tracking-wider block">
                      Select Your Financial Institution (SEPA / ACH / Faster Payments / NIBSS)
                    </span>
                    <select
                      value={selectedBank}
                      onChange={(e) => setSelectedBank(e.target.value)}
                      className="w-full text-xs p-2.5 bg-white border border-[#EDE5D8] rounded-xl font-semibold text-[#202522] focus:outline-none focus:ring-1 focus:ring-[#24483A]"
                    >
                      <option value="Chase Bank (USA - ACH Instant)">Chase Bank (USA - ACH Instant)</option>
                      <option value="Bank of America (USA)">Bank of America (USA)</option>
                      <option value="Barclays / NatWest (UK Open Banking)">Barclays / NatWest (UK Open Banking)</option>
                      <option value="Revolut / Monzo (Europe/UK Instant)">Revolut / Monzo (Europe/UK Instant)</option>
                      <option value="GTBank / Zenith Bank (Nigeria NIBSS Wire)">GTBank / Zenith Bank (Nigeria NIBSS Wire)</option>
                      <option value="BNP Paribas / Deutsche Bank (SEPA Instant)">BNP Paribas / Deutsche Bank (SEPA Instant)</option>
                      <option value="HDFC / ICICI (India UPI & NetBanking)">HDFC / ICICI (India UPI & NetBanking)</option>
                      <option value="RBC / TD Bank (Canada Interac e-Transfer)">RBC / TD Bank (Canada Interac e-Transfer)</option>
                      <option value="Nubank / Itaú (Brazil Pix Instant)">Nubank / Itaú (Brazil Pix Instant)</option>
                    </select>
                    <p className="text-[11px] text-[#6D716C]">
                      You will be securely redirected to approve the {formatPrice(total)} transfer with zero added transaction fees.
                    </p>
                  </div>
                )}

                {/* 7. Mobile Money & Regional African/Asian Wallets */}
                {paymentType === "mobile_money" && (
                  <div className="p-4 bg-[#F8F5EF] rounded-xl border border-[#EDE5D8] space-y-3">
                    <span className="text-xs font-bold text-[#202522] uppercase tracking-wider block">
                      Select Mobile Money Gateway
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: "flutterwave", label: "Flutterwave" },
                        { id: "mpesa", label: "M-Pesa (East Africa)" },
                        { id: "paystack", label: "Paystack" },
                        { id: "opay", label: "OPay / PalmPay" },
                        { id: "momo", label: "MTN / Airtel MoMo" }
                      ].map((p) => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => setMomoProvider(p.id as any)}
                          className={`p-2 text-xs rounded-lg border font-semibold transition-all ${
                            momoProvider === p.id
                              ? "bg-[#24483A] text-white border-[#24483A]"
                              : "bg-white text-[#202522] border-[#EDE5D8]"
                          }`}
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-[#202522] mb-1">
                        Mobile Money Phone / Account ID
                      </label>
                      <input
                        type="text"
                        required
                        value={momoPhone}
                        onChange={(e) => setMomoPhone(e.target.value)}
                        placeholder="+234 803 123 4567 or +254 712 345678"
                        className="w-full text-xs px-3 py-2.5 bg-white border border-[#EDE5D8] rounded-xl font-mono focus:outline-none focus:ring-1 focus:ring-[#24483A]"
                      />
                      <span className="text-[10px] text-[#6D716C] block mt-1">
                        A secure PIN prompt or USSD push authorization will appear on your mobile phone.
                      </span>
                    </div>
                  </div>
                )}

                {/* 8. Web3 / Crypto (USDC/USDT) */}
                {paymentType === "crypto" && (
                  <div className="p-4 bg-[#F8F5EF] rounded-xl border border-[#EDE5D8] space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#202522] uppercase tracking-wider">
                        Web3 Digital Currency Checkout
                      </span>
                      <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
                        Instant Settlement
                      </span>
                    </div>

                    <div className="grid grid-cols-5 gap-1.5">
                      {(["USDC", "USDT", "SOL", "ETH", "BTC"] as const).map((coin) => (
                        <button
                          key={coin}
                          type="button"
                          onClick={() => setSelectedCrypto(coin)}
                          className={`py-1.5 text-xs font-bold rounded-lg border transition-all ${
                            selectedCrypto === coin
                              ? "bg-[#24483A] text-white border-[#24483A]"
                              : "bg-white text-[#202522] border-[#EDE5D8]"
                          }`}
                        >
                          {coin}
                        </button>
                      ))}
                    </div>

                    <div className="bg-white p-3 rounded-xl border border-[#EDE5D8] flex items-center gap-3">
                      <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center shrink-0 border border-gray-200">
                        <QrCode className="w-8 h-8 text-[#24483A]" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] text-[#6D716C] block">KindTable Universal Pay Address:</span>
                        <span className="font-mono text-xs font-bold text-[#202522] truncate block">
                          0x71C...KindTableUniversePay
                        </span>
                        <span className="text-[10px] text-emerald-700 font-semibold block mt-0.5">
                          Amount: {formatPrice(total)} in {selectedCrypto}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* 9. Cash on Delivery */}
                {paymentType === "cash" && (
                  <div className="p-4 bg-[#F8F5EF] rounded-xl border border-[#EDE5D8] space-y-2">
                    <h4 className="text-xs font-bold text-[#202522] uppercase tracking-wider">
                      Cash Hand-off at {fulfillmentType === "delivery" ? "Door Delivery" : "Kitchen Collection"}
                    </h4>
                    <p className="text-xs text-[#6D716C] leading-relaxed">
                      Please have exact change ({formatPrice(total)}) ready for the courier or cook upon meal handover.
                    </p>
                  </div>
                )}

              </div>

            </div>

            {/* Right Column (5 cols): Order Summary & Confirm */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="bg-white p-6 rounded-2xl border border-[#EDE5D8] shadow-xs space-y-5">
                <div className="flex items-center justify-between border-b border-[#EDE5D8] pb-3">
                  <h3 className="font-serif text-lg font-bold text-[#202522]">
                    Order Summary
                  </h3>
                  <span className="text-xs font-bold text-[#24483A] bg-[#24483A]/10 px-2 py-0.5 rounded">
                    {cart.reduce((s, i) => s + i.quantity, 0)} items
                  </span>
                </div>

                {/* Items preview */}
                <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                  {cart.map((item) => {
                    const priceEach = item.unitPrice ?? item.meal.price;
                    const itemTotal = priceEach * item.quantity;
                    const hasCustom = item.selectedCustomizations && item.selectedCustomizations.length > 0;

                    return (
                      <div key={item.id} className="p-3 bg-[#F8F5EF] rounded-xl border border-[#EDE5D8] space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2 min-w-0 pr-2">
                            <span className="font-bold text-[#24483A] bg-white px-2 py-0.5 rounded-md border border-[#EDE5D8] shrink-0">
                              {item.quantity}x
                            </span>
                            <span className="text-[#202522] font-serif font-bold truncate">
                              {item.meal.name}
                            </span>
                          </div>
                          <span className="font-bold text-[#202522] shrink-0">
                            {formatPrice(itemTotal)}
                          </span>
                        </div>

                        {hasCustom && (
                          <div className="flex flex-wrap gap-1 pt-1 border-t border-[#EDE5D8]/60">
                            {item.selectedCustomizations!.map((c, i) => (
                              <span key={i} className="text-[10px] bg-white text-[#24483A] font-medium px-1.5 py-0.5 rounded border border-[#EDE5D8]">
                                {c.optionName} {c.price > 0 && `(+${formatPrice(c.price)})`}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Direct Tip for Cook */}
                <div className="pt-3 border-t border-[#EDE5D8]">
                  <div className="flex justify-between items-center text-xs mb-2">
                    <span className="font-semibold text-[#202522] flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5 text-[#B86B4B] fill-[#B86B4B]" /> 100% Direct Tip for {cookName}
                    </span>
                    <span className="text-[#24483A] font-bold">{formatPrice(cookTip)}</span>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5">
                    {[1.50, 3.00, 5.00, 0.00].map((amt) => (
                      <button
                        type="button"
                        key={amt}
                        onClick={() => setCookTip(amt)}
                        className={`py-1.5 text-xs rounded-lg border font-medium transition-all ${
                          cookTip === amt
                            ? "bg-[#24483A] text-white border-[#24483A]"
                            : "bg-[#F8F5EF] text-[#202522] border-[#EDE5D8] hover:border-[#24483A]"
                        }`}
                      >
                        {amt === 0 ? "None" : formatPrice(amt)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Fee Breakdown */}
                <div className="space-y-2 text-xs text-[#6D716C] pt-3 border-t border-[#EDE5D8]">
                  <div className="flex justify-between">
                    <span>Dishes Subtotal</span>
                    <span className="font-medium text-[#202522]">{formatPrice(cartSubtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{fulfillmentType === "delivery" ? "Global Courier Delivery" : "Collection"}</span>
                    <span className="font-medium text-[#202522]">
                      {deliveryFee === 0 ? "Free" : formatPrice(deliveryFee)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Community Platform Support Fee</span>
                    <span className="font-medium text-[#202522]">{formatPrice(serviceFee)}</span>
                  </div>
                  {cookTip > 0 && (
                    <div className="flex justify-between text-[#B86B4B]">
                      <span>Cook Direct Tip</span>
                      <span className="font-medium">{formatPrice(cookTip)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-base font-bold text-[#202522] pt-2 border-t border-[#EDE5D8]">
                    <span>Total Amount</span>
                    <span className="text-[#24483A] font-serif text-xl">{formatPrice(total)}</span>
                  </div>
                  <div className="text-[11px] text-[#6D716C] text-right">
                    <span>Paying via: </span>
                    <span className="font-bold text-[#202522]">{getPaymentSummaryLabel()}</span>
                  </div>
                </div>

                {/* Place Order CTA */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-[#24483A] hover:bg-[#193329] disabled:bg-[#6D716C] text-white py-4 rounded-xl font-bold text-sm shadow-md transition-all active:scale-98 flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <span>Securing Kitchen Order & Authorizing...</span>
                  ) : (
                    <>
                      <span>Authorize Order • {formatPrice(total)}</span>
                      <ShieldCheck className="w-4 h-4 text-[#C8A96B]" />
                    </>
                  )}
                </button>

                <p className="text-[11px] text-center text-[#6D716C] leading-snug">
                  By placing this order, you support verified home kitchens with direct economic dignity and zero predatory platform deductions.
                </p>

              </div>

            </div>

          </div>
        </form>

      </div>
    </div>
  );
};
