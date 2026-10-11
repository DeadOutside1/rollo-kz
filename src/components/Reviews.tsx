import React from 'react';
import { Star, MessageSquarePlus, CheckCircle2 } from 'lucide-react';
import { REVIEWS, SITE_CONFIG } from '../config/site';

export const Reviews: React.FC = () => {
  return (
    <section id="reviews" className="py-20 bg-surface-light border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs sm:text-sm font-bold text-brand-700 tracking-wider uppercase mb-2 block">
              Честные мнения
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
              Отзывы наших клиентов
            </h2>
            <p className="text-base text-gray-600">
              Каждый отзыв — это уютная квартира, современный дом или обновленный офис в Алматы и других городах Казахстана.
            </p>
          </div>

          <a
            href={SITE_CONFIG.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white border border-gray-200 text-gray-800 hover:text-brand-800 text-sm font-bold shadow-soft transition-all w-fit shrink-0 hover:border-brand-300"
          >
            <MessageSquarePlus className="w-4 h-4 text-brand-600" />
            <span>Оставить отзыв в WhatsApp</span>
          </a>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-100 shadow-soft hover:shadow-soft-lg transition-all flex flex-col justify-between"
            >
              <div>
                {/* Rating stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-xs font-bold text-gray-500 ml-1.5">5.0</span>
                </div>

                {/* Review Text */}
                <p className="text-sm text-gray-700 leading-relaxed italic mb-6">
                  «{rev.text}»
                </p>
              </div>

              {/* Author & Product */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                    <span>{rev.author}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-600" />
                  </div>
                  <div className="text-xs text-gray-400">{rev.city}</div>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-semibold text-brand-700 bg-brand-50 px-2 py-0.5 rounded-md block">
                    {rev.product}
                  </span>
                  <span className="text-[10px] text-gray-400 block mt-0.5">{rev.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
