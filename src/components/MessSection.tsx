"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useAdmin } from "@/context/AdminContext";
import { Check, Flame, Gift } from "lucide-react";

export default function MessSection() {
  const { t } = useLanguage();
  const { addEnquiry } = useAdmin();

  // State variables for plan configurator
  const [selectedPlan, setSelectedPlan] = useState<"student" | "professional" | "corporate">("professional");
  const [duration, setDuration] = useState<30 | 60 | 90>(30);
  const [mealTime, setMealTime] = useState<"lunch" | "dinner" | "both">("both");
  const [dietPref, setDietPref] = useState<"veg" | "nonveg">("veg");
  
  // Output price calculations
  const [totalPrice, setTotalPrice] = useState(0);
  const [pricePerMeal, setPricePerMeal] = useState(0);
  const [savings, setSavings] = useState(0);
  const [isBooked, setIsBooked] = useState(false);
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");

  const plans = [
    {
      id: "student",
      name: t("studentPlan"),
      baseMealPrice: 110,
      desc: "Lighter on pocket, heavy on taste. Designed for students staying in PGs/Hostels. Focuses on homestyle simple meals.",
      bullets: ["Light spice profiles", "Unlimited roti/rice in base kitchen", "Daily changing sabzi menu", "Weekly dessert surprise"]
    },
    {
      id: "professional",
      name: t("monthlyPlan"),
      baseMealPrice: 150,
      desc: "Balanced nutrition for office professionals. Premium ingredients, healthy brown rice options, and high protein selections.",
      bullets: ["Low oil preparation", "Paneer/mushrooms thrice a week", "Organic salads and buttermilk included", "Flexible pause subscription anytime"]
    },
    {
      id: "corporate",
      name: t("officePlan"),
      baseMealPrice: 200,
      desc: "Full-course executive lunch trays designed for corporate catering or custom group ordering. Delivered in thermal boxes.",
      bullets: ["Individual hot-case packages", "Premium multi-cuisine varieties", "Premium desserts included", "Enterprise consolidated monthly billing"]
    }
  ];

  // Re-calculate price whenever selections change
  useEffect(() => {
    const activePlan = plans.find(p => p.id === selectedPlan) || plans[1];
    let mealCost = activePlan.baseMealPrice;

    if (dietPref === "nonveg") {
      mealCost += 30;
    }

    let mealsPerDayCount = 1;
    let mealMultiplier = 1.0;
    if (mealTime === "both") {
      mealsPerDayCount = 2;
      mealMultiplier = 1.8; // Bulk discount for double meal
    }

    let durationDiscount = 1.0;
    if (duration === 60) durationDiscount = 0.90; // 10% off
    if (duration === 90) durationDiscount = 0.85; // 15% off

    const totalDays = duration;
    const finalTotal = Math.round(mealCost * mealsPerDayCount * mealMultiplier * totalDays * durationDiscount);
    const normalTotalNoDiscount = Math.round(mealCost * mealsPerDayCount * totalDays);

    setPricePerMeal(Math.round(finalTotal / (mealsPerDayCount * totalDays)));
    setTotalPrice(finalTotal);
    setSavings(normalTotalNoDiscount - finalTotal);
  }, [selectedPlan, duration, mealTime, dietPref]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientPhone) return;

    const planNameText = plans.find(p => p.id === selectedPlan)?.name || "Mess Subscription";
    const mealTimeText = mealTime === "both" ? "Lunch & Dinner" : mealTime === "lunch" ? "Lunch Only" : "Dinner Only";
    const prefText = dietPref === "veg" ? "Veg Only" : "Include Non-Veg";

    addEnquiry({
      name: clientName,
      phone: clientPhone,
      email: "",
      type: "Mess",
      planName: `${planNameText} (${duration} Days)`,
      duration: `${duration} Days`,
      meals: mealTimeText,
      preference: prefText,
      message: `Automatic pricing calculated: Total ₹${totalPrice.toLocaleString("en-IN")}. Initialized client request.`,
    });

    setIsBooked(true);
    setTimeout(() => {
      setIsBooked(false);
      setClientName("");
      setClientPhone("");
    }, 4000);
  };

  return (
    <section id="mess" className="relative py-20 bg-[#faf9f6]">
      <div className="w-full px-6 md:px-16 lg:px-24">
        
        {/* Header */}
        <div className="max-w-xl mb-12">
          <span className="text-gold font-bold text-xs uppercase tracking-[0.25em]">{t("messSubtitle")}</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 mt-2">
            {t("messTitle")}
          </h2>
          <div className="w-12 h-0.5 bg-gold mt-4" />
        </div>

        {/* Info badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            t("freshDaily"),
            t("balancedNutrition"),
            t("hygienicKitchen"),
            t("flexiblePlans")
          ].map((item, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-white border border-neutral-100 flex items-center gap-2.5 shadow-sm">
              <div className="w-4.5 h-4.5 rounded-full bg-gold/10 text-gold flex items-center justify-center shrink-0">
                <Check className="w-3 h-3" />
              </div>
              <span className="text-[11px] font-bold text-neutral-700 tracking-wide">{item}</span>
            </div>
          ))}
        </div>

        {/* Configurator block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Configurator controls (Left) */}
          <div className="lg:col-span-7 bg-white border border-neutral-100 p-6 sm:p-8 rounded-3xl space-y-6 shadow-sm">
            
            {/* Step 1: Select Plan */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gold mb-3.5">
                01. Choose Meal Program
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {plans.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPlan(p.id as any)}
                    className={`p-4.5 rounded-xl border text-left transition-all duration-300 ${
                      selectedPlan === p.id
                        ? "bg-gold/5 border-gold text-gold"
                        : "border-neutral-150 bg-white text-neutral-500 hover:border-neutral-300"
                    }`}
                  >
                    <h4 className="text-[11px] font-bold uppercase tracking-wider mb-0.5">{p.name.split(" ")[0]}</h4>
                    <p className="text-[9px] opacity-80 leading-relaxed font-light">{p.name.split(" ").slice(1).join(" ")}</p>
                    <p className="text-[11px] font-bold mt-2 text-neutral-800">from ₹{p.baseMealPrice}/meal</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Bullet list of selected plan */}
            <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-100">
              <p className="text-[10px] text-neutral-500 font-light mb-3 leading-relaxed">
                {plans.find(p => p.id === selectedPlan)?.desc}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {plans.find(p => p.id === selectedPlan)?.bullets.map((bullet, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-[10px] text-neutral-600 font-medium">
                    <span className="w-1 h-1 rounded-full bg-gold" />
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Step 2: Meal Preference */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gold mb-2.5">
                  02. Food Preference
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setDietPref("veg")}
                    className={`py-2.5 rounded-lg border text-center text-[10px] font-bold uppercase tracking-wide transition-all ${
                      dietPref === "veg"
                        ? "bg-gold/10 border-gold text-gold"
                        : "border-neutral-150 bg-white text-neutral-500 hover:border-neutral-300"
                    }`}
                  >
                    {t("vegOnly")}
                  </button>
                  <button
                    onClick={() => setDietPref("nonveg")}
                    className={`py-2.5 rounded-lg border text-center text-[10px] font-bold uppercase tracking-wide transition-all ${
                      dietPref === "nonveg"
                        ? "bg-gold/10 border-gold text-gold"
                        : "border-neutral-150 bg-white text-neutral-500 hover:border-neutral-300"
                    }`}
                  >
                    Non-Veg (+₹30)
                  </button>
                </div>
              </div>

              {/* Step 3: Meal Time */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gold mb-2.5">
                  03. Meal Time
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setMealTime("lunch")}
                    className={`py-2.5 rounded-lg border text-center text-[9px] font-bold uppercase tracking-wide transition-all ${
                      mealTime === "lunch"
                        ? "bg-gold/10 border-gold text-gold"
                        : "border-neutral-150 bg-white text-neutral-500 hover:border-neutral-300"
                    }`}
                  >
                    Lunch
                  </button>
                  <button
                    onClick={() => setMealTime("dinner")}
                    className={`py-2.5 rounded-lg border text-center text-[9px] font-bold uppercase tracking-wide transition-all ${
                      mealTime === "dinner"
                        ? "bg-gold/10 border-gold text-gold"
                        : "border-neutral-150 bg-white text-neutral-500 hover:border-neutral-300"
                    }`}
                  >
                    Dinner
                  </button>
                  <button
                    onClick={() => setMealTime("both")}
                    className={`py-2.5 rounded-lg border text-center text-[9px] font-bold uppercase tracking-wide transition-all ${
                      mealTime === "both"
                        ? "bg-gold/10 border-gold text-gold"
                        : "border-neutral-150 bg-white text-neutral-500 hover:border-neutral-300"
                    }`}
                  >
                    Both Meals
                  </button>
                </div>
              </div>
            </div>

            {/* Step 4: Duration */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gold">
                  04. Duration of Plan
                </label>
                <span className="text-[10px] font-bold text-gold bg-gold/10 px-2 py-0.5 rounded border border-gold/25">
                  {duration} Days Plan
                </span>
              </div>
              <div className="flex gap-2">
                {[30, 60, 90].map((dur) => (
                  <button
                    key={dur}
                    onClick={() => setDuration(dur as any)}
                    className={`flex-1 py-2.5 rounded-lg border text-center text-[10px] font-bold transition-all ${
                      duration === dur
                        ? "bg-neutral-900 text-white border-neutral-900"
                        : "border-neutral-150 bg-white text-neutral-500 hover:border-neutral-300"
                    }`}
                  >
                    {dur} Days
                    {dur === 60 && <span className="block text-[7px] font-semibold text-neutral-400 uppercase mt-0.5">Save 10%</span>}
                    {dur === 90 && <span className="block text-[7px] font-semibold text-neutral-400 uppercase mt-0.5">Save 15%</span>}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Pricing Summary (Right) */}
          <div className="lg:col-span-5 bg-white border border-neutral-100 p-8 rounded-3xl shadow-[0_15px_40px_rgba(0,0,0,0.03)] relative overflow-hidden group">
            {/* Savings Tag */}
            {savings > 0 && (
              <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-amber-600 text-white text-[8px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full flex items-center gap-1">
                <Gift className="w-3 h-3" />
                <span>Save ₹{savings.toLocaleString("en-IN")}</span>
              </div>
            )}

            <h3 className="font-serif text-base font-bold text-neutral-800 mb-6">Subscription Summary</h3>
            
            <div className="space-y-3.5 text-[11px]">
              <div className="flex justify-between border-b border-neutral-100 pb-3">
                <span className="text-neutral-400">Selected Program</span>
                <span className="text-neutral-700 font-bold uppercase">{plans.find(p => p.id === selectedPlan)?.name.split(" ")[0]} Plan</span>
              </div>
              <div className="flex justify-between border-b border-neutral-100 pb-3">
                <span className="text-neutral-400">Preference</span>
                <span className="text-neutral-700 font-bold uppercase">{dietPref === "veg" ? "Pure Vegetarian" : "Veg & Non-Veg"}</span>
              </div>
              <div className="flex justify-between border-b border-neutral-100 pb-3">
                <span className="text-neutral-400">Delivery cycle</span>
                <span className="text-neutral-700 font-bold uppercase">{mealTime === "both" ? "Lunch & Dinner" : mealTime}</span>
              </div>
              <div className="flex justify-between border-b border-neutral-100 pb-3">
                <span className="text-neutral-400">Calculated Meal Rate</span>
                <span className="text-gold font-bold">₹{pricePerMeal} / meal</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-xs font-bold text-neutral-800">Estimated Cost</span>
                <div className="text-right">
                  <span className="text-xl font-bold text-gold">₹{totalPrice.toLocaleString("en-IN")}</span>
                  <span className="block text-[8px] text-neutral-400 mt-0.5">for {duration} days total</span>
                </div>
              </div>
            </div>

            <hr className="border-neutral-100 my-5" />

            {/* Subscribe form nested */}
            {isBooked ? (
              <div className="py-4 text-center text-[11px] text-gold font-medium animate-scale-up">
                <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold flex items-center justify-center mx-auto mb-3 text-gold">
                  <Check className="w-5 h-5" />
                </div>
                <span>Subscription Enquiry Registered! <br />We will contact you shortly.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="space-y-2">
                  <input
                    type="text"
                    required
                    placeholder="Enter Your Name"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 bg-white text-neutral-800 text-[11px] focus:border-gold focus:outline-none"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Enter Phone Number"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 bg-white text-neutral-800 text-[11px] focus:border-gold focus:outline-none"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-neutral-900 hover:bg-gold text-white font-bold text-[10px] uppercase tracking-wider text-center transition-all hover:scale-[1.02]"
                >
                  {t("subscribeCTA")}
                </button>
              </form>
            )}

            <div className="mt-4 flex items-center justify-center gap-1.5 text-[8px] text-neutral-400">
              <Flame className="w-3 h-3 text-orange-500 shrink-0" />
              <span>Cancel/Pause subscriptions anytime in student panels.</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
