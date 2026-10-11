import React, { useState, useEffect } from 'react';
import { Cookie } from 'lucide-react';
import { updateConsent } from '../lib/analytics';

interface CookieBannerProps {
  onOpenPrivacy: () => void;
}

export const CookieBanner: React.FC<CookieBannerProps> = ({ onOpenPrivacy }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('rollo_cookie_consent');
    if (!saved) {
      // Delay showing slightly so it doesn't jarringly block the viewport on first load
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    } else {
      updateConsent(saved === 'granted');
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('rollo_cookie_consent', 'granted');
    updateConsent(true);
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem('rollo_cookie_consent', 'denied');
    updateConsent(false);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-16 md:bottom-6 left-4 right-4 md:left-6 md:right-auto md:max-w-md z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="bg-white/95 backdrop-blur-md p-5 rounded-3xl shadow-2xl border border-gray-200/80 text-gray-800">
        <div className="flex items-start gap-3.5 mb-3">
          <div className="w-9 h-9 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center shrink-0">
            <Cookie className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-900 leading-snug">
              Конфиденциальность и файлы cookie
            </h4>
            <p className="text-xs text-gray-600 mt-1 leading-relaxed">
              Мы используем cookie для корректной работы калькулятора и анализа эффективности сайта. Вы можете принять или отклонить аналитические cookie.{' '}
              <button
                type="button"
                onClick={onOpenPrivacy}
                className="text-brand-700 underline font-semibold hover:text-brand-900"
              >
                Подробнее
              </button>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-2">
          <button
            onClick={handleAcceptAll}
            className="flex-1 py-2 px-3 rounded-xl bg-brand-800 hover:bg-brand-700 text-white text-xs font-bold transition-all shadow-xs"
          >
            Принять все
          </button>
          <button
            onClick={handleReject}
            className="py-2 px-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold transition-all"
          >
            Только необходимые
          </button>
        </div>
      </div>
    </div>
  );
};
