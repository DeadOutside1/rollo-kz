import React, { useState } from 'react';
import { Calculator, ArrowRight, CheckCircle2, Shield, Sparkles, Loader2 } from 'lucide-react';
import { trackLeadConversion } from '../lib/analytics';

interface HeroProps {
  onScrollToCalculator: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToCalculator }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Handle phone format +7 (XXX) XXX-XX-XX
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.startsWith('8')) val = '7' + val.slice(1);
    if (!val.startsWith('7')) val = '7' + val;

    let formatted = '+7';
    if (val.length > 1) formatted += ' (' + val.substring(1, 4);
    if (val.length >= 5) formatted += ') ' + val.substring(4, 7);
    if (val.length >= 8) formatted += '-' + val.substring(7, 9);
    if (val.length >= 10) formatted += '-' + val.substring(9, 11);

    setPhone(formatted);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (name.trim().length < 2) {
      setErrorMsg('Пожалуйста, введите ваше имя');
      return;
    }

    const digits = phone.replace(/\D/g, '');
    if (digits.length < 11) {
      setErrorMsg('Пожалуйста, введите полный номер телефона');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          city: 'Алматы',
          source: 'Лид-магнит в Hero (Получить каталог)',
          honeypot,
        }),
      });

      const data = await response.json();

      if (response.ok && data.ok) {
        setSuccess(true);
        // Track verified conversion
        trackLeadConversion(data.leadId || `hero_${Date.now()}`, null);
      } else {
        setErrorMsg(data.error || 'Ошибка при отправке заявки. Пожалуйста, попробуйте еще раз.');
      }
    } catch (err) {
      setErrorMsg('Не удалось соединиться с сервером. Пожалуйста, позвоните нам.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-gradient-to-b from-brand-50/60 via-white to-surface-light">
      {/* Background decoration elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-brand-100/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-brand-200/30 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text & Value proposition */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Pill badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-100 border border-brand-200/80 text-brand-800 text-xs sm:text-sm font-semibold mb-6 shadow-xs">
              <Sparkles className="w-4 h-4 text-brand-600" />
              <span>Собственное производство в Казахстане с 2007 года</span>
            </div>

            {/* Main title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold text-gray-900 leading-[1.15] tracking-tight mb-5 text-balance">
              Жалюзи на заказ <br className="hidden sm:inline" />
              <span className="text-brand-700">от 3 500 ₸ за 3 дня</span>, <br />
              замер и установка <span className="underline decoration-brand-400 decoration-wavy underline-offset-4">бесплатно</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-8 max-w-2xl">
              Rollo.kz сделает ваш дом и офис уютнее. Подберём идеальное решение под ваш интерьер, рассчитаем точную стоимость и привезём чемодан с 500+ образцами прямо к вам.
            </p>

            {/* Quick Benefits list */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 w-full mb-8">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-gray-100 shadow-soft">
                <CheckCircle2 className="w-5 h-5 text-brand-600 shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-gray-800">Индивидуальный подбор</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-gray-100 shadow-soft">
                <Calculator className="w-5 h-5 text-brand-600 shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-gray-800">Точный расчёт цены</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-gray-100 shadow-soft">
                <Shield className="w-5 h-5 text-brand-600 shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-gray-800">Монтаж с гарантией</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <button
                onClick={onScrollToCalculator}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 text-base font-bold text-white bg-brand-800 hover:bg-brand-700 active:scale-95 rounded-2xl shadow-soft-lg hover:shadow-brand-800/20 transition-all group"
              >
                <Calculator className="w-5 h-5 text-brand-300 group-hover:rotate-12 transition-transform" />
                <span>Рассчитать стоимость онлайн</span>
                <ArrowRight className="w-4 h-4 text-brand-300 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#catalog"
                className="inline-flex items-center justify-center px-6 py-4 text-base font-semibold text-gray-800 bg-white hover:bg-gray-50 border border-gray-200 rounded-2xl shadow-soft transition-all"
              >
                Посмотреть каталог
              </a>
            </div>
          </div>

          {/* Right Column: Lead Capture Form Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-soft-lg border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-28 h-28 bg-brand-50 rounded-bl-full -z-0 pointer-events-none" />

              <div className="relative z-10">
                <div className="mb-6">
                  <span className="inline-block px-3 py-1 rounded-md bg-brand-100 text-brand-800 text-xs font-bold uppercase tracking-wider mb-2">
                    Электронный каталог 2026
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug">
                    Получите полный каталог всех видов жалюзи и тканей
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    С подробными ценами и фото образцов в WhatsApp
                  </p>
                </div>

                {success ? (
                  <div className="p-6 bg-brand-50 border border-brand-200 rounded-2xl text-center animate-in fade-in zoom-in-95 duration-200">
                    <div className="w-12 h-12 bg-brand-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <h4 className="text-lg font-bold text-brand-900 mb-1">Каталог отправляется!</h4>
                    <p className="text-sm text-brand-700">
                      Наш менеджер уже высылает файл на номер <b>{phone}</b>. Спасибо за доверие!
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Honeypot anti-spam field */}
                    <input
                      type="text"
                      name="middle_name"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                      className="hidden"
                    />

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                        Ваше имя
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Например, Азамат"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:border-brand-600 focus:ring-2 focus:ring-brand-500/20 text-gray-900 text-sm outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                        Номер телефона
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                          <span className="text-sm">🇰🇿</span>
                        </div>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={handlePhoneChange}
                          placeholder="+7 (700) 000-00-00"
                          className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:border-brand-600 focus:ring-2 focus:ring-brand-500/20 text-gray-900 text-sm outline-none transition-all font-medium"
                        />
                      </div>
                    </div>

                    {errorMsg && (
                      <p className="text-xs text-red-600 font-medium">{errorMsg}</p>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 px-6 rounded-xl text-base font-bold text-white bg-brand-500 hover:bg-brand-600 active:scale-[0.98] shadow-md shadow-brand-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Отправка каталога...</span>
                        </>
                      ) : (
                        <span>ПОЛУЧИТЬ КАТАЛОГ В WHATSAPP</span>
                      )}
                    </button>

                    <p className="text-[11px] text-gray-400 text-center leading-relaxed">
                      Нажимая кнопку, вы соглашаетесь на обработку персональных данных. Ответим в течение 15 минут в рабочее время.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
