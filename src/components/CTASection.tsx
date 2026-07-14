'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './Button';
import { Phone, Sparkles } from 'lucide-react';
import { WhatsAppIcon } from './SocialIcons';
import { BOOKING_INQUIRY, PHONE_DISPLAY, PHONE_TEL, whatsappLink } from '@/lib/contact';

export const CTASection = ({ onBookingClick }: { onBookingClick?: () => void }) => {
  return (
    <section className="section-shell">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative overflow-hidden glass-solid rounded-[3rem] p-12 md:p-24 text-center"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/12 via-brand-purple/5 to-transparent pointer-events-none" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-purple/15 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-brand-gold/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="max-w-3xl mx-auto space-y-8 relative z-10">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-brand-gold text-sm font-bold"
            >
              <Sparkles className="w-4 h-4" />
              Ready to ignite your presence?
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.18, duration: 0.6 }}
              className="text-4xl md:text-7xl font-black text-white leading-[0.85] uppercase italic"
            >
              Experience the<br />
              <span className="text-glow-gold text-brand-gold not-italic tracking-tighter">
                Energy.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.26 }}
              className="text-white/45 text-xs font-bold uppercase tracking-[0.2em] max-w-xl mx-auto leading-loose"
            >
              Book an event straight from the website &mdash; call or message us on our registered
              company number and we&apos;ll take it from there.
            </motion.p>

            <motion.a
              href={PHONE_TEL}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.34, type: 'spring', stiffness: 220, damping: 20 }}
              className="inline-flex items-center justify-center gap-4 text-3xl md:text-5xl font-black tracking-tighter text-brand-gold hover:text-white transition-colors"
            >
              <Phone className="w-8 h-8 md:w-10 md:h-10" strokeWidth={3} />
              {PHONE_DISPLAY}
            </motion.a>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.42 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8"
            >
              <a
                href={whatsappLink(BOOKING_INQUIRY)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-xl text-xl px-12 py-6 font-bold bg-[#25D366] text-black hover:brightness-110 transition-all shadow-[0_0_30px_rgba(37,211,102,0.25)]"
              >
                <WhatsAppIcon className="w-5 h-5" />
                Message on WhatsApp
              </a>
              <Button onClick={onBookingClick} variant="secondary" size="lg" className="w-full sm:w-auto">
                Perform &amp; Earn
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
