import React from "react";
import { ShieldCheck, Heart, Users, MapPin } from "lucide-react";

export const TrustStrip: React.FC = () => {
  return (
    <section className="bg-[#F8F5EF] pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Bento Trust Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#2025221a] rounded-[14px] overflow-hidden border border-[#2025221a] shadow-2xs">
          
          <div className="bg-[#F8F5EF] p-5 sm:p-6 flex flex-col justify-between hover:bg-[#F4EFE6] transition-colors">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#6D716C]">
                Food Safety
              </span>
              <div className="w-7 h-7 rounded-[6px] bg-[#24483A]/10 flex items-center justify-center text-[#24483A]">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
            <div>
              <h4 className="text-[13px] font-bold text-[#202522] uppercase tracking-wider">
                100% FSA Audited
              </h4>
              <p className="text-xs text-[#6D716C] mt-0.5">
                Level 2 hygiene certified
              </p>
            </div>
          </div>

          <div className="bg-[#F8F5EF] p-5 sm:p-6 flex flex-col justify-between hover:bg-[#F4EFE6] transition-colors">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#6D716C]">
                Fair Economy
              </span>
              <div className="w-7 h-7 rounded-[6px] bg-[#B86B4B]/10 flex items-center justify-center text-[#B86B4B]">
                <Heart className="w-4 h-4" />
              </div>
            </div>
            <div>
              <h4 className="text-[13px] font-bold text-[#202522] uppercase tracking-wider">
                Direct Fair Earnings
              </h4>
              <p className="text-xs text-[#6D716C] mt-0.5">
                88%+ direct to cooks + tips
              </p>
            </div>
          </div>

          <div className="bg-[#F8F5EF] p-5 sm:p-6 flex flex-col justify-between hover:bg-[#F4EFE6] transition-colors">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#6D716C]">
                Solidarity
              </span>
              <div className="w-7 h-7 rounded-[6px] bg-[#24483A]/10 flex items-center justify-center text-[#24483A]">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div>
              <h4 className="text-[13px] font-bold text-[#202522] uppercase tracking-wider">
                Community-Led
              </h4>
              <p className="text-xs text-[#6D716C] mt-0.5">
                Verified neighbor reviews
              </p>
            </div>
          </div>

          <div className="bg-[#F8F5EF] p-5 sm:p-6 flex flex-col justify-between hover:bg-[#F4EFE6] transition-colors">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#6D716C]">
                Neighborhood
              </span>
              <div className="w-7 h-7 rounded-[6px] bg-[#C8A96B]/20 flex items-center justify-center text-[#24483A]">
                <MapPin className="w-4 h-4" />
              </div>
            </div>
            <div>
              <h4 className="text-[13px] font-bold text-[#202522] uppercase tracking-wider">
                Fresh Local Pots
              </h4>
              <p className="text-xs text-[#6D716C] mt-0.5">
                Simmered today in London
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
