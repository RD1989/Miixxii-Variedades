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
} from 'lucide-react';
import { useStore } from '@/store/useStore';
import {
  generateWhatsAppCheckoutUrl,
  formatCurrencyBRL,
} from '@/data/mockData';

export const WhatsAppCheckoutModal: React.FC = () => {
  const {
    cart,
    isWhatsAppModalOpen,
    closeWhatsAppModal,
    customerName,
    setCustomerName,
    addAdminOrder,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'handoff' | 'chatSimulator'>('handoff');
  const [chatSent, setChatSent] = useState(false);

  if (!isWhatsAppModalOpen) return null;

  const { url, subtotal } = generateWhatsAppCheckoutUrl(
    cart,
    customerName || undefined
  );

  const handleOpenWhatsAppOfficial = () => {
    // Register order in Admin dashboard simulation
    const newOrderId = `#${Math.floor(1000 + Math.random() * 9000)}`;
    addAdminOrder({
      id: newOrderId,
      customer: customerName || 'Cliente WhatsApp',
      itemsCount: cart.length,
      extraItemsBadge: cart.length > 2 ? `+${cart.length - 2}` : undefined,
      total: subtotal,
      status: 'Em Atendimento',
      statusBadge: 'bg-neutral-100 text-neutral-800',
    });

    // Open WhatsApp in new tab
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleSendInSimulator = () => {
    setChatSent(true);
    const newOrderId = `#${Math.floor(1000 + Math.random() * 9000)}`;
    addAdminOrder({
      id: newOrderId,
      customer: customerName || 'Cliente WhatsApp',
      itemsCount: cart.length,
      extraItemsBadge: cart.length > 2 ? `+${cart.length - 2}` : undefined,
      total: subtotal,
      status: 'Em Atendimento',
      statusBadge: 'bg-neutral-100 text-neutral-800',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-neutral-200 max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-neutral-200 bg-neutral-50">
          {/* Tabs for client presentation */}
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
          <div className="p-6 sm:p-8 flex flex-col items-center text-center overflow-y-auto">
            {/* Animated WhatsApp Icon Container */}
            <div className="relative mb-5">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-emerald-50 border-4 border-[#25D366]/30 flex items-center justify-center shadow-lg animate-pulse-subtle">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#25D366] flex items-center justify-center shadow-md">
                  <MessageCircle className="w-11 h-11 sm:w-13 sm:h-13 text-white fill-current" />
                </div>
              </div>
              <Sparkles className="w-6 h-6 text-emerald-500 absolute -top-1 -right-1 animate-bounce" />
            </div>

            {/* Title & Subtitle */}
            <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
              Pedido via WhatsApp
            </h3>
            <p className="text-sm sm:text-base text-neutral-600 mt-1 max-w-xs">
              Agora é só conversar com nossa equipe em Manaus!
            </p>

            {/* Optional Customer Name Personalization */}
            <div className="w-full max-w-sm mt-5 text-left">
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Seu Nome (opcional para atendimento personalizado):
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Ex: Juliana Silva"
                className="w-full px-4 py-2 text-xs rounded-xl border border-neutral-300 focus:outline-none focus:border-black focus:ring-1 focus:ring-black bg-neutral-50"
              />
            </div>

            {/* Order Summary Box */}
            <div className="w-full max-w-sm bg-neutral-50 rounded-2xl p-4 my-5 border border-neutral-200 text-left space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-neutral-700 pb-2 border-b border-neutral-200">
                <span>Resumo ({cart.length} itens):</span>
                <span className="text-black font-extrabold text-sm">
                  {formatCurrencyBRL(subtotal)}
                </span>
              </div>
              <div className="max-h-24 overflow-y-auto space-y-1.5 text-[11px] text-neutral-600 pr-1">
                {cart.map((item, idx) => (
                  <div key={idx} className="flex justify-between">
                    <span className="truncate max-w-[200px]">
                      {item.quantity}x {item.product.name} ({item.selectedSize})
                    </span>
                    <span className="font-semibold text-neutral-900">
                      {formatCurrencyBRL(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Open WhatsApp Button */}
            <div className="w-full max-w-sm space-y-2.5">
              <button
                onClick={handleOpenWhatsAppOfficial}
                className="w-full flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-extrabold text-base py-4 px-6 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>Abrir WhatsApp</span>
                <ExternalLink className="w-4 h-4 text-white/80" />
              </button>

              <button
                onClick={() => setActiveTab('chatSimulator')}
                className="w-full py-2.5 text-xs text-neutral-600 hover:text-black font-semibold flex items-center justify-center gap-1.5 hover:underline"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Ver Demonstração de Chat Simulada</span>
              </button>
            </div>
          </div>
        ) : (
          /* Tab 2: Screen 5 - Simulated WhatsApp Chat (Etapa 5) */
          <div className="flex flex-col flex-1 bg-[#ECE5DD] overflow-hidden">
            {/* WhatsApp Topbar */}
            <div className="bg-[#075E54] text-white px-4 py-3 flex items-center justify-between shadow-md">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full bg-white border border-neutral-300 overflow-hidden flex items-center justify-center text-black font-bold text-xs">
                  MX
                </div>
                <div>
                  <h4 className="font-bold text-sm leading-tight flex items-center gap-1.5">
                    <span>MIIXXIIE Variedades</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span>
                  </h4>
                  <span className="text-[11px] text-emerald-200">Online</span>
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
              {/* WhatsApp Date pill */}
              <div className="flex justify-center">
                <span className="bg-white/80 shadow-sm px-3 py-1 rounded-full text-[10px] text-gray-600 font-medium">
                  HOJE
                </span>
              </div>

              {/* Message 1: Store Greeting */}
              <div className="flex justify-start">
                <div className="max-w-[85%] bg-white rounded-2xl rounded-tl-sm p-3 shadow-sm text-gray-800 space-y-1">
                  <p>
                    Olá! Seja muito bem-vinda à <strong>MIIXXIIE Variedades</strong>!
                  </p>
                  <p>Qualquer dúvida sobre tamanhos, tecidos ou entrega em Manaus estou por aqui. ✨</p>
                  <span className="block text-[9px] text-gray-400 text-right">11:24</span>
                </div>
              </div>

              {/* Message 2: Customer Order (Interactive or Sent) */}
              <div className="flex justify-end">
                <div className="max-w-[88%] bg-[#DCF8C6] rounded-2xl rounded-tr-sm p-3 shadow-sm text-gray-800 space-y-2 border border-emerald-100">
                  <p className="font-semibold text-emerald-900">
                    Gostaria de confirmar o meu pedido:
                  </p>
                  <div className="text-[11px] whitespace-pre-wrap font-mono bg-white/50 p-2 rounded-lg">
                    {cart.map((item, i) => (
                      <div key={i} className="mb-1">
                        • {item.quantity}x {item.product.name} ({item.selectedSize}) - {formatCurrencyBRL(item.product.price * item.quantity)}
                      </div>
                    ))}
                    <div className="font-bold border-t border-gray-200 pt-1 text-emerald-950">
                      Total: {formatCurrencyBRL(subtotal)}
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
                    Perfeito! Vou confirmar seu pedido agora. 😊
                  </p>
                  <p>
                    Muito obrigada por comprar conosco! Já estamos separando seu look para entrega expressa em Manaus. 🤍
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
                defaultValue="Obrigada pelo atendimento!"
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
