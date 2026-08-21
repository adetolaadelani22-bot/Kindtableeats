import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { MealCard } from "../cards/MealCard";
import { ArrowRight, Sparkles } from "lucide-react";

export const FeaturedSection: React.FC = () => {
  const { meals, setCurrentRoute } = useApp();
  const [activeTab, setActiveTab] = useState<"popular" | "soups" | "heritage">("popular");

  let displayedMeals = meals;
  if (activeTab === "popular") {
    displayedMeals = meals.filter((m) => m.isPopular || m.isCommunityFavorite).slice(0, 6);
  } else if (activeTab === "soups") {
    displayedMeals = meals.filter((m) => m.category === "Nourishing Soups" || m.category === "Plant-Forward").slice(0, 6);
  } else if (activeTab === "heritage") {
    displayedMeals = meals.filter((m) => m.category === "Nigerian" || m.category === "West African" || m.category === "Weekend Feasts").slice(0, 6);
  }

  return (
    <section className="py-16 bg-[#F8F5EF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <span className="text-[#B86B4B] text-[11px] font-bold uppercase tracking-[0.2em]">
              Freshly Simmering
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#24483A] mt-1">
              Something good is cooking near you.
            </h2>
            <p className="text-sm text-[#6D716C] mt-1.5 max-w-lg">
              Explore small-batch meals prepared today by verified home cooks in your community.
            </p>
          </div>

          {/* Bento Filter Tabs */}
          <div className="flex items-center gap-1 bg-[#EDE5D8]/70 p-1 rounded-[10px] border border-[#2025221a] self-start md:self-auto">
            <button
              onClick={() => setActiveTab("popular")}
              className={`px-4 py-2 rounded-[8px] text-[11px] font-bold uppercase tracking-wider transition-all ${
                activeTab === "popular"
                  ? "bg-[#24483A] text-white shadow-2xs"
                  : "text-[#6D716C] hover:text-[#202522]"
              }`}
            >
              Popular This Week
            </button>

            <button
              onClick={() => setActiveTab("heritage")}
              className={`px-4 py-2 rounded-[8px] text-[11px] font-bold uppercase tracking-wider transition-all ${
                activeTab === "heritage"
                  ? "bg-[#24483A] text-white shadow-2xs"
                  : "text-[#6D716C] hover:text-[#202522]"
              }`}
            >
              Heritage Feasts
            </button>

            <button
              onClick={() => setActiveTab("soups")}
              className={`px-4 py-2 rounded-[8px] text-[11px] font-bold uppercase tracking-wider transition-all ${
                activeTab === "soups"
                  ? "bg-[#24483A] text-white shadow-2xs"
                  : "text-[#6D716C] hover:text-[#202522]"
              }`}
            >
              Nourishing Broths
            </button>
          </div>
        </div>

        {/* Meal Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedMeals.map((meal) => (
            <MealCard key={meal.id} meal={meal} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={() => setCurrentRoute("discover")}
            className="inline-flex items-center gap-2 bg-[#EDE5D8] hover:bg-[#24483A] text-[#24483A] hover:text-white border border-[#2025221a] hover:border-[#24483A] px-8 py-3.5 rounded-[8px] font-bold uppercase tracking-widest text-[12px] transition-all"
          >
            <span>Browse Full Marketplace Menu</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
