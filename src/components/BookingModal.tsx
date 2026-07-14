'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { BookingForm } from './BookingForm';

export const BookingModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const handleClose = () => {
    onClose();
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
            className="absolute inset-0 bg-[#050810]/98 backdrop-blur-3xl"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            className="relative w-full max-w-4xl max-h-[95vh] overflow-y-auto bg-[#0E0E0E] rounded-[2rem] shadow-[0_0_120px_rgba(124,58,237,0.15)] border border-white/5"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              aria-label="Close booking form"
              className="absolute top-8 right-8 p-4 text-white/30 hover:text-brand-gold transition-all z-50 bg-white/5 rounded-full hover:bg-brand-gold/10 group"
            >
              <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
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
