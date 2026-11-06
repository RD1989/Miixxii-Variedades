'use client';

import React from 'react';
import { Truck, ShieldCheck, MessageCircle, MapPin, Store } from 'lucide-react';
import { useStore } from '@/store/useStore';

export const TopBar: React.FC = () => {
  const { openWhatsAppLead } = useStore();

  return (
    <div className="w-full bg-[#0C0C0E] text-neutral-300 text-[10px] sm:text-xs py-1.5 px-3 sm:px-8 lg:px-12 2xl:px-16 shadow-xs border-b border-neutral-800/80">
      <div className="w-full flex items-center justify-between">
        {/* Left / Center: Shipping & Security Perks */}
        <div className="flex items-center gap-2 sm:gap-4 mx-auto sm:mx-0 py-0.5 text-center sm:text-left">
          <div className="flex items-center gap-1.5 font-medium text-neutral-100">
            <Truck className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
            <span className="sm:hidden">Entregas em Toda Manaus (Motoboy) • Retirada na Loja</span>
            <span className="hidden sm:inline">Entregas em Toda Manaus (Motoboy por Bairro)</span>
          </div>

          <span className="hidden sm:inline text-neutral-700">|</span>

          <div className="hidden sm:flex items-center gap-1.5 whitespace-nowrap text-neutral-200 font-medium">
            <Store className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
            <span>Retirada Grátis no Showroom</span>
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
            <span>WhatsApp Vendas: Maria (98613-7969) & Carlos (98606-4005)</span>
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
