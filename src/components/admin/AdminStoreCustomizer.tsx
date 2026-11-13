'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useStore } from '@/store/useStore';
import {
  Store,
  Database,
  CheckCircle2,
  AlertTriangle,
  Save,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  FileCode,
  Smartphone,
  Truck,
  Sparkles,
  Layers,
  Plus,
  Trash2,
  Edit2,
  Eye,
  EyeOff,
  MoveUp,
  MoveDown,
  Upload,
  Camera,
  Play,
  Pause,
  Grid,
  X,
} from 'lucide-react';
import {
  setCustomSupabaseCredentials,
  clearCustomSupabaseCredentials,
  testSupabaseConnection,
  compressAndEncodeImage,
} from '@/lib/supabase';
import { CarouselSlide } from '@/types/admin';
import { CATEGORIES } from '@/data/mockData';

export const AdminStoreCustomizer: React.FC = () => {
  const {
    storeCMS,
    updateStoreCMS,
    carouselSlides,
    carouselAutoPlay,
    carouselIntervalSeconds,
    setCarouselSlides,
    addCarouselSlide,
    updateCarouselSlide,
    deleteCarouselSlide,
    toggleCarouselSlideActive,
    setCarouselAutoPlay,
    setCarouselIntervalSeconds,
    resetCarouselToDefaults,
    categories,
  } = useStore();

  const storeCategories = categories && categories.length > 0 ? categories : CATEGORIES;

  // CMS Form State
  const [storeName, setStoreName] = useState(storeCMS.storeName);
  const [subtitle, setSubtitle] = useState(storeCMS.subtitle);
  const [slogan, setSlogan] = useState(storeCMS.slogan);
  const [shippingNotice, setShippingNotice] = useState(storeCMS.shippingNotice);
  const [phoneMaria, setPhoneMaria] = useState(storeCMS.whatsappMaria);
  const [phoneCarlos, setPhoneCarlos] = useState(storeCMS.whatsappCarlos);
  const [topBarAnnouncement, setTopBarAnnouncement] = useState(
    storeCMS.topBarAnnouncement || 'Entregas em toda Manaus via Motoboy ou Retirada no Showroom • Moda Plus Size Feminina (G ao G3)'
  );
  const [isTopBarActive, setIsTopBarActive] = useState(storeCMS.isTopBarActive ?? true);
  const [pixKey, setPixKey] = useState(storeCMS.pixKey || '(92) 98613-7969');
  const [pixKeyType, setPixKeyType] = useState<string>(storeCMS.pixKeyType || 'Telefone');
  const [pixReceiverName, setPixReceiverName] = useState(storeCMS.pixReceiverName || 'MIIXXIIE VARIEDADES');
  const [showroomHours, setShowroomHours] = useState(
    storeCMS.showroomHours || 'Segunda a Sábado, das 09h às 18h (Agendamento no WhatsApp)'
  );
  const [freeShippingThreshold, setFreeShippingThreshold] = useState(
    storeCMS.freeShippingThreshold ? String(storeCMS.freeShippingThreshold) : '299'
  );
  const [whatsappGreetingTemplate, setWhatsappGreetingTemplate] = useState(
    storeCMS.whatsappGreetingTemplate || 'Olá! Vim pelo catálogo da MIIXXIIE em Manaus e gostaria de saber mais informações.'
  );

  // Supabase Config State
  const [supabaseUrl, setSupabaseUrl] = useState('');
  const [supabaseKey, setSupabaseKey] = useState('');
  const [isTestingSupabase, setIsTestingSupabase] = useState(false);
  const [supabaseStatus, setSupabaseStatus] = useState<{
    checked: boolean;
    success: boolean;
    message: string;
  }>({
    checked: false,
    success: false,
    message: '',
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  // Carousel Slide Editor Modal State
  const [editingSlide, setEditingSlide] = useState<CarouselSlide | null>(null);
  const [isNewSlideModalOpen, setIsNewSlideModalOpen] = useState(false);
  const [slideFormData, setSlideFormData] = useState<{
    title: string;
    subtitle: string;
    badge: string;
    categoryTarget: string;
    ctaText: string;
    imageUrl: string;
  }>({
    title: '',
    subtitle: '',
    badge: '',
    categoryTarget: 'todos',
    ctaText: 'Ver Coleção',
    imageUrl: '/images/banners/banner-slide-1-marca.jpg',
  });

  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const carouselFileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUrl =
        localStorage.getItem('miixxiie_supabase_url') ||
        process.env.NEXT_PUBLIC_SUPABASE_URL ||
        '';
      const storedKey =
        localStorage.getItem('miixxiie_supabase_key') ||
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
        '';
      setSupabaseUrl(storedUrl);
      setSupabaseKey(storedKey);

      if (storedUrl && storedKey) {
        testSupabaseConnection(storedUrl, storedKey).then((res) => {
          setSupabaseStatus({ checked: true, success: res.success, message: res.message });
        });
      }
    }
  }, []);

  const handleTestSupabase = async () => {
    setIsTestingSupabase(true);
    const res = await testSupabaseConnection(supabaseUrl, supabaseKey);
    setSupabaseStatus({
      checked: true,
      success: res.success,
      message: res.message,
    });
    setIsTestingSupabase(false);
  };

  const handleSaveAll = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Update CMS settings
    updateStoreCMS({
      storeName,
      subtitle,
      slogan,
      shippingNotice,
      whatsappMaria: phoneMaria,
      whatsappCarlos: phoneCarlos,
      topBarAnnouncement,
      isTopBarActive,
      pixKey,
      pixKeyType: pixKeyType as any,
      pixReceiverName,
      showroomHours,
      freeShippingThreshold: parseFloat(freeShippingThreshold) || undefined,
      whatsappGreetingTemplate,
    });

    // 2. Save Supabase credentials in browser
    if (supabaseUrl.trim() && supabaseKey.trim()) {
      setCustomSupabaseCredentials(supabaseUrl.trim(), supabaseKey.trim());
      handleTestSupabase();
    }

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3500);
  };

  // Open Edit Slide Modal
  const openEditModal = (slide: CarouselSlide) => {
    setEditingSlide(slide);
    setSlideFormData({
      title: slide.title,
      subtitle: slide.subtitle,
      badge: slide.badge,
      categoryTarget: slide.categoryTarget || 'todos',
      ctaText: slide.ctaText,
      imageUrl: slide.imageUrl,
    });
    setIsNewSlideModalOpen(true);
  };

  // Open New Slide Modal
  const openNewSlideModal = () => {
    setEditingSlide(null);
    setSlideFormData({
      title: '',
      subtitle: '',
      badge: 'Novidade',
      categoryTarget: 'vestidos-curtos',
      ctaText: 'Ver Peças',
      imageUrl: '/images/banners/banner-slide-1-marca.jpg',
    });
    setIsNewSlideModalOpen(true);
  };

  // Save Slide (Add or Update)
  const handleSaveSlide = (e: React.FormEvent) => {
    e.preventDefault();
    if (!slideFormData.title.trim() || !slideFormData.imageUrl.trim()) {
      alert('Preencha ao menos o título e a imagem do slide.');
      return;
    }

    if (editingSlide) {
      updateCarouselSlide({
        ...editingSlide,
        ...slideFormData,
      });
    } else {
      addCarouselSlide({
        ...slideFormData,
        isActive: true,
        order: carouselSlides.length + 1,
      });
    }

    setIsNewSlideModalOpen(false);
    setEditingSlide(null);
  };

  // Mobile Image Upload Handler for Carousel Banners
  const handleCarouselImageFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploadingImage(true);
      const compressedDataUrl = await compressAndEncodeImage(file, 1600, 0.88);
      setSlideFormData((prev) => ({ ...prev, imageUrl: compressedDataUrl }));
    } catch (err) {
      console.error('Erro ao comprimir imagem:', err);
      alert('Não foi possível carregar a imagem. Tente novamente.');
    } finally {
      setIsUploadingImage(false);
    }
  };

  // Move slide up/down
  const moveSlideOrder = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= carouselSlides.length) return;

    const newSlides = [...carouselSlides];
    const [moved] = newSlides.splice(index, 1);
    newSlides.splice(targetIndex, 0, moved);
    setCarouselSlides(newSlides);
  };

  return (
    <div className="space-y-6">
      {/* Success Notification Alert */}
      {savedSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl flex items-center gap-3 text-emerald-800 text-xs shadow-xs animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <div>
            <strong className="block text-sm">Configurações Atualizadas com Sucesso!</strong>
            <span>Os textos da loja e dados do carrossel foram salvos e sincronizados.</span>
          </div>
        </div>
      )}

      {/* ==============================================================
          SECTION 1: CAROUSEL BANNER MANAGER (CORE USER REQUEST)
          ============================================================== */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-5 sm:p-6 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-neutral-200 gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center font-bold shrink-0">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base text-neutral-900">
                Gerenciador do Carrossel de Imagens Profissionais
              </h3>
              <p className="text-xs text-neutral-500">
                Alterne a primeira imagem com a logo oficial e outras com modelos plus size vestindo looks por categoria
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={resetCarouselToDefaults}
              className="px-3 py-2 rounded-xl text-xs font-semibold text-neutral-600 bg-neutral-100 hover:bg-neutral-200 transition-colors flex items-center gap-1.5"
              title="Restaura os 11 banners oficiais em alta definição (Marca + 10 Categorias)"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Restaurar Banners Oficiais</span>
            </button>

            <button
              type="button"
              onClick={openNewSlideModal}
              className="px-4 py-2 bg-black hover:bg-neutral-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Novo Slide</span>
            </button>
          </div>
        </div>

        {/* Carousel Settings Bar (Autoplay & Interval) */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-neutral-50 rounded-xl border border-neutral-200 text-xs text-neutral-700">
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer font-bold select-none">
              <input
                type="checkbox"
                checked={carouselAutoPlay}
                onChange={(e) => setCarouselAutoPlay(e.target.checked)}
                className="w-4 h-4 accent-black rounded"
              />
              <span>Girar Slides Automaticamente (Auto-play)</span>
            </label>

            <div className="flex items-center gap-2">
              <span className="text-neutral-500">Tempo por Slide:</span>
              <select
                value={carouselIntervalSeconds}
                onChange={(e) => setCarouselIntervalSeconds(Number(e.target.value))}
                className="bg-white border border-neutral-300 rounded-lg px-2.5 py-1 font-bold text-neutral-900 text-xs focus:outline-none focus:border-black"
              >
                <option value={3}>3 segundos (Rápido)</option>
                <option value={4}>4 segundos</option>
                <option value={5}>5 segundos (Recomendado)</option>
                <option value={7}>7 segundos</option>
                <option value={10}>10 segundos</option>
              </select>
            </div>
          </div>

          <span className="text-[11px] text-neutral-500 font-medium">
            {carouselSlides.filter((s) => s.isActive).length} de {carouselSlides.length} slides visíveis
          </span>
        </div>

        {/* Carousel Slides List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {carouselSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`rounded-2xl border transition-all p-3.5 space-y-3 relative group ${
                slide.isActive
                  ? 'bg-white border-neutral-200 shadow-xs hover:border-neutral-400'
                  : 'bg-neutral-50 border-dashed border-neutral-300 opacity-60'
              }`}
            >
              {/* Slide Thumbnail Preview (16:9) */}
              <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-neutral-900 border border-neutral-200">
                <Image
                  src={slide.imageUrl}
                  alt={slide.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Overlaid Badges */}
                <div className="absolute top-2 left-2 flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-xs text-[10px] font-bold text-white border border-white/20">
                    {slide.badge}
                  </span>
                  {slide.categoryTarget && slide.categoryTarget !== 'todos' && (
                    <span className="px-2 py-0.5 rounded-full bg-amber-400/90 text-[10px] font-bold text-black shadow-xs">
                      {storeCategories.find((c) => c.slug === slide.categoryTarget)?.name || slide.categoryTarget}
                    </span>
                  )}
                </div>

                <div className="absolute top-2 right-2">
                  <span className="w-6 h-6 rounded-full bg-black/70 backdrop-blur-xs text-white text-[11px] font-bold flex items-center justify-center border border-white/20">
                    #{index + 1}
                  </span>
                </div>

                {/* Bottom Overlay Title on Preview */}
                <div className="absolute bottom-2 left-2 right-2 text-left">
                  <h4 className="font-bold text-white text-sm truncate drop-shadow-md">
                    {slide.title}
                  </h4>
                  <p className="text-[11px] text-neutral-300 truncate">
                    {slide.subtitle}
                  </p>
                </div>
              </div>

              {/* Slide Information Details */}
              <div className="space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-neutral-900">{slide.title}</span>
                  <span className="text-[11px] text-neutral-500 font-medium">
                    Botão: <strong>{slide.ctaText}</strong>
                  </span>
                </div>
                <p className="text-neutral-500 text-[11px] line-clamp-1">
                  {slide.subtitle}
                </p>
              </div>

              {/* Slide Controls & Actions Toolbar */}
              <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => moveSlideOrder(index, 'up')}
                    disabled={index === 0}
                    className="p-1.5 rounded-lg text-neutral-500 hover:text-black hover:bg-neutral-100 disabled:opacity-30 disabled:pointer-events-none"
                    title="Subir ordem"
                  >
                    <MoveUp className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => moveSlideOrder(index, 'down')}
                    disabled={index === carouselSlides.length - 1}
                    className="p-1.5 rounded-lg text-neutral-500 hover:text-black hover:bg-neutral-100 disabled:opacity-30 disabled:pointer-events-none"
                    title="Descer ordem"
                  >
                    <MoveDown className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleCarouselSlideActive(slide.id)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 transition-colors ${
                      slide.isActive
                        ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                        : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                    }`}
                  >
                    {slide.isActive ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                    <span>{slide.isActive ? 'Ativo' : 'Oculto'}</span>
                  </button>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => openEditModal(slide)}
                    className="px-2.5 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
                  >
                    <Edit2 className="w-3 h-3" />
                    <span>Editar</span>
                  </button>

                  {carouselSlides.length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`Deseja realmente remover o slide "${slide.title}"?`)) {
                          deleteCarouselSlide(slide.id);
                        }
                      }}
                      className="p-1.5 rounded-lg text-neutral-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      title="Excluir slide"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ==============================================================
          SECTION 2: SUPABASE CLOUD DATABASE CONNECTION
          ============================================================== */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-neutral-900">
                Conexão com Banco de Dados Supabase (Nuvem)
              </h3>
              <p className="text-xs text-neutral-500">
                Gerencie catálogo, pedidos e métricas diretamente na nuvem PostgreSQL do Supabase
              </p>
            </div>
          </div>

          <span
            className={`text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 border ${
              supabaseStatus.success
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                : 'bg-neutral-100 text-neutral-700 border-neutral-200'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                supabaseStatus.success ? 'bg-emerald-600 animate-pulse' : 'bg-neutral-400'
              }`}
            />
            {supabaseStatus.success ? 'Supabase Conectado' : 'Modo Offline / LocalStorage'}
          </span>
        </div>

        {/* Status Message */}
        {supabaseStatus.checked && (
          <div
            className={`p-3 rounded-xl border text-xs flex items-center gap-2 ${
              supabaseStatus.success
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                : 'bg-amber-50 text-amber-800 border-amber-200'
            }`}
          >
            {supabaseStatus.success ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            )}
            <span>{supabaseStatus.message}</span>
          </div>
        )}

        {/* Credentials Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-neutral-700 font-semibold mb-1">
              Project URL do Supabase:
            </label>
            <input
              type="text"
              value={supabaseUrl}
              onChange={(e) => setSupabaseUrl(e.target.value)}
              placeholder="https://xyzcompany.supabase.co"
              className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-black font-mono text-xs"
            />
          </div>

          <div>
            <label className="block text-neutral-700 font-semibold mb-1">
              Anon Public Key:
            </label>
            <input
              type="password"
              value={supabaseKey}
              onChange={(e) => setSupabaseKey(e.target.value)}
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
              className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-black font-mono text-xs"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleTestSupabase}
              disabled={isTestingSupabase}
              className="px-4 py-2 bg-neutral-900 hover:bg-black text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isTestingSupabase ? 'animate-spin' : ''}`} />
              <span>{isTestingSupabase ? 'Testando Conexão...' : 'Testar Conexão Supabase'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                clearCustomSupabaseCredentials();
                setSupabaseUrl('');
                setSupabaseKey('');
                setSupabaseStatus({ checked: false, success: false, message: '' });
              }}
              className="px-3 py-2 text-xs text-neutral-500 hover:text-black transition-colors"
            >
              Limpar Credenciais
            </button>
          </div>

          <a
            href="/supabase/schema.sql"
            target="_blank"
            download
            className="text-xs font-semibold text-neutral-700 hover:text-black flex items-center gap-1 underline"
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>Baixar Script SQL de Criação das Tabelas</span>
          </a>
        </div>
      </div>

      {/* ==============================================================
          SECTION 3: STORE GENERAL TEXTS & BRAND IDENTITY
          ============================================================== */}
      <form onSubmit={handleSaveAll} className="space-y-6">
        <div className="bg-white rounded-2xl border border-neutral-200 p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-neutral-200">
            <Store className="w-4 h-4 text-neutral-800" />
            <h3 className="font-bold text-sm sm:text-base text-neutral-900">
              Identidade da Loja & Textos Institucionais
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block text-neutral-700 font-semibold mb-1">
                Nome da Loja:
              </label>
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full px-3.5 py-2 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-black font-bold"
              />
            </div>

            <div>
              <label className="block text-neutral-700 font-semibold mb-1">
                Subtítulo / Marca:
              </label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className="w-full px-3.5 py-2 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="block text-neutral-700 font-semibold mb-1">
                Slogan Oficial:
              </label>
              <input
                type="text"
                value={slogan}
                onChange={(e) => setSlogan(e.target.value)}
                className="w-full px-3.5 py-2 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-black"
              />
            </div>
          </div>
        </div>

        {/* SECTION 4: MANAUS LOCAL SHIPPING POLICY & ATTENDANTS */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-neutral-200">
            <Truck className="w-4 h-4 text-neutral-800" />
            <h3 className="font-bold text-sm sm:text-base text-neutral-900">
              Regras de Entrega em Manaus & Contatos de Vendas
            </h3>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-neutral-700 font-semibold mb-1">
                Aviso de Frete em Manaus (Exibido no Cabeçalho e Checkout):
              </label>
              <input
                type="text"
                value={shippingNotice}
                onChange={(e) => setShippingNotice(e.target.value)}
                className="w-full px-3.5 py-2 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-black"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div>
                <label className="block text-neutral-700 font-semibold mb-1">
                  WhatsApp Consultora Maria:
                </label>
                <input
                  type="text"
                  value={phoneMaria}
                  onChange={(e) => setPhoneMaria(e.target.value)}
                  className="w-full px-3.5 py-2 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-black font-mono font-bold"
                />
              </div>

              <div>
                <label className="block text-neutral-700 font-semibold mb-1">
                  WhatsApp Consultor Carlos:
                </label>
                <input
                  type="text"
                  value={phoneCarlos}
                  onChange={(e) => setPhoneCarlos(e.target.value)}
                  className="w-full px-3.5 py-2 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-black font-mono font-bold"
                />
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 5: TOPBAR ANNOUNCEMENT */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-neutral-800" />
              <h3 className="font-bold text-sm sm:text-base text-neutral-900">
                Faixa Superior de Anúncios (TopBar)
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold text-neutral-600">
                {isTopBarActive ? 'Visível no topo' : 'Oculta'}
              </span>
              <button
                type="button"
                onClick={() => setIsTopBarActive(!isTopBarActive)}
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${
                  isTopBarActive ? 'bg-black' : 'bg-neutral-300'
                }`}
              >
                <span
                  className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                    isTopBarActive ? 'translate-x-4' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-neutral-700 font-semibold mb-1">
                Texto do Anúncio no Topo da Loja:
              </label>
              <input
                type="text"
                value={topBarAnnouncement}
                onChange={(e) => setTopBarAnnouncement(e.target.value)}
                placeholder="Ex: Entregas em toda Manaus via Motoboy ou Retirada no Showroom • Moda Plus Size Feminina (G ao G3)"
                className="w-full px-3.5 py-2 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-black font-medium"
              />
            </div>
          </div>
        </div>

        {/* SECTION 6: PIX & SHOWROOM MANAUS */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-neutral-200">
            <Store className="w-4 h-4 text-neutral-800" />
            <h3 className="font-bold text-sm sm:text-base text-neutral-900">
              Dados de Pagamento PIX & Atendimento no Showroom
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block text-neutral-700 font-semibold mb-1">
                Chave PIX da Loja:
              </label>
              <input
                type="text"
                value={pixKey}
                onChange={(e) => setPixKey(e.target.value)}
                placeholder="(92) 98613-7969"
                className="w-full px-3.5 py-2 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-black font-mono font-bold"
              />
            </div>

            <div>
              <label className="block text-neutral-700 font-semibold mb-1">
                Tipo de Chave PIX:
              </label>
              <select
                value={pixKeyType}
                onChange={(e) => setPixKeyType(e.target.value)}
                className="w-full px-3.5 py-2 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-black font-semibold"
              >
                <option value="Telefone">Telefone</option>
                <option value="CNPJ">CNPJ</option>
                <option value="CPF">CPF</option>
                <option value="E-mail">E-mail</option>
                <option value="Aleatória">Chave Aleatória</option>
              </select>
            </div>

            <div>
              <label className="block text-neutral-700 font-semibold mb-1">
                Nome do Favorecido (PIX):
              </label>
              <input
                type="text"
                value={pixReceiverName}
                onChange={(e) => setPixReceiverName(e.target.value)}
                placeholder="MIIXXIIE VARIEDADES"
                className="w-full px-3.5 py-2 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-black font-bold uppercase"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-neutral-700 font-semibold mb-1">
                Horário de Atendimento no Showroom:
              </label>
              <input
                type="text"
                value={showroomHours}
                onChange={(e) => setShowroomHours(e.target.value)}
                placeholder="Segunda a Sábado, das 09h às 18h (Agendamento no WhatsApp)"
                className="w-full px-3.5 py-2 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="block text-neutral-700 font-semibold mb-1">
                Frete Grátis a partir de (R$):
              </label>
              <input
                type="number"
                value={freeShippingThreshold}
                onChange={(e) => setFreeShippingThreshold(e.target.value)}
                placeholder="299"
                className="w-full px-3.5 py-2 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-black font-bold"
              />
            </div>

            <div className="sm:col-span-3">
              <label className="block text-neutral-700 font-semibold mb-1">
                Mensagem Padrão de Abertura no WhatsApp:
              </label>
              <textarea
                rows={2}
                value={whatsappGreetingTemplate}
                onChange={(e) => setWhatsappGreetingTemplate(e.target.value)}
                placeholder="Olá! Vim pelo catálogo da MIIXXIIE em Manaus e gostaria de saber mais informações..."
                className="w-full px-3.5 py-2 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-black text-xs"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-7 py-3.5 bg-black hover:bg-neutral-800 text-white font-extrabold text-xs sm:text-sm rounded-2xl flex items-center gap-2 shadow-lg hover:shadow-xl transition-all hover:scale-[1.01] active:scale-[0.99]"
          >
            <Save className="w-4 h-4" />
            <span>Salvar Todas as Configurações da Loja</span>
          </button>
        </div>
      </form>

      {/* ==============================================================
          MODAL: EDITAR / CRIAR SLIDE DO CARROSSEL
          ============================================================== */}
      {isNewSlideModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-neutral-200 max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100 bg-neutral-50/70">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center shadow-xs">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-neutral-900 leading-tight">
                    {editingSlide ? 'Editar Slide do Carrossel' : 'Novo Slide Profissional'}
                  </h3>
                  <span className="text-[11px] text-neutral-500">
                    Cabeçalho da loja virtual MIIXXIIE
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsNewSlideModalOpen(false)}
                className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-500 hover:text-black flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body / Form */}
            <form onSubmit={handleSaveSlide} className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs">
              {/* Image Preview & Upload Container */}
              <div className="space-y-2">
                <label className="block text-neutral-800 font-bold">
                  Imagem do Slide (16:9 widescreen recomendada):
                </label>

                <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border-2 border-dashed border-neutral-300 bg-neutral-100 flex items-center justify-center group">
                  {slideFormData.imageUrl ? (
                    <>
                      <Image
                        src={slideFormData.imageUrl}
                        alt="Preview"
                        fill
                        sizes="(max-width: 600px) 100vw, 500px"
                        className="object-cover object-center"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => carouselFileInputRef.current?.click()}
                          className="px-3 py-1.5 bg-white text-black font-bold rounded-lg text-xs shadow-md"
                        >
                          Trocar Foto
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="text-center p-4 text-neutral-400">
                      <Camera className="w-8 h-8 mx-auto mb-1 stroke-1" />
                      <span>Selecione uma imagem ou carregue do celular</span>
                    </div>
                  )}

                  {isUploadingImage && (
                    <div className="absolute inset-0 bg-black/70 flex items-center justify-center text-white text-xs font-bold gap-2">
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Comprimindo imagem...</span>
                    </div>
                  )}
                </div>

                {/* Upload Button */}
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    ref={carouselFileInputRef}
                    onChange={handleCarouselImageFile}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => carouselFileInputRef.current?.click()}
                    className="flex-1 py-2 px-3 rounded-xl border border-neutral-300 bg-neutral-50 hover:bg-neutral-100 font-bold text-neutral-700 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Carregar Foto do Celular / Computador</span>
                  </button>
                </div>

                {/* Quick Presets of Official High-Res Images */}
                <div className="pt-1">
                  <span className="text-[11px] text-neutral-500 font-semibold block mb-1.5">
                    Ou escolha uma das 11 imagens oficiais geradas (Marca + 10 Categorias):
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1.5 max-h-48 overflow-y-auto p-1 bg-neutral-100/60 rounded-xl">
                    {[
                      { name: '1. Marca (3D Chrome)', url: '/images/banners/banner-slide-1-marca.jpg' },
                      { name: '2. Bermudas & Shorts', url: '/images/banners/cat-banner-bermudas-shorts.jpg' },
                      { name: '3. Calças', url: '/images/banners/cat-banner-calcas.jpg' },
                      { name: '4. Camisas & Regatas', url: '/images/banners/cat-banner-camisas-regatas.jpg' },
                      { name: '5. Chemises', url: '/images/banners/cat-banner-chemises.jpg' },
                      { name: '6. Conj. de Calça', url: '/images/banners/cat-banner-conjuntos-calca.jpg' },
                      { name: '7. Conj. de Shorts', url: '/images/banners/cat-banner-conjuntos-shorts.jpg' },
                      { name: '8. Macaquinhas', url: '/images/banners/cat-banner-macaquinhas.jpg' },
                      { name: '9. Vestidos Curtos', url: '/images/banners/cat-banner-vestidos-curtos.jpg' },
                      { name: '10. Vestidos Longos', url: '/images/banners/cat-banner-vestidos-longos.jpg' },
                      { name: '11. Vestidos Midis', url: '/images/banners/cat-banner-vestidos-midis.jpg' },
                    ].map((preset) => (
                      <button
                        type="button"
                        key={preset.url}
                        onClick={() => setSlideFormData((prev) => ({ ...prev, imageUrl: preset.url }))}
                        className={`p-1 rounded-lg border text-center transition-all ${
                          slideFormData.imageUrl === preset.url
                            ? 'border-black ring-1 ring-black bg-white font-bold shadow-xs'
                            : 'border-neutral-200 hover:border-neutral-400 bg-white/70'
                        }`}
                      >
                        <div className="relative aspect-[16/9] w-full rounded overflow-hidden mb-1 bg-neutral-900">
                          <Image src={preset.url} alt={preset.name} fill sizes="100px" className="object-cover" />
                        </div>
                        <span className="text-[9px] block truncate">{preset.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Title & Badge */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-800 font-bold mb-1">
                    Título Principal:
                  </label>
                  <input
                    type="text"
                    value={slideFormData.title}
                    onChange={(e) => setSlideFormData({ ...slideFormData, title: e.target.value })}
                    placeholder="Ex: Vestidos Plus Size"
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-xl focus:outline-none focus:border-black font-semibold"
                    required
                  />
                </div>

                <div>
                  <label className="block text-neutral-800 font-bold mb-1">
                    Badge Superior:
                  </label>
                  <input
                    type="text"
                    value={slideFormData.badge}
                    onChange={(e) => setSlideFormData({ ...slideFormData, badge: e.target.value })}
                    placeholder="Ex: Coleção Festa & Noite"
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-xl focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              {/* Subtitle */}
              <div>
                <label className="block text-neutral-800 font-bold mb-1">
                  Subtítulo / Descrição:
                </label>
                <textarea
                  rows={2}
                  value={slideFormData.subtitle}
                  onChange={(e) => setSlideFormData({ ...slideFormData, subtitle: e.target.value })}
                  placeholder="Ex: Modelagens anatômicas do G ao G3 pensadas sob medida para realçar sua melhor versão."
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-xl focus:outline-none focus:border-black"
                />
              </div>

              {/* Category Target & CTA text */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-800 font-bold mb-1">
                    Direcionar para Categoria ao Clicar:
                  </label>
                  <select
                    value={slideFormData.categoryTarget}
                    onChange={(e) => setSlideFormData({ ...slideFormData, categoryTarget: e.target.value })}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-xl focus:outline-none focus:border-black font-medium"
                  >
                    <option value="todos">Todos os Produtos / Geral</option>
                    {storeCategories.map((cat) => (
                      <option key={cat.slug} value={cat.slug}>
                        {cat.name} {cat.isActive === false ? '(Pausada)' : ''}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-800 font-bold mb-1">
                    Texto do Botão CTA:
                  </label>
                  <input
                    type="text"
                    value={slideFormData.ctaText}
                    onChange={(e) => setSlideFormData({ ...slideFormData, ctaText: e.target.value })}
                    placeholder="Ex: Ver Vestidos"
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-xl focus:outline-none focus:border-black font-semibold"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-neutral-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsNewSlideModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-neutral-600 hover:text-black font-semibold text-xs"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-black hover:bg-neutral-800 text-white font-bold rounded-xl text-xs shadow-md transition-all active:scale-95 flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{editingSlide ? 'Salvar Alterações' : 'Adicionar ao Carrossel'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
