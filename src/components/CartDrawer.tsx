'use client';

import React from 'react';
import Image from 'next/image';
import {
  X,
  Trash2,
  ShoppingBag,
  Plus,
  Minus,
  MessageCircle,
  ArrowLeft,
  RefreshCw,
  Truck,
  Store,
  MapPin,
} from 'lucide-react';
import { useStore } from '@/store/useStore';
import {
  formatCurrencyBRL,
  calculateCartSubtotal,
  MANAUS_NEIGHBORHOODS_LIST,
} from '@/data/mockData';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
    resetToDemoCart,
    openWhatsAppModal,
    deliverySelection,
    setDeliveryType,
    setSelectedNeighborhood,
  } = useStore();

  if (!isCartOpen) return null;

  const subtotal = calculateCartSubtotal(cart);
  const shippingFee =
    deliverySelection.type === 'motoboy' && deliverySelection.neighborhood
      ? deliverySelection.neighborhood.fee
      : 0;
  const total = subtotal + shippingFee;

  const handleCheckout = () => {
    setIsCartOpen(false);
    openWhatsAppModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-neutral-200 animate-in slide-in-from-right duration-250"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-neutral-200 bg-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1 rounded-full text-neutral-500 hover:text-black hover:bg-neutral-100 transition-colors"
              aria-label="Voltar"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h2 className="font-bold text-base sm:text-lg text-neutral-900">
              Meu Carrinho
            </h2>
            <span className="text-xs bg-black text-white font-bold px-2 py-0.5 rounded-full">
              {cart.reduce((a, b) => a + b.quantity, 0)} itens
            </span>
          </div>

          <div className="flex items-center gap-1">
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                title="Limpar Carrinho"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
              aria-label="Fechar carrinho"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-700">
                <ShoppingBag className="w-8 h-8 stroke-1" />
              </div>
              <h3 className="font-bold text-neutral-800 text-base">Seu carrinho está vazio</h3>
              <p className="text-xs text-neutral-500 max-w-xs">
                Explore o mostruário real de Manaus e adicione seus looks favoritos!
              </p>
              <button
                onClick={resetToDemoCart}
                className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-neutral-100 text-black text-xs font-bold hover:bg-neutral-200 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Restaurar Carrinho de Demonstração</span>
              </button>
            </div>
          ) : (
            <>
              {cart.map((item, index) => {
                const lineTotal = item.product.price * item.quantity;
                const itemImg = item.selectedColor.image || item.product.image;

                return (
                  <div
                    key={`${item.product.id}-${item.selectedSize}-${item.selectedColor.name}-${index}`}
                    className="bg-white rounded-2xl border border-neutral-200 p-3 flex gap-3 shadow-xs hover:shadow-md transition-shadow"
                  >
                    {/* Item Image */}
                    <div className="relative w-20 h-24 rounded-xl overflow-hidden bg-neutral-100 shrink-0 border border-neutral-200">
                      <Image
                        src={itemImg}
                        alt={item.product.name}
                        fill
                        sizes="80px"
                        className="object-cover object-top"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-1">
                          <h4 className="font-bold text-xs sm:text-sm text-neutral-900 line-clamp-1">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() =>
                              removeFromCart(
                                item.product.id,
                                item.selectedSize,
                                item.selectedColor.name
                              )
                            }
                            className="text-neutral-300 hover:text-red-500 transition-colors p-0.5"
                            title="Remover item"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Variant Tags */}
                        <div className="flex items-center gap-2 mt-1 text-[11px] text-neutral-500">
                          <span className="bg-neutral-100 px-1.5 py-0.5 rounded font-bold text-neutral-900">
                            Tam: {item.selectedSize}
                          </span>
                          <span className="flex items-center gap-1">
                            Cor:
                            <span
                              className="inline-block w-2.5 h-2.5 rounded-full border border-neutral-300"
                              style={{ backgroundColor: item.selectedColor.hex }}
                            />
                            {item.selectedColor.name}
                          </span>
                        </div>
                      </div>

                      {/* Quantity & Line Total */}
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center border border-neutral-200 rounded-full bg-neutral-50 overflow-hidden">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.selectedSize,
                                item.selectedColor.name,
                                -1
                              )
                            }
                            className="w-6 h-6 flex items-center justify-center text-neutral-600 hover:bg-neutral-200 transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-bold text-neutral-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.selectedSize,
                                item.selectedColor.name,
                                1
                              )
                            }
                            className="w-6 h-6 flex items-center justify-center text-neutral-600 hover:bg-neutral-200 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="text-sm font-bold text-black">
                          {formatCurrencyBRL(lineTotal)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Local Manaus Delivery Options in Cart Drawer */}
              <div className="bg-neutral-50 rounded-2xl border border-neutral-200 p-3.5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-900 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-neutral-700" />
                    <span>Opções de Entrega em Manaus:</span>
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setDeliveryType('motoboy')}
                    className={`p-2.5 rounded-xl border text-left flex flex-col gap-1 transition-all ${
                      deliverySelection.type === 'motoboy'
                        ? 'border-black bg-white ring-1 ring-black shadow-xs'
                        : 'border-neutral-200 bg-white/50 hover:bg-white text-neutral-600'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold text-xs text-neutral-900">
                      <Truck className="w-3.5 h-3.5" />
                      <span>Motoboy</span>
                    </div>
                    <span className="text-[10px] text-neutral-500">
                      Frete por bairro
                    </span>
                  </button>

                  <button
                    onClick={() => setDeliveryType('retirada')}
                    className={`p-2.5 rounded-xl border text-left flex flex-col gap-1 transition-all ${
                      deliverySelection.type === 'retirada'
                        ? 'border-black bg-white ring-1 ring-black shadow-xs'
                        : 'border-neutral-200 bg-white/50 hover:bg-white text-neutral-600'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold text-xs text-neutral-900">
                      <Store className="w-3.5 h-3.5" />
                      <span>Retirada</span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-700">
                      Grátis (Manaus)
                    </span>
                  </button>
                </div>

                {deliverySelection.type === 'motoboy' && (
                  <div className="space-y-1.5 pt-1">
                    <label className="text-[11px] font-semibold text-neutral-700 block">
                      Selecione o Bairro de Entrega em Manaus:
                    </label>
                    <select
                      value={deliverySelection.neighborhood?.name}
                      onChange={(e) => {
                        const neigh = MANAUS_NEIGHBORHOODS_LIST.find(
                          (n) => n.name === e.target.value
                        );
                        if (neigh) setSelectedNeighborhood(neigh);
                      }}
                      className="w-full text-xs font-medium bg-white border border-neutral-300 rounded-xl px-3 py-2 text-neutral-900 focus:outline-none focus:border-black"
                    >
                      {MANAUS_NEIGHBORHOODS_LIST.map((n) => (
                        <option key={n.name} value={n.name}>
                          {n.name} — {formatCurrencyBRL(n.fee)} ({n.time})
                        </option>
                      ))}
                    </select>
                    <p className="text-[10px] text-neutral-500 leading-tight">
                      * O valor exato pode ser confirmado ou ajustado diretamente pelo WhatsApp com o motoboy.
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Footer / Subtotal, Shipping & Checkout */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-neutral-200 bg-neutral-50 space-y-3">
            <div className="space-y-1.5 text-xs text-neutral-600 border-b border-neutral-200 pb-3">
              <div className="flex items-center justify-between">
                <span>Subtotal dos Produtos:</span>
                <span className="font-semibold text-neutral-900">
                  {formatCurrencyBRL(subtotal)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-neutral-500" />
                  {deliverySelection.type === 'retirada'
                    ? 'Retirada na Loja:'
                    : `Frete (${deliverySelection.neighborhood?.zone || 'Manaus'}):`}
                </span>
                <span className="font-semibold text-neutral-900">
                  {deliverySelection.type === 'retirada'
                    ? 'Grátis'
                    : formatCurrencyBRL(shippingFee)}
                </span>
              </div>
              <div className="flex items-center justify-between pt-1 font-bold text-sm text-neutral-900">
                <span>Total Estimado:</span>
                <span className="text-xl font-extrabold text-black">
                  {formatCurrencyBRL(total)}
                </span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full flex items-center justify-center gap-2 bg-black hover:bg-neutral-800 text-white font-bold py-3.5 px-6 rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>Confirmar Pedido via WhatsApp</span>
            </button>

            <p className="text-[11px] text-center text-neutral-500">
              Atendimento exclusivo para Manaus - AM. Pedido enviado diretamente para o WhatsApp oficial da loja.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
