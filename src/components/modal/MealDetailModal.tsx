import React, { useState, useMemo, useEffect } from "react";
import { useApp } from "../../context/AppContext";
import { 
  X, 
  Star, 
  Clock, 
  Plus, 
  Minus, 
  ShieldCheck, 
  Heart, 
  MapPin, 
  AlertCircle, 
  ShoppingBag, 
  ArrowRight,
  Sparkles,
  RotateCcw
} from "lucide-react";
import { ReviewCard } from "../cards/ReviewCard";
import { MealCustomizer } from "../meal/MealCustomizer";
import { MealCustomizationGroup, MealCustomizationOption, SelectedCustomization } from "../../types";

export const MealDetailModal: React.FC = () => {
  const { 
    activeMealModal, 
    setActiveMealModal, 
    addToCart, 
    navigateToKitchen, 
    reviews, 
    cooks,
    formatPrice
  } = useApp();

  const [quantity, setQuantity] = useState(1);
  const [instructions, setInstructions] = useState("");
  const [selections, setSelections] = useState<Record<string, string[]>>({});
  const [missingGroupIds, setMissingGroupIds] = useState<string[]>([]);

  // Initialize selections whenever active meal changes
  useEffect(() => {
    if (!activeMealModal) {
      setSelections({});
      setMissingGroupIds([]);
      setQuantity(1);
      setInstructions("");
      return;
    }

    // Set default selections for required single groups if available
    const initial: Record<string, string[]> = {};
    if (activeMealModal.customizationGroups) {
      activeMealModal.customizationGroups.forEach((group) => {
        if (group.required && group.type === "single" && group.options.length > 0) {
          initial[group.id] = [group.options[0].id];
        } else {
          initial[group.id] = [];
        }
      });
    }
    setSelections(initial);
    setMissingGroupIds([]);
    setQuantity(1);
    setInstructions("");
  }, [activeMealModal]);

  const meal = activeMealModal;
  const cook = meal ? cooks.find((c) => c.id === meal.cookId) || cooks[0] : cooks[0];
  const mealReviews = meal ? reviews.filter((r) => r.cookId === meal.cookId || r.mealId === meal.id) : [];

  // Toggle option handler
  const handleToggleOption = (group: MealCustomizationGroup, option: MealCustomizationOption) => {
    setSelections((prev) => {
      const current = prev[group.id] || [];
      if (group.type === "single") {
        return {
          ...prev,
          [group.id]: [option.id]
        };
      } else {
        // Multi selection
        if (current.includes(option.id)) {
          return {
            ...prev,
            [group.id]: current.filter((id) => id !== option.id)
          };
        } else {
          if (group.maxSelections && current.length >= group.maxSelections) {
            return prev; // Reached max
          }
          return {
            ...prev,
            [group.id]: [...current, option.id]
          };
        }
      }
    });

    // Clear missing error if answered
    if (missingGroupIds.includes(group.id)) {
      setMissingGroupIds((prev) => prev.filter((id) => id !== group.id));
    }
  };

  // Convert current selections to SelectedCustomization array
  const selectedCustomizationList: SelectedCustomization[] = useMemo(() => {
    if (!meal || !meal.customizationGroups) return [];
    const list: SelectedCustomization[] = [];

    meal.customizationGroups.forEach((group) => {
      const selectedIds = selections[group.id] || [];
      selectedIds.forEach((optId) => {
        const found = group.options.find((o) => o.id === optId);
        if (found) {
          list.push({
            groupId: group.id,
            groupTitle: group.title,
            optionId: found.id,
            optionName: found.name,
            price: found.price
          });
        }
      });
    });

    return list;
  }, [meal, selections]);

  // Extra price per portion
  const extraPricePerUnit = useMemo(() => {
    return selectedCustomizationList.reduce((sum, item) => sum + item.price, 0);
  }, [selectedCustomizationList]);

  const unitPrice = meal ? meal.price + extraPricePerUnit : 0;
  const totalPrice = meal ? unitPrice * quantity : 0;

  const handleResetSelections = () => {
    if (!meal) return;
    const initial: Record<string, string[]> = {};
    if (meal.customizationGroups) {
      meal.customizationGroups.forEach((group) => {
        if (group.required && group.type === "single" && group.options.length > 0) {
          initial[group.id] = [group.options[0].id];
        } else {
          initial[group.id] = [];
        }
      });
    }
    setSelections(initial);
    setMissingGroupIds([]);
  };

  const handleAdd = () => {
    if (!meal) return;
    // Validate required groups only when actual customization data exists
    if (hasCustomizations) {
      const missing = meal.customizationGroups!
        .filter((g) => g.required && (!selections[g.id] || selections[g.id].length === 0))
        .map((g) => g.id);

      if (missing.length > 0) {
        setMissingGroupIds(missing);
        const element = document.getElementById(`custom-group-${missing[0]}`);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        return;
      }
    }

    addToCart(meal, quantity, instructions, selectedCustomizationList);
    setActiveMealModal(null);
  };

  const hasCustomizations = Boolean(meal && meal.customizationGroups && meal.customizationGroups.length > 0);

  if (!meal) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true" aria-labelledby="modal-meal-title">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={() => setActiveMealModal(null)}
      />

      <div className="min-h-full flex items-center justify-center p-3 sm:p-6 text-center">
        <div className="w-full max-w-3xl bg-[#F8F5EF] rounded-2xl overflow-hidden shadow-2xl border border-[#EDE5D8] text-left transform transition-all animate-in zoom-in-95 my-6 sm:my-8 flex flex-col max-h-[90vh]">
          
          {/* Header Image */}
          <div className="relative aspect-16/9 sm:aspect-21/9 w-full bg-[#EDE5D8] shrink-0">
            <img
              src={meal.imageUrl}
              alt={meal.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
            
            <button
              onClick={() => setActiveMealModal(null)}
              className="absolute top-4 right-4 bg-white/90 hover:bg-white text-[#202522] p-2 rounded-full shadow-md transition-colors z-10"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Badges on Image */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
              {meal.dietary.map((diet) => (
                <span key={diet} className="bg-[#24483A]/90 text-white text-xs font-semibold px-3 py-1 rounded-md">
                  {diet}
                </span>
              ))}
              {hasCustomizations && (
                <span className="bg-[#B86B4B] text-white text-xs font-bold px-3 py-1 rounded-md flex items-center gap-1 shadow-xs">
                  <Sparkles className="w-3.5 h-3.5" />
                  Customisable Plate
                </span>
              )}
            </div>

            {/* Title Overlap */}
            <div className="absolute bottom-4 left-6 right-6 text-white">
              <span className="text-xs font-semibold text-[#C8A96B] uppercase tracking-wider">
                {meal.category} Specialty
              </span>
              <h2 id="modal-meal-title" className="font-serif text-2xl sm:text-3xl font-bold mt-1 leading-tight drop-shadow-sm">
                {meal.name}
              </h2>
            </div>
          </div>

          {/* Modal Scrollable Body */}
          <div className="p-6 sm:p-8 space-y-8 overflow-y-auto flex-1">
            
            {/* Cook Banner */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white rounded-xl border border-[#EDE5D8]">
              <div 
                className="flex items-center gap-3 cursor-pointer group"
                onClick={() => {
                  setActiveMealModal(null);
                  navigateToKitchen(cook.id);
                }}
              >
                <img
                  src={cook.avatar}
                  alt={cook.name}
                  className="w-12 h-12 rounded-xl object-cover border border-[#EDE5D8]"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-base font-bold text-[#202522] group-hover:text-[#24483A] transition-colors">
                      {cook.name}
                    </span>
                    <span className="text-xs text-[#24483A] bg-[#24483A]/10 px-2 py-0.5 rounded font-medium">
                      Verified Cook
                    </span>
                  </div>
                  <p className="text-xs text-[#6D716C]">
                    {cook.kitchenName} • {cook.location}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1 font-bold text-[#202522]">
                  <Star className="w-4 h-4 fill-[#C8A96B] text-[#C8A96B]" />
                  <span>{meal.rating.toFixed(2)}</span>
                  <span className="text-[#6D716C] font-normal">({meal.reviewCount} reviews)</span>
                </div>
                <button
                  onClick={() => {
                    setActiveMealModal(null);
                    navigateToKitchen(cook.id);
                  }}
                  className="text-xs font-semibold text-[#24483A] hover:underline flex items-center gap-1"
                >
                  View Kitchen <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Story & Description */}
            <div className="space-y-3">
              <h3 className="font-serif text-xl font-bold text-[#202522]">
                How This Dish Is Made
              </h3>
              <p className="text-sm text-[#202522] leading-relaxed">
                {meal.longDescription || meal.description}
              </p>
            </div>

            {/* BUILD YOUR OWN MEAL / CUSTOMIZATION ENGINE */}
            {hasCustomizations && (
              <div className="bg-[#F8F5EF] rounded-2xl border border-[#EDE5D8] p-5 sm:p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-[#B86B4B]">
                      Interactive Station
                    </span>
                    <h3 className="font-serif text-xl font-bold text-[#202522]">
                      Build Your Custom Meal
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={handleResetSelections}
                    className="text-xs font-semibold text-[#6D716C] hover:text-[#202522] flex items-center gap-1 bg-white px-2.5 py-1 rounded-lg border border-[#EDE5D8]"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset</span>
                  </button>
                </div>

                <MealCustomizer
                  meal={meal}
                  selections={selections}
                  onToggleOption={handleToggleOption}
                  missingRequiredGroupIds={missingGroupIds}
                />

                {/* Live Customization Summary Pill Strip */}
                {selectedCustomizationList.length > 0 && (
                  <div className="bg-white p-4 rounded-xl border border-[#EDE5D8] space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#6D716C] block">
                      Your Custom Plate Summary:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedCustomizationList.map((cust) => (
                        <span
                          key={`${cust.groupId}-${cust.optionId}`}
                          className="bg-[#24483A]/10 text-[#24483A] text-xs font-medium px-2.5 py-1 rounded-md border border-[#24483A]/20 flex items-center gap-1"
                        >
                          <span>{cust.optionName}</span>
                          {cust.price > 0 && (
                            <span className="text-[11px] font-bold text-[#B86B4B]">
                              (+£{cust.price.toFixed(2)})
                            </span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Ingredients & Allergens Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-white p-5 rounded-xl border border-[#EDE5D8]">
              
              {/* Ingredients */}
              <div>
                <h4 className="font-serif text-sm font-bold text-[#202522] mb-3 uppercase tracking-wider text-[11px] text-[#6D716C]">
                  Ingredients Used
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {meal.ingredients.map((ing) => (
                    <span
                      key={ing}
                      className="bg-[#F8F5EF] text-[#202522] text-xs px-2.5 py-1 rounded-md border border-[#EDE5D8]"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              {/* Allergens & Hygiene */}
              <div>
                <h4 className="font-serif text-sm font-bold text-[#202522] mb-3 uppercase tracking-wider text-[11px] text-[#6D716C]">
                  Allergen Disclosures
                </h4>
                <div className="space-y-2 text-xs">
                  {meal.allergens.map((all) => (
                    <div key={all} className="flex items-center gap-2 text-[#6D716C]">
                      <AlertCircle className="w-3.5 h-3.5 text-[#B86B4B]" />
                      <span>{all}</span>
                    </div>
                  ))}
                  <div className="pt-2 flex items-center gap-1.5 text-[#24483A] font-semibold border-t border-[#EDE5D8]/80">
                    <ShieldCheck className="w-4 h-4 text-[#24483A]" />
                    <span>Food Hygiene Rated: {cook.hygieneRating}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Preparation & Portions Notice */}
            <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-[#6D716C] bg-[#EDE5D8]/40 p-4 rounded-xl border border-[#EDE5D8]">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#B86B4B]" />
                <span>Simmer time: <strong>{meal.preparationTime}</strong></span>
              </div>
              <div>
                <span>Portions remaining today: <strong>{meal.portionsAvailable} portions</strong></span>
              </div>
              <div>
                <span>Fulfillment: <strong>Collection or Local Delivery</strong></span>
              </div>
            </div>

            {/* Special Instructions Input */}
            <div>
              <label htmlFor="dish-notes" className="block text-xs font-semibold text-[#202522] mb-1.5">
                Note for {cook.name} (optional dietary nuance or packaging preference)
              </label>
              <input
                id="dish-notes"
                type="text"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="e.g. Please keep sauce separated or extra lemon slice"
                className="w-full text-xs px-3.5 py-2.5 bg-white border border-[#EDE5D8] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#24483A]"
              />
            </div>

            {/* Recent Reviews for Cook / Dish */}
            {mealReviews.length > 0 && (
              <div className="space-y-3 pt-2">
                <h4 className="font-serif text-lg font-bold text-[#202522]">
                  Community Reviews
                </h4>
                <div className="space-y-3">
                  {mealReviews.slice(0, 2).map((rev) => (
                    <ReviewCard key={rev.id} review={rev} />
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Action Bar (Sticky Footer) */}
          <div className="p-4 sm:p-6 bg-white border-t border-[#EDE5D8] flex flex-wrap items-center justify-between gap-4 shrink-0 shadow-lg">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-xs text-[#6D716C]">Total:</span>
                <span className="font-sans text-2xl font-bold text-[#24483A]">
                  {formatPrice(totalPrice)}
                </span>
                {extraPricePerUnit > 0 && (
                  <span className="text-[11px] text-[#B86B4B] font-semibold">
                    (incl. +{formatPrice(extraPricePerUnit * quantity)} options)
                  </span>
                )}
              </div>
              <span className="text-[11px] text-[#6D716C] block">
                {formatPrice(unitPrice)} per plate
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* Quantity */}
              <div className="flex items-center border border-[#EDE5D8] rounded-xl bg-[#F8F5EF] p-1">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 text-[#6D716C] hover:text-[#202522]"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-3 text-sm font-bold text-[#202522]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(Math.min(meal.portionsAvailable, quantity + 1))}
                  className="p-2 text-[#6D716C] hover:text-[#202522]"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add Button */}
              <button
                type="button"
                onClick={handleAdd}
                className="flex items-center gap-2 bg-[#24483A] hover:bg-[#193329] text-white px-6 py-3.5 rounded-xl font-semibold text-sm shadow-md transition-all active:scale-98"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{hasCustomizations ? "Add Custom Plate" : "Add to Basket"}</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

