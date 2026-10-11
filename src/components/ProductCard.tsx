import React from 'react';
import { Calculator, ArrowRight, Layers } from 'lucide-react';
import { BlindTypeConfig } from '../types';
import { formatKZT } from '../lib/calculator';

interface ProductCardProps {
  product: BlindTypeConfig;
  onCalculate: (productId: string) => void;
  onOrder: (productName: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onCalculate,
  onOrder,
}) => {
  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-soft hover:shadow-soft-lg hover:-translate-y-1 transition-all duration-300 flex flex-col group">
      {/* Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Popular Ribbon */}
        {product.popular && (
          <div className="absolute top-3 left-3 bg-brand-800 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
            Хит продаж
          </div>
        )}

        {/* Options badge */}
        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md text-gray-800 text-xs font-semibold px-2.5 py-1 rounded-lg shadow-sm flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-brand-600" />
          <span>{product.optionsCount}+ вариантов</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-baseline justify-between gap-2 mb-2">
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-brand-800 transition-colors">
              {product.name}
            </h3>
          </div>

          {/* Price display */}
          <div className="mb-3.5 flex items-baseline gap-1.5">
            <span className="text-xs text-gray-500 font-medium">от</span>
            <span className="text-2xl font-black text-brand-700 tracking-tight">
              {formatKZT(product.pricePerSquareMeter)}
            </span>
            <span className="text-xs text-gray-500 font-medium">/ м²</span>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 mb-6">
            {product.description}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2.5 pt-4 border-t border-gray-100">
          <button
            onClick={() => onCalculate(product.id)}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-brand-200 bg-brand-50/50 hover:bg-brand-100/60 text-brand-900 text-xs sm:text-sm font-semibold transition-colors active:scale-95"
          >
            <Calculator className="w-4 h-4 text-brand-700" />
            <span>Рассчитать</span>
          </button>

          <button
            onClick={() => onOrder(product.name)}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs sm:text-sm font-bold shadow-sm transition-all active:scale-95"
          >
            <span>Заказать</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
