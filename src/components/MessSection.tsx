"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useAdmin } from "@/context/AdminContext";
import { Check, Flame, HelpCircle, Gift } from "lucide-react";

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

    // Diet preference surcharge
    if (dietPref === "nonveg") {
      mealCost += 30;
    }

    // Number of meals factor
    let mealsPerDayCount = 1;
    let mealMultiplier = 1.0;
    if (mealTime === "both") {
      mealsPerDayCount = 2;
      mealMultiplier = 1.8; // Bulk discount for double meal
    }

    // Duration discount factor
    let durationDiscount = 1.0;
    if (duration === 60) durationDiscount = 0.90; // 10% off
    if (duration === 90) durationDiscount = 0.85; // 15% off

    // Total Calculation
    const totalDays = duration;
    const baseTotal = mealCost * mealsPerDayCount * totalDays;
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
    <section id="mess" className="relative py-24 bg-[#0c0e14]">
      {/* Design elements */}
      <div className="absolute right-0 top-1/3 w-80 h-80 rounded-full bg-gold/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-gold font-bold text-xs uppercase tracking-[0.25em]">{t("messSubtitle")}</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mt-3">
            {t("messTitle")}
          </h2>
          <p className="text-neutral-400 text-xs md:text-sm font-light mt-4 max-w-xl mx-auto">
            {t("messP1")}
          </p>
          <div className="w-12 h-1 bg-gold mx-auto mt-6" />
        </div>

        {/* Info badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            t("freshDaily"),
            t("balancedNutrition"),
            t("hygienicKitchen"),
            t("flexiblePlans")
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-brand-card/50 border border-white/5 flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-gold/10 text-gold flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-semibold text-white tracking-wide">{item}</span>
            </div>
          ))}
        </div>

        {/* Configurator block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Configurator controls (Left) */}
          <div className="lg:col-span-7 bg-brand-card/50 border border-white/5 p-6 sm:p-8 rounded-3xl space-y-8">
            
            {/* Step 1: Select Plan */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gold mb-4">
                01. Choose Meal Program
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {plans.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPlan(p.id as any)}
                    className={`p-4 rounded-xl border text-left transition-all duration-300 ${
                      selectedPlan === p.id
                        ? "bg-gold/10 border-gold text-gold"
                        : "border-white/5 bg-brand-dark/40 text-neutral-400 hover:border-white/20"
                    }`}
                  >
                    <h4 className="text-xs font-bold uppercase tracking-wider mb-1">{p.name.split(" ")[0]}</h4>
                    <p className="text-[10px] opacity-80 leading-relaxed font-light">{p.name.split(" ").slice(1).join(" ")}</p>
                    <p className="text-xs font-bold mt-2 text-white">from ₹{p.baseMealPrice}/meal</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Bullet list of selected plan */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/5">
              <p className="text-[11px] text-neutral-300 font-light mb-3 leading-relaxed">
                {plans.find(p => p.id === selectedPlan)?.desc}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {plans.find(p => p.id === selectedPlan)?.bullets.map((bullet, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-[10px] text-neutral-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Step 2: Meal Preference */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gold mb-3">
                  02. Food Preference
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setDietPref("veg")}
                    className={`py-3 rounded-lg border text-center text-xs font-bold uppercase tracking-wide transition-all ${
                      dietPref === "veg"
                        ? "bg-gold/10 border-gold text-gold"
                        : "border-white/5 bg-brand-dark/40 text-neutral-400 hover:border-white/20"
                    }`}
                  >
                    {t("vegOnly")}
                  </button>
                  <button
                    onClick={() => setDietPref("nonveg")}
                    className={`py-3 rounded-lg border text-center text-xs font-bold uppercase tracking-wide transition-all ${
                      dietPref === "nonveg"
                        ? "bg-gold/10 border-gold text-gold"
                        : "border-white/5 bg-brand-dark/40 text-neutral-400 hover:border-white/20"
                    }`}
                  >
                    Non-Veg (+₹30)
                  </button>
                </div>
              </div>

              {/* Step 3: Meal Time */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gold mb-3">
                  03. Meal Time
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setMealTime("lunch")}
                    className={`py-3 rounded-lg border text-center text-[10px] font-bold uppercase tracking-wide transition-all ${
                      mealTime === "lunch"
                        ? "bg-gold/10 border-gold text-gold"
                        : "border-white/5 bg-brand-dark/40 text-neutral-400 hover:border-white/20"
                    }`}
                  >
                    Lunch
                  </button>
                  <button
                    onClick={() => setMealTime("dinner")}
                    className={`py-3 rounded-lg border text-center text-[10px] font-bold uppercase tracking-wide transition-all ${
                      mealTime === "dinner"
                        ? "bg-gold/10 border-gold text-gold"
                        : "border-white/5 bg-brand-dark/40 text-neutral-400 hover:border-white/20"
                    }`}
                  >
                    Dinner
                  </button>
                  <button
                    onClick={() => setMealTime("both")}
                    className={`py-3 rounded-lg border text-center text-[10px] font-bold uppercase tracking-wide transition-all ${
                      mealTime === "both"
                        ? "bg-gold/10 border-gold text-gold"
                        : "border-white/5 bg-brand-dark/40 text-neutral-400 hover:border-white/20"
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
                <label className="text-xs font-bold uppercase tracking-widest text-gold">
                  04. Duration of Plan
                </label>
                <span className="text-xs font-bold text-white bg-gold/10 px-2.5 py-1 rounded-md border border-gold/25">
                  {duration} Days Plan
                </span>
              </div>
              <div className="flex gap-2">
                {[30, 60, 90].map((dur) => (
                  <button
                    key={dur}
                    onClick={() => setDuration(dur as any)}
                    className={`flex-1 py-3 rounded-lg border text-center text-xs font-bold transition-all ${
                      duration === dur
                        ? "bg-gold text-[#08090b] border-gold"
                        : "border-white/5 bg-brand-dark/40 text-neutral-400 hover:border-white/20"
                    }`}
                  >
                    {dur} Days
                    {dur === 60 && <span className="block text-[8px] font-semibold text-neutral-400 uppercase mt-0.5">Save 10%</span>}
                    {dur === 90 && <span className="block text-[8px] font-semibold text-neutral-400 uppercase mt-0.5">Save 15%</span>}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Pricing Summary (Right) */}
          <div className="lg:col-span-5 bg-gradient-to-b from-[#12141c] to-[#0a0c10] border border-gold/15 p-8 rounded-3xl shadow-2xl relative overflow-hidden group">
            {/* Savings Tag */}
            {savings > 0 && (
              <div className="absolute top-4 right-4 bg-gradient-to-r from-red-600 to-amber-600 text-white text-[9px] uppercase font-bold tracking-widest px-3 py-1.5 rounded-full flex items-center gap-1 animate-pulse">
                <Gift className="w-3.5 h-3.5" />
                <span>Save ₹{savings.toLocaleString("en-IN")}</span>
              </div>
            )}

            <h3 className="font-serif text-lg font-bold text-white mb-6">Subscription Summary</h3>
            
            <div className="space-y-4 text-xs">
              <div className="flex justify-between border-b border-white/5 pb-3.5">
                <span className="text-neutral-400">Selected Program</span>
                <span className="text-white font-semibold uppercase">{plans.find(p => p.id === selectedPlan)?.name.split(" ")[0]} Program</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-3.5">
                <span className="text-neutral-400">Preference</span>
                <span className="text-white font-semibold uppercase">{dietPref === "veg" ? "Pure Vegetarian" : "Veg & Non-Veg"}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-3.5">
                <span className="text-neutral-400">Delivery cycle</span>
                <span className="text-white font-semibold uppercase">{mealTime === "both" ? "Lunch & Dinner" : mealTime}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-3.5">
                <span className="text-neutral-400">Calculated Meal Rate</span>
                <span className="text-gold font-bold">₹{pricePerMeal} / meal</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-sm font-bold text-white">Estimated Cost</span>
                <div className="text-right">
                  <span className="text-2xl font-bold text-gold">₹{totalPrice.toLocaleString("en-IN")}</span>
                  <span className="block text-[9px] text-neutral-500 mt-0.5">for {duration} days total</span>
                </div>
              </div>
            </div>

            <hr className="border-white/5 my-6" />

            {/* Subscribe form nested */}
            {isBooked ? (
              <div className="py-6 text-center text-xs text-gold font-medium animate-scale-up">
                <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold flex items-center justify-center mx-auto mb-4 text-gold">
                  <Check className="w-6 h-6" />
                </div>
                <span>Subscription Enquiry Registered! <br />Our hospitality manager will call you shortly.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-4">
                <div className="space-y-2">
                  <input
                    type="text"
                    required
                    placeholder="Enter Your Name"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-brand-dark/60 border border-white/10 text-white text-xs focus:border-gold focus:outline-none"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Enter Phone Number"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-brand-dark/60 border border-white/10 text-white text-xs focus:border-gold focus:outline-none"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-gradient-to-r from-gold-dark to-gold text-[#08090b] font-bold text-xs uppercase tracking-wider text-center transition-all hover:scale-[1.02] shadow-[0_5px_15px_rgba(197,168,128,0.2)]"
                >
                  {t("subscribeCTA")}
                </button>
              </form>
            )}

            <div className="mt-4 flex items-center justify-center gap-1.5 text-[9px] text-neutral-500">
              <Flame className="w-3.5 h-3.5 text-orange-500" />
              <span>Cancel/Pause subscriptions anytime in student panels.</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
