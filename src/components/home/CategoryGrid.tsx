import React from "react";
import { useApp } from "../../context/AppContext";
import { MealCategory } from "../../types";
import { ArrowRight } from "lucide-react";

interface CategoryTile {
  name: MealCategory;
  title: string;
  image: string;
  count: string;
}

const CATEGORIES: CategoryTile[] = [
  {
    name: "Caribbean & Jerk",
    title: "Caribbean Jerk & Plantains",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=400",
    count: "Kingston & Global"
  },
  {
    name: "South Asian Masala",
    title: "Mumbai Tiffin & Curries",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=400",
    count: "Mumbai & Worldwide"
  },
  {
    name: "East Asian & Noodles",
    title: "Tokyo Bento & Hand Noodles",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&q=80&w=400",
    count: "Tokyo & East Asia"
  },
  {
    name: "Latin & Oaxacan",
    title: "Oaxacan Birria & Moqueca",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&q=80&w=400",
    count: "Oaxaca & Bahia"
  },
  {
    name: "Nigerian",
    title: "Nigerian Jollof & Egusi",
    image: "https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&q=80&w=400",
    count: "Lagos & Diaspora"
  },
  {
    name: "East African Swahili",
    title: "Swahili Coconut & Pilau",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=400",
    count: "Nairobi & Mombasa"
  }
];

export const CategoryGrid: React.FC = () => {
  const { setSelectedCategory, setCurrentRoute } = useApp();

  const handleSelect = (category: MealCategory) => {
    setSelectedCategory(category);
    setCurrentRoute("discover");
  };

  return (
    <section className="py-14 bg-[#F8F5EF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-[#B86B4B] text-[11px] font-bold uppercase tracking-[0.2em]">
              Global Culinary Traditions
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#24483A] mt-1">
              Explore Kitchens Across the Universe
            </h2>
          </div>

          <button
            onClick={() => {
              setSelectedCategory("All");
              setCurrentRoute("discover");
            }}
            className="text-[12px] font-bold uppercase tracking-wider text-[#24483A] hover:text-[#193329] flex items-center gap-1.5 self-start sm:self-auto"
          >
            <span>View all dishes</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bento Photo Tile Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-[#2025221a] rounded-[16px] overflow-hidden border border-[#2025221a] shadow-xs">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.name}
              onClick={() => handleSelect(cat.name)}
              className="group card-hover-parent cursor-pointer bg-[#F8F5EF] flex flex-col justify-between transition-colors hover:bg-[#EDE5D8]"
            >
              <div className="aspect-square w-full overflow-hidden bg-[#EDE5D8] relative">
                <img
                  src={cat.image}
                  alt={cat.title}
                  loading="lazy"
                  className="card-img-zoom w-full h-full object-cover"
                />
              </div>

              <div className="p-3.5">
                <h3 className="font-serif text-xs sm:text-sm font-bold text-[#202522] group-hover:text-[#24483A] transition-colors leading-snug line-clamp-1">
                  {cat.title}
                </h3>
                <span className="text-[10px] text-[#6D716C] mt-0.5 block uppercase tracking-wider font-semibold">
                  {cat.count}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
