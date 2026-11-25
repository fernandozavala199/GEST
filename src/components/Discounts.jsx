import React, { useState } from 'react';
import { isFeatureEnabled, getVariantConfig } from '../config/features';

export default function Discounts({ discounts, setDiscounts }) {
  const discountsEnabled = isFeatureEnabled('discounts');
  const variantConfig = getVariantConfig();

  const [form, setForm] = useState({
    code: '',
    description: '',
    percentage: ''
  });

  if (!discountsEnabled) {
    return (
      <div className="card">
        <div className="feature-locked-alert">
          <h3>🔒 Módulo No Disponible en {variantConfig.name}</h3>
          <p>
            La <strong>Gestión de Descuentos</strong> es una característica opcional del Modelo de Características (Feature Model), activa únicamente en la <strong>Variante Premium</strong>.
          </p>
          <p style={{ fontSize: '0.8rem', color: '#64748b' }}>
            Flag: <code>features.discounts = false</code>
          </p>
        </div>
      </div>
    );
  }

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.code || !form.percentage) return;

    const newDiscount = {
      id: `DESC-${Date.now().toString().slice(-4)}`,
      code: form.code.toUpperCase().trim(),
      description: form.description || 'Promoción Especial',
      percentage: Number(form.percentage),
      active: true
    };

    setDiscounts([...discounts, newDiscount]);
    setForm({ code: '', description: '', percentage: '' });
  };

  const handleToggle = (id) => {
    setDiscounts(discounts.map(d => d.id === id ? { ...d, active: !d.active } : d));
  };

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <h2 className="card-title">🏷️ Gestión de Descuentos y Promociones</h2>
          <p className="card-subtitle">
            Característica Opcional habilitada en {variantConfig.name}
          </p>
        </div>
        <span className="badge-premium-pill" style={{ fontSize: '0.8rem', padding: '4px 10px' }}>
          Característica Premium Activa
        </span>
      </div>

      <form onSubmit={handleAdd} className="form-grid">
        <div className="form-group">
          <label>Código del Cupón:</label>
          <input
            type="text"
            required
            placeholder="EJEMPLO: NAVIDAD25"
            value={form.code}
            onChange={(e) => setForm({ ...form, code: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Descripción:</label>
          <input
            type="text"
            placeholder="Descuento especial fin de año"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Porcentaje (%):</label>
          <input
            type="number"
            min="1"
            max="100"
            required
            placeholder="15"
            value={form.percentage}
            onChange={(e) => setForm({ ...form, percentage: e.target.value })}
          />
        </div>
        <div className="form-group" style={{ justifyContent: 'flex-end' }}>
          <button type="submit" className="btn btn-primary" style={{ height: '42px', marginTop: 'auto' }}>
            + Crear Descuento
          </button>
        </div>
      </form>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Código</th>
              <th>Descripción</th>
              <th>Porcentaje</th>
              <th>Estado</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {discounts.map(d => (
              <tr key={d.id}>
                <td><strong>{d.code}</strong></td>
                <td>{d.description}</td>
                <td>{d.percentage}%</td>
                <td>
                  <span className={`status-badge ${d.active ? 'success' : 'warning'}`}>
                    {d.active ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-outline"
                    style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
                    onClick={() => handleToggle(d.id)}
                  >
                    {d.active ? 'Desactivar' : 'Activar'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
