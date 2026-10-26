import React, { useState } from "react";
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
  const [stopScroll, setStopScroll] = useState(false);

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
          "overflow-hidden w-full relative max-w-7xl mx-auto py-4",
          className
        )}
        onMouseEnter={() => setStopScroll(true)}
        onMouseLeave={() => setStopScroll(false)}
      >
        <div className="absolute left-0 top-0 h-full w-16 md:w-32 z-10 pointer-events-none bg-gradient-to-r from-[#0D090B] to-transparent" />

        <div
          className="soz-marquee-inner flex w-fit"
          style={{
            animationPlayState: stopScroll ? "paused" : "running",
            animationDuration: items.length * speedPerCardMs + "ms",
          }}
        >
          <div className="flex">
            {[...items, ...items].map((card, index) => (
              <div
                key={`${card.id}-${index}`}
                onClick={() => onCardClick?.(card)}
                className="w-56 sm:w-64 mx-3 h-[20rem] rounded-2xl overflow-hidden border border-[#D4AF37]/20 relative group hover:scale-95 transition-all duration-300 cursor-pointer bg-[#171115] shadow-xl"
              >
                <img
                  src={card.image}
                  alt={card.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />

                {/* Warm Cream Bottom Title Ribbon (Ember & Oak Style) */}
                <div className="absolute inset-x-0 bottom-0 bg-[#E8D8C8] px-3 py-2.5 flex items-center justify-between group-hover:opacity-0 transition-opacity duration-300">
                  <p className="text-xs font-bold text-[#171115] truncate pr-2">
                    {card.title}
                  </p>
                  <span className="text-xs font-mono font-bold text-[#E86F2C] shrink-0">
                    {card.priceTag}
                  </span>
                </div>

                {/* Frosted Glass Hover Overlay */}
                <div className="flex flex-col items-center justify-center px-5 opacity-0 group-hover:opacity-100 transition-all duration-300 absolute inset-0 backdrop-blur-md bg-[#0D090B]/70 text-center">
                  <span className="text-[11px] uppercase tracking-widest text-[#F3C663] font-semibold mb-1.5">
                    {card.subtitle}
                  </span>
                  <p className="text-[#FAF6F0] text-lg font-bold leading-snug mb-2">
                    {card.title}
                  </p>
                  <p className="text-[#E86F2C] font-mono font-bold text-base mb-4">
                    {card.priceTag}
                  </p>
                  <span className="px-4 py-1.5 rounded-full bg-[#E86F2C] text-white text-xs font-semibold shadow-md">
                    Order This Craving →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute right-0 top-0 h-full w-16 md:w-32 z-10 pointer-events-none bg-gradient-to-l from-[#0D090B] to-transparent" />
      </div>
    </>
  );
};

export default MarqueeCards;
