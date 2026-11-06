import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Default environment credentials or custom runtime configuration
let customSupabaseUrl: string | null = null;
let customSupabaseKey: string | null = null;

if (typeof window !== 'undefined') {
  customSupabaseUrl = localStorage.getItem('miixxiie_supabase_url');
  customSupabaseKey = localStorage.getItem('miixxiie_supabase_key');
}

export const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  customSupabaseUrl ||
  '';

export const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  customSupabaseKey ||
  '';

export function getSupabaseClient(): SupabaseClient | null {
  const url =
    typeof window !== 'undefined'
      ? localStorage.getItem('miixxiie_supabase_url') || process.env.NEXT_PUBLIC_SUPABASE_URL || ''
      : process.env.NEXT_PUBLIC_SUPABASE_URL || '';

  const key =
    typeof window !== 'undefined'
      ? localStorage.getItem('miixxiie_supabase_key') || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
      : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

  if (!url || !key) {
    return null;
  }

  try {
    return createClient(url, key);
  } catch (err) {
    console.warn('Erro ao inicializar cliente Supabase:', err);
    return null;
  }
}

export const supabase = getSupabaseClient();

/**
 * Salva as credenciais do Supabase no navegador para sincronização imediata
 */
export function setCustomSupabaseCredentials(url: string, key: string): boolean {
  if (typeof window === 'undefined') return false;
  try {
    localStorage.setItem('miixxiie_supabase_url', url.trim());
    localStorage.setItem('miixxiie_supabase_key', key.trim());
    return true;
  } catch (err) {
    console.error('Erro ao salvar credenciais do Supabase:', err);
    return false;
  }
}

/**
 * Remove credenciais locais do Supabase
 */
export function clearCustomSupabaseCredentials(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('miixxiie_supabase_url');
    localStorage.removeItem('miixxiie_supabase_key');
  }
}

/**
 * Testa se as credenciais do Supabase estão conectando com sucesso
 */
export async function testSupabaseConnection(url?: string, key?: string): Promise<{ success: boolean; message: string }> {
  const targetUrl = url || (typeof window !== 'undefined' ? localStorage.getItem('miixxiie_supabase_url') : '') || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const targetKey = key || (typeof window !== 'undefined' ? localStorage.getItem('miixxiie_supabase_key') : '') || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!targetUrl || !targetKey) {
    return {
      success: false,
      message: 'URL e Chave Anon do Supabase não fornecidas. O sistema está operando em Modo Local Offline seguro.',
    };
  }

  try {
    const client = createClient(targetUrl, targetKey);
    // Testa consulta rápida à tabela store_settings ou executa ping
    const { error } = await client.from('store_settings').select('count', { count: 'exact', head: true });
    
    // Se o erro for tabela não encontrada, a conexão autenticou!
    if (error && error.code !== 'PGRST116' && error.code !== '42P01') {
      return {
        success: false,
        message: `Falha na autenticação com Supabase: ${error.message} (Código: ${error.code})`,
      };
    }

    return {
      success: true,
      message: 'Conectado com sucesso ao Supabase! Banco de dados na nuvem ativo.',
    };
  } catch (err: any) {
    return {
      success: false,
      message: `Erro ao testar conexão: ${err?.message || 'Falha de rede'}`,
    };
  }
}

/**
 * Converte arquivo de imagem para Base64 comprimida com Canvas para carregamento instantâneo
 */
export async function compressAndEncodeImage(file: File, maxWidth = 1200, quality = 0.85): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const elem = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        elem.width = width;
        elem.height = height;

        const ctx = elem.getContext('2d');
        if (!ctx) {
          resolve(event.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = elem.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
}
