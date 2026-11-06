'use client';

import React, { useState } from 'react';
import {
  MessageCircle,
  X,
  ExternalLink,
  Smartphone,
  Send,
  Sparkles,
  Paperclip,
  MoreVertical,
  Phone,
  Video,
  Truck,
  Store,
  MapPin,
  Users2,
  RefreshCw,
} from 'lucide-react';
import { useStore } from '@/store/useStore';
import {
  generateWhatsAppCheckoutUrl,
  formatCurrencyBRL,
  MANAUS_NEIGHBORHOODS_LIST,
  WhatsAppAttendant,
} from '@/data/mockData';

export const WhatsAppCheckoutModal: React.FC = () => {
  const {
    cart,
    isWhatsAppModalOpen,
    closeWhatsAppModal,
    customerName,
    setCustomerName,
    deliverySelection,
    setDeliveryType,
    setSelectedNeighborhood,
    setDeliveryAddress,
    addAdminOrder,
    rotateAttendant,
    attendants,
    currentAttendantIndex,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'handoff' | 'chatSimulator'>('handoff');
  const [chatSent, setChatSent] = useState(false);

  // Selected attendant for this checkout modal view
  const activeAttendantsList = attendants && attendants.length > 0 ? attendants : [];
  const previewAttendant = activeAttendantsList[(currentAttendantIndex || 0) % (activeAttendantsList.length || 1)];

  if (!isWhatsAppModalOpen) return null;

  const { subtotal, shippingFee, total } = generateWhatsAppCheckoutUrl(
    cart,
    customerName || undefined,
    deliverySelection,
    previewAttendant
  );

  const handleOpenWhatsAppOfficial = () => {
    // Dynamic Rotation: picks current attendant and switches to next
    const attendant = rotateAttendant();

    const checkoutData = generateWhatsAppCheckoutUrl(
      cart,
      customerName || undefined,
      deliverySelection,
      attendant
    );

    // Register order in Admin dashboard simulation
    const newOrderId = `#${Math.floor(1000 + Math.random() * 9000)}`;
    addAdminOrder({
      id: newOrderId,
      customer: customerName || 'Cliente WhatsApp',
      itemsCount: cart.length,
      extraItemsBadge: cart.length > 2 ? `+${cart.length - 2}` : undefined,
      total: checkoutData.total,
      deliveryMethod:
        deliverySelection.type === 'retirada'
          ? 'Retirada na Loja'
          : `Motoboy (${deliverySelection.neighborhood?.name || 'Manaus'})`,
      status: 'Em Atendimento',
      statusBadge: 'bg-neutral-100 text-neutral-800',
    });

    // Open WhatsApp in new tab
    window.open(checkoutData.url, '_blank', 'noopener,noreferrer');
  };

  const handleSendInSimulator = () => {
    const attendant = rotateAttendant();
    setChatSent(true);
    const newOrderId = `#${Math.floor(1000 + Math.random() * 9000)}`;
    addAdminOrder({
      id: newOrderId,
      customer: customerName || 'Cliente WhatsApp',
      itemsCount: cart.length,
      extraItemsBadge: cart.length > 2 ? `+${cart.length - 2}` : undefined,
      total: total,
      deliveryMethod:
        deliverySelection.type === 'retirada'
          ? 'Retirada na Loja'
          : `Motoboy (${deliverySelection.neighborhood?.name || 'Manaus'})`,
      status: 'Em Atendimento',
      statusBadge: 'bg-neutral-100 text-neutral-800',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-neutral-200 max-h-[94vh] flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-neutral-200 bg-neutral-50">
          <div className="flex items-center gap-1 bg-white p-1 rounded-full border border-neutral-200 text-xs">
            <button
              onClick={() => setActiveTab('handoff')}
              className={`px-3 py-1 rounded-full font-bold transition-all ${
                activeTab === 'handoff'
                  ? 'bg-black text-white shadow-sm'
                  : 'text-neutral-600 hover:text-black'
              }`}
            >
              Etapa 4: Pedido
            </button>
            <button
              onClick={() => setActiveTab('chatSimulator')}
              className={`px-3 py-1 rounded-full font-bold transition-all ${
                activeTab === 'chatSimulator'
                  ? 'bg-[#075E54] text-white shadow-sm'
                  : 'text-neutral-600 hover:text-black'
              }`}
            >
              Etapa 5: Chat ao Vivo
            </button>
          </div>

          <button
            onClick={closeWhatsAppModal}
            className="w-8 h-8 rounded-full bg-white hover:bg-neutral-100 text-neutral-500 hover:text-black flex items-center justify-center shadow-sm transition-colors"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab 1: Screen 4 - Pedido via WhatsApp */}
        {activeTab === 'handoff' ? (
          <div className="p-5 sm:p-7 flex flex-col items-center text-center overflow-y-auto space-y-4">
            {/* Animated WhatsApp Icon */}
            <div className="relative">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-emerald-50 border-4 border-[#25D366]/30 flex items-center justify-center shadow-lg animate-pulse-subtle">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#25D366] flex items-center justify-center shadow-md">
                  <MessageCircle className="w-9 h-9 sm:w-11 sm:h-11 text-white fill-current" />
                </div>
              </div>
              <Sparkles className="w-5 h-5 text-emerald-500 absolute -top-1 -right-1 animate-bounce" />
            </div>

            {/* Title & Subtitle */}
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
                Finalizar Pedido via WhatsApp
              </h3>
              <p className="text-xs sm:text-sm text-neutral-500 mt-1 max-w-sm">
                Converse com a consultora da MIIXXIIE em Manaus para combinar a entrega ou retirada!
              </p>
            </div>

            {/* Dynamic Load Balancer Badge (Maria & Carlos) */}
            <div className="w-full bg-neutral-100/80 rounded-2xl p-2.5 border border-neutral-200 flex items-center justify-between text-left">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center font-bold text-xs">
                  {previewAttendant?.name?.charAt(0) || 'M'}
                </div>
                <div>
                  <span className="text-[10px] text-neutral-500 font-medium block">
                    Atendimento Dinâmico (Tráfego Equilibrado):
                  </span>
                  <span className="text-xs font-bold text-neutral-900">
                    {previewAttendant?.name} — {previewAttendant?.phoneDisplay}
                  </span>
                </div>
              </div>
              <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                Disponível
              </span>
            </div>

            {/* Customer Details Form */}
            <div className="w-full space-y-3 text-left">
              <div>
                <label className="block text-xs font-semibold text-neutral-800 mb-1">
                  Seu Nome:
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Ex: Amanda Silva"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-neutral-300 focus:outline-none focus:border-black bg-neutral-50"
                />
              </div>

              {/* Delivery Selection */}
              <div>
                <label className="block text-xs font-semibold text-neutral-800 mb-1.5">
                  Forma de Entrega em Manaus:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setDeliveryType('motoboy')}
                    className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                      deliverySelection.type === 'motoboy'
                        ? 'bg-black text-white border-black'
                        : 'bg-neutral-50 text-neutral-700 border-neutral-200'
                    }`}
                  >
                    <Truck className="w-3.5 h-3.5" />
                    <span>Motoboy (Frete)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryType('retirada')}
                    className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                      deliverySelection.type === 'retirada'
                        ? 'bg-black text-white border-black'
                        : 'bg-neutral-50 text-neutral-700 border-neutral-200'
                    }`}
                  >
                    <Store className="w-3.5 h-3.5" />
                    <span>Retirada (Grátis)</span>
                  </button>
                </div>
              </div>

              {/* Bairro & Endereço se Motoboy */}
              {deliverySelection.type === 'motoboy' && (
                <div className="space-y-2 p-3 bg-neutral-50 rounded-2xl border border-neutral-200">
                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                      Bairro de Manaus:
                    </label>
                    <select
                      value={deliverySelection.neighborhood?.name}
                      onChange={(e) => {
                        const neigh = MANAUS_NEIGHBORHOODS_LIST.find(
                          (n) => n.name === e.target.value
                        );
                        if (neigh) setSelectedNeighborhood(neigh);
                      }}
                      className="w-full text-xs bg-white border border-neutral-300 rounded-xl px-3 py-1.5 focus:outline-none focus:border-black"
                    >
                      {MANAUS_NEIGHBORHOODS_LIST.map((n) => (
                        <option key={n.name} value={n.name}>
                          {n.name} — {formatCurrencyBRL(n.fee)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                      Endereço / Ponto de Referência (opcional):
                    </label>
                    <input
                      type="text"
                      value={deliverySelection.deliveryAddress || ''}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      placeholder="Ex: Rua Maceió, próx. ao Shopping"
                      className="w-full px-3 py-1.5 text-xs bg-white border border-neutral-300 rounded-xl focus:outline-none focus:border-black"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary Box */}
            <div className="w-full bg-neutral-50 rounded-2xl p-3.5 border border-neutral-200 text-left space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-neutral-700 pb-2 border-b border-neutral-200">
                <span>Resumo do Pedido ({cart.length} itens):</span>
                <span className="text-black font-extrabold text-sm">
                  {formatCurrencyBRL(total)}
                </span>
              </div>

              <div className="max-h-24 overflow-y-auto space-y-1 text-[11px] text-neutral-600">
                {cart.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <span className="truncate max-w-[220px]">
                      {item.quantity}x {item.product.name} ({item.selectedSize} - {item.selectedColor.name})
                    </span>
                    <span className="font-semibold text-neutral-900">
                      {formatCurrencyBRL(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-neutral-200 flex justify-between text-xs text-neutral-700 font-medium">
                <span>
                  {deliverySelection.type === 'retirada'
                    ? 'Retirada na Loja Física:'
                    : `Taxa Motoboy (${deliverySelection.neighborhood?.name?.split('/')[0]}):`}
                </span>
                <span className="font-bold text-black">
                  {deliverySelection.type === 'retirada'
                    ? 'Grátis'
                    : formatCurrencyBRL(shippingFee)}
                </span>
              </div>
            </div>

            {/* Open WhatsApp CTA Button */}
            <div className="w-full space-y-2 pt-1">
              <button
                onClick={handleOpenWhatsAppOfficial}
                className="w-full flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-extrabold text-sm sm:text-base py-3.5 px-6 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>Conversar com {previewAttendant?.name} no WhatsApp</span>
                <ExternalLink className="w-4 h-4 text-white/80" />
              </button>

              <button
                onClick={() => setActiveTab('chatSimulator')}
                className="w-full py-2 text-xs text-neutral-600 hover:text-black font-semibold flex items-center justify-center gap-1.5 hover:underline"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Ver Demonstração de Chat Simulada</span>
              </button>
            </div>
          </div>
        ) : (
          /* Tab 2: Simulated WhatsApp Chat */
          <div className="flex flex-col flex-1 bg-[#ECE5DD] overflow-hidden">
            {/* WhatsApp Topbar */}
            <div className="bg-[#075E54] text-white px-4 py-3 flex items-center justify-between shadow-md">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full bg-white border border-neutral-300 overflow-hidden flex items-center justify-center text-black font-bold text-xs">
                  {previewAttendant?.name?.charAt(0) || 'MX'}
                </div>
                <div>
                  <h4 className="font-bold text-sm leading-tight flex items-center gap-1.5">
                    <span>MIIXXIIE • {previewAttendant?.name}</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span>
                  </h4>
                  <span className="text-[11px] text-emerald-200">
                    Online • {previewAttendant?.phoneDisplay}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-white/90">
                <Video className="w-4 h-4 cursor-pointer hover:text-white" />
                <Phone className="w-4 h-4 cursor-pointer hover:text-white" />
                <MoreVertical className="w-4 h-4 cursor-pointer hover:text-white" />
              </div>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs leading-relaxed">
              <div className="flex justify-center">
                <span className="bg-white/80 shadow-sm px-3 py-1 rounded-full text-[10px] text-gray-600 font-medium">
                  HOJE EM MANAUS
                </span>
              </div>

              {/* Message 1: Store Greeting */}
              <div className="flex justify-start">
                <div className="max-w-[85%] bg-white rounded-2xl rounded-tl-sm p-3 shadow-sm text-gray-800 space-y-1">
                  <p>
                    Olá! Meu nome é <strong>{previewAttendant?.name}</strong>, consultora da <strong>MIIXXIIE Variedades</strong> em Manaus! 🌸
                  </p>
                  <p>
                    Tire todas as suas dúvidas sobre caimento, medidas e combinamos a entrega por motoboy ou retirada! ✨
                  </p>
                  <span className="block text-[9px] text-gray-400 text-right">11:24</span>
                </div>
              </div>

              {/* Message 2: Customer Order */}
              <div className="flex justify-end">
                <div className="max-w-[88%] bg-[#DCF8C6] rounded-2xl rounded-tr-sm p-3 shadow-sm text-gray-800 space-y-2 border border-emerald-100">
                  <p className="font-semibold text-emerald-900">
                    Gostaria de confirmar o meu pedido:
                  </p>
                  <div className="text-[11px] whitespace-pre-wrap font-mono bg-white/50 p-2 rounded-lg">
                    {cart.map((item, i) => (
                      <div key={i} className="mb-1">
                        • {item.quantity}x {item.product.name} ({item.selectedSize} - {item.selectedColor.name})
                      </div>
                    ))}
                    <div className="mt-1 pt-1 border-t border-gray-200 text-emerald-900">
                      Entrega: {deliverySelection.type === 'retirada' ? 'Retirada na Loja (Grátis)' : `Motoboy (${deliverySelection.neighborhood?.name}) - ${formatCurrencyBRL(shippingFee)}`}
                    </div>
                    <div className="font-bold pt-1 text-emerald-950">
                      Total: {formatCurrencyBRL(total)}
                    </div>
                  </div>
                  <span className="block text-[9px] text-emerald-700 text-right">
                    11:25 ✔✔
                  </span>
                </div>
              </div>

              {/* Message 3: Store Confirmation Response */}
              <div className="flex justify-start">
                <div className="max-w-[85%] bg-white rounded-2xl rounded-tl-sm p-3 shadow-sm text-gray-800 space-y-1">
                  <p>
                    Maravilha! Já confirmamos a disponibilidade das peças no estoque físico de Manaus! 😊
                  </p>
                  <p>
                    {deliverySelection.type === 'retirada'
                      ? 'Seu look estará disponível para retirada em nossa loja!'
                      : `Nosso motoboy já está pronto para realizar o envio para o bairro ${deliverySelection.neighborhood?.name?.split('/')[0]}!`}
                  </p>
                  <span className="block text-[9px] text-gray-400 text-right">11:26</span>
                </div>
              </div>
            </div>

            {/* Simulated Chat Input Bar */}
            <div className="bg-[#F0F0F0] px-3 py-2 flex items-center gap-2 border-t border-gray-200">
              <Paperclip className="w-5 h-5 text-gray-500 cursor-pointer" />
              <input
                type="text"
                placeholder="Digite uma mensagem..."
                className="flex-1 bg-white rounded-full px-4 py-2 text-xs focus:outline-none border border-gray-300"
                defaultValue="Obrigada pelo atendimento excelente!"
              />
              <button
                onClick={handleSendInSimulator}
                className="w-8 h-8 rounded-full bg-[#075E54] text-white flex items-center justify-center hover:bg-[#128C7E] transition-colors"
                title="Enviar"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
