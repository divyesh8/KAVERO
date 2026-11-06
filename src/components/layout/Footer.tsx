import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Instagram, Facebook, Youtube, Linkedin, ShieldCheck } from "lucide-react";
import { KaveroLogo } from "@/components/ui/KaveroLogo";
import { BRAND } from "@/lib/brand";

export function Footer() {
  return (
    <footer className="relative bg-[#140D09] border-t border-[#3E2517] text-cream-secondary pt-12 pb-0 overflow-hidden">
      {/* 5-Column Navigation Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-10 pb-10">
          {/* Col 1: Brand & Origin Tagline */}
          <div className="col-span-2 md:col-span-1 md:pr-4 flex flex-col items-start space-y-3">
            <KaveroLogo size="md" />
            <p className="text-xs text-cream-secondary/80 font-light leading-relaxed">
              Authentic South Indian Filter Coffee rooted in Karnataka’s coffee-growing heritage.
            </p>
            <div className="flex items-center gap-1.5 text-[11px] text-copper-light font-medium pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-forest-light" />
              <span>Chikmagalur & Coorg Estates</span>
            </div>
          </div>

          {/* Col 2: Shop Links */}
          <div>
            <h4 className="font-serif text-xs font-semibold text-cream-light uppercase tracking-wider mb-3">
              Shop Coffees
            </h4>
            <ul className="space-y-2 text-xs">
              {BRAND.footerLinks.shop.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="hover:text-copper-light transition-colors text-cream-secondary/85 block py-0.5"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Learn & Story */}
          <div>
            <h4 className="font-serif text-xs font-semibold text-cream-light uppercase tracking-wider mb-3">
              Heritage & Craft
            </h4>
            <ul className="space-y-2 text-xs">
              {BRAND.footerLinks.learn.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="hover:text-copper-light transition-colors text-cream-secondary/85 block py-0.5"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Support & Policies */}
          <div>
            <h4 className="font-serif text-xs font-semibold text-cream-light uppercase tracking-wider mb-3">
              Customer Support
            </h4>
            <ul className="space-y-2 text-xs">
              {BRAND.footerLinks.support.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="hover:text-copper-light transition-colors text-cream-secondary/85 block py-0.5"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Contact & Social */}
          <div className="col-span-2 md:col-span-1 space-y-3">
            <h4 className="font-serif text-xs font-semibold text-cream-light uppercase tracking-wider mb-3">
              Estate Office
            </h4>

            <div className="space-y-2 text-xs">
              <a
                href={`tel:${BRAND.contact.phone.replace(/\s+/g, "")}`}
                className="flex items-center gap-2 hover:text-copper-light transition-colors group"
              >
                <Phone className="w-3.5 h-3.5 text-copper-light shrink-0" />
                <span className="text-cream-secondary/90 group-hover:text-cream-light">
                  {BRAND.contact.phone}
                </span>
              </a>

              <a
                href={`mailto:${BRAND.contact.email}`}
                className="flex items-center gap-2 hover:text-copper-light transition-colors group"
              >
                <Mail className="w-3.5 h-3.5 text-copper-light shrink-0" />
                <span className="text-cream-secondary/90 group-hover:text-cream-light">
                  {BRAND.contact.email}
                </span>
              </a>

              <div className="flex items-start gap-2 pt-1">
                <MapPin className="w-3.5 h-3.5 text-copper-light shrink-0 mt-0.5" />
                <span className="text-cream-secondary/80 text-[11px] leading-relaxed">
                  {BRAND.contact.address}
                </span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="pt-2">
              <span className="text-[10px] uppercase font-mono tracking-wider text-copper-light block mb-2">
                Follow The Harvest
              </span>
              <div className="flex items-center gap-2.5 text-cream-secondary">
                <a
                  href={BRAND.social.instagram}
                  aria-label="KAVERO on Instagram"
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 rounded-lg bg-[#1E120B] border border-[#3E2619] hover:text-copper-light hover:border-copper/60 transition-all"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href={BRAND.social.facebook}
                  aria-label="KAVERO on Facebook"
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 rounded-lg bg-[#1E120B] border border-[#3E2619] hover:text-copper-light hover:border-copper/60 transition-all"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href={BRAND.social.youtube}
                  aria-label="KAVERO on YouTube"
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 rounded-lg bg-[#1E120B] border border-[#3E2619] hover:text-copper-light hover:border-copper/60 transition-all"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a
                  href={BRAND.social.linkedin}
                  aria-label="KAVERO on LinkedIn"
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 rounded-lg bg-[#1E120B] border border-[#3E2619] hover:text-copper-light hover:border-copper/60 transition-all"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright & attribution */}
        <div className="pt-6 pb-4 border-t border-[#3E2517]/60 flex flex-col sm:flex-row items-center justify-between text-[11px] text-cream-secondary/60 gap-3">
          <p>© {new Date().getFullYear()} KAVERO Coffee. All rights reserved. Authentic Karnataka Heritage.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-cream-light transition-colors">Privacy</Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-cream-light transition-colors">Terms</Link>
            <span>•</span>
            <Link href="/shipping" className="hover:text-cream-light transition-colors">Shipping Policy</Link>
            <span>•</span>
            <Link href="/admin" className="hover:text-copper-light transition-colors font-mono">Owner Portal</Link>
          </div>
        </div>
      </div>

      {/* Mountain Landscape Horizon Silhouette at the bottom */}
      <div className="relative w-full h-16 sm:h-20 mt-4 overflow-hidden pointer-events-none opacity-40 select-none">
        <Image
          src="/images/footer-mountains-pristine.png"
          alt=""
          fill
          draggable={false}
          className="object-cover object-bottom filter contrast-125 kavero-nondraggable-image"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-[#140D09]" />
      </div>
    </footer>
  );
}
