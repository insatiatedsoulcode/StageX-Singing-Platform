import React from 'react';
import { Phone } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { BookingForm } from '@/components/BookingForm';
import { WhatsAppIcon } from '@/components/SocialIcons';
import { BOOKING_INQUIRY, PHONE_DISPLAY, PHONE_TEL, whatsappLink } from '@/lib/contact';

export default function BookingPage() {
  return (
    <div className="min-h-screen text-white selection:bg-brand-purple/30 overflow-x-hidden">
      <Navbar />

      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <header className="text-center mb-12">
            <span className="section-label text-brand-gold justify-center mb-6">
              Book a Stage
            </span>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic text-white">
              Let&apos;s make it<br />
              <span className="text-brand-gold not-italic">unforgettable.</span>
            </h1>
          </header>

          {/* Direct contact — book an event by call or message */}
          <div className="glass-solid rounded-3xl p-8 md:p-10 mb-12 text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-4">
              Booking an event?
            </p>
            <a
              href={PHONE_TEL}
              className="inline-flex items-center justify-center gap-3 text-2xl md:text-4xl font-black tracking-tighter text-brand-gold hover:text-white transition-colors"
            >
              <Phone className="w-6 h-6 md:w-8 md:h-8" strokeWidth={3} />
              {PHONE_DISPLAY}
            </a>
            <p className="text-white/45 text-xs font-bold uppercase tracking-[0.2em] mt-4">
              Call or message us on our registered company number
            </p>
            <a
              href={whatsappLink(BOOKING_INQUIRY)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 px-8 py-4 rounded-full bg-[#25D366] text-[10px] font-black uppercase tracking-[0.25em] text-black hover:brightness-110 transition-all shadow-[0_0_30px_rgba(37,211,102,0.25)]"
            >
              <WhatsAppIcon className="w-4 h-4" />
              Message on WhatsApp
            </a>
          </div>

          {/* The form sits on its own surface so the animated mesh doesn't read
              through the input fields. */}
          <div className="glass-solid rounded-3xl p-2 md:p-6">
            <BookingForm />
          </div>
        </div>
      </main>

      {/* Runway for the ribbon sweep, which the footer used to occupy. */}
      <div className="h-[45vh]" aria-hidden="true" />
    </div>
  );
}
