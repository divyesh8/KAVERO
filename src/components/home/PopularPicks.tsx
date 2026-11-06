"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from "lucide-react";
import { SectionReveal } from "@/components/kavero-motion/SectionReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/ui/ProductCard";
import { POPULAR_PRODUCTS, Product } from "@/data/products";

interface PopularPicksProps {
  onAddToCart?: (product: Product) => void;
}

export function PopularPicks({ onAddToCart }: PopularPicksProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const cardWidth = el.querySelector("div")?.clientWidth || 300;
    const scrollAmount = direction === "left" ? -cardWidth * 1.2 : cardWidth * 1.2;
    el.scrollBy({ left: scrollAmount, behavior: "smooth" });
    setTimeout(checkScroll, 350);
  };

  return (
    <SectionReveal>
      <section id="shop" className="relative w-full bg-[#180E09] py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
            <SectionHeading
              eyebrow="Our Signature Coffees"
              title="Popular Picks"
              description="Freshly drum-roasted in small batches from shade-grown estates in Karnataka."
              showBotanicalDivider
              align="left"
              className="md:items-start md:text-left"
            />

            {/* Desktop Carousel Controls & View All Link */}
            <div className="flex items-center gap-4 self-start md:self-end">
              <Link
                href="/shop"
                className="text-xs sm:text-sm font-semibold text-copper-light hover:text-cream-light flex items-center gap-1.5 transition-colors group"
              >
                <span>View Full Collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <div className="hidden sm:flex items-center gap-2">
                <button
                  onClick={() => scroll("left")}
                  type="button"
                  aria-label="Scroll left"
                  disabled={!canScrollLeft}
                  className={`w-9 h-9 rounded-full border border-[#4A3022] bg-[#24160E] flex items-center justify-center transition-all ${
                    canScrollLeft
                      ? "text-cream-light hover:border-copper hover:text-copper active:scale-95 cursor-pointer shadow-lg"
                      : "text-cream-secondary/30 border-[#3D271B]/40 cursor-not-allowed opacity-50"
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button
                  onClick={() => scroll("right")}
                  type="button"
                  aria-label="Scroll right"
                  disabled={!canScrollRight}
                  className={`w-9 h-9 rounded-full border border-[#4A3022] bg-[#24160E] flex items-center justify-center transition-all ${
                    canScrollRight
                      ? "text-cream-light hover:border-copper hover:text-copper active:scale-95 cursor-pointer shadow-lg"
                      : "text-cream-secondary/30 border-[#3D271B]/40 cursor-not-allowed opacity-50"
                  }`}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Smooth Carousel Container */}
          <div
            ref={scrollContainerRef}
            onScroll={checkScroll}
            className="flex gap-5 sm:gap-6 overflow-x-auto pb-4 pt-1 scroll-smooth snap-x snap-mandatory no-scrollbar"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {POPULAR_PRODUCTS.map((product, idx) => (
              <div
                key={product.id}
                className="w-[280px] sm:w-[310px] lg:w-[calc(25%-18px)] shrink-0 snap-start"
              >
                <ProductCard
                  product={product}
                  onAddToCart={onAddToCart}
                  priority={idx < 2}
                />
              </div>
            ))}
          </div>

          {/* Free Shipping Callout Banner below Products */}
          <div className="mt-8 rounded-xl bg-[#22140D] border border-[#3E2619] p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-cream-secondary">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-copper-light shrink-0" />
              <span>
                Enjoy <strong className="text-cream-light font-semibold">Free Pan-India Delivery</strong> on orders above ₹499. Freshly roasted to order.
              </span>
            </div>
            <Link
              href="/shop"
              className="text-copper-light hover:text-cream-light font-semibold underline underline-offset-4 shrink-0"
            >
              Shop All 4 Varieties →
            </Link>
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
