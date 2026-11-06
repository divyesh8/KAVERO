"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, User, ShoppingBag, ChevronDown, Menu, X, ArrowRight, Sparkles } from "lucide-react";
import { KaveroLogo } from "@/components/ui/KaveroLogo";
import { BRAND } from "@/lib/brand";
import { useCart } from "@/context/CartContext";
import { getAllProducts, Product } from "@/data/products";

export function Navbar() {
  const router = useRouter();
  const { totalItems, toggleDrawer } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const allProducts = getAllProducts();

  // Handle Search Input
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    const q = searchQuery.toLowerCase();
    const matches = allProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tastingNotes.some((t) => t.toLowerCase().includes(q)) ||
        p.categoryLabel.toLowerCase().includes(q)
    );
    setSearchResults(matches);
  }, [searchQuery, allProducts]);

  // Focus search input when opened
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
    setSearchOpen(false);
    setSearchQuery("");
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#1A1009]/95 backdrop-blur-md border-b border-[#3D271B]/50 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <div className="flex-shrink-0 flex items-center">
          <KaveroLogo size="md" priority />
        </div>

        {/* Center: Desktop Navigation Links with Rich Dropdowns */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8" aria-label="Main Navigation">
          {BRAND.navLinks.map((link) => {
            if (link.hasDropdown && link.dropdownItems) {
              return (
                <div
                  key={link.label}
                  className="relative group"
                >
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-1.5 text-xs lg:text-[13px] font-sans font-medium text-cream-light/90 hover:text-copper-light transition-colors py-2 focus:outline-none focus-visible:ring-1 focus-visible:ring-copper"
                  >
                    <span>{link.label}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-copper-light/80 transition-transform duration-200 group-hover:rotate-180" />
                  </Link>

                  {/* Dropdown Menu */}
                  <div className="absolute top-full left-0 w-72 pt-2 opacity-0 translate-y-1 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50">
                    <div className="bg-[#21140E] border border-[#3E2619] rounded-xl p-2.5 shadow-2xl backdrop-blur-lg">
                      <div className="space-y-1">
                        {link.dropdownItems.map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            className="flex items-start justify-between p-2 rounded-lg hover:bg-[#2A1A12] transition-colors group/item"
                          >
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-serif font-medium text-cream-light group-hover/item:text-copper-light">
                                  {item.label}
                                </span>
                                {item.badge && (
                                  <span className="text-[9px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded bg-copper/20 text-copper-light border border-copper/30">
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                              {item.description && (
                                <p className="text-[11px] text-cream-secondary/70 font-light mt-0.5 line-clamp-1">
                                  {item.description}
                                </p>
                              )}
                            </div>
                            <ArrowRight className="w-3 h-3 text-copper-light/40 group-hover/item:text-copper-light group-hover/item:translate-x-0.5 transition-all mt-1" />
                          </Link>
                        ))}
                      </div>

                      <div className="mt-2 pt-2 border-t border-[#3D271B]/50 px-2 py-1 flex items-center justify-between text-[11px] text-copper-light">
                        <Link href="/coffee-finder" className="hover:underline flex items-center gap-1 font-medium">
                          <Sparkles className="w-3 h-3" />
                          <span>Take Coffee Match Quiz</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs lg:text-[13px] font-sans font-medium text-cream-light/90 hover:text-copper-light transition-colors py-2 focus:outline-none focus-visible:ring-1 focus-visible:ring-copper"
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: Search, Account & Cart Drawer Trigger */}
        <div className="flex items-center space-x-3.5 sm:space-x-5 text-cream-light">
          {/* Search Toggle */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            type="button"
            aria-label={searchOpen ? "Close search bar" : "Open product search"}
            className="p-1.5 text-cream-light/85 hover:text-copper-light transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-copper rounded cursor-pointer"
          >
            <Search className="w-4.5 h-4.5 stroke-[1.8]" />
          </button>

          {/* User Account / Orders */}
          <Link
            href="/account"
            aria-label="My Account & Order Tracking"
            className="p-1.5 text-cream-light/85 hover:text-copper-light transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-copper rounded"
          >
            <User className="w-4.5 h-4.5 stroke-[1.8]" />
          </Link>

          {/* Shopping Cart Drawer Trigger */}
          <button
            onClick={toggleDrawer}
            type="button"
            aria-label={`Open shopping cart with ${totalItems} items`}
            className="relative p-1.5 text-cream-light/85 hover:text-copper-light transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-copper rounded cursor-pointer"
          >
            <ShoppingBag className="w-4.5 h-4.5 stroke-[1.8]" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-copper text-[#FFF7EA] text-[10px] font-bold flex items-center justify-center ring-2 ring-[#140D09]">
              {totalItems}
            </span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
            className="md:hidden p-1.5 text-cream-light hover:text-copper-light transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-copper rounded cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Expandable Live Search Bar with Instant Autocomplete */}
      {searchOpen && (
        <div className="border-t border-[#3D271B]/50 bg-[#1D110A] px-4 py-3 sm:px-6 shadow-xl animate-in fade-in slide-in-from-top-1 duration-200">
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSearchSubmit} className="flex items-center gap-3">
              <Search className="w-4 h-4 text-copper-light shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search filter coffee, single estate, bold roast, chicory..."
                className="w-full bg-transparent text-sm text-cream-light placeholder:text-cream-secondary/60 focus:outline-none py-1"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="text-xs text-cream-secondary hover:text-cream-light"
                >
                  Clear
                </button>
              )}
              <button
                type="submit"
                className="bg-copper hover:bg-copper-hover text-white text-xs px-3 py-1.5 rounded-md font-medium shrink-0"
              >
                Search
              </button>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="text-xs text-cream-secondary hover:text-cream-light px-2 py-1"
              >
                Close
              </button>
            </form>

            {/* Instant Search Results Dropdown */}
            {searchResults.length > 0 && (
              <div className="mt-3 pt-3 border-t border-[#3D271B]/40 max-h-64 overflow-y-auto space-y-2">
                <span className="text-[10px] uppercase tracking-wider text-copper-light font-semibold block px-1">
                  Matching Coffees ({searchResults.length})
                </span>
                {searchResults.map((product) => (
                  <Link
                    key={product.id}
                    href={`/shop/${product.slug}`}
                    onClick={() => {
                      setSearchOpen(false);
                      setSearchQuery("");
                    }}
                    className="flex items-center justify-between p-2 rounded-lg bg-[#24160E] hover:bg-[#2C1A12] border border-[#3E2619] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative w-9 h-11 bg-[#1A1009] rounded p-0.5 shrink-0 select-none">
                        <Image
                          src={product.image}
                          alt={product.alt}
                          fill
                          sizes="40px"
                          draggable={false}
                          onDragStart={(e) => e.preventDefault()}
                          className="object-contain kavero-nondraggable-image"
                        />
                      </div>
                      <div>
                        <div className="font-serif text-xs sm:text-sm text-cream-light font-medium">
                          {product.name}
                        </div>
                        <div className="text-[10px] text-cream-secondary/70">
                          {product.weight} • {product.categoryLabel}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs sm:text-sm font-semibold text-copper-light">
                        ₹{product.price}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#1E120B] border-b border-[#3D271B]/60 px-6 py-5 space-y-4 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-2">
            {BRAND.navLinks.map((link) => (
              <div key={link.label} className="border-b border-[#3D271B]/30 pb-2">
                <Link
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between text-base font-serif text-cream-light hover:text-copper py-1"
                >
                  <span>{link.label}</span>
                  {link.hasDropdown && <ChevronDown className="w-4 h-4 text-copper-light" />}
                </Link>
                {link.hasDropdown && link.dropdownItems && (
                  <div className="pl-3 mt-1.5 space-y-1.5 border-l border-copper/30">
                    {link.dropdownItems.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block text-xs text-cream-secondary hover:text-copper-light py-0.5"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="pt-2 flex items-center justify-between">
              <Link
                href="/account"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs text-copper-light hover:underline flex items-center gap-1.5"
              >
                <User className="w-3.5 h-3.5" />
                <span>My Account & Orders</span>
              </Link>
              <Link
                href="/coffee-finder"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs text-cream-light hover:text-copper-light flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5 text-copper-light" />
                <span>Find Your Coffee</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
