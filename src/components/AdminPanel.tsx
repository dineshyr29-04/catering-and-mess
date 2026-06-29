"use client";

import React, { useState } from "react";
import { useAdmin, Enquiry, MenuItem, GalleryItem } from "@/context/AdminContext";
import { X, ShieldAlert, Plus, Trash2, CheckCircle, Mail, Phone, Calendar, User, Clock, Utensils, Image as ImageIcon } from "lucide-react";

interface AdminPanelProps {
  onClose: () => void;
}

export default function AdminPanel({ onClose }: AdminPanelProps) {
  const {
    enquiries,
    menuItems,
    galleryItems,
    updateEnquiryStatus,
    deleteEnquiry,
    addMenuItem,
    deleteMenuItem,
    addGalleryItem,
    deleteGalleryItem
  } = useAdmin();

  const [activeTab, setActiveTab] = useState<"enquiries" | "menu" | "gallery">("enquiries");

  // New Menu Item Form States
  const [menuName, setMenuName] = useState("");
  const [menuDesc, setMenuDesc] = useState("");
  const [menuPrice, setMenuPrice] = useState("");
  const [menuCategory, setMenuCategory] = useState<MenuItem["category"]>("breakfast");
  const [menuImage, setMenuImage] = useState("");
  const [menuChef, setMenuChef] = useState(false);

  // New Gallery Item Form States
  const [galleryTitle, setGalleryTitle] = useState("");
  const [galleryCategory, setGalleryCategory] = useState<GalleryItem["category"]>("weddings");
  const [galleryImage, setGalleryImage] = useState("");

  // Handle menu add
  const handleAddMenu = (e: React.FormEvent) => {
    e.preventDefault();
    if (!menuName || !menuPrice || !menuImage) return;

    addMenuItem({
      name: menuName,
      description: menuDesc,
      price: menuPrice,
      category: menuCategory,
      image: menuImage,
      chefRecommended: menuChef
    });

    // Reset Form
    setMenuName("");
    setMenuDesc("");
    setMenuPrice("");
    setMenuImage("");
    setMenuChef(false);
  };

  // Handle gallery add
  const handleAddGallery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryTitle || !galleryImage) return;

    addGalleryItem({
      title: galleryTitle,
      category: galleryCategory,
      image: galleryImage
    });

    // Reset Form
    setGalleryTitle("");
    setGalleryImage("");
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#08090b]/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 lg:p-8 animate-fade-in overflow-y-auto">
      <div className="bg-brand-card border border-gold/20 rounded-3xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl relative my-8">
        
        {/* Header bar */}
        <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between bg-brand-dark/40">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gold/15 text-gold rounded-lg border border-gold/25">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-xl font-bold text-white">Aura Management Portal</h2>
              <p className="text-[10px] text-neutral-400 uppercase tracking-widest mt-0.5">Control Center (Client-Side Storage)</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/5 border border-white/5 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Inner layout split */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden min-h-0">
          
          {/* Tab Sidebar */}
          <div className="md:w-[220px] bg-brand-dark/30 border-b md:border-b-0 md:border-r border-white/5 p-4 flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-x-visible">
            <button
              onClick={() => setActiveTab("enquiries")}
              className={`flex-1 md:flex-none px-4 py-3 rounded-xl text-left text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-2.5 ${
                activeTab === "enquiries"
                  ? "bg-gold text-[#08090b]"
                  : "text-neutral-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>CRM Enquiries ({enquiries.length})</span>
            </button>
            <button
              onClick={() => setActiveTab("menu")}
              className={`flex-1 md:flex-none px-4 py-3 rounded-xl text-left text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-2.5 ${
                activeTab === "menu"
                  ? "bg-gold text-[#08090b]"
                  : "text-neutral-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Utensils className="w-4 h-4" />
              <span>Update Menus ({menuItems.length})</span>
            </button>
            <button
              onClick={() => setActiveTab("gallery")}
              className={`flex-1 md:flex-none px-4 py-3 rounded-xl text-left text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-2.5 ${
                activeTab === "gallery"
                  ? "bg-gold text-[#08090b]"
                  : "text-neutral-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>Update Gallery ({galleryItems.length})</span>
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 p-6 sm:p-8 overflow-y-auto bg-brand-dark/10">
            
            {/* TAB 1: Enquiries */}
            {activeTab === "enquiries" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-base font-bold text-white uppercase tracking-wider">Customer Enquiries & Subscriptions</h3>
                  <span className="text-[10px] text-neutral-400 bg-white/5 border border-white/5 px-2.5 py-1 rounded-md">
                    Live Session CRM
                  </span>
                </div>

                <div className="space-y-4">
                  {enquiries.length === 0 ? (
                    <div className="text-center py-12 border border-dashed border-white/10 rounded-2xl">
                      <p className="text-xs text-neutral-500 font-light">No customer enquiries submitted yet.</p>
                    </div>
                  ) : (
                    enquiries.map((enq) => (
                      <div
                        key={enq.id}
                        className="p-5 rounded-2xl border border-white/5 bg-brand-card/70 flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:border-gold/20 transition-all"
                      >
                        <div className="space-y-3 max-w-2xl">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-xs font-bold text-white">{enq.name}</span>
                            <span className={`px-2 py-0.5 rounded text-[8px] uppercase font-bold tracking-widest ${
                              enq.type === "Catering"
                                ? "bg-amber-600/10 text-amber-500 border border-amber-500/20"
                                : "bg-emerald-600/10 text-emerald-500 border border-emerald-500/20"
                            }`}>
                              {enq.type === "Catering" ? `${enq.eventType || "Catering"}` : "Mess subscription"}
                            </span>
                            <span className="text-[9px] text-neutral-500">
                              {new Date(enq.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          
                          {/* Details line */}
                          <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[11px] text-neutral-400 font-light">
                            <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-gold/60" /> {enq.phone}</span>
                            {enq.email && <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-gold/60" /> {enq.email}</span>}
                            {enq.guests && <span className="flex items-center gap-1"><User className="w-3.5 h-3.5 text-gold/60" /> {enq.guests} Guests</span>}
                            {enq.date && <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-gold/60" /> Date: {enq.date}</span>}
                            {enq.planName && <span className="flex items-center gap-1"><Utensils className="w-3.5 h-3.5 text-gold/60" /> Plan: {enq.planName}</span>}
                            <span className="text-[10px] font-bold text-gold bg-gold/5 px-2 py-0.5 rounded border border-gold/10 uppercase tracking-widest">{enq.preference}</span>
                          </div>

                          <p className="text-xs text-neutral-300 italic font-light">
                            &ldquo;{enq.message}&rdquo;
                          </p>
                        </div>

                        {/* Status controllers */}
                        <div className="flex items-center gap-2.5 shrink-0 self-end lg:self-auto border-t lg:border-t-0 border-white/5 pt-4 lg:pt-0 w-full lg:w-auto justify-end">
                          <select
                            value={enq.status}
                            onChange={(e) => updateEnquiryStatus(enq.id, e.target.value as any)}
                            className="px-3 py-1.5 rounded-lg bg-brand-dark border border-white/10 text-white text-[10px] uppercase font-bold focus:border-gold focus:outline-none"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>

                          <button
                            onClick={() => deleteEnquiry(enq.id)}
                            className="p-2 rounded-lg bg-red-600/10 text-red-500 border border-red-500/20 hover:bg-red-600 hover:text-white transition-all"
                            title="Delete Enquiry"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* TAB 2: Menu Items */}
            {activeTab === "menu" && (
              <div className="space-y-8">
                {/* Form to Add New Menu Item */}
                <div className="p-6 rounded-2xl border border-white/5 bg-brand-card/50">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-2">
                    <Plus className="w-4 h-4 text-gold" /> Add New culinary Dish
                  </h3>

                  <form onSubmit={handleAddMenu} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[10px] uppercase font-semibold text-neutral-400 mb-1">Dish Name</label>
                        <input
                          type="text"
                          required
                          value={menuName}
                          onChange={(e) => setMenuName(e.target.value)}
                          placeholder="e.g. Kashmiri Dum Aloo"
                          className="w-full px-3 py-2 rounded-lg bg-brand-dark border border-white/10 text-white text-xs focus:border-gold focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-semibold text-neutral-400 mb-1">Pricing</label>
                        <input
                          type="text"
                          required
                          value={menuPrice}
                          onChange={(e) => setMenuPrice(e.target.value)}
                          placeholder="e.g. ₹280 or ₹1,200/Plate"
                          className="w-full px-3 py-2 rounded-lg bg-brand-dark border border-white/10 text-white text-xs focus:border-gold focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-semibold text-neutral-400 mb-1">Category</label>
                        <select
                          value={menuCategory}
                          onChange={(e) => setMenuCategory(e.target.value as any)}
                          className="w-full px-3 py-2 rounded-lg bg-brand-dark border border-white/10 text-white text-xs focus:border-gold focus:outline-none"
                        >
                          <option value="breakfast">Breakfast Experience</option>
                          <option value="lunch">Lunch Feast</option>
                          <option value="dinner">Dinner Specials</option>
                          <option value="traditional">Traditional Meals</option>
                          <option value="packages">Event Packages</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] uppercase font-semibold text-neutral-400 mb-1">Unsplash Image URL</label>
                        <input
                          type="text"
                          required
                          value={menuImage}
                          onChange={(e) => setMenuImage(e.target.value)}
                          placeholder="https://images.unsplash.com/photo-..."
                          className="w-full px-3 py-2 rounded-lg bg-brand-dark border border-white/10 text-white text-xs focus:border-gold focus:outline-none"
                        />
                      </div>
                      <div className="flex items-center h-full pt-4">
                        <label className="flex items-center gap-2 cursor-pointer text-xs text-neutral-300">
                          <input
                            type="checkbox"
                            checked={menuChef}
                            onChange={(e) => setMenuChef(e.target.checked)}
                            className="rounded border-white/10 bg-brand-dark text-gold focus:ring-gold"
                          />
                          <span>Chef Recommended Flag</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-semibold text-neutral-400 mb-1">Detailed Description</label>
                      <textarea
                        rows={2}
                        value={menuDesc}
                        onChange={(e) => setMenuDesc(e.target.value)}
                        placeholder="Provide details about culinary spices, cooking technique or allergies notes..."
                        className="w-full px-3 py-2 rounded-lg bg-brand-dark border border-white/10 text-white text-xs focus:border-gold focus:outline-none resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-lg bg-gold text-[#08090b] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 hover:scale-[1.01] transition-all"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Dish to Menu</span>
                    </button>
                  </form>
                </div>

                {/* List Menu Items */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">Current Live menu Items</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {menuItems.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 rounded-xl border border-white/5 bg-brand-card/40 flex items-center gap-4 hover:border-gold/10 transition-all justify-between"
                      >
                        <div className="flex items-center gap-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded-lg border border-white/10 shrink-0"
                          />
                          <div>
                            <h4 className="text-xs font-bold text-white">{item.name}</h4>
                            <p className="text-[9px] text-gold uppercase tracking-wider mt-0.5">{item.category} • {item.price}</p>
                          </div>
                        </div>

                        <button
                          onClick={() => deleteMenuItem(item.id)}
                          className="p-2 rounded-lg bg-red-600/10 text-red-500 border border-red-500/20 hover:bg-red-600 hover:text-white transition-all shrink-0"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: Gallery Items */}
            {activeTab === "gallery" && (
              <div className="space-y-8">
                {/* Form to Add New Gallery Image */}
                <div className="p-6 rounded-2xl border border-white/5 bg-brand-card/50">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-2">
                    <Plus className="w-4 h-4 text-gold" /> Upload New Photo
                  </h3>

                  <form onSubmit={handleAddGallery} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="sm:col-span-2">
                        <label className="block text-[10px] uppercase font-semibold text-neutral-400 mb-1">Image Title</label>
                        <input
                          type="text"
                          required
                          value={galleryTitle}
                          onChange={(e) => setGalleryTitle(e.target.value)}
                          placeholder="e.g. Bride & Groom Plated Dining Setup"
                          className="w-full px-3 py-2 rounded-lg bg-brand-dark border border-white/10 text-white text-xs focus:border-gold focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-semibold text-neutral-400 mb-1">Gallery Category</label>
                        <select
                          value={galleryCategory}
                          onChange={(e) => setGalleryCategory(e.target.value as any)}
                          className="w-full px-3 py-2 rounded-lg bg-brand-dark border border-white/10 text-white text-xs focus:border-gold focus:outline-none"
                        >
                          <option value="weddings">Weddings & Galas</option>
                          <option value="presentation">Art of Plating</option>
                          <option value="kitchen">Sanitized Kitchen</option>
                          <option value="moments">Customer Moments</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-semibold text-neutral-400 mb-1">Unsplash Image URL</label>
                      <input
                        type="text"
                        required
                        value={galleryImage}
                        onChange={(e) => setGalleryImage(e.target.value)}
                        placeholder="https://images.unsplash.com/photo-..."
                        className="w-full px-3 py-2 rounded-lg bg-brand-dark border border-white/10 text-white text-xs focus:border-gold focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-lg bg-gold text-[#08090b] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 hover:scale-[1.01] transition-all"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Upload Photo to Gallery</span>
                    </button>
                  </form>
                </div>

                {/* List Gallery Items */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">Current Live Gallery Photos</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {galleryItems.map((item) => (
                      <div
                        key={item.id}
                        className="p-3 rounded-xl border border-white/5 bg-brand-card/40 flex flex-col hover:border-gold/10 transition-all gap-3 relative overflow-hidden"
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-32 object-cover rounded-lg border border-white/10"
                        />
                        <div className="flex justify-between items-start gap-3">
                          <div>
                            <h4 className="text-[11px] font-bold text-white truncate max-w-[130px]">{item.title}</h4>
                            <p className="text-[9px] text-gold uppercase tracking-wider mt-0.5">{item.category}</p>
                          </div>
                          <button
                            onClick={() => deleteGalleryItem(item.id)}
                            className="p-1.5 rounded bg-red-600/10 text-red-500 border border-red-500/20 hover:bg-red-600 hover:text-white transition-all"
                            title="Delete Photo"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
