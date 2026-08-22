import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { ReviewCard } from "../cards/ReviewCard";
import { ArrowRight, ChevronDown, Clock, Star, ShieldCheck } from "lucide-react";

const FAQS = [
  ["How do I order food?", "Choose a dish, select any available options, add special instructions, and add it to your basket."],
  ["Can I customize my order?", "Build Plate dishes show their available bases, proteins, sauces, and add-ons in the meal detail window."],
  ["Can I make a special request?", "Yes. Add preparation notes in the special request field before adding the dish to your basket."],
  ["How are cooks verified?", "Every listed cook is reviewed for food safety, hygiene certification, and kitchen readiness before appearing on the marketplace."],
  ["How do ratings work?", "Ratings come from customer reviews after an order, with verified purchases marked clearly."],
];

export const MarketplaceHighlights: React.FC = () => {
  const { meals, cooks, reviews, formatPrice, navigateToMeal, setCurrentRoute } = useApp();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const freshMeals = meals.filter((meal) => !meal.isPaused && meal.portionsAvailable > 0).sort((a, b) => Number(b.isNew) - Number(a.isNew)).slice(0, 4);
  const trendingMeals = meals.filter((meal) => !meal.isPaused && (meal.isPopular || meal.isCommunityFavorite)).sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0)).slice(0, 4);
  const featuredReviews = reviews.slice(0, 3);

  const MealRow: React.FC<{ meal: typeof meals[number]; accent: "fresh" | "trending" }> = ({ meal, accent }) => (
    <article className="group flex min-w-0 flex-col overflow-hidden rounded-xl border border-[#2025221a] bg-white transition-shadow hover:shadow-md">
      <button onClick={() => navigateToMeal(meal.id)} className="relative aspect-[4/3] overflow-hidden bg-[#EDE5D8] text-left">
        <img src={meal.imageUrl} alt={meal.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
        <span className={`absolute left-3 top-3 rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white ${accent === "fresh" ? "bg-[#24483A]" : "bg-[#B86B4B]"}`}>
          {accent === "fresh" ? "Fresh today" : "Trending"}
        </span>
      </button>
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-start justify-between gap-3">
          <h3 className="font-serif text-lg font-bold leading-tight text-[#202522]">{meal.name}</h3>
          <span className="shrink-0 text-sm font-bold text-[#B86B4B]">{formatPrice(meal.price)}</span>
        </div>
        <p className="line-clamp-2 text-xs leading-relaxed text-[#6D716C]">{meal.description}</p>
        <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-4 text-[11px] text-[#6D716C]">
          <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-[#C8A96B] text-[#C8A96B]" /> {meal.rating.toFixed(2)}</span>
          <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-[#B86B4B]" /> {meal.preparationTime}</span>
          <span>{meal.portionsAvailable} portions</span>
        </div>
        <p className="mt-2 truncate text-[11px] font-semibold text-[#24483A]">{meal.cookName} • {meal.kitchenName}</p>
      </div>
    </article>
  );

  return (
    <>
      <section className="border-y border-[#2025221a] bg-[#F4EFE6] py-16">
        <div className="mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#B86B4B]">Available now</span>
              <h2 className="mt-1 font-serif text-3xl font-bold text-[#24483A] sm:text-4xl">Fresh Today</h2>
              <p className="mt-2 max-w-xl text-sm text-[#6D716C]">Small-batch dishes with portions available today, prepared by cooks in the community.</p>
            </div>
            <button onClick={() => setCurrentRoute("discover")} className="inline-flex items-center gap-2 self-start text-xs font-bold uppercase tracking-wider text-[#24483A] hover:text-[#B86B4B] sm:self-auto">View all dishes <ArrowRight className="h-4 w-4" /></button>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {freshMeals.map((meal) => <MealRow key={meal.id} meal={meal} accent="fresh" />)}
          </div>
        </div>
      </section>

      <section className="bg-[#F8F5EF] py-16">
        <div className="mx-auto max-w-7xl space-y-10 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#B86B4B]">Gaining momentum</span>
              <h2 className="mt-1 font-serif text-3xl font-bold text-[#24483A] sm:text-4xl">Trending Today</h2>
              <p className="mt-2 max-w-xl text-sm text-[#6D716C]">The dishes neighbors are returning to, rated by real customers.</p>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#24483A]"><ShieldCheck className="h-4 w-4" /> Separate from verified status</div>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {trendingMeals.map((meal) => <MealRow key={meal.id} meal={meal} accent="trending" />)}
          </div>
        </div>
      </section>

      <section className="bg-[#EDE5D8]/50 py-16">
        <div className="mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <div><span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#B86B4B]">From the table</span><h2 className="mt-1 font-serif text-3xl font-bold text-[#24483A]">Customer Ratings & Reviews</h2></div>
            <div className="hidden items-center gap-1 text-sm font-bold text-[#202522] sm:flex"><Star className="h-4 w-4 fill-[#C8A96B] text-[#C8A96B]" /> 4.96 average</div>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">{featuredReviews.map((review) => <ReviewCard key={review.id} review={review} />)}</div>
        </div>
      </section>

      <section className="bg-[#F8F5EF] py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center"><span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#B86B4B]">Need to know</span><h2 className="mt-1 font-serif text-3xl font-bold text-[#24483A]">Frequently Asked Questions</h2></div>
          <div className="divide-y divide-[#2025221a] border-y border-[#2025221a]">
            {FAQS.map(([question, answer], index) => (
              <div key={question}>
                <button onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index} className="flex w-full items-center justify-between gap-4 py-5 text-left font-serif text-lg font-bold text-[#202522]">
                  <span>{question}</span><ChevronDown className={`h-5 w-5 shrink-0 text-[#B86B4B] transition-transform ${openFaq === index ? "rotate-180" : ""}`} />
                </button>
                {openFaq === index && <p className="max-w-2xl pb-5 pr-8 text-sm leading-relaxed text-[#6D716C]">{answer}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
