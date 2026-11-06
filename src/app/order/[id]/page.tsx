import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getOrderById } from "@/lib/commerce/store";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function OrderStatusPage({ params }: Props) {
  const { id } = await params;
  const order = getOrderById(id);

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col bg-[#140D09] text-cream">
        <AnnouncementBar />
        <Navbar />
        <div className="flex-1 max-w-md mx-auto py-24 px-4 text-center space-y-4">
          <h1 className="font-serif text-2xl text-cream-light">Order Not Found</h1>
          <p className="text-xs text-cream-secondary/80">We could not locate this order ID in our dispatch records.</p>
          <Link
            href="/shop"
            className="inline-block bg-copper text-white text-xs font-semibold px-6 py-2.5 rounded-xl shadow-copper"
          >
            Return to Shop
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const steps = [
    { label: "Order Placed", done: true, desc: "Received at estate roastery" },
    { label: "Small-Batch Roasting", done: order.fulfillmentStatus !== "placed", desc: "Slow drum roast at origin" },
    { label: "Aroma-Sealed & Dispatched", done: order.fulfillmentStatus === "dispatched" || order.fulfillmentStatus === "delivered", desc: "One-way valve pouch dispatch" },
    { label: "Delivered", done: order.fulfillmentStatus === "delivered", desc: "Enjoy fresh South Indian brew" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#140D09] text-cream">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full">
        {/* Success Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="w-16 h-16 rounded-full bg-forest/20 border border-forest-light flex items-center justify-center text-forest-light mx-auto shadow-lg animate-in zoom-in duration-300">
            <CheckCircle2 className="w-9 h-9 stroke-[2]" />
          </div>
          <span className="text-xs uppercase font-mono tracking-widest text-copper-light font-medium block">
            Thank you for ordering with KAVERO
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-cream-light font-normal tracking-tight">
            Order Confirmed & Queued for Roasting
          </h1>
          <p className="text-xs sm:text-sm text-cream-secondary/90 font-light max-w-lg mx-auto">
            Order Reference: <strong className="text-cream-light font-mono font-bold">{order.orderNumber}</strong> • A confirmation email has been sent to <span className="text-copper-light">{order.customer.email}</span>.
          </p>
        </div>

        {/* Fulfillment Timeline Progress */}
        <div className="bg-[#1F120B] border border-[#3E2619] rounded-2xl p-6 sm:p-8 mb-10 shadow-luxury">
          <div className="flex items-center justify-between pb-4 border-b border-[#3E2619] mb-6">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-wider text-copper-light font-semibold block">
                Estimated Delivery
              </span>
              <span className="font-serif text-lg text-cream-light font-medium">
                {order.estimatedDelivery}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase font-mono tracking-wider text-cream-secondary/70 block">
                Carrier Tracking
              </span>
              <span className="font-mono text-xs text-cream-light">
                {order.trackingNumber}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 sm:gap-4 relative">
            {steps.map((st, i) => (
              <div key={st.label} className="flex sm:flex-col items-center sm:items-center text-left sm:text-center gap-3 sm:gap-2">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 border text-xs font-mono font-bold ${
                    st.done
                      ? "bg-forest border-forest-light text-cream-light shadow-md"
                      : "bg-[#160D08] border-[#3E2619] text-cream-secondary/40"
                  }`}
                >
                  {st.done ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                </div>
                <div>
                  <span className={`text-xs font-semibold block ${st.done ? "text-cream-light" : "text-cream-secondary/60"}`}>
                    {st.label}
                  </span>
                  <span className="text-[10px] text-cream-secondary/70 font-light block mt-0.5">
                    {st.desc}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Details & Summary Two-Column */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Purchased Items List */}
          <div className="md:col-span-7 bg-[#1F120B] border border-[#3E2619] rounded-2xl p-6 space-y-4 shadow-luxury">
            <h2 className="font-serif text-lg text-cream-light font-medium pb-2 border-b border-[#3E2619]">
              Items In This Dispatch
            </h2>

            <div className="divide-y divide-[#3E2619]/40 space-y-3">
              {order.items.map((item, idx) => (
                <div key={idx} className="pt-3 first:pt-0 flex items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-3.5">
                    <div className="relative w-14 h-16 bg-[#140D09] rounded-xl border border-[#3E2619] p-1 shrink-0 flex items-center justify-center select-none">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="60px"
                        draggable={false}
                        className="object-contain p-0.5 kavero-nondraggable-image"
                      />
                    </div>
                    <div>
                      <h3 className="font-serif text-sm font-medium text-cream-light">
                        {item.name}
                      </h3>
                      <div className="text-[11px] text-cream-secondary/80">
                        {item.weight} • Qty: {item.quantity}
                      </div>
                      <div className="text-[10px] text-copper-light mt-0.5">
                        {item.grind}
                      </div>
                    </div>
                  </div>
                  <span className="font-mono font-semibold text-cream-light">
                    ₹{item.subtotal}
                  </span>
                </div>
              ))}
            </div>

            {/* Total Math */}
            <div className="pt-4 border-t border-[#3E2619] space-y-2 text-xs">
              <div className="flex justify-between text-cream-secondary/80">
                <span>Subtotal</span>
                <span className="font-mono">₹{order.subtotal}</span>
              </div>
              <div className="flex justify-between text-cream-secondary/80">
                <span>Pan-India Delivery</span>
                <span className="font-mono">{order.shippingFee === 0 ? "FREE" : `₹${order.shippingFee}`}</span>
              </div>
              <div className="pt-2 border-t border-[#3E2619] flex justify-between text-sm font-semibold">
                <span className="font-serif text-cream-light">Total Paid / Due</span>
                <span className="font-mono text-copper-light font-bold text-base">₹{order.total}</span>
              </div>
            </div>
          </div>

          {/* Delivery & Payment Metadata */}
          <div className="md:col-span-5 space-y-6">
            <div className="bg-[#1F120B] border border-[#3E2619] rounded-2xl p-6 space-y-4 shadow-luxury">
              <div className="flex items-center gap-2 pb-2 border-b border-[#3E2619]">
                <MapPin className="w-4 h-4 text-copper-light" />
                <h3 className="font-serif text-base text-cream-light font-medium">Shipping Destination</h3>
              </div>

              <div className="text-xs text-cream-secondary/90 space-y-1 font-light">
                <div className="font-medium text-cream-light">{order.customer.fullName}</div>
                <div>{order.customer.addressLine1}</div>
                {order.customer.addressLine2 && <div>{order.customer.addressLine2}</div>}
                {order.customer.landmark && <div>Near {order.customer.landmark}</div>}
                <div>{order.customer.city}, {order.customer.state} — <strong className="font-mono font-medium text-cream-light">{order.customer.pincode}</strong></div>
                <div className="pt-2 text-cream-secondary/70">Phone: +91 {order.customer.phone}</div>
              </div>
            </div>

            <div className="bg-[#1F120B] border border-[#3E2619] rounded-2xl p-6 space-y-3 shadow-luxury text-xs">
              <div className="flex items-center justify-between">
                <span className="text-cream-secondary/80">Payment Method:</span>
                <span className="font-mono uppercase text-copper-light font-semibold">{order.paymentMethod}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-cream-secondary/80">Payment Status:</span>
                <span className="text-forest-light font-medium capitalize">{order.paymentStatus.replace("_", " ")}</span>
              </div>
              {order.notes && (
                <div className="pt-2 border-t border-[#3E2619]/60 text-[11px] text-cream-secondary/80">
                  <strong>Notes:</strong> {order.notes}
                </div>
              )}
            </div>

            <div className="text-center pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 text-xs font-semibold text-copper-light hover:text-cream-light transition-colors"
              >
                <span>Continue Shopping</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
