'use client';

import React, { useState, useEffect } from 'react';
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
} from 'lucide-react';
import {
  setCustomSupabaseCredentials,
  clearCustomSupabaseCredentials,
  testSupabaseConnection,
} from '@/lib/supabase';

export const AdminStoreCustomizer: React.FC = () => {
  const { storeCMS, updateStoreCMS, attendants } = useStore();

  // CMS Form State
  const [storeName, setStoreName] = useState(storeCMS.storeName);
  const [subtitle, setSubtitle] = useState(storeCMS.subtitle);
  const [slogan, setSlogan] = useState(storeCMS.slogan);
  const [bannerHeadline, setBannerHeadline] = useState(storeCMS.bannerHeadline);
  const [bannerSubheadline, setBannerSubheadline] = useState(storeCMS.bannerSubheadline);
  const [shippingNotice, setShippingNotice] = useState(storeCMS.shippingNotice);
  const [phoneMaria, setPhoneMaria] = useState(storeCMS.whatsappMaria);
  const [phoneCarlos, setPhoneCarlos] = useState(storeCMS.whatsappCarlos);

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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUrl = localStorage.getItem('miixxiie_supabase_url') || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
      const storedKey = localStorage.getItem('miixxiie_supabase_key') || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
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
      bannerHeadline,
      bannerSubheadline,
      shippingNotice,
      whatsappMaria: phoneMaria,
      whatsappCarlos: phoneCarlos,
    });

    // 2. Save Supabase credentials in browser
    if (supabaseUrl.trim() && supabaseKey.trim()) {
      setCustomSupabaseCredentials(supabaseUrl.trim(), supabaseKey.trim());
      handleTestSupabase();
    }

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3500);
  };

  return (
    <form onSubmit={handleSaveAll} className="space-y-6">
      {/* Success Notification Alert */}
      {savedSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl flex items-center gap-3 text-emerald-800 text-xs shadow-xs animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <div>
            <strong className="block text-sm">Configurações Atualizadas com Sucesso!</strong>
            <span>Os textos da loja e credenciais do banco foram sincronizados em tempo real.</span>
          </div>
        </div>
      )}

      {/* SECTION 1: SUPABASE CLOUD DATABASE CONNECTION */}
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
              Anon Public API Key:
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
          <button
            type="button"
            disabled={isTestingSupabase}
            onClick={handleTestSupabase}
            className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isTestingSupabase ? 'animate-spin' : ''}`} />
            <span>{isTestingSupabase ? 'Testando Conexão...' : 'Testar Conexão com Supabase'}</span>
          </button>

          <a
            href="/supabase/schema.sql"
            target="_blank"
            className="text-xs text-neutral-600 hover:text-black font-semibold flex items-center gap-1 underline"
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>Ver Script SQL do Supabase (schema.sql)</span>
          </a>
        </div>
      </div>

      {/* SECTION 2: STORE BRAND & HERO BANNER CMS */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-neutral-200">
          <Store className="w-4 h-4 text-neutral-800" />
          <h3 className="font-bold text-sm sm:text-base text-neutral-900">
            Personalização da Loja & Textos do Banner Principal (Hero)
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

        {/* Hero Banner Text */}
        <div className="space-y-3 text-xs pt-2">
          <div>
            <label className="block text-neutral-700 font-semibold mb-1">
              Frase de Destaque no Cabeçalho (Headline):
            </label>
            <input
              type="text"
              value={bannerHeadline}
              onChange={(e) => setBannerHeadline(e.target.value)}
              className="w-full px-3.5 py-2 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-black font-semibold"
            />
          </div>

          <div>
            <label className="block text-neutral-700 font-semibold mb-1">
              Texto Descritivo do Cabeçalho (Subheadline):
            </label>
            <textarea
              rows={2}
              value={bannerSubheadline}
              onChange={(e) => setBannerSubheadline(e.target.value)}
              className="w-full px-3.5 py-2 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-black"
            />
          </div>
        </div>
      </div>

      {/* SECTION 3: MANAUS LOCAL SHIPPING POLICY & ATTENDANTS */}
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

      {/* Save Button */}
      <div className="flex justify-end pt-2">
        <button
          type="submit"
          className="px-7 py-3.5 bg-black hover:bg-neutral-800 text-white font-extrabold text-xs sm:text-sm rounded-2xl flex items-center gap-2 shadow-lg hover:shadow-xl transition-all hover:scale-[1.01] active:scale-[0.99]"
        >
          <Save className="w-4 h-4" />
          <span>Salvar Todas as Configurações</span>
        </button>
      </div>
    </form>
  );
};
