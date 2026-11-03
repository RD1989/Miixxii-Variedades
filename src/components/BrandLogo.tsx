'use client';

import React from 'react';
import Link from 'next/link';

interface BrandLogoProps {
  variant?: 'light' | 'dark' | 'white';
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'dark',
  size = 'md',
  showSubtitle = true,
  className = '',
}) => {
  const isWhite = variant === 'white';
  const textColor = isWhite ? 'text-white' : 'text-[#1F1F1F]';
  const scriptColor = isWhite ? 'text-pink-200' : 'text-[#C8105D]';
  const subtitleColor = isWhite ? 'text-pink-100' : 'text-[#1F1F1F]';

  const scaleClasses = {
    sm: {
      title: 'text-xl sm:text-2xl tracking-[0.2em]',
      heart: 'w-4 h-4 -top-3',
      script: 'text-lg sm:text-xl -mt-1',
      subtitle: 'text-[9px] tracking-[0.22em]',
    },
    md: {
      title: 'text-2xl sm:text-3xl tracking-[0.22em]',
      heart: 'w-5 h-5 -top-3.5',
      script: 'text-xl sm:text-2xl -mt-1.5',
      subtitle: 'text-[10px] tracking-[0.25em]',
    },
    lg: {
      title: 'text-3xl sm:text-4xl tracking-[0.25em]',
      heart: 'w-6 h-6 -top-4',
      script: 'text-2xl sm:text-3xl -mt-2',
      subtitle: 'text-[11px] tracking-[0.28em]',
    },
  }[size];

  return (
    <Link
      href="/"
      className={`inline-flex flex-col items-center justify-center text-center group select-none ${className}`}
    >
      {/* Brand Main Title with Centered Heart over XX */}
      <div className="relative inline-block">
        {/* Heart Icon centered over the middle XX */}
        <div className={`absolute left-1/2 -translate-x-1/2 ${scaleClasses.heart} pointer-events-none transition-transform duration-300 group-hover:scale-125`}>
          <svg
            viewBox="0 0 24 24"
            className="w-full h-full fill-none stroke-[#C8105D] stroke-[2.2]"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        </div>

        <span className={`font-brand font-bold uppercase ${textColor} ${scaleClasses.title} block transition-colors`}>
          MIIXXIIE
        </span>
      </div>

      {/* Script Subtitle: Variedades ♡ */}
      <div className="flex items-center gap-1">
        <span className={`font-script ${scriptColor} ${scaleClasses.script} italic font-semibold`}>
          Variedades
        </span>
        <svg
          viewBox="0 0 24 24"
          className={`w-3.5 h-3.5 fill-none stroke-[#C8105D] stroke-[2] ${isWhite ? 'stroke-pink-200' : ''}`}
        >
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
      </div>

      {/* Category Niche */}
      {showSubtitle && (
        <span className={`font-sans font-semibold uppercase ${subtitleColor} ${scaleClasses.subtitle} mt-0.5 opacity-90`}>
          MODA PLUS SIZE FEMININA
        </span>
      )}
    </Link>
  );
};
