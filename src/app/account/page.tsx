"use client";

import { useState } from "react";
import Link from "next/link";
import { Package, Search, ArrowRight, Loader2 } from "lucide-react";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Order } from "@/lib/commerce/store";

export default function AccountPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError("");
    setSearched(true);

    try {
      const res = await fetch(`/api/orders/${encodeURIComponent(searchQuery.trim())}`);
      const data = await res.json();
      if (res.ok && data.success && data.order) {
        setOrders([data.order]);
      } else {
        setOrders([]);
        setError("No orders found matching this reference number or ID.");
      }
    } catch {
      setError("Network error looking up order records.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#140D09] text-cream">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full">
        {/* Header */}
        <div className="text-center space-y-3 mb-14">
          <span className="font-script text-copper-light text-2xl sm:text-3xl tracking-wide select-none">
            Welcome To KAVERO
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-cream-light font-normal tracking-tight">
            Customer Portal & Order History
          </h1>
          <p className="text-xs sm:text-sm text-cream-secondary/80 font-light max-w-lg mx-auto">
            Check the status of your roast orders, track live parcels, or manage your coffee preferences.
          </p>
        </div>

        {/* Guest Order Lookup Box */}
        <div className="bg-[#1F120B] border border-[#3E2619] rounded-2xl p-6 sm:p-8 space-y-6 shadow-luxury mb-12">
          <div className="flex items-center gap-3 pb-3 border-b border-[#3E2619]">
            <div className="w-9 h-9 rounded-xl bg-copper/15 border border-copper/30 flex items-center justify-center text-copper-light">
              <Package className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif text-lg text-cream-light font-medium">Quick Order Lookup</h2>
              <p className="text-xs text-cream-secondary/70 font-light">
                No password required. Enter your Order ID (e.g. KAV-123456-789 or ord_...)
              </p>
            </div>
          </div>

          <form onSubmit={handleLookup} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-copper-light absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter Order Reference Number..."
                className="w-full bg-[#160D08] border border-[#3E2619] rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-cream-light font-mono focus:outline-none focus:border-copper"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-copper hover:bg-copper-hover active:scale-[0.99] text-[#FFF7EA] text-xs sm:text-sm font-semibold px-6 py-2.5 rounded-xl transition-all shadow-copper flex items-center justify-center gap-2 shrink-0 disabled:opacity-60 cursor-pointer"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Find Order</span>}
            </button>
          </form>

          {error && <div className="text-xs text-roasted-red">{error}</div>}

          {/* Results display */}
          {searched && orders.length > 0 && (
            <div className="pt-4 border-t border-[#3E2619]/60 space-y-3">
              <span className="text-xs uppercase font-mono tracking-wider text-copper-light font-semibold block">
                Found Order Record
              </span>
              {orders.map((ord) => (
                <Link
                  key={ord.id}
                  href={`/order/${ord.id}`}
                  className="p-4 rounded-xl bg-[#160D08] border border-[#3E2619] hover:border-copper flex items-center justify-between transition-all group block"
                >
                  <div className="space-y-1">
                    <span className="font-mono text-sm font-bold text-cream-light block group-hover:text-copper-light">
                      {ord.orderNumber}
                    </span>
                    <span className="text-xs text-cream-secondary/80">
                      Placed on {new Date(ord.createdAt).toLocaleDateString("en-IN")} • Total: ₹{ord.total}
                    </span>
                    <div className="text-[11px] text-forest-light capitalize">
                      Status: {ord.fulfillmentStatus} ({ord.estimatedDelivery})
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-copper-light group-hover:translate-x-1 transition-transform" />
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* VIP Roastery Club Perks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-6 rounded-2xl bg-[#1F120B] border border-[#3E2619] space-y-2">
            <span className="text-copper-light font-serif text-lg font-bold block">Small-Batch Freshness</span>
            <p className="text-xs text-cream-secondary/80 font-light">
              Orders are drum roasted to your requested grind and packed within 24 hours.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#1F120B] border border-[#3E2619] space-y-2">
            <span className="text-copper-light font-serif text-lg font-bold block">Free Pan-India Delivery</span>
            <p className="text-xs text-cream-secondary/80 font-light">
              Complimentary courier shipping across all postal zones on orders over ₹499.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#1F120B] border border-[#3E2619] space-y-2">
            <span className="text-copper-light font-serif text-lg font-bold block">Direct Concierge</span>
            <p className="text-xs text-cream-secondary/80 font-light">
              Direct access to our Chikmagalur team for ratio recommendations and custom roasts.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
