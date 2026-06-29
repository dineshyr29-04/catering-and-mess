"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Calendar, Layers, Shield, Sparkles, Smile } from "lucide-react";

export default function TimelineJourney() {
  const { t } = useLanguage();
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      icon: Calendar,
      title: t("step1Title"),
      desc: t("step1Desc"),
      details: "Our service managers sit with you to understand your custom preferences, budget bounds, event style (plated vs buffet) and specific cultural menu demands."
    },
    {
      icon: Layers,
      title: t("step2Title"),
      desc: t("step2Desc"),
      details: "Our Executive Chefs devise a bespoke draft menu listing custom drinks, live tandoori starters, standard entrees and thematic dessert installations."
    },
    {
      icon: Shield,
      title: t("step3Title"),
      desc: t("step3Desc"),
      details: "Ingredients are sourced from certified organic farms. Slicing, prepping and cook cycles are performed in clean temperature-controlled zones under high sanitization."
    },
    {
      icon: Sparkles,
      title: t("step4Title"),
      desc: t("step4Desc"),
      details: "Our logistics team sets up live heating, plating accessories and clean cutlery 2 hours before the start. Trained waiters serve dishes under professional protocols."
    },
    {
      icon: Smile,
      title: t("step5Title"),
      desc: t("step5Desc"),
      details: "Post-event cleanups and feedback logs are checked by team leads. We compile your review logs to keep polishing our standard banquet offerings."
    }
  ];

  return (
    <section id="journey" className="relative py-20 bg-white overflow-hidden">
      <div className="w-full px-6 md:px-16 lg:px-24">
        
        {/* Header */}
        <div className="max-w-xl mb-12">
          <span className="text-gold font-bold text-xs uppercase tracking-[0.25em]">{t("journeySubtitle")}</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 mt-2">
            {t("journeyTitle")}
          </h2>
          <div className="w-12 h-0.5 bg-gold mt-4" />
        </div>

        {/* Interactive Step-by-Step Flow */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Steps selector buttons (Left) */}
          <div className="lg:col-span-5 space-y-3">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`w-full p-4 rounded-xl border text-left transition-all duration-300 flex items-center gap-3.5 ${
                    idx === activeStep
                      ? "bg-gold/5 border-gold text-gold translate-x-1 shadow-sm"
                      : "border-neutral-100 bg-[#faf9f6]/40 text-neutral-400 hover:bg-neutral-50 hover:text-neutral-800"
                  }`}
                >
                  <div className={`p-2 rounded-lg transition-colors duration-300 ${
                    idx === activeStep ? "bg-gold text-white" : "bg-neutral-100 text-neutral-500"
                  }`}>
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="text-[9px] uppercase font-bold tracking-wider mb-0.5">
                      {step.title.split(" ")[0]}
                    </h4>
                    <p className="text-xs font-bold text-neutral-800 tracking-wide">
                      {step.title.split(" ").slice(1).join(" ")}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Step Detail Card (Right) */}
          <div className="lg:col-span-7 bg-[#faf9f6] border border-neutral-100 p-8 sm:p-10 rounded-2xl relative overflow-hidden min-h-[300px] flex flex-col justify-between shadow-sm">
            {/* Massive watermarked background step index */}
            <div className="absolute right-2 bottom-0 text-[140px] font-bold text-neutral-900/[0.02] leading-none select-none font-serif">
              0{activeStep + 1}
            </div>

            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white text-gold text-[9px] font-bold uppercase tracking-wider border border-gold/15 shadow-sm">
                Step 0{activeStep + 1} of 05
              </div>

              <h3 className="font-serif text-xl sm:text-2xl font-bold text-neutral-850">
                {steps[activeStep].title}
              </h3>
              
              <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-light">
                {steps[activeStep].desc}
              </p>

              <hr className="border-neutral-200/50" />

              <p className="text-neutral-500 text-[11px] leading-relaxed font-light">
                {steps[activeStep].details}
              </p>
            </div>

            <div className="mt-6 flex items-center justify-between text-[9px] text-gold font-bold uppercase tracking-wider border-t border-neutral-200/50 pt-4">
              <span>Aura Quality Assured</span>
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
