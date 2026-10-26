import React, { useState } from "react";
import { Check, ShoppingBag, Sparkles, Utensils, AlertCircle } from "lucide-react";
import { RICE_AND_SOUP_PLATES, type RiceAndSoupCombo } from "@/data/soz-menu-data";

interface RiceAndSoupPlatesSectionProps {
  onAddToCart: (item: {
    id: string;
    name: string;
    subtitle: string;
    price: number;
    image: string;
  }) => void;
}

export const RiceAndSoupPlatesSection: React.FC<RiceAndSoupPlatesSectionProps> = ({
  onAddToCart,
}) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string>("rice-combo-option-2");
  const [selectedProtein, setSelectedProtein] = useState<string>("Pepper Chicken");
  const [selectedSoup, setSelectedSoup] = useState<string>("Egusi Soup");

  const currentOption =
    RICE_AND_SOUP_PLATES.find((p) => p.id === selectedOptionId) || RICE_AND_SOUP_PLATES[1];

  const handleAddPlateToCart = () => {
    let customSubtitle = "";
    if (currentOption.category === "Rice Combo") {
      customSubtitle = `Protein: ${selectedProtein} • Dual-Rice (Jollof + Fried)`;
    } else {
      customSubtitle = `${selectedSoup} • Assorted Cuts: ${selectedProtein}`;
    }

    onAddToCart({
      id: `${currentOption.id}-${Date.now()}`,
      name: `${currentOption.name}`,
      subtitle: customSubtitle,
      price: currentOption.price,
      image: currentOption.image,
    });
  };

  return (
    <section id="rice-soup-plates" className="relative pt-6 pb-16 lg:pt-8 lg:pb-20 bg-[#0B070E] border-b border-[#D4AF37]/15">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-[#6B21A8]/12 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Compact Guidance Bar */}
        <div className="flex items-center justify-between gap-3 mb-6 pb-3 border-b border-[#D4AF37]/15">
          <p className="text-xs sm:text-sm text-[#B8ACA3]">
            Select a plate below to customize your protein and soup options:
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#160E1D] border border-[#D4AF37]/25 text-xs font-mono text-[#F3C663] shrink-0">
            <span>₦7,000 – ₦12,000</span>
          </div>
        </div>

        {/* 3 Tier Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {RICE_AND_SOUP_PLATES.map((plate) => {
            const isSelected = plate.id === selectedOptionId;
            return (
              <div
                key={plate.id}
                onClick={() => {
                  setSelectedOptionId(plate.id);
                  if (plate.proteinChoices.length > 0 && !plate.proteinChoices.includes(selectedProtein)) {
                    setSelectedProtein(plate.proteinChoices[0]);
                  }
                }}
                className={`relative rounded-3xl p-6 sm:p-7 border cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                  isSelected
                    ? "bg-[#261533] border-2 border-[#D4AF37] royal-card-glow transform scale-[1.02]"
                    : "bg-[#160E1D] border-[#D4AF37]/20 hover:border-[#6B21A8]"
                }`}
              >
                {/* Radio selection indicator */}
                <div
                  className={`absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                    isSelected
                      ? "royal-badge text-[#F3C663] shadow-lg scale-100"
                      : "border border-[#D4AF37]/30 bg-[#0B070E]/80 text-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <Check className={`w-4 h-4 ${isSelected ? "opacity-100 text-[#F3C663]" : "opacity-0"}`} />
                </div>

                <div>
                  <div className="relative mb-4 rounded-2xl overflow-hidden border border-[#D4AF37]/25 aspect-[16/10]">
                    <img
                      src={plate.image}
                      alt={plate.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute top-2.5 left-2.5">
                      <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full royal-badge">
                        {plate.optionLabel}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-lg text-[#FAF6F0] mb-2 leading-snug">
                    {plate.name}
                  </h3>

                  <div className="font-mono font-black text-2xl text-[#E86F2C] mb-4 tabular-nums">
                    {plate.priceFormatted}
                  </div>

                  <p className="text-xs text-[#B8ACA3] leading-relaxed mb-4">
                    {plate.description}
                  </p>

                  <div className="space-y-1.5 pt-3 border-t border-[#D4AF37]/15">
                    {plate.includedItems.map((item, idx) => (
                      <p key={idx} className="text-xs text-[#FAF6F0] flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E86F2C]" />
                        <span>{item}</span>
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Customization Drawer / Box for the Selected Option */}
        <div className="rounded-3xl p-6 sm:p-8 bg-[#160E1D] border border-[#D4AF37]/30 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-4">
                <div>
                  <h3 className="font-display font-bold text-xl text-[#FAF6F0]">
                    Customize Your Plate: {currentOption.name}
                  </h3>
                  <p className="text-xs text-[#B8ACA3]">
                    Cooked hot to order at our Eneka kitchen in Port Harcourt.
                  </p>
                </div>
                <div className="font-mono font-black text-2xl text-[#E86F2C] tabular-nums">
                  {currentOption.priceFormatted}
                </div>
              </div>

              {/* If Rice Combo: Choose Protein */}
              {currentOption.category === "Rice Combo" && (
                <div className="space-y-3">
                  <label className="text-xs uppercase tracking-widest font-mono text-[#D4AF37] font-bold block">
                    Choose Your Protein:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {currentOption.proteinChoices.map((prot) => {
                      const isChecked = selectedProtein === prot;
                      return (
                        <button
                          key={prot}
                          onClick={() => setSelectedProtein(prot)}
                          className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                            isChecked
                              ? "bg-[#6B21A8] text-white border-[#D4AF37] shadow-lg shadow-[#6B21A8]/30"
                              : "bg-[#0B070E] border-[#D4AF37]/25 text-[#FAF6F0] hover:border-[#D4AF37]"
                          }`}
                        >
                          <span className="text-xs font-bold">{prot}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* If Single Soup Bowl: Choose Soup from the 10 Official Soups */}
              {currentOption.category === "Single Soup Bowl" && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <label className="text-xs uppercase tracking-widest font-mono text-[#D4AF37] font-bold block">
                      Pick From 10 Official Soups:
                    </label>
                    <span className="text-[11px] text-[#B8ACA3] font-mono">
                      Selected: <strong className="text-[#F3C663]">{selectedSoup}</strong>
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                    {currentOption.soupChoices?.map((soup) => {
                      const isChosen = selectedSoup === soup;
                      return (
                        <button
                          key={soup}
                          onClick={() => setSelectedSoup(soup)}
                          className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                            isChosen
                              ? "bg-[#6B21A8] text-white border-[#D4AF37] shadow-lg shadow-[#6B21A8]/30"
                              : "bg-[#0B070E] border-[#D4AF37]/20 text-[#FAF6F0] hover:border-[#D4AF37]"
                          }`}
                        >
                          <span className="text-xs font-semibold">{soup}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Exclusion Banner */}
                  <div className="p-3.5 rounded-xl royal-badge flex items-start gap-3">
                    <AlertCircle className="w-4 h-4 text-[#F3C663] shrink-0 mt-0.5" />
                    <p className="text-xs text-[#FAF6F0] leading-relaxed">
                      <strong>Official Flyer Notice:</strong> No Fisherman soup and No Native soup in ₦7,000 bowls. (These premium seafood soups are crafted exclusively in our <strong>Liter Bowls</strong> below).
                    </p>
                  </div>

                  {/* Protein for Soup */}
                  <div className="space-y-2 pt-2">
                    <label className="text-xs uppercase tracking-widest font-mono text-[#D4AF37] font-bold block">
                      Soup Protein Option:
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {currentOption.proteinChoices.map((prot) => {
                        const isChecked = selectedProtein === prot;
                        return (
                          <button
                            key={prot}
                            onClick={() => setSelectedProtein(prot)}
                            className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                              isChecked
                                ? "bg-[#261533] border-[#E86F2C] text-[#FAF6F0]"
                                : "bg-[#0B070E] border-[#D4AF37]/20 text-[#B8ACA3] hover:border-[#D4AF37]"
                            }`}
                          >
                            <span className="text-xs font-bold">{prot}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Summary & Add to Cart Action */}
            <div className="lg:col-span-4 p-6 rounded-2xl bg-[#0B070E] border border-[#D4AF37]/30 flex flex-col justify-between space-y-5 shadow-xl">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4AF37]">
                  Plate Order Summary
                </span>
                <h4 className="font-display font-bold text-lg text-[#FAF6F0] mt-1">
                  {currentOption.name}
                </h4>
                <div className="text-xs text-[#B8ACA3] space-y-1.5 mt-3 pt-3 border-t border-[#D4AF37]/15">
                  {currentOption.category === "Rice Combo" ? (
                    <p>
                      Selected Protein: <strong className="text-[#FAF6F0]">{selectedProtein}</strong>
                    </p>
                  ) : (
                    <>
                      <p>
                        Selected Soup: <strong className="text-[#FAF6F0]">{selectedSoup}</strong>
                      </p>
                      <p>
                        Protein Cuts: <strong className="text-[#FAF6F0]">{selectedProtein}</strong>
                      </p>
                    </>
                  )}
                  <p>Kitchen: Eneka, Port Harcourt</p>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between pb-3 text-sm">
                  <span className="text-[#B8ACA3]">Price</span>
                  <span className="font-mono font-black text-2xl text-[#E86F2C] tabular-nums">
                    {currentOption.priceFormatted}
                  </span>
                </div>

                <button
                  onClick={handleAddPlateToCart}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#E86F2C] to-[#c75516] hover:scale-[1.01] text-white font-bold text-xs tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-[#E86F2C]/30 transition-all cursor-pointer border border-[#D4AF37]/30"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add Plate to Cart — {currentOption.priceFormatted}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RiceAndSoupPlatesSection;
