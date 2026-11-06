'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Lock, Mail, ArrowRight, ShieldCheck, Sparkles, Store, KeyRound } from 'lucide-react';
import { useStore } from '@/store/useStore';

export const AdminLogin: React.FC = () => {
  const { loginAdmin } = useStore();
  const [email, setEmail] = useState('admin@miixxiie.com.br');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const success = loginAdmin(email, password);
    if (!success) {
      setError('Credenciais inválidas. Verifique o e-mail e senha.');
    }
  };

  const handleFillDemo = () => {
    setEmail('admin@miixxiie.com.br');
    setPassword('admin123');
    setError('');
  };

  return (
    <div className="min-h-screen w-full bg-[#09090B] flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden text-neutral-100">
      {/* Dynamic Background Gradients */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-white/[0.04] blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-white/[0.03] blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04),transparent_70%)] pointer-events-none" />

      {/* Main Login Card */}
      <div className="w-full max-w-md bg-[#121214] border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative z-10 space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <Link href="/" className="inline-block group transition-transform hover:scale-105">
            <div className="relative w-48 sm:w-56 h-16 mx-auto">
              <Image
                src="/images/logo-white.png"
                alt="MIIXXIIE Variedades"
                fill
                priority
                className="object-contain drop-shadow-md"
              />
            </div>
          </Link>

          <div>
            <span className="inline-block text-[10px] uppercase font-bold tracking-[0.25em] text-neutral-400 bg-white/5 border border-white/10 px-3 py-0.5 rounded-full mb-1">
              Painel de Gestão Local
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Acesso Administrativo
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              Gestão de estoque, catálogo, pedidos Kanban e métricas em Manaus
            </p>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3 bg-red-950/40 border border-red-700/50 rounded-2xl text-xs text-red-300 text-center animate-shake">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-neutral-300 font-semibold mb-1.5 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-neutral-400" />
              <span>E-mail do Administrador:</span>
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ex: admin@miixxiie.com.br"
              className="w-full bg-[#18181B] border border-neutral-700 rounded-xl px-3.5 py-2.5 text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-all text-xs"
            />
          </div>

          <div>
            <label className="block text-neutral-300 font-semibold mb-1.5 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-neutral-400" />
              <span>Senha de Acesso:</span>
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha..."
              className="w-full bg-[#18181B] border border-neutral-700 rounded-xl px-3.5 py-2.5 text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-all text-xs"
            />
          </div>

          <div className="flex items-center justify-between pt-1 text-[11px] text-neutral-400">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-3.5 h-3.5 rounded bg-neutral-800 border-neutral-700 text-white focus:ring-0"
              />
              <span>Lembrar meu acesso</span>
            </label>
            <span className="text-neutral-500">Acesso Restrito</span>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-white hover:bg-neutral-200 text-black font-extrabold py-3.5 px-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:scale-[1.01] active:scale-[0.99] text-xs sm:text-sm mt-2"
          >
            <span>Entrar no Painel</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Demo Fast Login Helper */}
        <div className="pt-2 border-t border-neutral-800/80 flex flex-col gap-2">
          <button
            type="button"
            onClick={handleFillDemo}
            className="w-full py-2 bg-white/5 hover:bg-white/10 text-neutral-300 border border-white/10 rounded-xl text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-all"
          >
            <KeyRound className="w-3.5 h-3.5 text-neutral-400" />
            <span>Preencher Credenciais Padrão (Demo)</span>
          </button>

          <Link
            href="/"
            className="text-center text-[11px] text-neutral-500 hover:text-white transition-colors pt-1"
          >
            ← Voltar para a Loja Virtual
          </Link>
        </div>
      </div>

      {/* Security Footer Notice */}
      <div className="mt-6 flex items-center gap-2 text-[11px] text-neutral-500 z-10">
        <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" />
        <span>Ambiente Seguro • MIIXXIIE Variedades (Manaus - AM)</span>
      </div>
    </div>
  );
};
