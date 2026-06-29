"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ShieldCheck, Award, Users, UtensilsCrossed, ArrowRight } from "lucide-react";

const heroImages = [
  "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1920&q=80", // Premium catering buffet setup
  "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1920&q=80", // Premium plated main course
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1920&q=80"  // Luxury restaurant chef preparation
];

export default function Hero() {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleExploreClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(target);
    if (targetElement) {
      const offset = 80;
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
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#08090b]">
      {/* Background Image Carousel with Zoom/Fade transitions */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((img, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 bg-cover bg-center transition-all duration-[2000ms] ease-out transform ${
              idx === currentSlide
                ? "opacity-40 scale-105 pointer-events-auto"
                : "opacity-0 scale-100 pointer-events-none"
            }`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
        {/* Luxury Vignette and Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090b] via-[#08090b]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#08090b] via-[#08090b]/30 to-transparent" />
        {/* Fine-line grid pattern overlay for hospitality aesthetic */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(197,168,128,0.1),rgba(255,255,255,0))]" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-16 flex flex-col items-center justify-between min-h-[calc(100vh-80px)] w-full">
        {/* Hero Copy */}
        <div className="flex-1 flex flex-col justify-center items-center text-center max-w-4xl mt-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/30 bg-gold/5 backdrop-blur-md text-gold text-xs font-semibold uppercase tracking-[0.25em] mb-6 animate-pulse-slow">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-ping" />
            {t("storySubtitle")}
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1] md:leading-[1.15]">
            Crafting Memorable <br className="hidden sm:inline" />
            <span className="gold-text-gradient">Experiences</span> Through <br className="hidden sm:inline" />
            Exceptional Food
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-neutral-300 max-w-2xl mb-10 leading-relaxed font-light">
            {t("heroSubtext")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <a
              href="#contact"
              onClick={(e) => handleExploreClick(e, "#contact")}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-gold-dark to-gold text-[#08090b] font-bold text-sm tracking-widest uppercase hover:from-gold hover:to-gold-light transition-all duration-300 shadow-[0_10px_30px_rgba(197,168,128,0.3)] flex items-center justify-center gap-2 hover:scale-[1.03]"
            >
              <span>{t("planEvent")}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#services"
              onClick={(e) => handleExploreClick(e, "#services")}
              className="px-8 py-4 rounded-full border border-white/20 hover:border-gold hover:text-gold text-white font-bold text-sm tracking-widest uppercase transition-all duration-300 bg-white/5 backdrop-blur-md flex items-center justify-center"
            >
              {t("exploreServices")}
            </a>
          </div>
        </div>

        {/* Floating Trust Badges */}
        <div className="w-full mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl">
          {trustBadges.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <div
                key={idx}
                className="glass-premium hover:border-gold/30 p-5 rounded-2xl flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-3.5 transition-all duration-300 group hover:translate-y-[-4px]"
              >
                <div className="p-2.5 rounded-lg bg-gold/10 text-gold group-hover:bg-gold group-hover:text-brand-dark transition-colors duration-300">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1">
                    {badge.text.split(" ").slice(1).join(" ")}
                  </h4>
                  <p className="text-sm font-bold text-white tracking-wide">
                    {badge.text.split(" ")[0]}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Luxury Bottom Shadow Transition */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#08090b] to-transparent pointer-events-none" />
    </section>
  );
}
