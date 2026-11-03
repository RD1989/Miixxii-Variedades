'use client';

import React from 'react';
import Image from 'next/image';
import { X, Trash2, ShoppingBag, Plus, Minus, MessageCircle, ArrowLeft, RefreshCw } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { formatCurrencyBRL, calculateCartSubtotal } from '@/data/mockData';

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
  } = useStore();

  if (!isCartOpen) return null;

  const subtotal = calculateCartSubtotal(cart);

  const handleCheckout = () => {
    setIsCartOpen(false);
    openWhatsAppModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-[#F3D6E2] animate-in slide-in-from-right duration-250"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#F3D6E2] bg-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1 rounded-full text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors"
              aria-label="Voltar"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h2 className="font-bold text-base sm:text-lg text-gray-900">
              Meu Carrinho
            </h2>
            <span className="text-xs bg-pink-100 text-[#C8105D] font-bold px-2 py-0.5 rounded-full">
              {cart.reduce((a, b) => a + b.quantity, 0)} itens
            </span>
          </div>

          <div className="flex items-center gap-1">
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                title="Limpar Carrinho"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
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
              <div className="w-16 h-16 rounded-full bg-pink-50 flex items-center justify-center text-[#C8105D]">
                <ShoppingBag className="w-8 h-8 stroke-1" />
              </div>
              <h3 className="font-bold text-gray-800 text-base">Seu carrinho está vazio</h3>
              <p className="text-xs text-gray-500 max-w-xs">
                Explore nossas coleções plus size e adicione seus looks favoritos!
              </p>
              <button
                onClick={resetToDemoCart}
                className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-pink-100 text-[#C8105D] text-xs font-bold hover:bg-pink-200 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Restaurar Carrinho de Demonstração</span>
              </button>
            </div>
          ) : (
            cart.map((item, index) => {
              const lineTotal = item.product.price * item.quantity;

              return (
                <div
                  key={`${item.product.id}-${item.selectedSize}-${item.selectedColor.name}-${index}`}
                  className="bg-white rounded-2xl border border-[#F3D6E2] p-3 flex gap-3 shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Item Image */}
                  <div className="relative w-20 h-24 rounded-xl overflow-hidden bg-pink-50 shrink-0">
                    <Image
                      src={item.product.image}
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
                        <h4 className="font-bold text-xs sm:text-sm text-gray-800 line-clamp-1">
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
                          className="text-gray-300 hover:text-red-500 transition-colors p-0.5"
                          title="Remover item"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Variant Tags */}
                      <div className="flex items-center gap-2 mt-1 text-[11px] text-gray-500">
                        <span className="bg-gray-100 px-1.5 py-0.5 rounded font-semibold text-gray-700">
                          Tam: {item.selectedSize}
                        </span>
                        <span className="flex items-center gap-1">
                          Cor:
                          <span
                            className="inline-block w-2.5 h-2.5 rounded-full border border-gray-300"
                            style={{ backgroundColor: item.selectedColor.hex }}
                          />
                          {item.selectedColor.name}
                        </span>
                      </div>
                    </div>

                    {/* Quantity & Line Total */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-gray-200 rounded-full bg-gray-50 overflow-hidden">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.selectedSize,
                              item.selectedColor.name,
                              -1
                            )
                          }
                          className="w-6 h-6 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-gray-800">
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
                          className="w-6 h-6 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-sm font-bold text-[#C8105D]">
                        {formatCurrencyBRL(lineTotal)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer / Subtotal & Checkout */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-[#F3D6E2] bg-[#FDF4F7] space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-gray-700">Subtotal:</span>
              <span className="text-xl sm:text-2xl font-extrabold text-[#C8105D]">
                {formatCurrencyBRL(subtotal)}
              </span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full flex items-center justify-center gap-2 bg-[#C8105D] hover:bg-[#A8084A] text-white font-bold py-3.5 px-6 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>Finalizar Pedido</span>
            </button>

            <p className="text-[11px] text-center text-gray-500">
              Você será direcionada para o nosso WhatsApp para confirmar os detalhes do pedido e pagamento.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
