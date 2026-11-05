'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Home, ChevronDown, MessageCircle } from 'lucide-react';
import { CATEGORIES } from '@/data/mockData';
import { useStore } from '@/store/useStore';

export const Navbar: React.FC = () => {
  const {
    selectedCategory,
    setSelectedCategory,
    openInfoModal,
    openWhatsAppModal,
  } = useStore();

  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  return (
    <nav className="hidden md:block bg-white border-b border-neutral-200 py-2.5 px-4 sm:px-8 lg:px-12 2xl:px-16 shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
      <div className="w-full flex items-center justify-between">
        {/* Navigation Links */}
        <div className="flex items-center gap-1 lg:gap-2">
          {/* Início Active Pill */}
          <Link
            href="/"
            onClick={() => setSelectedCategory(null)}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm ${
              selectedCategory === null
                ? 'bg-black text-white'
                : 'text-neutral-700 hover:text-black hover:bg-neutral-100'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Início</span>
          </Link>

          {/* Categorias Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsCategoryDropdownOpen(true)}
            onMouseLeave={() => setIsCategoryDropdownOpen(false)}
          >
            <button
              onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                selectedCategory !== null
                  ? 'text-black font-bold bg-neutral-100'
                  : 'text-neutral-700 hover:text-black hover:bg-neutral-50'
              }`}
            >
              <span>Categorias</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {isCategoryDropdownOpen && (
              <div className="absolute top-full left-0 w-52 bg-white rounded-xl shadow-xl border border-neutral-200 py-2 z-50 animate-in fade-in-50 duration-150">
                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    setIsCategoryDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-1.5 text-xs font-semibold text-neutral-900 hover:bg-neutral-100 transition-colors"
                >
                  Todas as Categorias
                </button>
                <div className="my-1 border-t border-neutral-100" />
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.slug);
                      setIsCategoryDropdownOpen(false);
                      const el = document.getElementById('novidades-section');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`w-full text-left px-4 py-1.5 text-xs transition-colors flex items-center justify-between ${
                      selectedCategory === cat.slug
                        ? 'text-black font-bold bg-neutral-100'
                        : 'text-neutral-600 hover:bg-neutral-50 hover:text-black'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-[10px] text-neutral-400">Plus Size</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Novidades */}
          <button
            onClick={() => {
              setSelectedCategory(null);
              const el = document.getElementById('novidades-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-3 py-1.5 rounded-full text-xs font-medium text-neutral-700 hover:text-black hover:bg-neutral-50 transition-colors"
          >
            Novidades
          </button>

          {/* Mais Vendidos */}
          <button
            onClick={() => {
              setSelectedCategory(null);
              const el = document.getElementById('mais-vendidos-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-3 py-1.5 rounded-full text-xs font-medium text-neutral-700 hover:text-black hover:bg-neutral-50 transition-colors"
          >
            Mais Vendidos
          </button>

          {/* Coleção Festa */}
          <button
            onClick={() => {
              setSelectedCategory(null);
              const el = document.getElementById('festa-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-3 py-1.5 rounded-full text-xs font-medium text-neutral-700 hover:text-black hover:bg-neutral-50 transition-colors"
          >
            Festa & Noite
          </button>

          {/* Ofertas */}
          <button
            onClick={() => {
              const el = document.getElementById('novidades-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-3 py-1.5 rounded-full text-xs font-medium text-neutral-700 hover:text-black hover:bg-neutral-50 transition-colors flex items-center gap-1.5"
          >
            <span>Ofertas</span>
            <span className="w-1.5 h-1.5 rounded-full bg-black"></span>
          </button>

          {/* Quem Somos */}
          <button
            onClick={() =>
              openInfoModal(
                'Sobre a MIIXXIIE Variedades',
                'Nossa loja nasceu com a missão de vestir a mulher plus size com peças modernas, tecidos de caimento fluido e acabamento de alta costura em Manaus - AM. Acreditamos que a beleza se manifesta em todas as formas e curvas!'
              )
            }
            className="px-3 py-1.5 rounded-full text-xs font-medium text-neutral-700 hover:text-black hover:bg-neutral-50 transition-colors"
          >
            Quem Somos
          </button>

          {/* Fale Conosco */}
          <button
            onClick={() =>
              openInfoModal(
                'Fale Conosco — Atendimento Manaus',
                'Dúvidas sobre tamanhos ou entregas? Fale com nossas consultoras pelo WhatsApp oficial ou visite nosso showroom exclusivo em Manaus.'
              )
            }
            className="px-3 py-1.5 rounded-full text-xs font-medium text-neutral-700 hover:text-black hover:bg-neutral-50 transition-colors"
          >
            Fale Conosco
          </button>
        </div>

        {/* WhatsApp Fast CTA Button */}
        <div>
          <button
            onClick={openWhatsAppModal}
            className="flex items-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold px-4 py-2 rounded-full transition-all shadow-[0_2px_10px_rgba(37,211,102,0.3)] hover:shadow-[0_4px_16px_rgba(37,211,102,0.45)] hover:scale-[1.02] active:scale-[0.98]"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Compre pelo WhatsApp</span>
          </button>
        </div>
      </div>
    </nav>
  );
};
