"use client";

import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Award, ShieldCheck, HeartHandshake, Hourglass, Utensils, Sliders } from "lucide-react";

export default function WhyChooseUs() {
  const { t } = useLanguage();
  
  // Custom counter animation hook (simple client side trigger)
  const [chefs, setChefs] = useState(0);
  const [events, setEvents] = useState(0);
  const [meals, setMeals] = useState(0);
  const [years, setYears] = useState(0);
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || hasAnimated) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
      
      if (isVisible) {
        setHasAnimated(true);
        // Start counting animations
        animateVal(setChefs, 12, 1500);
        animateVal(setEvents, 500, 2000);
        animateVal(setMeals, 2500, 2000);
        animateVal(setYears, 10, 1500);
      }
    };

    const animateVal = (setter: React.Dispatch<React.SetStateAction<number>>, target: number, duration: number) => {
      let start = 0;
      const stepTime = Math.max(Math.floor(duration / target), 15);
      const timer = setInterval(() => {
        start += Math.ceil(target / (duration / stepTime));
        if (start >= target) {
          setter(target);
          clearInterval(timer);
        } else {
          setter(start);
        }
      }, stepTime);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check once on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasAnimated]);

  const cards = [
    { icon: Award, title: "Experienced chefs", desc: "Our team includes gold-medalist regional master chefs trained in luxury hotels and ancestral cooking styles." },
    { icon: Utensils, title: "Quality ingredients", desc: "We source cold-pressed oils, organic basmati grains, A2 dairy milk, and handpicked local farm vegetables daily." },
    { icon: HeartHandshake, title: "Professional staff", desc: "Our service managers and servers are trained in elite five-star table-manner protocols and banquet etiquette." },
    { icon: Sliders, title: "Customised menus", desc: "No standard templates. Every single menu is planned from scratch matching your theme, age groups, and guests' preference." },
    { icon: Hourglass, title: "On-time service", desc: "Strict execution timelines. Buffets and live counters open exactly 15 minutes before your schedule, guaranteed." },
    { icon: ShieldCheck, title: "Hygiene standards", desc: "Continuous automated audits, temperature checks, cap/glove disciplines, and ISO certified sanitation procedures." }
  ];

  const comparisonData = [
    { metric: "Ingredient Traceability", aura: 100, standard: 40 },
    { metric: "Sanitized Base Kitchens", aura: 100, standard: 30 },
    { metric: "Fresh Prep (No Frozen Mixes)", aura: 95, standard: 50 },
    { metric: "Professional Server Protocols", aura: 100, standard: 60 },
  ];

  return (
    <section ref={sectionRef} className="relative py-24 bg-[#08090b]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-gold font-bold text-xs uppercase tracking-[0.25em]">{t("whySubtitle")}</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mt-3">
            {t("whyTitle")}
          </h2>
          <div className="w-12 h-1 bg-gold mx-auto mt-6" />
        </div>

        {/* Counter Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {[
            { value: chefs, suffix: "+", label: t("chefsCount") },
            { value: events, suffix: "+", label: t("eventsCount") },
            { value: meals, suffix: "+", label: t("mealsCount") },
            { value: years, suffix: "+", label: t("yearsCount") }
          ].map((stat, idx) => (
            <div key={idx} className="text-center bg-brand-card/30 border border-white/5 p-6 rounded-2xl">
              <span className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold gold-text-gradient block mb-2">
                {stat.value}{stat.suffix}
              </span>
              <span className="text-xs uppercase font-semibold text-neutral-400 tracking-wider">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Main Grid: Features and Comparison Graph */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Features Cards Grid (Left) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {cards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <div key={idx} className="p-6 rounded-2xl bg-brand-card border border-white/5 hover:border-gold/20 hover:bg-brand-card/80 transition-all duration-300 group">
                  <div className="w-10 h-10 rounded-xl bg-gold/10 text-gold flex items-center justify-center mb-4 group-hover:bg-gold group-hover:text-[#08090b] transition-all">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-white mb-2">{card.title}</h4>
                  <p className="text-xs text-neutral-400 leading-relaxed font-light">{card.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Comparative Audit Graph (Right) */}
          <div className="lg:col-span-5 bg-brand-card border border-white/5 p-8 rounded-3xl shadow-2xl relative">
            <h3 className="font-serif text-lg font-bold text-white mb-6">Service Comparison Audit</h3>
            <p className="text-xs text-neutral-400 mb-8 font-light leading-relaxed">
              We audit our services against generic vendors to ensure every guest receives a true 5-star hospitality experience.
            </p>

            <div className="space-y-6">
              {comparisonData.map((data, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-neutral-300">{data.metric}</span>
                    <span className="text-gold font-bold">{data.aura}% Compliance</span>
                  </div>
                  
                  {/* Progress bars */}
                  <div className="space-y-1.5">
                    {/* Aura bar */}
                    <div className="h-2 w-full bg-brand-dark rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-gold-dark to-gold rounded-full transition-all duration-1000"
                        style={{ width: `${hasAnimated ? data.aura : 0}%` }}
                      />
                    </div>
                    {/* Standard bar */}
                    <div className="flex items-center justify-between text-[10px] text-neutral-500">
                      <span>Standard Caterers: {data.standard}%</span>
                      <div className="h-1.5 w-1/3 bg-brand-dark rounded-full overflow-hidden">
                        <div
                          className="h-full bg-neutral-700 rounded-full transition-all duration-1000"
                          style={{ width: `${hasAnimated ? data.standard : 0}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 text-[10px] text-center text-neutral-400 italic">
              * Independent audit logs verified according to regional food safety departments.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
