import React from "react";
import { Clock, ArrowUpRight } from "lucide-react";
import { SOZ_BRAND_IDENTITY } from "@/data/soz-menu-data";

interface ChefStoryAndHoursSectionProps {
  onBookEventClick?: () => void;
}

export const ChefStoryAndHoursSection: React.FC<ChefStoryAndHoursSectionProps> = ({
  onBookEventClick,
}) => {
  const handleScrollToBooking = () => {
    if (onBookEventClick) {
      onBookEventClick();
    } else {
      const el = document.getElementById("event-catering");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="story-hours" className="relative py-16 lg:py-24 bg-[#0B070E] border-b border-[#D4AF37]/15">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#E86F2C]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#6B21A8]/15 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* =========================================================================
              LEFT COLUMN: Editorial Story & Structured 2x2 Kitchen Hours Grid
              ========================================================================= */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#E86F2C]" />
                <span className="text-xs uppercase tracking-widest font-mono text-[#D4AF37] font-semibold">
                  Chef Sonia & Kitchen Story
                </span>
              </div>
              <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#FAF6F0] tracking-tight leading-tight">
                Chef So'z Brings Bold Flavor To Every Table.
              </h2>
              <p className="font-script text-2xl sm:text-3xl text-[#E8D8C8] italic">
                "Delicious Food, Beautifully Served."
              </p>
            </div>

            {/* Concise Editorial Bio */}
            <div className="space-y-4 text-sm sm:text-base text-[#B8ACA3] leading-relaxed font-light">
              <p>
                Founded by Sonia (<strong className="text-[#FAF6F0] font-semibold">Chef So'z</strong>), our culinary studio operates from our dedicated kitchen in <span className="text-[#D4AF37] font-medium">Eneka, Port Harcourt</span>. Driven by an uncompromising passion for authentic Niger Delta spices and modern culinary presentation, Chef So'z has become one of Pitakwa's most trusted catering names.
              </p>
              <p>
                From bubbling pots of Gourmet Fisherman Soup loaded with king prawns, to viral sardine puff-puff boxes and bespoke wedding canapé stations, our mission remains simple: <strong className="text-[#E86F2C] font-semibold">Good Food • Great Vibes • Memorable Moments</strong>.
              </p>
            </div>

            {/* Structured 2x2 Kitchen & Pre-Order Hours Grid */}
            <div className="rounded-3xl p-6 bg-[#171115] border border-[rgba(212,175,55,0.16)] shadow-xl space-y-4">
              <div className="pb-3 border-b border-[rgba(212,175,55,0.16)]">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#E86F2C]" />
                  Official Kitchen & Pre-Order Schedule
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {/* Cell 1: Kitchen Hours */}
                <div className="p-3.5 rounded-xl bg-[#0D090B] border border-[rgba(212,175,55,0.16)] space-y-1">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-[#B8ACA3] block">
                    Kitchen Operating Days
                  </span>
                  <p className="text-sm font-bold text-[#FAF6F0]">Monday – Saturday</p>
                  <p className="text-[#D4AF37] font-mono tabular-nums">8:00 AM – 7:00 PM</p>
                </div>

                {/* Cell 2: Same-day Cutoff */}
                <div className="p-3.5 rounded-xl bg-[#0D090B] border border-[rgba(212,175,55,0.16)] space-y-1">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-[#B8ACA3] block">
                    Same-Day Plates & Chops
                  </span>
                  <p className="text-sm font-bold text-[#FAF6F0]">Lunch & Snack Delivery</p>
                  <p className="text-[#E86F2C] font-mono">Order Before 3:00 PM</p>
                </div>

                {/* Cell 3: Liter Bowls & Trays */}
                <div className="p-3.5 rounded-xl bg-[#0D090B] border border-[rgba(212,175,55,0.16)] space-y-1">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-[#B8ACA3] block">
                    Liter Bowls & Food Trays
                  </span>
                  <p className="text-sm font-bold text-[#FAF6F0]">Fresh Soup & Platter Prep</p>
                  <p className="text-[#F3C663] font-mono">24hrs Notice Required</p>
                </div>

                {/* Cell 4: Event & Canapés */}
                <div className="p-3.5 rounded-xl bg-[#0D090B] border border-[rgba(212,175,55,0.16)] space-y-1">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-[#B8ACA3] block">
                    Event & Canapé Catering
                  </span>
                  <p className="text-sm font-bold text-[#FAF6F0]">Weddings, Galas & Parties</p>
                  <p className="text-[#FAF6F0] font-mono">Book 3–7 Days Ahead</p>
                </div>
              </div>
            </div>

            {/* Underlined Trigger */}
            <div className="pt-2">
              <button
                onClick={handleScrollToBooking}
                className="inline-flex items-center gap-2 text-sm font-bold text-[#F3C663] hover:text-[#E86F2C] transition-colors border-b-2 border-[#D4AF37]/50 hover:border-[#E86F2C] pb-1 cursor-pointer group"
              >
                <span>Book Chef So'z For An Event</span>
                <ArrowUpRight className="w-4 h-4 text-[#E86F2C] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* =========================================================================
              RIGHT COLUMN: High-Contrast Framed Editorial Showcase Card
              ========================================================================= */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border border-[#D4AF37]/35 royal-card-glow bg-[#160E1D] group">
              {/* Portrait / Plating Image */}
              <div className="relative h-[480px] sm:h-[540px] overflow-hidden">
                <img
                  src="/images/chef-sonia-portrait.webp"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80";
                  }}
                  alt="Chef Sonia (Chef So'z) Culinary Studio in Port Harcourt"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B070E] via-[#0B070E]/30 to-black/20" />

                {/* Bottom Card Title Ribbon */}
                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-[#0D090B] via-[#0D090B]/90 to-transparent space-y-2">
                  <div className="w-full bg-[#E8D8C8] px-4 py-2 rounded-xl flex items-center justify-between">
                    <span className="text-xs font-bold text-[#171115] uppercase tracking-wider">
                      Chef So'z (Sonia)
                    </span>
                    <span className="text-xs font-mono font-bold text-[#E86F2C]">
                      Order & Chop
                    </span>
                  </div>
                  <p className="text-sm font-script text-[#E8D8C8] italic">
                    "Every plate and small chops box is infused with love and true Rivers hospitality."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChefStoryAndHoursSection;
