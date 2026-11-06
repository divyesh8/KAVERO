import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mountain, Droplets, Sun, Wind } from "lucide-react";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata = {
  title: "Our Karnataka Estates — Western Ghats Origins",
  description:
    "Explore KAVERO's single-estate coffee terroir across Chikmagalur, Coorg, and Baba Budan Giri. Shade-grown agroforestry at 4,000+ feet in the Western Ghats.",
};

export default function OurEstatesPage() {
  const regions = [
    {
      name: "Chikmagalur Highlands",
      elevation: "3,800 – 4,200 ft MSL",
      soil: "Deep Volcanic Loam",
      varietals: "Washed Arabica (Selection 795, Cauvery)",
      description:
        "The sacred cradle of Indian coffee. Perched along the crest of the Western Ghats, these estates receive steady mountain mists and cool night breezes that slow cherry maturation, concentrating sugars and producing notes of wild honey, cocoa, and sweet jaggery.",
      image: "/images/origin-waterfall-highres.jpg",
      badge: "Estate Lot #01",
    },
    {
      name: "Coorg Valley Estates",
      elevation: "3,500 – 4,000 ft MSL",
      soil: "Mineral-Rich Red Forest Soil",
      varietals: "Monsooned Robusta & Arabica",
      description:
        "Known historically as Kodagu, this region experiences thunderous southwest monsoons. Coffee bushes thrive beneath the dense foliage of silver oak, jackfruit, and wild fig trees. Yields bold, heavy-bodied beans with deep dark chocolate undertones and smoky spice.",
      image: "/images/origin-harvest-highres.jpg",
      badge: "Estate Lot #02",
    },
    {
      name: "Baba Budan Giri Ridge",
      elevation: "4,200 – 4,800 ft MSL",
      soil: "Humus-Dense Mountain Peat",
      varietals: "Artisanal Micro-Lots & Heirloom Arabica",
      description:
        "High-altitude mountain ridges where clouds brush the treetops at daybreak. Extreme diurnal temperature swings foster unmatched complexity, delicate jasmine floral aromatics, and clean, lingering citric acidity.",
      image: "/images/about-kavero-estate.png",
      badge: "Estate Lot #03",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#140D09] text-cream">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full">
        {/* Editorial Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <span className="font-script text-copper-light text-3xl sm:text-4xl tracking-wide select-none">
            Western Ghats Terroir
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-cream-light font-normal tracking-tight leading-tight">
            Our Karnataka Estates
          </h1>
          <p className="text-sm sm:text-base text-cream-secondary/90 font-light leading-relaxed">
            Every bean in a KAVERO pouch is traceable to certified family shade-grown estates
            nestled in the UNESCO-recognized biodiversity hotspot of the Western Ghats.
          </p>
        </div>

        {/* Video Feature Card */}
        <div className="relative w-full aspect-video max-h-[480px] rounded-2xl lg:rounded-3xl overflow-hidden border border-[#4A3022] bg-black mb-20 shadow-luxury">
          <video
            autoPlay
            loop
            muted
            playsInline
            controls
            poster="/videos/kavero-origin-poster.jpg"
            className="w-full h-full object-cover"
          >
            <source src="/videos/kavero-origin-video.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Climate & Agroforestry Pillars */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-20">
          <div className="p-5 rounded-2xl bg-[#1F120B] border border-[#3E2619] text-center space-y-2">
            <Mountain className="w-6 h-6 text-copper-light mx-auto" />
            <h3 className="font-serif text-sm font-semibold text-cream-light">High Elevation</h3>
            <p className="text-[11px] text-cream-secondary/80 font-light">3,500 to 4,800 ft above sea level</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#1F120B] border border-[#3E2619] text-center space-y-2">
            <Droplets className="w-6 h-6 text-copper-light mx-auto" />
            <h3 className="font-serif text-sm font-semibold text-cream-light">Pure Mountain Waters</h3>
            <p className="text-[11px] text-cream-secondary/80 font-light">Fed by natural Western Ghats streams</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#1F120B] border border-[#3E2619] text-center space-y-2">
            <Sun className="w-6 h-6 text-copper-light mx-auto" />
            <h3 className="font-serif text-sm font-semibold text-cream-light">100% Shade-Grown</h3>
            <p className="text-[11px] text-cream-secondary/80 font-light">Under natural rainforest canopies</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#1F120B] border border-[#3E2619] text-center space-y-2">
            <Wind className="w-6 h-6 text-copper-light mx-auto" />
            <h3 className="font-serif text-sm font-semibold text-cream-light">Gentle Mist & Air</h3>
            <p className="text-[11px] text-cream-secondary/80 font-light">Slow cherry ripening over 9 months</p>
          </div>
        </div>

        {/* The 3 Regional Estates */}
        <div className="space-y-16 mb-20">
          <div className="text-center">
            <span className="text-xs uppercase font-mono tracking-widest text-copper-light font-semibold block">
              Distinct Geographic Terroirs
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-cream-light font-normal">
              Three Iconic Coffee Highlands
            </h2>
          </div>

          <div className="space-y-12">
            {regions.map((reg, idx) => (
              <div
                key={reg.name}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-[#1F120B] border border-[#3E2619] rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-luxury ${
                  idx % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className={`lg:col-span-6 relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#3E2619] bg-[#140D09] select-none ${idx % 2 === 1 ? "lg:order-2" : ""}`}>
                  <Image
                    src={reg.image}
                    alt={reg.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 550px"
                    draggable={false}
                    className="object-cover kavero-nondraggable-image"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#140D09]/60 via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 bg-copper/90 text-white text-[11px] font-mono px-3 py-1 rounded-md font-semibold">
                    {reg.badge}
                  </span>
                </div>

                <div className={`lg:col-span-6 space-y-4 ${idx % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-copper-light font-semibold">
                      {reg.elevation}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl text-cream-light font-normal mt-1">
                      {reg.name}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-cream-secondary/90 leading-relaxed font-light">
                    {reg.description}
                  </p>

                  <div className="p-4 rounded-xl bg-[#170E08] border border-[#3E2619] space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-cream-secondary/70">Soil Type:</span>
                      <span className="text-cream-light font-medium">{reg.soil}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cream-secondary/70">Key Varietals:</span>
                      <span className="text-cream-light font-medium">{reg.varietals}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-8 border-t border-[#3E2619]/60 space-y-4">
          <h3 className="font-serif text-2xl text-cream-light font-normal">
            Taste These Single-Estate Lots
          </h3>
          <p className="text-xs sm:text-sm text-cream-secondary/80 font-light max-w-md mx-auto">
            Packed at origin in one-way valve aroma pouches and shipped direct to your kitchen.
          </p>
          <div className="pt-2">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-copper hover:bg-copper-hover text-[#FFF7EA] text-sm font-semibold px-7 py-3.5 rounded-xl shadow-copper transition-all"
            >
              <span>Shop Estate Coffees</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
