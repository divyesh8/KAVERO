"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Trash2, Plus, Minus, ShoppingBag, Sparkles, ShieldCheck } from "lucide-react";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    subtotal,
    shippingFee,
    freeShippingThreshold,
    amountNeededForFreeShipping,
    freeShippingProgress,
    total,
  } = useCart();

  return (
    <div className="min-h-screen flex flex-col bg-[#140D09] text-cream">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full">
        <div className="max-w-2xl mx-auto text-center mb-10 space-y-2">
          <span className="font-script text-copper-light text-2xl sm:text-3xl tracking-wide select-none">
            Fresh From Karnataka
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-cream-light font-normal tracking-tight">
            Your Shopping Cart
          </h1>
        </div>

        {items.length === 0 ? (
          <div className="max-w-md mx-auto text-center py-16 px-6 bg-[#1F120B] rounded-2xl border border-[#3E2619] space-y-5 shadow-luxury">
            <div className="w-16 h-16 rounded-2xl bg-copper/15 border border-copper/30 flex items-center justify-center text-copper-light mx-auto">
              <ShoppingBag className="w-8 h-8 stroke-[1.4]" />
            </div>
            <div className="space-y-1.5">
              <h2 className="font-serif text-xl text-cream-light font-medium">Your cart is currently empty</h2>
              <p className="text-xs sm:text-sm text-cream-secondary/80 font-light leading-relaxed">
                Experience authentic South Indian filter coffee sourced directly from our single-origin shade estates.
              </p>
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-copper hover:bg-copper-hover active:scale-95 text-[#FFF7EA] text-sm font-semibold px-6 py-3 rounded-xl transition-all shadow-copper"
            >
              <span>Explore Our Coffee Collection</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left: Cart Items List */}
            <div className="lg:col-span-8 space-y-6">
              {/* Free Shipping Alert Banner */}
              <div className="bg-[#24160E] border border-[#3E2619] rounded-2xl p-4 sm:p-5">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-cream-light font-medium flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-copper-light" />
                    {amountNeededForFreeShipping === 0 ? (
                      <span className="text-forest-light font-semibold">
                        You have unlocked FREE Pan-India shipping!
                      </span>
                    ) : (
                      <span>
                        Add <strong className="text-copper-light font-bold">₹{amountNeededForFreeShipping}</strong> more to qualify for Free Shipping
                      </span>
                    )}
                  </span>
                  <span className="text-cream-secondary/60 font-mono text-xs">
                    ₹{freeShippingThreshold} Goal
                  </span>
                </div>
                <div className="w-full h-2 bg-[#140D09] rounded-full overflow-hidden border border-[#3E2619]/40">
                  <div
                    className="h-full bg-gradient-to-r from-copper to-copper-light rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>

              {/* Items Table Container */}
              <div className="bg-[#1F120B] border border-[#3E2619] rounded-2xl divide-y divide-[#3E2619]/40 overflow-hidden shadow-luxury">
                {items.map((item) => (
                  <div key={item.id} className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="relative w-20 h-24 rounded-xl bg-[#140D09] border border-[#3E2619] p-2 shrink-0 flex items-center justify-center select-none">
                        <Image
                          src={item.image}
                          alt={item.alt}
                          fill
                          sizes="80px"
                          draggable={false}
                          onDragStart={(e) => e.preventDefault()}
                          className="object-contain p-1 kavero-nondraggable-image"
                        />
                      </div>
                      <div className="space-y-1">
                        <Link href={`/shop/${item.productId}`} className="font-serif text-base sm:text-lg font-medium text-cream-light hover:text-copper-light transition-colors">
                          {item.name}
                        </Link>
                        <div className="flex flex-wrap items-center gap-2 text-xs text-cream-secondary/80">
                          <span className="bg-[#24160E] px-2 py-0.5 rounded border border-[#3E2619] font-mono">
                            {item.weight}
                          </span>
                          <span>•</span>
                          <span className="text-copper-light">{item.grindLabel}</span>
                        </div>
                        <div className="text-xs text-cream-secondary/60 font-mono pt-1">
                          ₹{item.price} per unit
                        </div>
                      </div>
                    </div>

                    {/* Quantity & Item Subtotal */}
                    <div className="flex items-center justify-between w-full sm:w-auto sm:justify-end gap-6 pt-2 sm:pt-0 border-t sm:border-0 border-[#3E2619]/40">
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-[#3E2619] rounded-xl bg-[#140D09] overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          type="button"
                          aria-label="Decrease quantity"
                          className="w-8 h-8 flex items-center justify-center text-cream-secondary hover:text-cream-light hover:bg-[#25170F]"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-9 text-center font-mono text-xs font-semibold text-cream-light">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          type="button"
                          aria-label="Increase quantity"
                          className="w-8 h-8 flex items-center justify-center text-cream-secondary hover:text-cream-light hover:bg-[#25170F]"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Subtotal */}
                      <div className="text-right min-w-[70px]">
                        <span className="font-sans font-bold text-base sm:text-lg text-cream-light">
                          ₹{item.price * item.quantity}
                        </span>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeItem(item.id)}
                        type="button"
                        aria-label={`Remove ${item.name} from cart`}
                        className="text-cream-secondary/50 hover:text-roasted-red p-1 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center text-xs">
                <Link href="/shop" className="text-copper-light hover:underline">
                  ← Continue Shopping
                </Link>
              </div>
            </div>

            {/* Right: Order Summary Card */}
            <div className="lg:col-span-4 bg-[#1F120B] border border-[#3E2619] rounded-2xl p-6 sm:p-7 space-y-5 shadow-luxury self-start">
              <h2 className="font-serif text-xl text-cream-light font-medium pb-3 border-b border-[#3E2619]">
                Order Summary
              </h2>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between text-cream-secondary/90">
                  <span>Subtotal</span>
                  <span className="font-mono text-cream-light">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-cream-secondary/90">
                  <span>Shipping & Handling</span>
                  <span className="font-mono">
                    {shippingFee === 0 ? (
                      <span className="text-forest-light font-semibold">FREE</span>
                    ) : (
                      `₹${shippingFee}`
                    )}
                  </span>
                </div>
                <div className="pt-3 border-t border-[#3E2619] flex justify-between text-base font-semibold">
                  <span className="font-serif text-cream-light">Total (INR)</span>
                  <span className="font-sans font-bold text-xl text-copper-light">
                    ₹{total}
                  </span>
                </div>
              </div>

              <div className="space-y-2.5 pt-2">
                <Link
                  href="/checkout"
                  className="w-full bg-copper hover:bg-copper-hover active:scale-[0.99] text-[#FFF7EA] text-sm font-semibold py-3.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-copper cursor-pointer"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="pt-3 border-t border-[#3E2619]/60 space-y-2 text-[11px] text-cream-secondary/70">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-forest-light shrink-0" />
                  <span>Secure 256-bit Indian payment checkout</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-copper-light shrink-0" />
                  <span>100% authentic fresh roasted beans</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
