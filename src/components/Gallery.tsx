"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useAdmin, GalleryItem } from "@/context/AdminContext";
import { X, ZoomIn } from "lucide-react";

export default function Gallery() {
  const { t } = useLanguage();
  const { galleryItems } = useAdmin();
  const [filter, setFilter] = useState<"all" | "weddings" | "presentation" | "kitchen" | "moments">("all");
  const [lightboxImage, setLightboxImage] = useState<GalleryItem | null>(null);

  const categories = [
    { key: "all", label: t("all") },
    { key: "weddings", label: t("weddings") },
    { key: "presentation", label: t("presentation") },
    { key: "kitchen", label: t("kitchen") },
    { key: "moments", label: t("moments") }
  ];

  const filteredItems = filter === "all"
    ? galleryItems
    : galleryItems.filter((item) => item.category === filter);

  return (
    <section id="gallery" className="relative py-24 bg-[#0c0e14]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-gold font-bold text-xs uppercase tracking-[0.25em]">{t("gallerySubtitle")}</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mt-3">
            {t("galleryTitle")}
          </h2>
          <div className="w-12 h-1 bg-gold mx-auto mt-6" />
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setFilter(cat.key as any)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                filter === cat.key
                  ? "bg-gold text-brand-dark"
                  : "bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Masonry-like Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setLightboxImage(item)}
              className="break-inside-avoid relative rounded-2xl overflow-hidden border border-white/5 bg-brand-card group cursor-pointer shadow-lg transition-all duration-300 hover:border-gold/30"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              
              {/* Overlay details on hover */}
              <div className="absolute inset-0 bg-brand-dark/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <ZoomIn className="w-5 h-5 text-gold mb-3 animate-bounce" />
                <h4 className="font-serif text-base font-bold text-white mb-0.5">{item.title}</h4>
                <p className="text-[10px] text-gold uppercase tracking-wider font-semibold">
                  {categories.find(c => c.key === item.category)?.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {lightboxImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-dark/90 backdrop-blur-md animate-fade-in">
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-brand-dark/50 text-neutral-400 hover:text-white hover:bg-brand-dark/80 border border-white/5 transition-all"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="max-w-4xl w-full flex flex-col items-center">
              <img
                src={lightboxImage.image}
                alt={lightboxImage.title}
                className="max-h-[80vh] w-auto max-w-full rounded-2xl border border-white/10 shadow-2xl object-contain animate-scale-up"
              />
              <div className="text-center mt-6 space-y-1.5">
                <h3 className="font-serif text-lg md:text-xl font-bold text-white">
                  {lightboxImage.title}
                </h3>
                <span className="inline-block bg-gold/15 text-gold px-3.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest border border-gold/10">
                  {categories.find(c => c.key === lightboxImage.category)?.label}
                </span>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
