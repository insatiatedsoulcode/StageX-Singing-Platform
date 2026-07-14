'use client';

import React, { useMemo, useState } from 'react';
import { Navbar } from '@/components/Navbar';
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

const filters = ['All', 'Live', 'Electronic', 'Acoustic'] as const;
type Filter = (typeof filters)[number];

export default function EventsPage() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('All');

  // The search box and pills were decorative before — they render, but typing in
  // them did nothing. Wire them to the list.
  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return artists.filter((a) => {
      const matchesQuery =
        !q || a.name.toLowerCase().includes(q) || a.genre.toLowerCase().includes(q);
      const matchesFilter =
        filter === 'All' ||
        (filter === 'Live' && a.isLive) ||
        (filter !== 'Live' && a.genre.toLowerCase().includes(filter.toLowerCase()));
      return matchesQuery && matchesFilter;
    });
  }, [query, filter]);

  return (
    <div className="min-h-screen text-white selection:bg-brand-purple/30">
      <Navbar />

      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6">
          <header className="mb-16">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic mb-8"
            >
              Discover <span className="text-brand-purple-light not-italic">Orbits</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col md:flex-row gap-6 items-center justify-between"
            >
              <div className="relative w-full md:w-96 group">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-brand-purple-light transition-colors"
                  size={20}
                />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search artists or genres..."
                  aria-label="Search artists or genres"
                  className="w-full pl-12 pr-6 py-4 glass-solid rounded-xl outline-none focus:border-brand-purple/50 transition-all text-sm placeholder:text-white/25"
                />
              </div>

              <div className="flex gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                {filters.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setFilter(tag)}
                    aria-pressed={filter === tag}
                    className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all border ${
                      filter === tag
                        ? 'bg-brand-gold text-black border-brand-gold'
                        : 'glass-solid text-white/60 hover:text-white hover:border-brand-purple/50'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </motion.div>
          </header>

          {visible.length > 0 ? (
            <div className="bento-grid">
              {visible.map((artist, index) => (
                <motion.div
                  key={artist.name}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06, duration: 0.45 }}
                >
                  <ArtistCard {...artist} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="glass-solid rounded-3xl p-16 text-center">
              <p className="text-lg font-black uppercase tracking-tighter text-white/50">
                No orbits match &ldquo;{query}&rdquo;
              </p>
              <button
                onClick={() => {
                  setQuery('');
                  setFilter('All');
                }}
                className="mt-6 px-8 py-3 rounded-full bg-brand-gold text-black text-[10px] font-black uppercase tracking-[0.25em]"
              >
                Reset
              </button>
            </div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-32 p-12 glass rounded-3xl border border-dashed border-white/10 text-center"
          >
            <h2 className="text-3xl font-black uppercase tracking-tighter text-white/50 mb-4">
              You&apos;ve reached the edge
            </h2>
            <p className="text-white/30 text-sm font-bold uppercase tracking-widest leading-loose max-w-lg mx-auto">
              More artists and orbits are connecting every second. Join the waitlist to get notified
              of the next major drop.
            </p>
          </motion.div>
        </div>
      </main>

      {/* Runway for the ribbon sweep, which the footer used to occupy. */}
      <div className="h-[45vh]" aria-hidden="true" />
    </div>
  );
}
