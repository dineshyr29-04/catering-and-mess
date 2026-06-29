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
    setTimeout(() => {
      setIsDownloading(false);
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
    <section id="contact" className="relative pt-20 pb-10 bg-white">
      <div className="w-full px-6 md:px-16 lg:px-24">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          
          {/* Contact Details (Left Column) */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            <div>
              <span className="text-gold font-bold text-xs uppercase tracking-[0.25em]">{t("contactSubtitle")}</span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 mt-2">
                {t("contactTitle")}
              </h2>
              <p className="text-neutral-500 text-xs sm:text-sm font-light mt-3 leading-relaxed">
                Connect with our premium planners. Whether it's an intimate party of 30 or a wedding banquet of 2,000, we manage logistics, service, and tastes seamlessly.
              </p>
              <div className="w-12 h-0.5 bg-gold mt-4" />
            </div>

            {/* Info Cards */}
            <div className="space-y-3">
              
              <div className="flex gap-3.5 p-4 rounded-xl bg-[#faf9f6] border border-neutral-100 shadow-sm">
                <div className="p-2.5 rounded-lg bg-gold/10 text-gold shrink-0">
                  <MapPin className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider mb-0.5">{t("findUs")}</h4>
                  <p className="text-xs text-neutral-750 font-bold">Aura Central Smart Kitchens, Koramangala 4th Block, Bangalore</p>
                  <p className="text-[10px] text-neutral-400 mt-1">Serviceable Areas: All across Bangalore Urban, Hebbal, Sarjapur, Whitefield.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a href="tel:+919876543210" className="flex gap-3 p-4 rounded-xl bg-[#faf9f6] border border-neutral-100 hover:border-gold/30 transition-all shadow-sm">
                  <div className="p-2.5 rounded-lg bg-gold/10 text-gold shrink-0">
                    <Phone className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider mb-0.5">{t("phone")}</h4>
                    <p className="text-xs text-neutral-800 font-bold">+91 98765 43210</p>
                    <p className="text-[9px] text-neutral-400 mt-0.5">Mon - Sun (9 AM - 10 PM)</p>
                  </div>
                </a>

                <a href="mailto:enquiries@auracatering.in" className="flex gap-3 p-4 rounded-xl bg-[#faf9f6] border border-neutral-100 hover:border-gold/30 transition-all shadow-sm">
                  <div className="p-2.5 rounded-lg bg-gold/10 text-gold shrink-0">
                    <Mail className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider mb-0.5">{t("email")}</h4>
                    <p className="text-xs text-neutral-800 font-bold">info@auracatering.in</p>
                    <p className="text-[9px] text-neutral-400 mt-0.5">Response within 2 hours</p>
                  </div>
                </a>
              </div>

            </div>

            {/* Actions: Download brochure & Mock Maps frame */}
            <div className="space-y-3">
              <button
                onClick={handleDownloadBrochure}
                disabled={isDownloading}
                className="w-full py-3.5 rounded-full border border-gold/30 text-gold font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-1.5 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all duration-300 disabled:opacity-40"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{isDownloading ? "Compiling Brochure..." : t("brochureBtn")}</span>
              </button>

              {/* Styled Mock Google Map */}
              <div className="relative rounded-xl overflow-hidden border border-neutral-150 h-[140px] bg-neutral-50 flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-cover bg-center opacity-10 filter grayscale saturate-150 contrast-125" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=400&q=80')` }} />
                <div className="absolute inset-0 bg-white/20" />
                <div className="relative z-10 text-center space-y-1.5">
                  <p className="text-[11px] font-bold text-neutral-700">Interact with Maps Coordinates</p>
                  <p className="text-[9px] text-neutral-450 max-w-xs mx-auto">Double check route coordinates to our central sanitization smart facility.</p>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-gold hover:text-gold-dark"
                  >
                    <span>View Map Frame</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Booking Enquiry Form (Right Column) */}
          <div className="lg:col-span-7 bg-[#faf9f6] border border-neutral-100 p-8 sm:p-10 rounded-3xl shadow-sm relative">
            <h3 className="font-serif text-2xl font-bold text-neutral-900 mb-1">{t("bookTitle")}</h3>
            <p className="text-neutral-500 text-xs font-light mb-6">
              Fill in your banquet particulars and custom preference parameters. We'll design a customized catalog within 24 hours.
            </p>

            {isSuccess ? (
              <div className="py-20 flex flex-col items-center justify-center text-center animate-scale-up">
                <div className="w-14 h-14 rounded-full bg-gold/10 border border-gold text-gold flex items-center justify-center mb-5">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-lg font-bold text-neutral-800 mb-1">Proposal Requested</h4>
                <p className="text-neutral-500 text-[11px] max-w-sm">
                  {t("formSuccess")}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-neutral-500 mb-1 tracking-wider">
                      {t("formName")} *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Vikram Singh"
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 bg-white text-neutral-800 text-[11px] focus:border-gold focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-neutral-500 mb-1 tracking-wider">
                      {t("formPhone")} *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 bg-white text-neutral-800 text-[11px] focus:border-gold focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-neutral-500 mb-1 tracking-wider">
                      {t("formEmail")}
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="vikram@company.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 bg-white text-neutral-800 text-[11px] focus:border-gold focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-neutral-500 mb-1 tracking-wider">
                      {t("formType")}
                    </label>
                    <select
                      id="enquiry-event-type"
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 bg-white text-neutral-800 text-[11px] focus:border-gold focus:outline-none"
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
                    <label className="block text-[10px] uppercase font-bold text-neutral-500 mb-1 tracking-wider">
                      {t("formGuests")}
                    </label>
                    <input
                      type="number"
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 bg-white text-neutral-800 text-[11px] focus:border-gold focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-neutral-500 mb-1 tracking-wider">
                      {t("formDate")}
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 bg-white text-neutral-800 text-[11px] focus:border-gold focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-neutral-500 mb-1 tracking-wider">
                      {t("formPref")}
                    </label>
                    <select
                      value={pref}
                      onChange={(e) => setPref(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 bg-white text-neutral-800 text-[11px] focus:border-gold focus:outline-none"
                    >
                      <option value="Veg Only">Vegetarian Only</option>
                      <option value="Include Non-Veg">Include Non-Veg</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-neutral-500 mb-1 tracking-wider">
                    {t("formBudget")}
                  </label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 bg-white text-neutral-800 text-[11px] focus:border-gold focus:outline-none"
                  >
                    <option value="₹400 - ₹800">₹400 - ₹800 / Plate</option>
                    <option value="₹800 - ₹1,200">₹800 - ₹1,200 / Plate</option>
                    <option value="₹1,200+">₹1,200+ / Plate (Premium Banquet)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-neutral-500 mb-1 tracking-wider">
                    {t("formMessage")}
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Provide specific notes regarding custom layout preferences..."
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 bg-white text-neutral-800 text-[11px] focus:border-gold focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-neutral-900 hover:bg-gold text-white font-bold text-[10px] uppercase tracking-widest transition-all"
                >
                  {t("formSubmit")}
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Footer Block */}
        <hr className="border-neutral-100 my-10" />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full border border-gold flex items-center justify-center font-serif text-gold font-bold text-sm">
                A
              </div>
              <span className="font-serif text-base font-bold tracking-widest text-neutral-900">AURA</span>
            </div>
            <p className="text-[10px] text-neutral-400 leading-relaxed font-medium">
              Crafting exquisite gastronomic menus and offering everyday hygienic homestyle mess subscription systems across corporate offices and hostel hubs.
            </p>
          </div>

          <div className="space-y-2.5">
            <h4 className="text-[10px] font-bold text-neutral-800 uppercase tracking-widest">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2 text-[10px] text-neutral-450 font-medium">
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

          <div className="space-y-2.5">
            <h4 className="text-[10px] font-bold text-neutral-800 uppercase tracking-widest">Our Services</h4>
            <div className="flex flex-col gap-1.5 text-[10px] text-neutral-450 font-medium">
              <span>Wedding Banquets</span>
              <span>Corporate Buffet Spreads</span>
              <span>Milestone Birthdays</span>
              <span>PG & Hostel Mess Management</span>
            </div>
          </div>

          <div className="space-y-2.5">
            <h4 className="text-[10px] font-bold text-neutral-800 uppercase tracking-widest">Operating Kitchen</h4>
            <p className="text-[10px] text-neutral-400 leading-relaxed font-medium">
              4th Block, Koramangala, Bangalore, Karnataka 560034 <br />
              info@auracatering.in | +91 98765 43210
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-neutral-100 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-[9px] text-neutral-400">
          <span>&copy; {new Date().getFullYear()} Aura Banquet & Hospitality Services. All rights reserved.</span>
          <div className="flex gap-4">
            <span className="hover:text-gold cursor-pointer font-medium">Terms of Service</span>
            <span className="hover:text-gold cursor-pointer font-medium">Privacy Policy</span>
            <span className="hover:text-gold cursor-pointer font-medium">FSSAI License: 1002308945678</span>
          </div>
        </div>

      </div>

      {/* Floating WhatsApp trigger */}
      <a
        href="https://wa.me/919876543210?text=I%20am%20interested%20in%20Aura%20Catering%20services"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 p-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-lg hover:scale-105 transition-all duration-300 group flex items-center gap-1.5 max-w-[50px] hover:max-w-[180px] overflow-hidden"
        title="WhatsApp Enquiry"
      >
        <MessageSquare className="w-5 h-5 shrink-0" />
        <span className="text-[9px] font-bold uppercase tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          {t("whatsapp")}
        </span>
      </a>
    </section>
  );
}
