import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/home/Hero";
import { BrandTrustStrip } from "@/components/home/BrandTrustStrip";
import { AboutKavero } from "@/components/home/AboutKavero";
import { PopularPicks } from "@/components/home/PopularPicks";
import { KarnatakaOrigin } from "@/components/home/KarnatakaOrigin";
import { CustomerStories } from "@/components/home/CustomerStories";
import { Newsletter } from "@/components/home/Newsletter";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#140D09] text-cream">
      {/* SECTION 01: Announcement Bar */}
      <AnnouncementBar />

      {/* SECTION 02: Navigation Header */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* SECTION 03: Main Hero */}
        <Hero />

        {/* SECTION 04: Brand Trust Strip */}
        <BrandTrustStrip />

        {/* SECTION 05: About KAVERO */}
        <AboutKavero />

        {/* SECTION 06: Popular Picks */}
        <PopularPicks />

        {/* SECTION 07: Karnataka Origin Banner */}
        <KarnatakaOrigin />

        {/* SECTION 08: Customer Stories */}
        <CustomerStories />

        {/* SECTION 09: Newsletter Strip */}
        <Newsletter />
      </main>

      {/* SECTION 10: Footer */}
      <Footer />
    </div>
  );
}
