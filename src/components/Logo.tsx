import React from 'react';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export const Logo = ({ className = "", size = 'sm', showText = true }: LogoProps) => {
  const sizes = {
    sm: { icon: "w-8 h-8", text: "text-lg", sub: "text-[6px]" },
    md: { icon: "w-12 h-12", text: "text-2xl", sub: "text-[8px]" },
    lg: { icon: "w-24 h-24", text: "text-4xl", sub: "text-[12px]" },
    xl: { icon: "w-40 h-40", text: "text-6xl", sub: "text-[16px]" }
  };

  const currentSize = sizes[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`relative ${currentSize.icon} flex-shrink-0`}>
        <Image
          src="/hey3.png"
          alt="OcassionOrbit Logo"
          width={400}
          height={400}
          className="w-full h-full object-contain drop-shadow-[0_0_25px_rgba(139,92,246,0.3)]"
          priority
        />
      </div>

      {showText && (
        <div className="flex flex-col">
          <h1 className={`${currentSize.text} font-serif font-medium tracking-tight text-brand-gold leading-[0.8]`}>
            OcassionOrbit
          </h1>
          <p className={`${currentSize.sub} font-sans font-bold tracking-[0.4em] text-white/30 uppercase mt-2`}>
            Events. Connected. Beyond.
          </p>
        </div>
      )}
    </div>
  );
};
