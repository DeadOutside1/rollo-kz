import { ANALYTICS_CONFIG } from '../config/analytics';

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

// Tracked leads cache to prevent duplicate conversion fire
const trackedLeadIds = new Set<string>();

/**
 * Initialize Google Tag and Consent Mode v2
 */
export function initAnalytics() {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== 'function') {
    function gtag() {
      window.dataLayer?.push(arguments);
    }
    window.gtag = gtag as any;
  }

  const { ga4MeasurementId } = ANALYTICS_CONFIG;
  if (ga4MeasurementId && typeof window.gtag === 'function') {
    window.gtag('config', ga4MeasurementId, { send_page_view: true });
  }

  // Global catch-all listener for any link navigating or redirecting to WhatsApp
  if (typeof document !== 'undefined') {
    document.addEventListener('click', (e) => {
      const target = (e.target as HTMLElement)?.closest('a');
      if (target && target.href && (target.href.includes('wa.me') || target.href.includes('whatsapp.com'))) {
        trackWhatsAppClick();
      }
    }, { capture: true });
  }
}

/**
 * Update Consent Mode
 */
export function updateConsent(_granted?: boolean) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;

  // For KZ, always keep analytics active
  window.gtag('consent', 'update', {
    ad_storage: 'granted',
    analytics_storage: 'granted',
    ad_user_data: 'granted',
    ad_personalization: 'granted',
  });
}

function safeGtag(...args: any[]) {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    if (typeof window.gtag === 'function') {
      window.gtag(...args);
    } else {
      window.dataLayer.push(arguments);
    }
  }
}

/**
 * Track Primary Conversion: Confirmed Lead Submission
 * Fired ONLY when the server confirms successful lead processing!
 * Prevents double counting via unique leadId.
 */
export function trackLeadConversion(leadId: string, value?: number | null) {
  if (!leadId || trackedLeadIds.has(leadId)) {
    return; // Prevent duplicate conversion events
  }
  trackedLeadIds.add(leadId);

  const { googleAdsId, googleAdsLeadLabel } = ANALYTICS_CONFIG;

  // Google Ads Lead Conversion
  if (googleAdsId && googleAdsLeadLabel) {
    const sendTo = `${googleAdsId}/${googleAdsLeadLabel}`;
    
    // 1. Standard gtag event call
    safeGtag('event', 'conversion', {
      send_to: sendTo,
      value: value || 1.0,
      currency: 'KZT',
      transaction_id: leadId,
    });

    // 2. Direct dataLayer push for Tag Assistant / GTM inspection
    if (typeof window !== 'undefined' && Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: 'conversion',
        send_to: sendTo,
        value: value || 1.0,
        currency: 'KZT',
        transaction_id: leadId,
      });
    }

    console.log('🎯 [Google Ads] Lead Conversion fired:', sendTo, { leadId, value });
  }

  // GA4 custom event (NO PII transmitted!)
  if (ANALYTICS_CONFIG.ga4MeasurementId) {
    safeGtag('event', 'generate_lead', {
      value: value || 0,
      currency: 'KZT',
      lead_id: leadId,
    });
  }
}

/**
 * Track Phone Click (Auxiliary conversion)
 */
export function trackPhoneClick() {
  const { googleAdsId, googleAdsCallLabel } = ANALYTICS_CONFIG;

  if (googleAdsId && googleAdsCallLabel) {
    const sendTo = `${googleAdsId}/${googleAdsCallLabel}`;
    safeGtag('event', 'conversion', {
      send_to: sendTo,
      value: 1.0,
      currency: 'KZT',
    });
    console.log('📞 [Google Ads] Phone Click Conversion fired:', sendTo);
  }

  if (ANALYTICS_CONFIG.ga4MeasurementId) {
    safeGtag('event', 'click_to_call', {
      event_category: 'engagement',
      event_label: 'phone_call',
    });
  }
}

/**
 * Track WhatsApp Click (Auxiliary conversion)
 */
export function trackWhatsAppClick() {
  const { googleAdsId, googleAdsWhatsAppLabel } = ANALYTICS_CONFIG;

  if (googleAdsId && googleAdsWhatsAppLabel) {
    const sendTo = `${googleAdsId}/${googleAdsWhatsAppLabel}`;
    
    // 1. Standard gtag event call
    safeGtag('event', 'conversion', {
      send_to: sendTo,
      value: 1.0,
      currency: 'KZT',
      transport: 'beacon',
    });

    // 2. Direct dataLayer push
    if (typeof window !== 'undefined' && Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: 'conversion',
        send_to: sendTo,
        value: 1.0,
        currency: 'KZT',
      });
    }

    console.log('💬 [Google Ads] WhatsApp Conversion fired:', sendTo);
  }

  if (ANALYTICS_CONFIG.ga4MeasurementId) {
    safeGtag('event', 'click_to_whatsapp', {
      event_category: 'engagement',
      event_label: 'whatsapp_chat',
    });
  }
}

/**
 * Track Calculator Started
 */
export function trackCalculatorStart() {
  if (ANALYTICS_CONFIG.ga4MeasurementId && typeof window.gtag === 'function') {
    window.gtag('event', 'calculator_start', {
      event_category: 'calculator',
    });
  }
}

/**
 * Track Calculator Calculation Completed
 */
export function trackCalculatorComplete(blindType: string, estimatedPrice: number) {
  if (ANALYTICS_CONFIG.ga4MeasurementId && typeof window.gtag === 'function') {
    window.gtag('event', 'calculator_complete', {
      event_category: 'calculator',
      blind_type: blindType,
      value: estimatedPrice,
      currency: 'KZT',
    });
  }
}
