import React, { useState } from 'react';
import { Calculator, ArrowRight, CheckCircle2, Shield, Sparkles, Loader2, FileDown, MessageCircle } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';
import { I18N, Language } from '../config/i18n';
import { trackLeadConversion, trackWhatsAppClick } from '../lib/analytics';

interface HeroProps {
  lang: Language;
  onScrollToCalculator: () => void;
}

export const Hero: React.FC<HeroProps> = ({ lang, onScrollToCalculator }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const t = I18N[lang];

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
      setErrorMsg(lang === 'ru' ? 'Пожалуйста, введите ваше имя' : 'Атыңызды жазыңыз');
      return;
    }

    const digits = phone.replace(/\D/g, '');
    if (digits.length < 11) {
      setErrorMsg(lang === 'ru' ? 'Пожалуйста, введите полный номер телефона' : 'Толық телефон нөмірін енгізіңіз');
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
          city: 'Шымкент',
          source: 'Лид-магнит в Hero (Каталог Шымкент)',
          honeypot,
        }),
      });

      const data = await response.json();

      if (response.ok && data.ok) {
        setSuccess(true);
        trackLeadConversion(data.leadId || `hero_${Date.now()}`, null);
      } else {
        setErrorMsg(data.error || 'Ошибка при отправке заявки.');
      }
    } catch (err) {
      setErrorMsg('Не удалось соединиться с сервером.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative pt-36 sm:pt-40 md:pt-44 pb-16 md:pb-24 overflow-hidden bg-gradient-to-b from-brand-50/60 via-white to-surface-light">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-brand-100/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-brand-200/30 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text & Value proposition */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-100 border border-brand-200/80 text-brand-900 text-xs sm:text-sm font-semibold mb-6 shadow-xs max-w-full">
              <Sparkles className="w-4 h-4 text-brand-600 shrink-0" />
              <span className="leading-snug">{t.heroBadge}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold text-gray-900 leading-[1.15] tracking-tight mb-5 text-balance">
              {t.heroTitlePart1} <br className="hidden sm:inline" />
              <span className="text-brand-700">{t.heroTitlePart2}</span>, <br />
              {t.heroTitlePart3}
            </h1>

            <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-8 max-w-2xl">
              {t.heroSubtitle}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 w-full mb-8">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-gray-100 shadow-soft">
                <CheckCircle2 className="w-5 h-5 text-brand-600 shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-gray-800">
                  {lang === 'ru' ? '500+ тканей Турции' : 'Түркияның 500+ матасы'}
                </span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-gray-100 shadow-soft">
                <Calculator className="w-5 h-5 text-brand-600 shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-gray-800">
                  {lang === 'ru' ? 'Точный расчёт в ₸' : '₸-мен дәл есептеу'}
                </span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-gray-100 shadow-soft">
                <Shield className="w-5 h-5 text-brand-600 shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-gray-800">
                  {lang === 'ru' ? 'Монтаж за 3 дня' : '3 күнде орнату'}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 w-full sm:w-auto">
              <button
                onClick={onScrollToCalculator}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 text-base font-bold text-white bg-brand-800 hover:bg-brand-700 active:scale-95 rounded-2xl shadow-soft-lg hover:shadow-brand-800/20 transition-all group"
              >
                <Calculator className="w-5 h-5 text-brand-300 group-hover:rotate-12 transition-transform" />
                <span>{t.calcOnlineBtn}</span>
                <ArrowRight className="w-4 h-4 text-brand-300 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href={SITE_CONFIG.catalogPdfUrl}
                download="Rollo_kz_Catalog.pdf"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 text-sm font-bold text-brand-800 bg-brand-50 hover:bg-brand-100/80 border border-brand-200 rounded-2xl shadow-soft transition-all"
              >
                <FileDown className="w-4 h-4 text-brand-600" />
                <span>{t.downloadPdfBtn}</span>
              </a>

              <a
                href={SITE_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick()}
                className="inline-flex items-center justify-center gap-2 px-5 py-4 text-sm font-bold text-gray-800 bg-white hover:bg-gray-50 border border-gray-200 rounded-2xl shadow-soft transition-all"
              >
                <MessageCircle className="w-4 h-4 text-green-600" />
                <span>WhatsApp</span>
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
                    {lang === 'ru' ? 'Шымкент • Каталог 2026' : 'Шымкент • Каталог 2026'}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug">
                    {t.leadCatalogTitle}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {t.leadCatalogSubtitle}
                  </p>
                </div>

                {success ? (
                  <div className="p-6 bg-brand-50 border border-brand-200 rounded-2xl text-center animate-in fade-in zoom-in-95 duration-200">
                    <div className="w-12 h-12 bg-brand-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <h4 className="text-lg font-bold text-brand-900 mb-1">
                      {lang === 'ru' ? 'Каталог отправляется!' : 'Каталог жіберілуде!'}
                    </h4>
                    <p className="text-sm text-brand-700 mb-4">
                      {lang === 'ru' 
                        ? `Наш менеджер высылает каталог на номер ${phone}.`
                        : `Менеджер каталогты ${phone} нөміріне жібереді.`}
                    </p>
                    <a
                      href={SITE_CONFIG.catalogPdfUrl}
                      download="Rollo_kz_Catalog.pdf"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-800 text-white text-xs font-bold"
                    >
                      <FileDown className="w-4 h-4" />
                      <span>{lang === 'ru' ? 'Скачать PDF напрямую' : 'PDF-ті жүктеп алу'}</span>
                    </a>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
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
                        {t.yourName}
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={lang === 'ru' ? 'Например, Бауыржан' : 'Мысалы, Бауыржан'}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:border-brand-600 focus:ring-2 focus:ring-brand-500/20 text-gray-900 text-sm outline-none transition-all font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                        {t.yourPhone}
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
                          placeholder="+7 (705) 000-00-00"
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
                          <span>{lang === 'ru' ? 'Отправка...' : 'Жіберілуде...'}</span>
                        </>
                      ) : (
                        <span>{t.getInWhatsapp}</span>
                      )}
                    </button>

                    <div className="flex items-center justify-between pt-1 text-[11px] text-gray-400">
                      <span>{lang === 'ru' ? 'г. Шымкент, ул. Ореховая, 65' : 'Шымкент қ., Ореховая к-сі, 65'}</span>
                      <a
                        href={SITE_CONFIG.catalogPdfUrl}
                        download="Rollo_kz_Catalog.pdf"
                        className="text-brand-700 font-semibold underline hover:text-brand-900"
                      >
                        {lang === 'ru' ? 'Скачать PDF' : 'PDF жүктеу'}
                      </a>
                    </div>
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
