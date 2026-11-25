import React, { useState } from 'react';
import { isFeatureEnabled, getVariantConfig } from '../config/features';
import { calculateSaleTotal } from '../utils/salesCalculator';

export default function Sales({ sales, setSales, products, customers, discounts }) {
  const discountsEnabled = isFeatureEnabled('discounts');
  const variantConfig = getVariantConfig();

  const [selectedCustomer, setSelectedCustomer] = useState(customers[0]?.id || '');
  const [selectedProduct, setSelectedProduct] = useState(products[0]?.id || '');
  const [quantity, setQuantity] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [selectedDiscountId, setSelectedDiscountId] = useState('');

  const activeDiscount = discountsEnabled
    ? discounts.find(d => d.id === selectedDiscountId)
    : null;

  const currentCalculation = calculateSaleTotal(cartItems, activeDiscount, discountsEnabled);

  const handleAddToCart = (e) => {
    e.preventDefault();
    const prod = products.find(p => p.id === Number(selectedProduct));
    if (!prod) return;

    if (quantity > prod.stock) {
      alert(`Stock insuficiente. Solo quedan ${prod.stock} unidades.`);
      return;
    }

    const existingIndex = cartItems.findIndex(i => i.productId === prod.id);
    if (existingIndex >= 0) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += Number(quantity);
      setCartItems(updated);
    } else {
      setCartItems([
        ...cartItems,
        {
          productId: prod.id,
          name: prod.name,
          price: prod.price,
          quantity: Number(quantity)
        }
      ]);
    }
    setQuantity(1);
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems(cartItems.filter(i => i.productId !== productId));
  };

  const handleCompleteSale = () => {
    if (cartItems.length === 0) {
      alert('Agregue al menos un producto a la venta.');
      return;
    }

    const customer = customers.find(c => c.id === Number(selectedCustomer)) || { name: 'Consumidor Final' };

    const newSale = {
      id: `VENTA-${Date.now().toString().slice(-4)}`,
      date: new Date().toISOString().split('T')[0],
      customerId: customer.id || 0,
      customerName: customer.name,
      items: [...cartItems],
      subtotal: currentCalculation.subtotal,
      discountAmount: currentCalculation.discountAmount,
      discountCode: activeDiscount ? activeDiscount.code : null,
      tax: currentCalculation.tax,
      total: currentCalculation.total
    };

    setSales([newSale, ...sales]);
    setCartItems([]);
    setSelectedDiscountId('');
    alert(`¡Venta #${newSale.id} registrada exitosamente por un total de $${newSale.total}!`);
  };

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <div>
            <h2 className="card-title">🛒 Punto de Venta y Facturación</h2>
            <p className="card-subtitle">
              Módulo de facturación • {variantConfig.name} {discountsEnabled ? '(Con soporte para Descuentos Promocionales)' : '(Sin módulo de descuentos)'}
            </p>
          </div>
        </div>

        {/* Sección de Selección de Cliente y Productos */}
        <div className="form-grid">
          <div className="form-group">
            <label>Seleccionar Cliente:</label>
            <select
              value={selectedCustomer}
              onChange={(e) => setSelectedCustomer(e.target.value)}
            >
              {customers.map(c => (
                <option key={c.id} value={c.id}>{c.name} ({c.docId})</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Seleccionar Producto:</label>
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
            >
              {products.map(p => (
                <option key={p.id} value={p.id}>
                  {p.name} - ${p.price.toFixed(2)} (Stock: {p.stock})
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Cantidad:</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
            />
          </div>

          <div className="form-group" style={{ justifyContent: 'flex-end' }}>
            <button
              type="button"
              className="btn btn-primary"
              style={{ height: '42px', marginTop: 'auto' }}
              onClick={handleAddToCart}
            >
              + Agregar al Carrito
            </button>
          </div>
        </div>

        {/* Variabilidad: Gestión de descuentos solo en Premium */}
        {discountsEnabled ? (
          <div style={{ background: '#fef3c7', padding: '0.85rem', borderRadius: '6px', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontWeight: 600, color: '#92400e', fontSize: '0.85rem' }}>
              ⭐ Aplicar Descuento Especial (Función Premium):
            </span>
            <select
              value={selectedDiscountId}
              onChange={(e) => setSelectedDiscountId(e.target.value)}
              style={{ padding: '0.4rem 0.6rem', borderRadius: '6px', border: '1px solid #d97706', fontSize: '0.85rem' }}
            >
              <option value="">Sin descuento aplicado</option>
              {discounts.map(d => (
                <option key={d.id} value={d.id}>
                  {d.code} - {d.description} ({d.percentage}%)
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div style={{ background: '#f8fafc', padding: '0.6rem 0.9rem', borderRadius: '6px', marginBottom: '1rem', fontSize: '0.8rem', color: '#64748b' }}>
            ℹ️ <em>Nota de Variabilidad: El módulo de descuentos promocionales está deshabilitado en la Variante Básica.</em>
          </div>
        )}

        {/* Tabla del Carrito */}
        <div style={{ marginTop: '1rem', borderTop: '1px solid #e2e8f0', paddingTop: '1rem' }}>
          <h4 style={{ marginBottom: '0.75rem', fontSize: '1rem' }}>Artículos de la Venta en Curso:</h4>
          {cartItems.length === 0 ? (
            <p style={{ color: '#94a3b8', fontStyle: 'italic', fontSize: '0.9rem' }}>El carrito está vacío. Agregue productos arriba.</p>
          ) : (
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Total</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map(item => (
                    <tr key={item.productId}>
                      <td>{item.name}</td>
                      <td>${item.price.toFixed(2)}</td>
                      <td>{item.quantity}</td>
                      <td>${(item.price * item.quantity).toFixed(2)}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-outline"
                          style={{ padding: '0.2rem 0.4rem', fontSize: '0.7rem', color: '#dc2626' }}
                          onClick={() => handleRemoveFromCart(item.productId)}
                        >
                          Quitar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Totales */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                <div style={{ width: '280px', background: '#f8fafc', padding: '1rem', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem', fontSize: '0.9rem' }}>
                    <span>Subtotal:</span>
                    <span>${currentCalculation.subtotal.toFixed(2)}</span>
                  </div>
                  {discountsEnabled && currentCalculation.discountAmount > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem', fontSize: '0.9rem', color: '#16a34a' }}>
                      <span>Descuento ({activeDiscount?.percentage}%):</span>
                      <span>-${currentCalculation.discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem', fontSize: '0.9rem' }}>
                    <span>IVA (15%):</span>
                    <span>${currentCalculation.tax.toFixed(2)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1.1rem', borderTop: '1px solid #cbd5e1', paddingTop: '0.5rem', marginTop: '0.5rem' }}>
                    <span>Total a Pagar:</span>
                    <span>${currentCalculation.total.toFixed(2)}</span>
                  </div>

                  <button
                    type="button"
                    className="btn btn-success"
                    style={{ width: '100%', marginTop: '1rem' }}
                    onClick={handleCompleteSale}
                  >
                    ✓ Confirmar y Facturar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Historial de Ventas */}
      <div className="card">
        <h3 className="card-title" style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
          📜 Historial de Ventas Registradas
        </h3>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>N° Factura</th>
                <th>Fecha</th>
                <th>Cliente</th>
                <th>Subtotal</th>
                <th>Descuento</th>
                <th>IVA</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {sales.map(s => (
                <tr key={s.id}>
                  <td><strong>{s.id}</strong></td>
                  <td>{s.date}</td>
                  <td>{s.customerName}</td>
                  <td>${s.subtotal.toFixed(2)}</td>
                  <td>
                    {s.discountAmount > 0 ? (
                      <span style={{ color: '#16a34a', fontWeight: 600 }}>
                        -${s.discountAmount.toFixed(2)} ({s.discountCode})
                      </span>
                    ) : '$0.00'}
                  </td>
                  <td>${s.tax.toFixed(2)}</td>
                  <td><strong>${s.total.toFixed(2)}</strong></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
