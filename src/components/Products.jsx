import React, { useState } from 'react';
import { getVariantConfig } from '../config/features';

export default function Products({ products, setProducts }) {
  const variantConfig = getVariantConfig();
  const maxAllowed = variantConfig.limits?.maxProducts || 50;

  const [form, setForm] = useState({
    code: '',
    name: '',
    category: 'Electrónica',
    price: '',
    stock: ''
  });

  const handleAdd = (e) => {
    e.preventDefault();
    if (products.length >= maxAllowed) {
      alert(`Límite alcanzado para la ${variantConfig.name} (${maxAllowed} productos). Actualice a la variante Premium para capacidad extendida.`);
      return;
    }

    const newProduct = {
      id: Date.now(),
      code: form.code || `PRD-${String(products.length + 1).padStart(3, '0')}`,
      name: form.name,
      category: form.category,
      price: parseFloat(form.price) || 0,
      stock: parseInt(form.stock, 10) || 0
    };

    setProducts([...products, newProduct]);
    setForm({ code: '', name: '', category: 'Electrónica', price: '', stock: '' });
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Desea eliminar este producto?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <h2 className="card-title">📦 Catálogo de Productos</h2>
          <p className="card-subtitle">
            Gestión de inventario ({products.length} de {maxAllowed} permitidos en {variantConfig.name})
          </p>
        </div>
      </div>

      {/* Formulario de Registro */}
      <form onSubmit={handleAdd} className="form-grid">
        <div className="form-group">
          <label>Código:</label>
          <input
            type="text"
            placeholder="PRD-007"
            value={form.code}
            onChange={(e) => setForm({ ...form, code: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Nombre del Producto:</label>
          <input
            type="text"
            placeholder="Ej: Impresora Epson L3250"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Categoría:</label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            <option value="Electrónica">Electrónica</option>
            <option value="Accesorios">Accesorios</option>
            <option value="Mobiliario">Mobiliario</option>
            <option value="Audio">Audio</option>
            <option value="Software">Software</option>
          </select>
        </div>
        <div className="form-group">
          <label>Precio Unitario ($):</label>
          <input
            type="number"
            step="0.01"
            min="0"
            required
            placeholder="0.00"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Stock Disponible:</label>
          <input
            type="number"
            min="0"
            required
            placeholder="0"
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: e.target.value })}
          />
        </div>
        <div className="form-group" style={{ justifyContent: 'flex-end' }}>
          <button type="submit" className="btn btn-primary" style={{ height: '42px', marginTop: 'auto' }}>
            + Agregar Producto
          </button>
        </div>
      </form>

      {/* Tabla de Productos */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Código</th>
              <th>Descripción</th>
              <th>Categoría</th>
              <th>Precio ($)</th>
              <th>Stock</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td><strong>{p.code}</strong></td>
                <td>{p.name}</td>
                <td>{p.category}</td>
                <td>${p.price.toFixed(2)}</td>
                <td>{p.stock} unids.</td>
                <td>
                  <span className={`status-badge ${p.stock > 10 ? 'success' : 'warning'}`}>
                    {p.stock > 10 ? 'En Stock' : 'Stock Bajo'}
                  </span>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-outline"
                    style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', color: '#dc2626' }}
                    onClick={() => handleDelete(p.id)}
                  >
                    Eliminar
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
