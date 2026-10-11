import React from 'react';
import { X, Shield } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 mb-6 text-brand-800">
          <Shield className="w-6 h-6 text-brand-600" />
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
            Политика конфиденциальности ROLLO.KZ
          </h3>
        </div>

        <div className="text-sm text-gray-600 space-y-4 leading-relaxed">
          <p>
            Настоящая Политика конфиденциальности разработана в соответствии с Законом Республики Казахстан от 21 мая 2013 года № 94-V «О персональных данных и их защите» и определяет порядок сбора, обработки и защиты информации о пользователях сайта <b>{SITE_CONFIG.domain}</b>.
          </p>

          <h4 className="font-bold text-gray-900 text-base">1. Сбор и использование персональных данных</h4>
          <p>
            Мы собираем только те данные, которые вы добровольно указываете при заполнении форм на сайте: имя, номер телефона, город проживания и параметры заказываемых жалюзи (размеры, пожелания).
          </p>
          <p>
            Данные используются исключительно для:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>Обратной связи и предварительного расчета стоимости изделий;</li>
            <li>Согласования даты и времени бесплатного выезда замерщика с каталогами образцов;</li>
            <li>Оформления заказа и доставки готовой продукции.</li>
          </ul>

          <h4 className="font-bold text-gray-900 text-base">2. Защита и неразглашение данных</h4>
          <p>
            Мы гарантируем, что ваши персональные данные никогда не будут проданы, переданы третьим лицам или использованы для нежелательных рекламных рассылок (спама), за исключением случаев, прямо предусмотренных законодательством Республики Казахстан.
          </p>

          <h4 className="font-bold text-gray-900 text-base">3. Использование файлов Cookies и аналитики</h4>
          <p>
            Сайт может использовать файлы cookies и обезличенные сервисы веб-аналитики (Google Analytics 4, Google Ads) для оценки качества работы сайта и оптимизации рекламы. Мы не передаем в системы аналитики имена, телефоны или иные персональные данные пользователей.
          </p>

          <h4 className="font-bold text-gray-900 text-base">4. Контактная информация оператора</h4>
          <p>
            По всем вопросам, связанным с обработкой персональных данных, вы можете обращаться по телефону <b>{SITE_CONFIG.phone}</b> или по адресу: {SITE_CONFIG.address}.
          </p>
        </div>

        <div className="mt-8 pt-4 border-t border-gray-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-brand-800 text-white font-bold text-sm hover:bg-brand-700 transition-colors"
          >
            Понятно
          </button>
        </div>
      </div>
    </div>
  );
};
