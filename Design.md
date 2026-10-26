\# DESIGN.md — So'z Cravings Interactive Web Platform (v4.0 — Antigravity Ready)

\*\*Brand:\*\* So'z Cravings ("Chef So'z — Order and Chop")  

\*\*Location:\*\* Port Harcourt, Rivers State, Nigeria  

\*\*Tagline:\*\* \*"The difference is in the taste"\*  

\*\*Core Offerings:\*\* Liters \& Soup Bowls, Small Chops \& Platters (Odogwu Pack), Daily Lunch Packs \& Food Trays, Surprise Packages, Private Chef \& Indoor/Outdoor Event Catering  

\*\*Target Build Environment:\*\* Antigravity IDE (Gemini 3.8 Flash) | Next.js / Vite + React + TypeScript + Tailwind CSS + `shadcn/ui`  

\*\*Status:\*\* Architecture, UI/UX \& Pre-Wired 21st.dev + Dribbble (\*Ember \& Oak\*) Specification v4.0  



\---



\## 1. Executive Design Vision \& Aesthetic Direction

\*\*Theme Concept:\*\* \*"Dark Culinary Luxury meets Warm Port Harcourt Hospitality"\*



To make \*\*So'z Cravings\*\* feel unmistakably premium, exciting, and mouth-watering, the website combines:

1\. \*\*Dribbble Editorial Storytelling (\*Ember \& Oak\* by Mayur V.):\*\* Asymmetric hero typography with faint geometric SVG orbital rings, delicate calligraphic script subheaders paired with clean sans-serif titles, a 4-pillar circular icon value bar, an interactive bento split showcase, and high-contrast warm cream title ribbons.

2\. \*\*21st.dev Interactive Conversion Engine:\*\* Pre-wired React + Tailwind + Framer Motion components (`offer-carousel.tsx` and `marquee-cards.tsx`), a live Naira (`₦`) Liter \& Bowl Configurator, and a 1-click WhatsApp invoice checkout drawer.



\---



\## 2. Color System \& Atmospheric Polarity (`globals.css` Tokens)



\### Surface Palette (Dark-First Luxury)

\* \*\*Primary Canvas (`--bg-primary` / `--background`):\*\* `#0D090B` (Deep Obsidian Espresso — warm dark undertone, never harsh pure black)

\* \*\*Elevated Card Surface (`--bg-elevated` / `--card`):\*\* `#171115` (Dark Smoked Plum-Charcoal for menu cards, 4-pillar trust strip, and configurator panels)

\* \*\*Warm Cream Ribbon Surface (`--bg-cream-ribbon`):\*\* `#E8D8C8` (Warm Sand/Cream footer bar inspired by \*Ember \& Oak\* Signature Cards for high-contrast dish titles)

\* \*\*Interactive Glass Surface (`--bg-glass`):\*\* `rgba(30, 20, 27, 0.72)` with `backdrop-filter: blur(16px)` (for sticky navbar, floating cart bar, and hover overlays)

\* \*\*Subtle Surface Highlight (`--bg-highlight` / `--secondary`):\*\* `#241921` (Hover state for selectors and liter size tabs)



\### Brand \& Accent Tokens

\* \*\*Primary Brand Accent (`--accent-orange` / `--primary`):\*\* `#E86F2C` (Sizzling Burnt Orange — primary CTAs, active tabs, price badges)

\* \*\*Secondary Luxury Accent (`--accent-gold`):\*\* `#D4AF37` / `#F3C663` (Metallic Culinary Gold — CAC verified badges, orbital SVG lines, "Best Seller" tags, borders)

\* \*\*Brand Heritage Plum (`--accent-plum`):\*\* `#5B2346` (Deep Royal Plum — gradient glows, category pill backgrounds, Surprise Package theme accent)



\### Typography \& Semantic Tokens

\* \*\*Primary Text (`--text-primary` / `--foreground`):\*\* `#FAF6F0` (Warm Cream Alabaster — high contrast, soft on the eyes)

\* \*\*Secondary Text (`--text-secondary` / `--muted-foreground`):\*\* `#B8ACA3` (Muted Warm Stone — dish descriptions, portion details)

\* \*\*Dark Ink Text (`--text-dark-ink`):\*\* `#171115` (Used exclusively on Warm Cream Ribbon `#E8D8C8` badges)

\* \*\*WhatsApp Checkout Green (`--status-whatsapp`):\*\* `#25D366` (Dedicated accent for final "Send Order to WhatsApp" trigger)

\* \*\*Border Token (`--border-subtle` / `--border`):\*\* `rgba(212, 175, 55, 0.16)` (Subtle 1px gold-tinted hairlines)



\---



\## 3. Typography \& Scannable Hierarchy (Updated with \*Ember \& Oak\* Script Pairing)



> \*\*CRITICAL RULE FOR ANTIGRAVITY AGENT:\*\* Never inject `\* { font-family: 'Poppins', sans-serif; }` from raw 21st.dev snippets. Always enforce the 4-font system below in `index.html` / `globals.css`.



\* \*\*Primary Section \& Hero Headlines (`--font-display`):\*\* \*\*'Plus Jakarta Sans'\*\* or \*\*'Outfit'\*\* (300 Light to 600 SemiBold, wide tracking on Hero `SO'Z CRAVINGS`). Matches \*Ember \& Oak\*'s clean, architectural headline style.

\* \*\*Editorial Script Subheaders (`--font-script`):\*\* \*\*'Cormorant Garamond' (Italic 600)\*\* or \*\*'Great Vibes' / 'Playfair Display Italic'\*\*. Used directly underneath section titles for poetic sub-captions (e.g., \*"A Taste Worth Remembering."\*, \*"Dishes Crafted With Care."\*, \*"Loved By Port Harcourt."\*), directly adopting \*Ember \& Oak\*'s signature dual-font pairing.

\* \*\*UI \& Body (`--font-sans`):\*\* \*\*'Plus Jakarta Sans'\*\* or \*\*'Inter'\*\* (400, 500, 600).

\* \*\*Numbers, Prices \& Liters (`--font-mono`):\*\* \*\*'JetBrains Mono'\*\* or `font-variant-numeric: tabular-nums` on Plus Jakarta Sans for aligned Naira (`₦`) prices and liter sizes (`1.5L`, `2L`, `3L`, `4L`).



\---



\## 4. Page-by-Page \& Section-by-Section Blueprint (Integrating \*Ember \& Oak\* + 21st.dev)



\### Section 1: Minimal Hairline Navbar (\*Ember \& Oak\* Style) + Live Cart Pill

\* \*\*Visual Structure:\*\* Full-width top navigation separated by a delicate `1px solid rgba(212, 175, 55, 0.18)` bottom hairline.

\* \*\*Left:\*\* Flat SVG Chef Hat \& Utensils emblem + script wordmark \*So'z Cravings\*.

\* \*\*Center Links:\*\* `Home` • `Menu \& Combos` • `Liter Bowls` • `Surprise Boxes` • `Private Chef` • `Reviews`

\* \*\*Right CTAs:\*\* `Order Now ↗` link + Interactive \*\*Cart Pill Button\*\* (`🛒 2 Items • ₦65,000`).



\### Section 2: Asymmetric Orbital Hero Section (\*Ember \& Oak\* Layout + Video Backdrop)

\* \*\*Visual Concept:\*\* Full-bleed dark-graded video/photo canvas of Chef So'z stirring bubbling Fisherman Soup and plating the Odogwu Pack, overlaid with \*\*faint, ultra-thin (`1px`) concentric SVG orbital rings\*\* (`stroke="rgba(212, 175, 55, 0.14)"`) sweeping across the frame just like the \*Ember \& Oak\* hero.

\* \*\*Asymmetric 3-Point Text Placement:\*\*

&#x20; \* \*\*Middle-Left:\*\* Massive architectural display title:  

&#x20;   `SO'Z`  

&#x20;   `CRAVINGS`

&#x20; \* \*\*Bottom-Left Micro-Caption:\*\* Uppercase tracked statement: `"SO'Z CRAVINGS IS DEDICATED TO AN UNFORGETTABLE PORT HARCOURT CULINARY EXPERIENCE — ORDER AND CHOP."`

&#x20; \* \*\*Middle-Right Story Block:\*\* \*"So'z Cravings brings together bold Niger Delta \& continental flavors with homemade recipes crafted from the freshest ingredients. Every bowl and platter tells a story."\* followed by an underlined `Explore Menu ↗` trigger and a `Build Your Order →` primary CTA button.



\### Section 3: Continuous Visual Cravings Strip (`marquee-cards.tsx`)

\* \*\*21st.dev Component:\*\* `@prebuiltui/components/cards/marquee-cards-with-hover-effect`

\* \*\*Function:\*\* Directly beneath the hero, an infinite horizontal slideshow of her dishes glides across the dark obsidian canvas, pausing on hover/tap to reveal a frosted glass quick-order overlay.



\### Section 4: 4-Pillar Circular Icon Trust Strip (\*Ember \& Oak\* Feature Bar)

\* \*\*Visual Concept:\*\* A full-width elevated charcoal band (`#171115`) with 4 horizontal columns, each featuring a thin gold-bordered circular icon (`w-14 h-14 rounded-full border border-\[#D4AF37]/30`) on the left and a crisp title + 2-line description on the right:

&#x20; 1. 🍲 \*\*100% Fresh \& Homemade\*\* — \*Cooked fresh to order in Port Harcourt using rich, authentic local ingredients.\*

&#x20; 2. ✅ \*\*CAC Registered \& Verified\*\* — \*Officially registered catering brand trusted by homes, offices, and Pitakwa Fair.\*

&#x20; 3. 🛵 \*\*Fast Port Harcourt Delivery\*\* — \*Reliable dispatch across GRA, Peter Odili, Ada George, Rumuola, Choba \& Woji.\*

&#x20; 4. 👨‍🍳 \*\*Private Chef \& Events\*\* — \*From single lunch packs and liter bowls to full indoor/outdoor event catering.\*



\### Section 5: Featured Combos \& Menu Carousel (`offer-carousel.tsx` + \*Ember \& Oak\* Header)

\* \*\*Header:\*\* Centered title `So'z Cravings Signatures` with script subheader \*"Dishes \& Packs Crafted With Care."\* and top-right circular `←` `→` navigation buttons.

\* \*\*21st.dev Component:\*\* `@ravikatiyar162/components/offer-carousel` combined with a toggleable \*\*8-Card Signature Grid\*\* option featuring \*Ember \& Oak\*'s warm cream bottom title ribbon (`#E8D8C8`) + Naira price badge and `+ Add` button.



\### Section 6: Interactive Bento Split Showcase + Search (\*Ember \& Oak\* "Recipes" Layout Adapted for Services)

\* \*\*Visual Concept:\*\* Adopts the exact asymmetric split layout from \*Ember \& Oak\*'s "Recipes" section:

&#x20; \* \*\*Top Bar:\*\* Section Title `Explore Our Kitchen` on the left + minimal underlined `🔍 Search dishes, soups, or packs...` input on the right.

&#x20; \* \*\*Left Column (Interactive Script Category List):\*\* Clicking any of the 4 script-titled rows dynamically swaps the 3-photo Bento Collage on the right AND scrolls/filters the interactive configurator below:

&#x20;   1. \*Liters \& Soup Bowls\* — \*"Rich 1.5L to 4L bowls of Fisherman Soup, Afang, Banga \& Chicken Stew."\* (underlined with `1px` border)

&#x20;   2. \*Odogwu \& Small Chops\* — \*"Golden puff-puff, puff-puff sardine, crispy samosas, spring rolls \& peppered turkey."\*

&#x20;   3. \*Surprise Cravings Boxes\* — \*"Curated food trays bundled with celebration cakes, wine, flowers \& custom notes."\*

&#x20;   4. \*Private Chef \& Catering\* — \*"Bespoke home cooking, corporate lunch packs, and outdoor event buffets."\*

&#x20; \* \*\*Right Column (3-Photo Asymmetric Bento Grid):\*\* 1 tall vertical hero photo/video on the left (`aspect-\[3/4]`) paired with 2 stacked horizontal food shots on the right (`aspect-\[16/10]`).



\### Section 7: Flagship Interactive Feature #1 — "The Liter \& Bowl Configurator"

1\. \*\*Pick Base Dish:\*\* \*Gourmet Fisherman Soup\*, \*Native/Banga Soup\*, \*Afang Soup\*, \*Homemade Chicken/Beef Stew\*, \*Stir-Fried Spaghetti\*, \*Jollof/Fried Rice\*.

2\. \*\*Select Container Size:\*\* Segmented toggle (`1 Liter` | `1.5 Liters` | `2 Liters` | `3 Liters` | `4 Liters`) with live price update.

3\. \*\*Customize Protein \& Spice:\*\* Checkboxes (`+ Extra Prawns/Seafood`, `+ Extra Snails`, `+ Peppered Turkey`, `Spice Level`).

4\. \*\*Action:\*\* Instant `Add Bowl to Cart — ₦XX,XXX` button.



\### Section 8: Flagship Interactive Feature #2 — "Custom Small Chops \& Surprise Box Builder"

\* Dual-tab interactive builder:

&#x20; \* \*\*Tab A — Custom Small Chops Box:\*\* Quantity steppers (`-` `10` `+`) for \*Classic Puff-Puff\*, \*Puff-Puff Sardine\*, \*Samosas\*, \*Spring Rolls\*, and \*Peppered Turkey/Beef\*.

&#x20; \* \*\*Tab B — Send a Surprise Package:\*\* Select Food Tray Tier + Gift Add-Ons (`+ Cake`, `+ Bouquet`, `+ Wine`, `+ Custom Note`) + Recipient PH Delivery Details.



\### Section 9: Editorial Story \& Kitchen Hours Split (\*Ember \& Oak\* About \& Hours Block)

\* \*\*Visual Concept:\*\* Adopts \*Ember \& Oak\*'s asymmetric 2-column storytelling and hours layout:

&#x20; \* \*\*Left Column:\*\*

&#x20;   \* Headline: `Chef So'z Brings Bold Flavor To Every Table.`

&#x20;   \* Script Subheader: \*"The Difference Is In The Taste."\*

&#x20;   \* 2 concise paragraphs about Sonia (Chef So'z), her passion for culinary excellence in Port Harcourt, and her Private Chef \& Event Catering services.

&#x20;   \* \*\*Structured 2x2 Kitchen \& Delivery Hours Grid:\*\*

&#x20;     \* `Monday – Saturday:` `8:00 AM – 7:00 PM` | `Same-Day Chops:` `Order before 3:00 PM`

&#x20;     \* `Liter Bowls \& Trays:` `24hrs Pre-Order` | `Event \& Private Chef:` `Book 3–7 Days Ahead`

&#x20;   \* Underlined `Book Chef So'z For An Event ↗` CTA trigger.

&#x20; \* \*\*Right Column:\*\* High-contrast portrait photo of Chef So'z in her apron alongside a plated feast.



\### Section 10: Slide-Out Cart \& Instant WhatsApp Checkout (`09030907698`)

\* Slide-over drawer showing itemized selections, Port Harcourt Delivery Zone dropdown (`GRA`, `Peter Odili`, `Ada George`, `Rumuola`, `Choba`, `Woji`, `Pickup`), Delivery Date/Time picker, and 1-click \*\*Send Formatted Order to WhatsApp\*\* (`wa.me/2349030907698`).



\---



\## 5. Pre-Wired Code Components for Antigravity



\### Required NPM Dependencies

```bash

npm install lucide-react framer-motion clsx tailwind-merge zustand

```



\### Component 1: Featured Menu \& Signature Combos Carousel (`/components/ui/offer-carousel.tsx`)

\* \*\*Includes:\*\* `@ravikatiyar162/components/offer-carousel` upgraded with \*Ember \& Oak\* circular top-right header controls, Naira (`₦`) price pills, and `onSelectOffer` cart callbacks.



```tsx

import \* as React from "react";

import { motion } from "framer-motion";

import { ChevronLeft, ChevronRight, Plus, Tag, Clock } from "lucide-react";

import { cn } from "@/lib/utils";



export interface Offer {

&#x20; id: string | number;

&#x20; imageSrc: string;

&#x20; imageAlt: string;

&#x20; tag: string;

&#x20; title: string;

&#x20; price: string;

&#x20; numericPrice?: number;

&#x20; description: string;

&#x20; brandLogoSrc?: string;

&#x20; brandName: string;

&#x20; promoCode?: string;

&#x20; href?: string;

}



interface OfferCardProps {

&#x20; offer: Offer;

&#x20; onSelectOffer?: (offer: Offer) => void;

}



const OfferCard = React.forwardRef<HTMLDivElement, OfferCardProps>(

&#x20; ({ offer, onSelectOffer }, ref) => (

&#x20;   <motion.div

&#x20;     ref={ref}

&#x20;     onClick={() => onSelectOffer?.(offer)}

&#x20;     role="button"

&#x20;     tabIndex={0}

&#x20;     className="relative flex-shrink-0 w-\[300px] sm:w-\[320px] h-\[410px] rounded-2xl overflow-hidden group snap-start cursor-pointer border border-\[#D4AF37]/20 bg-\[#171115] shadow-2xl"

&#x20;     whileHover={{ y: -8 }}

&#x20;     transition={{ type: "spring", stiffness: 300, damping: 20 }}

&#x20;     style={{ perspective: "1000px" }}

&#x20;   >

&#x20;     {/\* Dish Image (Top 52%) \*/}

&#x20;     <div className="relative w-full h-\[52%] overflow-hidden">

&#x20;       <img

&#x20;         src={offer.imageSrc}

&#x20;         alt={offer.imageAlt}

&#x20;         className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"

&#x20;       />

&#x20;       <div className="absolute inset-0 bg-gradient-to-t from-\[#171115] via-transparent to-black/30" />



&#x20;       {/\* Floating Price Pill \*/}

&#x20;       <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-\[#0D090B]/90 backdrop-blur-md border border-\[#D4AF37]/40 text-\[#FAF6F0] font-mono font-bold text-sm shadow-lg">

&#x20;         {offer.price}

&#x20;       </div>

&#x20;     </div>



&#x20;     {/\* Warm Cream Ribbon Accent Bar (Ember \& Oak Signature Touch) \*/}

&#x20;     <div className="w-full bg-\[#E8D8C8] px-4 py-1.5 flex items-center justify-between">

&#x20;       <span className="text-\[11px] font-bold uppercase tracking-wider text-\[#171115] flex items-center">

&#x20;         <Tag className="w-3 h-3 mr-1.5 text-\[#E86F2C]" />

&#x20;         {offer.tag}

&#x20;       </span>

&#x20;       <span className="text-\[11px] font-semibold text-\[#5B2346]">

&#x20;         {offer.brandName}

&#x20;       </span>

&#x20;     </div>



&#x20;     {/\* Card Content (Bottom) \*/}

&#x20;     <div className="p-5 flex flex-col justify-between h-\[40%] bg-\[#171115]">

&#x20;       <div className="space-y-1.5">

&#x20;         <h3 className="text-lg font-bold text-\[#FAF6F0] leading-tight group-hover:text-\[#E86F2C] transition-colors">

&#x20;           {offer.title}

&#x20;         </h3>

&#x20;         <p className="text-xs text-\[#B8ACA3] line-clamp-2 leading-relaxed">

&#x20;           {offer.description}

&#x20;         </p>

&#x20;       </div>



&#x20;       {/\* Footer CTA \*/}

&#x20;       <div className="flex items-center justify-between pt-3 border-t border-\[#D4AF37]/15">

&#x20;         <div className="flex items-center gap-2 text-xs text-\[#F3C663] font-medium">

&#x20;           <Clock className="w-3.5 h-3.5 text-\[#E86F2C]" />

&#x20;           <span>{offer.promoCode || "Add to Order"}</span>

&#x20;         </div>



&#x20;         <div

&#x20;           className="w-8 h-8 rounded-full bg-\[#241921] border border-\[#D4AF37]/25 flex items-center justify-center text-\[#FAF6F0] transform transition-all duration-300 group-hover:bg-\[#E86F2C] group-hover:border-\[#E86F2C] group-hover:text-white group-hover:scale-105"

&#x20;           title="Add to Order"

&#x20;         >

&#x20;           <Plus className="w-4 h-4" />

&#x20;         </div>

&#x20;       </div>

&#x20;     </div>

&#x20;   </motion.div>

&#x20; )

);

OfferCard.displayName = "OfferCard";



export interface OfferCarouselProps extends React.HTMLAttributes<HTMLDivElement> {

&#x20; offers: Offer\[];

&#x20; onSelectOffer?: (offer: Offer) => void;

}



const OfferCarousel = React.forwardRef<HTMLDivElement, OfferCarouselProps>(

&#x20; ({ offers, onSelectOffer, className, ...props }, ref) => {

&#x20;   const scrollContainerRef = React.useRef<HTMLDivElement>(null);



&#x20;   const scroll = (direction: "left" | "right") => {

&#x20;     if (scrollContainerRef.current) {

&#x20;       const { current } = scrollContainerRef;

&#x20;       const scrollAmount = current.clientWidth \* 0.8;

&#x20;       current.scrollBy({

&#x20;         left: direction === "left" ? -scrollAmount : scrollAmount,

&#x20;         behavior: "smooth",

&#x20;       });

&#x20;     }

&#x20;   };



&#x20;   return (

&#x20;     <div ref={ref} className={cn("relative w-full group", className)} {...props}>

&#x20;       {/\* Ember \& Oak Style Top-Right Circular Outline Controls \*/}

&#x20;       <div className="flex justify-end gap-2 mb-4">

&#x20;         <button

&#x20;           onClick={() => scroll("left")}

&#x20;           className="w-10 h-10 rounded-full border border-\[#D4AF37]/40 flex items-center justify-center text-\[#FAF6F0] hover:bg-\[#E86F2C] hover:border-\[#E86F2C] transition-colors"

&#x20;           aria-label="Scroll Left"

&#x20;         >

&#x20;           <ChevronLeft className="w-5 h-5" />

&#x20;         </button>

&#x20;         <button

&#x20;           onClick={() => scroll("right")}

&#x20;           className="w-10 h-10 rounded-full border border-\[#D4AF37]/40 flex items-center justify-center text-\[#FAF6F0] hover:bg-\[#E86F2C] hover:border-\[#E86F2C] transition-colors"

&#x20;           aria-label="Scroll Right"

&#x20;         >

&#x20;           <ChevronRight className="w-5 h-5" />

&#x20;         </button>

&#x20;       </div>



&#x20;       {/\* Scrollable Container \*/}

&#x20;       <div

&#x20;         ref={scrollContainerRef}

&#x20;         className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"

&#x20;       >

&#x20;         {offers.map((offer) => (

&#x20;           <OfferCard

&#x20;             key={offer.id}

&#x20;             offer={offer}

&#x20;             onSelectOffer={onSelectOffer}

&#x20;           />

&#x20;         ))}

&#x20;       </div>

&#x20;     </div>

&#x20;   );

&#x20; }

);

OfferCarousel.displayName = "OfferCarousel";



export { OfferCarousel, OfferCard };

```



\---



\### Component 2: Continuous Dish Slideshow (`/components/ui/marquee-cards.tsx`)

\* \*\*Origin:\*\* Adapted from `@prebuiltui/components/cards/marquee-cards-with-hover-effect` (`demo.tsx` marquee engine).



```tsx

import React, { useState } from "react";

import { cn } from "@/lib/utils";



export interface MarqueeDishCard {

&#x20; id: string;

&#x20; title: string;

&#x20; subtitle: string;

&#x20; priceTag: string;

&#x20; image: string;

}



interface MarqueeCardsProps {

&#x20; items: MarqueeDishCard\[];

&#x20; onCardClick?: (item: MarqueeDishCard) => void;

&#x20; speedPerCardMs?: number;

&#x20; className?: string;

}



export const MarqueeCards: React.FC<MarqueeCardsProps> = ({

&#x20; items,

&#x20; onCardClick,

&#x20; speedPerCardMs = 3000,

&#x20; className,

}) => {

&#x20; const \[stopScroll, setStopScroll] = useState(false);



&#x20; return (

&#x20;   <>

&#x20;     <style>{`

&#x20;       .soz-marquee-inner {

&#x20;         animation: sozMarqueeScroll linear infinite;

&#x20;       }

&#x20;       @keyframes sozMarqueeScroll {

&#x20;         0% { transform: translateX(0%); }

&#x20;         100% { transform: translateX(-50%); }

&#x20;       }

&#x20;     `}</style>



&#x20;     <div

&#x20;       className={cn(

&#x20;         "overflow-hidden w-full relative max-w-7xl mx-auto py-4",

&#x20;         className

&#x20;       )}

&#x20;       onMouseEnter={() => setStopScroll(true)}

&#x20;       onMouseLeave={() => setStopScroll(false)}

&#x20;     >

&#x20;       <div className="absolute left-0 top-0 h-full w-16 md:w-32 z-10 pointer-events-none bg-gradient-to-r from-\[#0D090B] to-transparent" />



&#x20;       <div

&#x20;         className="soz-marquee-inner flex w-fit"

&#x20;         style={{

&#x20;           animationPlayState: stopScroll ? "paused" : "running",

&#x20;           animationDuration: items.length \* speedPerCardMs + "ms",

&#x20;         }}

&#x20;       >

&#x20;         <div className="flex">

&#x20;           {\[...items, ...items].map((card, index) => (

&#x20;             <div

&#x20;               key={`${card.id}-${index}`}

&#x20;               onClick={() => onCardClick?.(card)}

&#x20;               className="w-56 sm:w-64 mx-3 h-\[20rem] rounded-2xl overflow-hidden border border-\[#D4AF37]/20 relative group hover:scale-95 transition-all duration-300 cursor-pointer bg-\[#171115] shadow-xl"

&#x20;             >

&#x20;               <img

&#x20;                 src={card.image}

&#x20;                 alt={card.title}

&#x20;                 className="w-full h-full object-cover"

&#x20;               />



&#x20;               {/\* Warm Cream Bottom Title Ribbon (Ember \& Oak Style) \*/}

&#x20;               <div className="absolute inset-x-0 bottom-0 bg-\[#E8D8C8] px-3 py-2.5 flex items-center justify-between group-hover:opacity-0 transition-opacity duration-300">

&#x20;                 <p className="text-xs font-bold text-\[#171115] truncate pr-2">

&#x20;                   {card.title}

&#x20;                 </p>

&#x20;                 <span className="text-xs font-mono font-bold text-\[#E86F2C] shrink-0">

&#x20;                   {card.priceTag}

&#x20;                 </span>

&#x20;               </div>



&#x20;               {/\* Frosted Glass Hover Overlay \*/}

&#x20;               <div className="flex flex-col items-center justify-center px-5 opacity-0 group-hover:opacity-100 transition-all duration-300 absolute inset-0 backdrop-blur-md bg-\[#0D090B]/70 text-center">

&#x20;                 <span className="text-\[11px] uppercase tracking-widest text-\[#F3C663] font-semibold mb-1.5">

&#x20;                   {card.subtitle}

&#x20;                 </span>

&#x20;                 <p className="text-\[#FAF6F0] text-lg font-bold leading-snug mb-2">

&#x20;                   {card.title}

&#x20;                 </p>

&#x20;                 <p className="text-\[#E86F2C] font-mono font-bold text-base mb-4">

&#x20;                   {card.priceTag}

&#x20;                 </p>

&#x20;                 <span className="px-4 py-1.5 rounded-full bg-\[#E86F2C] text-white text-xs font-semibold shadow-md">

&#x20;                   Order This Craving →

&#x20;                 </span>

&#x20;               </div>

&#x20;             </div>

&#x20;           ))}

&#x20;         </div>

&#x20;       </div>



&#x20;       <div className="absolute right-0 top-0 h-full w-16 md:w-32 z-10 pointer-events-none bg-gradient-to-l from-\[#0D090B] to-transparent" />

&#x20;     </div>

&#x20;   </>

&#x20; );

};



export default MarqueeCards;

```



\---



\## 6. Master Execution Prompt for Antigravity (Gemini 3.8 Flash)

Drop `DESIGN-v4.md` into your project root as `DESIGN.md` and send this prompt to Antigravity:



> \*"Read `DESIGN.md` carefully. Build the complete interactive dark-luxury web platform for \*\*So'z Cravings\*\* in Port Harcourt combining the \*\*Ember \& Oak\*\* editorial layout patterns (orbital SVG lines in the asymmetric hero, script subheaders beneath clean display headings, the 4-pillar circular icon bar, the Warm Cream `#E8D8C8` ribbon accents, the 3-photo Bento split showcase, and the structured Kitchen Hours block) with the pre-wired \*\*21st.dev\*\* components (`/components/ui/offer-carousel.tsx` and `/components/ui/marquee-cards.tsx`) and interactive Liter Bowl, Small Chops, and WhatsApp Checkout builders."\*

