"use client";

import React, { useState } from "react";
import { useAdmin, Enquiry, MenuItem, GalleryItem } from "@/context/AdminContext";
import { X, ShieldAlert, Plus, Trash2, Clock, Utensils, Image as ImageIcon, Mail, Phone, Calendar, User } from "lucide-react";

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

    setMenuName("");
    setMenuDesc("");
    setMenuPrice("");
    setMenuImage("");
    setMenuChef(false);
  };

  const handleAddGallery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryTitle || !galleryImage) return;

    addGalleryItem({
      title: galleryTitle,
      category: galleryCategory,
      image: galleryImage
    });

    setGalleryTitle("");
    setGalleryImage("");
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 lg:p-8 animate-fade-in overflow-y-auto">
      <div className="bg-white border border-neutral-200 rounded-3xl w-full max-w-5xl max-h-[85vh] overflow-hidden flex flex-col shadow-2xl relative my-8 text-neutral-800">
        
        {/* Header bar */}
        <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between bg-neutral-50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gold/10 text-gold rounded-lg border border-gold/15">
              <ShieldAlert className="w-4.5 h-4.5" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-bold text-neutral-900">Aura Management Portal</h2>
              <p className="text-[9px] text-neutral-450 uppercase tracking-wider mt-0.5">Control Center (Client-Side Storage)</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-neutral-100 border border-neutral-200 text-neutral-500 transition-colors"
          >
            <X className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* Inner layout split */}
        <div className="flex-grow flex flex-col md:flex-row overflow-hidden min-h-0">
          
          {/* Tab Sidebar */}
          <div className="md:w-[200px] bg-neutral-50 border-b md:border-b-0 md:border-r border-neutral-100 p-4 flex flex-row md:flex-col gap-1.5 overflow-x-auto md:overflow-x-visible shrink-0">
            <button
              onClick={() => setActiveTab("enquiries")}
              className={`flex-1 md:flex-none px-4 py-2.5 rounded-lg text-left text-[10px] font-bold uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-2 ${
                activeTab === "enquiries"
                  ? "bg-neutral-900 text-white shadow-sm"
                  : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 border border-transparent"
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Enquiries ({enquiries.length})</span>
            </button>
            <button
              onClick={() => setActiveTab("menu")}
              className={`flex-1 md:flex-none px-4 py-2.5 rounded-lg text-left text-[10px] font-bold uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-2 ${
                activeTab === "menu"
                  ? "bg-neutral-900 text-white shadow-sm"
                  : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 border border-transparent"
              }`}
            >
              <Utensils className="w-3.5 h-3.5" />
              <span>Update Menus ({menuItems.length})</span>
            </button>
            <button
              onClick={() => setActiveTab("gallery")}
              className={`flex-1 md:flex-none px-4 py-2.5 rounded-lg text-left text-[10px] font-bold uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-2 ${
                activeTab === "gallery"
                  ? "bg-neutral-900 text-white shadow-sm"
                  : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 border border-transparent"
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Update Gallery ({galleryItems.length})</span>
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-grow p-6 overflow-y-auto bg-white">
            
            {/* TAB 1: Enquiries */}
            {activeTab === "enquiries" && (
              <div className="space-y-5">
                <div className="flex justify-between items-center border-b border-neutral-100 pb-2">
                  <h3 className="text-xs font-bold text-neutral-800 uppercase tracking-wider">Customer Enquiries & Subscriptions</h3>
                </div>

                <div className="space-y-3.5">
                  {enquiries.length === 0 ? (
                    <div className="text-center py-10 border border-dashed border-neutral-200 rounded-xl bg-neutral-50">
                      <p className="text-[11px] text-neutral-400 font-light">No customer enquiries submitted yet.</p>
                    </div>
                  ) : (
                    enquiries.map((enq) => (
                      <div
                        key={enq.id}
                        className="p-4.5 rounded-xl border border-neutral-100 bg-[#faf9f6]/40 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:border-gold/20 transition-all"
                      >
                        <div className="space-y-2 max-w-2xl">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[11px] font-bold text-neutral-800">{enq.name}</span>
                            <span className={`px-2 py-0.5 rounded text-[8px] uppercase font-bold tracking-widest ${
                              enq.type === "Catering"
                                ? "bg-amber-600/10 text-amber-600 border border-amber-500/10"
                                : "bg-emerald-600/10 text-emerald-600 border border-emerald-500/10"
                            }`}>
                              {enq.type === "Catering" ? `${enq.eventType || "Catering"}` : "Mess Program"}
                            </span>
                            <span className="text-[9px] text-neutral-400">
                              {new Date(enq.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          
                          <div className="flex flex-wrap gap-x-3.5 gap-y-1 text-[10px] text-neutral-500 font-medium">
                            <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-gold" /> {enq.phone}</span>
                            {enq.email && <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-gold" /> {enq.email}</span>}
                            {enq.guests && <span className="flex items-center gap-1"><User className="w-3 h-3 text-gold" /> {enq.guests} Guests</span>}
                            {enq.date && <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-gold" /> {enq.date}</span>}
                            {enq.planName && <span className="flex items-center gap-1"><Utensils className="w-3 h-3 text-gold" /> Plan: {enq.planName}</span>}
                            <span className="text-[9px] font-bold text-gold bg-gold/15 px-1.5 py-0.5 rounded uppercase tracking-wider">{enq.preference}</span>
                          </div>

                          <p className="text-[11px] text-neutral-600 italic font-light">
                            &ldquo;{enq.message}&rdquo;
                          </p>
                        </div>

                        {/* Status controllers */}
                        <div className="flex items-center gap-2 shrink-0 self-end lg:self-auto border-t lg:border-t-0 border-neutral-100 pt-3 lg:pt-0 w-full lg:w-auto justify-end">
                          <select
                            value={enq.status}
                            onChange={(e) => updateEnquiryStatus(enq.id, e.target.value as any)}
                            className="px-2.5 py-1.5 rounded-lg border border-neutral-200 bg-white text-neutral-800 text-[10px] uppercase font-bold focus:border-gold focus:outline-none"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>

                          <button
                            onClick={() => deleteEnquiry(enq.id)}
                            className="p-1.5 rounded-lg bg-red-650/10 text-red-500 border border-red-500/10 hover:bg-red-500 hover:text-white transition-all"
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
              <div className="space-y-6">
                {/* Form to Add New Menu Item */}
                <div className="p-5 rounded-2xl border border-neutral-100 bg-[#faf9f6]/65">
                  <h3 className="text-xs font-bold text-neutral-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Plus className="w-4 h-4 text-gold" /> Add New Dish Item
                  </h3>

                  <form onSubmit={handleAddMenu} className="space-y-3.5">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[9px] uppercase font-bold text-neutral-500 mb-1">Dish Name</label>
                        <input
                          type="text"
                          required
                          value={menuName}
                          onChange={(e) => setMenuName(e.target.value)}
                          placeholder="e.g. Malai Paneer Tikka"
                          className="w-full px-3 py-2 rounded-lg border border-neutral-200 bg-white text-neutral-800 text-[11px] focus:border-gold focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] uppercase font-bold text-neutral-500 mb-1">Pricing</label>
                        <input
                          type="text"
                          required
                          value={menuPrice}
                          onChange={(e) => setMenuPrice(e.target.value)}
                          placeholder="e.g. ₹320 or ₹1,400/Plate"
                          className="w-full px-3 py-2 rounded-lg border border-neutral-200 bg-white text-neutral-800 text-[11px] focus:border-gold focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] uppercase font-bold text-neutral-500 mb-1">Category</label>
                        <select
                          value={menuCategory}
                          onChange={(e) => setMenuCategory(e.target.value as any)}
                          className="w-full px-3 py-2 rounded-lg border border-neutral-200 bg-white text-neutral-800 text-[11px] focus:border-gold focus:outline-none"
                        >
                          <option value="breakfast">Breakfast Experience</option>
                          <option value="lunch">Lunch Feast</option>
                          <option value="dinner">Dinner Specials</option>
                          <option value="traditional">Traditional Meals</option>
                          <option value="packages">Event Packages</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[9px] uppercase font-bold text-neutral-500 mb-1">Unsplash Image URL</label>
                        <input
                          type="text"
                          required
                          value={menuImage}
                          onChange={(e) => setMenuImage(e.target.value)}
                          placeholder="https://images.unsplash.com/photo-..."
                          className="w-full px-3 py-2 rounded-lg border border-neutral-200 bg-white text-neutral-800 text-[11px] focus:border-gold focus:outline-none"
                        />
                      </div>
                      <div className="flex items-center h-full pt-3">
                        <label className="flex items-center gap-2 cursor-pointer text-[11px] text-neutral-600 font-bold">
                          <input
                            type="checkbox"
                            checked={menuChef}
                            onChange={(e) => setMenuChef(e.target.checked)}
                            className="rounded border-neutral-200 text-gold focus:ring-gold"
                          />
                          <span>Chef Recommended Flag</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[9px] uppercase font-bold text-neutral-500 mb-1">Detailed Description</label>
                      <textarea
                        rows={2}
                        value={menuDesc}
                        onChange={(e) => setMenuDesc(e.target.value)}
                        placeholder="Provide details about culinary spices..."
                        className="w-full px-3 py-2 rounded-lg border border-neutral-200 bg-white text-neutral-800 text-[11px] focus:border-gold focus:outline-none resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-4.5 py-2 rounded-lg bg-neutral-900 hover:bg-gold text-white font-bold text-[10px] uppercase tracking-wider flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Dish</span>
                    </button>
                  </form>
                </div>

                {/* List Menu Items */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-neutral-800 uppercase tracking-wider">Current menu Items</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {menuItems.map((item) => (
                      <div
                        key={item.id}
                        className="p-3 rounded-lg border border-neutral-100 bg-[#faf9f6]/40 flex items-center gap-3 justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-10 h-10 object-cover rounded-lg border border-neutral-150 shrink-0"
                          />
                          <div>
                            <h4 className="text-[11px] font-bold text-neutral-800">{item.name}</h4>
                            <p className="text-[9px] text-gold uppercase tracking-wider mt-0.5">{item.category} • {item.price}</p>
                          </div>
                        </div>

                        <button
                          onClick={() => deleteMenuItem(item.id)}
                          className="p-1.5 rounded bg-red-600/10 text-red-500 border border-red-500/10 hover:bg-red-500 hover:text-white transition-all shrink-0"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: Gallery Items */}
            {activeTab === "gallery" && (
              <div className="space-y-6">
                {/* Form to Add New Gallery Image */}
                <div className="p-5 rounded-2xl border border-neutral-100 bg-[#faf9f6]/65">
                  <h3 className="text-xs font-bold text-neutral-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Plus className="w-4 h-4 text-gold" /> Upload New Photo
                  </h3>

                  <form onSubmit={handleAddGallery} className="space-y-3.5">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="sm:col-span-2">
                        <label className="block text-[9px] uppercase font-bold text-neutral-500 mb-1">Image Title</label>
                        <input
                          type="text"
                          required
                          value={galleryTitle}
                          onChange={(e) => setGalleryTitle(e.target.value)}
                          placeholder="e.g. Wedding Salad Plate setup"
                          className="w-full px-3 py-2 rounded-lg border border-neutral-200 bg-white text-neutral-800 text-[11px] focus:border-gold focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] uppercase font-bold text-neutral-500 mb-1">Category</label>
                        <select
                          value={galleryCategory}
                          onChange={(e) => setGalleryCategory(e.target.value as any)}
                          className="w-full px-3 py-2 rounded-lg border border-neutral-200 bg-white text-neutral-800 text-[11px] focus:border-gold focus:outline-none"
                        >
                          <option value="weddings">Weddings & Galas</option>
                          <option value="presentation">Art of Plating</option>
                          <option value="kitchen">Sanitized Kitchen</option>
                          <option value="moments">Customer Moments</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[9px] uppercase font-bold text-neutral-500 mb-1">Unsplash Image URL</label>
                      <input
                        type="text"
                        required
                        value={galleryImage}
                        onChange={(e) => setGalleryImage(e.target.value)}
                        placeholder="https://images.unsplash.com/photo-..."
                        className="w-full px-3 py-2 rounded-lg border border-neutral-200 bg-white text-neutral-800 text-[11px] focus:border-gold focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-4.5 py-2 rounded-lg bg-neutral-900 hover:bg-gold text-white font-bold text-[10px] uppercase tracking-wider flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Upload Photo</span>
                    </button>
                  </form>
                </div>

                {/* List Gallery Items */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-neutral-800 uppercase tracking-wider">Current Live Photos</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {galleryItems.map((item) => (
                      <div
                        key={item.id}
                        className="p-2.5 rounded-lg border border-neutral-100 bg-[#faf9f6]/40 flex flex-col hover:border-gold/10 transition-all gap-2 relative overflow-hidden"
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-24 object-cover rounded-lg border border-neutral-150"
                        />
                        <div className="flex justify-between items-start gap-2 pt-1">
                          <div className="overflow-hidden">
                            <h4 className="text-[10px] font-bold text-neutral-800 truncate">{item.title}</h4>
                            <p className="text-[8px] text-gold uppercase tracking-wider mt-0.5">{item.category}</p>
                          </div>
                          <button
                            onClick={() => deleteGalleryItem(item.id)}
                            className="p-1 rounded bg-red-600/10 text-red-500 border border-red-500/10 hover:bg-red-500 hover:text-white transition-all shrink-0"
                          >
                            <Trash2 className="w-3 h-3" />
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
