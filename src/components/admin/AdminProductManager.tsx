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
} from 'lucide-react';
import { compressAndEncodeImage } from '@/lib/supabase';

export const AdminProductManager: React.FC = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    uploadProductImage,
    toggleProductActive,
    updateStock,
  } = useStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filterStock, setFilterStock] = useState<'all' | 'low' | 'out'>('all');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState('vestidos');
  const [formSubcategory, setFormSubcategory] = useState('Vestidos Longos');
  const [formPrice, setFormPrice] = useState('119.90');
  const [formOriginalPrice, setFormOriginalPrice] = useState('');
  const [formComboOffer, setFormComboOffer] = useState('');
  const [formBadge, setFormBadge] = useState<Product['badge']>('Novo');
  const [formDescription, setFormDescription] = useState('');
  const [formMaterial, setFormMaterial] = useState('');
  const [formStockTotal, setFormStockTotal] = useState(10);
  const [formImage, setFormImage] = useState('/images/catalog/vestido-curto-estampado.jpg');
  const [formSizes, setFormSizes] = useState<string[]>(['G', 'GG', 'G1', 'G2', 'G3']);
  const [formColors, setFormColors] = useState<ColorOption[]>([
    { name: 'Preto', hex: '#000000' },
    { name: 'Branco', hex: '#FFFFFF' },
  ]);
  const [newColorName, setNewColorName] = useState('');
  const [newColorHex, setNewColorHex] = useState('#000000');
  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

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

    return matchesSearch && matchesCat && matchesStock;
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
    setFormDescription('Modelagem anatômica desenvolvida exclusivamente para valorizar as curvas com elegância.');
    setFormMaterial('Viscose / Duna com elastano');
    setFormStockTotal(12);
    setFormImage('/images/catalog/vestido-curto-estampado.jpg');
    setFormSizes(['G', 'GG', 'G1', 'G2', 'G3']);
    setFormColors([
      { name: 'Preto Clássico', hex: '#111111' },
      { name: 'Marsala', hex: '#58111A' },
    ]);
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
    setFormSizes(product.sizes || ['G', 'GG', 'G1', 'G2']);
    setFormColors(product.colors || []);
    setIsModalOpen(true);
  };

  // Process image upload from device
  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      // Client-side compression for fast mobile experience
      const compressedBase64 = await compressAndEncodeImage(file, 1200, 0.85);
      setFormImage(compressedBase64);
      setIsUploading(false);
    } catch (err) {
      console.error('Erro ao processar imagem:', err);
      setIsUploading(false);
      alert('Não foi possível carregar a imagem. Tente novamente.');
    }
  };

  const handleAddColor = () => {
    if (!newColorName.trim()) return;
    setFormColors([...formColors, { name: newColorName.trim(), hex: newColorHex }]);
    setNewColorName('');
  };

  const handleRemoveColor = (index: number) => {
    setFormColors(formColors.filter((_, idx) => idx !== index));
  };

  const handleToggleSize = (size: string) => {
    if (formSizes.includes(size)) {
      setFormSizes(formSizes.filter((s) => s !== size));
    } else {
      setFormSizes([...formSizes, size]);
    }
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();

    const priceNum = parseFloat(formPrice.replace(',', '.')) || 0;
    const origPriceNum = formOriginalPrice ? parseFloat(formOriginalPrice.replace(',', '.')) : null;

    if (modalMode === 'create') {
      const newId = `prod-${Date.now()}`;
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
        reviewsCount: 14,
        sizes: formSizes,
        colors: formColors,
        image: formImage,
        gallery: [formImage],
        description: formDescription,
        material: formMaterial,
        stockTotal: formStockTotal,
        sizeStock: formSizes.reduce((acc, s) => ({ ...acc, [s]: Math.ceil(formStockTotal / formSizes.length) }), {}),
        section: 'novidades',
        isActive: true,
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
        image: formImage,
        gallery: formImage !== editingProduct.image ? [formImage, ...editingProduct.gallery] : editingProduct.gallery,
        sizes: formSizes,
        colors: formColors,
      };

      updateProduct(updatedProduct);
    }

    setIsModalOpen(false);
  };

  const handleDelete = (product: Product) => {
    if (confirm(`Tem certeza que deseja excluir o produto "${product.name}" do catálogo?`)) {
      deleteProduct(product.id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-neutral-200 shadow-xs">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar produto por nome, modelo ou categoria..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-black"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 text-xs bg-neutral-50 border border-neutral-200 rounded-xl font-medium focus:outline-none focus:border-black"
          >
            <option value="all">Todas as Categorias</option>
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>

          <select
            value={filterStock}
            onChange={(e) => setFilterStock(e.target.value as any)}
            className="px-3 py-2 text-xs bg-neutral-50 border border-neutral-200 rounded-xl font-medium focus:outline-none focus:border-black"
          >
            <option value="all">Estoque: Todos</option>
            <option value="low">Baixo Estoque (≤ 3 un)</option>
            <option value="out">Esgotados (0 un)</option>
          </select>

          <button
            onClick={handleOpenCreate}
            className="px-4 py-2 bg-black hover:bg-neutral-800 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shrink-0 transition-all shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Novo Produto</span>
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group"
          >
            {/* Image Thumbnail */}
            <div className="relative aspect-square w-full bg-neutral-100 overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 300px"
                className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />

              <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
                <span className="text-[10px] font-bold bg-black/80 backdrop-blur-md text-white px-2 py-0.5 rounded-full">
                  {product.badge}
                </span>
                {product.comboOffer && (
                  <span className="text-[9px] font-bold bg-emerald-600 text-white px-2 py-0.5 rounded-full shadow-xs">
                    {product.comboOffer}
                  </span>
                )}
              </div>

              <div className="absolute top-2 right-2 flex items-center gap-1 z-10">
                <button
                  onClick={() => toggleProductActive(product.id)}
                  className={`p-1.5 rounded-full backdrop-blur-md transition-all ${
                    product.isActive ?? true
                      ? 'bg-emerald-600/90 text-white'
                      : 'bg-neutral-800/80 text-neutral-400'
                  }`}
                  title={product.isActive ?? true ? 'Produto Ativo no Catálogo' : 'Produto Oculto'}
                >
                  {product.isActive ?? true ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Stock Tag on Image Bottom */}
              <div className="absolute bottom-2 left-2 right-2 bg-black/70 backdrop-blur-sm text-white px-2.5 py-1 rounded-xl text-[10px] flex items-center justify-between">
                <span>Estoque Loja:</span>
                <span className={`font-bold ${product.stockTotal <= 3 ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {product.stockTotal} peças
                </span>
              </div>
            </div>

            {/* Product Info */}
            <div className="p-3.5 flex flex-col flex-1 justify-between space-y-3">
              <div>
                <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider block">
                  {product.category} • {product.subcategory}
                </span>
                <h4 className="font-bold text-xs sm:text-sm text-neutral-900 line-clamp-1 mt-0.5">
                  {product.name}
                </h4>

                {/* Price Display */}
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-sm sm:text-base font-extrabold text-black">
                    {formatCurrencyBRL(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-[11px] text-neutral-400 line-through">
                      {formatCurrencyBRL(product.originalPrice)}
                    </span>
                  )}
                </div>

                {/* Colors dots */}
                <div className="flex items-center gap-1 mt-2">
                  {product.colors.slice(0, 5).map((color, idx) => (
                    <span
                      key={idx}
                      className="w-3.5 h-3.5 rounded-full border border-neutral-300 shrink-0"
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                  {product.colors.length > 5 && (
                    <span className="text-[9px] text-neutral-500 font-medium">
                      +{product.colors.length - 5}
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-neutral-100 flex items-center justify-between gap-1.5">
                <button
                  onClick={() => handleOpenEdit(product)}
                  className="flex-1 py-1.5 px-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold rounded-lg flex items-center justify-center gap-1 transition-all"
                >
                  <Edit2 className="w-3 h-3" />
                  <span>Editar</span>
                </button>

                <button
                  onClick={() => handleDelete(product)}
                  className="p-1.5 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                  title="Excluir Produto"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CREATE / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-5 sm:p-7 shadow-2xl border border-neutral-200 max-h-[90vh] overflow-y-auto space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-neutral-900">
                    {modalMode === 'create' ? 'Cadastrar Novo Produto' : `Editar: ${formName}`}
                  </h3>
                  <span className="text-xs text-neutral-500">
                    Sincronizado automaticamente com o catálogo de Manaus
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              {/* Product Photo Upload Section (Camera or PC) */}
              <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-3">
                <label className="block text-neutral-700 font-bold mb-1">
                  Foto Principal do Mostruário / Catálogo:
                </label>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="relative w-28 h-28 rounded-2xl bg-neutral-200 overflow-hidden border border-neutral-300 shrink-0">
                    <Image
                      src={formImage}
                      alt="Preview"
                      fill
                      className="object-cover object-top"
                    />
                    {isUploading && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-[10px] font-bold">
                        Processando...
                      </div>
                    )}
                  </div>

                  <div className="space-y-2 flex-1 w-full text-center sm:text-left">
                    <p className="text-[11px] text-neutral-500 leading-tight">
                      Carregue uma imagem diretamente do seu celular ou computador. As fotos são comprimidas automaticamente para carregar com máxima rapidez.
                    </p>

                    <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                      {/* Mobile Camera Input */}
                      <input
                        type="file"
                        ref={cameraInputRef}
                        accept="image/*"
                        capture="environment"
                        className="hidden"
                        onChange={handleImageFileChange}
                      />
                      <button
                        type="button"
                        onClick={() => cameraInputRef.current?.click()}
                        className="px-3 py-2 bg-black hover:bg-neutral-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs"
                      >
                        <Camera className="w-3.5 h-3.5" />
                        <span>Tirar Foto pelo Celular</span>
                      </button>

                      {/* File / Gallery Input */}
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageFileChange}
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-3 py-2 bg-white hover:bg-neutral-100 text-neutral-800 border border-neutral-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Escolher da Galeria</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Title & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-700 font-semibold mb-1">
                    Nome do Produto:
                  </label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Ex: Vestido Chemise Marsala Plus Size"
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-neutral-700 font-semibold mb-1">
                    Categoria:
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-black"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.slug}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Subcategory & Badge */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-700 font-semibold mb-1">
                    Subcategoria / Modelo:
                  </label>
                  <input
                    type="text"
                    value={formSubcategory}
                    onChange={(e) => setFormSubcategory(e.target.value)}
                    placeholder="Ex: Vestidos Longos / Alfaiataria"
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-neutral-700 font-semibold mb-1">
                    Selo / Badge:
                  </label>
                  <select
                    value={formBadge}
                    onChange={(e) => setFormBadge(e.target.value as any)}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-black"
                  >
                    <option value="Novo">Novo</option>
                    <option value="Oferta">Oferta</option>
                    <option value="Destaque">Destaque</option>
                    <option value="Festa">Festa</option>
                    <option value="Mais Vendido">Mais Vendido</option>
                  </select>
                </div>
              </div>

              {/* Prices & Promo */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-neutral-700 font-semibold mb-1">
                    Preço de Venda (R$):
                  </label>
                  <input
                    type="text"
                    required
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value)}
                    placeholder="129.90"
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-black font-bold"
                  />
                </div>

                <div>
                  <label className="block text-neutral-700 font-semibold mb-1">
                    Preço De / Riscado (opcional):
                  </label>
                  <input
                    type="text"
                    value={formOriginalPrice}
                    onChange={(e) => setFormOriginalPrice(e.target.value)}
                    placeholder="159.90"
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-neutral-700 font-semibold mb-1">
                    Oferta Combo (opcional):
                  </label>
                  <input
                    type="text"
                    value={formComboOffer}
                    onChange={(e) => setFormComboOffer(e.target.value)}
                    placeholder="Ex: Leve 2 por R$ 160"
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              {/* Sizes selection */}
              <div>
                <label className="block text-neutral-700 font-semibold mb-1.5">
                  Tamanhos Disponíveis:
                </label>
                <div className="flex flex-wrap gap-2">
                  {['G', 'GG', 'G1', 'G2', 'G3', 'EXG', '46', '48', '50', '52', '54'].map((size) => {
                    const isSelected = formSizes.includes(size);
                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => handleToggleSize(size)}
                        className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
                          isSelected
                            ? 'bg-black text-white shadow-xs'
                            : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Colors Manager */}
              <div className="p-3.5 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-2.5">
                <label className="block text-neutral-800 font-bold mb-1">
                  Cores do Produto:
                </label>

                <div className="flex flex-wrap gap-2">
                  {formColors.map((color, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-xl border border-neutral-200 shadow-2xs"
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-neutral-300"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span className="font-semibold text-neutral-800">{color.name}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveColor(idx)}
                        className="text-neutral-400 hover:text-red-500 ml-1"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add new color inline */}
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="color"
                    value={newColorHex}
                    onChange={(e) => setNewColorHex(e.target.value)}
                    className="w-8 h-8 rounded-lg cursor-pointer border border-neutral-300"
                    title="Escolha a cor HEX"
                  />
                  <input
                    type="text"
                    value={newColorName}
                    onChange={(e) => setNewColorName(e.target.value)}
                    placeholder="Nome da Cor (Ex: Vinho, Fúcsia)"
                    className="flex-1 px-3 py-1.5 bg-white border border-neutral-200 rounded-xl focus:outline-none focus:border-black text-xs"
                  />
                  <button
                    type="button"
                    onClick={handleAddColor}
                    className="px-3 py-1.5 bg-neutral-900 text-white rounded-xl font-semibold hover:bg-black transition-all"
                  >
                    Adicionar Cor
                  </button>
                </div>
              </div>

              {/* Material & Stock Total */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-700 font-semibold mb-1">
                    Tecido / Composição:
                  </label>
                  <input
                    type="text"
                    value={formMaterial}
                    onChange={(e) => setFormMaterial(e.target.value)}
                    placeholder="Ex: Alfaiataria com elastano"
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-neutral-700 font-semibold mb-1">
                    Estoque Total (peças em Manaus):
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formStockTotal}
                    onChange={(e) => setFormStockTotal(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-black font-bold"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-neutral-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-neutral-600 hover:bg-neutral-100 font-semibold transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-black hover:bg-neutral-800 text-white font-bold rounded-xl transition-all shadow-md"
                >
                  {modalMode === 'create' ? 'Cadastrar Produto' : 'Salvar Alterações'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
