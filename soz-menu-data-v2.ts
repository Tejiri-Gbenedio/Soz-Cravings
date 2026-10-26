// src/data/soz-menu-data.ts (v2.0 — Synced with Official So'z Cravings Royal Purple & Gold Flyers)
// Brand: So'z Cravings | Location: Eneka, Port Harcourt | WhatsApp: 0903 090 7698

export interface SmallChopsEventPack {
  id: string;
  optionLabel: string;
  name: string;
  price: number;
  priceFormatted: string;
  contents: string[];
  proteinHighlight: string;
  badge?: string;
  image: string;
}

export interface RiceAndSoupCombo {
  id: string;
  optionLabel: string;
  category: "Rice Combo" | "Single Soup Bowl";
  name: string;
  price: number;
  priceFormatted: string;
  description: string;
  includedItems: string[];
  proteinChoices: string[];
  soupChoices?: string[];
  exclusionNote?: string;
  image: string;
}

export interface LiterBowlOption {
  id: string;
  name: string;
  category: "Soup" | "Stew" | "Rice & Pasta";
  description: string;
  image: string;
  leadTime: string;
  isPremiumSeafood?: boolean;
  sizes: {
    sizeLabel: "1.5L" | "2L" | "3L" | "4L";
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

export interface BrandServicePillar {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface DeliveryZone {
  id: string;
  areaName: string;
  fee: number | null;
  estimatedWindow: string;
}

export const SOZ_BRAND_IDENTITY = {
  brandName: "So'z Cravings",
  chefName: "Chef So'z (Sonia)",
  primaryTagline: "GOOD FOOD • GREAT VIBES • MEMORABLE MOMENTS",
  secondaryTagline: "GOOD FOOD • GREAT VIBES • ALWAYS",
  scriptAccents: [
    "Delicious Food, Beautifully Served",
    "Small Chops, Big Vibes!",
    "Fresh • Tasty • Satisfying",
    "Let's Make Your Event Special",
  ],
  kitchenBaseLocation: "Eneka, Port Harcourt, Rivers State",
  whatsappPrimary: "2349030907698",
  displayPhonePrimary: "0903 090 7698",
  displayPhoneSecondary: "0802 849 0705",
  instagramHandle: "@soz_cravings",
  tiktokHandle: "@sonia_gbens",
  cacVerified: true,
  cateringEvents: [
    "Weddings",
    "Child Dedication",
    "Birthday Parties",
    "Corporate Events",
    "Anniversaries & Home Gatherings",
  ],
  trustPillars: [
    "Fresh Ingredients",
    "Quality Service",
    "Custom Menu Options",
  ],
};

export const SOZ_FIVE_SERVICES: BrandServicePillar[] = [
  {
    id: "small-chops",
    title: "Small Chops",
    description: "Crispy, tasty and perfect for any event.",
    iconName: "Skewer",
  },
  {
    id: "finger-food",
    title: "Finger Food",
    description: "Elegant bites for your special occasions.",
    iconName: "CanapeBite",
  },
  {
    id: "canape-settings",
    title: "Canapé Settings",
    description: "For weddings, anniversaries, birthday dedications.",
    iconName: "Cloche",
  },
  {
    id: "food-tray",
    title: "Food Tray",
    description: "Freshly prepared, beautifully served.",
    iconName: "Tray",
  },
  {
    id: "food-in-liters",
    title: "Food in Liters",
    description: "Hearty meals for bigger crowds.",
    iconName: "Pot",
  },
];

// Directly from Flyer #2: Small Chops Event Menu
export const SMALL_CHOPS_EVENT_MENU: SmallChopsEventPack[] = [
  {
    id: "small-chops-option-1",
    optionLabel: "OPTION 1",
    name: "Peppered Beef Chops Pack",
    price: 3000,
    priceFormatted: "₦3,000",
    proteinHighlight: "1 Peppered Beef",
    contents: [
      "4 Puffs",
      "1 Samosa",
      "1 Spring Roll",
      "1 Peppered Beef",
      "Pepper Sauce",
    ],
    image: "/images/chops-option-1-beef.jpg",
  },
  {
    id: "small-chops-option-2",
    optionLabel: "OPTION 2",
    name: "Peppered Chicken Chops Pack",
    price: 4000,
    priceFormatted: "₦4,000",
    proteinHighlight: "1 Peppered Chicken Cut",
    contents: [
      "4 Puffs",
      "1 Samosa",
      "1 Spring Roll",
      "1 Peppered Chicken Cut",
      "Pepper Sauce",
    ],
    badge: "POPULAR EVENT CHOICE",
    image: "/images/chops-option-2-chicken.jpg",
  },
  {
    id: "small-chops-option-3",
    optionLabel: "OPTION 3",
    name: "Peppered Croaker Fish Chops Pack",
    price: 6000,
    priceFormatted: "₦6,000",
    proteinHighlight: "1 Peppered Croaker Fish Cut",
    contents: [
      "4 Puffs",
      "1 Samosa",
      "1 Spring Roll",
      "1 Peppered Croaker Fish Cut",
      "Pepper Sauce",
    ],
    badge: "VIP SEAFOOD PACK",
    image: "/images/chops-option-3-croaker.jpg",
  },
  {
    id: "odogwu-platter-pack",
    optionLabel: "JUMBO PLATTER",
    name: "The Odogwu Small Chops Box",
    price: 35000,
    priceFormatted: "₦35,000",
    proteinHighlight: "4 Peppered Turkey Cuts",
    contents: [
      "35 Golden Puff-Puff",
      "8 Crispy Samosas",
      "8 Spring Rolls",
      "4 Rich Peppered Turkey Cuts",
      "Signature Pepper Sauce Dip",
    ],
    badge: "🔥 #1 PARTY PLATTER",
    image: "/images/odogwu-pack.jpg",
  },
];

// Directly from Flyer #3: Rice & Soup Menu
export const RICE_AND_SOUP_PLATES: RiceAndSoupCombo[] = [
  {
    id: "rice-combo-option-1",
    optionLabel: "OPTION 1",
    category: "Rice Combo",
    name: "Two Types of Rice + Protein + Salad",
    price: 10000,
    priceFormatted: "₦10,000",
    description: "Generous dual-rice platter (Jollof & Fried Rice) served with fresh garden salad and your choice of rich protein.",
    includedItems: ["Two Types of Rice", "Fresh Salad"],
    proteinChoices: ["Chicken", "Pepper Chicken", "Goat Meat", "Fish"],
    image: "/images/rice-option-1.jpg",
  },
  {
    id: "rice-combo-option-2",
    optionLabel: "OPTION 2",
    category: "Rice Combo",
    name: "Two Types of Rice + Protein + Salad + Moi Moi",
    price: 12000,
    priceFormatted: "₦12,000",
    description: "The complete feast: Two types of rice, rich leaf-wrapped Moi Moi, crisp salad, and your choice of signature protein.",
    includedItems: ["Two Types of Rice", "Fresh Salad", "Rich Moi Moi"],
    proteinChoices: ["Chicken", "Pepper Chicken", "Goat Meat", "Fish"],
    image: "/images/rice-option-2-moimoi.jpg",
  },
  {
    id: "single-soup-bowl-7k",
    optionLabel: "SOUP BOWL",
    category: "Single Soup Bowl",
    name: "Loaded Single Soup Bowl (Any Classic Soup)",
    price: 7000,
    priceFormatted: "₦7,000",
    description: "Hearty, freshly cooked Nigerian soup bowl made to order with rich assorted meats and fish.",
    includedItems: ["1 Loaded Soup Portion"],
    proteinChoices: ["Assorted Beef & Fish", "Goat Meat", "Chicken"],
    soupChoices: [
      "Egusi Soup",
      "Afang Soup",
      "Banga Soup",
      "Okro Soup",
      "Ogbono Soup",
      "Efo Riro",
      "White Soup (Ofe Nsala)",
      "Edikang Ikong",
      "Oha Soup",
      "Rivers Okazi Soup",
    ],
    exclusionNote: "Note: Excludes Fisherman Soup and Native Soup (available under Premium Bowls & Liters).",
    image: "/images/classic-soup-7k.jpg",
  },
];

export const LITER_BOWL_MENU: LiterBowlOption[] = [
  {
    id: "fisherman-soup",
    name: "Gourmet Fisherman Soup (Premium)",
    category: "Soup",
    description: "Chef So'z specialty Rivers Fisherman Soup loaded with fresh seafood, jumbo prawns, snails, crab, periwinkle, and rich palm oil base.",
    image: "/images/fisherman-soup-bowl.jpg",
    leadTime: "Requires 24hrs Pre-Order",
    isPremiumSeafood: true,
    sizes: [
      { sizeLabel: "1.5L", price: 28000, servingsEstimate: "4–6 generous servings" },
      { sizeLabel: "2L", price: 36000, servingsEstimate: "6–9 servings" },
      { sizeLabel: "3L", price: 52000, servingsEstimate: "10–14 servings" },
      { sizeLabel: "4L", price: 68000, servingsEstimate: "15–20 servings" },
    ],
    extraAddons: [
      { id: "extra-prawns", name: "Extra Jumbo Prawns", price: 5000 },
      { id: "extra-snails", name: "Extra Peppered Snails (4 pcs)", price: 6000 },
      { id: "extra-croaker", name: "Extra Croaker / Titus Fish Cuts", price: 5000 },
    ],
  },
  {
    id: "native-soup",
    name: "Rivers Special Native Soup (Premium)",
    category: "Soup",
    description: "Authentic Niger Delta Native Soup bursting with fresh seafood, smoked fish, periwinkle, and traditional coastal spices.",
    image: "/images/native-soup-bowl.jpg",
    leadTime: "Requires 24hrs Pre-Order",
    isPremiumSeafood: true,
    sizes: [
      { sizeLabel: "1.5L", price: 26000, servingsEstimate: "4–6 servings" },
      { sizeLabel: "2L", price: 34000, servingsEstimate: "6–9 servings" },
      { sizeLabel: "3L", price: 48000, servingsEstimate: "10–14 servings" },
      { sizeLabel: "4L", price: 62000, servingsEstimate: "15–20 servings" },
    ],
    extraAddons: [
      { id: "extra-prawns-native", name: "Extra Prawns & Seafood Mix", price: 5000 },
      { id: "extra-goat-native", name: "Add Goat Meat", price: 4500 },
    ],
  },
  {
    id: "classic-soups-liters",
    name: "Classic Nigerian Soups in Liters (Afang, Egusi, Banga, Okazi, Oha, Edikang Ikong, Efo Riro, White, Okro, Ogbono)",
    category: "Soup",
    description: "Hearty family & event liter bowls of your favorite soup cooked with assorted beef, goat meat, stockfish, and smoked fish.",
    image: "/images/afang-soup-bowl.jpg",
    leadTime: "Requires 24hrs Pre-Order",
    sizes: [
      { sizeLabel: "1.5L", price: 22000, servingsEstimate: "5–7 servings" },
      { sizeLabel: "2L", price: 28000, servingsEstimate: "8–10 servings" },
      { sizeLabel: "3L", price: 40000, servingsEstimate: "12–15 servings" },
      { sizeLabel: "4L", price: 52000, servingsEstimate: "16–20 servings" },
    ],
    extraAddons: [
      { id: "extra-goat", name: "Upgrade/Add Goat Meat", price: 4500 },
      { id: "extra-snails-classic", name: "Add Jumbo Snails", price: 6000 },
    ],
  },
  {
    id: "chicken-stew",
    name: "Homemade Rich Chicken / Beef Stew",
    category: "Stew",
    description: "Slow-simmered tomato and pepper stew infused with signature spices and packed with seasoned chicken or beef cuts.",
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
      { id: "extra-croaker-stew", name: "Add Croaker Fish Cuts", price: 6000 },
    ],
  },
];

export const PH_DELIVERY_ZONES: DeliveryZone[] = [
  { id: "eneka", areaName: "Eneka / Rukpokwu / Eliozu (Home Zone)", fee: 1500, estimatedWindow: "20–35 mins" },
  { id: "gra", areaName: "GRA Phase 1, 2 & 3 / Old GRA", fee: 2500, estimatedWindow: "35–50 mins" },
  { id: "peter-odili", areaName: "Peter Odili / Trans-Amadi / Woji / Elelenwo", fee: 2500, estimatedWindow: "30–45 mins" },
  { id: "rumuola", areaName: "Rumuola / Rumuokwuta / Artillery / Rumuomasi", fee: 2200, estimatedWindow: "25–45 mins" },
  { id: "ada-george", areaName: "Ada George / Mgbuoba / Location", fee: 2800, estimatedWindow: "35–55 mins" },
  { id: "choba", areaName: "Choba / Uniport / Alakahia", fee: 3000, estimatedWindow: "40–60 mins" },
  { id: "pickup-eneka", areaName: "Self-Pickup (Eneka, Port Harcourt)", fee: 0, estimatedWindow: "Ready at scheduled time" },
];