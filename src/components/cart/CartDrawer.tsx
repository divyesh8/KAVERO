"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCart } from "@/context/CartContext";

export function CartDrawer() {
  const {
    items,
    removeItem,
    updateQuantity,
    totalItems,
    subtotal,
    shippingFee,
    freeShippingThreshold,
    amountNeededForFreeShipping,
    freeShippingProgress,
    total,
    isDrawerOpen,
    closeDrawer,
  } = useCart();

  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on Escape & Lock body scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isDrawerOpen) {
        closeDrawer();
      }
    };

    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isDrawerOpen, closeDrawer]);

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true" aria-label="Your Coffee Cart">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeDrawer}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm cursor-pointer"
          />

          {/* Drawer Panel */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
            <motion.div
              ref={drawerRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="w-screen max-w-md bg-[#1B1009] border-l border-[#3E2619] shadow-2xl flex flex-col justify-between text-cream-light"
            >
              {/* Header */}
              <div className="px-5 py-4 sm:px-6 sm:py-5 border-b border-[#3D271B]/50 bg-[#21140E] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-copper/15 border border-copper/40 flex items-center justify-center text-copper-light">
                    <ShoppingBag className="w-4 h-4 stroke-[2]" />
                  </div>
                  <div>
                    <h2 className="font-serif text-lg font-medium tracking-tight text-cream-light">
                      Your Cart
                    </h2>
                    <span className="text-[11px] text-cream-secondary/80 font-mono">
                      {totalItems} {totalItems === 1 ? "item" : "items"} selected
                    </span>
                  </div>
                </div>

                <button
                  onClick={closeDrawer}
                  type="button"
                  aria-label="Close cart"
                  className="w-8 h-8 rounded-lg border border-[#3E2619] text-cream-secondary hover:text-cream-light hover:border-copper/60 hover:bg-[#2A1A12] flex items-center justify-center transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Free Shipping Indicator */}
              <div className="px-5 py-3 sm:px-6 bg-[#24160E] border-b border-[#3D271B]/30">
                <div className="flex items-center justify-between text-[11px] mb-1.5">
                  <span className="text-cream-secondary/90 flex items-center gap-1.5 font-medium">
                    <Sparkles className="w-3 h-3 text-copper-light" />
                    {amountNeededForFreeShipping === 0 ? (
                      <span className="text-forest-light font-semibold">You unlocked Free Pan-India Delivery!</span>
                    ) : (
                      <span>
                        Add <strong className="text-copper-light">₹{amountNeededForFreeShipping}</strong> more for Free Shipping
                      </span>
                    )}
                  </span>
                  <span className="text-cream-secondary/60 font-mono text-[10px]">
                    ₹{freeShippingThreshold} threshold
                  </span>
                </div>
                {/* Progress bar */}
                <div className="w-full h-1.5 bg-[#140D09] rounded-full overflow-hidden border border-[#3D271B]/40">
                  <div
                    className="h-full bg-gradient-to-r from-copper to-copper-light rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>

              {/* Cart Items List */}
              <div className="flex-1 overflow-y-auto px-5 py-4 sm:px-6 space-y-4 divide-y divide-[#3D271B]/30">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
                    <div className="w-16 h-16 rounded-2xl bg-[#25170F] border border-[#3E2619] flex items-center justify-center text-copper/60">
                      <ShoppingBag className="w-8 h-8 stroke-[1.2]" />
                    </div>
                    <div className="space-y-1 max-w-xs">
                      <h3 className="font-serif text-base text-cream-light font-medium">
                        Your cart is empty
                      </h3>
                      <p className="text-xs text-cream-secondary/80 leading-relaxed font-light">
                        Discover authentic Karnataka filter coffee fresh from our shade-grown estates.
                      </p>
                    </div>
                    <Link
                      href="/shop"
                      onClick={closeDrawer}
                      className="bg-copper hover:bg-copper-hover active:scale-95 text-[#FFF7EA] text-xs font-semibold px-5 py-2.5 rounded-lg transition-all flex items-center gap-2 shadow-copper cursor-pointer"
                    >
                      <span>Explore Our Coffees</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                ) : (
                  items.map((item) => (
                    <div key={item.id} className="pt-3.5 first:pt-0 flex gap-3.5">
                      {/* Thumbnail */}
                      <div className="relative w-16 h-20 sm:w-20 sm:h-24 rounded-lg bg-[#25170F] border border-[#3E2619] overflow-hidden shrink-0 flex items-center justify-center p-1 select-none">
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

                      {/* Info & Quantity */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-serif text-sm font-medium text-cream-light leading-snug">
                              {item.name}
                            </h4>
                            <button
                              onClick={() => removeItem(item.id)}
                              type="button"
                              aria-label={`Remove ${item.name} from cart`}
                              className="text-cream-secondary/60 hover:text-roasted-red transition-colors p-0.5"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <div className="flex flex-wrap items-center gap-1.5 mt-1 text-[11px] text-cream-secondary/80">
                            <span className="bg-[#2A1A12] px-1.5 py-0.5 rounded border border-[#3E2619] font-mono">
                              {item.weight}
                            </span>
                            <span>•</span>
                            <span className="text-[10px] text-copper-light">
                              {item.grindLabel}
                            </span>
                          </div>
                        </div>

                        {/* Price & Quantity Controls */}
                        <div className="flex items-center justify-between mt-2 pt-1 border-t border-[#3D271B]/20">
                          <div className="flex items-center border border-[#3E2619] rounded-lg bg-[#21140E] overflow-hidden">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              type="button"
                              aria-label="Decrease quantity"
                              className="w-7 h-7 flex items-center justify-center text-cream-secondary hover:text-cream-light hover:bg-[#2A1A12] transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-7 text-center text-xs font-mono font-medium text-cream-light">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              type="button"
                              aria-label="Increase quantity"
                              className="w-7 h-7 flex items-center justify-center text-cream-secondary hover:text-cream-light hover:bg-[#2A1A12] transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <div className="text-right">
                            <span className="font-sans font-semibold text-sm text-cream-light">
                              ₹{item.price * item.quantity}
                            </span>
                            {item.quantity > 1 && (
                              <div className="text-[10px] text-cream-secondary/60">
                                ₹{item.price} each
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer Summary & Checkout */}
              {items.length > 0 && (
                <div className="p-5 sm:p-6 border-t border-[#3D271B]/60 bg-[#21140E] space-y-3.5">
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between text-cream-secondary/90">
                      <span>Subtotal</span>
                      <span className="font-mono text-cream-light">₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between text-cream-secondary/90">
                      <span>Pan-India Shipping</span>
                      <span className="font-mono">
                        {shippingFee === 0 ? (
                          <span className="text-forest-light font-medium">FREE</span>
                        ) : (
                          `₹${shippingFee}`
                        )}
                      </span>
                    </div>
                    <div className="pt-2 border-t border-[#3D271B]/40 flex justify-between text-sm sm:text-base font-medium">
                      <span className="font-serif text-cream-light">Total Amount</span>
                      <span className="font-sans font-semibold text-copper-light text-base sm:text-lg">
                        ₹{total}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-1">
                    <Link
                      href="/checkout"
                      onClick={closeDrawer}
                      className="w-full bg-copper hover:bg-copper-hover active:scale-[0.99] text-[#FFF7EA] text-sm font-semibold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-copper cursor-pointer"
                    >
                      <span>Proceed to Checkout</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>

                    <Link
                      href="/cart"
                      onClick={closeDrawer}
                      className="w-full bg-[#180E09] hover:bg-[#25170F] border border-[#3E2619] text-xs font-medium text-cream-secondary hover:text-cream-light py-2 px-4 rounded-xl transition-all flex items-center justify-center"
                    >
                      View Detailed Cart
                    </Link>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-[10px] text-cream-secondary/70 pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-forest-light" />
                    <span>Secure Encrypted Indian Payments & Authentic Estate Guarantee</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
