'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface BrandLogoProps {
  variant?: 'light' | 'dark' | 'white';
  size?: 'sm' | 'md' | 'lg' | 'xl';
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

  const dimensions = {
    sm: { width: 130, height: 49, subtitle: 'text-[8px] tracking-[0.24em]' },
    md: { width: 175, height: 66, subtitle: 'text-[9px] tracking-[0.28em]' },
    lg: { width: 220, height: 83, subtitle: 'text-[10px] tracking-[0.3em]' },
    xl: { width: 260, height: 98, subtitle: 'text-[11px] tracking-[0.32em]' },
  }[size];

  const logoSrc = isWhite ? '/images/logo-white.png' : '/images/logo-black.png';

  return (
    <Link
      href="/"
      className={`inline-flex flex-col items-center justify-center text-center group select-none transition-transform duration-200 hover:opacity-90 ${className}`}
    >
      <div className="relative flex items-center justify-center">
        <Image
          src={logoSrc}
          alt="MIIXXIIE Variedades"
          width={dimensions.width}
          height={dimensions.height}
          priority
          className="h-auto w-auto max-h-[46px] sm:max-h-[58px] object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-sm"
        />
      </div>

      {showSubtitle && (
        <span
          className={`mt-0.5 font-bold uppercase ${dimensions.subtitle} ${
            isWhite ? 'text-neutral-300' : 'text-neutral-600'
          }`}
        >
          Moda Plus Size Feminina
        </span>
      )}
    </Link>
  );
};
