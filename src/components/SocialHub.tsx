'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { InstagramIcon, XIcon, DiscordIcon, YoutubeIcon } from './SocialIcons';

const socialCards = [
  {
    name: 'Instagram',
    handle: '@OcassionOrbit',
    icon: InstagramIcon,
    color: 'group-hover:text-brand-purple-light',
    glow: 'group-hover:bg-brand-purple/25',
    description: 'Cinematic highlights of global event connectivity.',
  },
  {
    name: 'Discord',
    handle: 'Join Orbit HQ',
    icon: DiscordIcon,
    color: 'group-hover:text-brand-gold',
    glow: 'group-hover:bg-brand-gold/25',
    description: 'The greenroom for the global event community.',
  },
  {
    name: 'YouTube',
    handle: 'Orbit Originals',
    icon: YoutubeIcon,
    color: 'group-hover:text-red-500',
    glow: 'group-hover:bg-red-500/25',
    description: '4K live captures and orchestration masterclasses.',
  },
  {
    name: 'X (Twitter)',
    handle: '@Ocassion_Orbit',
    icon: XIcon,
    color: 'group-hover:text-white',
    glow: 'group-hover:bg-white/20',
    description: 'Real-time updates and orbital optimizations.',
  },
];

export const SocialHub = () => {
  return (
    <section className="section-shell relative overflow-hidden">
      {/* Ambient bloom — sits over the mesh, not instead of it. */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-purple/10 rounded-full blur-[120px] -mr-64 -mt-64 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
          <div className="max-w-xl">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="section-label text-brand-gold mb-4"
            >
              Connected Circuit
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter"
            >
              The Orbit <span className="text-white/25">Never Sleeps.</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-white/45 max-w-sm text-sm font-medium leading-relaxed"
          >
            Connect with thousands of artists and orchestration engineers. Real-time collaboration
            across the global signal.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {socialCards.map((card, index) => (
            <motion.a
              key={card.name}
              href="#"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: index * 0.08, duration: 0.55, ease: 'easeOut' }}
              whileHover={{ y: -6 }}
              className="group relative block rounded-2xl"
            >
              <div className="relative glass-solid rounded-2xl p-8 h-full flex flex-col justify-between overflow-hidden transition-colors group-hover:border-white/20">
                <div
                  className={`absolute top-0 right-0 w-32 h-32 blur-3xl rounded-full transition-all duration-500 ${card.glow} opacity-0 group-hover:opacity-100 -mr-16 -mt-16`}
                />

                <div className="relative">
                  <div
                    className={`w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-white/70 transition-colors ${card.color}`}
                  >
                    <card.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-black tracking-tight mb-2 uppercase">{card.name}</h3>
                  <p className="text-white/45 text-[11px] font-bold tracking-widest uppercase mb-4">
                    {card.handle}
                  </p>
                  <p className="text-white/35 text-xs leading-relaxed">{card.description}</p>
                </div>

                <div className="relative mt-8 flex items-center justify-between">
                  <span className="text-[10px] font-black tracking-[0.2em] text-white/30 uppercase">
                    Connect Signal
                  </span>
                  <ExternalLink className="w-4 h-4 text-white/30 group-hover:text-white transition-colors" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};
