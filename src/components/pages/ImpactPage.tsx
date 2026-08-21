import React from "react";
import { useApp } from "../../context/AppContext";
import { 
  Heart, 
  ShieldCheck, 
  Leaf, 
  DollarSign, 
  Users, 
  ArrowRight,
  Sparkles
} from "lucide-react";

export const ImpactPage: React.FC = () => {
  const { setCurrentRoute } = useApp();

  return (
    <div className="py-12 bg-[#F8F5EF] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#B86B4B]">
            Our Social Charter
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#202522]">
            Dignity, Transparency & Community Solidarity
          </h1>
          <p className="text-base text-[#6D716C] leading-relaxed">
            KindTableEats was founded to dismantle the extractive nature of gig-economy food apps. We build economic scaffolding for single mothers by treating home cooking as an honorable culinary enterprise.
          </p>
        </div>

        {/* 4 Impact Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="bg-white p-8 rounded-3xl border border-[#EDE5D8] shadow-xs space-y-4">
            <div className="w-10 h-10 rounded-xl bg-[#24483A]/10 text-[#24483A] flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#202522]">
              The 88/12 Dignity Revenue Model
            </h3>
            <p className="text-xs sm:text-sm text-[#6D716C] leading-relaxed">
              Standard food apps extract up to 35% commission plus customer markups. KindTableEats returns 88% of meal price directly to the cook and 100% of tips. The remaining 12% funds FSA hygiene coaching, compostable packaging subsidies, and platform security.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-[#EDE5D8] shadow-xs space-y-4">
            <div className="w-10 h-10 rounded-xl bg-[#B86B4B]/10 text-[#B86B4B] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#202522]">
              Uncompromising Food Safety Standards
            </h3>
            <p className="text-xs sm:text-sm text-[#6D716C] leading-relaxed">
              Every home cook is registered with their local authority Environmental Health department and holds an audited Level 2 Food Hygiene Certificate. We carry out regular kitchen reviews and require clear disclosures for all 14 statutory UK food allergens.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-[#EDE5D8] shadow-xs space-y-4">
            <div className="w-10 h-10 rounded-xl bg-[#C8A96B]/20 text-[#24483A] flex items-center justify-center">
              <Leaf className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#202522]">
              100% Compostable Packaging
            </h3>
            <p className="text-xs sm:text-sm text-[#6D716C] leading-relaxed">
              We supply all verified kitchens with unbleached sugarcane bagasse meal containers and plant-based leakproof lids. Meals are packaged without single-use petroleum plastics.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-[#EDE5D8] shadow-xs space-y-4">
            <div className="w-10 h-10 rounded-xl bg-[#24483A]/10 text-[#24483A] flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#202522]">
              Preserving Neighborhood Food Culture
            </h3>
            <p className="text-xs sm:text-sm text-[#6D716C] leading-relaxed">
              From slow-simmered Nigerian egusi soup and slow-cooked Mexican birria to restorative Middle Eastern lentil stews, we protect culinary recipes passed down through generations that commercial restaurants omit.
            </p>
          </div>

        </div>

        {/* Call to action */}
        <div className="bg-[#24483A] text-white p-8 sm:p-12 rounded-3xl text-center space-y-6">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold max-w-xl mx-auto leading-tight">
            Support a mother's kitchen in your neighborhood today.
          </h2>
          <p className="text-xs sm:text-sm text-[#EDE5D8] max-w-md mx-auto">
            Order fresh, nourishing food cooked with pride, patience, and love.
          </p>
          <button
            onClick={() => setCurrentRoute("discover")}
            className="inline-flex items-center gap-2 bg-[#F8F5EF] text-[#24483A] hover:bg-white px-8 py-3.5 rounded-xl font-bold text-xs transition-colors shadow-md"
          >
            <span>Browse Local Meals</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
