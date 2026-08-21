import React from "react";
import { useApp } from "../../context/AppContext";
import { KitchenCard } from "../cards/KitchenCard";
import { ShieldCheck, MapPin } from "lucide-react";

export const KitchensDirectoryPage: React.FC = () => {
  const { cooks } = useApp();

  return (
    <div className="py-12 bg-[#F8F5EF] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="border-b border-[#EDE5D8] pb-6 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#B86B4B]">
            Neighborhood Directory
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#202522]">
            Verified Community Home Kitchens
          </h1>
          <p className="text-sm text-[#6D716C] max-w-2xl">
            All cooks on KindTableEats are registered with their local UK borough council and hold Level 2 Food Hygiene certification.
          </p>
        </div>

        {/* Kitchens Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cooks.map((cook) => (
            <KitchenCard key={cook.id} cook={cook} />
          ))}
        </div>

      </div>
    </div>
  );
};
