"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowRight, RotateCcw, Check, ShoppingBag, Coffee } from "lucide-react";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { POPULAR_PRODUCTS, Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

export default function CoffeeFinderPage() {
  const { addItem } = useCart();

  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    brewMethod: "",
    strength: "",
    flavorProfile: "",
    purpose: "",
  });
  const [added, setAdded] = useState(false);

  // Deterministic transparent matching logic
  const getRecommendation = (): { product: Product; reason: string } => {
    // If gifting:
    if (answers.purpose === "gifting") {
      const gift = POPULAR_PRODUCTS.find((p) => p.id === "kavero-gift-pack")!;
      return {
        product: gift,
        reason:
          "The KAVERO Gift Pack is curated specifically for connoisseurs and gifting, offering our three signature roasts (Original, Estate Blend, Bold Roast) in an elegant gold-embossed presentation box.",
      };
    }

    // If pure coffee preference or light/medium body with black/pour-over:
    if (
      answers.brewMethod === "press" ||
      answers.flavorProfile === "floral" ||
      answers.strength === "balanced"
    ) {
      const estate = POPULAR_PRODUCTS.find((p) => p.id === "estate-blend")!;
      return {
        product: estate,
        reason:
          "Our Estate Blend is 100% pure high-altitude Arabica without chicory. It delivers wild honey and floral notes, making it ideal for smooth, balanced morning cups, French press, or black coffee.",
      };
    }

    // If very strong / dark / smoky:
    if (answers.strength === "intense" || answers.flavorProfile === "smoky") {
      const bold = POPULAR_PRODUCTS.find((p) => p.id === "bold-roast")!;
      return {
        product: bold,
        reason:
          "Our Bold Roast (70:30) is dark roasted on vintage drum roasters to create an intense, full-bodied wake-up cup with deep dark cocoa notes that cuts fiercely through rich whole milk.",
      };
    }

    // Default authentic South Indian filter coffee match:
    const original = POPULAR_PRODUCTS.find((p) => p.id === "original-filter-coffee")!;
    return {
      product: original,
      reason:
        "The classic KAVERO Original Filter Coffee (80:20) is crafted specifically for the traditional brass filter and dabarah ritual, yielding a thick, aromatic first decoction with notes of caramelized jaggery and roasted chicory.",
    };
  };

  const handleSelect = (key: keyof typeof answers, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setStep((s) => s + 1);
  };

  const resetQuiz = () => {
    setAnswers({
      brewMethod: "",
      strength: "",
      flavorProfile: "",
      purpose: "",
    });
    setStep(1);
    setAdded(false);
  };

  const recommendation = step > 4 ? getRecommendation() : null;

  return (
    <div className="min-h-screen flex flex-col bg-[#140D09] text-cream">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full">
        {/* Header */}
        <div className="text-center space-y-3 mb-12">
          <span className="font-script text-copper-light text-2xl sm:text-3xl tracking-wide select-none">
            Tailored To Your Palate
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-cream-light font-normal tracking-tight">
            Find Your Ideal Coffee Match
          </h1>
          <p className="text-xs sm:text-sm text-cream-secondary/80 font-light max-w-lg mx-auto">
            Answer 4 quick questions about your morning brewing ritual and flavor preferences to find the single-estate roast calibrated for you.
          </p>
        </div>

        {/* Quiz Steps Container */}
        {step <= 4 ? (
          <div className="bg-[#1F120B] border border-[#3E2619] rounded-2xl p-6 sm:p-10 shadow-luxury space-y-8">
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-cream-secondary/80 font-mono">
                <span>Question {step} of 4</span>
                <span>{step * 25}% Completed</span>
              </div>
              <div className="w-full h-1.5 bg-[#140D09] rounded-full overflow-hidden border border-[#3E2619]">
                <div
                  className="h-full bg-copper transition-all duration-300"
                  style={{ width: `${step * 25}%` }}
                />
              </div>
            </div>

            {/* Step 1: Brew Method */}
            {step === 1 && (
              <div className="space-y-5 animate-in fade-in duration-300">
                <h2 className="font-serif text-xl sm:text-2xl text-cream-light font-medium text-center">
                  How do you usually brew your morning coffee?
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <button
                    onClick={() => handleSelect("brewMethod", "filter")}
                    className="p-5 rounded-xl bg-[#160D08] border border-[#3E2619] hover:border-copper hover:bg-copper/10 transition-all text-left space-y-2 group cursor-pointer"
                  >
                    <Coffee className="w-6 h-6 text-copper-light" />
                    <span className="font-serif text-sm font-semibold text-cream-light block group-hover:text-copper-light">
                      Traditional Brass Filter
                    </span>
                    <span className="text-[11px] text-cream-secondary/70 font-light block">
                      South Indian decoction with hot frothed milk.
                    </span>
                  </button>

                  <button
                    onClick={() => handleSelect("brewMethod", "press")}
                    className="p-5 rounded-xl bg-[#160D08] border border-[#3E2619] hover:border-copper hover:bg-copper/10 transition-all text-left space-y-2 group cursor-pointer"
                  >
                    <Sparkles className="w-6 h-6 text-copper-light" />
                    <span className="font-serif text-sm font-semibold text-cream-light block group-hover:text-copper-light">
                      French Press / Moka Pot
                    </span>
                    <span className="text-[11px] text-cream-secondary/70 font-light block">
                      Immersion brew, stovetop moka, or Aeropress.
                    </span>
                  </button>

                  <button
                    onClick={() => handleSelect("brewMethod", "black")}
                    className="p-5 rounded-xl bg-[#160D08] border border-[#3E2619] hover:border-copper hover:bg-copper/10 transition-all text-left space-y-2 group cursor-pointer"
                  >
                    <RotateCcw className="w-6 h-6 text-copper-light" />
                    <span className="font-serif text-sm font-semibold text-cream-light block group-hover:text-copper-light">
                      Pour-Over / Black Coffee
                    </span>
                    <span className="text-[11px] text-cream-secondary/70 font-light block">
                      Pure, unadulterated coffee with crisp clarity.
                    </span>
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Strength */}
            {step === 2 && (
              <div className="space-y-5 animate-in fade-in duration-300">
                <h2 className="font-serif text-xl sm:text-2xl text-cream-light font-medium text-center">
                  What roast intensity and body do you prefer?
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <button
                    onClick={() => handleSelect("strength", "balanced")}
                    className="p-5 rounded-xl bg-[#160D08] border border-[#3E2619] hover:border-copper hover:bg-copper/10 transition-all text-left space-y-2 group cursor-pointer"
                  >
                    <span className="text-xs font-mono uppercase tracking-wider text-copper-light font-semibold">
                      Smooth & Aromatic
                    </span>
                    <span className="font-serif text-base font-semibold text-cream-light block group-hover:text-copper-light">
                      Medium Roast (Balanced)
                    </span>
                    <span className="text-[11px] text-cream-secondary/70 font-light block">
                      Silky texture with natural sweetness and aromatic floral hints.
                    </span>
                  </button>

                  <button
                    onClick={() => handleSelect("strength", "intense")}
                    className="p-5 rounded-xl bg-[#160D08] border border-[#3E2619] hover:border-copper hover:bg-copper/10 transition-all text-left space-y-2 group cursor-pointer"
                  >
                    <span className="text-xs font-mono uppercase tracking-wider text-copper-light font-semibold">
                      Bold & Powerful
                    </span>
                    <span className="font-serif text-base font-semibold text-cream-light block group-hover:text-copper-light">
                      Dark Roast (High Intensity)
                    </span>
                    <span className="text-[11px] text-cream-secondary/70 font-light block">
                      Thick, smoky, bittersweet chocolate punch that cuts through milk.
                    </span>
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Flavor Notes */}
            {step === 3 && (
              <div className="space-y-5 animate-in fade-in duration-300">
                <h2 className="font-serif text-xl sm:text-2xl text-cream-light font-medium text-center">
                  Which tasting notes appeal to you most?
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <button
                    onClick={() => handleSelect("flavorProfile", "caramel")}
                    className="p-5 rounded-xl bg-[#160D08] border border-[#3E2619] hover:border-copper hover:bg-copper/10 transition-all text-left space-y-1.5 cursor-pointer"
                  >
                    <span className="font-serif text-sm font-semibold text-cream-light block">
                      Caramel & Jaggery
                    </span>
                    <span className="text-[11px] text-cream-secondary/70 font-light block">
                      Traditional roasted chicory sweetness and malt.
                    </span>
                  </button>

                  <button
                    onClick={() => handleSelect("flavorProfile", "smoky")}
                    className="p-5 rounded-xl bg-[#160D08] border border-[#3E2619] hover:border-copper hover:bg-copper/10 transition-all text-left space-y-1.5 cursor-pointer"
                  >
                    <span className="font-serif text-sm font-semibold text-cream-light block">
                      Dark Cocoa & Oak
                    </span>
                    <span className="text-[11px] text-cream-secondary/70 font-light block">
                      Smoky dark roast with heavy velvety crema.
                    </span>
                  </button>

                  <button
                    onClick={() => handleSelect("flavorProfile", "floral")}
                    className="p-5 rounded-xl bg-[#160D08] border border-[#3E2619] hover:border-copper hover:bg-copper/10 transition-all text-left space-y-1.5 cursor-pointer"
                  >
                    <span className="font-serif text-sm font-semibold text-cream-light block">
                      Wild Honey & Jasmine
                    </span>
                    <span className="text-[11px] text-cream-secondary/70 font-light block">
                      Clean single-estate Arabica with gentle fruit sweetness.
                    </span>
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Daily vs Gifting */}
            {step === 4 && (
              <div className="space-y-5 animate-in fade-in duration-300">
                <h2 className="font-serif text-xl sm:text-2xl text-cream-light font-medium text-center">
                  What is the primary occasion for this coffee?
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <button
                    onClick={() => handleSelect("purpose", "daily")}
                    className="p-5 rounded-xl bg-[#160D08] border border-[#3E2619] hover:border-copper hover:bg-copper/10 transition-all text-left space-y-1.5 cursor-pointer"
                  >
                    <span className="font-serif text-base font-semibold text-cream-light block">
                      My Daily Morning Routine
                    </span>
                    <span className="text-[11px] text-cream-secondary/70 font-light block">
                      A steady, reliable ritual for regular household enjoyment.
                    </span>
                  </button>

                  <button
                    onClick={() => handleSelect("purpose", "gifting")}
                    className="p-5 rounded-xl bg-[#160D08] border border-[#3E2619] hover:border-copper hover:bg-copper/10 transition-all text-left space-y-1.5 cursor-pointer"
                  >
                    <span className="font-serif text-base font-semibold text-cream-light block">
                      Curated Gift or Tasting
                    </span>
                    <span className="text-[11px] text-cream-secondary/70 font-light block">
                      Festive gift box, connoisseur trio, or special occasion.
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Recommendation Result Screen */
          recommendation && (
            <div className="bg-[#1F120B] border border-[#3E2619] rounded-2xl p-6 sm:p-10 shadow-luxury space-y-8 animate-in fade-in zoom-in-95 duration-300">
              <div className="text-center space-y-1 pb-4 border-b border-[#3E2619]">
                <span className="text-xs font-mono uppercase tracking-widest text-copper-light font-semibold">
                  Personalized Match Result
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-cream-light font-normal">
                  Your Recommended Coffee
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                {/* Product Image */}
                <div className="md:col-span-5 relative aspect-square max-h-72 rounded-xl bg-[#140D09] border border-[#3E2619] p-4 flex items-center justify-center select-none">
                  <Image
                    src={recommendation.product.image}
                    alt={recommendation.product.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 320px"
                    draggable={false}
                    onDragStart={(e) => e.preventDefault()}
                    onContextMenu={(e) => e.preventDefault()}
                    className="object-contain p-2 filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)] kavero-nondraggable-image"
                  />
                </div>

                {/* Details & Explanation */}
                <div className="md:col-span-7 space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-copper-light font-semibold px-2 py-0.5 rounded bg-copper/10 border border-copper/30">
                      {recommendation.product.categoryLabel}
                    </span>
                    <h3 className="font-serif text-2xl text-cream-light font-medium">
                      {recommendation.product.name}
                    </h3>
                    <p className="text-xs text-copper-light font-mono">
                      ₹{recommendation.product.price} ({recommendation.product.weight})
                    </p>
                  </div>

                  {/* Why this fits explanation */}
                  <div className="p-4 rounded-xl bg-[#170E08] border border-copper/40 space-y-1.5 text-xs text-cream-secondary/90">
                    <span className="text-copper-light font-semibold block flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Why This Fits Your Preferences:
                    </span>
                    <p className="font-light leading-relaxed">{recommendation.reason}</p>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {recommendation.product.tastingNotes.map((note) => (
                      <span
                        key={note}
                        className="text-[11px] bg-[#140D09] px-2.5 py-0.5 rounded border border-[#3E2619] text-cream-light"
                      >
                        {note}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      onClick={() => {
                        addItem(recommendation.product, { quantity: 1 });
                        setAdded(true);
                        setTimeout(() => setAdded(false), 2000);
                      }}
                      className="bg-copper hover:bg-copper-hover active:scale-95 text-[#FFF7EA] text-xs sm:text-sm font-semibold px-6 py-3 rounded-xl transition-all shadow-copper flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {added ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Added to Cart!</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-4 h-4" />
                          <span>Add to Cart • ₹{recommendation.product.price}</span>
                        </>
                      )}
                    </button>

                    <Link
                      href={`/shop/${recommendation.product.slug}`}
                      className="bg-[#24160E] hover:bg-[#2C1A12] border border-[#3E2619] text-cream-light text-xs sm:text-sm font-medium px-5 py-3 rounded-xl transition-all flex items-center justify-center gap-2 text-center"
                    >
                      <span>Full Product Story</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#3E2619] flex justify-center">
                <button
                  onClick={resetQuiz}
                  className="text-xs text-copper-light hover:underline flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Start Quiz Over</span>
                </button>
              </div>
            </div>
          )
        )}
      </main>

      <Footer />
    </div>
  );
}
