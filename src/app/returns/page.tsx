import Link from "next/link";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata = {
  title: "Returns & Freshness Guarantee Policy | KAVERO Coffee",
  description:
    "KAVERO Coffee's replacement and quality assurance policy. Freshness guarantee, damaged package protocol, and customer support resolution.",
};

export default function ReturnsPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#140D09] text-cream">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full">
        <div className="text-center space-y-3 mb-14">
          <span className="font-script text-copper-light text-2xl sm:text-3xl tracking-wide select-none">
            Our Quality Commitment
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-cream-light font-normal tracking-tight">
            Returns & Refund Policy
          </h1>
          <p className="text-xs sm:text-sm text-cream-secondary/80 font-light max-w-lg mx-auto">
            We are dedicated to delivering authentic Karnataka filter coffee of immaculate quality.
          </p>
        </div>

        <div className="bg-[#1F120B] border border-[#3E2619] rounded-2xl p-6 sm:p-10 space-y-8 shadow-luxury text-xs sm:text-sm text-cream-secondary/90 leading-relaxed font-light">
          <section className="space-y-3">
            <h2 className="font-serif text-lg text-cream-light font-medium">1. Food & Perishable Goods Classification</h2>
            <p>
              Due to food safety standards and the perishable artisanal nature of freshly roasted coffee beans and ground blends, we do not accept returns once a pouch has been unsealed or handled, except in cases of shipping transit damage or verified manufacturing defects.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg text-cream-light font-medium">2. 100% Freshness & Authenticity Guarantee</h2>
            <p>
              If your coffee package arrives punctured, damaged in transit, with an unsealed valve, or if you receive an incorrect product, we will dispatch a brand new replacement batch immediately at zero additional expense, or issue a full refund to your original payment method.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg text-cream-light font-medium">3. How to Request a Replacement or Refund</h2>
            <p>
              Please notify us within <strong className="text-cream-light font-semibold">48 hours</strong> of package delivery by emailing <a href="mailto:care@kaverocoffee.com" className="text-copper-light underline">care@kaverocoffee.com</a> or messaging our concierge team via WhatsApp or telephone at +91 80 4748 3920.
            </p>
            <p>
              Include your Order Reference number (e.g. KAV-123456-789) and a clear photograph showing the outer label and damaged pouch. Our customer care team reviews and resolves replacement requests within 24 business hours.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg text-cream-light font-medium">4. Refund Processing Timeframes</h2>
            <p>
              Approved refunds are credited directly back to the original source method (UPI, Netbanking, Credit/Debit Card) within 5 to 7 business banking days as per standard RBI and merchant banking clearing timelines. For Cash on Delivery orders, refunds are credited directly to your verified UPI ID or bank account.
            </p>
          </section>

          <div className="pt-4 border-t border-[#3E2619] flex justify-between items-center text-xs">
            <Link href="/contact" className="text-copper-light hover:underline font-medium">
              Need assistance with an order? Contact our Estate Team →
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
