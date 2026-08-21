import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { 
  ShieldCheck, 
  Users, 
  ChefHat, 
  DollarSign, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  AlertTriangle, 
  Eye, 
  FileText, 
  Sparkles,
  ArrowRight
} from "lucide-react";

export const AdminDashboard: React.FC = () => {
  const { applications, approveCookApplication, cooks, meals, orders, addToast } = useApp();
  const [activeTab, setActiveTab] = useState<"applications" | "kitchens" | "financials">("applications");

  const pendingApps = applications.filter((a) => a.status === "pending");
  const totalGMV = orders.reduce((sum, o) => sum + o.total, 0) + 14250.00;
  const cookPayouts = (totalGMV * 0.88) + 1850.00;

  return (
    <div className="py-10 bg-[#F8F5EF] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EDE5D8] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#B86B4B]">
                KindTable Operations
              </span>
              <span className="bg-[#24483A] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                Admin Console
              </span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#202522] mt-1">
              Platform & Verification Oversight
            </h1>
            <p className="text-xs text-[#6D716C]">
              Safety audits, cook application vetting, and transparent community revenue ledger.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-[#24483A] bg-[#24483A]/5 border border-[#24483A]/20 px-4 py-2 rounded-xl">
            <ShieldCheck className="w-4 h-4 text-[#24483A]" />
            <span>FSA Compliance Sync: Active</span>
          </div>
        </div>

        {/* High-level Platform Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-[#EDE5D8] shadow-2xs">
            <span className="text-xs text-[#6D716C] block">Pending Applications</span>
            <span className="font-serif text-2xl sm:text-3xl font-bold text-[#B86B4B] block mt-1">
              {pendingApps.length}
            </span>
            <span className="text-[11px] text-[#6D716C]">Awaiting safety review</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#EDE5D8] shadow-2xs">
            <span className="text-xs text-[#6D716C] block">Verified Kitchens</span>
            <span className="font-serif text-2xl sm:text-3xl font-bold text-[#24483A] block mt-1">
              {cooks.length}
            </span>
            <span className="text-[11px] text-[#24483A] font-medium">100% FSA Level 2</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#EDE5D8] shadow-2xs">
            <span className="text-xs text-[#6D716C] block">Total Direct Cook Payouts</span>
            <span className="font-serif text-2xl sm:text-3xl font-bold text-[#202522] block mt-1">
              £{cookPayouts.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span className="text-[11px] text-[#6D716C]">88% direct + tips</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#EDE5D8] shadow-2xs">
            <span className="text-xs text-[#6D716C] block">Meals Prepared & Served</span>
            <span className="font-serif text-2xl sm:text-3xl font-bold text-[#24483A] block mt-1">
              2,894+
            </span>
            <span className="text-[11px] text-[#6D716C]">Across London boroughs</span>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-2 border-b border-[#EDE5D8] pb-1">
          <button
            onClick={() => setActiveTab("applications")}
            className={`pb-3 px-3 text-xs sm:text-sm font-bold transition-all relative ${
              activeTab === "applications" ? "text-[#24483A]" : "text-[#6D716C] hover:text-[#202522]"
            }`}
          >
            Cook Onboarding Pipeline ({applications.length})
            {activeTab === "applications" && <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#24483A]" />}
          </button>

          <button
            onClick={() => setActiveTab("kitchens")}
            className={`pb-3 px-3 text-xs sm:text-sm font-bold transition-all relative ${
              activeTab === "kitchens" ? "text-[#24483A]" : "text-[#6D716C] hover:text-[#202522]"
            }`}
          >
            Active Verified Kitchens ({cooks.length})
            {activeTab === "kitchens" && <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#24483A]" />}
          </button>

          <button
            onClick={() => setActiveTab("financials")}
            className={`pb-3 px-3 text-xs sm:text-sm font-bold transition-all relative ${
              activeTab === "financials" ? "text-[#24483A]" : "text-[#6D716C] hover:text-[#202522]"
            }`}
          >
            Fair Community Revenue Model
            {activeTab === "financials" && <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#24483A]" />}
          </button>
        </div>

        {/* TAB 1: Applications */}
        {activeTab === "applications" && (
          <div className="space-y-4">
            {applications.map((app) => (
              <div
                key={app.id}
                className="bg-white p-6 rounded-2xl border border-[#EDE5D8] shadow-xs space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-[#EDE5D8] pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-serif text-lg font-bold text-[#202522]">
                        {app.kitchenName}
                      </h3>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                          app.status === "approved"
                            ? "bg-emerald-100 text-emerald-800"
                            : app.status === "pending"
                            ? "bg-amber-100 text-amber-900"
                            : "bg-blue-100 text-blue-900"
                        }`}
                      >
                        {app.status}
                      </span>
                    </div>

                    <p className="text-xs text-[#6D716C] mt-1">
                      Applicant: <strong className="text-[#202522]">{app.name}</strong> • {app.postcode} • Applied {app.appliedDate}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {app.status === "pending" && (
                      <button
                        onClick={() => approveCookApplication(app.id)}
                        className="flex items-center gap-1.5 bg-[#24483A] hover:bg-[#193329] text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-xs"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C8A96B]" />
                        <span>Approve & Provision Kitchen</span>
                      </button>
                    )}
                    {app.status === "approved" && (
                      <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                        ✓ Kitchen Live on Marketplace
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="p-3 bg-[#F8F5EF] rounded-xl border border-[#EDE5D8]">
                    <span className="text-[#6D716C] block mb-1">Cuisine & Specialties</span>
                    <strong className="text-[#202522]">{app.specialties}</strong>
                  </div>

                  <div className="p-3 bg-[#F8F5EF] rounded-xl border border-[#EDE5D8]">
                    <span className="text-[#6D716C] block mb-1">Food Safety Status</span>
                    <strong className="text-[#24483A]">{app.foodHygieneLevel}</strong>
                  </div>

                  <div className="p-3 bg-[#F8F5EF] rounded-xl border border-[#EDE5D8]">
                    <span className="text-[#6D716C] block mb-1">Batch Output & Contact</span>
                    <strong className="text-[#202522]">{app.portionsPerDay} ({app.phone})</strong>
                  </div>
                </div>

                {app.story && (
                  <p className="text-xs text-[#202522] italic bg-[#F8F5EF] p-3 rounded-xl border border-[#EDE5D8]">
                    "{app.story}"
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: Kitchens */}
        {activeTab === "kitchens" && (
          <div className="bg-white rounded-2xl border border-[#EDE5D8] overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#EDE5D8]/50 border-b border-[#EDE5D8] text-[#202522] font-serif">
                  <tr>
                    <th className="p-4">Kitchen & Cook</th>
                    <th className="p-4">Location</th>
                    <th className="p-4">Hygiene Cert No</th>
                    <th className="p-4">Meals Served</th>
                    <th className="p-4">Rating</th>
                    <th className="p-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EDE5D8]">
                  {cooks.map((cook) => (
                    <tr key={cook.id} className="hover:bg-[#F8F5EF]">
                      <td className="p-4 flex items-center gap-3">
                        <img src={cook.avatar} alt={cook.name} className="w-8 h-8 rounded-lg object-cover" />
                        <div>
                          <strong className="text-[#202522] block">{cook.kitchenName}</strong>
                          <span className="text-[#6D716C]">{cook.name}</span>
                        </div>
                      </td>
                      <td className="p-4 text-[#202522]">{cook.location}</td>
                      <td className="p-4 font-mono text-[#24483A]">{cook.foodSafetyCertNo}</td>
                      <td className="p-4 font-bold text-[#202522]">{cook.mealsServed}+</td>
                      <td className="p-4 font-bold text-[#202522]">{cook.rating.toFixed(2)}★</td>
                      <td className="p-4 text-right">
                        <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px]">
                          Audited Active
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: Financials */}
        {activeTab === "financials" && (
          <div className="bg-white p-8 rounded-3xl border border-[#EDE5D8] space-y-6">
            <h3 className="font-serif text-2xl font-bold text-[#202522]">
              Ethical 88/12 Revenue Distribution Model
            </h3>
            <p className="text-xs text-[#6D716C] leading-relaxed max-w-3xl">
              Unlike commercial delivery aggregators taking up to 35% commission and forcing loss-leader discounts, KindTableEats strictly guarantees that at least 88% of meal revenue goes directly to the cook, plus 100% of tips.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-[#EDE5D8]">
              <div className="p-5 bg-[#F8F5EF] rounded-2xl border border-[#EDE5D8] space-y-2">
                <span className="text-xs font-bold text-[#24483A]">88% Cook Take-Home</span>
                <p className="text-xs text-[#6D716C]">
                  Reinvested directly into household autonomy, children's schooling, and family stability.
                </p>
              </div>

              <div className="p-5 bg-[#F8F5EF] rounded-2xl border border-[#EDE5D8] space-y-2">
                <span className="text-xs font-bold text-[#B86B4B]">100% Customer Tips</span>
                <p className="text-xs text-[#6D716C]">
                  Zero platform retention. Every penny tipped goes directly into the cook's weekly payout.
                </p>
              </div>

              <div className="p-5 bg-[#F8F5EF] rounded-2xl border border-[#EDE5D8] space-y-2">
                <span className="text-xs font-bold text-[#202522]">12% Platform Operations</span>
                <p className="text-xs text-[#6D716C]">
                  Funds FSA safety onboarding, compostable packaging supply, and customer support.
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
