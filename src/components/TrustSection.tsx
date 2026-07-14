'use client';

import React from 'react';
import { motion } from 'framer-motion';

const logos = [
  'Sonic Orbit',
  'Bass Energy',
  'Orbital Flux',
  'Beat Nexus',
  'Pulse Collective',
  'Cloud Arena',
];

const stats = [
  { label: '<5ms', sub: 'Energy Constant' },
  { label: '1M+', sub: 'Orbital Artists' },
  { label: '4K+', sub: 'Orbital Terminals' },
];

export const TrustSection = () => {
  return (
    <section className="py-24 border-y border-white/5 bg-white/[0.015] backdrop-blur-sm">
      <div className="container mx-auto px-6">
        <p className="text-center text-white/40 text-[10px] font-black mb-12 uppercase tracking-[0.3em]">
          Partnered with elite sound engineering labs
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {logos.map((logo, index) => (
            <motion.div
              key={logo}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: index * 0.06, duration: 0.5 }}
              className="flex justify-center"
            >
              <span className="text-sm font-black text-white/35 hover:text-brand-purple-light transition-colors cursor-default uppercase tracking-tighter italic">
                {logo}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.sub}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: index * 0.12, duration: 0.6, ease: 'easeOut' }}
              className="text-center p-8 glass-solid rounded-3xl group hover:border-brand-gold/30 transition-all duration-500"
            >
              <div className="text-6xl font-black text-white mb-2 tracking-tighter italic group-hover:text-brand-gold transition-colors">
                {stat.label}
              </div>
              <div className="text-white/30 text-[10px] font-black uppercase tracking-[0.3em]">
                {stat.sub}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
