'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { BookingForm } from './BookingForm';

export const BookingModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show after the logo loader finishes (~3.5-4s delay)
    // Also skip if already seen in this session
    const hasSeenBooking = sessionStorage.getItem('ocassionorbit_booking_seen');
    
    if (!hasSeenBooking) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 4500); // Increased delay for smoother post-preloader transition
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('ocassionorbit_booking_seen', 'true');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-[#050810]/95 backdrop-blur-2xl"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-card border-brand-gold/20 shadow-[0_0_80px_rgba(212,175,55,0.2)]"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 p-3 text-white/30 hover:text-white transition-colors z-50 bg-white/5 rounded-full"
            >
              <X size={24} />
            </button>

            <div className="p-4 md:p-8">
              <BookingForm />
            </div>
            
            {/* Optional interaction hint */}
            <p className="text-center pb-8 text-[9px] text-white/20 uppercase tracking-[0.3em] font-black">
              Click background or button to exit terminal
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
