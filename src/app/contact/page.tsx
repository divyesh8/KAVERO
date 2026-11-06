"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BRAND } from "@/lib/brand";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Order Inquiry",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [responseMsg, setResponseMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setResponseMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("success");
        setResponseMsg(data.message || "Thank you! Our estate team will be in touch shortly.");
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "Order Inquiry",
          message: "",
        });
      } else {
        setStatus("error");
        setResponseMsg(data.message || "Could not send message. Please try again.");
      }
    } catch {
      setStatus("error");
      setResponseMsg("Network error. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#140D09] text-cream">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
          <span className="font-script text-copper-light text-2xl sm:text-3xl tracking-wide select-none">
            Get In Touch
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-cream-light font-normal tracking-tight">
            Contact KAVERO Estate Office
          </h1>
          <p className="text-xs sm:text-sm text-cream-secondary/90 font-light leading-relaxed">
            Have questions about our single-estate roasts, brewing ratios, corporate gift hampers, or your delivery?
            Our Karnataka customer team is here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Contact Info & Hours */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#1F120B] border border-[#3E2619] rounded-2xl p-6 sm:p-8 space-y-6 shadow-luxury">
              <h2 className="font-serif text-xl text-cream-light font-medium pb-3 border-b border-[#3E2619]">
                Estate Concierge
              </h2>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-copper/15 border border-copper/40 flex items-center justify-center text-copper-light shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-cream-secondary/70 block">Direct Telephone</span>
                    <a href={`tel:${BRAND.contact.phone}`} className="font-mono text-sm text-cream-light hover:text-copper-light font-semibold">
                      {BRAND.contact.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-copper/15 border border-copper/40 flex items-center justify-center text-copper-light shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-cream-secondary/70 block">Electronic Mail</span>
                    <a href={`mailto:${BRAND.contact.email}`} className="text-sm text-cream-light hover:text-copper-light font-medium">
                      {BRAND.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-copper/15 border border-copper/40 flex items-center justify-center text-copper-light shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-cream-secondary/70 block">Registered Estate Roastery</span>
                    <p className="text-cream-light leading-relaxed font-light mt-0.5">
                      {BRAND.contact.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-copper/15 border border-copper/40 flex items-center justify-center text-copper-light shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-cream-secondary/70 block">Customer Care Hours</span>
                    <p className="text-cream-light font-light mt-0.5">
                      {BRAND.contact.hours}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Link Card */}
            <div className="p-6 rounded-2xl bg-[#24160E] border border-[#3E2619] text-xs text-cream-secondary space-y-2">
              <span className="font-serif font-semibold text-cream-light block">Need Immediate Answers?</span>
              <p className="font-light leading-relaxed">
                Check our Frequently Asked Questions for fast answers regarding decoction brewing, storage, and dispatch policies.
              </p>
              <div className="pt-2">
                <a href="/faq" className="text-copper-light hover:underline font-medium">
                  Read KAVERO FAQs →
                </a>
              </div>
            </div>
          </div>

          {/* Right: Message Form */}
          <div className="lg:col-span-7 bg-[#1F120B] border border-[#3E2619] rounded-2xl p-6 sm:p-8 shadow-luxury">
            <h2 className="font-serif text-xl text-cream-light font-medium mb-6 pb-2 border-b border-[#3E2619]">
              Send Us a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-cream-secondary/80 font-medium">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Anita Menon"
                    className="w-full bg-[#160D08] border border-[#3E2619] rounded-xl px-3.5 py-2.5 text-cream-light focus:outline-none focus:border-copper"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-cream-secondary/80 font-medium">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="anita@example.com"
                    className="w-full bg-[#160D08] border border-[#3E2619] rounded-xl px-3.5 py-2.5 text-cream-light focus:outline-none focus:border-copper"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-cream-secondary/80 font-medium">Phone (Optional)</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 9876543210"
                    className="w-full bg-[#160D08] border border-[#3E2619] rounded-xl px-3.5 py-2.5 text-cream-light font-mono focus:outline-none focus:border-copper"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-cream-secondary/80 font-medium">Subject *</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-[#160D08] border border-[#3E2619] rounded-xl px-3.5 py-2.5 text-cream-light focus:outline-none focus:border-copper cursor-pointer"
                  >
                    <option value="Order Inquiry">Order & Delivery Status</option>
                    <option value="Brewing Question">Brewing Technique & Ratio Advice</option>
                    <option value="Corporate Gifting">Corporate Gifting & Bulk Orders</option>
                    <option value="Estate Feedback">Roast Feedback / General Inquiry</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-cream-secondary/80 font-medium">Message *</label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can our Karnataka team assist your coffee journey?"
                  className="w-full bg-[#160D08] border border-[#3E2619] rounded-xl px-3.5 py-2.5 text-cream-light focus:outline-none focus:border-copper leading-relaxed"
                />
              </div>

              {responseMsg && (
                <div
                  className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                    status === "success"
                      ? "bg-forest/20 text-forest-light border border-forest-light/40"
                      : "bg-roasted-red/20 text-cream-light border border-roasted-red/40"
                  }`}
                >
                  {status === "success" ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
                  <span>{responseMsg}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="bg-copper hover:bg-copper-hover active:scale-[0.99] text-[#FFF7EA] text-sm font-semibold px-6 py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-copper disabled:opacity-50 cursor-pointer"
              >
                {status === "loading" ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
