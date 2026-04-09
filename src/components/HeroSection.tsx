'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './Button';
import { ChevronRight, Play } from 'lucide-react';

import { StageTerminal } from './StageTerminal';

export const HeroSection = () => {
  return (
    <section className="relative min-height-[90vh] flex items-center justify-center pt-32 pb-20 overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-[20%] left-[10%] w-96 h-96 bg-brand-purple/20 rounded-full blur-[120px] animate-glow" />
      <div className="absolute bottom-[10%] right-[5%] w-80 h-80 bg-brand-cyan/10 rounded-full blur-[100px] animate-glow" />
      <div className="absolute inset-0 noise-bg pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 text-xs font-black uppercase tracking-[0.2em] text-brand-cyan mb-8"
        >
          <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse-live" />
          Live Now: Global Tour &apos;26
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white mb-6 leading-[0.9] uppercase italic"
        >
          Feel the<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-violet via-brand-cyan to-brand-violet animate-glow">
            Electric Stage.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-12 font-medium tracking-tight"
        >
          The world&apos;s most immersive vocal performance platform. 
          Connect with elite singers, book high-end venues, and broadcast your voice to the beyond.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
        >
          <Button size="lg" className="group">
            Get Started
            <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button variant="secondary" size="lg" className="group">
            <Play className="mr-2 w-4 h-4 fill-white" />
            Live Demo
          </Button>
        </motion.div>

        {/* Dashboard Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="relative max-w-5xl mx-auto"
        >
          <div className="absolute inset-0 bg-brand-purple/20 rounded-3xl blur-3xl -z-10" />
          <StageTerminal />
        </motion.div>
      </div>
    </section>
  );
};
