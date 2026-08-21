import React from "react";
import { Cook } from "../../types";
import { useApp } from "../../context/AppContext";
import { Star, ShieldCheck, MapPin, ArrowRight } from "lucide-react";

interface KitchenCardProps {
  cook: Cook;
}

export const KitchenCard: React.FC<KitchenCardProps> = ({ cook }) => {
  const { navigateToKitchen, meals } = useApp();

  const cookMeals = meals.filter((m) => m.cookId === cook.id);

  return (
    <div 
      className="group card-hover-parent bg-[#F8F5EF] rounded-[12px] border border-[#2025221a] overflow-hidden flex flex-col justify-between transition-all duration-200 hover:border-[#24483A]/40 hover:shadow-sm"
    >
      <div>
        {/* Cover Photo */}
        <div 
          className="relative h-48 w-full overflow-hidden bg-[#EDE5D8] cursor-pointer"
          onClick={() => navigateToKitchen(cook.id)}
        >
          <img
            src={cook.heroImage}
            alt={cook.kitchenName}
            loading="lazy"
            className="card-img-zoom w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          
          {/* Hygiene certification badge */}
          <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs text-[#24483A] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-[6px] shadow-2xs flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#24483A]" />
            {cook.hygieneRating}
          </div>

          {/* Cook Portrait Overlap */}
          <div className="absolute bottom-3 left-4 flex items-end gap-3">
            <img
              src={cook.avatar}
              alt={cook.name}
              className="w-12 h-12 rounded-[10px] object-cover border-2 border-white shadow-xs bg-white"
            />
            <div className="text-white pb-0.5">
              <h4 className="font-serif text-lg font-bold leading-tight drop-shadow-xs">
                {cook.name}
              </h4>
              <p className="text-[11px] text-[#EDE5D8] drop-shadow-xs">
                {cook.familyNote}
              </p>
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5">
          <div className="flex items-center justify-between text-xs text-[#6D716C] mb-2">
            <span className="flex items-center gap-1 font-bold text-[11px] uppercase tracking-wider text-[#24483A]">
              <MapPin className="w-3.5 h-3.5 text-[#B86B4B]" />
              {cook.location}
            </span>
            <div className="flex items-center gap-1 font-semibold text-[#202522]">
              <Star className="w-3.5 h-3.5 fill-[#C8A96B] text-[#C8A96B]" />
              <span>{cook.rating.toFixed(2)}</span>
            </div>
          </div>

          <h3 
            onClick={() => navigateToKitchen(cook.id)}
            className="font-serif text-[19px] font-bold text-[#202522] group-hover:text-[#24483A] transition-colors cursor-pointer"
          >
            {cook.kitchenName}
          </h3>

          <p className="text-xs text-[#6D716C] mt-2 line-clamp-2 leading-relaxed italic">
            "{cook.quote}"
          </p>

          {/* Specialty tag */}
          <div className="mt-3 bg-white p-3 rounded-[8px] border border-[#2025221a]/50">
            <span className="text-[9px] uppercase font-bold tracking-[0.2em] text-[#6D716C] block">
              Kitchen Specialties
            </span>
            <span className="text-xs font-semibold text-[#24483A] block mt-0.5">
              {cook.specialty}
            </span>
          </div>

          {/* Active dishes count */}
          <div className="mt-3 flex items-center justify-between text-[11px] text-[#6D716C]">
            <span>{cookMeals.length} dishes simmering</span>
            <span>{cook.mealsServed}+ meals served</span>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="px-5 pb-5 pt-2">
        <button
          onClick={() => navigateToKitchen(cook.id)}
          className="w-full flex items-center justify-center gap-2 bg-white hover:bg-[#24483A] text-[#24483A] hover:text-white border border-[#2025221a] hover:border-[#24483A] py-2.5 rounded-[8px] text-[11px] font-bold uppercase tracking-wider transition-all"
        >
          <span>View Kitchen & Menu</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
