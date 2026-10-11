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
  const { googleAdsId, ga4MeasurementId, defaultConsent } = ANALYTICS_CONFIG;

  if (!googleAdsId && !ga4MeasurementId) {
    // Analytics not configured, skip loading scripts
    return;
  }

  // Ensure dataLayer exists
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]) {
    window.dataLayer?.push(args);
  }
  window.gtag = gtag;

  // Setup Default Consent Mode v2 before any tags load
  gtag('consent', 'default', defaultConsent);
  gtag('js', new Date());

  // Configure Google Ads if present
  if (googleAdsId) {
    gtag('config', googleAdsId);
  }

  // Configure GA4 if present
  if (ga4MeasurementId) {
    gtag('config', ga4MeasurementId, {
      send_page_view: true,
    });
  }

  // Inject Google Tag script only once
  const tagId = googleAdsId || ga4MeasurementId;
  const scriptId = 'google-tag-manager';
  if (tagId && !document.getElementById(scriptId)) {
    const script = document.createElement('script');
    script.id = scriptId;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(tagId)}`;
    document.head.appendChild(script);
  }
}

/**
 * Update Consent Mode when user confirms cookie settings
 */
export function updateConsent(granted: boolean) {
  if (typeof window.gtag !== 'function') return;

  const status = granted ? 'granted' : 'denied';
  window.gtag('consent', 'update', {
    ad_storage: status,
    analytics_storage: status,
    ad_user_data: status,
    ad_personalization: status,
  });
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
  if (googleAdsId && googleAdsLeadLabel && typeof window.gtag === 'function') {
    const sendTo = `${googleAdsId}/${googleAdsLeadLabel}`;
    window.gtag('event', 'conversion', {
      send_to: sendTo,
      value: value || 1,
      currency: 'KZT',
      transaction_id: leadId,
    });
  }

  // GA4 custom event (NO PII transmitted!)
  if (ANALYTICS_CONFIG.ga4MeasurementId && typeof window.gtag === 'function') {
    window.gtag('event', 'generate_lead', {
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

  if (googleAdsId && googleAdsCallLabel && typeof window.gtag === 'function') {
    window.gtag('event', 'conversion', {
      send_to: `${googleAdsId}/${googleAdsCallLabel}`,
    });
  }

  if (ANALYTICS_CONFIG.ga4MeasurementId && typeof window.gtag === 'function') {
    window.gtag('event', 'click_to_call', {
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

  if (googleAdsId && googleAdsWhatsAppLabel && typeof window.gtag === 'function') {
    window.gtag('event', 'conversion', {
      send_to: `${googleAdsId}/${googleAdsWhatsAppLabel}`,
    });
  }

  if (ANALYTICS_CONFIG.ga4MeasurementId && typeof window.gtag === 'function') {
    window.gtag('event', 'click_to_whatsapp', {
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
