'use client';

import React from 'react';
import { Home, Grid, Heart, ShoppingBag, MessageCircle } from 'lucide-react';
import { useStore } from '@/store/useStore';

export const BottomNav: React.FC = () => {
  const {
    favorites,
    cart,
    setIsCartOpen,
    setSelectedCategory,
    openWhatsAppLead,
  } = useStore();

  const cartCount = cart.reduce((a, b) => a + b.quantity, 0);

  const scrollToTop = () => {
    setSelectedCategory(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToCategories = () => {
    const el = document.getElementById('novidades-section');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-neutral-200 py-2 px-3 shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
      <div className="flex items-center justify-around">
        {/* Início */}
        <button
          onClick={scrollToTop}
          className="flex flex-col items-center gap-1 text-black focus:outline-none py-1"
        >
          <Home className="w-5 h-5 fill-current" />
          <span className="text-[10px] font-bold">Início</span>
        </button>

        {/* Categorias */}
        <button
          onClick={scrollToCategories}
          className="flex flex-col items-center gap-1 text-neutral-500 hover:text-black transition-colors focus:outline-none py-1"
        >
          <Grid className="w-5 h-5" />
          <span className="text-[10px] font-medium">Catálogo</span>
        </button>

        {/* Floating WhatsApp Quick Action Button */}
        <button
          onClick={() =>
            openWhatsAppLead(
              'Olá! Gostaria de atendimento de vendas na MIIXXIIE Variedades em Manaus. 🌸',
              'bottom_nav'
            )
          }
          className="flex flex-col items-center -mt-5 focus:outline-none group"
          title="Falar no WhatsApp com Consultora"
        >
          <div className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg group-hover:scale-105 active:scale-95 transition-transform border-2 border-white">
            <MessageCircle className="w-6 h-6 fill-white" />
          </div>
          <span className="text-[10px] font-bold text-[#25D366] mt-0.5">WhatsApp</span>
        </button>

        {/* Favoritos */}
        <button
          onClick={scrollToCategories}
          className="relative flex flex-col items-center gap-1 text-neutral-500 hover:text-black transition-colors focus:outline-none py-1"
        >
          <div className="relative">
            <Heart className="w-5 h-5" />
            {favorites.length > 0 && (
              <span className="absolute -top-1 -right-2 w-3.5 h-3.5 rounded-full bg-black text-white text-[9px] font-bold flex items-center justify-center shadow-xs">
                {favorites.length}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium">Favoritos</span>
        </button>

        {/* Sacola / Carrinho */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex flex-col items-center gap-1 text-neutral-500 hover:text-black transition-colors focus:outline-none py-1"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 w-3.5 h-3.5 rounded-full bg-black text-white text-[9px] font-bold flex items-center justify-center shadow-xs">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium">Sacola</span>
        </button>
      </div>
    </nav>
  );
};
