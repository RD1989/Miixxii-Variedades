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
  AlertTriangle,
  Calendar,
  ArrowRight,
  Copy,
  Plus,
} from 'lucide-react';
import { useStore, AdminOrder } from '@/store/useStore';
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

  const averageTicket = adminOrders.length > 0 ? totalRevenue / adminOrders.length : 0;
  const criticalStockItems = products.filter((p) => p.stockTotal <= 2);
  const recentOrders = [...adminOrders].slice(0, 5);

  const kanbanStages = [
    { label: 'Novos Leads', count: adminOrders.filter((o) => o.status === 'Novo Lead').length, color: 'bg-amber-500', dot: 'bg-amber-500' },
    { label: 'Em Atendimento', count: adminOrders.filter((o) => o.status === 'Em Atendimento').length, color: 'bg-blue-500', dot: 'bg-blue-500' },
    { label: 'Pagamento Confirmado', count: adminOrders.filter((o) => o.status === 'Pagamento Confirmado').length, color: 'bg-emerald-500', dot: 'bg-emerald-500' },
    { label: 'Separando Estoque', count: adminOrders.filter((o) => o.status === 'Separando Estoque').length, color: 'bg-purple-500', dot: 'bg-purple-500' },
    { label: 'Saiu p/ Entrega', count: adminOrders.filter((o) => o.status === 'Saiu para Entrega').length, color: 'bg-indigo-500', dot: 'bg-indigo-500' },
    { label: 'Concluído', count: adminOrders.filter((o) => o.status === 'Concluído').length, color: 'bg-green-600', dot: 'bg-green-600' },
  ];

  const handleQuickDispatchMotoboy = (order: AdminOrder) => {
    const text = `🛵 *SOLICITAÇÃO DE MOTOBOY - MIIXXIIE VARIEDADES*
------------------------------------------------
📍 *Destino:* ${order.deliveryMethod === 'retirada' ? 'Retirada no Showroom (Vieiralves)' : `${order.deliveryAddress || order.neighborhood || 'Manaus - AM'}`}
👤 *Cliente:* ${order.customer}
📱 *Telefone:* ${order.customerPhone || 'A combinar'}
💰 *Valor Pedido:* ${formatCurrencyBRL(order.total)}
📦 *Peças:* ${order.itemsList || `${order.itemsCount} peças`}
${order.notes ? `📝 *Observação:* ${order.notes}` : ''}
------------------------------------------------`;
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(text);
      alert('Dados de entrega copiados para a área de transferência! Cole no WhatsApp do motoboy.');
    }
  };

  const handleOpenCustomerWhatsApp = (phone?: string, customerName?: string) => {
    const raw = (phone || '').replace(/\D/g, '');
    let fullPhone = raw;
    if (fullPhone.length === 10 || fullPhone.length === 11) {
      fullPhone = `55${fullPhone}`;
    }
    if (!fullPhone) {
      fullPhone = '5592986137969';
    }
    const url = `https://wa.me/${fullPhone}?text=${encodeURIComponent(`Olá ${customerName || ''}! Tudo bem? Aqui é da MIIXXIIE Variedades falando sobre seu pedido.`)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

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
          {/* TAB 1: DASHBOARD (VISÃO GERAL EXECUTIVA) */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Executive Operational Banner */}
              <div className="bg-white rounded-3xl border border-neutral-200 p-5 sm:p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-wider bg-black text-white px-2.5 py-0.5 rounded-full">
                      Manaus - AM
                    </span>
                    <span className="text-xs text-neutral-500 font-semibold flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-neutral-400" />
                      Operação em Tempo Real
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight">
                    Painel de Controle Executivo
                  </h2>
                  <p className="text-xs text-neutral-500">
                    Showroom físico no Vieiralves & Atendimento personalizado no WhatsApp com Maria e Carlos.
                  </p>
                </div>

                {/* Quick Action Buttons */}
                <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                  <button
                    onClick={() => handleTabChange('produtos')}
                    className="px-4 py-2 bg-black hover:bg-neutral-800 text-white text-xs font-extrabold rounded-2xl flex items-center gap-1.5 shadow-xs transition-all active:scale-95"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Cadastrar Peça</span>
                  </button>
                  <button
                    onClick={() => handleTabChange('kanban')}
                    className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-bold rounded-2xl flex items-center gap-1.5 transition-all active:scale-95"
                  >
                    <Kanban className="w-3.5 h-3.5" />
                    <span>Ver Kanban</span>
                  </button>
                  <button
                    onClick={() => handleTabChange('entregas')}
                    className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-bold rounded-2xl flex items-center gap-1.5 transition-all active:scale-95"
                  >
                    <Truck className="w-3.5 h-3.5" />
                    <span>Entregas Manaus</span>
                  </button>
                </div>
              </div>

              {/* Low Stock Emergency Alert Bar */}
              {criticalStockItems.length > 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded-3xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs animate-in fade-in">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                      <AlertTriangle className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-sm text-amber-950">
                        Alerta de Estoque Crítico ({criticalStockItems.length} {criticalStockItems.length === 1 ? 'modelo' : 'modelos'})
                      </h4>
                      <p className="text-xs text-amber-800 mt-0.5">
                        Algumas peças estão esgotadas ou com apenas 1 ou 2 unidades disponíveis no showroom de Manaus.
                      </p>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {criticalStockItems.slice(0, 4).map((p) => (
                          <span
                            key={p.id}
                            className="text-[10px] bg-white border border-amber-300 text-amber-900 font-bold px-2 py-0.5 rounded-full"
                          >
                            {p.name} ({p.stockTotal === 0 ? 'Esgotado' : `${p.stockTotal} un`})
                          </span>
                        ))}
                        {criticalStockItems.length > 4 && (
                          <span className="text-[10px] text-amber-700 font-semibold self-center">
                            +{criticalStockItems.length - 4} outros
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleTabChange('produtos')}
                    className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-extrabold rounded-xl transition-all shadow-xs shrink-0 active:scale-95"
                  >
                    Repor / Ajustar no Estoque
                  </button>
                </div>
              )}

              {/* Executive KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
                <div className="bg-white p-5 rounded-3xl border border-neutral-200 shadow-xs space-y-2">
                  <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                    Pedidos no Kanban
                  </span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl sm:text-3xl font-black text-neutral-900">
                      {adminOrders.length}
                    </span>
                    <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-full">
                      Ativos
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-500">Fluxo em andamento no WhatsApp</p>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-neutral-200 shadow-xs space-y-2">
                  <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                    Faturamento do Fluxo
                  </span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xl sm:text-2xl font-black text-neutral-900">
                      {formatCurrencyBRL(totalRevenue)}
                    </span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                      Total
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-500">Soma dos pedidos registrados</p>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-neutral-200 shadow-xs space-y-2">
                  <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                    Ticket Médio
                  </span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xl sm:text-2xl font-black text-neutral-900">
                      {formatCurrencyBRL(averageTicket)}
                    </span>
                    <span className="text-[10px] bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded-full">
                      Médio
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-500">Média por pedido concluído</p>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-neutral-200 shadow-xs space-y-2">
                  <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
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
                  <p className="text-[11px] text-neutral-500">Catálogo ativo em Manaus</p>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-neutral-200 shadow-xs space-y-2">
                  <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                    Cliques nos WhatsApps
                  </span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl sm:text-3xl font-black text-neutral-900">
                      {mariaLeads + carlosLeads}
                    </span>
                    <span className="text-[10px] bg-pink-100 text-pink-800 font-bold px-2 py-0.5 rounded-full">
                      Equipe
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-500">Maria ({mariaLeads}) • Carlos ({carlosLeads})</p>
                </div>
              </div>

              {/* Sales Funnel Progress Overview */}
              <div className="bg-white p-5 sm:p-6 rounded-3xl border border-neutral-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-extrabold text-sm sm:text-base text-neutral-900">
                      Funil de Atendimento & Vendas no WhatsApp
                    </h3>
                    <p className="text-xs text-neutral-500">
                      Progresso de pedidos desde a chegada do lead até a entrega em Manaus
                    </p>
                  </div>
                  <button
                    onClick={() => handleTabChange('kanban')}
                    className="text-xs font-bold text-black hover:underline flex items-center gap-1"
                  >
                    <span>Abrir Quadro</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-1">
                  {kanbanStages.map((stage, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleTabChange('kanban')}
                      className="p-3 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/80 rounded-2xl transition-all cursor-pointer space-y-1.5"
                    >
                      <div className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${stage.dot}`} />
                        <span className="text-[11px] font-bold text-neutral-600 truncate">{stage.label}</span>
                      </div>
                      <div className="text-lg font-black text-neutral-900">
                        {stage.count} <span className="text-[10px] font-normal text-neutral-400">pedidos</span>
                      </div>
                    </div>
                  ))}
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

              {/* Recent Orders Table */}
              <div className="bg-white rounded-3xl border border-neutral-200 shadow-xs p-5 sm:p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                  <div>
                    <h3 className="font-extrabold text-base text-neutral-900">
                      Últimos Pedidos Recebidos no WhatsApp
                    </h3>
                    <p className="text-xs text-neutral-500">
                      Ações imediatas de atendimento e despacho por motoboy em Manaus
                    </p>
                  </div>
                  <button
                    onClick={() => handleTabChange('kanban')}
                    className="text-xs font-bold text-black hover:underline flex items-center gap-1"
                  >
                    <span>Ver Todos os Pedidos</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-neutral-200/80 text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                        <th className="py-2.5 px-3">Cliente & Contato</th>
                        <th className="py-2.5 px-3">Peças Selecionadas</th>
                        <th className="py-2.5 px-3">Valor Total</th>
                        <th className="py-2.5 px-3">Destino / Entrega</th>
                        <th className="py-2.5 px-3">Atendente</th>
                        <th className="py-2.5 px-3">Status</th>
                        <th className="py-2.5 px-3 text-right">Ações Rápidas</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {recentOrders.map((ord) => (
                        <tr key={ord.id} className="hover:bg-neutral-50/80 transition-colors">
                          <td className="py-3 px-3">
                            <span className="font-extrabold text-neutral-900 block">{ord.customer}</span>
                            <span className="text-[11px] text-neutral-500">{ord.customerPhone || 'Não informado'}</span>
                          </td>
                          <td className="py-3 px-3 max-w-[200px]">
                            <span className="font-medium text-neutral-800 line-clamp-1">
                              {ord.itemsList || `${ord.itemsCount} peças selecionadas`}
                            </span>
                            <span className="text-[10px] text-neutral-400">
                              {ord.itemsCount} {ord.itemsCount === 1 ? 'peça' : 'peças'}
                            </span>
                          </td>
                          <td className="py-3 px-3 font-black text-neutral-900 whitespace-nowrap">
                            {formatCurrencyBRL(ord.total)}
                          </td>
                          <td className="py-3 px-3">
                            <span className="text-neutral-800 font-semibold block truncate max-w-[140px]">
                              {ord.deliveryMethod === 'retirada' ? 'Retirada no Showroom' : ord.neighborhood || 'Manaus'}
                            </span>
                            <span className="text-[10px] text-neutral-400">
                              {ord.deliveryMethod === 'retirada' ? 'Sem frete' : 'Motoboy a combinar'}
                            </span>
                          </td>
                          <td className="py-3 px-3 whitespace-nowrap">
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                ord.attendantName?.toLowerCase().includes('maria')
                                  ? 'bg-pink-100 text-pink-800'
                                  : 'bg-blue-100 text-blue-800'
                              }`}
                            >
                              {ord.attendantName || 'Equipe'}
                            </span>
                          </td>
                          <td className="py-3 px-3 whitespace-nowrap">
                            <span className="text-[10px] font-extrabold bg-neutral-100 text-neutral-800 px-2 py-0.5 rounded-full border border-neutral-200">
                              {ord.status}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => handleOpenCustomerWhatsApp(ord.customerPhone, ord.customer)}
                                className="px-2.5 py-1 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-[11px] font-bold rounded-lg flex items-center gap-1 shadow-2xs transition-all active:scale-95"
                                title="Abrir conversa no WhatsApp"
                              >
                                <MessageCircle className="w-3 h-3 fill-current" />
                                <span>WhatsApp</span>
                              </button>
                              <button
                                onClick={() => handleQuickDispatchMotoboy(ord)}
                                className="px-2 py-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-[11px] font-bold rounded-lg flex items-center gap-1 transition-all active:scale-95"
                                title="Copiar ficha de entrega para motoboy"
                              >
                                <Copy className="w-3 h-3" />
                                <span className="hidden sm:inline">Despacho</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
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
