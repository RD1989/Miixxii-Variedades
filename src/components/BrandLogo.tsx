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
    sm: { width: 135, height: 45, maxH: 'max-h-[36px]', subtitle: 'text-[8px] tracking-[0.24em]' },
    md: { width: 180, height: 60, maxH: 'max-h-[48px]', subtitle: 'text-[9px] tracking-[0.28em]' },
    lg: { width: 240, height: 80, maxH: 'max-h-[64px]', subtitle: 'text-[10px] tracking-[0.3em]' },
    xl: { width: 300, height: 100, maxH: 'max-h-[78px]', subtitle: 'text-[11px] tracking-[0.32em]' },
  }[size];

  const logoSrc = isWhite ? '/images/logo-white.png' : '/images/logo-horizontal.png';

  return (
    <Link
      href="/"
      className={`inline-flex flex-col items-center justify-center text-center group select-none transition-transform duration-200 hover:opacity-95 ${className}`}
    >
      <div className="relative flex items-center justify-center">
        <Image
          src={logoSrc}
          alt="MIIXXIIE Variedades"
          width={dimensions.width}
          height={dimensions.height}
          priority
          className={`h-auto w-auto ${dimensions.maxH} object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-sm`}
        />
      </div>

      {showSubtitle && (
        <span
          className={`mt-1 font-bold uppercase ${dimensions.subtitle} ${
            isWhite ? 'text-neutral-300' : 'text-neutral-600'
          }`}
        >
          Moda Plus Size Feminina
        </span>
      )}
    </Link>
  );
};
