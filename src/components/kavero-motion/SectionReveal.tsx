"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { KAVERO_MOTION } from "@/lib/kavero-motion-config";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

type Props = {
  children: ReactNode;
  className?: string;
  distance?: number;
  delay?: number;
};

/**
 * GSAP owns the wrapper's y/opacity only. Do not put ProductTilt or HeroIntro
 * animations on this same DOM node. The child may animate its own transforms.
 */
export function SectionReveal({ children, className, distance = 20, delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const element = ref.current;
    if (!element || !KAVERO_MOTION.sectionReveal) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Check if element is already inside or near viewport
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      gsap.fromTo(
        element,
        { opacity: 0, y: Math.min(distance, 14) },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: Math.min(delay, 0.15),
          ease: "power2.out",
          clearProps: "all",
        }
      );
      return;
    }

    gsap.fromTo(
      element,
      { opacity: 0, y: distance },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        delay,
        ease: "power2.out",
        clearProps: "all",
        scrollTrigger: {
          trigger: element,
          start: "top 95%",
          once: true,
        },
      }
    );
  }, { scope: ref, dependencies: [delay, distance] });

  return <div ref={ref} className={className}>{children}</div>;
}
