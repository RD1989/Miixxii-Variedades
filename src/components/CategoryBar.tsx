'use client';

import React from 'react';
import Image from 'next/image';
import { CATEGORIES } from '@/data/mockData';
import { useStore } from '@/store/useStore';
import { X, Sparkles } from 'lucide-react';

export const CategoryBar: React.FC = () => {
  const { selectedCategory, setSelectedCategory } = useStore();

  const handleCategoryClick = (slug: string) => {
    if (selectedCategory === slug) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(slug);
    }
    const el = document.getElementById('novidades-section');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="w-full px-4 sm:px-8 lg:px-12 2xl:px-16 pt-5 pb-2 sm:pt-8 sm:pb-3">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-neutral-900">
          Categorias
        </h2>
        {selectedCategory && (
          <button
            onClick={() => setSelectedCategory(null)}
            className="text-[11px] sm:text-xs text-neutral-500 hover:text-black font-semibold flex items-center gap-1 underline transition-colors"
          >
            Ver todas
          </button>
        )}
      </div>

      {/* Horizontal Scrollable Categories Strip */}
      <div className="flex items-center gap-3 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth py-2 px-1">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.slug;

          return (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.slug)}
              className="group flex flex-col items-center gap-2 shrink-0 transition-transform duration-200 hover:-translate-y-1 focus:outline-none"
            >
              {/* Circular Avatar */}
              <div
                className={`relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full overflow-hidden transition-all duration-300 p-0.5 ${
                  isSelected
                    ? 'ring-3 ring-black shadow-lg scale-105 bg-black'
                    : 'border border-neutral-300/80 group-hover:border-black group-hover:shadow-md bg-neutral-100'
                }`}
              >
                <div className="relative w-full h-full rounded-full overflow-hidden bg-neutral-100">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 640px) 70px, 96px"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              </div>

              {/* Category Label */}
              <span
                className={`text-[11px] sm:text-xs font-semibold transition-colors text-center ${
                  isSelected
                    ? 'text-black font-extrabold underline underline-offset-4'
                    : 'text-neutral-700 group-hover:text-black'
                }`}
              >
                {cat.name}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
