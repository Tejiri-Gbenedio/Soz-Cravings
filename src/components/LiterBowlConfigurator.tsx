import React, { useState, useEffect } from "react";
import { Check, Flame, Plus, ShieldCheck, Sparkles, Utensils, Clock, AlertCircle } from "lucide-react";
import { LITER_BOWL_MENU, type LiterBowlOption } from "@/data/soz-menu-data";

interface LiterBowlConfiguratorProps {
  initialDishId?: string;
  onAddConfiguredBowl: (bowl: {
    id: string;
    name: string;
    subtitle: string;
    price: number;
    image: string;
    size: string;
    spice: string;
    addons: string[];
  }) => void;
}

export const LiterBowlConfigurator: React.FC<LiterBowlConfiguratorProps> = ({
  initialDishId,
  onAddConfiguredBowl,
}) => {
  const [categoryFilter, setCategoryFilter] = useState<"All" | "Soup" | "Stew" | "Rice & Pasta">("All");
  const [selectedDishId, setSelectedDishId] = useState<string>(initialDishId || "fisherman-soup");
  const [selectedSizeLabel, setSelectedSizeLabel] = useState<"1.5L" | "2L" | "3L" | "4L">("2L");
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>(["extra-prawns"]);
  const [spiceLevel, setSpiceLevel] = useState<string>("Signature Spicy");

  useEffect(() => {
    if (initialDishId) {
      setSelectedDishId(initialDishId);
    }
  }, [initialDishId]);

  const filteredDishes =
    categoryFilter === "All"
      ? LITER_BOWL_MENU
      : LITER_BOWL_MENU.filter((d) => d.category === categoryFilter);

  const currentDish =
    LITER_BOWL_MENU.find((dish) => dish.id === selectedDishId) || filteredDishes[0] || LITER_BOWL_MENU[0];

  const currentSizeObj =
    currentDish.sizes.find((s) => s.sizeLabel === selectedSizeLabel) || currentDish.sizes[0];

  const basePrice = currentSizeObj.price;

  const addonsTotal = currentDish.extraAddons
    .filter((addon) => selectedAddonIds.includes(addon.id))
    .reduce((sum, addon) => sum + addon.price, 0);

  const grandTotal = basePrice + addonsTotal;

  const toggleAddon = (addonId: string) => {
    setSelectedAddonIds((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
  };

  const handleAddToCart = () => {
    const selectedAddonNames = currentDish.extraAddons
      .filter((a) => selectedAddonIds.includes(a.id))
      .map((a) => a.name);

    onAddConfiguredBowl({
      id: `${currentDish.id}-${selectedSizeLabel}-${Date.now()}`,
      name: currentDish.name,
      subtitle: `${selectedSizeLabel} Bowl • ${spiceLevel} ${
        selectedAddonNames.length > 0 ? `• +${selectedAddonNames.length} Extras` : ""
      }`,
      price: grandTotal,
      image: currentDish.image,
      size: selectedSizeLabel,
      spice: spiceLevel,
      addons: selectedAddonNames,
    });
  };

  return (
    <section id="liter-bowls" className="relative pt-6 pb-16 lg:pt-8 lg:pb-20 bg-[#0D090B] border-b border-[#D4AF37]/15">
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-[#E86F2C]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Compact Section Header & Filter Pills */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#D4AF37]/15">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E86F2C]" />
              <span className="text-[11px] uppercase tracking-widest font-mono text-[#D4AF37] font-semibold">
                Port Harcourt Soups & Stews in Liters (1.5L – 4L)
              </span>
            </div>
            <h2 className="font-display font-bold text-xl sm:text-2xl text-[#FAF6F0] tracking-tight">
              The Liter & Bowl Configurator
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            {(["All", "Soup", "Stew", "Rice & Pasta"] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1 rounded-full text-xs font-bold tracking-wider transition-all cursor-pointer ${
                  categoryFilter === cat
                    ? "bg-[#E86F2C] text-white shadow-md shadow-[#E86F2C]/30"
                    : "bg-[#171115] border border-[#D4AF37]/25 text-[#B8ACA3] hover:text-[#FAF6F0]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Configurator Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT / MIDDLE PANEL: Step-by-step Selection */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: Pick Base Dish */}
            <div className="space-y-3">
              <label className="text-xs uppercase tracking-widest font-mono text-[#D4AF37] font-bold flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#E86F2C] text-white text-[11px] flex items-center justify-center font-sans">
                  1
                </span>
                Step 1: Pick Your Base ({filteredDishes.length} Available)
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredDishes.map((dish) => {
                  const isSelected = dish.id === currentDish.id;
                  return (
                    <button
                      key={dish.id}
                      onClick={() => {
                        setSelectedDishId(dish.id);
                        setSelectedAddonIds([]); // Reset addons for new dish
                      }}
                      className={`p-4 rounded-2xl border text-left transition-all duration-300 relative cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? "bg-[#171115] border-[#E86F2C] shadow-lg shadow-[#E86F2C]/10 scale-[1.01]"
                          : "bg-[#171115]/60 border-[#D4AF37]/20 hover:border-[#D4AF37]/50"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-[#D4AF37] font-bold">
                            {dish.category}
                          </span>
                          {dish.isPremiumSeafood && (
                            <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#D4AF37]/20 text-[#F3C663] border border-[#D4AF37]/40">
                              PREMIUM SEAFOOD
                            </span>
                          )}
                          {isSelected && (
                            <div className="w-4 h-4 rounded-full bg-[#E86F2C] text-white flex items-center justify-center">
                              <Check className="w-2.5 h-2.5" />
                            </div>
                          )}
                        </div>
                        <p className="text-sm font-bold text-[#FAF6F0] leading-snug">
                          {dish.name}
                        </p>
                        <p className="text-xs text-[#B8ACA3] line-clamp-2 mt-1">
                          {dish.description}
                        </p>
                      </div>

                      <div className="mt-3 pt-2 border-t border-[#D4AF37]/15 flex items-center justify-between">
                        <span className="text-xs font-mono text-[#E86F2C] font-bold">
                          From ₦{dish.sizes[0].price.toLocaleString()}
                        </span>
                        <span className="text-[10px] text-[#B8ACA3] font-mono">
                          {dish.leadTime}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Select Container Size */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs uppercase tracking-widest font-mono text-[#D4AF37] font-bold flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#E86F2C] text-white text-[11px] flex items-center justify-center font-sans">
                    2
                  </span>
                  Step 2: Select Container Size (1.5L – 4L)
                </label>
                <span className="text-xs text-[#B8ACA3] font-mono">
                  {currentSizeObj.servingsEstimate}
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2.5">
                {currentDish.sizes.map((size) => {
                  const isSelected = size.sizeLabel === selectedSizeLabel;
                  return (
                    <button
                      key={size.sizeLabel}
                      onClick={() => setSelectedSizeLabel(size.sizeLabel)}
                      className={`py-3 px-2 rounded-xl border text-center transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[#E86F2C] text-white border-[#E86F2C] shadow-md shadow-[#E86F2C]/30 scale-[1.02]"
                          : "bg-[#171115] border-[#D4AF37]/25 text-[#FAF6F0] hover:border-[#D4AF37]"
                      }`}
                    >
                      <div className="font-mono font-black text-base sm:text-lg">
                        {size.sizeLabel}
                      </div>
                      <div className="font-mono text-[11px] font-bold opacity-90 mt-0.5">
                        ₦{size.price.toLocaleString()}
                      </div>
                      <div className="text-[9px] opacity-75 truncate mt-0.5">
                        {size.servingsEstimate.split(" ")[0]}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Extra Proteins & Add-ons */}
            <div className="space-y-3">
              <label className="text-xs uppercase tracking-widest font-mono text-[#D4AF37] font-bold flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#E86F2C] text-white text-[11px] flex items-center justify-center font-sans">
                  3
                </span>
                Step 3: Extra Proteins & Add-ons
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {currentDish.extraAddons.map((addon) => {
                  const isChecked = selectedAddonIds.includes(addon.id);
                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        isChecked
                          ? "bg-[#241921] border-[#D4AF37] text-[#FAF6F0]"
                          : "bg-[#171115] border-[#D4AF37]/20 text-[#B8ACA3] hover:border-[#D4AF37]/40"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-4 h-4 rounded border flex items-center justify-center ${
                            isChecked
                              ? "bg-[#E86F2C] border-[#E86F2C] text-white"
                              : "border-[#D4AF37]/40 bg-[#0D090B]"
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3" />}
                        </div>
                        <span className="text-xs font-semibold">{addon.name}</span>
                      </div>
                      <span className="font-mono text-xs font-bold text-[#E86F2C]">
                        +₦{addon.price.toLocaleString()}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Spice Level Selector */}
            <div className="space-y-3">
              <label className="text-xs uppercase tracking-widest font-mono text-[#D4AF37] font-bold flex items-center gap-2">
                <Flame className="w-4 h-4 text-[#E86F2C]" />
                Spice Level
              </label>

              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { label: "Mild", desc: "Gentle warmth" },
                  { label: "Signature Spicy", desc: "Chef's authentic heat" },
                  { label: "Pepper Dem", desc: "Traditional fiery heat" },
                ].map((s) => {
                  const isSelected = spiceLevel === s.label;
                  return (
                    <button
                      key={s.label}
                      onClick={() => setSpiceLevel(s.label)}
                      className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[#241921] border-[#E86F2C] text-[#FAF6F0]"
                          : "bg-[#171115] border-[#D4AF37]/20 text-[#B8ACA3] hover:border-[#D4AF37]/40"
                      }`}
                    >
                      <p className="text-xs font-bold">{s.label}</p>
                      <p className="text-[10px] text-[#B8ACA3]">{s.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: Live Summary Sticky Card */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#171115] to-[#0D090B] border border-[#D4AF37]/35 shadow-2xl space-y-6">
              {/* Bowl Visual Preview */}
              <div className="relative h-56 rounded-2xl overflow-hidden border border-[#D4AF37]/25 group">
                <img
                  src={currentDish.image}
                  alt={currentDish.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D090B] via-transparent to-black/30" />

                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#0D090B]/90 backdrop-blur-md border border-[#D4AF37]/40 text-[#F3C663] font-mono text-xs font-bold">
                  {selectedSizeLabel} Bowl
                </div>

                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#E86F2C] text-white font-mono text-xs font-bold flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{currentDish.leadTime}</span>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-4 bg-[#E8D8C8] flex items-center justify-between">
                  <span className="text-xs font-bold text-[#171115] truncate pr-2">
                    {currentDish.name}
                  </span>
                  <span className="text-xs font-mono font-bold text-[#E86F2C]">
                    Est. {currentSizeObj.servingsEstimate}
                  </span>
                </div>
              </div>

              {/* Itemized Calculation */}
              <div className="space-y-3 text-xs pt-1">
                <div className="flex justify-between items-center text-[#B8ACA3]">
                  <span>Base Dish ({selectedSizeLabel})</span>
                  <span className="font-mono text-[#FAF6F0] font-semibold tabular-nums">
                    ₦{basePrice.toLocaleString()}
                  </span>
                </div>

                {selectedAddonIds.length > 0 && (
                  <div className="space-y-1.5 pl-2 border-l border-[#D4AF37]/30">
                    {currentDish.extraAddons
                      .filter((a) => selectedAddonIds.includes(a.id))
                      .map((addon) => (
                        <div
                          key={addon.id}
                          className="flex justify-between text-[11px] text-[#B8ACA3]"
                        >
                          <span>+ {addon.name}</span>
                          <span className="font-mono text-[#F3C663] tabular-nums">
                            ₦{addon.price.toLocaleString()}
                          </span>
                        </div>
                      ))}
                  </div>
                )}

                <div className="flex justify-between items-center text-[#B8ACA3]">
                  <span>Spice Level</span>
                  <span className="text-[#FAF6F0] font-medium">{spiceLevel}</span>
                </div>

                <div className="pt-3 border-t border-[#D4AF37]/20 flex items-center justify-between">
                  <span className="text-sm font-bold text-[#FAF6F0]">Grand Total</span>
                  <span className="font-mono font-black text-2xl text-[#E86F2C] tabular-nums">
                    ₦{grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleAddToCart}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#E86F2C] to-[#c75516] hover:from-[#c75516] hover:to-[#E86F2C] text-white font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-xl shadow-[#E86F2C]/25 hover:scale-[1.01] transition-all cursor-pointer border border-[#D4AF37]/30"
              >
                <Plus className="w-4 h-4" />
                <span>Add Configured Bowl to Order — ₦{grandTotal.toLocaleString()}</span>
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#F3C663] font-mono">
                <Clock className="w-3.5 h-3.5 text-[#E86F2C]" />
                <span>Requires 24hrs Pre-Order • Cooked Fresh in Eneka, PH</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiterBowlConfigurator;
