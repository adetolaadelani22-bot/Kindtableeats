import React from "react";
import { useApp } from "../../context/AppContext";
import { ArrowRight, Search, ShoppingBag, HeartHandshake } from "lucide-react";

export const HowItWorksSection: React.FC = () => {
  const { setCurrentRoute } = useApp();

  return (
    <section className="py-20 bg-[#F8F5EF] border-t border-[#2025221a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#B86B4B]">
            How It Works
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#24483A]">
            Simple. Transparent. Human.
          </h2>
          <p className="text-sm text-[#6D716C]">
            Connecting neighborhood home kitchens with conscious diners in three straightforward steps.
          </p>
        </div>

        {/* 3 Step Bento Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#2025221a] rounded-[16px] overflow-hidden border border-[#2025221a] shadow-xs">
          
          {/* Step 1 */}
          <div className="bg-[#F8F5EF] p-8 sm:p-10 flex flex-col justify-between hover:bg-[#F4EFE6] transition-colors">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-serif text-4xl font-bold text-[#24483A]">
                  01
                </span>
                <div className="w-9 h-9 rounded-[8px] bg-[#24483A]/10 flex items-center justify-center text-[#24483A]">
                  <Search className="w-4 h-4" />
                </div>
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#202522]">
                Discover
              </h3>
              <p className="text-xs sm:text-[13px] text-[#6D716C] leading-relaxed">
                Find home kitchens in your neighborhood. Browse today’s slow-simmered dishes, view cook biographies, check FSA hygiene ratings, and read ingredient lists.
              </p>
            </div>
            
            <div className="mt-8 pt-6 border-t border-[#2025221a]/50 text-[11px] font-bold uppercase tracking-wider text-[#24483A]">
              • Authenticated local kitchens
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-[#F8F5EF] p-8 sm:p-10 flex flex-col justify-between hover:bg-[#F4EFE6] transition-colors">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-serif text-4xl font-bold text-[#B86B4B]">
                  02
                </span>
                <div className="w-9 h-9 rounded-[8px] bg-[#B86B4B]/10 flex items-center justify-center text-[#B86B4B]">
                  <ShoppingBag className="w-4 h-4" />
                </div>
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#202522]">
                Order
              </h3>
              <p className="text-xs sm:text-[13px] text-[#6D716C] leading-relaxed">
                Select your portions, choose warm kitchen-door pickup or local doorstep delivery, and complete checkout. Add an optional direct tip to the cook.
              </p>
            </div>
            
            <div className="mt-8 pt-6 border-t border-[#2025221a]/50 text-[11px] font-bold uppercase tracking-wider text-[#B86B4B]">
              • Transparent pricing & fair payout
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-[#F8F5EF] p-8 sm:p-10 flex flex-col justify-between hover:bg-[#F4EFE6] transition-colors">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-serif text-4xl font-bold text-[#C8A96B]">
                  03
                </span>
                <div className="w-9 h-9 rounded-[8px] bg-[#C8A96B]/20 flex items-center justify-center text-[#24483A]">
                  <HeartHandshake className="w-4 h-4" />
                </div>
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#202522]">
                Enjoy & Support
              </h3>
              <p className="text-xs sm:text-[13px] text-[#6D716C] leading-relaxed">
                Savor wholesome food cooked with pride. Every meal fuels a single mother's economic independence and strengthens your neighborhood food culture.
              </p>
            </div>
            
            <div className="mt-8 pt-6 border-t border-[#2025221a]/50 text-[11px] font-bold uppercase tracking-wider text-[#24483A]">
              • Food that does good
            </div>
          </div>

        </div>

        {/* Action button */}
        <div className="mt-12 text-center">
          <button
            onClick={() => setCurrentRoute("discover")}
            className="inline-flex items-center gap-2 bg-[#24483A] hover:bg-[#193329] text-white px-8 py-3.5 rounded-[8px] font-bold uppercase tracking-widest text-[12px] transition-all shadow-xs"
          >
            <span>Explore Today’s Menus</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
