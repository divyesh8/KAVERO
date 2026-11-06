import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata = {
  title: "The South Indian Filter Coffee Ritual & Brew Guide",
  description:
    "Master the century-old South Indian filter coffee ritual. Step-by-step guidance on decoction ratios, traditional brass filter percolation, and the art of the dabarah froth.",
};

export default function BrewGuidePage() {
  const steps = [
    {
      num: "01",
      title: "Measure & Bed the Coffee",
      instruction:
        "Add 2.5 rounded tablespoons (approx. 20–22 g) of fresh KAVERO Original Filter Coffee or Bold Roast into the upper chamber of your brass filter. Place the umbrella pressing disc gently on top of the coffee bed — do not press excessively hard, simply level the grinds.",
      tip: "Use an 80:20 or 70:30 coffee-chicory blend for that iconic viscous mouthfeel and caramel-sweet aroma.",
    },
    {
      num: "02",
      title: "The Water & Saturation Pour",
      instruction:
        "Bring 100–120 ml of fresh mountain or filtered water to a rolling boil, then remove from heat for 30 seconds to reach 93–95°C. Slowly pour the boiling water in gentle concentric circles over the umbrella disc until filled to the brim. Place the brass lid on immediately to trap the volatile aromatic oils.",
      tip: "Never pour boiling water directly onto dry grinds without the disc; it causes channels and uneven extraction.",
    },
    {
      num: "03",
      title: "The 12-Minute Slow Decoction",
      instruction:
        "Allow gravity to work. Over the next 10 to 15 minutes, hot water slowly percolates through the compressed coffee bed, dripping drop by drop into the lower container. The resulting liquid — known as the 'first decoction' ('Modal Kashaayam') — is thick, dark as obsidian, and rich in natural emulsified crema.",
      tip: "If percolation takes longer than 20 minutes, your grind is too fine; if it rushes through in under 5 minutes, grind finer.",
    },
    {
      num: "04",
      title: "The Milk & Aerating Froth ('Attu')",
      instruction:
        "Heat full-fat whole milk until steaming and lightly frothy (do not scorch). Pour 30–40 ml of your fresh first decoction into the classic brass dabarah, add raw jaggery or sugar to taste, and pour in 70–80 ml of hot milk. Now perform the signature 'Attu' motion: pour the coffee back and forth between the tumbler and dabarah from heights of 1 to 2 feet in broad fluid arcs.",
      tip: "The aeration creates silky microscopic froth, dissolves sugars evenly, and cools the brew to the ideal sipping temperature of 65°C.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#140D09] text-cream">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full">
        {/* Editorial Guide Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <span className="font-script text-copper-light text-3xl sm:text-4xl tracking-wide select-none">
            Centuries of Heritage
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-cream-light font-normal tracking-tight leading-tight">
            The Filter Coffee Ritual
          </h1>
          <p className="text-sm sm:text-base text-cream-secondary/90 font-light leading-relaxed">
            In Karnataka and across South India, morning coffee is not a hasty transaction — it is a fragrant, measured meditation.
            Here is how to brew the quintessential tumbler of filter coffee in your own home.
          </p>
        </div>

        {/* Hero Brass Tumbler Visual Banner */}
        <div className="relative w-full aspect-[21/9] max-h-[420px] rounded-2xl lg:rounded-3xl overflow-hidden border border-[#4A3022] bg-[#1E120B] mb-16 shadow-luxury group select-none">
          <Image
            src="/images/hero-coffee-tumbler.png"
            alt="Traditional South Indian Brass Tumbler with Frothy Decoction"
            fill
            priority
            draggable={false}
            className="object-contain p-8 filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.85)] kavero-nondraggable-image"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#140D09]/80 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3">
            <div>
              <span className="text-xs uppercase font-mono tracking-widest text-copper-light font-semibold block">
                The Sacred Instrument
              </span>
              <h2 className="font-serif text-xl sm:text-2xl text-cream-light font-medium">
                Traditional Brass Filter & Dabarah
              </h2>
            </div>
            <Link
              href="/shop/original-filter-coffee"
              className="bg-copper hover:bg-copper-hover active:scale-95 text-[#FFF7EA] text-xs font-semibold px-5 py-2.5 rounded-xl transition-all shadow-copper flex items-center gap-1.5 shrink-0"
            >
              <span>Get Original Filter Blend</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* The 4 Ritual Steps */}
        <div className="space-y-8 max-w-4xl mx-auto mb-20">
          <div className="text-center mb-8">
            <span className="text-xs uppercase font-mono tracking-widest text-copper-light font-semibold block">
              Step-by-Step Method
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-cream-light font-normal">
              Four Steps to the Perfect Decoction
            </h2>
          </div>

          <div className="space-y-6">
            {steps.map((st) => (
              <div
                key={st.num}
                className="bg-[#1F120B] border border-[#3E2619] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start gap-6 shadow-luxury hover:border-copper/60 transition-colors"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#271810] border border-copper/50 flex items-center justify-center font-serif text-2xl font-bold text-copper-light shrink-0">
                  {st.num}
                </div>

                <div className="space-y-2.5 flex-1">
                  <h3 className="font-serif text-xl text-cream-light font-medium">
                    {st.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-cream-secondary/90 leading-relaxed font-light">
                    {st.instruction}
                  </p>
                  <div className="p-3 bg-[#160D08] rounded-xl border border-[#3E2619]/60 text-xs text-copper-light/95 flex items-start gap-2">
                    <Sparkles className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <span><strong>Pro Tip:</strong> {st.tip}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Brewing Ratios Quick Reference */}
        <div className="bg-[#24160E] border border-[#4A3022] rounded-2xl p-8 max-w-4xl mx-auto mb-16 shadow-luxury">
          <h3 className="font-serif text-xl text-cream-light font-medium mb-6 text-center">
            The Golden Decoction Formula
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="p-4 rounded-xl bg-[#1A1009] border border-[#3E2619]">
              <span className="text-xs uppercase font-mono tracking-wider text-copper-light block mb-1">
                Coffee Dose
              </span>
              <span className="font-serif text-2xl text-cream-light font-bold">20 g</span>
              <span className="text-[11px] text-cream-secondary/70 block mt-1">2.5 rounded tbsp powder</span>
            </div>

            <div className="p-4 rounded-xl bg-[#1A1009] border border-[#3E2619]">
              <span className="text-xs uppercase font-mono tracking-wider text-copper-light block mb-1">
                Water Volume
              </span>
              <span className="font-serif text-2xl text-cream-light font-bold">100 ml</span>
              <span className="text-[11px] text-cream-secondary/70 block mt-1">Freshly boiled at 95°C</span>
            </div>

            <div className="p-4 rounded-xl bg-[#1A1009] border border-[#3E2619]">
              <span className="text-xs uppercase font-mono tracking-wider text-copper-light block mb-1">
                Decoction to Milk
              </span>
              <span className="font-serif text-2xl text-cream-light font-bold">1 : 2 Ratio</span>
              <span className="text-[11px] text-cream-secondary/70 block mt-1">1 part coffee to 2 parts hot whole milk</span>
            </div>
          </div>
        </div>

        {/* Shop CTA */}
        <div className="text-center space-y-4 pt-4">
          <h3 className="font-serif text-2xl text-cream-light font-normal">
            Ready to Begin Your Ritual?
          </h3>
          <p className="text-xs sm:text-sm text-cream-secondary/80 font-light max-w-md mx-auto">
            Order our freshly drum-roasted KAVERO Original Filter Coffee crafted specifically for this authentic brewing technique.
          </p>
          <div className="pt-2">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-copper hover:bg-copper-hover text-[#FFF7EA] text-sm font-semibold px-7 py-3.5 rounded-xl shadow-copper transition-all"
            >
              <span>Explore KAVERO Filter Coffees</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
