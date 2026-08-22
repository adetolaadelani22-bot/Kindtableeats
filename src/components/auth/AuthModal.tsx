import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { X, ChefHat, User, Check, ArrowRight } from "lucide-react";
import { UserRole } from "../../types";

export const AuthModal: React.FC = () => {
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    authMode, 
    setAuthMode, 
    setUserRole, 
    setIsAuthenticated,
    setCustomerIdentity,
    setCurrentRoute,
    addToast 
  } = useApp();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!isAuthModalOpen) return null;

  const handleDemoLogin = (role: UserRole) => {
    setUserRole(role);
    setIsAuthenticated(true);
    setIsAuthModalOpen(false);
    if (role === "seller") {
      setCurrentRoute("seller-dashboard");
      addToast({
        title: "Welcome back, Amara!",
        message: "Logged into Mama Amara's Kitchen Hub",
        type: "success"
      });
    } else {
      setCurrentRoute("customer-dashboard");
      addToast({
        title: "Welcome back, Hannah!",
        message: "Signed in as Customer",
        type: "success"
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUserRole("customer");
    setIsAuthenticated(true);
    setCustomerIdentity(email.split("@")[0].replace(/[._-]+/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase()), email);
    setIsAuthModalOpen(false);
    addToast({
      title: "Signed In Successfully",
      message: "Welcome to KindTableEats",
      type: "success"
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsAuthModalOpen(false)}
      />

      <div className="min-h-full flex items-center justify-center p-4 text-center">
        <div className="w-full max-w-md bg-[#F8F5EF] rounded-2xl overflow-hidden shadow-2xl border border-[#EDE5D8] text-left transform transition-all animate-in zoom-in-95 my-8">
          
          {/* Header */}
          <div className="p-6 bg-white border-b border-[#EDE5D8] flex items-center justify-between">
            <div>
              <h3 className="font-serif text-xl font-bold text-[#202522]">
                {authMode === "login" ? "Welcome Back to KindTable" : "Join the Community"}
              </h3>
              <p className="text-xs text-[#6D716C] mt-0.5">
                Food. Dignity. Community. Opportunity.
              </p>
            </div>
            <button
              onClick={() => setIsAuthModalOpen(false)}
              className="p-1.5 text-[#6D716C] hover:text-[#202522] hover:bg-[#EDE5D8] rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            
            {/* Quick Demo Login Option */}
            <div className="bg-[#EDE5D8]/50 p-4 rounded-xl border border-[#D9D0C1]">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#6D716C] mb-2.5">
                Instant Demo Access (Single Click)
              </p>
              <div className="space-y-2">
                <button
                  onClick={() => handleDemoLogin("customer")}
                  className="w-full bg-white hover:bg-[#F8F5EF] text-[#202522] border border-[#EDE5D8] p-2.5 rounded-lg text-xs font-medium flex items-center justify-between transition-colors shadow-2xs"
                >
                  <span className="flex items-center gap-2">
                    <User className="w-4 h-4 text-[#24483A]" />
                    <span>Customer Account (Hannah Wright)</span>
                  </span>
                  <span className="text-[10px] text-[#24483A] font-bold bg-[#24483A]/10 px-2 py-0.5 rounded">
                    Log In
                  </span>
                </button>

                <button
                  onClick={() => handleDemoLogin("seller")}
                  className="w-full bg-white hover:bg-[#F8F5EF] text-[#202522] border border-[#EDE5D8] p-2.5 rounded-lg text-xs font-medium flex items-center justify-between transition-colors shadow-2xs"
                >
                  <span className="flex items-center gap-2">
                    <ChefHat className="w-4 h-4 text-[#B86B4B]" />
                    <span>Cook Hub (Amara Okafor)</span>
                  </span>
                  <span className="text-[10px] text-[#B86B4B] font-bold bg-[#B86B4B]/10 px-2 py-0.5 rounded">
                    Log In
                  </span>
                </button>

              </div>
            </div>

            <div className="relative flex py-1 items-center">
              <div className="grow border-t border-[#EDE5D8]" />
              <span className="shrink mx-4 text-[11px] text-[#6D716C] uppercase font-semibold">
                Or standard credentials
              </span>
              <div className="grow border-t border-[#EDE5D8]" />
            </div>

            {/* Standard Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#202522] mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="your.name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 bg-white border border-[#EDE5D8] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#24483A]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#202522] mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 bg-white border border-[#EDE5D8] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#24483A]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#24483A] hover:bg-[#193329] text-white py-3 rounded-xl font-semibold text-xs transition-all shadow-xs"
              >
                {authMode === "login" ? "Sign In" : "Create Account"}
              </button>
            </form>

            <div className="text-center text-xs text-[#6D716C]">
              {authMode === "login" ? (
                <>
                  Don't have an account?{" "}
                  <button
                    onClick={() => setAuthMode("register")}
                    className="text-[#24483A] font-bold hover:underline"
                  >
                    Join KindTableEats
                  </button>
                </>
              ) : (
                <>
                  Already registered?{" "}
                  <button
                    onClick={() => setAuthMode("login")}
                    className="text-[#24483A] font-bold hover:underline"
                  >
                    Sign In
                  </button>
                </>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
