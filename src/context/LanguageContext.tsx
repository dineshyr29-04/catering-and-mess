"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "hi";

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Nav
    home: "Home",
    about: "Our Story",
    services: "Services",
    menu: "Culinary Collection",
    mess: "Mess Plans",
    journey: "Our Process",
    gallery: "Gallery",
    contact: "Contact Us",
    admin: "Dashboard Portal",

    // Hero
    heroHeadline: "Crafting Memorable Experiences Through Exceptional Food",
    heroSubtext: "Premium catering and mess solutions prepared with quality ingredients, authentic flavours, and professional service.",
    planEvent: "Plan Your Event",
    exploreServices: "Explore Our Services",
    badgeExp: "10+ Years Experience",
    badgeEvents: "500+ Events Served",
    badgeKitchen: "Fresh & Hygienic Kitchen",
    badgeTeam: "Professional Team",

    // Brand Story
    storyTitle: "More Than Food — We Create Experiences",
    storySubtitle: "OUR PHILOSOPHY",
    storyP1: "Founded by culinary visionaries, Aura has evolved from a small kitchen into a benchmark of luxury hospitality. We believe that every gathering is unique, and the food should tell a beautiful story.",
    storyP2: "Our culinary philosophy bridges traditional heritage recipes with modern presentation standards. We source only local, fresh ingredients and practice 5-star hygiene in our state-of-the-art kitchens.",
    founderText: "Chef Vikram Adiga, Culinary Director",
    philosophyTitle: "Our Food Philosophy",
    philosophyDesc: "Freshness, authenticity, and refined hospitality in every single bite.",

    // Services
    servicesTitle: "Bespoke Catering Services",
    servicesSubtitle: "WHAT WE OFFER",
    weddingCatering: "Wedding Catering",
    weddingDesc: "Grand celebrations, customized luxury menus, traditional & modern cuisines, and exquisite table styling.",
    corporateCatering: "Corporate Catering",
    corporateDesc: "Polished boardroom luncheons, elegant annual galas, and professional team meal services.",
    eventCatering: "Event Catering",
    eventDesc: "Intimate birthdays, milestone anniversaries, theme parties, and elegant family gatherings.",
    bulkCatering: "Bulk Food Services",
    bulkDesc: "Nutritious, high-standards catering for institutions, hostels, offices, and regular staff messes.",
    viewDetails: "View Collection",
    enquireNow: "Enquire Now",

    // Menu
    menuTitle: "Explore Our Culinary Collection",
    menuSubtitle: "SIGNATURE MENUS",
    breakfast: "Breakfast Experience",
    lunch: "Lunch Feast",
    dinner: "Dinner Specials",
    traditional: "Traditional Meals",
    packages: "Event Packages",
    requestCustom: "Request Custom Menu",
    chefRecommended: "Chef Recommendation",
    viewDetailsBtn: "View Details",

    // Mess
    messTitle: "Homestyle Meals Designed For Everyday Life",
    messSubtitle: "MESS SUBSCRIPTIONS",
    messP1: "Balanced, hygienic, and delicious meals delivered directly to students, hostels, and busy corporate offices.",
    freshDaily: "Fresh Preparation Daily",
    balancedNutrition: "Balanced Nutrition",
    hygienicKitchen: "5-Star Hygienic Kitchen",
    flexiblePlans: "Highly Flexible Plans",
    monthlyPlan: "Monthly Subscription Plans",
    officePlan: "Office Corporate Lunches",
    studentPlan: "Student Mess Program",
    configurePlan: "Customize & Calculate Subscription",
    duration: "Choose Subscription Period",
    days: "Days",
    vegOnly: "Vegetarian Only",
    nonVegAllowed: "Include Non-Vegetarian",
    deliveryTime: "Preferred Delivery Time",
    lunchTime: "Lunch Only",
    dinnerTime: "Dinner Only",
    bothMeals: "Both Lunch & Dinner",
    pricingEst: "Estimated Pricing",
    perMonth: "per month",
    subscribeCTA: "Initialize Mess Subscription",

    // Journey
    journeyTitle: "From First Conversation To Final Plate",
    journeySubtitle: "OUR EVENT JOURNEY",
    step1Title: "01 Consultation",
    step1Desc: "We sit down to understand your guests, dietary rules, theme, and service style preferences.",
    step2Title: "02 Menu Planning",
    step2Desc: "Our Master Chefs design a bespoke culinary menu customized to your unique taste palettes.",
    step3Title: "03 Food Preparation",
    step3Desc: "Handcrafted preparation using farm-fresh, premium ingredients in our sanitized facility.",
    step4Title: "04 Event Execution",
    step4Desc: "Professional servers and managers coordinate setup, plating, and live counters at your venue.",
    step5Title: "05 Client Satisfaction",
    step5Desc: "A follow-up review ensuring every guest had an exceptional, memorable dining experience.",

    // Gallery
    galleryTitle: "Our Visual Culinary Showcase",
    gallerySubtitle: "FOOD & MOMENTS",
    all: "All Gallery",
    weddings: "Weddings & Galas",
    presentation: "Art of Plating",
    kitchen: "Sanitized Kitchen",
    moments: "Customer Moments",

    // Why Choose Us
    whyTitle: "Why Elite Hosts Choose Aura",
    whySubtitle: "THE AURA DIFFERENCE",
    chefsCount: "Master Chefs",
    eventsCount: "Events Catered",
    hygieneCount: "Hygiene Rating",
    mealsCount: "Meals Served Daily",
    yearsCount: "Years of Service",

    // Testimonials
    testiTitle: "Stories Of Unforgettable Celebrations",
    testiSubtitle: "TESTIMONIALS",

    // Booking Form
    bookTitle: "Design Your Bespoke Catering Proposal",
    bookSubtitle: "BOOKING ENQUIRIES",
    formName: "Full Name",
    formPhone: "Phone Number",
    formEmail: "Email Address",
    formType: "Event Type",
    formGuests: "Estimated Guests",
    formDate: "Event Date",
    formPref: "Food Preference",
    formBudget: "Budget Range (Per Plate)",
    formMessage: "Tell Us About Your Vision",
    formSubmit: "Request Catering Proposal",
    formSuccess: "Thank you! Your catering request has been received. Our Event Manager will call you shortly.",

    // Contact
    contactTitle: "Reach Our Hospitality Team",
    contactSubtitle: "GET IN TOUCH",
    findUs: "Corporate Kitchen Location",
    phone: "Call Enquiries",
    whatsapp: "WhatsApp Enquiry",
    email: "Email Support",
    brochureBtn: "Download Brochure PDF",
  },
  hi: {
    // Nav
    home: "मुख्य पृष्ठ",
    about: "हमारी कहानी",
    services: "सेवाएं",
    menu: "भोजन संग्रह",
    mess: "मेस योजनाएं",
    journey: "हमारी प्रक्रिया",
    gallery: "गैलरी",
    contact: "संपर्क करें",
    admin: "डैशबोर्ड पोर्टल",

    // Hero
    heroHeadline: "असाधारण भोजन के माध्यम से यादगार अनुभव तैयार करना",
    heroSubtext: "गुणवत्तापूर्ण सामग्री, असली स्वाद और पेशेवर सेवा के साथ तैयार की गई प्रीमियम कैटरिंग और मेस सेवा।",
    planEvent: "कार्यक्रम की योजना बनाएं",
    exploreServices: "हमारी सेवाएं देखें",
    badgeExp: "10+ वर्षों का अनुभव",
    badgeEvents: "500+ आयोजित कार्यक्रम",
    badgeKitchen: "ताजा और स्वच्छ रसोई",
    badgeTeam: "पेशेवर टीम",

    // Brand Story
    storyTitle: "सिर्फ भोजन नहीं — हम अनुभव बनाते हैं",
    storySubtitle: "हमारा दर्शन",
    storyP1: "पाक कला के दूरदर्शी लोगों द्वारा स्थापित, ऑरा (Aura) एक छोटी रसोई से विकसित होकर लक्जरी आतिथ्य का एक बेंचमार्क बन गया है। हमारा मानना ​​है कि हर सभा अनोखी होती है और भोजन को एक सुंदर कहानी कहनी चाहिए।",
    storyP2: "हमारा पाक दर्शन पारंपरिक विरासत व्यंजनों को आधुनिक प्रस्तुति मानकों के साथ जोड़ता है। हम केवल स्थानीय, ताज़ी सामग्री का उपयोग करते हैं और अपनी अत्याधुनिक रसोई में 5-स्टार स्वच्छता का अभ्यास करते हैं।",
    founderText: "शेफ विक्रम अदिगा, पाक कला निदेशक",
    philosophyTitle: "हमारा भोजन दर्शन",
    philosophyDesc: "हर एक निवाले में ताजगी, प्रामाणिकता और परिष्कृत आतिथ्य।",

    // Services
    servicesTitle: "विशेष कैटरिंग सेवाएं",
    servicesSubtitle: "हम क्या प्रदान करते हैं",
    weddingCatering: "शादी की कैटरिंग",
    weddingDesc: "भव्य समारोह, अनुकूलित लक्जरी मेनू, पारंपरिक और आधुनिक व्यंजन और उत्कृष्ट टेबल स्टाइलिंग।",
    corporateCatering: "कॉर्पोरेट कैटरिंग",
    corporateDesc: "शानदार बोर्डरूम लंच, सुरुचिपूर्ण वार्षिक गाला और पेशेवर टीम भोजन सेवाएं।",
    eventCatering: "इवेंट कैटरिंग",
    eventDesc: "अंतरंग जन्मदिन, मील के पत्थर की वर्षगाँठ, थीम पार्टियां और सुरुचिपूर्ण पारिवारिक समारोह।",
    bulkCatering: "थोक भोजन सेवाएं",
    bulkDesc: "संस्थानों, छात्रावासों, कार्यालयों और नियमित कर्मचारी मेस के लिए पौष्टिक, उच्च-मानक खानपान।",
    viewDetails: "संग्रह देखें",
    enquireNow: "पूछताछ करें",

    // Menu
    menuTitle: "हमारे पाक संग्रह का अन्वेषण करें",
    menuSubtitle: "हस्ताक्षर मेनू",
    breakfast: "नाश्ता अनुभव",
    lunch: "दोपहर का भोजन",
    dinner: "रात्रि का भोजन",
    traditional: "पारंपरिक भोजन",
    packages: "इवेंट पैकेज",
    requestCustom: "कस्टम मेनू का अनुरोध करें",
    chefRecommended: "शेफ की सिफारिश",
    viewDetailsBtn: "विवरण देखें",

    // Mess
    messTitle: "रोजमर्रा की जिंदगी के लिए घरेलू भोजन",
    messSubtitle: "मेस सदस्यता",
    messP1: "छात्रों, छात्रावासों और व्यस्त कॉर्पोरेट कार्यालयों तक सीधे पहुंचाया जाने वाला संतुलित, स्वच्छ और स्वादिष्ट भोजन।",
    freshDaily: "प्रतिदिन ताजा तैयारी",
    balancedNutrition: "संतुलित पोषण",
    hygienicKitchen: "5-स्टार स्वच्छ रसोई",
    flexiblePlans: "अत्यधिक लचीली योजनाएं",
    monthlyPlan: "मासिक सदस्यता योजनाएं",
    officePlan: "कार्यालय कॉर्पोरेट लंच",
    studentPlan: "छात्र मेस कार्यक्रम",
    configurePlan: "अनुकूलित करें और सदस्यता की गणना करें",
    duration: "सदस्यता अवधि चुनें",
    days: "दिन",
    vegOnly: "केवल शाकाहारी",
    nonVegAllowed: "मांसाहारी शामिल करें",
    deliveryTime: "पसंदीदा डिलीवरी का समय",
    lunchTime: "केवल दोपहर का भोजन",
    dinnerTime: "केवल रात का भोजन",
    bothMeals: "दोपहर और रात का भोजन दोनों",
    pricingEst: "अनुमानित मूल्य",
    perMonth: "प्रति माह",
    subscribeCTA: "मेस सदस्यता शुरू करें",

    // Journey
    journeyTitle: "पहली बातचीत से लेकर अंतिम थाली तक",
    journeySubtitle: "हमारी इवेंट यात्रा",
    step1Title: "01 परामर्श",
    step1Desc: "हम आपके मेहमानों, आहार संबंधी नियमों, थीम और सेवा शैली की प्राथमिकताओं को समझने के लिए बैठते हैं।",
    step2Title: "02 मेनू योजना",
    step2Desc: "हमारे मास्टर शेफ आपके अद्वितीय स्वाद के अनुकूल एक विशेष पाक मेनू तैयार करते हैं।",
    step3Title: "03 भोजन की तैयारी",
    step3Desc: "हमारी सैनिटाइज्ड सुविधा में ताजा, प्रीमियम सामग्री का उपयोग करके हस्तनिर्मित तैयारी।",
    step4Title: "04 इवेंट का संचालन",
    step4Desc: "पेशेवर सर्वर और प्रबंधक आपके आयोजन स्थल पर सेटअप, प्लेटिंग और लाइव काउंटरों का समन्वय करते हैं।",
    step5Title: "05 ग्राहक संतुष्टि",
    step5Desc: "यह सुनिश्चित करने के लिए एक अनुवर्ती समीक्षा कि प्रत्येक अतिथि को भोजन का एक असाधारण, यादगार अनुभव मिला।",

    // Gallery
    galleryTitle: "हमारा दृश्य पाक प्रदर्शन",
    gallerySubtitle: "भोजन और यादें",
    all: "सभी गैलरी",
    weddings: "शादियाँ और गाला",
    presentation: "प्लेटिंग की कला",
    kitchen: "स्वच्छ रसोई",
    moments: "ग्राहक के सुनहरे पल",

    // Why Choose Us
    whyTitle: "सभ्रांत मेजबान ऑरा को क्यों चुनते हैं",
    whySubtitle: "ऑरा का अंतर",
    chefsCount: "मास्टर शेफ",
    eventsCount: "आयोजित इवेंट",
    hygieneCount: "हाइजीन रेटिंग",
    mealsCount: "दैनिक परोसे जाने वाले भोजन",
    yearsCount: "सेवा के वर्ष",

    // Testimonials
    testiTitle: "अविस्मरणीय समारोहों की कहानियाँ",
    testiSubtitle: "समीक्षाएं",

    // Booking Form
    bookTitle: "अपना विशेष कैटरिंग प्रस्ताव डिजाइन करें",
    bookSubtitle: "बुकिंग पूछताछ",
    formName: "पूरा नाम",
    formPhone: "फ़ोन नंबर",
    formEmail: "ईमेल पता",
    formType: "इवेंट का प्रकार",
    formGuests: "अनुमानित अतिथि संख्या",
    formDate: "इवेंट की तारीख",
    formPref: "भोजन प्राथमिकता",
    formBudget: "बजट सीमा (प्रति प्लेट)",
    formMessage: "अपनी योजना के बारे में हमें बताएं",
    formSubmit: "कैटरिंग प्रस्ताव का अनुरोध करें",
    formSuccess: "धन्यवाद! आपका अनुरोध प्राप्त हो गया है। हमारे इवेंट मैनेजर जल्द ही आपसे संपर्क करेंगे।",

    // Contact
    contactTitle: "हमारी आतिथ्य टीम से संपर्क करें",
    contactSubtitle: "सम्पर्क में रहें",
    findUs: "कॉर्पोरेट रसोई स्थान",
    phone: "पूछताछ फोन",
    whatsapp: "व्हाट्सएप पूछताछ",
    email: "ईमेल सहायता",
    brochureBtn: "ब्रोशर पीडीएफ डाउनलोड करें",
  },
};

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const savedLang = localStorage.getItem("aura_language") as Language;
    if (savedLang === "en" || savedLang === "hi") {
      setLanguageState(savedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("aura_language", lang);
  };

  const t = (key: string): string => {
    const currentTranslations = translations[language];
    return (currentTranslations as any)[key] || (translations.en as any)[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
