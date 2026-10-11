export const ANALYTICS_CONFIG = {
  // Google Ads Conversion Tracking
  googleAdsId: import.meta.env.VITE_GOOGLE_ADS_ID || '',
  googleAdsLeadLabel: import.meta.env.VITE_GOOGLE_ADS_LEAD_LABEL || '',
  googleAdsCallLabel: import.meta.env.VITE_GOOGLE_ADS_CALL_LABEL || '',
  googleAdsWhatsAppLabel: import.meta.env.VITE_GOOGLE_ADS_WHATSAPP_LABEL || '',

  // Google Analytics 4 (GA4)
  ga4MeasurementId: import.meta.env.VITE_GA4_MEASUREMENT_ID || '',

  // Consent Mode v2 default settings
  defaultConsent: {
    ad_storage: 'denied',
    analytics_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  }
};
