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
} from 'lucide-react';
import { formatCurrencyBRL } from '@/data/mockData';

const KANBAN_COLUMNS: { status: KanbanStatus; label: string; color: string; border: string }[] = [
  { status: 'Novo Lead', label: '1. Novo Lead WhatsApp', color: 'bg-amber-500/10 text-amber-700', border: 'border-amber-300' },
  { status: 'Em Atendimento', label: '2. Em Atendimento', color: 'bg-blue-500/10 text-blue-700', border: 'border-blue-300' },
  { status: 'Pagamento Confirmado', label: '3. Pagamento Confirmado', color: 'bg-emerald-500/10 text-emerald-700', border: 'border-emerald-300' },
  { status: 'Separando Estoque', label: '4. Separando Estoque', color: 'bg-purple-500/10 text-purple-700', border: 'border-purple-300' },
  { status: 'Saiu para Entrega', label: '5. Saiu p/ Entrega / Retirada', color: 'bg-indigo-500/10 text-indigo-700', border: 'border-indigo-300' },
  { status: 'Concluído', label: '6. Concluído / Entregue', color: 'bg-green-500/10 text-green-800', border: 'border-green-300' },
  { status: 'Cancelado', label: '7. Cancelado', color: 'bg-neutral-500/10 text-neutral-600', border: 'border-neutral-300' },
];

export const AdminKanbanBoard: React.FC = () => {
  const { adminOrders, moveKanbanOrder, addAdminOrder } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAttendant, setFilterAttendant] = useState<'all' | 'maria' | 'carlos'>('all');
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);

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

  return (
    <div className="space-y-5">
      {/* Kanban Topbar Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-neutral-200 shadow-xs">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por cliente, pedido ou bairro em Manaus..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-black"
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-neutral-100 p-1 rounded-xl text-xs font-semibold text-neutral-700">
            <span className="text-[11px] px-2 text-neutral-500">Filtrar Atendente:</span>
            <button
              onClick={() => setFilterAttendant('all')}
              className={`px-2.5 py-1 rounded-lg text-xs transition-all ${
                filterAttendant === 'all'
                  ? 'bg-black text-white shadow-xs'
                  : 'hover:text-black'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setFilterAttendant('maria')}
              className={`px-2.5 py-1 rounded-lg text-xs transition-all ${
                filterAttendant === 'maria'
                  ? 'bg-black text-white shadow-xs'
                  : 'hover:text-black'
              }`}
            >
              Maria
            </button>
            <button
              onClick={() => setFilterAttendant('carlos')}
              className={`px-2.5 py-1 rounded-lg text-xs transition-all ${
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

      {/* Kanban Columns Horizontal Board */}
      <div className="flex items-start gap-3.5 overflow-x-auto pb-6 no-scrollbar min-h-[550px]">
        {KANBAN_COLUMNS.map((col) => {
          const colOrders = filteredOrders.filter((ord) => ord.status === col.status);
          const colTotal = colOrders.reduce((sum, ord) => sum + ord.total, 0);

          return (
            <div
              key={col.status}
              className="w-72 sm:w-80 shrink-0 bg-[#F4F4F6] rounded-2xl p-3 border border-neutral-200/80 flex flex-col max-h-[750px]"
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
                    {colOrders.length}
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
                            className="px-2.5 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#1EBE5D] text-white text-[11px] font-bold flex items-center gap-1 transition-all shadow-xs"
                            title="Conversar com o cliente no WhatsApp"
                          >
                            <MessageCircle className="w-3.5 h-3.5 fill-white" />
                            <span>WhatsApp</span>
                          </button>
                        </div>

                        {/* Fast Shift Buttons (< & >) */}
                        <div className="pt-1 flex items-center justify-between border-t border-neutral-100">
                          {prevSt ? (
                            <button
                              onClick={() => moveKanbanOrder(order.id, prevSt)}
                              className="text-[10px] text-neutral-500 hover:text-black flex items-center gap-0.5 font-medium hover:underline"
                              title={`Voltar para ${prevSt}`}
                            >
                              <ChevronLeft className="w-3 h-3" />
                              <span>{prevSt.split(' ')[0]}</span>
                            </button>
                          ) : (
                            <div />
                          )}

                          {nextSt ? (
                            <button
                              onClick={() => moveKanbanOrder(order.id, nextSt)}
                              className="text-[10px] font-bold text-black hover:text-neutral-700 flex items-center gap-0.5 hover:underline bg-neutral-100 px-2 py-0.5 rounded-md"
                              title={`Avançar para ${nextSt}`}
                            >
                              <span>Avançar</span>
                              <ChevronRight className="w-3 h-3" />
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
