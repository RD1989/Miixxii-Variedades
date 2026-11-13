'use client';

import React, { useState } from 'react';
import {
  Truck,
  Store,
  MapPin,
  Plus,
  Trash2,
  Check,
  Edit2,
  Search,
  Clock,
  Sparkles,
  DollarSign,
  AlertCircle,
} from 'lucide-react';
import { useStore } from '@/store/useStore';
import { formatCurrencyBRL, ManausNeighborhood } from '@/data/mockData';

export const AdminManausDelivery: React.FC = () => {
  const {
    neighborhoods,
    updateNeighborhoodFee,
    addNeighborhood,
    deleteNeighborhood,
    storeCMS,
    updateStoreCMS,
  } = useStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedZone, setSelectedZone] = useState<string>('all');

  // New neighborhood form
  const [isAddingNeighborhood, setIsAddingNeighborhood] = useState(false);
  const [newName, setNewName] = useState('');
  const [newZone, setNewZone] = useState('Centro-Sul');
  const [newFee, setNewFee] = useState('20.00');
  const [newTime, setNewTime] = useState('Mesmo dia');

  // Inline fee editing
  const [editingNeighborhood, setEditingNeighborhood] = useState<string | null>(null);
  const [editingFeeValue, setEditingFeeValue] = useState<string>('');

  // Showroom settings
  const [showroomAddress, setShowroomAddress] = useState(storeCMS.storeAddress || 'Manaus - AM');
  const [savedShowroomMsg, setSavedShowroomMsg] = useState(false);

  const zones = ['Centro-Sul', 'Norte', 'Leste', 'Oeste', 'Centro-Oeste', 'Sul', 'Manaus'];

  const filteredNeighborhoods = (neighborhoods || []).filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesZone = selectedZone === 'all' || item.zone === selectedZone;
    return matchesSearch && matchesZone;
  });

  const handleCreateNeighborhood = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const feeNum = parseFloat(newFee.replace(',', '.')) || 0;
    const newItem: ManausNeighborhood = {
      name: newName.trim(),
      zone: newZone,
      fee: feeNum,
      time: newTime || 'Mesmo dia',
    };

    addNeighborhood(newItem);
    setNewName('');
    setNewFee('20.00');
    setIsAddingNeighborhood(false);
  };

  const handleStartEditFee = (item: ManausNeighborhood) => {
    setEditingNeighborhood(item.name);
    setEditingFeeValue(item.fee.toString());
  };

  const handleSaveFee = (name: string) => {
    const feeNum = parseFloat(editingFeeValue.replace(',', '.')) || 0;
    updateNeighborhoodFee(name, feeNum);
    setEditingNeighborhood(null);
  };

  const handleSaveShowroom = (e: React.FormEvent) => {
    e.preventDefault();
    updateStoreCMS({ storeAddress: showroomAddress });
    setSavedShowroomMsg(true);
    setTimeout(() => setSavedShowroomMsg(false), 3000);
  };

  const avgFee =
    neighborhoods && neighborhoods.length > 0
      ? neighborhoods.reduce((sum, n) => sum + n.fee, 0) / neighborhoods.length
      : 0;

  return (
    <div className="space-y-6">
      {/* Official Shipping Policy Notice */}
      <div className="p-4 bg-amber-50 border border-amber-200 rounded-3xl flex items-start sm:items-center gap-3 text-xs text-amber-900 shadow-xs">
        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5 sm:mt-0" />
        <div>
          <strong className="block text-sm font-extrabold text-amber-950">
            Regra Oficial de Frete da MIIXXIIE (Manaus - AM):
          </strong>
          <span>
            Não existe frete grátis para entregas em domicílio. Todas as entregas são feitas via motoboy com frete a combinar pelo WhatsApp de acordo com o bairro e distância. O frete é <strong>grátis exclusivamente para retirada presencial na loja física / showroom</strong> com horário agendado.
          </span>
        </div>
      </div>

      {/* Header Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-neutral-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
              Bairros Cobertos
            </span>
            <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">
              <MapPin className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-neutral-900">
              {neighborhoods?.length || 0}
            </span>
            <span className="text-xs text-neutral-500 font-semibold">locais em Manaus</span>
          </div>
          <p className="text-[11px] text-neutral-400">Entrega rápida via motoboys parceiros</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-neutral-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
              Taxa Média de Entrega
            </span>
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-emerald-700">
              {formatCurrencyBRL(avgFee)}
            </span>
            <span className="text-xs text-neutral-500 font-semibold">por corrida</span>
          </div>
          <p className="text-[11px] text-neutral-400">Combinada diretamente no WhatsApp</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-neutral-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
              Showroom Manaus
            </span>
            <div className="w-8 h-8 rounded-full bg-neutral-100 text-neutral-800 flex items-center justify-center">
              <Store className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-black text-neutral-900">
              Retirada Grátis
            </span>
          </div>
          <p className="text-[11px] text-emerald-700 font-bold">Com agendamento prévio</p>
        </div>
      </div>

      {/* Showroom Address Settings Card */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-neutral-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Store className="w-4 h-4 text-neutral-800" />
            <h3 className="font-extrabold text-sm sm:text-base text-neutral-900">
              Endereço do Showroom & Regras de Retirada
            </h3>
          </div>
          {savedShowroomMsg && (
            <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              ✓ Salvo com sucesso!
            </span>
          )}
        </div>

        <form onSubmit={handleSaveShowroom} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={showroomAddress}
            onChange={(e) => setShowroomAddress(e.target.value)}
            placeholder="Ex: Adrianópolis, Manaus - AM (Atendimento e Retirada com Horário Marcado)"
            className="flex-1 px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-2xl text-xs font-medium focus:outline-none focus:border-black"
          />
          <button
            type="submit"
            className="px-5 py-2.5 bg-black hover:bg-neutral-800 text-white text-xs font-bold rounded-2xl shadow-xs transition-all active:scale-95"
          >
            Salvar Endereço
          </button>
        </form>
      </div>

      {/* Neighborhoods Management Table */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-neutral-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-extrabold text-base text-neutral-900 flex items-center gap-2">
              <Truck className="w-4 h-4" />
              Tabela de Bairros & Taxas de Motoboy
            </h3>
            <p className="text-xs text-neutral-500">
              Personalize as taxas sugeridas para cada região de Manaus
            </p>
          </div>

          <button
            onClick={() => setIsAddingNeighborhood(!isAddingNeighborhood)}
            className="px-4 py-2 bg-black hover:bg-neutral-800 text-white text-xs font-bold rounded-2xl flex items-center justify-center gap-1.5 transition-all shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Adicionar Novo Bairro</span>
          </button>
        </div>

        {/* Add Neighborhood Modal/Drawer Inline */}
        {isAddingNeighborhood && (
          <form
            onSubmit={handleCreateNeighborhood}
            className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-3 animate-in fade-in"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-neutral-900">Novo Bairro de Manaus:</span>
              <button
                type="button"
                onClick={() => setIsAddingNeighborhood(false)}
                className="text-neutral-400 hover:text-neutral-700"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              <div className="sm:col-span-2">
                <label className="block text-neutral-600 font-semibold mb-1">Nome do Bairro:</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Ex: Ponta Negra / Tarumã"
                  className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-xl focus:outline-none focus:border-black font-medium"
                />
              </div>

              <div>
                <label className="block text-neutral-600 font-semibold mb-1">Zona:</label>
                <select
                  value={newZone}
                  onChange={(e) => setNewZone(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-xl focus:outline-none focus:border-black font-medium"
                >
                  {zones.map((z) => (
                    <option key={z} value={z}>
                      {z}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-neutral-600 font-semibold mb-1">Taxa (R$):</label>
                <input
                  type="text"
                  required
                  value={newFee}
                  onChange={(e) => setNewFee(e.target.value)}
                  placeholder="20.00"
                  className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-xl focus:outline-none focus:border-black font-bold"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setIsAddingNeighborhood(false)}
                className="px-3.5 py-1.5 text-xs text-neutral-600 font-semibold hover:bg-neutral-200 rounded-xl"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 text-xs bg-black text-white font-bold rounded-xl shadow-xs"
              >
                Salvar Bairro
              </button>
            </div>
          </form>
        )}

        {/* Search & Zone Filters */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-2">
          <div className="flex-1 relative">
            <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filtrar por nome do bairro..."
              className="w-full pl-8 pr-3 py-1.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-medium focus:outline-none focus:border-black"
            />
          </div>

          <select
            value={selectedZone}
            onChange={(e) => setSelectedZone(e.target.value)}
            className="px-3 py-1.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-black"
          >
            <option value="all">Todas as Zonas</option>
            {zones.map((z) => (
              <option key={z} value={z}>
                Zona {z}
              </option>
            ))}
          </select>
        </div>

        {/* Neighborhood List */}
        <div className="divide-y divide-neutral-100 border border-neutral-100 rounded-2xl overflow-hidden">
          {filteredNeighborhoods.map((item, idx) => {
            const isEditing = editingNeighborhood === item.name;

            return (
              <div
                key={idx}
                className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 hover:bg-neutral-50/80 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-neutral-100 text-neutral-700 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-xs sm:text-sm text-neutral-900">
                      {item.name}
                    </h4>
                    <div className="flex items-center gap-2 text-[10px] text-neutral-400 mt-0.5">
                      <span className="font-bold bg-neutral-100 text-neutral-700 px-2 py-0.2 rounded-md">
                        Zona {item.zone}
                      </span>
                      <span>•</span>
                      <span>Prazo: {item.time}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  {/* Fee value or edit input */}
                  {isEditing ? (
                    <div className="flex items-center gap-1.5">
                      <input
                        type="text"
                        value={editingFeeValue}
                        onChange={(e) => setEditingFeeValue(e.target.value)}
                        className="w-20 px-2 py-1 text-xs font-black bg-white border border-neutral-400 rounded-lg text-center"
                      />
                      <button
                        onClick={() => handleSaveFee(item.name)}
                        className="p-1 bg-black text-white rounded-lg"
                        title="Salvar taxa"
                      >
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </button>
                    </div>
                  ) : (
                    <div className="text-right">
                      <span className="text-xs sm:text-sm font-black text-neutral-900 block">
                        {formatCurrencyBRL(item.fee)}
                      </span>
                      <button
                        onClick={() => handleStartEditFee(item)}
                        className="text-[10px] text-neutral-400 hover:text-black font-semibold underline"
                      >
                        Alterar taxa
                      </button>
                    </div>
                  )}

                  <button
                    onClick={() => {
                      if (confirm(`Remover "${item.name}" da lista de bairros?`)) {
                        deleteNeighborhood(item.name);
                      }
                    }}
                    className="p-1.5 text-neutral-300 hover:text-red-500 rounded-lg transition-colors"
                    title="Excluir bairro"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};