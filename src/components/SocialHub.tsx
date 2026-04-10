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
    color: 'hover:text-brand-purple',
    glow: 'group-hover:bg-brand-purple/20',
    description: 'Cinematic highlights of global event connectivity.',
  },
  {
    name: 'Discord',
    handle: 'Join Orbit HQ',
    icon: DiscordIcon,
    color: 'hover:text-brand-gold',
    glow: 'group-hover:bg-brand-gold/20',
    description: 'The greenroom for the global event community.',
  },
  {
    name: 'YouTube',
    handle: 'Orbit Originals',
    icon: YoutubeIcon,
    color: 'hover:text-red-500',
    glow: 'group-hover:bg-red-500/20',
    description: '4K live captures and orchestration masterclasses.',
  },
  {
    name: 'X (Twitter)',
    handle: '@Ocassion_Orbit',
    icon: XIcon,
    color: 'hover:text-brand-gold',
    glow: 'group-hover:bg-brand-gold/20',
    description: 'Real-time updates and orbital optimizations.',
  }
];

export const SocialHub = () => {
  return (
    <section className="py-24 bg-[#050810] relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-purple/5 rounded-full blur-[120px] -mr-64 -mt-64" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 mb-4"
            >
              <div className="w-8 h-[1px] bg-brand-gold" />
              <span className="text-brand-gold font-black uppercase tracking-[0.3em] text-[10px]">Connected Circuit</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter"
            >
              The Orbit <span className="text-white/20">Never Sleeps.</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-white/40 max-w-sm text-sm font-medium leading-relaxed"
          >
            Connect with thousands of artists and orchestration engineers. 
            Real-time collaboration across the global signal.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {socialCards.map((card, index) => (
            <motion.div
              key={card.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <div className="absolute -inset-[1px] bg-white/5 rounded-2xl transition-colors group-hover:bg-white/10" />
              <div className="relative glass rounded-2xl p-8 h-full flex flex-col justify-between overflow-hidden">
                {/* Glow Effect */}
                <div className={`absolute top-0 right-0 w-32 h-32 blur-3xl rounded-full transition-colors ${card.glow} opacity-0 group-hover:opacity-100 -mr-16 -mt-16`} />
                
                <div>
                  <div className={`w-12 h-12 rounded-xl glass border border-white/5 flex items-center justify-center mb-6 transition-colors ${card.color}`}>
                    <card.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-black tracking-tight mb-2 uppercase">{card.name}</h3>
                  <p className="text-white/40 text-[11px] font-bold tracking-widest uppercase mb-4">{card.handle}</p>
                  <p className="text-white/30 text-xs leading-relaxed">{card.description}</p>
                </div>

                <div className="mt-8 flex items-center justify-between">
                  <span className="text-[10px] font-black tracking-[0.2em] text-white/20 uppercase">Connect Signal</span>
                  <ExternalLink className="w-4 h-4 text-white/20 group-hover:text-white transition-colors" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
