'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import {
  FolderTree,
  Plus,
  Search,
  Eye,
  EyeOff,
  Edit2,
  Trash2,
  MoveUp,
  MoveDown,
  Upload,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  ShoppingBag,
  Layers,
  X,
  ExternalLink,
} from 'lucide-react';
import { useStore, Category } from '@/store/useStore';
import { compressAndEncodeImage } from '@/lib/supabase';

// Preset standard high-fashion images for quick selection
const PRESET_CATEGORY_IMAGES = [
  { label: 'Bermudas e Shorts', url: '/images/banners/cat-banner-bermudas-shorts.jpg' },
  { label: 'Calças Plus', url: '/images/banners/cat-banner-calcas.jpg' },
  { label: 'Camisas & Regatas', url: '/images/banners/cat-banner-camisas-regatas.jpg' },
  { label: 'Chemises', url: '/images/banners/cat-banner-chemises.jpg' },
  { label: 'Conjunto de Calça', url: '/images/banners/cat-banner-conjuntos-calca.jpg' },
  { label: 'Conjunto de Shorts', url: '/images/banners/cat-banner-conjuntos-shorts.jpg' },
  { label: 'Macaquinhas', url: '/images/banners/cat-banner-macaquinhas.jpg' },
  { label: 'Vestidos Curtos', url: '/images/banners/cat-banner-vestidos-curtos.jpg' },
  { label: 'Vestidos Longos', url: '/images/banners/cat-banner-vestidos-longos.jpg' },
  { label: 'Vestidos Midis', url: '/images/banners/cat-banner-vestidos-midis.jpg' },
  { label: 'Banner Estúdio MIIXXIIE', url: '/images/banners/banner-slide-1-marca.jpg' },
];

export const AdminCategoryManager: React.FC = () => {
  const {
    categories,
    products,
    addCategory,
    updateCategory,
    deleteCategory,
    toggleCategoryActive,
    reorderCategory,
    resetCategoriesToDefault,
  } = useStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);

  // Form State
  const [formName, setFormName] = useState('');
  const [formSlug, setFormSlug] = useState('');
  const [formImage, setFormImage] = useState('/images/banners/cat-banner-vestidos-curtos.jpg');
  const [formIsActive, setFormIsActive] = useState(true);
  const [formDescription, setFormDescription] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Helper to generate slug from name
  const slugify = (text: string) => {
    return text
      .toString()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  };

  const handleNameChange = (val: string) => {
    setFormName(val);
    if (modalMode === 'create') {
      setFormSlug(slugify(val));
    }
  };

  const handleOpenCreateModal = () => {
    setModalMode('create');
    setEditingCategoryId(null);
    setFormName('');
    setFormSlug('');
    setFormImage('/images/banners/banner-slide-1-marca.jpg');
    setFormIsActive(true);
    setFormDescription('');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (cat: Category) => {
    setModalMode('edit');
    setEditingCategoryId(cat.id);
    setFormName(cat.name);
    setFormSlug(cat.slug);
    setFormImage(cat.image);
    setFormIsActive(cat.isActive !== false);
    setFormDescription(cat.description || '');
    setIsModalOpen(true);
  };

  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) {
      alert('Por favor, informe o nome da categoria.');
      return;
    }

    const finalSlug = formSlug.trim() ? slugify(formSlug) : slugify(formName);

    if (modalMode === 'create') {
      addCategory({
        name: formName.trim(),
        slug: finalSlug,
        image: formImage,
        isActive: formIsActive,
        description: formDescription.trim(),
        count: 0,
        order: categories.length + 1,
      });
      showToast(`Categoria "${formName}" criada com sucesso!`);
    } else if (editingCategoryId) {
      const existing = categories.find((c) => c.id === editingCategoryId);
      if (existing) {
        updateCategory({
          ...existing,
          name: formName.trim(),
          slug: finalSlug,
          image: formImage,
          isActive: formIsActive,
          description: formDescription.trim(),
        });
        showToast(`Categoria "${formName}" atualizada com sucesso!`);
      }
    }

    setIsModalOpen(false);
  };

  const handleDeleteCategory = (cat: Category) => {
    const productsCount = products.filter(
      (p) => p.category === cat.slug || p.subcategory.toLowerCase().includes(cat.name.toLowerCase())
    ).length;

    const confirmMsg =
      productsCount > 0
        ? `Atenção: A categoria "${cat.name}" possui ${productsCount} peça(s) associada(s).\n\nDeseja realmente excluir esta categoria? Os produtos continuarão salvos no catálogo geral.`
        : `Deseja realmente excluir a categoria "${cat.name}"?`;

    if (window.confirm(confirmMsg)) {
      deleteCategory(cat.id);
      showToast(`Categoria "${cat.name}" removida.`);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const compressedDataUrl = await compressAndEncodeImage(file, 800, 0.85);
      setFormImage(compressedDataUrl);
      showToast('Imagem carregada e otimizada!');
    } catch (err) {
      alert('Erro ao carregar a imagem. Tente novamente.');
    } finally {
      setIsUploading(false);
    }
  };

  // Sort categories by order
  const sortedCategories = [...(categories || [])].sort((a, b) => (a.order || 0) - (b.order || 0));

  // Filter categories
  const filteredCategories = sortedCategories.filter((cat) => {
    const matchesSearch =
      cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.slug.toLowerCase().includes(searchTerm.toLowerCase());

    const isActive = cat.isActive !== false;
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'active' && isActive) ||
      (statusFilter === 'inactive' && !isActive);

    return matchesSearch && matchesStatus;
  });

  const totalCategories = categories.length;
  const activeCount = categories.filter((c) => c.isActive !== false).length;
  const inactiveCount = totalCategories - activeCount;

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-black text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-neutral-700 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-neutral-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
              Total de Categorias
            </span>
            <div className="w-8 h-8 rounded-full bg-neutral-100 text-neutral-700 flex items-center justify-center">
              <FolderTree className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-neutral-900">{totalCategories}</span>
            <span className="text-xs text-neutral-500 font-semibold">no catálogo</span>
          </div>
          <p className="text-[11px] text-neutral-400">Departamentos criados</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-neutral-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
              Categorias Ativas
            </span>
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center">
              <Eye className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-emerald-700">{activeCount}</span>
            <span className="text-xs text-emerald-600 font-semibold">visíveis na loja</span>
          </div>
          <p className="text-[11px] text-neutral-400">Exibidas no topo circular</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-neutral-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
              Categorias Ocultas
            </span>
            <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center">
              <EyeOff className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-amber-700">{inactiveCount}</span>
            <span className="text-xs text-amber-600 font-semibold">pausadas</span>
          </div>
          <p className="text-[11px] text-neutral-400">Ocultas para os clientes</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-neutral-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
              Total de Produtos
            </span>
            <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-neutral-900">{products.length}</span>
            <span className="text-xs text-neutral-500 font-semibold">peças cadastradas</span>
          </div>
          <p className="text-[11px] text-neutral-400">Distribuídas nas categorias</p>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-3xl border border-neutral-200 shadow-xs p-5 sm:p-6 space-y-6">
        {/* Actions Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-neutral-100">
          {/* Search & Status Filters */}
          <div className="flex flex-wrap items-center gap-3 flex-1">
            <div className="relative flex-1 min-w-[200px] max-w-md">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar categoria ou slug..."
                className="w-full pl-10 pr-4 py-2.5 rounded-full border border-neutral-200 text-xs sm:text-sm focus:outline-none focus:border-black transition-colors"
              />
            </div>

            <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-full">
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  statusFilter === 'all'
                    ? 'bg-white text-black shadow-xs font-bold'
                    : 'text-neutral-500 hover:text-black'
                }`}
              >
                Todas ({totalCategories})
              </button>
              <button
                onClick={() => setStatusFilter('active')}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  statusFilter === 'active'
                    ? 'bg-emerald-600 text-white shadow-xs font-bold'
                    : 'text-neutral-500 hover:text-emerald-700'
                }`}
              >
                Ativas ({activeCount})
              </button>
              <button
                onClick={() => setStatusFilter('inactive')}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  statusFilter === 'inactive'
                    ? 'bg-neutral-800 text-white shadow-xs font-bold'
                    : 'text-neutral-500 hover:text-black'
                }`}
              >
                Ocultas ({inactiveCount})
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (window.confirm('Deseja restaurar as categorias para a configuração padrão da MIIXXIIE?')) {
                  resetCategoriesToDefault();
                  showToast('Categorias restauradas para o catálogo padrão.');
                }
              }}
              title="Restaurar categorias padrão"
              className="p-2.5 rounded-full border border-neutral-200 hover:bg-neutral-100 text-neutral-600 hover:text-black transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={handleOpenCreateModal}
              className="bg-black hover:bg-neutral-800 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-full flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Nova Categoria</span>
            </button>
          </div>
        </div>

        {/* Categories List */}
        <div className="space-y-3">
          {filteredCategories.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <FolderTree className="w-12 h-12 text-neutral-300 mx-auto" />
              <p className="text-sm font-semibold text-neutral-600">Nenhuma categoria encontrada.</p>
              <p className="text-xs text-neutral-400">Tente ajustar o termo de busca ou filtros.</p>
            </div>
          ) : (
            filteredCategories.map((cat, index) => {
              const isActive = cat.isActive !== false;
              const countInStore = products.filter(
                (p) =>
                  p.category === cat.slug ||
                  p.subcategory.toLowerCase().includes(cat.name.toLowerCase())
              ).length;

              return (
                <div
                  key={cat.id}
                  className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl border transition-all ${
                    isActive
                      ? 'bg-white border-neutral-200 hover:border-black/50 hover:shadow-sm'
                      : 'bg-neutral-50 border-dashed border-neutral-300 opacity-70'
                  }`}
                >
                  {/* Left: Avatar + Info */}
                  <div className="flex items-center gap-4">
                    {/* Position Badge & Reorder Arrows */}
                    <div className="flex flex-col items-center justify-center gap-0.5 text-neutral-400">
                      <button
                        onClick={() => reorderCategory(cat.id, 'up')}
                        disabled={index === 0}
                        title="Mover para cima"
                        className="p-1 hover:text-black disabled:opacity-20 disabled:hover:text-neutral-400 transition-colors"
                      >
                        <MoveUp className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-[10px] font-bold text-neutral-400">
                        {cat.order || index + 1}º
                      </span>
                      <button
                        onClick={() => reorderCategory(cat.id, 'down')}
                        disabled={index === filteredCategories.length - 1}
                        title="Mover para baixo"
                        className="p-1 hover:text-black disabled:opacity-20 disabled:hover:text-neutral-400 transition-colors"
                      >
                        <MoveDown className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Circular Avatar Preview (same as CategoryBar on public store) */}
                    <div
                      className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden shrink-0 border-2 transition-all p-0.5 ${
                        isActive
                          ? 'border-neutral-900 bg-black shadow-xs'
                          : 'border-neutral-300 bg-neutral-200'
                      }`}
                    >
                      <div className="relative w-full h-full rounded-full overflow-hidden bg-neutral-100">
                        <Image
                          src={cat.image}
                          alt={cat.name}
                          fill
                          sizes="64px"
                          className="object-cover object-top"
                        />
                      </div>
                    </div>

                    {/* Titles & Slug */}
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="font-extrabold text-sm sm:text-base text-neutral-900">
                          {cat.name}
                        </h4>
                        {isActive ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            No Ar na Loja
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-neutral-200 text-neutral-600">
                            <EyeOff className="w-3 h-3" />
                            Oculta
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-500">
                        <span className="font-mono text-[11px] bg-neutral-100 px-2 py-0.5 rounded-md">
                          /{cat.slug}
                        </span>
                        <span>•</span>
                        <span className="font-semibold text-neutral-700">
                          {countInStore} {countInStore === 1 ? 'peça vinculada' : 'peças vinculadas'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Controls & Actions */}
                  <div className="flex items-center gap-2 mt-4 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-neutral-100 justify-end">
                    {/* Toggle Active / Inactive Button */}
                    <button
                      onClick={() => toggleCategoryActive(cat.id)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all ${
                        isActive
                          ? 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-300'
                          : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
                      }`}
                      title={isActive ? 'Desativar categoria na loja' : 'Ativar categoria na loja'}
                    >
                      {isActive ? (
                        <>
                          <Eye className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Ativa</span>
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-3.5 h-3.5 text-neutral-500" />
                          <span>Pausada</span>
                        </>
                      )}
                    </button>

                    {/* Edit Button */}
                    <button
                      onClick={() => handleOpenEditModal(cat)}
                      className="p-2 rounded-full border border-neutral-200 hover:bg-neutral-100 text-neutral-700 hover:text-black transition-colors"
                      title="Editar nome, imagem ou slug"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDeleteCategory(cat)}
                      className="p-2 rounded-full border border-neutral-200 hover:bg-red-50 text-neutral-400 hover:text-red-600 transition-colors"
                      title="Excluir categoria"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Modal: Criar / Editar Categoria */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[92vh]">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 bg-neutral-50/50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">
                  <FolderTree className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-neutral-900">
                    {modalMode === 'create' ? 'Nova Categoria' : 'Editar Categoria'}
                  </h3>
                  <p className="text-[11px] text-neutral-500">
                    Personalize o nome, foto de destaque e visibilidade na loja.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-500 hover:text-black transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSaveCategory} className="p-6 space-y-5 overflow-y-auto">
              {/* Category Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider">
                  Nome da Categoria *
                </label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="Ex: Macaquinhas, Vestidos Longos, Moda Praia..."
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-black font-semibold"
                />
              </div>

              {/* Slug */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider">
                  Identificador na URL (Slug)
                </label>
                <div className="flex items-center rounded-xl border border-neutral-200 px-3 bg-neutral-50 focus-within:border-black focus-within:bg-white">
                  <span className="text-xs text-neutral-400 font-mono">/categoria/</span>
                  <input
                    type="text"
                    value={formSlug}
                    onChange={(e) => setFormSlug(e.target.value)}
                    placeholder="macaquinhas"
                    className="w-full py-2.5 bg-transparent text-sm focus:outline-none font-mono"
                  />
                </div>
                <p className="text-[10px] text-neutral-400">
                  Usado nos links do site e filtros de produtos.
                </p>
              </div>

              {/* Image & Avatar Preview */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider block">
                  Foto de Capa / Avatar Circular
                </label>

                <div className="flex items-center gap-4 p-3 bg-neutral-50 rounded-2xl border border-neutral-200">
                  {/* Live Avatar Preview */}
                  <div className="relative w-20 h-20 rounded-full overflow-hidden shrink-0 border-2 border-black bg-black p-0.5 shadow-sm">
                    <div className="relative w-full h-full rounded-full overflow-hidden bg-neutral-100">
                      <Image
                        src={formImage || '/images/banners/banner-slide-1-marca.jpg'}
                        alt="Preview"
                        fill
                        className="object-cover object-top"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploading}
                        className="bg-black hover:bg-neutral-800 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-all shadow-xs"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>{isUploading ? 'Carregando...' : 'Enviar Imagem'}</span>
                      </button>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                        accept="image/*"
                        className="hidden"
                      />
                    </div>
                    <p className="text-[11px] text-neutral-500 leading-tight">
                      Envie uma foto da sua galeria ou escolha um dos modelos de estúdio abaixo.
                    </p>
                  </div>
                </div>

                {/* Preset Fast Picker */}
                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-neutral-500">
                    Ou selecione um modelo pronto de estúdio:
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-36 overflow-y-auto p-1 bg-neutral-50 rounded-xl border border-neutral-200">
                    {PRESET_CATEGORY_IMAGES.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setFormImage(preset.url)}
                        className={`flex items-center gap-2 p-1.5 rounded-lg text-left text-xs transition-all border ${
                          formImage === preset.url
                            ? 'bg-black text-white border-black font-bold'
                            : 'bg-white hover:bg-neutral-100 text-neutral-700 border-neutral-200'
                        }`}
                      >
                        <div className="relative w-6 h-6 rounded-full overflow-hidden shrink-0">
                          <Image
                            src={preset.url}
                            alt={preset.label}
                            fill
                            className="object-cover object-top"
                          />
                        </div>
                        <span className="truncate text-[11px]">{preset.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Status Toggle */}
              <div className="flex items-center justify-between p-3.5 rounded-2xl border border-neutral-200 bg-neutral-50/50">
                <div>
                  <h5 className="font-bold text-xs text-neutral-900">
                    Ativa na Loja Virtual
                  </h5>
                  <p className="text-[11px] text-neutral-500">
                    Se desativada, a categoria fica oculta da vitrine e dos clientes.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setFormIsActive(!formIsActive)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                    formIsActive ? 'bg-black' : 'bg-neutral-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      formIsActive ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider">
                  Descrição / Informações Adicionais (Opcional)
                </label>
                <textarea
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Ex: Peças leves e fluidas pensadas sob medida para o clima quente de Manaus."
                  rows={2}
                  className="w-full px-4 py-2 rounded-xl border border-neutral-200 text-xs focus:outline-none focus:border-black resize-none"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-full border border-neutral-200 text-xs font-bold text-neutral-600 hover:text-black hover:bg-neutral-100 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-black hover:bg-neutral-800 text-white text-xs font-bold px-6 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all"
                >
                  {modalMode === 'create' ? 'Criar Categoria' : 'Salvar Alterações'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
