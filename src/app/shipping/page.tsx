import Link from "next/link";
import { Truck, Clock, PackageCheck } from "lucide-react";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata = {
  title: "Pan-India Shipping & Delivery Policy | KAVERO Coffee",
  description:
    "Official shipping policy of KAVERO Coffee: Free delivery on orders above ₹499, small batch roasting dispatch, packaging standards, and transit timelines across India.",
};

export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#140D09] text-cream">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full">
        <div className="text-center space-y-3 mb-14">
          <span className="font-script text-copper-light text-2xl sm:text-3xl tracking-wide select-none">
            Reliable Pan-India Logistics
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-cream-light font-normal tracking-tight">
            Shipping & Delivery Policy
          </h1>
          <p className="text-xs sm:text-sm text-cream-secondary/80 font-light max-w-lg mx-auto">
            Direct from our roastery in Karnataka to your doorstep with freshness protection valves.
          </p>
        </div>

        <div className="bg-[#1F120B] border border-[#3E2619] rounded-2xl p-6 sm:p-10 space-y-8 shadow-luxury text-xs sm:text-sm text-cream-secondary/90 leading-relaxed font-light">
          {/* Key Shipping Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-6 border-b border-[#3E2619]">
            <div className="p-4 rounded-xl bg-[#170E08] border border-[#3E2619] text-center space-y-1">
              <Truck className="w-5 h-5 text-copper-light mx-auto" />
              <div className="font-serif font-semibold text-cream-light text-sm">Free Over ₹499</div>
              <p className="text-[11px] text-cream-secondary/70">Pan-India orders above ₹499 ship free.</p>
            </div>

            <div className="p-4 rounded-xl bg-[#170E08] border border-[#3E2619] text-center space-y-1">
              <Clock className="w-5 h-5 text-copper-light mx-auto" />
              <div className="font-serif font-semibold text-cream-light text-sm">24-Hour Dispatch</div>
              <p className="text-[11px] text-cream-secondary/70">Roasted, degassed, and dispatched within 24h.</p>
            </div>

            <div className="p-4 rounded-xl bg-[#170E08] border border-[#3E2619] text-center space-y-1">
              <PackageCheck className="w-5 h-5 text-copper-light mx-auto" />
              <div className="font-serif font-semibold text-cream-light text-sm">Aroma-Valve Pack</div>
              <p className="text-[11px] text-cream-secondary/70">Multi-barrier foil preserves natural crema.</p>
            </div>
          </div>

          <section className="space-y-3">
            <h2 className="font-serif text-lg text-cream-light font-medium">1. Shipping Charges & Free Delivery Threshold</h2>
            <p>
              We are pleased to offer complimentary standard shipping across India on all orders where the subtotal equals or exceeds <strong className="text-cream-light font-semibold">₹499</strong>.
            </p>
            <p>
              For orders below ₹499, a flat subsidized shipping fee of <strong className="text-cream-light font-semibold">₹60</strong> is calculated at checkout to cover express courier costs.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg text-cream-light font-medium">2. Order Processing & Dispatch Timelines</h2>
            <p>
              To guarantee that you receive coffee at its aromatic peak, our beans are roasted in small micro-batches at our roastery near the Chikmagalur and Coorg highlands. Orders placed before 1:00 PM IST on Monday through Friday are packed and dispatched on the same day. Orders placed on Saturday, Sunday, or national holidays are dispatched on the next working business day.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg text-cream-light font-medium">3. Transit Estimates by Region</h2>
            <div className="space-y-2">
              <div className="p-3 rounded-lg bg-[#160D08] border border-[#3E2619] flex justify-between items-center">
                <span>Karnataka (Bengaluru, Mysuru, Mangaluru, Hubballi)</span>
                <span className="font-mono text-copper-light font-semibold">1 – 2 Business Days</span>
              </div>
              <div className="p-3 rounded-lg bg-[#160D08] border border-[#3E2619] flex justify-between items-center">
                <span>Tier-1 Metro Hubs (Mumbai, Chennai, Hyderabad, Delhi NCR, Pune)</span>
                <span className="font-mono text-copper-light font-semibold">2 – 4 Business Days</span>
              </div>
              <div className="p-3 rounded-lg bg-[#160D08] border border-[#3E2619] flex justify-between items-center">
                <span>Rest of India (Tier-2/3 Cities, Regional Towns)</span>
                <span className="font-mono text-copper-light font-semibold">3 – 5 Business Days</span>
              </div>
              <div className="p-3 rounded-lg bg-[#160D08] border border-[#3E2619] flex justify-between items-center">
                <span>Remote & Special Postal Zones (North East, J&K, Island Territories)</span>
                <span className="font-mono text-copper-light font-semibold">5 – 7 Business Days</span>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg text-cream-light font-medium">4. Real-Time Tracking Information</h2>
            <p>
              Once your coffee package is transferred to our logistics courier partner (Delhivery, Blue Dart, or India Post Speed Post), you will automatically receive an SMS and email notification with your unique AWB tracking number. You can also view live delivery progress anytime on our <Link href="/order/track" className="text-copper-light underline">Order Tracking Page</Link>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg text-cream-light font-medium">5. Tamper-Proof Freshness Packaging</h2>
            <p>
              All KAVERO coffee products are packed inside premium triple-layer foil pouches equipped with a degassing valve. This allows carbon dioxide generated during small-batch drum roasting to escape while preventing oxygen or humidity from entering, ensuring full flavor protection during transit.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
