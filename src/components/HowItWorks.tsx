'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Link2, Mic2 } from 'lucide-react';

const steps = [
  {
    icon: Layout,
    title: 'Select Your Stage',
    description: 'Choose from a variety of virtual and physical venues tailored for your performance style.',
    color: 'bg-brand-violet'
  },
  {
    icon: Link2,
    title: 'Link Your Voice',
    description: 'Connect your interface and calibrate your vocal signature with our AI-driven neural bridge.',
    color: 'bg-brand-cyan'
  },
  {
    icon: Mic2,
    title: 'Perform Live',
    description: 'Broadcast to a global audience with sub-5ms latency and full immersive stage effects.',
    color: 'bg-brand-violet'
  }
];

export const HowItWorks = () => {
  return (
    <section className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic text-white mb-6">
            The Performance <span className="text-brand-violet not-italic">Loop</span>
          </h2>
          <p className="text-white/40 max-w-2xl mx-auto text-xs font-bold uppercase tracking-[0.2em] leading-loose">
            A seamless journey from initial registration to your first global headline performance.
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-brand-violet via-brand-cyan to-transparent hidden md:block" />

          <div className="space-y-24">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`flex flex-col md:flex-row items-center gap-8 ${
                  index % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Content Side */}
                <div className={`flex-1 w-full ${index % 2 === 0 ? 'md:text-right md:pr-20' : 'md:text-left md:pl-20'}`}>
                   <h3 className="text-2xl font-black uppercase tracking-tighter text-white mb-4 italic">{step.title}</h3>
                   <p className="text-white/40 text-sm font-bold uppercase tracking-tight leading-relaxed">{step.description}</p>
                </div>

                {/* Step Connector Icon */}
                <div className="relative z-10">
                   <div className={`w-16 h-16 rounded-full ${step.color} shadow-[0_0_30px_rgba(220,184,255,0.4)] flex items-center justify-center border-4 border-brand-bg`}>
                      <step.icon className="w-8 h-8 text-white" />
                   </div>
                </div>

                {/* Empty Side for alignment */}
                <div className="flex-1 w-full hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
