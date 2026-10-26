import React, { useState } from "react";
import { LayoutGrid, Sparkles, Plus, Clock, Tag, ArrowDown } from "lucide-react";
import { OfferCarousel, type Offer } from "@/components/ui/offer-carousel";
import { SOZ_SIGNATURE_OFFERS } from "@/data/soz-menu-data";

interface SignaturesSectionProps {
  onAddToCart: (item: {
    id: string;
    name: string;
    subtitle: string;
    price: number;
    image: string;
  }) => void;
  onCustomizeOffer?: (targetConfigurator: string, dishId?: string) => void;
}

export const SignaturesSection: React.FC<SignaturesSectionProps> = ({
  onAddToCart,
  onCustomizeOffer,
}) => {
  const [viewMode, setViewMode] = useState<"carousel" | "grid">("carousel");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSelectOffer = (offer: any) => {
    if (offer.isQuickAdd) {
      onAddToCart({
        id: String(offer.id),
        name: offer.title,
        subtitle: `${offer.tag} • Chef So'z Signature`,
        price: offer.numericPrice || 25000,
        image: offer.imageSrc,
      });
      showToast(`Added "${offer.title}" directly to your cart!`);
    } else {
      // Customize item: smooth scroll to appropriate configurator
      const target = offer.targetConfigurator || "liter-bowls";
      onCustomizeOffer?.(target, offer.preselectedDishId);
      const el = document.getElementById(target);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
      showToast(`Scrolling to customize ${offer.title}...`);
    }
  };

  return (
    <section id="menu-combos" className="relative pt-6 pb-16 lg:pt-8 lg:pb-20 bg-[#0D090B] border-b border-[#D4AF37]/15">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl bg-[#E86F2C] text-white text-xs font-bold shadow-2xl flex items-center gap-2 animate-bounce">
          <Sparkles className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-[#5B2346]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#E86F2C]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Compact Header & View Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#D4AF37]/15">
          <div className="space-y-1">
            <h2 className="font-display font-bold text-lg sm:text-xl text-[#FAF6F0] tracking-tight">
              Chef So'z Featured Signatures
            </h2>
            <p className="text-xs text-[#B8ACA3]">
              Curated celebration platters, royal boxes & authentic Niger Delta feasts.
            </p>
          </div>

          {/* Grid/Carousel Toggle */}
          <div className="inline-flex items-center p-1 rounded-full bg-[#171115] border border-[#D4AF37]/25 shadow-lg shrink-0">
            <button
              onClick={() => setViewMode("carousel")}
              className={`px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                viewMode === "carousel"
                  ? "bg-[#E86F2C] text-white shadow-md"
                  : "text-[#B8ACA3] hover:text-[#FAF6F0]"
              }`}
            >
              Carousel View
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                viewMode === "grid"
                  ? "bg-[#E86F2C] text-white shadow-md"
                  : "text-[#B8ACA3] hover:text-[#FAF6F0]"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Grid View</span>
            </button>
          </div>
        </div>

        {/* View Mode: Carousel or Grid */}
        {viewMode === "carousel" ? (
          <OfferCarousel
            offers={SOZ_SIGNATURE_OFFERS as any}
            onSelectOffer={handleSelectOffer}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {SOZ_SIGNATURE_OFFERS.map((offer: any) => (
              <div
                key={offer.id}
                onClick={() => handleSelectOffer(offer)}
                className="relative rounded-2xl overflow-hidden group cursor-pointer border border-[#D4AF37]/20 bg-[#171115] shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-[410px]"
              >
                {/* Dish Image */}
                <div className="relative w-full h-[52%] overflow-hidden">
                  <img
                    src={offer.imageSrc}
                    alt={offer.imageAlt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#171115] via-transparent to-black/30" />

                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#0D090B]/90 backdrop-blur-md border border-[#D4AF37]/40 text-[#FAF6F0] font-mono font-bold text-sm shadow-lg">
                    {offer.price}
                  </div>
                </div>

                {/* Warm Cream Ribbon Accent Bar */}
                <div className="w-full bg-[#E8D8C8] px-4 py-1.5 flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#171115] flex items-center">
                    <Tag className="w-3 h-3 mr-1.5 text-[#E86F2C]" />
                    {offer.tag}
                  </span>
                  <span className="text-[11px] font-semibold text-[#5B2346]">
                    {offer.brandName}
                  </span>
                </div>

                {/* Card Content */}
                <div className="p-4 flex flex-col justify-between h-[40%] bg-[#171115]">
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-[#FAF6F0] leading-tight group-hover:text-[#E86F2C] transition-colors line-clamp-1">
                      {offer.title}
                    </h3>
                    <p className="text-xs text-[#B8ACA3] line-clamp-2 leading-relaxed">
                      {offer.description}
                    </p>
                  </div>

                  {/* Footer CTA */}
                  <div className="flex items-center justify-between pt-2.5 border-t border-[#D4AF37]/15">
                    <div className="flex items-center gap-1.5 text-xs text-[#F3C663] font-medium">
                      {offer.isQuickAdd ? (
                        <span className="px-2 py-0.5 rounded-md bg-[#E86F2C]/20 text-[#E86F2C] font-mono font-bold text-[10px]">
                          1-Click Add
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-md bg-[#D4AF37]/20 text-[#D4AF37] font-mono font-bold text-[10px] flex items-center gap-1">
                          Customize <ArrowDown className="w-2.5 h-2.5" />
                        </span>
                      )}
                    </div>

                    <div
                      className="w-8 h-8 rounded-full bg-[#241921] border border-[#D4AF37]/25 flex items-center justify-center text-[#FAF6F0] transform transition-all duration-300 group-hover:bg-[#E86F2C] group-hover:border-[#E86F2C] group-hover:text-white group-hover:scale-105"
                      title={offer.isQuickAdd ? "Quick Add to Order" : "Customize Dish"}
                    >
                      <Plus className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SignaturesSection;
