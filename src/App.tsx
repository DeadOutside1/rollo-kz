import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Catalog } from './components/Catalog';
import { Calculator } from './components/Calculator';
import { Advantages } from './components/Advantages';
import { HowWeWork } from './components/HowWeWork';
import { PortfolioGallery } from './components/PortfolioGallery';
import { Reviews } from './components/Reviews';
import { LeadForm } from './components/LeadForm';
import { Footer } from './components/Footer';
import { FloatingCallButton } from './components/FloatingCallButton';
import { OrderModal } from './components/OrderModal';
import { PrivacyPolicyModal } from './components/PrivacyPolicyModal';
import { CookieBanner } from './components/CookieBanner';
import { initAnalytics } from './lib/analytics';
import { BlindTypeId } from './types';

export const App: React.FC = () => {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [modalProductName, setModalProductName] = useState<string | undefined>(undefined);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [calculatorType, setCalculatorType] = useState<BlindTypeId>('day-night');

  useEffect(() => {
    initAnalytics();
  }, []);

  const handleOpenCalculator = (typeId?: string) => {
    if (typeId) {
      setCalculatorType(typeId as BlindTypeId);
    }
    const el = document.getElementById('calculator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenOrderModal = (productName?: string) => {
    setModalProductName(productName);
    setIsOrderModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface-light text-gray-900 selection:bg-brand-500 selection:text-white">
      {/* Fixed Sticky Header */}
      <Header
        onOpenCalculator={() => handleOpenCalculator()}
        onOpenOrderModal={handleOpenOrderModal}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {/* 1. Hero Screen */}
        <Hero onScrollToCalculator={() => handleOpenCalculator()} />

        {/* 2. Catalog Section */}
        <Catalog
          onSelectForCalculator={handleOpenCalculator}
          onOpenOrderModal={handleOpenOrderModal}
        />

        {/* 3. Interactive 5-Step Calculator */}
        <Calculator initialBlindType={calculatorType} />

        {/* 4. Advantages & Production (About Us) */}
        <Advantages />

        {/* 5. How We Work (4 Steps) */}
        <HowWeWork />

        {/* 6. Portfolio Gallery */}
        <PortfolioGallery onOrderType={handleOpenOrderModal} />

        {/* 7. Client Reviews */}
        <Reviews />

        {/* 8. Full Consultation Lead Form */}
        <LeadForm />
      </main>

      {/* Footer */}
      <Footer
        onOpenPrivacy={() => setIsPrivacyModalOpen(true)}
        onOpenOrderModal={() => handleOpenOrderModal()}
      />

      {/* Persistent Call & Contact Widget (Desktop float + Mobile bottom bar) */}
      <FloatingCallButton onScrollToCalculator={() => handleOpenCalculator()} />

      {/* Modals & Overlays */}
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        productName={modalProductName}
      />

      <PrivacyPolicyModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      />

      <CookieBanner onOpenPrivacy={() => setIsPrivacyModalOpen(true)} />
    </div>
  );
};

export default App;
