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
  Copy,
  Edit2,
  Check,
  Send,
  Calendar,
  FileText,
  MapPin,
  Phone,
} from 'lucide-react';
import { formatCurrencyBRL } from '@/data/mockData';

const KANBAN_COLUMNS: {
  status: KanbanStatus;
  label: string;
  shortLabel: string;
  color: string;
  border: string;
  dotColor: string;
}[] = [
  {
    status: 'Novo Lead',
    label: '1. Novo Lead WhatsApp',
    shortLabel: 'Novos',
    color: 'bg-amber-500/10 text-amber-800',
    border: 'border-amber-300',
    dotColor: 'bg-amber-500',
  },
  {
    status: 'Em Atendimento',
    label: '2. Em Atendimento',
    shortLabel: 'Atendimento',
    color: 'bg-blue-500/10 text-blue-800',
    border: 'border-blue-300',
    dotColor: 'bg-blue-500',
  },
  {
    status: 'Pagamento Confirmado',
    label: '3. Pagamento Confirmado',
    shortLabel: 'Pagamento',
    color: 'bg-emerald-500/10 text-emerald-800',
    border: 'border-emerald-300',
    dotColor: 'bg-emerald-500',
  },
  {
    status: 'Separando Estoque',
    label: '4. Separando Estoque',
    shortLabel: 'Estoque',
    color: 'bg-purple-500/10 text-purple-800',
    border: 'border-purple-300',
    dotColor: 'bg-purple-500',
  },
  {
    status: 'Saiu para Entrega',
    label: '5. Saiu p/ Entrega / Retirada',
    shortLabel: 'Entrega',
    color: 'bg-indigo-500/10 text-indigo-800',
    border: 'border-indigo-300',
    dotColor: 'bg-indigo-500',
  },
  {
    status: 'Concluído',
    label: '6. Concluído / Entregue',
    shortLabel: 'Concluído',
    color: 'bg-green-500/10 text-green-800',
    border: 'border-green-300',
    dotColor: 'bg-green-600',
  },
  {
    status: 'Cancelado',
    label: '7. Cancelado',
    shortLabel: 'Cancelado',
    color: 'bg-neutral-500/10 text-neutral-600',
    border: 'border-neutral-300',
    dotColor: 'bg-neutral-400',
  },
];

export const AdminKanbanBoard: React.FC = () => {
  const {
    adminOrders,
    moveKanbanOrder,
    addAdminOrder,
    updateAdminOrder,
    deleteAdminOrder,
    clearCompletedOrders,
    attendants,
    neighborhoods,
  } = useStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterAttendant, setFilterAttendant] = useState<string>('all');
  const [activeMobileColumn, setActiveMobileColumn] = useState<KanbanStatus | 'all'>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Manual Order Modal State
  const [isAddOrderOpen, setIsAddOrderOpen] = useState(false);
  const [manualCustomer, setManualCustomer] = useState('');
  const [manualPhone, setManualPhone] = useState('(92) 9');
  const [manualItems, setManualItems] = useState('');
  const [manualTotal, setManualTotal] = useState('');
  const [manualDeliveryMethod, setManualDeliveryMethod] = useState<'motoboy' | 'retirada'>('motoboy');
  const [manualNeighborhood, setManualNeighborhood] = useState('Centro / Praça 14 / Cachoeirinha');
  const [manualAddress, setManualAddress] = useState('');
  const [manualAttendantId, setManualAttendantId] = useState(attendants[0]?.id || 'maria');
  const [manualStatus, setManualStatus] = useState<KanbanStatus>('Novo Lead');
  const [manualNotes, setManualNotes] = useState('');

  // Order Details & Edit Modal State
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [editNotes, setEditNotes] = useState('');
  const [editStatus, setEditStatus] = useState<KanbanStatus>('Novo Lead');
  const [editAttendantId, setEditAttendantId] = useState('maria');
  const [editDeliveryAddress, setEditDeliveryAddress] = useState('');
  const [editCustomerPhone, setEditCustomerPhone] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filteredOrders = adminOrders.filter((order) => {
    const matchesSearch =
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order.neighborhood && order.neighborhood.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (order.itemsList && order.itemsList.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (order.customerPhone && order.customerPhone.includes(searchTerm));

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

  // Direct WhatsApp contact with the CLIENT (using customer's phone)
  const handleOpenWhatsAppCustomer = (order: AdminOrder) => {
    const rawPhone = (order.customerPhone || '').replace(/\D/g, '');
    let targetPhone = rawPhone;

    // Normalize Brazilian phone format
    if (targetPhone.length === 10 || targetPhone.length === 11) {
      targetPhone = `55${targetPhone}`;
    }

    if (!targetPhone) {
      // Fallback to active attendant if client phone is missing
      const fallbackAttendant = attendants.find((a) => a.id === order.attendantId) || attendants[0];
      targetPhone = fallbackAttendant?.phoneNumber || '5592986137969';
    }

    const greeting = `Olá ${order.customer}! Tudo bem? 🌸\nAqui é da equipe de atendimento da *MIIXXIIE Variedades* em Manaus.`;
    const details = `Entramos em contato referente ao seu pedido *${order.id}*:\n\n🛍️ *Peças:* ${order.itemsList || 'Itens selecionados'}\n📍 *Entrega:* ${order.deliveryMethod || order.neighborhood || 'Manaus - AM'}\n💰 *Valor:* ${formatCurrencyBRL(order.total)}`;
    const question = `\n\nPodemos confirmar o envio ou você deseja acrescentar mais alguma peça ao seu pedido? 💕`;

    const fullMessage = `${greeting}\n\n${details}${question}`;
    const url = `https://wa.me/${targetPhone}?text=${encodeURIComponent(fullMessage)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // 1-Click Copy delivery info for Motoboy apps (99Moto, Uber Flash, WhatsApp delivery)
  const handleCopyMotoboyDispatch = (order: AdminOrder) => {
    const dispatchText = `🛵 *SOLICITAÇÃO DE ENTREGA — MIIXXIIE MANAUS*\n──────────────────────────────\n📦 *Pedido:* ${order.id}\n👤 *Cliente:* ${order.customer}\n📱 *Telefone:* ${order.customerPhone || 'A combinar'}\n📍 *Destino:* ${order.deliveryAddress || order.neighborhood || 'Manaus - AM'}\n🛵 *Modalidade:* ${order.deliveryMethod || 'Motoboy'}\n💰 *Valor Total:* ${formatCurrencyBRL(order.total)}\n📝 *Obs:* ${order.notes || 'Entregar com cuidado e confirmar recebimento.'}\n──────────────────────────────`;

    if (navigator?.clipboard) {
      navigator.clipboard.writeText(dispatchText).then(() => {
        showToast(`Dados de entrega do pedido ${order.id} copiados para a área de transferência!`);
      });
    }
  };

  // Open Detailed Order Modal
  const handleOpenOrderDetail = (order: AdminOrder) => {
    setSelectedOrder(order);
    setEditNotes(order.notes || '');
    setEditStatus(order.status);
    setEditAttendantId(order.attendantId || 'maria');
    setEditDeliveryAddress(order.deliveryAddress || order.neighborhood || '');
    setEditCustomerPhone(order.customerPhone || '');
    setIsDetailModalOpen(true);
  };

  const handleSaveOrderDetail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder) return;

    const chosenAttendant = attendants.find((a) => a.id === editAttendantId);

    updateAdminOrder(selectedOrder.id, {
      notes: editNotes.trim(),
      status: editStatus,
      attendantId: editAttendantId as any,
      attendantName: chosenAttendant?.name || selectedOrder.attendantName,
      deliveryAddress: editDeliveryAddress.trim(),
      customerPhone: editCustomerPhone.trim(),
    });

    showToast(`Pedido ${selectedOrder.id} atualizado com sucesso!`);
    setIsDetailModalOpen(false);
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
      itemsList: manualItems.trim() || 'Venda balcão / WhatsApp manual',
      total: totalNum,
      subtotal: totalNum,
      shippingFee: 0,
      deliveryMethod:
        manualDeliveryMethod === 'retirada'
          ? 'Retirada no Showroom (Grátis)'
          : `Motoboy (${manualNeighborhood})`,
      neighborhood:
        manualDeliveryMethod === 'retirada' ? 'Showroom Manaus' : manualNeighborhood,
      deliveryAddress:
        manualDeliveryMethod === 'retirada'
          ? 'Showroom Manaus (Retirada Presencial)'
          : manualAddress.trim() || manualNeighborhood,
      status: manualStatus,
      statusBadge: KANBAN_BADGE_MAP[manualStatus],
      attendantId: (selectedAttendant?.id as any) || 'maria',
      attendantName: selectedAttendant?.name || 'Consultora',
      date: 'Hoje',
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      notes: manualNotes.trim() || 'Pedido cadastrado manualmente no painel administrativo.',
    });

    setManualCustomer('');
    setManualPhone('(92) 9');
    setManualItems('');
    setManualTotal('');
    setManualAddress('');
    setManualNotes('');
    setIsAddOrderOpen(false);
    showToast(`Pedido manual ${newId} cadastrado com sucesso!`);
  };

  const displayedColumns =
    activeMobileColumn === 'all'
      ? KANBAN_COLUMNS
      : KANBAN_COLUMNS.filter((col) => col.status === activeMobileColumn);

  return (
    <div className="space-y-4">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 p-4 bg-neutral-900 text-white rounded-2xl shadow-2xl border border-neutral-700 flex items-center gap-3 text-xs animate-in slide-in-from-top-2 duration-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-medium">{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="text-neutral-400 hover:text-white">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Top Filter and Actions Toolbar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-neutral-200/80 shadow-xs">
        {/* Search Input */}
        <div className="flex-1 relative">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por cliente, pedido, telefone ou bairro em Manaus..."
            className="w-full pl-9 pr-4 py-2.5 text-xs bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-black font-medium transition-colors"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Attendant & Batch Actions */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Attendant selector filter */}
          <div className="flex items-center gap-1 bg-neutral-100/80 p-1 rounded-xl text-xs font-semibold text-neutral-700 border border-neutral-200/50">
            <span className="text-[11px] px-2 text-neutral-500 shrink-0">Consultora:</span>
            <button
              onClick={() => setFilterAttendant('all')}
              className={`px-2.5 py-1.5 rounded-lg text-xs transition-all ${
                filterAttendant === 'all'
                  ? 'bg-black text-white shadow-xs font-bold'
                  : 'text-neutral-600 hover:text-black'
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
                    ? 'bg-black text-white shadow-xs font-bold'
                    : 'text-neutral-600 hover:text-black'
                }`}
              >
                {att.name}
              </button>
            ))}
          </div>

          {/* Clean completed button */}
          <button
            onClick={() => {
              clearCompletedOrders();
              showToast('Pedidos concluídos e cancelados foram arquivados.');
            }}
            title="Arquivar pedidos finalizados e cancelados"
            className="px-3 py-2 rounded-xl text-xs font-semibold text-neutral-600 bg-neutral-100 hover:bg-neutral-200 transition-colors flex items-center gap-1.5 border border-neutral-200/50"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Arquivar Concluídos</span>
          </button>

          {/* New manual order */}
          <button
            onClick={() => setIsAddOrderOpen(true)}
            className="px-4 py-2 bg-black hover:bg-neutral-800 text-white rounded-xl text-xs font-extrabold flex items-center gap-1.5 shadow-xs transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" />
            <span>Novo Pedido</span>
          </button>
        </div>
      </div>

      {/* Mobile Column Quick Pill Filters */}
      <div className="flex sm:hidden overflow-x-auto no-scrollbar gap-1.5 pb-1">
        <button
          onClick={() => setActiveMobileColumn('all')}
          className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
            activeMobileColumn === 'all'
              ? 'bg-black text-white'
              : 'bg-neutral-100 text-neutral-600'
          }`}
        >
          Todas as Etapas ({adminOrders.length})
        </button>
        {KANBAN_COLUMNS.map((col) => {
          const count = adminOrders.filter((o) => o.status === col.status).length;
          return (
            <button
              key={col.status}
              onClick={() => setActiveMobileColumn(col.status)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeMobileColumn === col.status
                  ? 'bg-black text-white'
                  : 'bg-neutral-100 text-neutral-600'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${col.dotColor}`} />
              <span>{col.shortLabel}</span>
              <span className="opacity-75">({count})</span>
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
              } shrink-0 bg-[#F4F4F6] rounded-2xl p-3 border border-neutral-200/80 flex flex-col max-h-[750px] shadow-2xs`}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-neutral-200">
                <div className="flex items-center gap-2">
                  <span className={`text-[11px] font-extrabold px-2.5 py-1 rounded-lg border ${col.color} ${col.border} flex items-center gap-1.5`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${col.dotColor}`} />
                    <span>{col.label}</span>
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-neutral-900 block">
                    {colOrders.length} {colOrders.length === 1 ? 'pedido' : 'pedidos'}
                  </span>
                  <span className="text-[10px] text-neutral-500 font-semibold">
                    {formatCurrencyBRL(colTotal)}
                  </span>
                </div>
              </div>

              {/* Cards Container */}
              <div className="space-y-2.5 overflow-y-auto pr-1 flex-1 scrollbar-thin">
                {colOrders.length === 0 ? (
                  <div className="text-center py-8 text-neutral-400 text-xs border border-dashed border-neutral-300 rounded-xl bg-white/40">
                    Nenhum pedido nesta etapa
                  </div>
                ) : (
                  colOrders.map((order) => {
                    const nextSt = getNextStatus(order.status);
                    const prevSt = getPrevStatus(order.status);

                    return (
                      <div
                        key={order.id}
                        className="bg-white rounded-xl p-3.5 border border-neutral-200 shadow-xs hover:shadow-md hover:border-neutral-300 transition-all space-y-2.5 group relative"
                      >
                        {/* Top: ID, Customer & Attendant */}
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5">
                              <span className="font-extrabold text-xs text-neutral-900 bg-neutral-100 px-1.5 py-0.5 rounded">
                                {order.id}
                              </span>
                              <span className="text-[10px] text-neutral-500 font-medium flex items-center gap-1">
                                <Clock className="w-3 h-3 text-neutral-400" />
                                <span>{order.time || 'Recente'}</span>
                              </span>
                            </div>

                            <button
                              onClick={() => handleOpenOrderDetail(order)}
                              className="font-extrabold text-sm text-neutral-900 hover:text-black hover:underline mt-1 block truncate text-left"
                              title="Clique para ver detalhes do pedido"
                            >
                              {order.customer}
                            </button>

                            {order.customerPhone && (
                              <span className="text-[11px] text-neutral-500 font-medium flex items-center gap-1 mt-0.5">
                                <Phone className="w-3 h-3 text-neutral-400" />
                                <span>{order.customerPhone}</span>
                              </span>
                            )}
                          </div>

                          <div className="flex flex-col items-end gap-1.5 shrink-0">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-800 border border-neutral-200/80">
                              {order.attendantName || 'Consultora'}
                            </span>

                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleOpenOrderDetail(order)}
                                className="p-1 text-neutral-400 hover:text-black rounded hover:bg-neutral-100 transition-colors"
                                title="Ver e editar detalhes do pedido"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => {
                                  deleteAdminOrder(order.id);
                                  showToast(`Pedido ${order.id} removido.`);
                                }}
                                className="p-1 text-neutral-400 hover:text-red-600 rounded hover:bg-red-50 transition-colors"
                                title="Excluir pedido"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Items preview */}
                        {order.itemsList && (
                          <div className="text-[11px] text-neutral-700 bg-neutral-50 p-2 rounded-lg border border-neutral-100 flex items-start gap-1.5">
                            <Package className="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-0.5" />
                            <span className="line-clamp-2 leading-relaxed">{order.itemsList}</span>
                          </div>
                        )}

                        {/* Location / Delivery Mode */}
                        <div className="flex items-center justify-between text-[11px] text-neutral-600 bg-neutral-50/60 px-2 py-1.5 rounded-lg border border-neutral-100">
                          <div className="flex items-center gap-1.5 truncate">
                            {order.deliveryMethod?.includes('Retirada') ? (
                              <Store className="w-3.5 h-3.5 text-neutral-600 shrink-0" />
                            ) : (
                              <Truck className="w-3.5 h-3.5 text-neutral-600 shrink-0" />
                            )}
                            <span className="truncate font-medium">
                              {order.deliveryAddress || order.neighborhood || order.deliveryMethod || 'Manaus - AM'}
                            </span>
                          </div>

                          {/* 1-Click Dispatch copy button */}
                          <button
                            onClick={() => handleCopyMotoboyDispatch(order)}
                            className="text-neutral-400 hover:text-black p-1 shrink-0 rounded transition-colors"
                            title="Copiar dados de entrega para o motoboy"
                          >
                            <Copy className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Value & Direct Customer WhatsApp action */}
                        <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
                          <div>
                            <span className="text-[10px] text-neutral-400 block font-medium">
                              Total Pedido:
                            </span>
                            <span className="text-sm font-black text-neutral-900">
                              {formatCurrencyBRL(order.total)}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            {/* Copy motoboy dispatch */}
                            <button
                              onClick={() => handleCopyMotoboyDispatch(order)}
                              className="p-1.5 rounded-lg text-neutral-500 hover:text-black hover:bg-neutral-100 text-xs font-semibold flex items-center gap-1 transition-colors"
                              title="Copiar dados para envio via Motoboy"
                            >
                              <Copy className="w-3.5 h-3.5" />
                              <span className="text-[10px] hidden sm:inline">Despacho</span>
                            </button>

                            {/* Direct Client WhatsApp */}
                            <button
                              onClick={() => handleOpenWhatsAppCustomer(order)}
                              className="px-3 py-1.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-extrabold flex items-center gap-1.5 transition-all shadow-xs active:scale-95"
                              title="Chamar cliente no WhatsApp"
                            >
                              <MessageCircle className="w-3.5 h-3.5 fill-white" />
                              <span>WhatsApp</span>
                            </button>
                          </div>
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
                              className="text-[11px] font-bold text-neutral-900 hover:text-black flex items-center gap-1 bg-neutral-100 hover:bg-neutral-200 px-2.5 py-1 rounded-lg transition-colors active:scale-95"
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

      {/* ==============================================================
          MODAL: DETALHES & EDIÇÃO COMPLETA DO PEDIDO
          ============================================================== */}
      {isDetailModalOpen && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 bg-neutral-50/70">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-black text-white flex items-center justify-center font-bold text-sm">
                  {selectedOrder.id}
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-neutral-900">
                    Detalhes do Pedido {selectedOrder.id}
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Registrado em {selectedOrder.date || 'Hoje'} às {selectedOrder.time || '18:00'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-500 hover:text-black transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form & Actions */}
            <form onSubmit={handleSaveOrderDetail} className="p-6 space-y-4 text-xs">
              {/* Customer info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-700 font-bold mb-1">Cliente</label>
                  <input
                    type="text"
                    disabled
                    value={selectedOrder.customer}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-neutral-100 text-neutral-800 font-bold text-xs"
                  />
                </div>
                <div>
                  <label className="block text-neutral-700 font-bold mb-1">Telefone / WhatsApp</label>
                  <input
                    type="text"
                    value={editCustomerPhone}
                    onChange={(e) => setEditCustomerPhone(e.target.value)}
                    placeholder="(92) 9..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-black font-semibold text-xs"
                  />
                </div>
              </div>

              {/* Items */}
              <div>
                <label className="block text-neutral-700 font-bold mb-1">Peças do Pedido</label>
                <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 text-neutral-800 font-medium">
                  {selectedOrder.itemsList || 'Nenhuma peça detalhada'}
                </div>
              </div>

              {/* Delivery Address */}
              <div>
                <label className="block text-neutral-700 font-bold mb-1">
                  Endereço / Bairro de Entrega em Manaus
                </label>
                <input
                  type="text"
                  value={editDeliveryAddress}
                  onChange={(e) => setEditDeliveryAddress(e.target.value)}
                  placeholder="Ex: Rua Salvador, Condomínio Privilege - Adrianópolis"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-black font-medium text-xs"
                />
              </div>

              {/* Stage & Attendant */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-700 font-bold mb-1">Etapa no Kanban</label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value as KanbanStatus)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-black font-bold text-xs"
                  >
                    {KANBAN_COLUMNS.map((c) => (
                      <option key={c.status} value={c.status}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-700 font-bold mb-1">Consultora Responsável</label>
                  <select
                    value={editAttendantId}
                    onChange={(e) => setEditAttendantId(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-black font-bold text-xs"
                  >
                    {attendants.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.name} ({a.role})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Internal Notes */}
              <div>
                <label className="block text-neutral-700 font-bold mb-1">
                  Notas Internas da Loja (Manaus)
                </label>
                <textarea
                  rows={3}
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  placeholder="Ex: Cliente pediu confirmação de tamanho; PIX aprovado; entregar após 17h..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-black text-xs"
                />
              </div>

              {/* Quick actions row */}
              <div className="p-3 bg-neutral-50 rounded-2xl border border-neutral-200 flex flex-wrap items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => handleCopyMotoboyDispatch(selectedOrder)}
                  className="px-3 py-2 bg-white hover:bg-neutral-100 text-neutral-800 border border-neutral-200 rounded-xl font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar p/ Motoboy</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleOpenWhatsAppCustomer(selectedOrder)}
                  className="px-3 py-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-xl font-bold flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-white" />
                  <span>Chamar no WhatsApp</span>
                </button>
              </div>

              {/* Bottom submit */}
              <div className="flex justify-end gap-2 pt-2 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setIsDetailModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-neutral-200 text-neutral-600 font-bold"
                >
                  Fechar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-black hover:bg-neutral-800 text-white font-extrabold rounded-xl shadow-md transition-all"
                >
                  Salvar Alterações
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==============================================================
          MODAL: LANÇAR NOVO PEDIDO MANUAL
          ============================================================== */}
      {isAddOrderOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 bg-neutral-50/70">
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
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-black font-semibold text-xs"
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
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-black font-semibold text-xs"
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
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-black font-bold text-xs"
                  />
                </div>

                <div>
                  <label className="block text-neutral-700 font-bold mb-1">Modalidade</label>
                  <select
                    value={manualDeliveryMethod}
                    onChange={(e) => setManualDeliveryMethod(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-black font-semibold text-xs"
                  >
                    <option value="motoboy">Motoboy Manaus</option>
                    <option value="retirada">Retirada Showroom</option>
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-700 font-bold mb-1">Consultora</label>
                  <select
                    value={manualAttendantId}
                    onChange={(e) => setManualAttendantId(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-black font-semibold text-xs"
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-neutral-700 font-bold mb-1">Bairro em Manaus</label>
                    <select
                      value={manualNeighborhood}
                      onChange={(e) => setManualNeighborhood(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-black text-xs"
                    >
                      {neighborhoods.map((n) => (
                        <option key={n.name} value={n.name}>
                          {n.name} ({formatCurrencyBRL(n.fee)})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-neutral-700 font-bold mb-1">Endereço Completo</label>
                    <input
                      type="text"
                      value={manualAddress}
                      onChange={(e) => setManualAddress(e.target.value)}
                      placeholder="Rua, número e condomínio..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-black text-xs"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-neutral-700 font-bold mb-1">Status Inicial no Kanban</label>
                <select
                  value={manualStatus}
                  onChange={(e) => setManualStatus(e.target.value as KanbanStatus)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-black font-semibold text-xs"
                >
                  <option value="Novo Lead">1. Novo Lead WhatsApp</option>
                  <option value="Em Atendimento">2. Em Atendimento</option>
                  <option value="Pagamento Confirmado">3. Pagamento Confirmado (PIX)</option>
                  <option value="Separando Estoque">4. Separando Estoque</option>
                  <option value="Saiu para Entrega">5. Saiu para Entrega / Retirada</option>
                </select>
              </div>

              <div>
                <label className="block text-neutral-700 font-bold mb-1">Notas Internas</label>
                <input
                  type="text"
                  value={manualNotes}
                  onChange={(e) => setManualNotes(e.target.value)}
                  placeholder="Ex: Pagamento confirmado via PIX no WhatsApp..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-black text-xs"
                />
              </div>

              <div className="flex justify-end gap-2.5 pt-3 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setIsAddOrderOpen(false)}
                  className="px-4 py-2 rounded-xl border border-neutral-200 text-neutral-600 font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-black hover:bg-neutral-800 text-white font-extrabold rounded-xl shadow-md transition-all"
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
