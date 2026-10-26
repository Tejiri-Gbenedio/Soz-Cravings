import React from "react";
import { Star, Quote, MapPin } from "lucide-react";
import { SOZ_BRAND_IDENTITY } from "@/data/soz-menu-data";

export const TrustAndReviewsSection: React.FC = () => {
  const testimonials = [
    {
      id: "rev-1",
      customerName: "Dr. Belema Briggs",
      areaTag: "Client in GRA Phase 2, Port Harcourt",
      orderHighlight: "Ordered: 2L Gourmet Fisherman Soup Bowl",
      date: "October 2024",
      quote:
        "The Fisherman Soup was out of this world! Fresh king prawns, massive snails, and authentic Rivers native flavor without shortcuts. My husband thought I spent all morning cooking. Chef So'z is now our official family caterer.",
      rating: 5,
    },
    {
      id: "rev-2",
      customerName: "Engr. Tamuno George",
      areaTag: "Event Host in Eneka, Port Harcourt",
      orderHighlight: "Ordered: 100 Packs Event Small Chops (Chicken & Beef)",
      date: "September 2024",
      quote:
        "We ordered 100 packs of small chops for my daughter's child dedication. Every single pack was delivered hot, crisp, and beautifully packaged with zero delays. The sardine puff-puff stole the entire show!",
      rating: 5,
    },
    {
      id: "rev-3",
      customerName: "Mrs. Ogechi Nkemdirim",
      areaTag: "Birthday Surprise in Peter Odili, Port Harcourt",
      orderHighlight: "Ordered: Sovereign VIP Feast Surprise Tray + Cake",
      date: "October 2024",
      quote:
        "Sent the VIP Surprise Tray to my sister's office in Peter Odili for her 30th birthday. The gold ribbon box, handwritten calligraphy note, and piping hot stir-fry pasta made her cry happy tears. 10/10 service!",
      rating: 5,
    },
  ];

  return (
    <section id="reviews" className="relative py-14 lg:py-20 bg-[#0D090B] border-b border-[#D4AF37]/15">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#E86F2C]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] font-bold">
            Real Customer Reviews • SOZfeedbacks
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-[#FAF6F0] tracking-tight">
            Loved By Port Harcourt
          </h2>
          <p className="font-script text-xl sm:text-2xl text-[#E8D8C8] italic">
            "Delicious Food, Beautifully Served & Delivered On Time."
          </p>
        </div>

        {/* 3-Column Dark-Glass Testimonial Grid (`SOZfeedbacks`) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="p-6 rounded-3xl bg-[#171115]/80 backdrop-blur-xl border border-[rgba(212,175,55,0.16)] hover:border-[#D4AF37]/45 transition-all duration-300 shadow-2xl flex flex-col justify-between group"
            >
              <div>
                {/* 5-Star Rating (Strict SVG, No Emojis) */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-[#D4AF37]">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono text-[#B8ACA3]">{t.date}</span>
                </div>

                {/* Quote Content */}
                <p className="text-xs sm:text-sm text-[#FAF6F0] leading-relaxed font-light mb-5">
                  "{t.quote}"
                </p>
              </div>

              {/* Customer Attribution */}
              <div className="pt-4 border-t border-[rgba(212,175,55,0.16)] space-y-1">
                <h4 className="font-display font-bold text-sm text-[#FAF6F0] group-hover:text-[#F3C663] transition-colors">
                  {t.customerName}
                </h4>
                <p className="text-[11px] text-[#B8ACA3] flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#E86F2C]" />
                  {t.areaTag}
                </p>
                <p className="text-[10px] font-mono text-[#D4AF37] pt-0.5">
                  {t.orderHighlight}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustAndReviewsSection;
