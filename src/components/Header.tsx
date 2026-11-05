'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, ShoppingBag, User, LayoutDashboard, Menu, X, Heart } from 'lucide-react';
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
    <header className="bg-white/95 backdrop-blur-md border-b border-neutral-200 sticky top-0 z-40 shadow-sm">
      {/* Main Header Container */}
      <div className="w-full px-4 sm:px-8 lg:px-12 2xl:px-16 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-neutral-900 hover:text-black rounded-lg transition-colors focus:outline-none"
            aria-label="Abrir menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Official Logo */}
          <div className="flex-1 md:flex-initial flex justify-center md:justify-start">
            <BrandLogo size="md" />
          </div>

          {/* Desktop Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex flex-1 max-w-xl mx-6 relative"
          >
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="O que você procura? (ex: vestido, pantalona, conjunto)"
                className="w-full pl-5 pr-12 py-2.5 rounded-full border border-neutral-300 text-sm focus:outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition-all bg-neutral-50/70 hover:bg-white"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black hover:bg-neutral-800 text-white flex items-center justify-center transition-all shadow-sm"
                title="Pesquisar"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Right Action Icons & Badges */}
          <div className="flex items-center gap-3 sm:gap-5">
            {/* Admin Dashboard Direct Shortcut */}
            <Link
              href="/admin"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 transition-colors"
              title="Acessar Painel de Gestão"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-neutral-900" />
              <span>Painel Admin</span>
            </Link>

            {/* My Account */}
            <button
              onClick={() =>
                openInfoModal(
                  'Minha Conta',
                  'Área do cliente para acompanhar seus pedidos via WhatsApp, endereços em Manaus e histórico de compras.'
                )
              }
              className="hidden sm:flex items-center gap-2 text-xs font-medium text-neutral-700 hover:text-black transition-colors group"
            >
              <div className="w-8 h-8 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                <User className="w-4 h-4" />
              </div>
              <div className="text-left hidden lg:block leading-tight">
                <span className="block text-[10px] text-neutral-500 font-normal">Minha Conta</span>
                <span className="font-semibold text-neutral-900">Entrar ou Cadastrar</span>
              </div>
            </button>

            {/* Favorites Icon with Counter */}
            <button
              onClick={() => {
                const el = document.getElementById('novidades-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="relative p-2 text-neutral-700 hover:text-black transition-colors hidden sm:block"
              title="Ver Favoritos"
            >
              <Heart className="w-5 h-5" />
              {favorites.length > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-black text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
                  {favorites.length}
                </span>
              )}
            </button>

            {/* Shopping Cart Bag with Counter */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-neutral-900 hover:text-black transition-colors focus:outline-none"
              aria-label="Abrir Sacola de Compras"
            >
              <div className="relative">
                <ShoppingBag className="w-6 h-6" />
                <span className="absolute -top-1.5 -right-2 min-w-5 h-5 px-1 rounded-full bg-black text-white text-xs font-bold flex items-center justify-center shadow-sm ring-2 ring-white">
                  {cartItemsCount}
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar (Below Header Line) */}
        <form onSubmit={handleSearchSubmit} className="mt-2.5 md:hidden">
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="O que você procura?"
              className="w-full pl-4 pr-11 py-2 rounded-full border border-neutral-300 text-xs sm:text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black bg-neutral-50"
            />
            <button
              type="submit"
              className="absolute right-1 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black text-white flex items-center justify-center shadow-sm"
              title="Pesquisar"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-neutral-200 px-4 py-3 space-y-2 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <Link
            href="/"
            onClick={() => {
              setSelectedCategory(null);
              setIsMobileMenuOpen(false);
            }}
            className="block px-3 py-2 rounded-lg text-sm font-bold text-white bg-black"
          >
            Início
          </Link>
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              const el = document.getElementById('novidades-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm text-neutral-800 hover:bg-neutral-100"
          >
            Novidades & Ofertas
          </button>
          <Link
            href="/admin"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-neutral-900 font-semibold bg-neutral-100"
          >
            <span>Painel Administrativo</span>
            <LayoutDashboard className="w-4 h-4 text-neutral-900" />
          </Link>
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              openInfoModal(
                'Sobre a MIIXXIIE Variedades',
                'Nossa loja física e digital em Manaus é especializada em moda feminina plus size do tamanho G ao G3, valorizando cada curva com tecidos nobres, conforto e autoestima.'
              );
            }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm text-neutral-800 hover:bg-neutral-100"
          >
            Quem Somos
          </button>
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              openInfoModal(
                'Fale Conosco',
                'Atendimento em Manaus pelo WhatsApp (92) 99999-9999. Horário comercial de segunda a sábado das 08h às 18h.'
              );
            }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm text-neutral-800 hover:bg-neutral-100"
          >
            Fale Conosco
          </button>
        </div>
      )}
    </header>
  );
};
