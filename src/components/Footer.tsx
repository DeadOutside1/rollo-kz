import React from 'react';
import { Phone, MessageCircle, Instagram, MapPin, Clock, ArrowUp } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';
import { trackPhoneClick, trackWhatsAppClick } from '../lib/analytics';

interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenOrderModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacy, onOpenOrderModal }) => {
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
              Изготовление и установка всех видов жалюзи и рулонных штор на заказ в Алматы и по Казахстану с 2007 года.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href={`tel:${SITE_CONFIG.phoneRaw}`}
                onClick={trackPhoneClick}
                className="w-9 h-9 rounded-full bg-gray-800 hover:bg-brand-600 flex items-center justify-center text-gray-300 hover:text-white transition-colors"
                aria-label="Телефон"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href={SITE_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackWhatsAppClick}
                className="w-9 h-9 rounded-full bg-gray-800 hover:bg-green-600 flex items-center justify-center text-gray-300 hover:text-white transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={SITE_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gray-800 hover:bg-pink-600 flex items-center justify-center text-gray-300 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-200 mb-4">
              Разделы сайта
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li><a href="#catalog" className="hover:text-white transition-colors">Каталог изделий</a></li>
              <li><a href="#calculator" className="hover:text-white transition-colors">Онлайн-калькулятор</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition-colors">Этапы работы</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">О производстве</a></li>
              <li><a href="#portfolio" className="hover:text-white transition-colors">Наши работы</a></li>
              <li><a href="#reviews" className="hover:text-white transition-colors">Отзывы клиентов</a></li>
            </ul>
          </div>

          {/* Col 3: Catalog Categories */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-200 mb-4">
              Виды жалюзи
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li><a href="#catalog" className="hover:text-white transition-colors">Шторы «День-ночь»</a></li>
              <li><a href="#catalog" className="hover:text-white transition-colors">Вертикальные тканевые</a></li>
              <li><a href="#catalog" className="hover:text-white transition-colors">Горизонтальные алюминиевые</a></li>
              <li><a href="#catalog" className="hover:text-white transition-colors">Рулонные шторы Blackout</a></li>
              <li><a href="#catalog" className="hover:text-white transition-colors">Двойные роллы</a></li>
              <li><a href="#catalog" className="hover:text-white transition-colors">Фото-жалюзи с рисунком</a></li>
            </ul>
          </div>

          {/* Col 4: Contacts & Call to Action */}
          <div className="space-y-3.5">
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-200 mb-4">
              Контакты
            </h4>
            <div className="flex items-start gap-2.5 text-sm text-gray-400">
              <MapPin className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
              <span>{SITE_CONFIG.address}</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm text-gray-400">
              <Clock className="w-4 h-4 text-brand-400 shrink-0" />
              <span>{SITE_CONFIG.workingHours}</span>
            </div>
            <div className="flex items-center gap-2.5 text-base font-bold text-white pt-1">
              <Phone className="w-4 h-4 text-brand-400 shrink-0" />
              <a href={`tel:${SITE_CONFIG.phoneRaw}`} onClick={trackPhoneClick} className="hover:text-brand-400">
                {SITE_CONFIG.phone}
              </a>
            </div>
            <button
              onClick={onOpenOrderModal}
              className="w-full mt-3 py-2.5 px-4 rounded-xl bg-brand-500 hover:bg-brand-400 text-white font-bold text-xs tracking-wide transition-colors"
            >
              Вызвать замерщика
            </button>
          </div>

        </div>

        {/* Bottom Sub-footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>
            © {new Date().getFullYear()} ROLLO.KZ. Все права защищены. Made by {SITE_CONFIG.author}.
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={onOpenPrivacy}
              className="hover:text-gray-300 transition-colors underline cursor-pointer"
            >
              Политика конфиденциальности
            </button>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
            >
              <span>Наверх</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
