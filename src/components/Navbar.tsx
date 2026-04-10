'use client';

import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { Button } from './Button';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { DiscordIcon } from './SocialIcons';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Discover', href: '/events' },
    { name: 'Book a Stage', href: '/booking' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'py-4' : 'py-8'
      }`}
    >
      <div className="container mx-auto px-6 relative flex items-center justify-between">
        {/* Logo - Far Left */}
        <Link href="/" className="relative z-10">
          <Logo />
        </Link>

        {/* Centered Pill Menu */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block">
          <div className="glass px-1 py-1 rounded-full border border-white/10 backdrop-blur-xl flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`px-6 py-2 rounded-full text-[11px] font-black uppercase tracking-[0.2em] transition-all ${
                  link.name === 'Home' 
                    ? 'bg-white/10 text-white' 
                    : 'text-white/40 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Action Button - Far Right */}
        <div className="hidden md:flex items-center gap-6 relative z-10">
          <Link href="#" className="text-white/40 hover:text-brand-violet transition-colors">
            <DiscordIcon className="w-5 h-5" />
          </Link>
          <Button size="sm" className="rounded-full px-8 py-5 text-[10px] uppercase font-black tracking-widest">
            Book Stage
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white p-2 relative z-10"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 glass border-b border-white/10 p-6 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-300">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-white/70 hover:text-white text-lg font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Button className="w-full">Get Started</Button>
        </div>
      )}
    </nav>
  );
};
