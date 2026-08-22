import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { 
  User, 
  ChefHat, 
  ShieldCheck, 
  Lock, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Utensils,
  HeartHandshake
} from "lucide-react";
import { UserRole } from "../../types";

export const AuthPage: React.FC = () => {
  const { 
    userRole, 
    setUserRole, 
    setIsAuthenticated,
    setCustomerIdentity,
    setCurrentRoute, 
    addToast,
    submitCookApplication
  } = useApp();

  const [activeTab, setActiveTab] = useState<"customer-login" | "customer-register" | "cook-login" | "cook-register">("customer-login");

  // Customer Login State
  const [customerEmail, setCustomerEmail] = useState("hannah.wright@example.com");
  const [customerPassword, setCustomerPassword] = useState("••••••••");

  // Customer Register State
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regAddress, setRegAddress] = useState("");
  const [regPassword, setRegPassword] = useState("");

  // Cook Login State
  const [cookEmail, setCookEmail] = useState("amara.okafor@kindtableeats.org");
  const [cookPassword, setCookPassword] = useState("••••••••");

  const handleCustomerLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setUserRole("customer");
    setIsAuthenticated(true);
    setCustomerIdentity(customerEmail.split("@")[0].replace(/[._-]+/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase()), customerEmail);
    addToast({
      title: "Welcome back!",
      message: `Signed in as ${customerEmail.split("@")[0]}`,
      type: "success"
    });
    setCurrentRoute("discover");
  };

  const handleCustomerRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setUserRole("customer");
    setIsAuthenticated(true);
    setCustomerIdentity(regName, regEmail);
    addToast({
      title: "Account Created Successfully!",
      message: `Welcome to KindTableEats, ${regName || "Neighbor"}! Explore today's freshly made dishes.`,
      type: "success"
    });
    setCurrentRoute("discover");
  };

  const handleCookLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setUserRole("seller");
    addToast({
      title: "Kitchen Hub Access Granted",
      message: "Welcome to Mama Amara's Kitchen Dashboard",
      type: "success"
    });
    setCurrentRoute("seller-dashboard");
  };


  const handleQuickRole = (role: UserRole) => {
    setUserRole(role);
    if (role === "seller") {
      addToast({
        title: "Switched to Cook Mode",
        message: "Logged into Mama Amara's Kitchen Hub",
        type: "success"
      });
      setCurrentRoute("seller-dashboard");
    } else {
      addToast({
        title: "Customer Mode Activated",
        message: "Browsing and ordering home-cooked meals",
        type: "success"
      });
      setCurrentRoute("discover");
    }
  };

  return (
    <div className="py-12 bg-[#F8F5EF] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#24483A]/10 text-[#24483A] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <HeartHandshake className="w-4 h-4 text-[#B86B4B]" />
            KindTable Community Portal
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#202522]">
            Account Login & Registration
          </h1>
          <p className="text-sm text-[#6D716C] leading-relaxed">
            Order authentic home-cooked meals from local neighbors or sign in to manage your registered community kitchen.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 bg-[#EDE5D8]/80 p-1.5 rounded-2xl border border-[#2025221a]">
          <button
            onClick={() => setActiveTab("customer-login")}
            className={`flex items-center justify-center gap-2 py-3 px-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === "customer-login"
                ? "bg-[#24483A] text-white shadow-sm"
                : "text-[#6D716C] hover:text-[#202522]"
            }`}
          >
            <User className="w-4 h-4" />
            <span>Customer Sign In</span>
          </button>

          <button
            onClick={() => setActiveTab("customer-register")}
            className={`flex items-center justify-center gap-2 py-3 px-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === "customer-register"
                ? "bg-[#24483A] text-white shadow-sm"
                : "text-[#6D716C] hover:text-[#202522]"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Customer Sign Up</span>
          </button>

          <button
            onClick={() => setActiveTab("cook-login")}
            className={`flex items-center justify-center gap-2 py-3 px-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === "cook-login"
                ? "bg-[#24483A] text-white shadow-sm"
                : "text-[#6D716C] hover:text-[#202522]"
            }`}
          >
            <ChefHat className="w-4 h-4" />
            <span>Cook Portal Sign In</span>
          </button>

          <a href="https://adetolaadelani22-bot.github.io/Kindtableeats-admin/" className="flex items-center justify-center gap-2 py-3 px-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#193329] text-white hover:bg-[#24483A] transition-all">
            <ShieldCheck className="w-4 h-4" />
            <span>Admin Portal</span>
          </a>

          <button
            onClick={() => setCurrentRoute("become-a-cook")}
            className="flex items-center justify-center gap-2 py-3 px-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#B86B4B] text-white hover:bg-[#9E5638] transition-all shadow-xs"
          >
            <Utensils className="w-4 h-4" />
            <span>Register as Cook</span>
          </button>
        </div>

        {/* Form Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Form Box (7 cols) */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-[#EDE5D8] shadow-sm space-y-6">

            {/* 1. CUSTOMER SIGN IN */}
            {activeTab === "customer-login" && (
              <form onSubmit={handleCustomerLogin} className="space-y-5">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#202522]">
                    Customer Sign In
                  </h3>
                  <p className="text-xs text-[#6D716C] mt-1">
                    Sign in to order home-cooked dishes, track deliveries, and save favorite kitchens.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#202522] mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full text-xs pl-10 pr-3 py-3 bg-[#F8F5EF] border border-[#EDE5D8] rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#24483A]"
                      />
                      <Mail className="w-4 h-4 text-[#6D716C] absolute left-3.5 top-3.5" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#202522] mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        required
                        value={customerPassword}
                        onChange={(e) => setCustomerPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full text-xs pl-10 pr-3 py-3 bg-[#F8F5EF] border border-[#EDE5D8] rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#24483A]"
                      />
                      <Lock className="w-4 h-4 text-[#6D716C] absolute left-3.5 top-3.5" />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#24483A] hover:bg-[#193329] text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-xs flex items-center justify-center gap-2"
                >
                  <span>Sign In & Order Food</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab("customer-register")}
                    className="text-xs text-[#24483A] font-bold hover:underline"
                  >
                    Don't have an account? Sign up in 30 seconds →
                  </button>
                </div>
              </form>
            )}

            {/* 2. CUSTOMER SIGN UP */}
            {activeTab === "customer-register" && (
              <form onSubmit={handleCustomerRegister} className="space-y-5">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#202522]">
                    Create Customer Account
                  </h3>
                  <p className="text-xs text-[#6D716C] mt-1">
                    Join your local neighborhood food community and support verified artisan cooks.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#202522] mb-1">
                        Full Name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          value={regName}
                          onChange={(e) => setRegName(e.target.value)}
                          placeholder="Hannah Wright"
                          className="w-full text-xs pl-10 pr-3 py-3 bg-[#F8F5EF] border border-[#EDE5D8] rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#24483A]"
                        />
                        <User className="w-4 h-4 text-[#6D716C] absolute left-3.5 top-3.5" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#202522] mb-1">
                        Phone Number
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          required
                          value={regPhone}
                          onChange={(e) => setRegPhone(e.target.value)}
                          placeholder="+44 7700 900124"
                          className="w-full text-xs pl-10 pr-3 py-3 bg-[#F8F5EF] border border-[#EDE5D8] rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#24483A]"
                        />
                        <Phone className="w-4 h-4 text-[#6D716C] absolute left-3.5 top-3.5" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#202522] mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        placeholder="hannah@example.com"
                        className="w-full text-xs pl-10 pr-3 py-3 bg-[#F8F5EF] border border-[#EDE5D8] rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#24483A]"
                      />
                      <Mail className="w-4 h-4 text-[#6D716C] absolute left-3.5 top-3.5" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#202522] mb-1">
                      Delivery Address & Postcode
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={regAddress}
                        onChange={(e) => setRegAddress(e.target.value)}
                        placeholder="18 Camberwell Grove, London SE5 8RE"
                        className="w-full text-xs pl-10 pr-3 py-3 bg-[#F8F5EF] border border-[#EDE5D8] rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#24483A]"
                      />
                      <MapPin className="w-4 h-4 text-[#B86B4B] absolute left-3.5 top-3.5" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#202522] mb-1">
                      Create Password
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        required
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        placeholder="At least 6 characters"
                        className="w-full text-xs pl-10 pr-3 py-3 bg-[#F8F5EF] border border-[#EDE5D8] rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#24483A]"
                      />
                      <Lock className="w-4 h-4 text-[#6D716C] absolute left-3.5 top-3.5" />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#24483A] hover:bg-[#193329] text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-xs flex items-center justify-center gap-2"
                >
                  <span>Complete Registration & Browse Menu</span>
                  <CheckCircle2 className="w-4 h-4 text-[#C8A96B]" />
                </button>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab("customer-login")}
                    className="text-xs text-[#24483A] font-bold hover:underline"
                  >
                    Already have an account? Sign in here →
                  </button>
                </div>
              </form>
            )}

            {/* 3. COOK SIGN IN */}
            {activeTab === "cook-login" && (
              <form onSubmit={handleCookLogin} className="space-y-5">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#B86B4B] bg-[#B86B4B]/10 px-2.5 py-1 rounded-md mb-2">
                    <ChefHat className="w-3.5 h-3.5" />
                    Cooks & Kitchens Hub
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#202522]">
                    Cook Sign In
                  </h3>
                  <p className="text-xs text-[#6D716C] mt-1">
                    Manage your daily batch menus, incoming orders, customer messages, and weekly payouts.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#202522] mb-1">
                      Cook Email
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        value={cookEmail}
                        onChange={(e) => setCookEmail(e.target.value)}
                        placeholder="amara.okafor@kindtableeats.org"
                        className="w-full text-xs pl-10 pr-3 py-3 bg-[#F8F5EF] border border-[#EDE5D8] rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#24483A]"
                      />
                      <Mail className="w-4 h-4 text-[#6D716C] absolute left-3.5 top-3.5" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#202522] mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        required
                        value={cookPassword}
                        onChange={(e) => setCookPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full text-xs pl-10 pr-3 py-3 bg-[#F8F5EF] border border-[#EDE5D8] rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#24483A]"
                      />
                      <Lock className="w-4 h-4 text-[#6D716C] absolute left-3.5 top-3.5" />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#B86B4B] hover:bg-[#9E5638] text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-xs flex items-center justify-center gap-2"
                >
                  <span>Open Cook Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="p-4 bg-[#F8F5EF] rounded-xl border border-[#EDE5D8] text-xs text-[#6D716C] space-y-2">
                  <p className="font-semibold text-[#202522]">Are you a new cook wanting to register your home kitchen?</p>
                  <button
                    type="button"
                    onClick={() => setCurrentRoute("become-a-cook")}
                    className="text-[#B86B4B] font-bold hover:underline flex items-center gap-1"
                  >
                    Start Cook Registration & Hygiene Audit Onboarding →
                  </button>
                </div>
              </form>
            )}

          </div>

          {/* Right Info Box & Instant Role Access (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Access Sandbox Card */}
            <div className="bg-[#24483A] text-[#F8F5EF] p-6 rounded-3xl space-y-4 shadow-md">
              <div className="flex items-center gap-2 text-[#C8A96B]">
                <ShieldCheck className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  Instant Account Previews
                </span>
              </div>
              <h4 className="font-serif text-lg font-bold text-white">
                Test Accounts for Fast Preview
              </h4>
              <p className="text-xs text-[#EDE5D8]/80 leading-relaxed">
                Click any profile below to instantly simulate that role across the entire application without typing credentials.
              </p>

              <div className="space-y-2.5 pt-2">
                <button
                  onClick={() => handleQuickRole("customer")}
                  className="w-full bg-white/10 hover:bg-white/20 text-white p-3 rounded-xl text-xs font-medium flex items-center justify-between border border-white/10 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <User className="w-4 h-4 text-[#C8A96B]" />
                    <div className="text-left">
                      <div className="font-bold">Hannah Wright (Customer)</div>
                      <div className="text-[10px] text-[#EDE5D8]/70">Order food, track delivery, leave reviews</div>
                    </div>
                  </div>
                  <span className="text-[10px] bg-[#C8A96B] text-[#24483A] font-bold px-2 py-1 rounded">
                    Launch
                  </span>
                </button>

                <button
                  onClick={() => handleQuickRole("seller")}
                  className="w-full bg-white/10 hover:bg-white/20 text-white p-3 rounded-xl text-xs font-medium flex items-center justify-between border border-white/10 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <ChefHat className="w-4 h-4 text-[#B86B4B]" />
                    <div className="text-left">
                      <div className="font-bold">Mama Amara (Registered Cook)</div>
                      <div className="text-[10px] text-[#EDE5D8]/70">Kitchen dashboard, orders, menu manager</div>
                    </div>
                  </div>
                  <span className="text-[10px] bg-[#B86B4B] text-white font-bold px-2 py-1 rounded">
                    Launch
                  </span>
                </button>

              </div>
            </div>

            {/* Cook Empowerment Highlights */}
            <div className="bg-white p-6 rounded-3xl border border-[#EDE5D8] space-y-4">
              <h4 className="font-serif text-base font-bold text-[#202522]">
                Why Cook with KindTableEats?
              </h4>
              <ul className="space-y-3 text-xs text-[#6D716C]">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#24483A] shrink-0 mt-0.5" />
                  <span><strong>88%+ Payout:</strong> Receive fair earnings with 100% of customer tips sent directly to you.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#24483A] shrink-0 mt-0.5" />
                  <span><strong>Full Hygiene Sponsorship:</strong> Free FSA Level 2 certification & council registration help.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#24483A] shrink-0 mt-0.5" />
                  <span><strong>Eco Packaging Provided:</strong> Biodegradable compostable meal containers sent to your door.</span>
                </li>
              </ul>

              <button
                onClick={() => setCurrentRoute("become-a-cook")}
                className="w-full bg-[#EDE5D8] hover:bg-[#D9D0C1] text-[#24483A] font-bold text-xs py-3 rounded-xl transition-colors"
              >
                Register Your Kitchen Today →
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
