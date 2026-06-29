"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Sparkles, CalendarRange, Building2, Palmtree } from "lucide-react";

export default function Services() {
  const { t } = useLanguage();

  const servicesList = [
    {
      id: "wedding",
      icon: Sparkles,
      title: t("weddingCatering"),
      desc: t("weddingDesc"),
      image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=600&q=80",
      features: ["Customized Plated Menu", "Theme Food Stall Decor", "Fine Dining Hospitality Staff", "Live Gastronomy Counters"],
      formValue: "Wedding Catering"
    },
    {
      id: "corporate",
      icon: Building2,
      title: t("corporateCatering"),
      desc: t("corporateDesc"),
      image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=600&q=80",
      features: ["High-End Bento Lunches", "Executive Buffet spreads", "Hygienic Daily Office Meals", "VIP Dinner Protocols"],
      formValue: "Corporate Catering"
    },
    {
      id: "event",
      icon: CalendarRange,
      title: t("eventCatering"),
      desc: t("eventDesc"),
      image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=600&q=80",
      features: ["Milestone Birthday Buffets", "Anniversary Fine Platters", "Housewarming Traditional Meals", "Creative Cocktail Mixologists"],
      formValue: "Party Catering"
    },
    {
      id: "bulk",
      icon: Palmtree,
      title: t("bulkCatering"),
      desc: t("bulkDesc"),
      image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=600&q=80",
      features: ["PG & Hostel Mess Management", "Industrial Canteen Operations", "Consistent Calorie-count Menus", "Strict Safety Audited Operations"],
      formValue: "Hostel/PG Mess Services"
    }
  ];

  const handleEnquireClick = (formValue: string) => {
    const selectEl = document.getElementById("enquiry-event-type") as HTMLSelectElement;
    if (selectEl) {
      selectEl.value = formValue;
      const event = new Event('change', { bubbles: true });
      selectEl.dispatchEvent(event);
    }
    
    const formSection = document.getElementById("contact");
    if (formSection) {
      const offset = 90;
      const elementPosition = formSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <section id="services" className="relative py-20 bg-[#faf9f6]">
      <div className="w-full px-6 md:px-16 lg:px-24 relative z-10">
        
        {/* Header */}
        <div className="max-w-xl mb-16">
          <span className="text-gold font-bold text-xs uppercase tracking-[0.25em]">{t("servicesSubtitle")}</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 mt-2">
            {t("servicesTitle")}
          </h2>
          <div className="w-12 h-0.5 bg-gold mt-4" />
        </div>

        {/* Services Grid - 4 Columns in full width, spacious but compact */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesList.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="group relative h-[360px] rounded-2xl overflow-hidden border border-neutral-100 bg-white flex flex-col justify-end p-6 shadow-sm hover:shadow-xl hover:border-gold/30 transition-all duration-500"
              >
                {/* Background image zoomable */}
                <div
                  className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105 opacity-15 group-hover:opacity-20"
                  style={{ backgroundImage: `url(${service.image})` }}
                />
                
                {/* Light gradient cover */}
                <div className="absolute inset-0 z-0 bg-gradient-to-t from-white via-white/95 to-transparent pointer-events-none" />
                
                {/* Content */}
                <div className="relative z-10 w-full">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-xl bg-gold/10 text-gold group-hover:bg-gold group-hover:text-white transition-all duration-300">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="font-serif text-base font-bold text-neutral-800 group-hover:text-gold transition-colors duration-300">
                      {service.title.split(" ")[0]}
                    </h3>
                  </div>

                  <p className="text-neutral-500 text-[11px] font-light leading-relaxed mb-4">
                    {service.desc}
                  </p>

                  <div className="flex flex-col gap-1 mb-4">
                    {service.features.slice(0, 2).map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-1.5 text-[9px] text-neutral-400 font-medium">
                        <span className="w-1 h-1 rounded-full bg-gold" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => handleEnquireClick(service.formValue)}
                    className="w-full py-2.5 rounded-full bg-transparent hover:bg-neutral-900 text-gold hover:text-white border border-gold/30 hover:border-neutral-900 text-[9px] font-bold uppercase tracking-widest transition-all duration-300"
                  >
                    {t("enquireNow")}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
