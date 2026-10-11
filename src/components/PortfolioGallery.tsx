import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../config/site';

interface PortfolioGalleryProps {
  onOrderType: (typeName: string) => void;
}

export const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({ onOrderType }) => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'Все помещения' },
    { id: 'living', label: 'Гостиная' },
    { id: 'bedroom', label: 'Спальня' },
    { id: 'kitchen', label: 'Кухня' },
    { id: 'office', label: 'Офис' },
    { id: 'modern', label: 'Современный интерьер' },
  ];

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.room === activeFilter;
  });

  return (
    <section id="portfolio" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs sm:text-sm font-bold text-brand-700 tracking-wider uppercase mb-2 block">
            Галерея проектов
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
            Примеры жалюзи в реальных интерьерах
          </h2>
          <p className="text-base text-gray-600">
            Посмотрите, как различные модели и фактуры тканей смотрятся в жилых комнатах и офисных пространствах.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeFilter === f.id
                    ? 'bg-brand-800 text-white shadow-soft'
                    : 'bg-surface-light text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-3xl overflow-hidden bg-gray-100 border border-gray-100 shadow-soft hover:shadow-soft-lg transition-all aspect-[4/3]"
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Overlay with info on hover/mobile */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-gray-950/20 to-transparent opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
                <span className="text-xs font-bold text-brand-300 uppercase tracking-wider mb-1">
                  {item.roomLabel}
                </span>
                <h4 className="text-lg font-bold mb-3">{item.title}</h4>
                <button
                  onClick={() => onOrderType(item.type)}
                  className="inline-flex items-center justify-center py-2 px-4 rounded-xl bg-brand-500 hover:bg-brand-400 text-white text-xs font-bold w-fit transition-colors shadow-sm"
                >
                  Заказать такой вариант
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
