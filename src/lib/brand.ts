export interface DropdownItem {
  label: string;
  href: string;
  description?: string;
  badge?: string;
}

export interface NavLink {
  label: string;
  href: string;
  hasDropdown?: boolean;
  dropdownItems?: DropdownItem[];
}

export const BRAND = {
  name: "KAVERO",
  fullName: "KAVERO Coffee",
  tagline: "From Our Estate. To Your Everyday.",
  origin: "Karnataka, India",
  est: "2024",
  contact: {
    phone: "+91 80 4748 3920",
    email: "care@kaverocoffee.com",
    address: "Estate Office, Chikmagalur & Coorg Highlands, Karnataka 577101, India",
    hours: "Monday – Saturday, 9:00 AM – 6:00 PM IST",
  },
  social: {
    instagram: "https://instagram.com/kaverocoffee",
    facebook: "https://facebook.com/kaverocoffee",
    youtube: "https://youtube.com/@kaverocoffee",
    linkedin: "https://linkedin.com/company/kaverocoffee",
  },
  announcement: {
    items: [
      "Free Pan-India Shipping on Orders Above ₹499",
      "Freshly Roasted in Small Batches",
      "100% Karnataka Heritage Estate Sourced",
    ],
  },
  shipping: {
    freeThreshold: 499,
    standardFee: 60,
    estimatedDays: "3–5 business days across India",
  },
  navLinks: [
    {
      label: "Shop",
      href: "/shop",
      hasDropdown: true,
      dropdownItems: [
        { label: "All Coffees", href: "/shop", description: "Browse our entire Karnataka estate range" },
        { label: "Original Filter Coffee (80:20)", href: "/shop/original-filter-coffee", description: "Classic brass filter blend with roasted chicory", badge: "Bestseller" },
        { label: "Estate Blend (100% Pure)", href: "/shop/estate-blend", description: "Pure highland Arabica without chicory" },
        { label: "Bold Roast (70:30)", href: "/shop/bold-roast", description: "Deep dark roast for intense morning brews" },
        { label: "KAVERO Gift Pack", href: "/shop/kavero-gift-pack", description: "Curated 3-pack connoisseur gift box", badge: "Gift" },
      ],
    },
    { label: "Our Story", href: "/our-story", hasDropdown: false },
    { label: "Our Estates", href: "/our-estates", hasDropdown: false },
    { label: "Brew Guide", href: "/brew-guide", hasDropdown: false },
    {
      label: "Coffee Finder",
      href: "/coffee-finder",
      hasDropdown: false,
    },
    { label: "Reviews", href: "/#reviews", hasDropdown: false },
    { label: "Contact", href: "/contact", hasDropdown: false },
  ] as NavLink[],
  trustFeatures: [
    {
      id: "estate-grown",
      title: "Estate-Grown",
      subtitle: "in Karnataka",
      icon: "mountain",
      description: "Direct from single-origin shade plantations in Chikmagalur & Coorg.",
    },
    {
      id: "farmer-owned",
      title: "Farmer-Owned",
      subtitle: "& Community Driven",
      icon: "users",
      description: "Direct trade eliminating middle-men, empowering local grower families.",
    },
    {
      id: "rich-south-indian",
      title: "Rich South Indian",
      subtitle: "Filter Coffee",
      icon: "coffee",
      description: "Formulated for thick first decoctions and the iconic tumbler froth.",
    },
    {
      id: "freshly-roasted",
      title: "Freshly Roasted",
      subtitle: "Direct from Farm",
      icon: "beans",
      description: "Small-batch drum roasted and packed at source with one-way aroma valves.",
    },
  ],
  aboutValues: [
    "Single-Estate Sourced Beans from Western Ghats",
    "Slow Drum-Roasted to Preserve Natural Aromatics",
    "Traditional South Indian Brass Filter Decoction Craft",
    "Fair Trade Remuneration Directly Supporting Growers",
  ],
  footerLinks: {
    shop: [
      { label: "All Coffees", href: "/shop" },
      { label: "Original Filter Coffee (₹169)", href: "/shop/original-filter-coffee" },
      { label: "Estate Blend (₹189)", href: "/shop/estate-blend" },
      { label: "Bold Roast (₹199)", href: "/shop/bold-roast" },
      { label: "KAVERO Gift Pack (₹749)", href: "/shop/kavero-gift-pack" },
    ],
    learn: [
      { label: "Our Story", href: "/our-story" },
      { label: "Our Karnataka Estates", href: "/our-estates" },
      { label: "Filter Coffee Brew Guide", href: "/brew-guide" },
      { label: "Find Your Coffee Quiz", href: "/coffee-finder" },
      { label: "Customer Reviews", href: "/#reviews" },
    ],
    support: [
      { label: "FAQs & Help Center", href: "/faq" },
      { label: "Shipping & Delivery Policy", href: "/shipping" },
      { label: "Returns & Refund Policy", href: "/returns" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Track Your Order", href: "/order/track" },
    ],
  },
} as const;
