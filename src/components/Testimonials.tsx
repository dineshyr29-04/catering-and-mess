"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

export default function Testimonials() {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);

  const reviews = [
    {
      name: "Rohit & Meera Singhal",
      role: "Wedding Hosts",
      quote: "Aura made our daughter's wedding celebration completely unforgettable. The guests couldn't stop praising the live Rajasthani Dal Baati counters and the premium plated dessert presentation. Flawless service!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Sanjay Deshmukh",
      role: "VP Operations, TechCorp",
      quote: "We hired Aura for our annual corporate banquet of 500+ guests. The food was clean, perfectly balanced, and delivered exactly on time. Their professional staff managed the VIP table protocols exceptionally.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Anjali Verma",
      role: "Working Professional",
      quote: "I've been subscribing to Aura's professional lunch box mess for 6 months now. It's truly homestyle—low on oil, fresh ingredients, and highly customizable. It's the highlight of my stressful workdays!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
    }
  ];

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % reviews.length);
    }, 6000);
    return () => clearInterval(slideTimer);
  }, []);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % reviews.length);
  };

  return (
    <section id="testimonials" className="relative py-24 bg-[#0c0e14]">
      {/* Background decoration */}
      <div className="absolute left-10 bottom-10 w-72 h-72 rounded-full bg-gold/5 blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-gold font-bold text-xs uppercase tracking-[0.25em]">{t("testiSubtitle")}</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mt-3">
            {t("testiTitle")}
          </h2>
          <div className="w-12 h-1 bg-gold mx-auto mt-6" />
        </div>

        {/* Carousel Container */}
        <div className="relative glass-premium rounded-3xl p-8 sm:p-12 border border-gold/15 shadow-2xl overflow-hidden min-h-[320px] flex flex-col justify-between">
          <Quote className="absolute right-8 top-8 w-20 h-20 text-gold/[0.03] rotate-180" />
          
          <div className="relative z-10">
            {/* Stars */}
            <div className="flex gap-1 text-gold mb-6 justify-center sm:justify-start">
              {[...Array(reviews[activeIndex].rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-gold text-gold" />
              ))}
            </div>

            {/* Testimonial Quote */}
            <blockquote className="font-serif text-lg sm:text-xl md:text-2xl text-white font-light italic leading-relaxed text-center sm:text-left mb-8 min-h-[120px] transition-all duration-500">
              &ldquo;{reviews[activeIndex].quote}&rdquo;
            </blockquote>
          </div>

          {/* Reviewer Bio / Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-white/5 pt-8">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <img
                src={reviews[activeIndex].image}
                alt={reviews[activeIndex].name}
                className="w-12 h-12 rounded-full border border-gold/45 object-cover"
              />
              <div>
                <h4 className="font-serif text-base font-bold text-white">{reviews[activeIndex].name}</h4>
                <p className="text-xs text-neutral-400 font-light mt-0.5">{reviews[activeIndex].role}</p>
              </div>
            </div>

            {/* Button controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                className="p-3 rounded-full bg-brand-dark/50 hover:bg-gold hover:text-brand-dark text-neutral-400 border border-white/5 hover:border-gold transition-all duration-300"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-bold text-neutral-400 tracking-wider">
                0{activeIndex + 1} / 0{reviews.length}
              </span>
              <button
                onClick={handleNext}
                className="p-3 rounded-full bg-brand-dark/50 hover:bg-gold hover:text-brand-dark text-neutral-400 border border-white/5 hover:border-gold transition-all duration-300"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
