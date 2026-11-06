'use client';

import React from 'react';
import Link from 'next/link';
import { Home, Sparkles, Flame, Crown } from 'lucide-react';
import { CATEGORIES } from '@/data/mockData';
import { useStore } from '@/store/useStore';

export const Navbar: React.FC = () => {
  const { selectedCategory, setSelectedCategory } = useStore();

  const handleSelect = (slug: string | null) => {
    setSelectedCategory(slug);
    const el = document.getElementById('novidades-section');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Todas as Peças', slug: null },
    { label: 'Vestidos', slug: 'vestidos' },
    { label: 'Conjuntos', slug: 'conjuntos' },
    { label: 'Calças', slug: 'calcas' },
    { label: 'Camisas & Blusas', slug: 'camisas' },
    { label: 'Bermudas & Shorts', slug: 'bermudas' },
    { label: 'Coleção Festa', slug: 'festa' },
  ];

  return (
    <nav className="hidden md:block bg-white border-b border-neutral-200/80 py-2 px-4 sm:px-8 lg:px-12 2xl:px-16">
      <div className="w-full flex items-center justify-between">
        {/* Navigation Category Links */}
        <div className="flex items-center gap-1 lg:gap-2 overflow-x-auto no-scrollbar">
          {navLinks.map((link, idx) => {
            const isSelected = selectedCategory === link.slug;

            return (
              <button
                key={idx}
                onClick={() => handleSelect(link.slug)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                  isSelected
                    ? 'bg-black text-white shadow-xs'
                    : 'text-neutral-600 hover:text-black hover:bg-neutral-100'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </div>

        {/* Right Badge: Manaus Fast Delivery */}
        <div className="hidden xl:flex items-center gap-2 text-[11px] text-neutral-500 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span>Showroom & Atendimento em Manaus - AM</span>
        </div>
      </div>
    </nav>
  );
};
