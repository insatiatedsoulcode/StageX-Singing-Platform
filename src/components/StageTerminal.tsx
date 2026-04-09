'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Activity, BarChart3, Layers, Zap } from 'lucide-react';

const Waveform = () => {
  const heights = [
    ['20%', '45%', '30%', '20%'],
    ['20%', '70%', '40%', '20%'],
    ['20%', '55%', '80%', '20%'],
    ['20%', '90%', '50%', '20%'],
  ];

  return (
    <div className="flex items-end gap-[2px] h-full w-full">
      {[...Array(24)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ 
            height: heights[i % heights.length]
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity, 
            delay: i * 0.05,
            ease: "easeInOut"
          }}
          className="flex-1 bg-brand-cyan/40 rounded-full min-w-[2px]"
        />
      ))}
    </div>
  );
};

interface StageTerminalProps {
  className?: string;
}

export const StageTerminal: React.FC<StageTerminalProps> = ({ className }) => {
  return (
    <div className={`relative glass p-4 md:p-6 rounded-3xl border border-white/20 shadow-2xl overflow-hidden group ${className}`}>
      {/* Browser Top Bar */}
      <div className="absolute top-0 left-0 right-0 h-10 bg-white/5 border-b border-white/10 flex items-center px-4 justify-between z-10 backdrop-blur-md">
        <div className="flex gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
        </div>
        <div className="bg-white/5 px-3 py-1 rounded-md border border-white/5">
          <div className="text-[10px] text-white/30 font-mono tracking-widest uppercase">STAGE_X_TERMINAL_V2.1</div>
        </div>
      </div>

      <div className="pt-14 space-y-4">
        {/* Top Row: Waveform and Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="glass-card p-4 border-white/5 min-h-[160px] flex flex-col justify-between">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-brand-cyan flex items-center gap-2">
                <Activity className="w-3 h-3" /> Live Monitor
              </span>
              <span className="text-[10px] font-mono text-white/30">L/R STEREO</span>
            </div>
            <div className="flex-1">
              <Waveform />
            </div>
          </div>

          <div className="glass-card p-4 border-white/5 min-h-[160px] flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-widest text-brand-violet mb-4 flex items-center gap-2">
              <BarChart3 className="w-3 h-3" /> Pitch Analysis
            </span>
            <div className="flex-1 flex flex-col justify-center space-y-4">
              <div className="flex justify-between items-end">
                <span className="text-3xl font-black text-white italic">C#<span className="text-brand-violet">m</span></span>
                <span className="text-[10px] font-mono text-white/40">KEY_DETECTED</span>
              </div>
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  animate={{ width: ['40%', '95%', '70%', '85%'] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="h-full bg-brand-violet shadow-[0_0_10px_#DCB8FF]" 
                />
              </div>
              <div className="flex justify-between text-[8px] font-mono text-white/20 uppercase tracking-widest">
                <span>Flat</span>
                <span>Stable</span>
                <span>Sharp</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row: FX Stack and Full Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="glass-card p-4 border-white/5 col-span-1 md:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-white/50 flex items-center gap-2">
                <Layers className="w-3 h-3" /> Vocal FX Stack
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Auto-Tune', val: 'Strong', active: true },
                { label: 'Space Verb', val: 'Studio', active: true },
                { label: 'Saturation', val: 'Warmth', active: false },
                { label: 'Delay Tap', val: '1/4', active: true },
              ].map((fx, i) => (
                <div key={i} className={`p-2 rounded-lg border flex flex-col ${fx.active ? 'bg-brand-violet/5 border-brand-violet/20' : 'bg-white/[0.02] border-white/5 opacity-40'}`}>
                  <span className="text-[8px] font-black uppercase text-white/40">{fx.label}</span>
                  <span className="text-[10px] font-black text-white uppercase tracking-tighter">{fx.val}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-4 border-white/5 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-brand-cyan mb-4 block">System Status</span>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-white/30 uppercase">Latency</span>
                  <span className="text-[10px] font-mono text-brand-cyan">4.2ms</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-white/30 uppercase">Gain</span>
                  <span className="text-[10px] font-mono text-green-400">-3.1db</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-white/30 uppercase">Buffer</span>
                  <span className="text-[10px] font-mono text-white/60">64 smp</span>
                </div>
              </div>
            </div>
            <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse shadow-[0_0_5px_#00D1FF]" />
                <span className="text-[8px] font-black uppercase text-brand-cyan">Sync Active</span>
              </div>
              <Zap className="w-3 h-3 text-brand-cyan fill-brand-cyan" />
            </div>
          </div>
        </div>
      </div>

      {/* Interior Scanning Light Effect */}
      <motion.div
        initial={{ left: '-50%' }}
        animate={{ left: '150%' }}
        transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
        className="absolute top-0 bottom-0 w-32 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 pointer-events-none"
      />
    </div>
  );
};
