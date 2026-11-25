import variantsData from '../../config/variants.json';

// Detección de la variante activa:
// 1. Prioridad: Parámetro URL ?variant=basic o ?variant=premium (útil para demos)
// 2. Almacenamiento local (localStorage) para permitir cambios interactivos en vivo
// 3. Variable de entorno VITE_APP_VARIANT (default: 'basic')
export const getActiveVariantId = () => {
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    const urlVariant = params.get('variant');
    if (urlVariant && variantsData.variants[urlVariant]) {
      return urlVariant;
    }
    const stored = localStorage.getItem('app_active_variant');
    if (stored && variantsData.variants[stored]) {
      return stored;
    }
  }
  return import.meta.env.VITE_APP_VARIANT || 'basic';
};

export const setActiveVariantId = (variantId) => {
  if (variantsData.variants[variantId]) {
    localStorage.setItem('app_active_variant', variantId);
    window.location.reload();
  }
};

export const getVariantConfig = (variantId = getActiveVariantId()) => {
  return variantsData.variants[variantId] || variantsData.variants.basic;
};

export const isFeatureEnabled = (featureKey, variantId = getActiveVariantId()) => {
  const config = getVariantConfig(variantId);
  return Boolean(config.features && config.features[featureKey]);
};

export const getAllVariants = () => variantsData.variants;
