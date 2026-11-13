'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  LayoutDashboard,
  Kanban,
  ShoppingBag,
  BarChart3,
  Settings,
  LogOut,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Store,
  Sparkles,
  Menu,
  X,
  Phone,
  ArrowLeft,
  Truck,
  Database,
  CheckCircle2,
  Users,
  Layers,
  MessageCircle,
  MapPin,
  FolderTree,
} from 'lucide-react';
import { useStore } from '@/store/useStore';
import { AdminLogin } from '@/components/admin/AdminLogin';
import { AdminKanbanBoard } from '@/components/admin/AdminKanbanBoard';
import { AdminProductManager } from '@/components/admin/AdminProductManager';
import { AdminCategoryManager } from '@/components/admin/AdminCategoryManager';
import { AdminMetricsAndClicks } from '@/components/admin/AdminMetricsAndClicks';
import { AdminStoreCustomizer } from '@/components/admin/AdminStoreCustomizer';
import { AdminManausDelivery } from '@/components/admin/AdminManausDelivery';
import { AdminAttendantsManager } from '@/components/admin/AdminAttendantsManager';
import { formatCurrencyBRL } from '@/data/mockData';

type AdminTab =
  | 'dashboard'
  | 'kanban'
  | 'produtos'
  | 'categorias'
  | 'banners'
  | 'entregas'
  | 'atendentes'
  | 'metricas'
  | 'customizacao';

export default function AdminPage() {
  const {
    isAdminLoggedIn,
    adminUser,
    logoutAdmin,
    products,
    categories,
    adminOrders,
    attendants,
    storeCMS,
    neighborhoods,
  } = useStore();

  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // If not authenticated, show professional login screen
  if (!isAdminLoggedIn) {
    return <AdminLogin />;
  }

  const handleTabChange = (tab: AdminTab) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const mariaLeads = attendants.find((a) => a.id === 'maria')?.clicksCount || 0;
  const carlosLeads = attendants.find((a) => a.id === 'carlos')?.clicksCount || 0;
  const totalRevenue = adminOrders.reduce((sum, o) => sum + o.total, 0);

  const menuItems: { id: AdminTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    {
      id: 'dashboard',
      label: 'Visão Geral',
      icon: <LayoutDashboard className="w-4 h-4" />,
    },
    {
      id: 'kanban',
      label: 'Kanban de Pedidos',
      icon: <Kanban className="w-4 h-4" />,
      badge: `${adminOrders.length}`,
    },
    {
      id: 'produtos',
      label: 'Mostruário & Estoque',
      icon: <ShoppingBag className="w-4 h-4" />,
      badge: `${products.length}`,
    },
    {
      id: 'categorias',
      label: 'Categorias da Loja',
      icon: <FolderTree className="w-4 h-4" />,
      badge: `${(categories || []).filter((c) => c.isActive !== false).length}/${categories?.length || 10}`,
    },
    {
      id: 'banners',
      label: 'Banners & Carrossel',
      icon: <Layers className="w-4 h-4" />,
      badge: '10 Cat',
    },
    {
      id: 'entregas',
      label: 'Entregas & Bairros Manaus',
      icon: <Truck className="w-4 h-4" />,
      badge: `${neighborhoods?.length || 10}`,
    },
    {
      id: 'atendentes',
      label: 'Equipe WhatsApp',
      icon: <MessageCircle className="w-4 h-4" />,
      badge: `${attendants.length}`,
    },
    {
      id: 'metricas',
      label: 'Métricas & Cliques',
      icon: <BarChart3 className="w-4 h-4" />,
      badge: `${mariaLeads + carlosLeads}`,
    },
    {
      id: 'customizacao',
      label: 'Loja & Supabase',
      icon: <Settings className="w-4 h-4" />,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F8FA] flex flex-col md:flex-row text-neutral-900 font-sans selection:bg-black selection:text-white">
      {/* 1. SIDEBAR (Desktop) */}
      <aside className="hidden md:flex flex-col w-64 lg:w-72 bg-[#09090B] text-neutral-300 border-r border-neutral-800 p-5 space-y-6 shrink-0 justify-between">
        <div className="space-y-6">
          {/* Brand Logo in Admin */}
          <div className="space-y-2 pb-4 border-b border-neutral-800/80">
            <Link href="/" className="inline-block group">
              <div className="relative w-44 h-12">
                <Image
                  src="/images/logo-white.png"
                  alt="MIIXXIIE Variedades"
                  fill
                  priority
                  className="object-contain"
                />
              </div>
            </Link>
            <div className="flex items-center justify-between text-[11px] pt-1">
              <span className="text-neutral-400 font-medium">Gestão Manaus - AM</span>
              <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.2 rounded-full font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Painel Ativo
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5 text-xs font-semibold">
            {menuItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                    isActive
                      ? 'bg-white text-black font-extrabold shadow-md scale-[1.02]'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  {item.badge ? (
                    <span
                      className={`text-[10px] px-2 py-0.2 rounded-full font-bold ${
                        isActive
                          ? 'bg-black text-white'
                          : 'bg-neutral-800 text-neutral-300'
                      }`}
                    >
                      {item.badge}
                    </span>
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 opacity-40" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer: User & Logout */}
        <div className="pt-4 border-t border-neutral-800/80 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center font-bold text-xs shrink-0">
              {adminUser?.name?.charAt(0) || 'M'}
            </div>
            <div className="truncate">
              <span className="block text-xs font-bold text-white truncate">
                {adminUser?.name || 'Administrador'}
              </span>
              <span className="block text-[10px] text-neutral-400 truncate">
                {adminUser?.email || 'admin@miixxiie.com.br'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <Link
              href="/"
              target="_blank"
              className="flex-1 py-1.5 px-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-[11px] font-semibold rounded-lg flex items-center justify-center gap-1 transition-colors"
            >
              <ExternalLink className="w-3 h-3" />
              <span>Ver Loja</span>
            </Link>

            <button
              onClick={logoutAdmin}
              className="p-1.5 bg-neutral-900 hover:bg-red-950 text-neutral-400 hover:text-red-400 rounded-lg transition-colors"
              title="Sair do Painel"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* 2. MOBILE TOPBAR */}
      <div className="md:hidden bg-[#09090B] text-white p-4 flex items-center justify-between border-b border-neutral-800 sticky top-0 z-40">
        <div className="relative w-36 h-10">
          <Image
            src="/images/logo-white.png"
            alt="MIIXXIIE"
            fill
            priority
            className="object-contain"
          />
        </div>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-xl bg-neutral-800 text-white"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#121214] border-b border-neutral-800 p-4 space-y-2 text-xs font-semibold text-neutral-300">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.id)}
              className={`w-full p-2.5 rounded-xl text-left flex items-center justify-between ${
                activeTab === item.id ? 'bg-white text-black font-extrabold' : ''
              }`}
            >
              <div className="flex items-center gap-2">
                {item.icon}
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="text-[10px] bg-neutral-800 text-neutral-300 px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </button>
          ))}

          <div className="pt-2 border-t border-neutral-800 flex justify-between items-center">
            <Link href="/" className="text-xs text-neutral-400 underline">
              Ver Loja Virtual
            </Link>
            <button onClick={logoutAdmin} className="text-xs text-red-400 font-bold">
              Sair
            </button>
          </div>
        </div>
      )}

      {/* 3. MAIN CONTENT WORKSPACE */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        {/* Workspace Top Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-6 border-b border-neutral-200 mb-6">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-400">
              MIIXXIIE • Gestão de Comércio Local Manaus
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-neutral-900 tracking-tight capitalize">
              {activeTab === 'dashboard' && 'Painel de Controle Executivo'}
              {activeTab === 'kanban' && 'Quadro Kanban de Vendas & Pedidos'}
              {activeTab === 'produtos' && 'Mostruário & Gestão Completa de Estoque'}
              {activeTab === 'banners' && 'Gestão de Banners das 10 Categorias'}
              {activeTab === 'entregas' && 'Entregas por Motoboy & Showroom em Manaus'}
              {activeTab === 'atendentes' && 'Equipe de Atendentes & Rotação WhatsApp'}
              {activeTab === 'metricas' && 'Métricas Reais & Rastreio de Leads'}
              {activeTab === 'customizacao' && 'Customização da Loja & Conexão Supabase'}
            </h1>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-2 text-xs font-semibold">
            <div className="bg-white px-3 py-1.5 rounded-xl border border-neutral-200 shadow-2xs flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-neutral-600" />
              <span>Manaus: Motoboy & Showroom</span>
            </div>
            <Link
              href="/"
              target="_blank"
              className="bg-black hover:bg-neutral-800 text-white px-3.5 py-1.5 rounded-xl transition-all shadow-xs flex items-center gap-1"
            >
              <span>Abrir Loja</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* TAB 1: DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-3xl border border-neutral-200 shadow-xs space-y-2">
                <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                  Pedidos no Kanban
                </span>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl sm:text-3xl font-black text-neutral-900">
                    {adminOrders.length}
                  </span>
                  <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-full">
                    Ativo
                  </span>
                </div>
                <p className="text-[11px] text-neutral-400">Fluxo em tempo real</p>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-neutral-200 shadow-xs space-y-2">
                <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                  Faturamento do Fluxo
                </span>
                <div className="flex items-baseline justify-between">
                  <span className="text-xl sm:text-2xl font-black text-neutral-900">
                    {formatCurrencyBRL(totalRevenue)}
                  </span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                    Ativo
                  </span>
                </div>
                <p className="text-[11px] text-neutral-400">Total em pedidos ativos</p>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-neutral-200 shadow-xs space-y-2">
                <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                  Mostruário de Peças
                </span>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl sm:text-3xl font-black text-neutral-900">
                    {products.length}
                  </span>
                  <span className="text-[10px] bg-neutral-100 text-neutral-700 font-bold px-2 py-0.5 rounded-full">
                    10 Categorias
                  </span>
                </div>
                <p className="text-[11px] text-neutral-400">Vestidos, Conjuntos, Calças...</p>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-neutral-200 shadow-xs space-y-2">
                <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                  Cliques no WhatsApp
                </span>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl sm:text-3xl font-black text-neutral-900">
                    {mariaLeads + carlosLeads}
                  </span>
                  <span className="text-[10px] bg-pink-100 text-pink-800 font-bold px-2 py-0.5 rounded-full">
                    Maria & Carlos
                  </span>
                </div>
                <p className="text-[11px] text-neutral-400">Alternância dinâmica 50/50</p>
              </div>
            </div>

            {/* Quick Access Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <button
                onClick={() => handleTabChange('categorias')}
                className="bg-white p-5 rounded-3xl border border-neutral-200 text-left hover:border-black transition-all shadow-xs group"
              >
                <div className="w-10 h-10 rounded-2xl bg-neutral-100 group-hover:bg-black group-hover:text-white flex items-center justify-center transition-colors mb-3">
                  <FolderTree className="w-5 h-5" />
                </div>
                <h4 className="font-extrabold text-sm text-neutral-900">Categorias da Loja</h4>
                <p className="text-xs text-neutral-500 mt-1">
                  Ative, pause, edite nomes e fotos circulares, e ordene as categorias da vitrine.
                </p>
              </button>
              <button
                onClick={() => handleTabChange('produtos')}
                className="bg-white p-5 rounded-3xl border border-neutral-200 text-left hover:border-black transition-all shadow-xs group"
              >
                <div className="w-10 h-10 rounded-2xl bg-neutral-100 group-hover:bg-black group-hover:text-white flex items-center justify-center transition-colors mb-3">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <h4 className="font-extrabold text-sm text-neutral-900">Gerenciar Mostruário & Estoque</h4>
                <p className="text-xs text-neutral-500 mt-1">
                  Cadastre novos modelos, ajuste quantidades por tamanho, adicione cores e destaque peças.
                </p>
              </button>

              <button
                onClick={() => handleTabChange('kanban')}
                className="bg-white p-5 rounded-3xl border border-neutral-200 text-left hover:border-black transition-all shadow-xs group"
              >
                <div className="w-10 h-10 rounded-2xl bg-neutral-100 group-hover:bg-black group-hover:text-white flex items-center justify-center transition-colors mb-3">
                  <Kanban className="w-5 h-5" />
                </div>
                <h4 className="font-extrabold text-sm text-neutral-900">Kanban de Vendas no WhatsApp</h4>
                <p className="text-xs text-neutral-500 mt-1">
                  Mova os pedidos recebidos: Novo Lead, Pagamento, Separação de Estoque e Entrega em Manaus.
                </p>
              </button>

              <button
                onClick={() => handleTabChange('entregas')}
                className="bg-white p-5 rounded-3xl border border-neutral-200 text-left hover:border-black transition-all shadow-xs group"
              >
                <div className="w-10 h-10 rounded-2xl bg-neutral-100 group-hover:bg-black group-hover:text-white flex items-center justify-center transition-colors mb-3">
                  <Truck className="w-5 h-5" />
                </div>
                <h4 className="font-extrabold text-sm text-neutral-900">Bairros & Taxas de Entrega</h4>
                <p className="text-xs text-neutral-500 mt-1">
                  Configure as taxas de motoboy para cada bairro de Manaus e regras de retirada no Showroom.
                </p>
              </button>
            </div>

            {/* Kanban Preview */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-base text-neutral-900">
                  Visão Rápida do Kanban de Pedidos
                </h3>
                <button
                  onClick={() => handleTabChange('kanban')}
                  className="text-xs font-bold text-black hover:underline"
                >
                  Abrir Kanban Completo →
                </button>
              </div>
              <AdminKanbanBoard />
            </div>
          </div>
        )}

        {/* TAB 2: KANBAN */}
        {activeTab === 'kanban' && <AdminKanbanBoard />}

        {/* TAB 3: PRODUTOS */}
        {activeTab === 'produtos' && <AdminProductManager />}

        {/* TAB 3.5: CATEGORIAS */}
        {activeTab === 'categorias' && <AdminCategoryManager />}

        {/* TAB 4: BANNERS */}
        {activeTab === 'banners' && <AdminStoreCustomizer />}

        {/* TAB 5: ENTREGAS MANAUS */}
        {activeTab === 'entregas' && <AdminManausDelivery />}

        {/* TAB 6: ATENDENTES */}
        {activeTab === 'atendentes' && <AdminAttendantsManager />}

        {/* TAB 7: MÉTRICAS & CLIQUES */}
        {activeTab === 'metricas' && <AdminMetricsAndClicks />}

        {/* TAB 8: CUSTOMIZAÇÃO & SUPABASE */}
        {activeTab === 'customizacao' && <AdminStoreCustomizer />}
      </main>
    </div>
  );
}