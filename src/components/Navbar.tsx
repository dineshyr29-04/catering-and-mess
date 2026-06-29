"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Menu, X, Globe, Shield, Star } from "lucide-react";

interface NavbarProps {
  onOpenAdmin: () => void;
  isAdminOpen: boolean;
}

export default function Navbar({ onOpenAdmin, isAdminOpen }: NavbarProps) {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#home", label: t("home") },
    { href: "#about", label: t("about") },
    { href: "#services", label: t("services") },
    { href: "#menu", label: t("menu") },
    { href: "#mess", label: t("mess") },
    { href: "#journey", label: t("journey") },
    { href: "#gallery", label: t("gallery") },
    { href: "#contact", label: t("contact") },
  ];

  const handleScrollClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (isAdminOpen) {
      onOpenAdmin();
    }
    setIsOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      const offset = 90;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 w-full ${
        scrolled || isAdminOpen
          ? "bg-white/80 backdrop-blur-lg border-b border-neutral-100 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.03)]"
          : "bg-transparent py-6"
      }`}
    >
      <div className="w-full px-6 md:px-16 lg:px-24">
        <div className="flex items-center justify-between">
          
          {/* Logo Brand area */}
          <a
            href="#home"
            onClick={(e) => handleScrollClick(e, "#home")}
            className="flex items-center gap-3.5 group"
          >
            <div className="relative w-9 h-9 rounded-full border border-gold flex items-center justify-center font-serif text-gold font-bold text-lg group-hover:bg-gold group-hover:text-white transition-all duration-300">
              A
              <Star className="w-1.5 h-1.5 fill-gold text-gold absolute -top-0.5 -right-0.5 animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg font-bold tracking-[0.2em] text-neutral-900 uppercase">
                AURA
              </span>
              <span className="text-[8px] uppercase tracking-[0.3em] text-neutral-400 font-semibold mt-0.5">
                Gastronomy & Banquet
              </span>
            </div>
          </a>

          {/* New Nav items - tracking-widest, minimal, uppercase */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleScrollClick(e, link.href)}
                className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-600 hover:text-gold transition-colors duration-300 relative py-1"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right Action buttons */}
          <div className="hidden lg:flex items-center gap-5">
            {/* Dashboard Link - sleek border */}
            <button
              onClick={onOpenAdmin}
              className={`px-4 py-2 rounded-full border text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all duration-300 ${
                isAdminOpen
                  ? "bg-gold border-gold text-white"
                  : "border-neutral-200 text-neutral-600 hover:border-gold hover:text-gold bg-white/50"
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>{t("admin")}</span>
            </button>

            {/* Language Switch */}
            <button
              onClick={() => setLanguage(language === "en" ? "hi" : "en")}
              className="p-2 rounded-full border border-neutral-200 text-neutral-500 hover:text-gold hover:border-gold/30 transition-all duration-300 flex items-center gap-1 text-[10px] font-bold uppercase"
            >
              <Globe className="w-3.5 h-3.5 text-neutral-400" />
              <span>{language === "en" ? "EN" : "HI"}</span>
            </button>

            {/* Premium CTA */}
            <a
              href="#contact"
              onClick={(e) => handleScrollClick(e, "#contact")}
              className="px-6 py-3 rounded-full bg-neutral-900 hover:bg-gold text-white hover:text-white text-[10px] font-bold uppercase tracking-widest transition-all duration-300 shadow-md hover:scale-[1.03]"
            >
              {t("planEvent")}
            </a>
          </div>

          {/* Mobile elements */}
          <div className="flex items-center gap-3.5 lg:hidden">
            <button
              onClick={() => setLanguage(language === "en" ? "hi" : "en")}
              className="p-1.5 rounded-full border border-neutral-200 text-neutral-500 text-[10px] font-bold flex items-center gap-1"
            >
              <Globe className="w-3 h-3 text-neutral-400" />
              <span>{language === "en" ? "EN" : "HI"}</span>
            </button>

            <button
              onClick={onOpenAdmin}
              className={`p-1.5 rounded-full border text-[10px] ${
                isAdminOpen ? "bg-gold border-gold text-white" : "border-neutral-200 text-neutral-500"
              }`}
            >
              <Shield className="w-3 h-3" />
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 text-neutral-700 hover:text-gold transition-colors"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-neutral-100 py-6 px-6 shadow-xl animate-fade-in">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleScrollClick(e, link.href)}
                className="text-xs font-bold uppercase tracking-widest text-neutral-700 hover:text-gold py-1"
              >
                {link.label}
              </a>
            ))}
            <hr className="border-neutral-100 my-1" />
            <a
              href="#contact"
              onClick={(e) => {
                setIsOpen(false);
                handleScrollClick(e, "#contact");
              }}
              className="w-full text-center py-3.5 rounded-full bg-neutral-900 hover:bg-gold text-white font-bold text-xs uppercase tracking-widest shadow-md"
            >
              {t("planEvent")}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
