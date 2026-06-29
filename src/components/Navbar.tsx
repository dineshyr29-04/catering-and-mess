"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Menu, X, Globe, Shield } from "lucide-react";

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
      if (window.scrollY > 50) {
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
      onOpenAdmin(); // Close admin if open
    }
    setIsOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      const offset = 80; // height of navbar
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || isAdminOpen
          ? "bg-[#08090b]/90 backdrop-blur-md border-b border-white/5 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleScrollClick(e, "#home")}
            className="flex items-center gap-2 group"
          >
            <div className="relative w-8 h-8 rounded-full border-2 border-gold flex items-center justify-center font-serif text-gold font-bold text-lg group-hover:bg-gold group-hover:text-[#08090b] transition-all duration-300">
              A
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl font-bold tracking-widest gold-text-gradient">
                AURA
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-neutral-400">
                Hospitality & Catering
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleScrollClick(e, link.href)}
                className="text-sm font-medium tracking-wide text-neutral-300 hover:text-gold transition-colors duration-200 relative group py-2"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Admin Toggle */}
            <button
              onClick={onOpenAdmin}
              className={`p-2 rounded-full border border-white/10 hover:border-gold/50 transition-all duration-200 flex items-center gap-2 text-sm ${
                isAdminOpen
                  ? "bg-gold text-brand-dark border-gold"
                  : "text-neutral-400 hover:text-gold"
              }`}
              title="Admin Dashboard"
            >
              <Shield className="w-4 h-4" />
              <span>{t("admin")}</span>
            </button>

            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(language === "en" ? "hi" : "en")}
              className="p-2 rounded-full border border-white/10 hover:border-gold/50 text-neutral-400 hover:text-gold transition-all duration-200 flex items-center gap-1.5 text-xs font-semibold"
            >
              <Globe className="w-4 h-4" />
              <span>{language === "en" ? "EN" : "HI"}</span>
            </button>

            {/* CTA */}
            <a
              href="#contact"
              onClick={(e) => handleScrollClick(e, "#contact")}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-gold-dark to-gold text-[#08090b] text-sm font-semibold tracking-wide hover:from-gold hover:to-gold-light transition-all duration-300 shadow-[0_4px_20px_rgba(197,168,128,0.2)] hover:scale-105"
            >
              {t("planEvent")}
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-3 lg:hidden">
            {/* Language Switcher Mobile */}
            <button
              onClick={() => setLanguage(language === "en" ? "hi" : "en")}
              className="p-1.5 rounded-full border border-white/10 text-neutral-400 text-xs font-semibold flex items-center gap-1"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{language === "en" ? "EN" : "HI"}</span>
            </button>

            {/* Admin Toggle Mobile */}
            <button
              onClick={onOpenAdmin}
              className={`p-1.5 rounded-full border border-white/10 text-xs flex items-center gap-1 ${
                isAdminOpen ? "bg-gold text-[#08090b]" : "text-neutral-400"
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-neutral-400 hover:text-gold focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-[#0c0e14] border-b border-white/10 py-6 px-6 shadow-2xl animate-fade-in">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleScrollClick(e, link.href)}
                className="text-base font-medium text-neutral-200 hover:text-gold py-1"
              >
                {link.label}
              </a>
            ))}
            <hr className="border-white/5 my-2" />
            <a
              href="#contact"
              onClick={(e) => {
                setIsOpen(false);
                handleScrollClick(e, "#contact");
              }}
              className="w-full text-center py-3 rounded-full bg-gradient-to-r from-gold-dark to-gold text-[#08090b] font-semibold text-sm shadow-[0_4px_15px_rgba(197,168,128,0.15)]"
            >
              {t("planEvent")}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
