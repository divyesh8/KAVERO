import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata = {
  title: "Our Story — Heritage, Agroforestry & Farmer Trade",
  description:
    "Discover KAVERO Coffee's story: shade-grown Karnataka estate cultivation, direct farmer partnership, and authentic South Indian filter coffee craftsmanship.",
};

export default function OurStoryPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#140D09] text-cream">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full">
        {/* Editorial Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <span className="font-script text-copper-light text-3xl sm:text-4xl tracking-wide select-none">
            From Our Estate. To Your Everyday.
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-cream-light font-normal tracking-tight leading-tight">
            The Story of KAVERO
          </h1>
          <p className="text-sm sm:text-base text-cream-secondary/90 font-light leading-relaxed">
            Born from an unwavering belief that India’s greatest coffees belong in every morning cup,
            crafted by the hands of the growers who have tended Karnataka’s highlands for generations.
          </p>
        </div>

        {/* Feature Hero Split: Harvest & Philosophy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-20">
          <div className="lg:col-span-6 relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#482E1F] bg-[#1E120B] shadow-luxury select-none">
            <Image
              src="/images/origin-harvest-highres.jpg"
              alt="Selective hand harvesting of ripe coffee cherries in Chikmagalur"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 600px"
              draggable={false}
              className="object-cover kavero-nondraggable-image"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#140D09]/70 via-transparent to-transparent pointer-events-none" />
            <span className="absolute bottom-4 left-4 text-xs font-mono text-copper-light bg-[#140D09]/80 px-3 py-1 rounded-md border border-[#3E2619]">
              Selective Hand Harvest • Western Ghats
            </span>
          </div>

          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs uppercase font-mono tracking-widest text-copper-light font-semibold block">
              Chapter I: The Cradle of Indian Coffee
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-cream-light font-normal leading-snug">
              Centuries of Soil, Mist, and Mountain Rainforest
            </h2>
            <p className="text-xs sm:text-sm text-cream-secondary/90 leading-relaxed font-light">
              In the 17th century, the venerated saint Baba Budan returned from the Arabian port of Mocha with seven raw coffee beans strapped securely to his chest, planting them in the Chandragiri hills of Chikmagalur. That daring act ignited India’s proud coffee legacy.
            </p>
            <p className="text-xs sm:text-sm text-cream-secondary/90 leading-relaxed font-light">
              Today, KAVERO continues this unbroken lineage. Our coffees are nurtured under natural shade canopies formed by silver oak, wild rosewood, and sprawling cardamom shrubs. High altitude, rich red loamy volcanic soil, and seasonal monsoon rains create beans with peerless density, honeyed sweetness, and low bitterness.
            </p>
          </div>
        </div>

        {/* Feature 2: The Direct Farmer Model */}
        <div className="bg-[#1F120B] border border-[#3E2619] rounded-2xl lg:rounded-3xl p-8 sm:p-12 mb-20 shadow-luxury">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-10">
            <div className="w-12 h-12 rounded-full bg-copper/15 border border-copper/30 flex items-center justify-center text-copper-light mx-auto">
              <Users className="w-6 h-6 stroke-[1.5]" />
            </div>
            <span className="text-xs uppercase font-mono tracking-widest text-copper-light font-semibold block">
              Chapter II: Ethical Direct Trade
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-cream-light font-normal">
              Farmer-Owned & Community Sustained
            </h2>
            <p className="text-xs sm:text-sm text-cream-secondary/90 font-light leading-relaxed">
              Industrial commercial coffee often passes through four to six intermediaries before reaching your cup, leaving smallholder farmers with a fraction of the value.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="p-6 rounded-2xl bg-[#170E08] border border-[#3E2619]">
              <span className="text-copper-light font-serif text-2xl font-bold block mb-2">01</span>
              <h3 className="font-serif text-base text-cream-light font-medium mb-1.5">Direct Farm Procurement</h3>
              <p className="text-xs text-cream-secondary/80 font-light leading-relaxed">
                We purchase directly from certified family-owned estate lots in Chikmagalur and Coorg, cutting out broker markups.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#170E08] border border-[#3E2619]">
              <span className="text-copper-light font-serif text-2xl font-bold block mb-2">02</span>
              <h3 className="font-serif text-base text-cream-light font-medium mb-1.5">Living Wage Premiums</h3>
              <p className="text-xs text-cream-secondary/80 font-light leading-relaxed">
                Grower partners receive guaranteed minimum prices 20–35% above commodity market rates to reinvest in regenerative agriculture.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#170E08] border border-[#3E2619]">
              <span className="text-copper-light font-serif text-2xl font-bold block mb-2">03</span>
              <h3 className="font-serif text-base text-cream-light font-medium mb-1.5">Origin Drum Roasting</h3>
              <p className="text-xs text-cream-secondary/80 font-light leading-relaxed">
                Beans are roasted and packed at our roastery near the estates, locking in freshness before transit across India.
              </p>
            </div>
          </div>
        </div>

        {/* Feature 3: The Authentic Filter Coffee Soul */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-16">
          <div className="lg:col-span-6 space-y-5 order-2 lg:order-1">
            <span className="text-xs uppercase font-mono tracking-widest text-copper-light font-semibold block">
              Chapter III: The Decoction Soul
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-cream-light font-normal leading-snug">
              Preserving the Authentic Brass Tumbler Ritual
            </h2>
            <p className="text-xs sm:text-sm text-cream-secondary/90 leading-relaxed font-light">
              While modern third-wave coffee often focuses solely on espresso or light pour-overs, we honor the profound depth of traditional South Indian Filter Coffee.
            </p>
            <p className="text-xs sm:text-sm text-cream-secondary/90 leading-relaxed font-light">
              Our master roasters meticulously slow-roast high-grown plantation beans alongside artisanal French-style chicory root. The resulting blend is calibrated to yield a thick, syrupy first decoction that marries perfectly with whole milk and natural jaggery.
            </p>
            <div className="pt-2">
              <Link
                href="/brew-guide"
                className="text-xs font-semibold text-copper-light hover:text-cream-light underline underline-offset-4 flex items-center gap-1.5"
              >
                <span>Read our step-by-step Filter Coffee Brew Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#482E1F] bg-[#1E120B] shadow-luxury order-1 lg:order-2 select-none">
            <Image
              src="/images/about-kavero-estate.png"
              alt="KAVERO filter coffee packaging on rustic wood with coffee cherries"
              fill
              sizes="(max-width: 1024px) 100vw, 600px"
              draggable={false}
              className="object-cover kavero-nondraggable-image"
            />
          </div>
        </div>

        {/* Final CTA Strip */}
        <div className="text-center pt-8 border-t border-[#3E2619]/60 space-y-4">
          <h3 className="font-serif text-2xl text-cream-light font-normal">
            Taste the Heritage of Karnataka
          </h3>
          <p className="text-xs sm:text-sm text-cream-secondary/80 font-light max-w-md mx-auto">
            Small-batch, drum-roasted fresh, delivered to your door anywhere in India.
          </p>
          <div className="pt-2">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-copper hover:bg-copper-hover text-[#FFF7EA] text-sm font-semibold px-7 py-3.5 rounded-xl shadow-copper transition-all"
            >
              <span>Explore Our Coffee Collection</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
