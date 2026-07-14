'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Upload, 
  CheckCircle2,
  ChevronRight, 
  ChevronLeft, 
  Music,
  Video,
  Terminal,
  ShieldCheck,
  CircleDollarSign,
  Phone
} from 'lucide-react';
import { Button } from './Button';
import { WhatsAppIcon } from './SocialIcons';
import { performerInquiryLink } from '@/lib/contact';

const steps = [
  { id: 1, title: 'Identity' },
  { id: 2, title: 'Portfolio' },
  { id: 3, title: 'Verification' },
  { id: 4, title: 'Potential' },
];

const categories = [
  'Vocalist (Live)',
  'Instrumentalist',
  'Standup Comedian',
  'Dance Crew',
  'Event Anchor / MC',
  'DJ / Electronic'
];

export const BookingForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    contactNumber: '',
    category: 'Vocalist (Live)',
    stageName: '',
    portfolioLink: '',
    hasShots: false,
    hasVideo: false
  });

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  // Opening inside the click handler keeps this a user-initiated navigation, so
  // popup blockers leave it alone. The visitor still presses send in WhatsApp.
  const handleSubmit = () => {
    window.open(performerInquiryLink(formData), '_blank', 'noopener,noreferrer');
    setIsSubmitted(true);
  };

  const stepVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8 md:py-12">
      {!isSubmitted ? (
        <>
          {/* Linear Kinetic Bar (Progress) */}
          <div className="flex gap-2 mb-16 h-1 w-full bg-[#262626] rounded-full overflow-hidden">
            {steps.map((step) => (
              <motion.div
                key={step.id}
                initial={false}
                animate={{ 
                  backgroundColor: currentStep >= step.id ? '#D4AF37' : '#262626',
                  flex: 1
                }}
                className="h-full transition-colors duration-500"
              />
            ))}
          </div>

          <header className="mb-12">
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.4em] mb-4 block"
            >
              Step 0{currentStep} / 04
            </motion.span>
            <motion.h2
              key={`title-${currentStep}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic"
            >
              {currentStep === 1 && <>Tell us about <span className="text-[#D4AF37] not-italic">yourself</span></>}
              {currentStep === 2 && <>Make yourself <span className="text-[#D4AF37] not-italic">stand out</span></>}
              {currentStep === 3 && <>Get verified <span className="text-[#D4AF37] not-italic">& listed</span></>}
              {currentStep === 4 && <>Perform <span className="text-[#D4AF37] not-italic">& Earn</span></>}
            </motion.h2>
            <motion.p className="text-white/30 text-xs mt-4 font-bold uppercase tracking-wider max-w-md">
              {currentStep === 1 && "Setup your profile by providing basic information about you and your performance areas."}
              {currentStep === 2 && "Upload your shots to get verified from the panel & get proper traction from users."}
              {currentStep === 3 && "Panel will review your video, assign you level tags & now you are ready to get discovered."}
              {currentStep === 4 && "Accept bookings. Perform at the event and earn out of your potential!"}
            </motion.p>
          </header>

          <div className="min-h-[420px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  variants={stepVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="space-y-8"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Full Name</label>
                      <div className="bg-[#131313] rounded-2xl p-1 focus-within:ring-1 ring-[#D4AF37]/50 transition-all">
                        <input 
                          type="text" 
                          placeholder="Your Legal Name" 
                          className="w-full bg-transparent px-6 py-4 outline-none text-sm placeholder:text-white/10" 
                          value={formData.fullName}
                          onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Contact Number</label>
                      <div className="bg-[#131313] rounded-2xl p-1 flex items-center pr-6">
                        <input 
                          type="tel" 
                          placeholder="+91 XXXXX XXXXX" 
                          className="w-full bg-transparent px-6 py-4 outline-none text-sm placeholder:text-white/10" 
                          value={formData.contactNumber}
                          onChange={(e) => setFormData({...formData, contactNumber: e.target.value})}
                        />
                        <Phone size={16} className="text-white/10" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Primary Performance Area</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setFormData({...formData, category: cat})}
                          className={`py-4 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border ${formData.category === cat ? 'bg-[#D4AF37]/10 border-[#D4AF37] text-white shadow-[0_0_20px_rgba(212,175,55,0.1)]' : 'bg-[#131313] border-white/5 text-white/20 hover:bg-white/5'}`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-[#20201F]/30 p-8 rounded-[2rem] border border-white/5 space-y-4 flex items-center gap-6">
                    <div className="p-4 rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37]">
                      <Sparkles size={24} />
                    </div>
                    <div>
                      <h3 className="text-[10px] font-black uppercase tracking-widest mb-1">OK Signal Captured</h3>
                      <p className="text-white/20 text-[10px] leading-relaxed font-bold uppercase tracking-wider">Your basic profile is ready for orbital calibration.</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  variants={stepVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="space-y-8"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <button 
                      onClick={() => setFormData({...formData, hasShots: true})}
                      className={`p-10 rounded-[2.5rem] border flex flex-col items-center gap-6 text-center transition-all group ${formData.hasShots ? 'bg-[#D4AF37]/10 border-[#D4AF37]' : 'bg-[#131313] border-white/5 hover:bg-white/5'}`}
                    >
                      <div className={`p-5 rounded-2xl transition-all ${formData.hasShots ? 'bg-[#D4AF37] text-black shadow-[0_0_30px_rgba(212,175,55,0.4)]' : 'bg-white/5 text-white/20'}`}>
                        <Upload size={24} className="group-hover:translate-y-[-2px] transition-transform" />
                      </div>
                      <div>
                        <h4 className="text-[10px] font-black uppercase tracking-widest mb-2">Upload Shots</h4>
                        <p className="text-[9px] text-white/20 font-bold uppercase">High fidelity photographs</p>
                      </div>
                    </button>

                    <button 
                      onClick={() => setFormData({...formData, hasVideo: true})}
                      className={`p-10 rounded-[2.5rem] border flex flex-col items-center gap-6 text-center transition-all group ${formData.hasVideo ? 'bg-[#D4AF37]/10 border-[#D4AF37]' : 'bg-[#131313] border-white/5 hover:bg-white/5'}`}
                    >
                      <div className={`p-5 rounded-2xl transition-all ${formData.hasVideo ? 'bg-[#D4AF37] text-black shadow-[0_0_30px_rgba(212,175,55,0.4)]' : 'bg-white/5 text-white/20'}`}>
                        <Video size={24} className="group-hover:translate-y-[-2px] transition-transform" />
                      </div>
                      <div>
                        <h4 className="text-[10px] font-black uppercase tracking-widest mb-2">Upload Video</h4>
                        <p className="text-[9px] text-white/20 font-bold uppercase">Live performance reel</p>
                      </div>
                    </button>
                  </div>

                  <div className="bg-[#131313] rounded-[2rem] p-8 flex items-center gap-6 group hover:bg-[#20201F] transition-colors cursor-pointer border border-white/5">
                    <div className="p-4 rounded-2xl bg-white/5 text-white/20 group-hover:text-[#D4AF37] transition-all">
                      <Music size={24} />
                    </div>
                    <div>
                      <h4 className="text-sm font-black uppercase tracking-widest mb-1">Audio Terminal</h4>
                      <p className="text-[10px] text-white/30 font-bold uppercase tracking-wider">Connect Soundcloud or Spotify links</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  variants={stepVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="space-y-8"
                >
                  <div className="bg-[#131313] rounded-[3rem] p-12 border border-white/5 text-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="relative z-10">
                      <div className="w-20 h-20 bg-[#D4AF37]/10 text-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(124,58,237,0.1)]">
                        <ShieldCheck size={40} className="animate-pulse" />
                      </div>
                      <h4 className="text-xl font-black uppercase tracking-tighter italic mb-4">Pending Panel Evaluation</h4>
                      <p className="text-white/30 text-[10px] uppercase tracking-widest leading-relaxed max-w-sm mx-auto font-bold">
                        Our specialized panel members will analyze your registration sequence. 
                        Verified nodes receive priority indexing in the global discovery terminal.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-6 rounded-3xl bg-[#131313] border border-white/5 space-y-2">
                      <CheckCircle2 size={16} className="text-[#D4AF37]" />
                      <h5 className="text-[10px] font-black uppercase tracking-widest">Level Tags</h5>
                      <p className="text-[9px] text-white/20 uppercase font-bold">Assigned post-review</p>
                    </div>
                    <div className="p-6 rounded-3xl bg-[#131313] border border-white/5 space-y-2">
                      <Terminal size={16} className="text-[#D4AF37]" />
                      <h5 className="text-[10px] font-black uppercase tracking-widest">Listing Info</h5>
                      <p className="text-[9px] text-white/20 uppercase font-bold">Real-time DB sync</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  variants={stepVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="space-y-8"
                >
                  <div className="bg-gradient-to-br from-[#131313] to-[#0E0E0E] rounded-[2.5rem] p-10 space-y-8 border border-white/5">
                    <div className="flex items-center gap-6">
                      <div className="p-4 rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37]">
                        <CircleDollarSign size={32} />
                      </div>
                      <div>
                        <h4 className="text-2xl font-black uppercase tracking-tight italic">Earning Potential</h4>
                        <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Unlocking Global Bookings</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4 pt-4">
                      {[
                        "Accept bookings directly through the terminal",
                        "Perform at premium orbital events",
                        "Scale your revenue with verified tags",
                        "Secure automated payment settlements"
                      ].map((perk, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <CheckCircle2 size={14} className="text-[#D4AF37]" />
                          <span className="text-[10px] text-white/60 font-medium tracking-tight">{perk}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-8 rounded-[2rem] border border-[#D4AF37]/20 bg-[#D4AF37]/5">
                    <h4 className="text-[10px] font-black uppercase tracking-widest mb-3 flex items-center gap-2">
                       <ShieldCheck size={14} className="text-[#D4AF37]" /> 
                       Registration Confirmation
                    </h4>
                    <p className="text-[10px] text-white/40 leading-relaxed font-bold uppercase tracking-wider">
                      By completing this sequence, you agree to the orbital guidelines. 
                      Your data will be encrypted and indexed within 24 cycles.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-center justify-between pt-12 mt-12 border-t border-white/5">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all ${currentStep === 1 ? 'opacity-0 pointer-events-none' : 'text-white/40 hover:text-white'}`}
              >
                <ChevronLeft size={16} />
                Back
              </button>
              
              {currentStep < 4 ? (
                <Button 
                  onClick={nextStep} 
                  className="bg-white text-black hover:bg-[#D4AF37] hover:text-black transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)] text-[10px] font-black uppercase tracking-[0.2em] px-10 py-6 rounded-full border-none"
                >
                  Continue
                  <ChevronRight size={16} />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  className="bg-[#25D366] text-black hover:brightness-110 transition-all shadow-[0_0_50px_rgba(37,211,102,0.25)] text-[10px] font-black uppercase tracking-[0.2em] px-14 py-6 rounded-full border-none flex items-center gap-3"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  Send on WhatsApp
                </Button>
              )}
            </div>
          </div>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-20 relative px-4"
        >
          <div className="relative w-32 h-32 mx-auto mb-12">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 10, stiffness: 100 }}
              className="absolute inset-0 bg-gradient-to-br from-[#D4AF37] to-[#7C3AED] rounded-full shadow-[0_0_60px_rgba(124,58,237,0.4)]"
            />
            <div className="absolute inset-0 flex items-center justify-center text-black">
              <CheckCircle2 size={56} />
            </div>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic mb-6">Profile <span className="text-[#D4AF37] not-italic">Indexed.</span></h2>
          <p className="text-white/30 text-[10px] font-black uppercase tracking-[0.4em] mb-12 max-w-sm mx-auto leading-loose">
            WhatsApp is open with your details — hit send there and our panel picks it up. Welcome to OcassionOrbit.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Fallback path: if the popup was blocked, this link still gets them there. */}
            <a
              href={performerInquiryLink(formData)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-full px-12 py-7 bg-[#25D366] text-black text-[10px] font-black uppercase tracking-widest hover:brightness-110 transition-all shadow-[0_0_40px_rgba(37,211,102,0.25)]"
            >
              <WhatsAppIcon className="w-4 h-4" />
              Reopen WhatsApp
            </a>

            <Button
              onClick={() => window.location.reload()}
              className="rounded-full px-12 py-7 bg-white/5 border border-white/10 hover:bg-white/10 text-[10px] font-black uppercase tracking-widest text-white transition-all shadow-none"
            >
              Enter The Terminal
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
};
