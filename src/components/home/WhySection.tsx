import React from "react";
import { useApp } from "../../context/AppContext";
import { ArrowRight, Sparkles } from "lucide-react";

export const WhySection: React.FC = () => {
  const { setCurrentRoute } = useApp();

  return (
    <section className="py-16 lg:py-20 bg-[#F8F5EF] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Two-Column Bento Header Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-[#2025221a] rounded-[16px] overflow-hidden border border-[#2025221a] shadow-xs">
          
          {/* Left Column */}
          <div className="lg:col-span-6 bg-[#F8F5EF] p-8 sm:p-12 flex flex-col justify-center space-y-4">
            <span className="text-[#B86B4B] text-[12px] font-bold tracking-[0.2em] uppercase">
              The KindTable Difference
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#24483A] leading-[1.15]">
              A meal can do more <br />
              than feed you.
            </h2>
          </div>

          {/* Right Column Narrative */}
          <div className="lg:col-span-6 bg-[#EDE5D8]/40 p-8 sm:p-12 flex flex-col justify-center space-y-4">
            <p className="text-[15px] sm:text-base text-[#202522] leading-relaxed">
              Every order on KindTableEats contributes directly to economic dignity. We provide verified single mothers with a licensed, supportive home-kitchen platform to transform their culinary expertise into predictable family income.
            </p>
            <p className="text-xs sm:text-sm text-[#6D716C] leading-relaxed">
              No gig-economy exploitation. No faceless ghost kitchens. Just authentic recipes simmered with generational patience, served hot to neighbors who value craft and community solidarity.
            </p>
          </div>

        </div>

        {/* 3 Principles Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#2025221a] rounded-[16px] overflow-hidden border border-[#2025221a] shadow-xs">
          
          <div className="bg-[#F8F5EF] p-8 flex flex-col justify-between space-y-6 hover:bg-[#F4EFE6] transition-colors">
            <div className="space-y-3">
              <span className="font-serif text-3xl font-bold text-[#B86B4B]">01</span>
              <h3 className="font-serif text-xl font-bold text-[#202522]">
                Earn with dignity
              </h3>
              <p className="text-xs sm:text-[13px] text-[#6D716C] leading-relaxed">
                Help skilled mothers achieve flexible financial independence without having to leave their children for 14-hour commercial restaurant shifts.
              </p>
            </div>
            <div className="text-[11px] font-bold uppercase tracking-widest text-[#B86B4B]">
              • 88% Direct Payouts
            </div>
          </div>

          <div className="bg-[#F8F5EF] p-8 flex flex-col justify-between space-y-6 hover:bg-[#F4EFE6] transition-colors">
            <div className="space-y-3">
              <span className="font-serif text-3xl font-bold text-[#24483A]">02</span>
              <h3 className="font-serif text-xl font-bold text-[#202522]">
                Eat authentically
              </h3>
              <p className="text-xs sm:text-[13px] text-[#6D716C] leading-relaxed">
                Experience the profound depth of genuine homestyle cooking and family heirloom spices that commercial takeaway kitchens cannot replicate.
              </p>
            </div>
            <div className="text-[11px] font-bold uppercase tracking-widest text-[#24483A]">
              • Small Batch Cooking
            </div>
          </div>

          <div className="bg-[#F8F5EF] p-8 flex flex-col justify-between space-y-6 hover:bg-[#F4EFE6] transition-colors">
            <div className="space-y-3">
              <span className="font-serif text-3xl font-bold text-[#C8A96B]">03</span>
              <h3 className="font-serif text-xl font-bold text-[#202522]">
                Build community
              </h3>
              <p className="text-xs sm:text-[13px] text-[#6D716C] leading-relaxed">
                Break transactional distance. Know the hands that seasoned the broth, kneaded the dough, and sealed your lunch with care.
              </p>
            </div>
            <div className="text-[11px] font-bold uppercase tracking-widest text-[#C8A96B]">
              • Neighborhood Solidarity
            </div>
          </div>

        </div>

        {/* Bento Lifestyle Banner with Frosted Panel */}
        <div className="relative rounded-[16px] overflow-hidden border border-[#2025221a] aspect-21/9 bg-[#EDE5D8] shadow-xs">
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1600"
            alt="Family gathered around home-cooked African dishes and flatbreads"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />
          
          <div className="absolute inset-0 p-8 sm:p-12 lg:p-14 flex flex-col justify-center max-w-xl text-white">
            <span className="text-[#C8A96B] text-[11px] font-bold tracking-[0.2em] uppercase mb-2">
              Community Tables
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight drop-shadow-xs">
              When a mother earns with dignity, an entire household flourishes.
            </h3>
            <div className="pt-6">
              <button
                onClick={() => setCurrentRoute("stories")}
                className="inline-flex items-center gap-2 bg-[#F8F5EF] text-[#24483A] hover:bg-white px-6 py-3 rounded-[8px] font-bold uppercase tracking-wider text-[12px] transition-colors shadow-xs"
              >
                <span>Read Our Cook Biographies</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
