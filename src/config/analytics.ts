export const ANALYTICS_CONFIG = {
  // Google Ads Conversion Tracking
  googleAdsId: import.meta.env.VITE_GOOGLE_ADS_ID || 'AW-10832388152',
  googleAdsLeadLabel: import.meta.env.VITE_GOOGLE_ADS_LEAD_LABEL || 'FqB_CIXiuJsdELjApK0o',
  googleAdsCallLabel: import.meta.env.VITE_GOOGLE_ADS_CALL_LABEL || 'kdE-CJjNuZsdELjApK0o',
  googleAdsWhatsAppLabel: import.meta.env.VITE_GOOGLE_ADS_WHATSAPP_LABEL || 'kdE-CJjNuZsdELjApK0o',

  // Google Analytics 4 (GA4)
  ga4MeasurementId: import.meta.env.VITE_GA4_MEASUREMENT_ID || '',

  // Consent Mode v2 default settings (granted so conversions fire smoothly)
  defaultConsent: {
    ad_storage: 'granted',
    analytics_storage: 'granted',
    ad_user_data: 'granted',
    ad_personalization: 'granted',
  }
};
