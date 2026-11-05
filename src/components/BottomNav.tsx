'use client';

import React from 'react';
import Link from 'next/link';
import { Home, Grid, Heart, ShoppingBag, LayoutDashboard } from 'lucide-react';
import { useStore } from '@/store/useStore';

export const BottomNav: React.FC = () => {
  const {
    favorites,
    cart,
    setIsCartOpen,
    setSelectedCategory,
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
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-neutral-200 py-2.5 px-3 shadow-lg">
      <div className="flex items-center justify-around">
        {/* Início */}
        <button
          onClick={scrollToTop}
          className="flex flex-col items-center gap-1 text-black focus:outline-none"
        >
          <Home className="w-5 h-5 fill-current" />
          <span className="text-[10px] font-extrabold">Início</span>
        </button>

        {/* Categorias */}
        <button
          onClick={scrollToCategories}
          className="flex flex-col items-center gap-1 text-neutral-400 hover:text-black transition-colors focus:outline-none"
        >
          <Grid className="w-5 h-5" />
          <span className="text-[10px] font-medium">Categorias</span>
        </button>

        {/* Favoritos */}
        <button
          onClick={scrollToCategories}
          className="relative flex flex-col items-center gap-1 text-neutral-400 hover:text-black transition-colors focus:outline-none"
        >
          <div className="relative">
            <Heart className="w-5 h-5" />
            {favorites.length > 0 && (
              <span className="absolute -top-1 -right-2 w-3.5 h-3.5 rounded-full bg-black text-white text-[9px] font-bold flex items-center justify-center shadow-sm">
                {favorites.length}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium">Favoritos</span>
        </button>

        {/* Carrinho */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex flex-col items-center gap-1 text-neutral-400 hover:text-black transition-colors focus:outline-none"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute -top-1 -right-2 w-3.5 h-3.5 rounded-full bg-black text-white text-[9px] font-bold flex items-center justify-center shadow-sm">
              {cartCount}
            </span>
          </div>
          <span className="text-[10px] font-medium">Sacola</span>
        </button>

        {/* Admin */}
        <Link
          href="/admin"
          className="flex flex-col items-center gap-1 text-neutral-400 hover:text-black transition-colors focus:outline-none"
        >
          <LayoutDashboard className="w-5 h-5" />
          <span className="text-[10px] font-medium">Admin</span>
        </Link>
      </div>
    </nav>
  );
};
