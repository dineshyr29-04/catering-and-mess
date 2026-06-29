"use client";

import React, { useState } from "react";
import { LanguageProvider } from "@/context/LanguageContext";
import { AdminProvider } from "@/context/AdminContext";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BrandStory from "@/components/BrandStory";
import Services from "@/components/Services";
import MenuSection from "@/components/MenuSection";
import MessSection from "@/components/MessSection";
import TimelineJourney from "@/components/TimelineJourney";
import Gallery from "@/components/Gallery";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import AdminPanel from "@/components/AdminPanel";

export default function Home() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  return (
    <LanguageProvider>
      <AdminProvider>
        <div className="relative flex flex-col min-h-screen">
          {/* Main Top Header */}
          <Navbar
            onOpenAdmin={() => setIsAdminOpen(!isAdminOpen)}
            isAdminOpen={isAdminOpen}
          />

          {/* Core Content Layout */}
          <main className="flex-grow">
            <Hero />
            <BrandStory />
            <Services />
            <MenuSection />
            <MessSection />
            <TimelineJourney />
            <Gallery />
            <WhyChooseUs />
            <Testimonials />
            <Contact />
          </main>

          {/* Local storage Admin Panel Overlay */}
          {isAdminOpen && (
            <AdminPanel onClose={() => setIsAdminOpen(false)} />
          )}
        </div>
      </AdminProvider>
    </LanguageProvider>
  );
}
