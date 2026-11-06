'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Heart,
  MessageCircle,
  ArrowRight,
  Star,
  Sparkles,
  Flame,
  Crown,
  Truck,
  Store,
  Tag,
  Check,
} from 'lucide-react';
import { Product, formatCurrencyBRL } from '@/data/mockData';
import { useStore } from '@/store/useStore';

export const ProductGrid: React.FC = () => {
  const {
    products,
    openDetail,
    favorites,
    toggleFavorite,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    openWhatsAppModal,
  } = useStore();

  // Active hover/preview color image per product card
  const [cardImagePreview, setCardImagePreview] = useState<Record<string, string>>({});

  // Filter products by category and search
  const filteredProducts = products.filter((product) => {
    if (product.isActive === false) return false;
    const matchesCategory = selectedCategory
      ? product.category === selectedCategory ||
        product.subcategory.toLowerCase().includes(selectedCategory.toLowerCase())
      : true;
    const matchesSearch = searchQuery
      ? product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.subcategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.material?.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesCategory && matchesSearch;
  });

  const isFiltering = selectedCategory !== null || searchQuery.trim().length > 0;

  const novidadesProducts = filteredProducts.filter(
    (p) => p.section === 'novidades' || !p.section
  );
  const maisVendidosProducts = filteredProducts.filter(
    (p) => p.section === 'mais-vendidos'
  );
  const festaProducts = filteredProducts.filter(
    (p) => p.section === 'colecao-festa'
  );

  const handleColorSwatchClick = (e: React.MouseEvent, productId: string, imgUrl?: string) => {
    e.stopPropagation();
    if (imgUrl) {
      setCardImagePreview((prev) => ({ ...prev, [productId]: imgUrl }));
    }
  };

  const renderProductCard = (product: Product) => {
    const isFav = favorites.includes(product.id);
    const displayedImage = cardImagePreview[product.id] || product.image;

    return (
      <div
        key={product.id}
        className="group bg-white rounded-2xl border border-neutral-200/80 overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-xl hover:border-black transition-all duration-300 hover:-translate-y-1"
      >
        {/* Image Area with Badge & Wishlist */}
        <div
          onClick={() => openDetail(product)}
          className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100 cursor-pointer"
        >
          <Image
            src={displayedImage}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1536px) 25vw, 16vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />

          {/* Status Badge */}
          <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1 items-start">
            {product.badge && (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-black text-white uppercase tracking-wider shadow-xs">
                {product.badge}
              </span>
            )}
          </div>

          {/* Wishlist Heart Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(product.id);
            }}
            className="absolute top-2.5 right-2.5 z-10 w-7 h-7 rounded-full bg-white/90 hover:bg-white text-neutral-400 hover:text-black flex items-center justify-center transition-all shadow-xs hover:scale-110 active:scale-95"
            aria-label="Adicionar aos favoritos"
          >
            <Heart
              className={`w-3.5 h-3.5 ${
                isFav ? 'fill-black text-black' : 'stroke-current'
              }`}
            />
          </button>
        </div>

        {/* Product Details */}
        <div className="p-3 sm:p-3.5 flex flex-col flex-1 justify-between gap-2">
          <div
            onClick={() => openDetail(product)}
            className="cursor-pointer space-y-1"
          >
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
              {product.subcategory}
            </span>

            <h3 className="font-bold text-xs sm:text-sm text-neutral-900 line-clamp-1 group-hover:text-black transition-colors">
              {product.name}
            </h3>

            {/* Price Area */}
            <div className="flex items-baseline gap-2 pt-0.5">
              <span className="text-sm sm:text-base font-black text-neutral-900">
                {formatCurrencyBRL(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-[11px] text-neutral-400 line-through">
                  {formatCurrencyBRL(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Combo Notice if present */}
            {product.comboOffer && (
              <div className="inline-flex items-center gap-1 text-[9px] font-bold text-neutral-800 bg-neutral-100 px-2 py-0.5 rounded-md mt-1">
                <Tag className="w-2.5 h-2.5 text-neutral-600" />
                <span className="truncate">{product.comboOffer}</span>
              </div>
            )}

            {/* Interactive Color Dots Preview */}
            {product.colors && product.colors.length > 0 && (
              <div className="flex items-center gap-1 pt-1.5">
                <span className="text-[10px] text-neutral-400 mr-0.5">Cores:</span>
                <div className="flex items-center gap-1">
                  {product.colors.slice(0, 4).map((c, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => handleColorSwatchClick(e, product.id, c.image)}
                      style={{ backgroundColor: c.hex }}
                      className="w-3 h-3 rounded-full border border-neutral-300 hover:scale-125 transition-transform"
                      title={c.name}
                    />
                  ))}
                  {product.colors.length > 4 && (
                    <span className="text-[9px] text-neutral-400 font-medium">
                      +{product.colors.length - 4}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Action Button */}
          <button
            onClick={() => openDetail(product)}
            className="w-full mt-2 flex items-center justify-center gap-1.5 bg-black hover:bg-neutral-800 text-white text-[11px] sm:text-xs font-bold py-2.5 px-3 rounded-xl shadow-xs transition-all hover:scale-[1.01] active:scale-[0.99]"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-white shrink-0" />
            <span className="truncate">Pedir no WhatsApp</span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full px-4 sm:px-8 lg:px-12 2xl:px-16 py-8 sm:py-12 space-y-16">
      {/* Search or Category Filter Active View */}
      {isFiltering ? (
        <section id="novidades-section">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-400 block mb-1">
                Catálogo Filtrado
              </span>
              <h2 className="font-script text-3xl sm:text-4xl lg:text-5xl font-bold text-black">
                Resultados da Busca
              </h2>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                {selectedCategory && (
                  <span className="text-xs bg-black text-white px-3 py-1 rounded-full font-bold">
                    Categoria: {selectedCategory.toUpperCase()}
                  </span>
                )}
                {searchQuery && (
                  <span className="text-xs bg-neutral-200 text-black px-3 py-1 rounded-full font-bold">
                    Busca: &ldquo;{searchQuery}&rdquo;
                  </span>
                )}
                <button
                  onClick={() => {
                    setSelectedCategory(null);
                  }}
                  className="text-xs text-neutral-600 hover:text-black underline font-semibold ml-2"
                >
                  Limpar Filtros e Ver Todos ({products.length} peças)
                </button>
              </div>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-neutral-200 max-w-md mx-auto shadow-xs space-y-3">
              <p className="text-neutral-700 font-medium text-sm">
                Nenhum produto encontrado com os filtros atuais.
              </p>
              <button
                onClick={() => setSelectedCategory(null)}
                className="px-6 py-2.5 rounded-full bg-black text-white text-xs font-bold shadow-xs hover:bg-neutral-800 transition-colors"
              >
                Ver Todas as Coleções
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 2xl:grid-cols-6 gap-3 sm:gap-4 md:gap-5">
              {filteredProducts.map(renderProductCard)}
            </div>
          )}
        </section>
      ) : (
        <>
          {/* SEÇÃO 1: NOVIDADES & LANÇAMENTOS */}
          <section id="novidades-section">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-400 block mb-1">
                  Coleção Manaus 2026
                </span>
                <div className="flex items-center gap-2">
                  <h2 className="font-script text-3xl sm:text-4xl lg:text-5xl font-bold text-black leading-tight">
                    Novidades da Semana
                  </h2>
                  <Sparkles className="w-5 h-5 text-neutral-800" />
                </div>
                <p className="text-neutral-600 text-xs sm:text-sm mt-1">
                  Peças reais exclusivas direto do nosso mostruário oficial de Manaus!
                </p>
              </div>

              <button
                onClick={() => setSelectedCategory(null)}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-black hover:text-neutral-600 transition-colors group self-start sm:self-auto"
              >
                <span>Ver todo o mostruário ({products.length})</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 2xl:grid-cols-6 gap-3 sm:gap-4 md:gap-5">
              {novidadesProducts.map(renderProductCard)}
            </div>
          </section>

          {/* BANNER INTERMEDIÁRIO DE MANAUS — LOCAL SHIPPING & PICKUP */}
          <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0C0C0E] via-[#17171A] to-[#0C0C0E] text-white p-6 sm:p-10 shadow-xl border border-neutral-800">
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left">
              <div className="space-y-2 max-w-2xl">
                <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold uppercase tracking-wider text-neutral-200 border border-white/15">
                  📍 Atendimento Exclusivo em Manaus - AM
                </span>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight leading-tight">
                  Entregas em Toda a Capital via Motoboy
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  Frete calculado conforme a distância do seu bairro ou retirada gratuita com agendamento na nossa loja física. Atendimento rápido e atencioso via WhatsApp.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/20 text-xs">
                  <Store className="w-5 h-5 text-neutral-300" />
                  <div className="text-left">
                    <span className="block font-bold text-white">Retirada na Loja</span>
                    <span className="text-[10px] text-neutral-300">Grátis em Manaus</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/20 text-xs">
                  <Truck className="w-5 h-5 text-neutral-300" />
                  <div className="text-left">
                    <span className="block font-bold text-white">Motoboy Express</span>
                    <span className="text-[10px] text-neutral-300">Frete por Bairro</span>
                  </div>
                </div>

                <button
                  onClick={openWhatsAppModal}
                  className="flex items-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-extrabold text-xs sm:text-sm px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Chamar no WhatsApp</span>
                </button>
              </div>
            </div>
          </section>

          {/* SEÇÃO 2: MAIS VENDIDOS & DESTAQUES DE MANAUS */}
          <section id="mais-vendidos-section">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-400 block mb-1">
                  Favoritos das Clientes
                </span>
                <div className="flex items-center gap-2">
                  <h2 className="font-script text-3xl sm:text-4xl lg:text-5xl font-bold text-black leading-tight">
                    Mais Vendidos
                  </h2>
                  <Flame className="w-5 h-5 text-neutral-800" />
                </div>
                <p className="text-neutral-600 text-xs sm:text-sm mt-1">
                  Os queridinhos e campeões de elogios das nossas clientes em Manaus!
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs bg-neutral-100 text-neutral-900 px-3 py-1 rounded-full font-bold border border-neutral-200 flex items-center gap-1 shadow-2xs">
                  <Star className="w-3.5 h-3.5 fill-black text-black" />
                  Avaliação Média 4.9 ★★★★★
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 2xl:grid-cols-6 gap-3 sm:gap-4 md:gap-5">
              {maisVendidosProducts.map(renderProductCard)}
            </div>
          </section>

          {/* SEÇÃO 3: COLEÇÃO FESTA & NOITE */}
          <section id="festa-section">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-400 block mb-1">
                  Moda Festa Plus Size
                </span>
                <div className="flex items-center gap-2">
                  <h2 className="font-script text-3xl sm:text-4xl lg:text-5xl font-bold text-black leading-tight">
                    Coleção Festa & Noite
                  </h2>
                  <Crown className="w-5 h-5 text-neutral-800" />
                </div>
                <p className="text-neutral-600 text-xs sm:text-sm mt-1">
                  Brilho, glamour e sofisticação em modelagens que valorizam cada curva.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs bg-black text-white px-3 py-1 rounded-full font-bold">
                  Alta Costura Plus Size
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 2xl:grid-cols-6 gap-3 sm:gap-4 md:gap-5">
              {festaProducts.map(renderProductCard)}
            </div>
          </section>
        </>
      )}
    </div>
  );
};
