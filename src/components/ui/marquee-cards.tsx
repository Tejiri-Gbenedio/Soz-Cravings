import React, { useState } from "react";
import { ArrowRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface MarqueeDishCard {
  id: string;
  title: string;
  subtitle: string;
  priceTag: string;
  image: string;
}

interface MarqueeCardsProps {
  items: MarqueeDishCard[];
  onCardClick?: (item: MarqueeDishCard) => void;
  speedPerCardMs?: number;
  className?: string;
}

export const MarqueeCards: React.FC<MarqueeCardsProps> = ({
  items,
  onCardClick,
  speedPerCardMs = 3000,
  className,
}) => {
  const [activeCardKey, setActiveCardKey] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const isPaused = isHovered || activeCardKey !== null;

  return (
    <>
      <style>{`
        .soz-marquee-inner {
          animation: sozMarqueeScroll linear infinite;
        }
        @keyframes sozMarqueeScroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      <div
        className={cn(
          "overflow-hidden w-full relative max-w-7xl mx-auto py-4 select-none",
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="absolute left-0 top-0 h-full w-16 md:w-32 z-10 pointer-events-none bg-gradient-to-r from-[#0D090B] to-transparent" />

        <div
          className="soz-marquee-inner flex w-fit"
          style={{
            animationPlayState: isPaused ? "paused" : "running",
            animationDuration: items.length * speedPerCardMs + "ms",
          }}
        >
          <div className="flex">
            {[...items, ...items].map((card, index) => {
              const cardKey = `${card.id}-${index}`;
              const isActive = activeCardKey === cardKey;

              return (
                <div
                  key={cardKey}
                  onClick={() => {
                    if (isActive) {
                      setActiveCardKey(null);
                    } else {
                      setActiveCardKey(cardKey);
                    }
                  }}
                  className={cn(
                    "w-56 sm:w-64 mx-3 h-[20rem] rounded-2xl overflow-hidden border relative group transition-all duration-300 cursor-pointer bg-[#171115] shadow-xl shrink-0",
                    isActive
                      ? "border-2 border-[#D4AF37] royal-card-glow scale-[1.02]"
                      : "border-[#D4AF37]/20 hover:scale-95"
                  )}
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover pointer-events-none"
                  />

                  {/* Warm Cream Bottom Title Ribbon (Ember & Oak Style) */}
                  <div
                    className={cn(
                      "absolute inset-x-0 bottom-0 bg-[#E8D8C8] px-3 py-2.5 flex items-center justify-between transition-opacity duration-300",
                      isActive ? "opacity-0" : "group-hover:opacity-0"
                    )}
                  >
                    <p className="text-xs font-bold text-[#171115] truncate pr-2">
                      {card.title}
                    </p>
                    <span className="text-xs font-mono font-bold text-[#E86F2C] shrink-0">
                      {card.priceTag}
                    </span>
                  </div>

                  {/* Frosted Glass Overlay */}
                  <div
                    className={cn(
                      "flex flex-col items-center justify-center px-5 transition-all duration-300 absolute inset-0 backdrop-blur-md bg-[#0D090B]/85 text-center",
                      isActive
                        ? "opacity-100 pointer-events-auto z-10"
                        : "opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto"
                    )}
                  >
                    {/* Close / Dismiss Icon when active on mobile */}
                    {isActive && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveCardKey(null);
                        }}
                        className="absolute top-3 right-3 w-7 h-7 rounded-full bg-[#160E1D] border border-[#D4AF37]/35 flex items-center justify-center text-[#B8ACA3] hover:text-[#FAF6F0] cursor-pointer"
                        title="Resume slideshow"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}

                    <span className="text-[11px] uppercase tracking-widest text-[#F3C663] font-semibold mb-1.5">
                      {card.subtitle}
                    </span>
                    <p className="text-[#FAF6F0] text-lg font-bold leading-snug mb-2">
                      {card.title}
                    </p>
                    <p className="text-[#E86F2C] font-mono font-bold text-base mb-4">
                      {card.priceTag}
                    </p>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onCardClick?.(card);
                        setActiveCardKey(null);
                      }}
                      className="px-5 py-2 rounded-full bg-gradient-to-r from-[#E86F2C] to-[#c75516] text-white text-xs font-bold shadow-lg shadow-[#E86F2C]/40 hover:scale-105 active:scale-95 transition-all border border-[#D4AF37]/30 flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Order This Craving</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="absolute right-0 top-0 h-full w-16 md:w-32 z-10 pointer-events-none bg-gradient-to-l from-[#0D090B] to-transparent" />
      </div>
    </>
  );
};

export default MarqueeCards;
