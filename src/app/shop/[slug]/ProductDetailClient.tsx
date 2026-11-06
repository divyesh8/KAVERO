"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShoppingBag,
  Check,
  Truck,
  ShieldCheck,
  Sparkles,
  Flame,
  Coffee,
  Plus,
  Minus,
  Maximize2,
  X,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { Product, ProductVariant } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { ProductCard } from "@/components/ui/ProductCard";

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
  const router = useRouter();
  const { addItem } = useCart();

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants[0] || {
      id: "default",
      weight: product.weight,
      price: product.price,
      inStock: true,
      sku: product.id,
    }
  );

  const [selectedGrind, setSelectedGrind] = useState<"fine-filter" | "whole-beans" | "medium-press">(
    "fine-filter"
  );
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(product.image);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addItem(product, {
      variant: selectedVariant,
      quantity,
      grind: selectedGrind,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addItem(product, {
      variant: selectedVariant,
      quantity,
      grind: selectedGrind,
    });
    router.push("/checkout");
  };

  const grindOptions = [
    { id: "fine-filter", label: "Fine Filter Grind", desc: "For traditional South Indian brass filter" },
    { id: "whole-beans", label: "Whole Roasted Beans", desc: "For fresh grinding at home" },
    { id: "medium-press", label: "Medium Grind", desc: "For French Press, Moka Pot & Aeropress" },
  ] as const;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-cream-secondary/70 mb-8 font-light">
        <Link href="/" className="hover:text-cream-light transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/shop" className="hover:text-cream-light transition-colors">Shop</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-copper-light font-medium">{product.name}</span>
      </nav>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Column: Product Gallery */}
        <div className="lg:col-span-6 space-y-4">
          {/* Main Visual Box */}
          <div className="relative w-full aspect-square max-h-[520px] rounded-2xl bg-[#1F120B] border border-[#3E2619] p-6 sm:p-8 flex items-center justify-center overflow-hidden shadow-luxury group">
            <div className="relative w-full h-full flex items-center justify-center select-none">
              <Image
                src={activeImage}
                alt={product.alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 550px"
                draggable={false}
                onDragStart={(e) => e.preventDefault()}
                onContextMenu={(e) => e.preventDefault()}
                className="object-contain filter drop-shadow-[0_16px_36px_rgba(0,0,0,0.7)] transition-transform duration-500 group-hover:scale-105 kavero-nondraggable-image"
              />
            </div>

            {/* Enlarge Zoom Button */}
            <button
              onClick={() => setIsZoomOpen(true)}
              type="button"
              aria-label="Enlarge product image"
              className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-[#140D09]/80 border border-[#3E2619] text-cream-secondary hover:text-cream-light hover:border-copper flex items-center justify-center transition-all cursor-pointer backdrop-blur-sm shadow-md"
            >
              <Maximize2 className="w-4 h-4" />
            </button>

            {/* Intensity Pill */}
            <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-[#140D09]/90 border border-[#3E2619] px-3 py-1.5 rounded-full text-[11px] text-cream-light font-mono">
              <Flame className="w-3.5 h-3.5 text-copper-light" />
              <span>Roast Intensity: {product.intensity}/5</span>
            </div>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3 overflow-x-auto pb-2">
            {product.gallery.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(img)}
                type="button"
                className={`relative w-20 h-20 rounded-xl bg-[#1F120B] border p-2 shrink-0 transition-all cursor-pointer ${
                  activeImage === img
                    ? "border-copper ring-2 ring-copper/40 shadow-copper"
                    : "border-[#3E2619] opacity-70 hover:opacity-100"
                }`}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  sizes="80px"
                  draggable={false}
                  onDragStart={(e) => e.preventDefault()}
                  className="object-contain p-1 kavero-nondraggable-image"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Product Purchasing & Specs */}
        <div className="lg:col-span-6 space-y-6">
          {/* Eyebrow & Titles */}
          <div className="space-y-2 border-b border-[#3E2619]/60 pb-5">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-mono tracking-widest text-copper-light font-semibold">
                {product.categoryLabel}
              </span>
              <span className="text-cream-secondary/40">•</span>
              <span className="text-xs text-forest-light font-medium flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                In Stock & Freshly Roasted
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl text-cream-light font-normal tracking-tight">
              {product.name}
            </h1>
            <p className="text-xs sm:text-sm text-copper-light/90 font-medium">
              {product.subtitle}
            </p>

            {/* Price Display */}
            <div className="flex items-baseline gap-3 pt-2">
              <span className="font-sans font-bold text-3xl sm:text-4xl text-cream-light">
                ₹{selectedVariant.price}
              </span>
              {product.compareAtPrice && (
                <span className="text-sm text-cream-secondary/50 line-through">
                  ₹{Math.round(product.compareAtPrice * (selectedVariant.price / product.price))}
                </span>
              )}
              <span className="text-xs text-cream-secondary/70">
                Inclusive of all taxes ({selectedVariant.weight})
              </span>
            </div>
          </div>

          {/* Tasting Notes */}
          <div className="space-y-2">
            <span className="text-xs uppercase font-mono tracking-wider text-cream-secondary/80 font-medium block">
              Tasting Profile
            </span>
            <div className="flex flex-wrap gap-2">
              {product.tastingNotes.map((note) => (
                <span
                  key={note}
                  className="px-3 py-1 rounded-lg bg-[#24160E] border border-[#3E2619] text-xs text-cream-light font-medium"
                >
                  {note}
                </span>
              ))}
            </div>
          </div>

          {/* Size / Weight Variant Selector */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="uppercase font-mono tracking-wider text-cream-secondary/80 font-medium">
                Select Package Size
              </span>
              <span className="text-copper-light font-mono text-[11px]">
                {selectedVariant.sku}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {product.variants.map((variant) => (
                <button
                  key={variant.id}
                  type="button"
                  onClick={() => setSelectedVariant(variant)}
                  className={`py-2.5 px-3 rounded-xl border text-center transition-all cursor-pointer ${
                    selectedVariant.id === variant.id
                      ? "bg-copper/20 border-copper text-cream-light ring-1 ring-copper"
                      : "bg-[#1E120B] border-[#3E2619] text-cream-secondary hover:text-cream-light hover:border-copper/60"
                  }`}
                >
                  <div className="text-xs font-semibold">{variant.weight}</div>
                  <div className="text-[11px] text-copper-light font-mono">₹{variant.price}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Grind Selector */}
          <div className="space-y-2">
            <span className="text-xs uppercase font-mono tracking-wider text-cream-secondary/80 font-medium block">
              Select Grind Style
            </span>
            <div className="space-y-2">
              {grindOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSelectedGrind(opt.id)}
                  className={`w-full p-3 rounded-xl border flex items-center justify-between transition-all cursor-pointer text-left ${
                    selectedGrind === opt.id
                      ? "bg-copper/15 border-copper text-cream-light ring-1 ring-copper/70"
                      : "bg-[#1E120B] border-[#3E2619] text-cream-secondary hover:text-cream-light hover:border-copper/50"
                  }`}
                >
                  <div>
                    <div className="text-xs font-semibold text-cream-light">{opt.label}</div>
                    <div className="text-[11px] text-cream-secondary/70 font-light">{opt.desc}</div>
                  </div>
                  {selectedGrind === opt.id && (
                    <span className="w-5 h-5 rounded-full bg-copper text-white flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 stroke-[2.5]" />
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity & CTAs */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-4">
              {/* Quantity Counter */}
              <div className="flex items-center border border-[#3E2619] rounded-xl bg-[#1E120B] overflow-hidden h-12">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="w-10 h-full flex items-center justify-center text-cream-secondary hover:text-cream-light hover:bg-[#25170F] transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-10 text-center font-mono text-sm font-semibold text-cream-light">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase quantity"
                  className="w-10 h-full flex items-center justify-center text-cream-secondary hover:text-cream-light hover:bg-[#25170F] transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 bg-copper hover:bg-copper-hover active:scale-[0.99] text-[#FFF7EA] text-sm font-semibold h-12 rounded-xl transition-all flex items-center justify-center gap-2 shadow-copper cursor-pointer"
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart • ₹{selectedVariant.price * quantity}</span>
                  </>
                )}
              </button>
            </div>

            {/* Buy Now Direct Button */}
            <button
              type="button"
              onClick={handleBuyNow}
              className="w-full bg-[#25170F] hover:bg-[#2D1B12] border border-copper/60 text-copper-light hover:text-white text-xs sm:text-sm font-semibold h-11 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <span>Instant Buy Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Shipping & Authenticity Badges */}
          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#3E2619]/60 text-[11px] text-cream-secondary/80">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-copper-light shrink-0" />
              <span>Free Pan-India Delivery over ₹499</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-forest-light shrink-0" />
              <span>100% Karnataka Single Estate</span>
            </div>
          </div>
        </div>
      </div>

      {/* Editorial Story & Specifications Grid */}
      <div className="mt-16 sm:mt-24 pt-12 border-t border-[#3E2619]/60">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Detailed Story & Brewing Guide */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <span className="font-script text-copper-light text-2xl tracking-wide select-none">
                Estate Chronicle
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-cream-light font-normal">
                The Heritage Behind {product.name}
              </h2>
              <p className="text-xs sm:text-sm text-cream-secondary/90 leading-relaxed font-light">
                {product.longDescription}
              </p>
            </div>

            {/* Brewing Ritual Box */}
            <div className="bg-[#1F120B] border border-[#3E2619] rounded-2xl p-6 sm:p-7 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-copper/15 border border-copper/40 flex items-center justify-center text-copper-light">
                  <Coffee className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-copper-light font-medium block">
                    Recommended Preparation
                  </span>
                  <h3 className="font-serif text-lg text-cream-light font-medium">
                    Traditional Brass Filter Decoction
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
                <div className="p-3 bg-[#160D08] rounded-xl border border-[#3E2619]">
                  <span className="text-copper-light font-semibold block mb-1">1. The Dose</span>
                  <span className="text-cream-secondary/80 font-light">
                    Add 2.5 tablespoons of coffee powder into the upper filter compartment.
                  </span>
                </div>
                <div className="p-3 bg-[#160D08] rounded-xl border border-[#3E2619]">
                  <span className="text-copper-light font-semibold block mb-1">2. Hot Water</span>
                  <span className="text-cream-secondary/80 font-light">
                    Gently press with the tamper disk. Pour 100ml freshly boiled water (95°C).
                  </span>
                </div>
                <div className="p-3 bg-[#160D08] rounded-xl border border-[#3E2619]">
                  <span className="text-copper-light font-semibold block mb-1">3. The Froth</span>
                  <span className="text-cream-secondary/80 font-light">
                    Percolate 12–15 mins. Mix 1 part decoction with 2 parts frothed whole milk.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Specifications Table */}
          <div className="lg:col-span-5 bg-[#1F120B] border border-[#3E2619] rounded-2xl p-6 sm:p-7 space-y-4 self-start">
            <h3 className="font-serif text-lg text-cream-light font-medium pb-2 border-b border-[#3E2619]">
              Product Specifications
            </h3>

            <dl className="space-y-3 text-xs divide-y divide-[#3E2619]/40">
              <div className="pt-2 flex justify-between">
                <dt className="text-cream-secondary/70">Origin</dt>
                <dd className="text-cream-light font-medium text-right">{product.origin}</dd>
              </div>
              <div className="pt-2 flex justify-between">
                <dt className="text-cream-secondary/70">Elevation</dt>
                <dd className="text-cream-light font-medium text-right">{product.elevation}</dd>
              </div>
              <div className="pt-2 flex justify-between">
                <dt className="text-cream-secondary/70">Processing</dt>
                <dd className="text-cream-light font-medium text-right">{product.process}</dd>
              </div>
              <div className="pt-2 flex justify-between">
                <dt className="text-cream-secondary/70">Composition</dt>
                <dd className="text-cream-light font-medium text-right">{product.composition}</dd>
              </div>
              <div className="pt-2 flex justify-between">
                <dt className="text-cream-secondary/70">Ingredients</dt>
                <dd className="text-cream-light font-medium text-right">{product.ingredients}</dd>
              </div>
              <div className="pt-2 flex justify-between">
                <dt className="text-cream-secondary/70">Best Before</dt>
                <dd className="text-cream-light font-medium text-right">9 Months from Roasting Date</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* Related Products Carousel */}
      {relatedProducts.length > 0 && (
        <div className="mt-20 pt-12 border-t border-[#3E2619]/60 space-y-8">
          <div className="flex items-end justify-between">
            <div>
              <span className="font-script text-copper-light text-2xl tracking-wide select-none">
                More From Our Estates
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-cream-light font-normal">
                You May Also Enjoy
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-xs font-semibold text-copper-light hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

      {/* Enlarged Image Modal */}
      {isZoomOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md animate-in fade-in"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative max-w-3xl w-full aspect-square max-h-[85vh] flex items-center justify-center">
            <button
              onClick={() => setIsZoomOpen(false)}
              type="button"
              aria-label="Close enlarged preview"
              className="absolute top-2 right-2 z-10 w-10 h-10 rounded-full bg-[#1A1009]/90 border border-[#3E2619] text-cream-light flex items-center justify-center hover:text-copper transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <Image
              src={activeImage}
              alt={product.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 800px"
              draggable={false}
              onDragStart={(e) => e.preventDefault()}
              onContextMenu={(e) => e.preventDefault()}
              className="object-contain p-4 kavero-nondraggable-image"
            />
          </div>
        </div>
      )}
    </div>
  );
}
