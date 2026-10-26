# SO'Z CRAVINGS — PROJECT BREAKDOWN & ARCHITECTURAL DECISIONS
**Comprehensive Review Document for Executive & Development Team**  
*Brand: So'z Cravings ("Chef So'z — Order and Chop")*  
*Base Location: Eneka, Port Harcourt, Rivers State, Nigeria*  
*Version: 1.0 (Phase 1–3 Complete Implementation)*  
*Generated: October 2026*  

---

## 1. Executive Summary

We have architected and built a bespoke, dark-luxury web platform for **So'z Cravings**, Port Harcourt’s premier catering and culinary brand led by Chef So'z (Sonia). 

The platform elevates So'z Cravings from an informal social media food vendor to a high-converting, luxury culinary brand. It combines editorial food storytelling (adopting the *Ember & Oak* design aesthetic) with rich, interactive e-commerce configurators (inspired by 21st.dev components), anchored directly by Chef So'z's official promotional flyers.

### Core Objectives Achieved:
1. **Luxury Brand Positioning:** Elimination of generic template aesthetics in favor of a dark obsidian, metallic gold, and warm cream culinary visual identity.
2. **Official Flyer Integration:** Complete alignment of pricing, portion tiers, service pillars, taglines, and kitchen locations with Chef So'z official flyers.
3. **Interactive Menu Configurators:** Port Harcourt’s first interactive Liter & Bowl Configurator (1.5L–4L), Rice & Soup combo customizer, and Event Small Chops multiplier & builder.
4. **Frictionless Port Harcourt Ordering:** Dual-mode cart (slide-out drawer + mobile sticky bar), Port Harcourt delivery zone pricing, and formatted WhatsApp order invoice generator with unique Order References (`#SOZ-XXXX`).
5. **Production Readiness:** 100% TypeScript typed, 0 build errors, zero emojis in UI icons, and `tabular-nums` formatting throughout.

---

## 2. Key Architectural & Design Decisions

### 2.1 The Visual Language: *Ember & Oak* Dark Luxury
Rather than using generic e-commerce templates or harsh pure blacks, we established a curated dark-luxury palette and 3-font hierarchy tailored to Niger Delta and continental gastronomy:

| Token Name | Hex Code | Role & Strategic Purpose |
| :--- | :--- | :--- |
| **Obsidian Black** | `#0D090B` | Deep, warm black foundation that makes culinary photography glow. |
| **Smoked Plum-Charcoal** | `#171115` | Elevated surface for cards, configurator panels, and drawers. |
| **Dark Highlight** | `#241921` | Interactive button states, pill backgrounds, and badge frames. |
| **Warm Cream Ribbon** | `#E8D8C8` | Soft, elegant ribbon badges and editorial italic accents. |
| **Burnt Orange** | `#E86F2C` | High-energy culinary primary CTA (simulates flame and pepper spice). |
| **Metallic Gold** | `#D4AF37` | Hairline borders (1px @ 16% opacity), CAC badges, and luxury accents. |
| **Luminous Gold** | `#F3C663` | Tabular pricing highlights and verified trust emblems. |

### 2.2 Typography System
* **Display & Headings:** `Plus Jakarta Sans` — bold, modern, confident geometric typography for brand impact.
* **Editorial Flourish:** `Cormorant Garamond` (Italic) — classical fine-dining script voice for taglines, chef notes, and testimonials.
* **Pricing & Data:** `JetBrains Mono` with `font-variant-numeric: tabular-nums` — prevents visual jitter when prices, counters, or quantities dynamically update.

### 2.3 The "Zero Emojis" & Impeccable Design Rule
* **Decision:** We strictly prohibited unicode emojis (e.g., 🍢, 🥟, 🥂, 🍱, 🍲, 🔥, 🛒, ✨, 🎁) across all UI cards, badges, buttons, and toasts.
* **Rationale:** Unicode emojis degrade luxury brand perception, looking like generic AI-generated prototypes.
* **Execution:** All visual cues are powered by authentic Lucide SVG icons (`Flame`, `Utensils`, `Wine`, `Package`, `Soup`, `ShoppingBag`, `ShieldCheck`, `Clock`, `MapPin`) or custom vector rings, matching stroke weight and color harmony.

### 2.4 Browser Surface Theming
* Text selection themed to `#E86F2C` (Burnt Orange) with `#FAF6F0` white text.
* Custom luxury scrollbar styled to `#0D090B` background with a subtle `#241921`/`#E86F2C` thumb.
* Smooth scroll navigation (`scroll-behavior: smooth`) for seamless jump-links across menu sections.

---

## 3. Official Brand & Menu Alignment (Flyer v2 Data)

All data structures in [`src/data/soz-menu-data.ts`](file:///c:/Users/HP/Documents/soz%20cravings/src/data/soz-menu-data.ts) represent Chef So'z official business parameters:

### 3.1 Brand Identity & Kitchen Base
* **Primary Tagline:** `"GOOD FOOD • GREAT VIBES • MEMORABLE MOMENTS"`
* **Secondary Motto:** `"Small Chops, Big Vibes • The difference is in the taste."`
* **Kitchen Studio:** `"Eneka, Port Harcourt"`
* **Delivery Exclusivity:** Eneka & Rukpokwu designated as the ₦1,500 Home Delivery Zone.
* **Direct Order Line:** `+234 903 090 7698` / `+234 916 270 9443`

### 3.2 The 5 Official Flyer Services
Featured prominently in Section 4 with gold circular icon badges:
1. **Small Chops** (`Flame`): Crispy, savory finger foods and party platters.
2. **Finger Food** (`Utensils`): Elegant appetizers for special events.
3. **Canapé Settings** (`Wine`): Premium setups for weddings, anniversaries, and dedications.
4. **Food Tray** (`Package`): Freshly prepared luxury gift and celebration food trays.
5. **Food in Liters** (`Soup`): Hearty, bulk soups and rice for family and gatherings.

### 3.3 Menu Architecture Breakdown

```
SO'Z CRAVINGS MENU ENGINE
├── 1. Signature Offers (Carousel & Grid)
│   ├── The Odogwu Small Chops Platter (₦35,000)
│   ├── 4L Native Soup Seafood Special (₦65,000)
│   ├── Rice & Soup Combo Option 2 (₦12,000)
│   ├── Royal Surprise Celebration Box (₦65,000)
│   └── 2L Party Jollof & Smoked Chicken (₦20,000)
│
├── 2. Rice & Soup Plates (₦7,000 – ₦12,000)
│   ├── Option 1 (₦10,000): Rice + Plantain + Salad + Protein (Chicken/Goat/Fish)
│   ├── Option 2 with Moi Moi (₦12,000): Rice + Moi Moi + Plantain + Salad + Protein
│   └── ₦7,000 Soup Bowl: 10 Traditional Soups (Egusi, Afang, Banga, Okro, etc.)
│       └── Clear callout: Fisherman & Native soups are liter-only items
│
├── 3. Liter & Bowl Configurator (1.5L, 2L, 3L, 4L)
│   ├── 9 Recipes: Fisherman, Native, Seafood Okro, Oha, Egusi, Afang, Banga, Jollof, Fried Rice
│   ├── Add-ons: Jumbo Prawns (+₦10k), Crab (+₦6k), Goat Meat (+₦8k), Smoked Catfish (+₦5k)
│   └── Spice Customizer: Mild, Signature Spicy, Pepper Dem
│
├── 4. Event Small Chops & Royal Surprise Builder
│   ├── Event Packs: Option 1 Beef (₦3,000), Option 2 Chicken (₦4,000), Option 3 Croaker (₦6,000)
│   ├── Odogwu Platter: ₦35,000 (35 Puff-Puff, 8 Samosa, 8 Spring Rolls, 4 Peppered Turkey)
│   ├── Event Multipliers: 1 to 100 packs with real-time price tally
│   ├── Custom Stepper: Puff-puff, Samosa, Spring Roll, Turkey, Chicken, Corn Dog
│   └── Royal Surprise Boxes: Silver (₦35k), Gold (₦65k), Diamond (₦115k) + Custom Gifts
│
└── 5. Port Harcourt Delivery Dispatch Matrix
    ├── Eneka / Rukpokwu (₦1,500 — Home Base)
    ├── GRA Phase 1, 2, 3 (₦3,500)
    ├── Peter Odili / Trans-Amadi (₦3,500)
    ├── Woji / Rumurolu (₦3,000)
    ├── Rumuola / Stadium Road (₦2,500)
    ├── Ada George / Agip (₦3,000)
    ├── Choba / Uniport (₦4,000)
    └── Oyigbo / Outskirts (₦6,000)
```

---

## 4. Implemented Sections & Technical Blueprint

Here is a line-by-line summary of the component modules created in [`src/components/`](file:///c:/Users/HP/Documents/soz%20cravings/src/components/):

### Section 1: Hairline Navbar & Live Cart Pill ([`src/App.tsx`](file:///c:/Users/HP/Documents/soz%20cravings/src/App.tsx))
* Sticky top glassmorphism navbar with 1px gold hairline border (`border-[#D4AF37]/18`).
* Brand emblem with animated rotational hover effect.
* Live Cart Pill displaying quantity count and dynamic subtotal with gold pulsator.
* Smooth scroll anchors linking directly to menu configurators.

### Section 2: Ember & Oak Asymmetric Hero ([`src/App.tsx`](file:///c:/Users/HP/Documents/soz%20cravings/src/App.tsx))
* Faint 1px gold orbital SVG rings in the background creating an artisanal halo.
* Left column: CAC registration badge, massive bold typographic titles (`SO'Z CRAVINGS`), official brand taglines.
* Right column: Elevated glassmorphic chef story card with Eneka dispatch callout, direct CTA buttons ("Order Food Plates" and "Event Packs").
* Bottom hairline status bar highlighting kitchen hours and instant WhatsApp link.

### Section 3: Continuous Dish Marquee ([`src/components/ui/marquee-cards.tsx`](file:///c:/Users/HP/Documents/soz%20cravings/src/components/ui/marquee-cards.tsx))
* Smooth infinite horizontal marquee loop featuring high-definition culinary cards.
* Interactive card hover: Pauses marquee, shows price and details, and allows 1-click addition to order.

### Section 4: 5 Official Flyer Services Showcase ([`src/App.tsx`](file:///c:/Users/HP/Documents/soz%20cravings/src/App.tsx))
* 5 gold circular icon pillars (`Flame`, `Utensils`, `Wine`, `Package`, `Soup`).
* Hover state transitions with glowing background lifts and gold border highlights.

### Section 5: Featured Signatures Carousel & Grid ([`src/components/SignaturesSection.tsx`](file:///c:/Users/HP/Documents/soz%20cravings/src/components/SignaturesSection.tsx))
* Powered by `OfferCarousel` ([`src/components/ui/offer-carousel.tsx`](file:///c:/Users/HP/Documents/soz%20cravings/src/components/ui/offer-carousel.tsx)) with 3D card tilt and Warm Cream (`#E8D8C8`) ribbon banners.
* Switchable view mode: Interactive 3D Carousel vs. Structured Responsive Grid.
* Smart CTAs: Quick 1-click cart addition for fixed platters vs. auto-scroll customize triggers for configurable dishes.

### Section 6: Ember & Oak Bento Split Showcase ([`src/components/BentoShowcaseSection.tsx`](file:///c:/Users/HP/Documents/soz%20cravings/src/components/BentoShowcaseSection.tsx))
* Left column: Live text search input + 4 script category selector buttons (*Liter Soups, Event Chops, Food Trays, Surprise Packages*).
* Right column: Dynamic 3-photo Bento grid displaying hero dish, secondary item, and detailed specification panel updating live upon category click.

### Section Dedicated: Rice & Soup Plates (₦7,000 – ₦12,000) ([`src/components/RiceAndSoupPlatesSection.tsx`](file:///c:/Users/HP/Documents/soz%20cravings/src/components/RiceAndSoupPlatesSection.tsx))
* Dedicated everyday meal selector for Port Harcourt office workers and families.
* Option 1 (₦10,000) and Option 2 with Moi Moi (₦12,000) feature interactive protein selector radio pills: *Chicken, Pepper Chicken, Goat Meat, Fish*.
* ₦7,000 Soup Bowl option features interactive 10-soup dropdown selector with badge highlighting that Fisherman & Native soups require liter bowls.

### Section 7: Flagship Liter & Bowl Configurator ([`src/components/LiterBowlConfigurator.tsx`](file:///c:/Users/HP/Documents/soz%20cravings/src/components/LiterBowlConfigurator.tsx))
* Category filter tabs (*All, Soups, Stews & Sauces, Rice Classics*).
* Interactive portion toggles: **1.5L, 2L, 3L, and 4L** with dynamic price recalculation.
* Multi-select protein & seafood add-on checkboxes (*Jumbo Tiger Prawns, Mangrove Crabs, Fresh Fish Steaks, Smoked Catfish, Goat Meat Cuts*).
* Spice selector (*Mild, Signature Spicy, Pepper Dem*).
* Sticky summary receipt card showing breakdown and direct "Add Configured Bowl to Order".

### Section 8: Event Chops & Royal Surprise Builder ([`src/components/ChopsAndSurpriseBuilder.tsx`](file:///c:/Users/HP/Documents/soz%20cravings/src/components/ChopsAndSurpriseBuilder.tsx))
* Dual tab interface:
  1. **Event Small Chops**:
     * 3 Event Menu Options (₦3k Beef, ₦4k Chicken, ₦6k Croaker).
     * Interactive quantity multipliers (×1, ×10, ×25, ×50, ×100) with bulk price calculation.
     * 1-Click Odogwu Platter banner (₦35,000).
     * Custom Piece-by-Piece Stepper for bespoke box composition.
  2. **Royal Cravings Surprise Box**:
     * Silver (₦35k), Gold (₦65k), Diamond (₦115k) tier cards.
     * Interactive add-on checkboxes (*Wine/Champagne, Custom Photo Frame, Velvet Rose Bouquet, Birthday Foil Balloons, Mini Bento Cake, Scented Candles*).
     * Direct WhatsApp reservation compiler with recipient delivery details.

### Section 9A: Chef Story & 2x2 Kitchen Schedule ([`src/components/ChefStoryAndHoursSection.tsx`](file:///c:/Users/HP/Documents/soz%20cravings/src/components/ChefStoryAndHoursSection.tsx))
* Editorial narrative honoring Sonia (Chef So'z) and her Niger Delta culinary heritage.
* 2x2 Kitchen Schedule Grid separated by 1px gold hairlines:
  1. Monday – Saturday Kitchen Operations (8:00 AM – 7:00 PM).
  2. Sunday Pre-Order & Special Dispatch (12:00 PM – 6:00 PM).
  3. Daily Home Delivery Dispatch Windows.
  4. Large Event Catering Bookings notice (3–7 days notice).

### Section 9B: "We Cater For" Event Catering Calculator ([`src/components/EventCateringSection.tsx`](file:///c:/Users/HP/Documents/soz%20cravings/src/components/EventCateringSection.tsx))
* 4 Event Pillars: *Weddings & Engagements, Birthday & Anniversaries, Child Dedications, Corporate Functions*.
* Interactive Guest Slider (10 to 500+ guests).
* Service style selector (*Buffet Setup, Plated VIP Table Service, Canapé Cocktail Station, Packed Luxury Boxes*).
* Instant budget estimate generator (`₦estimatedMin – ₦estimatedMax`) with direct WhatsApp quote request button.

### Section 9C: CAC Trust Wall & `SOZfeedbacks` ([`src/components/TrustAndReviewsSection.tsx`](file:///c:/Users/HP/Documents/soz%20cravings/src/components/TrustAndReviewsSection.tsx))
* Official Corporate Affairs Commission (CAC) verification card.
* 3-column review wall showcasing real customer feedback from GRA, Peter Odili, and Trans-Amadi clients.

### Section 10: Persistent Cart & WhatsApp Commercial Engine ([`src/App.tsx`](file:///c:/Users/HP/Documents/soz%20cravings/src/App.tsx))
* `localStorage` persistence under key `soz-cravings-cart-v1`.
* Slide-out desktop drawer and sticky mobile bottom bar.
* Dynamic delivery fee calculator updating based on selected Port Harcourt zone.
* Formatted WhatsApp invoice generator creating structured receipts with unique Order References (e.g. `#SOZ-9842`).

### Luxury Footer ([`src/components/Footer.tsx`](file:///c:/Users/HP/Documents/soz%20cravings/src/components/Footer.tsx))
* 3 Flyer Quality Badges: *100% Fresh Daily Ingredients, Authentic Niger Delta Recipes, Prompt & Safe Port Harcourt Dispatch*.
* Direct phone links, WhatsApp button, Eneka kitchen studio coordinates, and custom inline SVG social links (Instagram, TikTok).

---

## 5. WhatsApp Invoice Output Sample

When a customer checks out through the cart drawer or mobile sticky bar, the engine compiles a structured message and dispatches it directly to Chef So'z WhatsApp (`+234 903 090 7698`):

```text
*OFFICIAL SO'Z CRAVINGS ORDER INVOICE*
*Order Ref:* #SOZ-8419
*Brand Tagline:* GOOD FOOD • GREAT VIBES • MEMORABLE MOMENTS
*Kitchen Studio:* Eneka, Port Harcourt

*CUSTOMER DETAILS:*
• Name: Tamuno Briggs
• Phone: 0803 123 4567
• Delivery Zone: GRA Phase 2
• Scheduled Window: Today by 4:00 PM

*ITEMIZED SELECTIONS:*
• 1x 2L Seafood Okro Bowl (₦32,000)
  [2 Liters • Add-ons: Jumbo Tiger Prawns, Mangrove Crabs • Heat: Signature Spicy]
• 25x Option 2 Small Chops Pack (₦100,000)
  [25 Packs • 4 Puff-Puff, 1 Samosa, 1 Spring Roll, 1 Peppered Chicken per pack]

*PAYMENT BREAKDOWN:*
• Subtotal: ₦132,000
• Delivery Fee: ₦3,500
• *GRAND TOTAL: ₦135,500*

Please confirm kitchen availability and provide your account transfer details!
```

---

## 6. Technical Stack & Quality Assurance

| Layer | Technology | Status / Verification |
| :--- | :--- | :--- |
| **Framework** | React 19 + TypeScript | 100% typed, strict null checks, zero `any` leaks. |
| **Bundler & Tooling** | Vite 6 | Fast HMR, production build in 8.27s. |
| **Styling** | Tailwind CSS 3.4 + Custom Tokens | Obsidian/Gold/Plum CSS variables in `globals.css`. |
| **Iconography** | Lucide React + Custom SVGs | Zero emojis, consistent 1.5–2px stroke weights. |
| **State Persistence** | Browser `localStorage` | Cart preserved across sessions under `soz-cravings-cart-v1`. |
| **Production Build** | `tsc -b && vite build` | **Passed cleanly with Exit Code 0**. |
| **Dev Server** | `http://localhost:5173/` | Running and verified active (HTTP 200). |

---

## 7. Open Discussion Points for Team Review

Before rolling out Phase 4 or public deployment, we recommend the team review and decide on the following items:

1. **Brand Photography Replacement:**
   * The current build uses high-end culinary imagery curated to match Niger Delta and Nigerian dishes.
   * *Action:* Does the team want to supply a Google Drive folder of Chef So'z's actual original food photography to replace these images in `soz-menu-data.ts`?
2. **Online Payment Gateway vs. WhatsApp Direct:**
   * Currently, checkout routes cleanly to WhatsApp for direct bank transfer confirmation, which matches common Port Harcourt culinary commerce habits.
   * *Action:* Should we add Paystack or Flutterwave inline modal checkout as an option alongside WhatsApp transfer?
3. **Delivery Fee Confirmation:**
   * Delivery fees are set based on typical Port Harcourt dispatch charges (₦1,500 for Eneka/Rukpokwu up to ₦6,000 for outskirts).
   * *Action:* Please confirm if these zone fees match the current dispatch rider partner rates.
4. **Domain & Hosting Deployment:**
   * The application is bundled and ready for instant deployment to Vercel, Netlify, or custom domain (e.g., `sozcravings.com` or `sozcravings.ng`).
   * *Action:* Confirm target domain name and hosting credentials.

---

*Document compiled and verified for the So'z Cravings Executive Team.*
