'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, Star, Heart, ShoppingBag, Check, ShieldCheck, Truck, Store, Tag } from 'lucide-react';
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
    // Find matching color if any
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-neutral-200 max-h-[92vh] flex flex-col md:flex-row animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeDetail}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-neutral-700 hover:text-black flex items-center justify-center shadow-md transition-all"
          aria-label="Fechar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Product Images & Gallery */}
        <div className="w-full md:w-1/2 flex flex-col bg-neutral-100 shrink-0">
          {/* Main Photo with Dynamic Color Switch */}
          <div className="relative aspect-[3/4] md:aspect-auto md:h-[420px] w-full overflow-hidden bg-neutral-200">
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
              <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-black text-white shadow-md uppercase tracking-wider">
                {selectedProduct.badge}
              </span>
              {selectedProduct.comboOffer && (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-neutral-900 text-amber-300 shadow-md border border-neutral-700">
                  {selectedProduct.comboOffer}
                </span>
              )}
            </div>

            {/* Wishlist toggle */}
            <button
              onClick={() => toggleFavorite(selectedProduct.id)}
              className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-neutral-500 hover:text-black flex items-center justify-center shadow-md transition-all"
              aria-label="Favoritar"
            >
              <Heart
                className={`w-5 h-5 ${
                  isFav ? 'fill-black text-black' : 'stroke-current'
                }`}
              />
            </button>
          </div>

          {/* Thumbnail Strip Gallery (191 real photos) */}
          {selectedProduct.gallery && selectedProduct.gallery.length > 1 && (
            <div className="p-2.5 bg-neutral-50 border-t border-neutral-200 flex items-center gap-2 overflow-x-auto no-scrollbar">
              {selectedProduct.gallery.map((imgUrl, idx) => {
                const isActive = activeImage === imgUrl;
                return (
                  <button
                    key={idx}
                    onClick={() => handleThumbnailClick(imgUrl)}
                    className={`relative w-12 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
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

        {/* Right: Product Specs & Color Selection */}
        <div className="w-full md:w-1/2 p-5 sm:p-6 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-4">
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

              <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 mt-1.5 leading-snug">
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
            <div className="p-3 rounded-2xl bg-neutral-50 border border-neutral-200 flex flex-col gap-1">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-black">
                  {formatCurrencyBRL(selectedProduct.price)}
                </span>
                {selectedProduct.originalPrice && (
                  <span className="text-sm text-neutral-400 line-through">
                    {formatCurrencyBRL(selectedProduct.originalPrice)}
                  </span>
                )}
              </div>
              {selectedProduct.comboOffer && (
                <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-900">
                  <Tag className="w-3.5 h-3.5" />
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
                <p className="text-[11px] text-neutral-500 font-medium pt-1">
                  <strong>Tecido / Material:</strong> {selectedProduct.material}
                </p>
              )}
            </div>

            {/* Modern Color Selector with Live Photo Feedback */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-neutral-900">
                  Cor Selecionada:{' '}
                  <span className="text-black font-extrabold">
                    {selectedColor?.name || 'Selecione uma cor'}
                  </span>
                </label>
                <span className="text-[11px] text-neutral-500 font-medium">
                  {selectedProduct.colors.length} opções disponíveis
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
                      className={`relative w-8 h-8 rounded-full transition-all duration-200 border-2 ${
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
              <div className="flex items-center justify-between mb-2">
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
                    className={`min-w-11 h-10 px-3 rounded-xl text-xs font-bold transition-all ${
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
            <div className="flex items-center gap-3 pt-1">
              <span className="text-xs font-bold text-neutral-900">Quantidade:</span>
              <div className="flex items-center border border-neutral-300 rounded-full bg-neutral-50 overflow-hidden">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 flex items-center justify-center text-neutral-700 hover:bg-neutral-200 font-bold"
                >
                  -
                </button>
                <span className="w-8 text-center text-xs font-bold text-neutral-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-8 h-8 flex items-center justify-center text-neutral-700 hover:bg-neutral-200 font-bold"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons & Local Manaus Shipping Info */}
          <div className="pt-6 space-y-3">
            <button
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center gap-2 bg-black hover:bg-neutral-800 text-white font-bold py-3.5 px-6 rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Adicionar ao Carrinho</span>
            </button>

            {/* Manaus Local Shipping Notice */}
            <div className="p-3 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-1.5 text-[11px] text-neutral-600">
              <div className="flex items-center gap-1.5 font-bold text-neutral-900">
                <Truck className="w-4 h-4 text-neutral-800" />
                <span>Entrega em Toda Manaus (Motoboy)</span>
              </div>
              <p className="leading-tight text-neutral-500">
                Frete a combinar por distância/bairro ou retirada grátis na loja física em Manaus.
              </p>
            </div>

            <div className="flex items-center justify-center gap-4 text-[10px] text-neutral-500 pt-0.5">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Compra 100% Segura
              </span>
              <span className="flex items-center gap-1">
                <Store className="w-3.5 h-3.5 text-neutral-700" />
                Retirada Presencial Disponível
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
