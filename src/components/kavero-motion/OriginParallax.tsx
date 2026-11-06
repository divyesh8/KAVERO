"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { KAVERO_MOTION } from "@/lib/kavero-motion-config";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Props = { children: ReactNode; className?: string };

/** GSAP owns ONLY the interior media layer. Keep text outside this wrapper. */
export function OriginParallax({ children, className = "" }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const media = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (!KAVERO_MOTION.originParallax || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!root.current || !media.current) return;
    gsap.fromTo(media.current,
      { yPercent: -6, scale: 1.08 },
      {
        yPercent: 6, scale: 1.08, ease: "none",
        scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 0.75 },
      }
    );
  }, { scope: root });

  return <div ref={root} className={`kavero-origin-parallax ${className}`}><div ref={media} className="kavero-origin-parallax__media">{children}</div></div>;
}
