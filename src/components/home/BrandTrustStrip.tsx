import React from "react";
import { Mountain, Users, Coffee } from "lucide-react";

export function BrandTrustStrip() {
  return (
    <section className="w-full bg-[#22140D] border-y border-[#3E2517] py-5 sm:py-6 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-0 lg:divide-x divide-[#3E2517]/70">
          {/* Item 1: Estate-Grown */}
          <div className="flex items-center gap-3.5 lg:justify-center lg:px-6">
            <div className="w-11 h-11 rounded-full border border-copper/60 flex items-center justify-center text-copper-light shrink-0 bg-[#2D1B12] shadow-copper">
              <Mountain className="w-5 h-5 stroke-[1.5]" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs sm:text-sm font-semibold text-cream-light leading-tight">
                Estate-Grown
              </span>
              <span className="text-[11px] sm:text-xs text-cream-secondary/80 font-light mt-0.5">
                Chikmagalur & Coorg
              </span>
            </div>
          </div>

          {/* Item 2: Farmer-Owned */}
          <div className="flex items-center gap-3.5 lg:justify-center lg:px-6">
            <div className="w-11 h-11 rounded-full border border-copper/60 flex items-center justify-center text-copper-light shrink-0 bg-[#2D1B12] shadow-copper">
              <Users className="w-5 h-5 stroke-[1.5]" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs sm:text-sm font-semibold text-cream-light leading-tight">
                Farmer-Owned
              </span>
              <span className="text-[11px] sm:text-xs text-cream-secondary/80 font-light mt-0.5">
                Direct Trade Model
              </span>
            </div>
          </div>

          {/* Item 3: Rich South Indian Filter Coffee */}
          <div className="flex items-center gap-3.5 lg:justify-center lg:px-6">
            <div className="w-11 h-11 rounded-full border border-copper/60 flex items-center justify-center text-copper-light shrink-0 bg-[#2D1B12] shadow-copper">
              <Coffee className="w-5 h-5 stroke-[1.5]" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs sm:text-sm font-semibold text-cream-light leading-tight">
                Traditional Brew
              </span>
              <span className="text-[11px] sm:text-xs text-cream-secondary/80 font-light mt-0.5">
                Authentic Brass Filter
              </span>
            </div>
          </div>

          {/* Item 4: Freshly Roasted */}
          <div className="flex items-center gap-3.5 lg:justify-center lg:px-6">
            <div className="w-11 h-11 rounded-full border border-copper/60 flex items-center justify-center text-copper-light shrink-0 bg-[#2D1B12] shadow-copper">
              <svg
                className="w-5 h-5 fill-current text-copper-light"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M7 6C4.5 9 5 13 8 15C11 17 14.5 15.5 16 13C14 12 11 11.5 9 10C7.5 9 6.5 7.5 7 6Z" opacity="0.9" />
                <path d="M17 18C19.5 15 19 11 16 9C13 7 9.5 8.5 8 11C10 12 13 12.5 15 14C16.5 15 17.5 16.5 17 18Z" opacity="0.6" />
              </svg>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs sm:text-sm font-semibold text-cream-light leading-tight">
                Freshly Roasted
              </span>
              <span className="text-[11px] sm:text-xs text-cream-secondary/80 font-light mt-0.5">
                Small-Batch Drum Craft
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
