'use client';

import React from 'react';
import { Truck, ShieldCheck, MessageCircle, MapPin, Store } from 'lucide-react';
import { useStore } from '@/store/useStore';

export const TopBar: React.FC = () => {
  const { openWhatsAppLead } = useStore();

  return (
    <div className="w-full bg-gradient-to-r from-[#0C0C0E] via-[#17171A] to-[#0C0C0E] text-neutral-300 text-[11px] sm:text-xs py-2 px-3 sm:px-8 lg:px-12 2xl:px-16 shadow-sm border-b border-neutral-800">
      <div className="w-full flex items-center justify-between">
        {/* Left / Center: Shipping & Security Perks */}
        <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto no-scrollbar mx-auto sm:mx-0 py-0.5">
          <div className="flex items-center gap-1.5 whitespace-nowrap font-medium text-neutral-100">
            <Truck className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
            <span>Entregas em Toda Manaus (Motoboy por Bairro)</span>
          </div>

          <span className="hidden sm:inline text-neutral-700">|</span>

          <div className="hidden sm:flex items-center gap-1.5 whitespace-nowrap text-neutral-200 font-medium">
            <Store className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
            <span>Retirada Grátis na Loja Física</span>
          </div>

          <span className="hidden md:inline text-neutral-700">|</span>

          <button
            onClick={() =>
              openWhatsAppLead(
                'Olá! Gostaria de atendimento de vendas na MIIXXIIE Variedades em Manaus. 🌸'
              )
            }
            className="hidden md:flex items-center gap-1.5 whitespace-nowrap text-[#25D366] hover:text-emerald-300 transition-colors font-semibold"
            title="Clique para iniciar conversa imediata com uma de nossas consultoras (Maria ou Carlos)"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-current shrink-0" />
            <span>WhatsApp Vendas Manaus: Maria (98613-7969) & Carlos (98606-4005)</span>
          </button>
        </div>

        {/* Right: Location & Guarantee */}
        <div className="hidden lg:flex items-center gap-4 text-neutral-400">
          <div className="flex items-center gap-1 text-[11px] text-neutral-300">
            <MapPin className="w-3 h-3 text-neutral-400" />
            <span>Manaus - AM</span>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-neutral-300">
            <ShieldCheck className="w-3 h-3 text-neutral-400" />
            <span>Compra 100% Segura</span>
          </div>
        </div>
      </div>
    </div>
  );
};
