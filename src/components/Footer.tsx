import React from 'react';
import { Logo } from './Logo';
import { InstagramIcon, XIcon, DiscordIcon, YoutubeIcon } from './SocialIcons';
import { Phone } from 'lucide-react';
import Link from 'next/link';
import { PHONE_DISPLAY, PHONE_TEL } from '@/lib/contact';

export const Footer = () => {
  const footerLinks = {
    Product: ['AI Features', 'Analytics', 'Enterprise', 'Security'],
    Company: ['About Us', 'Careers', 'Brand Kit', 'Contact'],
    Resources: ['Documentation', 'API Reference', 'Status', 'Community'],
    Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'SLA']
  };

  return (
    // Translucent, so the mesh's final "settle" camera state reads behind it
    // instead of being cut off by an opaque slab.
    <footer className="bg-[#080810]/85 backdrop-blur-xl border-t border-white/5 pt-24 pb-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
          <div className="col-span-2 space-y-6">
            <Logo size="md" />
            <p className="text-white/40 max-w-sm leading-relaxed text-sm">
              OcassionOrbit is the global standard for cinematic event orchestration and connectivity.
              Designed for the world, built for the future of connectivity.
            </p>

            <div className="space-y-3">
              <h4 className="text-white font-black uppercase text-xs tracking-widest">Contact</h4>
              <a
                href={PHONE_TEL}
                className="inline-flex items-center gap-3 text-lg font-black tracking-tight text-[#D4AF37] hover:text-white transition-colors"
              >
                <Phone size={18} strokeWidth={3} />
                {PHONE_DISPLAY}
              </a>
              <p className="text-white/30 text-[10px] font-black uppercase tracking-[0.2em]">
                Call or message to book an event
              </p>
            </div>
            <div className="flex items-center gap-4 pt-2">
              <Link href="#" className="p-2 bg-white/[0.03] border border-white/5 rounded-lg text-white/40 hover:text-[#D4AF37] hover:border-[#D4AF37]/30 transition-all group">
                <InstagramIcon className="w-5 h-5" />
              </Link>
              <Link href="#" className="p-2 bg-white/[0.03] border border-white/5 rounded-lg text-white/40 hover:text-[#D4AF37] hover:border-[#D4AF37]/30 transition-all group">
                <DiscordIcon className="w-5 h-5" />
              </Link>
              <Link href="#" className="p-2 bg-white/[0.03] border border-white/5 rounded-lg text-white/40 hover:text-[#D4AF37] hover:border-[#D4AF37]/30 transition-all group">
                <YoutubeIcon className="w-5 h-5" />
              </Link>
              <Link href="#" className="p-2 bg-white/[0.03] border border-white/5 rounded-lg text-white/40 hover:text-[#D4AF37] hover:border-[#D4AF37]/30 transition-all group">
                <XIcon className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="col-span-1">
              <h4 className="text-white font-black uppercase text-xs tracking-widest mb-6">{title}</h4>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-white/40 hover:text-white transition-colors text-xs font-bold uppercase tracking-tight">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between border-t border-white/5 pt-12 text-white/20 text-[10px] font-black tracking-[0.2em] uppercase">
          <div className="flex flex-col gap-1 text-center md:text-left">
            <p>© 2026 OcassionOrbit Inc. All rights reserved.</p>
            <p className="opacity-50">powered by music banaras</p>
          </div>
          <div className="flex flex-col md:flex-row gap-4 md:gap-12 mt-6 md:mt-0 text-center md:text-right items-center">
            <span className="text-[#D4AF37]/60 italic font-black">POWERED BY GEMINI 3.1 PRO ENGINE</span>
            <span className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
              Uptime: 100%
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
