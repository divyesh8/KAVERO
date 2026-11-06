export interface ProductVariant {
  id: string;
  weight: string;
  price: number;
  inStock: boolean;
  sku: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  longDescription: string;
  price: number; // Base price in INR
  compareAtPrice?: number;
  weight: string;
  variants: ProductVariant[];
  image: string;
  gallery: string[];
  alt: string;
  category: "ground" | "beans" | "gift";
  categoryLabel: string;
  roastLevel: "Medium" | "Medium-Dark" | "Dark";
  intensity: number; // 1-5 scale
  tastingNotes: string[];
  origin: string;
  elevation: string;
  process: string;
  composition: string;
  recommendedBrew: string;
  ingredients: string;
  inStock: boolean;
  stockCount: number;
  featured?: boolean;
}

export const POPULAR_PRODUCTS: Product[] = [
  {
    id: "original-filter-coffee",
    slug: "original-filter-coffee",
    name: "Original Filter Coffee",
    subtitle: "Traditional 80:20 Heritage Decoction Blend",
    description: "Classic South Indian filter coffee with a rich, balanced flavour, thick golden crema, and nostalgic aroma.",
    longDescription:
      "Crafted according to century-old Karnataka roasting traditions, our Original Filter Coffee harmonizes shade-grown Arabica and robust highland Robusta with 20% slow-roasted chicory. Designed specifically for the classic brass South Indian filter and dabarah ritual, it yields a dense, velvety first decoction that carries through whole milk with deep caramelized notes.",
    price: 169,
    compareAtPrice: 199,
    weight: "250 g",
    variants: [
      { id: "ofc-250g", weight: "250 g", price: 169, inStock: true, sku: "KAV-OFC-250" },
      { id: "ofc-500g", weight: "500 g", price: 319, inStock: true, sku: "KAV-OFC-500" },
      { id: "ofc-1kg", weight: "1 kg", price: 599, inStock: true, sku: "KAV-OFC-1000" },
    ],
    image: "/images/product-original-filter-coffee.png",
    gallery: [
      "/images/product-original-filter-coffee.png",
      "/images/hero-coffee-tumbler.png",
      "/images/about-kavero-estate.png",
    ],
    alt: "KAVERO Original Filter Coffee Kraft pouch with aroma seal",
    category: "ground",
    categoryLabel: "Filter Coffee",
    roastLevel: "Medium-Dark",
    intensity: 4,
    tastingNotes: ["Dark Cocoa", "Caramelized Jaggery", "Roasted Chicory", "Malted Hazelnut"],
    origin: "Chikmagalur Highlands, Karnataka",
    elevation: "3,800 - 4,200 ft MSL",
    process: "Washed Arabica & Monsooned Robusta",
    composition: "80% Estate Grown Coffee, 20% Roasted Chicory",
    recommendedBrew: "Traditional South Indian Brass Filter & Dabarah",
    ingredients: "80% Shade-Grown Plantation Coffee, 20% Chicory",
    inStock: true,
    stockCount: 140,
    featured: true,
  },
  {
    id: "estate-blend",
    slug: "estate-blend",
    name: "Estate Blend",
    subtitle: "100% Pure Karnataka Highland Coffee",
    description: "A smooth, aromatic pure coffee blend harvested from our high-altitude Karnataka estates with sweet floral undertones.",
    longDescription:
      "For those who cherish pure, unadulterated coffee without chicory. Our Estate Blend is an artisanal cuvée of selective hand-picked Arabica cherries grown beneath the canopies of silver oak, wild fig, and cardamom bushes. Medium roasted to accentuate natural fruit sweetness, honeyed acidity, and a silky, lingering finish.",
    price: 189,
    compareAtPrice: 220,
    weight: "250 g",
    variants: [
      { id: "eb-250g", weight: "250 g", price: 189, inStock: true, sku: "KAV-EB-250" },
      { id: "eb-500g", weight: "500 g", price: 349, inStock: true, sku: "KAV-EB-500" },
      { id: "eb-1kg", weight: "1 kg", price: 649, inStock: true, sku: "KAV-EB-1000" },
    ],
    image: "/images/product-estate-blend.png",
    gallery: [
      "/images/product-estate-blend.png",
      "/images/origin-harvest-highres.jpg",
      "/images/about-kavero-estate.png",
    ],
    alt: "KAVERO Estate Blend premium coffee pouch",
    category: "ground",
    categoryLabel: "Estate Blend",
    roastLevel: "Medium",
    intensity: 3,
    tastingNotes: ["Wild Honey", "Jasmine Blossom", "Citrus Zest", "Stone Fruit"],
    origin: "Baba Budan Giri & Coorg, Karnataka",
    elevation: "4,100 - 4,600 ft MSL",
    process: "Naturally Fermented & Sun-Dried on Raised African Beds",
    composition: "100% Pure Single-Estate Arabica Coffee",
    recommendedBrew: "Filter Press, Aeropress, Moka Pot, or Pour-Over",
    ingredients: "100% Pure Arabica Coffee",
    inStock: true,
    stockCount: 95,
    featured: true,
  },
  {
    id: "bold-roast",
    slug: "bold-roast",
    name: "Bold Roast",
    subtitle: "Dark Roasted 70:30 Intense Morning Wake-Up",
    description: "Deep, intense, smoky and full-bodied for a powerhouse coffee experience that cuts through cold milk or makes fierce black coffee.",
    longDescription:
      "Roasted slow and dark on vintage drum roasters in small batches. Bold Roast features dense, shade-hardened Robusta beans blended with 30% specially toasted French chicory. Packed with robust caffeine punch, heavy syrupy mouthfeel, and a bittersweet dark chocolate profile that stays punchy till the final sip.",
    price: 199,
    compareAtPrice: 230,
    weight: "250 g",
    variants: [
      { id: "br-250g", weight: "250 g", price: 199, inStock: true, sku: "KAV-BR-250" },
      { id: "br-500g", weight: "500 g", price: 369, inStock: true, sku: "KAV-BR-500" },
      { id: "br-1kg", weight: "1 kg", price: 699, inStock: true, sku: "KAV-BR-1000" },
    ],
    image: "/images/product-bold-roast.png",
    gallery: [
      "/images/product-bold-roast.png",
      "/images/hero-coffee-tumbler.png",
      "/images/origin-waterfall-highres.jpg",
    ],
    alt: "KAVERO Bold Roast dark roast coffee pouch",
    category: "ground",
    categoryLabel: "Bold Roast",
    roastLevel: "Dark",
    intensity: 5,
    tastingNotes: ["85% Dark Chocolate", "Toasted Oak", "Smoked Caramel", "Clove Spice"],
    origin: "Coorg South Highlands, Karnataka",
    elevation: "3,600 - 4,000 ft MSL",
    process: "Washed & Drum Roasted",
    composition: "70% Highland Coffee, 30% Specially Roasted Chicory",
    recommendedBrew: "South Indian Filter, Stovetop Moka Pot, Espresso",
    ingredients: "70% Estate Coffee, 30% Roasted Chicory",
    inStock: true,
    stockCount: 80,
    featured: true,
  },
  {
    id: "kavero-gift-pack",
    slug: "kavero-gift-pack",
    name: "KAVERO Gift Pack",
    subtitle: "Estate Trio with Handcrafted Packaging",
    description: "A curated connoisseur selection containing our three iconic coffees (Original, Estate Blend, Bold Roast) in an artisanal gift box.",
    longDescription:
      "The definitive celebration of Karnataka coffee culture. Beautifully boxed with gold-embossed botanical illustrations and tied with a copper-woven ribbon, the KAVERO Gift Pack brings together 250g pouches of Original Filter Coffee, Estate Blend, and Bold Roast. The ideal gift for housewarmings, festive celebrations, and discerning coffee lovers.",
    price: 749,
    compareAtPrice: 850,
    weight: "3 × 250 g",
    variants: [
      { id: "gp-3x250g", weight: "3 × 250 g", price: 749, inStock: true, sku: "KAV-GIFT-TRIO" },
    ],
    image: "/images/product-gift-pack.png",
    gallery: [
      "/images/product-gift-pack.png",
      "/images/about-kavero-estate.png",
      "/images/hero-coffee-tumbler.png",
    ],
    alt: "KAVERO Signature Gift Pack with golden ribbon",
    category: "gift",
    categoryLabel: "Gift Packs",
    roastLevel: "Medium-Dark",
    intensity: 4,
    tastingNotes: ["Assorted Flavor Profile", "Cocoa", "Wild Honey", "Smoky Spice"],
    origin: "Karnataka Highlands, India",
    elevation: "Multi-Altitude Estate Lot",
    process: "Artisan Cuvée Trio",
    composition: "Contains: Original Filter (80:20), Estate Blend (100% Pure), Bold Roast (70:30)",
    recommendedBrew: "Versatile across Traditional Brass Filter, Press, and Moka Pot",
    ingredients: "Fresh Roasted Estate Coffee & Select Chicory",
    inStock: true,
    stockCount: 45,
    featured: true,
  },
];

export function getAllProducts(): Product[] {
  return POPULAR_PRODUCTS;
}

export function getProductBySlug(slug: string): Product | undefined {
  return POPULAR_PRODUCTS.find((p) => p.slug === slug || p.id === slug);
}

export function getRelatedProducts(currentId: string, limit: number = 3): Product[] {
  return POPULAR_PRODUCTS.filter((p) => p.id !== currentId).slice(0, limit);
}
