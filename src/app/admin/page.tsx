'use client';

import React, { useState, useMemo } from 'react';
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
  Truck,
  Database,
  CheckCircle2,
  Users,
  Layers,
  MessageCircle,
  MapPin,
  FolderTree,
  Search,
  PanelLeftClose,
  PanelLeftOpen,
  ArrowUpRight,
  Eye,
  Clock,
  ShieldCheck,
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

export type AdminTab =
  | 'dashboard'
  | 'kanban'
  | 'produtos'
  | 'categorias'
  | 'banners'
  | 'entregas'
  | 'atendentes'
  | 'metricas'
  | 'customizacao';

interface MenuItem {
  id: AdminTab;
  label: string;
  shortLabel?: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  badgeVariant?: 'default' | 'success' | 'warning' | 'accent';
}

interface MenuGroup {
  groupName: string;
  items: MenuItem[];
}

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
    carouselSlides,
  } = useStore();

  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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
  const activeAttendantsCount = attendants.filter((a) => a.isActive !== false).length;
  const activeCategoriesCount = (categories || []).filter((c) => c.isActive !== false).length;
  const activeSlidesCount = (carouselSlides || []).filter((s) => s.isActive !== false).length;

  // Traditional, Organized Menu Structure in 4 Logical Groups
  const menuGroups: MenuGroup[] = [
    {
      groupName: 'Painel & Atendimento',
      items: [
        {
          id: 'dashboard',
          label: 'Visão Geral',
          shortLabel: 'Painel',
          description: 'Métricas executivas, KPIs e atalhos rápidos',
          icon: LayoutDashboard,
        },
        {
          id: 'kanban',
          label: 'Kanban de Pedidos',
          shortLabel: 'Kanban',
          description: 'Gestão dos pedidos recebidos no WhatsApp',
          icon: Kanban,
          badge: `${adminOrders.length}`,
          badgeVariant: adminOrders.length > 0 ? 'accent' : 'default',
        },
        {
          id: 'atendentes',
          label: 'Equipe WhatsApp',
          shortLabel: 'Atendentes',
          description: 'Consultoras ativas e revezamento de leads',
          icon: MessageCircle,
          badge: `${activeAttendantsCount}/${attendants.length}`,
          badgeVariant: 'success',
        },
      ],
    },
    {
      groupName: 'Catálogo & Vitrine',
      items: [
        {
          id: 'produtos',
          label: 'Mostruário & Estoque',
          shortLabel: 'Produtos',
          description: 'Peças plus size, tamanhos G-G3 e cores',
          icon: ShoppingBag,
          badge: `${products.length}`,
          badgeVariant: 'default',
        },
        {
          id: 'categorias',
          label: 'Categorias da Loja',
          shortLabel: 'Categorias',
          description: 'Ativar, pausar e organizar vitrine',
          icon: FolderTree,
          badge: `${activeCategoriesCount}/${categories?.length || 10}`,
          badgeVariant: 'default',
        },
        {
          id: 'banners',
          label: 'Banners & Carrossel',
          shortLabel: 'Banners',
          description: 'Slides de destaque no topo da loja',
          icon: Layers,
          badge: `${activeSlidesCount} slides`,
          badgeVariant: 'default',
        },
      ],
    },
    {
      groupName: 'Logística Manaus',
      items: [
        {
          id: 'entregas',
          label: 'Entregas por Bairro',
          shortLabel: 'Entregas',
          description: 'Taxas de motoboy e retirada no showroom',
          icon: Truck,
          badge: `${neighborhoods?.length || 10} bairros`,
          badgeVariant: 'default',
        },
      ],
    },
    {
      groupName: 'Relatórios & Sistema',
      items: [
        {
          id: 'metricas',
          label: 'Métricas & Conversão',
          shortLabel: 'Métricas',
          description: 'Rastreio de cliques no WhatsApp e produtos',
          icon: BarChart3,
          badge: `${mariaLeads + carlosLeads} leads`,
          badgeVariant: 'default',
        },
        {
          id: 'customizacao',
          label: 'Configurações da Loja',
          shortLabel: 'Ajustes',
          description: 'Dados da loja, WhatsApps, Pix e Supabase',
          icon: Settings,
        },
      ],
    },
  ];

  // Quick filter for search within menu
  const filteredGroups = useMemo(() => {
    if (!searchQuery.trim()) return menuGroups;
    const query = searchQuery.toLowerCase().trim();
    return menuGroups
      .map((group) => ({
        ...group,
        items: group.items.filter(
          (item) =>
            item.label.toLowerCase().includes(query) ||
            item.description.toLowerCase().includes(query) ||
            group.groupName.toLowerCase().includes(query)
        ),
      }))
      .filter((group) => group.items.length > 0);
  }, [searchQuery, menuGroups]);

  // Find current tab info for breadcrumb
  const currentTabItem = useMemo(() => {
    for (const group of menuGroups) {
      const found = group.items.find((i) => i.id === activeTab);
      if (found) {
        return { ...found, groupName: group.groupName };
      }
    }
    return { label: 'Visão Geral', groupName: 'Painel & Atendimento' };
  }, [activeTab, menuGroups]);

  return (
    <div className="min-h-screen bg-[#F8F8FA] flex flex-col md:flex-row text-neutral-900 font-sans selection:bg-black selection:text-white">
      {/* ==============================================================
          1. TRADITIONAL PROFESSIONAL LEFT SIDEBAR (DESKTOP)
          ============================================================== */}
      <aside
        className={`hidden md:flex flex-col bg-[#0B0C10] text-neutral-300 border-r border-neutral-800/80 transition-all duration-300 shrink-0 z-30 select-none h-screen sticky top-0 ${
          isSidebarCollapsed ? 'w-20' : 'w-64 lg:w-72'
        }`}
      >
        {/* Sidebar Header: Brand & Collapse Toggle */}
        <div className="p-4 border-b border-neutral-800/80 flex items-center justify-between gap-2">
          {!isSidebarCollapsed ? (
            <div className="flex items-center gap-3 truncate">
              <Link href="/" className="inline-block group shrink-0">
                <div className="relative w-36 h-10">
                  <Image
                    src="/images/logo-white.png"
                    alt="MIIXXIIE Variedades"
                    fill
                    priority
                    className="object-contain"
                  />
                </div>
              </Link>
            </div>
          ) : (
            <Link href="/" className="mx-auto block" title="Ir para a Loja Virtual">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center font-bold text-white text-base">
                M
              </div>
            </Link>
          )}

          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800/60 transition-colors shrink-0"
            title={isSidebarCollapsed ? 'Expandir Menu Lateral' : 'Recolher Menu Lateral'}
            aria-label="Alternar Menu Lateral"
          >
            {isSidebarCollapsed ? (
              <PanelLeftOpen className="w-4 h-4" />
            ) : (
              <PanelLeftClose className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Store Status Pill (Expanded Only) */}
        {!isSidebarCollapsed && (
          <div className="px-4 pt-3 pb-2 flex items-center justify-between text-[11px] border-b border-neutral-800/40">
            <span className="text-neutral-400 font-medium">Gestão Manaus - AM</span>
            <span className="text-[10px] bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 px-2 py-0.5 rounded-full font-bold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Painel Ativo
            </span>
          </div>
        )}

        {/* Quick Menu Search Filter (Expanded Only) */}
        {!isSidebarCollapsed && (
          <div className="px-3 pt-3 pb-1">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filtrar menu..."
                className="w-full bg-[#14151B] border border-neutral-800 rounded-xl pl-8 pr-7 py-1.5 text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-neutral-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white"
                  title="Limpar filtro"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Sidebar Navigation: Grouped Categories */}
        <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-5 scrollbar-thin scrollbar-thumb-neutral-800">
          {filteredGroups.map((group, groupIdx) => (
            <div key={groupIdx} className="space-y-1">
              {/* Group Title Header */}
              {!isSidebarCollapsed ? (
                <div className="px-3 py-1 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-neutral-300 tracking-[0.16em] uppercase">
                    {group.groupName}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-800" />
                </div>
              ) : (
                <div className="my-2 border-t border-neutral-800/60" />
              )}

              {/* Group Menu Items */}
              <div className="space-y-1">
                {group.items.map((item) => {
                  const isActive = activeTab === item.id;
                  const Icon = item.icon;

                  if (isSidebarCollapsed) {
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleTabChange(item.id)}
                        title={`${item.label} — ${item.description}`}
                        className={`w-full h-11 flex items-center justify-center rounded-xl transition-all relative group ${
                          isActive
                            ? 'bg-white text-black font-extrabold shadow-md'
                            : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
                        }`}
                      >
                        <Icon className="w-4 h-4 shrink-0" />
                        {item.badge && !isActive && (
                          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-500" />
                        )}
                      </button>
                    );
                  }

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleTabChange(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all group ${
                        isActive
                          ? 'bg-white text-neutral-950 font-bold shadow-md shadow-white/5'
                          : 'text-neutral-400 hover:text-white hover:bg-white/[0.06] font-medium'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <Icon
                          className={`w-4 h-4 shrink-0 transition-colors ${
                            isActive ? 'text-black' : 'text-neutral-400 group-hover:text-white'
                          }`}
                        />
                        <span className="truncate">{item.label}</span>
                      </div>

                      {item.badge ? (
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-bold shrink-0 transition-colors ${
                            isActive
                              ? 'bg-black text-white'
                              : item.badgeVariant === 'accent'
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                              : item.badgeVariant === 'success'
                              ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/40'
                              : 'bg-neutral-800/90 text-neutral-300 group-hover:bg-neutral-700'
                          }`}
                        >
                          {item.badge}
                        </span>
                      ) : (
                        <ChevronRight
                          className={`w-3.5 h-3.5 shrink-0 transition-transform ${
                            isActive
                              ? 'text-black opacity-80 translate-x-0.5'
                              : 'opacity-30 group-hover:opacity-70 group-hover:translate-x-0.5'
                          }`}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {filteredGroups.length === 0 && (
            <div className="p-4 text-center text-xs text-neutral-500">
              Nenhuma seção encontrada para &quot;{searchQuery}&quot;
            </div>
          )}
        </nav>

        {/* Sidebar Footer: User Profile & Quick Actions */}
        <div className="p-3 border-t border-neutral-800/80 space-y-2 bg-[#08090D]">
          {!isSidebarCollapsed ? (
            <>
              {/* User Identity Card */}
              <div className="flex items-center gap-3 p-2 rounded-xl bg-neutral-900/40 border border-neutral-800/50">
                <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                  {adminUser?.name?.charAt(0) || 'M'}
                </div>
                <div className="truncate flex-1">
                  <div className="flex items-center justify-between">
                    <span className="block text-xs font-bold text-white truncate">
                      {adminUser?.name || 'Administrador'}
                    </span>
                    <span className="text-[9px] bg-neutral-800 text-neutral-300 px-1.5 py-0.2 rounded font-medium">
                      Gestor
                    </span>
                  </div>
                  <span className="block text-[10px] text-neutral-400 truncate">
                    {adminUser?.email || 'admin@miixxiie.com.br'}
                  </span>
                </div>
              </div>

              {/* Action Buttons: View Store & Logout */}
              <div className="flex items-center gap-2 pt-0.5">
                <Link
                  href="/"
                  target="_blank"
                  className="flex-1 py-1.5 px-2.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 text-[11px] font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors border border-neutral-800"
                >
                  <ExternalLink className="w-3 h-3 text-neutral-400" />
                  <span>Ver Loja</span>
                </Link>

                <button
                  onClick={logoutAdmin}
                  className="py-1.5 px-2.5 bg-neutral-900 hover:bg-red-950/60 text-neutral-400 hover:text-red-400 rounded-lg transition-colors border border-neutral-800 flex items-center gap-1 text-[11px] font-semibold"
                  title="Sair do Painel Administrativo"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sair</span>
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Link
                href="/"
                target="_blank"
                className="w-10 h-10 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 flex items-center justify-center transition-colors"
                title="Abrir Loja Virtual em Nova Aba"
              >
                <ExternalLink className="w-4 h-4" />
              </Link>
              <button
                onClick={logoutAdmin}
                className="w-10 h-10 rounded-xl bg-neutral-900 hover:bg-red-950/60 text-neutral-400 hover:text-red-400 flex items-center justify-center transition-colors"
                title="Sair do Painel"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* ==============================================================
          2. MOBILE TOPBAR & SLIDE DRAWER
          ============================================================== */}
      <div className="md:hidden bg-[#0B0C10] text-white p-3.5 flex items-center justify-between border-b border-neutral-800 sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white hover:bg-neutral-800"
            aria-label="Abrir Menu de Navegação"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="relative w-28 h-8">
            <Image
              src="/images/logo-white.png"
              alt="MIIXXIIE"
              fill
              priority
              className="object-contain"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/"
            target="_blank"
            className="text-[10px] bg-neutral-900 border border-neutral-800 text-neutral-300 font-bold px-2.5 py-1.5 rounded-lg flex items-center gap-1"
          >
            <span>Ver Loja</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
          <button
            onClick={logoutAdmin}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-red-400"
            title="Sair"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Left Slide-in) */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          {/* Backdrop Blur Overlay */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer Menu Surface */}
          <div className="relative w-72 max-w-[85%] bg-[#0B0C10] text-neutral-300 h-full p-4 flex flex-col justify-between z-10 border-r border-neutral-800 shadow-2xl overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                <div className="relative w-36 h-9">
                  <Image
                    src="/images/logo-white.png"
                    alt="MIIXXIIE"
                    fill
                    priority
                    className="object-contain"
                  />
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-white bg-neutral-900"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Mobile Grouped Links */}
              <div className="py-4 space-y-4">
                {menuGroups.map((group, groupIdx) => (
                  <div key={groupIdx} className="space-y-1">
                    <span className="text-[10px] font-bold text-neutral-300 tracking-[0.16em] uppercase px-3 block">
                      {group.groupName}
                    </span>
                    <div className="space-y-1 pt-1">
                      {group.items.map((item) => {
                        const isActive = activeTab === item.id;
                        const Icon = item.icon;
                        return (
                          <button
                            key={item.id}
                            onClick={() => handleTabChange(item.id)}
                            className={`w-full p-2.5 rounded-xl text-left flex items-center justify-between text-xs transition-colors ${
                              isActive
                                ? 'bg-white text-black font-extrabold shadow-sm'
                                : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <Icon className="w-4 h-4 shrink-0" />
                              <span>{item.label}</span>
                            </div>
                            {item.badge && (
                              <span
                                className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                                  isActive
                                    ? 'bg-black text-white'
                                    : 'bg-neutral-900 text-neutral-400 border border-neutral-800'
                                }`}
                              >
                                {item.badge}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Footer */}
            <div className="pt-3 border-t border-neutral-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-neutral-400">{adminUser?.name || 'Administrador'}</span>
                <button onClick={logoutAdmin} className="text-red-400 font-bold hover:underline">
                  Sair do Painel
                </button>
              </div>
              <Link
                href="/"
                target="_blank"
                className="w-full py-2 bg-neutral-900 text-neutral-200 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Abrir Loja Virtual</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ==============================================================
          3. MAIN CONTENT WORKSPACE & STICKY HEADER
          ============================================================== */}
      <main className="flex-1 min-w-0 flex flex-col h-screen overflow-y-auto bg-[#F8F8FA]">
        {/* Sticky Workspace Top Header with Breadcrumbs & Actions */}
        <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-neutral-200/80 px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4 shadow-2xs">
          {/* Left: Breadcrumbs & Section Title */}
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 text-[11px] text-neutral-500 mb-0.5 truncate">
              <span className="hover:text-black font-semibold flex items-center gap-1 cursor-pointer" onClick={() => handleTabChange('dashboard')}>
                <Store className="w-3 h-3 text-neutral-400" />
                <span>Painel Admin</span>
              </span>
              <ChevronRight className="w-3 h-3 text-neutral-400 shrink-0" />
              <span className="text-neutral-500 font-medium truncate">{currentTabItem.groupName}</span>
              <ChevronRight className="w-3 h-3 text-neutral-400 shrink-0" />
              <span className="text-neutral-900 font-bold truncate">{currentTabItem.label}</span>
            </div>
            <h1 className="text-lg sm:text-xl font-black text-neutral-900 tracking-tight truncate">
              {currentTabItem.label}
            </h1>
          </div>

          {/* Right: Operational Status Badges & Quick Action */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* WhatsApp Leads Balance Indicator */}
            <div className="hidden lg:flex items-center gap-2 bg-neutral-50 border border-neutral-200 px-3 py-1.5 rounded-xl text-xs font-semibold">
              <div className="flex items-center gap-1 text-emerald-700">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>WhatsApp:</span>
              </div>
              <span className="text-neutral-600">
                Maria: <strong className="text-neutral-900">{mariaLeads}</strong> • Carlos: <strong className="text-neutral-900">{carlosLeads}</strong>
              </span>
            </div>

            {/* Showroom Status */}
            <div className="hidden sm:flex items-center gap-1.5 bg-neutral-100/80 border border-neutral-200 px-3 py-1.5 rounded-xl text-xs font-semibold text-neutral-700">
              <MapPin className="w-3.5 h-3.5 text-neutral-500" />
              <span>Manaus - AM</span>
            </div>

            {/* Open Store Link */}
            <Link
              href="/"
              target="_blank"
              className="bg-black hover:bg-neutral-800 text-white text-xs font-extrabold px-3.5 py-1.5 rounded-xl transition-all shadow-xs flex items-center gap-1.5 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Ver Loja</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </header>

        {/* Workspace Content Canvas */}
        <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl">
          {/* TAB 1: DASHBOARD (VISÃO GERAL) */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Executive KPI Cards */}
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
                      Tempo Real
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-400">Fluxo de pedidos no WhatsApp</p>
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
                  <p className="text-[11px] text-neutral-400">Total em pedidos registrados</p>
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
                      {activeCategoriesCount} Categorias
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-400">Vestidos, Conjuntos, Calças...</p>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-neutral-200 shadow-xs space-y-2">
                  <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                    Cliques nos WhatsApps
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

              {/* Quick Navigation Cards */}
              <div className="space-y-3">
                <h3 className="font-extrabold text-sm text-neutral-900 uppercase tracking-wider">
                  Acesso Rápido às Áreas de Gestão
                </h3>
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

          {/* TAB 4: CATEGORIAS */}
          {activeTab === 'categorias' && <AdminCategoryManager />}

          {/* TAB 5: BANNERS & CARROSSEL */}
          {activeTab === 'banners' && <AdminStoreCustomizer initialSection="banners" />}

          {/* TAB 6: ENTREGAS MANAUS */}
          {activeTab === 'entregas' && <AdminManausDelivery />}

          {/* TAB 7: ATENDENTES */}
          {activeTab === 'atendentes' && <AdminAttendantsManager />}

          {/* TAB 8: MÉTRICAS & CLIQUES */}
          {activeTab === 'metricas' && <AdminMetricsAndClicks />}

          {/* TAB 9: CUSTOMIZAÇÃO & SUPABASE */}
          {activeTab === 'customizacao' && <AdminStoreCustomizer initialSection="cms" />}
        </div>
      </main>
    </div>
  );
}
