'use client';

import React from 'react';
import Image from 'next/image';
import { CATEGORIES } from '@/data/mockData';
import { useStore } from '@/store/useStore';

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
    <section className="w-full px-3 sm:px-6 lg:px-10 2xl:px-12 py-6 sm:py-8">
      <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-sm border border-[#F3D6E2]">
        {/* Horizontal Container: 8 items */}
        <div className="flex items-center justify-between gap-3 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth py-2 px-2">
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
                      ? 'ring-4 ring-[#C8105D] shadow-lg scale-105'
                      : 'border-2 border-[#F3D6E2] group-hover:border-[#C8105D] group-hover:shadow-md'
                  }`}
                >
                  <div className="relative w-full h-full rounded-full overflow-hidden bg-pink-50">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      sizes="(max-width: 640px) 80px, 100px"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </div>

                {/* Category Label */}
                <span
                  className={`text-xs sm:text-sm font-semibold transition-colors text-center ${
                    isSelected
                      ? 'text-[#C8105D] font-bold'
                      : 'text-gray-700 group-hover:text-[#C8105D]'
                  }`}
                >
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
