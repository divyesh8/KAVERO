"use client";

import { type ReactNode, type PointerEvent } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { KAVERO_MOTION } from "@/lib/kavero-motion-config";

type Props = { children: ReactNode; className?: string; ariaLabel?: string };

/**
 * Subtle 3D hover intended for the product MEDIA container, not a whole card.
 * This does not replace product images or change grid geometry.
 */
export function ProductTilt({ children, className = "", ariaLabel }: Props) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(x, { stiffness: 160, damping: 22, mass: 0.6 });
  const rotateY = useSpring(y, { stiffness: 160, damping: 22, mass: 0.6 });
  const enabled = KAVERO_MOTION.productTilt && !reduce;

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!enabled || event.pointerType !== "mouse") return;
    const r = event.currentTarget.getBoundingClientRect();
    const py = (event.clientY - r.top) / r.height - 0.5;
    const px = (event.clientX - r.left) / r.width - 0.5;
    x.set(-py * 5);
    y.set(px * 5);
  }

  function reset() { x.set(0); y.set(0); }

  return (
    <div className={`kavero-product-tilt-shell ${className}`}>
      <motion.div
        className="kavero-product-tilt-inner"
        aria-label={ariaLabel}
        onPointerMove={onPointerMove}
        onPointerLeave={reset}
        onPointerCancel={reset}
        style={enabled ? { rotateX, rotateY, transformPerspective: 900 } : undefined}
      >
        {children}
      </motion.div>
    </div>
  );
}
