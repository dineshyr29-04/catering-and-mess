"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ChefHat, History, Heart, ShieldCheck } from "lucide-react";

export default function BrandStory() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState(0);

  const timelineData = [
    {
      year: "2016",
      title: "The Vision Began",
      desc: "Chef Vikram founded Aura in a small boutique kitchen in Bangalore with a simple dream: to elevate traditional Indian meals into culinary fine art. Starting with family get-togethers, we gained a reputation for unmatched authentic taste."
    },
    {
      year: "2019",
      title: "Catering for Elite Galas",
      desc: "Expanding our kitchen infrastructure, we launched our bespoke Event Catering division. Handling grand weddings, conferences, and high-profile gatherings of up to 2,000 guests, our kitchen became a benchmark of banquet excellence."
    },
    {
      year: "2022",
      title: "Everyday Mess Reimagined",
      desc: "Recognizing a massive gap in clean, high-nutrition daily meal subscriptions for hostels, PGs, and corporate hubs, we introduced our premium Mess Services—bridging the comfort of home food with five-star preparation standards."
    },
    {
      year: "2026",
      title: "Next-Gen Smart Kitchens",
      desc: "Today, we operate from two state-of-the-art HACCP-certified smart base kitchens. Our fully digitalized inventory tracking, specialized temperature-controlled delivery vans, and online portal ensure every plate is fresh."
    }
  ];

  const philosophyItems = [
    {
      icon: Heart,
      title: "Prepared with Love",
      desc: "Every dish is cooked by chefs who care, respecting traditional cooking processes."
    },
    {
      icon: ShieldCheck,
      title: "5-Star Safety",
      desc: "Daily kitchen sanitization, strict ingredient sorting, and continuous health checkups."
    },
    {
      icon: ChefHat,
      title: "Royal Indian Spices",
      desc: "We grind our own spices locally, importing regional specialties for true taste."
    }
  ];

  return (
    <section id="about" className="relative py-20 bg-white">
      {/* Split layout: full width container */}
      <div className="w-full px-6 md:px-16 lg:px-24">
        
        {/* Header */}
        <div className="max-w-xl mb-16">
          <span className="text-gold font-bold text-xs uppercase tracking-[0.25em]">{t("storySubtitle")}</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 mt-2">
            {t("storyTitle")}
          </h2>
          <div className="w-12 h-0.5 bg-gold mt-4" />
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Image & Bio Card */}
          <div className="lg:col-span-5 relative group">
            {/* Chef Profile Frame */}
            <div className="relative overflow-hidden rounded-2xl border border-neutral-100 bg-[#faf9f6]">
              <img
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=600&q=80"
                alt="Chef Vikram Adiga"
                className="w-full h-[360px] object-cover object-top transition-transform duration-700 group-hover:scale-103"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent opacity-60" />
              
              {/* Bio Block */}
              <div className="absolute bottom-0 left-0 right-0 p-6 backdrop-blur-sm bg-neutral-900/40 border-t border-white/10">
                <h4 className="font-serif text-base font-bold text-white">{t("founderText")}</h4>
                <p className="text-[10px] text-gold uppercase tracking-wider mt-0.5">{t("philosophyTitle")}</p>
                <p className="text-[11px] text-neutral-200 mt-2 font-light leading-relaxed">
                  &ldquo;A recipe has no soul. As a chef, I must bring soul to the recipe. With Aura, we cook to make your event legendary.&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Story & History Tabs */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-neutral-900 mb-5">
              Refined Indian Culinary Heritage
            </h3>
            
            <p className="text-neutral-600 text-sm leading-relaxed mb-6 font-light">
              {t("storyP1")}
            </p>

            {/* Philosophy Items */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              {philosophyItems.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="p-5 rounded-xl bg-[#faf9f6] border border-neutral-100 hover:border-gold/30 transition-all duration-300">
                    <Icon className="w-5 h-5 text-gold mb-3 animate-pulse" />
                    <h5 className="text-[10px] font-bold text-neutral-800 uppercase tracking-wider mb-1.5">{item.title}</h5>
                    <p className="text-[11px] text-neutral-500 font-light leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* Timeline Tabs */}
            <div className="border border-neutral-100 rounded-2xl bg-[#faf9f6]/40 p-6 overflow-hidden">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-neutral-100">
                <History className="w-4 h-4 text-gold" />
                <span className="text-[10px] uppercase font-bold text-neutral-500 tracking-wider">Our Milestones Journey</span>
              </div>
              
              {/* Year Selectors */}
              <div className="flex gap-2 mb-4 overflow-x-auto pb-1 scrollbar-none">
                {timelineData.map((t, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTab(idx)}
                    className={`px-4 py-2 rounded-lg text-[10px] font-bold transition-all duration-300 ${
                      idx === activeTab
                        ? "bg-gold text-white shadow-md shadow-gold/10"
                        : "bg-white text-neutral-500 border border-neutral-150 hover:bg-neutral-50"
                    }`}
                  >
                    {t.year}
                  </button>
                ))}
              </div>

              {/* Active Tab Content */}
              <div className="min-h-[80px] transition-all duration-300 animate-fade-in">
                <h4 className="text-xs font-bold text-neutral-800 mb-1">{timelineData[activeTab].title}</h4>
                <p className="text-[11px] text-neutral-500 leading-relaxed font-light">
                  {timelineData[activeTab].desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
