"use client";

import { type ReactNode } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { KAVERO_MOTION } from "@/lib/kavero-motion-config";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline";
  className?: string;
};

/** Links navigate; decoration remains CSS, Motion adjusts only translateY. */
export function BrandButton({ href, children, variant = "primary", className = "" }: Props) {
  const reduce = useReducedMotion();
  const enable = KAVERO_MOTION.buttonMotion && !reduce;
  return (
    <motion.div
      className="kavero-motion-button-wrap"
      whileHover={enable ? { y: -2 } : undefined}
      whileTap={enable ? { y: 0, scale: 0.985 } : undefined}
      transition={{ type: "spring", stiffness: 450, damping: 30 }}
    >
      <Link href={href} className={`kavero-motion-button kavero-motion-button--${variant} ${className}`}>
        {children}
      </Link>
    </motion.div>
  );
}
