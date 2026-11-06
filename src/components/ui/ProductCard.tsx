"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Check } from "lucide-react";
import { Product } from "@/data/products";
import { ProductTilt } from "@/components/kavero-motion/ProductTilt";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  priority?: boolean;
}

export function ProductCard({ product, onAddToCart, priority = false }: ProductCardProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, { quantity: 1 });
    if (onAddToCart) {
      onAddToCart(product);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div className="bg-[#24160E] border border-[#3E2619] rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 hover:border-copper/70 hover:shadow-luxury group relative overflow-hidden">
      {/* Category / Intensity Pill */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded-full bg-[#180E09] border border-[#3E2619] text-copper-light font-medium">
          {product.categoryLabel}
        </span>
        <span className="text-[10px] text-cream-secondary/70 font-mono">
          Roast {product.intensity}/5
        </span>
      </div>

      {/* Product Image Media Container wrapped in Motion ProductTilt */}
      <Link
        href={`/shop/${product.slug}`}
        draggable={false}
        onDragStart={(e) => e.preventDefault()}
        className="block relative w-full aspect-[4/5] max-h-52 sm:max-h-56 flex items-center justify-center my-2 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-copper rounded-xl select-none"
        aria-label={`View details for ${product.name}`}
      >
        <ProductTilt className="w-full h-full flex items-center justify-center" ariaLabel={product.name}>
          <div className="relative w-full h-full flex items-center justify-center p-2">
            <Image
              src={product.image}
              alt={product.alt}
              width={200}
              height={220}
              priority={priority}
              draggable={false}
              onDragStart={(e) => e.preventDefault()}
              onContextMenu={(e) => e.preventDefault()}
              className="h-full w-auto object-contain transition-transform duration-500 ease-out group-hover:scale-105 filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)] kavero-nondraggable-image"
            />
          </div>
        </ProductTilt>
      </Link>

      {/* Product Details */}
      <div className="flex flex-col flex-1 mt-2">
        <Link href={`/shop/${product.slug}`} className="group/title focus:outline-none">
          <h3 className="font-serif text-base sm:text-lg font-medium text-cream-light leading-snug group-hover/title:text-copper-light transition-colors">
            {product.name}
          </h3>
        </Link>

        <p className="text-xs text-cream-secondary/85 leading-relaxed mt-1 mb-2 line-clamp-2 font-light">
          {product.description}
        </p>

        {/* Tasting Notes Tags */}
        <div className="flex flex-wrap gap-1 mt-auto mb-3">
          {product.tastingNotes.slice(0, 2).map((note) => (
            <span
              key={note}
              className="text-[10px] text-cream-secondary/80 bg-[#1E120B] px-2 py-0.5 rounded border border-[#3E2619]/60 font-light"
            >
              {note}
            </span>
          ))}
        </div>
      </div>

      {/* Price & Action Row */}
      <div className="flex items-center justify-between pt-3 border-t border-[#3D271B]/50 mt-auto">
        <div className="flex items-baseline gap-1.5">
          <span className="font-sans font-semibold text-base sm:text-lg text-cream-light">
            ₹{product.price}
          </span>
          {product.compareAtPrice && (
            <span className="text-xs text-cream-secondary/50 line-through">
              ₹{product.compareAtPrice}
            </span>
          )}
          <span className="text-xs text-cream-secondary/70 font-light">
            ({product.weight})
          </span>
        </div>

        <button
          onClick={handleQuickAdd}
          type="button"
          aria-label={`Quick add ${product.name} to cart`}
          className={`h-9 px-3 rounded-xl border flex items-center gap-1.5 transition-all duration-200 text-xs font-semibold focus:outline-none focus-visible:ring-1 focus-visible:ring-copper cursor-pointer ${
            added
              ? "bg-forest border-forest-light text-cream-light"
              : "bg-[#1E120B] border-copper/60 text-copper-light hover:bg-copper hover:text-white shadow-copper"
          }`}
        >
          {added ? (
            <>
              <Check className="w-3.5 h-3.5 animate-in fade-in" />
              <span>Added</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-3.5 h-3.5 stroke-[1.8]" />
              <span>Add</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
