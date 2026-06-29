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
    <section id="gallery" className="relative py-20 bg-[#faf9f6]">
      <div className="w-full px-6 md:px-16 lg:px-24">
        
        {/* Header */}
        <div className="max-w-xl mb-12">
          <span className="text-gold font-bold text-xs uppercase tracking-[0.25em]">{t("gallerySubtitle")}</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 mt-2">
            {t("galleryTitle")}
          </h2>
          <div className="w-12 h-0.5 bg-gold mt-4" />
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setFilter(cat.key as any)}
              className={`px-4.5 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${
                filter === cat.key
                  ? "bg-neutral-900 text-white shadow-md"
                  : "bg-white text-neutral-500 border border-neutral-150 hover:bg-neutral-50 hover:text-neutral-800"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setLightboxImage(item)}
              className="break-inside-avoid relative rounded-2xl overflow-hidden border border-neutral-100 bg-white group cursor-pointer shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-102"
              />
              
              {/* Overlay details on hover */}
              <div className="absolute inset-0 bg-neutral-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <ZoomIn className="w-5 h-5 text-gold mb-2.5 animate-bounce" />
                <h4 className="font-serif text-base font-bold text-white mb-0.5">{item.title}</h4>
                <p className="text-[9px] text-gold uppercase tracking-widest font-semibold">
                  {categories.find(c => c.key === item.category)?.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {lightboxImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white text-neutral-500 hover:text-neutral-950 border border-neutral-150 transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-w-4xl w-full flex flex-col items-center">
              <img
                src={lightboxImage.image}
                alt={lightboxImage.title}
                className="max-h-[75vh] w-auto max-w-full rounded-2xl border border-neutral-200 shadow-2xl object-contain animate-scale-up bg-white p-2"
              />
              <div className="text-center mt-5 space-y-1">
                <h3 className="font-serif text-base md:text-lg font-bold text-white">
                  {lightboxImage.title}
                </h3>
                <span className="inline-block bg-white/10 text-gold px-3.5 py-1 rounded-full text-[9px] uppercase font-bold tracking-widest border border-gold/15">
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
