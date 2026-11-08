'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Truck,
  Shirt,
  MessageCircle,
  MapPin,
  RefreshCw,
  Lock,
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { useStore } from '@/store/useStore';

export const Footer: React.FC = () => {
  const { openWhatsAppLead, openInfoModal } = useStore();

  return (
    <footer className="mt-8 sm:mt-12 w-full border-t border-neutral-200 bg-white">
      {/* Sleek Trust Strip (Discreet on mobile, full on desktop) */}
      <div className="w-full px-4 sm:px-8 lg:px-12 py-3 sm:py-3.5 border-b border-neutral-100 bg-neutral-50/70 text-[11px] sm:text-xs text-neutral-600 font-medium">
        <div className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 gap-y-1.5 max-w-5xl mx-auto text-center">
          <span className="inline-flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5 text-neutral-700 shrink-0" />
            <span>Entregas em Manaus (Motoboy & Showroom)</span>
          </span>
          <span className="hidden sm:inline text-neutral-300">•</span>
          <span className="inline-flex items-center gap-1.5">
            <Shirt className="w-3.5 h-3.5 text-neutral-700 shrink-0" />
            <span>Moda Plus Size (G ao G3)</span>
          </span>
          <span className="hidden sm:inline text-neutral-300">•</span>
          <span className="inline-flex items-center gap-1.5">
            <RefreshCw className="w-3.5 h-3.5 text-neutral-700 shrink-0" />
            <span>Troca Garantida em até 7 dias</span>
          </span>
          <span className="hidden sm:inline text-neutral-300">•</span>
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-neutral-700 shrink-0" />
            <span>Pagamento no Recebimento</span>
          </span>
        </div>
      </div>

      {/* Main Compact Footer Content */}
      <div className="w-full px-4 sm:px-8 lg:px-12 py-6 sm:py-8 max-w-5xl mx-auto">
        <div className="flex flex-col items-center text-center space-y-3.5 sm:space-y-4">
          {/* Logo */}
          <div className="flex justify-center">
            <BrandLogo size="sm" />
          </div>

          {/* Clean Description (Exactly as requested) */}
          <p className="text-[11px] sm:text-xs text-neutral-600 leading-relaxed max-w-lg">
            Moda Plus Size feminina elegante e contemporânea em Manaus - AM. Estilo, conforto e autoestima para todas as curvas.
          </p>

          {/* Location Badge */}
          <div className="inline-flex items-center justify-center gap-1.5 text-[11px] sm:text-xs font-semibold text-neutral-800">
            <MapPin className="w-3.5 h-3.5 text-neutral-900 shrink-0" />
            <span>Manaus - AM • Showroom & Entregas</span>
          </div>

          {/* Clean Inline Links Row */}
          <nav aria-label="Links institucionais" className="pt-1">
            <ul className="flex flex-wrap items-center justify-center gap-x-2.5 sm:gap-x-3 gap-y-1 text-[11px] sm:text-xs text-neutral-600 font-medium">
              <li>
                <button
                  type="button"
                  onClick={() =>
                    openInfoModal(
                      'Política de Trocas e Devoluções',
                      'Garantimos a troca de peças em até 7 dias corridos após o recebimento em Manaus para que seu look fique impecável.'
                    )
                  }
                  className="hover:text-black transition-colors"
                >
                  Trocas & Devoluções
                </button>
              </li>
              <li aria-hidden="true" className="text-neutral-300 select-none">•</li>
              <li>
                <button
                  type="button"
                  onClick={() =>
                    openInfoModal(
                      'Tabela de Medidas Plus Size',
                      'Nossa modelagem atende do G ao G3 com foco em proporções reais (busto, cintura e quadril).'
                    )
                  }
                  className="hover:text-black transition-colors"
                >
                  Tabela de Medidas
                </button>
              </li>
              <li aria-hidden="true" className="text-neutral-300 select-none">•</li>
              <li>
                <button
                  type="button"
                  onClick={() =>
                    openWhatsAppLead(
                      'Olá! Gostaria de atendimento de vendas na MIIXXIIE em Manaus. 🌸',
                      'footer_link'
                    )
                  }
                  className="hover:text-black transition-colors inline-flex items-center gap-1"
                >
                  <MessageCircle className="w-3 h-3 text-[#25D366]" />
                  <span>Falar com Consultora</span>
                </button>
              </li>
              <li aria-hidden="true" className="text-neutral-300 select-none">•</li>
              <li>
                <Link
                  href="/admin"
                  className="text-neutral-500 hover:text-black transition-colors inline-flex items-center gap-1"
                >
                  <Lock className="w-3 h-3" />
                  <span>Acesso Lojista</span>
                </Link>
              </li>
            </ul>
          </nav>

          {/* Bottom Copyright Strip */}
          <div className="pt-2 border-t border-neutral-100 w-full flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-1 text-[10px] sm:text-[11px] text-neutral-400">
            <span>© 2026 MIIXXIIE Variedades. Todos os direitos reservados.</span>
            <span className="hidden sm:inline text-neutral-300">•</span>
            <span>Manaus - AM • Beleza em todas as formas.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
