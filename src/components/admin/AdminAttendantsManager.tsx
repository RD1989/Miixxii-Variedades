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
  Plus,
  Trash2,
  Eye,
  EyeOff,
  X,
  AlertCircle,
} from 'lucide-react';
import { useStore } from '@/store/useStore';
import { WhatsAppAttendant } from '@/data/mockData';

export const AdminAttendantsManager: React.FC = () => {
  const {
    attendants,
    updateAttendant,
    addAttendant,
    deleteAttendant,
    toggleAttendantActive,
    currentAttendantIndex,
    storeCMS,
    updateStoreCMS,
  } = useStore();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [formName, setFormName] = useState('');
  const [formRole, setFormRole] = useState('');
  const [formPhoneDisplay, setFormPhoneDisplay] = useState('');
  const [formPhoneNumber, setFormPhoneNumber] = useState('');

  // New Attendant Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState('Consultora de Vendas');
  const [newPhoneDisplay, setNewPhoneDisplay] = useState('(92) 9');
  const [newPhoneNumber, setNewPhoneNumber] = useState('5592');

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

    // Also sync with storeCMS if default attendants
    if (id === 'maria') {
      updateStoreCMS({ whatsappMaria: formPhoneDisplay.trim() });
    } else if (id === 'carlos') {
      updateStoreCMS({ whatsappCarlos: formPhoneDisplay.trim() });
    }

    setEditingId(null);
  };

  const handleCreateAttendant = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    addAttendant({
      name: newName.trim(),
      role: newRole.trim() || 'Consultora de Vendas',
      phoneDisplay: newPhoneDisplay.trim(),
      phoneNumber: newPhoneNumber.trim().replace(/\D/g, ''),
      clicksCount: 0,
      isActive: true,
    });

    setNewName('');
    setNewRole('Consultora de Vendas');
    setNewPhoneDisplay('(92) 9');
    setNewPhoneNumber('5592');
    setIsAddModalOpen(false);
  };

  const handleDelete = (att: WhatsAppAttendant) => {
    if (attendants.length <= 1) {
      alert('A loja deve ter no mínimo 1 atendente cadastrado para receber clientes no WhatsApp.');
      return;
    }
    if (window.confirm(`Deseja remover "${att.name}" da equipe de atendimento no WhatsApp?`)) {
      deleteAttendant(att.id);
    }
  };

  const totalClicks = attendants.reduce((sum, a) => sum + (a.clicksCount || 0), 0);
  const activeAttendants = attendants.filter((a) => a.isActive !== false);
  const nextInLine = activeAttendants[(currentAttendantIndex || 0) % (activeAttendants.length || 1)];

  return (
    <div className="space-y-6">
      {/* Header Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-neutral-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
              Equipe de Atendimento
            </span>
            <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-neutral-900">
              {activeAttendants.length}
            </span>
            <span className="text-xs text-neutral-500 font-semibold">
              ativas ({attendants.length} no total)
            </span>
          </div>
          <p className="text-[11px] text-neutral-400">Distribuição automatizada de tráfego</p>
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
              {nextInLine?.name || 'Nenhum ativo'}
            </span>
          </div>
          <p className="text-[11px] text-purple-700 font-bold">Receberá o próximo clique</p>
        </div>
      </div>

      {/* Attendants List & Edit Cards */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-extrabold text-base text-neutral-900">
              Consultoras de Vendas no WhatsApp (Manaus - AM)
            </h3>
            <p className="text-xs text-neutral-500">
              Gerencie quem recebe os leads do catálogo, alterne disponibilidade e adicione novas consultoras.
            </p>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-black hover:bg-neutral-800 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-full flex items-center gap-2 shadow-sm transition-all self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Adicionar Consultora</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {attendants.map((att) => {
            const isEditing = editingId === att.id;
            const isActive = att.isActive !== false;
            const percentage =
              totalClicks > 0 ? Math.round((att.clicksCount / totalClicks) * 100) : 0;

            return (
              <div
                key={att.id}
                className={`p-5 sm:p-6 rounded-3xl border shadow-xs space-y-4 transition-all ${
                  isActive
                    ? 'bg-white border-neutral-200'
                    : 'bg-neutral-50 border-dashed border-neutral-300 opacity-60'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div
                        className={`w-12 h-12 rounded-2xl font-extrabold text-base flex items-center justify-center shadow-xs ${
                          isActive
                            ? 'bg-black text-white'
                            : 'bg-neutral-300 text-neutral-600'
                        }`}
                      >
                        {att.name.charAt(0)}
                      </div>
                      <span
                        className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-white ${
                          isActive ? 'bg-emerald-500' : 'bg-neutral-400'
                        }`}
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-extrabold text-sm sm:text-base text-neutral-900">
                          {att.name}
                        </h4>
                        {isActive ? (
                          <span className="text-[10px] bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                            Ativa
                          </span>
                        ) : (
                          <span className="text-[10px] bg-neutral-200 text-neutral-600 font-bold px-2 py-0.5 rounded-full">
                            Pausada
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-neutral-500 font-semibold block">
                        {att.role}
                      </span>
                    </div>
                  </div>

                  {!isEditing && (
                    <div className="flex items-center gap-1.5">
                      {/* Toggle Active */}
                      <button
                        onClick={() => toggleAttendantActive(att.id)}
                        className={`p-2 rounded-xl transition-colors ${
                          isActive
                            ? 'hover:bg-emerald-50 text-emerald-700'
                            : 'hover:bg-neutral-200 text-neutral-500'
                        }`}
                        title={isActive ? 'Pausar recebimento de leads' : 'Ativar recebimento de leads'}
                      >
                        {isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>

                      {/* Edit */}
                      <button
                        onClick={() => handleStartEdit(att)}
                        className="p-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 transition-all"
                        title="Editar dados"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => handleDelete(att)}
                        className="p-2 rounded-xl hover:bg-red-50 text-neutral-400 hover:text-red-600 transition-colors"
                        title="Remover atendente"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
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
                          'Olá ' + att.name + '! Teste do painel administrativo da MIIXXIIE em Manaus.'
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

      {/* Modal: Adicionar Consultora */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 bg-neutral-50/50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
                <h3 className="font-extrabold text-base text-neutral-900">
                  Nova Consultora WhatsApp
                </h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-500 hover:text-black transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateAttendant} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block text-neutral-700 font-bold mb-1">
                  Nome da Atendente *
                </label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Ex: Ana Paula"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-black font-semibold text-sm"
                />
              </div>

              <div>
                <label className="block text-neutral-700 font-bold mb-1">
                  Cargo / Função
                </label>
                <input
                  type="text"
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  placeholder="Consultora de Vendas"
                  className="w-full px-3.5 py-2 rounded-xl border border-neutral-200 focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-neutral-700 font-bold mb-1">
                  Telefone Formatado (Exibição) *
                </label>
                <input
                  type="text"
                  required
                  value={newPhoneDisplay}
                  onChange={(e) => setNewPhoneDisplay(e.target.value)}
                  placeholder="(92) 98888-7777"
                  className="w-full px-3.5 py-2 rounded-xl border border-neutral-200 focus:outline-none focus:border-black font-bold"
                />
              </div>

              <div>
                <label className="block text-neutral-700 font-bold mb-1">
                  Número Internacional (com 55) *
                </label>
                <input
                  type="text"
                  required
                  value={newPhoneNumber}
                  onChange={(e) => setNewPhoneNumber(e.target.value)}
                  placeholder="5592988887777"
                  className="w-full px-3.5 py-2 rounded-xl border border-neutral-200 focus:outline-none focus:border-black font-mono"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-full border border-neutral-200 text-neutral-600 font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-black hover:bg-neutral-800 text-white font-bold rounded-full shadow-md transition-all"
                >
                  Cadastrar Atendente
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
