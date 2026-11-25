export const initialProducts = [
  { id: 1, code: 'PRD-001', name: 'Laptop Dell Inspiron 15', category: 'Electrónica', price: 780.00, stock: 12 },
  { id: 2, code: 'PRD-002', name: 'Monitor LG 24" IPS FHD', category: 'Electrónica', price: 165.50, stock: 25 },
  { id: 3, code: 'PRD-003', name: 'Teclado Mecánico RGB Redragon', category: 'Accesorios', price: 45.00, stock: 40 },
  { id: 4, code: 'PRD-004', name: 'Mouse Inalámbrico Logitech M280', category: 'Accesorios', price: 18.50, stock: 50 },
  { id: 5, code: 'PRD-005', name: 'Silla Ergonómica de Oficina', category: 'Mobiliario', price: 135.00, stock: 8 },
  { id: 6, code: 'PRD-006', name: 'Auriculares HyperX Cloud II', category: 'Audio', price: 89.90, stock: 15 }
];

export const initialCustomers = [
  { id: 1, docId: '0928374651', name: 'Juan Carlos Pérez', email: 'juan.perez@unemi.edu.ec', phone: '0991234567', city: 'Milagro' },
  { id: 2, docId: '0912837465', name: 'María Fernanda Gómez', email: 'maria.gomez@gmail.com', phone: '0987654321', city: 'Guayaquil' },
  { id: 3, docId: '1726354890', name: 'Carlos Andrés Zambrano', email: 'czambrano@empresa.com', phone: '0978901234', city: 'Quito' }
];

export const initialDiscounts = [
  { id: 'DESC10', code: 'PROMO10', description: '10% de Descuento por Lanzamiento', percentage: 10, active: true },
  { id: 'DESC20', code: 'BLACKFRIDAY', description: '20% Descuento Temporada', percentage: 20, active: true },
  { id: 'VIP15', code: 'CLIENTEVIP', description: '15% Descuento Clientes Frecuentes', percentage: 15, active: true }
];

export const initialSales = [
  {
    id: 'VENTA-1001',
    date: '2026-11-20',
    customerId: 1,
    customerName: 'Juan Carlos Pérez',
    items: [
      { productId: 1, name: 'Laptop Dell Inspiron 15', quantity: 1, price: 780.00 }
    ],
    subtotal: 780.00,
    discountAmount: 0.00,
    discountCode: null,
    tax: 117.00, // IVA 15%
    total: 897.00
  },
  {
    id: 'VENTA-1002',
    date: '2026-11-22',
    customerId: 2,
    customerName: 'María Fernanda Gómez',
    items: [
      { productId: 2, name: 'Monitor LG 24" IPS FHD', quantity: 2, price: 165.50 },
      { productId: 4, name: 'Mouse Inalámbrico Logitech M280', quantity: 1, price: 18.50 }
    ],
    subtotal: 349.50,
    discountAmount: 34.95, // Con descuento del 10% aplicado en Premium
    discountCode: 'PROMO10',
    tax: 47.18,
    total: 361.73
  },
  {
    id: 'VENTA-1003',
    date: '2026-11-24',
    customerId: 3,
    customerName: 'Carlos Andrés Zambrano',
    items: [
      { productId: 3, name: 'Teclado Mecánico RGB Redragon', quantity: 2, price: 45.00 },
      { productId: 6, name: 'Auriculares HyperX Cloud II', quantity: 1, price: 89.90 }
    ],
    subtotal: 179.90,
    discountAmount: 0.00,
    discountCode: null,
    tax: 26.99,
    total: 206.89
  }
];
