import React from "react";
import { Sprout, Sparkles } from "lucide-react";
import { BRAND } from "@/lib/brand";

export function AnnouncementBar() {
  const [first, second, third] = BRAND.announcement.items;

  return (
    <div className="w-full bg-[#16241A] border-b border-[#294736]/50 text-cream-muted py-2 px-4 select-none z-50 relative">
      <div className="max-w-7xl mx-auto flex items-center justify-center text-[11px] sm:text-xs tracking-wide">
        <div className="flex items-center gap-2">
          <Sprout className="w-3.5 h-3.5 text-copper-light shrink-0 stroke-[1.75]" />
          <span className="font-medium text-cream-light">{first}</span>
        </div>

        <span className="mx-3 sm:mx-4 text-[#294736] font-light" aria-hidden="true">
          •
        </span>

        <span className="hidden sm:inline font-light text-cream-secondary">{second}</span>

        <span className="hidden md:inline mx-3 sm:mx-4 text-[#294736] font-light" aria-hidden="true">
          •
        </span>

        <span className="hidden md:inline font-light text-copper-light flex items-center gap-1">
          <Sparkles className="w-2.5 h-2.5" />
          {third}
        </span>
      </div>
    </div>
  );
}
