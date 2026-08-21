import React from "react";
import { useApp } from "../../context/AppContext";
import { ArrowRight, Quote } from "lucide-react";

export const StoryFeature: React.FC = () => {
  const { navigateToKitchen, setCurrentRoute } = useApp();

  return (
    <section className="py-16 bg-[#EDE5D8]/40 border-y border-[#2025221a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Bento Narrative Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-[#2025221a] rounded-[16px] overflow-hidden border border-[#2025221a] shadow-xs">
          
          {/* Portrait Image Tile (5 cols) */}
          <div className="lg:col-span-5 relative min-h-[380px] bg-[#EDE5D8] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800"
              alt="Mama Amara portrait"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#C8A96B] block">
                Cook in Focus
              </span>
              <h4 className="font-serif text-2xl font-bold">Mama Amara</h4>
              <p className="text-xs text-[#EDE5D8]">Peckham, South London • 3 Children</p>
            </div>
          </div>

          {/* Narrative Content (7 cols) */}
          <div className="lg:col-span-7 bg-[#F8F5EF] p-8 sm:p-12 lg:p-14 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-[#B86B4B] text-[11px] font-bold uppercase tracking-[0.2em]">
                  Voice of the Kitchen
                </span>
                <Quote className="w-8 h-8 text-[#B86B4B]/30" />
              </div>

              <blockquote className="font-serif text-2xl sm:text-3xl text-[#202522] leading-snug">
                "Cooking is not just how I pay our rent; it is how I pass my grandmother’s stories to my children, and how I welcome my neighbors to our table."
              </blockquote>

              <p className="text-xs sm:text-sm text-[#6D716C] leading-relaxed">
                When Amara arrived in London as a single parent, inflexible commercial culinary shifts made childcare impossible. Through KindTableEats, she operates her certified Peckham kitchen on her own schedule, preparing authentic Egusi soup and slow-simmered Jollof for over 120 regular neighborhood subscribers each month.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[#2025221a] flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#6D716C] font-bold block">
                  Kitchen
                </span>
                <span className="font-serif text-lg font-bold text-[#24483A]">
                  Mama Amara's Heritage Kitchen
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigateToKitchen("cook-amara")}
                  className="bg-[#24483A] hover:bg-[#193329] text-white px-6 py-3 rounded-[8px] text-[11px] font-bold uppercase tracking-wider transition-all shadow-xs"
                >
                  View Amara's Menu
                </button>
                <button
                  onClick={() => setCurrentRoute("stories")}
                  className="text-xs font-bold uppercase tracking-wider text-[#6D716C] hover:text-[#24483A] px-3 py-3"
                >
                  More Stories
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
