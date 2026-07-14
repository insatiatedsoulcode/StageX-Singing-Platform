'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { WhatsAppIcon } from './SocialIcons';
import { GENERAL_INQUIRY, whatsappLink } from '@/lib/contact';

/**
 * Always-on WhatsApp entry point. Mounted once in the root layout so it rides
 * above every route without each page having to opt in.
 */
export const WhatsAppFloat = () => (
  <motion.a
    href={whatsappLink(GENERAL_INQUIRY)}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat with us on WhatsApp"
    initial={{ opacity: 0, scale: 0.6, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ delay: 1.2, type: 'spring', stiffness: 240, damping: 18 }}
    whileHover={{ scale: 1.06 }}
    whileTap={{ scale: 0.94 }}
    className="group fixed bottom-6 right-6 z-[90] flex items-center gap-3 rounded-full bg-[#25D366] px-5 py-4 text-black shadow-[0_8px_40px_rgba(37,211,102,0.35)] hover:shadow-[0_8px_50px_rgba(37,211,102,0.55)] transition-shadow"
  >
    {/* Pulsing halo — draws the eye without adding another element to the tab order. */}
    <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-60 animate-ping-slow -z-10" aria-hidden="true" />

    <WhatsAppIcon className="w-6 h-6 shrink-0" />

    {/* Label expands on hover at desktop widths; on mobile the icon stands alone. */}
    <span className="hidden md:block max-w-0 overflow-hidden whitespace-nowrap text-[10px] font-black uppercase tracking-[0.2em] opacity-0 transition-all duration-300 group-hover:max-w-[10rem] group-hover:opacity-100">
      Chat with us
    </span>
  </motion.a>
);
