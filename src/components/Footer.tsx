import React from 'react';
import { Phone, MessageCircle, Instagram, MapPin, Clock, ArrowUp, Globe, FileText } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';
import { Language } from '../config/i18n';
import { trackPhoneClick, trackWhatsAppClick } from '../lib/analytics';

interface FooterProps {
  lang: Language;
  onToggleLang: () => void;
  onOpenPrivacy: () => void;
  onOpenOrderModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  lang,
  onToggleLang,
  onOpenPrivacy,
  onOpenOrderModal,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contacts" className="bg-gray-950 text-white pt-16 pb-28 md:pb-16 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-gray-800/80">
          
          {/* Col 1: Brand & Bio */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-brand-500 flex items-center justify-center text-white shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <rect width="18" height="18" x="3" y="3" rx="2"/>
                  <path d="M3 9h18"/>
                  <path d="M3 15h18"/>
                  <path d="M9 3v18"/>
                </svg>
              </div>
              <span className="text-2xl font-black tracking-tight">ROLLO<span className="text-brand-500">.KZ</span></span>
            </div>
            
            <p className="text-sm text-gray-400 leading-relaxed">
              {lang === 'ru'
                ? 'Шымкент қаласында барлық түрдегі жалюзи мен ролл-перделерді тікелей цехтан дайындау және орнату.'
                : 'Шымкент қаласында барлық түрдегі жалюзи мен ролл-перделерді тікелей цехтан дайындау және орнату.'}
            </p>

            <div className="text-xs text-gray-400">
              {SITE_CONFIG.legalName} • {SITE_CONFIG.office}
            </div>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={`tel:${SITE_CONFIG.phoneCallRaw}`}
                onClick={trackPhoneClick}
                className="w-9 h-9 rounded-full bg-gray-800 hover:bg-brand-600 flex items-center justify-center text-gray-300 hover:text-white transition-colors"
                title={`Позвонить: ${SITE_CONFIG.phoneCall}`}
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href={SITE_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackWhatsAppClick}
                className="w-9 h-9 rounded-full bg-gray-800 hover:bg-green-600 flex items-center justify-center text-gray-300 hover:text-white transition-colors"
                title={`WhatsApp: ${SITE_CONFIG.whatsappPhone}`}
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={SITE_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gray-800 hover:bg-pink-600 flex items-center justify-center text-gray-300 hover:text-white transition-colors"
                title={SITE_CONFIG.instagramHandle}
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-200 mb-4">
              {lang === 'ru' ? 'Разделы сайта' : 'Сайт бөлімдері'}
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li><a href="#catalog" className="hover:text-white transition-colors">{lang === 'ru' ? 'Каталог изделий' : 'Өнімдер каталогы'}</a></li>
              <li><a href="#calculator" className="hover:text-white transition-colors">{lang === 'ru' ? 'Онлайн-калькулятор' : 'Онлайн-калькулятор'}</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition-colors">{lang === 'ru' ? 'Этапы работы' : 'Жұмыс кезеңдері'}</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">{lang === 'ru' ? 'О производстве в Шымкенте' : 'Шымкенттегі өндіріс'}</a></li>
              <li><a href="#portfolio" className="hover:text-white transition-colors">{lang === 'ru' ? 'Наши работы' : 'Біздің жұмыстар'}</a></li>
              <li>
                <a
                  href={SITE_CONFIG.catalogPdfUrl}
                  download="Rollo_kz_Catalog.pdf"
                  className="hover:text-brand-400 transition-colors flex items-center gap-1.5 text-brand-300 font-semibold"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>{lang === 'ru' ? 'Скачать PDF каталог' : 'PDF каталогты жүктеу'}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Catalog Categories */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-200 mb-4">
              {lang === 'ru' ? 'Виды жалюзи от 4 500 ₸' : 'Жалюзи түрлері (4 500 ₸ бастап)'}
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li><a href="#catalog" className="hover:text-white transition-colors">Вертикальные тканевые жалюзи (от 4 500 ₸)</a></li>
              <li><a href="#catalog" className="hover:text-white transition-colors">Рулонные шторы (Roll-шторы)</a></li>
              <li><a href="#catalog" className="hover:text-white transition-colors">Горизонтальные алюминиевые</a></li>
              <li><a href="#catalog" className="hover:text-white transition-colors">Шторы «День - ночь» (Зебра)</a></li>
              <li><a href="#catalog" className="hover:text-white transition-colors">Фото-жалюзи с принтом</a></li>
              <li><a href="#catalog" className="hover:text-white transition-colors">Двойные роллы (Премиум)</a></li>
            </ul>
          </div>

          {/* Col 4: Contacts & Call to Action */}
          <div className="space-y-3.5">
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-200 mb-4">
              {lang === 'ru' ? 'Контакты в Шымкенте' : 'Шымкенттегі байланыс'}
            </h4>
            
            <div className="flex items-start gap-2.5 text-sm text-gray-300">
              <MapPin className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
              <span>{SITE_CONFIG.address}</span>
            </div>

            <div className="flex items-center gap-2.5 text-sm text-gray-400">
              <Clock className="w-4 h-4 text-brand-400 shrink-0" />
              <span>{SITE_CONFIG.workingHours}</span>
            </div>

            {/* Primary Phone: Calls & WhatsApp */}
            <div className="pt-1">
              <div className="text-[11px] text-brand-400 uppercase font-bold tracking-wider">
                {lang === 'ru' ? 'Основной (Звонки и WhatsApp):' : 'Негізгі (Қоңырау және WhatsApp):'}
              </div>
              <div className="flex items-center gap-2 text-base font-black text-white mt-0.5">
                <Phone className="w-4 h-4 text-brand-400 shrink-0" />
                <a href={`tel:${SITE_CONFIG.phoneCallRaw}`} onClick={trackPhoneClick} className="hover:text-brand-400">
                  {SITE_CONFIG.phoneCall}
                </a>
                <a
                  href={SITE_CONFIG.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={trackWhatsAppClick}
                  className="ml-auto text-xs font-bold text-green-400 hover:text-green-300 flex items-center gap-1 bg-green-950/60 px-2 py-0.5 rounded-md border border-green-800"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Alternative Phone: Calls & WhatsApp */}
            <div className="pt-1 border-t border-gray-800">
              <div className="text-[11px] text-gray-400 uppercase font-semibold">
                {lang === 'ru' ? 'Дополнительный (резервный):' : 'Қосымша (резервтік):'}
              </div>
              <div className="flex items-center gap-2 text-sm font-bold text-gray-300 mt-0.5">
                <Phone className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                <a href={`tel:${SITE_CONFIG.phoneAltRaw}`} onClick={trackPhoneClick} className="hover:text-white">
                  {SITE_CONFIG.phoneAlt}
                </a>
                <a
                  href={SITE_CONFIG.whatsappAltUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={trackWhatsAppClick}
                  className="ml-auto text-xs font-medium text-gray-300 hover:text-white flex items-center gap-1 bg-gray-800/80 px-2 py-0.5 rounded-md"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-green-400" />
                  <span>WA 2</span>
                </a>
              </div>
            </div>

            <button
              onClick={onOpenOrderModal}
              className="w-full mt-3 py-2.5 px-4 rounded-xl bg-brand-500 hover:bg-brand-400 text-white font-bold text-xs tracking-wide transition-colors cursor-pointer"
            >
              {lang === 'ru' ? 'Вызвать замерщика в Шымкенте' : 'Шымкентте өлшеушіні шақыру'}
            </button>
          </div>

        </div>

        {/* Bottom Sub-footer with Language Switcher */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>
            © {new Date().getFullYear()} ROLLO.KZ ({SITE_CONFIG.legalName}). {lang === 'ru' ? 'Шымкент, Казахстан.' : 'Шымкент, Қазақстан.'} Made by {SITE_CONFIG.author}.
          </div>

          {/* Language Selector in footer */}
          <div className="flex items-center gap-2 bg-gray-900 px-3 py-1.5 rounded-xl border border-gray-800">
            <Globe className="w-3.5 h-3.5 text-brand-400" />
            <span className="text-gray-400 font-medium">Тіл / Язык:</span>
            <button
              onClick={() => { if (lang !== 'ru') onToggleLang(); }}
              className={`px-2 py-0.5 rounded text-xs font-bold transition-colors cursor-pointer ${
                lang === 'ru' ? 'bg-brand-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              РУС
            </button>
            <span className="text-gray-600">|</span>
            <button
              onClick={() => { if (lang !== 'kz') onToggleLang(); }}
              className={`px-2 py-0.5 rounded text-xs font-bold transition-colors cursor-pointer ${
                lang === 'kz' ? 'bg-brand-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              ҚАЗ
            </button>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={onOpenPrivacy}
              className="hover:text-gray-300 transition-colors underline cursor-pointer"
            >
              {lang === 'ru' ? 'Политика конфиденциальности' : 'Құпиялылық саясаты'}
            </button>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
            >
              <span>{lang === 'ru' ? 'Наверх' : 'Жоғарыға'}</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
