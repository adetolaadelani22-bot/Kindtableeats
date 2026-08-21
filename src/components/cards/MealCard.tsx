import React from "react";
import { Meal } from "../../types";
import { useApp } from "../../context/AppContext";
import { Plus, Star, Clock, Sparkles } from "lucide-react";

interface MealCardProps {
  meal: Meal;
  compact?: boolean;
}

export const MealCard: React.FC<MealCardProps> = ({ meal, compact = false }) => {
  const { navigateToMeal, navigateToKitchen, addToCart, formatPrice } = useApp();
  const hasCustomizationData = Boolean(meal.customizationGroups && meal.customizationGroups.length > 0);
  const isCustomizable = Boolean(meal.isCustomizable && hasCustomizationData);

  const handleAction = () => {
    if (isCustomizable) {
      navigateToMeal(meal.id);
    } else {
      addToCart(meal, 1);
    }
  };

  return (
    <article 
      className="group card-hover-parent bg-[#F8F5EF] rounded-[12px] border border-[#2025221a] overflow-hidden flex flex-col justify-between transition-all duration-200 hover:border-[#24483A]/40 hover:shadow-sm"
    >
      <div>
        {/* Food Photograph Container */}
        <div 
          className="relative aspect-4/3 w-full overflow-hidden bg-[#EDE5D8] cursor-pointer"
          onClick={() => navigateToMeal(meal.id)}
        >
          <img
            src={meal.imageUrl}
            alt={meal.name}
            loading="lazy"
            className="card-img-zoom w-full h-full object-cover"
          />
          
          {/* Dietary Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
            {isCustomizable && (
              <span className="bg-[#B86B4B] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-[4px] flex items-center gap-1 shadow-2xs">
                <Sparkles className="w-2.5 h-2.5" />
                Build Plate
              </span>
            )}
            {meal.dietary.slice(0, isCustomizable ? 1 : 2).map((diet) => (
              <span 
                key={diet}
                className="bg-[#24483A]/90 backdrop-blur-xs text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-[4px]"
              >
                {diet}
              </span>
            ))}
            {meal.isPopular && !isCustomizable && (
              <span className="bg-[#B86B4B] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-[4px]">
                Popular
              </span>
            )}
          </div>

          {/* Portion Availability Notice */}
          {meal.portionsAvailable <= 8 && (
            <div className="absolute bottom-3 left-3 bg-[#202522]/90 backdrop-blur-xs text-[#F8F5EF] text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-[4px]">
              {meal.portionsAvailable} portions left
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-5">
          {/* Cook & Kitchen Byline */}
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={() => navigateToKitchen(meal.cookId)}
              className="flex items-center gap-2 group/cook text-left focus:outline-none"
            >
              <img
                src={meal.cookAvatar}
                alt={meal.cookName}
                className="w-5 h-5 rounded-full object-cover border border-[#2025221a]"
              />
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6D716C] group-hover/cook:text-[#24483A] transition-colors truncate max-w-[170px]">
                {meal.kitchenName}
              </span>
            </button>

            {/* Rating */}
            <div className="flex items-center gap-1 text-xs font-semibold text-[#202522]">
              <Star className="w-3.5 h-3.5 fill-[#C8A96B] text-[#C8A96B]" />
              <span>{meal.rating.toFixed(2)}</span>
            </div>
          </div>

          {/* Dish Title */}
          <h3 
            onClick={() => navigateToMeal(meal.id)}
            className="font-serif text-[18px] font-bold text-[#202522] group-hover:text-[#24483A] transition-colors leading-snug cursor-pointer line-clamp-2"
          >
            {meal.name}
          </h3>

          {/* Short Description */}
          <p className="text-xs text-[#6D716C] mt-2 line-clamp-2 leading-relaxed">
            {meal.description}
          </p>

          {/* Prep time info */}
          <div className="mt-3 flex items-center gap-2 text-[11px] text-[#6D716C] pt-2 border-t border-[#2025221a]/60">
            <Clock className="w-3 h-3 text-[#B86B4B]" />
            <span>{meal.preparationTime}</span>
            <span>•</span>
            <span>Pickup / Delivery</span>
          </div>
        </div>
      </div>

      {/* Card Footer: Price and Add Button */}
      <div className="px-5 pb-5 pt-1 flex items-center justify-between border-t border-[#2025221a]/30 mt-2">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#6D716C] block">
            {isCustomizable ? "From" : "Portion"}
          </span>
          <span className="font-sans text-[17px] font-bold text-[#B86B4B]">
            {formatPrice(meal.price)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigateToMeal(meal.id)}
            className="text-[11px] font-bold uppercase tracking-wider text-[#24483A] hover:text-[#193329] px-2 py-1"
          >
            Details
          </button>

          <button
            onClick={handleAction}
            className={`flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider px-3.5 py-2 rounded-[8px] transition-all shadow-2xs active:scale-95 ${
              isCustomizable
                ? "bg-[#B86B4B] hover:bg-[#9E5638] text-white"
                : "bg-[#24483A] hover:bg-[#193329] text-white"
            }`}
            aria-label={isCustomizable ? `Customise ${meal.name}` : `Add ${meal.name} to basket`}
          >
            {isCustomizable ? (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Build Plate</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
