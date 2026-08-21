import React from "react";
import { useApp } from "../../context/AppContext";
import { ArrowRight, Heart, MapPin, Quote } from "lucide-react";

export const StoriesPage: React.FC = () => {
  const { cooks, navigateToKitchen } = useApp();

  return (
    <div className="py-12 bg-[#F8F5EF] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#B86B4B]">
            Cook Biographies
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#202522]">
            Stories from the Kitchen Table
          </h1>
          <p className="text-sm text-[#6D716C] leading-relaxed">
            Meet the resilient single mothers crafting authentic home-cooked meals for their communities.
          </p>
        </div>

        {/* Stories List */}
        <div className="space-y-12">
          {cooks.map((cook, idx) => (
            <div
              key={cook.id}
              className={`bg-white rounded-3xl border border-[#EDE5D8] overflow-hidden shadow-xs grid grid-cols-1 lg:grid-cols-12 ${
                idx % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Photo */}
              <div className={`lg:col-span-5 relative min-h-[300px] lg:min-h-[380px] bg-[#EDE5D8] ${
                idx % 2 === 1 ? "lg:order-2" : ""
              }`}>
                <img
                  src={cook.heroImage}
                  alt={cook.kitchenName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-xs text-[#202522] text-xs font-semibold px-3 py-1.5 rounded-lg shadow-sm flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#B86B4B]" />
                  <span>{cook.location}</span>
                </div>
              </div>

              {/* Text */}
              <div className={`lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between space-y-6 ${
                idx % 2 === 1 ? "lg:order-1" : ""
              }`}>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={cook.avatar}
                      alt={cook.name}
                      className="w-12 h-12 rounded-xl object-cover border border-[#EDE5D8]"
                    />
                    <div>
                      <h3 className="font-serif text-2xl font-bold text-[#202522]">
                        {cook.name}
                      </h3>
                      <p className="text-xs text-[#24483A] font-semibold">
                        Founder of {cook.kitchenName} • {cook.familyNote}
                      </p>
                    </div>
                  </div>

                  <p className="font-serif text-lg italic text-[#24483A] leading-relaxed">
                    "{cook.story}"
                  </p>

                  <p className="text-xs text-[#6D716C] leading-relaxed">
                    Specializing in {cook.specialty}. Amara and all KindTableEats home chefs are fully certified in Level 2 Food Hygiene and register their home kitchens with local borough councils.
                  </p>
                </div>

                <div className="pt-4 border-t border-[#EDE5D8] flex items-center justify-between">
                  <span className="text-xs text-[#6D716C]">
                    {cook.mealsServed}+ community meals served
                  </span>

                  <button
                    onClick={() => navigateToKitchen(cook.id)}
                    className="flex items-center gap-2 bg-[#24483A] hover:bg-[#193329] text-white px-5 py-2.5 rounded-xl text-xs font-semibold transition-colors"
                  >
                    <span>View Today's Menu</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
