import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { SectionReveal } from "@/components/kavero-motion/SectionReveal";
import { BrandButton } from "@/components/kavero-motion/BrandButton";
import { BRAND } from "@/lib/brand";

export function AboutKavero() {
  return (
    <SectionReveal>
      <section id="about" className="relative w-full bg-[#1F120B] py-14 sm:py-20 overflow-hidden">
        {/* Subtle Ambient Radial Highlight */}
        <div className="absolute top-1/2 left-0 w-80 h-80 bg-copper/8 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Authentic Coffee Branch Foliage framing the top right */}
          <div className="absolute -top-8 right-2 sm:right-6 md:right-10 w-32 sm:w-44 md:w-52 h-52 sm:h-64 pointer-events-none z-10 select-none opacity-85">
            <Image
              src="/images/about-foliage-exact.png"
              alt=""
              fill
              sizes="(max-width: 768px) 140px, 208px"
              draggable={false}
              className="object-contain object-top-right filter drop-shadow-[0_6px_20px_rgba(0,0,0,0.7)] kavero-nondraggable-image"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Product Pouch & Estate Scene Card */}
            <div className="lg:col-span-6 flex justify-center lg:justify-start">
              <div className="relative w-full max-w-[520px] aspect-[444/280] rounded-2xl overflow-hidden shadow-luxury border border-[#482E1F] bg-[#2A1A12] group select-none">
                <Image
                  src="/images/about-kavero-estate.png"
                  alt="KAVERO filter coffee packaging on rustic wood with coffee cherries and Karnataka misty hills"
                  fill
                  sizes="(max-width: 1024px) 100vw, 520px"
                  draggable={false}
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.02] kavero-nondraggable-image"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#140D09]/50 via-transparent to-transparent pointer-events-none" />
                <span className="absolute bottom-3 left-4 text-[11px] uppercase tracking-widest text-copper-light font-medium bg-[#140D09]/80 px-2.5 py-1 rounded border border-[#3E2619]">
                  Chikmagalur Highlands Lot #04
                </span>
              </div>
            </div>

            {/* Right Column: Editorial Copy & Core Values */}
            <div className="lg:col-span-6 flex flex-col items-start space-y-4 sm:space-y-5">
              <span className="font-script text-copper-light text-3xl sm:text-4xl tracking-wide select-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
                About KAVERO
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] text-cream-light font-normal leading-[1.12] tracking-tight">
                More Than <br />
                Just{" "}
                <span className="text-[#C48251] font-serif">
                  Coffee.
                </span>
              </h2>

              <p className="text-sm sm:text-base text-cream-secondary/90 font-light leading-relaxed max-w-lg">
                At KAVERO, coffee is a sacred journey from our Karnataka estates to your morning cup.
                Rooted in deep volcanic soil and shaded beneath native rainforest canopies, our beans are
                nurtured by third-generation grower families who treat harvesting as an art form.
              </p>

              {/* 4 Brand Values List */}
              <ul className="space-y-2.5 pt-1 text-xs sm:text-sm text-cream-light/95 w-full">
                {BRAND.aboutValues.map((value) => (
                  <li key={value} className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full border border-copper/80 flex items-center justify-center text-copper-light shrink-0 bg-copper/10">
                      <Check className="w-3 h-3 stroke-[2.5]" />
                    </span>
                    <span className="font-medium text-cream-light">{value}</span>
                  </li>
                ))}
              </ul>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <BrandButton
                  href="/our-story"
                  variant="primary"
                  className="text-sm font-semibold px-6 py-3 rounded-xl shadow-copper flex items-center gap-2"
                >
                  <span>Learn Our Story</span>
                  <ArrowRight className="w-4 h-4 ml-0.5" />
                </BrandButton>

                <Link
                  href="/our-estates"
                  className="text-sm text-copper-light hover:text-cream-light underline underline-offset-4 transition-colors"
                >
                  Explore Karnataka Origins →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
