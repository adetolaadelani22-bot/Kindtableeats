import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { 
  Heart, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  ChefHat, 
  Clock, 
  DollarSign,
  HelpCircle,
  UploadCloud,
  CreditCard,
  Utensils,
  MapPin,
  FileCheck
} from "lucide-react";
import { MealCategory } from "../../types";

export const BecomeACookPage: React.FC = () => {
  const { 
    submitCookApplication, 
    setCurrentRoute, 
    setUserRole, 
    addMeal,
    addToast 
  } = useApp();

  const [step, setStep] = useState<number>(1);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Identity & Kitchen
    name: "",
    email: "",
    phone: "",
    postcode: "SE15 4QL",
    kitchenName: "",
    story: "",
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
    
    // Step 2: Specialties & Batches
    specialties: "West African, Jollof & Suya",
    experienceYears: "5+ years home cooking",
    portionsPerDay: "15-25 portions",
    prepTime: "30-45 mins",
    
    // Step 3: Food Hygiene & Compliance
    foodHygieneLevel: "Certified Level 2 Food Hygiene",
    councilRegistrationNumber: "FSA-LBH-88219",
    hasThermometer: true,
    hasAllergenAwareness: true,
    agreedToTerms: true,

    // Step 4: Bank Details for Payouts
    bankName: "Barclays UK",
    accountHolder: "",
    sortCode: "20-40-71",
    accountNumber: "83920194",
    payoutFrequency: "Weekly on Fridays",

    // Step 5: Signature First Dish
    dishName: "",
    dishCategory: "West African" as MealCategory,
    dishPrice: 12.50,
    dishDescription: "",
    dishIngredients: "Rice, Plum Tomatoes, Scotch Bonnet, Ginger, Garlic, Thyme, Plantain",
    dishAllergens: "None (Nut-free, Halal)",
    dishPrepTime: "40 mins",
    dishImageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600"
  });

  const handleChange = (field: string, val: any) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  const handleCompleteSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Submit application to context
    submitCookApplication({
      fullName: formData.name || "Chef Applicant",
      phone: formData.phone || "+44 7700 900222",
      email: formData.email || "chef@kindtableeats.org",
      kitchenName: formData.kitchenName || "Heritage Home Kitchen",
      city: "London",
      neighborhood: formData.postcode || "SE15",
      specialties: [formData.specialties],
      foodCertNumber: formData.councilRegistrationNumber || "FSA-LBH-88219",
      idDocumentName: "Level_2_Hygiene_Certificate.pdf",
      story: formData.story || "Passionate home cook preparing heritage family recipes for my local neighbors.",
      signatureDish: formData.dishName || "Signature Heritage Special",
      payoutInfo: {
        bankName: formData.bankName,
        accountNumber: formData.accountNumber,
        holderName: formData.accountHolder || formData.name
      }
    });

    // 2. Add signature dish if provided
    if (formData.dishName.trim()) {
      addMeal({
        cookId: "cook-amara",
        cookName: formData.name || "Chef",
        cookAvatar: formData.avatarUrl,
        kitchenName: formData.kitchenName || "Heritage Kitchen",
        name: formData.dishName,
        description: formData.dishDescription || "Authentic home-cooked specialty made from scratch with fresh local ingredients.",
        longDescription: formData.dishDescription || "Crafted using generational family recipes and traditional spices.",
        price: Number(formData.dishPrice) || 12.50,
        category: formData.dishCategory,
        imageUrl: formData.dishImageUrl,
        preparationTime: formData.dishPrepTime,
        portionsAvailable: 20,
        dietary: ["Halal", "High-Protein"],
        ingredients: formData.dishIngredients.split(",").map(i => i.trim()),
        allergens: [formData.dishAllergens],
        pickupAvailable: true,
        deliveryAvailable: true
      });
    }

    setIsSubmitted(true);
  };

  const handleEnterCookDashboard = () => {
    setUserRole("seller");
    addToast({
      title: `Welcome, Chef ${formData.name || "Amara"}!`,
      message: "Your kitchen hub is now active. Manage orders and menu items.",
      type: "success"
    });
    setCurrentRoute("seller-dashboard");
  };

  if (isSubmitted) {
    return (
      <div className="py-20 bg-[#F8F5EF] min-h-screen">
        <div className="max-w-2xl mx-auto px-4 text-center bg-white p-10 sm:p-12 rounded-3xl border border-[#EDE5D8] shadow-sm space-y-6">
          <div className="w-20 h-20 rounded-full bg-[#24483A]/10 text-[#24483A] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10 text-[#24483A]" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#B86B4B]">
              Registration Approved & Live
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#202522]">
              Welcome to KindTableEats, {formData.name || "Chef"}!
            </h2>
            <p className="text-sm text-[#6D716C] max-w-lg mx-auto leading-relaxed">
              Your kitchen profile <strong>{formData.kitchenName || "Your Kitchen"}</strong> has been registered. Your initial signature dish has been added to today's community menu.
            </p>
          </div>

          {/* Kitchen Summary Card */}
          <div className="bg-[#F8F5EF] p-6 rounded-2xl border border-[#EDE5D8] text-xs text-left text-[#202522] space-y-3">
            <div className="flex justify-between border-b border-[#EDE5D8] pb-2">
              <span className="text-[#6D716C]">Registered Kitchen:</span>
              <strong className="text-[#202522] font-serif text-sm">{formData.kitchenName || "Heritage Home Kitchen"}</strong>
            </div>
            <div className="flex justify-between border-b border-[#EDE5D8] pb-2">
              <span className="text-[#6D716C]">Lead Chef:</span>
              <strong>{formData.name || "Home Cook"}</strong>
            </div>
            <div className="flex justify-between border-b border-[#EDE5D8] pb-2">
              <span className="text-[#6D716C]">Hygiene Status:</span>
              <strong className="text-[#24483A] flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> FSA Level 2 Verified
              </strong>
            </div>
            <div className="flex justify-between border-b border-[#EDE5D8] pb-2">
              <span className="text-[#6D716C]">Weekly Payout To:</span>
              <strong>{formData.bankName} (•••• {formData.accountNumber.slice(-4)})</strong>
            </div>
            {formData.dishName && (
              <div className="flex justify-between">
                <span className="text-[#6D716C]">Signature Live Dish:</span>
                <strong className="text-[#B86B4B]">{formData.dishName} (£{Number(formData.dishPrice).toFixed(2)})</strong>
              </div>
            )}
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleEnterCookDashboard}
              className="flex-1 bg-[#24483A] hover:bg-[#193329] text-white py-4 rounded-xl text-xs font-bold uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2"
            >
              <ChefHat className="w-4 h-4 text-[#C8A96B]" />
              <span>Launch Cook Dashboard</span>
            </button>
            <button
              onClick={() => setCurrentRoute("discover")}
              className="flex-1 bg-[#EDE5D8] hover:bg-[#D9D0C1] text-[#24483A] py-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
            >
              <span>View On Live Menu</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-[#F8F5EF] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header Pitch */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#B86B4B]">
            Cook Registration Portal
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#202522]">
            Register Your Home Kitchen with Dignity
          </h1>
          <p className="text-sm text-[#6D716C] leading-relaxed">
            Turn your family recipes into meaningful local income. We provide food hygiene guidance, biodegradable containers, and fair payouts (keeping 88%+ of earnings + 100% tips).
          </p>
        </div>

        {/* 3 Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-2xl border border-[#EDE5D8] space-y-2">
            <div className="w-9 h-9 rounded-xl bg-[#24483A]/10 text-[#24483A] flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-base font-bold text-[#202522]">
              Fair Payouts & 100% Tips
            </h4>
            <p className="text-xs text-[#6D716C] leading-relaxed">
              Transparent weekly bank transfers with zero hidden deductions.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#EDE5D8] space-y-2">
            <div className="w-9 h-9 rounded-xl bg-[#B86B4B]/10 text-[#B86B4B] flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-base font-bold text-[#202522]">
              Your Rules, Your Hours
            </h4>
            <p className="text-xs text-[#6D716C] leading-relaxed">
              Cook when it fits your family life. Set batch portions and pause anytime.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#EDE5D8] space-y-2">
            <div className="w-9 h-9 rounded-xl bg-[#C8A96B]/20 text-[#24483A] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-base font-bold text-[#202522]">
              Hygiene & Safety Backed
            </h4>
            <p className="text-xs text-[#6D716C] leading-relaxed">
              Free Level 2 Food Hygiene sponsorship and council registration support.
            </p>
          </div>
        </div>

        {/* Multi-Step Onboarding Form */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#EDE5D8] shadow-sm space-y-8">
          
          {/* Breadcrumb Steps Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#EDE5D8] pb-5 gap-3">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-[#24483A] text-white flex items-center justify-center text-xs font-bold">
                {step}
              </span>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#202522]">
                  {step === 1 && "Step 1: Chef & Kitchen Identity"}
                  {step === 2 && "Step 2: Culinary Specialties & Portions"}
                  {step === 3 && "Step 3: Food Safety & Hygiene Compliance"}
                  {step === 4 && "Step 4: Bank Account & Payout Details"}
                  {step === 5 && "Step 5: Publish Your First Signature Dish"}
                </h3>
                <span className="text-[11px] text-[#6D716C]">
                  {step === 1 && "Tell neighbors who you are and where you cook"}
                  {step === 2 && "Define your cuisine heritage and daily portion limits"}
                  {step === 3 && "Food safety standards and allergen awareness declaration"}
                  {step === 4 && "Where we will transfer your weekly earnings and tips"}
                  {step === 5 && "Add your inaugural dish to start taking orders today"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 self-start sm:self-auto bg-[#F8F5EF] px-3 py-1.5 rounded-xl border border-[#EDE5D8]">
              {[1, 2, 3, 4, 5].map((s) => (
                <div
                  key={s}
                  onClick={() => setStep(s)}
                  className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center cursor-pointer transition-all ${
                    s === step
                      ? "bg-[#24483A] text-white"
                      : s < step
                      ? "bg-[#24483A]/20 text-[#24483A]"
                      : "bg-[#EDE5D8] text-[#6D716C]"
                  }`}
                >
                  {s}
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleCompleteSubmit} className="space-y-6">
            
            {/* STEP 1: Kitchen Identity */}
            {step === 1 && (
              <div className="space-y-4 animate-in fade-in">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#202522] mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Zainab Al-Hassan"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      className="w-full text-xs p-3 bg-[#F8F5EF] border border-[#EDE5D8] rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#24483A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#202522] mb-1">
                      Kitchen / Brand Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Zainab's Heritage Table"
                      value={formData.kitchenName}
                      onChange={(e) => handleChange("kitchenName", e.target.value)}
                      className="w-full text-xs p-3 bg-[#F8F5EF] border border-[#EDE5D8] rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#24483A]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#202522] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="zainab@example.com"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      className="w-full text-xs p-3 bg-[#F8F5EF] border border-[#EDE5D8] rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#24483A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#202522] mb-1">
                      Phone Number (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+44 7700 900222"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      className="w-full text-xs p-3 bg-[#F8F5EF] border border-[#EDE5D8] rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#24483A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#202522] mb-1">
                      Kitchen Postcode / Area *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. SE15 4QL, Peckham"
                      value={formData.postcode}
                      onChange={(e) => handleChange("postcode", e.target.value)}
                      className="w-full text-xs p-3 bg-[#F8F5EF] border border-[#EDE5D8] rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#24483A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#202522] mb-1">
                    Your Cooking Story & Background
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell your neighbors how you learned to cook, what your mother taught you, and the passion behind your dishes..."
                    value={formData.story}
                    onChange={(e) => handleChange("story", e.target.value)}
                    className="w-full text-xs p-3 bg-[#F8F5EF] border border-[#EDE5D8] rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#24483A]"
                  />
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="flex items-center gap-2 bg-[#24483A] text-white px-8 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#193329] shadow-xs"
                  >
                    <span>Next: Cuisine & Portions</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Specialties & Batches */}
            {step === 2 && (
              <div className="space-y-4 animate-in fade-in">
                <div>
                  <label className="block text-xs font-semibold text-[#202522] mb-1">
                    Signature Culinary Traditions
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. West African Jollof, Caribbean Curry Goat, Levant Mezze, Traditional Bakes"
                    value={formData.specialties}
                    onChange={(e) => handleChange("specialties", e.target.value)}
                    className="w-full text-xs p-3 bg-[#F8F5EF] border border-[#EDE5D8] rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#24483A]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#202522] mb-1">
                      Cooking Experience
                    </label>
                    <select
                      value={formData.experienceYears}
                      onChange={(e) => handleChange("experienceYears", e.target.value)}
                      className="w-full text-xs p-3 bg-[#F8F5EF] border border-[#EDE5D8] rounded-xl"
                    >
                      <option value="2-4 years">2-4 years</option>
                      <option value="5+ years home cooking">5+ years home cooking</option>
                      <option value="10+ years family heritage recipes">10+ years family heritage</option>
                      <option value="Professional catering background">Professional catering background</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#202522] mb-1">
                      Max Batch Portions / Day
                    </label>
                    <select
                      value={formData.portionsPerDay}
                      onChange={(e) => handleChange("portionsPerDay", e.target.value)}
                      className="w-full text-xs p-3 bg-[#F8F5EF] border border-[#EDE5D8] rounded-xl"
                    >
                      <option value="10-15 portions">10-15 portions (Small batch)</option>
                      <option value="15-25 portions">15-25 portions (Standard)</option>
                      <option value="30+ portions">30+ portions (Feast batch)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#202522] mb-1">
                      Average Prep & Simmer Time
                    </label>
                    <select
                      value={formData.prepTime}
                      onChange={(e) => handleChange("prepTime", e.target.value)}
                      className="w-full text-xs p-3 bg-[#F8F5EF] border border-[#EDE5D8] rounded-xl"
                    >
                      <option value="25-35 mins">25-35 mins</option>
                      <option value="35-45 mins">35-45 mins</option>
                      <option value="45-60 mins">45-60 mins (Slow simmer)</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-[#6D716C] hover:text-[#202522]"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="flex items-center gap-2 bg-[#24483A] text-white px-8 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#193329]"
                  >
                    <span>Next: Food Hygiene & Safety</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Food Safety & Hygiene */}
            {step === 3 && (
              <div className="space-y-4 animate-in fade-in">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#202522] mb-1">
                      Food Hygiene Qualification
                    </label>
                    <select
                      value={formData.foodHygieneLevel}
                      onChange={(e) => handleChange("foodHygieneLevel", e.target.value)}
                      className="w-full text-xs p-3 bg-[#F8F5EF] border border-[#EDE5D8] rounded-xl"
                    >
                      <option value="Certified Level 2 Food Hygiene">Certified Level 2 Food Hygiene (FSA)</option>
                      <option value="Need KindTable to sponsor my Level 2 course">Need KindTable free course sponsorship</option>
                      <option value="Level 3 Food Safety Supervising">Level 3 Food Safety Supervising</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#202522] mb-1">
                      Council Registration / Certificate Ref
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. FSA-LBH-88219 or Council ref"
                      value={formData.councilRegistrationNumber}
                      onChange={(e) => handleChange("councilRegistrationNumber", e.target.value)}
                      className="w-full text-xs p-3 bg-[#F8F5EF] border border-[#EDE5D8] rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#24483A]"
                    />
                  </div>
                </div>

                <div className="p-4 bg-[#F8F5EF] rounded-xl border border-[#EDE5D8] space-y-3 text-xs">
                  <span className="font-bold text-[#202522] block font-serif text-sm">
                    Food Safety Standards Agreement
                  </span>
                  
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.hasThermometer}
                      onChange={(e) => handleChange("hasThermometer", e.target.checked)}
                      className="mt-0.5 accent-[#24483A]"
                    />
                    <span className="text-[#202522]">
                      I verify that all hot cooked dishes will reach a core temperature of at least 75°C (food probe verified) before packaging.
                    </span>
                  </label>

                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.hasAllergenAwareness}
                      onChange={(e) => handleChange("hasAllergenAwareness", e.target.checked)}
                      className="mt-0.5 accent-[#24483A]"
                    />
                    <span className="text-[#202522]">
                      I will clearly declare all 14 statutory allergens (peanuts, gluten, crustacean, dairy, eggs, etc.) for each menu dish.
                    </span>
                  </label>

                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.agreedToTerms}
                      onChange={(e) => handleChange("agreedToTerms", e.target.checked)}
                      className="mt-0.5 accent-[#24483A]"
                    />
                    <span className="text-[#202522]">
                      I agree to KindTableEats community standards and will use provided biodegradable food containers.
                    </span>
                  </label>
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-[#6D716C] hover:text-[#202522]"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep(4)}
                    className="flex items-center gap-2 bg-[#24483A] text-white px-8 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#193329]"
                  >
                    <span>Next: Payout Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Bank Details */}
            {step === 4 && (
              <div className="space-y-4 animate-in fade-in">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#202522] mb-1">
                      Bank Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Barclays, Monzo, NatWest, Lloyds"
                      value={formData.bankName}
                      onChange={(e) => handleChange("bankName", e.target.value)}
                      className="w-full text-xs p-3 bg-[#F8F5EF] border border-[#EDE5D8] rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#24483A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#202522] mb-1">
                      Account Holder Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Zainab Al-Hassan"
                      value={formData.accountHolder || formData.name}
                      onChange={(e) => handleChange("accountHolder", e.target.value)}
                      className="w-full text-xs p-3 bg-[#F8F5EF] border border-[#EDE5D8] rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#24483A]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#202522] mb-1">
                      Sort Code *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="20-40-71"
                      value={formData.sortCode}
                      onChange={(e) => handleChange("sortCode", e.target.value)}
                      className="w-full text-xs p-3 bg-[#F8F5EF] border border-[#EDE5D8] rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#24483A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#202522] mb-1">
                      Account Number *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="83920194"
                      value={formData.accountNumber}
                      onChange={(e) => handleChange("accountNumber", e.target.value)}
                      className="w-full text-xs p-3 bg-[#F8F5EF] border border-[#EDE5D8] rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#24483A]"
                    />
                  </div>
                </div>

                <div className="p-4 bg-[#EDE5D8]/50 rounded-xl border border-[#D9D0C1] text-xs text-[#202522] flex items-center gap-3">
                  <DollarSign className="w-5 h-5 text-[#24483A] shrink-0" />
                  <div>
                    <strong className="block font-serif">100% Direct Payout Guarantee</strong>
                    <p className="text-[#6D716C]">
                      Funds and 100% of tips are transferred directly to your bank account weekly on Fridays.
                    </p>
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-[#6D716C] hover:text-[#202522]"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep(5)}
                    className="flex items-center gap-2 bg-[#24483A] text-white px-8 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#193329]"
                  >
                    <span>Next: Add Signature Dish</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 5: First Dish & Complete */}
            {step === 5 && (
              <div className="space-y-4 animate-in fade-in">
                <div className="bg-[#24483A]/5 p-4 rounded-xl border border-[#24483A]/10 text-xs text-[#24483A] flex items-center gap-3">
                  <Utensils className="w-5 h-5 text-[#B86B4B] shrink-0" />
                  <div>
                    <strong className="block font-serif">Publish Your First Menu Special</strong>
                    <p className="text-[#6D716C]">
                      Neighbors will see this dish in the marketplace menu immediately upon registration.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#202522] mb-1">
                      Dish Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Smoky Party Jollof with Fried Plantains"
                      value={formData.dishName}
                      onChange={(e) => handleChange("dishName", e.target.value)}
                      className="w-full text-xs p-3 bg-[#F8F5EF] border border-[#EDE5D8] rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#24483A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#202522] mb-1">
                      Portion Price (£) *
                    </label>
                    <input
                      type="number"
                      step="0.50"
                      min="6"
                      max="35"
                      required
                      value={formData.dishPrice}
                      onChange={(e) => handleChange("dishPrice", e.target.value)}
                      className="w-full text-xs p-3 bg-[#F8F5EF] border border-[#EDE5D8] rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#24483A]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#202522] mb-1">
                      Cuisine Category
                    </label>
                    <select
                      value={formData.dishCategory}
                      onChange={(e) => handleChange("dishCategory", e.target.value as MealCategory)}
                      className="w-full text-xs p-3 bg-[#F8F5EF] border border-[#EDE5D8] rounded-xl"
                    >
                      <option value="West African">West African</option>
                      <option value="Nigerian">Nigerian</option>
                      <option value="Plant-Forward">Plant-Forward</option>
                      <option value="Nourishing Soups">Nourishing Soups</option>
                      <option value="Comfort Bakes">Comfort Bakes</option>
                      <option value="Weekend Feasts">Weekend Feasts</option>
                      <option value="Build Your Own">Build Your Own</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#202522] mb-1">
                      Dish Photo (Unsplash URL or Upload)
                    </label>
                    <input
                      type="text"
                      value={formData.dishImageUrl}
                      onChange={(e) => handleChange("dishImageUrl", e.target.value)}
                      className="w-full text-xs p-3 bg-[#F8F5EF] border border-[#EDE5D8] rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#24483A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#202522] mb-1">
                    Dish Description & Flavor Profile
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Slow-cooked long-grain rice infused with red bell pepper reduction, smoked paprika, and aromatic herbs..."
                    value={formData.dishDescription}
                    onChange={(e) => handleChange("dishDescription", e.target.value)}
                    className="w-full text-xs p-3 bg-[#F8F5EF] border border-[#EDE5D8] rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#24483A]"
                  />
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(4)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-[#6D716C] hover:text-[#202522]"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>

                  <button
                    type="submit"
                    className="flex items-center gap-2 bg-[#B86B4B] hover:bg-[#9E5638] text-white px-10 py-4 rounded-xl text-xs font-bold uppercase tracking-wider shadow-md transition-all active:scale-98"
                  >
                    <span>Complete Cook Registration & Go Live</span>
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            )}

          </form>

        </div>

      </div>
    </div>
  );
};
