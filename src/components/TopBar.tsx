'use client';

import React from 'react';
import { Truck, ShieldCheck, MessageCircle, Instagram, Facebook } from 'lucide-react';
import { useStore } from '@/store/useStore';

export const TopBar: React.FC = () => {
  const { openInfoModal, openWhatsAppModal } = useStore();

  return (
    <div className="w-full bg-gradient-to-r from-[#6B0833] via-[#9E0B4B] to-[#6B0833] text-white text-[11px] sm:text-xs py-2 px-4 sm:px-8 lg:px-12 2xl:px-16 shadow-sm border-b border-[#b5145b]/30">
      <div className="w-full flex items-center justify-between">
        {/* Left / Center: Shipping & Security Perks */}
        <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto no-scrollbar mx-auto sm:mx-0 py-0.5">
          <div className="flex items-center gap-1.5 whitespace-nowrap font-medium text-pink-100">
            <Truck className="w-3.5 h-3.5 text-pink-300 shrink-0" />
            <span>Entregas Somente em Manaus - AM</span>
          </div>

          <span className="hidden sm:inline text-pink-300/40">|</span>

          <div className="hidden sm:flex items-center gap-1.5 whitespace-nowrap text-pink-100 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
            <span>Compra 100% Segura</span>
          </div>

          <span className="hidden md:inline text-pink-300/40">|</span>

          <button
            onClick={openWhatsAppModal}
            className="hidden md:flex items-center gap-1.5 whitespace-nowrap text-emerald-300 hover:text-white transition-colors font-semibold"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-current shrink-0" />
            <span>Atendimento via WhatsApp</span>
          </button>
        </div>

        {/* Right: Social Media Links */}
        <div className="hidden lg:flex items-center gap-3 text-pink-200">
          <button
            onClick={() =>
              openInfoModal(
                'Instagram Oficial',
                'Siga o perfil @miixxiievariedades para conferir os provadores diários, looks novos e novidades exclusivas de Manaus!'
              )
            }
            className="hover:text-white transition-colors p-1"
            title="Instagram MIIXXIIE"
          >
            <Instagram className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() =>
              openInfoModal(
                'Facebook Oficial',
                'Curta nossa página no Facebook para acompanhar lançamentos, promoções e depoimentos de nossas clientes.'
              )
            }
            className="hover:text-white transition-colors p-1"
            title="Facebook MIIXXIIE"
          >
            <Facebook className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() =>
              openInfoModal(
                'TikTok Oficial',
                'Veja vídeos de caimento dos looks, dicas de moda plus size e bastidores da loja em Manaus.'
              )
            }
            className="hover:text-white transition-colors p-1 text-[11px] font-bold"
            title="TikTok MIIXXIIE"
          >
            ♪ TikTok
          </button>
        </div>
      </div>
    </div>
  );
};
