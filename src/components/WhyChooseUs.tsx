"use client";

import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Award, ShieldCheck, HeartHandshake, Hourglass, Utensils, Sliders } from "lucide-react";

export default function WhyChooseUs() {
  const { t } = useLanguage();
  
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
        animateVal(setChefs, 12, 1000);
        animateVal(setEvents, 500, 1500);
        animateVal(setMeals, 2500, 1500);
        animateVal(setYears, 10, 1000);
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
    handleScroll();
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
    <section ref={sectionRef} className="relative py-20 bg-white">
      <div className="w-full px-6 md:px-16 lg:px-24">
        
        {/* Header */}
        <div className="max-w-xl mb-12">
          <span className="text-gold font-bold text-xs uppercase tracking-[0.25em]">{t("whySubtitle")}</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 mt-2">
            {t("whyTitle")}
          </h2>
          <div className="w-12 h-0.5 bg-gold mt-4" />
        </div>

        {/* Counter Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { value: chefs, suffix: "+", label: t("chefsCount") },
            { value: events, suffix: "+", label: t("eventsCount") },
            { value: meals, suffix: "+", label: t("mealsCount") },
            { value: years, suffix: "+", label: t("yearsCount") }
          ].map((stat, idx) => (
            <div key={idx} className="text-center bg-[#faf9f6] border border-neutral-100 p-5 rounded-xl shadow-sm">
              <span className="font-serif text-3xl md:text-4xl font-bold gold-text-gradient block mb-1">
                {stat.value}{stat.suffix}
              </span>
              <span className="text-[10px] uppercase font-bold text-neutral-500 tracking-wider">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Features Cards Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {cards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <div key={idx} className="p-5 rounded-xl bg-white border border-neutral-100 hover:border-gold/30 hover:bg-[#faf9f6]/20 transition-all duration-300 group shadow-sm">
                  <div className="w-9 h-9 rounded-xl bg-gold/10 text-gold flex items-center justify-center mb-3 group-hover:bg-neutral-900 group-hover:text-white transition-all">
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                  <h4 className="text-xs font-bold text-neutral-850 mb-1">{card.title}</h4>
                  <p className="text-[11px] text-neutral-500 leading-relaxed font-light">{card.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Comparative Audit Graph */}
          <div className="lg:col-span-5 bg-[#faf9f6] border border-neutral-100 p-6 sm:p-8 rounded-2xl shadow-sm relative">
            <h3 className="font-serif text-base font-bold text-neutral-800 mb-4">Service Comparison Audit</h3>
            <p className="text-[11px] text-neutral-500 mb-6 font-light leading-relaxed">
              We audit our services against generic vendors to ensure every guest receives a true 5-star hospitality experience.
            </p>

            <div className="space-y-5">
              {comparisonData.map((data, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-[11px] font-bold">
                    <span className="text-neutral-700">{data.metric}</span>
                    <span className="text-gold">{data.aura}% Compliance</span>
                  </div>
                  
                  {/* Progress bars */}
                  <div className="space-y-1">
                    <div className="h-1.5 w-full bg-neutral-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-gold-dark to-gold rounded-full transition-all duration-1000"
                        style={{ width: `${hasAnimated ? data.aura : 0}%` }}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between text-[9px] text-neutral-400">
                      <span>Standard Caterers: {data.standard}%</span>
                      <div className="h-1 w-1/3 bg-neutral-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-neutral-400 rounded-full transition-all duration-1000"
                          style={{ width: `${hasAnimated ? data.standard : 0}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
