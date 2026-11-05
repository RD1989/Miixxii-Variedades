'use client';

import React from 'react';
import { TopBar } from '@/components/TopBar';
import { Header } from '@/components/Header';
import { Navbar } from '@/components/Navbar';
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
    <main className="min-h-screen flex flex-col pb-16 md:pb-0 bg-[#F8F8FA]">
      {/* 1. Burgundy Top Bar */}
      <TopBar />

      {/* 2. Main Header with Search & Icons */}
      <Header />

      {/* 3. Navigation Bar (Desktop) */}
      <Navbar />

      {/* 4. Hero Banner Carousel with Values */}
      <HeroBanner />

      {/* 5. 8 Circular Categories Bar */}
      <CategoryBar />

      {/* 6. Products Grid with 'Novidades' Header */}
      <ProductGrid />

      {/* 7. Benefits, Burgundy Strip & Institutional Footer */}
      <Footer />

      {/* 8. Mobile Fixed Bottom Navigation */}
      <BottomNav />

      {/* 9. Interactive Modals & Drawers */}
      <ProductDetailModal />
      <CartDrawer />
      <WhatsAppCheckoutModal />
      <InfoModal />
    </main>
  );
}
