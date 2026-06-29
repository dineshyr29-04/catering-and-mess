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
      desc: "Every dish is cooked by chefs who care, respecting traditional cooking processes and authentic slow-simmering methods."
    },
    {
      icon: ShieldCheck,
      title: "5-Star Safety standard",
      desc: "Daily kitchen sanitization, strict ingredient sorting, and continuous health checkups for our kitchen crew."
    },
    {
      icon: ChefHat,
      title: "Royal Indian Spices",
      desc: "We grind our own spices locally, importing regional specialties (like Kashmiri chilies and Tellicherry pepper) for true taste profiles."
    }
  ];

  return (
    <section id="about" className="relative py-24 bg-[#08090b]">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/4 left-10 w-96 h-96 rounded-full bg-gold/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full bg-amber-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-gold font-bold text-xs uppercase tracking-[0.25em]">{t("storySubtitle")}</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mt-3">
            {t("storyTitle")}
          </h2>
          <div className="w-12 h-1 bg-gold mx-auto mt-6" />
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Image & Bio Card */}
          <div className="lg:col-span-5 relative group">
            {/* Background glowing frame */}
            <div className="absolute inset-0 bg-gradient-to-r from-gold to-amber-600 rounded-3xl opacity-20 group-hover:opacity-30 blur-lg transition-all duration-500" />
            
            {/* Chef Profile Frame */}
            <div className="relative overflow-hidden rounded-3xl border border-gold/15 bg-brand-card">
              <img
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=600&q=80"
                alt="Chef Vikram Adiga"
                className="w-full h-[380px] object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/20 to-transparent" />
              
              {/* Bio Block */}
              <div className="absolute bottom-0 left-0 right-0 p-6 backdrop-blur-sm bg-brand-dark/60 border-t border-white/5">
                <h4 className="font-serif text-lg font-bold text-white">{t("founderText")}</h4>
                <p className="text-xs text-gold uppercase tracking-wider mt-1">{t("philosophyTitle")}</p>
                <p className="text-xs text-neutral-300 mt-2 font-light leading-relaxed">
                  &ldquo;A recipe has no soul. As a chef, I must bring soul to the recipe. With Aura, we cook to make your event legendary.&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Story & History Tabs */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-white mb-6">
              Refined Indian Culinary Heritage
            </h3>
            
            <p className="text-neutral-300 text-sm md:text-base leading-relaxed mb-6 font-light">
              {t("storyP1")}
            </p>
            
            <p className="text-neutral-400 text-sm leading-relaxed mb-8 font-light">
              {t("storyP2")}
            </p>

            {/* Philosophy Items */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
              {philosophyItems.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="p-4 rounded-xl bg-brand-card border border-white/5 hover:border-gold/20 transition-all duration-300">
                    <Icon className="w-5 h-5 text-gold mb-3" />
                    <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-1.5">{item.title}</h5>
                    <p className="text-xs text-neutral-400 font-light leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* Timeline Tabs */}
            <div className="border border-white/5 rounded-2xl bg-brand-card/40 p-6 overflow-hidden">
              <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-4">
                <History className="w-4 h-4 text-gold" />
                <span className="text-xs uppercase font-semibold text-neutral-300 tracking-wider">Our Milestones Journey</span>
              </div>
              
              {/* Year Selectors */}
              <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-none">
                {timelineData.map((t, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTab(idx)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all duration-300 ${
                      idx === activeTab
                        ? "bg-gold text-[#08090b]"
                        : "bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {t.year}
                  </button>
                ))}
              </div>

              {/* Active Tab Content */}
              <div className="min-h-[100px] transition-all duration-300 animate-fade-in">
                <h4 className="text-sm font-bold text-white mb-2">{timelineData[activeTab].title}</h4>
                <p className="text-xs text-neutral-400 leading-relaxed font-light">
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
