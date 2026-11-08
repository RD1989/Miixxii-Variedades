'use client';

import React from 'react';
import { Truck } from 'lucide-react';

export const TopBar: React.FC = () => {
  return (
    <div className="w-full bg-[#0A0A0A] text-neutral-300 text-[11px] sm:text-xs py-2 px-4 border-b border-neutral-800 text-center flex items-center justify-center gap-2">
      <Truck className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
      <span className="font-medium text-neutral-200">
        Entregas em toda Manaus via Motoboy ou Retirada no Showroom
      </span>
      <span className="hidden sm:inline text-neutral-600">•</span>
      <span className="hidden sm:inline text-neutral-400 font-medium">
        Moda Plus Size Feminina (G ao G3)
      </span>
    </div>
  );
};
