import React from "react";
import { Meal, MealCustomizationGroup, MealCustomizationOption } from "../../types";
import { Check, Flame, Plus, Sparkles, AlertCircle } from "lucide-react";
import { useApp } from "../../context/AppContext";

interface MealCustomizerProps {
  meal: Meal;
  selections: Record<string, string[]>;
  onToggleOption: (group: MealCustomizationGroup, option: MealCustomizationOption) => void;
  missingRequiredGroupIds?: string[];
}

export const MealCustomizer: React.FC<MealCustomizerProps> = ({
  meal,
  selections,
  onToggleOption,
  missingRequiredGroupIds = []
}) => {
  const { formatPrice } = useApp();
  if (!meal.customizationGroups || meal.customizationGroups.length === 0) {
    return null;
  }

  const getHeatIcon = (optionId: string, optionName: string) => {
    const lower = (optionId + " " + optionName).toLowerCase();
    if (lower.includes("extra") || lower.includes("fire") || lower.includes("high") || lower.includes("scotch")) {
      return { count: 3, color: "text-[#B86B4B]" };
    }
    if (lower.includes("medium") || lower.includes("warm") || lower.includes("med")) {
      return { count: 2, color: "text-[#D97706]" };
    }
    if (lower.includes("mild") || lower.includes("gentle") || lower.includes("no pepper")) {
      return { count: 1, color: "text-[#10B981]" };
    }
    return null;
  };

  return (
    <section className="space-y-6 pt-2" aria-labelledby="customizer-heading">
      <div className="flex items-center justify-between border-b border-[#EDE5D8] pb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#24483A]/10 flex items-center justify-center text-[#24483A]">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 id="customizer-heading" className="font-serif text-lg font-bold text-[#202522]">
              Build & Customise Your Plate
            </h3>
            <p className="text-xs text-[#6D716C]">
              Freshly tailored by {meal.cookName} to your exact taste & dietary preferences.
            </p>
          </div>
        </div>
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#24483A] bg-[#24483A]/10 px-2.5 py-1 rounded-md">
          {meal.customizationGroups.length} Steps
        </span>
      </div>

      <div className="space-y-5">
        {meal.customizationGroups.map((group, groupIdx) => {
          const selectedOptionIds = selections[group.id] || [];
          const isSingle = group.type === "single";
          const isMissing = missingRequiredGroupIds.includes(group.id);

          return (
            <div
              key={group.id}
              id={`custom-group-${group.id}`}
              className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 ${
                isMissing
                  ? "bg-red-50/70 border-red-300 ring-2 ring-red-400/40"
                  : "bg-white border-[#EDE5D8] shadow-xs"
              }`}
            >
              {/* Group Title and Requirement Badge */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#24483A] bg-[#F8F5EF] border border-[#EDE5D8] px-2 py-0.5 rounded-md">
                      Step 0{groupIdx + 1}
                    </span>
                    <h4 className="font-serif text-sm sm:text-base font-bold text-[#202522]">
                      {group.title}
                    </h4>
                  </div>
                  {group.description && (
                    <p className="text-xs text-[#6D716C] mt-1">
                      {group.description}
                    </p>
                  )}
                </div>

                <div className="shrink-0 flex items-center gap-1.5">
                  {group.required ? (
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                        selectedOptionIds.length > 0
                          ? "bg-[#24483A]/10 text-[#24483A]"
                          : isMissing
                          ? "bg-red-600 text-white animate-pulse"
                          : "bg-[#B86B4B]/15 text-[#B86B4B]"
                      }`}
                    >
                      {selectedOptionIds.length > 0 ? "✓ Selected" : "Required"}
                    </span>
                  ) : (
                    <span className="text-[10px] font-semibold text-[#6D716C] bg-[#F8F5EF] px-2 py-0.5 rounded-md border border-[#EDE5D8]">
                      Optional {group.maxSelections ? `(Max ${group.maxSelections})` : ""}
                    </span>
                  )}
                </div>
              </div>

              {isMissing && (
                <div className="flex items-center gap-1.5 text-xs text-red-700 font-medium mb-3 bg-red-100/80 p-2 rounded-lg">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>Please choose an option for {group.title} before adding to basket.</span>
                </div>
              )}

              {/* Options Grid / List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {group.options.map((option) => {
                  const isSelected = selectedOptionIds.includes(option.id);
                  const heat = getHeatIcon(option.id, option.name);

                  return (
                    <button
                      type="button"
                      key={option.id}
                      onClick={() => onToggleOption(group, option)}
                      className={`group/opt flex items-center justify-between p-3 rounded-xl border text-left transition-all duration-150 relative ${
                        isSelected
                          ? "bg-[#24483A]/6 border-[#24483A] ring-1.5 ring-[#24483A] shadow-xs"
                          : "bg-[#F8F5EF]/60 hover:bg-[#F8F5EF] border-[#EDE5D8] hover:border-[#D9D0C1]"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0 pr-2">
                        {/* Selector Indicator */}
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border transition-all ${
                            isSingle ? "rounded-full" : "rounded-md"
                          } ${
                            isSelected
                              ? "bg-[#24483A] border-[#24483A] text-white"
                              : "border-[#D9D0C1] bg-white group-hover/opt:border-[#24483A]/60"
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>

                        {/* Option Text */}
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span
                              className={`text-xs font-semibold leading-tight truncate ${
                                isSelected ? "text-[#202522] font-bold" : "text-[#202522]"
                              }`}
                            >
                              {option.name}
                            </span>
                            {heat && (
                              <span className={`flex items-center text-[10px] ${heat.color}`}>
                                {Array.from({ length: heat.count }).map((_, i) => (
                                  <Flame key={i} className="w-3 h-3 fill-current inline-block" />
                                ))}
                              </span>
                            )}
                          </div>

                          {(option.description || option.calories) && (
                            <p className="text-[11px] text-[#6D716C] truncate mt-0.5">
                              {option.description}
                              {option.calories && ` • ${option.calories} kcal`}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Price Badge */}
                      <div className="shrink-0 text-right">
                        {option.price === 0 ? (
                          <span className="text-[11px] font-semibold text-[#24483A]">
                            Included
                          </span>
                        ) : (
                          <span
                            className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                              isSelected
                                ? "bg-[#24483A] text-white"
                                : "bg-[#EDE5D8] text-[#202522]"
                            }`}
                          >
                            +{formatPrice(option.price)}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Multi-selection progress counter */}
              {!isSingle && group.maxSelections && (
                <div className="mt-2 text-right">
                  <span className="text-[10px] text-[#6D716C]">
                    Selected: {selectedOptionIds.length} / {group.maxSelections}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
