import React from 'react';
import { isFeatureEnabled, getVariantConfig } from '../config/features';
import { generateSalesStatistics } from '../utils/salesCalculator';
import { exportToCSV, exportToJSON } from '../utils/exportUtils';

export default function Reports({ sales, products, customers }) {
  const reportsEnabled = isFeatureEnabled('reports');
  const exportEnabled = isFeatureEnabled('export_reports');
  const variantConfig = getVariantConfig();

  if (!reportsEnabled) {
    return (
      <div className="card">
        <div className="feature-locked-alert">
          <h3>🔒 Módulo No Disponible en {variantConfig.name}</h3>
          <p>
            Los <strong>Reportes Estadísticos y Analítica</strong> son características opcionales exclusivas de la <strong>Variante Premium</strong>.
          </p>
          <p style={{ fontSize: '0.8rem', color: '#64748b' }}>
            Flag: <code>features.reports = false</code>
          </p>
        </div>
      </div>
    );
  }

  const stats = generateSalesStatistics(sales);

  const handleExportCSV = () => {
    const dataForExport = sales.map(s => ({
      Factura: s.id,
      Fecha: s.date,
      Cliente: s.customerName,
      Subtotal: s.subtotal,
      Descuento: s.discountAmount,
      IVA: s.tax,
      Total: s.total
    }));
    exportToCSV('Reporte_Ventas_UNEMI', dataForExport);
  };

  const handleExportJSON = () => {
    exportToJSON('Reporte_Completo_Ventas', {
      estadisticas: stats,
      ventas: sales,
      totalProductos: products.length,
      totalClientes: customers.length
    });
  };

  return (
    <div>
      {/* Tarjeta de Estadísticas Clave */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Ingresos Totales</div>
          <div className="stat-value" style={{ color: '#2563eb' }}>
            ${stats.totalRevenue.toFixed(2)}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
            {stats.totalTransactions} transacciones registradas
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Ticket Promedio</div>
          <div className="stat-value" style={{ color: '#059669' }}>
            ${stats.averageTicket.toFixed(2)}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
            Ingreso medio por venta
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Descuentos Concedidos</div>
          <div className="stat-value" style={{ color: '#d97706' }}>
            ${stats.totalDiscountsGiven.toFixed(2)}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
            En cupones promocionales
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Clientes Activos</div>
          <div className="stat-value" style={{ color: '#7c3aed' }}>
            {customers.length}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
            {products.length} productos en catálogo
          </div>
        </div>
      </div>

      {/* Tarjeta Principal de Análisis */}
      <div className="card">
        <div className="card-header">
          <div>
            <h2 className="card-title">📊 Reportes Estadísticos de Negocio</h2>
            <p className="card-subtitle">
              Módulo Analítico Avanzado • Característica Opcional {variantConfig.name}
            </p>
          </div>

          {/* Variabilidad: Botones de Exportación Condicionados */}
          {exportEnabled ? (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                type="button"
                className="btn btn-outline"
                style={{ fontSize: '0.8rem' }}
                onClick={handleExportCSV}
              >
                📥 Exportar CSV
              </button>
              <button
                type="button"
                className="btn btn-primary"
                style={{ fontSize: '0.8rem' }}
                onClick={handleExportJSON}
              >
                📄 Exportar JSON
              </button>
            </div>
          ) : (
            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
              (Exportación deshabilitada por configuración)
            </span>
          )}
        </div>

        {/* Resumen de Ventas por Cliente */}
        <h4 style={{ fontSize: '0.95rem', marginBottom: '0.75rem' }}>
          Volumen de Ventas Agrupado por Cliente:
        </h4>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Total Facturado</th>
                <th>Participación Aproximada</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(stats.salesByCustomer).map(([clientName, clientTotal]) => {
                const percentage = stats.totalRevenue > 0
                  ? ((clientTotal / stats.totalRevenue) * 100).toFixed(1)
                  : '0';
                return (
                  <tr key={clientName}>
                    <td><strong>{clientName}</strong></td>
                    <td>${clientTotal.toFixed(2)}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ width: '120px', height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                          <div style={{ width: `${percentage}%`, height: '100%', background: '#2563eb' }} />
                        </div>
                        <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{percentage}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
