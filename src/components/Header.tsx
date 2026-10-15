import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, Menu, X, Calculator, ShieldCheck, Globe, FileText } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';
import { I18N, Language } from '../config/i18n';
import { trackPhoneClick, trackWhatsAppClick } from '../lib/analytics';

interface HeaderProps {
  lang: Language;
  onToggleLang: () => void;
  onOpenCalculator: () => void;
  onOpenOrderModal: (type?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  onToggleLang,
  onOpenCalculator,
  onOpenOrderModal,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = I18N[lang];

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
      {/* Top utility strip */}
      <div className="bg-brand-900 text-white text-xs sm:text-sm py-1.5 px-4 border-b border-brand-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-400 shrink-0" />
            <span className="font-medium">
              {lang === 'ru' 
                ? 'г. Шымкент, ул. Аль-Машани, 146 • Бесплатный замер по городу'
                : 'Шымкент қ., Әл-Машани к-сі, 146 • Қала бойынша тегін өлшеу'}
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Download PDF catalog link */}
            <a
              href={SITE_CONFIG.catalogPdfUrl}
              download="Rollo_kz_Catalog.pdf"
              className="hidden md:flex items-center gap-1 text-brand-300 hover:text-white transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-brand-400" />
              <span>{lang === 'ru' ? 'Каталог PDF (12 MB)' : 'PDF каталог'}</span>
            </a>

            {/* Direct WhatsApp link */}
            <a
              href={SITE_CONFIG.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppClick}
              className="flex items-center gap-1.5 text-brand-300 hover:text-white transition-colors font-medium"
            >
              <MessageCircle className="w-3.5 h-3.5 text-green-400" />
              <span>WhatsApp: {SITE_CONFIG.whatsappPhone}</span>
            </a>

            {/* Language Switcher Button */}
            <button
              onClick={onToggleLang}
              className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-brand-800 hover:bg-brand-700 text-white text-xs font-bold transition-all border border-brand-700 cursor-pointer"
              title="Тілді ауыстыру / Сменить язык"
            >
              <Globe className="w-3 h-3 text-brand-400" />
              <span>{lang === 'ru' ? 'ҚАЗ' : 'РУС'}</span>
            </button>
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
                Шымкент • Жалюзи
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-7 text-sm font-medium text-gray-700">
            <a href="#catalog" className="hover:text-brand-700 transition-colors">
              {lang === 'ru' ? 'Каталог' : 'Каталог'}
            </a>
            <a href="#calculator" className="hover:text-brand-700 transition-colors flex items-center gap-1.5 text-brand-700 font-semibold">
              <Calculator className="w-4 h-4 text-brand-600" />
              {lang === 'ru' ? 'Калькулятор' : 'Калькулятор'}
            </a>
            <a href="#how-it-works" className="hover:text-brand-700 transition-colors">
              {t.howItWorks}
            </a>
            <a href="#about" className="hover:text-brand-700 transition-colors">
              {t.aboutUs}
            </a>
            <a href="#portfolio" className="hover:text-brand-700 transition-colors">
              {lang === 'ru' ? 'Наши работы' : 'Жұмыстарымыз'}
            </a>
            <a href="#reviews" className="hover:text-brand-700 transition-colors">
              {t.reviews}
            </a>
            <a href="#contacts" className="hover:text-brand-700 transition-colors">
              {t.contacts}
            </a>
          </div>

          {/* Right Phone & CTA */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col items-end text-right">
              <a
                href={`tel:${SITE_CONFIG.phoneCallRaw}`}
                onClick={handlePhoneClick}
                className="flex items-center gap-1.5 text-sm font-bold text-gray-900 hover:text-brand-700 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-brand-600" />
                <span>{SITE_CONFIG.phoneCall}</span>
              </a>
              <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
                <span className="text-brand-700 font-semibold">{lang === 'ru' ? 'Основной' : 'Негізгі'}</span>
                <span>•</span>
                <a href={`tel:${SITE_CONFIG.phoneAltRaw}`} onClick={handlePhoneClick} className="hover:text-brand-700">
                  {SITE_CONFIG.phoneAlt} ({lang === 'ru' ? 'доп' : 'қосымша'})
                </a>
              </div>
            </div>

            <button
              onClick={() => onOpenOrderModal()}
              className="hidden md:inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-brand-800 hover:bg-brand-700 active:scale-95 rounded-xl shadow-sm transition-all cursor-pointer"
            >
              {lang === 'ru' ? 'Оставить заявку' : 'Өтініш беру'}
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
              
              {/* Language switcher inside mobile menu */}
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">
                  Тіл / Язык:
                </span>
                <button
                  onClick={onToggleLang}
                  className="px-3 py-1 rounded-lg bg-brand-100 text-brand-900 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Globe className="w-3.5 h-3.5 text-brand-700" />
                  <span>{lang === 'ru' ? 'Ауыстыру: ҚАЗАҚША' : 'Сменить: РУССКИЙ'}</span>
                </button>
              </div>

              <a
                href="#catalog"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-brand-50 hover:text-brand-800 transition-colors"
              >
                {lang === 'ru' ? 'Каталог жалюзи' : 'Жалюзи каталогы'}
              </a>
              <a
                href="#calculator"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCalculator();
                }}
                className="px-3 py-2 rounded-lg bg-brand-50 text-brand-800 font-semibold flex items-center justify-between"
              >
                <span>{lang === 'ru' ? 'Калькулятор стоимости' : 'Баға калькуляторы'}</span>
                <Calculator className="w-4 h-4 text-brand-600" />
              </a>
              <a
                href="#how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-brand-50 hover:text-brand-800 transition-colors"
              >
                {t.howItWorks}
              </a>
              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-brand-50 hover:text-brand-800 transition-colors"
              >
                {t.aboutUs}
              </a>
              <a
                href="#portfolio"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-brand-50 hover:text-brand-800 transition-colors"
              >
                {lang === 'ru' ? 'Наши работы' : 'Жұмыстарымыз'}
              </a>
              <a
                href="#reviews"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-brand-50 hover:text-brand-800 transition-colors"
              >
                {t.reviews}
              </a>
              <a
                href="#contacts"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-brand-50 hover:text-brand-800 transition-colors"
              >
                {t.contacts}
              </a>

              {/* PDF catalog download button */}
              <a
                href={SITE_CONFIG.catalogPdfUrl}
                download="Rollo_kz_Catalog.pdf"
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-gray-100 text-gray-800 text-xs font-bold hover:bg-gray-200"
              >
                <FileText className="w-4 h-4 text-brand-700" />
                <span>{lang === 'ru' ? 'Скачать PDF каталог (16 стр.)' : 'PDF каталогты жүктеу'}</span>
              </a>

              <div className="pt-3 border-t border-gray-100 flex flex-col gap-2.5">
                {/* Primary Contact */}
                <div>
                  <div className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-1">
                    {lang === 'ru' ? 'Основной телефон и WhatsApp:' : 'Негізгі телефон және WhatsApp:'}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href={`tel:${SITE_CONFIG.phoneCallRaw}`}
                      onClick={handlePhoneClick}
                      className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl border border-gray-200 text-gray-900 font-bold text-xs"
                    >
                      <Phone className="w-3.5 h-3.5 text-brand-600" />
                      <span>{SITE_CONFIG.phoneCall}</span>
                    </a>
                    <a
                      href={SITE_CONFIG.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleWhatsAppClick}
                      className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl bg-green-600 text-white font-bold text-xs"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>

                {/* Alternative Contact */}
                <div>
                  <div className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-1">
                    {lang === 'ru' ? 'Дополнительный номер (резервный):' : 'Қосымша нөмір (резерв):'}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href={`tel:${SITE_CONFIG.phoneAltRaw}`}
                      onClick={handlePhoneClick}
                      className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl border border-gray-200 text-gray-700 font-bold text-xs"
                    >
                      <Phone className="w-3.5 h-3.5 text-gray-500" />
                      <span>{SITE_CONFIG.phoneAlt}</span>
                    </a>
                    <a
                      href={SITE_CONFIG.whatsappAltUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleWhatsAppClick}
                      className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl bg-gray-100 text-gray-800 font-bold text-xs hover:bg-gray-200"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-green-600" />
                      <span>WhatsApp 2</span>
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenOrderModal();
                  }}
                  className="w-full mt-1 py-2.5 rounded-xl bg-brand-800 text-white font-semibold shadow-sm cursor-pointer"
                >
                  {lang === 'ru' ? 'Оставить заявку на замер' : 'Өлшеуге өтініш беру'}
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
