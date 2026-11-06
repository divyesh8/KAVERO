"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { SectionReveal } from "@/components/kavero-motion/SectionReveal";
import { CUSTOMER_REVIEWS } from "@/data/reviews";
import { ReviewAvatar } from "@/components/ui/ReviewAvatar";

export function CustomerStories() {
  const [startIndex, setStartIndex] = useState(0);

  const prev = () => {
    setStartIndex((prev) => (prev > 0 ? prev - 1 : CUSTOMER_REVIEWS.length - 1));
  };

  const next = () => {
    setStartIndex((prev) => (prev < CUSTOMER_REVIEWS.length - 1 ? prev + 1 : 0));
  };

  return (
    <SectionReveal>
      <section id="reviews" className="relative w-full bg-[#1A1009] py-14 sm:py-20 border-t border-[#3D271B]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Heading */}
          <div className="flex flex-col items-center text-center mb-10 sm:mb-12 space-y-2">
            <span className="font-script text-copper-light text-2xl sm:text-3xl tracking-wide select-none">
              Tasting Impressions
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-cream-light font-normal tracking-tight">
              Loved by Coffee Enthusiasts
            </h2>
            <p className="text-xs sm:text-sm text-cream-secondary/80 max-w-md font-light">
              Authentic feedback from daily filter coffee drinkers across South India and beyond.
            </p>
          </div>

          {/* Testimonial Cards Carousel Wrapper */}
          <div className="relative">
            {/* Desktop Navigation Arrows */}
            <div className="hidden lg:flex justify-end gap-2 mb-4">
              <button
                onClick={prev}
                type="button"
                aria-label="Previous review"
                className="w-9 h-9 rounded-full border border-[#4A3022] bg-[#24160E] text-cream-light flex items-center justify-center hover:border-copper hover:text-copper transition-all shadow-lg active:scale-95 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={next}
                type="button"
                aria-label="Next review"
                className="w-9 h-9 rounded-full border border-[#4A3022] bg-[#24160E] text-cream-light flex items-center justify-center hover:border-copper hover:text-copper transition-all shadow-lg active:scale-95 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* 3 Cards Responsive Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 w-full items-stretch">
              {CUSTOMER_REVIEWS.map((review, idx) => (
                <div
                  key={review.id}
                  className={`bg-[#24160E] border border-[#3E2619] rounded-2xl p-5 sm:p-6 flex flex-col justify-between h-full transition-all duration-300 hover:border-copper/70 hover:shadow-luxury group ${
                    idx === startIndex ? "ring-1 ring-copper/50" : ""
                  }`}
                >
                  <div className="flex flex-col">
                    {/* Copper Quote Mark & Star Ratings */}
                    <div className="flex items-center justify-between mb-3.5 text-copper-light">
                      <Quote className="w-5 h-5 sm:w-6 sm:h-6 rotate-180 text-copper-light/80" />
                      <div className="flex items-center gap-1 text-[#D49354]" aria-label={`${review.rating} out of 5 stars`}>
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                    </div>

                    {/* Review Quote Body */}
                    <p className="text-xs sm:text-sm text-cream-light/90 leading-relaxed font-light mb-6 italic">
                      &ldquo;{review.quote}&rdquo;
                    </p>
                  </div>

                  {/* Unified Author Details with Premium Initial Avatar */}
                  <div className="flex items-center gap-3.5 pt-4 border-t border-[#3D271B]/60 mt-auto">
                    <ReviewAvatar name={review.author} size="md" />
                    <div className="flex flex-col justify-center min-w-0">
                      <span className="font-serif text-sm sm:text-base font-medium text-cream-light leading-snug tracking-wide group-hover:text-copper-light transition-colors truncate">
                        {review.author}
                      </span>
                      <span className="text-[11px] sm:text-xs text-[#C7B2A1]/85 font-light mt-0.5 tracking-normal">
                        {review.location} • Coffee Enthusiast
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile / Tablet Carousel Controls */}
            <div className="flex lg:hidden justify-center items-center gap-4 mt-6">
              <button
                onClick={prev}
                type="button"
                aria-label="Previous review"
                className="w-9 h-9 rounded-full border border-[#4A3022] bg-[#24160E] text-cream-light flex items-center justify-center hover:border-copper hover:text-copper transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs text-cream-secondary font-mono">
                {startIndex + 1} / {CUSTOMER_REVIEWS.length}
              </span>
              <button
                onClick={next}
                type="button"
                aria-label="Next review"
                className="w-9 h-9 rounded-full border border-[#4A3022] bg-[#24160E] text-cream-light flex items-center justify-center hover:border-copper hover:text-copper transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
