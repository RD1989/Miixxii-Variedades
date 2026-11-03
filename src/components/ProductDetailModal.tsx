'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, Star, Heart, ShoppingBag, Check, ShieldCheck, Truck } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { SizeOption, ColorOption, formatCurrencyBRL } from '@/data/mockData';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProduct,
    isDetailOpen,
    closeDetail,
    addToCart,
    favorites,
    toggleFavorite,
  } = useStore();

  const [selectedSize, setSelectedSize] = useState<SizeOption>('GG');
  const [selectedColor, setSelectedColor] = useState<ColorOption>({
    name: 'Preto',
    hex: '#1F1F1F',
  });
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (selectedProduct) {
      if (selectedProduct.sizes.length > 0) {
        setSelectedSize(selectedProduct.sizes[1] || selectedProduct.sizes[0]);
      }
      if (selectedProduct.colors.length > 0) {
        setSelectedColor(selectedProduct.colors[0]);
      }
      setQuantity(1);
    }
  }, [selectedProduct]);

  if (!isDetailOpen || !selectedProduct) return null;

  const isFav = favorites.includes(selectedProduct.id);

  const handleAddToCart = () => {
    addToCart(selectedProduct, selectedSize, selectedColor, quantity);
    closeDetail();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#F3D6E2] max-h-[90vh] flex flex-col md:flex-row animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeDetail}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-gray-700 hover:text-[#C8105D] flex items-center justify-center shadow-md transition-all"
          aria-label="Fechar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Product Image */}
        <div className="relative w-full md:w-1/2 aspect-[4/5] md:aspect-auto bg-pink-50/40">
          <Image
            src={selectedProduct.image}
            alt={selectedProduct.name}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-top"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#C8105D] text-white shadow-sm uppercase">
              {selectedProduct.badge}
            </span>
          </div>

          {/* Wishlist toggle */}
          <button
            onClick={() => toggleFavorite(selectedProduct.id)}
            className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-gray-500 hover:text-[#C8105D] flex items-center justify-center shadow-md transition-all"
            aria-label="Favoritar"
          >
            <Heart
              className={`w-5 h-5 ${
                isFav ? 'fill-[#C8105D] text-[#C8105D]' : 'stroke-current'
              }`}
            />
          </button>
        </div>

        {/* Right: Details & Order Controls */}
        <div className="w-full md:w-1/2 p-5 sm:p-6 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-4">
            {/* Title & Reviews */}
            <div>
              <span className="text-[10px] font-bold tracking-wider uppercase text-[#C8105D] bg-pink-50 px-2 py-0.5 rounded-full">
                Moda Plus Size Feminina
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">
                {selectedProduct.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-1.5 mt-1.5">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-bold text-gray-800">
                  {selectedProduct.rating}
                </span>
                <span className="text-xs text-gray-500">
                  ({selectedProduct.reviewsCount} avaliações)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#C8105D]">
                {formatCurrencyBRL(selectedProduct.price)}
              </span>
              {selectedProduct.originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  {formatCurrencyBRL(selectedProduct.originalPrice)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              {selectedProduct.description}
            </p>

            {/* Size Selector */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-gray-800">
                  Tamanho: <span className="text-[#C8105D]">{selectedSize}</span>
                </label>
                <span className="text-[11px] text-gray-500">Grade Especial</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedProduct.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-10 h-10 px-3 rounded-xl text-xs font-bold transition-all ${
                      selectedSize === size
                        ? 'bg-[#C8105D] text-white shadow-md scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-pink-50 hover:text-[#C8105D] border border-gray-200'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selector */}
            <div>
              <label className="text-xs font-bold text-gray-800 block mb-2">
                Cores:{' '}
                <span className="text-[#C8105D] font-medium">
                  {selectedColor.name}
                </span>
              </label>
              <div className="flex items-center gap-2.5">
                {selectedProduct.colors.map((color) => {
                  const isSelected = selectedColor.name === color.name;
                  return (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      style={{ backgroundColor: color.hex }}
                      className={`relative w-7 h-7 rounded-full transition-transform ${
                        isSelected
                          ? 'ring-2 ring-offset-2 ring-[#C8105D] scale-110 shadow-sm'
                          : 'hover:scale-105 opacity-80 hover:opacity-100'
                      }`}
                      title={color.name}
                    >
                      {isSelected && (
                        <Check className="w-3.5 h-3.5 text-white absolute inset-0 m-auto drop-shadow-md" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-3 pt-1">
              <span className="text-xs font-bold text-gray-800">Quantidade:</span>
              <div className="flex items-center border border-gray-300 rounded-full bg-gray-50 overflow-hidden">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-200 font-bold"
                >
                  -
                </button>
                <span className="w-8 text-center text-xs font-bold text-gray-800">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-200 font-bold"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-6 space-y-2">
            <button
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center gap-2 bg-[#C8105D] hover:bg-[#A8084A] text-white font-bold py-3.5 px-6 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Adicionar ao Carrinho</span>
            </button>

            <div className="flex items-center justify-center gap-4 text-[10px] text-gray-500 pt-1">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Compra Protegida
              </span>
              <span className="flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-[#C8105D]" />
                Pronta Entrega Manaus
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
