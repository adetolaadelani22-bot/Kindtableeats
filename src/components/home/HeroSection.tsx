import React from "react";
import { useApp } from "../../context/AppContext";
import { ArrowRight, MapPin, Heart, ShieldCheck, Star } from "lucide-react";

export const HeroSection: React.FC = () => {
  const { setCurrentRoute, navigateToKitchen, navigateToMeal, meals, cooks, formatPrice } = useApp();

  // Find trending meal and featured kitchen
  const featuredCook = cooks[0] || {
    id: "cook-amara",
    name: "Elena",
    kitchenName: "Elena’s Coastal Kitchen",
    quote: "Cooking is how I provide for my daughter and share my heritage with my neighbors.",
    location: "Peckham, SE15",
    rating: 4.98
  };

  const trendingMeal = meals.find(m => m.isPopular) || meals[0] || {
    id: "meal-lentil-stew",
    name: "Spiced Lentil & Spinach Stew",
    kitchenName: "Mama Amara's Kitchen",
    price: 13.50,
    imageUrl: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=400"
  };

  return (
    <section className="bg-[#F8F5EF] pt-4 pb-12 lg:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Bento Grid Architecture */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-[#2025221a] rounded-[16px] overflow-hidden border border-[#2025221a] shadow-xs">
          
          {/* Main Editorial Hero Tile (7 cols) */}
          <div className="lg:col-span-7 bg-[#F8F5EF] p-8 sm:p-12 lg:p-14 flex flex-col justify-center">
            <span className="text-[#B86B4B] text-[12px] font-bold tracking-[0.2em] mb-4 uppercase">
              Good Food. Good People. Good Purpose.
            </span>
            
            <h1 className="text-4xl sm:text-5xl lg:text-[60px] font-serif leading-[1.1] mb-6 text-[#24483A] tracking-tight">
              Home-cooked food,<br />
              made with care.
            </h1>
            
            <p className="text-base sm:text-[17px] text-[#6D716C] max-w-lg mb-8 leading-relaxed">
              Discover nourishing meals prepared by local home cooks while helping single mothers build sustainable income and economic independence.
            </p>
            
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => setCurrentRoute("discover")}
                className="bg-[#B86B4B] hover:bg-[#9E5638] text-white px-8 py-4 rounded-[8px] font-bold uppercase tracking-widest text-[12px] transition-all shadow-xs active:scale-98"
              >
                Explore Worldwide Meals
              </button>
              
              <button
                onClick={() => setCurrentRoute("kitchens")}
                className="border border-[#24483A] hover:bg-[#24483A]/5 text-[#24483A] px-8 py-4 rounded-[8px] font-bold uppercase tracking-widest text-[12px] transition-all active:scale-98"
              >
                Meet Our Cooks
              </button>
            </div>
          </div>

          {/* Featured Kitchen Visual Bento Tile (5 cols) */}
          <div 
            onClick={() => navigateToKitchen(featuredCook.id)}
            className="lg:col-span-5 bg-[#EDE5D8] relative min-h-[360px] lg:min-h-[440px] overflow-hidden group cursor-pointer"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center mix-blend-multiply opacity-85 transition-transform duration-700 group-hover:scale-105"
              style={{
                backgroundImage: `url('${featuredCook.heroImage || "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=1000&auto=format&fit=crop"}')`
              }}
            />
            
            <div className="absolute top-6 left-6 z-10">
              <span className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-xs text-[#202522] text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-[6px] border border-white/50">
                <MapPin className="w-3.5 h-3.5 text-[#B86B4B]" />
                {featuredCook.location}
              </span>
            </div>

            {/* Frosted Glass Overlay Card */}
            <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm p-6 rounded-[12px] border border-white/50 shadow-sm transition-all group-hover:bg-white">
              <span className="block text-[11px] uppercase tracking-widest text-[#B86B4B] font-bold mb-1">
                Featured Kitchen
              </span>
              <h3 className="text-[20px] font-serif font-bold text-[#202522] mb-1 group-hover:text-[#24483A] transition-colors">
                {featuredCook.kitchenName}
              </h3>
              <p className="text-[13px] text-[#6D716C] italic leading-relaxed">
                "{featuredCook.quote || "Cooking is how I provide for my daughter and share my heritage with my neighbors."}"
              </p>
            </div>
          </div>

          {/* Trending Today Bento Tile (6 or 7 cols on tablet/desktop) */}
          <div 
            onClick={() => navigateToMeal(trendingMeal.id)}
            className="lg:col-span-7 bg-[#F8F5EF] p-6 sm:p-8 flex flex-col justify-between cursor-pointer group hover:bg-[#F4EFE6] transition-colors"
          >
            <div className="flex justify-between items-start">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#6D716C]">
                Trending Today
              </h4>
              <span className="text-[#24483A] text-[11px] font-bold uppercase tracking-widest group-hover:underline flex items-center gap-1">
                View Dish <ArrowRight className="w-3 h-3" />
              </span>
            </div>
            
            <div className="flex items-center gap-5 mt-4">
              <div 
                className="w-20 h-20 sm:w-24 sm:h-24 bg-[#EDE5D8] rounded-[12px] bg-cover bg-center shrink-0 border border-[#2025221a] overflow-hidden"
                style={{ backgroundImage: `url('${trendingMeal.imageUrl}')` }}
              />
              <div>
                <p className="font-serif text-[18px] sm:text-[20px] font-bold text-[#202522] group-hover:text-[#24483A] transition-colors leading-snug">
                  {trendingMeal.name}
                </p>
                <p className="text-[13px] text-[#6D716C] mt-0.5">
                  by {trendingMeal.kitchenName}
                </p>
                <p className="text-[#B86B4B] font-bold text-[15px] mt-1.5">
                  {formatPrice(trendingMeal.price)}
                </p>
              </div>
            </div>
          </div>

          {/* Verified Trust Bento Tile (5 cols) */}
          <div className="lg:col-span-5 bg-[#24483A] p-6 sm:p-8 text-white flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-[#C8A96B]" />
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#EDE5D8]/90">
                  Verified Trust
                </span>
              </div>
              <p className="text-[14px] sm:text-[15px] leading-relaxed text-[#EDE5D8]">
                Every cook in our community is personally audited for FSA Level 2 food safety and hygiene standards.
              </p>
            </div>
            
            <div className="flex items-center gap-4 pt-4 mt-4 border-t border-white/10">
              <div className="text-[26px] font-serif font-bold text-[#C8A96B]">
                4.96/5
              </div>
              <div className="text-[11px] uppercase tracking-widest text-[#EDE5D8]/70">
                Average Community Rating Across Boroughs
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
