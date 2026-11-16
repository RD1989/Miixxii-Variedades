'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import {
  Product,
  ColorOption,
  useStore,
} from '@/store/useStore';
import {
  CATEGORIES,
  formatCurrencyBRL,
} from '@/data/mockData';
import {
  Plus,
  Search,
  Filter,
  Camera,
  Upload,
  Trash2,
  Edit2,
  Check,
  X,
  AlertTriangle,
  Eye,
  EyeOff,
  Sparkles,
  ShoppingBag,
  Palette,
  Image as ImageIcon,
  Star,
  Layers,
  ChevronDown,
  RotateCcw,
  CheckCircle2,
  LayoutGrid,
  List,
  ArrowUpDown,
  TrendingUp,
} from 'lucide-react';
import { compressAndEncodeImage } from '@/lib/supabase';

const COLOR_PRESETS = [
  { name: 'Preto', hex: '#111111' },
  { name: 'Branco', hex: '#FFFFFF' },
  { name: 'Off-White', hex: '#F8F8F5' },
  { name: 'Marrom Chocolate', hex: '#5D4037' },
  { name: 'Marsala / Vinho', hex: '#58111A' },
  { name: 'Azul Marinho', hex: '#1B263B' },
  { name: 'Verde Oliva', hex: '#6B8E23' },
  { name: 'Verde Militar', hex: '#4B5320' },
  { name: 'Terracota', hex: '#D95D39' },
  { name: 'Fúcsia', hex: '#C71585' },
  { name: 'Nude / Rosé', hex: '#E8A598' },
  { name: 'Mostarda', hex: '#D4A017' },
];

const STANDARD_SIZES = ['G (44)', 'GG (46/48)', 'G1 (50)', 'G2 (52)', 'G3 (54)', 'G4 (56)'];

export const AdminProductManager: React.FC = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    uploadProductImage,
    toggleProductActive,
    toggleProductFeatured,
    updateStock,
    updateSizeStock,
    categories,
  } = useStore();

  const storeCategories = categories && categories.length > 0 ? categories : CATEGORIES;

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filterStock, setFilterStock] = useState<'all' | 'low' | 'out'>('all');
  const [filterVisibility, setFilterVisibility] = useState<'all' | 'active' | 'hidden' | 'featured'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [sortBy, setSortBy] = useState<'recent' | 'stock-asc' | 'stock-desc' | 'price-desc' | 'price-asc' | 'name-asc'>('recent');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState('vestidos-curtos');
  const [formSubcategory, setFormSubcategory] = useState('Vestidos Plus Size');
  const [formPrice, setFormPrice] = useState('129.90');
  const [formOriginalPrice, setFormOriginalPrice] = useState('');
  const [formComboOffer, setFormComboOffer] = useState('');
  const [formBadge, setFormBadge] = useState<Product['badge']>('Novo');
  const [formDescription, setFormDescription] = useState('');
  const [formMaterial, setFormMaterial] = useState('');
  const [formStockTotal, setFormStockTotal] = useState(12);
  const [formImage, setFormImage] = useState('/images/banners/cat-banner-vestidos-curtos.jpg');
  const [formGallery, setFormGallery] = useState<string[]>([]);
  const [formSizes, setFormSizes] = useState<string[]>(['G (44)', 'GG (46/48)', 'G1 (50)', 'G2 (52)', 'G3 (54)']);
  const [formSizeStock, setFormSizeStock] = useState<Record<string, number>>({
    'G (44)': 2,
    'GG (46/48)': 3,
    'G1 (50)': 4,
    'G2 (52)': 2,
    'G3 (54)': 1,
  });
  const [formColors, setFormColors] = useState<ColorOption[]>([
    { name: 'Preto Clássico', hex: '#111111' },
    { name: 'Marsala', hex: '#58111A' },
  ]);
  const [formIsActive, setFormIsActive] = useState(true);

  // Color inputs
  const [newColorName, setNewColorName] = useState('');
  const [newColorHex, setNewColorHex] = useState('#111111');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadTarget, setUploadTarget] = useState<'main' | 'gallery'>('main');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // Metric counts for quick filter chips
  const totalCount = products.length;
  const activeCount = products.filter((p) => p.isActive !== false).length;
  const lowStockCount = products.filter((p) => p.stockTotal > 0 && p.stockTotal <= 3).length;
  const outOfStockCount = products.filter((p) => p.stockTotal === 0).length;
  const featuredCount = products.filter((p) => p.badge === 'Destaque').length;

  // Filter products
  const filteredProducts = products.filter((prod) => {
    const matchesSearch =
      prod.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prod.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prod.subcategory.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCat =
      selectedCategory === 'all' || prod.category === selectedCategory;

    let matchesStock = true;
    if (filterStock === 'low') matchesStock = prod.stockTotal > 0 && prod.stockTotal <= 3;
    if (filterStock === 'out') matchesStock = prod.stockTotal === 0;

    let matchesVisibility = true;
    const isActive = prod.isActive ?? true;
    if (filterVisibility === 'active') matchesVisibility = isActive;
    if (filterVisibility === 'hidden') matchesVisibility = !isActive;
    if (filterVisibility === 'featured') matchesVisibility = prod.badge === 'Destaque';

    return matchesSearch && matchesCat && matchesStock && matchesVisibility;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'stock-asc') return a.stockTotal - b.stockTotal;
    if (sortBy === 'stock-desc') return b.stockTotal - a.stockTotal;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
    return 0;
  });

  const handleOpenCreate = () => {
    setModalMode('create');
    setEditingProduct(null);
    setFormName('');
    setFormCategory('vestidos-curtos');
    setFormSubcategory('Vestidos Plus Size');
    setFormPrice('129.90');
    setFormOriginalPrice('');
    setFormComboOffer('');
    setFormBadge('Novo');
    setFormDescription('Modelagem anatômica desenvolvida exclusivamente para valorizar as curvas com elegância e conforto absoluto.');
    setFormMaterial('Viscose / Duna com elastano');
    setFormImage('/images/banners/cat-banner-vestidos-curtos.jpg');
    setFormGallery(['/images/banners/cat-banner-vestidos-curtos.jpg']);
    setFormSizes(['G (44)', 'GG (46/48)', 'G1 (50)', 'G2 (52)', 'G3 (54)']);
    setFormSizeStock({
      'G (44)': 2,
      'GG (46/48)': 3,
      'G1 (50)': 4,
      'G2 (52)': 2,
      'G3 (54)': 1,
    });
    setFormStockTotal(12);
    setFormColors([
      { name: 'Preto Clássico', hex: '#111111' },
      { name: 'Marsala', hex: '#58111A' },
    ]);
    setFormIsActive(true);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product: Product) => {
    setModalMode('edit');
    setEditingProduct(product);
    setFormName(product.name);
    setFormCategory(product.category);
    setFormSubcategory(product.subcategory);
    setFormPrice(product.price.toString());
    setFormOriginalPrice(product.originalPrice ? product.originalPrice.toString() : '');
    setFormComboOffer(product.comboOffer || '');
    setFormBadge(product.badge);
    setFormDescription(product.description || '');
    setFormMaterial(product.material || '');
    setFormStockTotal(product.stockTotal);
    setFormImage(product.image);
    setFormGallery(product.gallery && product.gallery.length > 0 ? product.gallery : [product.image]);
    setFormSizes(product.sizes || ['G', 'GG', 'G1', 'G2']);
    setFormSizeStock(product.sizeStock || {});
    setFormColors(product.colors || []);
    setFormIsActive(product.isActive ?? true);
    setIsModalOpen(true);
  };

  // Image Upload handler
  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const compressedBase64 = await compressAndEncodeImage(file, 1200, 0.85);
      if (uploadTarget === 'main') {
        setFormImage(compressedBase64);
        if (!formGallery.includes(compressedBase64)) {
          setFormGallery([compressedBase64, ...formGallery]);
        }
      } else {
        setFormGallery([...formGallery, compressedBase64]);
      }
      setIsUploading(false);
    } catch (err) {
      console.error('Erro ao processar imagem:', err);
      setIsUploading(false);
      alert('Não foi possível carregar a imagem. Tente novamente.');
    }
  };

  const triggerUpload = (target: 'main' | 'gallery', mode: 'camera' | 'file') => {
    setUploadTarget(target);
    if (mode === 'camera') {
      cameraInputRef.current?.click();
    } else {
      fileInputRef.current?.click();
    }
  };

  const handleRemoveGalleryImage = (index: number) => {
    const updated = formGallery.filter((_, idx) => idx !== index);
    setFormGallery(updated);
    if (formGallery[index] === formImage && updated.length > 0) {
      setFormImage(updated[0]);
    }
  };

  const handleSetMainImage = (url: string) => {
    setFormImage(url);
  };

  // Color management
  const handleAddColor = () => {
    if (!newColorName.trim()) return;
    setFormColors([...formColors, { name: newColorName.trim(), hex: newColorHex }]);
    setNewColorName('');
  };

  const handleApplyPresetColor = (preset: { name: string; hex: string }) => {
    if (!formColors.some((c) => c.name.toLowerCase() === preset.name.toLowerCase())) {
      setFormColors([...formColors, { name: preset.name, hex: preset.hex }]);
    }
  };

  const handleRemoveColor = (index: number) => {
    setFormColors(formColors.filter((_, idx) => idx !== index));
  };

  // Size & Stock management
  const handleToggleSize = (size: string) => {
    if (formSizes.includes(size)) {
      const newSizes = formSizes.filter((s) => s !== size);
      const newStock = { ...formSizeStock };
      delete newStock[size];
      setFormSizes(newSizes);
      setFormSizeStock(newStock);
      const total = Object.values(newStock).reduce((sum, q) => sum + q, 0);
      setFormStockTotal(total);
    } else {
      const newSizes = [...formSizes, size];
      const newStock = { ...formSizeStock, [size]: 2 };
      setFormSizes(newSizes);
      setFormSizeStock(newStock);
      const total = Object.values(newStock).reduce((sum, q) => sum + q, 0);
      setFormStockTotal(total);
    }
  };

  const handleSizeQuantityChange = (size: string, qty: number) => {
    const validQty = Math.max(0, qty);
    const newStock = { ...formSizeStock, [size]: validQty };
    setFormSizeStock(newStock);
    const total = Object.values(newStock).reduce((sum, q) => sum + q, 0);
    setFormStockTotal(total);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();

    const priceNum = parseFloat(formPrice.replace(',', '.')) || 0;
    const origPriceNum = formOriginalPrice ? parseFloat(formOriginalPrice.replace(',', '.')) : null;

    if (modalMode === 'create') {
      const newId = `miixxe-${Date.now()}`;
      const newSlug = formName
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

      const newProduct: Product = {
        id: newId,
        name: formName,
        slug: newSlug || newId,
        category: formCategory,
        subcategory: formSubcategory,
        price: priceNum,
        originalPrice: origPriceNum,
        comboOffer: formComboOffer || null,
        badge: formBadge,
        rating: 5.0,
        reviewsCount: 12,
        sizes: formSizes,
        colors: formColors,
        image: formImage,
        gallery: formGallery.length > 0 ? formGallery : [formImage],
        description: formDescription,
        material: formMaterial,
        stockTotal: formStockTotal,
        sizeStock: formSizeStock,
        section: 'novidades',
        isActive: formIsActive,
      };

      addProduct(newProduct);
    } else if (editingProduct) {
      const updatedProduct: Product = {
        ...editingProduct,
        name: formName,
        category: formCategory,
        subcategory: formSubcategory,
        price: priceNum,
        originalPrice: origPriceNum,
        comboOffer: formComboOffer || null,
        badge: formBadge,
        description: formDescription,
        material: formMaterial,
        stockTotal: formStockTotal,
        sizeStock: formSizeStock,
        image: formImage,
        gallery: formGallery.length > 0 ? formGallery : [formImage],
        sizes: formSizes,
        colors: formColors,
        isActive: formIsActive,
        section: editingProduct.section,
      };

      updateProduct(updatedProduct);
    }

    setIsModalOpen(false);
  };

  const handleDelete = (product: Product) => {
    if (confirm(`Tem certeza que deseja remover o produto "${product.name}" do mostruário?`)) {
      deleteProduct(product.id);
    }
  };

  const handleQuickStock = (productId: string, delta: number) => {
    const prod = products.find((p) => p.id === productId);
    if (prod) {
      const nextTotal = Math.max(0, prod.stockTotal + delta);
      updateStock(productId, nextTotal);
    }
  };

  return (
    <div className="space-y-6">
      {/* Hidden inputs for camera and gallery upload */}
      <input
        type="file"
        ref={cameraInputRef}
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleImageFileChange}
      />
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        className="hidden"
        onChange={handleImageFileChange}
      />

      {/* KPI Summary Interactive Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
        <button
          type="button"
          onClick={() => {
            setFilterVisibility('all');
            setFilterStock('all');
            setSelectedCategory('all');
          }}
          className={`p-3 rounded-2xl border text-left transition-all ${
            filterVisibility === 'all' && filterStock === 'all'
              ? 'bg-black text-white border-black shadow-sm'
              : 'bg-white text-neutral-800 border-neutral-200 hover:border-neutral-400'
          }`}
        >
          <div className="text-[10px] uppercase font-bold opacity-70">Total Peças</div>
          <div className="text-lg font-black">{totalCount}</div>
        </button>

        <button
          type="button"
          onClick={() => {
            setFilterVisibility('active');
            setFilterStock('all');
          }}
          className={`p-3 rounded-2xl border text-left transition-all ${
            filterVisibility === 'active'
              ? 'bg-emerald-700 text-white border-emerald-700 shadow-sm'
              : 'bg-white text-neutral-800 border-neutral-200 hover:border-emerald-300'
          }`}
        >
          <div className="text-[10px] uppercase font-bold text-emerald-600">Ativas na Loja</div>
          <div className="text-lg font-black text-emerald-700">{activeCount}</div>
        </button>

        <button
          type="button"
          onClick={() => {
            setFilterStock('low');
            setFilterVisibility('all');
          }}
          className={`p-3 rounded-2xl border text-left transition-all ${
            filterStock === 'low'
              ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
              : 'bg-white text-neutral-800 border-neutral-200 hover:border-amber-300'
          }`}
        >
          <div className="text-[10px] uppercase font-bold text-amber-600">Baixo Estoque (≤3)</div>
          <div className="text-lg font-black text-amber-700">{lowStockCount}</div>
        </button>

        <button
          type="button"
          onClick={() => {
            setFilterStock('out');
            setFilterVisibility('all');
          }}
          className={`p-3 rounded-2xl border text-left transition-all ${
            filterStock === 'out'
              ? 'bg-red-600 text-white border-red-600 shadow-sm'
              : 'bg-white text-neutral-800 border-neutral-200 hover:border-red-300'
          }`}
        >
          <div className="text-[10px] uppercase font-bold text-red-500">Esgotadas (0 un)</div>
          <div className="text-lg font-black text-red-600">{outOfStockCount}</div>
        </button>

        <button
          type="button"
          onClick={() => {
            setFilterVisibility('featured');
            setFilterStock('all');
          }}
          className={`p-3 rounded-2xl border text-left transition-all col-span-2 sm:col-span-1 ${
            filterVisibility === 'featured'
              ? 'bg-amber-400 text-neutral-900 border-amber-400 shadow-sm'
              : 'bg-white text-neutral-800 border-neutral-200 hover:border-amber-300'
          }`}
        >
          <div className="text-[10px] uppercase font-bold text-amber-800">★ Destaques</div>
          <div className="text-lg font-black text-neutral-900">{featuredCount}</div>
        </button>
      </div>

      {/* Top Filter and Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-neutral-200 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nome, tecido, modelo ou categoria em Manaus..."
              className="w-full pl-9 pr-4 py-2.5 text-xs bg-neutral-50 border border-neutral-200 rounded-2xl focus:outline-none focus:border-black font-medium"
            />
          </div>

          {/* View Mode & Sort Controls */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 bg-neutral-100 border border-neutral-200 rounded-2xl px-3 py-2 text-xs font-semibold">
              <ArrowUpDown className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-xs font-semibold text-neutral-800 focus:outline-none cursor-pointer"
              >
                <option value="recent">Recentes (Padrão)</option>
                <option value="stock-asc">Menor Estoque (Reposição)</option>
                <option value="stock-desc">Maior Estoque</option>
                <option value="price-desc">Maior Preço</option>
                <option value="price-asc">Menor Preço</option>
                <option value="name-asc">Nome (A - Z)</option>
              </select>
            </div>

            {/* View Mode Toggle: Grid vs Table */}
            <div className="flex items-center bg-neutral-100 p-1 rounded-2xl border border-neutral-200">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-xl transition-all ${
                  viewMode === 'grid'
                    ? 'bg-white text-black shadow-xs font-bold'
                    : 'text-neutral-500 hover:text-black'
                }`}
                title="Modo Grade Visual (Cards 4:5)"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-xl transition-all ${
                  viewMode === 'table'
                    ? 'bg-white text-black shadow-xs font-bold'
                    : 'text-neutral-500 hover:text-black'
                }`}
                title="Modo Planilha / Tabela Rápida de Estoque"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={handleOpenCreate}
              className="px-4 py-2.5 bg-black hover:bg-neutral-800 text-white text-xs font-extrabold rounded-2xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-95 shrink-0"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span className="hidden sm:inline">Cadastrar Novo Produto</span>
              <span className="sm:hidden">Novo</span>
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-neutral-100 text-xs">
          {/* Category Dropdown */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-neutral-400">Categoria:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-1.5 bg-neutral-100 border border-neutral-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-black"
            >
              <option value="all">Todas as Categorias ({storeCategories.length})</option>
              {storeCategories.map((c) => (
                <option key={c.id} value={c.slug}>
                  {c.name} {c.isActive === false ? '(Pausada)' : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Visibility Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-neutral-400">Status:</span>
            <select
              value={filterVisibility}
              onChange={(e) => setFilterVisibility(e.target.value as any)}
              className="px-3 py-1.5 bg-neutral-100 border border-neutral-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-black"
            >
              <option value="all">Todos os Status</option>
              <option value="active">✓ Apenas Visíveis (Ativos)</option>
              <option value="hidden">✕ Apenas Ocultos</option>
              <option value="featured">★ Apenas Destaques</option>
            </select>
          </div>

          {/* Stock Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-neutral-400">Estoque:</span>
            <select
              value={filterStock}
              onChange={(e) => setFilterStock(e.target.value as any)}
              className="px-3 py-1.5 bg-neutral-100 border border-neutral-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-black"
            >
              <option value="all">Todo o Estoque</option>
              <option value="low">Baixo Estoque (≤ 3 un)</option>
              <option value="out">Esgotados (0 un)</option>
            </select>
          </div>

          <span className="ml-auto text-[11px] font-bold text-neutral-500">
            {sortedProducts.length} de {products.length} peças cadastradas
          </span>
        </div>
      </div>

      {/* Render Products: Empty State, Grid View, or Table View */}
      {sortedProducts.length === 0 ? (
        <div className="bg-white rounded-3xl border border-neutral-200 p-12 text-center space-y-3">
          <div className="w-14 h-14 bg-neutral-100 rounded-full flex items-center justify-center mx-auto text-neutral-400">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <h4 className="font-extrabold text-base text-neutral-900">Nenhuma peça encontrada</h4>
          <p className="text-xs text-neutral-500 max-w-sm mx-auto">
            Não encontramos peças com os filtros ou termo de busca selecionados. Tente limpar os filtros ou cadastre um novo produto.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
              setFilterStock('all');
              setFilterVisibility('all');
            }}
            className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-bold rounded-xl transition-all"
          >
            Limpar Todos os Filtros
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        /* Products Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {sortedProducts.map((product) => {
            const isActive = product.isActive ?? true;
            const isFeatured = product.badge === 'Destaque';

            return (
              <div
                key={product.id}
                className={`bg-white rounded-3xl border overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group ${
                  !isActive ? 'opacity-65 border-dashed border-neutral-300 bg-neutral-50/50' : 'border-neutral-200'
                }`}
              >
                <div>
                  {/* Image Container (100% Contained, Never Cropped) */}
                  <div className="relative aspect-[4/5] w-full bg-[#F7F7F9] overflow-hidden flex items-center justify-center p-2 border-b border-neutral-100">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 320px"
                      className="object-contain object-center group-hover:scale-102 transition-transform duration-300 drop-shadow-xs"
                    />

                    {/* Top Badges */}
                    <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
                      <span className="text-[10px] font-black bg-black text-white px-2.5 py-0.5 rounded-full shadow-xs uppercase tracking-wider">
                        {product.badge}
                      </span>
                      {product.comboOffer && (
                        <span className="text-[9px] font-bold bg-amber-400 text-neutral-900 px-2 py-0.5 rounded-full shadow-xs">
                          {product.comboOffer}
                        </span>
                      )}
                    </div>

                    {/* Top Right Quick Toggles: Featured Star & Visible Eye */}
                    <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 z-10">
                      {/* Toggle Destaque */}
                      <button
                        onClick={() => toggleProductFeatured(product.id)}
                        className={`p-1.5 rounded-full shadow-xs transition-all active:scale-90 ${
                          isFeatured
                            ? 'bg-amber-400 text-amber-950 font-bold'
                            : 'bg-white/90 text-neutral-400 hover:text-amber-500 hover:bg-white'
                        }`}
                        title={isFeatured ? 'Remover dos Destaques' : 'Destacar na Loja'}
                      >
                        <Star className={`w-3.5 h-3.5 ${isFeatured ? 'fill-current' : ''}`} />
                      </button>

                      {/* Toggle Active / Hidden */}
                      <button
                        onClick={() => toggleProductActive(product.id)}
                        className={`p-1.5 rounded-full shadow-xs transition-all active:scale-90 ${
                          isActive
                            ? 'bg-emerald-600 text-white'
                            : 'bg-neutral-800 text-neutral-300'
                        }`}
                        title={isActive ? 'Clique para ocultar produto' : 'Clique para ativar na loja'}
                      >
                        {isActive ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    {/* Stock Pill on Bottom Image */}
                    <div className="absolute bottom-2 left-2 right-2 bg-black/75 backdrop-blur-md text-white px-2.5 py-1 rounded-xl text-[10px] flex items-center justify-between font-medium">
                      <span className="flex items-center gap-1">
                        <span className={`w-1.5 h-1.5 rounded-full ${product.stockTotal > 0 ? 'bg-emerald-400' : 'bg-red-400'}`} />
                        {product.stockTotal > 0 ? `${product.stockTotal} un em Manaus` : 'Esgotado'}
                      </span>
                      <span className="text-neutral-300 font-normal">
                        {product.sizes?.length || 0} tamanhos
                      </span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-4 space-y-2.5">
                    <div>
                      <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                        <span>{product.subcategory}</span>
                        <span className={isActive ? 'text-emerald-700 font-extrabold' : 'text-neutral-400 font-semibold'}>
                          {isActive ? '● Ativo' : '○ Oculto'}
                        </span>
                      </div>

                      <h4 className="font-bold text-xs sm:text-sm text-neutral-900 line-clamp-1 mt-0.5">
                        {product.name}
                      </h4>

                      {/* Price */}
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-base font-black text-black">
                          {formatCurrencyBRL(product.price)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs text-neutral-400 line-through">
                            {formatCurrencyBRL(product.originalPrice)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Colors & Sizes Summary */}
                    <div className="space-y-1.5 text-[11px] pt-1 border-t border-neutral-100">
                      <div className="flex items-center gap-1.5">
                        <span className="text-neutral-400 font-medium shrink-0">Cores:</span>
                        <div className="flex items-center gap-1 overflow-hidden">
                          {product.colors?.map((c, i) => (
                            <span
                              key={i}
                              className="w-3.5 h-3.5 rounded-full border border-black/20 shrink-0"
                              style={{ backgroundColor: c.hex }}
                              title={c.name}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 text-neutral-600">
                        <span className="text-neutral-400 font-medium shrink-0">Grade:</span>
                        <span className="font-bold text-neutral-800 truncate">
                          {product.sizes?.join(', ')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Quick Stock & Actions Bar */}
                <div className="p-3 bg-neutral-50/80 border-t border-neutral-100 flex items-center justify-between gap-2">
                  {/* Fast Stock Stepper */}
                  <div className="flex items-center border border-neutral-200 rounded-xl bg-white overflow-hidden shadow-2xs">
                    <button
                      onClick={() => handleQuickStock(product.id, -1)}
                      className="w-7 h-7 flex items-center justify-center text-neutral-600 hover:bg-neutral-100 font-bold active:scale-95 text-xs"
                      title="Diminuir estoque (-1)"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-xs font-black text-neutral-900">
                      {product.stockTotal}
                    </span>
                    <button
                      onClick={() => handleQuickStock(product.id, +1)}
                      className="w-7 h-7 flex items-center justify-center text-neutral-600 hover:bg-neutral-100 font-bold active:scale-95 text-xs"
                      title="Aumentar estoque (+1)"
                    >
                      +
                    </button>
                  </div>

                  {/* Edit & Delete Buttons */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEdit(product)}
                      className="px-3 py-1.5 bg-black hover:bg-neutral-800 text-white text-xs font-bold rounded-xl flex items-center gap-1 transition-all active:scale-95"
                      title="Editar produto"
                    >
                      <Edit2 className="w-3 h-3" />
                      <span>Editar</span>
                    </button>

                    <button
                      onClick={() => handleDelete(product)}
                      className="p-1.5 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                      title="Excluir produto"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Table View: Fast Stock Management Spreadsheet */
        <div className="bg-white rounded-3xl border border-neutral-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-neutral-50/80 border-b border-neutral-200/80 text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                  <th className="py-3 px-4">Produto & Categoria</th>
                  <th className="py-3 px-3">Preço</th>
                  <th className="py-3 px-3">Estoque Rápido</th>
                  <th className="py-3 px-3">Tamanhos & Cores</th>
                  <th className="py-3 px-3 text-center">Destaque</th>
                  <th className="py-3 px-3 text-center">Visibilidade</th>
                  <th className="py-3 px-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {sortedProducts.map((product) => {
                  const isActive = product.isActive ?? true;
                  const isFeatured = product.badge === 'Destaque';
                  const isLowStock = product.stockTotal > 0 && product.stockTotal <= 3;
                  const isOutOfStock = product.stockTotal === 0;

                  return (
                    <tr
                      key={product.id}
                      className={`hover:bg-neutral-50/80 transition-colors ${
                        !isActive ? 'opacity-60 bg-neutral-50/40' : ''
                      }`}
                    >
                      {/* Product Thumbnail & Details */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-14 rounded-xl bg-neutral-100 border border-neutral-200 overflow-hidden shrink-0">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              sizes="48px"
                              className="object-contain p-0.5"
                            />
                          </div>
                          <div className="min-w-0">
                            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block truncate">
                              {product.subcategory}
                            </span>
                            <span className="font-extrabold text-neutral-900 block truncate max-w-xs sm:max-w-sm">
                              {product.name}
                            </span>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <span className="text-[9px] font-black bg-neutral-900 text-white px-1.5 py-0.2 rounded uppercase">
                                {product.badge}
                              </span>
                              {product.comboOffer && (
                                <span className="text-[9px] font-bold bg-amber-400 text-neutral-900 px-1.5 py-0.2 rounded">
                                  {product.comboOffer}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Price */}
                      <td className="py-3 px-3 whitespace-nowrap">
                        <div className="font-black text-neutral-900">
                          {formatCurrencyBRL(product.price)}
                        </div>
                        {product.originalPrice && (
                          <div className="text-[10px] text-neutral-400 line-through">
                            {formatCurrencyBRL(product.originalPrice)}
                          </div>
                        )}
                      </td>

                      {/* Stock Stepper */}
                      <td className="py-3 px-3 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center border border-neutral-200 rounded-lg bg-neutral-50 overflow-hidden shadow-2xs">
                            <button
                              onClick={() => handleQuickStock(product.id, -1)}
                              className="w-6 h-6 flex items-center justify-center text-neutral-600 hover:bg-neutral-200 font-bold active:scale-95 text-xs"
                              title="Diminuir estoque (-1)"
                            >
                              -
                            </button>
                            <span className="w-7 text-center text-xs font-black text-neutral-900">
                              {product.stockTotal}
                            </span>
                            <button
                              onClick={() => handleQuickStock(product.id, +1)}
                              className="w-6 h-6 flex items-center justify-center text-neutral-600 hover:bg-neutral-200 font-bold active:scale-95 text-xs"
                              title="Aumentar estoque (+1)"
                            >
                              +
                            </button>
                          </div>
                          {isOutOfStock ? (
                            <span className="text-[10px] font-extrabold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full">
                              Esgotado
                            </span>
                          ) : isLowStock ? (
                            <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                              Baixo ({product.stockTotal} un)
                            </span>
                          ) : (
                            <span className="text-[10px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                              Ok ({product.stockTotal} un)
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Sizes & Colors */}
                      <td className="py-3 px-3">
                        <div className="text-[11px] font-semibold text-neutral-700 truncate max-w-[140px]">
                          {product.sizes?.join(', ') || 'Único'}
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          {product.colors?.slice(0, 4).map((c, i) => (
                            <span
                              key={i}
                              className="w-3 h-3 rounded-full border border-black/20 shrink-0"
                              style={{ backgroundColor: c.hex }}
                              title={c.name}
                            />
                          ))}
                          {product.colors && product.colors.length > 4 && (
                            <span className="text-[9px] text-neutral-400 font-bold">
                              +{product.colors.length - 4}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Featured */}
                      <td className="py-3 px-3 text-center whitespace-nowrap">
                        <button
                          onClick={() => toggleProductFeatured(product.id)}
                          className={`p-1.5 rounded-full transition-all active:scale-90 ${
                            isFeatured
                              ? 'bg-amber-400 text-amber-950 font-bold shadow-xs'
                              : 'text-neutral-400 hover:text-amber-500 hover:bg-amber-50'
                          }`}
                          title={isFeatured ? 'Remover dos Destaques' : 'Destacar na Loja'}
                        >
                          <Star className={`w-4 h-4 ${isFeatured ? 'fill-current' : ''}`} />
                        </button>
                      </td>

                      {/* Visibility Toggle */}
                      <td className="py-3 px-3 text-center whitespace-nowrap">
                        <button
                          onClick={() => toggleProductActive(product.id)}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 mx-auto transition-all ${
                            isActive
                              ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                              : 'bg-neutral-200 text-neutral-600 hover:bg-neutral-300'
                          }`}
                          title={isActive ? 'Ocultar da Vitrine' : 'Tornar Visível'}
                        >
                          {isActive ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                          <span>{isActive ? 'Ativo' : 'Oculto'}</span>
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenEdit(product)}
                            className="p-1.5 rounded-lg bg-neutral-100 hover:bg-black hover:text-white text-neutral-700 transition-colors"
                            title="Editar produto"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(product)}
                            className="p-1.5 rounded-lg text-neutral-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                            title="Excluir produto"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================
          CREATE / EDIT PRODUCT MODAL (COMPLETE & FLUID)
          ======================================================== */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-5 sm:p-7 shadow-2xl border border-neutral-200 max-h-[92vh] overflow-y-auto space-y-6">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-black text-white flex items-center justify-center shadow-xs">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base sm:text-lg text-neutral-900">
                    {modalMode === 'create' ? 'Cadastrar Novo Modelo no Mostruário' : `Editar: ${formName}`}
                  </h3>
                  <span className="text-xs text-neutral-500 font-medium">
                    Sincronização em tempo real com a vitrine de Manaus
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 flex items-center justify-center transition-colors active:scale-95"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-5 text-xs">
              {/* Product Photos Section (Main + Gallery) */}
              <div className="p-4 sm:p-5 bg-[#F9F9FB] rounded-3xl border border-neutral-200 space-y-3.5">
                <div className="flex items-center justify-between">
                  <label className="font-extrabold text-neutral-900 text-xs flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-neutral-700" />
                    Fotos do Produto (100% visíveis, sem cortes)
                  </label>
                  <span className="text-[10px] text-neutral-500 font-semibold">
                    {formGallery.length} {formGallery.length === 1 ? 'foto' : 'fotos'} no mostruário
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                  {/* Main Selected Photo Preview */}
                  <div className="relative w-32 h-40 rounded-2xl bg-white overflow-hidden border-2 border-black p-1 shrink-0 flex items-center justify-center shadow-sm">
                    <Image
                      src={formImage}
                      alt="Preview Principal"
                      fill
                      className="object-contain object-center"
                    />
                    <span className="absolute bottom-1 bg-black/80 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-md">
                      Principal
                    </span>
                    {isUploading && (
                      <div className="absolute inset-0 bg-black/75 flex items-center justify-center text-white text-[10px] font-bold">
                        Comprimindo...
                      </div>
                    )}
                  </div>

                  {/* Upload Actions & Gallery Thumbnails */}
                  <div className="space-y-3 flex-1 w-full">
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => triggerUpload('main', 'camera')}
                        className="px-3.5 py-2 bg-black hover:bg-neutral-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs active:scale-95"
                      >
                        <Camera className="w-3.5 h-3.5" />
                        <span>Tirar Foto pelo Celular</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => triggerUpload('main', 'file')}
                        className="px-3.5 py-2 bg-white hover:bg-neutral-100 text-neutral-800 border border-neutral-300 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs active:scale-95"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Foto Principal (Galeria)</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => triggerUpload('gallery', 'file')}
                        className="px-3 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 border border-neutral-300 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Adicionar Mais Fotos</span>
                      </button>
                    </div>

                    {/* Gallery Thumbnails List */}
                    {formGallery.length > 0 && (
                      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
                        {formGallery.map((imgUrl, idx) => {
                          const isMain = formImage === imgUrl;
                          return (
                            <div
                              key={idx}
                              className={`relative w-12 h-16 rounded-xl overflow-hidden bg-white border-2 p-0.5 shrink-0 group ${
                                isMain ? 'border-black ring-1 ring-black' : 'border-neutral-200'
                              }`}
                            >
                              <Image
                                src={imgUrl}
                                alt={`Foto ${idx + 1}`}
                                fill
                                className="object-contain object-center cursor-pointer"
                                onClick={() => handleSetMainImage(imgUrl)}
                              />
                              <button
                                type="button"
                                onClick={() => handleRemoveGalleryImage(idx)}
                                className="absolute top-0.5 right-0.5 w-4 h-4 bg-red-600 text-white rounded-full flex items-center justify-center opacity-80 hover:opacity-100"
                                title="Remover esta foto"
                              >
                                <X className="w-2.5 h-2.5" />
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Title & Category (All 10 Categories) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-neutral-800 font-bold mb-1">
                    Nome Completo do Produto:
                  </label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Ex: Calça Lúcia Alfaiataria Plus Size"
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-2xl focus:outline-none focus:border-black font-semibold text-xs"
                  />
                </div>

                <div>
                  <label className="block text-neutral-800 font-bold mb-1">
                    Categoria Oficial:
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-2xl focus:outline-none focus:border-black font-semibold text-xs"
                  >
                    {storeCategories.map((cat) => (
                      <option key={cat.id} value={cat.slug}>
                        {cat.name} {cat.isActive === false ? '(Oculta)' : ''}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Subcategory, Badge & Visibility */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div>
                  <label className="block text-neutral-800 font-bold mb-1">
                    Subcategoria / Modelo:
                  </label>
                  <input
                    type="text"
                    value={formSubcategory}
                    onChange={(e) => setFormSubcategory(e.target.value)}
                    placeholder="Ex: Calças Alfaiataria"
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-2xl focus:outline-none focus:border-black text-xs font-medium"
                  />
                </div>

                <div>
                  <label className="block text-neutral-800 font-bold mb-1">
                    Selo / Destaque:
                  </label>
                  <select
                    value={formBadge}
                    onChange={(e) => setFormBadge(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-2xl focus:outline-none focus:border-black text-xs font-bold"
                  >
                    <option value="Novo">Novo</option>
                    <option value="Destaque">★ Destaque</option>
                    <option value="Oferta">Oferta</option>
                    <option value="Festa">Festa</option>
                    <option value="Mais Vendido">Mais Vendido</option>
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-800 font-bold mb-1">
                    Exibição no Site:
                  </label>
                  <button
                    type="button"
                    onClick={() => setFormIsActive(!formIsActive)}
                    className={`w-full px-3.5 py-2.5 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                      formIsActive
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                        : 'bg-neutral-100 text-neutral-600 border-neutral-300'
                    }`}
                  >
                    {formIsActive ? <Eye className="w-4 h-4 text-emerald-600" /> : <EyeOff className="w-4 h-4 text-neutral-500" />}
                    <span>{formIsActive ? 'Visível na Loja (Ativo)' : 'Oculto na Loja'}</span>
                  </button>
                </div>
              </div>

              {/* Prices & Combo */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div>
                  <label className="block text-neutral-800 font-bold mb-1">
                    Preço de Venda (R$):
                  </label>
                  <input
                    type="text"
                    required
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value)}
                    placeholder="128.00"
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-2xl focus:outline-none focus:border-black font-extrabold text-xs text-black"
                  />
                </div>

                <div>
                  <label className="block text-neutral-800 font-bold mb-1">
                    Preço Riscado (De):
                  </label>
                  <input
                    type="text"
                    value={formOriginalPrice}
                    onChange={(e) => setFormOriginalPrice(e.target.value)}
                    placeholder="Ex: 158.00 (opcional)"
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-2xl focus:outline-none focus:border-black text-xs font-medium"
                  />
                </div>

                <div>
                  <label className="block text-neutral-800 font-bold mb-1">
                    Promoção / Combo:
                  </label>
                  <input
                    type="text"
                    value={formComboOffer}
                    onChange={(e) => setFormComboOffer(e.target.value)}
                    placeholder="Ex: Leve 2 por R$ 220"
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-2xl focus:outline-none focus:border-black text-xs font-medium"
                  />
                </div>
              </div>

              {/* Sizes Selection & Detailed Stock per Size */}
              <div className="p-4 bg-[#F9F9FB] rounded-3xl border border-neutral-200 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="font-extrabold text-neutral-900 text-xs">
                    Grade de Tamanhos & Quantidades em Manaus:
                  </label>
                  <span className="text-[11px] font-black text-black">
                    Estoque Total: {formStockTotal} peças
                  </span>
                </div>

                {/* Size Chips Toggle */}
                <div className="flex flex-wrap gap-2">
                  {STANDARD_SIZES.map((size) => {
                    const isSelected = formSizes.includes(size);
                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => handleToggleSize(size)}
                        className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all active:scale-95 ${
                          isSelected
                            ? 'bg-black text-white shadow-xs'
                            : 'bg-white text-neutral-700 border border-neutral-200 hover:border-neutral-400'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>

                {/* Stock per Selected Size */}
                {formSizes.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 pt-2 border-t border-neutral-200/60">
                    {formSizes.map((size) => (
                      <div key={size} className="bg-white p-2.5 rounded-2xl border border-neutral-200 flex flex-col gap-1">
                        <span className="text-[10px] font-bold text-neutral-500">{size}</span>
                        <div className="flex items-center gap-1.5">
                          <input
                            type="number"
                            min="0"
                            value={formSizeStock[size] ?? 0}
                            onChange={(e) => handleSizeQuantityChange(size, parseInt(e.target.value) || 0)}
                            className="w-full px-2 py-1 text-xs font-extrabold bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-black text-center"
                          />
                          <span className="text-[10px] text-neutral-400 font-semibold">un</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Colors Manager with Presets */}
              <div className="p-4 bg-[#F9F9FB] rounded-3xl border border-neutral-200 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="font-extrabold text-neutral-900 text-xs flex items-center gap-1.5">
                    <Palette className="w-4 h-4 text-neutral-700" />
                    Cores Disponíveis:
                  </label>
                  <span className="text-[10px] text-neutral-500 font-semibold">
                    {formColors.length} {formColors.length === 1 ? 'cor' : 'cores'}
                  </span>
                </div>

                {/* Current Colors Badges */}
                <div className="flex flex-wrap gap-2">
                  {formColors.map((color, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-2xl border border-neutral-200 shadow-2xs"
                    >
                      <span
                        className="w-4 h-4 rounded-full border border-black/20 shrink-0"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span className="font-extrabold text-neutral-900 text-xs">{color.name}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveColor(idx)}
                        className="text-neutral-300 hover:text-red-500 transition-colors ml-1"
                        title="Remover cor"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Color Presets */}
                <div className="pt-2 border-t border-neutral-200/60">
                  <span className="text-[10px] font-bold text-neutral-400 block mb-1.5">
                    Adicionar cor rápida por paleta:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {COLOR_PRESETS.map((preset) => (
                      <button
                        key={preset.name}
                        type="button"
                        onClick={() => handleApplyPresetColor(preset)}
                        className="flex items-center gap-1 px-2 py-1 rounded-xl bg-white border border-neutral-200 hover:border-neutral-400 text-[10px] font-semibold transition-all active:scale-95"
                      >
                        <span
                          className="w-2.5 h-2.5 rounded-full border border-black/20 shrink-0"
                          style={{ backgroundColor: preset.hex }}
                        />
                        <span>{preset.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Color Input */}
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="color"
                    value={newColorHex}
                    onChange={(e) => setNewColorHex(e.target.value)}
                    className="w-9 h-9 rounded-xl cursor-pointer border border-neutral-300 shrink-0"
                    title="Escolha tom personalizado"
                  />
                  <input
                    type="text"
                    value={newColorName}
                    onChange={(e) => setNewColorName(e.target.value)}
                    placeholder="Nome da cor personalizada (Ex: Fúcsia Vibrante)"
                    className="flex-1 px-3 py-2 bg-white border border-neutral-200 rounded-xl focus:outline-none focus:border-black text-xs font-medium"
                  />
                  <button
                    type="button"
                    onClick={handleAddColor}
                    className="px-4 py-2 bg-black text-white rounded-xl font-bold hover:bg-neutral-800 transition-all text-xs"
                  >
                    Adicionar Cor
                  </button>
                </div>
              </div>

              {/* Material & Detailed Description (NEW!) */}
              <div className="space-y-3.5">
                <div>
                  <label className="block text-neutral-800 font-bold mb-1">
                    Tecido / Composição / Caimento:
                  </label>
                  <input
                    type="text"
                    value={formMaterial}
                    onChange={(e) => setFormMaterial(e.target.value)}
                    placeholder="Ex: Alfaiataria Premium com elastano / Forro interno anti-transparência"
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-2xl focus:outline-none focus:border-black text-xs font-medium"
                  />
                </div>

                <div>
                  <label className="block text-neutral-800 font-bold mb-1 flex items-center justify-between">
                    <span>Sobre a Peça / Descrição Completa:</span>
                    <span className="text-[10px] text-neutral-400 font-normal">Aparece na tela de detalhes</span>
                  </label>
                  <textarea
                    rows={3}
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    placeholder="Descreva detalhes como caimento, decote, bolsos, ocasiões de uso e diferenciais para clientes plus size..."
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-2xl focus:outline-none focus:border-black text-xs font-medium resize-none leading-relaxed"
                  />
                </div>
              </div>

              {/* Modal Action Buttons */}
              <div className="pt-4 border-t border-neutral-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-2xl text-neutral-600 hover:bg-neutral-100 font-bold transition-colors text-xs"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-7 py-2.5 bg-black hover:bg-neutral-800 text-white font-black rounded-2xl transition-all shadow-md active:scale-95 text-xs flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>{modalMode === 'create' ? 'Publicar no Catálogo' : 'Salvar Alterações'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};