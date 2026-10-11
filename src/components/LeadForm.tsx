import React, { useState } from 'react';
import { Send, Loader2, CheckCircle2, ShieldCheck } from 'lucide-react';
import { CITIES_KZ } from '../config/site';
import { trackLeadConversion } from '../lib/analytics';

export const LeadForm: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Шымкент');
  const [preferredContact, setPreferredContact] = useState<'whatsapp' | 'call' | 'telegram'>('whatsapp');
  const [honeypot, setHoneypot] = useState('');
  const [agree, setAgree] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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
    setErrorMessage('');

    if (name.trim().length < 2) {
      setErrorMessage('Пожалуйста, введите ваше имя.');
      return;
    }

    const digits = phone.replace(/\D/g, '');
    if (digits.length < 11) {
      setErrorMessage('Пожалуйста, введите корректный номер телефона.');
      return;
    }

    if (!agree) {
      setErrorMessage('Необходимо подтвердить согласие на обработку персональных данных.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          city,
          preferredContact,
          source: 'Форма консультации перед футером',
          honeypot,
        }),
      });

      const data = await response.json();

      if (response.ok && data.ok) {
        setIsSuccess(true);
        trackLeadConversion(data.leadId || `lead_${Date.now()}`, null);
      } else {
        setErrorMessage(data.error || 'Ошибка при отправке заявки. Пожалуйста, попробуйте еще раз.');
      }
    } catch (err) {
      setErrorMessage('Не удалось соединиться с сервером. Пожалуйста, позвоните нам.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative py-24 bg-gray-900 text-white overflow-hidden">
      {/* Background Image with dark overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/consultation-bg.webp"
          alt="Жалюзи фон"
          className="w-full h-full object-cover opacity-25 filter blur-[1px]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/80 to-gray-900/90" />
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          Оставьте заявку на консультацию
        </h2>
        <p className="text-base sm:text-lg text-gray-300 mb-10 max-w-xl mx-auto">
          Вы можете звонить или писать нам в любое время. Специалист ответит на все вопросы и забронирует удобное время бесплатного замера.
        </p>

        {isSuccess ? (
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 sm:p-10 rounded-3xl animate-in fade-in zoom-in-95 max-w-lg mx-auto">
            <div className="w-16 h-16 bg-brand-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Заявка принята!</h3>
            <p className="text-gray-200 text-sm leading-relaxed mb-6">
              Спасибо, <b>{name}</b>! Мы уже передали заявку мастеру. Мы свяжемся с вами в течение 15 минут по номеру <b>{phone}</b>.
            </p>
            <button
              onClick={() => {
                setIsSuccess(false);
                setName('');
                setPhone('');
              }}
              className="px-6 py-2.5 rounded-xl bg-white text-gray-900 text-xs font-bold hover:bg-gray-100 transition-colors"
            >
              Отправить еще одну заявку
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white/10 backdrop-blur-md border border-white/20 p-6 sm:p-10 rounded-3xl max-w-xl mx-auto text-left shadow-2xl space-y-4"
          >
            {/* Honeypot */}
            <input
              type="text"
              name="company_url"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
            />

            {/* Phone */}
            <div>
              <label className="block text-xs font-bold text-gray-200 uppercase tracking-wider mb-2">
                Номер телефона
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <span className="text-base">🇰🇿</span>
                </div>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder="+7 (700) 000-00-00"
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white text-gray-900 text-sm font-semibold outline-none focus:ring-2 focus:ring-brand-400 placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="block text-xs font-bold text-gray-200 uppercase tracking-wider mb-2">
                Ваше имя
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Как к вам обращаться?"
                className="w-full px-4 py-3.5 rounded-xl bg-white text-gray-900 text-sm font-semibold outline-none focus:ring-2 focus:ring-brand-400 placeholder:text-gray-400"
              />
            </div>

            {/* City */}
            <div>
              <label className="block text-xs font-bold text-gray-200 uppercase tracking-wider mb-2">
                Город обслуживания
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl bg-white text-gray-900 text-sm font-semibold outline-none cursor-pointer"
              >
                {CITIES_KZ.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Preferred contact channel */}
            <div>
              <label className="block text-xs font-bold text-gray-200 uppercase tracking-wider mb-2">
                Удобный способ связи:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['whatsapp', 'call', 'telegram'] as const).map((ch) => (
                  <button
                    key={ch}
                    type="button"
                    onClick={() => setPreferredContact(ch)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border cursor-pointer text-center ${
                      preferredContact === ch
                        ? 'bg-brand-500 border-brand-400 text-white'
                        : 'bg-white/10 border-white/20 text-gray-300 hover:bg-white/20'
                    }`}
                  >
                    {ch === 'whatsapp' ? 'WhatsApp' : ch === 'call' ? 'Звонок' : 'Telegram'}
                  </button>
                ))}
              </div>
            </div>

            {/* Agreement checkbox */}
            <div className="flex items-start gap-2.5 pt-2">
              <input
                type="checkbox"
                id="agree-checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="mt-1 w-4 h-4 rounded text-brand-500 focus:ring-brand-400 cursor-pointer accent-brand-500"
              />
              <label htmlFor="agree-checkbox" className="text-[11px] text-gray-300 leading-tight cursor-pointer">
                Я соглашаюсь на обработку персональных данных в соответствии с законодательством Республики Казахстан.
              </label>
            </div>

            {errorMessage && (
              <p className="text-xs text-red-300 font-semibold">{errorMessage}</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 px-6 rounded-xl bg-brand-500 hover:bg-brand-400 active:scale-[0.98] text-white font-extrabold text-base shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 pt-4"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Отправка заявки...</span>
                </>
              ) : (
                <>
                  <span>ОТПРАВИТЬ ЗАЯВКУ НА ЗАМЕР</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="text-center pt-2">
              <span className="text-[11px] text-gray-400 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-400" />
                <span>Замерщик приедет бесплатно в согласованное время</span>
              </span>
            </div>
          </form>
        )}

        <div className="mt-8 text-xs text-gray-400 font-medium">
          Rollo.kz - сделает ваш дом уютнее.
        </div>

      </div>
    </section>
  );
};
