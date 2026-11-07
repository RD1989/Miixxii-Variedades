'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Sparkles,
  MessageCircle,
  Truck,
  Store,
  Pause,
  Play,
  Grid,
} from 'lucide-react';
import { useStore } from '@/store/useStore';
import { CarouselSlide } from '@/types/admin';
import { CATEGORIES } from '@/data/mockData';

export const HeroBanner: React.FC = () => {
  const {
    carouselSlides,
    carouselAutoPlay,
    carouselIntervalSeconds,
    openWhatsAppLead,
    setSelectedCategory,
  } = useStore();

  const activeSlides: CarouselSlide[] =
    carouselSlides && carouselSlides.filter((s) => s.isActive).length > 0
      ? carouselSlides.filter((s) => s.isActive)
      : [
          {
            id: 'default-1',
            title: 'MIIXXIIE Variedades',
            subtitle: 'Elegância Sem Medidas • Moda Plus Size Feminina do G ao G3 em Manaus',
            badge: 'Identidade Oficial Manaus',
            categoryTarget: 'todos',
            ctaText: 'Ver Coleção 2026',
            imageUrl: '/images/banners/banner-slide-1-marca.jpg',
            isActive: true,
            order: 1,
          },
        ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartXRef = useRef<number | null>(null);

  // Auto-play timer
  useEffect(() => {
    if (!carouselAutoPlay || isPaused || activeSlides.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeSlides.length);
    }, (carouselIntervalSeconds || 5) * 1000);

    return () => clearInterval(timer);
  }, [carouselAutoPlay, isPaused, activeSlides.length, carouselIntervalSeconds]);

  // Ensure index stays in bounds if slides change
  useEffect(() => {
    if (currentIndex >= activeSlides.length) {
      setCurrentIndex(0);
    }
  }, [activeSlides.length, currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % activeSlides.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + activeSlides.length) % activeSlides.length);
  };

  const handleCtaClick = (slide: CarouselSlide) => {
    if (slide.categoryTarget && slide.categoryTarget !== 'todos') {
      setSelectedCategory(slide.categoryTarget);
    } else {
      setSelectedCategory(null);
    }
    const el = document.getElementById('novidades-section');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  // Mobile swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    touchStartXRef.current = null;
  };

  const currentSlide = activeSlides[currentIndex] || activeSlides[0];

  return (
    <div className="w-full px-2 sm:px-6 lg:px-10 2xl:px-12 pt-2 sm:pt-4">
      {/* ========================================================
          MOBILE HERO CAROUSEL (< md) — Compact, Fast & Interactive
          ======================================================== */}
      <div
        className="md:hidden relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#09090C] via-[#121215] to-[#0A0A0D] text-white shadow-xl border border-neutral-800 p-3.5 sm:p-5 space-y-3.5"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Background Ambient Glow */}
        <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-white/[0.05] blur-2xl pointer-events-none" />

        {/* Mobile Top Header: Badge, Step Count & Motoboy Status */}
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold uppercase tracking-wider text-neutral-200 border border-white/15">
            <Sparkles className="w-3 h-3 text-neutral-300" />
            <span>{currentSlide.badge}</span>
          </span>

          <div className="flex items-center gap-2">
            <span className="text-[10px] text-neutral-400 font-semibold">
              {currentIndex + 1} de {activeSlides.length}
            </span>
            <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Manaus
            </span>
          </div>
        </div>

        {/* Mobile Slide Card: 16:9 Image with Dark Luxury Degradê */}
        <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden shadow-md border border-white/15 bg-neutral-900 group">
          <Image
            key={currentSlide.id}
            src={currentSlide.imageUrl}
            alt={currentSlide.title}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center transition-all duration-700 ease-out"
          />

          {/* Luxury Multi-layer Degradê */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/30" />

          {/* Floating Headline & Category Label */}
          <div className="absolute bottom-3 left-3 right-3 text-left space-y-1">
            <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest drop-shadow-sm block">
              {currentSlide.categoryTarget && currentSlide.categoryTarget !== 'todos'
                ? `Categoria: ${CATEGORIES.find((c) => c.slug === currentSlide.categoryTarget)?.name || currentSlide.categoryTarget}`
                : 'MIIXXIIE • Manaus - AM'}
            </span>
            <h1 className="font-script text-2xl sm:text-3xl font-bold text-white drop-shadow-lg leading-tight">
              {currentSlide.title}
            </h1>
            <p className="text-[11px] text-neutral-300 line-clamp-2 leading-relaxed">
              {currentSlide.subtitle}
            </p>
          </div>

          {/* Mobile Prev / Next overlay arrows */}
          {activeSlides.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/50 text-white flex items-center justify-center backdrop-blur-xs border border-white/15 active:scale-90"
                aria-label="Slide anterior"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/50 text-white flex items-center justify-center backdrop-blur-xs border border-white/15 active:scale-90"
                aria-label="Próximo slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}
        </div>

        {/* Mobile Action Buttons (Direct Deep-link & WhatsApp) */}
        <div className="grid grid-cols-2 gap-2 pt-0.5">
          <button
            onClick={() => handleCtaClick(currentSlide)}
            className="flex items-center justify-center gap-1.5 bg-white hover:bg-neutral-100 text-black font-extrabold text-xs py-3 px-3 rounded-xl shadow-md active:scale-95 transition-transform"
          >
            <span>{currentSlide.ctaText}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() =>
              openWhatsAppLead(
                `Olá! Vi o destaque de "${currentSlide.title}" no catálogo virtual e gostaria de consultar as peças disponíveis em Manaus. 🌸`,
                'mobile_carousel_cta'
              )
            }
            className="flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-extrabold text-xs py-3 px-3 rounded-xl shadow-md active:scale-95 transition-transform"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-white" />
            <span>WhatsApp</span>
          </button>
        </div>

        {/* Mobile Pagination Indicators with Active Progress */}
        {activeSlides.length > 1 && (
          <div className="flex items-center justify-center gap-1.5 pt-1">
            {activeSlides.map((slide, dot) => (
              <button
                key={slide.id}
                onClick={() => setCurrentIndex(dot)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  dot === currentIndex ? 'bg-white w-6' : 'bg-white/30 w-1.5 hover:bg-white/60'
                }`}
                aria-label={`Ir para slide ${dot + 1}: ${slide.title}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* ========================================================
          DESKTOP HERO CAROUSEL (md:) — Luxury Editorial Master Banner
          ======================================================== */}
      <div
        className="hidden md:flex relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#060608] via-[#0E0E12] to-[#08080A] text-white shadow-2xl border border-neutral-800 min-h-[480px] lg:min-h-[530px] items-center group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Slide Background Image with Smooth Crossfade */}
        <div className="absolute inset-0">
          <Image
            key={currentSlide.id}
            src={currentSlide.imageUrl}
            alt={currentSlide.title}
            fill
            priority
            sizes="(max-width: 1200px) 100vw, 1920px"
            className="object-cover object-center transition-all duration-700 ease-out scale-100 group-hover:scale-[1.01]"
          />
        </div>

        {/* Sophisticated Luxury Multi-tier Degradê Overlays */}
        {/* 1. Left-to-right dark contrast for typography reading */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/75 to-black/30 pointer-events-none" />
        {/* 2. Bottom-to-top ground shadow */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent pointer-events-none" />
        {/* 3. Subtle Radial Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.08),transparent_60%)] pointer-events-none" />
        {/* 4. Fine Metallic Border Glow */}
        <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-3xl pointer-events-none" />

        {/* Carousel Arrow Controls (Left & Right) */}
        {activeSlides.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/15 backdrop-blur-md transition-all hover:scale-110 active:scale-95 shadow-xl"
              aria-label="Slide anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/15 backdrop-blur-md transition-all hover:scale-110 active:scale-95 shadow-xl"
              aria-label="Próximo slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Desktop Slide Content: Typography & Direct Action */}
        <div className="w-full grid grid-cols-12 items-center px-10 lg:px-16 2xl:px-24 py-12 z-10 gap-8">
          <div className="col-span-8 lg:col-span-7 space-y-4 text-left animate-in fade-in slide-in-from-left-4 duration-500">
            {/* Slide Badge & Category Indicator */}
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-xs font-bold tracking-wider uppercase text-neutral-100 border border-white/20 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-neutral-200" />
                <span>{currentSlide.badge}</span>
              </span>

              {currentSlide.categoryTarget && currentSlide.categoryTarget !== 'todos' && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-black/50 text-[11px] font-semibold text-amber-300 border border-amber-400/30">
                  <Grid className="w-3 h-3 text-amber-400" />
                  <span>Categoria: {CATEGORIES.find((c) => c.slug === currentSlide.categoryTarget)?.name || currentSlide.categoryTarget}</span>
                </span>
              )}
            </div>

            {/* Headline with Script Typography */}
            <div className="space-y-2 max-w-xl">
              <h1 className="font-script text-4xl lg:text-5xl 2xl:text-6xl font-bold text-white tracking-wide leading-tight drop-shadow-xl">
                {currentSlide.title}
              </h1>
              <p className="text-sm lg:text-base text-neutral-200 font-normal leading-relaxed drop-shadow-sm">
                {currentSlide.subtitle}
              </p>
            </div>

            {/* CTAs */}
            <div className="pt-3 flex items-center gap-3">
              <button
                onClick={() => handleCtaClick(currentSlide)}
                className="inline-flex items-center justify-center gap-2.5 bg-white hover:bg-neutral-100 text-black text-xs sm:text-sm font-extrabold px-7 py-3.5 rounded-full shadow-2xl transition-all border border-neutral-300 hover:scale-105 active:scale-95"
              >
                <span>{currentSlide.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() =>
                  openWhatsAppLead(
                    `Olá! Vi o banner de "${currentSlide.title}" no catálogo virtual e gostaria de atendimento VIP em Manaus. 🌸`,
                    'desktop_carousel_cta'
                  )
                }
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs sm:text-sm font-extrabold px-6 py-3.5 rounded-full shadow-xl transition-all border border-white/20 hover:scale-105 active:scale-95"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Atendimento WhatsApp</span>
              </button>
            </div>

            {/* Manaus Local Badges */}
            <div className="pt-2 flex items-center gap-4 text-xs text-neutral-300 font-medium">
              <span className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-neutral-300" />
                Entrega Rápida por Bairro (Motoboy)
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Store className="w-3.5 h-3.5 text-neutral-300" />
                Showroom com Retirada em Manaus
              </span>
            </div>
          </div>
        </div>

        {/* Desktop Carousel Indicators / Thumbnail Navigation at Bottom */}
        <div className="absolute bottom-5 left-10 lg:left-16 right-10 lg:right-16 z-20 flex items-center justify-between">
          {/* Slide dots */}
          <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md px-3.5 py-2 rounded-full border border-white/10">
            {activeSlides.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => setCurrentIndex(idx)}
                className={`transition-all duration-300 rounded-full ${
                  idx === currentIndex
                    ? 'w-8 h-2 bg-white'
                    : 'w-2 h-2 bg-white/40 hover:bg-white/70'
                }`}
                title={`Slide ${idx + 1}: ${slide.title}`}
              />
            ))}
          </div>

          {/* Pause / Play indicator */}
          {carouselAutoPlay && activeSlides.length > 1 && (
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="text-[11px] text-neutral-400 hover:text-white flex items-center gap-1 bg-black/40 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md transition-colors"
              title={isPaused ? 'Retomar carrossel' : 'Pausar carrossel'}
            >
              {isPaused ? <Play className="w-3 h-3 text-emerald-400" /> : <Pause className="w-3 h-3" />}
              <span>{isPaused ? 'Pausado' : 'Rotação Automática'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
