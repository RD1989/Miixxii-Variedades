'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface BrandLogoProps {
  variant?: 'light' | 'dark' | 'white' | 'circle' | 'square' | 'badge3d';
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
  const isSquareOrCircle = variant === 'circle' || variant === 'square' || variant === 'badge3d';

  const dimensions = {
    sm: {
      width: isSquareOrCircle ? 44 : 130,
      height: isSquareOrCircle ? 44 : 44,
      maxH: isSquareOrCircle ? 'max-h-[40px]' : 'max-h-[34px]',
      subtitle: 'text-[8px] tracking-[0.22em]',
    },
    md: {
      width: isSquareOrCircle ? 60 : 170,
      height: isSquareOrCircle ? 60 : 56,
      maxH: isSquareOrCircle ? 'max-h-[52px]' : 'max-h-[44px]',
      subtitle: 'text-[9px] tracking-[0.26em]',
    },
    lg: {
      width: isSquareOrCircle ? 80 : 220,
      height: isSquareOrCircle ? 80 : 72,
      maxH: isSquareOrCircle ? 'max-h-[70px]' : 'max-h-[56px]',
      subtitle: 'text-[10px] tracking-[0.28em]',
    },
    xl: {
      width: isSquareOrCircle ? 100 : 280,
      height: isSquareOrCircle ? 100 : 92,
      maxH: isSquareOrCircle ? 'max-h-[90px]' : 'max-h-[70px]',
      subtitle: 'text-[11px] tracking-[0.3em]',
    },
  }[size];

  let logoSrc = '/images/logo-horizontal.png';
  if (variant === 'white') {
    logoSrc = '/images/logo-white.png';
  } else if (variant === 'circle') {
    logoSrc = '/images/logo-circle.png';
  } else if (variant === 'square') {
    logoSrc = '/images/logo-square.png';
  } else if (variant === 'badge3d') {
    logoSrc = '/images/logo-badge-3d.jpg';
  }

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
          className={`h-auto w-auto ${dimensions.maxH} object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-xs`}
        />
      </div>

      {showSubtitle && (
        <span
          className={`mt-0.5 sm:mt-1 font-bold uppercase ${dimensions.subtitle} ${
            isWhite ? 'text-neutral-300' : 'text-neutral-600'
          }`}
        >
          Moda Plus Size Feminina
        </span>
      )}
    </Link>
  );
};
