'use client';

import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { TrustSection } from '@/components/TrustSection';
import { HowItWorks } from '@/components/HowItWorks';
import { AppExperience } from '@/components/AppExperience';
import { CTASection } from '@/components/CTASection';
import { SocialHub } from '@/components/SocialHub';
import { BookingModal } from '@/components/BookingModal';

export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    // No background colour here — the body carries it, and an opaque background
    // on this wrapper would paint straight over the fixed -z-10 canvas.
    <div className="relative min-h-screen text-white selection:bg-brand-purple/30">
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
      <Navbar onBookingClick={() => setIsBookingOpen(true)} />

      <main>
        <HeroSection onBookingClick={() => setIsBookingOpen(true)} />
        <AppExperience />
        <HowItWorks />
        <TrustSection />
        <SocialHub />
        <CTASection onBookingClick={() => setIsBookingOpen(true)} />
      </main>

      {/* Runway for the ribbon sweep, which the footer used to occupy. */}
      <div className="h-[45vh]" aria-hidden="true" />
    </div>
  );
}
