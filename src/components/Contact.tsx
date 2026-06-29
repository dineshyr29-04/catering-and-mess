"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useAdmin } from "@/context/AdminContext";
import { MapPin, Phone, MessageSquare, Mail, Download, Check, ExternalLink } from "lucide-react";

export default function Contact() {
  const { t } = useLanguage();
  const { addEnquiry } = useAdmin();

  // Catering proposal form states
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [eventType, setEventType] = useState("Wedding Catering");
  const [guests, setGuests] = useState("100");
  const [date, setDate] = useState("");
  const [pref, setPref] = useState("Veg Only");
  const [budget, setBudget] = useState("₹800 - ₹1,200");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // Download brochure mock state
  const [isDownloading, setIsDownloading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    addEnquiry({
      name,
      phone,
      email,
      type: "Catering",
      eventType,
      guests: parseInt(guests) || 100,
      date,
      preference: pref,
      budget,
      message,
    });

    setIsSuccess(true);
    // Reset form after submission
    setName("");
    setPhone("");
    setEmail("");
    setGuests("100");
    setDate("");
    setMessage("");
    
    setTimeout(() => {
      setIsSuccess(false);
    }, 4000);
  };

  const handleDownloadBrochure = () => {
    setIsDownloading(true);
    // Simulate a download delay
    setTimeout(() => {
      setIsDownloading(false);
      // Create a dummy text file as the "Brochure PDF" and trigger download
      const content = `
=========================================
      AURA BANQUET & CATERING SERVICES
=========================================
Premium Food Hospitality Brand

Our Culinary Offerings:
1. Wedding Grand Buffet Package (from ₹1,200/Plate)
2. Corporate Executive Buffet spreads (from ₹600/Plate)
3. Event Theme Platters (from ₹800/Plate)
4. Premium Hostels/PG Mess Plans (from ₹4,500/Month)

Base Kitchens:
- Central Smart Kitchen: 4th Block, Koramangala, Bangalore
- North Zone Kitchen: Outer Ring Road, Hebbal, Bangalore

Contact: enquiries@auracatering.in | +91 98765 43210
Licensed by FSSAI - 100% Hygiene Compliance Audited.
=========================================
      `;
      const blob = new Blob([content], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "Aura_Catering_Premium_Brochure.txt";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 1500);
  };

  return (
    <section id="contact" className="relative pt-24 pb-12 bg-[#08090b]">
      {/* Background glow */}
      <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[800px] h-[300px] rounded-full bg-gold/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          
          {/* Contact Details (Left Column) */}
          <div className="lg:col-span-5 space-y-8 flex flex-col justify-between">
            <div>
              <span className="text-gold font-bold text-xs uppercase tracking-[0.25em]">{t("contactSubtitle")}</span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mt-3">
                {t("contactTitle")}
              </h2>
              <p className="text-neutral-400 text-xs md:text-sm font-light mt-4 leading-relaxed">
                Connect with our premium planners. Whether it's an intimate party of 30 or a wedding banquet of 2,000, we manage logistics, service, and tastes seamlessly.
              </p>
              <div className="w-12 h-1 bg-gold mt-6" />
            </div>

            {/* Info Cards */}
            <div className="space-y-4">
              
              <div className="flex gap-4 p-4 rounded-xl bg-brand-card border border-white/5">
                <div className="p-3 rounded-lg bg-gold/10 text-gold shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase font-bold text-neutral-400 tracking-wider mb-1">{t("findUs")}</h4>
                  <p className="text-sm text-white font-medium">Aura Central Smart Kitchens, Koramangala 4th Block, Bangalore</p>
                  <p className="text-xs text-neutral-400 mt-1">Serviceable Areas: All across Bangalore Urban, Hebbal, Sarjapur, Whitefield.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a href="tel:+919876543210" className="flex gap-4 p-4 rounded-xl bg-brand-card border border-white/5 hover:border-gold/25 transition-all">
                  <div className="p-3 rounded-lg bg-gold/10 text-gold shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase font-bold text-neutral-400 tracking-wider mb-1">{t("phone")}</h4>
                    <p className="text-sm text-white font-semibold">+91 98765 43210</p>
                    <p className="text-[10px] text-neutral-500 mt-0.5">Mon - Sun (9 AM - 10 PM)</p>
                  </div>
                </a>

                <a href="mailto:enquiries@auracatering.in" className="flex gap-4 p-4 rounded-xl bg-brand-card border border-white/5 hover:border-gold/25 transition-all">
                  <div className="p-3 rounded-lg bg-gold/10 text-gold shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase font-bold text-neutral-400 tracking-wider mb-1">{t("email")}</h4>
                    <p className="text-sm text-white font-semibold">info@auracatering.in</p>
                    <p className="text-[10px] text-neutral-500 mt-0.5">Response within 2 hours</p>
                  </div>
                </a>
              </div>

            </div>

            {/* Actions: Download brochure & Mock Maps frame */}
            <div className="space-y-4">
              <button
                onClick={handleDownloadBrochure}
                disabled={isDownloading}
                className="w-full py-4 rounded-full bg-brand-card border border-gold/30 text-gold font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-gold hover:text-brand-dark hover:border-gold transition-all duration-300 disabled:opacity-40"
              >
                <Download className="w-4 h-4" />
                <span>{isDownloading ? "Compiling Brochure..." : t("brochureBtn")}</span>
              </button>

              {/* Styled Mock Google Map */}
              <div className="relative rounded-2xl overflow-hidden border border-white/5 h-[160px] bg-brand-card flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-cover bg-center opacity-30 filter grayscale saturate-150 contrast-125" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=400&q=80')` }} />
                <div className="absolute inset-0 bg-brand-dark/50" />
                <div className="relative z-10 text-center space-y-2">
                  <p className="text-xs font-bold text-white">Interact with Live Maps Location</p>
                  <p className="text-[10px] text-neutral-400 max-w-xs">Double check route coordinates to our central sanitization smart facility.</p>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-gold hover:text-gold-light"
                  >
                    <span>View Map Frame</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Booking Enquiry Form (Right Column) */}
          <div className="lg:col-span-7 bg-[#12141c] border border-gold/15 p-8 sm:p-10 rounded-3xl shadow-2xl relative">
            <h3 className="font-serif text-2xl font-bold text-white mb-2">{t("bookTitle")}</h3>
            <p className="text-neutral-400 text-xs font-light mb-8">
              Fill in your banquet particulars and custom preference parameters. We'll design a customized catalog within 24 hours.
            </p>

            {isSuccess ? (
              <div className="py-24 flex flex-col items-center justify-center text-center animate-scale-up">
                <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold text-gold flex items-center justify-center mb-6">
                  <Check className="w-8 h-8" />
                </div>
                <h4 className="font-serif text-xl font-bold text-white mb-2">Proposal Requested</h4>
                <p className="text-neutral-400 text-xs max-w-sm">
                  {t("formSuccess")}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[11px] uppercase font-bold text-neutral-400 mb-1.5 tracking-wider">
                      {t("formName")} *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Vikram Singh"
                      className="w-full px-4 py-3 rounded-xl bg-brand-dark border border-white/10 text-white text-xs focus:border-gold focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase font-bold text-neutral-400 mb-1.5 tracking-wider">
                      {t("formPhone")} *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 rounded-xl bg-brand-dark border border-white/10 text-white text-xs focus:border-gold focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[11px] uppercase font-bold text-neutral-400 mb-1.5 tracking-wider">
                      {t("formEmail")}
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="vikram@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-brand-dark border border-white/10 text-white text-xs focus:border-gold focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase font-bold text-neutral-400 mb-1.5 tracking-wider">
                      {t("formType")}
                    </label>
                    <select
                      id="enquiry-event-type"
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-brand-dark border border-white/10 text-white text-xs focus:border-gold focus:outline-none"
                    >
                      <option value="Wedding Catering">Wedding Catering</option>
                      <option value="Corporate Catering">Corporate Catering</option>
                      <option value="Party Catering">Party Catering</option>
                      <option value="Hostel/PG Mess Services">Hostel/PG Mess Services</option>
                      <option value="Daily Meal Subscriptions">Daily Meal Subscriptions</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase font-bold text-neutral-400 mb-1.5 tracking-wider">
                      {t("formGuests")}
                    </label>
                    <input
                      type="number"
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-brand-dark border border-white/10 text-white text-xs focus:border-gold focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase font-bold text-neutral-400 mb-1.5 tracking-wider">
                      {t("formDate")}
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-brand-dark border border-white/10 text-white text-xs focus:border-gold focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase font-bold text-neutral-400 mb-1.5 tracking-wider">
                      {t("formPref")}
                    </label>
                    <select
                      value={pref}
                      onChange={(e) => setPref(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-brand-dark border border-white/10 text-white text-xs focus:border-gold focus:outline-none"
                    >
                      <option value="Veg Only">Vegetarian Only</option>
                      <option value="Include Non-Veg">Include Non-Veg</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase font-bold text-neutral-400 mb-1.5 tracking-wider">
                    {t("formBudget")}
                  </label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-brand-dark border border-white/10 text-white text-xs focus:border-gold focus:outline-none"
                  >
                    <option value="₹400 - ₹800">₹400 - ₹800 / Plate</option>
                    <option value="₹800 - ₹1,200">₹800 - ₹1,200 / Plate</option>
                    <option value="₹1,200+">₹1,200+ / Plate (Premium Banquet)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] uppercase font-bold text-neutral-400 mb-1.5 tracking-wider">
                    {t("formMessage")}
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Provide specific notes regarding custom layout preferences, starters count, or allergy notices."
                    className="w-full px-4 py-3 rounded-xl bg-brand-dark border border-white/10 text-white text-xs focus:border-gold focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-gradient-to-r from-gold-dark to-gold text-[#08090b] font-bold text-xs uppercase tracking-widest transition-all hover:scale-[1.01] shadow-[0_5px_20px_rgba(197,168,128,0.2)]"
                >
                  {t("formSubmit")}
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Footer Block */}
        <hr className="border-white/5 my-12" />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Logo & Tagline */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full border border-gold flex items-center justify-center font-serif text-gold font-bold text-sm">
                A
              </div>
              <span className="font-serif text-lg font-bold tracking-widest text-white">AURA</span>
            </div>
            <p className="text-[11px] text-neutral-400 leading-relaxed font-light">
              Crafting exquisite gastronomic menus and offering everyday hygienic homestyle mess subscription systems across corporate offices and hostel hubs.
            </p>
          </div>

          {/* Col 2: Navigation links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Quick Navigation</h4>
            <div className="grid grid-cols-2 gap-2 text-[11px] text-neutral-400">
              <a href="#home" className="hover:text-gold">Home</a>
              <a href="#about" className="hover:text-gold">Story</a>
              <a href="#services" className="hover:text-gold">Services</a>
              <a href="#menu" className="hover:text-gold">Menus</a>
              <a href="#mess" className="hover:text-gold">Mess Plans</a>
              <a href="#journey" className="hover:text-gold">Process</a>
              <a href="#gallery" className="hover:text-gold">Gallery</a>
              <a href="#contact" className="hover:text-gold">Enquiries</a>
            </div>
          </div>

          {/* Col 3: Services shortcuts */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Our Services</h4>
            <div className="flex flex-col gap-1.5 text-[11px] text-neutral-400">
              <span>Wedding Banquets</span>
              <span>Corporate Buffet</span>
              <span>Milestone Birthdays</span>
              <span>PG & Hostel Mess Management</span>
              <span>Bulk Food Deliveries</span>
            </div>
          </div>

          {/* Col 4: Contact details summary */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Operating Kitchen</h4>
            <p className="text-[11px] text-neutral-400 leading-relaxed font-light">
              4th Block, Koramangala, Bangalore, Karnataka 560034 <br />
              info@auracatering.in | +91 98765 43210
            </p>
          </div>
        </div>

        {/* copyright and legal */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-neutral-500">
          <span>&copy; {new Date().getFullYear()} Aura Banquet & Hospitality Services. All rights reserved.</span>
          <div className="flex gap-4">
            <span className="hover:text-gold cursor-pointer">Terms of Service</span>
            <span className="hover:text-gold cursor-pointer">Privacy Policy</span>
            <span className="hover:text-gold cursor-pointer">FSSAI Licence: 1002308945678</span>
          </div>
        </div>

      </div>

      {/* Floating WhatsApp enquiry button */}
      <a
        href="https://wa.me/919876543210?text=I%20am%20interested%20in%20Aura%20Catering%20services"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 p-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 group flex items-center gap-2 max-w-[56px] hover:max-w-[200px] overflow-hidden"
        title="WhatsApp Enquiry"
      >
        <MessageSquare className="w-6 h-6 shrink-0" />
        <span className="text-xs font-bold uppercase tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {t("whatsapp")}
        </span>
      </a>
    </section>
  );
}
