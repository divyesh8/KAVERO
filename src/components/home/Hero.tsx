"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { HeroIntro } from "@/components/kavero-motion/HeroIntro";
import { BrandButton } from "@/components/kavero-motion/BrandButton";
import { CoffeeSteam } from "@/components/kavero-motion/CoffeeSteam";
import { FloatingLeaves } from "@/components/kavero-motion/FloatingLeaves";

export function Hero() {
  const artworkRef = useRef<HTMLDivElement>(null);
  const [pointerOffset, setPointerOffset] = useState({ x: 0, y: 0 });

  // Subtle pointer parallax for desktop (4-10px max, smooth return)
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || !artworkRef.current) return;
    const rect = artworkRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) / (rect.width / 2);
    const deltaY = (e.clientY - centerY) / (rect.height / 2);

    // Limit to 8px max movement
    setPointerOffset({
      x: Math.max(-8, Math.min(8, deltaX * 8)),
      y: Math.max(-8, Math.min(8, deltaY * 8)),
    });
  };

  const handlePointerLeave = () => {
    setPointerOffset({ x: 0, y: 0 });
  };

  return (
    <section className="relative w-full min-h-[520px] lg:min-h-[600px] bg-[#1A1009] overflow-hidden flex items-center pt-6 pb-12 lg:py-16">
      {/* Background Ambient Warm Roasted Coffee Glows */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-copper/12 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#3D2214]/30 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -top-20 left-1/3 w-80 h-80 bg-forest/10 rounded-full blur-[90px] pointer-events-none" />

      {/* Floating Botanical Coffee Foliage Sway */}
      <FloatingLeaves variant="hero" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Hero Editorial Headline & CTAs */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <HeroIntro
              className="flex flex-col items-start gap-4 sm:gap-5"
              eyebrow={
                <div className="flex items-center gap-2">
                  <span className="font-script text-copper-light text-2xl sm:text-3xl lg:text-4xl tracking-wide select-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
                    Estate-Grown Filter Coffee
                  </span>
                  <span className="hidden sm:inline-flex items-center gap-1 text-[10px] uppercase font-mono tracking-widest text-copper/80 border border-copper/30 px-2 py-0.5 rounded-full bg-copper/10">
                    <Sparkles className="w-2.5 h-2.5 text-copper-light" />
                    Karnataka Heritage
                  </span>
                </div>
              }
              title={
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-[54px] text-cream-light font-normal leading-[1.08] tracking-tight">
                  Your Morning <br />
                  Has an{" "}
                  <em className="italic text-[#C48251] font-serif font-normal">
                    Origin.
                  </em>
                </h1>
              }
              description={
                <p className="text-sm sm:text-base text-cream-secondary/90 font-light leading-relaxed max-w-lg">
                  Authentic South Indian filter coffee, harvested beneath shade canopies in the hills of Karnataka.
                  Slow drum-roasted to yield thick golden decoctions, rich aroma, and a heritage in every cup.
                </p>
              }
              actions={
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2 w-full sm:w-auto">
                  <BrandButton
                    href="/shop"
                    variant="primary"
                    className="text-sm font-semibold px-6 py-3 rounded-xl shadow-copper flex items-center justify-center gap-2"
                  >
                    <span>Shop Coffees</span>
                    <ArrowRight className="w-4 h-4 ml-0.5" />
                  </BrandButton>

                  <BrandButton
                    href="/our-story"
                    variant="outline"
                    className="text-sm font-medium px-5 py-3 rounded-xl border-[#4A3022] text-cream-light hover:border-copper/70 hover:bg-copper/10 flex items-center justify-center gap-2"
                  >
                    <span>Our Story</span>
                    <span className="w-4 h-4 rounded-full border border-current flex items-center justify-center text-[8px] shrink-0">
                      <Play className="w-2 h-2 fill-current ml-0.5" />
                    </span>
                  </BrandButton>

                  <Link
                    href="/coffee-finder"
                    className="text-xs sm:text-sm text-copper-light hover:text-cream-light underline underline-offset-4 flex items-center justify-center gap-1 px-2 py-2 transition-colors"
                  >
                    Find Your Coffee Match →
                  </Link>
                </div>
              }
            />

            {/* Micro Trust Indicators below CTAs */}
            <div className="mt-8 pt-5 border-t border-[#3D271B]/50 flex flex-wrap items-center gap-4 text-xs text-cream-secondary/80 font-light">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-forest-light shrink-0" />
                <span>Single-Estate Harvest</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <span className="text-copper-light font-medium">80:20 & 100% Pure Blends</span>
              </div>
              <span>•</span>
              <div>
                <span>Direct Farmer Trade</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Brass Coffee Tumbler Artwork & Calibrated Steam */}
          <div
            ref={artworkRef}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            className="lg:col-span-6 flex justify-center lg:justify-end relative"
          >
            <div
              className="relative w-full max-w-[560px] aspect-[527/310] flex items-center justify-center transition-transform duration-300 ease-out"
              style={{
                transform: `translate3d(${pointerOffset.x}px, ${pointerOffset.y}px, 0)`,
              }}
            >
              {/* Photorealistic Animated Coffee Steam Layer mounted right above brass tumbler */}
              <CoffeeSteam className="-top-14 sm:-top-20 left-[48%] -translate-x-1/2 w-44 sm:w-56 h-40 sm:h-48" />

              {/* Master Brass Tumbler Artwork with Natural Coffee Froth */}
              <div className="relative w-full h-full flex items-center justify-center select-none">
                <Image
                  src="/images/hero-coffee-tumbler.png"
                  alt="Traditional South Indian brass filter coffee tumbler in dabarah with thick frothy decoction"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 560px"
                  draggable={false}
                  onDragStart={(e) => e.preventDefault()}
                  onContextMenu={(e) => e.preventDefault()}
                  className="object-contain filter drop-shadow-[0_20px_45px_rgba(0,0,0,0.85)] kavero-nondraggable-image"
                />
              </div>

              {/* Subtle Warm Highlight Accent */}
              <div
                className="absolute inset-0 pointer-events-none rounded-full bg-radial from-copper/10 via-transparent to-transparent opacity-60 mix-blend-screen transition-transform duration-300"
                style={{
                  transform: `translate3d(${-pointerOffset.x * 0.5}px, ${-pointerOffset.y * 0.5}px, 0)`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
