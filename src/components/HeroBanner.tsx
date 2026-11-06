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
      badge: 'Coleção Manaus 2026',
      headline: storeCMS.bannerHeadline || 'Elegância Sem Medidas ♡',
      subheadline:
        storeCMS.bannerSubheadline ||
        'Modelagens do G ao G3 pensadas sob medida para valorizar suas curvas com conforto absoluto.',
      cta: 'Ver Coleção Exclusiva',
    },
    {
      badge: 'Pronta Entrega Manaus',
      headline: 'Beleza em Todas as Formas ✨',
      subheadline:
        'Peças premium em alfaiataria e tecidos nobres. Receba hoje mesmo via motoboy ou retire no showroom.',
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
    <div className="w-full px-2 sm:px-6 lg:px-10 2xl:px-12 pt-2 sm:pt-4">
      {/* ========================================================
          MOBILE HERO VIEW (< md) — Compact, Fast & High Conversion
          ======================================================== */}
      <div className="md:hidden relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#09090C] via-[#121215] to-[#0A0A0D] text-white shadow-xl border border-neutral-800 p-4 sm:p-6 space-y-4">
        {/* Background Ambient Glow */}
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/[0.06] blur-2xl pointer-events-none" />

        {/* Mobile Top: Badge & Attendant Indicator */}
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold uppercase tracking-wider text-neutral-200 border border-white/15">
            <Sparkles className="w-3 h-3 text-neutral-300" />
            <span>{current.badge}</span>
          </span>

          <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Motoboy Manaus Ativo
          </span>
        </div>

        {/* Mobile Card: Model & Headlines in Harmony */}
        <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden shadow-md border border-white/15 bg-neutral-900">
          <Image
            src="/images/hero-model.jpg"
            alt="Modelo Plus Size MIIXXIIE"
            fill
            priority
            sizes="100vw"
            className="object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

          {/* Floating Text Over Bottom of Image */}
          <div className="absolute bottom-3 left-3 right-3 text-left space-y-0.5">
            <h1 className="font-script text-3xl sm:text-4xl font-bold text-white drop-shadow-md leading-tight">
              {current.headline}
            </h1>
            <p className="text-[11px] text-neutral-300 line-clamp-2 leading-tight">
              {current.subheadline}
            </p>
          </div>
        </div>

        {/* Mobile Action Buttons (Full Width & Touch-Friendly) */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={scrollToProducts}
            className="flex items-center justify-center gap-1.5 bg-white text-black font-extrabold text-xs py-3 px-3 rounded-xl shadow-md active:scale-95 transition-transform"
          >
            <span>Ver Peças</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() =>
              openWhatsAppLead(
                'Olá! Gostaria de consultar os looks da MIIXXIIE em Manaus. 🌸',
                'mobile_hero'
              )
            }
            className="flex items-center justify-center gap-1.5 bg-[#25D366] text-white font-extrabold text-xs py-3 px-3 rounded-xl shadow-md active:scale-95 transition-transform"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-white" />
            <span>WhatsApp</span>
          </button>
        </div>

        {/* Mobile Swipe / Carousel Dots */}
        <div className="flex items-center justify-center gap-1.5 pt-1">
          {slides.map((_, dot) => (
            <button
              key={dot}
              onClick={() => setCurrentSlide(dot)}
              className={`h-1.5 rounded-full transition-all ${
                dot === currentSlide ? 'bg-white w-5' : 'bg-white/30 w-1.5'
              }`}
              aria-label={`Slide ${dot + 1}`}
            />
          ))}
        </div>
      </div>

      {/* ========================================================
          DESKTOP HERO VIEW (md:) — Luxury Editorial Multi-column
          ======================================================== */}
      <div className="hidden md:flex relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#070709] via-[#111114] to-[#0A0A0D] text-white shadow-2xl border border-neutral-800/80 min-h-[480px] lg:min-h-[520px] items-center">
        {/* Decorative Gradients */}
        <div className="absolute -top-32 -left-32 w-[420px] h-[420px] rounded-full bg-gradient-to-br from-white/[0.07] to-transparent blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-[420px] h-[420px] rounded-full bg-gradient-to-tl from-white/[0.05] to-transparent blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.08),transparent_65%)] pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

        {/* Prev / Next Buttons */}
        <button
          onClick={handlePrev}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/10 backdrop-blur-md transition-all hover:scale-105 active:scale-95"
          aria-label="Slide anterior"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/10 backdrop-blur-md transition-all hover:scale-105 active:scale-95"
          aria-label="Próximo slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Grid Container */}
        <div className="w-full grid grid-cols-12 items-center px-10 lg:px-16 2xl:px-24 py-12 z-10 gap-8 lg:gap-10">
          {/* Left Column: Headlines & Action */}
          <div className="col-span-6 lg:col-span-5 space-y-4 text-left">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold tracking-wider uppercase text-neutral-200 border border-white/15 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-neutral-300" />
              <span>{current.badge}</span>
            </div>

            <div className="space-y-2">
              <h1 className="font-script text-5xl lg:text-6xl 2xl:text-7xl font-bold text-white tracking-wide leading-tight drop-shadow-md">
                {current.headline}
              </h1>
              <p className="text-sm lg:text-base text-neutral-300 font-normal max-w-lg leading-relaxed">
                {current.subheadline}
              </p>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={scrollToProducts}
                className="inline-flex items-center justify-center gap-2.5 bg-white hover:bg-neutral-200 text-black text-xs sm:text-sm font-extrabold px-7 py-3.5 rounded-full shadow-xl hover:shadow-2xl transition-all border border-neutral-300 hover:scale-105 active:scale-95"
              >
                <span>{current.cta}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() =>
                  openWhatsAppLead(
                    'Olá! Gostaria de consultar os modelos disponíveis no mostruário da MIIXXIIE em Manaus. 🌸',
                    'desktop_hero'
                  )
                }
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs sm:text-sm font-extrabold px-6 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all border border-white/20 hover:scale-105 active:scale-95"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Atendimento WhatsApp</span>
              </button>
            </div>

            <div className="pt-2 flex items-center gap-3 text-[11px] text-neutral-400">
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
                <span>Modelagem G ao G3</span>
              </div>
            </div>
          </div>

          {/* Center Column: Model Photo */}
          <div className="col-span-6 lg:col-span-4 flex flex-col items-center justify-center relative">
            <div className="relative w-72 lg:w-80 xl:w-96 h-96 lg:h-[440px] xl:h-[470px] rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20 group bg-neutral-900">
              <Image
                src="/images/hero-model.jpg"
                alt="Modelo Plus Size MIIXXIIE"
                fill
                priority
                sizes="(max-width: 1024px) 320px, 380px"
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-3 left-3 right-3 bg-black/75 backdrop-blur-md rounded-2xl p-2.5 border border-white/15 text-left text-white shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block">
                      Coleção Exclusiva
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

            <div className="flex items-center gap-2 mt-4 z-20">
              {slides.map((_, dot) => (
                <button
                  key={dot}
                  onClick={() => setCurrentSlide(dot)}
                  className={`h-2 rounded-full transition-all ${
                    dot === currentSlide ? 'bg-white w-6' : 'bg-white/30 hover:bg-white/60 w-2'
                  }`}
                  aria-label={`Slide ${dot + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right Column: Values */}
          <div className="hidden lg:flex lg:col-span-3 flex-col items-center text-center space-y-5">
            <div className="bg-white/[0.05] backdrop-blur-md p-6 rounded-3xl border border-white/10 w-full shadow-2xl space-y-4">
              <BrandLogo variant="white" size="lg" />

              <div className="inline-block px-3.5 py-1 rounded-full bg-white text-black text-[11px] font-extrabold uppercase tracking-widest shadow-sm">
                Plus Size de Luxo
              </div>

              <div className="grid grid-cols-1 gap-2.5 pt-3 border-t border-white/10 text-left">
                <div className="flex items-center gap-3 p-2 rounded-xl bg-white/5 border border-white/5">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-neutral-200 shrink-0">
                    <Shirt className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">Modelagem Anatômica</span>
                    <span className="text-[10px] text-neutral-400">Caimento sob medida</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-2 rounded-xl bg-white/5 border border-white/5">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-neutral-200 shrink-0">
                    <Gem className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">Acabamento Fino</span>
                    <span className="text-[10px] text-neutral-400">Costura de alfaiataria</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-2 rounded-xl bg-white/5 border border-white/5">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-neutral-200 shrink-0">
                    <Heart className="w-4 h-4 fill-white" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">Autoestima</span>
                    <span className="text-[10px] text-neutral-400">Você sempre linda</span>
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
