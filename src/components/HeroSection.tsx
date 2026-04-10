'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './Button';
import { ArrowUpRight } from 'lucide-react';

export const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      {/* Cinematic Background Image */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url("/hero-bg.png")' }}
        />
        {/* Cinematic Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 z-10" />
      </div>

      <div className="container mx-auto px-6 relative z-20">
        <div className="grid lg:grid-cols-2 items-center gap-12">
          {/* Main Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                <span className="flex h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60">Live Now · 3 Stages Active</span>
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">The Electric Stage · Est. 2026</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-white mb-8 leading-[0.85] uppercase">
                Feel the<br />
                <span className="relative inline-block">
                  Electric<br />Stage
                  <ArrowUpRight className="absolute top-1/2 -right-12 -translate-y-1/2 w-12 h-12 text-brand-violet" strokeWidth={3} />
                </span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-lg md:text-xl text-white/60 max-w-lg mb-12 font-medium leading-relaxed tracking-tight"
            >
              Your digital backstage pass. Discover, feel, and book premium live music experiences — where every beat has a visual pulse.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap items-center gap-6"
            >
              <Button size="lg" className="rounded-full px-10 py-7 bg-brand-violet text-white hover:bg-brand-violet/90 text-[11px] font-black uppercase tracking-widest shadow-[0_0_30px_rgba(139,92,246,0.3)]">
                Reserve Your Stage
              </Button>
              <button className="px-10 py-7 rounded-full border border-white/10 glass hover:bg-white/5 transition-all text-[11px] font-black uppercase tracking-widest text-white/60 hover:text-white">
                Explore Artists
              </button>
            </motion.div>
          </div>

          {/* Stats Cards - Floating Right */}
          <div className="hidden lg:flex flex-col items-end gap-6">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="glass p-8 rounded-3xl border border-white/10 w-64 backdrop-blur-2xl group hover:border-brand-violet/50 transition-colors"
            >
              <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Avg. BPM</p>
              <p className="text-5xl font-black tracking-tighter group-hover:text-brand-violet transition-colors">128</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="glass p-8 rounded-3xl border border-white/10 w-64 backdrop-blur-2xl group hover:border-pink-500/50 transition-colors"
            >
              <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Artists Live</p>
              <p className="text-5xl font-black tracking-tighter group-hover:text-pink-500 transition-colors">24+</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Centered Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-20"
      >
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent" />
      </motion.div>
    </section>
  );
};
