import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { MealCard } from "../cards/MealCard";
import { ReviewCard } from "../cards/ReviewCard";
import { 
  Star, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Heart, 
  Award, 
  Calendar, 
  Phone, 
  Share2, 
  ArrowLeft,
  Utensils
} from "lucide-react";

export const KitchenProfilePage: React.FC = () => {
  const { selectedCookId, cooks, meals, reviews, setCurrentRoute, addToast } = useApp();
  const [activeTab, setActiveTab] = useState<"menu" | "story" | "safety" | "reviews">("menu");

  const cook = cooks.find((c) => c.id === selectedCookId) || cooks[0];
  const cookMeals = meals.filter((m) => m.cookId === cook.id);
  const cookReviews = reviews.filter((r) => r.cookId === cook.id);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    addToast({
      title: "Link copied to clipboard",
      message: `Share ${cook.kitchenName} with your neighbors`,
      type: "info"
    });
  };

  return (
    <div className="bg-[#F8F5EF] min-h-screen pb-20">
      
      {/* Hero Header */}
      <div className="relative h-72 sm:h-96 w-full bg-[#EDE5D8]">
        <img
          src={cook.heroImage}
          alt={cook.kitchenName}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        
        {/* Back Button */}
        <div className="absolute top-6 left-4 sm:left-8 z-10">
          <button
            onClick={() => setCurrentRoute("discover")}
            className="flex items-center gap-2 bg-white/90 hover:bg-white text-[#202522] px-4 py-2 rounded-xl text-xs font-semibold shadow-md transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Discovery</span>
          </button>
        </div>

        {/* Share Button */}
        <div className="absolute top-6 right-4 sm:right-8 z-10">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 bg-white/90 hover:bg-white text-[#202522] px-3.5 py-2 rounded-xl text-xs font-semibold shadow-md transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Share Kitchen</span>
          </button>
        </div>

        {/* Hero Title & Overlap Details */}
        <div className="absolute bottom-6 left-4 sm:left-8 right-4 sm:right-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-white">
          <div className="flex items-end gap-4">
            <img
              src={cook.avatar}
              alt={cook.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-4 border-white shadow-xl bg-white shrink-0"
            />
            <div className="pb-1">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="bg-[#24483A] text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-md flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-[#C8A96B]" /> {cook.hygieneRating}
                </span>
                <span className="text-xs text-[#EDE5D8] hidden sm:inline">
                  Member since {cook.memberSince}
                </span>
              </div>

              <h1 className="font-serif text-2xl sm:text-4xl font-bold leading-tight drop-shadow-md">
                {cook.kitchenName}
              </h1>

              <p className="text-xs sm:text-sm text-[#EDE5D8] mt-0.5">
                Head Cook: <strong className="text-white">{cook.name}</strong> • {cook.familyNote}
              </p>
            </div>
          </div>

          <div className="flex sm:flex-col items-center sm:items-end gap-3 text-xs">
            <div className="flex items-center gap-1.5 bg-white/90 text-[#202522] px-3 py-1.5 rounded-xl font-bold shadow-xs">
              <Star className="w-4 h-4 fill-[#C8A96B] text-[#C8A96B]" />
              <span className="text-sm">{cook.rating.toFixed(2)}</span>
              <span className="text-[#6D716C] font-normal">({cook.reviewsCount} reviews)</span>
            </div>
            <span className="text-[11px] text-[#EDE5D8]">
              {cook.mealsServed}+ community meals served
            </span>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Quick Info Strip */}
        <div className="bg-white rounded-2xl p-5 border border-[#EDE5D8] grid grid-cols-2 md:grid-cols-4 gap-4 text-xs mb-8 shadow-2xs">
          <div className="flex items-center gap-2.5">
            <MapPin className="w-4 h-4 text-[#B86B4B] shrink-0" />
            <div>
              <span className="text-[#6D716C] block">Location</span>
              <span className="font-semibold text-[#202522]">{cook.location} ({cook.distance})</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Clock className="w-4 h-4 text-[#24483A] shrink-0" />
            <div>
              <span className="text-[#6D716C] block">Kitchen Hours</span>
              <span className="font-semibold text-[#202522]">{cook.openingHours}</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Award className="w-4 h-4 text-[#C8A96B] shrink-0" />
            <div>
              <span className="text-[#6D716C] block">Specialty</span>
              <span className="font-semibold text-[#202522] truncate block max-w-[170px]">{cook.specialty}</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[#24483A] shrink-0" />
            <div>
              <span className="text-[#6D716C] block">FSA Food Registration</span>
              <span className="font-semibold text-[#202522]">{cook.foodSafetyCertNo}</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-3 border-b border-[#EDE5D8] mb-8 pb-1">
          <button
            onClick={() => setActiveTab("menu")}
            className={`pb-3 px-2 text-sm font-bold transition-all relative ${
              activeTab === "menu"
                ? "text-[#24483A]"
                : "text-[#6D716C] hover:text-[#202522]"
            }`}
          >
            Today's Fresh Menu ({cookMeals.length})
            {activeTab === "menu" && (
              <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#24483A] rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab("story")}
            className={`pb-3 px-2 text-sm font-bold transition-all relative ${
              activeTab === "story"
                ? "text-[#24483A]"
                : "text-[#6D716C] hover:text-[#202522]"
            }`}
          >
            About {cook.name.split(" ")[0]}
            {activeTab === "story" && (
              <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#24483A] rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab("safety")}
            className={`pb-3 px-2 text-sm font-bold transition-all relative ${
              activeTab === "safety"
                ? "text-[#24483A]"
                : "text-[#6D716C] hover:text-[#202522]"
            }`}
          >
            Food Safety & Pickup
            {activeTab === "safety" && (
              <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#24483A] rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab("reviews")}
            className={`pb-3 px-2 text-sm font-bold transition-all relative ${
              activeTab === "reviews"
                ? "text-[#24483A]"
                : "text-[#6D716C] hover:text-[#202522]"
            }`}
          >
            Reviews ({cookReviews.length})
            {activeTab === "reviews" && (
              <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#24483A] rounded-full" />
            )}
          </button>
        </div>

        {/* Tab 1: Menu */}
        {activeTab === "menu" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-2xl font-bold text-[#202522]">
                  Freshly Prepared Today
                </h3>
                <p className="text-xs text-[#6D716C]">
                  Dishes are cooked in small batches to preserve authenticity and quality.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cookMeals.map((meal) => (
                <MealCard key={meal.id} meal={meal} />
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Story */}
        {activeTab === "story" && (
          <div className="bg-white rounded-2xl p-8 sm:p-12 border border-[#EDE5D8] shadow-xs max-w-4xl space-y-6">
            <div className="flex items-center gap-3 text-[#B86B4B] text-xs font-bold uppercase tracking-widest">
              <Heart className="w-4 h-4 fill-[#B86B4B]" /> The Person Behind The Pot
            </div>

            <h2 className="font-serif text-3xl font-bold text-[#202522]">
              "Cooking is my language of love, memory, and dignity."
            </h2>

            <p className="text-base text-[#202522] leading-relaxed font-serif italic text-xl text-[#24483A]">
              "{cook.story}"
            </p>

            <div className="pt-6 border-t border-[#EDE5D8] grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-[#6D716C]">
              <div>
                <strong className="text-[#202522] block mb-1">Family & Heritage</strong>
                <p>{cook.familyNote}. Recipes passed down and perfected over generations.</p>
              </div>
              <div>
                <strong className="text-[#202522] block mb-1">Response Time</strong>
                <p>Typically confirms new orders in {cook.responseTime}.</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Food Safety & Pickup */}
        {activeTab === "safety" && (
          <div className="bg-white rounded-2xl p-8 border border-[#EDE5D8] shadow-xs max-w-4xl space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[#24483A]">
                <ShieldCheck className="w-6 h-6 text-[#24483A]" />
                <h3 className="font-serif text-2xl font-bold text-[#202522]">
                  Food Hygiene & Kitchen Standards
                </h3>
              </div>
              <p className="text-sm text-[#202522] leading-relaxed">
                {cook.kitchenName} operates with a certified Level 2 Food Hygiene rating and is registered with the local council Environmental Health authority.
              </p>
              <div className="p-4 bg-[#F8F5EF] rounded-xl border border-[#EDE5D8] space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#6D716C]">Certificate Registration Number:</span>
                  <span className="font-semibold text-[#202522]">{cook.foodSafetyCertNo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6D716C]">Kitchen Inspection Rating:</span>
                  <span className="font-semibold text-[#24483A]">{cook.hygieneRating}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6D716C]">Packaging Standard:</span>
                  <span className="font-semibold text-[#202522]">100% Compostable & Leak-Proof</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-[#EDE5D8]">
              <h4 className="font-serif text-xl font-bold text-[#202522]">
                Pickup & Delivery Logistics
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-[#F8F5EF] rounded-xl border border-[#EDE5D8]">
                  <strong className="text-[#202522] block mb-1 text-sm font-serif">Kitchen Door Collection</strong>
                  <p className="text-[#6D716C] mb-2">{cook.pickupAddress}</p>
                  <p className="text-[#24483A] font-medium">Free • Ring bell and collect directly from cook</p>
                </div>

                <div className="p-4 bg-[#F8F5EF] rounded-xl border border-[#EDE5D8]">
                  <strong className="text-[#202522] block mb-1 text-sm font-serif">Local Community Delivery</strong>
                  <p className="text-[#6D716C] mb-2">Within 3.5 miles of {cook.location}</p>
                  <p className="text-[#24483A] font-medium">£2.50 flat fee • Arrives warm in insulated thermal box</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Reviews */}
        {activeTab === "reviews" && (
          <div className="space-y-6 max-w-4xl">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-2xl font-bold text-[#202522]">
                Customer Reviews for {cook.name}
              </h3>
              <div className="flex items-center gap-1.5 text-sm font-bold text-[#202522]">
                <Star className="w-4 h-4 fill-[#C8A96B] text-[#C8A96B]" />
                <span>{cook.rating.toFixed(2)} / 5.0</span>
              </div>
            </div>

            <div className="space-y-4">
              {cookReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
