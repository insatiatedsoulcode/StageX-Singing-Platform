'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from './Logo';

export const Preloader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial asset loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2800); // Cinematic timing

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.8, ease: "easeInOut" } 
          }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-brand-bg overflow-hidden"
        >
          {/* Background Ambient Glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: [0, 0.4, 0.2],
              scale: [0.8, 1.2, 1],
            }}
            transition={{ duration: 2.5, ease: "easeOut" }}
            className="absolute w-[500px] h-[500px] bg-brand-purple/10 rounded-full blur-[120px]"
          />

          <div className="relative flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ 
                opacity: 1, 
                y: 0, 
                scale: 1,
              }}
              transition={{ 
                duration: 1.2, 
                ease: "circOut",
              }}
            >
              <Logo size="lg" />
            </motion.div>

            {/* Scanning Line Effect */}
            <motion.div
              initial={{ top: "-100%" }}
              animate={{ top: "200%" }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent z-20"
            />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="mt-20 flex flex-col items-center gap-4"
            >
              <div className="flex gap-1.5">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      scaleY: [1, 2, 1],
                      opacity: [0.3, 1, 0.3]
                    }}
                    transition={{ 
                      duration: 0.6, 
                      repeat: Infinity, 
                      delay: i * 0.15 
                    }}
                    className="w-1 h-6 bg-brand-purple rounded-full"
                  />
                ))}
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 animate-pulse">
                Calibrating Orbital Terminal
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
