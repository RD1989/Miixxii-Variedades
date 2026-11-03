'use client';

import React from 'react';
import Link from 'next/link';
import { Home, Grid, Heart, ShoppingBag, MoreHorizontal, LayoutDashboard } from 'lucide-react';
import { useStore } from '@/store/useStore';

export const BottomNav: React.FC = () => {
  const {
    favorites,
    cart,
    setIsCartOpen,
    setSelectedCategory,
    openInfoModal,
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
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#F3D6E2] py-2 px-3 shadow-[0_-4px_16px_rgba(200,16,93,0.06)]">
      <div className="flex items-center justify-around">
        {/* Início */}
        <button
          onClick={scrollToTop}
          className="flex flex-col items-center gap-1 text-[#C8105D] focus:outline-none"
        >
          <Home className="w-5 h-5 fill-current" />
          <span className="text-[10px] font-bold">Início</span>
        </button>

        {/* Categorias */}
        <button
          onClick={scrollToCategories}
          className="flex flex-col items-center gap-1 text-gray-500 hover:text-[#C8105D] transition-colors focus:outline-none"
        >
          <Grid className="w-5 h-5" />
          <span className="text-[10px] font-medium">Categorias</span>
        </button>

        {/* Favoritos */}
        <button
          onClick={scrollToCategories}
          className="relative flex flex-col items-center gap-1 text-gray-500 hover:text-[#C8105D] transition-colors focus:outline-none"
        >
          <div className="relative">
            <Heart className="w-5 h-5" />
            {favorites.length > 0 && (
              <span className="absolute -top-1 -right-2 w-3.5 h-3.5 rounded-full bg-[#C8105D] text-white text-[9px] font-bold flex items-center justify-center">
                {favorites.length}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium">Favoritos</span>
        </button>

        {/* Carrinho */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex flex-col items-center gap-1 text-gray-500 hover:text-[#C8105D] transition-colors focus:outline-none"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute -top-1 -right-2 w-3.5 h-3.5 rounded-full bg-[#C8105D] text-white text-[9px] font-bold flex items-center justify-center">
              {cartCount}
            </span>
          </div>
          <span className="text-[10px] font-medium">Sacola</span>
        </button>

        {/* Admin / Mais */}
        <Link
          href="/admin"
          className="flex flex-col items-center gap-1 text-gray-500 hover:text-[#6B0833] transition-colors focus:outline-none"
        >
          <LayoutDashboard className="w-5 h-5" />
          <span className="text-[10px] font-medium">Admin</span>
        </Link>
      </div>
    </nav>
  );
};
