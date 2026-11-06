import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata = {
  title: "Privacy Policy | KAVERO Coffee",
  description: "Privacy and personal data protection policy for KAVERO Coffee website users and customers.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#140D09] text-cream">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full">
        <div className="text-center space-y-3 mb-14">
          <span className="font-script text-copper-light text-2xl sm:text-3xl tracking-wide select-none">
            Transparency & Integrity
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-cream-light font-normal tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-cream-secondary/80 font-light max-w-lg mx-auto">
            How KAVERO Coffee collects, utilizes, and safeguards your customer data.
          </p>
        </div>

        <div className="bg-[#1F120B] border border-[#3E2619] rounded-2xl p-6 sm:p-10 space-y-6 shadow-luxury text-xs sm:text-sm text-cream-secondary/90 leading-relaxed font-light">
          <section className="space-y-2">
            <h2 className="font-serif text-lg text-cream-light font-medium">1. Information We Collect</h2>
            <p>
              When you purchase coffee from KAVERO or subscribe to estate updates, we collect essential transactional data: your full name, shipping destination address, postal PIN code, telephone contact, and email address. We do not store complete credit card or netbanking credentials on our servers; all payment transactions are handled through PCI-DSS Level 1 compliant gateway partners.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg text-cream-light font-medium">2. Purpose of Data Processing</h2>
            <p>
              Your contact and shipping details are used solely to fulfill, roast, pack, and deliver your coffee orders, communicate delivery status updates via SMS and email, and provide customer support. If you subscribe to our newsletter, we periodically send harvest announcements and brewing tips, which you can opt out of at any time.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg text-cream-light font-medium">3. Third-Party Disclosures</h2>
            <p>
              KAVERO Coffee does not sell, rent, or trade your personal information to third-party marketing companies. Data is shared exclusively with licensed courier delivery partners (e.g. Blue Dart, Delhivery) for physical parcel transportation and regulatory compliance under applicable Indian laws.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg text-cream-light font-medium">4. Security Safeguards</h2>
            <p>
              We implement industry-standard 256-bit Secure Socket Layer (SSL) encryption across all checkout endpoints and data repositories to safeguard your transmission against unauthorized access.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
