import React, { useState, useEffect, useMemo } from 'react';
import { 
  Calculator as CalcIcon, 
  HelpCircle, 
  Check, 
  Plus, 
  Minus, 
  Send, 
  Loader2, 
  Info,
  Sparkles
} from 'lucide-react';
import { BLIND_TYPES, FABRIC_OPTIONS, MOUNT_OPTIONS, COLOR_OPTIONS, CITIES_KZ } from '../config/site';
import { BlindTypeId, FabricType, MountType } from '../types';
import { calculateBlindPrice, formatKZT } from '../lib/calculator';
import { trackLeadConversion, trackCalculatorStart, trackCalculatorComplete } from '../lib/analytics';

interface CalculatorProps {
  initialBlindType?: BlindTypeId;
  onOpenOrderModalWithParams?: (params: any) => void;
}

export const Calculator: React.FC<CalculatorProps> = ({ initialBlindType }) => {
  // State
  const [selectedType, setSelectedType] = useState<BlindTypeId>(initialBlindType || 'day-night');
  const [width, setWidth] = useState<number>(120);
  const [height, setHeight] = useState<number>(160);
  const [quantity, setQuantity] = useState<number>(1);
  const [fabricType, setFabricType] = useState<FabricType>('standard');
  const [selectedColor, setSelectedColor] = useState<string>(COLOR_OPTIONS[0].name);
  const [mountType, setMountType] = useState<MountType>('sash');
  const [wishes, setWishes] = useState<string>('');

  // Form submission state
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientCity, setClientCity] = useState('Алматы');
  const [honeypot, setHoneypot] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Tooltips / Helpers modal
  const [showMeasureHelp, setShowMeasureHelp] = useState(false);

  // Update selectedType if prop changes
  useEffect(() => {
    if (initialBlindType) {
      setSelectedType(initialBlindType);
    }
  }, [initialBlindType]);

  // Track start on first mount
  useEffect(() => {
    trackCalculatorStart();
  }, []);

  // Calculation result
  const result = useMemo(() => {
    return calculateBlindPrice(selectedType, width, height, quantity, fabricType);
  }, [selectedType, width, height, quantity, fabricType]);

  // Track calculation completion
  useEffect(() => {
    if (result.totalPrice > 0) {
      trackCalculatorComplete(selectedType, result.totalPrice);
    }
  }, [result.totalPrice, selectedType]);

  const activeBlindConfig = useMemo(() => {
    return BLIND_TYPES.find((b) => b.id === selectedType) || BLIND_TYPES[0];
  }, [selectedType]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.startsWith('8')) val = '7' + val.slice(1);
    if (!val.startsWith('7')) val = '7' + val;

    let formatted = '+7';
    if (val.length > 1) formatted += ' (' + val.substring(1, 4);
    if (val.length >= 5) formatted += ') ' + val.substring(4, 7);
    if (val.length >= 8) formatted += '-' + val.substring(7, 9);
    if (val.length >= 10) formatted += '-' + val.substring(9, 11);

    setClientPhone(formatted);
  };

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    if (clientName.trim().length < 2) {
      setSubmitError('Пожалуйста, введите ваше имя');
      return;
    }

    const digits = clientPhone.replace(/\D/g, '');
    if (digits.length < 11) {
      setSubmitError('Пожалуйста, введите полный номер телефона');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        name: clientName.trim(),
        phone: clientPhone.trim(),
        city: clientCity,
        blindType: `${activeBlindConfig.name} (${selectedColor}, ${fabricType})`,
        width,
        height,
        quantity,
        estimatedPrice: result.totalPrice,
        comment: wishes || `Монтаж: ${mountType}, Ткань: ${fabricType}`,
        preferredContact: 'whatsapp',
        source: 'Онлайн-калькулятор ROLLO.KZ',
        honeypot,
      };

      const res = await fetch('/api/telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.ok) {
        setSubmitSuccess(true);
        trackLeadConversion(data.leadId || `calc_${Date.now()}`, result.totalPrice);
      } else {
        setSubmitError(data.error || 'Ошибка при отправке. Пожалуйста, попробуйте еще раз.');
      }
    } catch (err) {
      setSubmitError('Не удалось отправить заявку. Пожалуйста, позвоните нам.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="calculator" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100 text-brand-800 text-xs font-bold uppercase tracking-wider mb-3">
            <CalcIcon className="w-3.5 h-3.5 text-brand-700" />
            <span>Интерактивный расчет онлайн</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
            Калькулятор стоимости жалюзи
          </h2>
          <p className="text-base text-gray-600">
            Укажите приблизительные размеры оконного проема и выберите ткань. Калькулятор моментально покажет предварительную стоимость без скрытых наценок.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form Controls (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Step 1: Blind Type */}
            <div className="bg-surface-light rounded-3xl p-6 sm:p-7 border border-gray-100 shadow-soft">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-brand-800 text-white text-xs flex items-center justify-center font-bold">1</span>
                  <span>Выберите вид жалюзи</span>
                </h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {BLIND_TYPES.map((b) => {
                  const isSelected = selectedType === b.id;
                  return (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => setSelectedType(b.id)}
                      className={`relative p-3.5 rounded-2xl text-left transition-all border cursor-pointer ${
                        isSelected
                          ? 'bg-brand-50/80 border-brand-600 ring-2 ring-brand-500/30'
                          : 'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-brand-600 text-white flex items-center justify-center shadow-xs">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                      <div className="text-sm font-bold text-gray-900 leading-snug mb-1">
                        {b.shortName}
                      </div>
                      <div className="text-xs text-brand-700 font-semibold">
                        от {formatKZT(b.pricePerSquareMeter)}/м²
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Dimensions */}
            <div className="bg-surface-light rounded-3xl p-6 sm:p-7 border border-gray-100 shadow-soft">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-brand-800 text-white text-xs flex items-center justify-center font-bold">2</span>
                  <span>Укажите размеры окна (в сантиметрах)</span>
                </h3>

                <button
                  type="button"
                  onClick={() => setShowMeasureHelp(!showMeasureHelp)}
                  className="text-xs font-semibold text-brand-700 hover:text-brand-800 flex items-center gap-1 cursor-pointer"
                >
                  <HelpCircle className="w-4 h-4" />
                  <span className="hidden sm:inline">Как правильно замерить?</span>
                </button>
              </div>

              {showMeasureHelp && (
                <div className="p-4 mb-5 rounded-2xl bg-brand-100/60 border border-brand-200 text-xs sm:text-sm text-brand-900 leading-relaxed animate-in fade-in duration-200">
                  <div className="flex items-start gap-2.5">
                    <Info className="w-5 h-5 text-brand-700 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold mb-1">Подсказка по замерам:</p>
                      <ul className="list-disc list-inside space-y-1 text-brand-800">
                        <li><b>На створку:</b> замерьте ширину стекла от штапика до штапика + добавьте 2-3 см запаса.</li>
                        <li><b>В проем:</b> измерьте ширину проема и отнимите 1-2 см, чтобы изделие свободно двигалось.</li>
                        <li><b>На стену/потолок:</b> измерьте ширину проема и добавьте по 5-10 см с каждой стороны.</li>
                        <li className="text-brand-900 font-medium">Точные размеры бесплатно снимет наш замерщик перед изготовлением!</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Width */}
                <div>
                  <div className="flex justify-between text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    <span>Ширина: {width} см</span>
                    <span className="text-gray-400">({(width / 100).toFixed(2)} м)</span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="350"
                    step="5"
                    value={width}
                    onChange={(e) => setWidth(Number(e.target.value))}
                    className="w-full accent-brand-600 h-2 bg-gray-200 rounded-lg cursor-pointer"
                  />
                  <div className="flex items-center gap-2 mt-2">
                    <input
                      type="number"
                      min="30"
                      max="400"
                      value={width}
                      onChange={(e) => setWidth(Math.max(20, Math.min(400, Number(e.target.value))))}
                      className="w-24 px-3 py-1.5 rounded-lg border border-gray-200 text-sm font-semibold text-center"
                    />
                    <span className="text-xs text-gray-500">см (от 30 до 400 см)</span>
                  </div>
                </div>

                {/* Height */}
                <div>
                  <div className="flex justify-between text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    <span>Высота: {height} см</span>
                    <span className="text-gray-400">({(height / 100).toFixed(2)} м)</span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="350"
                    step="5"
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    className="w-full accent-brand-600 h-2 bg-gray-200 rounded-lg cursor-pointer"
                  />
                  <div className="flex items-center gap-2 mt-2">
                    <input
                      type="number"
                      min="30"
                      max="400"
                      value={height}
                      onChange={(e) => setHeight(Math.max(20, Math.min(400, Number(e.target.value))))}
                      className="w-24 px-3 py-1.5 rounded-lg border border-gray-200 text-sm font-semibold text-center"
                    />
                    <span className="text-xs text-gray-500">см (от 30 до 400 см)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Quantity & Additional Options */}
            <div className="bg-surface-light rounded-3xl p-6 sm:p-7 border border-gray-100 shadow-soft">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-brand-800 text-white text-xs flex items-center justify-center font-bold">3</span>
                  <span>Количество и плотность ткани</span>
                </h3>
              </div>

              {/* Quantity Counter */}
              <div className="mb-6 flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100">
                <div>
                  <div className="text-sm font-bold text-gray-900">Количество окон / изделий</div>
                  <div className="text-xs text-gray-500">Одинаковых размеров</div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 flex items-center justify-center font-bold transition-colors cursor-pointer"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center text-lg font-black text-gray-900">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.min(50, quantity + 1))}
                    className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 flex items-center justify-center font-bold transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Fabric Density */}
              <div className="mb-6">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Тип ткани и светопропускаемость:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {FABRIC_OPTIONS.map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setFabricType(f.id)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        fabricType === f.id
                          ? 'border-brand-600 bg-brand-50 text-brand-900 ring-1 ring-brand-500'
                          : 'border-gray-200 bg-white text-gray-800 hover:bg-gray-50'
                      }`}
                    >
                      <div className="text-xs font-bold">{f.name}</div>
                      <div className="text-[11px] text-gray-500 mt-0.5">{f.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Color choices */}
              <div className="mb-6">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Примерный оттенок:
                </label>
                <div className="flex flex-wrap gap-2">
                  {COLOR_OPTIONS.map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => setSelectedColor(c.name)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-medium cursor-pointer transition-all ${
                        selectedColor === c.name
                          ? 'border-brand-700 bg-white ring-2 ring-brand-500/40 font-bold'
                          : 'border-gray-200 bg-white hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-gray-300 shrink-0"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Mount Type */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Способ установки:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {MOUNT_OPTIONS.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setMountType(m.id)}
                      className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                        mountType === m.id
                          ? 'border-brand-600 bg-brand-50 text-brand-900 font-bold'
                          : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <div className="text-xs font-bold">{m.name}</div>
                      <div className="text-[10px] text-gray-500 mt-0.5">{m.description}</div>
                    </button>
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Visual Summary & Instant Order Form (5 cols) */}
          <div className="lg:col-span-5 sticky top-28 space-y-6">
            
            {/* Calculation Result Card */}
            <div className="bg-brand-800 text-white rounded-3xl p-6 sm:p-8 shadow-soft-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-36 h-36 bg-brand-700/50 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center justify-between pb-4 border-b border-brand-700/80 mb-5">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-brand-400" />
                    <span className="text-xs font-bold tracking-wider uppercase text-brand-200">
                      Предварительный расчёт
                    </span>
                  </div>
                  <span className="text-xs bg-brand-700/80 px-2.5 py-1 rounded-full text-brand-100 font-medium">
                    {quantity} шт.
                  </span>
                </div>

                {/* Parameters checklist */}
                <div className="space-y-2 text-xs sm:text-sm text-brand-100 mb-6">
                  <div className="flex justify-between">
                    <span className="text-brand-300">Тип изделия:</span>
                    <span className="font-semibold text-white">{activeBlindConfig.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-brand-300">Размеры:</span>
                    <span className="font-semibold text-white">{width} × {height} см ({result.areaPerItem} м²)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-brand-300">Плотность ткани:</span>
                    <span className="font-semibold text-white capitalize">{fabricType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-brand-300">Цвет:</span>
                    <span className="font-semibold text-white">{selectedColor}</span>
                  </div>
                </div>

                {/* Total Price Display */}
                <div className="bg-brand-900/80 rounded-2xl p-5 mb-5 border border-brand-700/50">
                  <span className="text-xs text-brand-300 uppercase tracking-wider block mb-1">
                    Итоговая сумма:
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                      {formatKZT(result.totalPrice)}
                    </span>
                    <span className="text-xs text-brand-300">
                      ({formatKZT(result.pricePerItem)} / шт.)
                    </span>
                  </div>
                  <div className="text-[11px] text-brand-400 mt-2 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-brand-400" />
                    <span>Замер и монтаж включены бесплатно</span>
                  </div>
                </div>

                <p className="text-[11px] text-brand-200 leading-relaxed mb-6">
                  * Предварительный расчёт. Точная сумма подтверждается замерщиком после выбора конкретной фактуры ткани по каталогу образцов.
                </p>

                {/* Submit Form */}
                {submitSuccess ? (
                  <div className="bg-white text-gray-900 p-6 rounded-2xl text-center shadow-lg animate-in fade-in zoom-in-95">
                    <div className="w-12 h-12 bg-brand-500 text-white rounded-full flex items-center justify-center mx-auto mb-3">
                      <Check className="w-6 h-6 stroke-[3]" />
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-1">Заявка на расчет принята!</h4>
                    <p className="text-xs text-gray-600 mb-3">
                      Мы зафиксировали стоимость <b>{formatKZT(result.totalPrice)}</b> за вашим номером. Менеджер свяжется с вами в течение 15 минут.
                    </p>
                    <button
                      onClick={() => setSubmitSuccess(false)}
                      className="text-xs font-semibold text-brand-700 underline"
                    >
                      Рассчитать другое окно
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleOrderSubmit} className="space-y-3">
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
                      <input
                        type="text"
                        required
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="Ваше имя"
                        className="w-full px-4 py-3 rounded-xl bg-white text-gray-900 text-sm outline-none placeholder:text-gray-400 font-medium"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="tel"
                        required
                        value={clientPhone}
                        onChange={handlePhoneChange}
                        placeholder="+7 (700) 000-00-00"
                        className="w-full px-4 py-3 rounded-xl bg-white text-gray-900 text-sm outline-none placeholder:text-gray-400 font-medium"
                      />

                      <select
                        value={clientCity}
                        onChange={(e) => setClientCity(e.target.value)}
                        className="w-full px-3 py-3 rounded-xl bg-white text-gray-900 text-sm outline-none font-medium cursor-pointer"
                      >
                        {CITIES_KZ.map((city) => (
                          <option key={city} value={city}>{city}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <input
                        type="text"
                        value={wishes}
                        onChange={(e) => setWishes(e.target.value)}
                        placeholder="Комментарий или пожелания (необязательно)"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/90 text-gray-900 text-xs outline-none placeholder:text-gray-400"
                      />
                    </div>

                    {submitError && (
                      <p className="text-xs text-red-300 font-semibold">{submitError}</p>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 px-6 rounded-xl bg-brand-500 hover:bg-brand-400 active:scale-[0.98] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Фиксируем расчет...</span>
                        </>
                      ) : (
                        <>
                          <span>ЗАФИКСИРОВАТЬ РАСЧЁТ И СКИДКУ 10%</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
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
