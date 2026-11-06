"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Package, ArrowRight, ShieldCheck } from "lucide-react";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function OrderTrackPage() {
  const router = useRouter();
  const [orderQuery, setOrderQuery] = useState("");
  const [error, setError] = useState("");

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderQuery.trim()) {
      setError("Please enter your order reference number.");
      return;
    }
    router.push(`/order/${encodeURIComponent(orderQuery.trim())}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#140D09] text-cream">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 max-w-xl mx-auto px-4 py-16 sm:py-24 w-full">
        <div className="bg-[#1F120B] border border-[#3E2619] rounded-2xl p-6 sm:p-10 text-center space-y-6 shadow-luxury">
          <div className="w-14 h-14 rounded-2xl bg-copper/15 border border-copper/30 flex items-center justify-center text-copper-light mx-auto">
            <Package className="w-7 h-7 stroke-[1.5]" />
          </div>

          <div className="space-y-2">
            <span className="font-script text-copper-light text-2xl tracking-wide select-none">
              Roastery Dispatch
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl text-cream-light font-normal">
              Track Your Coffee Order
            </h1>
            <p className="text-xs sm:text-sm text-cream-secondary/80 font-light leading-relaxed">
              Enter your KAVERO order reference number or order ID (sent via email at checkout) to view live roasting and delivery progress.
            </p>
          </div>

          <form onSubmit={handleTrack} className="space-y-4 text-left">
            <div className="space-y-1 text-xs">
              <label className="text-cream-secondary/80 font-medium">Order Number / Order ID</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={orderQuery}
                  onChange={(e) => {
                    setOrderQuery(e.target.value);
                    setError("");
                  }}
                  placeholder="e.g. KAV-123456-789 or ord_173000..."
                  className="w-full bg-[#160D08] border border-[#3E2619] rounded-xl px-4 py-3 text-sm text-cream-light font-mono focus:outline-none focus:border-copper"
                />
              </div>
            </div>

            {error && <div className="text-xs text-roasted-red">{error}</div>}

            <button
              type="submit"
              className="w-full bg-copper hover:bg-copper-hover active:scale-[0.99] text-[#FFF7EA] text-sm font-semibold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-copper cursor-pointer"
            >
              <span>Track Dispatch Progress</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-4 border-t border-[#3E2619]/60 flex items-center justify-center gap-2 text-[11px] text-cream-secondary/70">
            <ShieldCheck className="w-4 h-4 text-forest-light" />
            <span>Direct pan-India express courier with temperature and moisture protection</span>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
