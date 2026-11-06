"use client";

import { useEffect, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { KAVERO_MOTION } from "@/lib/kavero-motion-config";

type Props = {
  eyebrow: ReactNode;
  title: ReactNode;
  description: ReactNode;
  actions: ReactNode;
  className?: string;
};

/** Motion owns ONLY the text-group entry transforms, never the mug/media layer. */
export function HeroIntro({ eyebrow, title, description, actions, className }: Props) {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const enabled = mounted && KAVERO_MOTION.heroIntro && !reduce;
  const items = [eyebrow, title, description, actions];

  return (
    <motion.div
      className={className}
      initial={enabled ? "hidden" : false}
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
      }}
    >
      {items.map((item, index) => (
        <motion.div
          key={index}
          variants={{
            hidden: { opacity: 0, y: 14 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
          }}
        >
          {item}
        </motion.div>
      ))}
    </motion.div>
  );
}
