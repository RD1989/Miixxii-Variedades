'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, ShoppingBag, User, Menu, X, Heart, MessageCircle } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { useStore } from '@/store/useStore';

export const Header: React.FC = () => {
  const {
    cart,
    setIsCartOpen,
    favorites,
    searchQuery,
    setSearchQuery,
    openInfoModal,
    openWhatsAppLead,
    setSelectedCategory,
  } = useStore();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const el = document.getElementById('novidades-section');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-neutral-200 sticky top-0 z-40 shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
      {/* Main Header Container */}
      <div className="w-full px-4 sm:px-8 lg:px-12 2xl:px-16 py-3 sm:py-3.5">
        <div className="flex items-center justify-between gap-3 sm:gap-6">
          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-neutral-900 hover:text-black rounded-xl hover:bg-neutral-100 transition-colors focus:outline-none"
            aria-label="Abrir menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Official Brand Logo */}
          <div className="flex-1 md:flex-initial flex justify-center md:justify-start">
            <BrandLogo size="md" />
          </div>

          {/* Desktop Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex flex-1 max-w-lg lg:max-w-xl mx-4 lg:mx-8 relative"
          >
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar vestidos, conjuntos, calças plus size..."
                className="w-full pl-5 pr-16 py-2.5 rounded-full border border-neutral-300 text-xs sm:text-sm focus:outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition-all bg-neutral-50 hover:bg-white placeholder-neutral-400"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-11 top-1/2 -translate-y-1/2 p-1 text-neutral-400 hover:text-black transition-colors"
                  title="Limpar busca"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black hover:bg-neutral-800 text-white flex items-center justify-center transition-all shadow-xs"
                title="Pesquisar"
              >
                <Search className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>

          {/* Right Action Icons & Badges */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Direct WhatsApp VIP Button (Desktop) */}
            <button
              onClick={() =>
                openWhatsAppLead(
                  'Olá! Gostaria de consultar os looks do catálogo virtual da MIIXXIIE em Manaus. 🌸',
                  'header_cta'
                )
              }
              className="hidden lg:flex items-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold px-4 py-2.5 rounded-full transition-all shadow-xs hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white" />
              <span>Chamar no WhatsApp</span>
            </button>

            {/* Favorites Icon with Counter */}
            <button
              onClick={() => {
                const el = document.getElementById('novidades-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="relative p-2 rounded-xl hover:bg-neutral-100 text-neutral-700 hover:text-black transition-colors"
              title="Ver Peças Favoritas"
            >
              <Heart className="w-5 h-5" />
              {favorites.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-black text-white text-[9px] font-bold flex items-center justify-center shadow-xs">
                  {favorites.length}
                </span>
              )}
            </button>

            {/* Shopping Cart Bag with Counter */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-900 transition-colors focus:outline-none flex items-center gap-2"
              aria-label="Abrir Sacola de Compras"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 min-w-4 h-4 px-1 rounded-full bg-black text-white text-[9px] font-bold flex items-center justify-center shadow-xs">
                    {cartItemsCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline text-xs font-bold text-neutral-900">
                Sacola
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar (Directly accessible below logo) */}
        <form onSubmit={handleSearchSubmit} className="mt-2.5 md:hidden">
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar vestidos, conjuntos, calças..."
              className="w-full pl-4 pr-16 py-2 rounded-full border border-neutral-300 text-xs focus:outline-none focus:border-black bg-neutral-50"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-9 top-1/2 -translate-y-1/2 p-1 text-neutral-400 hover:text-black transition-colors"
                title="Limpar busca"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              type="submit"
              className="absolute right-1 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black text-white flex items-center justify-center shadow-xs"
              title="Pesquisar"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-neutral-200 px-4 py-4 space-y-3 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="space-y-1 text-sm font-semibold text-neutral-800">
            <Link
              href="/"
              onClick={() => {
                setSelectedCategory(null);
                setIsMobileMenuOpen(false);
              }}
              className="block px-3 py-2.5 rounded-xl bg-black text-white font-bold"
            >
              Início
            </Link>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                const el = document.getElementById('novidades-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full text-left px-3 py-2.5 rounded-xl text-neutral-800 hover:bg-neutral-100"
            >
              Novidades da Semana
            </button>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                const el = document.getElementById('mais-vendidos-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full text-left px-3 py-2.5 rounded-xl text-neutral-800 hover:bg-neutral-100"
            >
              Mais Vendidos Manaus
            </button>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                openInfoModal(
                  'Atendimento Manaus',
                  'Nossa equipe atende de segunda a sábado das 08h às 18h via WhatsApp pelos números (92) 98613-7969 (Maria) e (92) 98606-4005 (Carlos).'
                );
              }}
              className="w-full text-left px-3 py-2.5 rounded-xl text-neutral-800 hover:bg-neutral-100"
            >
              Fale Conosco
            </button>
          </div>

          <div className="pt-2 border-t border-neutral-100">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                openWhatsAppLead(
                  'Olá! Gostaria de falar com uma consultora da MIIXXIIE em Manaus.',
                  'mobile_menu'
                );
              }}
              className="w-full py-3 rounded-xl bg-[#25D366] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Chamar Consultora no WhatsApp</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
