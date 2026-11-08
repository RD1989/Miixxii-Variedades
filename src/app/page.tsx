'use client';

import React from 'react';
import { TopBar } from '@/components/TopBar';
import { Header } from '@/components/Header';
import { HeroBanner } from '@/components/HeroBanner';
import { CategoryBar } from '@/components/CategoryBar';
import { ProductGrid } from '@/components/ProductGrid';
import { Footer } from '@/components/Footer';
import { BottomNav } from '@/components/BottomNav';
import { ProductDetailModal } from '@/components/ProductDetailModal';
import { CartDrawer } from '@/components/CartDrawer';
import { WhatsAppCheckoutModal } from '@/components/WhatsAppCheckoutModal';
import { InfoModal } from '@/components/InfoModal';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col pb-16 md:pb-0 bg-[#FBFBFC]">
      {/* 1. Minimal Announcement Bar */}
      <TopBar />

      {/* 2. Main Header with Search & Bag */}
      <Header />

      {/* 3. Hero Banner Carousel with Official Categories */}
      <HeroBanner />

      {/* 4. Circular Categories Rail */}
      <CategoryBar />

      {/* 5. Clean, Unified Product Catalog (No visual clutter) */}
      <ProductGrid />

      {/* 6. Refined Luxury Footer */}
      <Footer />

      {/* 7. Mobile Fixed Bottom Navigation */}
      <BottomNav />

      {/* 8. Interactive Modals & Drawers */}
      <ProductDetailModal />
      <CartDrawer />
      <WhatsAppCheckoutModal />
      <InfoModal />
    </main>
  );
}
