import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { TrustSection } from '@/components/TrustSection';
import { FeatureGrid } from '@/components/FeatureGrid';
import { ProductShowcase } from '@/components/ProductShowcase';
import { HowItWorks } from '@/components/HowItWorks';
import { CTASection } from '@/components/CTASection';
import { Footer } from '@/components/Footer';
import { BookingForm } from '@/components/BookingForm';
import { LeadCaptureModal } from '@/components/LeadCaptureModal';

export default function Home() {
  return (
    <div className="min-h-screen bg-brand-bg text-white selection:bg-brand-purple/30">
      <LeadCaptureModal />
      <Navbar />
      
      <main>
        <HeroSection />
        <section id="booking" className="py-24 bg-[#0A0612] relative overflow-hidden">
           {/* Ambient background glow */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-violet/5 rounded-full blur-[120px] pointer-events-none" />
           <div className="container mx-auto px-6 relative z-10">
              <BookingForm />
           </div>
        </section>
        <TrustSection />
        <FeatureGrid />
        <ProductShowcase />
        <HowItWorks />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
