"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Award, Users, UtensilsCrossed, ShieldCheck, ArrowRight } from "lucide-react";

const heroImages = [
  "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80"
];

export default function Hero() {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleExploreClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(target);
    if (targetElement) {
      const offset = 90;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const trustBadges = [
    { icon: Award, text: t("badgeExp") },
    { icon: UtensilsCrossed, text: t("badgeKitchen") },
    { icon: Users, text: t("badgeEvents") },
    { icon: ShieldCheck, text: t("badgeTeam") }
  ];

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center bg-white overflow-hidden pt-24 pb-16">
      {/* Background Decorative lines for high-end feel */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e5e5_1px,transparent_1px)] [background-size:24px_24px] opacity-40 z-0" />

      {/* Split Layout: Full width */}
      <div className="w-full px-6 md:px-16 lg:px-24 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left: Text copy (7 columns on large screens) */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left">
          
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/25 bg-gold/5 text-gold text-[10px] font-bold uppercase tracking-[0.25em] mb-6 self-start">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            {t("storySubtitle")}
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-bold tracking-tight text-neutral-900 mb-6 leading-[1.1]">
            Crafting Memorable <br />
            <span className="text-gold">Experiences</span> <br />
            Through Exceptional Food
          </h1>

          <p className="text-neutral-500 text-sm sm:text-base md:text-lg max-w-xl mb-10 leading-relaxed font-light">
            {t("heroSubtext")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <a
              href="#contact"
              onClick={(e) => handleExploreClick(e, "#contact")}
              className="px-8 py-4 rounded-full bg-neutral-900 text-white font-bold text-[10px] tracking-widest uppercase hover:bg-gold transition-all duration-300 shadow-lg shadow-neutral-900/10 flex items-center justify-center gap-2 hover:scale-[1.02]"
            >
              <span>{t("planEvent")}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <a
              href="#services"
              onClick={(e) => handleExploreClick(e, "#services")}
              className="px-8 py-4 rounded-full border border-neutral-200 hover:border-gold hover:text-gold text-neutral-600 font-bold text-[10px] tracking-widest uppercase transition-all duration-300 bg-white/50 backdrop-blur-sm flex items-center justify-center"
            >
              {t("exploreServices")}
            </a>
          </div>

          {/* Minimal inline trust badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-neutral-100 max-w-3xl">
            {trustBadges.map((badge, idx) => {
              const Icon = badge.icon;
              return (
                <div key={idx} className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-gold shrink-0" />
                  <span className="text-[10px] font-bold text-neutral-600 uppercase tracking-wider">
                    {badge.text}
                  </span>
                </div>
              );
            })}
          </div>

        </div>

        {/* Right: Dynamic Plated Food Gallery slider (5 columns on large screens) */}
        <div className="lg:col-span-5 relative h-[380px] sm:h-[480px] rounded-3xl overflow-hidden shadow-2xl border border-neutral-100">
          {heroImages.map((img, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 bg-cover bg-center transition-all duration-[1500ms] ease-out transform ${
                idx === currentSlide ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
              }`}
              style={{ backgroundImage: `url(${img})` }}
            />
          ))}
          
          {/* Subtle gold bottom gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          
          {/* Interactive slide counters at bottom */}
          <div className="absolute bottom-6 left-6 flex gap-2.5 z-20">
            {heroImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-1 rounded-full transition-all duration-300 ${
                  idx === currentSlide ? "w-8 bg-white" : "w-2 bg-white/50 hover:bg-white"
                }`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
