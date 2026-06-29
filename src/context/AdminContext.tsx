"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface Enquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  type: string; // "Catering" | "Mess"
  eventType?: string; // For catering
  guests?: number; // For catering
  date?: string;
  preference: string; // "Veg" | "Non-Veg"
  budget?: string;
  planName?: string; // For mess
  duration?: string; // For mess
  meals?: string; // For mess
  message: string;
  status: "Pending" | "Contacted" | "Confirmed" | "Cancelled";
  createdAt: string;
}

export interface MenuItem {
  id: string;
  category: "breakfast" | "lunch" | "dinner" | "traditional" | "packages";
  name: string;
  description: string;
  price: string;
  chefRecommended: boolean;
  image: string;
  details?: string;
}

export interface GalleryItem {
  id: string;
  category: "weddings" | "presentation" | "kitchen" | "moments";
  title: string;
  image: string;
}

interface AdminContextProps {
  enquiries: Enquiry[];
  menuItems: MenuItem[];
  galleryItems: GalleryItem[];
  addEnquiry: (enquiry: Omit<Enquiry, "id" | "status" | "createdAt">) => void;
  updateEnquiryStatus: (id: string, status: Enquiry["status"]) => void;
  deleteEnquiry: (id: string) => void;
  addMenuItem: (item: Omit<MenuItem, "id">) => void;
  updateMenuItem: (item: MenuItem) => void;
  deleteMenuItem: (id: string) => void;
  addGalleryItem: (item: Omit<GalleryItem, "id">) => void;
  deleteGalleryItem: (id: string) => void;
}

const defaultMenuItems: MenuItem[] = [
  // Breakfast
  {
    id: "b1",
    category: "breakfast",
    name: "Royal Rajwadi Ghee Idli",
    description: "Steam-cooked organic rice-lentil cakes lathered with pure A2 cow ghee, served with heirloom tomato-chili chutney and traditional drumstick sambar.",
    price: "₹180",
    chefRecommended: true,
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80",
    details: "Gluten-free, cooked in a brass steamer using hand-pounded rice."
  },
  {
    id: "b2",
    category: "breakfast",
    name: "Amritsari Kulcha Banquet",
    description: "Crisp, layered tandoori clay-oven bread stuffed with spiced potatoes and paneer, served with slow-cooked spicy chickpea masala and sweet lassi.",
    price: "₹240",
    chefRecommended: false,
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&w=600&q=80",
    details: "Authentic North Indian style, prepared using direct fire tandoor."
  },
  // Lunch
  {
    id: "l1",
    category: "lunch",
    name: "Dawat-e-Khas Awadhi Biryani",
    description: "Fragrant basmati rice layered with saffron, rose water, and choice vegetables or paneer, dum-cooked in a sealed clay pot. Served with pomegranate raita.",
    price: "₹380",
    chefRecommended: true,
    image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=600&q=80",
    details: "Slow cooked for 6 hours with a secret blend of 21 exotic spices."
  },
  {
    id: "l2",
    category: "lunch",
    name: "Heritage South Indian Sadya",
    description: "A ceremonial feast consisting of 16 traditional Kerala delicacies including Avial, Thoran, Olan, and Payasam, served on a fresh plantain leaf.",
    price: "₹450",
    chefRecommended: false,
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80",
    details: "Cooked in traditional bronze vessels by heritage chefs from Palakkad."
  },
  // Dinner
  {
    id: "d1",
    category: "dinner",
    name: "Smoked Dal Makhani & Truffle Naan",
    description: "Black lentils slow-cooked overnight over embers with butter and cream, finished with oak wood smoke. Served with freshly baked truffle oil naan.",
    price: "₹350",
    chefRecommended: true,
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80",
    details: "Creamy, rich texture with 24 hours of slow simmering."
  },
  {
    id: "d2",
    category: "dinner",
    name: "Mughlai Shahi Paneer Korma",
    description: "Fresh cottage cheese triangles poached in a rich, velvety gravy of cashew nuts, melon seeds, and green cardamom, topped with organic edible silver leaf.",
    price: "₹390",
    chefRecommended: false,
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&w=600&q=80",
    details: "Mildly sweet and richly aromatic korma suited for celebrations."
  },
  // Traditional
  {
    id: "t1",
    category: "traditional",
    name: "Rajasthani Dal Baati Churma",
    description: "Traditional hard wheat rolls baked over cow-dung cakes, served with mixed panchmel dal, loaded with ghee, and accompanied by cardamom sweet churma.",
    price: "₹480",
    chefRecommended: true,
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&w=600&q=80",
    details: "Authentic recipe sourced from royal families of Mewar."
  },
  // Packages
  {
    id: "p1",
    category: "packages",
    name: "Royal Wedding Gold Banquet",
    description: "Complete luxury menu featuring 5 live counters, 6 appetizers, 8 main courses, and 4 desserts, including thematic styling and professional service crew.",
    price: "₹1,200/Plate",
    chefRecommended: true,
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=600&q=80",
    details: "Includes custom decor matching for food stalls and custom plateware."
  }
];

const defaultGalleryItems: GalleryItem[] = [
  { id: "g1", category: "weddings", title: "Royal Wedding Feast Setup", image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80" },
  { id: "g2", category: "presentation", title: "Signature Seared Paneer Platter", image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80" },
  { id: "g3", category: "kitchen", title: "Hygiene Standard Compliance", image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80" },
  { id: "g4", category: "moments", title: "Corporate Buffet Experience", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80" },
  { id: "g5", category: "weddings", title: "Live Chaat & Dessert Bar", image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80" },
  { id: "g6", category: "presentation", title: "Artisanal Dessert Presentation", image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=800&q=80" }
];

const defaultEnquiries: Enquiry[] = [
  {
    id: "e1",
    name: "Arjun Sharma",
    phone: "+91 98765 43210",
    email: "arjun.sharma@gmail.com",
    type: "Catering",
    eventType: "Wedding Catering",
    guests: 350,
    date: "2026-11-12",
    preference: "Veg Only",
    budget: "₹1,200+",
    message: "We want a premium royal theme wedding menu with traditional live counters.",
    status: "Pending",
    createdAt: "2026-06-29T11:20:00.000Z"
  },
  {
    id: "e2",
    name: "Neha Goel",
    phone: "+91 87654 32109",
    email: "neha.goel@techcorp.com",
    type: "Catering",
    eventType: "Corporate Catering",
    guests: 120,
    date: "2026-08-05",
    preference: "Include Non-Vegetarian",
    budget: "₹800 - ₹1,200",
    message: "Corporate annual dinner. We need standard appetizers and fine buffet service.",
    status: "Contacted",
    createdAt: "2026-06-29T09:45:00.000Z"
  },
  {
    id: "e3",
    name: "Rahul Verma",
    phone: "+91 91234 56789",
    email: "rahul.verma@student.in",
    type: "Mess",
    planName: "Student Mess Program",
    duration: "90 Days",
    meals: "Both Lunch & Dinner",
    preference: "Veg Only",
    message: "Subscribed using the custom price calculator. Requested veggie plan.",
    status: "Confirmed",
    createdAt: "2026-06-28T14:10:00.000Z"
  }
];

const AdminContext = createContext<AdminContextProps | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);

  useEffect(() => {
    // Load enquiries
    const savedEnquiries = localStorage.getItem("aura_enquiries");
    if (savedEnquiries) {
      setEnquiries(JSON.parse(savedEnquiries));
    } else {
      setEnquiries(defaultEnquiries);
      localStorage.setItem("aura_enquiries", JSON.stringify(defaultEnquiries));
    }

    // Load menu items
    const savedMenu = localStorage.getItem("aura_menu");
    if (savedMenu) {
      setMenuItems(JSON.parse(savedMenu));
    } else {
      setMenuItems(defaultMenuItems);
      localStorage.setItem("aura_menu", JSON.stringify(defaultMenuItems));
    }

    // Load gallery
    const savedGallery = localStorage.getItem("aura_gallery");
    if (savedGallery) {
      setGalleryItems(JSON.parse(savedGallery));
    } else {
      setGalleryItems(defaultGalleryItems);
      localStorage.setItem("aura_gallery", JSON.stringify(defaultGalleryItems));
    }
  }, []);

  const addEnquiry = (enquiry: Omit<Enquiry, "id" | "status" | "createdAt">) => {
    const newEnquiry: Enquiry = {
      ...enquiry,
      id: "e_" + Math.random().toString(36).substr(2, 9),
      status: "Pending",
      createdAt: new Date().toISOString()
    };
    const updated = [newEnquiry, ...enquiries];
    setEnquiries(updated);
    localStorage.setItem("aura_enquiries", JSON.stringify(updated));
  };

  const updateEnquiryStatus = (id: string, status: Enquiry["status"]) => {
    const updated = enquiries.map((enq) =>
      enq.id === id ? { ...enq, status } : enq
    );
    setEnquiries(updated);
    localStorage.setItem("aura_enquiries", JSON.stringify(updated));
  };

  const deleteEnquiry = (id: string) => {
    const updated = enquiries.filter((enq) => enq.id !== id);
    setEnquiries(updated);
    localStorage.setItem("aura_enquiries", JSON.stringify(updated));
  };

  const addMenuItem = (item: Omit<MenuItem, "id">) => {
    const newItem: MenuItem = {
      ...item,
      id: "m_" + Math.random().toString(36).substr(2, 9)
    };
    const updated = [...menuItems, newItem];
    setMenuItems(updated);
    localStorage.setItem("aura_menu", JSON.stringify(updated));
  };

  const updateMenuItem = (item: MenuItem) => {
    const updated = menuItems.map((m) => (m.id === item.id ? item : m));
    setMenuItems(updated);
    localStorage.setItem("aura_menu", JSON.stringify(updated));
  };

  const deleteMenuItem = (id: string) => {
    const updated = menuItems.filter((m) => m.id !== id);
    setMenuItems(updated);
    localStorage.setItem("aura_menu", JSON.stringify(updated));
  };

  const addGalleryItem = (item: Omit<GalleryItem, "id">) => {
    const newItem: GalleryItem = {
      ...item,
      id: "g_" + Math.random().toString(36).substr(2, 9)
    };
    const updated = [...galleryItems, newItem];
    setGalleryItems(updated);
    localStorage.setItem("aura_gallery", JSON.stringify(updated));
  };

  const deleteGalleryItem = (id: string) => {
    const updated = galleryItems.filter((g) => g.id !== id);
    setGalleryItems(updated);
    localStorage.setItem("aura_gallery", JSON.stringify(updated));
  };

  return (
    <AdminContext.Provider
      value={{
        enquiries,
        menuItems,
        galleryItems,
        addEnquiry,
        updateEnquiryStatus,
        deleteEnquiry,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
        addGalleryItem,
        deleteGalleryItem
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};
