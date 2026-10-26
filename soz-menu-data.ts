// src/data/soz-menu-data.ts
// Centralized Menu, Pricing, and Delivery Configuration for So'z Cravings (Port Harcourt)
// Swap placeholder values once Chef So'z sends her final price list.

export interface LiterBowlOption {
  id: string;
  name: string;
  category: "Soup" | "Stew" | "Rice & Pasta";
  description: string;
  image: string;
  leadTime: string;
  sizes: {
    sizeLabel: "1L" | "1.5L" | "2L" | "3L" | "4L";
    price: number;
    servingsEstimate: string;
  }[];
  extraAddons: {
    id: string;
    name: string;
    price: number;
  }[];
}

export interface SmallChopsUnit {
  id: string;
  name: string;
  description: string;
  unitPrice: number;
  minQty: number;
  step: number;
  image: string;
  badge?: string;
}

export interface DeliveryZone {
  id: string;
  areaName: string;
  fee: number | null; // null = "Calculated on confirmation"
  estimatedWindow: string;
}

export const SOZ_CONTACT = {
  brandName: "So'z Cravings",
  chefName: "Chef So'z (Sonia)",
  tagline: "Order and Chop — The difference is in the taste.",
  whatsappPrimary: "2349030907698", // Format for wa.me/2349030907698
  displayPhonePrimary: "0903 090 7698",
  displayPhoneSecondary: "0802 849 0705",
  instagramHandle: "@soz_cravings",
  tiktokHandle: "@sonia_gbens",
  location: "Port Harcourt, Rivers State",
  cacVerified: true,
};

export const PH_DELIVERY_ZONES: DeliveryZone[] = [
  { id: "gra", areaName: "GRA Phase 1, 2 & 3", fee: 2500, estimatedWindow: "35–50 mins" },
  { id: "peter-odili", areaName: "Peter Odili / Trans-Amadi / Woji", fee: 2500, estimatedWindow: "35–55 mins" },
  { id: "ada-george", areaName: "Ada George / Mgbuoba / Rumeme", fee: 2500, estimatedWindow: "30–50 mins" },
  { id: "rumuola", areaName: "Rumuola / Rumuokwuta / Rumuigbo", fee: 2000, estimatedWindow: "25–45 mins" },
  { id: "choba", areaName: "Choba / Uniport / Alakahia", fee: 3000, estimatedWindow: "45–60 mins" },
  { id: "elelenwo", areaName: "Elelenwo / Artillery / Old GRA", fee: 2800, estimatedWindow: "40–55 mins" },
  { id: "other-ph", areaName: "Other Port Harcourt Areas (Confirm on WhatsApp)", fee: null, estimatedWindow: "Calculated on dispatch" },
  { id: "pickup", areaName: "Self-Pickup (Port Harcourt Kitchen)", fee: 0, estimatedWindow: "Ready at scheduled time" },
];

export const LITER_BOWL_MENU: LiterBowlOption[] = [
  {
    id: "fisherman-soup",
    name: "Gourmet Fisherman Soup",
    category: "Soup",
    description: "Rich Rivers-style Fisherman Soup loaded with fresh fish, prawns, snails, crab, periwinkle, and aromatic palm oil base.",
    image: "/images/fisherman-soup-bowl.jpg",
    leadTime: "Requires 24hrs Pre-Order",
    sizes: [
      { sizeLabel: "1.5L", price: 28000, servingsEstimate: "4–6 generous servings" },
      { sizeLabel: "2L", price: 36000, servingsEstimate: "6–9 servings" },
      { sizeLabel: "3L", price: 52000, servingsEstimate: "10–14 servings" },
      { sizeLabel: "4L", price: 68000, servingsEstimate: "15–20 servings" },
    ],
    extraAddons: [
      { id: "extra-prawns", name: "Extra Jumbo Prawns", price: 5000 },
      { id: "extra-snails", name: "Extra Peppered Snails (4 pcs)", price: 6000 },
      { id: "extra-titus", name: "Extra Titus Fish Cuts", price: 4500 },
      { id: "poundo-swallow", name: "Add 2 Wraps Poundo / Garri", price: 2000 },
    ],
  },
  {
    id: "chicken-stew",
    name: "Homemade Rich Chicken Stew",
    category: "Stew",
    description: "Slow-simmered Nigerian tomato and pepper stew infused with signature spices and packed with seasoned chicken cuts.",
    image: "/images/chicken-stew-2l.jpg",
    leadTime: "Requires 24hrs Pre-Order",
    sizes: [
      { sizeLabel: "1.5L", price: 20000, servingsEstimate: "5–7 servings" },
      { sizeLabel: "2L", price: 25000, servingsEstimate: "7–10 servings" },
      { sizeLabel: "3L", price: 36000, servingsEstimate: "11–15 servings" },
      { sizeLabel: "4L", price: 46000, servingsEstimate: "16–22 servings" },
    ],
    extraAddons: [
      { id: "swap-turkey", name: "Upgrade to Assorted Turkey & Chicken", price: 5500 },
      { id: "extra-gizzard", name: "Add Diced Peppered Gizzard", price: 4000 },
    ],
  },
  {
    id: "afang-soup",
    name: "Special Afang Soup",
    category: "Soup",
    description: "Freshly pounded afang and waterleaf cooked with assorted beef, shaki, kpomo, smoked fish, stockfish, and periwinkle.",
    image: "/images/afang-soup-bowl.jpg",
    leadTime: "Requires 24hrs Pre-Order",
    sizes: [
      { sizeLabel: "1.5L", price: 22000, servingsEstimate: "5–7 servings" },
      { sizeLabel: "2L", price: 28000, servingsEstimate: "8–10 servings" },
      { sizeLabel: "3L", price: 40000, servingsEstimate: "12–15 servings" },
      { sizeLabel: "4L", price: 52000, servingsEstimate: "16–20 servings" },
    ],
    extraAddons: [
      { id: "extra-goat", name: "Swap/Add Goat Meat", price: 4500 },
      { id: "extra-snails-afang", name: "Add Jumbo Snails", price: 6000 },
    ],
  },
  {
    id: "stir-fry-spaghetti",
    name: "Loaded Stir-Fried Spaghetti",
    category: "Rice & Pasta",
    description: "Wok-tossed smoky stir-fried spaghetti with vibrant bell peppers, sausage, prawns, and juicy peppered turkey/chicken.",
    image: "/images/stir-fry-spaghetti.jpg",
    leadTime: "Same-Day (3hrs Notice) or Pre-Order",
    sizes: [
      { sizeLabel: "1.5L", price: 18000, servingsEstimate: "3–5 servings" },
      { sizeLabel: "2L", price: 24000, servingsEstimate: "5–8 servings" },
      { sizeLabel: "3L", price: 34000, servingsEstimate: "9–12 servings" },
      { sizeLabel: "4L", price: 44000, servingsEstimate: "13–18 servings" },
    ],
    extraAddons: [
      { id: "extra-turkey-spag", name: "Extra 2 Peppered Turkey Cuts", price: 7000 },
      { id: "extra-plantain", name: "Side of Sweet Dodo (Plantain)", price: 2500 },
    ],
  },
];

export const SMALL_CHOPS_BUILDER_ITEMS: SmallChopsUnit[] = [
  {
    id: "puff-puff-classic",
    name: "Golden Classic Puff-Puff",
    description: "Soft, airy, golden-fried sweet Nigerian puff-puff.",
    unitPrice: 150,
    minQty: 10,
    step: 5,
    image: "/images/puff-puff.jpg",
  },
  {
    id: "puff-puff-sardine",
    name: "Signature Puff-Puff Sardine",
    description: "Chef So'z viral savory-sweet puff-puff stuffed with rich spiced sardine.",
    unitPrice: 400,
    minQty: 5,
    step: 5,
    image: "/images/puff-puff-sardine.jpg",
    badge: "CHEF'S VIRAL SPECIAL",
  },
  {
    id: "crispy-samosa",
    name: "Crispy Spiced Beef Samosas",
    description: "Crunchy triangular pastry pockets filled with minced beef and herbs.",
    unitPrice: 600,
    minQty: 4,
    step: 2,
    image: "/images/samosa.jpg",
  },
  {
    id: "spring-rolls",
    name: "Golden Vegetable & Chicken Spring Rolls",
    description: "Crispy rolls packed with seasoned shredded chicken and crunchy vegetables.",
    unitPrice: 600,
    minQty: 4,
    step: 2,
    image: "/images/spring-rolls.jpg",
  },
  {
    id: "peppered-turkey",
    name: "Rich Peppered Turkey Cuts",
    description: "Large, juicy turkey cuts tossed in Chef So'z fiery red pepper glaze.",
    unitPrice: 3500,
    minQty: 1,
    step: 1,
    image: "/images/peppered-turkey.jpg",
    badge: "FAN FAVORITE",
  },
];