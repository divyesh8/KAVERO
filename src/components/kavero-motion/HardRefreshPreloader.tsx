"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { CoffeeBeanRain } from "./CoffeeBeanRain";
import { KAVERO_MOTION } from "@/lib/kavero-motion-config";

gsap.registerPlugin(useGSAP);

const MARKER = "kavero:hard-refresh-key-time";
const TTL_MS = 7000;

/**
 * High-craft brand preloader:
 * - Uses transparent high-res KAVERO master wordmark
 * - Staggered coffee bean canvas physics
 * - Smooth transition into the hero
 * - Best-effort hard-refresh shortcut detection
 * - Respects prefers-reduced-motion
 */
export function HardRefreshPreloader() {
  const [visible, setVisible] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const logo = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!KAVERO_MOTION.hardRefreshPreloader) return;

    const mark = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      const hardKey =
        (event.ctrlKey && event.shiftKey && key === "r") ||
        (event.ctrlKey && event.key === "f5") ||
        (event.metaKey && event.shiftKey && key === "r");
      if (hardKey) {
        try {
          sessionStorage.setItem(MARKER, `${Date.now()}`);
        } catch {
          /* disabled storage */
        }
      }
    };
    document.addEventListener("keydown", mark, true);

    // Read the marker once after page reload, then consume it.
    let timestamp = 0;
    try {
      timestamp = Number(sessionStorage.getItem(MARKER) || 0);
      sessionStorage.removeItem(MARKER);
    } catch {
      /* disabled storage */
    }

    const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    const reload = nav?.type === "reload";
    const recentShortcut = timestamp > 0 && Date.now() - timestamp < TTL_MS;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Detect hard-refresh shortcut or first session visit flag
    if ((reload && recentShortcut) && !reduce) {
      setVisible(true);
    }

    return () => document.removeEventListener("keydown", mark, true);
  }, []);

  useGSAP(
    () => {
      if (!visible || !root.current || !logo.current) return;
      const timeline = gsap.timeline({ onComplete: () => setVisible(false) });
      timeline
        .fromTo(
          logo.current,
          { opacity: 0, scale: 0.92, y: 16 },
          { opacity: 1, scale: 1, y: 0, duration: 0.9, ease: "power3.out" },
          0.15
        )
        .to(logo.current, { y: -4, duration: 0.7, ease: "sine.inOut", yoyo: true, repeat: 1 }, 1.0)
        .to(root.current, { opacity: 0, duration: 0.7, ease: "power2.inOut" }, 2.4);
      return () => timeline.kill();
    },
    { dependencies: [visible], scope: root }
  );

  if (!visible) return null;

  return (
    <div
      ref={root}
      className="kavero-hard-refresh-overlay fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#140D09] text-[#F2E8D7] overflow-hidden"
      role="status"
      aria-label="KAVERO Coffee is loading"
    >
      <CoffeeBeanRain durationMs={3200} />
      <div ref={logo} className="kavero-preloader-logo relative z-10 flex flex-col items-center gap-4 text-center px-4">
        <div className="relative w-48 sm:w-60 h-16 sm:h-20 flex items-center justify-center select-none">
          <Image
            src="/images/kavero-logo-cream-4x.png"
            alt="KAVERO Coffee"
            fill
            sizes="240px"
            priority
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
            className="object-contain filter drop-shadow-[0_8px_20px_rgba(0,0,0,0.8)] kavero-nondraggable-image"
          />
        </div>
        <span className="font-serif tracking-[0.25em] text-[11px] sm:text-xs text-[#C7B2A1] uppercase font-light">
          From Our Estate. To Your Everyday.
        </span>
      </div>
    </div>
  );
}
