/**
 * Utilidades de cálculo para el Sistema de Ventas
 * Aplica reglas de negocio y respeta la variabilidad del producto.
 */

export const TAX_RATE = 0.15; // 15% IVA Ecuador

/**
 * Calcula el subtotal, descuento, impuesto y total de una venta
 * @param {Array} items Lista de productos con { price, quantity }
 * @param {Object} discount Objeto descuento { percentage } o null
 * @param {boolean} allowDiscounts Flag de la variante (false en Básica, true en Premium)
 */
export function calculateSaleTotal(items = [], discount = null, allowDiscounts = false) {
  if (!Array.isArray(items) || items.length === 0) {
    return {
      subtotal: 0,
      discountAmount: 0,
      taxableAmount: 0,
      tax: 0,
      total: 0
    };
  }

  // 1. Calcular subtotal
  const subtotal = items.reduce((acc, item) => {
    const qty = Math.max(0, Number(item.quantity) || 0);
    const price = Math.max(0, Number(item.price) || 0);
    return acc + (qty * price);
  }, 0);

  // 2. Calcular descuento (Solo si la variante lo permite)
  let discountAmount = 0;
  if (allowDiscounts && discount && discount.percentage > 0) {
    const pct = Math.min(100, Math.max(0, Number(discount.percentage) || 0));
    discountAmount = (subtotal * pct) / 100;
  }

  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const tax = taxableAmount * TAX_RATE;
  const total = taxableAmount + tax;

  return {
    subtotal: Number(subtotal.toFixed(2)),
    discountAmount: Number(discountAmount.toFixed(2)),
    taxableAmount: Number(taxableAmount.toFixed(2)),
    tax: Number(tax.toFixed(2)),
    total: Number(total.toFixed(2))
  };
}

/**
 * Agrupa y suma estadísticas para reportes (Solo en Variante Premium)
 */
export function generateSalesStatistics(sales = []) {
  const totalRevenue = sales.reduce((acc, sale) => acc + (sale.total || 0), 0);
  const totalDiscountsGiven = sales.reduce((acc, sale) => acc + (sale.discountAmount || 0), 0);
  const totalTransactions = sales.length;
  const averageTicket = totalTransactions > 0 ? totalRevenue / totalTransactions : 0;

  // Ventas por cliente
  const salesByCustomer = {};
  sales.forEach(sale => {
    const name = sale.customerName || 'Cliente Genérico';
    salesByCustomer[name] = (salesByCustomer[name] || 0) + sale.total;
  });

  return {
    totalRevenue: Number(totalRevenue.toFixed(2)),
    totalDiscountsGiven: Number(totalDiscountsGiven.toFixed(2)),
    totalTransactions,
    averageTicket: Number(averageTicket.toFixed(2)),
    salesByCustomer
  };
}
