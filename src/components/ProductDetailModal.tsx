'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, Star, Heart, ShoppingBag, Check, ShieldCheck, Truck, Store, Tag, MessageCircle } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { ColorOption, formatCurrencyBRL } from '@/data/mockData';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProduct,
    isDetailOpen,
    closeDetail,
    addToCart,
    favorites,
    toggleFavorite,
    openWhatsAppModal,
  } = useStore();

  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<ColorOption | null>(null);
  const [activeImage, setActiveImage] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (selectedProduct) {
      if (selectedProduct.sizes && selectedProduct.sizes.length > 0) {
        setSelectedSize(selectedProduct.sizes[0]);
      }
      if (selectedProduct.colors && selectedProduct.colors.length > 0) {
        setSelectedColor(selectedProduct.colors[0]);
        setActiveImage(selectedProduct.colors[0].image || selectedProduct.image);
      } else {
        setActiveImage(selectedProduct.image);
      }
      setQuantity(1);
    }
  }, [selectedProduct]);

  if (!isDetailOpen || !selectedProduct) return null;

  const isFav = favorites.includes(selectedProduct.id);

  const handleSelectColor = (color: ColorOption) => {
    setSelectedColor(color);
    if (color.image) {
      setActiveImage(color.image);
    }
  };

  const handleThumbnailClick = (imgUrl: string) => {
    setActiveImage(imgUrl);
    const matchingColor = selectedProduct.colors.find((c) => c.image === imgUrl);
    if (matchingColor) {
      setSelectedColor(matchingColor);
    }
  };

  const handleAddToCart = () => {
    if (!selectedColor) return;
    addToCart(selectedProduct, selectedSize, selectedColor, quantity);
    closeDetail();
  };

  // Stock for current size
  const currentSizeStock = selectedProduct.sizeStock?.[selectedSize] ?? 3;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Background Backdrop tap to close */}
      <div className="absolute inset-0" onClick={closeDetail} />

      <div
        className="relative w-full max-w-3xl bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden border border-neutral-200 max-h-[94vh] sm:max-h-[90vh] flex flex-col md:flex-row animate-in slide-in-from-bottom sm:slide-in-from-bottom-0 sm:zoom-in-95 duration-200 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Handle Bar */}
        <div className="sm:hidden w-12 h-1.5 bg-neutral-300 rounded-full mx-auto my-2 shrink-0" />

        {/* Close Button */}
        <button
          onClick={closeDetail}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-neutral-700 hover:text-black flex items-center justify-center shadow-md transition-all active:scale-95"
          aria-label="Fechar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Product Images & Gallery */}
        <div className="w-full md:w-1/2 flex flex-col bg-neutral-100 shrink-0">
          {/* Main Photo with Dynamic Color Switch */}
          <div className="relative aspect-[4/3] sm:aspect-[3/4] md:aspect-auto md:h-[420px] w-full overflow-hidden bg-neutral-200">
            <Image
              src={activeImage || selectedProduct.image}
              alt={selectedProduct.name}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-top transition-all duration-300"
            />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
              <span className="px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-bold bg-black text-white shadow-md uppercase tracking-wider">
                {selectedProduct.badge}
              </span>
              {selectedProduct.comboOffer && (
                <span className="px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold bg-neutral-900 text-amber-300 shadow-md border border-neutral-700">
                  {selectedProduct.comboOffer}
                </span>
              )}
            </div>

            {/* Wishlist toggle */}
            <button
              onClick={() => toggleFavorite(selectedProduct.id)}
              className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-neutral-500 hover:text-black flex items-center justify-center shadow-md transition-all active:scale-90"
              aria-label="Favoritar"
            >
              <Heart
                className={`w-5 h-5 ${
                  isFav ? 'fill-black text-black' : 'stroke-current'
                }`}
              />
            </button>
          </div>

          {/* Thumbnail Strip Gallery */}
          {selectedProduct.gallery && selectedProduct.gallery.length > 1 && (
            <div className="p-2 sm:p-2.5 bg-neutral-50 border-t border-neutral-200 flex items-center gap-2 overflow-x-auto no-scrollbar">
              {selectedProduct.gallery.map((imgUrl, idx) => {
                const isActive = activeImage === imgUrl;
                return (
                  <button
                    key={idx}
                    onClick={() => handleThumbnailClick(imgUrl)}
                    className={`relative w-11 sm:w-12 h-13 sm:h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                      isActive
                        ? 'border-black ring-1 ring-black scale-105 shadow-sm'
                        : 'border-transparent opacity-70 hover:opacity-100 hover:border-neutral-300'
                    }`}
                  >
                    <Image
                      src={imgUrl}
                      alt={`Foto ${idx + 1}`}
                      fill
                      sizes="48px"
                      className="object-cover object-top"
                    />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Right: Product Specs & Sticky Mobile Controls */}
        <div className="w-full md:w-1/2 flex flex-col justify-between overflow-y-auto max-h-[50vh] sm:max-h-[60vh] md:max-h-[550px]">
          {/* Scrollable details container */}
          <div className="p-4 sm:p-6 space-y-3.5 sm:space-y-4">
            {/* Category Subtitle & Title */}
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold tracking-widest uppercase text-neutral-800 bg-neutral-100 px-2.5 py-0.5 rounded-full border border-neutral-200">
                  {selectedProduct.subcategory}
                </span>
                <span className="text-[10px] font-medium text-neutral-500">
                  Manaus - AM
                </span>
              </div>

              <h2 className="text-lg sm:text-2xl font-bold text-neutral-900 mt-1 leading-snug">
                {selectedProduct.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-1.5 mt-1">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-bold text-neutral-900">
                  {selectedProduct.rating}
                </span>
                <span className="text-xs text-neutral-500">
                  ({selectedProduct.reviewsCount} avaliações)
                </span>
              </div>
            </div>

            {/* Price Area */}
            <div className="p-2.5 sm:p-3 rounded-2xl bg-neutral-50 border border-neutral-200 flex flex-col gap-1">
              <div className="flex items-baseline gap-2">
                <span className="text-xl sm:text-3xl font-extrabold text-black">
                  {formatCurrencyBRL(selectedProduct.price)}
                </span>
                {selectedProduct.originalPrice && (
                  <span className="text-xs sm:text-sm text-neutral-400 line-through">
                    {formatCurrencyBRL(selectedProduct.originalPrice)}
                  </span>
                )}
              </div>
              {selectedProduct.comboOffer && (
                <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-900">
                  <Tag className="w-3.5 h-3.5 text-neutral-700" />
                  <span>{selectedProduct.comboOffer}</span>
                </div>
              )}
            </div>

            {/* Description & Material */}
            <div className="space-y-1">
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                {selectedProduct.description}
              </p>
              {selectedProduct.material && (
                <p className="text-[11px] text-neutral-500 font-medium pt-0.5">
                  <strong>Tecido / Material:</strong> {selectedProduct.material}
                </p>
              )}
            </div>

            {/* Modern Color Selector */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-neutral-900">
                  Cor:{' '}
                  <span className="text-black font-extrabold">
                    {selectedColor?.name || 'Selecione'}
                  </span>
                </label>
                <span className="text-[11px] text-neutral-500 font-medium">
                  {selectedProduct.colors.length} opções
                </span>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {selectedProduct.colors.map((color) => {
                  const isSelected = selectedColor?.name === color.name;
                  return (
                    <button
                      key={color.name}
                      onClick={() => handleSelectColor(color)}
                      style={{ backgroundColor: color.hex }}
                      className={`relative w-8 sm:w-9 h-8 sm:h-9 rounded-full transition-all duration-200 border-2 ${
                        isSelected
                          ? 'ring-2 ring-black ring-offset-2 scale-110 shadow-md border-white'
                          : 'border-neutral-300 hover:scale-105 opacity-85 hover:opacity-100'
                      }`}
                      title={color.name}
                    >
                      {isSelected && (
                        <Check className="w-4 h-4 text-white absolute inset-0 m-auto drop-shadow-md stroke-[3]" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Size Selector */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-neutral-900">
                  Tamanho:{' '}
                  <span className="text-black font-extrabold">{selectedSize}</span>
                </label>
                <span className="text-[11px] text-emerald-700 font-semibold">
                  {currentSizeStock > 0 ? `${currentSizeStock} peças em Manaus` : 'Sob encomenda'}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {selectedProduct.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-10 sm:min-w-11 h-9 sm:h-10 px-3 rounded-xl text-xs font-bold transition-all ${
                      selectedSize === size
                        ? 'bg-black text-white shadow-md scale-105'
                        : 'bg-neutral-100 text-neutral-800 hover:bg-neutral-200 border border-neutral-200'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-3 pt-0.5">
              <span className="text-xs font-bold text-neutral-900">Quantidade:</span>
              <div className="flex items-center border border-neutral-300 rounded-full bg-neutral-50 overflow-hidden">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 flex items-center justify-center text-neutral-700 hover:bg-neutral-200 font-bold active:scale-95"
                >
                  -
                </button>
                <span className="w-8 text-center text-xs font-bold text-neutral-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-8 h-8 flex items-center justify-center text-neutral-700 hover:bg-neutral-200 font-bold active:scale-95"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Sticky Bottom Actions Container for instant mobile thumb tap */}
          <div className="sticky bottom-0 left-0 right-0 p-3 sm:p-5 bg-white/95 backdrop-blur-md border-t border-neutral-200 z-30 md:static md:bg-transparent md:border-0 md:p-0 md:pt-4 md:px-6 space-y-2">
            <button
              onClick={() => {
                if (selectedProduct && selectedColor && selectedSize) {
                  addToCart(selectedProduct, selectedSize, selectedColor, quantity);
                  closeDetail();
                  openWhatsAppModal();
                }
              }}
              className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-extrabold py-3.5 px-6 rounded-2xl shadow-md hover:shadow-xl transition-all active:scale-[0.98] text-xs sm:text-sm min-h-[44px]"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Pedir Direto pelo WhatsApp</span>
            </button>

            <button
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center gap-2 bg-neutral-900 hover:bg-black text-white font-bold py-2.5 sm:py-3 px-6 rounded-2xl shadow-xs transition-all active:scale-[0.98] text-xs min-h-[40px]"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Adicionar à Sacola de Compras</span>
            </button>

            {/* Manaus Local Shipping Notice */}
            <div className="p-2 sm:p-2.5 bg-neutral-50 rounded-xl border border-neutral-200/80 space-y-0.5 text-[10px] sm:text-[11px] text-neutral-600">
              <div className="flex items-center gap-1.5 font-bold text-neutral-900">
                <Truck className="w-3.5 h-3.5 text-neutral-800" />
                <span>Entregas em Toda Manaus (Motoboy) ou Retirada</span>
              </div>
              <p className="leading-tight text-neutral-500">
                Taxa combinada por distância/bairro ou retirada grátis no showroom em Manaus.
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 text-[10px] text-neutral-400 pt-0.5 pb-1">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                Compra Segura
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Store className="w-3 h-3 text-neutral-600" />
                Showroom com Agendamento
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
