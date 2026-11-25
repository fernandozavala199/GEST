import React from 'react';
import { getActiveVariantId, setActiveVariantId, getAllVariants } from '../config/features';

export default function VariantSwitcher({ onVariantChange }) {
  const activeId = getActiveVariantId();
  const variants = getAllVariants();
  const activeVariant = variants[activeId] || variants.basic;

  const handleSelect = (id) => {
    setActiveVariantId(id);
    if (onVariantChange) onVariantChange(id);
  };

  return (
    <div className="variant-banner">
      <div className="variant-info">
        <strong>Línea de Productos de Software (SPL):</strong>
        <span className={`variant-badge ${activeId}`}>
          {activeVariant.name}
        </span>
        <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>
          {activeVariant.description}
        </span>
      </div>
      <div className="variant-controls">
        <span style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>Cambiar Variante Activa:</span>
        <button
          type="button"
          className={`variant-toggle-btn ${activeId === 'basic' ? 'active' : ''}`}
          style={{ borderColor: activeId === 'basic' ? '#3b82f6' : '#475569' }}
          onClick={() => handleSelect('basic')}
        >
          Variante Básica
        </button>
        <button
          type="button"
          className={`variant-toggle-btn ${activeId === 'premium' ? 'active' : ''}`}
          style={{ borderColor: activeId === 'premium' ? '#f59e0b' : '#475569' }}
          onClick={() => handleSelect('premium')}
        >
          Variante Premium ★
        </button>
      </div>
    </div>
  );
}
