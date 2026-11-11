'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  X,
  Star,
  Heart,
  ShoppingBag,
  Check,
  ShieldCheck,
  Truck,
  Store,
  Tag,
  MessageCircle,
  Maximize2,
  Ruler,
  ChevronRight,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';
import { useStore } from '@/store/useStore';
import { ColorOption, formatCurrencyBRL } from '@/data/mockData';

const PLUS_SIZE_MEASUREMENTS = [
  { size: 'G (44)', busto: '100 - 106 cm', cintura: '86 - 92 cm', quadril: '110 - 116 cm' },
  { size: 'GG (46/48)', busto: '108 - 114 cm', cintura: '94 - 100 cm', quadril: '118 - 124 cm' },
  { size: 'G1 (50)', busto: '116 - 122 cm', cintura: '102 - 108 cm', quadril: '126 - 132 cm' },
  { size: 'G2 (52)', busto: '124 - 130 cm', cintura: '110 - 116 cm', quadril: '134 - 140 cm' },
  { size: 'G3 (54)', busto: '132 - 138 cm', cintura: '118 - 124 cm', quadril: '142 - 148 cm' },
];

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProduct,
    isDetailOpen,
    closeDetail,
    addToCart,
    favorites,
    toggleFavorite,
    openWhatsAppModal,
    setIsCartOpen,
  } = useStore();

  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<ColorOption | null>(null);
  const [activeImage, setActiveImage] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [isFullscreenImage, setIsFullscreenImage] = useState(false);

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
      setShowSizeGuide(false);
      setIsFullscreenImage(false);
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
    setIsCartOpen(true);
  };

  const handleDirectWhatsAppOrder = () => {
    if (!selectedColor || !selectedSize) return;
    addToCart(selectedProduct, selectedSize, selectedColor, quantity);
    closeDetail();
    openWhatsAppModal();
  };

  const currentSizeStock = selectedProduct.sizeStock?.[selectedSize] ?? 3;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      {/* Background Click to Close (Desktop) */}
      <div className="hidden md:block absolute inset-0" onClick={closeDetail} />

      {/* Main Container: Fullscreen on Mobile, Luxury Floating Card on Desktop */}
      <div
        className="relative w-full h-full md:h-auto md:max-h-[92vh] md:max-w-4xl lg:max-w-5xl bg-white md:rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden z-10 animate-in slide-in-from-bottom duration-250 md:zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ========================================================
            MOBILE TOP APP BAR (< md) — Fixed, Minimal & Clean
            ======================================================== */}
        <div className="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-neutral-200 shrink-0 z-20">
          <button
            onClick={closeDetail}
            className="w-9 h-9 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-800 active:scale-95"
            aria-label="Voltar"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="text-center px-2 flex-1 truncate">
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">
              {selectedProduct.subcategory}
            </span>
            <h2 className="text-xs font-bold text-neutral-900 truncate">
              {selectedProduct.name}
            </h2>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => toggleFavorite(selectedProduct.id)}
              className="w-9 h-9 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 active:scale-95"
              aria-label="Favoritar"
            >
              <Heart className={`w-4 h-4 ${isFav ? 'fill-black text-black' : ''}`} />
            </button>
            <button
              onClick={closeDetail}
              className="w-9 h-9 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-800 active:scale-95"
              aria-label="Fechar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Desktop Close Button */}
        <button
          onClick={closeDetail}
          className="hidden md:flex absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-neutral-700 hover:text-black items-center justify-center shadow-md transition-all hover:scale-105 active:scale-95 border border-neutral-200"
          aria-label="Fechar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ========================================================
            UNIFIED SCROLL BODY FOR MOBILE & DESKTOP SPLIT
            ======================================================== */}
        <div className="flex-1 flex flex-col md:flex-row overflow-y-auto md:overflow-hidden">
          {/* ========================================================
              LEFT COLUMN: FULL-LENGTH PRODUCT IMAGE & GALLERY
              Never cropped, optimized height so details stay in view
              ======================================================== */}
          <div className="w-full md:w-[48%] lg:w-[46%] flex flex-col bg-[#F7F7F9] shrink-0 border-b md:border-b-0 md:border-r border-neutral-200">
            {/* Main Visual Display (Shows Whole Body & Full Dress, 100% Contained) */}
            <div className="relative w-full h-[240px] sm:h-[290px] md:h-[500px] lg:h-[560px] max-h-[33vh] md:max-h-[82vh] bg-gradient-to-b from-[#FAF9F8] to-[#F1F1F4] p-2 sm:p-3 flex items-center justify-center overflow-hidden">
              <Image
                src={activeImage || selectedProduct.image}
                alt={selectedProduct.name}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain object-center transition-all duration-300 drop-shadow-sm select-none"
              />

              {/* Badges on Image */}
              <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-black text-white shadow-md uppercase tracking-wider">
                  {selectedProduct.badge}
                </span>
                {selectedProduct.comboOffer && (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-neutral-900 text-amber-300 shadow-md border border-neutral-700">
                    {selectedProduct.comboOffer}
                  </span>
                )}
              </div>

              {/* Zoom & Fullscreen Button */}
              <button
                onClick={() => setIsFullscreenImage(true)}
                className="absolute top-3 right-3 md:right-14 z-10 px-2.5 py-1.5 rounded-full bg-black/65 hover:bg-black/90 text-white flex items-center gap-1.5 backdrop-blur-xs transition-all active:scale-95 shadow-md text-[11px] font-semibold"
                title="Ampliar foto em tela cheia"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Ampliar</span>
              </button>

              {/* Desktop Wishlist Button */}
              <button
                onClick={() => toggleFavorite(selectedProduct.id)}
                className="hidden md:flex absolute bottom-3 right-3 z-10 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-neutral-600 hover:text-black items-center justify-center shadow-md transition-all active:scale-90 border border-neutral-200"
                aria-label="Favoritar"
              >
                <Heart className={`w-5 h-5 ${isFav ? 'fill-black text-black' : ''}`} />
              </button>
            </div>

            {/* Thumbnail Strip Gallery (Horizontal Scroll, 100% Contained) */}
            {selectedProduct.gallery && selectedProduct.gallery.length > 1 && (
              <div className="p-2.5 bg-white border-t border-neutral-200 flex items-center gap-2 overflow-x-auto no-scrollbar">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider shrink-0 pl-1">
                  Fotos:
                </span>
                {selectedProduct.gallery.map((imgUrl, idx) => {
                  const isActive = activeImage === imgUrl;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleThumbnailClick(imgUrl)}
                      className={`relative w-12 h-14 rounded-xl overflow-hidden shrink-0 border-2 bg-neutral-50 p-1 flex items-center justify-center transition-all ${
                        isActive
                          ? 'border-black ring-2 ring-black/20 scale-105 shadow-xs'
                          : 'border-neutral-200 opacity-70 hover:opacity-100 hover:border-neutral-400'
                      }`}
                      aria-label={`Ver foto ${idx + 1}`}
                    >
                      <Image
                        src={imgUrl}
                        alt={`Foto ${idx + 1}`}
                        fill
                        sizes="48px"
                        className="object-contain object-center"
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* ========================================================
              RIGHT COLUMN: SPACIOUS, FLUID PRODUCT CONFIGURATION
              ======================================================== */}
          <div className="w-full md:w-[50%] lg:w-[52%] flex flex-col justify-between overflow-y-auto bg-white">
            <div className="p-3.5 sm:p-6 lg:p-8 space-y-3.5 sm:space-y-5">
              {/* Top Subcategory & Stock Status */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-black bg-neutral-100 px-3 py-1 rounded-full border border-neutral-200">
                    {selectedProduct.subcategory}
                  </span>

                  <span className="text-xs text-emerald-700 font-bold flex items-center gap-1.5 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                    Estoque em Manaus
                  </span>
                </div>

                <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-neutral-900 leading-tight">
                  {selectedProduct.name}
                </h1>

                {/* Rating & Location */}
                <div className="flex items-center gap-2 mt-1.5">
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-neutral-900">
                    {selectedProduct.rating}
                  </span>
                  <span className="text-xs text-neutral-400">
                    ({selectedProduct.reviewsCount} avaliações de clientes em Manaus)
                  </span>
                </div>
              </div>

              {/* Price Area */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-[#FAFAFC] border border-neutral-200 flex flex-col gap-1.5">
                <div className="flex items-baseline gap-2.5">
                  <span className="text-2xl sm:text-3xl font-black text-black">
                    {formatCurrencyBRL(selectedProduct.price)}
                  </span>
                  {selectedProduct.originalPrice && (
                    <span className="text-sm text-neutral-400 line-through">
                      {formatCurrencyBRL(selectedProduct.originalPrice)}
                    </span>
                  )}
                  <span className="text-[11px] text-emerald-700 font-bold ml-auto">
                    À vista ou no cartão
                  </span>
                </div>

                {selectedProduct.comboOffer && (
                  <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-900 pt-1 border-t border-neutral-200/80">
                    <Tag className="w-3.5 h-3.5 text-neutral-700" />
                    <span>{selectedProduct.comboOffer}</span>
                  </div>
                )}
              </div>

              {/* ========================================================
                  COLOR SELECTOR: CLEAN, PROMINENT & INTERACTIVE
                  ======================================================== */}
              <div className="space-y-2.5 pt-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs sm:text-sm font-bold text-neutral-900">
                    Cor Selecionada:{' '}
                    <span className="text-black font-extrabold underline decoration-neutral-400 decoration-2">
                      {selectedColor?.name || 'Selecione uma cor'}
                    </span>
                  </label>
                  <span className="text-xs text-neutral-500 font-medium">
                    {selectedProduct.colors.length} cores disponíveis
                  </span>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {selectedProduct.colors.map((color) => {
                    const isSelected = selectedColor?.name === color.name;
                    return (
                      <button
                        key={color.name}
                        onClick={() => handleSelectColor(color)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-2xl border-2 transition-all active:scale-95 ${
                          isSelected
                            ? 'border-black bg-neutral-50 shadow-sm scale-102 ring-1 ring-black/10'
                            : 'border-neutral-200 hover:border-neutral-300 bg-white'
                        }`}
                      >
                        <span
                          style={{ backgroundColor: color.hex }}
                          className="w-4 h-4 rounded-full border border-black/20 shrink-0 shadow-inner flex items-center justify-center"
                        >
                          {isSelected && <Check className="w-2.5 h-2.5 text-white stroke-[3]" />}
                        </span>
                        <span
                          className={`text-xs ${
                            isSelected ? 'font-extrabold text-black' : 'font-medium text-neutral-700'
                          }`}
                        >
                          {color.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ========================================================
                  SIZE SELECTOR: GENEROUS TARGETS & SIZE GUIDE ACCORDION
                  ======================================================== */}
              <div className="space-y-2.5 pt-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <label className="text-xs sm:text-sm font-bold text-neutral-900">
                      Tamanho:{' '}
                      <span className="text-black font-extrabold">{selectedSize}</span>
                    </label>
                    <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md">
                      {currentSizeStock > 0 ? `${currentSizeStock} peças prontas` : 'Sob encomenda'}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowSizeGuide(!showSizeGuide)}
                    className="text-xs text-neutral-700 hover:text-black font-bold flex items-center gap-1 underline transition-colors"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>{showSizeGuide ? 'Ocultar Medidas' : 'Guia de Medidas'}</span>
                  </button>
                </div>

                {/* Size Chips */}
                <div className="flex flex-wrap gap-2.5">
                  {selectedProduct.sizes.map((size) => {
                    const isSelected = selectedSize === size;
                    return (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-14 sm:min-w-16 h-11 px-3.5 rounded-2xl text-xs sm:text-sm font-bold transition-all active:scale-95 flex items-center justify-center ${
                          isSelected
                            ? 'bg-black text-white shadow-md scale-105 border-2 border-black'
                            : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-800 border border-neutral-200'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>

                {/* Expandable Plus-Size Measurements Table */}
                {showSizeGuide && (
                  <div className="p-3.5 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-2 animate-in fade-in-50 text-xs">
                    <div className="flex items-center justify-between pb-1.5 border-b border-neutral-200">
                      <span className="font-extrabold text-neutral-900 flex items-center gap-1.5">
                        <Ruler className="w-3.5 h-3.5 text-neutral-800" />
                        Tabela de Medidas Anatômica Plus Size (cm)
                      </span>
                      <span className="text-[10px] text-neutral-500 font-medium">Manaus - AM</span>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-[11px]">
                        <thead>
                          <tr className="text-neutral-400 border-b border-neutral-200">
                            <th className="py-1">Tamanho</th>
                            <th className="py-1">Busto</th>
                            <th className="py-1">Cintura</th>
                            <th className="py-1">Quadril</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100 font-medium text-neutral-700">
                          {PLUS_SIZE_MEASUREMENTS.map((m) => (
                            <tr
                              key={m.size}
                              className={selectedSize.startsWith(m.size.split(' ')[0]) ? 'bg-amber-50 font-bold text-black' : ''}
                            >
                              <td className="py-1.5 font-bold">{m.size}</td>
                              <td className="py-1.5">{m.busto}</td>
                              <td className="py-1.5">{m.cintura}</td>
                              <td className="py-1.5">{m.quadril}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-3 pt-1">
                <span className="text-xs font-bold text-neutral-900">Quantidade:</span>
                <div className="flex items-center border border-neutral-300 rounded-full bg-neutral-50 overflow-hidden">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-9 h-9 flex items-center justify-center text-neutral-700 hover:bg-neutral-200 font-bold active:scale-95 text-sm"
                  >
                    -
                  </button>
                  <span className="w-10 text-center text-xs font-bold text-neutral-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-9 h-9 flex items-center justify-center text-neutral-700 hover:bg-neutral-200 font-bold active:scale-95 text-sm"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Description & Material Details */}
              <div className="space-y-1.5 pt-2 border-t border-neutral-100 text-xs sm:text-sm">
                <h4 className="font-bold text-neutral-900">Sobre a Peça:</h4>
                <p className="text-neutral-600 leading-relaxed text-xs sm:text-sm">
                  {selectedProduct.description}
                </p>
                {selectedProduct.material && (
                  <p className="text-xs text-neutral-500 font-semibold pt-1">
                    <strong>Tecido / Material:</strong> {selectedProduct.material}
                  </p>
                )}
              </div>

              {/* Manaus Local Shipping Notice */}
              <div className="p-3 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-1 text-xs text-neutral-600">
                <div className="flex items-center gap-1.5 font-bold text-neutral-900">
                  <Truck className="w-4 h-4 text-neutral-800" />
                  <span>Entregas em Manaus (Motoboy) ou Retirada</span>
                </div>
                <p className="text-[11px] text-neutral-500 leading-tight">
                  Taxa combinada por bairro/distância no ato do atendimento. Opção de retirada gratuita no showroom com agendamento.
                </p>
              </div>

              {/* Desktop Action Buttons */}
              <div className="hidden md:block pt-3 space-y-2.5">
                <button
                  onClick={handleDirectWhatsAppOrder}
                  className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-extrabold py-3.5 px-6 rounded-2xl shadow-md hover:shadow-xl transition-all hover:scale-[1.01] active:scale-[0.99] text-sm"
                >
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span>Pedir Direto pelo WhatsApp</span>
                </button>

                <button
                  onClick={handleAddToCart}
                  className="w-full flex items-center justify-center gap-2 bg-black hover:bg-neutral-800 text-white font-bold py-3 px-6 rounded-2xl shadow-xs transition-all hover:scale-[1.01] active:scale-[0.99] text-xs"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Adicionar à Sacola de Compras</span>
                </button>

                <div className="flex items-center justify-center gap-3 text-[11px] text-neutral-400 pt-1">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Compra Segura
                  </span>
                  <span>•</span>
                  <span>Pagamento no Recebimento (PIX ou Cartão)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            STREAMLINED STICKY BOTTOM BAR FOR MOBILE (< md)
            Provides immediate feedback on selected size & color + 1-tap WhatsApp order
            ======================================================== */}
        <div className="md:hidden sticky bottom-0 left-0 right-0 px-3.5 py-2.5 bg-white/95 backdrop-blur-md border-t border-neutral-200 flex items-center justify-between gap-2.5 z-30 shrink-0">
          <div className="min-w-0 pr-1">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="text-[10px] font-extrabold text-black bg-neutral-100 border border-neutral-200 px-1.5 py-0.5 rounded-md shrink-0">
                Tam: {selectedSize || '—'}
              </span>
              <span className="text-[10px] font-medium text-neutral-600 truncate max-w-[100px]">
                {selectedColor?.name || 'Selecione'}
              </span>
            </div>
            <span className="text-base font-black text-black leading-none block">
              {formatCurrencyBRL(selectedProduct.price * quantity)}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleAddToCart}
              className="w-11 h-11 rounded-2xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 flex items-center justify-center border border-neutral-300 active:scale-95"
              title="Adicionar à Sacola"
            >
              <ShoppingBag className="w-5 h-5" />
            </button>

            <button
              onClick={handleDirectWhatsAppOrder}
              className="h-11 px-4 rounded-2xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-transform"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Pedir no WhatsApp</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================
          FULLSCREEN IMAGE LIGHTBOX (ZOOM MODAL)
          ======================================================== */}
      {isFullscreenImage && (
        <div
          className="fixed inset-0 z-60 bg-black/95 flex flex-col items-center justify-center p-3 animate-in fade-in duration-200"
          onClick={() => setIsFullscreenImage(false)}
        >
          <button
            onClick={() => setIsFullscreenImage(false)}
            className="absolute top-4 right-4 z-70 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-all"
            aria-label="Fechar tela cheia"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="relative w-full h-[85vh] max-w-2xl">
            <Image
              src={activeImage || selectedProduct.image}
              alt={selectedProduct.name}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>

          <p className="text-white/70 text-xs font-medium mt-3">
            Toque em qualquer lugar para voltar ao produto
          </p>
        </div>
      )}
    </div>
  );
};
