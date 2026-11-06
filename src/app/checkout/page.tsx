"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  Loader2,
  AlertCircle,
  Sparkles,
  Banknote,
} from "lucide-react";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, shippingFee, total, clearCart } = useCart();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
    notes: "",
  });

  const [paymentMethod, setPaymentMethod] = useState<"razorpay" | "cod" | "demo">("demo");
  const [pinLookupStatus, setPinLookupStatus] = useState<"idle" | "loading" | "valid" | "invalid">("idle");
  const [pinMessage, setPinMessage] = useState("");
  const [deliveryDays, setDeliveryDays] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handlePincodeChange = async (pincode: string) => {
    const cleaned = pincode.replace(/\D/g, "").slice(0, 6);
    setFormData((prev) => ({ ...prev, pincode: cleaned }));

    if (cleaned.length === 6) {
      setPinLookupStatus("loading");
      try {
        const res = await fetch(`/api/checkout/pincode?pincode=${cleaned}`);
        const data = await res.json();
        if (res.ok && data.valid) {
          setPinLookupStatus("valid");
          setFormData((prev) => ({
            ...prev,
            city: data.city || prev.city,
            state: data.state || prev.state,
          }));
          setDeliveryDays(data.estimatedDays || "3–5 business days");
          setPinMessage(`Serviceable area: ${data.city}, ${data.state} (${data.estimatedDays})`);
        } else {
          setPinLookupStatus("invalid");
          setPinMessage(data.message || "Invalid PIN code.");
        }
      } catch {
        setPinLookupStatus("invalid");
        setPinMessage("Could not verify PIN code.");
      }
    } else {
      setPinLookupStatus("idle");
      setPinMessage("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (items.length === 0) {
      setErrorMessage("Your cart is empty. Please add coffee before proceeding.");
      return;
    }

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setErrorMessage("Please complete all required customer contact details.");
      return;
    }

    if (!formData.addressLine1.trim() || formData.pincode.length !== 6) {
      setErrorMessage("Please complete valid shipping address with a 6-digit Indian PIN code.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/checkout/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: formData,
          items: items.map((itm) => ({
            productId: itm.productId,
            variantId: itm.variantId,
            grind: itm.grind,
            quantity: itm.quantity,
          })),
          paymentMethod,
          notes: formData.notes,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        clearCart();
        router.push(`/order/${data.orderId}`);
      } else {
        setErrorMessage(data.message || "Failed to create order. Please try again.");
      }
    } catch {
      setErrorMessage("Network error processing order. Please check your connection.");
    } finally {
      setSubmitting(false);
    }
  };

  if (items.length === 0 && !submitting) {
    return (
      <div className="min-h-screen flex flex-col bg-[#140D09] text-cream">
        <AnnouncementBar />
        <Navbar />
        <div className="flex-1 max-w-md mx-auto py-24 px-4 text-center space-y-4">
          <h1 className="font-serif text-2xl text-cream-light">Your Cart is Empty</h1>
          <p className="text-xs text-cream-secondary/80">Please select coffee from our catalog to begin checkout.</p>
          <Link
            href="/shop"
            className="inline-block bg-copper text-white text-xs font-semibold px-6 py-2.5 rounded-xl shadow-copper"
          >
            Explore Coffees
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#140D09] text-cream">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full">
        <div className="max-w-2xl mx-auto text-center mb-10 space-y-2">
          <span className="font-script text-copper-light text-2xl sm:text-3xl tracking-wide select-none">
            Direct Trade Dispatch
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-cream-light font-normal tracking-tight">
            Secure Indian Checkout
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Contact, Address & Payment */}
          <div className="lg:col-span-7 space-y-8">
            {/* 1. Customer Contact Details */}
            <div className="bg-[#1F120B] border border-[#3E2619] rounded-2xl p-6 sm:p-7 space-y-4 shadow-luxury">
              <div className="flex items-center gap-2.5 pb-2 border-b border-[#3E2619]">
                <div className="w-7 h-7 rounded-full bg-copper/20 border border-copper/40 flex items-center justify-center text-xs font-mono font-bold text-copper-light">
                  1
                </div>
                <h2 className="font-serif text-lg text-cream-light font-medium">Customer Contact</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-cream-secondary/80 font-medium">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full bg-[#160D08] border border-[#3E2619] rounded-xl px-3.5 py-2.5 text-cream-light focus:outline-none focus:border-copper"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-cream-secondary/80 font-medium">Email Address (for order updates) *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="ramesh@example.com"
                    className="w-full bg-[#160D08] border border-[#3E2619] rounded-xl px-3.5 py-2.5 text-cream-light focus:outline-none focus:border-copper"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-cream-secondary/80 font-medium">Mobile Number (10 Digits) *</label>
                  <div className="flex">
                    <span className="bg-[#24160E] border border-r-0 border-[#3E2619] rounded-l-xl px-3 py-2.5 text-cream-secondary/80 font-mono text-xs flex items-center">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, "") })}
                      placeholder="9876543210"
                      className="w-full bg-[#160D08] border border-[#3E2619] rounded-r-xl px-3.5 py-2.5 text-cream-light focus:outline-none focus:border-copper font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Indian Shipping Address */}
            <div className="bg-[#1F120B] border border-[#3E2619] rounded-2xl p-6 sm:p-7 space-y-4 shadow-luxury">
              <div className="flex items-center gap-2.5 pb-2 border-b border-[#3E2619]">
                <div className="w-7 h-7 rounded-full bg-copper/20 border border-copper/40 flex items-center justify-center text-xs font-mono font-bold text-copper-light">
                  2
                </div>
                <h2 className="font-serif text-lg text-cream-light font-medium">Delivery Address</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {/* PIN Code with instant lookup */}
                <div className="sm:col-span-2 space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-cream-secondary/80 font-medium">Indian Postal PIN Code (6 Digits) *</label>
                    {pinLookupStatus === "loading" && (
                      <span className="text-[11px] text-copper-light flex items-center gap-1 font-mono">
                        <Loader2 className="w-3 h-3 animate-spin" />
                        Verifying postal zone...
                      </span>
                    )}
                  </div>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={formData.pincode}
                    onChange={(e) => handlePincodeChange(e.target.value)}
                    placeholder="e.g. 560001 (Bengaluru), 400001 (Mumbai), 600001 (Chennai)"
                    className="w-full bg-[#160D08] border border-[#3E2619] rounded-xl px-3.5 py-2.5 text-cream-light font-mono focus:outline-none focus:border-copper"
                  />
                  {pinMessage && (
                    <div
                      className={`text-[11px] flex items-center gap-1.5 mt-1 font-medium ${
                        pinLookupStatus === "valid" ? "text-forest-light" : "text-roasted-red"
                      }`}
                    >
                      {pinLookupStatus === "valid" ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                      <span>{pinMessage}</span>
                    </div>
                  )}
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="text-cream-secondary/80 font-medium">Flat / House No. / Building / Street *</label>
                  <input
                    type="text"
                    required
                    value={formData.addressLine1}
                    onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                    placeholder="e.g. #42, Coffee Board Enclave, 2nd Main"
                    className="w-full bg-[#160D08] border border-[#3E2619] rounded-xl px-3.5 py-2.5 text-cream-light focus:outline-none focus:border-copper"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-cream-secondary/80 font-medium">Area / Landmark (Optional)</label>
                  <input
                    type="text"
                    value={formData.landmark}
                    onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                    placeholder="Near Trinity Circle"
                    className="w-full bg-[#160D08] border border-[#3E2619] rounded-xl px-3.5 py-2.5 text-cream-light focus:outline-none focus:border-copper"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-cream-secondary/80 font-medium">City / District *</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Bengaluru"
                    className="w-full bg-[#160D08] border border-[#3E2619] rounded-xl px-3.5 py-2.5 text-cream-light focus:outline-none focus:border-copper"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="text-cream-secondary/80 font-medium">State *</label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    placeholder="Karnataka"
                    className="w-full bg-[#160D08] border border-[#3E2619] rounded-xl px-3.5 py-2.5 text-cream-light focus:outline-none focus:border-copper"
                  />
                </div>
              </div>
            </div>

            {/* 3. Payment Method */}
            <div className="bg-[#1F120B] border border-[#3E2619] rounded-2xl p-6 sm:p-7 space-y-4 shadow-luxury">
              <div className="flex items-center gap-2.5 pb-2 border-b border-[#3E2619]">
                <div className="w-7 h-7 rounded-full bg-copper/20 border border-copper/40 flex items-center justify-center text-xs font-mono font-bold text-copper-light">
                  3
                </div>
                <h2 className="font-serif text-lg text-cream-light font-medium">Payment Method</h2>
              </div>

              {/* Demo Mode Notice */}
              <div className="p-3.5 rounded-xl bg-[#24160E] border border-copper/40 flex items-start gap-3 text-xs">
                <Sparkles className="w-4 h-4 text-copper-light shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-semibold text-cream-light block">
                    Verified Store Sandbox / Demonstration Mode
                  </span>
                  <p className="text-cream-secondary/80 font-light leading-relaxed">
                    Live Razorpay merchant credentials are not configured in this environment. You can submit this order using our secure Demo Checkout to test the entire end-to-end commerce pipeline, inventory decrement, order confirmation, and tracking.
                  </p>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                {/* Option 1: Demo Instant Verification */}
                <label
                  onClick={() => setPaymentMethod("demo")}
                  className={`flex items-start justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === "demo"
                      ? "bg-copper/15 border-copper ring-1 ring-copper/70 text-cream-light"
                      : "bg-[#160D08] border-[#3E2619] text-cream-secondary hover:text-cream-light hover:border-copper/40"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === "demo"}
                      onChange={() => setPaymentMethod("demo")}
                      className="mt-1 text-copper focus:ring-copper"
                    />
                    <div>
                      <span className="font-semibold text-xs sm:text-sm text-cream-light block">
                        Demonstration Checkout (Instant Verified Confirmation)
                      </span>
                      <span className="text-[11px] text-cream-secondary/70 font-light block mt-0.5">
                        Test live order creation, database records, and customer tracking without live card charging.
                      </span>
                    </div>
                  </div>
                  <ShieldCheck className="w-5 h-5 text-forest-light shrink-0" />
                </label>

                {/* Option 2: Cash on Delivery */}
                <label
                  onClick={() => setPaymentMethod("cod")}
                  className={`flex items-start justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === "cod"
                      ? "bg-copper/15 border-copper ring-1 ring-copper/70 text-cream-light"
                      : "bg-[#160D08] border-[#3E2619] text-cream-secondary hover:text-cream-light hover:border-copper/40"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                      className="mt-1 text-copper focus:ring-copper"
                    />
                    <div>
                      <span className="font-semibold text-xs sm:text-sm text-cream-light block">
                        Cash on Delivery (Pay upon arrival)
                      </span>
                      <span className="text-[11px] text-cream-secondary/70 font-light block mt-0.5">
                        Pay cash or UPI directly to courier upon delivery across India.
                      </span>
                    </div>
                  </div>
                  <Banknote className="w-5 h-5 text-copper-light shrink-0" />
                </label>
              </div>

              {/* Order Notes */}
              <div className="pt-2 space-y-1 text-xs">
                <label className="text-cream-secondary/80 font-medium">Special Delivery Instructions / Gift Message</label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="e.g. Leave with security, or include 'Happy Birthday' note"
                  className="w-full bg-[#160D08] border border-[#3E2619] rounded-xl px-3.5 py-2 text-cream-light focus:outline-none focus:border-copper"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary & Review */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#1F120B] border border-[#3E2619] rounded-2xl p-6 sm:p-7 space-y-5 shadow-luxury sticky top-24">
              <h2 className="font-serif text-xl text-cream-light font-medium pb-3 border-b border-[#3E2619]">
                Review Your Order
              </h2>

              {/* Cart Items List */}
              <div className="max-h-64 overflow-y-auto space-y-3 divide-y divide-[#3E2619]/40 pr-1">
                {items.map((item) => (
                  <div key={item.id} className="pt-3 first:pt-0 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-14 bg-[#140D09] rounded-lg border border-[#3E2619] p-1 shrink-0 flex items-center justify-center select-none">
                        <Image
                          src={item.image}
                          alt={item.alt}
                          fill
                          sizes="48px"
                          draggable={false}
                          onDragStart={(e) => e.preventDefault()}
                          className="object-contain p-0.5 kavero-nondraggable-image"
                        />
                      </div>
                      <div>
                        <span className="font-serif font-medium text-cream-light block">
                          {item.name}
                        </span>
                        <span className="text-[11px] text-cream-secondary/70">
                          {item.weight} • Qty: {item.quantity}
                        </span>
                        <div className="text-[10px] text-copper-light">{item.grindLabel}</div>
                      </div>
                    </div>
                    <span className="font-mono font-semibold text-cream-light">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              {/* Cost Breakdown */}
              <div className="pt-3 border-t border-[#3E2619] space-y-2 text-xs">
                <div className="flex justify-between text-cream-secondary/80">
                  <span>Subtotal</span>
                  <span className="font-mono text-cream-light">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-cream-secondary/80">
                  <span>Pan-India Delivery</span>
                  <span className="font-mono">
                    {shippingFee === 0 ? (
                      <span className="text-forest-light font-semibold">FREE</span>
                    ) : (
                      `₹${shippingFee}`
                    )}
                  </span>
                </div>
                {deliveryDays && (
                  <div className="flex justify-between text-[11px] text-copper-light">
                    <span>Estimated Transit</span>
                    <span>{deliveryDays}</span>
                  </div>
                )}
                <div className="pt-3 border-t border-[#3E2619] flex justify-between text-base font-semibold">
                  <span className="font-serif text-cream-light">Total Due</span>
                  <span className="font-sans font-bold text-xl text-copper-light">
                    ₹{total}
                  </span>
                </div>
              </div>

              {errorMessage && (
                <div className="p-3 rounded-xl bg-roasted-red/15 border border-roasted-red/40 text-xs text-cream-light flex items-start gap-2 animate-in fade-in">
                  <AlertCircle className="w-4 h-4 text-roasted-red shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-copper hover:bg-copper-hover active:scale-[0.99] text-[#FFF7EA] text-sm font-semibold py-4 px-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-copper disabled:opacity-60 cursor-pointer"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Processing Order...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Complete Order • ₹{total}</span>
                  </>
                )}
              </button>

              <div className="pt-2 space-y-2 text-[10px] text-cream-secondary/60 text-center">
                <p>By placing your order, you agree to KAVERO Coffee terms and shipping policies.</p>
                <div className="flex items-center justify-center gap-2 text-forest-light">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>256-Bit SSL Encrypted & Roasted Fresh from Karnataka</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}
