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
      image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80",
      features: ["Customized Plated Menu", "Theme Food Stall Decor", "Fine Dining Hospitality Staff", "Live Gastronomy Counters"],
      formValue: "Wedding Catering"
    },
    {
      id: "corporate",
      icon: Building2,
      title: t("corporateCatering"),
      desc: t("corporateDesc"),
      image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80",
      features: ["High-End Bento Lunches", "Executive Buffet spreads", "Hygienic Daily Office Meals", "VIP Dinner Protocols"],
      formValue: "Corporate Catering"
    },
    {
      id: "event",
      icon: CalendarRange,
      title: t("eventCatering"),
      desc: t("eventDesc"),
      image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80",
      features: ["Milestone Birthday Buffets", "Anniversary Fine Platters", "Housewarming Traditional Meals", "Creative Cocktail Mixologists"],
      formValue: "Party Catering"
    },
    {
      id: "bulk",
      icon: Palmtree,
      title: t("bulkCatering"),
      desc: t("bulkDesc"),
      image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80",
      features: ["PG & Hostel Mess Management", "Industrial Canteen Operations", "Consistent Calorie-count Menus", "Strict Safety Audited Operations"],
      formValue: "Hostel/PG Mess Services"
    }
  ];

  const handleEnquireClick = (formValue: string) => {
    // Fill the Booking/Enquiry form's event type field if exists
    const selectEl = document.getElementById("enquiry-event-type") as HTMLSelectElement;
    if (selectEl) {
      selectEl.value = formValue;
      // Trigger a synthetic change event to update local React state if any
      const event = new Event('change', { bubbles: true });
      selectEl.dispatchEvent(event);
    }
    
    // Smooth scroll to enquiry form
    const formSection = document.getElementById("contact");
    if (formSection) {
      const offset = 80;
      const elementPosition = formSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <section id="services" className="relative py-24 bg-[#0c0e14]">
      {/* Background glow lines */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-gold font-bold text-xs uppercase tracking-[0.25em]">{t("servicesSubtitle")}</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mt-3">
            {t("servicesTitle")}
          </h2>
          <div className="w-12 h-1 bg-gold mx-auto mt-6" />
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {servicesList.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="group relative h-[420px] rounded-3xl overflow-hidden border border-white/5 bg-brand-dark flex flex-col justify-end p-8 lg:p-10 shadow-2xl transition-all duration-500 hover:border-gold/30 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              >
                {/* Background image zoomable */}
                <div
                  className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110 opacity-30 group-hover:opacity-40"
                  style={{ backgroundImage: `url(${service.image})` }}
                />
                
                {/* Golden/Dark overlay gradient */}
                <div className="absolute inset-0 z-0 bg-gradient-to-t from-brand-dark via-brand-dark/95 to-transparent transition-all duration-500 group-hover:via-brand-dark/90" />
                
                {/* Content */}
                <div className="relative z-10 w-full">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-2xl bg-gold/10 text-gold group-hover:bg-gold group-hover:text-brand-dark transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-white group-hover:text-gold transition-colors duration-300">
                      {service.title}
                    </h3>
                  </div>

                  <p className="text-neutral-300 text-sm font-light leading-relaxed mb-6">
                    {service.desc}
                  </p>

                  {/* Bullet features visible on hover or desktop */}
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-6 opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-[120px] transition-all duration-500 ease-in-out">
                    {service.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-1.5 text-xs text-neutral-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => handleEnquireClick(service.formValue)}
                      className="px-6 py-3 rounded-full bg-transparent hover:bg-gold text-gold hover:text-brand-dark border border-gold/30 hover:border-gold text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md flex-1 text-center"
                    >
                      {t("enquireNow")}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
