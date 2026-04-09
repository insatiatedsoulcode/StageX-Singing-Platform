import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { BookingForm } from '@/components/BookingForm';

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-brand-bg text-white selection:bg-brand-violet/30 overflow-x-hidden">
      <Navbar />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-4xl">
           <BookingForm />
        </div>
      </main>

      <Footer />
    </div>
  );
}
