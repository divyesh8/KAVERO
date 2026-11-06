"use client";

import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from "react";
import { Product, ProductVariant } from "@/data/products";
import { BRAND } from "@/lib/brand";

export interface CartItem {
  id: string; // composite key: `${productId}_${variantId}_${grind}`
  productId: string;
  name: string;
  variantId: string;
  weight: string;
  price: number;
  quantity: number;
  image: string;
  alt: string;
  grind: "fine-filter" | "whole-beans" | "medium-press";
  grindLabel: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (
    product: Product,
    options?: {
      variant?: ProductVariant;
      quantity?: number;
      grind?: "fine-filter" | "whole-beans" | "medium-press";
    }
  ) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  shippingFee: number;
  freeShippingThreshold: number;
  amountNeededForFreeShipping: number;
  freeShippingProgress: number; // 0 to 100
  total: number;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = "kavero_cart_v1";

const GRIND_LABELS: Record<string, string> = {
  "fine-filter": "Fine Grind (South Indian Filter)",
  "whole-beans": "Whole Roasted Beans",
  "medium-press": "Medium Grind (French Press / Moka)",
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Hydrate from localStorage once on client
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      }
    } catch {
      // Ignore localStorage errors (e.g. private browsing)
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Save to localStorage whenever items change after initial hydration
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Ignore
    }
  }, [items, isHydrated]);

  const addItem = useCallback(
    (
      product: Product,
      options?: {
        variant?: ProductVariant;
        quantity?: number;
        grind?: "fine-filter" | "whole-beans" | "medium-press";
      }
    ) => {
      const selectedVariant = options?.variant || product.variants[0] || {
        id: "default",
        weight: product.weight,
        price: product.price,
        inStock: true,
        sku: product.id,
      };

      const grind = options?.grind || "fine-filter";
      const quantityToAdd = Math.max(1, options?.quantity || 1);
      const compositeId = `${product.id}_${selectedVariant.id}_${grind}`;

      setItems((prevItems) => {
        const existingIndex = prevItems.findIndex((item) => item.id === compositeId);

        if (existingIndex > -1) {
          const next = [...prevItems];
          next[existingIndex] = {
            ...next[existingIndex],
            quantity: next[existingIndex].quantity + quantityToAdd,
          };
          return next;
        }

        const newItem: CartItem = {
          id: compositeId,
          productId: product.id,
          name: product.name,
          variantId: selectedVariant.id,
          weight: selectedVariant.weight,
          price: selectedVariant.price,
          quantity: quantityToAdd,
          image: product.image,
          alt: product.alt,
          grind,
          grindLabel: GRIND_LABELS[grind] || "Filter Grind",
        };

        return [...prevItems, newItem];
      });

      // Automatically open the drawer so user sees visual feedback
      setIsDrawerOpen(true);
    },
    []
  );

  const removeItem = useCallback((itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  }, []);

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((item) => item.id !== itemId));
      return;
    }

    setItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const freeShippingThreshold = BRAND.shipping.freeThreshold; // 499

  const shippingFee = useMemo(() => {
    if (items.length === 0) return 0;
    return subtotal >= freeShippingThreshold ? 0 : BRAND.shipping.standardFee;
  }, [subtotal, freeShippingThreshold, items.length]);

  const amountNeededForFreeShipping = useMemo(() => {
    return Math.max(0, freeShippingThreshold - subtotal);
  }, [freeShippingThreshold, subtotal]);

  const freeShippingProgress = useMemo(() => {
    if (subtotal >= freeShippingThreshold) return 100;
    return Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  }, [subtotal, freeShippingThreshold]);

  const total = subtotal + shippingFee;

  const openDrawer = useCallback(() => setIsDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setIsDrawerOpen(false), []);
  const toggleDrawer = useCallback(() => setIsDrawerOpen((prev) => !prev), []);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        shippingFee,
        freeShippingThreshold,
        amountNeededForFreeShipping,
        freeShippingProgress,
        total,
        isDrawerOpen,
        openDrawer,
        closeDrawer,
        toggleDrawer,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
