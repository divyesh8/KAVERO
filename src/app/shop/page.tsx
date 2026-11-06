"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search, Sparkles, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/ui/ProductCard";
import { POPULAR_PRODUCTS } from "@/data/products";

function ShopContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedRoast, setSelectedRoast] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "intensity">("featured");
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  const categories = [
    { id: "all", label: "All Coffees" },
    { id: "ground", label: "Ground & Blends" },
    { id: "gift", label: "Gift Packs" },
  ];

  const filteredProducts = useMemo(() => {
    return POPULAR_PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== "all" && product.category !== selectedCategory) {
        return false;
      }
      // Roast filter
      if (selectedRoast !== "all" && product.roastLevel !== selectedRoast) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesDesc = product.description.toLowerCase().includes(q);
        const matchesTasting = product.tastingNotes.some((t) => t.toLowerCase().includes(q));
        const matchesOrigin = product.origin.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesTasting && !matchesOrigin) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "intensity") return b.intensity - a.intensity;
      return 0; // featured default
    });
  }, [selectedCategory, selectedRoast, sortBy, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Editorial Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
        <span className="font-script text-copper-light text-2xl sm:text-3xl tracking-wide select-none">
          Estate Collection
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-cream-light font-normal tracking-tight">
          Karnataka Estate Coffees
        </h1>
        <p className="text-xs sm:text-sm text-cream-secondary/90 font-light leading-relaxed">
          From classic South Indian brass filter decoctions to pure single-estate Arabicas.
          Drum-roasted fresh in small batches and dispatched in one-way valve aroma pouches.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-[#1F120B] border border-[#3E2619] rounded-2xl p-4 sm:p-5 mb-10 shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-copper text-white shadow-copper"
                    : "bg-[#25170F] text-cream-secondary hover:text-cream-light border border-[#3E2619]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Controls: Search, Roast Filter & Sort */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-56">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-copper-light" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search coffee or notes..."
                className="w-full bg-[#160D08] border border-[#3E2619] rounded-xl pl-8 pr-3 py-1.5 text-xs text-cream-light placeholder:text-cream-secondary/50 focus:outline-none focus:border-copper"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-cream-secondary/60 hover:text-cream-light"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Roast Selector */}
            <div className="flex items-center gap-1.5 bg-[#160D08] border border-[#3E2619] rounded-xl px-2.5 py-1.5 text-xs text-cream-secondary">
              <SlidersHorizontal className="w-3.5 h-3.5 text-copper-light shrink-0" />
              <select
                value={selectedRoast}
                onChange={(e) => setSelectedRoast(e.target.value)}
                className="bg-transparent text-cream-light text-xs focus:outline-none cursor-pointer"
                aria-label="Filter by Roast"
              >
                <option value="all" className="bg-[#1F120B]">All Roasts</option>
                <option value="Medium" className="bg-[#1F120B]">Medium Roast</option>
                <option value="Medium-Dark" className="bg-[#1F120B]">Medium-Dark</option>
                <option value="Dark" className="bg-[#1F120B]">Dark Roast</option>
              </select>
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-1.5 bg-[#160D08] border border-[#3E2619] rounded-xl px-2.5 py-1.5 text-xs text-cream-secondary">
              <ArrowUpDown className="w-3.5 h-3.5 text-copper-light shrink-0" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "featured" | "price-asc" | "price-desc" | "intensity")}
                className="bg-transparent text-cream-light text-xs focus:outline-none cursor-pointer"
                aria-label="Sort products"
              >
                <option value="featured" className="bg-[#1F120B]">Featured</option>
                <option value="price-asc" className="bg-[#1F120B]">Price: Low to High</option>
                <option value="price-desc" className="bg-[#1F120B]">Price: High to Low</option>
                <option value="intensity" className="bg-[#1F120B]">Roast Intensity</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filters Display */}
        {(selectedCategory !== "all" || selectedRoast !== "all" || searchQuery) && (
          <div className="mt-3 pt-3 border-t border-[#3E2619]/50 flex items-center justify-between text-[11px] text-cream-secondary">
            <span>
              Showing {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
            </span>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSelectedRoast("all");
                setSearchQuery("");
              }}
              className="text-copper-light hover:underline"
            >
              Reset all filters
            </button>
          </div>
        )}
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-[#1E120B] rounded-2xl border border-[#3E2619] space-y-4 max-w-md mx-auto">
          <div className="w-12 h-12 rounded-full bg-copper/10 border border-copper/30 flex items-center justify-center text-copper-light mx-auto">
            <Search className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h3 className="font-serif text-lg text-cream-light font-medium">No coffees matched your filters</h3>
            <p className="text-xs text-cream-secondary/80 font-light">
              Try adjusting your search terms or clearing your roast selections.
            </p>
          </div>
          <button
            onClick={() => {
              setSelectedCategory("all");
              setSelectedRoast("all");
              setSearchQuery("");
            }}
            className="text-xs font-semibold text-copper-light hover:underline"
          >
            View all coffees →
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product, idx) => (
            <ProductCard key={product.id} product={product} priority={idx < 4} />
          ))}
        </div>
      )}

      {/* Coffee Match Quiz Banner */}
      <div className="mt-16 rounded-2xl bg-gradient-to-r from-[#24160E] to-[#1E120B] border border-[#3E2619] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-luxury">
        <div className="space-y-1.5 text-center sm:text-left">
          <span className="text-[10px] uppercase font-mono tracking-widest text-copper-light font-medium flex items-center justify-center sm:justify-start gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-copper-light" />
            Not Sure Which Coffee Fits Your Morning?
          </span>
          <h3 className="font-serif text-xl sm:text-2xl text-cream-light font-normal">
            Take the 60-Second Coffee Finder Quiz
          </h3>
          <p className="text-xs text-cream-secondary/80 font-light max-w-md">
            Answer 3 simple questions about your brewing method and roast preference to find your ideal blend.
          </p>
        </div>

        <Link
          href="/coffee-finder"
          className="bg-copper hover:bg-copper-hover active:scale-95 text-[#FFF7EA] text-xs sm:text-sm font-semibold px-6 py-3 rounded-xl transition-all shadow-copper shrink-0 cursor-pointer"
        >
          Find My Coffee →
        </Link>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#140D09] text-cream">
      <AnnouncementBar />
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<div className="py-20 text-center text-xs text-cream-secondary">Loading estate coffees...</div>}>
          <ShopContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
