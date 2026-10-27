import React, { useState } from "react";
import {
  Gift,
  Plus,
  Minus,
  Sparkles,
  ShoppingBag,
  Heart,
  MessageCircle,
  Check,
  Send,
  Calendar,
  Clock,
  ShieldCheck,
  PackageCheck,
  ArrowRight,
  Flame,
  Utensils,
  Layers,
} from "lucide-react";
import {
  BOX_OF_CHOPS_PACKAGES,
  BOX_OF_FRIES_MENU,
  SMALL_CHOPS_EVENT_MENU,
  CUSTOM_SMALL_CHOPS_ITEMS,
  SURPRISE_BOX_PACKAGES,
  SURPRISE_ADDONS,
  SOZ_BRAND_IDENTITY,
  PH_DELIVERY_ZONES,
  type BoxOfChopsPackage,
  type BoxOfFriesItem,
  type SmallChopsEventPack,
  type SmallChopsUnit,
} from "@/data/soz-menu-data";

interface ChopsAndSurpriseBuilderProps {
  onAddToCart: (item: {
    id: string;
    name: string;
    subtitle: string;
    price: number;
    image: string;
  }) => void;
}

export const ChopsAndSurpriseBuilder: React.FC<ChopsAndSurpriseBuilderProps> = ({
  onAddToCart,
}) => {
  const [activeTab, setActiveTab] = useState<
    "box-of-chops" | "box-of-fries" | "event-packs" | "surprise"
  >("box-of-chops");

  // Tab 1: Box of Chops State
  const [bigBoyProtein, setBigBoyProtein] = useState<string>("4 Peppered Chicken");

  // Tab 2: Box of Fries State (quantities)
  const [friesQuantities, setFriesQuantities] = useState<Record<string, number>>({
    "fries-beef": 1,
    "fries-chicken": 1,
    "fries-turkey": 1,
    "fries-snails-prawns": 1,
  });

  // Tab 3: Event Small Chops Quantities
  const [packQuantities, setPackQuantities] = useState<Record<string, number>>({
    "small-chops-option-1": 10,
    "small-chops-option-2": 10,
    "small-chops-option-3": 5,
  });

  // Tab 3 Sub-feature: Custom Piece-by-Piece Stepper
  const [customPieceQuantities, setCustomPieceQuantities] = useState<Record<string, number>>({
    "puff-puff": 20,
    "samosa": 6,
    "spring-roll": 6,
    "peppered-chicken": 2,
    "peppered-turkey": 0,
    "corn-dog": 0,
  });

  // Tab 4: Royal Surprise Package
  const [selectedTierId, setSelectedTierId] = useState<string>("surprise-gold");
  const [addonQuantities, setAddonQuantities] = useState<Record<string, number>>({});
  const [recipientName, setRecipientName] = useState("");
  const [recipientPhone, setRecipientPhone] = useState("");
  const [deliveryDateTime, setDeliveryDateTime] = useState("");
  const [selectedZone, setSelectedZone] = useState("eneka");
  const [customNote, setCustomNote] = useState("");

  // Handlers for Box of Fries
  const handleUpdateFriesQty = (id: string, delta: number) => {
    setFriesQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta),
    }));
  };

  const handleAddFriesToCart = (item: BoxOfFriesItem) => {
    const qty = friesQuantities[item.id] || 1;
    onAddToCart({
      id: `${item.id}-${Date.now()}`,
      name: `${item.title} (x${qty})`,
      subtitle: `${item.proteinIncludes} • ${item.baseIncludes}`,
      price: item.price * qty,
      image: item.image,
    });
  };

  // Handlers for Box of Chops
  const handleAddBoxOfChops = (pkg: BoxOfChopsPackage) => {
    const proteinNote = pkg.requiresProteinChoice
      ? `Choice: ${bigBoyProtein}`
      : pkg.contents[2] || "Freshly Cooked";

    onAddToCart({
      id: `${pkg.id}-${Date.now()}`,
      name: `Box of Chops: ${pkg.name}`,
      subtitle: `${proteinNote} • Tue/Thu/Sat Special`,
      price: pkg.price,
      image: pkg.image,
    });
  };

  // Handlers for Event Packs
  const handleUpdatePackQty = (packId: string, delta: number) => {
    setPackQuantities((prev) => {
      const current = prev[packId] || 1;
      const next = current + delta;
      return { ...prev, [packId]: Math.max(1, next) };
    });
  };

  const handleSetExactPackQty = (packId: string, qty: number) => {
    setPackQuantities((prev) => ({
      ...prev,
      [packId]: Math.max(1, qty),
    }));
  };

  const handleAddEventPackToCart = (pack: SmallChopsEventPack) => {
    const qty = packQuantities[pack.id] || 1;
    const totalPrice = pack.price * qty;

    onAddToCart({
      id: `${pack.id}-${Date.now()}`,
      name: `${pack.name} (x${qty} Packs)`,
      subtitle: `${qty} Packs • ${pack.proteinHighlight} per pack`,
      price: totalPrice,
      image: pack.image,
    });
  };

  // Custom Stepper calculations
  const customPiecesTotalPrice = CUSTOM_SMALL_CHOPS_ITEMS.reduce((sum, item) => {
    const q = customPieceQuantities[item.id] || 0;
    return sum + q * item.unitPrice;
  }, 0);

  const totalCustomPiecesCount = Object.values(customPieceQuantities).reduce(
    (sum, val) => sum + val,
    0
  );

  const handleUpdateCustomPiece = (id: string, step: number, delta: number) => {
    setCustomPieceQuantities((prev) => {
      const current = prev[id] || 0;
      const next = current + step * delta;
      return { ...prev, [id]: Math.max(0, next) };
    });
  };

  const handleAddCustomBoxToCart = () => {
    if (customPiecesTotalPrice === 0) return;

    const summaryParts: string[] = [];
    CUSTOM_SMALL_CHOPS_ITEMS.forEach((item) => {
      const q = customPieceQuantities[item.id] || 0;
      if (q > 0) summaryParts.push(`${q}x ${item.name}`);
    });

    onAddToCart({
      id: `custom-chops-box-${Date.now()}`,
      name: `Custom Small Chops Platter (${totalCustomPiecesCount} pcs)`,
      subtitle: summaryParts.slice(0, 3).join(", ") + (summaryParts.length > 3 ? "..." : ""),
      price: customPiecesTotalPrice,
      image: "/images/box-of-chops.webp",
    });
  };

  // Surprise Box calculations
  const currentTier =
    SURPRISE_BOX_PACKAGES.find((t) => t.id === selectedTierId) || SURPRISE_BOX_PACKAGES[1];

  const surpriseAddonsTotal = Object.entries(addonQuantities).reduce((sum, [id, qty]) => {
    const addon = SURPRISE_ADDONS.find((a) => a.id === id);
    return sum + (addon ? addon.price * qty : 0);
  }, 0);

  const totalAddonItemsCount = Object.values(addonQuantities).reduce((sum, qty) => sum + qty, 0);

  const surpriseGrandTotal = currentTier.basePrice + surpriseAddonsTotal;

  const handleUpdateAddonQty = (addonId: string, delta: number) => {
    setAddonQuantities((prev) => {
      const current = prev[addonId] || 0;
      const next = current + delta;
      if (next <= 0) {
        const copy = { ...prev };
        delete copy[addonId];
        return copy;
      }
      return { ...prev, [addonId]: next };
    });
  };

  const handleAddSurpriseToCart = () => {
    const addonSummary = Object.entries(addonQuantities)
      .map(([id, qty]) => {
        const a = SURPRISE_ADDONS.find((item) => item.id === id);
        return a ? `${qty}x ${a.name}` : null;
      })
      .filter(Boolean)
      .join(", ");

    onAddToCart({
      id: `${currentTier.id}-${Date.now()}`,
      name: `${currentTier.tierName}`,
      subtitle: `${currentTier.tagline}${
        addonSummary ? ` • Add-ons: ${addonSummary}` : ""
      }`,
      price: surpriseGrandTotal,
      image: currentTier.image,
    });
  };

  const handleDirectWhatsAppSurprise = () => {
    const randomRef = Math.floor(1000 + Math.random() * 9000);
    const orderRef = `#SOZ-SURPRISE-${randomRef}`;

    const addonsList = Object.entries(addonQuantities)
      .map(([id, qty]) => {
        const a = SURPRISE_ADDONS.find((item) => item.id === id);
        if (!a) return null;
        return `• ${qty}x *${a.name}* (₦${(a.price * qty).toLocaleString()})`;
      })
      .filter(Boolean)
      .join("\n");

    const message = `🎁 *ROYAL SURPRISE PACKAGE BOOKING — SO'Z CRAVINGS*
━━━━━━━━━━━━━━━━━━━━
🧾 *Order Ref:* ${orderRef}
💰 *GRAND TOTAL: ₦${surpriseGrandTotal.toLocaleString()}*
📦 *Package:* ${currentTier.tierName}
━━━━━━━━━━━━━━━━━━━━

👤 *RECIPIENT & SURPRISE LOGISTICS:*
• Recipient / Celebrant Name: ${recipientName.trim() || "To be confirmed"}
• Recipient Phone: ${recipientPhone.trim() || "To be confirmed"}
• Target Surprise Date & Time: ${deliveryDateTime.trim() || "Flexible / ASAP"}
• Delivery Zone: ${selectedZone}
• Calligraphy Message Note: "${customNote.trim() || "Best Wishes!"}"

🎁 *PACKAGE INCLUSIONS:*
• Package: *${currentTier.tierName}* (Base: ₦${currentTier.basePrice.toLocaleString()})
${currentTier.includes.map((inc) => `  ✓ ${inc}`).join("\n")}

⚙️ *CUSTOM CELEBRATION ADD-ONS:*
${addonsList || "• None (Standard Package Only)"}

━━━━━━━━━━━━━━━━━━━━
💳 *PAYMENT BREAKDOWN:*
• Base Package: ₦${currentTier.basePrice.toLocaleString()}
${totalAddonItemsCount > 0 ? `• Custom Add-ons (${totalAddonItemsCount} items): +₦${surpriseAddonsTotal.toLocaleString()}\n` : ""}👉 *GRAND TOTAL: ₦${surpriseGrandTotal.toLocaleString()}*
━━━━━━━━━━━━━━━━━━━━

Chef Sonia, please confirm availability for this surprise date & provide your bank transfer details!`;

    window.open(`https://wa.me/${SOZ_BRAND_IDENTITY.whatsappPrimary}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <section id="chops-builder" className="relative pt-6 pb-16 lg:pt-8 lg:pb-20 bg-[#0B070E] border-b border-[#D4AF37]/15">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-[#6B21A8]/12 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Compact Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-[#D4AF37]/15">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E86F2C]" />
              <span className="text-[11px] uppercase tracking-widest font-mono text-[#D4AF37] font-semibold">
                Official Chops & Fries Studio
              </span>
            </div>
            <h2 className="font-display font-bold text-xl sm:text-2xl text-[#FAF6F0] tracking-tight">
              Small Chops, Fries & Surprise Boxes
            </h2>
          </div>
          <p className="font-script text-sm sm:text-base text-[#E8D8C8] italic">
            "Fries. Flavor. Satisfaction. • Small Chops, Big Vibes!"
          </p>
        </div>

        {/* 4 Primary Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="p-1.5 rounded-2xl bg-[#160E1D] border border-[#D4AF37]/25 flex flex-wrap gap-2 shadow-2xl">
            <button
              onClick={() => setActiveTab("box-of-chops")}
              className={`px-4 sm:px-6 py-3 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === "box-of-chops"
                  ? "royal-badge shadow-lg"
                  : "text-[#B8ACA3] hover:text-[#FAF6F0] hover:bg-[#261533]"
              }`}
            >
              <Calendar className="w-4 h-4 text-[#D4AF37]" />
              <span>Box of Chops (Tue/Thu/Sat)</span>
            </button>

            <button
              onClick={() => setActiveTab("box-of-fries")}
              className={`px-4 sm:px-6 py-3 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === "box-of-fries"
                  ? "royal-badge shadow-lg"
                  : "text-[#B8ACA3] hover:text-[#FAF6F0] hover:bg-[#261533]"
              }`}
            >
              <Utensils className="w-4 h-4 text-[#E86F2C]" />
              <span>Box of Fries (₦15k–₦35k)</span>
            </button>

            <button
              onClick={() => setActiveTab("event-packs")}
              className={`px-4 sm:px-6 py-3 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === "event-packs"
                  ? "royal-badge shadow-lg"
                  : "text-[#B8ACA3] hover:text-[#FAF6F0] hover:bg-[#261533]"
              }`}
            >
              <Layers className="w-4 h-4 text-[#F3C663]" />
              <span>Event Small Chops (₦3k–₦6k)</span>
            </button>

            <button
              onClick={() => setActiveTab("surprise")}
              className={`px-4 sm:px-6 py-3 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === "surprise"
                  ? "royal-badge shadow-lg"
                  : "text-[#B8ACA3] hover:text-[#FAF6F0] hover:bg-[#261533]"
              }`}
            >
              <Gift className="w-4 h-4 text-[#E86F2C]" />
              <span>Royal Surprise Boxes</span>
            </button>
          </div>
        </div>

        {/* =========================================================================
            TAB 1: BOX OF CHOPS PACKAGE MENU (Available Every Tuesday, Thursday & Saturday)
            ========================================================================= */}
        {activeTab === "box-of-chops" && (
          <div className="space-y-8 animate-fadeIn">
            {/* Availability Banner */}
            <div className="p-4 sm:p-5 rounded-2xl royal-badge flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-2xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#261533] border border-[#D4AF37]/35 flex items-center justify-center text-[#D4AF37] shrink-0">
                  <Calendar className="w-5 h-5 text-[#F3C663]" />
                </div>
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#F3C663] font-bold block">
                    Exclusive Schedule Alert
                  </span>
                  <p className="font-display font-bold text-sm sm:text-base text-[#FAF6F0]">
                    Box of Chops packages are freshly prepared & dispatched every Tuesday, Thursday & Saturday!
                  </p>
                </div>
              </div>
              <span className="text-xs font-mono text-[#E8D8C8] bg-black/40 px-3 py-1.5 rounded-lg border border-[#D4AF37]/30">
                Pre-Orders Recommended
              </span>
            </div>

            {/* 3 Box of Chops Package Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {BOX_OF_CHOPS_PACKAGES.map((pkg) => {
                const isBigBoy = pkg.id === "box-chops-big-boy";
                const isOdogwu = pkg.id === "box-chops-odogwu";

                return (
                  <div
                    key={pkg.id}
                    className={`rounded-3xl p-6 sm:p-7 bg-[#160E1D] border transition-all duration-300 flex flex-col justify-between ${
                      isOdogwu
                        ? "border-[#D4AF37] royal-card-glow ring-1 ring-[#D4AF37]/30"
                        : "border-[#D4AF37]/25 hover:border-[#6B21A8]"
                    }`}
                  >
                    <div>
                      {/* Badge & Image */}
                      <div className="relative mb-5 rounded-2xl overflow-hidden border border-[#D4AF37]/25 aspect-[4/3]">
                        <img
                          src={pkg.image}
                          alt={pkg.name}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="px-3 py-1 rounded-full royal-badge text-[10px] font-mono font-bold tracking-wider uppercase">
                            {pkg.badge || "CHEF SIGNATURE"}
                          </span>
                        </div>
                      </div>

                      {/* Title & Price */}
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className="font-display font-bold text-xl text-[#FAF6F0]">
                          {pkg.name}
                        </h3>
                        <span className="font-mono font-black text-2xl text-[#E86F2C] tabular-nums shrink-0">
                          {pkg.priceFormatted}
                        </span>
                      </div>

                      <p className="text-[11px] font-mono text-[#D4AF37] mb-4 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {pkg.availabilityNotice}
                      </p>

                      {/* Package Contents */}
                      <div className="space-y-2 pt-3 border-t border-[#D4AF37]/15 mb-6">
                        {pkg.contents.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-[#FAF6F0]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#E86F2C] shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>

                      {/* If Big Boy Pack: Interactive Protein Choice Radio */}
                      {isBigBoy && (
                        <div className="p-3.5 rounded-xl bg-[#261533] border border-[#D4AF37]/30 mb-6 space-y-2.5">
                          <label className="text-[11px] font-mono uppercase tracking-wider text-[#F3C663] font-bold block">
                            Choose Your Protein:
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            {pkg.proteinOptions?.map((prot) => (
                              <button
                                key={prot}
                                type="button"
                                onClick={() => setBigBoyProtein(prot)}
                                className={`py-2 px-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer text-center ${
                                  bigBoyProtein === prot
                                    ? "bg-[#6B21A8] text-white border border-[#D4AF37]"
                                    : "bg-[#160E1D] text-[#B8ACA3] border border-[#D4AF37]/20 hover:text-white"
                                }`}
                              >
                                {prot}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => handleAddBoxOfChops(pkg)}
                      className={`w-full py-3.5 rounded-xl font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer ${
                        isOdogwu
                          ? "bg-gradient-to-r from-[#E86F2C] to-[#c75516] text-white shadow-[#E86F2C]/30 hover:scale-[1.01]"
                          : "bg-[#261533] hover:bg-[#6B21A8] text-[#FAF6F0] border border-[#D4AF37]/30"
                      }`}
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add {pkg.name} to Cart</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 2: BOX OF FRIES MENU (₦15,000 – ₦35,000)
            ========================================================================= */}
        {activeTab === "box-of-fries" && (
          <div className="space-y-8 animate-fadeIn">
            {/* Box of Fries Base Banner */}
            <div className="p-5 rounded-2xl bg-[#160E1D] border border-[#D4AF37]/30 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
              <div className="space-y-1">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#D4AF37] font-bold">
                  Official Chef So'z Fry Standard
                </span>
                <p className="font-display font-extrabold text-base sm:text-lg text-[#FAF6F0]">
                  Every Box of Fries is crafted with our Golden Triple-Fry Base:
                </p>
                <p className="text-xs text-[#E8D8C8]">
                  15 pcs Fried Yam • 15 pcs Fried Potatoes • 15 pcs Fried Plantain + Signature Pepper & Mayo Dips.
                </p>
              </div>
              <div className="px-4 py-2 rounded-xl royal-badge font-mono text-xs font-bold text-[#F3C663] shrink-0">
                Freshly Cut & Fried Hot
              </div>
            </div>

            {/* 4 Box of Fries Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {BOX_OF_FRIES_MENU.map((item) => {
                const qty = friesQuantities[item.id] || 1;
                const totalCardPrice = item.price * qty;

                return (
                  <div
                    key={item.id}
                    className="rounded-3xl p-5 bg-[#160E1D] border border-[#D4AF37]/25 hover:border-[#6B21A8] transition-all duration-300 flex flex-col justify-between group shadow-xl"
                  >
                    <div>
                      {/* Image */}
                      <div className="relative mb-4 rounded-2xl overflow-hidden border border-[#D4AF37]/20 aspect-[4/3]">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {item.badge && (
                          <div className="absolute top-2.5 left-2.5">
                            <span className="px-2.5 py-0.5 rounded-full royal-badge text-[9px] font-mono font-bold uppercase">
                              {item.badge}
                            </span>
                          </div>
                        )}
                      </div>

                      <h3 className="font-display font-bold text-lg text-[#FAF6F0] mb-1">
                        {item.title}
                      </h3>
                      <p className="font-mono font-black text-xl text-[#E86F2C] mb-3 tabular-nums">
                        ₦{item.price.toLocaleString()}
                      </p>

                      <div className="p-2.5 rounded-xl bg-[#261533] border border-[#D4AF37]/20 mb-3 text-[11px] text-[#F3C663] font-medium">
                        {item.proteinIncludes}
                      </div>

                      <p className="text-xs text-[#B8ACA3] leading-relaxed mb-4">
                        {item.description}
                      </p>

                      <div className="space-y-1.5 pt-3 border-t border-[#D4AF37]/15 mb-4">
                        {item.contents.map((c, i) => (
                          <div key={i} className="flex items-center gap-1.5 text-[11px] text-[#FAF6F0]">
                            <Check className="w-3 h-3 text-[#E86F2C] shrink-0" />
                            <span>{c}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#D4AF37]/15 space-y-3">
                      {/* Quantity Stepper */}
                      <div className="flex items-center justify-between bg-[#0B070E] p-1.5 rounded-xl border border-[#D4AF37]/20">
                        <span className="text-[11px] font-mono text-[#B8ACA3] pl-2">Quantity:</span>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleUpdateFriesQty(item.id, -1)}
                            className="w-7 h-7 rounded-lg bg-[#261533] text-[#FAF6F0] flex items-center justify-center hover:bg-[#6B21A8] transition-colors cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-mono text-xs font-bold text-[#FAF6F0] w-6 text-center tabular-nums">
                            {qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleUpdateFriesQty(item.id, 1)}
                            className="w-7 h-7 rounded-lg bg-[#261533] text-[#FAF6F0] flex items-center justify-center hover:bg-[#6B21A8] transition-colors cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={() => handleAddFriesToCart(item)}
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-[#E86F2C] to-[#c75516] text-white font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg shadow-[#E86F2C]/30 hover:scale-[1.01] transition-all cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add — ₦{totalCardPrice.toLocaleString()}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 3: EVENT SMALL CHOPS (₦3,000 – ₦6,000 with Multipliers & Custom Stepper)
            ========================================================================= */}
        {activeTab === "event-packs" && (
          <div className="space-y-12 animate-fadeIn">
            {/* Event Packs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {SMALL_CHOPS_EVENT_MENU.map((pack) => {
                const currentMultiplier = packQuantities[pack.id] || 1;
                const totalPackPrice = pack.price * currentMultiplier;

                return (
                  <div
                    key={pack.id}
                    className="rounded-3xl p-6 sm:p-7 bg-[#160E1D] border border-[#D4AF37]/25 hover:border-[#D4AF37] transition-all duration-300 flex flex-col justify-between shadow-xl"
                  >
                    <div>
                      {/* Image */}
                      <div className="relative mb-5 rounded-2xl overflow-hidden border border-[#D4AF37]/20 aspect-[4/3]">
                        <img
                          src={pack.image}
                          alt={pack.name}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="px-3 py-1 rounded-full royal-badge text-[10px] font-mono font-bold tracking-wider">
                            {pack.optionLabel}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-baseline justify-between mb-2">
                        <h3 className="font-display font-bold text-xl text-[#FAF6F0]">
                          {pack.name}
                        </h3>
                        <span className="font-mono font-black text-2xl text-[#E86F2C] tabular-nums">
                          {pack.priceFormatted}
                        </span>
                      </div>

                      <p className="text-xs text-[#F3C663] font-mono font-medium mb-4">
                        Includes: {pack.proteinHighlight}
                      </p>

                      {/* Content list */}
                      <div className="space-y-1.5 pt-3 border-t border-[#D4AF37]/15 mb-6">
                        {pack.contents.map((c, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-[#B8ACA3]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#E86F2C]" />
                            <span>{c}</span>
                          </div>
                        ))}
                      </div>

                      {/* Event Multipliers */}
                      <div className="space-y-2 pt-3 border-t border-[#D4AF37]/15 mb-6">
                        <label className="text-[11px] font-mono uppercase tracking-wider text-[#B8ACA3] block">
                          Pack Quantity (Parties / Bulk Orders):
                        </label>
                        <div className="grid grid-cols-5 gap-1.5">
                          {[1, 10, 25, 50, 100].map((num) => (
                            <button
                              key={num}
                              type="button"
                              onClick={() => handleSetExactPackQty(pack.id, num)}
                              className={`py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                                currentMultiplier === num
                                  ? "bg-[#6B21A8] text-white border border-[#D4AF37]"
                                  : "bg-[#261533] text-[#B8ACA3] hover:text-white"
                              }`}
                            >
                              x{num}
                            </button>
                          ))}
                        </div>

                        {/* Fine Stepper */}
                        <div className="flex items-center justify-between bg-[#0B070E] p-2 rounded-xl border border-[#D4AF37]/20 mt-2">
                          <span className="text-xs font-mono text-[#B8ACA3] pl-2">Total Packs:</span>
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => handleUpdatePackQty(pack.id, -1)}
                              className="w-7 h-7 rounded-lg bg-[#261533] text-[#FAF6F0] flex items-center justify-center hover:bg-[#6B21A8] transition-colors cursor-pointer"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="font-mono text-sm font-bold text-[#FAF6F0] w-8 text-center tabular-nums">
                              {currentMultiplier}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleUpdatePackQty(pack.id, 1)}
                              className="w-7 h-7 rounded-lg bg-[#261533] text-[#FAF6F0] flex items-center justify-center hover:bg-[#6B21A8] transition-colors cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#D4AF37]/15 flex items-center justify-between gap-4">
                      <div>
                        <span className="text-[10px] font-mono uppercase text-[#B8ACA3] block">
                          Total ({currentMultiplier} Packs)
                        </span>
                        <span className="font-mono font-black text-xl text-[#F3C663] tabular-nums">
                          ₦{totalPackPrice.toLocaleString()}
                        </span>
                      </div>

                      <button
                        onClick={() => handleAddEventPackToCart(pack)}
                        className="py-3 px-5 rounded-xl bg-gradient-to-r from-[#E86F2C] to-[#c75516] text-white font-bold text-xs tracking-wider uppercase flex items-center gap-2 shadow-lg shadow-[#E86F2C]/30 hover:scale-105 transition-all cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Custom Piece-by-Piece Stepper Builder */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#160E1D] border border-[#D4AF37]/30 shadow-2xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#D4AF37]/20 gap-3">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] font-bold">
                    A La Carte Custom Stepper
                  </span>
                  <h3 className="font-display font-extrabold text-2xl text-[#FAF6F0]">
                    Compose Your Custom Small Chops Box
                  </h3>
                  <p className="text-xs text-[#B8ACA3]">
                    Pick individual counts of golden puff-puff, samosas, spring rolls, and peppered meats.
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-xs text-[#B8ACA3] block">Custom Box Total:</span>
                  <span className="font-mono font-black text-3xl text-[#E86F2C] tabular-nums">
                    ₦{customPiecesTotalPrice.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {CUSTOM_SMALL_CHOPS_ITEMS.map((item) => {
                  const qty = customPieceQuantities[item.id] || 0;
                  const itemSubtotal = qty * item.unitPrice;

                  return (
                    <div
                      key={item.id}
                      className="p-4 rounded-2xl bg-[#0B070E] border border-[#D4AF37]/20 flex items-center justify-between gap-3"
                    >
                      <div>
                        <h4 className="font-bold text-sm text-[#FAF6F0]">{item.name}</h4>
                        <p className="font-mono text-xs text-[#D4AF37] tabular-nums">
                          ₦{item.unitPrice.toLocaleString()} / pc
                        </p>
                        <p className="text-[11px] text-[#B8ACA3]">{item.description}</p>
                      </div>

                      <div className="flex items-center gap-2 bg-[#261533] p-1.5 rounded-xl border border-[#D4AF37]/20 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleUpdateCustomPiece(item.id, item.step, -1)}
                          className="w-6 h-6 rounded-md bg-[#160E1D] text-[#FAF6F0] flex items-center justify-center hover:bg-[#6B21A8] transition-colors cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-mono text-xs font-bold text-[#FAF6F0] min-w-5 text-center tabular-nums">
                          {qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleUpdateCustomPiece(item.id, item.step, 1)}
                          className="w-6 h-6 rounded-md bg-[#160E1D] text-[#FAF6F0] flex items-center justify-center hover:bg-[#6B21A8] transition-colors cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-[#D4AF37]/15 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-[#B8ACA3]">
                  Selected: <strong className="text-[#FAF6F0]">{totalCustomPiecesCount} total pieces</strong> packed in luxury presentation box with dip.
                </p>

                <button
                  onClick={handleAddCustomBoxToCart}
                  disabled={customPiecesTotalPrice === 0}
                  className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer ${
                    customPiecesTotalPrice > 0
                      ? "bg-gradient-to-r from-[#E86F2C] to-[#c75516] text-white shadow-[#E86F2C]/30 hover:scale-105"
                      : "bg-[#261533] text-[#B8ACA3] cursor-not-allowed border border-[#D4AF37]/20"
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>
                    {customPiecesTotalPrice > 0
                      ? `Add Custom Box to Cart — ₦${customPiecesTotalPrice.toLocaleString()}`
                      : "Select Pieces to Order"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 4: ROYAL SURPRISE BOX BUILDER
            ========================================================================= */}
        {activeTab === "surprise" && (
          <div className="space-y-10 animate-fadeIn">
            {/* 3 Tier Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {SURPRISE_BOX_PACKAGES.map((pkg) => {
                const isSelected = selectedTierId === pkg.id;

                return (
                  <div
                    key={pkg.id}
                    onClick={() => setSelectedTierId(pkg.id)}
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
                          {pkg.tierName.split(" ")[0]} TIER
                        </span>
                        {isSelected && <Check className="w-5 h-5 text-[#D4AF37]" />}
                      </div>

                      <h3 className="font-display font-extrabold text-2xl text-[#FAF6F0] mb-1">
                        {pkg.tierName}
                      </h3>
                      <p className="text-xs text-[#D4AF37] italic font-script mb-3">
                        "{pkg.tagline}"
                      </p>

                      <div className="font-mono font-black text-3xl text-[#E86F2C] mb-6 tabular-nums">
                        ₦{pkg.basePrice.toLocaleString()}
                      </div>

                      <div className="space-y-2 pt-4 border-t border-[#D4AF37]/15 mb-6">
                        {pkg.includes.map((inc, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-[#FAF6F0]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#E86F2C]" />
                            <span>{inc}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <p className="text-[11px] text-[#B8ACA3] pt-3 border-t border-[#D4AF37]/15">
                      Recommended For: <strong className="text-[#FAF6F0]">{pkg.recommendedFor}</strong>
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Surprise Customization & Recipient Details */}
            <div className="rounded-3xl p-6 sm:p-8 bg-[#160E1D] border border-[#D4AF37]/30 shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left: Add-ons Selector */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="border-b border-[#D4AF37]/20 pb-4">
                    <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] font-bold">
                      Luxury Celebration Add-Ons
                    </span>
                    <h3 className="font-display font-bold text-xl text-[#FAF6F0]">
                      Enhance {currentTier.tierName}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {SURPRISE_ADDONS.map((addon) => {
                      const qty = addonQuantities[addon.id] || 0;
                      const isSelected = qty > 0;

                      return (
                        <div
                          key={addon.id}
                          className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                            isSelected
                              ? "bg-[#261533] border-[#D4AF37] text-[#FAF6F0] shadow-md"
                              : "bg-[#0B070E] border-[#D4AF37]/20 text-[#B8ACA3] hover:border-[#D4AF37]/40"
                          }`}
                        >
                          <div className="space-y-0.5 min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-[#160E1D] text-[#D4AF37] border border-[#D4AF37]/25">
                                {addon.category}
                              </span>
                            </div>
                            <span className="text-xs font-bold block text-[#FAF6F0] truncate">{addon.name}</span>
                            <span className="text-[11px] font-mono text-[#F3C663] tabular-nums block">
                              ₦{addon.price.toLocaleString()} each
                            </span>
                            {isSelected && (
                              <span className="text-[10px] font-mono text-[#E86F2C] block font-semibold">
                                Subtotal: ₦{(addon.price * qty).toLocaleString()} ({qty}x)
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-2 bg-[#160E1D] p-1.5 rounded-xl border border-[#D4AF37]/25 shrink-0">
                            <button
                              type="button"
                              onClick={() => handleUpdateAddonQty(addon.id, -1)}
                              disabled={qty === 0}
                              className={`w-6 h-6 rounded-md flex items-center justify-center transition-colors cursor-pointer ${
                                qty > 0
                                  ? "bg-[#261533] text-[#FAF6F0] hover:bg-[#E86F2C]"
                                  : "bg-transparent text-[#554d46] cursor-not-allowed"
                              }`}
                              title="Decrease count"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-mono text-xs font-bold text-[#FAF6F0] min-w-5 text-center tabular-nums">
                              {qty}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleUpdateAddonQty(addon.id, 1)}
                              className="w-6 h-6 rounded-md bg-[#261533] text-[#FAF6F0] flex items-center justify-center hover:bg-[#6B21A8] hover:text-[#D4AF37] transition-colors cursor-pointer"
                              title="Add more"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Recipient Info Inputs */}
                  <div className="pt-4 border-t border-[#D4AF37]/20 space-y-4">
                    <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] font-bold block">
                      Recipient & Surprise Logistics
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-mono text-[#B8ACA3] block mb-1">
                          Celebrant / Recipient Name:
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Cynthia Dike"
                          value={recipientName}
                          onChange={(e) => setRecipientName(e.target.value)}
                          className="w-full bg-[#0B070E] border border-[#D4AF37]/30 rounded-xl px-3.5 py-2.5 text-xs text-[#FAF6F0] focus:border-[#E86F2C] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-mono text-[#B8ACA3] block mb-1">
                          Recipient Phone Number:
                        </label>
                        <input
                          type="tel"
                          placeholder="e.g. 0803 123 4567"
                          value={recipientPhone}
                          onChange={(e) => setRecipientPhone(e.target.value)}
                          className="w-full bg-[#0B070E] border border-[#D4AF37]/30 rounded-xl px-3.5 py-2.5 text-xs text-[#FAF6F0] focus:border-[#E86F2C] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-mono text-[#B8ACA3] block mb-1">
                          Target Surprise Date & Time:
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Friday 24th Oct, 11:00 AM"
                          value={deliveryDateTime}
                          onChange={(e) => setDeliveryDateTime(e.target.value)}
                          className="w-full bg-[#0B070E] border border-[#D4AF37]/30 rounded-xl px-3.5 py-2.5 text-xs text-[#FAF6F0] focus:border-[#E86F2C] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-mono text-[#B8ACA3] block mb-1">
                          Port Harcourt Delivery Zone:
                        </label>
                        <select
                          value={selectedZone}
                          onChange={(e) => setSelectedZone(e.target.value)}
                          className="w-full bg-[#0B070E] border border-[#D4AF37]/30 rounded-xl px-3.5 py-2.5 text-xs text-[#FAF6F0] focus:border-[#E86F2C] focus:outline-none cursor-pointer"
                        >
                          {PH_DELIVERY_ZONES.map((zone) => (
                            <option key={zone.id} value={zone.areaName}>
                              {zone.areaName} ({zone.fee ? `₦${zone.fee.toLocaleString()}` : "Free Pickup"})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-mono text-[#B8ACA3] block mb-1">
                        Personalized Handwritten Calligraphy Note:
                      </label>
                      <textarea
                        rows={2}
                        placeholder="e.g. Happy 30th Birthday to the most amazing sister in the world! Love, Sonia."
                        value={customNote}
                        onChange={(e) => setCustomNote(e.target.value)}
                        className="w-full bg-[#0B070E] border border-[#D4AF37]/30 rounded-xl p-3 text-xs text-[#FAF6F0] focus:border-[#E86F2C] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Right: Sticky Summary Receipt & Action Buttons */}
                <div className="lg:col-span-5 flex flex-col justify-between p-6 rounded-2xl bg-[#0B070E] border border-[#D4AF37]/30 space-y-6">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4AF37] font-bold">
                      Surprise Package Order Breakdown
                    </span>
                    <h4 className="font-display font-extrabold text-xl text-[#FAF6F0] mt-1">
                      {currentTier.tierName}
                    </h4>

                    <div className="mt-4 pt-4 border-t border-[#D4AF37]/15 space-y-2 text-xs">
                      <div className="flex justify-between text-[#B8ACA3]">
                        <span>Base Package:</span>
                        <span className="font-mono text-[#FAF6F0] tabular-nums">
                          ₦{currentTier.basePrice.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between text-[#B8ACA3]">
                        <span>Custom Add-ons ({totalAddonItemsCount} items):</span>
                        <span className="font-mono text-[#FAF6F0] tabular-nums">
                          +₦{surpriseAddonsTotal.toLocaleString()}
                        </span>
                      </div>

                      {totalAddonItemsCount > 0 && (
                        <div className="pt-2 pb-1 space-y-1 text-[11px] text-[#E8D8C8] border-t border-[#D4AF37]/10">
                          {Object.entries(addonQuantities).map(([id, qty]) => {
                            const a = SURPRISE_ADDONS.find((item) => item.id === id);
                            if (!a) return null;
                            return (
                              <div key={id} className="flex justify-between">
                                <span className="truncate pr-2">{qty}x {a.name}</span>
                                <span className="font-mono shrink-0">₦{(a.price * qty).toLocaleString()}</span>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      <div className="flex justify-between text-base font-bold text-[#F3C663] pt-3 border-t border-[#D4AF37]/15">
                        <span>Grand Total:</span>
                        <span className="font-mono text-2xl text-[#E86F2C] tabular-nums">
                          ₦{surpriseGrandTotal.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={handleAddSurpriseToCart}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#E86F2C] to-[#c75516] text-white font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg shadow-[#E86F2C]/30 hover:scale-[1.01] transition-all cursor-pointer"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add Package to Cart — ₦{surpriseGrandTotal.toLocaleString()}</span>
                    </button>

                    <button
                      onClick={handleDirectWhatsAppSurprise}
                      className="w-full py-3.5 rounded-xl royal-badge font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg hover:scale-[1.01] transition-all cursor-pointer text-[#FAF6F0]"
                    >
                      <MessageCircle className="w-4 h-4 text-[#F3C663]" />
                      <span>Reserve via Direct WhatsApp</span>
                    </button>
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

export default ChopsAndSurpriseBuilder;
