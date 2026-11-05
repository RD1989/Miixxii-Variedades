'use client';

import React from 'react';
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
} from 'lucide-react';
import { PRODUCTS, Product, formatCurrencyBRL } from '@/data/mockData';
import { useStore } from '@/store/useStore';

export const ProductGrid: React.FC = () => {
  const {
    openDetail,
    favorites,
    toggleFavorite,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    openWhatsAppModal,
  } = useStore();

  // Filter products by category and search
  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory = selectedCategory
      ? product.category === selectedCategory
      : true;
    const matchesSearch = searchQuery
      ? product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesCategory && matchesSearch;
  });

  // Group into sections when not filtering
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

  const renderProductCard = (product: Product) => {
    const isFav = favorites.includes(product.id);

    return (
      <div
        key={product.id}
        className="group bg-white rounded-2xl border border-neutral-200 overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-black transition-all duration-300 hover:-translate-y-1.5"
      >
        {/* Image Area with Badges & Wishlist */}
        <div
          onClick={() => openDetail(product)}
          className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100 cursor-pointer"
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1536px) 16vw, 12vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />

          {/* Status Badge */}
          <div className="absolute top-2.5 left-2.5 z-10">
            {product.badge === 'Novo' && (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-black text-white uppercase tracking-wider shadow-sm">
                Novo
              </span>
            )}
            {product.badge === 'Oferta' && (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-neutral-800 text-white uppercase tracking-wider shadow-sm border border-neutral-700">
                Oferta
              </span>
            )}
            {product.badge === 'Destaque' && (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-neutral-900 text-white uppercase tracking-wider shadow-sm">
                Destaque
              </span>
            )}
            {product.badge === 'Festa' && (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-black text-white uppercase tracking-wider shadow-sm border border-neutral-700">
                Festa ✨
              </span>
            )}
          </div>

          {/* Wishlist Heart Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(product.id);
            }}
            className="absolute top-2.5 right-2.5 z-10 w-7 h-7 rounded-full bg-white/90 hover:bg-white text-neutral-400 hover:text-black flex items-center justify-center transition-all shadow-sm hover:scale-110 active:scale-95"
            aria-label="Adicionar aos favoritos"
          >
            <Heart
              className={`w-4 h-4 ${
                isFav ? 'fill-black text-black' : 'stroke-current'
              }`}
            />
          </button>
        </div>

        {/* Product Content Footer */}
        <div className="p-3 sm:p-4 flex flex-col flex-1 justify-between gap-2.5">
          <div
            onClick={() => openDetail(product)}
            className="cursor-pointer space-y-1"
          >
            <h3 className="font-semibold text-xs sm:text-sm text-neutral-900 line-clamp-1 group-hover:text-black transition-colors">
              {product.name}
            </h3>

            {/* Price Area */}
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <span className="text-sm sm:text-base font-bold text-neutral-900">
                {formatCurrencyBRL(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-[11px] text-neutral-400 line-through">
                  {formatCurrencyBRL(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Sizes Indicator */}
            <div className="flex items-center gap-1 text-[10px] text-neutral-500">
              <span>Grades:</span>
              <span className="font-semibold text-neutral-800">G ao G3</span>
            </div>
          </div>

          {/* WhatsApp Purchase Button with Smooth Green Transition */}
          <button
            onClick={() => openDetail(product)}
            className="w-full mt-1 flex items-center justify-center gap-1.5 bg-black hover:bg-[#25D366] text-white text-[11px] sm:text-xs font-bold py-2 px-3 rounded-full shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-white shrink-0" />
            <span className="truncate">Comprar pelo WhatsApp</span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full px-3 sm:px-6 lg:px-10 2xl:px-12 py-8 sm:py-12 space-y-16">
      {/* Search or Category Filter Active View */}
      {isFiltering ? (
        <section id="novidades-section">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="font-script text-4xl sm:text-5xl font-bold text-black">
                Resultados da Busca
              </h2>
              <div className="mt-2 flex items-center gap-2">
                {selectedCategory && (
                  <span className="text-xs bg-black text-white px-3 py-1 rounded-full font-bold">
                    Categoria: {selectedCategory.toUpperCase()}
                  </span>
                )}
                {searchQuery && (
                  <span className="text-xs bg-neutral-200 text-black px-3 py-1 rounded-full font-bold">
                    Termo: &ldquo;{searchQuery}&rdquo;
                  </span>
                )}
                <button
                  onClick={() => {
                    setSelectedCategory(null);
                  }}
                  className="text-xs text-neutral-600 hover:text-black underline font-semibold ml-2"
                >
                  Limpar Filtros e Ver Tudo
                </button>
              </div>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-neutral-200 max-w-md mx-auto shadow-sm">
              <p className="text-neutral-700 font-medium">
                Nenhum produto encontrado com os filtros atuais.
              </p>
              <button
                onClick={() => setSelectedCategory(null)}
                className="mt-4 px-6 py-2.5 rounded-full bg-black text-white text-xs font-bold shadow-md hover:bg-neutral-800 transition-colors"
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
          {/* SEÇÃO 1: NOVIDADES */}
          <section id="novidades-section">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-script text-4xl sm:text-5xl lg:text-6xl font-bold text-black leading-tight">
                    Novidades
                  </h2>
                  <Sparkles className="w-6 h-6 text-neutral-800" />
                </div>
                <p className="text-neutral-600 text-sm sm:text-base mt-1">
                  As últimas tendências da moda plus size para você arrasar!
                </p>
              </div>

              <button
                onClick={() => setSelectedCategory(null)}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-black hover:text-neutral-600 transition-colors group self-start sm:self-auto"
              >
                <span>Ver todas as novidades</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 2xl:grid-cols-6 gap-3 sm:gap-4 md:gap-5">
              {novidadesProducts.map(renderProductCard)}
            </div>
          </section>

          {/* BANNER INTERMEDIÁRIO DE MANAUS & ATENDIMENTO EXPRESS */}
          <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0C0C0E] via-[#17171A] to-[#0C0C0E] text-white p-6 sm:p-10 shadow-xl border border-neutral-800">
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left">
              <div className="space-y-2 max-w-2xl">
                <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-[11px] font-bold uppercase tracking-wider text-neutral-200 border border-white/15">
                  📍 Atendimento Exclusivo em Manaus
                </span>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight">
                  Entrega Rápida em Manaus em até 24 Horas!
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  Escolha suas peças, tire dúvidas sobre tamanhos e tecidos com nossas consultoras e receba no mesmo dia no conforto da sua casa.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/20 text-xs">
                  <Truck className="w-5 h-5 text-neutral-300" />
                  <div className="text-left">
                    <span className="block font-bold text-white">Frete Grátis</span>
                    <span className="text-[10px] text-neutral-300">Acima de R$ 199</span>
                  </div>
                </div>

                <button
                  onClick={openWhatsAppModal}
                  className="flex items-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-extrabold text-sm px-6 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Chamar no WhatsApp</span>
                </button>
              </div>
            </div>
          </section>

          {/* SEÇÃO 2: MAIS VENDIDOS & DESTAQUES DE MANAUS */}
          <section id="mais-vendidos-section">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-script text-4xl sm:text-5xl lg:text-6xl font-bold text-black leading-tight">
                    Mais Vendidos
                  </h2>
                  <Flame className="w-6 h-6 text-neutral-800" />
                </div>
                <p className="text-neutral-600 text-sm sm:text-base mt-1">
                  Os queridinhos e campeões de elogios das nossas clientes!
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs bg-neutral-100 text-neutral-900 px-3 py-1 rounded-full font-bold border border-neutral-300 flex items-center gap-1">
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
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-script text-4xl sm:text-5xl lg:text-6xl font-bold text-black leading-tight">
                    Coleção Festa & Noite
                  </h2>
                  <Crown className="w-6 h-6 text-neutral-800" />
                </div>
                <p className="text-neutral-600 text-sm sm:text-base mt-1">
                  Brilho, glamour e sofisticação em modelagens que valorizam cada curva.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs bg-black text-white px-3 py-1 rounded-full font-bold border border-neutral-800">
                  Edição Limitada
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
