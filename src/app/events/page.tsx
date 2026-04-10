'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ArtistCard } from '@/components/ArtistCard';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

const artists = [
  { name: 'VALOR', genre: 'Electronic Soul', stats: '128 BPM', isLive: true },
  { name: 'KAIZEN', genre: 'Cyber Pop', stats: '142 BPM', isLive: false },
  { name: 'LYRA', genre: 'Acoustic Beyond', stats: '90 BPM', isLive: true },
  { name: 'NEON', genre: 'Vapor Wave', stats: '110 BPM', isLive: false },
  { name: 'ORBIT', genre: 'Indie Space', stats: '124 BPM', isLive: false },
  { name: 'VOID', genre: 'Deep Techno', stats: '138 BPM', isLive: true },
];

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-brand-bg text-white selection:bg-brand-purple/30">
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <header className="mb-20">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic mb-6"
            >
              Discover <span className="text-brand-purple not-italic">Orbits</span>
            </motion.h1>
            
            <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
              <div className="relative w-full md:w-96 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-brand-purple transition-colors" size={20} />
                <input
                  type="text"
                  placeholder="Search artists or genres..."
                  className="w-full pl-12 pr-6 py-4 glass-card rounded-xl outline-none border-transparent focus:border-brand-purple/50 transition-all text-sm"
                />
              </div>
              <div className="flex gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                {['All', 'Live', 'Upcoming', 'Electronic', 'Acoustic'].map((tag) => (
                  <button
                    key={tag}
                    className="px-6 py-2 rounded-full glass border border-white/5 text-xs font-black uppercase tracking-widest hover:border-brand-purple/50 hover:text-brand-purple transition-all whitespace-nowrap"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </header>

          <div className="bento-grid">
            {artists.map((artist, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ArtistCard {...artist} />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-32 p-12 glass rounded-3xl border border-dashed border-white/10 text-center"
          >
            <h2 className="text-3xl font-black uppercase tracking-tighter text-white/40 mb-4">You&apos;ve reached the edge</h2>
            <p className="text-white/20 text-sm font-bold uppercase tracking-widest leading-loose max-w-lg mx-auto">
              More artists and orbits are connecting every second. Join the waitlist to get notified of the next major drop.
            </p>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
