'use client';

import React from 'react';
import { X, Sparkles, CheckCircle, ArrowRight } from 'lucide-react';
import { useStore } from '@/store/useStore';

export const InfoModal: React.FC = () => {
  const { infoModal, closeInfoModal, openWhatsAppModal } = useStore();

  if (!infoModal.isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 border border-[#F3D6E2] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeInfoModal}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-800 flex items-center justify-center transition-colors"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-3">
          <div className="w-9 h-9 rounded-full bg-pink-100 flex items-center justify-center text-[#C8105D]">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-lg text-gray-900">{infoModal.title}</h3>
        </div>

        <p className="text-sm text-gray-600 leading-relaxed mb-6">
          {infoModal.description}
        </p>

        <div className="flex items-center justify-end gap-2">
          <button
            onClick={closeInfoModal}
            className="px-4 py-2 rounded-full text-xs font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
          >
            Fechar
          </button>
          <button
            onClick={() => {
              closeInfoModal();
              openWhatsAppModal();
            }}
            className="px-5 py-2 rounded-full text-xs font-bold bg-[#C8105D] text-white hover:bg-[#A8084A] transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <span>Falar no WhatsApp</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
