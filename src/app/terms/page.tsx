import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata = {
  title: "Terms & Conditions | KAVERO Coffee",
  description: "Terms and conditions governing the purchase of coffee and use of the KAVERO website.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#140D09] text-cream">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full">
        <div className="text-center space-y-3 mb-14">
          <span className="font-script text-copper-light text-2xl sm:text-3xl tracking-wide select-none">
            Commercial Terms
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-cream-light font-normal tracking-tight">
            Terms & Conditions of Service
          </h1>
          <p className="text-xs sm:text-sm text-cream-secondary/80 font-light max-w-lg mx-auto">
            Please review the standard terms governing your coffee purchases and usage of our platform.
          </p>
        </div>

        <div className="bg-[#1F120B] border border-[#3E2619] rounded-2xl p-6 sm:p-10 space-y-6 shadow-luxury text-xs sm:text-sm text-cream-secondary/90 leading-relaxed font-light">
          <section className="space-y-2">
            <h2 className="font-serif text-lg text-cream-light font-medium">1. Introduction & Agreement</h2>
            <p>
              By accessing the KAVERO Coffee website or placing an order, you agree to be bound by these Terms and Conditions. KAVERO Coffee is an authentic Indian direct-to-consumer brand operating out of Karnataka, India.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg text-cream-light font-medium">2. Pricing, Specifications & Availability</h2>
            <p>
              All prices displayed on the website are in Indian National Rupees (INR) and are inclusive of applicable GST taxes. We make every reasonable effort to display accurate product weights, roast notes, and inventory status. In the rare event of inventory exhaustion or pricing errors, we reserve the right to notify the customer and cancel or adjust the order before dispatch.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg text-cream-light font-medium">3. Intellectual Property</h2>
            <p>
              All original visual assets, packaging illustrations, photography, video footage, trademarked brand logos, and editorial copy displayed on this site are the exclusive intellectual property of KAVERO Coffee and may not be reproduced without written authorization.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg text-cream-light font-medium">4. Jurisdiction & Governing Law</h2>
            <p>
              These terms shall be governed and construed in accordance with the laws of India. Any disputes arising out of your purchases shall be subject to the exclusive jurisdiction of the courts located in Karnataka, India.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
