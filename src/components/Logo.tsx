import React from 'react';

export const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg
        width="40"
        height="40"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-[0_0_12px_rgba(220,184,255,0.6)]"
      >
        <defs>
          <linearGradient id="violetGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DCB8FF" />
            <stop offset="100%" stopColor="#A855F7" />
          </linearGradient>
          <linearGradient id="silverRing" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#DCB8FF" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
        </defs>
        
        {/* The 'O' Core */}
        <circle
          cx="50"
          cy="50"
          r="32"
          stroke="url(#violetGrad)"
          strokeWidth="10"
        />
        
        {/* The Orbiting Electric Ring */}
        <path
          d="M15 50C15 50 35 85 85 40"
          stroke="url(#silverRing)"
          strokeWidth="3"
          strokeLinecap="round"
          className="animate-pulse"
        />
        
        {/* Sparkle */}
        <circle cx="85" cy="40" r="1.5" fill="#ffffff" />
      </svg>
      <span className="text-2xl font-black tracking-tighter text-white uppercase italic">
        Stage<span className="text-brand-violet not-italic">X</span>
      </span>
    </div>
  );
};
