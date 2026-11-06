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
  CreditCard,
  Lock,
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { useStore } from '@/store/useStore';

export const Footer: React.FC = () => {
  const { openWhatsAppLead, openInfoModal } = useStore();

  return (
    <footer className="mt-12 w-full border-t border-neutral-200 bg-white">
      {/* 4 Refined Brand Pillars (Consolidated & Clutter-free) */}
      <div className="w-full px-4 sm:px-8 lg:px-12 2xl:px-16 py-8 border-b border-neutral-100 bg-[#FAFAFC]">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Pillar 1 */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-neutral-100 flex items-center justify-center text-black shrink-0 border border-neutral-200/80">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-neutral-900 leading-tight">
                Entregas em Manaus
              </h4>
              <p className="text-[11px] text-neutral-500 mt-0.5">Motoboy ou Retirada na Loja</p>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-neutral-100 flex items-center justify-center text-black shrink-0 border border-neutral-200/80">
              <Shirt className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-neutral-900 leading-tight">
                Modelagem Plus Size
              </h4>
              <p className="text-[11px] text-neutral-500 mt-0.5">Do tamanho G ao G3</p>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-neutral-100 flex items-center justify-center text-black shrink-0 border border-neutral-200/80">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-neutral-900 leading-tight">
                Troca Garantida
              </h4>
              <p className="text-[11px] text-neutral-500 mt-0.5">Até 7 dias para troca</p>
            </div>
          </div>

          {/* Pillar 4 */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-neutral-100 flex items-center justify-center text-black shrink-0 border border-neutral-200/80">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-neutral-900 leading-tight">
                Compra 100% Segura
              </h4>
              <p className="text-[11px] text-neutral-500 mt-0.5">PIX ou Cartão na entrega</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Container */}
      <div className="w-full px-4 sm:px-8 lg:px-12 2xl:px-16 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          {/* Brand Info */}
          <div className="space-y-3 max-w-sm">
            <BrandLogo size="md" />
            <p className="text-xs text-neutral-500 leading-relaxed">
              Moda Plus Size feminina elegante e contemporânea em Manaus - AM. Estilo, conforto e autoestima para todas as curvas.
            </p>
            <div className="flex items-center justify-center md:justify-start gap-1.5 text-xs text-neutral-700 font-medium">
              <MapPin className="w-3.5 h-3.5 text-black" />
              <span>Manaus - AM • Showroom & Entregas</span>
            </div>
          </div>

          {/* Institutional Fast Links */}
          <div className="flex flex-wrap items-center justify-center gap-5 text-xs text-neutral-600 font-medium">
            <button
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
            <span>•</span>
            <button
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
            <span>•</span>
            <button
              onClick={() =>
                openWhatsAppLead(
                  'Olá! Gostaria de atendimento de vendas na MIIXXIIE em Manaus.',
                  'footer_link'
                )
              }
              className="hover:text-black transition-colors flex items-center gap-1"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
              <span>Falar com Consultora</span>
            </button>
            <span>•</span>
            <Link
              href="/admin"
              className="text-neutral-500 hover:text-black transition-colors text-[11px] flex items-center gap-1"
            >
              <Lock className="w-3 h-3" />
              <span>Acesso Lojista</span>
            </Link>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-8 pt-6 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-neutral-400">
          <p>© 2026 MIIXXIIE Variedades. Todos os direitos reservados.</p>
          <p>Manaus - AM • Beleza em todas as formas.</p>
        </div>
      </div>
    </footer>
  );
};
