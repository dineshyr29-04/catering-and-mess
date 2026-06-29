"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useAdmin, MenuItem } from "@/context/AdminContext";
import { Sparkles, ShoppingBag, Send, X, ClipboardCheck } from "lucide-react";

export default function MenuSection() {
  const { t } = useLanguage();
  const { menuItems, addEnquiry } = useAdmin();
  const [activeTab, setActiveTab] = useState<MenuItem["category"]>("breakfast");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  
  // Custom Menu Builder states
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [selectedItemsForMenu, setSelectedItemsForMenu] = useState<string[]>([]);
  const [builderName, setBuilderName] = useState("");
  const [builderPhone, setBuilderPhone] = useState("");
  const [builderGuests, setBuilderGuests] = useState("50");
  const [builderPref, setBuilderPref] = useState("Veg");
  const [isSuccess, setIsSuccess] = useState(false);

  const categories: { key: MenuItem["category"]; label: string }[] = [
    { key: "breakfast", label: t("breakfast") },
    { key: "lunch", label: t("lunch") },
    { key: "dinner", label: t("dinner") },
    { key: "traditional", label: t("traditional") },
    { key: "packages", label: t("packages") },
  ];

  const filteredItems = menuItems.filter((item) => item.category === activeTab);

  const toggleItemSelection = (id: string) => {
    setSelectedItemsForMenu((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleBuildSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!builderName || !builderPhone) return;

    const chosenDishNames = menuItems
      .filter((m) => selectedItemsForMenu.includes(m.id))
      .map((m) => m.name)
      .join(", ");

    addEnquiry({
      name: builderName,
      phone: builderPhone,
      email: "",
      type: "Catering",
      eventType: "Custom Menu Proposal",
      guests: parseInt(builderGuests) || 50,
      preference: builderPref,
      message: `Custom Menu Builder Request. Selected Dishes: [${chosenDishNames}]`,
      date: new Date().toISOString().split('T')[0]
    });

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setIsBuilderOpen(false);
      setSelectedItemsForMenu([]);
      setBuilderName("");
      setBuilderPhone("");
    }, 4000);
  };

  return (
    <section id="menu" className="relative py-24 bg-[#08090b]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-xl">
            <span className="text-gold font-bold text-xs uppercase tracking-[0.25em]">{t("menuSubtitle")}</span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mt-3">
              {t("menuTitle")}
            </h2>
            <div className="w-12 h-1 bg-gold mt-6" />
          </div>

          <button
            onClick={() => setIsBuilderOpen(true)}
            className="self-start md:self-auto px-6 py-3 rounded-full bg-gradient-to-r from-gold-dark to-gold text-brand-dark font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_5px_15px_rgba(197,168,128,0.15)] hover:scale-105 hover:shadow-[0_8px_20px_rgba(197,168,128,0.25)] flex items-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>{t("requestCustom")}</span>
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-white/5 gap-2 overflow-x-auto pb-px mb-12 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveTab(cat.key)}
              className={`px-6 py-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all duration-300 whitespace-nowrap ${
                activeTab === cat.key
                  ? "border-gold text-gold"
                  : "border-transparent text-neutral-400 hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group cursor-pointer rounded-2xl border border-white/5 bg-brand-card overflow-hidden transition-all duration-300 hover:border-gold/30 hover:translate-y-[-4px]"
            >
              {/* Product Image */}
              <div className="h-[240px] relative overflow-hidden bg-brand-dark">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Chef Recommended Badge */}
                {item.chefRecommended && (
                  <div className="absolute top-4 left-4 bg-brand-dark/80 backdrop-blur-md border border-gold/40 text-gold px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest flex items-center gap-1.5 shadow-lg">
                    <Sparkles className="w-3 h-3" />
                    <span>{t("chefRecommended")}</span>
                  </div>
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-brand-card/90 via-transparent to-transparent" />
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="flex justify-between items-start gap-4 mb-2">
                  <h3 className="font-serif text-lg font-bold text-white group-hover:text-gold transition-colors duration-300">
                    {item.name}
                  </h3>
                  <span className="text-gold font-bold text-base whitespace-nowrap">{item.price}</span>
                </div>
                
                <p className="text-neutral-400 text-xs font-light leading-relaxed line-clamp-2">
                  {item.description}
                </p>
                
                <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-neutral-400 group-hover:text-gold transition-colors duration-300">
                  <span>{t("viewDetailsBtn")}</span>
                  <span>→</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Detail Modal */}
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-dark/80 backdrop-blur-md animate-fade-in">
            <div className="glass-premium rounded-3xl overflow-hidden max-w-2xl w-full border border-gold/30 shadow-2xl relative">
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-brand-dark/50 text-neutral-400 hover:text-white hover:bg-brand-dark/80 border border-white/5 transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="h-[280px] md:h-full relative min-h-[280px] bg-brand-dark">
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.name}
                    className="w-full h-full object-cover"
                  />
                  {selectedItem.chefRecommended && (
                    <div className="absolute top-4 left-4 bg-brand-dark/90 text-gold px-3.5 py-1.5 rounded-full text-[10px] uppercase font-bold tracking-widest border border-gold/30 shadow-lg">
                      {t("chefRecommended")}
                    </div>
                  )}
                </div>

                <div className="p-8 flex flex-col justify-between">
                  <div>
                    <span className="text-xs uppercase text-gold font-bold tracking-widest">
                      {categories.find((c) => c.key === selectedItem.category)?.label}
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-white mt-2 mb-3">
                      {selectedItem.name}
                    </h3>
                    <p className="text-gold font-bold text-xl mb-4">{selectedItem.price}</p>
                    <hr className="border-white/5 my-4" />
                    
                    <p className="text-neutral-300 text-xs font-light leading-relaxed mb-4">
                      {selectedItem.description}
                    </p>
                    
                    {selectedItem.details && (
                      <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-[11px] text-neutral-400 italic">
                        <strong>Preparation Note:</strong> {selectedItem.details}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      setSelectedItem(null);
                      const selectEl = document.getElementById("enquiry-event-type") as HTMLSelectElement;
                      if (selectEl) selectEl.value = "Party Catering";
                      const formSection = document.getElementById("contact");
                      if (formSection) formSection.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="mt-6 w-full py-3 rounded-full bg-gradient-to-r from-gold-dark to-gold text-[#08090b] text-xs font-bold uppercase tracking-wider text-center transition-all hover:scale-[1.02]"
                  >
                    Enquire About {selectedItem.name}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Custom Menu Builder Modal */}
        {isBuilderOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-dark/80 backdrop-blur-md overflow-y-auto">
            <div className="glass-premium rounded-3xl border border-gold/30 shadow-2xl p-8 max-w-3xl w-full relative max-h-[90vh] overflow-y-auto my-8">
              <button
                onClick={() => setIsBuilderOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-brand-dark/50 text-neutral-400 hover:text-white border border-white/5 transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-4">
                <ShoppingBag className="w-5 h-5 text-gold" />
                <h3 className="font-serif text-2xl font-bold text-white">Create Custom Event Menu</h3>
              </div>
              <p className="text-neutral-400 text-xs font-light mb-6">
                Select your favorite appetizers, main courses, and dessert packages. We will build a customized proposal based on your selections.
              </p>

              {isSuccess ? (
                <div className="py-12 flex flex-col items-center justify-center text-center animate-scale-up">
                  <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold text-gold flex items-center justify-center mb-6">
                    <ClipboardCheck className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif text-xl font-bold text-white mb-2">Proposal Initiated</h4>
                  <p className="text-neutral-400 text-xs max-w-sm">
                    {t("formSuccess")}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleBuildSubmit} className="space-y-6">
                  {/* Select Items */}
                  <div>
                    <label className="block text-xs uppercase font-bold text-gold tracking-widest mb-3">
                      Select Menu Offerings ({selectedItemsForMenu.length} Selected)
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[250px] overflow-y-auto p-2 border border-white/5 rounded-xl bg-brand-dark/40">
                      {menuItems.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => toggleItemSelection(item.id)}
                          className={`p-3 rounded-lg border text-left cursor-pointer transition-all duration-200 flex justify-between items-center ${
                            selectedItemsForMenu.includes(item.id)
                              ? "bg-gold/10 border-gold text-gold"
                              : "border-white/5 bg-brand-card/50 text-neutral-300 hover:border-white/20"
                          }`}
                        >
                          <div>
                            <p className="text-xs font-bold">{item.name}</p>
                            <p className="text-[10px] text-neutral-500 uppercase mt-0.5">{item.category}</p>
                          </div>
                          <span className="text-[10px] font-bold text-gold">{item.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Form Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase font-semibold text-neutral-400 mb-1.5">
                        {t("formName")} *
                      </label>
                      <input
                        type="text"
                        required
                        value={builderName}
                        onChange={(e) => setBuilderName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl bg-brand-dark border border-white/10 text-white text-xs focus:border-gold focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase font-semibold text-neutral-400 mb-1.5">
                        {t("formPhone")} *
                      </label>
                      <input
                        type="tel"
                        required
                        value={builderPhone}
                        onChange={(e) => setBuilderPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-3 rounded-xl bg-brand-dark border border-white/10 text-white text-xs focus:border-gold focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase font-semibold text-neutral-400 mb-1.5">
                        {t("formGuests")}
                      </label>
                      <input
                        type="number"
                        value={builderGuests}
                        onChange={(e) => setBuilderGuests(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-brand-dark border border-white/10 text-white text-xs focus:border-gold focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase font-semibold text-neutral-400 mb-1.5">
                        {t("formPref")}
                      </label>
                      <select
                        value={builderPref}
                        onChange={(e) => setBuilderPref(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-brand-dark border border-white/10 text-white text-xs focus:border-gold focus:outline-none"
                      >
                        <option value="Veg">Vegetarian Only</option>
                        <option value="Non-Veg">Include Non-Vegetarian</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={selectedItemsForMenu.length === 0}
                    className="w-full py-4 rounded-full bg-gradient-to-r from-gold-dark to-gold text-[#08090b] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:scale-[1.01] transition-all disabled:opacity-40 disabled:pointer-events-none shadow-lg"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Custom proposal Request</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
