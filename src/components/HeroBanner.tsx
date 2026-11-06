'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Heart,
  Sparkles,
  Gem,
  Shirt,
  MessageCircle,
  Truck,
  Store,
  ShieldCheck,
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { useStore } from '@/store/useStore';

export const HeroBanner: React.FC = () => {
  const { storeCMS, openWhatsAppLead } = useStore();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      badge: 'Coleção Exclusiva Manaus 2026',
      headline: storeCMS.bannerHeadline || 'Elegância Sem Medidas ♡',
      subheadline:
        storeCMS.bannerSubheadline ||
        'Modelagens anatômicas do G ao G3 pensadas sob medida para realçar suas curvas com sofisticação e conforto absoluto.',
      cta: 'Ver Coleção Exclusiva',
    },
    {
      badge: 'Pronta Entrega em Toda Manaus',
      headline: 'Beleza em Todas as Formas ✨',
      subheadline:
        'Peças premium em alfaiataria, viscose e tecidos nobres. Receba hoje mesmo via motoboy ou retire no showroom.',
      cta: 'Conferir Novidades',
    },
  ];

  const handleNext = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const handlePrev = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const scrollToProducts = () => {
    const el = document.getElementById('novidades-section');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const current = slides[currentSlide];

  return (
    <div className="w-full px-3 sm:px-6 lg:px-10 2xl:px-12 pt-3 sm:pt-5">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#070709] via-[#111114] to-[#0A0A0D] text-white shadow-2xl border border-neutral-800/80 min-h-[420px] sm:min-h-[480px] lg:min-h-[520px] flex items-center">
        {/* Dynamic Multi-layer Gradients & Ambient Glow */}
        <div className="absolute -top-32 -left-32 w-[420px] h-[420px] rounded-full bg-gradient-to-br from-white/[0.07] to-transparent blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-[420px] h-[420px] rounded-full bg-gradient-to-tl from-white/[0.05] to-transparent blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.08),transparent_65%)] pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

        {/* Carousel Prev/Next Buttons */}
        <button
          onClick={handlePrev}
          className="absolute left-2.5 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/10 backdrop-blur-md transition-all hover:scale-105 active:scale-95"
          aria-label="Slide anterior"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-2.5 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/10 backdrop-blur-md transition-all hover:scale-105 active:scale-95"
          aria-label="Próximo slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Main Content Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-12 items-center px-6 sm:px-10 md:px-14 lg:px-16 2xl:px-24 py-8 sm:py-12 z-10 gap-8 lg:gap-10">
          {/* Left Column: Typography, Badges & CTAs */}
          <div className="md:col-span-5 2xl:col-span-5 text-center md:text-left space-y-4">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-[11px] sm:text-xs font-bold tracking-wider uppercase text-neutral-200 border border-white/15 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-neutral-300" />
              <span>{current.badge}</span>
            </div>

            {/* Headline with Script Font */}
            <div className="space-y-2">
              <h1 className="font-script text-4xl sm:text-5xl lg:text-6xl 2xl:text-7xl font-bold text-white tracking-wide leading-tight drop-shadow-md">
                {current.headline}
              </h1>
              <p className="text-sm sm:text-base text-neutral-300 font-normal max-w-lg mx-auto md:mx-0 leading-relaxed">
                {current.subheadline}
              </p>
            </div>

            {/* CTAs: Discover Catalog & Direct WhatsApp */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3 justify-center md:justify-start">
              <button
                onClick={scrollToProducts}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-white hover:bg-neutral-200 text-black text-xs sm:text-sm font-extrabold px-7 py-3.5 rounded-full shadow-xl hover:shadow-2xl transition-all border border-neutral-300 hover:scale-105 active:scale-95"
              >
                <span>{current.cta}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() =>
                  openWhatsAppLead(
                    'Olá! Gostaria de consultar os modelos disponíveis no mostruário da MIIXXIIE em Manaus. 🌸',
                    'hero_banner'
                  )
                }
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs sm:text-sm font-extrabold px-6 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all border border-white/20 hover:scale-105 active:scale-95"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Atendimento WhatsApp</span>
              </button>
            </div>

            {/* Manaus Local Perks Badges */}
            <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3 text-[11px] text-neutral-400">
              <div className="flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-neutral-300" />
                <span>Entrega por Motoboy</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Store className="w-3.5 h-3.5 text-neutral-300" />
                <span>Retirada no Showroom</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Modelagem Plus Size G ao G3</span>
              </div>
            </div>
          </div>

          {/* Center Column: High-Res Luxury Model Photography */}
          <div className="md:col-span-4 2xl:col-span-4 flex flex-col items-center justify-center relative">
            <div className="relative w-64 sm:w-72 md:w-80 lg:w-[340px] 2xl:w-[380px] h-80 sm:h-96 lg:h-[440px] 2xl:h-[480px] rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20 group bg-neutral-900">
              <Image
                src="/images/hero-model.jpg"
                alt="Modelo Plus Size MIIXXIIE Variedades"
                fill
                priority
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Floating Bottom Card */}
              <div className="absolute bottom-3 left-3 right-3 bg-black/75 backdrop-blur-md rounded-2xl p-2.5 border border-white/15 text-left text-white shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block">
                      Coleção Especial
                    </span>
                    <span className="text-xs font-bold text-white block">
                      Alfaiataria & Vestidos de Festa
                    </span>
                  </div>
                  <span className="text-[10px] bg-white text-black font-extrabold px-2.5 py-0.5 rounded-full">
                    Manaus - AM
                  </span>
                </div>
              </div>
            </div>

            {/* Carousel Dots */}
            <div className="flex items-center gap-2 mt-4 z-20">
              {slides.map((_, dot) => (
                <button
                  key={dot}
                  onClick={() => setCurrentSlide(dot)}
                  className={`h-2 rounded-full transition-all ${
                    dot === currentSlide
                      ? 'bg-white w-6'
                      : 'bg-white/30 hover:bg-white/60 w-2'
                  }`}
                  aria-label={`Slide ${dot + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right Column: Luxury Brand Pillars */}
          <div className="hidden md:flex md:col-span-3 2xl:col-span-3 flex-col items-center text-center space-y-5">
            <div className="bg-white/[0.05] backdrop-blur-md p-6 rounded-3xl border border-white/10 w-full shadow-2xl space-y-4">
              <BrandLogo variant="white" size="lg" />

              <div className="inline-block px-3.5 py-1 rounded-full bg-white text-black text-[11px] font-extrabold uppercase tracking-widest shadow-sm">
                Plus Size de Luxo
              </div>

              {/* 3 Value Pillars */}
              <div className="grid grid-cols-1 gap-3 pt-3 border-t border-white/10 text-left">
                <div className="flex items-center gap-3 p-2 rounded-xl bg-white/5 border border-white/5">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-neutral-200 shrink-0">
                    <Shirt className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">Modelagem Anatômica</span>
                    <span className="text-[10px] text-neutral-400">Caimento sob medida para o corpo</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-2 rounded-xl bg-white/5 border border-white/5">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-neutral-200 shrink-0">
                    <Gem className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">Acabamento Impecável</span>
                    <span className="text-[10px] text-neutral-400">Tecidos selecionados e costura fina</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-2 rounded-xl bg-white/5 border border-white/5">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-neutral-200 shrink-0">
                    <Heart className="w-4 h-4 fill-white" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">Autoestima & Conforto</span>
                    <span className="text-[10px] text-neutral-400">Você sempre linda e confiante</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
