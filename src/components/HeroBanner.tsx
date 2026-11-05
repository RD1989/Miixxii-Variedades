'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ArrowRight, Heart, Sparkles, Gem, Shirt } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

export const HeroBanner: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      scriptTitle: 'Estilo, Conforto e Autoestima',
      subtitle: 'Moda Plus Size elegante para você se sentir ainda mais confiante e linda!',
      cta: 'Confira as Novidades',
      badge: 'Coleção Exclusiva Manaus',
    },
    {
      scriptTitle: 'Beleza em Todas as Formas',
      subtitle: 'Modelagens anatômicas do G ao G3 pensadas sob medida para o seu corpo.',
      cta: 'Ver Coleção Completa',
      badge: 'Lançamentos 2026',
    },
  ];

  const handleNext = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const handlePrev = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const scrollToProducts = () => {
    const el = document.getElementById('novidades-section');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full px-3 sm:px-6 lg:px-10 2xl:px-12 pt-4 sm:pt-6">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#09090B] via-[#141416] to-[#0A0A0C] text-white shadow-2xl border border-neutral-800 min-h-[380px] sm:min-h-[460px] lg:min-h-[500px] flex items-center">
        {/* Decorative background glows & geometric shapes */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white/[0.04] blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-white/[0.03] blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.06),transparent_60%)] pointer-events-none" />

        {/* Carousel Prev/Next Buttons */}
        <button
          onClick={handlePrev}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/10 backdrop-blur-sm transition-all"
          aria-label="Slide anterior"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/10 backdrop-blur-sm transition-all"
          aria-label="Próximo slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Hero Grid Container */}
        <div className="w-full grid grid-cols-1 md:grid-cols-12 items-center px-6 sm:px-12 md:px-16 2xl:px-24 py-8 sm:py-12 z-10 gap-6 lg:gap-10">
          {/* Left Column: Script Catchphrase & Call to Action */}
          <div className="md:col-span-4 2xl:col-span-4 text-center md:text-left space-y-3 sm:space-y-4">
            <div className="inline-block px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-neutral-200 border border-white/15">
              {slides[currentSlide].badge}
            </div>

            <div className="space-y-1 sm:space-y-2">
              <h1 className="font-script text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-wide leading-tight drop-shadow-md">
                {slides[currentSlide].scriptTitle}{' '}
                <span className="inline-block text-neutral-300">♡</span>
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-neutral-300 font-normal max-w-md mx-auto md:mx-0 leading-relaxed">
                {slides[currentSlide].subtitle}
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={scrollToProducts}
                className="inline-flex items-center gap-2.5 bg-white hover:bg-neutral-200 text-black text-xs sm:text-sm font-extrabold px-7 py-3.5 rounded-full shadow-xl hover:shadow-2xl transition-all border border-neutral-300 hover:scale-105 active:scale-95"
              >
                <span>{slides[currentSlide].cta}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Center Column: Model Hero Photo with Carousel Dots */}
          <div className="md:col-span-4 2xl:col-span-4 flex flex-col items-center justify-center relative">
            <div className="relative w-64 sm:w-72 md:w-80 lg:w-96 h-72 sm:h-80 md:h-96 lg:h-[420px] rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 group bg-neutral-900">
              <Image
                src="/images/hero-model.jpg"
                alt="Modelo Plus Size MIIXXIIE"
                fill
                priority
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>

            {/* Carousel Dots */}
            <div className="flex items-center gap-2 mt-4 z-20">
              {[0, 1, 2, 3].map((dot) => (
                <button
                  key={dot}
                  onClick={() => setCurrentSlide(dot % slides.length)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    dot === currentSlide
                      ? 'bg-white w-6'
                      : 'bg-white/30 hover:bg-white/60'
                  }`}
                  aria-label={`Ir para slide ${dot + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right Column: Brand Values (Visible on Desktop as in Lealt.jpeg) */}
          <div className="hidden md:flex md:col-span-4 2xl:col-span-4 flex-col items-center text-center space-y-6">
            <div className="bg-white/[0.06] backdrop-blur-md p-6 lg:p-8 rounded-3xl border border-white/10 w-full max-w-sm lg:max-w-md shadow-2xl">
              <BrandLogo variant="white" size="lg" />

              <div className="inline-block mt-3 px-4 py-1.5 rounded-full bg-white text-black text-xs font-extrabold uppercase tracking-widest shadow-sm">
                Moda Plus Size Feminina
              </div>

              {/* 3 Value Pillars */}
              <div className="grid grid-cols-3 gap-3 mt-6 pt-6 border-t border-white/10">
                {/* 1. Modelagem */}
                <div className="flex flex-col items-center gap-2 text-center">
                  <div className="w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-neutral-200 shadow-sm">
                    <Shirt className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] leading-tight font-medium text-neutral-300">
                    Modelagens que valorizam suas curvas
                  </span>
                </div>

                {/* 2. Qualidade */}
                <div className="flex flex-col items-center gap-2 text-center">
                  <div className="w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-neutral-200 shadow-sm">
                    <Gem className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] leading-tight font-medium text-neutral-300">
                    Qualidade em cada detalhe
                  </span>
                </div>

                {/* 3. Autoestima */}
                <div className="flex flex-col items-center gap-2 text-center">
                  <div className="w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-neutral-200 shadow-sm">
                    <Heart className="w-5 h-5 fill-neutral-300 stroke-none" />
                  </div>
                  <span className="text-[11px] leading-tight font-medium text-neutral-300">
                    Você sempre mais linda!
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
