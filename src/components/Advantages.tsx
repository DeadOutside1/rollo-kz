import React from 'react';
import { Calendar, Globe2, Factory, Wrench } from 'lucide-react';
import { ADVANTAGES } from '../config/site';

export const Advantages: React.FC = () => {
  const icons = [
    <Calendar className="w-6 h-6 text-brand-600" />,
    <Globe2 className="w-6 h-6 text-brand-600" />,
    <Factory className="w-6 h-6 text-brand-600" />,
    <Wrench className="w-6 h-6 text-brand-600" />
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs sm:text-sm font-bold text-brand-700 tracking-wider uppercase mb-2 block">
            О компании
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
            Компания «Жалюзи Rollo.kz»
          </h2>
          <p className="text-base text-gray-600">
            Делаем ваш дом и офис уютнее с 2007 года. Прямое собственное производство и честный сервис без посредников.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: 4 Key Advantages */}
          <div className="lg:col-span-6 space-y-4">
            {ADVANTAGES.map((adv, idx) => (
              <div
                key={adv.title}
                className="p-5 sm:p-6 rounded-3xl bg-surface-light border border-gray-100 hover:border-brand-200 transition-all flex items-start gap-4 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-white shadow-soft flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  {icons[idx]}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-base sm:text-lg font-bold text-gray-900">
                      {adv.title}
                    </h3>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-brand-100 text-brand-800">
                      {adv.highlight}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {adv.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Real Photos */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative rounded-3xl overflow-hidden shadow-soft-lg group aspect-[3/4]">
              <img
                src="/images/master.webp"
                alt="Мастер замерщик жалюзи Rollo.kz"
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 bg-brand-800 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-md">
                ROLLO.KZ
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-5">
                <span className="text-white text-xs font-medium">
                  Опытные мастера с профессиональным инструментом
                </span>
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden shadow-soft-lg group aspect-[3/4]">
              <img
                src="/images/details.webp"
                alt="Премиальные детали двойных роллов"
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-5">
                <span className="text-white text-xs font-medium">
                  Премиальная фурнитура и ткани из Турции и Китая
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
