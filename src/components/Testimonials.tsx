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
    <section id="testimonials" className="relative py-20 bg-[#faf9f6]">
      <div className="w-full px-6 md:px-16 lg:px-24 relative z-10">
        
        {/* Header */}
        <div className="max-w-xl mb-12">
          <span className="text-gold font-bold text-xs uppercase tracking-[0.25em]">{t("testiSubtitle")}</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 mt-2">
            {t("testiTitle")}
          </h2>
          <div className="w-12 h-0.5 bg-gold mt-4" />
        </div>

        {/* Carousel Container - White Card styled */}
        <div className="relative bg-white rounded-3xl p-8 sm:p-10 border border-neutral-100 shadow-[0_15px_40px_rgba(0,0,0,0.02)] overflow-hidden min-h-[280px] flex flex-col justify-between">
          <Quote className="absolute right-8 top-8 w-16 h-16 text-neutral-100 rotate-180 pointer-events-none" />
          
          <div className="relative z-10">
            {/* Stars */}
            <div className="flex gap-0.5 text-gold mb-5 justify-center sm:justify-start">
              {[...Array(reviews[activeIndex].rating)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" />
              ))}
            </div>

            {/* Testimonial Quote */}
            <blockquote className="font-serif text-base sm:text-lg md:text-xl text-neutral-850 font-light italic leading-relaxed text-center sm:text-left mb-6 min-h-[100px] transition-all duration-500">
              &ldquo;{reviews[activeIndex].quote}&rdquo;
            </blockquote>
          </div>

          {/* Reviewer Bio / Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-neutral-100 pt-6">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <img
                src={reviews[activeIndex].image}
                alt={reviews[activeIndex].name}
                className="w-10 h-10 rounded-full border border-neutral-200 object-cover"
              />
              <div>
                <h4 className="font-serif text-sm font-bold text-neutral-800">{reviews[activeIndex].name}</h4>
                <p className="text-[10px] text-neutral-400 font-medium mt-0.5">{reviews[activeIndex].role}</p>
              </div>
            </div>

            {/* Button controls */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={handlePrev}
                className="p-2 rounded-full border border-neutral-200 text-neutral-450 hover:bg-neutral-900 hover:text-white transition-all duration-300"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <span className="text-[10px] font-bold text-neutral-450 tracking-wider">
                0{activeIndex + 1} / 0{reviews.length}
              </span>
              <button
                onClick={handleNext}
                className="p-2 rounded-full border border-neutral-200 text-neutral-450 hover:bg-neutral-900 hover:text-white transition-all duration-300"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
