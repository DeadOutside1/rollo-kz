import React from 'react';
import { FileText, Calculator, Ruler, Wrench } from 'lucide-react';
import { HOW_WE_WORK_STEPS } from '../config/site';

export const HowWeWork: React.FC = () => {
  const stepIcons = [
    <FileText className="w-7 h-7 text-brand-700" />,
    <Calculator className="w-7 h-7 text-brand-700" />,
    <Ruler className="w-7 h-7 text-brand-700" />,
    <Wrench className="w-7 h-7 text-brand-700" />,
  ];

  return (
    <section id="how-it-works" className="py-20 bg-surface-light border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs sm:text-sm font-bold text-brand-700 tracking-wider uppercase mb-2 block">
            Простой и понятный процесс
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
            Как мы работаем?
          </h2>
          <p className="text-base text-gray-600">
            От заявки до готовых жалюзи на вашем окне — всего 4 простых шага и 3 рабочих дня.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {HOW_WE_WORK_STEPS.map((step, idx) => (
            <div key={step.step} className="flex flex-col items-center text-center relative group">
              
              {/* Step Circle with Icon */}
              <div className="w-20 h-20 rounded-full bg-white border-2 border-brand-200 shadow-soft flex items-center justify-center mb-6 relative group-hover:border-brand-600 transition-colors">
                {stepIcons[idx]}
                
                {/* Number Badge */}
                <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-brand-800 text-white text-xs font-bold flex items-center justify-center shadow-xs">
                  {step.step}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {step.title}
              </h3>

              {/* Badge */}
              <span className="inline-block px-3 py-1 rounded-full bg-brand-100 text-brand-800 text-xs font-bold mb-3">
                {step.badge}
              </span>

              {/* Description */}
              <p className="text-sm text-gray-600 leading-relaxed max-w-xs">
                {step.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
