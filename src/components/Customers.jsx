import React, { useState } from 'react';

export default function Customers({ customers, setCustomers }) {
  const [form, setForm] = useState({
    docId: '',
    name: '',
    email: '',
    phone: '',
    city: 'Milagro'
  });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.name || !form.docId) {
      alert('Cédula y Nombre son obligatorios.');
      return;
    }

    const newCustomer = {
      id: Date.now(),
      docId: form.docId,
      name: form.name,
      email: form.email,
      phone: form.phone,
      city: form.city
    };

    setCustomers([...customers, newCustomer]);
    setForm({ docId: '', name: '', email: '', phone: '', city: 'Milagro' });
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Desea eliminar este cliente?')) {
      setCustomers(customers.filter(c => c.id !== id));
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <h2 className="card-title">👥 Cartera de Clientes</h2>
          <p className="card-subtitle">Registro y administración de clientes compradores</p>
        </div>
      </div>

      <form onSubmit={handleAdd} className="form-grid">
        <div className="form-group">
          <label>Identificación (C.I. / RUC):</label>
          <input
            type="text"
            required
            placeholder="0912345678"
            value={form.docId}
            onChange={(e) => setForm({ ...form, docId: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Nombres y Apellidos:</label>
          <input
            type="text"
            required
            placeholder="Ej: Ana María Torres"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Correo Electrónico:</label>
          <input
            type="email"
            placeholder="cliente@correo.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Teléfono:</label>
          <input
            type="text"
            placeholder="0990001122"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Ciudad:</label>
          <input
            type="text"
            placeholder="Milagro / Guayaquil"
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
          />
        </div>
        <div className="form-group" style={{ justifyContent: 'flex-end' }}>
          <button type="submit" className="btn btn-primary" style={{ height: '42px', marginTop: 'auto' }}>
            + Registrar Cliente
          </button>
        </div>
      </form>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>C.I. / RUC</th>
              <th>Cliente</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Ciudad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.id}>
                <td><strong>{c.docId}</strong></td>
                <td>{c.name}</td>
                <td>{c.email || 'N/A'}</td>
                <td>{c.phone || 'N/A'}</td>
                <td>{c.city}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-outline"
                    style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', color: '#dc2626' }}
                    onClick={() => handleDelete(c.id)}
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
