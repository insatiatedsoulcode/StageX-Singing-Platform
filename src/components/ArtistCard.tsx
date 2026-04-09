'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mic2, Activity, Play, Star } from 'lucide-react';

interface ArtistCardProps {
  name: string;
  genre: string;
  stats: string;
  isLive?: boolean;
}

export const ArtistCard = ({ name, genre, stats, isLive }: ArtistCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      className="glass-card p-6 group cursor-pointer relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-4">
        {isLive && (
          <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-red-500/20 border border-red-500/30 text-[10px] font-black uppercase text-red-500 tracking-widest animate-pulse">
            Live
          </div>
        )}
      </div>

      <div className="w-full aspect-square rounded-xl bg-gradient-to-br from-brand-violet/20 to-brand-cyan/10 mb-6 flex items-center justify-center group-hover:from-brand-violet/30 group-hover:to-brand-cyan/20 transition-all border border-white/5 relative overflow-hidden">
         <Mic2 className="w-16 h-16 text-brand-violet/40 group-hover:scale-110 transition-transform" />
         <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
            <div className="w-10 h-10 rounded-full glass flex items-center justify-center">
               <Play className="w-4 h-4 text-white fill-white" />
            </div>
         </div>
      </div>

      <div className="space-y-4">
         <div>
            <div className="text-white font-black text-2xl uppercase tracking-tighter group-hover:text-brand-violet transition-colors">{name}</div>
            <div className="text-brand-cyan text-xs font-bold uppercase tracking-widest">{genre}</div>
         </div>

         <div className="flex items-center justify-between pt-4 border-t border-white/5">
            <div className="flex items-center gap-2">
               <Activity className="w-4 h-4 text-white/30" />
               <span className="text-white/40 text-[10px] font-bold uppercase tracking-wider">{stats}</span>
            </div>
            <div className="flex items-center gap-1">
               <Star className="w-3 h-3 text-brand-gold fill-brand-gold" />
               <span className="text-white font-bold text-xs">4.9</span>
            </div>
         </div>
      </div>
    </motion.div>
  );
};
