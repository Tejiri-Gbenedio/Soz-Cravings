import React, { useState } from "react";
import { Search, ArrowRight, Sparkles, ChefHat, ArrowUpRight } from "lucide-react";

interface BentoShowcaseProps {
  onSelectCategoryScroll?: (categoryId: string) => void;
}

interface CategoryData {
  id: string;
  number: string;
  title: string;
  scriptSub: string;
  description: string;
  badge: string;
  targetId: string;
  ctaText: string;
  images: {
    hero: {
      url: string;
      caption: string;
      tag: string;
      price: string;
    };
    stackedTop: {
      url: string;
      caption: string;
      price: string;
    };
    stackedBottom: {
      url: string;
      caption: string;
      price: string;
    };
  };
}

const CATEGORIES: CategoryData[] = [
  {
    id: "liters",
    number: "01",
    title: "Liters & Soup Bowls",
    scriptSub: "Rich 1.5L to 4L bowls of Fisherman Soup, Afang, Banga & Chicken Stew.",
    description: "Prepared for family gatherings, busy professionals, and weekend celebrations across Port Harcourt.",
    badge: "24hrs Pre-Order",
    targetId: "liter-bowls",
    ctaText: "Configure Your Liter Bowl →",
    images: {
      hero: {
        url: "/images/single-soup-bowl.webp",
        caption: "Gourmet Rivers Traditional Soup Bowl",
        tag: "Rivers Heritage Recipe",
        price: "From ₦22,000",
      },
      stackedTop: {
        url: "/images/rice-combo-plate.webp",
        caption: "Special Rice & Soup Plates",
        price: "₦7,000 – ₦12,000",
      },
      stackedBottom: {
        url: "/images/box-of-fries.webp",
        caption: "Triple-Fry Yam, Potato & Dodo Box",
        price: "From ₦15,000",
      },
    },
  },
  {
    id: "small-chops",
    number: "02",
    title: "Official Box of Chops",
    scriptSub: "Golden puff-puff, crispy samosas, spring rolls & peppered chicken or turkey.",
    description: "Available every Tuesday, Thursday & Saturday in official black & gold luxury boxes.",
    badge: "Tue • Thu • Sat Special",
    targetId: "chops-builder",
    ctaText: "Order Box of Chops →",
    images: {
      hero: {
        url: "/images/box-of-chops.webp",
        caption: "The Odogwu Deluxe Chops Box",
        tag: "Pitakwa Party Special",
        price: "₦35,000",
      },
      stackedTop: {
        url: "/images/box-of-fries.webp",
        caption: "Box of Fries with Snails & Prawns",
        price: "₦35,000",
      },
      stackedBottom: {
        url: "/images/rice-combo-plate.webp",
        caption: "Rice Combo with Moi Moi & Chicken",
        price: "₦12,000",
      },
    },
  },
  {
    id: "surprise-boxes",
    number: "03",
    title: "Box of Fries & Surprises",
    scriptSub: "Curated celebration boxes with fried yam, plantain, snails, prawns, and luxury gift add-ons.",
    description: "Make birthdays, anniversaries, and promotions unforgettable with a luxury doorstep feast.",
    badge: "Doorstep VIP Delivery",
    targetId: "chops-builder",
    ctaText: "Explore Box of Fries & Gifts →",
    images: {
      hero: {
        url: "/images/box-of-fries.webp",
        caption: "Official Box of Fries Loaded Base",
        tag: "Black & Gold Luxury Box",
        price: "₦15,000 – ₦35,000",
      },
      stackedTop: {
        url: "/images/box-of-chops.webp",
        caption: "Box of Chops Regular & Big Boy",
        price: "From ₦5,500",
      },
      stackedBottom: {
        url: "/images/soz-crest-dark.webp",
        caption: "Official Chef So'z Royal Emblem",
        price: "Chef Sonia Verified",
      },
    },
  },
  {
    id: "private-chef",
    number: "04",
    title: "Private Chef & Events",
    scriptSub: "Bespoke in-home dining, corporate lunch packs, and luxury wedding canapés.",
    description: "Full culinary service across Port Harcourt. Chef Sonia brings Michelin-level flavor into your private residence.",
    badge: "Naija to Gourmet",
    targetId: "event-catering",
    ctaText: "Book Private Chef Sonia →",
    images: {
      hero: {
        url: "/images/chef-sonia-portrait.webp",
        caption: "Chef Sonia (Chef So'z) In-Home Dining",
        tag: "Naija to Gourmet",
        price: "From ₦50,000",
      },
      stackedTop: {
        url: "/images/rice-combo-plate.webp",
        caption: "Dual-Rice Executive Event Feast",
        price: "Option 1 & 2 Plates",
      },
      stackedBottom: {
        url: "/images/single-soup-bowl.webp",
        caption: "Hot Nigerian Artisan Soups",
        price: "10 Classic Recipes",
      },
    },
  },
];

export const BentoShowcaseSection: React.FC<BentoShowcaseProps> = ({ onSelectCategoryScroll }) => {
  const [activeCategoryId, setActiveCategoryId] = useState("liters");
  const [searchQuery, setSearchQuery] = useState("");

  const activeCategory = CATEGORIES.find((c) => c.id === activeCategoryId) || CATEGORIES[0];

  const filteredCategories = CATEGORIES.filter(
    (c) =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.scriptSub.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCategoryClick = (cat: CategoryData) => {
    setActiveCategoryId(cat.id);
  };

  const handleCtaClick = () => {
    onSelectCategoryScroll?.(activeCategory.targetId);
    const el = document.getElementById(activeCategory.targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="bento-kitchen" className="relative pt-6 pb-16 lg:pt-8 lg:pb-20 bg-[#0D090B] border-b border-[#D4AF37]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar: Compact Section Title + Minimal Underlined Search Input */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-4 mb-6 border-b border-[#D4AF37]/20 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E86F2C]" />
              <span className="text-[11px] uppercase tracking-widest font-mono text-[#D4AF37] font-semibold">
                Culinary Showcase
              </span>
            </div>
            <h2 className="font-display font-bold text-xl sm:text-2xl text-[#FAF6F0] tracking-tight">
              Explore Our Kitchen
            </h2>
            <p className="font-script text-sm sm:text-base text-[#E8D8C8] italic">
              "Select a service pillar to view our culinary craftsmanship."
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-[#D4AF37] absolute left-0 bottom-2.5" />
            <input
              type="text"
              placeholder="Search dishes, soups, or packs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-b border-[#D4AF37]/40 focus:border-[#E86F2C] pl-7 pr-3 py-2 text-sm text-[#FAF6F0] placeholder-[#B8ACA3]/60 focus:outline-none transition-colors font-sans"
            />
          </div>
        </div>

        {/* Bento Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: 4 Script-Titled Pillars */}
          <div className="lg:col-span-5 space-y-3">
            {filteredCategories.map((cat) => {
              const isActive = cat.id === activeCategoryId;
              return (
                <div
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat)}
                  className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer group relative overflow-hidden ${
                    isActive
                      ? "bg-[#171115] border-[#D4AF37] shadow-xl"
                      : "bg-[#171115]/40 border-[rgba(212,175,55,0.16)] hover:border-[#D4AF37]/40 hover:bg-[#171115]/70"
                  }`}
                >
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#E86F2C]" />
                  )}

                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[#E86F2C]">
                          {cat.number}
                        </span>
                        <h3 className="font-display font-bold text-lg sm:text-xl text-[#FAF6F0] group-hover:text-[#F3C663] transition-colors">
                          {cat.title}
                        </h3>
                      </div>

                      <p className="font-script text-base text-[#D4AF37] leading-tight">
                        {cat.scriptSub}
                      </p>

                      <p className="text-xs text-[#B8ACA3] pt-1 leading-relaxed">
                        {cat.description}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-3 shrink-0">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#0D090B] border border-[#D4AF37]/30 text-[#FAF6F0]">
                        {cat.badge}
                      </span>
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                          isActive
                            ? "bg-[#E86F2C] text-white"
                            : "bg-[#241921] text-[#B8ACA3] group-hover:text-[#FAF6F0]"
                        }`}
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: 3-Photo Asymmetric Bento Collage */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {/* 1 Tall Vertical Hero Photo (Aspect 3/4) */}
              <div className="md:col-span-7 relative h-[390px] sm:h-[480px] rounded-3xl overflow-hidden border border-[#D4AF37]/30 shadow-2xl group bg-[#171115]">
                <img
                  src={activeCategory.images.hero.url}
                  alt={activeCategory.images.hero.caption}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D090B] via-transparent to-black/30" />

                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#0D090B]/85 backdrop-blur-md border border-[#D4AF37]/40 text-[#F3C663] font-mono text-xs font-semibold">
                  {activeCategory.images.hero.tag}
                </div>

                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#E86F2C] text-white font-mono text-xs font-bold tabular-nums">
                  {activeCategory.images.hero.price}
                </div>

                {/* Bottom Caption Overlay & Quick-action CTA */}
                <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-[#0D090B] via-[#0D090B]/90 to-transparent space-y-2">
                  <div className="w-full bg-[#E8D8C8] px-3.5 py-1.5 rounded-lg flex items-center justify-between">
                    <span className="text-xs font-bold text-[#171115]">
                      {activeCategory.title}
                    </span>
                    <span className="text-xs font-mono font-bold text-[#E86F2C]">
                      Signature Craft
                    </span>
                  </div>
                  <h4 className="text-[#FAF6F0] font-display font-bold text-base sm:text-lg">
                    {activeCategory.images.hero.caption}
                  </h4>
                  <button
                    onClick={handleCtaClick}
                    className="w-full py-2.5 rounded-xl bg-[#E86F2C] hover:bg-[#c75516] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg transition-all cursor-pointer"
                  >
                    <span>{activeCategory.ctaText}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* 2 Stacked Horizontal Food Shots (Aspect 16/10) */}
              <div className="md:col-span-5 flex flex-col gap-4">
                <div className="relative h-[188px] sm:h-[232px] rounded-2xl overflow-hidden border border-[#D4AF37]/25 shadow-xl group bg-[#171115]">
                  <img
                    src={activeCategory.images.stackedTop.url}
                    alt={activeCategory.images.stackedTop.caption}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D090B] via-[#0D090B]/40 to-transparent" />

                  <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-[#0D090B]/90 backdrop-blur-md border border-[#D4AF37]/40 text-[#F3C663] font-mono text-[11px] font-bold tabular-nums">
                    {activeCategory.images.stackedTop.price}
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-3.5">
                    <p className="text-xs font-bold text-[#FAF6F0] line-clamp-1">
                      {activeCategory.images.stackedTop.caption}
                    </p>
                  </div>
                </div>

                <div className="relative h-[188px] sm:h-[232px] rounded-2xl overflow-hidden border border-[#D4AF37]/25 shadow-xl group bg-[#171115]">
                  <img
                    src={activeCategory.images.stackedBottom.url}
                    alt={activeCategory.images.stackedBottom.caption}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D090B] via-[#0D090B]/40 to-transparent" />

                  <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-[#0D090B]/90 backdrop-blur-md border border-[#D4AF37]/40 text-[#F3C663] font-mono text-[11px] font-bold tabular-nums">
                    {activeCategory.images.stackedBottom.price}
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-3.5">
                    <p className="text-xs font-bold text-[#FAF6F0] line-clamp-1">
                      {activeCategory.images.stackedBottom.caption}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BentoShowcaseSection;
