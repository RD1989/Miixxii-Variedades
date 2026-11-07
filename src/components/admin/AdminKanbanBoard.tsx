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
  const { adminOrders, moveKanbanOrder } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAttendant, setFilterAttendant] = useState<'all' | 'maria' | 'carlos'>('all');
  const [activeMobileColumn, setActiveMobileColumn] = useState<KanbanStatus | 'all'>('all');

  const filteredOrders = adminOrders.filter((order) => {
    const matchesSearch =
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order.neighborhood && order.neighborhood.toLowerCase().includes(searchTerm.toLowerCase()));

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
    const phone =
      order.attendantId === 'carlos'
        ? '5592986064005'
        : '5592986137969';
    const msg = `Olá, ${order.customer}! Aqui é da equipe da MIIXXIIE Variedades em Manaus. Entro em contato referente ao seu pedido ${order.id}.`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const displayedColumns = activeMobileColumn === 'all'
    ? KANBAN_COLUMNS
    : KANBAN_COLUMNS.filter((col) => col.status === activeMobileColumn);

  return (
    <div className="space-y-4">
      {/* Kanban Topbar Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3.5 sm:p-4 rounded-2xl border border-neutral-200 shadow-xs">
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

        <div className="flex items-center gap-2">
          <div className="w-full sm:w-auto flex items-center justify-between sm:justify-start gap-1.5 bg-neutral-100 p-1 rounded-xl text-xs font-semibold text-neutral-700">
            <span className="text-[11px] px-2 text-neutral-500 shrink-0">Atendente:</span>
            <button
              onClick={() => setFilterAttendant('all')}
              className={`flex-1 sm:flex-initial px-2.5 py-1.5 rounded-lg text-xs transition-all ${
                filterAttendant === 'all'
                  ? 'bg-black text-white shadow-xs'
                  : 'hover:text-black'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setFilterAttendant('maria')}
              className={`flex-1 sm:flex-initial px-2.5 py-1.5 rounded-lg text-xs transition-all ${
                filterAttendant === 'maria'
                  ? 'bg-black text-white shadow-xs'
                  : 'hover:text-black'
              }`}
            >
              Maria
            </button>
            <button
              onClick={() => setFilterAttendant('carlos')}
              className={`flex-1 sm:flex-initial px-2.5 py-1.5 rounded-lg text-xs transition-all ${
                filterAttendant === 'carlos'
                  ? 'bg-black text-white shadow-xs'
                  : 'hover:text-black'
              }`}
            >
              Carlos
            </button>
          </div>
        </div>
      </div>

      {/* Mobile-Only Horizontal Column Switcher Bar */}
      <div className="md:hidden flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
        <button
          onClick={() => setActiveMobileColumn('all')}
          className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
            activeMobileColumn === 'all'
              ? 'bg-black text-white shadow-xs'
              : 'bg-white text-neutral-700 border border-neutral-200'
          }`}
        >
          <Columns className="w-3.5 h-3.5" />
          <span>Ver Todas ({filteredOrders.length})</span>
        </button>

        {KANBAN_COLUMNS.map((col) => {
          const count = filteredOrders.filter((ord) => ord.status === col.status).length;
          const isActive = activeMobileColumn === col.status;
          return (
            <button
              key={col.status}
              onClick={() => setActiveMobileColumn(col.status)}
              className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                isActive
                  ? 'bg-black text-white shadow-xs'
                  : 'bg-white text-neutral-700 border border-neutral-200'
              }`}
            >
              <span>{col.shortLabel}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-white/25 text-white' : 'bg-neutral-100 text-neutral-600'}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Kanban Columns Board Container */}
      <div
        className={`flex items-start gap-3.5 overflow-x-auto pb-6 no-scrollbar min-h-[500px] ${
          activeMobileColumn !== 'all' ? 'flex-col md:flex-row' : ''
        }`}
      >
        {displayedColumns.map((col) => {
          const colOrders = filteredOrders.filter((ord) => ord.status === col.status);
          const colTotal = colOrders.reduce((sum, ord) => sum + ord.total, 0);

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
                        className="bg-white rounded-xl p-3.5 border border-neutral-200 shadow-xs hover:shadow-md transition-all space-y-2.5 group"
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

                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              order.attendantId === 'maria'
                                ? 'bg-pink-100 text-pink-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}
                          >
                            {order.attendantName || (order.attendantId === 'carlos' ? 'Carlos' : 'Maria')}
                          </span>
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
    </div>
  );
};
