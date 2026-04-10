'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Sparkles, CheckCircle2 } from 'lucide-react';
import { Button } from './Button';

export const LeadCaptureModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Check if user has already seen the modal in this session
    const hasSeenModal = sessionStorage.getItem('stagex_lead_seen');
    const isHomePage = window.location.pathname === '/';
    
    // Prioritize Booking Modal on Home Page per user mandatory request
    if (!hasSeenModal && !isHomePage) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 3000); // 3-second delay for better UX
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('stagex_lead_seen', 'true');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Simulate API call
      setIsSubmitted(true);
      sessionStorage.setItem('stagex_lead_seen', 'true');
      setTimeout(() => {
        setIsOpen(false);
      }, 3000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-brand-bg/80 backdrop-blur-xl"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg glass-card border-brand-violet/20 shadow-[0_0_50px_rgba(157,78,221,0.15)] overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 text-white/40 hover:text-white transition-colors z-10"
            >
              <X size={20} />
            </button>

            <div className="p-8 md:p-12 relative">
              {/* Decorative Glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-brand-violet to-transparent opacity-50" />
              
              {!isSubmitted ? (
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-brand-violet/10 border border-brand-violet/20 flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(157,78,221,0.2)]">
                    <Sparkles className="text-brand-violet" size={32} />
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter italic mb-4 leading-none">
                    Unlock Your <span className="text-brand-violet not-italic">Stage Pass</span>
                  </h2>
                  
                  <p className="text-white/40 text-xs font-bold uppercase tracking-[0.2em] mb-8 leading-relaxed max-w-xs mx-auto">
                    Join the waitlist for exclusive access to the 0.1 StageX Beta Terminal.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-5 flex items-center text-white/20 group-focus-within:text-brand-violet transition-colors">
                        <Mail size={18} />
                      </div>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your comms frequency..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-14 pr-6 py-5 outline-none focus:border-brand-violet/50 transition-all text-sm group-hover:bg-white/[0.07]"
                      />
                    </div>
                    
                    <Button
                      type="submit"
                      className="w-full py-5 text-xs font-black uppercase tracking-[0.3em] bg-white text-black hover:bg-brand-violet hover:text-white shadow-[0_4px_20px_rgba(255,255,255,0.1)] group overflow-hidden"
                    >
                      <span className="relative z-10">Claim Access</span>
                      <div className="absolute inset-0 bg-brand-violet translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    </Button>
                  </form>

                  <p className="mt-6 text-[10px] text-white/20 font-medium tracking-tight">
                    * By joining you agree to protocol communications.
                  </p>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-6"
                >
                  <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(34,197,94,0.3)]">
                    <CheckCircle2 className="text-green-500" size={40} />
                  </div>
                  <h3 className="text-4xl font-black uppercase tracking-tighter italic mb-4">
                    Signal <span className="text-green-500 not-italic">Locked.</span>
                  </h3>
                  <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em]">
                    Welcome to the circuit. Initializing protocol...
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
