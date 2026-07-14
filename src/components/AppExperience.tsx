'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Smartphone, Zap, Shield, Globe, Star, Home, Mic2, Calendar, TrendingUp } from 'lucide-react';

/**
 * The phone mockup used to point at /app-screen-1..5.png — files that were never
 * added to /public, so it rendered an empty gradient. The screens are built in
 * code instead: they stay on-brand, need no assets, and can't 404.
 */

const DiscoverScreen = () => (
  <div className="h-full w-full px-5 pt-12 pb-20 flex flex-col gap-3">
    <p className="text-[9px] font-black uppercase tracking-[0.25em] text-white/30">Near you</p>
    {[
      { name: 'VALOR', genre: 'Electronic Soul', live: true },
      { name: 'LYRA', genre: 'Acoustic Beyond', live: false },
      { name: 'ORBIT', genre: 'Indie Space', live: true },
    ].map((a) => (
      <div
        key={a.name}
        className="flex items-center gap-3 rounded-xl bg-white/[0.04] border border-white/5 p-2.5"
      >
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-brand-purple to-brand-gold flex items-center justify-center shrink-0">
          <Mic2 className="w-4 h-4 text-black/70" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-black text-white truncate">{a.name}</p>
          <p className="text-[8px] font-bold uppercase tracking-wider text-white/30 truncate">
            {a.genre}
          </p>
        </div>
        {a.live && (
          <span className="text-[7px] font-black uppercase tracking-wider text-brand-gold px-1.5 py-0.5 rounded bg-brand-gold/10 shrink-0">
            Live
          </span>
        )}
      </div>
    ))}
  </div>
);

const BookingScreen = () => (
  <div className="h-full w-full px-5 pt-12 pb-20 flex flex-col gap-4">
    <p className="text-[9px] font-black uppercase tracking-[0.25em] text-white/30">Book a stage</p>
    <div className="rounded-xl bg-white/[0.04] border border-white/5 p-3">
      <p className="text-[8px] font-black uppercase tracking-wider text-white/30 mb-2">Date</p>
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: 21 }, (_, i) => (
          <div
            key={i}
            className={`aspect-square rounded flex items-center justify-center text-[7px] font-black ${
              i === 11
                ? 'bg-brand-gold text-black'
                : 'bg-white/[0.03] text-white/25'
            }`}
          >
            {i + 1}
          </div>
        ))}
      </div>
    </div>
    <div className="space-y-2">
      {['Wedding', 'Corporate', 'Private'].map((t, i) => (
        <div
          key={t}
          className={`rounded-lg px-3 py-2 text-[9px] font-black uppercase tracking-wider border ${
            i === 0
              ? 'bg-brand-purple/15 border-brand-purple/40 text-brand-purple-light'
              : 'bg-white/[0.03] border-white/5 text-white/30'
          }`}
        >
          {t}
        </div>
      ))}
    </div>
  </div>
);

const LiveScreen = () => (
  <div className="h-full w-full px-5 pt-12 pb-20 flex flex-col items-center justify-center gap-5">
    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-purple to-brand-gold flex items-center justify-center">
      <Mic2 className="w-8 h-8 text-black/70" />
    </div>
    <div className="text-center">
      <p className="text-sm font-black uppercase tracking-tight text-white">On Stage</p>
      <p className="text-[8px] font-black uppercase tracking-[0.25em] text-brand-gold mt-1">
        124 BPM &middot; Live
      </p>
    </div>
    {/* Equalizer — the same idea as the page background, at phone scale. */}
    <div className="flex items-end gap-1 h-14">
      {[0.4, 0.75, 0.35, 1, 0.55, 0.9, 0.3, 0.7, 0.45].map((h, i) => (
        <motion.span
          key={i}
          className="w-1.5 rounded-full bg-gradient-to-t from-brand-purple to-brand-gold"
          animate={{ height: [`${h * 45}%`, `${h * 100}%`, `${h * 45}%`] }}
          transition={{
            duration: 0.9 + i * 0.08,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  </div>
);

const EarningsScreen = () => (
  <div className="h-full w-full px-5 pt-12 pb-20 flex flex-col gap-3">
    <p className="text-[9px] font-black uppercase tracking-[0.25em] text-white/30">This month</p>
    <div className="rounded-xl bg-white/[0.04] border border-white/5 p-4">
      <p className="text-[8px] font-black uppercase tracking-wider text-white/30">Paid out</p>
      <p className="text-2xl font-black tracking-tighter text-brand-gold mt-1">₹1,24,500</p>
      <div className="flex items-center gap-1 mt-2 text-[8px] font-black uppercase tracking-wider text-green-400">
        <TrendingUp className="w-3 h-3" />
        +18% vs last
      </div>
    </div>
    <div className="flex-1 rounded-xl bg-white/[0.04] border border-white/5 p-4 flex items-end gap-1.5">
      {[0.3, 0.5, 0.4, 0.7, 0.55, 0.9, 0.75].map((h, i) => (
        <div key={i} className="flex-1 flex flex-col justify-end h-full">
          <div
            className="w-full rounded-sm bg-gradient-to-t from-brand-purple/40 to-brand-purple"
            style={{ height: `${h * 100}%` }}
          />
        </div>
      ))}
    </div>
    <div className="flex items-center gap-2 rounded-lg bg-white/[0.03] border border-white/5 px-3 py-2">
      <Calendar className="w-3 h-3 text-brand-gold shrink-0" />
      <span className="text-[8px] font-black uppercase tracking-wider text-white/40">
        3 bookings this week
      </span>
    </div>
  </div>
);

const appScreens = [
  { id: 'discover', title: 'Discover Artists', Screen: DiscoverScreen },
  { id: 'booking', title: 'Book a Stage', Screen: BookingScreen },
  { id: 'live', title: 'Go Live', Screen: LiveScreen },
  { id: 'earnings', title: 'Track Earnings', Screen: EarningsScreen },
];

const appFeatures = [
  {
    icon: Zap,
    title: 'High-Octane Performance',
    description: 'Broadcast with sub-5ms latency directly from your pocket. The stage is wherever you are.',
  },
  {
    icon: Globe,
    title: 'Global Connectivity',
    description: 'Access thousands of virtual and physical venues across the OcassionOrbit network.',
  },
  {
    icon: Shield,
    title: 'Secure Earnings',
    description: 'Real-time revenue tracking and instant payouts for every high-energy set.',
  },
];

export const AppExperience = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % appScreens.length);
    }, 4200);
    return () => clearInterval(timer);
  }, [reduceMotion]);

  const active = appScreens[currentIndex];
  const ActiveScreen = active.Screen;

  return (
    <section className="section-shell relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left: the device */}
          <div className="relative aspect-[9/16] max-w-[320px] mx-auto lg:mx-0 order-2 lg:order-1">
            <div className="absolute inset-0 bg-brand-purple/20 rounded-[3rem] blur-[60px] -z-10" />

            <div className="relative h-full w-full rounded-[2.5rem] border-[8px] border-[#1A1A1A] bg-[#0B0B12] overflow-hidden shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  className="absolute inset-0"
                >
                  <ActiveScreen />
                </motion.div>
              </AnimatePresence>

              {/* Status bar */}
              <div className="absolute top-0 inset-x-0 h-10 flex items-center justify-between px-6 z-20 pointer-events-none">
                <span className="text-[9px] font-bold text-white/40">9:41</span>
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full border border-white/20" />
                  <div className="w-2.5 h-2.5 rounded-full border border-white/20" />
                </div>
              </div>

              {/* Tab bar */}
              <div className="absolute bottom-0 inset-x-0 h-16 bg-black/50 backdrop-blur-md border-t border-white/5 flex items-center justify-around px-4 z-20">
                {[Home, Globe, Zap, Star].map((Icon, i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 flex items-center justify-center transition-colors ${
                      i === currentIndex % 4 ? 'text-brand-gold' : 'text-white/20'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                ))}
              </div>
            </div>

            {/* Screen indicators — clickable, so it isn't a slideshow you can only watch. */}
            <div className="absolute -right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3">
              {appScreens.map((screen, i) => (
                <button
                  key={screen.id}
                  onClick={() => setCurrentIndex(i)}
                  aria-label={screen.title}
                  aria-current={i === currentIndex}
                  className={`w-1 transition-all duration-500 rounded-full ${
                    i === currentIndex ? 'h-8 bg-brand-purple' : 'h-2 bg-white/10 hover:bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right: the pitch */}
          <div className="order-1 lg:order-2 space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <span className="section-label text-brand-gold">
                <Smartphone className="w-3 h-3" />
                Mobile Terminal
              </span>
              <h2 className="text-5xl md:text-7xl font-black text-white leading-[0.85] uppercase italic">
                Take the Stage<br />
                <span className="text-brand-gold not-italic">To Go.</span>
              </h2>
              <p className="text-white/45 text-sm font-bold uppercase tracking-tight max-w-lg leading-relaxed">
                The OcassionOrbit App is your portable command center. Manage your energy, track your
                global trajectory, and connect with audiences in real-time—whenever, wherever.
              </p>
            </motion.div>

            <div className="space-y-8">
              {appFeatures.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="flex gap-6 group"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-brand-gold/10 transition-colors">
                    <feature.icon className="w-5 h-5 text-white/40 group-hover:text-brand-gold transition-colors" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-white font-black uppercase text-xs tracking-widest">
                      {feature.title}
                    </h3>
                    <p className="text-white/35 text-xs font-bold leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              {[
                { top: 'Download on', bottom: 'App Store' },
                { top: 'Get it on', bottom: 'Google Play' },
              ].map((store) => (
                <div
                  key={store.bottom}
                  className="h-14 w-40 rounded-xl flex items-center justify-center gap-3 glass opacity-60"
                >
                  <div className="w-6 h-6 rounded bg-white/10" />
                  <div className="flex flex-col">
                    <span className="text-[8px] text-white/40 font-black uppercase leading-none">
                      {store.top}
                    </span>
                    <span className="text-xs text-white font-bold leading-none mt-1">
                      {store.bottom}
                    </span>
                  </div>
                </div>
              ))}
              <span className="self-center text-[10px] font-black uppercase tracking-[0.25em] text-brand-gold/60">
                Coming soon
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
