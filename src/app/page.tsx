import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { TrustSection } from '@/components/TrustSection';
import { FeatureGrid } from '@/components/FeatureGrid';
import { ProductShowcase } from '@/components/ProductShowcase';
import { HowItWorks } from '@/components/HowItWorks';
import { CTASection } from '@/components/CTASection';
import { Footer } from '@/components/Footer';
import { SocialHub } from '@/components/SocialHub';
import { BookingModal } from '@/components/BookingModal';

export default function Home() {
  return (
    <div className="min-h-screen bg-brand-bg text-white selection:bg-brand-purple/30">
      <BookingModal />
      <Navbar />
      
      <main>
        <HeroSection />
        <TrustSection />
        <FeatureGrid />
        <ProductShowcase />
        <HowItWorks />
        <SocialHub />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
