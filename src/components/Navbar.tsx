'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { Logo } from './Logo';
import { Button } from './Button';
import { Menu, Phone, X } from 'lucide-react';
import Link from 'next/link';
import { DiscordIcon } from './SocialIcons';
import { PHONE_DISPLAY, PHONE_TEL } from '@/lib/contact';
import { useScrollSelector } from '@/lib/useScrollProgress';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Discover', href: '/events' },
  { name: 'Book a Stage', href: '/booking' },
];

export const Navbar = ({ onBookingClick }: { onBookingClick?: () => void }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Selector, not the raw value — this only re-renders when the boolean flips,
  // instead of on every scroll tick.
  const isScrolled = useScrollSelector((s) => s.scrollY > 20);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'py-4' : 'py-8'
      }`}
    >
      {/* Fades in as you leave the hero, so the nav stays legible once the mesh
          is bright behind it. */}
      <div
        className={`absolute inset-0 -z-10 border-b transition-all duration-500 ${
          isScrolled
            ? 'bg-[#050810]/70 backdrop-blur-xl border-white/5'
            : 'bg-transparent border-transparent'
        }`}
      />

      <div className="container mx-auto px-6 relative flex items-center justify-between">
        <Link href="/" className="relative z-10 rounded-xl">
          <Logo size="md" />
        </Link>

        {/* Centered pill menu */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block">
          <div className="glass px-1.5 py-1.5 rounded-full flex items-center gap-1 shadow-[0_0_20px_rgba(0,0,0,0.3)]">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.25em] transition-colors duration-300 ${
                    isActive ? 'text-black' : 'text-white/50 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-brand-gold shadow-[0_0_15px_rgba(212,175,55,0.35)]"
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6 relative z-10">
          <Link
            href="#"
            aria-label="Discord"
            className="text-white/40 hover:text-brand-gold transition-colors"
          >
            <DiscordIcon className="w-5 h-5" />
          </Link>
          <a
            href={PHONE_TEL}
            className="inline-flex items-center gap-2.5 rounded-full px-8 py-5 text-[10px] uppercase font-black tracking-widest bg-brand-gold text-black hover:bg-white transition-colors"
          >
            <Phone size={14} strokeWidth={3} />
            {PHONE_DISPLAY}
          </a>
        </div>

        <button
          className="md:hidden text-white p-2 relative z-10"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="md:hidden absolute top-full left-0 right-0 glass-solid border-b border-white/10 p-6 flex flex-col gap-4"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                aria-current={pathname === link.href ? 'page' : undefined}
                className={`text-lg font-medium transition-colors ${
                  pathname === link.href
                    ? 'text-brand-gold'
                    : 'text-white/70 hover:text-white'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <a
              href={PHONE_TEL}
              className="w-full inline-flex items-center justify-center gap-2.5 rounded-xl px-6 py-3 text-sm uppercase font-black tracking-widest bg-brand-gold text-black"
            >
              <Phone size={16} strokeWidth={3} />
              {PHONE_DISPLAY}
            </a>
            <Button onClick={onBookingClick} variant="secondary" className="w-full">
              Perform &amp; Earn
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
