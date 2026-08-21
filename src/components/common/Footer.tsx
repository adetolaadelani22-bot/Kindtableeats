import React from "react";
import { useApp } from "../../context/AppContext";
import { ViewRoute } from "../../types";
import { Shield, Heart, ArrowUpRight } from "lucide-react";

export const Footer: React.FC = () => {
  const { setCurrentRoute } = useApp();

  const handleNav = (route: ViewRoute) => {
    setCurrentRoute(route);
  };

  return (
    <footer className="bg-[#1F3E32] text-[#EDE5D8] border-t border-[#2025221a] pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-14 border-b border-[#2E5D4B]/80">
          
          {/* Brand & Manifesto */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-[8px] bg-[#F8F5EF] text-[#24483A] flex items-center justify-center font-serif text-xl font-bold">
                K
              </div>
              <span className="text-[18px] font-bold tracking-[0.15em] text-[#F8F5EF]">
                KINDTABLE<span className="text-[#C8A96B]">EATS</span>
              </span>
            </div>
            
            <p className="text-sm text-[#D9D0C1] max-w-sm leading-relaxed">
              A humanitarian food marketplace connecting single mothers with home-cooking talents directly to local neighbors. Food. Dignity. Community. Opportunity.
            </p>

            <div className="pt-2 flex items-center gap-4 text-xs text-[#C8A96B]">
              <span className="flex items-center gap-1.5 font-semibold">
                <Shield className="w-3.5 h-3.5" /> 100% Hygiene Audited
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 font-semibold">
                <Heart className="w-3.5 h-3.5" /> Direct Fair Income
              </span>
            </div>
          </div>

          {/* Column 1: Discover */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#F8F5EF]">
              Discover
            </h4>
            <ul className="space-y-2.5 text-xs text-[#D9D0C1]">
              <li>
                <button onClick={() => handleNav("discover")} className="hover:text-white transition-colors">
                  Explore All Meals
                </button>
              </li>
              <li>
                <button onClick={() => handleNav("kitchens")} className="hover:text-white transition-colors">
                  Featured Cooks
                </button>
              </li>
              <li>
                <button onClick={() => handleNav("discover")} className="hover:text-white transition-colors">
                  West African & Nigerian
                </button>
              </li>
              <li>
                <button onClick={() => handleNav("discover")} className="hover:text-white transition-colors">
                  Nourishing Soups & Broths
                </button>
              </li>
              <li>
                <button onClick={() => handleNav("discover")} className="hover:text-white transition-colors">
                  Weekend Family Feasts
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: For Cooks */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#F8F5EF]">
              For Cooks
            </h4>
            <ul className="space-y-2.5 text-xs text-[#D9D0C1]">
              <li>
                <button onClick={() => handleNav("become-a-cook")} className="text-[#C8A96B] font-bold hover:underline flex items-center gap-1">
                  Become a Home Cook <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </li>
              <li>
                <button onClick={() => handleNav("how-it-works")} className="hover:text-white transition-colors">
                  Food Safety Standards
                </button>
              </li>
              <li>
                <button onClick={() => handleNav("how-it-works")} className="hover:text-white transition-colors">
                  Hygiene Certification
                </button>
              </li>
              <li>
                <button onClick={() => handleNav("seller-dashboard")} className="hover:text-white transition-colors">
                  Cook Portal Demo
                </button>
              </li>
              <li>
                <button onClick={() => handleNav("stories")} className="hover:text-white transition-colors">
                  Success Stories
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Platform & Community */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#F8F5EF]">
              Community
            </h4>
            <ul className="space-y-2.5 text-xs text-[#D9D0C1]">
              <li>
                <button onClick={() => handleNav("about")} className="hover:text-white transition-colors">
                  Our Mission & Model
                </button>
              </li>
              <li>
                <button onClick={() => handleNav("stories")} className="hover:text-white transition-colors">
                  Kitchen Biographies
                </button>
              </li>
              <li>
                <button onClick={() => handleNav("how-it-works")} className="hover:text-white transition-colors">
                  How Orders Support Families
                </button>
              </li>
              <li>
                <button onClick={() => handleNav("contact")} className="hover:text-white transition-colors">
                  Support & Contact
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Banner */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#D9D0C1]">
          <div className="text-xs uppercase tracking-widest text-[#F8F5EF] font-bold text-center md:text-left">
            Good food. Greater opportunity. Stronger communities.
          </div>
          
          <div className="flex items-center gap-6 text-[11px]">
            <span>© {new Date().getFullYear()} KindTableEats CIC. All rights reserved.</span>
            <button onClick={() => handleNav("about")} className="hover:underline">Privacy Policy</button>
            <button onClick={() => handleNav("about")} className="hover:underline">Food Safety Notice</button>
          </div>
        </div>

      </div>
    </footer>
  );
};
