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
  Minus,
  ArrowUpRight,
  Sparkles,
  Menu,
  X,
  Phone,
  ArrowLeft,
  Truck,
  Store,
  Tag,
  Palette,
  Check,
  AlertTriangle,
} from 'lucide-react';
import {
  ADMIN_DASHBOARD_DATA,
  formatCurrencyBRL,
  CATEGORIES,
  ColorOption,
  Product,
  MANAUS_NEIGHBORHOODS_LIST,
  STORE_CONFIG,
} from '@/data/mockData';
import { useStore, AdminOrder } from '@/store/useStore';

export default function AdminPage() {
  const {
    products,
    updateStock,
    updateSizeStock,
    updateProductColors,
    updateProductPrice,
    toggleProductActive,
    adminOrders,
    updateOrderStatus,
    openInfoModal,
  } = useStore();

  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'produtos' | 'pedidos' | 'clientes' | 'relatorios' | 'cupons' | 'configuracoes'
  >('dashboard');
  const [isStoreOnline, setIsStoreOnline] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState<AdminOrder | null>(null);

  // Product Management Filters & Search
  const [productSearch, setProductSearch] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState<string>('all');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Color Manager local state when editing a product
  const [tempColors, setTempColors] = useState<ColorOption[]>([]);
  const [newColorName, setNewColorName] = useState('');
  const [newColorHex, setNewColorHex] = useState('#000000');
  const [tempPrice, setTempPrice] = useState<number>(0);
  const [tempSizeStock, setTempSizeStock] = useState<Record<string, number>>({});

  const [selectedChartPoint, setSelectedChartPoint] = useState(
    ADMIN_DASHBOARD_DATA.salesChart30Days.find((p) => p.highlight) || ADMIN_DASHBOARD_DATA.salesChart30Days[8]
  );

  const handleTabChange = (tab: typeof activeTab) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openProductEditor = (prod: Product) => {
    setEditingProduct(prod);
    setTempColors([...prod.colors]);
    setTempPrice(prod.price);
    setTempSizeStock({ ...(prod.sizeStock || {}) });
  };

  const handleSaveProductEditor = () => {
    if (!editingProduct) return;
    updateProductColors(editingProduct.id, tempColors);
    updateProductPrice(editingProduct.id, tempPrice, editingProduct.originalPrice);

    // Update size stocks
    Object.entries(tempSizeStock).forEach(([sz, qty]) => {
      updateSizeStock(editingProduct.id, sz, qty);
    });

    setEditingProduct(null);
  };

  const handleAddColor = () => {
    if (!newColorName.trim()) return;
    const newColor: ColorOption = {
      name: newColorName.trim(),
      hex: newColorHex,
      image: editingProduct?.image,
      stock: 4,
    };
    setTempColors((prev) => [...prev, newColor]);
    setNewColorName('');
    setNewColorHex('#000000');
  };

  const handleRemoveColor = (colorName: string) => {
    setTempColors((prev) => prev.filter((c) => c.name !== colorName));
  };

  // Filtered products list for the Products tab
  const filteredAdminProducts = products.filter((p) => {
    const matchesCat =
      productCategoryFilter === 'all' || p.category === productCategoryFilter;
    const matchesSearch = productSearch
      ? p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
        p.subcategory.toLowerCase().includes(productSearch.toLowerCase())
      : true;
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F8F8FA] flex flex-col md:flex-row text-gray-800 pb-20 md:pb-0">
      {/* 1. Desktop Permanent Sidebar */}
      <aside className="hidden md:flex md:w-64 bg-gradient-to-b from-[#0A0A0C] via-[#121214] to-[#17171A] text-white flex-col justify-between shrink-0 shadow-2xl z-30 min-h-screen sticky top-0">
        <div>
          {/* Logo Header */}
          <div className="p-6 border-b border-white/10 flex flex-col items-center text-center">
            <Link href="/" className="group flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-white p-1.5 shadow-lg flex items-center justify-center border-2 border-neutral-700 transition-transform group-hover:scale-105">
                <Image
                  src="/images/logo-circle.png"
                  alt="MIIXXIIE"
                  width={56}
                  height={56}
                  className="rounded-full object-contain"
                />
              </div>
              <span className="text-[10px] tracking-[0.24em] uppercase font-bold text-neutral-300 mt-2.5">
                Moda Plus Size Manaus
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            <button
              onClick={() => handleTabChange('dashboard')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-white text-black font-extrabold shadow-md'
                  : 'text-neutral-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => handleTabChange('produtos')}
              className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'produtos'
                  ? 'bg-white text-black font-extrabold shadow-md'
                  : 'text-neutral-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Shirt className="w-4 h-4" />
                <span>Estoque & Produtos</span>
              </div>
              <span className="bg-neutral-800 text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/20">
                {products.length}
              </span>
            </button>

            <button
              onClick={() => handleTabChange('pedidos')}
              className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'pedidos'
                  ? 'bg-white text-black font-extrabold shadow-md'
                  : 'text-neutral-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-4 h-4" />
                <span>Pedidos & Entregas</span>
              </div>
              <span className="bg-[#25D366] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                {adminOrders.length}
              </span>
            </button>

            <button
              onClick={() => handleTabChange('clientes')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'clientes'
                  ? 'bg-white text-black font-extrabold shadow-md'
                  : 'text-neutral-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Clientes Manaus</span>
            </button>

            <button
              onClick={() => handleTabChange('relatorios')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'relatorios'
                  ? 'bg-white text-black font-extrabold shadow-md'
                  : 'text-neutral-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Relatórios</span>
            </button>

            <button
              onClick={() => handleTabChange('configuracoes')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'configuracoes'
                  ? 'bg-white text-black font-extrabold shadow-md'
                  : 'text-neutral-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Frete & Configurações</span>
            </button>
          </nav>
        </div>

        {/* Back to Storefront Link */}
        <div className="p-4 border-t border-white/10 space-y-2">
          <Link
            href="/"
            className="flex items-center gap-2.5 px-4 py-2 rounded-xl text-xs font-semibold text-neutral-300 hover:bg-white/10 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar à Loja Virtual</span>
          </Link>
          <div className="px-4 py-2 text-[10px] text-neutral-400">
            MIIXXIIE • Manaus - AM
          </div>
        </div>
      </aside>

      {/* 2. Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Navbar Header */}
        <header className="bg-white border-b border-[#E4E4E7] px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-20 shadow-2xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-xl text-neutral-700 hover:bg-neutral-100"
              aria-label="Abrir menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="font-extrabold text-base sm:text-lg text-neutral-900 capitalize">
              {activeTab === 'produtos' ? 'Gestão de Estoque & Cores' : activeTab}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {/* Store Online / Offline Toggle */}
            <div className="flex items-center gap-2 bg-neutral-100 px-3 py-1.5 rounded-full border border-neutral-200 text-xs">
              <span
                className={`w-2 h-2 rounded-full ${
                  isStoreOnline ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'
                }`}
              />
              <span className="font-bold text-neutral-800 text-[11px]">
                {isStoreOnline ? 'Loja Online em Manaus' : 'Loja Pausada'}
              </span>
            </div>

            {/* Quick Link to WhatsApp Web */}
            <button
              onClick={() =>
                window.open('https://web.whatsapp.com', '_blank', 'noopener,noreferrer')
              }
              className="hidden sm:flex items-center gap-1.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold px-3.5 py-1.5 rounded-full shadow-xs transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white" />
              <span>WhatsApp Web</span>
            </button>
          </div>
        </header>

        {/* Tab 1: Dashboard Overview */}
        {activeTab === 'dashboard' && (
          <div className="p-4 sm:p-6 lg:p-8 space-y-6">
            {/* 4 KPIs Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {ADMIN_DASHBOARD_DATA.kpis.map((kpi) => (
                <div
                  key={kpi.id}
                  className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E4E4E7] shadow-xs flex flex-col justify-between"
                >
                  <span className="text-xs text-neutral-500 font-medium">
                    {kpi.label}
                  </span>
                  <div className="flex items-baseline justify-between mt-2">
                    <span className="text-xl sm:text-2xl font-black text-neutral-900">
                      {kpi.value}
                    </span>
                    {kpi.growth && (
                      <span className="text-xs font-bold text-emerald-600">
                        {kpi.growth}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions Bar */}
            <div className="bg-white rounded-2xl p-4 border border-[#E4E4E7] flex flex-wrap items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-2">
                <Store className="w-4 h-4 text-neutral-700" />
                <span className="text-xs font-bold text-neutral-900">
                  Mostruário Real MIIXXIIE (WhatsApp Oficial)
                </span>
                <span className="text-[10px] bg-black text-white px-2 py-0.5 rounded-full font-bold">
                  {products.length} Modelos Reais
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleTabChange('produtos')}
                  className="px-4 py-1.5 rounded-full bg-black text-white text-xs font-bold hover:bg-neutral-800 transition-colors"
                >
                  Ver Estoque Completo
                </button>
                <button
                  onClick={() => handleTabChange('pedidos')}
                  className="px-4 py-1.5 rounded-full bg-neutral-100 text-neutral-800 text-xs font-bold hover:bg-neutral-200 transition-colors"
                >
                  Acompanhar Pedidos
                </button>
              </div>
            </div>

            {/* Recent Orders Overview */}
            <div className="bg-white rounded-2xl p-4 sm:p-6 border border-[#E4E4E7] shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm sm:text-base text-neutral-900">
                  Últimos Pedidos Recebidos ({adminOrders.length})
                </h3>
                <button
                  onClick={() => handleTabChange('pedidos')}
                  className="text-xs font-bold text-black hover:underline"
                >
                  Ver todos
                </button>
              </div>

              <div className="divide-y divide-neutral-100">
                {adminOrders.map((ord) => (
                  <div
                    key={ord.id}
                    className="py-3 flex items-center justify-between gap-2 text-xs"
                  >
                    <div>
                      <span className="font-bold text-neutral-900">{ord.id}</span>
                      <span className="font-medium text-neutral-700 ml-2">
                        {ord.customer}
                      </span>
                      {ord.deliveryMethod && (
                        <span className="text-[10px] text-neutral-400 block sm:inline sm:ml-2">
                          • {ord.deliveryMethod}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-extrabold text-neutral-900">
                        {formatCurrencyBRL(ord.total)}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${ord.statusBadge}`}>
                        {ord.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Gestão de Produtos, Estoque e Cores */}
        {activeTab === 'produtos' && (
          <div className="p-4 sm:p-6 lg:p-8 space-y-6">
            {/* Header with Search & Category Filter */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-extrabold text-neutral-900">
                  Gestão de Estoque & Cores Disponíveis
                </h2>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Controle as {products.length} peças reais, ajuste quantidades por tamanho e configure paleta de cores.
                </p>
              </div>

              {/* Search Bar */}
              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  placeholder="Buscar peça ou categoria..."
                  className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-neutral-300 rounded-full focus:outline-none focus:border-black"
                />
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              <button
                onClick={() => setProductCategoryFilter('all')}
                className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  productCategoryFilter === 'all'
                    ? 'bg-black text-white shadow-xs'
                    : 'bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-100'
                }`}
              >
                Todas as Categorias ({products.length})
              </button>

              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setProductCategoryFilter(cat.slug)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                    productCategoryFilter === cat.slug
                      ? 'bg-black text-white shadow-xs'
                      : 'bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  {cat.name} ({cat.count})
                </button>
              ))}
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-2xl border border-neutral-200 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-neutral-200 bg-neutral-50 text-neutral-500 font-bold uppercase text-[10px] tracking-wider">
                      <th className="py-3 px-4">Peça</th>
                      <th className="py-3 px-4">Categoria</th>
                      <th className="py-3 px-4">Preço</th>
                      <th className="py-3 px-4">Cores Disponíveis</th>
                      <th className="py-3 px-4">Estoque Total</th>
                      <th className="py-3 px-4 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {filteredAdminProducts.map((prod) => (
                      <tr
                        key={prod.id}
                        className="hover:bg-neutral-50/70 transition-colors"
                      >
                        {/* Product Image & Name */}
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="relative w-12 h-14 rounded-lg overflow-hidden bg-neutral-100 border border-neutral-200 shrink-0">
                              <Image
                                src={prod.image}
                                alt={prod.name}
                                fill
                                sizes="48px"
                                className="object-cover object-top"
                              />
                            </div>
                            <div>
                              <span className="font-bold text-neutral-900 block line-clamp-1">
                                {prod.name}
                              </span>
                              <span className="text-[10px] text-neutral-400">
                                Tam: {prod.sizes.join(', ')}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-neutral-100 text-neutral-800 border border-neutral-200 whitespace-nowrap">
                            {prod.subcategory}
                          </span>
                        </td>

                        {/* Price */}
                        <td className="py-3 px-4 font-bold text-neutral-900">
                          {formatCurrencyBRL(prod.price)}
                          {prod.comboOffer && (
                            <span className="block text-[9px] text-amber-600 font-semibold">
                              {prod.comboOffer}
                            </span>
                          )}
                        </td>

                        {/* Colors with Color Swatches */}
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1.5 flex-wrap max-w-[200px]">
                            {prod.colors.map((c, i) => (
                              <span
                                key={i}
                                style={{ backgroundColor: c.hex }}
                                className="w-3.5 h-3.5 rounded-full border border-neutral-300 inline-block shrink-0 shadow-2xs"
                                title={c.name}
                              />
                            ))}
                            <span className="text-[10px] text-neutral-500 font-semibold ml-1">
                              ({prod.colors.length} cores)
                            </span>
                          </div>
                        </td>

                        {/* Stock with Quick Adjusters */}
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateStock(prod.id, prod.stockTotal - 1)}
                              className="w-6 h-6 rounded-md bg-neutral-100 hover:bg-neutral-200 text-neutral-700 flex items-center justify-center font-bold"
                              title="Reduzir 1 peça"
                            >
                              -
                            </button>
                            <span
                              className={`font-black text-xs min-w-[24px] text-center ${
                                prod.stockTotal <= 3
                                  ? 'text-red-600'
                                  : 'text-neutral-900'
                              }`}
                            >
                              {prod.stockTotal}
                            </span>
                            <button
                              onClick={() => updateStock(prod.id, prod.stockTotal + 1)}
                              className="w-6 h-6 rounded-md bg-neutral-100 hover:bg-neutral-200 text-neutral-700 flex items-center justify-center font-bold"
                              title="Adicionar 1 peça"
                            >
                              +
                            </button>
                          </div>
                        </td>

                        {/* Action: Edit Colors & Stock */}
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => openProductEditor(prod)}
                            className="inline-flex items-center gap-1 bg-black text-white text-[11px] font-bold px-3 py-1.5 rounded-full hover:bg-neutral-800 transition-colors shadow-2xs"
                          >
                            <Palette className="w-3 h-3" />
                            <span>Editar Cores & Grade</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Pedidos & Entregas */}
        {activeTab === 'pedidos' && (
          <div className="p-4 sm:p-6 lg:p-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-extrabold text-neutral-900">
                  Controle de Pedidos & Logística Manaus
                </h2>
                <p className="text-xs text-neutral-500">
                  Acompanhe os pedidos recebidos via WhatsApp, endereços e despachos por motoboy.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-neutral-200 p-4 sm:p-6 shadow-xs space-y-4">
              <div className="divide-y divide-neutral-100">
                {adminOrders.map((ord) => (
                  <div
                    key={ord.id}
                    className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-sm text-neutral-900">
                          {ord.id}
                        </span>
                        <span className="font-bold text-neutral-800">
                          {ord.customer}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-neutral-500 text-[11px]">
                        <Truck className="w-3.5 h-3.5 text-neutral-600" />
                        <span>{ord.deliveryMethod || 'A combinar em Manaus'}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between md:justify-end gap-3">
                      <span className="text-sm font-black text-neutral-900">
                        {formatCurrencyBRL(ord.total)}
                      </span>

                      <select
                        value={ord.status}
                        onChange={(e) =>
                          updateOrderStatus(
                            ord.id,
                            e.target.value as AdminOrder['status']
                          )
                        }
                        className={`text-[11px] font-bold px-3 py-1.5 rounded-full border-none cursor-pointer ${ord.statusBadge}`}
                      >
                        <option value="Pago">● Pago</option>
                        <option value="Em Atendimento">● Em Atendimento</option>
                        <option value="Pendente">● Pendente</option>
                        <option value="Enviado">● Enviado (Motoboy)</option>
                      </select>

                      <button
                        onClick={() => setSelectedOrderDetails(ord)}
                        className="px-3 py-1.5 rounded-full border border-neutral-300 text-neutral-700 hover:bg-neutral-100 text-[11px] font-bold"
                      >
                        Ver Detalhes
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Frete & Configurações de Manaus */}
        {activeTab === 'configuracoes' && (
          <div className="p-4 sm:p-6 lg:p-8 space-y-6">
            <div>
              <h2 className="text-xl font-extrabold text-neutral-900">
                Políticas de Frete & Localização (Manaus - AM)
              </h2>
              <p className="text-xs text-neutral-500">
                Configure as taxas por bairro para envio via motoboy e os pontos de retirada presencial.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Manaus Neighborhoods Delivery Table */}
              <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-neutral-800" />
                    <h3 className="font-bold text-sm text-neutral-900">
                      Tabela de Frete por Bairros de Manaus
                    </h3>
                  </div>
                  <span className="text-[10px] text-neutral-500">
                    Varia por distância
                  </span>
                </div>

                <div className="divide-y divide-neutral-100 max-h-80 overflow-y-auto">
                  {MANAUS_NEIGHBORHOODS_LIST.map((n, i) => (
                    <div
                      key={i}
                      className="py-2.5 flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="font-bold text-neutral-900 block">
                          {n.name}
                        </span>
                        <span className="text-[10px] text-neutral-400">
                          Zona {n.zone} • {n.time}
                        </span>
                      </div>
                      <span className="font-bold text-black bg-neutral-100 px-2.5 py-1 rounded-md">
                        {formatCurrencyBRL(n.fee)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Store & WhatsApp Settings */}
              <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-xs space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-neutral-200">
                  <Store className="w-4 h-4 text-neutral-800" />
                  <h3 className="font-bold text-sm text-neutral-900">
                    Dados da Loja Física & WhatsApp
                  </h3>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-neutral-500 font-semibold mb-1">
                      WhatsApp Oficial de Vendas:
                    </label>
                    <input
                      type="text"
                      disabled
                      value={`+${STORE_CONFIG.whatsappNumber} (MIIXXIIE Manaus)`}
                      className="w-full bg-neutral-100 border border-neutral-200 px-3 py-2 rounded-xl text-neutral-900 font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-500 font-semibold mb-1">
                      Modalidade de Retirada:
                    </label>
                    <input
                      type="text"
                      disabled
                      value="Retirada Grátis em Manaus - AM (Com agendamento prévio)"
                      className="w-full bg-neutral-100 border border-neutral-200 px-3 py-2 rounded-xl text-neutral-900 font-bold"
                    />
                  </div>

                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-800 text-[11px] space-y-1">
                    <p className="font-bold">✓ Negócio Local Manaus Ativo</p>
                    <p>
                      O catálogo online está sincronizado com o WhatsApp oficial da loja. Todos os pedidos são enviados com a escolha de bairro e forma de entrega.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Clientes, Cupons, Relatorios */}
        {(activeTab === 'clientes' ||
          activeTab === 'cupons' ||
          activeTab === 'relatorios') && (
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200 text-center max-w-lg mx-auto space-y-4 shadow-xs">
              <div className="w-12 h-12 rounded-full bg-neutral-100 text-black flex items-center justify-center mx-auto">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-neutral-900 capitalize">
                Módulo de {activeTab}
              </h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Este módulo está totalmente integrado à base de dados local de clientes e vendas da MIIXXIIE em Manaus.
              </p>
              <button
                onClick={() => handleTabChange('dashboard')}
                className="px-6 py-2 rounded-full bg-black text-white text-xs font-bold hover:bg-neutral-800 transition-colors"
              >
                Retornar ao Dashboard Principal
              </button>
            </div>
          </div>
        )}
      </main>

      {/* 3. Modal de Edição de Cores & Grade de Estoque */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="bg-white rounded-3xl p-5 sm:p-6 max-w-xl w-full shadow-2xl border border-neutral-200 space-y-5 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-14 rounded-lg overflow-hidden bg-neutral-100 border border-neutral-200 shrink-0">
                  <Image
                    src={editingProduct.image}
                    alt={editingProduct.name}
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-neutral-500 uppercase">
                    Configurar Produto
                  </span>
                  <h3 className="font-extrabold text-sm sm:text-base text-neutral-900">
                    {editingProduct.name}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setEditingProduct(null)}
                className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-500 hover:text-black flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Price Edit */}
            <div>
              <label className="block text-xs font-bold text-neutral-800 mb-1">
                Preço de Venda (R$):
              </label>
              <input
                type="number"
                step="0.10"
                value={tempPrice}
                onChange={(e) => setTempPrice(parseFloat(e.target.value) || 0)}
                className="w-full text-xs font-bold bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2 text-neutral-900 focus:outline-none focus:border-black"
              />
            </div>

            {/* Modern Color Management Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-neutral-900 flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5" />
                  <span>Cores Disponíveis ({tempColors.length}):</span>
                </label>
              </div>

              {/* Color Swatches Grid */}
              <div className="flex flex-wrap gap-2 p-3 bg-neutral-50 rounded-2xl border border-neutral-200 max-h-40 overflow-y-auto">
                {tempColors.map((color, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-full border border-neutral-300 text-xs shadow-2xs"
                  >
                    <span
                      style={{ backgroundColor: color.hex }}
                      className="w-3 h-3 rounded-full border border-neutral-300 inline-block"
                    />
                    <span className="font-semibold text-neutral-800 text-[11px]">
                      {color.name}
                    </span>
                    <button
                      onClick={() => handleRemoveColor(color.name)}
                      className="text-neutral-400 hover:text-red-500 ml-1"
                      title="Remover cor"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add New Color Input */}
              <div className="p-3 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-2">
                <span className="text-[11px] font-bold text-neutral-700 block">
                  Adicionar Nova Cor Disponível:
                </span>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={newColorHex}
                    onChange={(e) => setNewColorHex(e.target.value)}
                    className="w-8 h-8 rounded-lg cursor-pointer border border-neutral-300 p-0.5 bg-white shrink-0"
                    title="Seletor de cor visual"
                  />
                  <input
                    type="text"
                    value={newColorName}
                    onChange={(e) => setNewColorName(e.target.value)}
                    placeholder="Nome da cor (Ex: Verde Oliva, Fúcsia)"
                    className="flex-1 text-xs bg-white border border-neutral-300 rounded-xl px-3 py-1.5 text-neutral-900 focus:outline-none focus:border-black"
                  />
                  <button
                    onClick={handleAddColor}
                    className="bg-black text-white text-xs font-bold px-3 py-1.5 rounded-xl hover:bg-neutral-800 shrink-0"
                  >
                    Adicionar
                  </button>
                </div>
              </div>
            </div>

            {/* Size Stock Breakdown Section */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-900 block">
                Estoque por Tamanho (Unidades em Manaus):
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {editingProduct.sizes.map((sz) => (
                  <div
                    key={sz}
                    className="p-2.5 bg-neutral-50 rounded-xl border border-neutral-200 text-center"
                  >
                    <span className="block font-bold text-xs text-neutral-800 mb-1">
                      {sz}
                    </span>
                    <input
                      type="number"
                      min="0"
                      value={tempSizeStock[sz] ?? 3}
                      onChange={(e) =>
                        setTempSizeStock((prev) => ({
                          ...prev,
                          [sz]: parseInt(e.target.value, 10) || 0,
                        }))
                      }
                      className="w-full text-center text-xs font-bold bg-white border border-neutral-300 rounded-lg py-1 focus:outline-none focus:border-black"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Save Button */}
            <div className="pt-3 border-t border-neutral-200 flex justify-end gap-2">
              <button
                onClick={() => setEditingProduct(null)}
                className="px-4 py-2 rounded-full text-xs font-bold text-neutral-600 hover:bg-neutral-100"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveProductEditor}
                className="px-6 py-2 rounded-full text-xs font-bold bg-black text-white hover:bg-neutral-800 shadow-md transition-all"
              >
                Salvar Alterações
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Order Detail Modal */}
      {selectedOrderDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-5 sm:p-6 max-w-md w-full shadow-2xl border border-[#E4E4E7] space-y-4 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-bold text-neutral-900">
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

            <div className="bg-neutral-50 p-4 rounded-2xl space-y-2 text-xs border border-neutral-200">
              <div className="flex justify-between">
                <span className="text-gray-500">Total do Pedido:</span>
                <span className="font-bold text-gray-900">
                  {formatCurrencyBRL(selectedOrderDetails.total)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Forma de Entrega:</span>
                <span className="font-bold text-neutral-900">
                  {selectedOrderDetails.deliveryMethod || 'Motoboy Manaus'}
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
                <span className="font-bold text-emerald-700">WhatsApp Manaus (92 8419-9013)</span>
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
                    `https://wa.me/559284199013?text=Olá, ${selectedOrderDetails.customer}! Entro em contato referente ao seu pedido ${selectedOrderDetails.id} da MIIXXIIE.`,
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
