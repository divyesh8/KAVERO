"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { KAVERO_MOTION } from "@/lib/kavero-motion-config";

gsap.registerPlugin(useGSAP);

interface FloatingLeavesProps {
  className?: string;
  variant?: "hero" | "about";
}

export function FloatingLeaves({ className = "", variant = "hero" }: FloatingLeavesProps) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!KAVERO_MOTION.leafSway || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const primary = scope.current?.querySelector<HTMLElement>("[data-sway-primary]");
      const secondary = scope.current?.querySelector<HTMLElement>("[data-sway-secondary]");

      if (primary) {
        gsap.to(primary, {
          rotation: 2.8,
          x: 4,
          y: -3,
          ease: "sine.inOut",
          duration: 5.6,
          repeat: -1,
          yoyo: true,
          transformOrigin: "top right",
        });
      }

      if (secondary) {
        gsap.to(secondary, {
          rotation: -2.2,
          x: -3,
          y: 3,
          ease: "sine.inOut",
          duration: 6.4,
          delay: 0.6,
          repeat: -1,
          yoyo: true,
          transformOrigin: "bottom right",
        });
      }
    },
    { scope }
  );

  return (
    <div
      ref={scope}
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none select-none overflow-hidden z-10 ${className}`}
    >
      {/* Primary Top-Right Coffee Foliage with Ripe Cherries */}
      <div
        data-sway-primary
        className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 w-36 sm:w-48 lg:w-56 h-48 sm:h-64 lg:h-72 opacity-90 filter drop-shadow-[0_8px_24px_rgba(0,0,0,0.6)]"
      >
        <Image
          src="/images/about-foliage-exact.png"
          alt=""
          fill
          sizes="(max-width: 768px) 192px, 256px"
          draggable={false}
          onDragStart={(e) => e.preventDefault()}
          onContextMenu={(e) => e.preventDefault()}
          className="object-contain object-top-right kavero-nondraggable-image"
        />
      </div>

      {/* Secondary Accent Foliage */}
      {variant === "hero" && (
        <div
          data-sway-secondary
          className="hidden lg:block absolute bottom-2 -right-8 w-40 h-44 opacity-60 filter drop-shadow-[0_6px_18px_rgba(0,0,0,0.5)] rotate-45"
        >
          <Image
            src="/images/foliage-cherry-branch.png"
            alt=""
            fill
            sizes="160px"
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
            onContextMenu={(e) => e.preventDefault()}
            className="object-contain kavero-nondraggable-image"
          />
        </div>
      )}
    </div>
  );
}
