import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, Menu, X, Calculator, ShieldCheck } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';
import { trackPhoneClick, trackWhatsAppClick } from '../lib/analytics';

interface HeaderProps {
  onOpenCalculator: () => void;
  onOpenOrderModal: (type?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenCalculator, onOpenOrderModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePhoneClick = () => {
    trackPhoneClick();
  };

  const handleWhatsAppClick = () => {
    trackWhatsAppClick();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top green utility strip */}
      <div className="bg-brand-800 text-white text-xs sm:text-sm py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-400" />
            <span className="hidden sm:inline font-medium">Бесплатный выезд замерщика с образцами по Алматы и области</span>
            <span className="sm:hidden font-medium">Бесплатный замер по Алматы</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-brand-200 hidden md:inline">{SITE_CONFIG.workingHours}</span>
            <a
              href={SITE_CONFIG.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppClick}
              className="flex items-center gap-1.5 hover:text-brand-300 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-brand-400" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <nav
        className={`px-4 sm:px-6 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-soft py-3 border-b border-gray-100'
            : 'bg-white/90 backdrop-blur-sm py-4 border-b border-gray-100/60'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-brand-800 flex items-center justify-center text-white shadow-sm group-hover:bg-brand-700 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-brand-400">
                <rect width="18" height="18" x="3" y="3" rx="2"/>
                <path d="M3 9h18"/>
                <path d="M3 15h18"/>
                <path d="M9 3v18"/>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-gray-900 leading-none">
                ROLLO<span className="text-brand-600">.KZ</span>
              </span>
              <span className="text-[10px] text-gray-500 font-medium tracking-wide uppercase mt-0.5">
                Жалюзи и шторы
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-7 text-sm font-medium text-gray-700">
            <a href="#catalog" className="hover:text-brand-700 transition-colors">Каталог</a>
            <a href="#calculator" className="hover:text-brand-700 transition-colors flex items-center gap-1.5 text-brand-700 font-semibold">
              <Calculator className="w-4 h-4 text-brand-600" />
              Калькулятор
            </a>
            <a href="#how-it-works" className="hover:text-brand-700 transition-colors">Как мы работаем</a>
            <a href="#about" className="hover:text-brand-700 transition-colors">О нас</a>
            <a href="#portfolio" className="hover:text-brand-700 transition-colors">Наши работы</a>
            <a href="#reviews" className="hover:text-brand-700 transition-colors">Отзывы</a>
            <a href="#contacts" className="hover:text-brand-700 transition-colors">Контакты</a>
          </div>

          {/* Right Phone & CTA */}
          <div className="flex items-center gap-3">
            <a
              href={`tel:${SITE_CONFIG.phoneRaw}`}
              onClick={handlePhoneClick}
              className="hidden sm:flex flex-col items-end text-right group"
            >
              <div className="flex items-center gap-1.5 text-sm font-bold text-gray-900 group-hover:text-brand-700 transition-colors">
                <Phone className="w-3.5 h-3.5 text-brand-600" />
                <span>{SITE_CONFIG.phone}</span>
              </div>
              <span className="text-[11px] text-brand-600 font-medium">Бесплатная консультация</span>
            </a>

            <button
              onClick={() => onOpenOrderModal()}
              className="hidden md:inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-brand-800 hover:bg-brand-700 active:scale-95 rounded-xl shadow-sm transition-all"
            >
              Оставить заявку
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              aria-label="Меню навигации"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-gray-100 bg-white rounded-2xl shadow-xl p-4 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-3 font-medium text-gray-800">
              <a
                href="#catalog"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-brand-50 hover:text-brand-800 transition-colors"
              >
                Каталог жалюзи
              </a>
              <a
                href="#calculator"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCalculator();
                }}
                className="px-3 py-2 rounded-lg bg-brand-50 text-brand-800 font-semibold flex items-center justify-between"
              >
                <span>Калькулятор стоимости</span>
                <Calculator className="w-4 h-4 text-brand-600" />
              </a>
              <a
                href="#how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-brand-50 hover:text-brand-800 transition-colors"
              >
                Как мы работаем
              </a>
              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-brand-50 hover:text-brand-800 transition-colors"
              >
                О компании
              </a>
              <a
                href="#portfolio"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-brand-50 hover:text-brand-800 transition-colors"
              >
                Наши работы
              </a>
              <a
                href="#reviews"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-brand-50 hover:text-brand-800 transition-colors"
              >
                Отзывы клиентов
              </a>
              <a
                href="#contacts"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-brand-50 hover:text-brand-800 transition-colors"
              >
                Контакты
              </a>

              <div className="pt-3 border-t border-gray-100 flex flex-col gap-2.5">
                <a
                  href={`tel:${SITE_CONFIG.phoneRaw}`}
                  onClick={handlePhoneClick}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-gray-200 text-gray-900 font-bold"
                >
                  <Phone className="w-4 h-4 text-brand-600" />
                  {SITE_CONFIG.phone}
                </a>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenOrderModal();
                  }}
                  className="w-full py-2.5 rounded-xl bg-brand-800 text-white font-semibold shadow-sm"
                >
                  Оставить заявку на замер
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
