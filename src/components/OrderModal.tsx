import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Loader2, Send, ShieldCheck } from 'lucide-react';
import { CITIES_KZ } from '../config/site';
import { trackLeadConversion } from '../lib/analytics';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  productName,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Шымкент');
  const [comment, setComment] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

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
      setErrorMsg('Пожалуйста, укажите ваше имя');
      return;
    }

    const digits = phone.replace(/\D/g, '');
    if (digits.length < 11) {
      setErrorMsg('Пожалуйста, введите корректный номер телефона');
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
          city,
          blindType: productName || 'Общая заявка',
          comment: comment.trim() || 'Заявка из всплывающего окна',
          preferredContact: 'whatsapp',
          source: 'Модальное окно заявки',
          honeypot,
        }),
      });

      const data = await response.json();

      if (response.ok && data.ok) {
        setSuccess(true);
        trackLeadConversion(data.leadId || `modal_${Date.now()}`, null);
      } else {
        setErrorMsg(data.error || 'Ошибка при отправке заявки.');
      }
    } catch (err) {
      setErrorMsg('Ошибка связи с сервером. Пожалуйста, позвоните нам.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-gray-100 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {success ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-brand-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Заявка принята!</h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-6">
              Спасибо, <b>{name}</b>! Замерщик с каталогами образцов свяжется с вами по номеру <b>{phone}</b> в течение 15 минут.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-3 rounded-xl bg-brand-800 text-white text-sm font-bold hover:bg-brand-700 transition-colors"
            >
              Закрыть окно
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6 pr-8">
              <span className="text-xs font-bold text-brand-700 uppercase tracking-wider block mb-1">
                Быстрый заказ
              </span>
              <h3 className="text-2xl font-extrabold text-gray-900 leading-snug">
                {productName ? `Заявка: ${productName}` : 'Бесплатный выезд замерщика'}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Мастер приедет с каталогами образцов всех 500+ тканей в удобное для вас время.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <input
                type="text"
                name="user_token"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
              />

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Ваше имя
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Например, Ерлан"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-medium outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
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
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 text-sm font-semibold outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-500/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Город
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3 py-3 rounded-xl border border-gray-200 text-sm font-medium outline-none cursor-pointer"
                >
                  {CITIES_KZ.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Комментарий (необязательно)
                </label>
                <input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Адрес, удобное время замера или пожелания"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs outline-none focus:border-brand-600"
                />
              </div>

              {errorMsg && (
                <p className="text-xs text-red-600 font-semibold">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-6 rounded-xl bg-brand-500 hover:bg-brand-600 active:scale-[0.98] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 pt-3"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Отправка заявки...</span>
                  </>
                ) : (
                  <>
                    <span>ВЫЗВАТЬ ЗАМЕРЩИКА БЕСПЛАТНО</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-center pt-2">
                <span className="text-[11px] text-gray-400 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-600" />
                  <span>Выезд замерщика ни к чему вас не обязывает</span>
                </span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
