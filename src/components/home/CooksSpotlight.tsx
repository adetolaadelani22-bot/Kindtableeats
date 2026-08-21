import React from "react";
import { useApp } from "../../context/AppContext";
import { KitchenCard } from "../cards/KitchenCard";
import { ArrowRight } from "lucide-react";

export const CooksSpotlight: React.FC = () => {
  const { cooks, setCurrentRoute } = useApp();

  return (
    <section className="py-16 bg-[#F8F5EF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-[#B86B4B] text-[11px] font-bold uppercase tracking-[0.2em]">
              Community Kitchens
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#24483A] mt-1">
              Meet the Mothers Behind the Pots
            </h2>
            <p className="text-sm text-[#6D716C] mt-1 max-w-lg">
              Certified neighborhood kitchens run by passionate culinary mothers.
            </p>
          </div>

          <button
            onClick={() => setCurrentRoute("kitchens")}
            className="text-[12px] font-bold uppercase tracking-wider text-[#24483A] hover:text-[#193329] flex items-center gap-1.5 self-start sm:self-auto"
          >
            <span>View all kitchens</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Kitchen Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cooks.slice(0, 3).map((cook) => (
            <KitchenCard key={cook.id} cook={cook} />
          ))}
        </div>

      </div>
    </section>
  );
};
