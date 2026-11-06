"use client";

import { useState, FormEvent } from "react";
import { Mail, CheckCircle2, Loader2, ArrowRight } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "homepage-strip" }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("success");
        setMessage(data.message || "Thank you for joining KAVERO estate updates!");
        setEmail("");
        setTimeout(() => {
          setStatus("idle");
          setMessage("");
        }, 5000);
      } else {
        setStatus("error");
        setMessage(data.message || "Failed to subscribe. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Network connection error. Please try again.");
    }
  };

  return (
    <section className="w-full bg-[#180E09] py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#24160E] border border-[#4A3022] rounded-2xl p-6 sm:p-8 lg:p-10 shadow-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            {/* Left: Heading with Envelope Icon */}
            <div className="lg:col-span-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl border border-copper/80 flex items-center justify-center text-copper-light shrink-0 bg-copper/10 shadow-copper">
                <Mail className="w-5 h-5 stroke-[1.5]" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-widest text-copper-light font-mono font-medium block">
                  Estate Chronicles
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-cream-light font-normal tracking-tight">
                  Stay in the Loop
                </h3>
              </div>
            </div>

            {/* Center: Description */}
            <div className="lg:col-span-3 lg:border-l lg:border-[#4A3022]/70 lg:pl-6">
              <p className="text-xs sm:text-sm text-cream-secondary/90 font-light leading-relaxed">
                Receive harvest notes, new roast drops, brewing tutorials, and private member offers directly from our estates.
              </p>
            </div>

            {/* Right: Subscription Input & Button */}
            <div className="lg:col-span-4">
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5">
                <div className="relative flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    aria-label="Email address for estate updates"
                    disabled={status === "loading"}
                    className="w-full bg-[#1A1009] border border-[#4A3022] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-cream-light placeholder:text-cream-secondary/50 focus:outline-none focus:border-copper transition-colors disabled:opacity-50"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="bg-copper hover:bg-copper-hover active:scale-95 text-[#FFF7EA] text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-copper shrink-0 disabled:opacity-50 cursor-pointer"
                >
                  {status === "loading" ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <span>Subscribe</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>

              {status === "success" && (
                <div className="flex items-center gap-2 mt-2.5 text-xs text-forest-light animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{message}</span>
                </div>
              )}

              {status === "error" && (
                <div className="mt-2.5 text-xs text-roasted-red animate-in fade-in">
                  <span>{message}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
