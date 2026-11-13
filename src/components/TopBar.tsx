'use client';

import React from 'react';
import { Truck } from 'lucide-react';
import { useStore } from '@/store/useStore';

export const TopBar: React.FC = () => {
  const { storeCMS } = useStore();

  if (storeCMS?.isTopBarActive === false) {
    return null;
  }

  const announcement =
    storeCMS?.topBarAnnouncement ||
    'Entregas em Manaus: Frete via Motoboy a Combinar no WhatsApp • Grátis Apenas Retirando na Loja';

  return (
    <div className="w-full bg-[#0A0A0A] text-neutral-300 text-[11px] sm:text-xs py-2 px-4 border-b border-neutral-800 text-center flex items-center justify-center gap-2">
      <Truck className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
      <span className="font-medium text-neutral-200">
        {announcement}
      </span>
    </div>
  );
};
