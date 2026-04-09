'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './Button';
import { Sparkles } from 'lucide-react';

export const CTASection = () => {
  return (
    <section className="py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden glass rounded-[3rem] border border-white/20 p-12 md:p-24 text-center"
        >
          {/* Animated Background Gradients */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-violet/20 via-brand-cyan/10 to-transparent -z-10" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-violet/20 rounded-full blur-[100px] animate-glow" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-brand-cyan/20 rounded-full blur-[100px] animate-glow" />

          <div className="max-w-3xl mx-auto space-y-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-brand-gold text-sm font-bold"
            >
              <Sparkles className="w-4 h-4" />
              Ready to transcend the ordinary?
            </motion.div>
            
            <h2 className="text-4xl md:text-7xl font-black text-white leading-[0.85] uppercase italic">
              Release Your<br />
              <span className="text-glow text-brand-violet not-italic uppercase">Voice.</span>
            </h2>
            
            <p className="text-white/40 text-xs font-bold uppercase tracking-[0.2em] max-w-xl mx-auto leading-loose">
              Join the elite league of vocalists performing on the world&apos;s most 
              advanced digital stage. Your audience is waiting.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
              <Button size="lg" className="w-full sm:w-auto text-xl px-12 py-6 bg-white text-black hover:bg-brand-cyan transition-colors shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                Book a Stage
              </Button>
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                Watch Live Demo
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
