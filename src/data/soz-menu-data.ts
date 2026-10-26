// src/data/soz-menu-data.ts (v3.0 — Master Official Flyer & Royal Velvet Alignment)
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

export interface BoxOfChopsPackage {
  id: string;
  name: string;
  price: number;
  priceFormatted: string;
  contents: string[];
  requiresProteinChoice?: boolean;
  proteinOptions?: string[];
  availabilityNotice: string;
  badge?: string;
  image: string;
}

export interface BoxOfFriesItem {
  id: string;
  title: string;
  price: number;
  priceFormatted: string;
  baseIncludes: string;
  proteinIncludes: string;
  contents: string[];
  description: string;
  image: string;
  badge?: string;
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
  badge?: string;
}

export interface SurpriseBoxPackage {
  id: string;
  tierName: string;
  tagline: string;
  basePrice: number;
  image: string;
  includes: string[];
  recommendedFor: string;
}

export interface SurpriseAddon {
  id: string;
  name: string;
  price: number;
  category: "Bakery" | "Drink" | "Flower" | "Keepsake";
}

export interface DeliveryZone {
  id: string;
  areaName: string;
  fee: number | null;
  estimatedWindow: string;
}

export interface PrivateChefTier {
  id: string;
  title: string;
  category: "One-Off" | "Monthly";
  frequency: string;
  price: number;
  priceFormatted: string;
  description: string;
  recommendedFor: string;
}

export const SOZ_BRAND_IDENTITY = {
  brandName: "So'z Cravings",
  chefName: "Chef Sonia (Chef So'z)",
  brandLogo: "/images/soz-crest-dark.webp",
  primaryTagline: "GOOD FOOD • GREAT VIBES • MEMORABLE MOMENTS",
  secondaryTagline: "CRAVE IT. WE DELIVER. • Small Chops, Big Vibes! • Fries. Flavor. Satisfaction.",
  secondaryTaglines: [
    "CRAVE IT. WE DELIVER.",
    "Small Chops, Big Vibes!",
    "Fries. Flavor. Satisfaction.",
  ],
  scriptAccents: [
    "Delicious Food, Beautifully Served",
    "Small Chops, Big Vibes!",
    "Fries. Flavor. Satisfaction.",
    "Private Chef Service — Naija to Gourmet by Chef Soz",
  ],
  kitchenBaseLocation: "Eneka, Port Harcourt, Rivers State",
  whatsappPrimary: "2349030907698",
  displayPhonePrimary: "0903 090 7698",
  displayPhoneSecondary: "0802 849 0705",
  instagramHandle: "@soz_cravings",
  tiktokHandle: "@sonia_gbens",
  cacVerified: true,
  cateringEvents: [
    "Weddings & Engagements",
    "Child Dedications",
    "Birthday Parties",
    "Corporate Events & Banquets",
    "Private Chef In-Home Dining",
  ],
  trustPillars: [
    "100% Fresh Daily Ingredients",
    "Authentic Port Harcourt Craft",
    "Prompt & Safe Home Dispatch",
  ],
};

// Backwards compatibility alias
export const SOZ_CONTACT = {
  ...SOZ_BRAND_IDENTITY,
  tagline: SOZ_BRAND_IDENTITY.primaryTagline,
  location: SOZ_BRAND_IDENTITY.kitchenBaseLocation,
};

// Directly from Official Flyer: 5 Service Pillars
export const SOZ_FIVE_SERVICES: BrandServicePillar[] = [
  {
    id: "small-chops",
    title: "Small Chops",
    description: "Crispy, tasty and perfect for any event.",
    iconName: "Flame",
    badge: "Official Flyer Pillar #1",
  },
  {
    id: "finger-food",
    title: "Finger Food",
    description: "Elegant bites for your special occasions.",
    iconName: "Utensils",
    badge: "Official Flyer Pillar #2",
  },
  {
    id: "canape-settings",
    title: "Canapé Settings",
    description: "For weddings, anniversaries, birthday dedications.",
    iconName: "Wine",
    badge: "Official Flyer Pillar #3",
  },
  {
    id: "food-tray",
    title: "Food Tray",
    description: "Freshly prepared, beautifully served.",
    iconName: "Package",
    badge: "Official Flyer Pillar #4",
  },
  {
    id: "food-in-liters",
    title: "Food in Liters",
    description: "Hearty meals for bigger crowds.",
    iconName: "Soup",
    badge: "Official Flyer Pillar #5",
  },
];

// NEW DATA: Official Box of Fries Menu (Every box features: 15 pcs Fried Yam, 15 pcs Fried Potatoes, 15 pcs Fried Plantain)
export const BOX_OF_FRIES_MENU: BoxOfFriesItem[] = [
  {
    id: "fries-beef",
    title: "Box of Fries with Beef",
    price: 15000,
    priceFormatted: "₦15,000",
    baseIncludes: "15 pcs Fried Yam • 15 pcs Fried Potatoes • 15 pcs Fried Plantain",
    proteinIncludes: "4 Peppered Beef Sticks (Beef Kebabs)",
    contents: [
      "15 pcs Crispy Fried Yam",
      "15 pcs Golden Fried Potatoes",
      "15 pcs Sweet Fried Plantain",
      "4 Rich Peppered Beef Sticks / Kebabs",
      "Signature Pepper Dip & Garlic Mayo",
    ],
    description: "Hearty box of loaded yam, sweet plantain, and potatoes topped with succulent peppered beef kebabs.",
    image: "/images/box-of-fries.webp",
    badge: "VALUE FAVORITE",
  },
  {
    id: "fries-chicken",
    title: "Box of Fries with Chicken",
    price: 20000,
    priceFormatted: "₦20,000",
    baseIncludes: "15 pcs Fried Yam • 15 pcs Fried Potatoes • 15 pcs Fried Plantain",
    proteinIncludes: "4 Peppered Chicken Cuts",
    contents: [
      "15 pcs Crispy Fried Yam",
      "15 pcs Golden Fried Potatoes",
      "15 pcs Sweet Fried Plantain",
      "4 Succulent Peppered Chicken Cuts",
      "Signature Pepper Dip & Garlic Mayo",
    ],
    description: "Triple-fry base loaded with juicy, fiery peppered chicken cuts in Chef So'z signature black & gold box.",
    image: "/images/box-of-fries.webp",
    badge: "POPULAR CRAVING",
  },
  {
    id: "fries-turkey",
    title: "Box of Fries with Turkey",
    price: 28000,
    priceFormatted: "₦28,000",
    baseIncludes: "15 pcs Fried Yam • 15 pcs Fried Potatoes • 15 pcs Fried Plantain",
    proteinIncludes: "4 Large Peppered Turkey Cuts",
    contents: [
      "15 pcs Crispy Fried Yam",
      "15 pcs Golden Fried Potatoes",
      "15 pcs Sweet Fried Plantain",
      "4 Large Seasoned Peppered Turkey Cuts",
      "Signature Pepper Dip & Garlic Mayo",
    ],
    description: "Premium party box packed with loaded fries and meaty, deeply roasted peppered turkey chunks.",
    image: "/images/box-of-fries.webp",
    badge: "CHEF RECOMMENDATION",
  },
  {
    id: "fries-snails-prawns",
    title: "Box of Fries with Snails & Prawns",
    price: 35000,
    priceFormatted: "₦35,000",
    baseIncludes: "15 pcs Fried Yam • 15 pcs Fried Potatoes • 15 pcs Fried Plantain",
    proteinIncludes: "4 Peppered Snails • 5 Peppered Jumbo Prawns",
    contents: [
      "15 pcs Crispy Fried Yam",
      "15 pcs Golden Fried Potatoes",
      "15 pcs Sweet Fried Plantain",
      "4 Tender Peppered Snails",
      "5 Succulent Peppered Jumbo Prawns",
      "Chef So'z Gourmet Seafood Dressing",
    ],
    description: "The ultimate gourmet indulgence: triple-fry base crowned with giant peppered snails and jumbo coastal prawns.",
    image: "/images/box-of-fries.webp",
    badge: "LUXURY SEAFOOD LOADED",
  },
];

// NEW DATA: Box of Chops Package Menu (Available Every Tuesday, Thursday & Saturday)
export const BOX_OF_CHOPS_PACKAGES: BoxOfChopsPackage[] = [
  {
    id: "box-chops-regular",
    name: "Regular Pack",
    price: 5500,
    priceFormatted: "₦5,500",
    contents: [
      "1 Crispy Beef Samosa",
      "1 Savory Spring Roll",
      "1 Juicy Peppered Chicken Cut",
      "4 Golden Puff-Puff",
      "Chef So'z Pepper Sauce Dip",
    ],
    availabilityNotice: "Available Every Tuesday, Thursday & Saturday",
    image: "/images/box-of-chops.webp",
    badge: "QUICK SNACK",
  },
  {
    id: "box-chops-big-boy",
    name: "Big Boy Pack",
    price: 25000,
    priceFormatted: "₦25,000",
    contents: [
      "8 Crispy Samosas",
      "8 Savory Spring Rolls",
      "25 Golden Puff-Puff",
      "Choice of: 4 Peppered Chicken OR 8 Peppered Beef",
      "Signature Pepper Sauce Dip",
    ],
    requiresProteinChoice: true,
    proteinOptions: ["4 Peppered Chicken", "8 Peppered Beef"],
    availabilityNotice: "Available Every Tuesday, Thursday & Saturday",
    image: "/images/box-of-chops.webp",
    badge: "CHOICE OF CHICKEN OR BEEF",
  },
  {
    id: "box-chops-odogwu",
    name: "Odogwu Pack",
    price: 35000,
    priceFormatted: "₦35,000",
    contents: [
      "8 Crispy Samosas",
      "8 Savory Spring Rolls",
      "35 Golden Puff-Puff",
      "4 Large Peppered Turkey Cuts",
      "Signature Pepper Sauce Dip",
    ],
    availabilityNotice: "Available Every Tuesday, Thursday & Saturday",
    image: "/images/box-of-chops.webp",
    badge: "MOST POPULAR • PARTY PLATTER",
  },
];

// Small Chops Event Menu (For Parties, Weddings, Birthdays, Corporate with pack multiplier support)
export const SMALL_CHOPS_EVENT_MENU: SmallChopsEventPack[] = [
  {
    id: "small-chops-option-1",
    optionLabel: "OPTION 1",
    name: "Option 1 (Beef) Event Pack",
    price: 3000,
    priceFormatted: "₦3,000",
    proteinHighlight: "1 Peppered Beef Cut",
    contents: [
      "4 Golden Puff-Puff",
      "1 Crispy Samosa",
      "1 Savory Spring Roll",
      "1 Peppered Beef Cut",
      "Chef So'z Pepper Sauce Dip",
    ],
    image: "/images/box-of-chops.webp",
  },
  {
    id: "small-chops-option-2",
    optionLabel: "OPTION 2",
    name: "Option 2 (Chicken) Event Pack",
    price: 4000,
    priceFormatted: "₦4,000",
    proteinHighlight: "1 Peppered Chicken Cut",
    contents: [
      "4 Golden Puff-Puff",
      "1 Crispy Samosa",
      "1 Savory Spring Roll",
      "1 Peppered Chicken Cut",
      "Chef So'z Pepper Sauce Dip",
    ],
    badge: "POPULAR EVENT CHOICE",
    image: "/images/box-of-chops.webp",
  },
  {
    id: "small-chops-option-3",
    optionLabel: "OPTION 3",
    name: "Option 3 (Croaker Fish) Event Pack",
    price: 6000,
    priceFormatted: "₦6,000",
    proteinHighlight: "1 Peppered Croaker Fish Cut",
    contents: [
      "4 Golden Puff-Puff",
      "1 Crispy Samosa",
      "1 Savory Spring Roll",
      "1 Peppered Croaker Fish Cut",
      "Chef So'z Pepper Sauce Dip",
    ],
    badge: "VIP SEAFOOD PACK",
    image: "/images/box-of-chops.webp",
  },
];

// Directly from Official Rice & Soup Flyer: Rice & Soup Event Menu (₦7,000 – ₦12,000)
export const RICE_AND_SOUP_PLATES: RiceAndSoupCombo[] = [
  {
    id: "rice-combo-option-1",
    optionLabel: "DUAL-RICE COMBO",
    category: "Rice Combo",
    name: "Two Types of Rice (Jollof + Fried) + Salad + Protein",
    price: 10000,
    priceFormatted: "₦10,000",
    description: "Generous dual-rice feast with smokey Nigerian party jollof and seasoned fried rice, crisp garden salad, and your selected protein.",
    includedItems: ["Two Types of Rice (Jollof + Fried)", "Fresh Garden Salad"],
    proteinChoices: ["Chicken", "Pepper Chicken", "Goat Meat", "Fish"],
    image: "/images/rice-combo-plate.webp",
  },
  {
    id: "rice-combo-option-2",
    optionLabel: "DUAL-RICE + MOI MOI",
    category: "Rice Combo",
    name: "Two Types of Rice (Jollof + Fried) + Salad + Moi Moi + Protein",
    price: 12000,
    priceFormatted: "₦12,000",
    description: "The complete royal spread: Smokey party jollof & fried rice, rich steamed leaf-wrapped Moi Moi, crisp salad, and your selected protein.",
    includedItems: ["Two Types of Rice (Jollof + Fried)", "Fresh Garden Salad", "Rich Moi Moi"],
    proteinChoices: ["Chicken", "Pepper Chicken", "Goat Meat", "Fish"],
    image: "/images/rice-combo-plate.webp",
  },
  {
    id: "single-soup-bowl-7k",
    optionLabel: "SOUP BOWL",
    category: "Single Soup Bowl",
    name: "Single Soup Bowl (Any Classic Soup)",
    price: 7000,
    priceFormatted: "₦7,000",
    description: "Hearty, piping hot Nigerian soup bowl cooked with assorted meats, fish, and authentic local spices.",
    includedItems: ["1 Loaded Single Soup Bowl Portion"],
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
    exclusionNote: "No Fisherman soup and No Native soup (Fisherman & Native soup are available exclusively in Liter Bowls).",
    image: "/images/single-soup-bowl.webp",
  },
];

// Liter Bowl Menu (1.5L, 2L, 3L, 4L)
export const LITER_BOWL_MENU: LiterBowlOption[] = [
  {
    id: "fisherman-soup",
    name: "Gourmet Fisherman Soup (Premium)",
    category: "Soup",
    description: "Chef So'z specialty Rivers Fisherman Soup loaded with fresh seafood, jumbo prawns, snails, crab, periwinkle, and rich palm oil base.",
    image: "/images/single-soup-bowl.webp",
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
      { id: "extra-swallow", name: "Add 2 Wraps Poundo / Garri", price: 2000 },
    ],
  },
  {
    id: "native-soup",
    name: "Rivers Special Native Soup (Premium)",
    category: "Soup",
    description: "Authentic Niger Delta Native Soup bursting with fresh seafood, smoked fish, periwinkle, and traditional coastal spices.",
    image: "/images/single-soup-bowl.webp",
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
      { id: "extra-goat-native", name: "Add Tender Goat Meat", price: 4500 },
      { id: "extra-swallow-native", name: "Add 2 Wraps Yellow Starch / Semo", price: 2500 },
    ],
  },
  {
    id: "classic-soups-liters",
    name: "Classic Nigerian Soups in Liters",
    category: "Soup",
    description: "Hearty family & event liter bowls of your choice (Afang, Egusi, Banga, Okazi, Oha, Edikang Ikong, Efo Riro, White Soup, Okro, or Ogbono).",
    image: "/images/single-soup-bowl.webp",
    leadTime: "Requires 24hrs Pre-Order",
    sizes: [
      { sizeLabel: "1.5L", price: 22000, servingsEstimate: "5–7 servings" },
      { sizeLabel: "2L", price: 28000, servingsEstimate: "8–10 servings" },
      { sizeLabel: "3L", price: 40000, servingsEstimate: "12–15 servings" },
      { sizeLabel: "4L", price: 52000, servingsEstimate: "16–20 servings" },
    ],
    extraAddons: [
      { id: "extra-goat-classic", name: "Extra Tender Goat Meat", price: 4500 },
      { id: "extra-beef-classic", name: "Extra Assorted Meats & Shaki", price: 4000 },
      { id: "extra-fish-classic", name: "Extra Smoked Mangrove Fish", price: 4000 },
    ],
  },
  {
    id: "seafood-okro",
    name: "Rich Seafood Okro Soup",
    category: "Soup",
    description: "Crunchy sliced okro simmered in aromatic seafood stock with fresh crabs, prawns, snails, fish, and ogbono base for rich draw.",
    image: "/images/single-soup-bowl.webp",
    leadTime: "Requires 24hrs Pre-Order",
    isPremiumSeafood: true,
    sizes: [
      { sizeLabel: "1.5L", price: 25000, servingsEstimate: "4–6 servings" },
      { sizeLabel: "2L", price: 32000, servingsEstimate: "6–9 servings" },
      { sizeLabel: "3L", price: 46000, servingsEstimate: "10–14 servings" },
      { sizeLabel: "4L", price: 60000, servingsEstimate: "15–20 servings" },
    ],
    extraAddons: [
      { id: "extra-crab-okro", name: "Extra Mangrove Crabs", price: 4500 },
      { id: "extra-prawn-okro", name: "Extra Jumbo Prawns", price: 5000 },
    ],
  },
  {
    id: "chicken-stew",
    name: "Rich Homemade Chicken Stew",
    category: "Stew",
    description: "Slow-cooked, velvety red tomato & tatashe stew loaded with seasoned, succulent fried or grilled chicken cuts.",
    image: "/images/rice-combo-plate.webp",
    leadTime: "Available for same-day & 24hr orders",
    sizes: [
      { sizeLabel: "1.5L", price: 20000, servingsEstimate: "4–6 servings" },
      { sizeLabel: "2L", price: 25000, servingsEstimate: "6–8 servings" },
      { sizeLabel: "3L", price: 36000, servingsEstimate: "9–12 servings" },
      { sizeLabel: "4L", price: 48000, servingsEstimate: "13–18 servings" },
    ],
    extraAddons: [
      { id: "extra-chicken-cuts", name: "Extra 4 Peppered Chicken Cuts", price: 4500 },
      { id: "extra-boiled-eggs", name: "Add 6 Boiled Farm Eggs", price: 2500 },
    ],
  },
  {
    id: "goat-meat-stew",
    name: "Spiced Goat Meat Stew / Ayamase",
    category: "Stew",
    description: "Traditional bleached palm oil green pepper sauce (Ofada Stew/Ayamase) or deep red goat meat stew cooked with aromatic locust beans.",
    image: "/images/single-soup-bowl.webp",
    leadTime: "Requires 24hrs Pre-Order",
    sizes: [
      { sizeLabel: "1.5L", price: 24000, servingsEstimate: "4–6 servings" },
      { sizeLabel: "2L", price: 30000, servingsEstimate: "6–8 servings" },
      { sizeLabel: "3L", price: 42000, servingsEstimate: "9–12 servings" },
      { sizeLabel: "4L", price: 56000, servingsEstimate: "13–18 servings" },
    ],
    extraAddons: [
      { id: "extra-goat-stew", name: "Extra Soft Goat Meat Cuts", price: 5000 },
      { id: "extra-boiled-eggs-ayamase", name: "Add 6 Boiled Eggs", price: 2500 },
    ],
  },
  {
    id: "party-jollof-pot",
    name: "Smokey Nigerian Party Jollof",
    category: "Rice & Pasta",
    description: "The pride of Port Harcourt: Authentic firewood-smokey jollof rice made with rich stock, aromatic spices, and natural tomato puree.",
    image: "/images/rice-combo-plate.webp",
    leadTime: "Same day & Pre-order available",
    sizes: [
      { sizeLabel: "1.5L", price: 16000, servingsEstimate: "4–5 servings" },
      { sizeLabel: "2L", price: 20000, servingsEstimate: "6–8 servings" },
      { sizeLabel: "3L", price: 28000, servingsEstimate: "10–13 servings" },
      { sizeLabel: "4L", price: 38000, servingsEstimate: "14–18 servings" },
    ],
    extraAddons: [
      { id: "extra-plantain-dodo", name: "Add Fried Sweet Plantain Tray", price: 3000 },
      { id: "extra-coleslaw", name: "Add Creamy Coleslaw Bowl", price: 3000 },
    ],
  },
  {
    id: "special-fried-rice",
    name: "Gourmet Special Fried Rice",
    category: "Rice & Pasta",
    description: "Fragrant rice tossed in sweet corn, carrots, green beans, liver bits, and seasoned with Chef So'z secret herbal stock.",
    image: "/images/rice-combo-plate.webp",
    leadTime: "Same day & Pre-order available",
    sizes: [
      { sizeLabel: "1.5L", price: 18000, servingsEstimate: "4–5 servings" },
      { sizeLabel: "2L", price: 22000, servingsEstimate: "6–8 servings" },
      { sizeLabel: "3L", price: 32000, servingsEstimate: "10–13 servings" },
      { sizeLabel: "4L", price: 42000, servingsEstimate: "14–18 servings" },
    ],
    extraAddons: [
      { id: "extra-shrimps-fried-rice", name: "Add Sauteed Shrimps Mix", price: 4500 },
      { id: "extra-plantain-fried-rice", name: "Add Fried Plantain", price: 3000 },
    ],
  },
  {
    id: "native-seafood-pasta",
    name: "Creamy Native Seafood Pasta",
    category: "Rice & Pasta",
    description: "Silky pasta ribbons infused with coastal spices, prawns, calamari rings, fish flakes, and subtle scotch bonnet warmth.",
    image: "/images/box-of-fries.webp",
    leadTime: "Requires 24hrs Pre-Order",
    isPremiumSeafood: true,
    sizes: [
      { sizeLabel: "1.5L", price: 22000, servingsEstimate: "3–5 servings" },
      { sizeLabel: "2L", price: 28000, servingsEstimate: "5–7 servings" },
      { sizeLabel: "3L", price: 40000, servingsEstimate: "8–11 servings" },
      { sizeLabel: "4L", price: 54000, servingsEstimate: "12–16 servings" },
    ],
    extraAddons: [
      { id: "extra-pasta-cheese", name: "Extra Melted Cheese & Prawns", price: 5000 },
    ],
  },
];

// Custom Small Chops Stepper Pieces
export const CUSTOM_SMALL_CHOPS_ITEMS: SmallChopsUnit[] = [
  {
    id: "puff-puff",
    name: "Golden Puff-Puff",
    description: "Fluffy, sweet fermented dough fried to golden perfection.",
    unitPrice: 150,
    minQty: 10,
    step: 5,
    image: "/images/box-of-chops.webp",
  },
  {
    id: "samosa",
    name: "Crispy Beef Samosa",
    description: "Crispy triangle pastry filled with seasoned minced beef and veggies.",
    unitPrice: 400,
    minQty: 5,
    step: 5,
    image: "/images/box-of-chops.webp",
  },
  {
    id: "spring-roll",
    name: "Crunchy Spring Roll",
    description: "Golden wrapped pastry roll stuffed with seasoned cabbage and chicken.",
    unitPrice: 400,
    minQty: 5,
    step: 5,
    image: "/images/box-of-chops.webp",
  },
  {
    id: "peppered-chicken",
    name: "Peppered Chicken Cut",
    description: "Juicy, flame-seared chicken cutlet drenched in spicy pepper sauce.",
    unitPrice: 1200,
    minQty: 2,
    step: 1,
    image: "/images/box-of-chops.webp",
  },
  {
    id: "peppered-turkey",
    name: "Peppered Turkey Cut",
    description: "Meaty roasted turkey cut tossed in sweet and fiery scotch bonnet sauce.",
    unitPrice: 2000,
    minQty: 2,
    step: 1,
    image: "/images/box-of-chops.webp",
  },
  {
    id: "corn-dog",
    name: "Chef So'z Corn Dog",
    description: "Savory hot dog sausage coated in thick sweet cornmeal batter and fried crisp.",
    unitPrice: 1500,
    minQty: 2,
    step: 1,
    image: "/images/box-of-chops.webp",
  },
];

// NEW DATA: Private Chef Service Rate Card ("Private Chef Service — Naija to Gourmet by Chef Soz")
export const PRIVATE_CHEF_RATES: PrivateChefTier[] = [
  {
    id: "daily-2",
    title: "Daily Service (Family of 2)",
    category: "One-Off",
    frequency: "Daily • Single Booking",
    price: 50000,
    priceFormatted: "₦50,000",
    description: "Dedicated in-home private cooking session customized for a couple or small family of 2.",
    recommendedFor: "Date Nights, In-Home Anniversaries, Special Dinners",
  },
  {
    id: "weekly-2x",
    title: "Twice a Week (One-Off)",
    category: "One-Off",
    frequency: "2 Days in a Week",
    price: 100000,
    priceFormatted: "₦100,000",
    description: "Two dedicated cooking sessions in a single week to stock your fridge with fresh gourmet meals.",
    recommendedFor: "Busy Executives & Families needing meal prep",
  },
  {
    id: "weekly-3x",
    title: "Thrice a Week (One-Off)",
    category: "One-Off",
    frequency: "3 Days in a Week",
    price: 150000,
    priceFormatted: "₦150,000",
    description: "Three tailored culinary visits in a single week covering multi-course breakfasts, lunches, and dinners.",
    recommendedFor: "Gourmet meal prep & hosting guests",
  },
  {
    id: "monthly-2x",
    title: "Twice a Week (Monthly Plan)",
    category: "Monthly",
    frequency: "2 Days Weekly • 8 Visits / Month",
    price: 250000,
    priceFormatted: "₦250,000",
    description: "Monthly retainer with 2 scheduled chef visits per week. Fresh home-cooked pots every week.",
    recommendedFor: "Consistent luxury home dining & stress-free kitchens",
  },
  {
    id: "monthly-3x",
    title: "Thrice a Week (Monthly Plan)",
    category: "Monthly",
    frequency: "3 Days Weekly • 12 Visits / Month",
    price: 300000,
    priceFormatted: "₦300,000",
    description: "Monthly retainer with 3 scheduled chef visits per week. High-variety gourmet rotation.",
    recommendedFor: "Families desiring full-spectrum home chef service",
  },
  {
    id: "monthly-4x",
    title: "4 Times a Week (Monthly Plan)",
    category: "Monthly",
    frequency: "4 Days Weekly • 16 Visits / Month",
    price: 350000,
    priceFormatted: "₦350,000",
    description: "Comprehensive monthly package with 4 chef visits every week. Complete kitchen takeover.",
    recommendedFor: "VIP residences, expat homes & large families",
  },
];

export const PRIVATE_CHEF_TERMS = [
  "50% initial deposit required to confirm booking; balance paid upon completion.",
  "Maximum of 7 hours per day service.",
  "Ingredients aren't included (client provides or books grocery shopping).",
  "Extra hours: ₦15,000 per hour (stepper 0 to 5 hours).",
  "Grocery shopping service: ₦20,000 per market visit.",
];

// Royal Cravings Surprise Box Packages
export const SURPRISE_BOX_PACKAGES: SurpriseBoxPackage[] = [
  {
    id: "surprise-silver",
    tierName: "Silver Cravings Package",
    tagline: "Thoughtful & Delicious Birthday or Anniversary Surprise",
    basePrice: 35000,
    image: "/images/box-of-chops.webp",
    includes: [
      "Mini Chops Box (20 Puffs, 4 Samosas, 4 Spring Rolls)",
      "2 Peppered Chicken Cuts",
      "Celebration Cupcake / Mini Bento Treat",
      "Personalized Handwritten Calligraphy Note",
      "Luxury Obsidian & Gold Presentation Box",
    ],
    recommendedFor: "Birthdays, Appreciation Gifts, Sweet Romances",
  },
  {
    id: "surprise-gold",
    tierName: "Gold Majesty Package",
    tagline: "Our Best-Selling Royal Treat for Celebrations",
    basePrice: 65000,
    image: "/images/box-of-fries.webp",
    includes: [
      "The Odogwu Small Chops Box (35 Puffs, 8 Samosas, 8 Spring Rolls, 4 Turkey Cuts)",
      "1 Bottle of Premium Non-Alcoholic Wine / Sparkling Cider",
      "Custom Engraved Acrylic Keepsake / Photo Frame",
      "Celebration Balloon Bunch",
      "Gold Satin Bow Ribbon & Luxury Box Setup",
    ],
    recommendedFor: "Milestone Birthdays, Promotions, Anniversaries",
  },
  {
    id: "surprise-diamond",
    tierName: "Diamond Empress Package",
    tagline: "The Ultimate VIP In-Home Surprise Experience",
    basePrice: 115000,
    image: "/images/rice-combo-plate.webp",
    includes: [
      "Gourmet Food Tray (Smokey Jollof + Fried Rice + Peppered Turkey + Small Chops)",
      "Premium Imported Champagne / Sparkling Wine",
      "Fresh Velvet Rose Bouquet (6 Stems)",
      "Customized Framed Portrait of Celebrant",
      "Helium Floating Birthday / Love Balloons (3 pcs)",
      "Surprise Doorstep Delivery Serenade Coordinator",
    ],
    recommendedFor: "Proposals, Weddings, Milestone Jubilees, VIP Spouses",
  },
];

export const SURPRISE_ADDONS: SurpriseAddon[] = [
  { id: "addon-wine", name: "Chilled Sparkling Wine / Cider", price: 8000, category: "Drink" },
  { id: "addon-flowers", name: "Fresh Velvet Red Roses Bouquet", price: 12000, category: "Flower" },
  { id: "addon-frame", name: "Customized Photo Frame (A4)", price: 7000, category: "Keepsake" },
  { id: "addon-balloons", name: "Helium Foil Celebration Balloons (3 pcs)", price: 6000, category: "Keepsake" },
  { id: "addon-cake", name: "4-Inch Mini Gourmet Buttercream Bento Cake", price: 10000, category: "Bakery" },
  { id: "addon-card", name: "Luxury Wax-Sealed Calligraphy Card", price: 0, category: "Keepsake" },
];

export const PH_DELIVERY_ZONES: DeliveryZone[] = [
  { id: "eneka", areaName: "Eneka / Rukpokwu / Eliozu (Kitchen Home Zone)", fee: 1500, estimatedWindow: "20–35 mins" },
  { id: "gra", areaName: "GRA Phase 1, 2 & 3 / Old GRA", fee: 2500, estimatedWindow: "35–50 mins" },
  { id: "peter-odili", areaName: "Peter Odili / Trans-Amadi / Woji / Elelenwo", fee: 2500, estimatedWindow: "30–45 mins" },
  { id: "rumuola", areaName: "Rumuola / Rumuokwuta / Artillery / Rumuomasi", fee: 2200, estimatedWindow: "25–45 mins" },
  { id: "ada-george", areaName: "Ada George / Mgbuoba / Location", fee: 2800, estimatedWindow: "35–55 mins" },
  { id: "choba", areaName: "Choba / Uniport / Alakahia", fee: 3000, estimatedWindow: "40–60 mins" },
  { id: "pickup-eneka", areaName: "Self-Pickup (Eneka Kitchen, Port Harcourt)", fee: 0, estimatedWindow: "Ready at scheduled time" },
];

// Featured Signatures for Section 5 (OfferCarousel)
export const SOZ_SIGNATURE_OFFERS = [
  {
    id: "sig-box-of-chops",
    imageSrc: "/images/box-of-chops.webp",
    imageAlt: "Official Box of Chops",
    tag: "TUE • THU • SAT SPECIAL",
    title: "Box of Chops (Odogwu Pack)",
    price: "₦35,000",
    numericPrice: 35000,
    description: "35 golden puffs, 8 samosas, 8 spring rolls & 4 peppered turkey cuts in official luxury packaging.",
    brandName: "Chef So'z",
    promoCode: "Quick Add",
    isQuickAdd: true,
  },
  {
    id: "sig-box-of-fries",
    imageSrc: "/images/box-of-fries.webp",
    imageAlt: "Box of Fries with Snails & Prawns",
    tag: "NEW FLYER RELEASE",
    title: "Box of Fries with Snails & Prawns",
    price: "₦35,000",
    numericPrice: 35000,
    description: "15 pcs fried yam, 15 pcs potatoes, 15 pcs plantain, 4 peppered snails & 5 jumbo prawns.",
    brandName: "Chef So'z",
    promoCode: "Customize",
    targetConfigurator: "box-of-fries",
  },
  {
    id: "sig-rice-combo-option-2",
    imageSrc: "/images/rice-combo-plate.webp",
    imageAlt: "Two Types of Rice with Moi Moi",
    tag: "EVERYDAY HIT",
    title: "Rice & Soup Option 2 (with Moi Moi)",
    price: "₦12,000",
    numericPrice: 12000,
    description: "Two types of rice (Jollof & Fried), rich leaf-wrapped Moi Moi, salad, and choice of protein.",
    brandName: "Chef So'z",
    promoCode: "Customize",
    targetConfigurator: "rice-soup-plates",
  },
  {
    id: "sig-single-soup-bowl",
    imageSrc: "/images/single-soup-bowl.webp",
    imageAlt: "Loaded Single Soup Bowl",
    tag: "FRESH HOT BOWL",
    title: "Single Soup Bowl (Any Classic Soup)",
    price: "₦7,000",
    numericPrice: 7000,
    description: "Egusi, Afang, Banga, Okro, Ogbono, Oha or Okazi hot bowl with assorted beef and fish.",
    brandName: "Chef So'z",
    promoCode: "Customize",
    targetConfigurator: "rice-soup-plates",
  },
  {
    id: "sig-private-chef",
    imageSrc: "/images/chef-sonia-portrait.webp",
    imageAlt: "Chef Sonia Private Dining",
    tag: "NAIJA TO GOURMET",
    title: "Private Chef In-Home Dining",
    price: "From ₦50,000",
    numericPrice: 50000,
    description: "Chef Sonia brings gourmet in-home culinary magic to your family kitchen or VIP event.",
    brandName: "Chef So'z",
    promoCode: "Book Chef",
    targetConfigurator: "event-catering",
  },
];
