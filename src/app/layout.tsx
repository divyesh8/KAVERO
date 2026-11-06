import type { Metadata, Viewport } from "next";
import { playfair, inter, alexBrush } from "./fonts";
import "./globals.css";
import "@/styles/kavero-motion.css";
import { CartProvider } from "@/context/CartContext";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { HardRefreshPreloader } from "@/components/kavero-motion/HardRefreshPreloader";

export const metadata: Metadata = {
  metadataBase: new URL("https://kaverocoffee.com"),
  title: {
    default: "KAVERO Coffee — Authentic South Indian Filter Coffee",
    template: "%s | KAVERO Coffee",
  },
  description:
    "Authentic South Indian filter coffee, estate-grown in the misty hills of Karnataka. Single-estate sourced beans, farmer-owned, crafted with heritage and care.",
  keywords: [
    "Kavero Coffee",
    "South Indian Filter Coffee",
    "Karnataka Coffee",
    "Chikmagalur Coffee",
    "Coorg Coffee",
    "Estate-Grown Coffee",
    "Brass Filter Coffee",
    "Traditional Filter Coffee Decoction",
  ],
  authors: [{ name: "KAVERO Coffee" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://kavero-orcin.vercel.app/",
    siteName: "KAVERO Coffee",
    title: "KAVERO Coffee — From Our Estate. To Your Everyday.",
    description:
      "Authentic South Indian filter coffee rooted in Karnataka's coffee-growing heritage. Estate-grown, farmer-owned, slow roasted.",
    images: [
      {
        url: "/images/about-kavero-estate.png",
        width: 1200,
        height: 630,
        alt: "KAVERO Coffee Estate Packaging and Karnataka Highlands",
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#140D09",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${alexBrush.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-[#140D09] text-cream font-sans antialiased selection:bg-copper selection:text-white">
        <CartProvider>
          <HardRefreshPreloader />
          <CartDrawer />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
