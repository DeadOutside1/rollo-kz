import React, { useState } from 'react';
import { Phone, MessageCircle, Calculator, X } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';
import { trackPhoneClick, trackWhatsAppClick } from '../lib/analytics';

interface FloatingCallButtonProps {
  onScrollToCalculator: () => void;
}

export const FloatingCallButton: React.FC<FloatingCallButtonProps> = ({ onScrollToCalculator }) => {
  const [showDesktopMenu, setShowDesktopMenu] = useState(false);

  const handlePhone = () => {
    trackPhoneClick();
  };

  const handleWhatsApp = () => {
    trackWhatsAppClick();
  };

  return (
    <>
      {/* 1. Desktop Floating Widget (bottom right) */}
      <div className="hidden md:block fixed bottom-6 right-6 z-40">
        {showDesktopMenu && (
          <div className="mb-3 bg-white rounded-2xl shadow-xl border border-gray-100 p-3.5 space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-200 w-56">
            <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider px-2">
              Связь с менеджером
            </div>
            <a
              href={`tel:${SITE_CONFIG.phoneRaw}`}
              onClick={handlePhone}
              className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-gray-50 text-gray-900 font-semibold text-xs transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-brand-100 text-brand-700 flex items-center justify-center">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <div>Позвонить</div>
                <div className="text-[10px] text-gray-500 font-normal">{SITE_CONFIG.phone}</div>
              </div>
            </a>
            <a
              href={SITE_CONFIG.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsApp}
              className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-gray-50 text-gray-900 font-semibold text-xs transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-green-100 text-green-700 flex items-center justify-center">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div>
                <div>Написать в WhatsApp</div>
                <div className="text-[10px] text-gray-500 font-normal">Ответим за 5 минут</div>
              </div>
            </a>
          </div>
        )}

        <button
          onClick={() => setShowDesktopMenu(!showDesktopMenu)}
          className="w-14 h-14 rounded-full bg-brand-500 hover:bg-brand-600 text-white flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 animate-call-ring cursor-pointer"
          aria-label="Связаться с нами"
        >
          {showDesktopMenu ? (
            <X className="w-6 h-6" />
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
              <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
            </svg>
          )}
        </button>
      </div>

      {/* 2. Mobile Bottom Floating Bar (always accessible) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200/80 px-4 py-3 pb-safe shadow-2xl">
        <div className="flex items-center gap-2 max-w-md mx-auto">
          {/* Call button */}
          <a
            href={`tel:${SITE_CONFIG.phoneRaw}`}
            onClick={handlePhone}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gray-900 text-white font-bold text-xs tracking-wide shadow-sm active:scale-95 transition-transform"
          >
            <Phone className="w-3.5 h-3.5 text-brand-400" />
            <span>ПОЗВОНИТЬ</span>
          </a>

          {/* Calculator button */}
          <button
            onClick={onScrollToCalculator}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-brand-800 text-white font-bold text-xs tracking-wide shadow-sm active:scale-95 transition-transform"
          >
            <Calculator className="w-3.5 h-3.5 text-brand-300" />
            <span>РАССЧИТАТЬ</span>
          </button>

          {/* WhatsApp icon */}
          <a
            href={SITE_CONFIG.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWhatsApp}
            className="w-11 h-11 rounded-xl bg-brand-500 text-white flex items-center justify-center shrink-0 shadow-sm active:scale-95 transition-transform"
            aria-label="Написать в WhatsApp"
          >
            <MessageCircle className="w-5 h-5" />
          </a>
        </div>
      </div>
    </>
  );
};
