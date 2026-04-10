'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './Button';
import { ArrowUpRight, Globe, Zap } from 'lucide-react';

export const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center overflow-hidden pt-20">
      {/* Cinematic Background Image */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url("/hero-bg.png")' }}
        />
        {/* Cinematic Gradient Overlays - Tuned to Deep Purple/Gold */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050810] via-[#050810]/60 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050810] via-transparent to-[#050810]/30 z-10" />
      </div>

      <div className="container mx-auto px-6 relative z-20">
        <div className="grid lg:grid-cols-2 items-center gap-12">
          {/* Main Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-4 mb-10"
            >
              <div className="flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/20 backdrop-blur-xl">
                <span className="flex h-1.5 w-1.5 rounded-full bg-brand-gold animate-pulse-live" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-gold">Orbital Sync: Active</span>
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
                  <div className="absolute top-0 -right-16 w-14 h-14 rounded-full border border-brand-gold/30 flex items-center justify-center animate-spin-slow">
                    <ArrowUpRight className="w-8 h-8 text-brand-gold" strokeWidth={3} />
                  </div>
                </span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-lg md:text-xl text-white/60 max-w-lg mb-12 font-medium leading-relaxed tracking-tight"
            >
              Welcome to the new era of event orchestration. OcassionOrbit bridges the physical and terminal worlds through seamless connectivity and high-impact visual design.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap items-center gap-6"
            >
              <Button size="lg" className="rounded-full px-10 py-7 bg-brand-gold text-black hover:bg-white hover:text-black text-[11px] font-black uppercase tracking-widest shadow-[0_0_30px_rgba(212,175,55,0.3)] border-none">
                Get Started
              </Button>
              <button className="px-10 py-7 rounded-full border border-white/10 glass hover:bg-white/5 transition-all text-[11px] font-black uppercase tracking-widest text-white/60 hover:text-white">
                View Terminal
              </button>
            </motion.div>
          </div>

          {/* Stats Cards - Floating Right */}
          <div className="hidden lg:flex flex-col items-end gap-6">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="glass p-8 rounded-3xl border border-white/10 w-72 backdrop-blur-2xl group hover:border-brand-gold/50 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <Globe className="text-brand-purple" size={20} />
                <span className="text-[10px] font-black text-brand-gold">GLOBAL</span>
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Sync Velocity</p>
              <p className="text-5xl font-black tracking-tighter group-hover:text-brand-gold transition-colors">99.9<span className="text-2xl text-white/20">%</span></p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="glass p-8 rounded-3xl border border-white/10 w-72 backdrop-blur-2xl group hover:border-brand-purple/50 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <Zap className="text-brand-gold" size={20} />
                <span className="text-[10px] font-black text-brand-purple">POWERED</span>
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Active Nodes</p>
              <p className="text-5xl font-black tracking-tighter group-hover:text-brand-purple transition-colors">4.8k<span className="text-2xl text-white/20">+</span></p>
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
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Enter Orbit</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-brand-gold/40 to-transparent" />
      </motion.div>
    </section>
  );
};
