import React, { useState, useEffect, Suspense, lazy } from "react";
import {
  ShoppingBag,
  Sparkles,
  ArrowUpRight,
  X,
  Plus,
  Minus,
  MessageCircle,
  ChevronRight,
  Clock,
  ArrowRight,
  CheckCircle2,
  UtensilsCrossed,
  Flame,
  Utensils,
  Wine,
  Package,
  Soup,
  ChefHat,
  Menu,
  ArrowLeft,
} from "lucide-react";
import { MarqueeCards, type MarqueeDishCard } from "@/components/ui/marquee-cards";
import {
  SOZ_BRAND_IDENTITY,
  SOZ_FIVE_SERVICES,
  PH_DELIVERY_ZONES,
} from "@/data/soz-menu-data";
import { ChefStoryAndHoursSection } from "@/components/ChefStoryAndHoursSection";
import { TrustAndReviewsSection } from "@/components/TrustAndReviewsSection";
import { Footer } from "@/components/Footer";

// Lazy-loaded subpages for blazing fast mobile initial load
const RiceAndSoupPlatesSection = lazy(() => import("@/components/RiceAndSoupPlatesSection"));
const LiterBowlConfigurator = lazy(() => import("@/components/LiterBowlConfigurator"));
const ChopsAndSurpriseBuilder = lazy(() => import("@/components/ChopsAndSurpriseBuilder"));
const EventCateringSection = lazy(() => import("@/components/EventCateringSection"));

const SubpageLoader: React.FC = () => (
  <div className="py-24 flex flex-col items-center justify-center text-center space-y-3">
    <div className="w-8 h-8 rounded-full border-2 border-[#D4AF37]/30 border-t-[#E86F2C] animate-spin" />
    <span className="text-[11px] font-mono uppercase tracking-widest text-[#D4AF37]">
      Loading Kitchen Studio...
    </span>
  </div>
);

export interface CartItem {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  quantity: number;
  image: string;
}

const LOCAL_STORAGE_CART_KEY = "soz-cravings-cart-v2";

const renderServiceIcon = (iconName: string) => {
  switch (iconName) {
    case "Flame":
      return <Flame className="w-6 h-6 text-[#D4AF37] group-hover:text-white transition-colors" />;
    case "Utensils":
      return <Utensils className="w-6 h-6 text-[#D4AF37] group-hover:text-white transition-colors" />;
    case "Wine":
      return <Wine className="w-6 h-6 text-[#D4AF37] group-hover:text-white transition-colors" />;
    case "Package":
      return <Package className="w-6 h-6 text-[#D4AF37] group-hover:text-white transition-colors" />;
    case "Soup":
      return <Soup className="w-6 h-6 text-[#D4AF37] group-hover:text-white transition-colors" />;
    default:
      return <Sparkles className="w-6 h-6 text-[#D4AF37] group-hover:text-white transition-colors" />;
  }
};

export type PageId = "home" | "rice-soups" | "fries-chops" | "liter-bowls" | "private-chef";

interface SubpageBannerProps {
  badge: string;
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  onBackToHome: () => void;
}

const SubpageBanner: React.FC<SubpageBannerProps> = ({
  badge,
  title,
  subtitle,
  icon,
  onBackToHome,
}) => (
  <div className="relative py-2.5 sm:py-3 bg-[#0E0813] border-b border-[#D4AF37]/25 shadow-sm">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
      {/* Left: Home Button + Divider + Icon + Title + Badge */}
      <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
        <button
          type="button"
          onClick={onBackToHome}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#160E1D] border border-[#D4AF37]/25 text-xs font-mono text-[#B8ACA3] hover:text-[#FAF6F0] hover:border-[#E86F2C] transition-all cursor-pointer group shadow-sm"
          title="Return to Home Landing Page"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#E86F2C] group-hover:-translate-x-0.5 transition-transform" />
          <span className="hidden xs:inline">Home</span>
        </button>

        <div className="h-4 w-px bg-[#D4AF37]/20" />

        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-[#261533] border border-[#D4AF37]/35 flex items-center justify-center text-[#D4AF37] shrink-0">
            {icon}
          </div>
          <h1 className="font-display font-bold text-sm sm:text-base text-[#FAF6F0] tracking-tight whitespace-nowrap">
            {title}
          </h1>
        </div>

        <span className="hidden md:inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full royal-badge font-semibold text-[#D4AF37]">
          {badge}
        </span>
      </div>

      {/* Right: Cormorant Garamond script subtitle quote */}
      {subtitle && (
        <p className="hidden sm:block font-script text-sm lg:text-base text-[#E8D8C8] italic text-right truncate pl-4">
          "{subtitle}"
        </p>
      )}
    </div>
  </div>
);

export function App() {
  const getPageFromHash = (): PageId => {
    const raw = window.location.hash.replace("#/", "").replace("#", "").trim().toLowerCase();
    if (raw === "rice-soups") return "rice-soups";
    if (raw === "fries-chops") return "fries-chops";
    if (raw === "liter-bowls") return "liter-bowls";
    if (raw === "private-chef") return "private-chef";
    return "home";
  };

  const [currentPage, setCurrentPage] = useState<PageId>(() => getPageFromHash());
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useEffect(() => {
    const handleHash = () => {
      setCurrentPage(getPageFromHash());
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const navigateTo = (page: PageId) => {
    setCurrentPage(page);
    window.location.hash = page === "home" ? "" : `#/${page}`;
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsMobileNavOpen(false);
  };

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedZone, setSelectedZone] = useState("eneka");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [deliveryWindow, setDeliveryWindow] = useState("As soon as ready / 24hrs");
  const [preselectedDish, setPreselectedDish] = useState<string>("fisherman-soup");

  // Cart state with localStorage persistence
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      // Clear out legacy prototype demo items from v1
      localStorage.removeItem("soz-cravings-cart-v1");
      const saved = localStorage.getItem(LOCAL_STORAGE_CART_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (e) {
      // fallback
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(cartItems));
    } catch (e) {
      // storage error
    }
  }, [cartItems]);

  // Dish items for Continuous Dish Marquee (Section 3)
  const marqueeDishes: MarqueeDishCard[] = [
    {
      id: "marquee-1",
      title: "Gourmet Fisherman Soup",
      subtitle: "Jumbo Prawns, Crab & Sea Snails",
      priceTag: "From ₦28,000",
      image: "/images/single-soup-bowl.webp",
    },
    {
      id: "marquee-2",
      title: "The Odogwu Small Chops Box",
      subtitle: "35 Puffs, Samosas, Rolls & Turkey",
      priceTag: "₦35,000",
      image: "/images/box-of-chops.webp",
    },
    {
      id: "marquee-3",
      title: "Chef So'z Box of Fries Special",
      subtitle: "15 Yam, 15 Potato, 15 Plantain & Turkey",
      priceTag: "₦25,000",
      image: "/images/box-of-fries.webp",
    },
    {
      id: "marquee-4",
      title: "Rice & Moi Moi Feast Plate",
      subtitle: "Jollof, Fried Rice, Salad & Protein",
      priceTag: "₦12,000",
      image: "/images/rice-combo-plate.webp",
    },
    {
      id: "marquee-5",
      title: "Loaded Classic Soup Bowl",
      subtitle: "Egusi, Afang, Banga or Okazi",
      priceTag: "₦7,000",
      image: "/images/single-soup-bowl.webp",
    },
    {
      id: "marquee-6",
      title: "Regular Box of Chops",
      subtitle: "15 Puffs, 4 Samosas, 4 Rolls & Pepper Chicken",
      priceTag: "₦5,500",
      image: "/images/box-of-chops.webp",
    },
    {
      id: "marquee-7",
      title: "Box of Fries (Snails & Prawns)",
      subtitle: "Yam, Potato, Plantain with Sea Snails & Prawns",
      priceTag: "₦35,000",
      image: "/images/box-of-fries.webp",
    },
    {
      id: "marquee-8",
      title: "Dual-Rice Combo Plate",
      subtitle: "Jollof, Fried Rice, Salad & Choice of Protein",
      priceTag: "₦10,000",
      image: "/images/rice-combo-plate.webp",
    },
  ];

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const selectedDeliveryZone = PH_DELIVERY_ZONES.find((z) => z.id === selectedZone);
  const deliveryFee = selectedDeliveryZone?.fee ?? 0;
  const finalTotal = cartSubtotal + deliveryFee;

  const handleAddToCart = (item: {
    id: string;
    name: string;
    subtitle: string;
    price: number;
    image: string;
  }) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [
        ...prev,
        {
          id: item.id,
          name: item.name,
          subtitle: item.subtitle,
          price: item.price,
          quantity: 1,
          image: item.image,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const handleMarqueeAddToCart = (dish: MarqueeDishCard) => {
    const numPrice = dish.priceTag.includes("35,000")
      ? 35000
      : dish.priceTag.includes("28,000")
      ? 28000
      : dish.priceTag.includes("26,000")
      ? 26000
      : dish.priceTag.includes("25,000")
      ? 25000
      : dish.priceTag.includes("12,000")
      ? 12000
      : dish.priceTag.includes("10,000")
      ? 10000
      : dish.priceTag.includes("7,000")
      ? 7000
      : dish.priceTag.includes("6,000")
      ? 6000
      : dish.priceTag.includes("5,500")
      ? 5500
      : dish.priceTag.includes("40,000")
      ? 40000
      : 2500;

    handleAddToCart({
      id: dish.id,
      name: dish.title,
      subtitle: dish.subtitle,
      price: numPrice,
      image: dish.image,
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };



  // Formatted WhatsApp Invoice with Unique Ref #SOZ-XXXX
  const generateWhatsAppOrder = () => {
    const randomRef = Math.floor(1000 + Math.random() * 9000);
    const orderRef = `#SOZ-${randomRef}`;

    const itemsList = cartItems
      .map(
        (item, index) =>
          `${index + 1}. ${item.quantity}x *${item.name}*\n   _${item.subtitle || ""}_ — ₦${(
            item.price * item.quantity
          ).toLocaleString()}`
      )
      .join("\n\n");

    const zoneName = selectedDeliveryZone?.areaName || "Eneka / Port Harcourt";
    const feeText = selectedDeliveryZone?.fee
      ? `₦${selectedDeliveryZone.fee.toLocaleString()}`
      : "Free / Calculated on confirmation";

    const text = `*OFFICIAL SO'Z CRAVINGS ORDER INVOICE*
*Order Ref:* ${orderRef}
*Brand Tagline:* ${SOZ_BRAND_IDENTITY.primaryTagline}
*Kitchen Studio:* ${SOZ_BRAND_IDENTITY.kitchenBaseLocation}

*CUSTOMER DETAILS:*
• Name: ${customerName.trim() || "Customer"}
• Phone: ${customerPhone.trim() || "Provided on WhatsApp"}
• Delivery Zone: ${zoneName}
• Scheduled Window: ${deliveryWindow.trim() || "As soon as ready / 24hrs"}

*ITEMIZED SELECTIONS (${totalCartCount} ${totalCartCount === 1 ? "item" : "items"} across ${cartItems.length} ${cartItems.length === 1 ? "dish" : "dishes"}):*
${itemsList}

*PAYMENT BREAKDOWN:*
• Items Subtotal: ₦${cartSubtotal.toLocaleString()}
• Delivery Fee: ${feeText}
• *GRAND TOTAL: ₦${finalTotal.toLocaleString()}*

Please confirm kitchen availability and provide your account transfer details!`;

    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/${SOZ_BRAND_IDENTITY.whatsappPrimary}?text=${encodedText}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#0B070E] text-[#FAF6F0] selection:bg-[#E86F2C] selection:text-white relative font-sans pb-24 md:pb-0">
      {/* =========================================================================
          SECTION 1: Minimal Hairline Navbar (Ember & Oak Style) + Live Cart Pill
          ========================================================================= */}
      <header className="sticky top-0 z-50 w-full glass-nav backdrop-blur-xl transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Left Brand Identifier with Official 3D Crest Logo */}
          <button
            type="button"
            onClick={() => navigateTo("home")}
            className="flex items-center gap-3.5 group text-left cursor-pointer"
          >
            <div className="w-11 h-11 rounded-xl overflow-hidden border border-[#D4AF37]/50 shadow-lg group-hover:border-[#F3C663] group-hover:scale-105 transition-all duration-300 bg-[#160E1D] flex items-center justify-center shrink-0">
              <img
                src="/images/soz-crest-dark.webp"
                alt="So'z Cravings Official 3D Crest"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-display font-extrabold text-xl sm:text-2xl tracking-wider text-[#FAF6F0] uppercase">
                  SO'Z
                </span>
                <span className="font-script text-xl sm:text-2xl text-[#D4AF37] font-semibold -ml-0.5">
                  Cravings
                </span>
              </div>
              <span className="text-[10px] uppercase tracking-widest text-[#B8ACA3] -mt-1 font-medium flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E86F2C] inline-block animate-pulse" />
                Eneka, Port Harcourt • Est. 2024
              </span>
            </div>
          </button>

          {/* Center Links (Desktop) */}
          <nav className="hidden lg:flex items-center space-x-7 text-xs uppercase tracking-wider font-semibold">
            <button
              type="button"
              onClick={() => navigateTo("home")}
              className={`relative py-1 transition-colors cursor-pointer ${
                currentPage === "home" ? "text-[#FAF6F0]" : "text-[#B8ACA3] hover:text-[#FAF6F0]"
              }`}
            >
              Home
              {currentPage === "home" && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#D4AF37] to-[#E86F2C] rounded-full" />
              )}
            </button>



            <button
              type="button"
              onClick={() => navigateTo("rice-soups")}
              className={`relative py-1 transition-colors cursor-pointer ${
                currentPage === "rice-soups" ? "text-[#FAF6F0]" : "text-[#B8ACA3] hover:text-[#FAF6F0]"
              }`}
            >
              Rice & Soups
              {currentPage === "rice-soups" && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#D4AF37] to-[#E86F2C] rounded-full" />
              )}
            </button>

            <button
              type="button"
              onClick={() => navigateTo("fries-chops")}
              className={`relative py-1 transition-colors cursor-pointer ${
                currentPage === "fries-chops" ? "text-[#FAF6F0]" : "text-[#B8ACA3] hover:text-[#FAF6F0]"
              }`}
            >
              Fries & Chops
              {currentPage === "fries-chops" && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#D4AF37] to-[#E86F2C] rounded-full" />
              )}
            </button>

            <button
              type="button"
              onClick={() => navigateTo("liter-bowls")}
              className={`relative py-1 transition-colors cursor-pointer ${
                currentPage === "liter-bowls" ? "text-[#FAF6F0]" : "text-[#B8ACA3] hover:text-[#FAF6F0]"
              }`}
            >
              Liter Bowls
              {currentPage === "liter-bowls" && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#D4AF37] to-[#E86F2C] rounded-full" />
              )}
            </button>

            <button
              type="button"
              onClick={() => navigateTo("private-chef")}
              className={`relative py-1 transition-colors cursor-pointer ${
                currentPage === "private-chef" ? "text-[#FAF6F0]" : "text-[#B8ACA3] hover:text-[#FAF6F0]"
              }`}
            >
              Private Chef
              {currentPage === "private-chef" && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#D4AF37] to-[#E86F2C] rounded-full" />
              )}
            </button>
          </nav>

          {/* Right Action CTAs */}
          <div className="flex items-center gap-3">
            {/* Live Cart Pill Button */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2.5 px-4 py-2 rounded-full bg-gradient-to-r from-[#160E1D] to-[#261533] border border-[#D4AF37]/40 hover:border-[#E86F2C] text-[#FAF6F0] shadow-xl hover:shadow-[#E86F2C]/20 transition-all duration-300 group cursor-pointer"
              aria-label="View Shopping Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 text-[#E86F2C] group-hover:scale-110 transition-transform" />
                {totalCartCount > 0 && (
                  <span className="absolute -top-2 -right-2.5 w-4 h-4 bg-[#E86F2C] text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                    {totalCartCount}
                  </span>
                )}
              </div>

              <span className="font-mono font-bold text-xs text-[#F3C663] tabular-nums">
                ₦{cartSubtotal.toLocaleString()}
              </span>
            </button>

            {/* Mobile Hamburger Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setIsMobileNavOpen((prev) => !prev)}
              className="lg:hidden w-10 h-10 rounded-xl bg-[#160E1D] border border-[#D4AF37]/35 flex items-center justify-center text-[#FAF6F0] hover:text-[#E86F2C] transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown Drawer */}
        {isMobileNavOpen && (
          <div className="lg:hidden border-t border-[#D4AF37]/20 bg-[#0B070E]/98 backdrop-blur-2xl px-4 py-5 space-y-1 shadow-2xl">
            {[
              { id: "home", label: "Home" },
              { id: "rice-soups", label: "Rice & Soups" },
              { id: "fries-chops", label: "Fries & Chops" },
              { id: "liter-bowls", label: "Liter Bowls" },
              { id: "private-chef", label: "Private Chef" },
            ].map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => navigateTo(link.id as PageId)}
                className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-between transition-all cursor-pointer ${
                  currentPage === link.id
                    ? "royal-badge text-[#FAF6F0] shadow-md"
                    : "text-[#B8ACA3] hover:text-[#FAF6F0] hover:bg-[#160E1D]"
                }`}
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
              </button>
            ))}
          </div>
        )}
      </header>

      {/* =========================================================================
          SECTION 2: Ember & Oak Asymmetric Hero with Faint 1px Gold Orbital SVG Rings
          ========================================================================= */}
      {/* =========================================================================
          PAGE 1: HOME (Landing Page)
          Contains:
          1. Hero Section (Ember & Oak Style)
          2. Signature Cravings in Motion Slide Show (marquee-cards)
          3. 5 Official Flyer Services Showcase (with page direct links)
          4. Chef Sonia Bio & 2x2 Kitchen Schedule
          5. CAC Legitimacy Badge & SOZfeedbacks Customer Love Wall
          ========================================================================= */}
      {currentPage === "home" && (
        <main>
          {/* Hero Section */}
          <section
            id="home"
            className="relative min-h-[92vh] flex items-center justify-center overflow-hidden border-b border-[#D4AF37]/15 py-12 lg:py-20"
          >
            <div className="absolute inset-0 bg-[#0B070E]">
              <div className="absolute inset-0 bg-gradient-to-b from-[#160E1D]/70 via-[#0B070E]/90 to-[#0B070E]" />
              <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] bg-[#6B21A8]/15 rounded-full blur-[140px] pointer-events-none" />
              <div className="absolute bottom-10 right-10 w-[600px] h-[600px] bg-[#E86F2C]/10 rounded-full blur-[160px] pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#D4AF37]/8 rounded-full blur-[180px] pointer-events-none" />
            </div>

            {/* Faint 1px Gold Orbital SVG Rings */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
              <svg
                className="w-[1400px] h-[1400px] sm:w-[1700px] sm:h-[1700px] opacity-75"
                viewBox="0 0 1000 1000"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="500" cy="500" r="220" stroke="rgba(212, 175, 55, 0.16)" strokeWidth="1" />
                <circle
                  cx="500"
                  cy="500"
                  r="340"
                  stroke="rgba(212, 175, 55, 0.14)"
                  strokeWidth="1"
                  strokeDasharray="4 8"
                />
                <circle cx="500" cy="500" r="460" stroke="rgba(212, 175, 55, 0.12)" strokeWidth="1" />
                <circle
                  cx="500"
                  cy="500"
                  r="580"
                  stroke="rgba(212, 175, 55, 0.08)"
                  strokeWidth="1"
                  strokeDasharray="8 12"
                />
                <ellipse
                  cx="500"
                  cy="500"
                  rx="490"
                  ry="240"
                  transform="rotate(-26 500 500)"
                  stroke="rgba(232, 111, 44, 0.18)"
                  strokeWidth="1.25"
                />
                <circle cx="280" cy="500" r="3" fill="#D4AF37" opacity="0.6" />
                <circle cx="500" cy="160" r="2.5" fill="#E86F2C" opacity="0.7" />
                <circle cx="840" cy="500" r="4" fill="#F3C663" opacity="0.5" />
                <circle cx="360" cy="270" r="2" fill="#FAF6F0" opacity="0.4" />
              </svg>
            </div>

            {/* Hero Content Container */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                {/* POINT 1: Middle-Left Massive Display Title */}
                <div className="lg:col-span-7 flex flex-col space-y-6">
                  <div className="space-y-1">
                    <h1 className="font-display font-black text-6xl sm:text-7xl md:text-8xl lg:text-[7rem] tracking-tight leading-[0.88] text-[#FAF6F0] uppercase">
                      SO'Z
                    </h1>
                    <h1 className="font-display font-black text-6xl sm:text-7xl md:text-8xl lg:text-[7rem] tracking-tight leading-[0.88] text-transparent bg-clip-text bg-gradient-to-r from-[#FAF6F0] via-[#E8D8C8] to-[#D4AF37] uppercase">
                      CRAVINGS
                    </h1>
                  </div>

                  <div className="pt-1 pb-1">
                    <p className="font-mono text-sm sm:text-base font-bold tracking-[0.2em] text-[#E86F2C] uppercase">
                      {SOZ_BRAND_IDENTITY.primaryTagline}
                    </p>
                    <p className="font-script text-2xl sm:text-3xl text-[#D4AF37] italic mt-1">
                      "Crave It. We Deliver. • Small Chops, Big Vibes! • Fries. Flavor. Satisfaction."
                    </p>
                  </div>
                </div>

                {/* POINT 2: Middle-Right Story Block */}
                <div className="lg:col-span-5">
                  <div className="relative rounded-3xl p-7 sm:p-9 bg-gradient-to-b from-[#160E1D]/95 via-[#160E1D]/80 to-[#0B070E]/95 backdrop-blur-2xl border border-[#D4AF37]/35 shadow-2xl royal-card-glow">
                    <div className="flex items-center pb-5 border-b border-[#D4AF37]/15">
                      <span className="text-[11px] uppercase tracking-widest font-mono text-[#D4AF37] font-semibold flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#E86F2C]" />
                        Chef So'z (Sonia) Kitchen
                      </span>
                    </div>

                    <div className="py-6 space-y-4">
                      <p className="text-base sm:text-lg text-[#FAF6F0] leading-relaxed font-light">
                        So'z Cravings brings together bold <span className="text-[#D4AF37] font-medium">Niger Delta</span> & continental flavors with homemade recipes crafted from the freshest ingredients.
                      </p>
                      <p className="text-xs sm:text-sm text-[#B8ACA3] leading-relaxed">
                        Whether you are hosting a wedding, child dedication, birthday party, or craving a personal liter bowl at home, we deliver good food and memorable moments.
                      </p>
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                      <button
                        type="button"
                        onClick={() => navigateTo("rice-soups")}
                        className="flex-1 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#E86F2C] to-[#c75516] text-white text-sm font-bold tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-[#E86F2C]/30 hover:scale-[1.02] hover:shadow-[#E86F2C]/40 transition-all border border-[#D4AF37]/30 cursor-pointer"
                      >
                        <span>Order Food Plates</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => navigateTo("fries-chops")}
                        className="px-5 py-3 rounded-full border border-[#D4AF37]/40 text-[#E8D8C8] hover:text-[#FAF6F0] hover:border-[#D4AF37] text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-1.5 transition-all group cursor-pointer"
                      >
                        <span>Event Packs</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#E86F2C] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* POINT 3: Bottom-Left Micro-Caption */}
              <div className="mt-14 lg:mt-20 pt-8 border-t border-[#D4AF37]/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="border-l-2 border-[#D4AF37] pl-4 max-w-2xl">
                  <p className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#B8ACA3] font-mono leading-relaxed">
                    {SOZ_BRAND_IDENTITY.primaryTagline} — ORDER AND CHOP IN PORT HARCOURT.
                  </p>
                </div>

                <div className="flex items-center gap-6 text-xs text-[#B8ACA3] font-medium">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                    Mon–Sat: 8:00 AM – 7:00 PM
                  </span>
                  <a
                    href={`https://wa.me/${SOZ_BRAND_IDENTITY.whatsappPrimary}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#25D366] hover:underline flex items-center gap-1 font-semibold"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    WhatsApp Order Line ({SOZ_BRAND_IDENTITY.displayPhonePrimary})
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Continuous Visual Cravings Strip */}
          <section id="marquee-strip" className="relative py-14 bg-[#0B070E] overflow-hidden border-b border-[#D4AF37]/15">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
              <h2 className="font-display font-black text-2xl sm:text-3xl text-[#FAF6F0] tracking-tight">
                Signature Cravings in Motion
              </h2>
              <p className="font-script text-lg text-[#E8D8C8] italic mt-1">
                "Glance, Crave, and Tap to Order Freshly Cooked Delicacies."
              </p>
            </div>

            <MarqueeCards
              items={marqueeDishes}
              onCardClick={handleMarqueeAddToCart}
              speedPerCardMs={2800}
            />
          </section>

          {/* Section 4: 5 Official Flyer Services Showcase */}
          <section id="services-five" className="relative bg-[#160E1D] border-b border-[#D4AF37]/20 py-12 lg:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
                <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] font-bold">
                  Official So'z Cravings Brand Services
                </span>
                <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-[#FAF6F0]">
                  What We Do Best For You
                </h3>
                <p className="text-xs text-[#B8ACA3]">
                  Available for weddings, child dedications, birthday parties, corporate events, and personal cravings.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {SOZ_FIVE_SERVICES.map((srv) => {
                  const targetPage: PageId =
                    srv.id === "liters"
                      ? "liter-bowls"
                      : srv.id === "canape"
                      ? "private-chef"
                      : "fries-chops";

                  return (
                    <div
                      key={srv.id}
                      onClick={() => navigateTo(targetPage)}
                      className="p-5 rounded-2xl bg-[#0B070E] border border-[#D4AF37]/25 hover:border-[#F3C663] hover:scale-[1.02] transition-all duration-300 flex flex-col items-center text-center group shadow-xl cursor-pointer"
                    >
                      <div className="w-14 h-14 rounded-full border border-[#D4AF37]/35 flex items-center justify-center bg-[#261533] group-hover:bg-[#6B21A8] group-hover:border-[#D4AF37] group-hover:scale-105 transition-all duration-300 shadow-lg mb-3">
                        {renderServiceIcon(srv.iconName)}
                      </div>
                      <h4 className="font-display font-bold text-sm text-[#FAF6F0] group-hover:text-[#F3C663] transition-colors mb-1">
                        {srv.title}
                      </h4>
                      <p className="text-xs text-[#B8ACA3] leading-relaxed mb-3">
                        {srv.description}
                      </p>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#D4AF37] group-hover:text-[#F3C663] flex items-center gap-1 font-semibold mt-auto">
                        <span>Explore Menu</span>
                        <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Section 9A: Chef Sonia Editorial Story & Pre-Order Hours */}
          <ChefStoryAndHoursSection onBookEventClick={() => navigateTo("private-chef")} />

          {/* Section 9C: CAC Legitimacy Badge & SOZfeedbacks Guest Love Wall */}
          <TrustAndReviewsSection />
        </main>
      )}



      {/* =========================================================================
          PAGE 3: RICE & SOUPS
          ========================================================================= */}
      {currentPage === "rice-soups" && (
        <main>
          <SubpageBanner
            badge="₦7,000 – ₦12,000"
            title="Rice & Soup Plates"
            icon={<Soup className="w-3.5 h-3.5 text-[#F3C663]" />}
            onBackToHome={() => navigateTo("home")}
          />

          <Suspense fallback={<SubpageLoader />}>
            <RiceAndSoupPlatesSection onAddToCart={handleAddToCart} />
          </Suspense>
        </main>
      )}

      {/* =========================================================================
          PAGE 4: FRIES & CHOPS
          ========================================================================= */}
      {currentPage === "fries-chops" && (
        <main>
          <SubpageBanner
            badge="Small Chops, Big Vibes!"
            title="Fries & Small Chops"
            subtitle="Official Tue/Thu/Sat Chops Packs, Box of Fries & Party Packs."
            icon={<Utensils className="w-3.5 h-3.5 text-[#C084FC]" />}
            onBackToHome={() => navigateTo("home")}
          />

          <Suspense fallback={<SubpageLoader />}>
            <ChopsAndSurpriseBuilder onAddToCart={handleAddToCart} />
          </Suspense>
        </main>
      )}

      {/* =========================================================================
          PAGE 5: LITER BOWLS
          ========================================================================= */}
      {currentPage === "liter-bowls" && (
        <main>
          <SubpageBanner
            badge="1.5L to 4L Bowls"
            title="Food in Liters & Bowls"
            subtitle="1.5L, 2L, 3L & 4L Fisherman Soup, Native Soup, Banga & Stews."
            icon={<Flame className="w-3.5 h-3.5 text-[#E86F2C]" />}
            onBackToHome={() => navigateTo("home")}
          />

          <Suspense fallback={<SubpageLoader />}>
            <LiterBowlConfigurator
              initialDishId={preselectedDish}
              onAddConfiguredBowl={handleAddToCart}
            />
          </Suspense>
        </main>
      )}

      {/* =========================================================================
          PAGE 6: PRIVATE CHEF & EVENT CATERING
          ========================================================================= */}
      {currentPage === "private-chef" && (
        <main>
          <SubpageBanner
            badge="Naija to Gourmet"
            title="Private Chef & Catering"
            subtitle="VIP in-home culinary service, wedding receptions & corporate events."
            icon={<ChefHat className="w-3.5 h-3.5 text-[#D4AF37]" />}
            onBackToHome={() => navigateTo("home")}
          />

          <Suspense fallback={<SubpageLoader />}>
            <EventCateringSection />
          </Suspense>
        </main>
      )}

      {/* Global Luxury Footer */}
      <Footer onNavigate={navigateTo} />

      {/* =========================================================================
          MOBILE STICKY BOTTOM CHECKOUT BAR (Visible on < md when cart.length > 0)
          ========================================================================= */}
      {cartItems.length > 0 && (
        <div className="fixed bottom-0 inset-x-0 z-40 md:hidden p-3.5 bg-[#0D090B]/95 backdrop-blur-xl border-t border-[#D4AF37]/30 shadow-2xl">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-[#E86F2C]/20 border border-[#E86F2C]/40 flex items-center justify-center text-[#E86F2C]">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] text-[#B8ACA3] uppercase font-mono">
                  {totalCartCount} {totalCartCount === 1 ? "Item" : "Items"} in Cart
                </p>
                <p className="font-mono font-black text-base text-[#F3C663] tabular-nums">
                  ₦{finalTotal.toLocaleString()}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(true)}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#E86F2C] to-[#c75516] text-white font-bold text-xs tracking-wider uppercase flex items-center gap-1.5 shadow-lg shadow-[#E86F2C]/30 cursor-pointer"
            >
              <span>View Order</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          INTERACTIVE CART DRAWER (Live Cart Pill Slide-Out with WhatsApp Invoice)
          ========================================================================= */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
          />

          <div className="relative w-full max-w-md bg-[#171115] border-l border-[#D4AF37]/30 h-full shadow-2xl flex flex-col z-10">
            {/* Header */}
            <div className="px-6 py-5 border-b border-[#D4AF37]/20 flex items-center justify-between bg-[#0D090B]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#E86F2C]/20 border border-[#E86F2C]/40 flex items-center justify-center text-[#E86F2C]">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-[#FAF6F0]">Your Craving Cart</h3>
                  <p className="text-xs text-[#B8ACA3]">
                    {totalCartCount} {totalCartCount === 1 ? "item" : "items"} selected
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsCartOpen(false)}
                className="w-8 h-8 rounded-full border border-[#D4AF37]/25 flex items-center justify-center text-[#B8ACA3] hover:text-[#FAF6F0] hover:bg-[#241921] transition-colors cursor-pointer"
                aria-label="Close Cart"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cartItems.length === 0 ? (
                <div className="h-64 flex flex-col items-center justify-center text-center space-y-3">
                  <div className="w-16 h-16 rounded-full bg-[#241921] border border-[#D4AF37]/25 flex items-center justify-center text-3xl">
                    <UtensilsCrossed className="w-8 h-8 text-[#D4AF37]" />
                  </div>
                  <p className="font-display font-semibold text-[#FAF6F0]">Your cart is empty</p>
                  <p className="text-xs text-[#B8ACA3] max-w-xs">
                    Explore our dishes or build a custom pack to start your order.
                  </p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl bg-[#0D090B] border border-[#D4AF37]/20 flex gap-4 items-center"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-lg object-cover border border-[#D4AF37]/20 shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-sm text-[#FAF6F0] truncate">{item.name}</h4>
                      <p className="text-[11px] text-[#B8ACA3] line-clamp-1">{item.subtitle}</p>
                      <p className="font-mono font-bold text-xs text-[#E86F2C] mt-1 tabular-nums">
                        ₦{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 bg-[#171115] px-2 py-1 rounded-lg border border-[#D4AF37]/20 shrink-0">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="text-[#B8ACA3] hover:text-[#FAF6F0] p-0.5 cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-mono text-xs font-bold text-[#FAF6F0] min-w-4 text-center tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="text-[#B8ACA3] hover:text-[#FAF6F0] p-0.5 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))
              )}

              {/* Delivery Zone & Recipient Inputs */}
              {cartItems.length > 0 && (
                <div className="mt-6 pt-5 border-t border-[#D4AF37]/15 space-y-3.5">
                  <h4 className="text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-wider">
                    Checkout & Delivery Details
                  </h4>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-mono text-[#B8ACA3] mb-1">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Ken Saro"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-[#0D090B] border border-[#D4AF37]/30 rounded-xl px-3.5 py-2 text-xs text-[#FAF6F0] focus:border-[#E86F2C] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-mono text-[#B8ACA3] mb-1">
                      Phone Number (WhatsApp)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 0803 123 4567"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full bg-[#0D090B] border border-[#D4AF37]/30 rounded-xl px-3.5 py-2 text-xs text-[#FAF6F0] focus:border-[#E86F2C] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-mono text-[#B8ACA3] mb-1">
                      Port Harcourt Delivery Zone
                    </label>
                    <select
                      value={selectedZone}
                      onChange={(e) => setSelectedZone(e.target.value)}
                      className="w-full bg-[#0D090B] border border-[#D4AF37]/30 rounded-xl px-3.5 py-2.5 text-xs text-[#FAF6F0] focus:outline-none focus:border-[#E86F2C]"
                    >
                      {PH_DELIVERY_ZONES.map((zone) => (
                        <option key={zone.id} value={zone.id}>
                          {zone.areaName} —{" "}
                          {zone.fee !== null ? `₦${zone.fee.toLocaleString()}` : "Confirm on WhatsApp"}
                        </option>
                      ))}
                    </select>
                    <p className="text-[11px] text-[#B8ACA3] mt-1 flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3 text-[#E86F2C]" />
                      Est. dispatch window: {selectedDeliveryZone?.estimatedWindow}
                    </p>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-mono text-[#B8ACA3] mb-1">
                      Preferred Delivery Window / Pre-Order Date
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Tomorrow by 1:00 PM / Today 4:00 PM"
                      value={deliveryWindow}
                      onChange={(e) => setDeliveryWindow(e.target.value)}
                      className="w-full bg-[#0D090B] border border-[#D4AF37]/30 rounded-xl px-3.5 py-2 text-xs text-[#FAF6F0] focus:border-[#E86F2C] focus:outline-none"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Footer / Instant WhatsApp Checkout */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-[#D4AF37]/20 bg-[#0D090B] space-y-4">
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-[#B8ACA3]">
                    <span>Items Subtotal</span>
                    <span className="font-mono text-[#FAF6F0] tabular-nums">₦{cartSubtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[#B8ACA3]">
                    <span>Delivery Fee ({selectedDeliveryZone?.areaName.split("/")[0]})</span>
                    <span className="font-mono text-[#FAF6F0] tabular-nums">
                      {selectedDeliveryZone?.fee ? `₦${selectedDeliveryZone.fee.toLocaleString()}` : "Free / Confirm"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-bold pt-2 border-t border-[#D4AF37]/15 text-[#FAF6F0]">
                    <span>Grand Total</span>
                    <span className="font-mono text-[#F3C663] text-base tabular-nums">₦{finalTotal.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  onClick={generateWhatsAppOrder}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20b858] text-black font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/20 transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-black" />
                  <span>Send Order to WhatsApp ({SOZ_BRAND_IDENTITY.displayPhonePrimary})</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
