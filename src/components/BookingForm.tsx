'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mic2, Calendar, CheckCircle2, ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from './Button';

const steps = [
  { id: 1, title: 'Artist Info', icon: User },
  { id: 2, title: 'Stage Setup', icon: Mic2 },
  { id: 3, title: 'Session Slot', icon: Calendar },
];

export const BookingForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  return (
    <div className="w-full">
      {!isSubmitted ? (
        <>
          <header className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic mb-4"
            >
              Book Your <span className="text-brand-violet not-italic">Stage</span>
            </motion.h2>
            <p className="text-white/40 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] max-w-lg mx-auto leading-relaxed">
              Secure your slot in the metaverse performance terminal. Professional gear, global reach.
            </p>
          </header>

          {/* Steps Progress */}
          <div className="flex items-center justify-between mb-16 relative max-w-2xl mx-auto">
            <div className="absolute top-6 left-0 w-full h-px bg-white/5 -translate-y-1/2" />
            {steps.map((step) => {
              const Icon = step.icon;
              const isActive = currentStep >= step.id;
              const isCurrent = currentStep === step.id;
              return (
                <div key={step.id} className="relative z-10 flex flex-col items-center gap-4">
                  <div className={`w-12 h-12 rounded-full glass border ${isActive ? 'border-brand-violet text-brand-violet shadow-[0_0_20px_rgba(220,184,255,0.3)]' : 'border-white/10 text-white/30'} flex items-center justify-center transition-all duration-500 bg-brand-bg/80 backdrop-blur-xl`}>
                    <Icon size={20} className={isCurrent ? 'animate-pulse' : ''} />
                  </div>
                  <span className={`text-[9px] font-black uppercase tracking-widest ${isActive ? 'text-white' : 'text-white/20'}`}>
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Form Content */}
          <div className="glass-card p-6 md:p-10 min-h-[400px] flex flex-col justify-between border-white/5 max-w-3xl mx-auto shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-violet/5 via-transparent to-brand-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/40 block ml-1">Stage Name</label>
                      <input type="text" placeholder="e.g. Neon Ghost" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 outline-none focus:border-brand-violet/50 transition-colors text-sm" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/40 block ml-1">Genre Interface</label>
                      <select className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 outline-none focus:border-brand-violet/50 transition-colors text-sm appearance-none cursor-pointer">
                        <option>Cyber Pop</option>
                        <option>Hyper Soul</option>
                        <option>Deep Bass</option>
                        <option>Crystal Acoustic</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 block ml-1">Bio Signature</label>
                    <textarea placeholder="Describe your performance energy..." rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 outline-none focus:border-brand-violet/50 transition-colors text-sm resize-none" />
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {['Virtual VR', 'IRL Studio', 'Hologram', 'Live Broadcast'].map((option) => (
                      <div key={option} className="p-6 glass border border-white/5 rounded-2xl cursor-pointer hover:border-brand-cyan/50 hover:bg-white/5 transition-all group overflow-hidden relative">
                        <div className="absolute -right-4 -bottom-4 w-12 h-12 bg-brand-cyan/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
                        <h3 className="text-sm font-bold uppercase tracking-widest mb-2 relative z-10">{option}</h3>
                        <p className="text-[10px] text-white/30 font-medium relative z-10">Full immersion enabled</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-6 rounded-2xl bg-brand-violet/5 border border-brand-violet/20 flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-brand-violet/20">
                      <Mic2 className="text-brand-violet" size={24} />
                    </div>
                    <div>
                      <h3 className="text-white font-black uppercase tracking-tighter text-sm">Pro Gear Included</h3>
                      <p className="text-white/40 text-[10px] font-bold uppercase tracking-wider">Access to Studio-Z equipment</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="text-center py-6">
                    <p className="text-brand-cyan text-[10px] font-black uppercase tracking-[0.3em] mb-6">Availability Check</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {['10:00 AM', '02:00 PM', '06:00 PM', '09:00 PM', '11:00 PM', '01:00 AM'].map(time => (
                        <button key={time} className="py-4 glass border border-white/5 rounded-xl text-[10px] font-black hover:border-brand-violet/50 hover:text-brand-violet transition-all uppercase tracking-widest">
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-center justify-between pt-10 border-t border-white/5 mt-8">
              <Button
                variant="ghost"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`text-[10px] font-black uppercase tracking-widest ${currentStep === 1 ? 'opacity-0 pointer-events-none' : ''}`}
              >
                <ChevronLeft size={16} />
                Back
              </Button>
              
              {currentStep < 3 ? (
                <Button onClick={nextStep} className="text-[10px] font-black uppercase tracking-widest">
                  Next Step
                  <ChevronRight size={16} />
                </Button>
              ) : (
                <Button onClick={handleSubmit} className="px-12 bg-white text-black hover:bg-brand-cyan transition-colors shadow-[0_0_30px_rgba(255,255,255,0.2)] text-[10px] font-black uppercase tracking-widest">
                  Finalize Booking
                </Button>
              )}
            </div>
          </div>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-20 bg-brand-bg relative z-10"
        >
          <div className="w-24 h-24 rounded-full bg-brand-violet/20 border border-brand-violet/30 flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(220,184,255,0.4)]">
            <CheckCircle2 size={48} className="text-brand-violet" />
          </div>
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic mb-4">You&apos;re <span className="text-brand-cyan not-italic">Armed.</span></h2>
          <p className="text-white/40 text-xs font-bold uppercase tracking-[0.2em] mb-12">Registration received. Redirecting to Terminal...</p>
          <Button onClick={() => window.location.href = '/'} variant="secondary" className="text-[10px] font-black uppercase tracking-[0.2em]">
            Return to Command Center
          </Button>
        </motion.div>
      )}
    </div>
  );
};
