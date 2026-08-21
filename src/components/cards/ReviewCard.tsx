import React from "react";
import { Review } from "../../types";
import { Star, ShieldCheck } from "lucide-react";

interface ReviewCardProps {
  review: Review;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-[#EDE5D8] flex flex-col justify-between shadow-xs">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {review.customerAvatar ? (
              <img
                src={review.customerAvatar}
                alt={review.customerName}
                className="w-10 h-10 rounded-full object-cover border border-[#EDE5D8]"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-[#EDE5D8] text-[#24483A] font-semibold flex items-center justify-center text-sm">
                {review.customerName.charAt(0)}
              </div>
            )}
            <div>
              <h5 className="font-serif text-base font-bold text-[#202522] leading-tight">
                {review.customerName}
              </h5>
              <div className="flex items-center gap-2 text-xs text-[#6D716C]">
                <span>{review.date}</span>
                {review.verifiedPurchase && (
                  <>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-[#24483A] font-medium">
                      <ShieldCheck className="w-3 h-3 text-[#24483A]" /> Verified Meal
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Stars */}
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < review.rating
                    ? "fill-[#C8A96B] text-[#C8A96B]"
                    : "text-[#D9D0C1]"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Meal Tag if present */}
        {review.mealName && (
          <div className="mb-3 inline-block bg-[#F8F5EF] text-[#24483A] px-2.5 py-1 rounded-md text-xs font-medium border border-[#EDE5D8]">
            Ordered: {review.mealName}
          </div>
        )}

        {/* Comment Text */}
        <p className="text-sm text-[#202522] leading-relaxed italic">
          "{review.comment}"
        </p>
      </div>
    </div>
  );
};
