'use client';

import React, { useState } from 'react';
import {
  Users,
  MessageCircle,
  Phone,
  CheckCircle2,
  ExternalLink,
  Edit2,
  Check,
  Sparkles,
  TrendingUp,
  Activity,
  ShieldCheck,
} from 'lucide-react';
import { useStore } from '@/store/useStore';
import { WhatsAppAttendant } from '@/data/mockData';

export const AdminAttendantsManager: React.FC = () => {
  const {
    attendants,
    updateAttendant,
    leadClicks,
    currentAttendantIndex,
    storeCMS,
    updateStoreCMS,
  } = useStore();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [formName, setFormName] = useState('');
  const [formRole, setFormRole] = useState('');
  const [formPhoneDisplay, setFormPhoneDisplay] = useState('');
  const [formPhoneNumber, setFormPhoneNumber] = useState('');

  const handleStartEdit = (att: WhatsAppAttendant) => {
    setEditingId(att.id);
    setFormName(att.name);
    setFormRole(att.role);
    setFormPhoneDisplay(att.phoneDisplay);
    setFormPhoneNumber(att.phoneNumber);
  };

  const handleSave = (id: string) => {
    updateAttendant(id, {
      name: formName.trim(),
      role: formRole.trim(),
      phoneDisplay: formPhoneDisplay.trim(),
      phoneNumber: formPhoneNumber.trim().replace(/\D/g, ''),
    });

    // Also sync with storeCMS
    if (id === 'maria') {
      updateStoreCMS({ whatsappMaria: formPhoneDisplay.trim() });
    } else if (id === 'carlos') {
      updateStoreCMS({ whatsappCarlos: formPhoneDisplay.trim() });
    }

    setEditingId(null);
  };

  const totalClicks = attendants.reduce((sum, a) => sum + (a.clicksCount || 0), 0);

  return (
    <div className="space-y-6">
      {/* Header Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-neutral-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
              Total de Atendentes
            </span>
            <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-neutral-900">
              {attendants.length}
            </span>
            <span className="text-xs text-neutral-500 font-semibold">Consultoras em Manaus</span>
          </div>
          <p className="text-[11px] text-neutral-400">Distribuição automatizada 50/50</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-neutral-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
              Leads Encaminhados
            </span>
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center">
              <MessageCircle className="w-4 h-4 fill-emerald-600 text-white" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-emerald-700">
              {totalClicks}
            </span>
            <span className="text-xs text-neutral-500 font-semibold">conversas iniciadas</span>
          </div>
          <p className="text-[11px] text-neutral-400">Em tempo real via catálogo</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-neutral-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
              Próxima da Fila
            </span>
            <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-700 border border-purple-200 flex items-center justify-center">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-black text-neutral-900">
              {attendants[(currentAttendantIndex || 0) % (attendants.length || 1)]?.name}
            </span>
          </div>
          <p className="text-[11px] text-purple-700 font-bold">Receberá o próximo clique</p>
        </div>
      </div>

      {/* Attendants List & Edit Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-base text-neutral-900">
              Equipe de Consultoras de Vendas WhatsApp
            </h3>
            <p className="text-xs text-neutral-500">
              Altere números de telefone com DDD 92, nomes e verifique o link de teste
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {attendants.map((att) => {
            const isEditing = editingId === att.id;
            const percentage = totalClicks > 0 ? Math.round((att.clicksCount / totalClicks) * 100) : 50;

            return (
              <div
                key={att.id}
                className="bg-white p-5 sm:p-6 rounded-3xl border border-neutral-200 shadow-xs space-y-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-2xl bg-black text-white font-extrabold text-base flex items-center justify-center shadow-xs">
                        {att.name.charAt(0)}
                      </div>
                      <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-sm sm:text-base text-neutral-900">
                        {att.name}
                      </h4>
                      <span className="text-xs text-neutral-500 font-semibold block">
                        {att.role}
                      </span>
                    </div>
                  </div>

                  {!isEditing && (
                    <button
                      onClick={() => handleStartEdit(att)}
                      className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-bold rounded-xl flex items-center gap-1 transition-all active:scale-95"
                    >
                      <Edit2 className="w-3 h-3" />
                      <span>Editar</span>
                    </button>
                  )}
                </div>

                {/* Edit Form or Display */}
                {isEditing ? (
                  <div className="space-y-3 pt-2 border-t border-neutral-100 text-xs">
                    <div>
                      <label className="block text-neutral-600 font-bold mb-1">Nome:</label>
                      <input
                        type="text"
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-xl font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-neutral-600 font-bold mb-1">Cargo / Função:</label>
                      <input
                        type="text"
                        value={formRole}
                        onChange={(e) => setFormRole(e.target.value)}
                        className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-xl"
                      />
                    </div>

                    <div>
                      <label className="block text-neutral-600 font-bold mb-1">
                        Telefone Formatado:
                      </label>
                      <input
                        type="text"
                        value={formPhoneDisplay}
                        onChange={(e) => setFormPhoneDisplay(e.target.value)}
                        placeholder="(92) 98613-7969"
                        className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-xl font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-neutral-600 font-bold mb-1">
                        Número no WhatsApp (com 55):
                      </label>
                      <input
                        type="text"
                        value={formPhoneNumber}
                        onChange={(e) => setFormPhoneNumber(e.target.value)}
                        placeholder="5592986137969"
                        className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-xl font-mono text-xs"
                      />
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setEditingId(null)}
                        className="px-3 py-1.5 text-neutral-600 font-semibold"
                      >
                        Cancelar
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSave(att.id)}
                        className="px-4 py-1.5 bg-black text-white font-bold rounded-xl shadow-xs"
                      >
                        Salvar Alterações
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3 pt-2 border-t border-neutral-100 text-xs">
                    <div className="flex items-center justify-between text-neutral-700 bg-neutral-50 p-3 rounded-2xl border border-neutral-200">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-neutral-600" />
                        <span className="font-extrabold text-neutral-900">{att.phoneDisplay}</span>
                      </div>

                      <a
                        href={`https://wa.me/${att.phoneNumber}?text=${encodeURIComponent(
                          'Olá ' + att.name + '! Teste do painel administrativo da MIIXXIIE.'
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2.5 py-1 bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-lg font-bold text-[11px] flex items-center gap-1 shadow-xs transition-transform active:scale-95"
                      >
                        <MessageCircle className="w-3 h-3 fill-white" />
                        <span>Testar Link</span>
                      </a>
                    </div>

                    {/* Progress Bar of Traffic */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[11px] font-bold text-neutral-500">
                        <span>Participação nos Leads:</span>
                        <span className="text-neutral-900">
                          {att.clicksCount} cliques ({percentage}%)
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-neutral-100 overflow-hidden">
                        <div
                          className="h-full bg-black rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};