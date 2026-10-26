import React, { useState } from "react";
import {
  Users,
  Calendar,
  MapPin,
  Check,
  MessageCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  UtensilsCrossed,
  ChefHat,
  Clock,
  Plus,
  Minus,
  AlertCircle,
} from "lucide-react";
import {
  SOZ_BRAND_IDENTITY,
  PRIVATE_CHEF_RATES,
  PRIVATE_CHEF_TERMS,
  type PrivateChefTier,
} from "@/data/soz-menu-data";

export const EventCateringSection: React.FC = () => {
  const [activeSectionTab, setActiveSectionTab] = useState<"event-catering" | "private-chef">("event-catering");

  // Tab 1: Event Catering State
  const [eventType, setEventType] = useState("Wedding");
  const [serviceStyle, setServiceStyle] = useState("Full Canapé Settings");
  const [guestCount, setGuestCount] = useState<number>(100);
  const [eventDate, setEventDate] = useState("");
  const [eventLocation, setEventLocation] = useState("GRA Phase 2, Port Harcourt");
  const [specialNotes, setSpecialNotes] = useState("");

  // Tab 2: Private Chef Service State
  const [privateChefCategory, setPrivateChefCategory] = useState<"One-Off" | "Monthly">("One-Off");
  const [selectedChefTierId, setSelectedChefTierId] = useState<string>("daily-2");
  const [extraHours, setExtraHours] = useState<number>(0);
  const [needsGroceryShopping, setNeedsGroceryShopping] = useState<boolean>(true);
  const [chefServiceDate, setChefServiceDate] = useState<string>("");
  const [chefServiceLocation, setChefServiceLocation] = useState<string>("Port Harcourt Residence");
  const [chefDietaryNotes, setChefDietaryNotes] = useState<string>("");

  // 4 Official Event Pillars with Custom Gold-Line SVGs
  const eventPillars = [
    {
      id: "weddings",
      title: "Weddings",
      tagline: "Grand reception buffets & canapés",
      iconSvg: (
        <svg className="w-7 h-7 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
          <circle cx="9" cy="12" r="5" />
          <circle cx="15" cy="12" r="5" />
          <path d="M12 7l1.5-2h-3L12 7z" fill="currentColor" opacity="0.6" />
        </svg>
      ),
    },
    {
      id: "child-dedication",
      title: "Child Dedication",
      tagline: "Heartfelt family feasts & finger foods",
      iconSvg: (
        <svg className="w-7 h-7 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
          <path d="M12 2l2.4 4.8 5.3.8-3.8 3.7.9 5.3-4.8-2.5-4.8 2.5.9-5.3-3.8-3.7 5.3-.8L12 2z" />
          <circle cx="12" cy="18" r="3" />
        </svg>
      ),
    },
    {
      id: "birthday-parties",
      title: "Birthday Parties",
      tagline: "Odogwu platters & custom surprise boxes",
      iconSvg: (
        <svg className="w-7 h-7 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
          <path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8" />
          <path d="M4 16s2-1 4-1 4 1 4 1 2-1 4-1 4 1 4 1" />
          <path d="M2 21h20" />
          <path d="M7 8v3M12 8v3M17 8v3" />
          <circle cx="7" cy="5" r="1" fill="currentColor" />
          <circle cx="12" cy="5" r="1" fill="currentColor" />
          <circle cx="17" cy="5" r="1" fill="currentColor" />
        </svg>
      ),
    },
    {
      id: "corporate-events",
      title: "Corporate Events",
      tagline: "Executive lunch packs & conference catering",
      iconSvg: (
        <svg className="w-7 h-7 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
          <rect x="2" y="7" width="20" height="14" rx="2" />
          <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
          <path d="M12 12v3M9 13.5l6-3" />
        </svg>
      ),
    },
  ];

  // Event Catering Pricing Estimation
  const basePerGuest =
    serviceStyle === "Cocktail Finger Foods"
      ? 3000
      : serviceStyle === "Full Canapé Settings"
      ? 5500
      : serviceStyle === "Executive Buffet spread"
      ? 8000
      : 4500;

  const estimatedMin = basePerGuest * guestCount;
  const estimatedMax = Math.round(estimatedMin * 1.25);

  const handleSendWhatsAppQuote = () => {
    const text = `Hello Chef So'z! I would like to request a Custom Event Catering Quote:%0A%0A*EVENT SPECIFICATIONS:*%0A• Event Type: ${eventType}%0A• Service Style: ${serviceStyle}%0A• Estimated Guests: ${guestCount} Guests%0A• Target Date: ${
      eventDate || "To be confirmed"
    }%0A• Location / Venue: ${
      eventLocation || "Port Harcourt"
    }%0A• Estimated Budget Range: ₦${estimatedMin.toLocaleString()} – ₦${estimatedMax.toLocaleString()}%0A${
      specialNotes ? `• Special Requests: "${specialNotes}"%0A` : ""
    }%0APlease let me know your availability for this date so we can finalize details!`;

    window.open(`https://wa.me/${SOZ_BRAND_IDENTITY.whatsappPrimary}?text=${encodeURIComponent(text)}`, "_blank");
  };

  // Private Chef Calculations
  const selectedChefTier =
    PRIVATE_CHEF_RATES.find((t) => t.id === selectedChefTierId) || PRIVATE_CHEF_RATES[0];

  const extraHoursCost = extraHours * 15000;
  const groceryShoppingCost = needsGroceryShopping ? 20000 : 0;
  const chefTotalFee = selectedChefTier.price + extraHoursCost + groceryShoppingCost;
  const chefDeposit50 = Math.round(chefTotalFee * 0.5);

  const handleSendChefBooking = () => {
    const text = `Hello Chef Sonia! I want to book your *Private Chef Service — Naija to Gourmet by Chef Soz*:%0A%0A*SELECTED TIER:*%0A• Package: ${selectedChefTier.title} (${selectedChefTier.category})%0A• Base Service Fee: ₦${selectedChefTier.price.toLocaleString()}%0A• Schedule / Frequency: ${selectedChefTier.frequency}%0A${
      extraHours > 0 ? `• Extra Hours: ${extraHours} hrs (+₦${extraHoursCost.toLocaleString()})%0A` : ""
    }${
      needsGroceryShopping ? `• Market Grocery Shopping: Yes (+₦20,000)%0A` : "• Market Grocery Shopping: Provided by Client%0A"
    }• *TOTAL SERVICE FEE:* ₦${chefTotalFee.toLocaleString()}%0A• *50% REQUIRED DEPOSIT:* ₦${chefDeposit50.toLocaleString()}%0A%0A*SERVICE LOGISTICS:*%0A• Target Start Date: ${chefServiceDate || "Flexible / ASAP"}%0A• Residence Address / Area: ${chefServiceLocation || "Port Harcourt"}%0A${
      chefDietaryNotes ? `• Dietary / Menu Preferences: "${chefDietaryNotes}"%0A` : ""
    }%0A*TERMS ACKNOWLEDGED:*%0A- 50% initial deposit to confirm, balance upon completion.%0A- Max 7 hours per service day.%0A- Ingredients are not included.%0A%0APlease confirm your availability and provide bank transfer details!`;

    window.open(`https://wa.me/${SOZ_BRAND_IDENTITY.whatsappPrimary}?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <section id="event-catering" className="relative pt-6 pb-16 lg:pt-8 lg:pb-20 bg-[#0B070E] border-b border-[#D4AF37]/15">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-[#6B21A8]/12 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Compact Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-[#D4AF37]/15">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E86F2C]" />
              <span className="text-[11px] uppercase tracking-widest font-mono text-[#D4AF37] font-semibold">
                Naija to Gourmet by Chef So'z
              </span>
            </div>
            <h2 className="font-display font-bold text-xl sm:text-2xl text-[#FAF6F0] tracking-tight">
              Event Catering & Private Chef Services
            </h2>
          </div>
          <p className="font-script text-sm sm:text-base text-[#E8D8C8] italic">
            "Delicious Food, Beautifully Served."
          </p>
        </div>

        {/* Primary Toggle: Event Catering vs Private Chef */}
        <div className="flex justify-center mb-8">
          <div className="p-1.5 rounded-2xl bg-[#160E1D] border border-[#D4AF37]/25 flex flex-wrap gap-2 shadow-2xl">
            <button
              onClick={() => setActiveSectionTab("event-catering")}
              className={`px-6 py-3 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all cursor-pointer flex items-center gap-2 ${
                activeSectionTab === "event-catering"
                  ? "royal-badge shadow-lg"
                  : "text-[#B8ACA3] hover:text-[#FAF6F0] hover:bg-[#261533]"
              }`}
            >
              <Users className="w-4 h-4 text-[#D4AF37]" />
              <span>Event Catering (Weddings & Parties)</span>
            </button>

            <button
              onClick={() => setActiveSectionTab("private-chef")}
              className={`px-6 py-3 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all cursor-pointer flex items-center gap-2 ${
                activeSectionTab === "private-chef"
                  ? "royal-badge shadow-lg"
                  : "text-[#B8ACA3] hover:text-[#FAF6F0] hover:bg-[#261533]"
              }`}
            >
              <ChefHat className="w-4 h-4 text-[#F3C663]" />
              <span>Private Chef Service (Naija to Gourmet)</span>
            </button>
          </div>
        </div>

        {/* =========================================================================
            VIEW 1: EVENT CATERING CALCULATOR
            ========================================================================= */}
        {activeSectionTab === "event-catering" && (
          <div className="space-y-12 animate-fadeIn">
            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {eventPillars.map((pillar) => (
                <div
                  key={pillar.id}
                  onClick={() => setEventType(pillar.title)}
                  className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                    eventType === pillar.title
                      ? "bg-[#261533] border-[#D4AF37] royal-card-glow transform scale-[1.02]"
                      : "bg-[#160E1D] border-[#D4AF37]/20 hover:border-[#6B21A8]"
                  }`}
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-[#0B070E] border border-[#D4AF37]/30 flex items-center justify-center shadow-lg">
                      {pillar.iconSvg}
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-lg text-[#FAF6F0]">
                        {pillar.title}
                      </h3>
                      <p className="text-xs text-[#B8ACA3] mt-1 leading-relaxed">
                        {pillar.tagline}
                      </p>
                    </div>
                  </div>
                  <div className="pt-4 mt-4 border-t border-[#D4AF37]/15 flex items-center justify-between text-xs font-mono">
                    <span className="text-[#F3C663]">
                      {eventType === pillar.title ? "Selected Event" : "Tap to Select"}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                  </div>
                </div>
              ))}
            </div>

            {/* Event Interactive Quote Calculator Card */}
            <div className="rounded-3xl p-6 sm:p-9 bg-[#160E1D] border border-[#D4AF37]/30 shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Form */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="border-b border-[#D4AF37]/20 pb-4">
                    <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] font-bold">
                      Interactive Catering Calculator
                    </span>
                    <h3 className="font-display font-extrabold text-2xl text-[#FAF6F0]">
                      Calculate Estimate for {eventType}
                    </h3>
                  </div>

                  {/* Guest Count Slider */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-mono uppercase tracking-wider text-[#FAF6F0] flex items-center gap-2">
                        <Users className="w-4 h-4 text-[#D4AF37]" />
                        Estimated Guests:
                      </label>
                      <span className="font-mono font-bold text-xl text-[#F3C663] tabular-nums">
                        {guestCount} Guests
                      </span>
                    </div>
                    <input
                      type="range"
                      min={20}
                      max={500}
                      step={10}
                      value={guestCount}
                      onChange={(e) => setGuestCount(Number(e.target.value))}
                      className="w-full accent-[#E86F2C] bg-[#0B070E] h-2 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] font-mono text-[#B8ACA3]">
                      <span>20 Guests (Intimate Gathering)</span>
                      <span>250 Guests</span>
                      <span>500+ Guests (Grand Reception)</span>
                    </div>
                  </div>

                  {/* Service Style */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-[#FAF6F0] block">
                      Preferred Service Style:
                    </label>
                    <div className="grid grid-cols-2 gap-2.5">
                      {[
                        "Full Canapé Settings",
                        "Cocktail Finger Foods",
                        "Executive Buffet spread",
                        "Packed Luxury Food Trays",
                      ].map((style) => (
                        <button
                          key={style}
                          type="button"
                          onClick={() => setServiceStyle(style)}
                          className={`p-3 rounded-xl border text-xs text-left font-medium transition-all cursor-pointer ${
                            serviceStyle === style
                              ? "bg-[#6B21A8] border-[#D4AF37] text-white"
                              : "bg-[#0B070E] border-[#D4AF37]/20 text-[#B8ACA3] hover:text-white"
                          }`}
                        >
                          {style}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Date & Location inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div>
                      <label className="text-[11px] font-mono text-[#B8ACA3] block mb-1">
                        Target Event Date:
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Saturday 14th November"
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        className="w-full bg-[#0B070E] border border-[#D4AF37]/30 rounded-xl px-3.5 py-2 text-xs text-[#FAF6F0] focus:border-[#E86F2C] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-mono text-[#B8ACA3] block mb-1">
                        Venue / Location (Port Harcourt):
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. GRA Phase 2 / Peter Odili"
                        value={eventLocation}
                        onChange={(e) => setEventLocation(e.target.value)}
                        className="w-full bg-[#0B070E] border border-[#D4AF37]/30 rounded-xl px-3.5 py-2 text-xs text-[#FAF6F0] focus:border-[#E86F2C] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Right Summary Card */}
                <div className="lg:col-span-5 p-6 sm:p-7 rounded-2xl bg-[#0B070E] border border-[#D4AF37]/35 flex flex-col justify-between space-y-6 shadow-xl">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4AF37] font-bold">
                      Event Estimate Overview
                    </span>
                    <h4 className="font-display font-bold text-xl text-[#FAF6F0] mt-1">
                      {eventType} Catering
                    </h4>
                    <p className="text-xs text-[#E8D8C8] italic font-script mt-0.5">
                      "{serviceStyle}"
                    </p>

                    <div className="space-y-2 mt-4 pt-3 border-t border-[#D4AF37]/15 text-xs text-[#B8ACA3]">
                      <div className="flex justify-between">
                        <span>Target Guest Count:</span>
                        <strong className="text-[#FAF6F0] font-mono tabular-nums">{guestCount} Guests</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Base Prep Location:</span>
                        <strong className="text-[#FAF6F0]">Eneka Studio Kitchen</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Lead Notice:</span>
                        <strong className="text-[#F3C663] font-mono">Book 3–7 Days Ahead</strong>
                      </div>
                    </div>

                    <div className="mt-5 p-4 rounded-xl bg-[#160E1D] border border-[#D4AF37]/25 space-y-1">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#B8ACA3]">
                        Estimated Catering Budget Range
                      </span>
                      <p className="font-mono font-black text-2xl text-[#E86F2C] tabular-nums">
                        ₦{estimatedMin.toLocaleString()} – ₦{estimatedMax.toLocaleString()}
                      </p>
                      <p className="text-[10px] text-[#B8ACA3] leading-tight">
                        *Includes setup, signature food presentation, service staff & luxury tableware options.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={handleSendWhatsAppQuote}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-[#1B5E20] via-[#2E7D32] to-[#1B5E20] border border-[#D4AF37]/50 hover:border-[#D4AF37] text-[#FAF6F0] font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg hover:shadow-[0_0_25px_rgba(212,175,55,0.3)] transition-all cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4 text-[#F3C663]" />
                      <span>Request Custom Event Quote on WhatsApp</span>
                    </button>
                    <p className="text-[11px] text-[#B8ACA3] text-center font-mono">
                      Direct Line: {SOZ_BRAND_IDENTITY.displayPhonePrimary} (Chef So'z)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 2: PRIVATE CHEF SERVICE RATE CARD (Naija to Gourmet by Chef Soz)
            ========================================================================= */}
        {activeSectionTab === "private-chef" && (
          <div className="space-y-10 animate-fadeIn">
            {/* Chef Sonia Header Banner */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#160E1D] border border-[#D4AF37]/30 royal-card-glow flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <img
                  src="/images/chef-sonia-portrait.webp"
                  alt="Chef Sonia (Chef So'z)"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-[#D4AF37] shadow-xl shrink-0"
                />
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#F3C663] font-bold block">
                    Official Rate Card
                  </span>
                  <h3 className="font-display font-black text-2xl sm:text-3xl text-[#FAF6F0]">
                    Private Chef Service — Naija to Gourmet
                  </h3>
                  <p className="text-xs sm:text-sm text-[#E8D8C8] font-script italic">
                    "Chef Sonia brings Michelin-level culinary warmth and authentic Niger Delta heritage right into your kitchen."
                  </p>
                </div>
              </div>

              {/* One-off vs Monthly Toggle */}
              <div className="p-1 rounded-xl bg-[#0B070E] border border-[#D4AF37]/30 flex gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => setPrivateChefCategory("One-Off")}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    privateChefCategory === "One-Off"
                      ? "royal-badge text-[#F3C663]"
                      : "text-[#B8ACA3] hover:text-white"
                  }`}
                >
                  One-Off Visits
                </button>
                <button
                  type="button"
                  onClick={() => setPrivateChefCategory("Monthly")}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    privateChefCategory === "Monthly"
                      ? "royal-badge text-[#F3C663]"
                      : "text-[#B8ACA3] hover:text-white"
                  }`}
                >
                  Monthly Retainers
                </button>
              </div>
            </div>

            {/* Rate Card Grid for Selected Category */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PRIVATE_CHEF_RATES.filter((tier) => tier.category === privateChefCategory).map((tier) => {
                const isSelected = selectedChefTierId === tier.id;

                return (
                  <div
                    key={tier.id}
                    onClick={() => setSelectedChefTierId(tier.id)}
                    className={`rounded-3xl p-6 sm:p-7 transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? "bg-[#261533] border-2 border-[#D4AF37] royal-card-glow transform scale-[1.02]"
                        : "bg-[#160E1D] border border-[#D4AF37]/25 hover:border-[#6B21A8]"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase ${
                            isSelected ? "royal-badge text-[#F3C663]" : "bg-[#0B070E] text-[#B8ACA3]"
                          }`}
                        >
                          {tier.frequency}
                        </span>
                        {isSelected && <Check className="w-5 h-5 text-[#D4AF37]" />}
                      </div>

                      <h4 className="font-display font-extrabold text-xl text-[#FAF6F0] mb-1">
                        {tier.title}
                      </h4>
                      <div className="font-mono font-black text-3xl text-[#E86F2C] mb-4 tabular-nums">
                        {tier.priceFormatted}
                      </div>

                      <p className="text-xs text-[#B8ACA3] leading-relaxed mb-6">
                        {tier.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#D4AF37]/15 text-[11px] text-[#E8D8C8]">
                      Ideal For: <strong className="text-[#FAF6F0]">{tier.recommendedFor}</strong>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Interactive Add-ons, Deposit Calculation & Direct WhatsApp Booking */}
            <div className="rounded-3xl p-6 sm:p-8 bg-[#160E1D] border border-[#D4AF37]/30 shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left: Extra Options & Booking Inputs */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="border-b border-[#D4AF37]/20 pb-4">
                    <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] font-bold">
                      Customize Service Hours & Logistics
                    </span>
                    <h3 className="font-display font-bold text-xl text-[#FAF6F0]">
                      Booking Options for {selectedChefTier.title}
                    </h3>
                  </div>

                  {/* Add-on Stepper: Extra Hours */}
                  <div className="p-4 rounded-2xl bg-[#0B070E] border border-[#D4AF37]/25 flex items-center justify-between gap-4">
                    <div>
                      <h5 className="font-bold text-sm text-[#FAF6F0] flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[#D4AF37]" />
                        Extra Cooking / Service Hours
                      </h5>
                      <p className="text-xs text-[#B8ACA3]">
                        Standard service covers up to 7 hours per day. Extra hours: ₦15,000 / hour.
                      </p>
                    </div>

                    <div className="flex items-center gap-3 bg-[#261533] p-1.5 rounded-xl border border-[#D4AF37]/25 shrink-0">
                      <button
                        type="button"
                        onClick={() => setExtraHours((prev) => Math.max(0, prev - 1))}
                        className="w-7 h-7 rounded-lg bg-[#160E1D] text-[#FAF6F0] flex items-center justify-center hover:bg-[#6B21A8] transition-colors cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-mono text-sm font-bold text-[#FAF6F0] w-6 text-center tabular-nums">
                        {extraHours}h
                      </span>
                      <button
                        type="button"
                        onClick={() => setExtraHours((prev) => Math.min(5, prev + 1))}
                        className="w-7 h-7 rounded-lg bg-[#160E1D] text-[#FAF6F0] flex items-center justify-center hover:bg-[#6B21A8] transition-colors cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Grocery Shopping Checkbox */}
                  <div
                    onClick={() => setNeedsGroceryShopping((prev) => !prev)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      needsGroceryShopping
                        ? "bg-[#261533] border-[#D4AF37] text-[#FAF6F0]"
                        : "bg-[#0B070E] border-[#D4AF37]/25 text-[#B8ACA3]"
                    }`}
                  >
                    <div>
                      <h5 className="font-bold text-sm text-[#FAF6F0]">
                        Chef Market & Grocery Shopping Service (+₦20,000)
                      </h5>
                      <p className="text-xs text-[#B8ACA3]">
                        Chef Sonia personally visits local Port Harcourt markets (Mile 1, Oil Mill) for the freshest proteins and produce.
                      </p>
                    </div>

                    <div
                      className={`w-6 h-6 rounded-md border flex items-center justify-center shrink-0 ${
                        needsGroceryShopping ? "bg-[#6B21A8] border-[#D4AF37]" : "border-[#D4AF37]/30"
                      }`}
                    >
                      {needsGroceryShopping && <Check className="w-4 h-4 text-white" />}
                    </div>
                  </div>

                  {/* Logistics Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div>
                      <label className="text-[11px] font-mono text-[#B8ACA3] block mb-1">
                        Preferred Start Date / Booking Window:
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Next Tuesday, Oct 28th"
                        value={chefServiceDate}
                        onChange={(e) => setChefServiceDate(e.target.value)}
                        className="w-full bg-[#0B070E] border border-[#D4AF37]/30 rounded-xl px-3.5 py-2.5 text-xs text-[#FAF6F0] focus:border-[#E86F2C] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-mono text-[#B8ACA3] block mb-1">
                        Residence / Kitchen Location in PH:
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. GRA Phase 3, Port Harcourt"
                        value={chefServiceLocation}
                        onChange={(e) => setChefServiceLocation(e.target.value)}
                        className="w-full bg-[#0B070E] border border-[#D4AF37]/30 rounded-xl px-3.5 py-2.5 text-xs text-[#FAF6F0] focus:border-[#E86F2C] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Dietary notes */}
                  <div>
                    <label className="text-[11px] font-mono text-[#B8ACA3] block mb-1">
                      Menu Preferences / Family Dietary Notes:
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Low sodium, authentic fisherman soup preference, loves peppered turkey."
                      value={chefDietaryNotes}
                      onChange={(e) => setChefDietaryNotes(e.target.value)}
                      className="w-full bg-[#0B070E] border border-[#D4AF37]/30 rounded-xl p-3 text-xs text-[#FAF6F0] focus:border-[#E86F2C] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Right: Deposit Breakdown & Booking Action */}
                <div className="lg:col-span-5 p-6 sm:p-7 rounded-2xl bg-[#0B070E] border border-[#D4AF37]/35 flex flex-col justify-between space-y-6 shadow-xl">
                  <div className="space-y-4">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4AF37] font-bold">
                      Chef Booking Financial Summary
                    </span>
                    <h4 className="font-display font-extrabold text-xl text-[#FAF6F0]">
                      {selectedChefTier.title}
                    </h4>

                    <div className="space-y-2 pt-3 border-t border-[#D4AF37]/15 text-xs">
                      <div className="flex justify-between text-[#B8ACA3]">
                        <span>Base Tier Fee:</span>
                        <span className="font-mono text-[#FAF6F0] tabular-nums">
                          ₦{selectedChefTier.price.toLocaleString()}
                        </span>
                      </div>
                      {extraHours > 0 && (
                        <div className="flex justify-between text-[#B8ACA3]">
                          <span>Extra Hours ({extraHours} hrs @ ₦15k):</span>
                          <span className="font-mono text-[#FAF6F0] tabular-nums">
                            +₦{extraHoursCost.toLocaleString()}
                          </span>
                        </div>
                      )}
                      {needsGroceryShopping && (
                        <div className="flex justify-between text-[#B8ACA3]">
                          <span>Market Grocery Service:</span>
                          <span className="font-mono text-[#FAF6F0] tabular-nums">+₦20,000</span>
                        </div>
                      )}
                      <div className="flex justify-between text-base font-bold text-[#FAF6F0] pt-3 border-t border-[#D4AF37]/15">
                        <span>Total Service Fee:</span>
                        <span className="font-mono text-xl text-[#F3C663] tabular-nums">
                          ₦{chefTotalFee.toLocaleString()}
                        </span>
                      </div>

                      {/* 50% Deposit Required Card */}
                      <div className="p-4 rounded-xl royal-badge border border-[#D4AF37]/50 mt-3 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-mono uppercase tracking-wider text-[#FAF6F0]">
                            50% Initial Deposit:
                          </span>
                          <span className="font-mono font-black text-2xl text-[#F3C663] tabular-nums">
                            ₦{chefDeposit50.toLocaleString()}
                          </span>
                        </div>
                        <p className="text-[10px] text-[#E8D8C8] leading-tight">
                          *50% deposit required to confirm Chef Sonia's calendar; balance paid upon completion.
                        </p>
                      </div>
                    </div>

                    {/* Official Terms Callout */}
                    <div className="p-3.5 rounded-xl bg-[#160E1D] border border-[#D4AF37]/20 space-y-1.5 text-[11px] text-[#B8ACA3]">
                      <span className="font-mono uppercase text-[#D4AF37] text-[10px] font-bold block flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5 text-[#E86F2C]" />
                        Official Chef So'z Terms:
                      </span>
                      {PRIVATE_CHEF_TERMS.slice(0, 3).map((term, i) => (
                        <p key={i} className="flex items-start gap-1.5 leading-snug">
                          <span className="w-1 h-1 rounded-full bg-[#F3C663] mt-1 shrink-0" />
                          <span>{term}</span>
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3 pt-2">
                    <button
                      onClick={handleSendChefBooking}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-[#1B5E20] via-[#2E7D32] to-[#1B5E20] border border-[#D4AF37]/50 hover:border-[#D4AF37] text-[#FAF6F0] font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg hover:shadow-[0_0_25px_rgba(212,175,55,0.3)] transition-all cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4 text-[#F3C663]" />
                      <span>Book Chef Sonia via WhatsApp</span>
                    </button>
                    <p className="text-[11px] text-[#B8ACA3] text-center font-mono">
                      Direct WhatsApp: +234 903 090 7698
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default EventCateringSection;
