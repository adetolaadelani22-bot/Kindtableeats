import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { ShoppingBag, Search, Menu, X, ShieldCheck, ChevronDown, User, Heart, Bell, Globe2 } from "lucide-react";
import { ViewRoute, UserRole, Currency } from "../../types";
import { GLOBAL_CURRENCIES } from "../../data/mockData";

export const Navbar: React.FC = () => {
  const { 
    currentRoute, 
    setCurrentRoute, 
    cartCount, 
    setIsCartOpen, 
    userRole, 
    setUserRole, 
    currentUser,
    setIsAuthModalOpen,
    setAuthMode,
    searchQuery,
    setSearchQuery,
    currency,
    setCurrency
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleNav = (route: ViewRoute) => {
    setCurrentRoute(route);
    setIsMobileMenuOpen(false);
    setIsProfileDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F8F5EF]/95 backdrop-blur-md border-b border-[#2025221a] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[80px]">
          
          {/* Brand Logo */}
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => handleNav("home")}
              className="text-left group flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#24483A]"
              aria-label="KindTableEats Homepage"
            >
              <div className="w-9 h-9 rounded-[8px] bg-[#24483A] text-[#F8F5EF] flex items-center justify-center font-serif text-xl font-bold tracking-tight shadow-xs group-hover:bg-[#193329] transition-colors">
                K
              </div>
              <div>
                <span className="text-[18px] font-bold tracking-[0.15em] text-[#24483A] block leading-none">
                  KINDTABLE<span className="text-[#B86B4B]">EATS</span>
                </span>
                <span className="text-[10px] tracking-[0.18em] uppercase text-[#6D716C] font-semibold block mt-1">
                  Community Kitchens
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Center Navigation */}
          <nav className="hidden lg:flex items-center gap-7 text-[13px] uppercase tracking-wider font-semibold text-[#6D716C]" aria-label="Main Navigation">
            <button
              onClick={() => handleNav("home")}
              className={`transition-colors py-1 relative ${currentRoute === "home" ? "text-[#24483A]" : "hover:text-[#24483A]"}`}
            >
              Home
              {currentRoute === "home" && <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#24483A]" />}
            </button>
            <button 
              onClick={() => handleNav("discover")} 
              className={`transition-colors py-1 relative ${
                currentRoute === "discover" ? "text-[#24483A]" : "hover:text-[#24483A]"
              }`}
            >
              Order Food
              {currentRoute === "discover" && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#24483A]" />
              )}
            </button>

            <button 
              onClick={() => handleNav("kitchens")} 
              className={`transition-colors py-1 relative ${
                currentRoute === "kitchens" || currentRoute === "kitchen-detail" ? "text-[#24483A]" : "hover:text-[#24483A]"
              }`}
            >
              Our Cooks
              {(currentRoute === "kitchens" || currentRoute === "kitchen-detail") && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#24483A]" />
              )}
            </button>

            <button 
              onClick={() => handleNav("how-it-works")} 
              className={`transition-colors py-1 relative ${
                currentRoute === "how-it-works" ? "text-[#24483A]" : "hover:text-[#24483A]"
              }`}
            >
              How It Works
              {currentRoute === "how-it-works" && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#24483A]" />
              )}
            </button>

            <button 
              onClick={() => handleNav("stories")} 
              className={`transition-colors py-1 relative ${
                currentRoute === "stories" ? "text-[#24483A]" : "hover:text-[#24483A]"
              }`}
            >
              Stories
              {currentRoute === "stories" && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#24483A]" />
              )}
            </button>

            <button
              onClick={() => handleNav("about")}
              className={`transition-colors py-1 relative ${currentRoute === "about" ? "text-[#24483A]" : "hover:text-[#24483A]"}`}
            >
              About
              {currentRoute === "about" && <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#24483A]" />}
            </button>
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Quick Search */}
            {isSearchOpen ? (
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Search dishes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleNav("discover");
                      setIsSearchOpen(false);
                    }
                  }}
                  autoFocus
                  className="w-48 text-xs px-3 py-2 bg-white border border-[#2025221a] rounded-[8px] focus:outline-none focus:ring-1 focus:ring-[#24483A]"
                />
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="ml-2 text-[#6D716C] hover:text-[#202522]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setIsSearchOpen(true);
                }}
                className="p-2 text-[#6D716C] hover:text-[#24483A] hover:bg-[#EDE5D8]/50 rounded-[8px] transition-colors"
                title="Search meals"
                aria-label="Search meals"
              >
                <Search className="w-4 h-4" />
              </button>
            )}

            {/* Global Currency Picker */}
            <div className="flex items-center gap-1 bg-[#EDE5D8]/70 hover:bg-[#EDE5D8] px-2.5 py-1.5 rounded-lg border border-[#2025221a] transition-all">
              <Globe2 className="w-3.5 h-3.5 text-[#B86B4B]" />
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as Currency)}
                className="text-[11px] font-bold text-[#24483A] bg-transparent focus:outline-none cursor-pointer"
                title="Select Currency"
              >
                {GLOBAL_CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.code} ({c.symbol})
                  </option>
                ))}
              </select>
            </div>

            {/* Sign In button */}
            <button
              onClick={() => handleNav("login")}
              className="text-[12px] font-bold uppercase tracking-wider text-[#24483A] hover:text-[#193329] px-2 py-2 transition-all"
            >
              Sign In
            </button>

            {/* Role & Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center gap-2 pl-2 pr-3 py-1.5 bg-[#EDE5D8]/70 hover:bg-[#EDE5D8] rounded-[8px] text-xs font-semibold uppercase tracking-wider text-[#202522] transition-colors border border-[#2025221a]"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-5 h-5 rounded-full object-cover border border-white"
                />
                <span className="max-w-[80px] truncate">{currentUser.name.split(" ")[0]}</span>
                <span className="text-[9px] px-1.5 py-0.5 bg-[#24483A] text-white rounded font-bold">
                  {userRole}
                </span>
                <ChevronDown className="w-3 h-3 text-[#6D716C]" />
              </button>

              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-[#EDE5D8] rounded-xl shadow-lg py-2 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-4 py-2 border-b border-[#EDE5D8]">
                    <p className="text-xs font-semibold text-[#202522]">{currentUser.name}</p>
                    <p className="text-[11px] text-[#6D716C] truncate">{currentUser.email}</p>
                    <div className="mt-2 flex items-center justify-between text-[11px] bg-[#F8F5EF] p-1.5 rounded">
                      <span className="text-[#6D716C]">Role View:</span>
                      <span className="font-semibold text-[#24483A] uppercase">{userRole}</span>
                    </div>
                  </div>

                  {/* Switch Portal Views */}
                  <div className="px-3 py-1 text-[10px] font-semibold text-[#6D716C] uppercase tracking-wider">
                    Switch Workspace Role
                  </div>
                  <button
                    onClick={() => {
                      setUserRole("customer");
                      setIsProfileDropdownOpen(false);
                      setCurrentRoute("customer-dashboard");
                    }}
                    className={`w-full text-left px-4 py-1.5 text-xs flex items-center justify-between hover:bg-[#F8F5EF] ${
                      userRole === "customer" ? "text-[#24483A] font-semibold" : "text-[#202522]"
                    }`}
                  >
                    <span>👤 Customer View</span>
                    {userRole === "customer" && <span className="text-[10px] text-[#B86B4B]">Active</span>}
                  </button>
                  <button
                    onClick={() => {
                      setUserRole("seller");
                      setIsProfileDropdownOpen(false);
                      setCurrentRoute("seller-dashboard");
                    }}
                    className={`w-full text-left px-4 py-1.5 text-xs flex items-center justify-between hover:bg-[#F8F5EF] ${
                      userRole === "seller" ? "text-[#24483A] font-semibold" : "text-[#202522]"
                    }`}
                  >
                    <span>🍳 Cook Hub (Mama Amara)</span>
                    {userRole === "seller" && <span className="text-[10px] text-[#B86B4B]">Active</span>}
                  </button>
                  <div className="border-t border-[#EDE5D8] my-1" />

                  {/* Contextual links */}
                  {userRole === "customer" && (
                    <>
                      <button
                        onClick={() => handleNav("customer-orders")}
                        className="w-full text-left px-4 py-2 text-xs text-[#202522] hover:bg-[#F8F5EF]"
                      >
                        My Past Orders
                      </button>
                      <button
                        onClick={() => handleNav("customer-dashboard")}
                        className="w-full text-left px-4 py-2 text-xs text-[#202522] hover:bg-[#F8F5EF]"
                      >
                        Account & Favorites
                      </button>
                    </>
                  )}

                  {userRole === "seller" && (
                    <>
                      <button
                        onClick={() => handleNav("seller-dashboard")}
                        className="w-full text-left px-4 py-2 text-xs text-[#202522] hover:bg-[#F8F5EF]"
                      >
                        Cook Dashboard
                      </button>
                      <button
                        onClick={() => handleNav("seller-orders")}
                        className="w-full text-left px-4 py-2 text-xs text-[#202522] hover:bg-[#F8F5EF]"
                      >
                        Kitchen Orders & Prep
                      </button>
                      <button
                        onClick={() => handleNav("seller-menu")}
                        className="w-full text-left px-4 py-2 text-xs text-[#202522] hover:bg-[#F8F5EF]"
                      >
                        Manage Dishes
                      </button>
                      <button
                        onClick={() => handleNav("seller-earnings")}
                        className="w-full text-left px-4 py-2 text-xs text-[#202522] hover:bg-[#F8F5EF]"
                      >
                        Earnings & Fair Payouts
                      </button>
                    </>
                  )}

                  <div className="border-t border-[#EDE5D8] my-1" />
                  <button
                    onClick={() => {
                      handleNav("login");
                    }}
                    className="w-full text-left px-4 py-2 text-xs font-semibold text-[#24483A] hover:text-[#B86B4B] hover:bg-[#F8F5EF] flex items-center justify-between"
                  >
                    <span>Full Sign In / Register Portal</span>
                    <span>→</span>
                  </button>
                </div>
              )}
            </div>

            {/* Shopping Basket Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex h-10 w-10 items-center justify-center rounded-[8px] bg-[#24483A] text-white shadow-xs transition-all hover:bg-[#193329] active:scale-98"
              aria-label="Open Basket"
              title="Open basket"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#B86B4B] text-white text-[10px] font-bold flex items-center justify-center -ml-0.5">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-[#24483A] hover:bg-[#EDE5D8] rounded-lg transition-colors"
              aria-label="Open Cart"
            >
              <ShoppingBag className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#B86B4B] text-white text-[10px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-[#202522] hover:bg-[#EDE5D8] rounded-lg transition-colors focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-[#EDE5D8] bg-[#F8F5EF] px-4 pt-3 pb-6 space-y-4 animate-in slide-in-from-top-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search dishes or home cooks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleNav("discover");
                }
              }}
              className="w-full text-sm px-4 py-2.5 bg-white border border-[#EDE5D8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#24483A]"
            />
            <Search className="w-4 h-4 text-[#6D716C] absolute right-3 top-3.5" />
          </div>

          <div className="space-y-1">
            <button
              onClick={() => handleNav("home")}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-base font-medium ${currentRoute === "home" ? "bg-[#24483A] text-white font-semibold" : "text-[#202522] hover:bg-[#EDE5D8]"}`}
            >
              Home
            </button>
            <button
              onClick={() => handleNav("discover")}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-base font-medium ${
                currentRoute === "discover" ? "bg-[#24483A] text-white font-semibold" : "text-[#202522] hover:bg-[#EDE5D8]"
              }`}
            >
              Discover Meals
            </button>
            <button
              onClick={() => handleNav("kitchens")}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-base font-medium ${
                currentRoute === "kitchens" ? "bg-[#24483A] text-white font-semibold" : "text-[#202522] hover:bg-[#EDE5D8]"
              }`}
            >
              Our Cooks & Kitchens
            </button>
            <button
              onClick={() => handleNav("how-it-works")}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-base font-medium ${
                currentRoute === "how-it-works" ? "bg-[#24483A] text-white font-semibold" : "text-[#202522] hover:bg-[#EDE5D8]"
              }`}
            >
              How It Works
            </button>
            <button
              onClick={() => handleNav("stories")}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-base font-medium ${
                currentRoute === "stories" ? "bg-[#24483A] text-white font-semibold" : "text-[#202522] hover:bg-[#EDE5D8]"
              }`}
            >
              Behind Every Kitchen (Stories)
            </button>
            <button
              onClick={() => handleNav("about")}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-base font-medium ${
                currentRoute === "about" ? "bg-[#24483A] text-white font-semibold" : "text-[#202522] hover:bg-[#EDE5D8]"
              }`}
            >
              About KindTableEats
            </button>
            <button
              onClick={() => handleNav("contact")}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-base font-medium ${currentRoute === "contact" ? "bg-[#24483A] text-white font-semibold" : "text-[#202522] hover:bg-[#EDE5D8]"}`}
            >
              Contact & Support
            </button>
            <button
              onClick={() => handleNav("become-a-cook")}
              className="w-full text-left px-3 py-2.5 rounded-lg text-base font-medium text-[#B86B4B] hover:bg-[#B86B4B]/10 font-semibold"
            >
              Become a Cook
            </button>
          </div>

          {/* Quick role switcher inside mobile */}
          <div className="pt-3 border-t border-[#EDE5D8]">
            <p className="text-xs font-semibold text-[#6D716C] uppercase tracking-wider mb-2">
              Workspace Role Mode
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setUserRole("customer");
                  handleNav("customer-dashboard");
                }}
                className={`py-2 px-1 text-xs text-center rounded-lg border font-medium ${
                  userRole === "customer"
                    ? "bg-[#24483A] text-white border-[#24483A]"
                    : "bg-white text-[#202522] border-[#EDE5D8]"
                }`}
              >
                Customer
              </button>
              <button
                onClick={() => {
                  setUserRole("seller");
                  handleNav("seller-dashboard");
                }}
                className={`py-2 px-1 text-xs text-center rounded-lg border font-medium ${
                  userRole === "seller"
                    ? "bg-[#24483A] text-white border-[#24483A]"
                    : "bg-white text-[#202522] border-[#EDE5D8]"
                }`}
              >
                Cook Hub
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
