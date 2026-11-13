'use client';

import React, { useState } from 'react';
import {
  KanbanStatus,
  AdminOrder,
  useStore,
  KANBAN_BADGE_MAP,
} from '@/store/useStore';
import {
  MessageCircle,
  Truck,
  Store,
  ChevronLeft,
  ChevronRight,
  Search,
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Package,
  User,
  Filter,
  Columns,
  Trash2,
  X,
  RotateCcw,
} from 'lucide-react';
import { formatCurrencyBRL } from '@/data/mockData';

const KANBAN_COLUMNS: { status: KanbanStatus; label: string; shortLabel: string; color: string; border: string }[] = [
  { status: 'Novo Lead', label: '1. Novo Lead WhatsApp', shortLabel: 'Novos', color: 'bg-amber-500/10 text-amber-700', border: 'border-amber-300' },
  { status: 'Em Atendimento', label: '2. Em Atendimento', shortLabel: 'Atendimento', color: 'bg-blue-500/10 text-blue-700', border: 'border-blue-300' },
  { status: 'Pagamento Confirmado', label: '3. Pagamento Confirmado', shortLabel: 'Pagamento', color: 'bg-emerald-500/10 text-emerald-700', border: 'border-emerald-300' },
  { status: 'Separando Estoque', label: '4. Separando Estoque', shortLabel: 'Estoque', color: 'bg-purple-500/10 text-purple-700', border: 'border-purple-300' },
  { status: 'Saiu para Entrega', label: '5. Saiu p/ Entrega / Retirada', shortLabel: 'Entrega', color: 'bg-indigo-500/10 text-indigo-700', border: 'border-indigo-300' },
  { status: 'Concluído', label: '6. Concluído / Entregue', shortLabel: 'Concluído', color: 'bg-green-500/10 text-green-800', border: 'border-green-300' },
  { status: 'Cancelado', label: '7. Cancelado', shortLabel: 'Cancelado', color: 'bg-neutral-500/10 text-neutral-600', border: 'border-neutral-300' },
];

export const AdminKanbanBoard: React.FC = () => {
  const {
    adminOrders,
    moveKanbanOrder,
    addAdminOrder,
    deleteAdminOrder,
    clearCompletedOrders,
    attendants,
    neighborhoods,
  } = useStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterAttendant, setFilterAttendant] = useState<string>('all');
  const [activeMobileColumn, setActiveMobileColumn] = useState<KanbanStatus | 'all'>('all');

  // Manual Order Modal
  const [isAddOrderOpen, setIsAddOrderOpen] = useState(false);
  const [manualCustomer, setManualCustomer] = useState('');
  const [manualPhone, setManualPhone] = useState('(92) 9');
  const [manualItems, setManualItems] = useState('');
  const [manualTotal, setManualTotal] = useState('');
  const [manualDeliveryMethod, setManualDeliveryMethod] = useState<'motoboy' | 'retirada'>('motoboy');
  const [manualNeighborhood, setManualNeighborhood] = useState('Centro / Praça 14 / Cachoeirinha');
  const [manualAttendantId, setManualAttendantId] = useState(attendants[0]?.id || 'maria');
  const [manualStatus, setManualStatus] = useState<KanbanStatus>('Novo Lead');

  const filteredOrders = adminOrders.filter((order) => {
    const matchesSearch =
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order.neighborhood && order.neighborhood.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (order.itemsList && order.itemsList.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesAttendant =
      filterAttendant === 'all' || order.attendantId === filterAttendant;

    return matchesSearch && matchesAttendant;
  });

  const getNextStatus = (current: KanbanStatus): KanbanStatus | null => {
    const orderList: KanbanStatus[] = [
      'Novo Lead',
      'Em Atendimento',
      'Pagamento Confirmado',
      'Separando Estoque',
      'Saiu para Entrega',
      'Concluído',
    ];
    const idx = orderList.indexOf(current);
    if (idx !== -1 && idx < orderList.length - 1) {
      return orderList[idx + 1];
    }
    return null;
  };

  const getPrevStatus = (current: KanbanStatus): KanbanStatus | null => {
    const orderList: KanbanStatus[] = [
      'Novo Lead',
      'Em Atendimento',
      'Pagamento Confirmado',
      'Separando Estoque',
      'Saiu para Entrega',
      'Concluído',
    ];
    const idx = orderList.indexOf(current);
    if (idx > 0) {
      return orderList[idx - 1];
    }
    return null;
  };

  const handleOpenWhatsApp = (order: AdminOrder) => {
    const targetAttendant = attendants.find((a) => a.id === order.attendantId) || attendants[0];
    const phone = targetAttendant?.phoneNumber || '5592986137969';
    const msg = `Olá, ${order.customer}! Aqui é da equipe da MIIXXIIE Variedades em Manaus. Entro em contato referente ao seu pedido ${order.id}.`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCreateManualOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualCustomer.trim()) return;

    const totalNum = parseFloat(manualTotal.replace(',', '.')) || 0;
    const newId = `#${Math.floor(1000 + Math.random() * 9000)}`;
    const selectedAttendant = attendants.find((a) => a.id === manualAttendantId) || attendants[0];

    addAdminOrder({
      id: newId,
      customer: manualCustomer.trim(),
      customerPhone: manualPhone.trim(),
      itemsCount: 1,
      itemsList: manualItems.trim() || 'Venda manual balcão / WhatsApp',
      total: totalNum,
      subtotal: totalNum,
      shippingFee: 0,
      deliveryMethod:
        manualDeliveryMethod === 'retirada'
          ? 'Retirada no Showroom'
          : `Motoboy (${manualNeighborhood})`,
      neighborhood:
        manualDeliveryMethod === 'retirada' ? 'Showroom Manaus' : manualNeighborhood,
      status: manualStatus,
      statusBadge: KANBAN_BADGE_MAP[manualStatus],
      attendantId: (selectedAttendant?.id as any) || 'maria',
      attendantName: selectedAttendant?.name || 'Consultora',
      date: 'Hoje',
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      notes: 'Pedido cadastrado manualmente no painel administrativo.',
    });

    setManualCustomer('');
    setManualPhone('(92) 9');
    setManualItems('');
    setManualTotal('');
    setIsAddOrderOpen(false);
  };

  const displayedColumns =
    activeMobileColumn === 'all'
      ? KANBAN_COLUMNS
      : KANBAN_COLUMNS.filter((col) => col.status === activeMobileColumn);

  return (
    <div className="space-y-4">
      {/* Kanban Topbar Controls */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-white p-3.5 sm:p-4 rounded-2xl border border-neutral-200 shadow-xs">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por cliente, pedido ou bairro em Manaus..."
            className="w-full pl-9 pr-4 py-2.5 text-base sm:text-xs bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-black font-medium"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Attendant filter */}
          <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-xl text-xs font-semibold text-neutral-700">
            <span className="text-[11px] px-2 text-neutral-500 shrink-0">Consultora:</span>
            <button
              onClick={() => setFilterAttendant('all')}
              className={`px-2.5 py-1.5 rounded-lg text-xs transition-all ${
                filterAttendant === 'all'
                  ? 'bg-black text-white shadow-xs'
                  : 'hover:text-black'
              }`}
            >
              Todas
            </button>
            {attendants.map((att) => (
              <button
                key={att.id}
                onClick={() => setFilterAttendant(att.id)}
                className={`px-2.5 py-1.5 rounded-lg text-xs transition-all ${
                  filterAttendant === att.id
                    ? 'bg-black text-white shadow-xs'
                    : 'hover:text-black'
                }`}
              >
                {att.name}
              </button>
            ))}
          </div>

          {/* Quick Actions */}
          <button
            onClick={() => {
              if (window.confirm('Deseja arquivar todos os pedidos Concluídos e Cancelados do Kanban?')) {
                clearCompletedOrders();
              }
            }}
            title="Limpar pedidos concluídos e cancelados"
            className="px-3 py-2 rounded-xl text-xs font-semibold text-neutral-600 bg-neutral-100 hover:bg-neutral-200 transition-colors flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Limpar Concluídos</span>
          </button>

          <button
            onClick={() => setIsAddOrderOpen(true)}
            className="px-4 py-2 bg-black hover:bg-neutral-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Novo Pedido</span>
          </button>
        </div>
      </div>

      {/* Mobile Column Quick Filter Buttons */}
      <div className="flex sm:hidden overflow-x-auto no-scrollbar gap-1.5 pb-1">
        <button
          onClick={() => setActiveMobileColumn('all')}
          className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
            activeMobileColumn === 'all'
              ? 'bg-black text-white'
              : 'bg-neutral-100 text-neutral-600'
          }`}
        >
          Todas as Colunas ({adminOrders.length})
        </button>
        {KANBAN_COLUMNS.map((col) => {
          const count = adminOrders.filter((o) => o.status === col.status).length;
          return (
            <button
              key={col.status}
              onClick={() => setActiveMobileColumn(col.status)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                activeMobileColumn === col.status
                  ? 'bg-black text-white'
                  : 'bg-neutral-100 text-neutral-600'
              }`}
            >
              {col.shortLabel} ({count})
            </button>
          );
        })}
      </div>

      {/* Kanban Board Columns Grid */}
      <div className="flex gap-4 overflow-x-auto pb-4 pt-1 items-start scroll-smooth">
        {displayedColumns.map((col) => {
          const colOrders = filteredOrders.filter((order) => order.status === col.status);
          const colTotal = colOrders.reduce((sum, o) => sum + o.total, 0);

          return (
            <div
              key={col.status}
              className={`${
                activeMobileColumn !== 'all' ? 'w-full md:w-80' : 'w-[88vw] sm:w-80'
              } shrink-0 bg-[#F4F4F6] rounded-2xl p-3 border border-neutral-200/80 flex flex-col max-h-[750px]`}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-neutral-200">
                <div className="flex items-center gap-2">
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-lg border ${col.color} ${col.border}`}>
                    {col.label}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-neutral-800 block">
                    {colOrders.length} {colOrders.length === 1 ? 'pedido' : 'pedidos'}
                  </span>
                  <span className="text-[10px] text-neutral-500 font-medium">
                    {formatCurrencyBRL(colTotal)}
                  </span>
                </div>
              </div>

              {/* Cards Container */}
              <div className="space-y-2.5 overflow-y-auto pr-1 flex-1">
                {colOrders.length === 0 ? (
                  <div className="text-center py-8 text-neutral-400 text-xs border border-dashed border-neutral-300 rounded-xl">
                    Nenhum pedido nesta etapa
                  </div>
                ) : (
                  colOrders.map((order) => {
                    const nextSt = getNextStatus(order.status);
                    const prevSt = getPrevStatus(order.status);

                    return (
                      <div
                        key={order.id}
                        className="bg-white rounded-xl p-3.5 border border-neutral-200 shadow-xs hover:shadow-md transition-all space-y-2.5 group relative"
                      >
                        {/* Top: ID, Customer & Attendant */}
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-xs text-neutral-900">
                                {order.id}
                              </span>
                              <span className="text-[10px] bg-neutral-100 text-neutral-600 px-1.5 py-0.2 rounded font-medium">
                                {order.time || 'Recente'}
                              </span>
                            </div>
                            <h4 className="font-extrabold text-sm text-neutral-900 mt-0.5">
                              {order.customer}
                            </h4>
                            {order.customerPhone && (
                              <span className="text-[10px] text-neutral-500 font-medium block">
                                {order.customerPhone}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-800 border border-neutral-200">
                              {order.attendantName || 'Consultora'}
                            </span>
                            <button
                              onClick={() => {
                                if (window.confirm(`Excluir pedido ${order.id} de ${order.customer}?`)) {
                                  deleteAdminOrder(order.id);
                                }
                              }}
                              className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-600 text-neutral-400 transition-opacity"
                              title="Excluir pedido"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Items preview */}
                        {order.itemsList && (
                          <p className="text-[11px] text-neutral-600 line-clamp-2 leading-relaxed bg-neutral-50 p-2 rounded-lg border border-neutral-100">
                            {order.itemsList}
                          </p>
                        )}

                        {/* Location / Delivery */}
                        <div className="flex items-center gap-1 text-[11px] text-neutral-600">
                          {order.deliveryMethod?.includes('Retirada') ? (
                            <Store className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                          ) : (
                            <Truck className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                          )}
                          <span className="truncate">
                            {order.neighborhood || order.deliveryMethod || 'Manaus - AM'}
                          </span>
                        </div>

                        {/* Value & Direct WhatsApp action */}
                        <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
                          <div>
                            <span className="text-[10px] text-neutral-400 block font-medium">
                              Total Pedido:
                            </span>
                            <span className="text-xs font-black text-black">
                              {formatCurrencyBRL(order.total)}
                            </span>
                          </div>

                          <button
                            onClick={() => handleOpenWhatsApp(order)}
                            className="px-3 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold flex items-center gap-1 transition-all shadow-xs active:scale-95 min-h-[36px]"
                            title="Conversar com o cliente no WhatsApp"
                          >
                            <MessageCircle className="w-3.5 h-3.5 fill-white" />
                            <span>WhatsApp</span>
                          </button>
                        </div>

                        {/* Fast Shift Buttons (< & >) */}
                        <div className="pt-1.5 flex items-center justify-between border-t border-neutral-100">
                          {prevSt ? (
                            <button
                              onClick={() => moveKanbanOrder(order.id, prevSt)}
                              className="text-[11px] text-neutral-500 hover:text-black flex items-center gap-0.5 font-medium hover:underline py-1 px-1.5 rounded active:scale-95"
                              title={`Voltar para ${prevSt}`}
                            >
                              <ChevronLeft className="w-3.5 h-3.5" />
                              <span>{prevSt.split(' ')[0]}</span>
                            </button>
                          ) : (
                            <div />
                          )}

                          {nextSt ? (
                            <button
                              onClick={() => moveKanbanOrder(order.id, nextSt)}
                              className="text-[11px] font-bold text-black hover:text-neutral-700 flex items-center gap-0.5 hover:underline bg-neutral-100 hover:bg-neutral-200 px-2.5 py-1 rounded-md active:scale-95"
                              title={`Avançar para ${nextSt}`}
                            >
                              <span>Avançar</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          ) : (
                            <span className="text-[10px] text-green-700 font-bold flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Finalizado</span>
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal: Novo Pedido Manual */}
      {isAddOrderOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 bg-neutral-50/50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">
                  <Plus className="w-4 h-4" />
                </div>
                <h3 className="font-extrabold text-base text-neutral-900">
                  Lançar Novo Pedido Manual
                </h3>
              </div>
              <button
                onClick={() => setIsAddOrderOpen(false)}
                className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-500 hover:text-black transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateManualOrder} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-700 font-bold mb-1">
                    Nome da Cliente *
                  </label>
                  <input
                    type="text"
                    required
                    value={manualCustomer}
                    onChange={(e) => setManualCustomer(e.target.value)}
                    placeholder="Ex: Beatriz Lima"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-black font-semibold text-sm"
                  />
                </div>

                <div>
                  <label className="block text-neutral-700 font-bold mb-1">
                    Telefone / WhatsApp *
                  </label>
                  <input
                    type="text"
                    required
                    value={manualPhone}
                    onChange={(e) => setManualPhone(e.target.value)}
                    placeholder="(92) 99123-4567"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-black font-semibold text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-700 font-bold mb-1">
                  Peças / Descrição do Pedido *
                </label>
                <input
                  type="text"
                  required
                  value={manualItems}
                  onChange={(e) => setManualItems(e.target.value)}
                  placeholder="Ex: Vestido Bárbara Preto (G1), Conjunto Alfaiataria (G2)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-black text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-neutral-700 font-bold mb-1">
                    Valor Total (R$) *
                  </label>
                  <input
                    type="text"
                    required
                    value={manualTotal}
                    onChange={(e) => setManualTotal(e.target.value)}
                    placeholder="250.00"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-black font-bold text-sm"
                  />
                </div>

                <div>
                  <label className="block text-neutral-700 font-bold mb-1">
                    Modalidade
                  </label>
                  <select
                    value={manualDeliveryMethod}
                    onChange={(e) => setManualDeliveryMethod(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-black font-semibold"
                  >
                    <option value="motoboy">Motoboy Manaus</option>
                    <option value="retirada">Retirada Showroom</option>
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-700 font-bold mb-1">
                    Consultora
                  </label>
                  <select
                    value={manualAttendantId}
                    onChange={(e) => setManualAttendantId(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-black font-semibold"
                  >
                    {attendants.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {manualDeliveryMethod === 'motoboy' && (
                <div>
                  <label className="block text-neutral-700 font-bold mb-1">
                    Bairro em Manaus
                  </label>
                  <select
                    value={manualNeighborhood}
                    onChange={(e) => setManualNeighborhood(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-black"
                  >
                    {neighborhoods.map((n) => (
                      <option key={n.name} value={n.name}>
                        {n.name} ({formatCurrencyBRL(n.fee)})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-neutral-700 font-bold mb-1">
                  Status Inicial no Kanban
                </label>
                <select
                  value={manualStatus}
                  onChange={(e) => setManualStatus(e.target.value as KanbanStatus)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-black font-semibold"
                >
                  <option value="Novo Lead">Novo Lead WhatsApp</option>
                  <option value="Em Atendimento">Em Atendimento</option>
                  <option value="Pagamento Confirmado">Pagamento Confirmado (PIX)</option>
                  <option value="Separando Estoque">Separando Estoque</option>
                  <option value="Saiu para Entrega">Saiu para Entrega</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setIsAddOrderOpen(false)}
                  className="px-4 py-2 rounded-full border border-neutral-200 text-neutral-600 font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-black hover:bg-neutral-800 text-white font-bold rounded-full shadow-md transition-all"
                >
                  Lançar Pedido
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
