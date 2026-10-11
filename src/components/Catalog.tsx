import React, { useState } from 'react';
import { BLIND_TYPES } from '../config/site';
import { ProductCard } from './ProductCard';

interface CatalogProps {
  onSelectForCalculator: (blindTypeId: string) => void;
  onOpenOrderModal: (productName?: string) => void;
}

export const Catalog: React.FC<CatalogProps> = ({
  onSelectForCalculator,
  onOpenOrderModal,
}) => {
  const [activeTab, setActiveTab] = useState('Все');

  const tabs = ['Все', 'Для дома', 'Для кухни', 'Для офиса', 'Популярное'];

  const filteredProducts = BLIND_TYPES.filter((item) => {
    if (activeTab === 'Все') return true;
    return item.tags.includes(activeTab);
  });

  return (
    <section id="catalog" className="py-20 bg-surface-light border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs sm:text-sm font-bold text-brand-700 tracking-wider uppercase mb-2 block">
            Каталог продукции
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
            Жалюзи и рулонные шторы для дома и офиса
          </h2>
          <p className="text-base text-gray-600">
            Более 500 видов качественных тканей из Турции и Китая. Изготавливаем изделия любой сложности по вашим индивидуальным размерам.
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === tab
                    ? 'bg-brand-800 text-white shadow-soft'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onCalculate={onSelectForCalculator}
              onOrder={onOpenOrderModal}
            />
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-brand-800 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-soft-lg">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold mb-1">
              Не уверены, какой тип жалюзи подойдет лучше?
            </h3>
            <p className="text-sm text-brand-200">
              Наш замерщик бесплатно приедет к вам с чемоданом образцов и поможет подобрать ткань под освещение и интерьер.
            </p>
          </div>
          <button
            onClick={() => onOpenOrderModal('Консультация с каталогом образцов')}
            className="shrink-0 px-6 py-3.5 rounded-xl bg-brand-500 hover:bg-brand-400 text-white font-bold text-sm shadow-md transition-all active:scale-95"
          >
            Вызвать замерщика с образцами
          </button>
        </div>
      </div>
    </section>
  );
};
