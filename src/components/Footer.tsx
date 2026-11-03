'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Truck,
  Shirt,
  HeartHandshake,
  CreditCard,
  Headphones,
  MessageCircle,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { STORE_CONFIG } from '@/data/mockData';
import { useStore } from '@/store/useStore';

export const Footer: React.FC = () => {
  const { openWhatsAppModal, openInfoModal } = useStore();

  return (
    <footer className="mt-12 w-full">
      {/* 4 Trust & Local Authority Cards */}
      <div className="w-full px-3 sm:px-6 lg:px-10 2xl:px-12 mb-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {/* Card 1 */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#F3D6E2] shadow-sm flex items-center gap-3.5 hover:shadow-md transition-shadow">
            <div className="w-11 h-11 rounded-xl bg-pink-50 border border-pink-100 flex items-center justify-center text-[#C8105D] shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-gray-900 leading-tight">
                Compra Segura
              </h4>
              <p className="text-[11px] text-gray-500 mt-0.5">e 100% Confiável</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#F3D6E2] shadow-sm flex items-center gap-3.5 hover:shadow-md transition-shadow">
            <div className="w-11 h-11 rounded-xl bg-pink-50 border border-pink-100 flex items-center justify-center text-[#C8105D] shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-gray-900 leading-tight">
                Atendimento Local
              </h4>
              <p className="text-[11px] text-gray-500 mt-0.5">em Manaus - AM</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#F3D6E2] shadow-sm flex items-center gap-3.5 hover:shadow-md transition-shadow">
            <div className="w-11 h-11 rounded-xl bg-pink-50 border border-pink-100 flex items-center justify-center text-[#C8105D] shrink-0">
              <Shirt className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-gray-900 leading-tight">
                Moda Plus Size
              </h4>
              <p className="text-[11px] text-gray-500 mt-0.5">com muito Estilo</p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#F3D6E2] shadow-sm flex items-center gap-3.5 hover:shadow-md transition-shadow">
            <div className="w-11 h-11 rounded-xl bg-pink-50 border border-pink-100 flex items-center justify-center text-[#C8105D] shrink-0">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-gray-900 leading-tight">
                Atendimento VIP
              </h4>
              <p className="text-[11px] text-gray-500 mt-0.5">Exclusivo pelo Whats</p>
            </div>
          </div>
        </div>
      </div>

      {/* Burgundy Trust Banner (with WhatsApp CTA) */}
      <div className="bg-gradient-to-r from-[#6B0833] via-[#9E0B4B] to-[#6B0833] text-white py-6 px-4 sm:px-8 lg:px-12 2xl:px-16 border-y border-[#b5145b]/40">
        <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Trust Icons Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 text-xs text-pink-100 w-full lg:w-auto">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-emerald-300 shrink-0" />
              <div>
                <span className="font-bold block text-white">Compra Segura</span>
                <span className="text-[10px] text-pink-200">Seus dados protegidos</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Truck className="w-5 h-5 text-pink-300 shrink-0" />
              <div>
                <span className="font-bold block text-white">Entrega Rápida</span>
                <span className="text-[10px] text-pink-200">Somente em Manaus - AM</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Headphones className="w-5 h-5 text-pink-300 shrink-0" />
              <div>
                <span className="font-bold block text-white">Atendimento</span>
                <span className="text-[10px] text-pink-200">Personalizado</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <CreditCard className="w-5 h-5 text-pink-300 shrink-0" />
              <div>
                <span className="font-bold block text-white">Diversas Formas</span>
                <span className="text-[10px] text-pink-200">de Pagamento (PIX/Cartão)</span>
              </div>
            </div>
          </div>

          {/* Direct Green WhatsApp CTA */}
          <button
            onClick={openWhatsAppModal}
            className="w-full sm:w-auto shrink-0 flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-extrabold text-sm sm:text-base px-6 py-3.5 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 animate-pulse-subtle border-2 border-white/30"
          >
            <MessageCircle className="w-5 h-5 fill-white" />
            <span>Compre Agora pelo WhatsApp</span>
          </button>
        </div>
      </div>

      {/* Institutional Footer */}
      <div className="bg-white border-t border-[#F3D6E2] py-8 px-4 sm:px-8 lg:px-12 2xl:px-16 text-center sm:text-left">
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="font-brand font-bold text-lg tracking-wider text-gray-900">
                MIIXXIIE
              </span>
              <span className="font-script text-xl text-[#C8105D] font-bold">
                Variedades ♡
              </span>
            </div>
            <p className="text-xs text-gray-500">
              Moda Plus Size é aqui! Coleções exclusivas do G ao G3.
            </p>
            <div className="flex items-center justify-center md:justify-start gap-1 text-xs text-gray-600 font-medium">
              <MapPin className="w-3.5 h-3.5 text-[#C8105D]" />
              <span>Manaus - AM • Beleza em todas as formas!</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-600">
            <button
              onClick={() =>
                openInfoModal(
                  'Política de Trocas e Devoluções',
                  'Garantimos a troca de peças em até 7 dias corridos após o recebimento, garantindo que o look fique perfeito em você.'
                )
              }
              className="hover:text-[#C8105D] transition-colors"
            >
              Trocas & Devoluções
            </button>
            <span>•</span>
            <button
              onClick={() =>
                openInfoModal(
                  'Guia de Medidas Plus Size',
                  'Nossa tabela atende do G ao G3 com foco em busto, cintura e quadril para você acertar de primeira.'
                )
              }
              className="hover:text-[#C8105D] transition-colors"
            >
              Tabela de Medidas
            </button>
            <span>•</span>
            <Link
              href="/admin"
              className="font-bold text-[#6B0833] hover:text-[#C8105D] transition-colors underline"
            >
              Acesso Administrativo
            </Link>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-6 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-gray-400">
          <p>© 2026 MIIXXIIE Variedades. Todos os direitos reservados.</p>
          <p className="flex items-center gap-1">
            Feito com <span className="text-[#C8105D]">♡</span> para a mulher brasileira.
          </p>
        </div>
      </div>
    </footer>
  );
};
