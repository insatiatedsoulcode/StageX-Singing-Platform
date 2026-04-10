'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Mic2 } from 'lucide-react';
import { Button } from './Button';
import { StageTerminal } from './StageTerminal';

export const ProductShowcase = () => {
  const points = [
    'Sub-5ms Monitoring Latency',
    'AI-Enhanced Neural Clarity',
    'Multi-Stage Orbit Broadcast',
    'Real-time Harmonic Interface'
  ];

  return (
    <section id="product" className="py-32 bg-white/[0.01]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1"
          >
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-[0.9] uppercase italic">
              Orbital<br />
              <span className="text-brand-gold not-italic uppercase">Precision.</span>
            </h2>
            <p className="text-white/40 text-lg mb-10 leading-relaxed font-bold uppercase tracking-tight text-xs">
              OcassionOrbit delivers the most stable orchestration engine on the market. 
              Built for live performance, trusted by global artists for precision and power.
            </p>
            
            <ul className="space-y-6 mb-12">
              {points.map((point, index) => (
                <li key={index} className="flex items-center gap-4 text-white/80 font-black uppercase tracking-tighter text-sm">
                  <CheckCircle2 className="text-brand-purple w-6 h-6 shadow-[0_0_15px_rgba(139,92,246,0.4)]" />
                  {point}
                </li>
              ))}
            </ul>

            <Button size="lg" variant="primary">Start Your Session</Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 relative"
          >
            {/* Ambient Background Glow */}
            <div className="absolute -inset-10 bg-gradient-to-tr from-brand-purple/20 via-brand-gold/10 to-transparent blur-3xl rounded-full animate-glow" />
            
            <StageTerminal />
            
            {/* Overlay float status card */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-6 -left-6 glass-card p-4 border-brand-purple/20 hidden md:block z-20 shadow-2xl"
            >
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 bg-brand-purple/20 rounded-full flex items-center justify-center">
                    <Mic2 className="text-brand-purple w-5 h-5 shadow-[0_0_10px_#8B5CF6]" />
                 </div>
                 <div>
                    <div className="text-white font-black text-sm uppercase tracking-tighter italic leading-none">Orbital Engine</div>
                    <div className="text-brand-purple text-[10px] uppercase tracking-widest font-black leading-none mt-1">OPTIMIZED</div>
                 </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
