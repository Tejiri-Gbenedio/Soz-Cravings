import * as React from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Plus, Tag, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Offer {
  id: string | number;
  imageSrc: string;
  imageAlt: string;
  tag: string;
  title: string;
  price: string;
  numericPrice?: number;
  description: string;
  brandLogoSrc?: string;
  brandName: string;
  promoCode?: string;
  href?: string;
}

interface OfferCardProps {
  offer: Offer;
  onSelectOffer?: (offer: Offer) => void;
}

const OfferCard = React.forwardRef<HTMLDivElement, OfferCardProps>(
  ({ offer, onSelectOffer }, ref) => (
    <motion.div
      ref={ref}
      onClick={() => onSelectOffer?.(offer)}
      role="button"
      tabIndex={0}
      className="relative flex-shrink-0 w-[300px] sm:w-[320px] h-[410px] rounded-2xl overflow-hidden group snap-start cursor-pointer border border-[#D4AF37]/20 bg-[#171115] shadow-2xl"
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ perspective: "1000px" }}
    >
      {/* Dish Image (Top 52%) */}
      <div className="relative w-full h-[52%] overflow-hidden">
        <img
          src={offer.imageSrc}
          alt={offer.imageAlt}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#171115] via-transparent to-black/30" />

        {/* Floating Price Pill */}
        <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#0D090B]/90 backdrop-blur-md border border-[#D4AF37]/40 text-[#FAF6F0] font-mono font-bold text-sm shadow-lg">
          {offer.price}
        </div>
      </div>

      {/* Warm Cream Ribbon Accent Bar (Ember & Oak Signature Touch) */}
      <div className="w-full bg-[#E8D8C8] px-4 py-1.5 flex items-center justify-between">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#171115] flex items-center">
          <Tag className="w-3 h-3 mr-1.5 text-[#E86F2C]" />
          {offer.tag}
        </span>
        <span className="text-[11px] font-semibold text-[#5B2346]">
          {offer.brandName}
        </span>
      </div>

      {/* Card Content (Bottom) */}
      <div className="p-5 flex flex-col justify-between h-[40%] bg-[#171115]">
        <div className="space-y-1.5">
          <h3 className="text-lg font-bold text-[#FAF6F0] leading-tight group-hover:text-[#E86F2C] transition-colors">
            {offer.title}
          </h3>
          <p className="text-xs text-[#B8ACA3] line-clamp-2 leading-relaxed">
            {offer.description}
          </p>
        </div>

        {/* Footer CTA */}
        <div className="flex items-center justify-between pt-3 border-t border-[#D4AF37]/15">
          <div className="flex items-center gap-2 text-xs text-[#F3C663] font-medium">
            <Clock className="w-3.5 h-3.5 text-[#E86F2C]" />
            <span>{offer.promoCode || "Add to Order"}</span>
          </div>

          <div
            className="w-8 h-8 rounded-full bg-[#241921] border border-[#D4AF37]/25 flex items-center justify-center text-[#FAF6F0] transform transition-all duration-300 group-hover:bg-[#E86F2C] group-hover:border-[#E86F2C] group-hover:text-white group-hover:scale-105"
            title="Add to Order"
          >
            <Plus className="w-4 h-4" />
          </div>
        </div>
      </div>
    </motion.div>
  )
);
OfferCard.displayName = "OfferCard";

export interface OfferCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  offers: Offer[];
  onSelectOffer?: (offer: Offer) => void;
}

const OfferCarousel = React.forwardRef<HTMLDivElement, OfferCarouselProps>(
  ({ offers, onSelectOffer, className, ...props }, ref) => {
    const scrollContainerRef = React.useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
      if (scrollContainerRef.current) {
        const { current } = scrollContainerRef;
        const scrollAmount = current.clientWidth * 0.8;
        current.scrollBy({
          left: direction === "left" ? -scrollAmount : scrollAmount,
          behavior: "smooth",
        });
      }
    };

    return (
      <div ref={ref} className={cn("relative w-full group", className)} {...props}>
        {/* Ember & Oak Style Top-Right Circular Outline Controls */}
        <div className="flex justify-end gap-2 mb-4">
          <button
            onClick={() => scroll("left")}
            className="w-10 h-10 rounded-full border border-[#D4AF37]/40 flex items-center justify-center text-[#FAF6F0] hover:bg-[#E86F2C] hover:border-[#E86F2C] transition-colors"
            aria-label="Scroll Left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-10 h-10 rounded-full border border-[#D4AF37]/40 flex items-center justify-center text-[#FAF6F0] hover:bg-[#E86F2C] hover:border-[#E86F2C] transition-colors"
            aria-label="Scroll Right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
        >
          {offers.map((offer) => (
            <OfferCard
              key={offer.id}
              offer={offer}
              onSelectOffer={onSelectOffer}
            />
          ))}
        </div>
      </div>
    );
  }
);
OfferCarousel.displayName = "OfferCarousel";

export { OfferCarousel, OfferCard };
