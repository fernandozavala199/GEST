import React from 'react';
import { isFeatureEnabled, getVariantConfig } from '../config/features';

export default function Navbar({ activeTab, setActiveTab, user, onLogout }) {
  const discountsEnabled = isFeatureEnabled('discounts');
  const reportsEnabled = isFeatureEnabled('reports');
  const variantConfig = getVariantConfig();

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <div className="brand-icon">V</div>
        <div>
          <div className="brand-title">Gestión de Ventas</div>
          <div className="brand-subtitle">{variantConfig.name} • UNEMI Software</div>
        </div>
      </div>

      <div className="nav-links">
        <button
          type="button"
          className={`nav-btn ${activeTab === 'products' ? 'active' : ''}`}
          onClick={() => setActiveTab('products')}
        >
          📦 Productos
        </button>

        <button
          type="button"
          className={`nav-btn ${activeTab === 'customers' ? 'active' : ''}`}
          onClick={() => setActiveTab('customers')}
        >
          👥 Clientes
        </button>

        <button
          type="button"
          className={`nav-btn ${activeTab === 'sales' ? 'active' : ''}`}
          onClick={() => setActiveTab('sales')}
        >
          🛒 Ventas
        </button>

        {/* Feature Opcional: Descuentos */}
        {discountsEnabled ? (
          <button
            type="button"
            className={`nav-btn ${activeTab === 'discounts' ? 'active' : ''}`}
            onClick={() => setActiveTab('discounts')}
          >
            🏷️ Descuentos
            <span className="badge-premium-pill">PRO</span>
          </button>
        ) : null}

        {/* Feature Opcional: Reportes */}
        {reportsEnabled ? (
          <button
            type="button"
            className={`nav-btn ${activeTab === 'reports' ? 'active' : ''}`}
            onClick={() => setActiveTab('reports')}
          >
            📊 Reportes
            <span className="badge-premium-pill">PRO</span>
          </button>
        ) : null}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
        {user ? (
          <>
            <span style={{ fontSize: '0.85rem', color: '#475569' }}>
              👤 <strong>{user.name}</strong> ({user.role})
            </span>
            <button
              type="button"
              className="btn btn-outline"
              style={{ padding: '0.35rem 0.7rem', fontSize: '0.8rem' }}
              onClick={onLogout}
            >
              Cerrar Sesión
            </button>
          </>
        ) : null}
      </div>
    </nav>
  );
}
