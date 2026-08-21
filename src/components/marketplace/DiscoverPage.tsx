import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { MealCard } from "../cards/MealCard";
import { KitchenCard } from "../cards/KitchenCard";
import { MealCategory, DietaryPreference, Currency } from "../../types";
import { 
  Search, 
  MapPin, 
  SlidersHorizontal, 
  X, 
  ArrowUpDown, 
  ChefHat, 
  Utensils,
  Globe2
} from "lucide-react";
import { UNIVERSE_LOCATIONS, GLOBAL_CURRENCIES } from "../../data/mockData";

const CATEGORIES: MealCategory[] = [
  "All",
  "Nigerian",
  "West African",
  "Caribbean & Jerk",
  "South Asian Masala",
  "East Asian & Noodles",
  "East African Swahili",
  "Latin & Oaxacan",
  "Plant-Forward",
  "Nourishing Soups",
  "Comfort Bakes",
  "Weekend Feasts",
  "Build Your Own"
];

const DIETARY_OPTIONS: DietaryPreference[] = [
  "Halal",
  "Vegan",
  "Gluten-Free",
  "Nut-Free",
  "Dairy-Free",
  "Vegetarian",
  "High-Protein"
];

export const DiscoverPage: React.FC = () => {
  const { 
    meals, 
    cooks,
    searchQuery, 
    setSearchQuery, 
    selectedCategory, 
    setSelectedCategory,
    selectedDietary,
    toggleDietary,
    selectedLocation,
    setSelectedLocation,
    maxPrice,
    setMaxPrice,
    sortBy,
    setSortBy,
    currency,
    setCurrency,
    formatPrice
  } = useApp();

  const [viewMode, setViewMode] = useState<"meals" | "kitchens">("meals");
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState<boolean>(false);

  // Helper to match universe location string
  const matchesLocation = (itemLocation: string, filterLocation: string) => {
    if (!filterLocation || filterLocation.includes("Universe") || filterLocation.includes("All Worldwide")) {
      return true;
    }
    // Extract words (e.g. "Lagos", "Tokyo", "London", "Nairobi", "Kingston", "New York", "Paris")
    const cleanTokens = filterLocation
      .replace(/[\u{1F300}-\u{1F9FF}]/gu, "") // strip emojis
      .replace(/[(),]/g, " ")
      .trim()
      .toLowerCase()
      .split(/\s+/)
      .filter(t => t.length > 2 && t !== "all" && t !== "the" && t !== "and");

    const itemLoc = itemLocation.toLowerCase();
    return cleanTokens.some(token => itemLoc.includes(token));
  };

  // Filter Meals
  const filteredMeals = meals.filter((meal) => {
    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = meal.name.toLowerCase().includes(q);
      const matchDesc = meal.description.toLowerCase().includes(q);
      const matchCook = meal.cookName.toLowerCase().includes(q);
      const matchIng = meal.ingredients.some(i => i.toLowerCase().includes(q));
      if (!matchName && !matchDesc && !matchCook && !matchIng) return false;
    }

    // Category
    if (selectedCategory !== "All" && meal.category !== selectedCategory) {
      return false;
    }

    // Dietary
    if (selectedDietary.length > 0) {
      const hasAllDietary = selectedDietary.every(d => meal.dietary.includes(d));
      if (!hasAllDietary) return false;
    }

    // Location
    if (selectedLocation && !selectedLocation.includes("Universe")) {
      const cook = cooks.find(c => c.id === meal.cookId);
      if (!cook || !matchesLocation(cook.location, selectedLocation)) return false;
    }

    // Price
    if (meal.price > maxPrice) return false;

    return true;
  });

  // Sort Meals
  const sortedMeals = [...filteredMeals].sort((a, b) => {
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    return (b.reviewCount || 0) - (a.reviewCount || 0); // popular
  });

  // Filter Cooks
  const filteredCooks = cooks.filter((cook) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = cook.name.toLowerCase().includes(q);
      const matchKitchen = cook.kitchenName.toLowerCase().includes(q);
      const matchSpec = cook.specialty.toLowerCase().includes(q);
      const matchLoc = cook.location.toLowerCase().includes(q);
      if (!matchName && !matchKitchen && !matchSpec && !matchLoc) return false;
    }

    if (selectedLocation && !selectedLocation.includes("Universe")) {
      if (!matchesLocation(cook.location, selectedLocation)) return false;
    }

    return true;
  });

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedLocation("🌍 Universe (All Worldwide Cities)");
    setMaxPrice(35);
  };

  const isUniverseDefault = selectedLocation.includes("Universe") || selectedLocation.includes("All Worldwide");

  const hasActiveFilters = 
    searchQuery !== "" || 
    selectedCategory !== "All" || 
    selectedDietary.length > 0 || 
    !isUniverseDefault || 
    maxPrice < 35;

  return (
    <div className="py-10 bg-[#F8F5EF] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Page Header with Worldwide & Currency Controls */}
        <div className="border-b border-[#EDE5D8] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#B86B4B] bg-[#B86B4B]/10 px-2.5 py-0.5 rounded-md flex items-center gap-1">
                <Globe2 className="w-3 h-3" /> Worldwide & Universe Marketplace
              </span>
              <span className="text-xs text-[#6D716C]">• Verified Home Kitchens</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#202522] mt-2">
              Discover Home-Cooked Food Across the Universe
            </h1>
            <p className="text-xs sm:text-sm text-[#6D716C] mt-1 max-w-2xl">
              Authentic heritage recipes prepared fresh in verified kitchens across Lagos, London, Kingston, Tokyo, Mumbai, Nairobi, New York, and worldwide.
            </p>
          </div>

          {/* Currency Switcher & View Mode Toggle */}
          <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
            {/* Universal Currency Select */}
            <div className="flex items-center gap-1.5 bg-white px-3 py-2 rounded-xl border border-[#EDE5D8] shadow-2xs">
              <Globe2 className="w-3.5 h-3.5 text-[#B86B4B]" />
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as Currency)}
                className="text-xs font-bold text-[#24483A] bg-transparent focus:outline-none cursor-pointer"
              >
                {GLOBAL_CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.code} ({c.symbol})
                  </option>
                ))}
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 bg-[#EDE5D8]/70 p-1 rounded-xl border border-[#D9D0C1]/50">
              <button
                onClick={() => setViewMode("meals")}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  viewMode === "meals"
                    ? "bg-[#24483A] text-white shadow-xs"
                    : "text-[#6D716C] hover:text-[#202522]"
                }`}
              >
                <Utensils className="w-3.5 h-3.5" />
                <span>Dishes ({filteredMeals.length})</span>
              </button>

              <button
                onClick={() => setViewMode("kitchens")}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  viewMode === "kitchens"
                    ? "bg-[#24483A] text-white shadow-xs"
                    : "text-[#6D716C] hover:text-[#202522]"
                }`}
              >
                <ChefHat className="w-3.5 h-3.5" />
                <span>Kitchens ({filteredCooks.length})</span>
              </button>
            </div>
          </div>
        </div>

        {/* Search, Universe Location, & Sort Bar */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          
          {/* Search Input (6 cols) */}
          <div className="md:col-span-6 relative">
            <input
              type="text"
              placeholder="Search dishes, ingredients, or cooks (e.g. Jollof, Jerk, Biryani, Miso Cod, Egusi)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs sm:text-sm pl-10 pr-10 py-3 bg-white border border-[#EDE5D8] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#24483A] shadow-2xs"
            />
            <Search className="w-4 h-4 text-[#6D716C] absolute left-3.5 top-3.5" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-3.5 text-[#6D716C] hover:text-[#202522]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Universe Location Selector (3 cols) */}
          <div className="md:col-span-3 relative">
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full text-xs sm:text-sm pl-9 pr-8 py-3 bg-white border border-[#EDE5D8] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#24483A] shadow-2xs appearance-none font-semibold text-[#202522]"
            >
              {UNIVERSE_LOCATIONS.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
            <MapPin className="w-4 h-4 text-[#B86B4B] absolute left-3 top-3.5 pointer-events-none" />
          </div>

          {/* Sort Selector (3 cols) */}
          <div className="md:col-span-3 relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full text-xs sm:text-sm pl-9 pr-8 py-3 bg-white border border-[#EDE5D8] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#24483A] shadow-2xs appearance-none font-medium text-[#202522]"
            >
              <option value="popular">Sort: Most Popular</option>
              <option value="rating">Sort: Highest Rated</option>
              <option value="price-asc">Sort: Price (Low to High)</option>
              <option value="price-desc">Sort: Price (High to Low)</option>
            </select>
            <ArrowUpDown className="w-4 h-4 text-[#6D716C] absolute left-3 top-3.5 pointer-events-none" />
          </div>

        </div>

        {/* Global Category Horizontal Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                selectedCategory === category
                  ? "bg-[#24483A] text-white border-[#24483A] shadow-xs"
                  : "bg-white text-[#202522] border-[#EDE5D8] hover:border-[#D9D0C1]"
              }`}
            >
              {category}
            </button>
          ))}

          <button
            onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all shrink-0 ${
              isFilterPanelOpen || selectedDietary.length > 0 || maxPrice < 35
                ? "bg-[#B86B4B] text-white border-[#B86B4B]"
                : "bg-white text-[#202522] border-[#EDE5D8] hover:border-[#D9D0C1]"
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters {selectedDietary.length > 0 ? `(${selectedDietary.length})` : ""}</span>
          </button>
        </div>

        {/* Expandable Dietary & Price Filter Drawer */}
        {isFilterPanelOpen && (
          <div className="bg-white p-6 rounded-2xl border border-[#EDE5D8] shadow-xs space-y-6 animate-in slide-in-from-top-2">
            <div className="flex items-center justify-between border-b border-[#EDE5D8] pb-3">
              <h3 className="font-serif text-base font-bold text-[#202522]">
                Dietary & Price Filters
              </h3>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-[#B86B4B] font-semibold hover:underline"
                >
                  Reset all filters
                </button>
              )}
            </div>

            {/* Dietary Checkboxes */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#6D716C] mb-2.5">
                Dietary Preferences
              </label>
              <div className="flex flex-wrap gap-2">
                {DIETARY_OPTIONS.map((diet) => {
                  const isChecked = selectedDietary.includes(diet);
                  return (
                    <button
                      key={diet}
                      onClick={() => toggleDietary(diet)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                        isChecked
                          ? "bg-[#24483A] text-white border-[#24483A]"
                          : "bg-[#F8F5EF] text-[#202522] border-[#EDE5D8] hover:border-[#D9D0C1]"
                      }`}
                    >
                      {isChecked ? "✓ " : ""}{diet}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Max Price Slider */}
            <div>
              <div className="flex justify-between text-xs font-bold text-[#202522] mb-2">
                <span className="uppercase tracking-wider text-[#6D716C]">Max Dish Price</span>
                <span className="text-[#24483A]">Up to {formatPrice(maxPrice)}</span>
              </div>
              <input
                type="range"
                min="8"
                max="35"
                step="0.50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseFloat(e.target.value))}
                className="w-full accent-[#24483A]"
              />
            </div>
          </div>
        )}

        {/* Results Counter & Active Pills */}
        <div className="flex items-center justify-between text-xs text-[#6D716C]">
          <span>
            {viewMode === "meals"
              ? `Showing ${sortedMeals.length} home-cooked dish${sortedMeals.length === 1 ? "" : "es"} across ${selectedLocation}`
              : `Showing ${filteredCooks.length} verified kitchen${filteredCooks.length === 1 ? "" : "s"} across ${selectedLocation}`}
          </span>

          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="text-[#B86B4B] font-semibold hover:underline flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" /> Clear active filters
            </button>
          )}
        </div>

        {/* Main Content Area */}
        {viewMode === "meals" ? (
          sortedMeals.length === 0 ? (
            <div className="bg-white rounded-2xl border border-[#EDE5D8] p-12 text-center space-y-4 max-w-lg mx-auto">
              <div className="w-14 h-14 rounded-full bg-[#EDE5D8] text-[#24483A] flex items-center justify-center mx-auto">
                <Utensils className="w-6 h-6 opacity-60" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#202522]">
                No meals matched your filters
              </h3>
              <p className="text-xs text-[#6D716C] leading-relaxed">
                Try switching location to 🌍 Universe, resetting your dietary tags, or searching for other worldwide favorites.
              </p>
              <button
                onClick={clearAllFilters}
                className="bg-[#24483A] text-white px-5 py-2.5 rounded-xl text-xs font-semibold hover:bg-[#193329]"
              >
                Show All Universe Meals
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedMeals.map((meal) => (
                <MealCard key={meal.id} meal={meal} />
              ))}
            </div>
          )
        ) : (
          filteredCooks.length === 0 ? (
            <div className="bg-white rounded-2xl border border-[#EDE5D8] p-12 text-center space-y-4 max-w-lg mx-auto">
              <div className="w-14 h-14 rounded-full bg-[#EDE5D8] text-[#24483A] flex items-center justify-center mx-auto">
                <ChefHat className="w-6 h-6 opacity-60" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#202522]">
                No kitchens found
              </h3>
              <p className="text-xs text-[#6D716C] leading-relaxed">
                We couldn't find any cooks in this location. Switch to Universe to see kitchens across the world.
              </p>
              <button
                onClick={clearAllFilters}
                className="bg-[#24483A] text-white px-5 py-2.5 rounded-xl text-xs font-semibold hover:bg-[#193329]"
              >
                Reset Location to Universe
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCooks.map((cook) => (
                <KitchenCard key={cook.id} cook={cook} />
              ))}
            </div>
          )
        )}

      </div>
    </div>
  );
};
