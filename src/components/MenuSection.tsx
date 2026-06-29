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
    }, 3000);
  };

  return (
    <section id="menu" className="relative py-20 bg-white">
      <div className="w-full px-6 md:px-16 lg:px-24">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <span className="text-gold font-bold text-xs uppercase tracking-[0.25em]">{t("menuSubtitle")}</span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 mt-2">
              {t("menuTitle")}
            </h2>
            <div className="w-12 h-0.5 bg-gold mt-4" />
          </div>

          <button
            onClick={() => setIsBuilderOpen(true)}
            className="self-start md:self-auto px-6 py-3 rounded-full bg-neutral-900 hover:bg-gold text-white font-bold text-[10px] uppercase tracking-wider transition-all duration-300 shadow-md flex items-center gap-2"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{t("requestCustom")}</span>
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-neutral-100 gap-2 overflow-x-auto pb-px mb-10 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveTab(cat.key)}
              className={`px-5 py-3.5 text-[10px] font-bold uppercase tracking-wider border-b-2 transition-all duration-300 whitespace-nowrap ${
                activeTab === cat.key
                  ? "border-gold text-gold"
                  : "border-transparent text-neutral-400 hover:text-neutral-900"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group cursor-pointer rounded-2xl border border-neutral-100 bg-[#faf9f6]/40 overflow-hidden transition-all duration-300 hover:border-gold/30 hover:shadow-lg hover:bg-white"
            >
              {/* Product Image */}
              <div className="h-[200px] relative overflow-hidden bg-neutral-100">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                />
                
                {/* Chef Recommended Badge */}
                {item.chefRecommended && (
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md border border-gold/40 text-gold px-3 py-1 rounded-full text-[9px] uppercase font-bold tracking-widest flex items-center gap-1 shadow-md">
                    <Sparkles className="w-2.5 h-2.5" />
                    <span>{t("chefRecommended")}</span>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-5">
                <div className="flex justify-between items-start gap-4 mb-1.5">
                  <h3 className="font-serif text-base font-bold text-neutral-800 group-hover:text-gold transition-colors duration-300">
                    {item.name}
                  </h3>
                  <span className="text-gold font-bold text-sm whitespace-nowrap">{item.price}</span>
                </div>
                
                <p className="text-neutral-500 text-[11px] font-light leading-relaxed line-clamp-2">
                  {item.description}
                </p>
                
                <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-[9px] font-bold uppercase tracking-wider text-neutral-400 group-hover:text-gold transition-colors duration-300">
                  <span>{t("viewDetailsBtn")}</span>
                  <span>→</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Detail Modal */}
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-3xl overflow-hidden max-w-2xl w-full border border-neutral-200 shadow-2xl relative">
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/80 text-neutral-500 hover:text-neutral-900 border border-neutral-150 shadow-sm transition-all"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="h-[240px] md:h-full relative min-h-[240px] bg-neutral-100">
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.name}
                    className="w-full h-full object-cover"
                  />
                  {selectedItem.chefRecommended && (
                    <div className="absolute top-4 left-4 bg-white text-gold px-3 py-1 rounded-full text-[9px] uppercase font-bold tracking-widest border border-gold/30 shadow-md">
                      {t("chefRecommended")}
                    </div>
                  )}
                </div>

                <div className="p-8 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase text-gold font-bold tracking-widest">
                      {categories.find((c) => c.key === selectedItem.category)?.label}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-neutral-800 mt-2 mb-2">
                      {selectedItem.name}
                    </h3>
                    <p className="text-gold font-bold text-lg mb-3">{selectedItem.price}</p>
                    <hr className="border-neutral-100 my-3" />
                    
                    <p className="text-neutral-600 text-[11px] font-light leading-relaxed mb-4">
                      {selectedItem.description}
                    </p>
                    
                    {selectedItem.details && (
                      <div className="p-3 rounded-xl bg-[#faf9f6] border border-neutral-100 text-[10px] text-neutral-500 italic">
                        <strong>Note:</strong> {selectedItem.details}
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
                    className="mt-6 w-full py-3 rounded-full bg-neutral-900 hover:bg-gold text-white text-[10px] font-bold uppercase tracking-wider text-center transition-all hover:scale-[1.01]"
                  >
                    Enquire About {selectedItem.name}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Custom Menu Builder Modal - Light Theme */}
        {isBuilderOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-sm overflow-y-auto">
            <div className="bg-white rounded-3xl border border-neutral-200 shadow-2xl p-8 max-w-2xl w-full relative max-h-[90vh] overflow-y-auto my-8">
              <button
                onClick={() => setIsBuilderOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/80 text-neutral-400 hover:text-neutral-900 border border-neutral-150 transition-all"
              >
                <X className="w-4.5 h-4.5" />
              </button>

              <div className="flex items-center gap-2.5 mb-3">
                <ShoppingBag className="w-5 h-5 text-gold" />
                <h3 className="font-serif text-xl font-bold text-neutral-900">Create Custom Event Menu</h3>
              </div>
              <p className="text-neutral-500 text-[11px] font-light mb-6">
                Select your dishes below. We will calculate guest counts and prepare a custom layout proposal.
              </p>

              {isSuccess ? (
                <div className="py-12 flex flex-col items-center justify-center text-center animate-scale-up">
                  <div className="w-14 h-14 rounded-full bg-gold/10 border border-gold text-gold flex items-center justify-center mb-4">
                    <ClipboardCheck className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-neutral-800 mb-1">Proposal Initiated</h4>
                  <p className="text-neutral-500 text-[11px] max-w-sm">
                    {t("formSuccess")}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleBuildSubmit} className="space-y-5">
                  {/* Select Items */}
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-gold tracking-widest mb-2">
                      Menu Selections ({selectedItemsForMenu.length} Selected)
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[200px] overflow-y-auto p-2 border border-neutral-100 rounded-xl bg-neutral-50">
                      {menuItems.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => toggleItemSelection(item.id)}
                          className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all duration-200 flex justify-between items-center ${
                            selectedItemsForMenu.includes(item.id)
                              ? "bg-gold/10 border-gold text-gold"
                              : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-350"
                          }`}
                        >
                          <div>
                            <p className="text-[11px] font-bold">{item.name}</p>
                            <p className="text-[9px] text-neutral-400 uppercase mt-0.5">{item.category}</p>
                          </div>
                          <span className="text-[10px] font-bold text-gold">{item.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Form Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase font-semibold text-neutral-500 mb-1">
                        {t("formName")} *
                      </label>
                      <input
                        type="text"
                        required
                        value={builderName}
                        onChange={(e) => setBuilderName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full px-3 py-2 rounded-xl border border-neutral-200 bg-white text-neutral-800 text-[11px] focus:border-gold focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-semibold text-neutral-500 mb-1">
                        {t("formPhone")} *
                      </label>
                      <input
                        type="tel"
                        required
                        value={builderPhone}
                        onChange={(e) => setBuilderPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full px-3 py-2 rounded-xl border border-neutral-200 bg-white text-neutral-800 text-[11px] focus:border-gold focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-semibold text-neutral-500 mb-1">
                        {t("formGuests")}
                      </label>
                      <input
                        type="number"
                        value={builderGuests}
                        onChange={(e) => setBuilderGuests(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-neutral-200 bg-white text-neutral-800 text-[11px] focus:border-gold focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-semibold text-neutral-500 mb-1">
                        {t("formPref")}
                      </label>
                      <select
                        value={builderPref}
                        onChange={(e) => setBuilderPref(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-neutral-200 bg-white text-neutral-800 text-[11px] focus:border-gold focus:outline-none"
                      >
                        <option value="Veg">Vegetarian Only</option>
                        <option value="Non-Veg">Include Non-Vegetarian</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={selectedItemsForMenu.length === 0}
                    className="w-full py-3.5 rounded-full bg-neutral-900 text-white font-bold text-[10px] uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-gold transition-all disabled:opacity-40 disabled:pointer-events-none"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Custom Proposal</span>
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
