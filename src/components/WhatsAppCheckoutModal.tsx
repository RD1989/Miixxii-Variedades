'use client';

import React, { useState } from 'react';
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
  User,
  Phone,
  Clock,
  Sparkles,
} from 'lucide-react';
import { useStore } from '@/store/useStore';
import {
  formatCurrencyBRL,
  generateWhatsAppCheckoutUrl,
} from '@/data/mockData';

export const WhatsAppCheckoutModal: React.FC = () => {
  const {
    isWhatsAppModalOpen,
    closeWhatsAppModal,
    cart,
    customerName,
    setCustomerName,
    customerPhone,
    setCustomerPhone,
    deliverySelection,
    setDeliveryType,
    setDeliveryAddress,
    addAdminOrder,
    rotateAttendant,
    recordLeadClick,
    attendants,
    currentAttendantIndex,
  } = useStore();

  const [formError, setFormError] = useState('');

  if (!isWhatsAppModalOpen) return null;

  const activeAttendantsList = attendants && attendants.length > 0 ? attendants : [];
  const previewAttendant = activeAttendantsList[(currentAttendantIndex || 0) % (activeAttendantsList.length || 1)];

  const { subtotal, total } = generateWhatsAppCheckoutUrl(
    cart,
    customerName || undefined,
    customerPhone || undefined,
    deliverySelection,
    previewAttendant
  );

  const handleOpenWhatsAppOfficial = () => {
    // Basic validation: at least cart has items
    if (cart.length === 0) {
      alert('Sua sacola está vazia. Adicione ao menos um produto antes de finalizar.');
      return;
    }

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
      customerPhone || undefined,
      deliverySelection,
      attendant
    );

    // Register order in Admin dashboard Kanban
    const newOrderId = `#${Math.floor(1000 + Math.random() * 9000)}`;
    addAdminOrder({
      id: newOrderId,
      customer: customerName?.trim() || 'Cliente WhatsApp',
      customerPhone: customerPhone?.trim() || '(92) Não informado',
      itemsCount: cart.length,
      itemsList: cart
        .map((i) => `${i.quantity}x ${i.product.name} (Tam: ${i.selectedSize} • Cor: ${i.selectedColor.name})`)
        .join(', '),
      extraItemsBadge: cart.length > 2 ? `+${cart.length - 2}` : undefined,
      total: checkoutData.total,
      subtotal: checkoutData.subtotal,
      shippingFee: 0,
      deliveryMethod:
        deliverySelection.type === 'retirada'
          ? 'Retirada no Showroom'
          : 'Entrega Motoboy (Taxa a combinar)',
      neighborhood:
        deliverySelection.type === 'retirada'
          ? 'Showroom Manaus'
          : deliverySelection.deliveryAddress?.trim() || 'Manaus (A combinar)',
      deliveryAddress: deliverySelection.deliveryAddress || '',
      status: 'Novo Lead',
      statusBadge: 'bg-amber-50 text-amber-800 border-amber-200',
      attendantId: attendant.id as 'maria' | 'carlos',
      attendantName: attendant.name,
      date: 'Hoje',
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      notes: `Tamanhos e cores pré-selecionados pela cliente. Conferir grade física no rack antes de fechar o PIX.`,
    });

    // Open WhatsApp in new tab
    window.open(checkoutData.url, '_blank', 'noopener,noreferrer');
    closeWhatsAppModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Background click to close */}
      <div className="absolute inset-0" onClick={closeWhatsAppModal} />

      <div
        className="relative w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden border border-neutral-200 max-h-[94vh] sm:max-h-[90vh] flex flex-col animate-in slide-in-from-bottom sm:slide-in-from-bottom-0 sm:zoom-in-95 duration-200 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Drag Indicator */}
        <div className="sm:hidden w-12 h-1.5 bg-neutral-300 rounded-full mx-auto my-2 shrink-0" />

        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-neutral-100 bg-neutral-50/50 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xs">
              <MessageCircle className="w-4 h-4 fill-white" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base text-neutral-900 leading-tight">
                Finalizar Pedido via WhatsApp
              </h3>
              <span className="text-[11px] text-neutral-500 font-medium">
                Atendimento Rápido em Manaus - AM
              </span>
            </div>
          </div>

          <button
            onClick={closeWhatsAppModal}
            className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-500 hover:text-black flex items-center justify-center transition-colors active:scale-95"
            aria-label="Fechar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 text-xs">
          {/* Active Attendant Card (Shows Maria or Carlos rotating) */}
          <div className="w-full bg-neutral-50 rounded-2xl p-3 border border-neutral-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold text-xs shadow-xs">
                  {previewAttendant?.name?.charAt(0) || 'M'}
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white" />
              </div>
              <div>
                <span className="text-[10px] text-neutral-400 font-semibold block uppercase tracking-wider">
                  Consultora de Atendimento Oficial:
                </span>
                <span className="text-xs font-extrabold text-neutral-900">
                  {previewAttendant?.name} — {previewAttendant?.phoneDisplay}
                </span>
              </div>
            </div>

            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
              Online Agora
            </span>
          </div>

          {/* Form: Manual Customer Info */}
          <div className="space-y-3 bg-[#FAFAFC] p-4 rounded-2xl border border-neutral-200/80">
            <div className="flex items-center justify-between pb-1 border-b border-neutral-200/60">
              <span className="font-bold text-neutral-800 text-xs flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-neutral-600" />
                Seus Dados para o Pedido
              </span>
              <span className="text-[10px] text-neutral-400">Preenchimento rápido</span>
            </div>

            {/* Name Input */}
            <div>
              <label className="block text-neutral-700 font-bold mb-1 text-[11px]">
                Seu Nome Completo:
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Ex: Amanda Silva"
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-neutral-300 focus:outline-none focus:border-black bg-white font-medium"
              />
            </div>

            {/* Phone Input */}
            <div>
              <label className="block text-neutral-700 font-bold mb-1 text-[11px] flex items-center justify-between">
                <span>Seu WhatsApp / Telefone com DDD:</span>
                <span className="text-[10px] text-neutral-400 font-normal">Opcional</span>
              </label>
              <div className="relative">
                <Phone className="w-3.5 h-3.5 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="Ex: (92) 99124-5582"
                  className="w-full pl-9 pr-3.5 py-2.5 text-xs rounded-xl border border-neutral-300 focus:outline-none focus:border-black bg-white font-medium"
                />
              </div>
              <p className="text-[10px] text-neutral-400 mt-1">
                Ao clicar em enviar, sua mensagem abrirá automaticamente no seu WhatsApp com todas as peças.
              </p>
            </div>

            {/* Delivery Option Toggle */}
            <div className="pt-1 space-y-1.5">
              <label className="block text-neutral-700 font-bold text-[11px]">
                Como Deseja Receber em Manaus?
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setDeliveryType('motoboy')}
                  className={`p-3 rounded-xl border text-left flex flex-col gap-1 transition-all active:scale-95 ${
                    deliverySelection.type === 'motoboy'
                      ? 'bg-black text-white border-black shadow-xs'
                      : 'bg-white text-neutral-700 border-neutral-300 hover:border-neutral-400'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5" />
                    <span className="font-extrabold text-xs">Entrega em Manaus</span>
                  </div>
                  <span className={`text-[10px] ${deliverySelection.type === 'motoboy' ? 'text-neutral-300' : 'text-neutral-500'}`}>
                    Taxa combinada no WhatsApp
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryType('retirada')}
                  className={`p-3 rounded-xl border text-left flex flex-col gap-1 transition-all active:scale-95 ${
                    deliverySelection.type === 'retirada'
                      ? 'bg-black text-white border-black shadow-xs'
                      : 'bg-white text-neutral-700 border-neutral-300 hover:border-neutral-400'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <Store className="w-3.5 h-3.5" />
                    <span className="font-extrabold text-xs">Retirada no Showroom</span>
                  </div>
                  <span className={`text-[10px] ${deliverySelection.type === 'retirada' ? 'text-neutral-300' : 'text-emerald-700 font-bold'}`}>
                    Grátis com agendamento
                  </span>
                </button>
              </div>
            </div>

            {/* Manual Address Input (Clean & Free Text) */}
            {deliverySelection.type === 'motoboy' ? (
              <div className="pt-1 space-y-1">
                <label className="block text-neutral-700 font-bold text-[11px] flex items-center justify-between">
                  <span>Endereço e Bairro de Entrega:</span>
                  <span className="text-[10px] text-amber-600 font-semibold">Taxa a combinar</span>
                </label>
                <div className="relative">
                  <MapPin className="w-3.5 h-3.5 text-neutral-400 absolute left-3.5 top-3" />
                  <textarea
                    rows={2}
                    value={deliverySelection.deliveryAddress || ''}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="Ex: Rua Maceió, 450, Adrianópolis - Apto 302 (Próximo ao Manauara Shopping)"
                    className="w-full pl-9 pr-3.5 py-2.5 text-xs rounded-xl border border-neutral-300 focus:outline-none focus:border-black bg-white font-medium resize-none"
                  />
                </div>
                <p className="text-[10px] text-neutral-500 leading-tight">
                  💡 A taxa de entrega será combinada diretamente com a atendente no WhatsApp de acordo com seu bairro e distância.
                </p>
              </div>
            ) : (
              <div className="p-3 bg-neutral-100 rounded-xl border border-neutral-200 text-[11px] text-neutral-600 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-neutral-900">
                  <Store className="w-3.5 h-3.5 text-neutral-700" />
                  <span>Retirada Presencial no Showroom em Manaus</span>
                </div>
                <p className="text-[10px] text-neutral-500">
                  Após o envio do pedido no WhatsApp, nossa consultora reservará as peças para você experimentar e retirar no horário mais conveniente.
                </p>
              </div>
            )}
          </div>

          {/* Selected Products Summary (Shows Exact Size & Color Clearly) */}
          <div className="bg-white rounded-2xl p-4 border border-neutral-200 space-y-2.5">
            <div className="flex items-center justify-between text-xs font-bold text-neutral-800 pb-2 border-b border-neutral-200">
              <span className="flex items-center gap-1.5">
                <ShoppingBag className="w-4 h-4 text-neutral-700" />
                <span>Peças Selecionadas ({cart.length} {cart.length === 1 ? 'item' : 'itens'})</span>
              </span>
              <span className="text-base font-black text-black">
                {formatCurrencyBRL(subtotal)}
              </span>
            </div>

            {/* Items list with Size and Color badges */}
            <div className="max-h-44 overflow-y-auto space-y-2 text-xs text-neutral-700 pr-1 divide-y divide-neutral-100">
              {cart.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between gap-2.5 pt-2 first:pt-0">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="relative w-10 h-12 rounded-lg overflow-hidden bg-neutral-100 shrink-0 border border-neutral-200">
                      <Image
                        src={item.selectedColor.image || item.product.image}
                        alt={item.product.name}
                        fill
                        sizes="40px"
                        className="object-cover object-top"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-neutral-900 truncate leading-tight">
                        {item.product.name}
                      </p>
                      <div className="flex flex-wrap items-center gap-1.5 mt-1">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-neutral-100 border border-neutral-300 text-[10px] font-extrabold text-neutral-900">
                          Tam: {item.selectedSize}
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-neutral-50 border border-neutral-200 text-[10px] font-semibold text-neutral-700">
                          <span
                            className="w-2 h-2 rounded-full border border-black/20"
                            style={{ backgroundColor: item.selectedColor.hex }}
                          />
                          Cor: {item.selectedColor.name}
                        </span>
                        <span className="text-[10px] text-neutral-400">
                          • {item.quantity} un
                        </span>
                      </div>
                    </div>
                  </div>
                  <span className="font-extrabold text-neutral-900 shrink-0 text-right">
                    {formatCurrencyBRL(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Delivery Line */}
            <div className="pt-2 border-t border-neutral-200 flex justify-between text-xs text-neutral-600">
              <span>Taxa de Entrega:</span>
              <span className="font-bold text-neutral-900">
                {deliverySelection.type === 'retirada' ? 'Grátis (Retirada)' : 'A combinar no WhatsApp'}
              </span>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-1 space-y-2">
            <button
              onClick={handleOpenWhatsAppOfficial}
              className="w-full flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-extrabold text-sm py-3.5 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.01] active:scale-[0.99]"
            >
              <MessageCircle className="w-5 h-5 fill-white shrink-0" />
              <span>Enviar Pedido para {previewAttendant?.name} no WhatsApp</span>
              <ExternalLink className="w-4 h-4 text-white/80 shrink-0" />
            </button>

            <div className="flex items-center justify-center gap-3 text-[10px] text-neutral-400 pt-1">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Atendimento Oficial
              </span>
              <span>•</span>
              <span>Conferência de Estoque Imediata</span>
              <span>•</span>
              <span>Pagamento PIX ou Cartão</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
