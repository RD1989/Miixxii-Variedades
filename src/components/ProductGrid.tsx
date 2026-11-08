'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Heart,
  Star,
  Sparkles,
  Flame,
  Crown,
  Tag,
  X,
  SlidersHorizontal,
} from 'lucide-react';
import { Product, formatCurrencyBRL, CATEGORIES } from '@/data/mockData';
import { useStore } from '@/store/useStore';

type SectionTab = 'todos' | 'novidades' | 'mais-vendidos' | 'colecao-festa';

export const ProductGrid: React.FC = () => {
  const {
    products,
    openDetail,
    favorites,
    toggleFavorite,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
  } = useStore();

  const [activeTab, setActiveTab] = useState<SectionTab>('todos');
  const [cardImagePreview, setCardImagePreview] = useState<Record<string, string>>({});

  // Color swatch interaction
  const handleColorSwatchClick = (
    e: React.MouseEvent,
    productId: string,
    colorImg?: string
  ) => {
    e.stopPropagation();
    if (colorImg) {
      setCardImagePreview((prev) => ({ ...prev, [productId]: colorImg }));
    }
  };

  // Filter products by section, category and search
  const filteredProducts = products.filter((product) => {
    if (product.isActive === false) return false;

    // Tab filter
    if (activeTab === 'novidades' && product.section !== 'novidades') return false;
    if (activeTab === 'mais-vendidos' && product.section !== 'mais-vendidos') return false;
    if (activeTab === 'colecao-festa' && product.section !== 'colecao-festa') return false;

    // Category filter
    const matchesCategory = selectedCategory
      ? product.category === selectedCategory ||
        product.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        product.subcategory.toLowerCase().includes(selectedCategory.toLowerCase())
      : true;

    // Search query filter
    const matchesSearch = searchQuery
      ? product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.subcategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.material?.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    return matchesCategory && matchesSearch;
  });

  const selectedCategoryObj = CATEGORIES.find((c) => c.slug === selectedCategory);

  // Render a clean, minimalist, high-end fashion card
  const renderProductCard = (product: Product) => {
    const isFav = favorites.includes(product.id);
    const displayedImage = cardImagePreview[product.id] || product.image;

    return (
      <div
        key={product.id}
        onClick={() => openDetail(product)}
        className="group relative bg-white rounded-2xl overflow-hidden border border-neutral-200/70 hover:border-black transition-all duration-300 hover:shadow-xl cursor-pointer flex flex-col justify-between"
      >
        {/* Photo Container */}
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F5F5F7]">
          <Image
            src={displayedImage}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1536px) 25vw, 20vw"
            className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
          />

          {/* Badge (Discreet, high-end) */}
          {product.badge && (
            <div className="absolute top-2 left-2 z-10">
              <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-black text-white uppercase tracking-wider shadow-xs">
                {product.badge}
              </span>
            </div>
          )}

          {/* Wishlist Heart */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(product.id);
            }}
            className="absolute top-2 right-2 z-10 w-7 h-7 rounded-full bg-white/90 hover:bg-white text-neutral-400 hover:text-black flex items-center justify-center transition-all shadow-xs active:scale-90"
            aria-label="Favoritar look"
          >
            <Heart
              className={`w-3.5 h-3.5 ${
                isFav ? 'fill-black text-black' : 'stroke-current'
              }`}
            />
          </button>
        </div>

        {/* Minimalist Card Content */}
        <div className="p-3 sm:p-3.5 flex flex-col justify-between gap-1 flex-1">
          <div className="space-y-0.5">
            <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-neutral-400 block truncate">
              {product.subcategory}
            </span>

            <h3 className="font-semibold text-xs sm:text-sm text-neutral-900 line-clamp-1 group-hover:text-black transition-colors">
              {product.name}
            </h3>

            {/* Price Row */}
            <div className="flex items-baseline gap-1.5 pt-0.5">
              <span className="text-xs sm:text-sm font-extrabold text-neutral-900">
                {formatCurrencyBRL(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-[10px] sm:text-[11px] text-neutral-400 line-through">
                  {formatCurrencyBRL(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Combo tag if available */}
            {product.comboOffer && (
              <div className="inline-flex items-center gap-1 text-[8px] sm:text-[9px] font-bold text-neutral-700 bg-neutral-100 px-1.5 py-0.5 rounded-md mt-0.5">
                <Tag className="w-2.5 h-2.5 text-neutral-500" />
                <span className="truncate">{product.comboOffer}</span>
              </div>
            )}
          </div>

          {/* Color Dots */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1 pt-1.5">
              {product.colors.slice(0, 5).map((c, idx) => (
                <button
                  key={idx}
                  onClick={(e) => handleColorSwatchClick(e, product.id, c.image)}
                  style={{ backgroundColor: c.hex }}
                  className="w-2.5 h-2.5 rounded-full border border-neutral-300/80 hover:scale-125 transition-transform"
                  title={c.name}
                />
              ))}
              {product.colors.length > 5 && (
                <span className="text-[8px] text-neutral-400 font-medium">
                  +{product.colors.length - 5}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <section id="novidades-section" className="w-full px-3 sm:px-8 lg:px-12 2xl:px-16 py-6 sm:py-10">
      {/* Clean Catalog Header & Filter Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-6 border-b border-neutral-200/80">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-900 tracking-tight">
              {selectedCategoryObj ? selectedCategoryObj.name : 'Catálogo de Looks'}
            </h2>
            <span className="text-xs font-semibold text-neutral-400 bg-neutral-100 px-2 py-0.5 rounded-full">
              {filteredProducts.length} peças
            </span>
          </div>

          {/* Active Category or Search Filter Tags */}
          {(selectedCategory || searchQuery) && (
            <div className="flex flex-wrap items-center gap-2 mt-2">
              {selectedCategory && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black text-white text-xs font-bold shadow-xs">
                  <span>{selectedCategoryObj?.name || selectedCategory}</span>
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="hover:text-neutral-300"
                    title="Remover filtro"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              )}

              {searchQuery && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-200 text-neutral-900 text-xs font-bold">
                  <span>Busca: &ldquo;{searchQuery}&rdquo;</span>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="hover:text-neutral-600"
                    title="Remover busca"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              )}

              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setSearchQuery('');
                  setActiveTab('todos');
                }}
                className="text-xs text-neutral-500 hover:text-black underline font-semibold ml-1"
              >
                Limpar todos os filtros
              </button>
            </div>
          )}
        </div>

        {/* Section Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {[
            { id: 'todos', label: 'Todos os Looks' },
            { id: 'novidades', label: 'Novidades da Semana' },
            { id: 'mais-vendidos', label: 'Mais Vendidos' },
            { id: 'colecao-festa', label: 'Coleção Festa' },
          ].map((tab) => {
            const isTabActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as SectionTab)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                  isTabActive
                    ? 'bg-black text-white shadow-xs'
                    : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Product Grid Area */}
      <div className="pt-6">
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border border-neutral-200 max-w-md mx-auto shadow-xs space-y-3">
            <p className="text-neutral-700 font-medium text-sm">
              Nenhuma peça encontrada para estes filtros.
            </p>
            <button
              onClick={() => {
                setSelectedCategory(null);
                setSearchQuery('');
                setActiveTab('todos');
              }}
              className="px-6 py-2.5 rounded-full bg-black text-white text-xs font-bold shadow-xs hover:bg-neutral-800 transition-colors"
            >
              Ver Todas as Peças
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-2.5 sm:gap-4 md:gap-5">
            {filteredProducts.map(renderProductCard)}
          </div>
        )}
      </div>
    </section>
  );
};
