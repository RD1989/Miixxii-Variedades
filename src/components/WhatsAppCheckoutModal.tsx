'use client';

import React from 'react';
import Image from 'next/image';
import {
  X,
  MessageCircle,
  Truck,
  Store,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  ExternalLink,
  ShoppingBag,
} from 'lucide-react';
import { useStore } from '@/store/useStore';
import {
  formatCurrencyBRL,
  generateWhatsAppCheckoutUrl,
  MANAUS_NEIGHBORHOODS_LIST,
  ManausNeighborhood,
} from '@/data/mockData';

export const WhatsAppCheckoutModal: React.FC = () => {
  const {
    isWhatsAppModalOpen,
    closeWhatsAppModal,
    cart,
    customerName,
    setCustomerName,
    deliverySelection,
    setDeliveryType,
    setSelectedNeighborhood,
    setDeliveryAddress,
    addAdminOrder,
    rotateAttendant,
    recordLeadClick,
    attendants,
    currentAttendantIndex,
  } = useStore();

  if (!isWhatsAppModalOpen) return null;

  const activeAttendantsList = attendants && attendants.length > 0 ? attendants : [];
  const previewAttendant = activeAttendantsList[(currentAttendantIndex || 0) % (activeAttendantsList.length || 1)];

  const { subtotal, shippingFee, total } = generateWhatsAppCheckoutUrl(
    cart,
    customerName || undefined,
    deliverySelection,
    previewAttendant
  );

  const handleOpenWhatsAppOfficial = () => {
    // Dynamic Rotation: picks current attendant and switches to next
    const attendant = rotateAttendant();

    recordLeadClick({
      attendantId: attendant.id as 'maria' | 'carlos',
      attendantName: attendant.name,
      source: 'checkout_modal',
      productName: cart[0]?.product.name || 'Pedido Catálogo Virtual',
    });

    const checkoutData = generateWhatsAppCheckoutUrl(
      cart,
      customerName || undefined,
      deliverySelection,
      attendant
    );

    // Register order in Admin dashboard Kanban
    const newOrderId = `#${Math.floor(1000 + Math.random() * 9000)}`;
    addAdminOrder({
      id: newOrderId,
      customer: customerName || 'Cliente WhatsApp',
      customerPhone: '',
      itemsCount: cart.length,
      itemsList: cart
        .map((i) => `${i.quantity}x ${i.product.name} (${i.selectedSize} - ${i.selectedColor.name})`)
        .join(', '),
      extraItemsBadge: cart.length > 2 ? `+${cart.length - 2}` : undefined,
      total: checkoutData.total,
      subtotal: checkoutData.subtotal,
      shippingFee: checkoutData.shippingFee,
      deliveryMethod:
        deliverySelection.type === 'retirada'
          ? 'Retirada na Loja'
          : `Motoboy (${deliverySelection.neighborhood?.name || 'Manaus'})`,
      neighborhood: deliverySelection.neighborhood?.name || 'Manaus',
      deliveryAddress: deliverySelection.deliveryAddress || '',
      status: 'Novo Lead',
      statusBadge: 'bg-amber-50 text-amber-800 border-amber-200',
      attendantId: attendant.id as 'maria' | 'carlos',
      attendantName: attendant.name,
      date: 'Hoje',
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    });

    // Open WhatsApp in new tab
    window.open(checkoutData.url, '_blank', 'noopener,noreferrer');
    closeWhatsAppModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-neutral-200 max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100 bg-neutral-50/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xs">
              <MessageCircle className="w-4 h-4 fill-white" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base text-neutral-900 leading-tight">
                Finalizar Pedido via WhatsApp
              </h3>
              <span className="text-[11px] text-neutral-500 font-medium">
                Atendimento Oficial em Manaus - AM
              </span>
            </div>
          </div>

          <button
            onClick={closeWhatsAppModal}
            className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-500 hover:text-black flex items-center justify-center transition-colors"
            aria-label="Fechar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs">
          {/* Active Attendant Card */}
          <div className="w-full bg-neutral-50 rounded-2xl p-3 border border-neutral-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold text-xs">
                  {previewAttendant?.name?.charAt(0) || 'M'}
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white" />
              </div>
              <div>
                <span className="text-[10px] text-neutral-400 font-semibold block uppercase tracking-wider">
                  Sua Consultora Dedicada:
                </span>
                <span className="text-xs font-extrabold text-neutral-900">
                  {previewAttendant?.name} — {previewAttendant?.phoneDisplay}
                </span>
              </div>
            </div>

            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
              Online
            </span>
          </div>

          {/* Customer Name */}
          <div>
            <label className="block text-neutral-800 font-bold mb-1">
              Seu Nome (opcional):
            </label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Ex: Amanda Silva"
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-neutral-300 focus:outline-none focus:border-black bg-neutral-50/70"
            />
          </div>

          {/* Delivery Method Selection */}
          <div className="space-y-1.5">
            <label className="block text-neutral-800 font-bold">
              Forma de Entrega em Manaus:
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setDeliveryType('motoboy')}
                className={`p-3 rounded-2xl border text-left flex items-center gap-2 transition-all ${
                  deliverySelection.type === 'motoboy'
                    ? 'bg-black text-white border-black shadow-xs'
                    : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:bg-neutral-100'
                }`}
              >
                <Truck className="w-4 h-4 shrink-0" />
                <div>
                  <span className="block font-bold text-xs">Motoboy Express</span>
                  <span className={`text-[10px] ${deliverySelection.type === 'motoboy' ? 'text-neutral-300' : 'text-neutral-500'}`}>
                    Taxa por bairro
                  </span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setDeliveryType('retirada')}
                className={`p-3 rounded-2xl border text-left flex items-center gap-2 transition-all ${
                  deliverySelection.type === 'retirada'
                    ? 'bg-black text-white border-black shadow-xs'
                    : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:bg-neutral-100'
                }`}
              >
                <Store className="w-4 h-4 shrink-0" />
                <div>
                  <span className="block font-bold text-xs">Retirada na Loja</span>
                  <span className={`text-[10px] ${deliverySelection.type === 'retirada' ? 'text-neutral-300' : 'text-neutral-500'}`}>
                    Showroom (Grátis)
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* Neighborhood Selector if Motoboy */}
          {deliverySelection.type === 'motoboy' && (
            <div className="p-3.5 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-2.5 animate-in fade-in-50">
              <div>
                <label className="block text-[11px] font-bold text-neutral-800 mb-1 flex items-center justify-between">
                  <span>Selecione seu Bairro:</span>
                  <span className="text-emerald-700 font-extrabold text-xs">
                    {deliverySelection.neighborhood
                      ? formatCurrencyBRL(deliverySelection.neighborhood.fee)
                      : 'A combinar'}
                  </span>
                </label>
                <select
                  value={deliverySelection.neighborhood?.name || ''}
                  onChange={(e) => {
                    const neigh = MANAUS_NEIGHBORHOODS_LIST.find((n) => n.name === e.target.value);
                    if (neigh) setSelectedNeighborhood(neigh);
                  }}
                  className="w-full px-3 py-2 text-xs bg-white border border-neutral-300 rounded-xl focus:outline-none focus:border-black font-medium"
                >
                  {MANAUS_NEIGHBORHOODS_LIST.map((n) => (
                    <option key={n.name} value={n.name}>
                      {n.name} — {formatCurrencyBRL(n.fee)} ({n.time})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-neutral-800 mb-1">
                  Endereço / Ponto de Referência (opcional):
                </label>
                <input
                  type="text"
                  value={deliverySelection.deliveryAddress || ''}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder="Ex: Rua Maceió, condomínio tal, apto 302..."
                  className="w-full px-3 py-2 text-xs bg-white border border-neutral-300 rounded-xl focus:outline-none focus:border-black"
                />
              </div>
            </div>
          )}

          {/* Order Summary Box */}
          <div className="bg-neutral-50 rounded-2xl p-4 border border-neutral-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-neutral-800 pb-2 border-b border-neutral-200">
              <span className="flex items-center gap-1.5">
                <ShoppingBag className="w-3.5 h-3.5 text-neutral-700" />
                <span>Resumo ({cart.length} itens)</span>
              </span>
              <span className="text-base font-extrabold text-black">
                {formatCurrencyBRL(total)}
              </span>
            </div>

            {/* Items scroll */}
            <div className="max-h-24 overflow-y-auto space-y-1 text-[11px] text-neutral-600 pr-1">
              {cart.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <span className="truncate max-w-[240px]">
                    {item.quantity}x {item.product.name} ({item.selectedSize} - {item.selectedColor.name})
                  </span>
                  <span className="font-semibold text-neutral-900">
                    {formatCurrencyBRL(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Delivery Fee Line */}
            <div className="pt-2 border-t border-neutral-200 flex justify-between text-xs text-neutral-700">
              <span>
                {deliverySelection.type === 'retirada'
                  ? 'Retirada no Showroom:'
                  : `Frete Motoboy (${deliverySelection.neighborhood?.name?.split('/')[0] || 'Manaus'}):`}
              </span>
              <span className="font-bold text-black">
                {deliverySelection.type === 'retirada' ? 'Grátis' : formatCurrencyBRL(shippingFee)}
              </span>
            </div>
          </div>

          {/* Big Action Button */}
          <div className="pt-2 space-y-2">
            <button
              onClick={handleOpenWhatsAppOfficial}
              className="w-full flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-extrabold text-sm py-3.5 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.01] active:scale-[0.99]"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>Enviar Pedido para {previewAttendant?.name} no WhatsApp</span>
              <ExternalLink className="w-4 h-4 text-white/80" />
            </button>

            <div className="flex items-center justify-center gap-4 text-[10px] text-neutral-400 pt-1">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Compra 100% Segura
              </span>
              <span>•</span>
              <span>Pagamento no ato da entrega (PIX ou Cartão)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
