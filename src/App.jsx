import React, { useState } from 'react';
import './App.css';
import VariantSwitcher from './components/VariantSwitcher';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Products from './components/Products';
import Customers from './components/Customers';
import Sales from './components/Sales';
import Discounts from './components/Discounts';
import Reports from './components/Reports';
import { initialProducts, initialCustomers, initialSales, initialDiscounts } from './data/mockData';
import { getVariantConfig, getActiveVariantId } from './config/features';

export default function App() {
  const [activeVariantId, setActiveVariantId] = useState(getActiveVariantId());
  const [activeTab, setActiveTab] = useState('products');
  const [user, setUser] = useState({
    name: 'Grupo de Trabajo',
    email: 'estudiantes@unemi.edu.ec',
    role: 'Admin'
  });

  // Datos globales del sistema (base de datos en memoria para la demo)
  const [products, setProducts] = useState(initialProducts);
  const [customers, setCustomers] = useState(initialCustomers);
  const [sales, setSales] = useState(initialSales);
  const [discounts, setDiscounts] = useState(initialDiscounts);

  const variantConfig = getVariantConfig(activeVariantId);

  return (
    <div className="app-container">
      {/* Barra de Gestión de Variabilidad (Línea de Productos de Software) */}
      <VariantSwitcher onVariantChange={(newId) => setActiveVariantId(newId)} />

      {/* Barra de Navegación Principal */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
        onLogout={() => setUser(null)}
      />

      {/* Contenido Principal según Autenticación y Pestaña */}
      <main className="main-content">
        {!user ? (
          <Login onLogin={(loggedUser) => setUser(loggedUser)} />
        ) : (
          <>
            {activeTab === 'products' && (
              <Products products={products} setProducts={setProducts} />
            )}
            {activeTab === 'customers' && (
              <Customers customers={customers} setCustomers={setCustomers} />
            )}
            {activeTab === 'sales' && (
              <Sales
                sales={sales}
                setSales={setSales}
                products={products}
                customers={customers}
                discounts={discounts}
              />
            )}
            {activeTab === 'discounts' && (
              <Discounts discounts={discounts} setDiscounts={setDiscounts} />
            )}
            {activeTab === 'reports' && (
              <Reports
                sales={sales}
                products={products}
                customers={customers}
              />
            )}
          </>
        )}
      </main>

      <footer className="footer">
        <strong>UNEMI - Universidad Estatal de Milagro</strong> | Gestión de la Configuración del Software (Octavo Nivel)
        <br />
        <span style={{ fontSize: '0.8rem' }}>
          Arquitectura: Base de Código Única con Variabilidad Funcional (Variante Activa: <strong>{variantConfig.name}</strong>)
        </span>
      </footer>
    </div>
  );
}
