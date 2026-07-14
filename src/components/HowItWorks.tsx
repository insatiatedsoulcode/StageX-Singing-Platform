'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion';
import { Apple, CircleDollarSign, Play, ShieldCheck, UserRound, Video } from 'lucide-react';

const steps = [
  {
    icon: UserRound,
    title: '1. Identity',
    description: 'Create your artist profile in the app — your name, stage name, category and contact details.',
  },
  {
    icon: Video,
    title: '2. Portfolio',
    description: 'Show us what you do. Add your best shots, performance videos and a link to your work.',
  },
  {
    icon: ShieldCheck,
    title: '3. Verification',
    description: 'Our team reviews your profile and verifies you, so every artist on the platform is the real deal.',
  },
  {
    icon: CircleDollarSign,
    title: '4. Potential',
    description: 'Set your rate, go live, and start getting booked for events. Perform & earn.',
  },
];

export const HowItWorks = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // The line draws itself as the steps come into view — the timeline becomes a
  // progress bar for the section instead of a static decoration.
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 75%', 'end 60%'],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <section className="section-shell relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic text-white mb-6">
            How the <span className="text-brand-gold not-italic">App</span> Works
          </h2>
          <p className="text-white/45 max-w-2xl mx-auto text-xs font-bold uppercase tracking-[0.2em] leading-loose mb-10">
            Artist profiles are created in the OcassionOrbit app. Four steps from sign-up to your
            first paid booking.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <span className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full glass text-[10px] font-black uppercase tracking-[0.25em] text-white/60">
              <Apple size={16} />
              App Store
            </span>
            <span className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full glass text-[10px] font-black uppercase tracking-[0.25em] text-white/60">
              <Play size={16} />
              Play Store
            </span>
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-brand-gold/60">
              Coming soon
            </span>
          </div>
        </div>

        <div ref={trackRef} className="max-w-4xl mx-auto relative">
          {/* Track + the fill that follows your scroll down it. */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-white/5 hidden md:block" />
          <motion.div
            style={{ scaleY: reduceMotion ? 1 : fill }}
            className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px origin-top bg-gradient-to-b from-brand-gold via-brand-gold/60 to-brand-purple hidden md:block"
          />

          <div className="space-y-24">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className={`flex flex-col md:flex-row items-center gap-8 ${
                  index % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
              >
                <div
                  className={`flex-1 w-full ${
                    index % 2 === 0 ? 'md:text-right md:pr-20' : 'md:text-left md:pl-20'
                  }`}
                >
                  <h3 className="text-2xl font-black uppercase tracking-tighter text-white mb-4 italic">
                    {step.title}
                  </h3>
                  <p className="text-white/45 text-sm font-bold uppercase tracking-tight leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <motion.div
                  initial={{ scale: 0.4, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.15 }}
                  className="relative z-10"
                >
                  <div className="w-16 h-16 rounded-full bg-brand-gold shadow-[0_0_40px_rgba(212,175,55,0.3)] flex items-center justify-center border-4 border-[#050810]">
                    <step.icon className="w-8 h-8 text-black" />
                  </div>
                </motion.div>

                <div className="flex-1 w-full hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
