'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight, Globe, Phone, Zap } from 'lucide-react';
import { PHONE_DISPLAY, PHONE_TEL } from '@/lib/contact';

export const HeroSection = ({ onBookingClick }: { onBookingClick?: () => void }) => {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  // 0 while the hero fills the viewport → 1 once it has scrolled fully away.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // The copy lifts and dissolves while the photo lags behind it, so the hero
  // hands off to the mesh instead of cutting to it.
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -110]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const cardsY = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const photoY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const scrimOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);

  // Reduced motion: hand framer `undefined` so the element just sits still.
  const still = <T,>(v: T): T | undefined => (reduceMotion ? undefined : v);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden pt-40 md:pt-48 pb-32"
    >
      {/* Cinematic plate. Held at partial opacity so the waveform mesh reads
          *through* the photo rather than being sealed off behind it. */}
      <motion.div
        style={{ y: still(photoY), scale: still(photoScale) }}
        className="absolute inset-0 z-0"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
          style={{ backgroundImage: 'url("/hero-bg.png")' }}
        />
      </motion.div>

      {/* Scrims: translucent, so the canvas still comes through. */}
      <motion.div style={{ opacity: still(scrimOpacity) }} className="absolute inset-0 z-[1]">
        <div className="absolute inset-0 bg-gradient-to-r from-[#050810] via-[#050810]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050810]/90 via-transparent to-[#050810]/40" />
      </motion.div>

      <div className="container mx-auto px-6 relative z-20">
        <div className="grid lg:grid-cols-2 items-center gap-12">
          <motion.div style={{ y: still(copyY), opacity: still(copyOpacity) }}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-4 mb-10"
            >
              <div className="flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-brand-purple/10 border border-brand-purple/20 backdrop-blur-xl">
                <span className="flex h-1.5 w-1.5 rounded-full bg-brand-purple animate-pulse-live" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-purple-light">
                  Energy Pulse: Infinite
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-white mb-8 leading-[0.85] uppercase">
                Orbiting<br />
                <span className="relative inline-block text-brand-gold italic">
                  The Beyond<br />
                  <span className="absolute top-0 -right-16 w-14 h-14 rounded-full border border-brand-gold/30 flex items-center justify-center animate-spin-slow">
                    <ArrowUpRight className="w-8 h-8 text-brand-gold" strokeWidth={3} />
                  </span>
                </span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="max-w-lg mb-12"
            >
              <p className="text-xl md:text-2xl text-white font-bold leading-snug tracking-tight mb-4">
                Make your night or occasion perfect with The Best Musicians.
              </p>
              <p className="text-base md:text-lg text-white/60 font-medium leading-relaxed tracking-tight">
                Welcome to our family! Make your event management smoother than ever before.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap items-center gap-6"
            >
              <Link
                href="/booking"
                className="inline-flex items-center justify-center rounded-full px-12 py-7 bg-brand-purple text-white hover:bg-brand-gold hover:text-black text-[11px] font-black uppercase tracking-[0.2em] shadow-[0_0_50px_rgba(124,58,237,0.3)] transition-all duration-500"
              >
                Hire the Best Artists / Musicians
              </Link>
              <button
                onClick={onBookingClick}
                className="px-10 py-7 rounded-full border border-white/10 glass hover:bg-white/5 transition-all text-[11px] font-black uppercase tracking-[0.2em] text-white/60 hover:text-white"
              >
                Perform &amp; Earn
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap items-center gap-3 mt-10 text-[11px] font-black uppercase tracking-[0.2em]"
            >
              <span className="text-white/40">Book an event &mdash; call or message</span>
              <a
                href={PHONE_TEL}
                className="inline-flex items-center gap-2 text-brand-gold hover:text-white transition-colors"
              >
                <Phone size={14} strokeWidth={3} />
                {PHONE_DISPLAY}
              </a>
            </motion.div>
          </motion.div>

          {/* Stats cards — travel faster than the copy, which is what makes the
              hero feel like it has depth rather than being one flat plate. */}
          <motion.div
            style={{ y: still(cardsY), opacity: still(copyOpacity) }}
            className="hidden lg:flex flex-col items-end gap-6"
          >
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="glass-solid p-8 rounded-3xl w-72 group hover:border-brand-gold/50 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <Globe className="text-white/40" size={20} />
                <span className="text-[10px] font-black text-brand-gold">GLOBAL</span>
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">
                Momentum Scale
              </p>
              <p className="text-5xl font-black tracking-tighter group-hover:text-brand-gold transition-colors">
                99.9<span className="text-2xl text-white/20">%</span>
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="glass-solid p-8 rounded-3xl w-72 group hover:border-brand-purple/50 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <Zap className="text-brand-gold" size={20} />
                <span className="text-[10px] font-black text-white/40">POWERED</span>
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">
                Active Nodes
              </p>
              <p className="text-5xl font-black tracking-tighter group-hover:text-brand-purple-light transition-colors">
                4.8k<span className="text-2xl text-white/20">+</span>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue. Fades out on the same curve as the copy, so it disappears
          exactly as the mesh takes over. */}
      <motion.div
        style={{ opacity: still(copyOpacity) }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-20"
      >
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">
          Enter Orbit
        </span>
        <motion.span
          animate={reduceMotion ? undefined : { scaleY: [0.4, 1, 0.4], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="block w-[1px] h-12 origin-top bg-gradient-to-b from-brand-gold to-transparent"
        />
      </motion.div>
    </section>
  );
};
