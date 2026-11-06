"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { KAVERO_MOTION } from "@/lib/kavero-motion-config";

gsap.registerPlugin(useGSAP);

/**
 * Photorealistic Coffee Steam:
 * - Originates precisely from the top froth line of the South Indian brass tumbler
 * - Translucent streams with varying speeds, staggered phase offsets, and sine easing
 * - Slight horizontal drift and varying opacity without cartoonish thick white smoke
 * - Respects prefers-reduced-motion
 */
const STEAM_PATHS = [
  { d: "M75 140 C55 110 95 80 70 45 C50 15 80 -10 65 -40", strokeWidth: 5, duration: 4.8, delay: 0 },
  { d: "M100 145 C120 115 85 85 110 50 C130 20 95 -15 115 -45", strokeWidth: 6, duration: 5.6, delay: 0.8 },
  { d: "M125 142 C105 112 140 82 118 48 C100 18 135 -12 120 -42", strokeWidth: 5.5, duration: 5.2, delay: 1.6 },
  { d: "M150 148 C175 118 135 88 160 52 C180 22 145 -18 165 -48", strokeWidth: 5, duration: 6.0, delay: 2.3 },
  { d: "M115 144 C90 114 130 84 105 50 C85 20 120 -10 102 -40", strokeWidth: 4.5, duration: 4.4, delay: 3.1 },
];

export function CoffeeSteam({ className = "" }: { className?: string }) {
  const scope = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      if (!KAVERO_MOTION.coffeeSteam || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const streams = gsap.utils.toArray<SVGPathElement>("[data-steam-path]", scope.current);

      streams.forEach((stream, index) => {
        const item = STEAM_PATHS[index] || STEAM_PATHS[0];

        // Continuous subtle upward plume with organic horizontal wafting
        gsap.fromTo(
          stream,
          {
            opacity: 0.03,
            y: 18,
            x: 0,
            scaleY: 0.85,
            scaleX: 0.95,
          },
          {
            opacity: 0.22 - index * 0.02,
            y: -42 - index * 6,
            x: index % 2 === 0 ? 12 : -10,
            scaleY: 1.25,
            scaleX: 1.15,
            duration: item.duration,
            delay: item.delay,
            ease: "power1.out",
            repeat: -1,
            yoyo: true,
          }
        );
      });
    },
    { scope }
  );

  return (
    <svg
      ref={scope}
      className={`absolute pointer-events-none select-none overflow-visible z-20 ${className}`}
      viewBox="0 0 220 180"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <defs>
        <filter id="kavero-steam-fine-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4.5" />
        </filter>
        <linearGradient id="kavero-steam-grad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#F2E8D7" stopOpacity="0.02" />
          <stop offset="35%" stopColor="#F5E8D7" stopOpacity="0.25" />
          <stop offset="70%" stopColor="#FFF7EA" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#F2E8D7" stopOpacity="0.0" />
        </linearGradient>
      </defs>

      {STEAM_PATHS.map((item, index) => (
        <path
          key={index}
          data-steam-path
          d={item.d}
          fill="none"
          stroke="url(#kavero-steam-grad)"
          strokeWidth={item.strokeWidth}
          strokeLinecap="round"
          filter="url(#kavero-steam-fine-blur)"
          className="opacity-15"
        />
      ))}
    </svg>
  );
}
