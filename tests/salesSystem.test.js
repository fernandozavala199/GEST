import { describe, it, expect } from 'vitest';
import { calculateSaleTotal, generateSalesStatistics, TAX_RATE } from '../src/utils/salesCalculator';
import { validateFeatureConfigurations } from '../scripts/validate-config';
import variantsData from '../config/variants.json';

describe('Suite de Pruebas Automatizadas - Sistema de Ventas con Variabilidad (UNEMI)', () => {

  // PRUEBA 1: Cálculo de venta estándar sin descuento (Comportamiento Variante Básica)
  it('1. Debe calcular correctamente subtotal, IVA (15%) y total en ventas estándar sin descuentos', () => {
    const items = [
      { productId: 1, name: 'Laptop', price: 500.00, quantity: 2 }, // 1000.00
      { productId: 2, name: 'Mouse', price: 20.00, quantity: 1 }     // 20.00
    ];

    const result = calculateSaleTotal(items, null, false);

    expect(result.subtotal).toBe(1020.00);
    expect(result.discountAmount).toBe(0.00);
    expect(result.tax).toBe(153.00); // 1020 * 0.15 = 153.00
    expect(result.total).toBe(1173.00);
  });

  // PRUEBA 2: Cálculo con descuento habilitado (Comportamiento Variante Premium)
  it('2. Debe aplicar correctamente el porcentaje de descuento si allowDiscounts es true', () => {
    const items = [
      { productId: 1, name: 'Monitor', price: 200.00, quantity: 2 } // 400.00
    ];
    const discount = { code: 'PROMO10', percentage: 10 };

    const result = calculateSaleTotal(items, discount, true);

    expect(result.subtotal).toBe(400.00);
    expect(result.discountAmount).toBe(40.00); // 10% de 400
    expect(result.taxableAmount).toBe(360.00);
    expect(result.tax).toBe(54.00); // 360 * 0.15 = 54.00
    expect(result.total).toBe(414.00);
  });

  // PRUEBA 3: Protección de variabilidad - Descuento bloqueado en Variante Básica
  it('3. Debe ignorar cualquier descuento si allowDiscounts es false (Variante Básica)', () => {
    const items = [
      { productId: 1, name: 'Teclado', price: 50.00, quantity: 2 } // 100.00
    ];
    const unauthorizedDiscount = { code: 'HACK20', percentage: 20 };

    const result = calculateSaleTotal(items, unauthorizedDiscount, false);

    expect(result.discountAmount).toBe(0.00);
    expect(result.taxableAmount).toBe(100.00);
    expect(result.total).toBe(115.00);
  });

  // PRUEBA 4: Generación de analítica y reporte estadístico (Módulo Premium)
  it('4. Debe computar correctamente los totales acumulados y ticket promedio de ventas', () => {
    const mockSales = [
      { total: 100.00, discountAmount: 10.00, customerName: 'Cliente A' },
      { total: 300.00, discountAmount: 0.00, customerName: 'Cliente B' },
      { total: 200.00, discountAmount: 20.00, customerName: 'Cliente A' }
    ];

    const stats = generateSalesStatistics(mockSales);

    expect(stats.totalRevenue).toBe(600.00);
    expect(stats.totalDiscountsGiven).toBe(30.00);
    expect(stats.totalTransactions).toBe(3);
    expect(stats.averageTicket).toBe(200.00);
    expect(stats.salesByCustomer['Cliente A']).toBe(300.00);
  });

  // PRUEBA 5: Validación del Feature Model - Características Obligatorias
  it('5. Todas las variantes deben poseer obligatoriamente auth, products, sales y customers', () => {
    const mandatory = variantsData.featureModel.mandatory;
    const variants = variantsData.variants;

    Object.keys(variants).forEach(key => {
      mandatory.forEach(feat => {
        expect(variants[key].features[feat]).toBe(true);
      });
    });
  });

  // PRUEBA 6: Validación de Variabilidad - Restricciones de la Variante Básica
  it('6. La variante Básica NO debe tener activadas funciones opcionales avanzadas', () => {
    const basicFeatures = variantsData.variants.basic.features;

    expect(basicFeatures.discounts).toBe(false);
    expect(basicFeatures.reports).toBe(false);
    expect(basicFeatures.export_reports).toBe(false);
  });

  // PRUEBA 7: Validación de Dependencias del Modelo de Características
  it('7. La exportación de reportes debe requerir que el módulo de reportes esté activo', () => {
    const validationResult = validateFeatureConfigurations();
    expect(validationResult.valid).toBe(true);
    expect(validationResult.errors.length).toBe(0);
  });

});
