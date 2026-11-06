import React from "react";

interface ReviewAvatarProps {
  name: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

/**
 * Premium typographic customer avatar for KAVERO reviews.
 * Uses Playfair Display serif typography, warm espresso background tones,
 * and refined copper outlines, providing a luxurious brand-consistent aesthetic
 * without requiring external image requests.
 */
export function ReviewAvatar({ name, className = "", size = "md" }: ReviewAvatarProps) {
  const trimmed = (name || "").trim();
  const initial = trimmed ? trimmed.charAt(0).toUpperCase() : "K";

  const sizeClass = {
    sm: "w-9 h-9 text-lg",
    md: "",
    lg: "w-14 h-14 text-2xl",
  }[size];

  return (
    <div
      role="img"
      aria-label={`Customer review avatar for ${trimmed || "Customer"}`}
      className={`kavero-review-avatar relative ${sizeClass} ${className}`}
    >
      {/* Subtle inner circular highlight */}
      <div className="absolute inset-[1px] rounded-full border border-white/5 pointer-events-none" />

      {/* Dynamic uppercase initial */}
      <span className="relative z-10 leading-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] transform translate-y-[-0.5px]">
        {initial}
      </span>
    </div>
  );
}
