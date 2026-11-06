import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata = {
  title: "Frequently Asked Questions (FAQ) | KAVERO Coffee",
  description:
    "Find answers to common questions about KAVERO South Indian filter coffee, chicory ratios, brass filter brewing, freshness, and shipping across India.",
};

export default function FAQPage() {
  const faqs = [
    {
      q: "What makes KAVERO coffee different from standard commercial filter coffee?",
      a: "KAVERO is single-estate sourced directly from shade-grown family farms in Chikmagalur and Coorg, Karnataka. Unlike mass-market brands that use generic commodity low-grade robusta and artificial coffee flavorings, we slow drum-roast handpicked plantation cherries in small batches and blend only natural, high-grade French-style chicory root with zero chemical additives.",
    },
    {
      q: "Why do your filter coffees contain chicory, and what ratio should I pick?",
      a: "Authentic South Indian filter coffee has utilized roasted chicory since the 19th century. Chicory lends thickness, dark mahogany color, natural caramel sweetness, and body, allowing the decoction to cut cleanly through whole milk without turning watery. If you prefer the classic balanced hotel-style brew, choose our Original Filter Coffee (80% coffee : 20% chicory). If you want an intense morning jolt, pick Bold Roast (70:30). If you love pure, black, or pour-over coffee, choose our Estate Blend (100% pure Arabica, zero chicory).",
    },
    {
      q: "How long does the brewed first decoction stay fresh?",
      a: "For the absolute best aromatic experience, we recommend using your first decoction within 1 to 2 hours of percolation. If kept refrigerated in a sealed glass jar, it remains delicious for up to 24 hours. Never boil the decoction directly on a flame, as high heat scalds the delicate oils; instead, mix hot milk into room-temperature decoction or gently warm the jar in a hot water bath.",
    },
    {
      q: "How fresh is my coffee when it arrives?",
      a: "All KAVERO coffees are drum-roasted at our Karnataka roastery in weekly micro-batches. Your order is packed in multi-barrier kraft pouches equipped with a one-way degassing valve and aroma seal, ensuring you receive peak freshness within days of roasting.",
    },
    {
      q: "What are your shipping rates and delivery timelines across India?",
      a: "We provide FREE express shipping on all orders above ₹499 across India. For orders below ₹499, a flat nominal courier fee of ₹60 applies. Deliveries within Karnataka (Bengaluru, Mysuru, Mangaluru) typically arrive in 1–2 business days; metro cities (Mumbai, Delhi, Chennai, Hyderabad) in 2–4 business days; and other locations within 3–5 business days.",
    },
    {
      q: "Can I use KAVERO coffee in an Aeropress, French Press, or Moka Pot?",
      a: "Yes! While our Fine Grind is tailored for the classic South Indian brass filter, our Medium Grind works exceptionally well in a French Press, Aeropress, or Stovetop Moka Pot. You can also select 'Whole Roasted Beans' if you prefer grinding fresh at home.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#140D09] text-cream">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full">
        <div className="text-center space-y-3 mb-14">
          <span className="font-script text-copper-light text-2xl sm:text-3xl tracking-wide select-none">
            Help & Knowledge
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-cream-light font-normal tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-cream-secondary/80 font-light max-w-lg mx-auto">
            Everything you need to know about our Karnataka estate coffees, traditional brewing craft, and ordering.
          </p>
        </div>

        <div className="space-y-4 mb-16">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-[#1F120B] border border-[#3E2619] rounded-2xl p-6 space-y-2.5 shadow-md"
            >
              <h2 className="font-serif text-base sm:text-lg text-cream-light font-medium flex items-start gap-3">
                <span className="text-copper-light font-mono text-xs mt-1 shrink-0">Q{i + 1}.</span>
                <span>{faq.q}</span>
              </h2>
              <p className="text-xs sm:text-sm text-cream-secondary/90 font-light leading-relaxed pl-7">
                {faq.a}
              </p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl bg-[#24160E] border border-[#4A3022] p-8 text-center space-y-3 shadow-luxury">
          <h2 className="font-serif text-xl text-cream-light font-medium">Have a specific question not covered here?</h2>
          <p className="text-xs text-cream-secondary/80 font-light">
            Our estate concierge team is always glad to discuss coffee beans, grind recommendations, or custom orders.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-copper hover:bg-copper-hover text-white text-xs font-semibold px-5 py-2.5 rounded-xl shadow-copper"
            >
              <span>Contact Estate Concierge</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
