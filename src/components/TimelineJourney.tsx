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
    <section id="journey" className="relative py-24 bg-[#08090b] overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-gold font-bold text-xs uppercase tracking-[0.25em]">{t("journeySubtitle")}</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mt-3">
            {t("journeyTitle")}
          </h2>
          <div className="w-12 h-1 bg-gold mx-auto mt-6" />
        </div>

        {/* Interactive Step-by-Step Flow */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Steps selector buttons (Left) */}
          <div className="lg:col-span-5 space-y-4">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`w-full p-5 rounded-2xl border text-left transition-all duration-300 flex items-center gap-4 ${
                    idx === activeStep
                      ? "bg-gold/10 border-gold text-gold shadow-lg translate-x-2"
                      : "border-white/5 bg-brand-card/40 text-neutral-400 hover:bg-brand-card hover:text-white"
                  }`}
                >
                  <div className={`p-2.5 rounded-xl transition-colors duration-300 ${
                    idx === activeStep ? "bg-gold text-brand-dark" : "bg-white/5 text-neutral-300"
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase font-bold tracking-wider mb-0.5">
                      {step.title.split(" ")[0]}
                    </h4>
                    <p className="text-sm font-bold text-white tracking-wide">
                      {step.title.split(" ").slice(1).join(" ")}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Step Detail Card (Right) */}
          <div className="lg:col-span-7 bg-brand-card border border-white/5 p-8 sm:p-10 rounded-3xl relative overflow-hidden min-h-[350px] flex flex-col justify-between shadow-2xl">
            {/* Massive watermarked background step index */}
            <div className="absolute right-0 bottom-0 text-[180px] font-bold text-white/[0.02] leading-none select-none font-serif">
              0{activeStep + 1}
            </div>

            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-gold/10 text-gold text-xs font-semibold uppercase tracking-wider border border-gold/15">
                Step 0{activeStep + 1} of 05
              </div>

              <h3 className="font-serif text-2xl md:text-3xl font-bold text-white">
                {steps[activeStep].title}
              </h3>
              
              <p className="text-neutral-300 text-sm md:text-base leading-relaxed font-light">
                {steps[activeStep].desc}
              </p>

              <hr className="border-white/5" />

              <p className="text-neutral-400 text-xs leading-relaxed font-light">
                {steps[activeStep].details}
              </p>
            </div>

            <div className="mt-8 flex items-center justify-between text-xs text-gold font-bold uppercase tracking-wider border-t border-white/5 pt-6">
              <span>Aura Quality Assured</span>
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
