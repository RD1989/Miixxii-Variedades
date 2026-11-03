'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  LayoutDashboard,
  Shirt,
  Grid,
  ShoppingBag,
  Users,
  Ticket,
  Image as ImageIcon,
  BarChart3,
  Settings,
  LogOut,
  Bell,
  Search,
  MessageCircle,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Star,
  CheckCircle2,
  Clock,
  Eye,
  Filter,
  Plus,
  ArrowUpRight,
  Sparkles,
  Menu,
  X,
  Phone,
  ArrowLeft,
} from 'lucide-react';
import { ADMIN_DASHBOARD_DATA, formatCurrencyBRL, PRODUCTS } from '@/data/mockData';
import { useStore, AdminOrder } from '@/store/useStore';

export default function AdminPage() {
  const { adminOrders, updateOrderStatus, openInfoModal } = useStore();

  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'produtos' | 'pedidos' | 'clientes' | 'relatorios' | 'cupons' | 'configuracoes'
  >('dashboard');
  const [isStoreOnline, setIsStoreOnline] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState<AdminOrder | null>(null);
  const [selectedChartPoint, setSelectedChartPoint] = useState(
    ADMIN_DASHBOARD_DATA.salesChart30Days.find((p) => p.highlight) || ADMIN_DASHBOARD_DATA.salesChart30Days[8]
  );

  const handleTabChange = (tab: typeof activeTab) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FDF4F7] flex flex-col md:flex-row text-gray-800 pb-20 md:pb-0">
      {/* 1. Desktop Permanent Sidebar (Vinho Escuro) */}
      <aside className="hidden md:flex md:w-64 bg-gradient-to-b from-[#6B0833] via-[#7F0A3D] to-[#9E0B4B] text-white flex-col justify-between shrink-0 shadow-2xl z-30 min-h-screen sticky top-0">
        <div>
          {/* Logo Header */}
          <div className="p-6 border-b border-pink-400/20 flex flex-col items-center text-center">
            <Link href="/" className="group flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-white p-2 shadow-lg flex items-center justify-center border-2 border-pink-300 transition-transform group-hover:scale-105">
                <div className="text-center">
                  <span className="font-brand font-bold text-xs tracking-wider text-[#6B0833] block">
                    MIIXXIIE
                  </span>
                  <span className="font-script text-xs text-[#C8105D] -mt-1 block">
                    Variedades ♡
                  </span>
                </div>
              </div>
              <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-pink-200 mt-2">
                Moda Plus Size Feminina
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            <button
              onClick={() => handleTabChange('dashboard')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-[#C8105D] text-white shadow-md'
                  : 'text-pink-100/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => handleTabChange('produtos')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'produtos'
                  ? 'bg-[#C8105D] text-white shadow-md'
                  : 'text-pink-100/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Shirt className="w-4 h-4" />
              <span>Produtos</span>
            </button>

            <button
              onClick={() =>
                openInfoModal(
                  'Gestão de Categorias',
                  'Permite criar, reordenar e editar as 8 categorias ativas da vitrine (Vestidos, Conjuntos, Blusas, Calças, Shorts, Saias, Macacões, Plus Size).'
                )
              }
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-medium text-pink-100/80 hover:bg-white/10 hover:text-white transition-all"
            >
              <Grid className="w-4 h-4" />
              <span>Categorias</span>
            </button>

            <button
              onClick={() => handleTabChange('pedidos')}
              className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'pedidos'
                  ? 'bg-[#C8105D] text-white shadow-md'
                  : 'text-pink-100/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-4 h-4" />
                <span>Pedidos</span>
              </div>
              <span className="bg-[#C8105D] text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/20">
                24
              </span>
            </button>

            <button
              onClick={() => handleTabChange('clientes')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'clientes'
                  ? 'bg-[#C8105D] text-white shadow-md'
                  : 'text-pink-100/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Clientes</span>
            </button>

            <button
              onClick={() => handleTabChange('cupons')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'cupons'
                  ? 'bg-[#C8105D] text-white shadow-md'
                  : 'text-pink-100/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Ticket className="w-4 h-4" />
              <span>Cupons</span>
            </button>

            <button
              onClick={() =>
                openInfoModal(
                  'Gestão de Banners Promocionais',
                  'Configure os slides da página inicial, campanhas sazonais e anúncios de frete grátis em Manaus.'
                )
              }
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-medium text-pink-100/80 hover:bg-white/10 hover:text-white transition-all"
            >
              <ImageIcon className="w-4 h-4" />
              <span>Banners</span>
            </button>

            <button
              onClick={() => handleTabChange('relatorios')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'relatorios'
                  ? 'bg-[#C8105D] text-white shadow-md'
                  : 'text-pink-100/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Relatórios</span>
            </button>

            <button
              onClick={() => handleTabChange('configuracoes')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'configuracoes'
                  ? 'bg-[#C8105D] text-white shadow-md'
                  : 'text-pink-100/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Configurações</span>
            </button>

            <Link
              href="/"
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-medium text-pink-200 hover:bg-white/10 hover:text-white transition-all pt-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Voltar para a Loja</span>
            </Link>
          </nav>
        </div>

        {/* Sidebar Bottom Banner with Model Photo */}
        <div className="p-4">
          <div className="relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-md p-3 border border-white/20 text-center">
            <div className="relative w-full h-28 rounded-xl overflow-hidden mb-2 bg-pink-900/40">
              <Image
                src="/images/admin-banner-model.jpg"
                alt="Moda Plus Size"
                fill
                className="object-cover object-top"
              />
            </div>
            <p className="font-script text-base text-pink-200 font-bold leading-tight">
              Moda Plus Size com muito estilo e amor! ♡
            </p>
          </div>
        </div>
      </aside>

      {/* 2. Mobile Slide-Over Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer Content */}
          <div className="relative w-4/5 max-w-xs bg-gradient-to-b from-[#6B0833] via-[#7F0A3D] to-[#9E0B4B] text-white h-full shadow-2xl flex flex-col justify-between p-5 z-10 animate-in slide-in-from-left duration-250">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-pink-400/20">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-white p-1 flex items-center justify-center">
                    <span className="font-brand font-bold text-[10px] text-[#6B0833]">MX</span>
                  </div>
                  <div>
                    <span className="font-brand font-bold text-xs text-white block">MIIXXIIE</span>
                    <span className="text-[10px] text-pink-200">Painel Admin</span>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 rounded-full text-pink-200 hover:text-white"
                  aria-label="Fechar menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="mt-4 space-y-1">
                <button
                  onClick={() => handleTabChange('dashboard')}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold ${
                    activeTab === 'dashboard' ? 'bg-[#C8105D] text-white shadow-sm' : 'text-pink-100 hover:bg-white/10'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Dashboard</span>
                </button>

                <button
                  onClick={() => handleTabChange('produtos')}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium ${
                    activeTab === 'produtos' ? 'bg-[#C8105D] text-white shadow-sm' : 'text-pink-100 hover:bg-white/10'
                  }`}
                >
                  <Shirt className="w-4 h-4" />
                  <span>Produtos</span>
                </button>

                <button
                  onClick={() => handleTabChange('pedidos')}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium ${
                    activeTab === 'pedidos' ? 'bg-[#C8105D] text-white shadow-sm' : 'text-pink-100 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <ShoppingBag className="w-4 h-4" />
                    <span>Pedidos</span>
                  </div>
                  <span className="bg-[#C8105D] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    24
                  </span>
                </button>

                <button
                  onClick={() => handleTabChange('clientes')}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium ${
                    activeTab === 'clientes' ? 'bg-[#C8105D] text-white shadow-sm' : 'text-pink-100 hover:bg-white/10'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>Clientes</span>
                </button>

                <button
                  onClick={() => handleTabChange('cupons')}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium ${
                    activeTab === 'cupons' ? 'bg-[#C8105D] text-white shadow-sm' : 'text-pink-100 hover:bg-white/10'
                  }`}
                >
                  <Ticket className="w-4 h-4" />
                  <span>Cupons</span>
                </button>

                <button
                  onClick={() => handleTabChange('relatorios')}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium ${
                    activeTab === 'relatorios' ? 'bg-[#C8105D] text-white shadow-sm' : 'text-pink-100 hover:bg-white/10'
                  }`}
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>Relatórios</span>
                </button>

                <button
                  onClick={() => handleTabChange('configuracoes')}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium ${
                    activeTab === 'configuracoes' ? 'bg-[#C8105D] text-white shadow-sm' : 'text-pink-100 hover:bg-white/10'
                  }`}
                >
                  <Settings className="w-4 h-4" />
                  <span>Configurações</span>
                </button>
              </nav>
            </div>

            <div className="pt-4 border-t border-pink-400/20">
              <Link
                href="/"
                className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-pink-200 hover:bg-white/10"
              >
                <LogOut className="w-4 h-4" />
                <span>Voltar para a Loja</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* 3. Main Content Container */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Responsive Topbar Admin */}
        <header className="bg-white border-b border-[#F3D6E2] px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between sticky top-0 z-20 shadow-xs">
          {/* Left: Mobile Drawer Trigger + Brand Title */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-1.5 rounded-lg text-gray-700 hover:text-[#C8105D] hover:bg-pink-50"
              aria-label="Abrir menu lateral"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div>
              <h1 className="text-sm sm:text-lg font-bold text-gray-900 flex items-center gap-1 sm:gap-2 leading-tight">
                <span>MIIXXIIE</span>
                <span className="hidden sm:inline font-script text-[#C8105D] text-base">Variedades</span>
                <span className="text-[10px] sm:text-xs text-gray-400 font-normal">| Admin</span>
              </h1>
            </div>
          </div>

          {/* Right: Status Switcher, Notification Bell & Admin Profile */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Store Online / Offline Toggle */}
            <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 px-2 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-semibold text-emerald-800 hidden sm:inline">
                Loja: {isStoreOnline ? 'Ativa' : 'Pausada'}
              </span>
              <button
                onClick={() => setIsStoreOnline(!isStoreOnline)}
                className={`text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded-full font-bold transition-colors ${
                  isStoreOnline ? 'bg-emerald-600 text-white' : 'bg-gray-300 text-gray-700'
                }`}
              >
                {isStoreOnline ? 'ON' : 'OFF'}
              </button>
            </div>

            {/* Notifications Bell */}
            <button
              onClick={() =>
                openInfoModal(
                  'Notificações da Loja',
                  '3 novas mensagens de clientes aguardando resposta no WhatsApp de Manaus.'
                )
              }
              className="relative p-1.5 rounded-full text-gray-500 hover:text-[#C8105D] hover:bg-pink-50 transition-colors"
              aria-label="Notificações"
            >
              <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-[#C8105D] text-white text-[8px] font-bold flex items-center justify-center">
                3
              </span>
            </button>

            {/* Admin Profile */}
            <div className="flex items-center gap-2 pl-1.5 border-l border-gray-200">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#6B0833] text-white flex items-center justify-center font-bold text-[11px] sm:text-xs shadow-xs">
                AD
              </div>
              <div className="hidden lg:block text-left text-xs leading-tight">
                <span className="block font-bold text-gray-900">Olá, Administrador</span>
                <span className="text-[10px] text-gray-500">Gerência Manaus</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Body */}
        {activeTab === 'dashboard' && (
          <div className="p-3 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
            {/* 4 Top KPI Cards — 2x2 Grid on Mobile, 4x1 on Desktop */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
              {/* KPI 1: Pedidos Totais */}
              <div className="bg-white rounded-2xl p-3 sm:p-5 border border-[#F3D6E2] shadow-xs relative overflow-hidden flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] sm:text-xs font-semibold text-gray-500 block truncate">
                      Pedidos Totais
                    </span>
                    <h3 className="text-lg sm:text-2xl font-extrabold text-gray-900 mt-0.5">248</h3>
                    <div className="flex items-center gap-0.5 sm:gap-1 text-emerald-600 text-[10px] sm:text-xs font-bold mt-0.5">
                      <TrendingUp className="w-3 h-3" />
                      <span>+12%</span>
                    </div>
                  </div>
                  <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-pink-100 flex items-center justify-center text-[#C8105D] shrink-0">
                    <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                </div>
                {/* Sparkline */}
                <div className="mt-2 sm:mt-4 h-6 sm:h-9 flex items-end gap-1">
                  {[35, 45, 40, 60, 52, 75, 90].map((val, idx) => (
                    <div
                      key={idx}
                      style={{ height: `${val}%` }}
                      className="flex-1 bg-gradient-to-t from-pink-500 to-pink-300 rounded-t-xs"
                    />
                  ))}
                </div>
              </div>

              {/* KPI 2: Visitantes */}
              <div className="bg-white rounded-2xl p-3 sm:p-5 border border-[#F3D6E2] shadow-xs relative overflow-hidden flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] sm:text-xs font-semibold text-gray-500 block truncate">
                      Visitantes/Mês
                    </span>
                    <h3 className="text-lg sm:text-2xl font-extrabold text-gray-900 mt-0.5">1.850</h3>
                    <div className="flex items-center gap-0.5 sm:gap-1 text-purple-600 text-[10px] sm:text-xs font-bold mt-0.5">
                      <TrendingUp className="w-3 h-3" />
                      <span>+18%</span>
                    </div>
                  </div>
                  <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-purple-100 flex items-center justify-center text-purple-600 shrink-0">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                </div>
                {/* Sparkline */}
                <div className="mt-2 sm:mt-4 h-6 sm:h-9 flex items-end gap-1">
                  {[40, 50, 48, 65, 70, 85, 100].map((val, idx) => (
                    <div
                      key={idx}
                      style={{ height: `${val}%` }}
                      className="flex-1 bg-gradient-to-t from-purple-500 to-purple-300 rounded-t-xs"
                    />
                  ))}
                </div>
              </div>

              {/* KPI 3: Faturamento */}
              <div className="bg-white rounded-2xl p-3 sm:p-5 border border-[#F3D6E2] shadow-xs relative overflow-hidden flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] sm:text-xs font-semibold text-gray-500 block truncate">
                      Faturamento/Mês
                    </span>
                    <h3 className="text-sm sm:text-2xl font-extrabold text-gray-900 mt-0.5 whitespace-nowrap">
                      R$ 12.850
                    </h3>
                    <div className="flex items-center gap-0.5 sm:gap-1 text-emerald-600 text-[10px] sm:text-xs font-bold mt-0.5">
                      <TrendingUp className="w-3 h-3" />
                      <span>+22%</span>
                    </div>
                  </div>
                  <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                    <span className="font-extrabold text-xs sm:text-sm">R$</span>
                  </div>
                </div>
                {/* Sparkline */}
                <div className="mt-2 sm:mt-4 h-6 sm:h-9 flex items-end gap-1">
                  {[45, 58, 50, 72, 68, 88, 100].map((val, idx) => (
                    <div
                      key={idx}
                      style={{ height: `${val}%` }}
                      className="flex-1 bg-gradient-to-t from-emerald-500 to-emerald-300 rounded-t-xs"
                    />
                  ))}
                </div>
              </div>

              {/* KPI 4: Avaliação */}
              <div className="bg-white rounded-2xl p-3 sm:p-5 border border-[#F3D6E2] shadow-xs relative overflow-hidden flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] sm:text-xs font-semibold text-gray-500 block truncate">
                      Avaliação Clientes
                    </span>
                    <h3 className="text-lg sm:text-2xl font-extrabold text-gray-900 mt-0.5">4.9</h3>
                    <div className="flex items-center gap-0.5 text-amber-500 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>
                  <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-amber-100 flex items-center justify-center text-amber-500 shrink-0">
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                  </div>
                </div>
                <div className="mt-2 sm:mt-4 pt-1 sm:pt-2 border-t border-gray-100 text-[9px] sm:text-[11px] text-gray-500 truncate">
                  124 avaliações reais
                </div>
              </div>
            </div>

            {/* Grid 2 Columns: Main Chart (Left) + WhatsApp Queue Widget (Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
              {/* Sales Chart: Vendas nos Últimos 30 Dias (Col 8) */}
              <div className="lg:col-span-8 bg-white rounded-3xl p-4 sm:p-6 border border-[#F3D6E2] shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-[#C8105D]" />
                    <h3 className="font-bold text-xs sm:text-base text-gray-900">
                      Vendas nos Últimos 30 Dias
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] sm:text-xs self-start sm:self-auto">
                    <span className="bg-pink-50 text-[#C8105D] px-2.5 py-0.5 sm:py-1 rounded-full font-bold border border-pink-200">
                      Últimos 30 dias
                    </span>
                  </div>
                </div>

                {/* Interactive SVG Chart */}
                <div className="relative pt-4 sm:pt-6 pb-2">
                  {/* Tooltip Highlight */}
                  <div className="mb-2 p-2 sm:p-2.5 rounded-xl bg-[#6B0833] text-white text-[11px] sm:text-xs inline-flex items-center gap-1.5 sm:gap-2 shadow-md max-w-full truncate">
                    <span className="w-2 h-2 rounded-full bg-pink-400 shrink-0"></span>
                    <span className="truncate">
                      Data: <strong>{selectedChartPoint.date}</strong> — Faturamento:{' '}
                      <strong className="text-pink-300">
                        {formatCurrencyBRL(selectedChartPoint.revenue)}
                      </strong>{' '}
                      ({selectedChartPoint.sales} vendas)
                    </span>
                  </div>

                  {/* SVG Chart Drawing */}
                  <div className="h-48 sm:h-64 w-full relative overflow-x-auto no-scrollbar">
                    <svg viewBox="0 0 700 240" className="w-full h-full min-w-[500px] sm:min-w-0 overflow-visible">
                      <defs>
                        <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#C8105D" stopOpacity="0.35" />
                          <stop offset="100%" stopColor="#C8105D" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>

                      {/* Horizontal Grid lines */}
                      {[40, 90, 140, 190].map((y) => (
                        <line
                          key={y}
                          x1="0"
                          y1={y}
                          x2="700"
                          y2={y}
                          stroke="#F3D6E2"
                          strokeDasharray="4 4"
                          strokeWidth="1"
                        />
                      ))}

                      {/* Area Under Curve */}
                      <path
                        d="M 10 190 Q 70 140, 130 130 T 250 100 T 370 170 T 490 60 T 610 110 T 690 30 L 690 220 L 10 220 Z"
                        fill="url(#salesGrad)"
                      />

                      {/* Smooth Curve Line */}
                      <path
                        d="M 10 190 Q 70 140, 130 130 T 250 100 T 370 170 T 490 60 T 610 110 T 690 30"
                        fill="none"
                        stroke="#C8105D"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                      />

                      {/* Interactive Points */}
                      {ADMIN_DASHBOARD_DATA.salesChart30Days.map((p, i) => {
                        const cx = 10 + i * (680 / 11);
                        const cy = 210 - (p.sales / 180) * 170;
                        const isSelected = selectedChartPoint.date === p.date;

                        return (
                          <g key={p.date} onClick={() => setSelectedChartPoint(p)} className="cursor-pointer">
                            <circle
                              cx={cx}
                              cy={cy}
                              r={isSelected ? 7 : 4}
                              className={
                                isSelected
                                  ? 'fill-white stroke-[#C8105D] stroke-[3]'
                                  : 'fill-[#C8105D] hover:fill-[#6B0833] transition-colors'
                              }
                            />
                            {isSelected && (
                              <circle
                                cx={cx}
                                cy={cy}
                                r={14}
                                className="fill-[#C8105D]/20 animate-ping"
                              />
                            )}
                          </g>
                        );
                      })}
                    </svg>
                  </div>

                  {/* X Axis Labels */}
                  <div className="flex justify-between text-[10px] sm:text-[11px] text-gray-400 pt-2 px-1 overflow-x-auto no-scrollbar gap-2">
                    {ADMIN_DASHBOARD_DATA.salesChart30Days.map((p) => (
                      <button
                        key={p.date}
                        onClick={() => setSelectedChartPoint(p)}
                        className={`hover:text-[#C8105D] transition-colors whitespace-nowrap px-1 ${
                          selectedChartPoint.date === p.date
                            ? 'font-bold text-[#C8105D]'
                            : ''
                        }`}
                      >
                        {p.date}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Widget: Pedidos via WhatsApp Online (Col 4) */}
              <div className="lg:col-span-4 bg-white rounded-3xl p-4 sm:p-6 border border-[#F3D6E2] shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                        <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
                      </div>
                      <h3 className="font-bold text-xs sm:text-sm text-gray-900">
                        Pedidos via WhatsApp
                      </h3>
                    </div>
                    <span className="flex items-center gap-1 text-[10px] sm:text-[11px] text-emerald-600 font-bold">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      Online
                    </span>
                  </div>

                  {/* Customer Queue List */}
                  <div className="divide-y divide-gray-100 mt-1">
                    {ADMIN_DASHBOARD_DATA.whatsappLiveQueue.map((item) => (
                      <div
                        key={item.id}
                        onClick={() =>
                          openInfoModal(
                            `Conversa com ${item.name}`,
                            `Última mensagem enviada às ${item.time}: "${item.message}". Status atual: ${item.status}.`
                          )
                        }
                        className="py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-3 hover:bg-pink-50/50 p-1.5 sm:p-2 rounded-xl cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                          <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-pink-100 overflow-hidden shrink-0 border border-pink-200">
                            <Image
                              src={item.avatar}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-bold text-gray-800 truncate">
                                {item.name}
                              </span>
                              <span className="text-[10px] text-gray-400 shrink-0">
                                {item.time}
                              </span>
                            </div>
                            <p className="text-[11px] text-gray-500 truncate">
                              {item.message}
                            </p>
                          </div>
                        </div>

                        <span
                          className={`text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap shrink-0 ${item.statusColor}`}
                        >
                          {item.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 sm:pt-4 mt-2 border-t border-gray-100">
                  <button
                    onClick={() =>
                      window.open(
                        'https://web.whatsapp.com',
                        '_blank',
                        'noopener,noreferrer'
                      )
                    }
                    className="w-full flex items-center justify-center gap-2 bg-[#C8105D] hover:bg-[#A8084A] text-white font-bold text-xs py-2.5 sm:py-3 rounded-full shadow-sm transition-all hover:scale-[1.02]"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-white" />
                    <span>Abrir WhatsApp Web</span>
                    <ExternalLink className="w-3 h-3 opacity-80" />
                  </button>
                </div>
              </div>
            </div>

            {/* Recent Orders — Native Responsive Table on Desktop, Native Cards on Mobile */}
            <div className="bg-white rounded-3xl p-4 sm:p-6 border border-[#F3D6E2] shadow-xs">
              <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-gray-100 mb-3 sm:mb-4">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-[#C8105D]" />
                  <h3 className="font-bold text-xs sm:text-base text-gray-900">
                    Últimos Pedidos ({adminOrders.length})
                  </h3>
                </div>

                <button
                  onClick={() => handleTabChange('pedidos')}
                  className="text-xs font-bold text-[#C8105D] hover:underline flex items-center gap-1"
                >
                  <span>Ver Todos</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Mobile View: Clean Native Cards */}
              <div className="md:hidden space-y-2.5">
                {adminOrders.map((order) => (
                  <div
                    key={order.id}
                    className="p-3 bg-pink-50/40 rounded-2xl border border-pink-100/70 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-extrabold text-xs text-gray-900">{order.id}</span>
                        <span className="text-xs text-gray-600 font-medium ml-1.5">{order.customer}</span>
                      </div>
                      <select
                        value={order.status}
                        onChange={(e) =>
                          updateOrderStatus(
                            order.id,
                            e.target.value as AdminOrder['status']
                          )
                        }
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border-none focus:ring-1 focus:ring-[#C8105D] cursor-pointer ${order.statusBadge}`}
                      >
                        <option value="Pago">● Pago</option>
                        <option value="Em Atendimento">● Em Atendimento</option>
                        <option value="Pendente">● Pendente</option>
                        <option value="Enviado">● Enviado</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-pink-100">
                      <div className="flex items-center -space-x-1.5">
                        {PRODUCTS.slice(0, 3).map((p, i) => (
                          <div
                            key={i}
                            className="relative w-5 h-5 rounded-full overflow-hidden border border-white shadow-2xs bg-pink-100"
                          >
                            <Image src={p.image} alt="Look" fill className="object-cover" />
                          </div>
                        ))}
                        {order.extraItemsBadge && (
                          <div className="w-5 h-5 rounded-full bg-pink-100 text-[#C8105D] font-bold text-[8px] flex items-center justify-center border border-white">
                            {order.extraItemsBadge}
                          </div>
                        )}
                        <span className="text-[10px] text-gray-400 pl-2">
                          {order.itemsCount} itens
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-xs text-gray-900">
                          {formatCurrencyBRL(order.total)}
                        </span>
                        <button
                          onClick={() => setSelectedOrderDetails(order)}
                          className="p-1 rounded-lg text-[#C8105D] hover:bg-pink-100"
                          title="Ver detalhes"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop View: Full Data Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-gray-100 text-gray-400 font-semibold uppercase text-[10px] tracking-wider">
                      <th className="py-3 px-4"># Pedido</th>
                      <th className="py-3 px-4">Cliente</th>
                      <th className="py-3 px-4">Itens</th>
                      <th className="py-3 px-4">Valor</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {adminOrders.map((order) => (
                      <tr
                        key={order.id}
                        className="hover:bg-pink-50/40 transition-colors"
                      >
                        <td className="py-3 px-4 font-bold text-gray-900">
                          {order.id}
                        </td>
                        <td className="py-3 px-4 font-medium text-gray-800">
                          {order.customer}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center -space-x-2">
                            {PRODUCTS.slice(0, 3).map((p, i) => (
                              <div
                                key={i}
                                className="relative w-6 h-6 rounded-full overflow-hidden border border-white shadow-2xs bg-pink-100"
                              >
                                <Image
                                  src={p.image}
                                  alt="Item"
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            ))}
                            {order.extraItemsBadge && (
                              <div className="w-6 h-6 rounded-full bg-pink-100 text-[#C8105D] font-bold text-[9px] flex items-center justify-center border border-white shadow-2xs">
                                {order.extraItemsBadge}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4 font-bold text-gray-900">
                          {formatCurrencyBRL(order.total)}
                        </td>
                        <td className="py-3 px-4">
                          <select
                            value={order.status}
                            onChange={(e) =>
                              updateOrderStatus(
                                order.id,
                                e.target.value as AdminOrder['status']
                              )
                            }
                            className={`text-[11px] font-bold px-2.5 py-1 rounded-full border-none focus:ring-1 focus:ring-[#C8105D] cursor-pointer ${order.statusBadge}`}
                          >
                            <option value="Pago">● Pago</option>
                            <option value="Em Atendimento">● Em Atendimento</option>
                            <option value="Pendente">● Pendente</option>
                            <option value="Enviado">● Enviado</option>
                          </select>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => setSelectedOrderDetails(order)}
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-[#C8105D] hover:bg-pink-100 px-3 py-1 rounded-full border border-pink-200 transition-colors"
                          >
                            <Eye className="w-3 h-3" />
                            <span>Ver Detalhes</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Bottom 4 Summary Counters */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
              {ADMIN_DASHBOARD_DATA.bottomCounters.map((counter, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-3 sm:p-4 border border-[#F3D6E2] shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] sm:text-[11px] text-gray-500 font-medium truncate block">
                      {counter.label}
                    </span>
                    <div className="flex items-baseline gap-1.5 mt-0.5">
                      <h4 className="text-base sm:text-xl font-extrabold text-gray-900">
                        {counter.count}
                      </h4>
                      <span className="text-[9px] sm:text-[10px] text-emerald-600 font-bold">
                        {counter.growth}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      openInfoModal(
                        counter.actionLabel,
                        `Módulo de gerenciamento para ${counter.label}. Dados sincronizados com o estoque físico em Manaus.`
                      )
                    }
                    className="mt-2 text-left text-[10px] sm:text-[11px] font-bold text-[#C8105D] hover:underline flex items-center justify-between"
                  >
                    <span className="truncate">{counter.actionLabel}</span>
                    <ChevronRight className="w-3 h-3 shrink-0" />
                  </button>
                </div>
              ))}
            </div>

            {/* Promo Banner & Live Status Footer */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
              <div className="md:col-span-2 bg-gradient-to-r from-pink-50 via-pink-100/50 to-white rounded-2xl p-4 sm:p-6 border border-pink-200 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-center sm:text-left">
                <div className="space-y-1">
                  <span className="text-[10px] sm:text-xs font-bold text-[#C8105D] uppercase tracking-wider">
                    Sucesso em Vendas
                  </span>
                  <h4 className="font-bold text-sm sm:text-base text-gray-900">
                    Gerencie sua Loja de forma simples e eficiente!
                  </h4>
                  <p className="text-[11px] sm:text-xs text-gray-600">
                    Cadastre produtos • Acompanhe pedidos no WhatsApp • Conquiste mais clientes
                  </p>
                </div>
                <button
                  onClick={() => handleTabChange('relatorios')}
                  className="shrink-0 bg-[#C8105D] hover:bg-[#A8084A] text-white font-bold text-xs px-5 py-2.5 rounded-full shadow-xs transition-all"
                >
                  Ver Relatórios
                </button>
              </div>

              <div className="bg-emerald-50 rounded-2xl p-4 sm:p-6 border border-emerald-200 flex flex-col items-center justify-center text-center space-y-1 sm:space-y-2">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs">
                  <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h4 className="font-bold text-xs sm:text-sm text-emerald-950">
                  Sua loja está Online e vendendo!
                </h4>
                <p className="text-[10px] sm:text-[11px] text-emerald-700">
                  Última atualização: {ADMIN_DASHBOARD_DATA.lastUpdate}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab: Produtos Management */}
        {activeTab === 'produtos' && (
          <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">Gerenciar Produtos</h2>
                <p className="text-xs text-gray-500">
                  Catálogo ativo com 320 peças cadastradas do tamanho G ao G3
                </p>
              </div>
              <button
                onClick={() =>
                  openInfoModal(
                    'Cadastrar Novo Produto',
                    'Insira fotos, selecione as grades Plus Size (G, GG, G1, G2, G3), cores e defina o valor com cálculo de oferta.'
                  )
                }
                className="self-start sm:self-auto inline-flex items-center gap-1.5 bg-[#C8105D] text-white text-xs font-bold px-4 py-2 rounded-full shadow-md hover:bg-[#A8084A]"
              >
                <Plus className="w-4 h-4" />
                <span>Novo Produto</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {PRODUCTS.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-white rounded-2xl border border-[#F3D6E2] p-3 sm:p-4 flex gap-3 sm:gap-4 shadow-xs"
                >
                  <div className="relative w-16 h-20 sm:w-20 sm:h-24 rounded-xl overflow-hidden bg-pink-50 shrink-0">
                    <Image
                      src={prod.image}
                      alt={prod.name}
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[9px] sm:text-[10px] font-bold text-[#C8105D] bg-pink-50 px-2 py-0.5 rounded-full">
                        {prod.badge}
                      </span>
                      <h4 className="font-bold text-xs sm:text-sm text-gray-900 mt-1 line-clamp-1">
                        {prod.name}
                      </h4>
                      <p className="text-[11px] text-gray-500">
                        {prod.sizes.join(', ')}
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <span className="font-bold text-xs sm:text-sm text-gray-900">
                        {formatCurrencyBRL(prod.price)}
                      </span>
                      <span className="text-[10px] sm:text-[11px] text-emerald-600 font-semibold">
                        Em estoque
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab: Pedidos Management */}
        {activeTab === 'pedidos' && (
          <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">Todos os Pedidos</h2>
            <div className="bg-white rounded-2xl p-4 sm:p-6 border border-[#F3D6E2]">
              <p className="text-xs text-gray-500 mb-4">
                Monitore em tempo real as compras feitas através da loja e confirmadas via WhatsApp.
              </p>
              <div className="divide-y divide-gray-100">
                {adminOrders.map((ord) => (
                  <div
                    key={ord.id}
                    className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                  >
                    <div>
                      <span className="font-bold text-gray-900">{ord.id}</span>
                      <span className="text-gray-600 font-medium ml-2">— {ord.customer}</span>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-3">
                      <span className="font-bold text-gray-900">
                        {formatCurrencyBRL(ord.total)}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] sm:text-xs ${ord.statusBadge}`}>
                        {ord.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab: Clientes, Cupons, Relatorios, Configuracoes */}
        {(activeTab === 'clientes' ||
          activeTab === 'cupons' ||
          activeTab === 'relatorios' ||
          activeTab === 'configuracoes') && (
          <div className="p-4 sm:p-6">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#F3D6E2] text-center max-w-lg mx-auto space-y-4">
              <div className="w-12 h-12 rounded-full bg-pink-100 text-[#C8105D] flex items-center justify-center mx-auto">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 capitalize">
                Módulo de {activeTab}
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Este módulo está conectado ao sistema de demonstração da MIIXXIIE Variedades em Manaus e permite controle integral de cadastros, métricas e campanhas.
              </p>
              <button
                onClick={() => handleTabChange('dashboard')}
                className="px-6 py-2 rounded-full bg-[#C8105D] text-white text-xs font-bold hover:bg-[#A8084A] transition-colors"
              >
                Retornar ao Dashboard Principal
              </button>
            </div>
          </div>
        )}
      </main>

      {/* 4. Mobile Fixed Bottom Admin Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#F3D6E2] py-2 px-3 shadow-[0_-4px_16px_rgba(200,16,93,0.08)]">
        <div className="flex items-center justify-around">
          <button
            onClick={() => handleTabChange('dashboard')}
            className={`flex flex-col items-center gap-1 focus:outline-none ${
              activeTab === 'dashboard' ? 'text-[#C8105D] font-bold' : 'text-gray-500'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="text-[10px]">Início</span>
          </button>

          <button
            onClick={() => handleTabChange('produtos')}
            className={`flex flex-col items-center gap-1 focus:outline-none ${
              activeTab === 'produtos' ? 'text-[#C8105D] font-bold' : 'text-gray-500'
            }`}
          >
            <Shirt className="w-5 h-5" />
            <span className="text-[10px]">Produtos</span>
          </button>

          <button
            onClick={() => handleTabChange('pedidos')}
            className={`relative flex flex-col items-center gap-1 focus:outline-none ${
              activeTab === 'pedidos' ? 'text-[#C8105D] font-bold' : 'text-gray-500'
            }`}
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1 -right-2 w-3.5 h-3.5 rounded-full bg-[#C8105D] text-white text-[8px] font-bold flex items-center justify-center">
                24
              </span>
            </div>
            <span className="text-[10px]">Pedidos</span>
          </button>

          <button
            onClick={() => {
              window.open('https://web.whatsapp.com', '_blank');
            }}
            className="flex flex-col items-center gap-1 text-emerald-600 focus:outline-none"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span className="text-[10px] font-bold">WhatsApp</span>
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="flex flex-col items-center gap-1 text-gray-500 focus:outline-none"
          >
            <Menu className="w-5 h-5" />
            <span className="text-[10px]">Menu</span>
          </button>
        </div>
      </nav>

      {/* Order Detail Modal */}
      {selectedOrderDetails && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-t-3xl sm:rounded-3xl p-5 sm:p-6 max-w-md w-full shadow-2xl border border-[#F3D6E2] space-y-4 max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom duration-250">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-bold text-[#C8105D]">
                  Pedido {selectedOrderDetails.id}
                </span>
                <h3 className="font-bold text-base sm:text-lg text-gray-900">
                  {selectedOrderDetails.customer}
                </h3>
              </div>
              <button
                onClick={() => setSelectedOrderDetails(null)}
                className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500"
                aria-label="Fechar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-pink-50/60 p-4 rounded-2xl space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500">Total do Pedido:</span>
                <span className="font-bold text-gray-900">
                  {formatCurrencyBRL(selectedOrderDetails.total)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Status Atual:</span>
                <span className={`font-bold px-2 py-0.5 rounded-full ${selectedOrderDetails.statusBadge}`}>
                  {selectedOrderDetails.status}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Canal de Venda:</span>
                <span className="font-bold text-emerald-700">WhatsApp Manaus</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedOrderDetails(null)}
                className="px-4 py-2 rounded-full text-xs font-semibold text-gray-600 hover:bg-gray-100"
              >
                Fechar
              </button>
              <button
                onClick={() => {
                  window.open(
                    `https://wa.me/5592999999999?text=Olá, ${selectedOrderDetails.customer}! Gostaria de falar sobre o pedido ${selectedOrderDetails.id}.`,
                    '_blank'
                  );
                }}
                className="px-4 py-2 rounded-full text-xs font-bold bg-[#25D366] text-white hover:bg-[#1EBE5D] flex items-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-white" />
                <span>Conversar no WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
