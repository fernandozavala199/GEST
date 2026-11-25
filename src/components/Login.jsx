import React, { useState } from 'react';
import { getVariantConfig } from '../config/features';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('admin@unemi.edu.ec');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const variantConfig = getVariantConfig();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Por favor complete todos los campos.');
      return;
    }
    // Autenticación mock para la práctica
    onLogin({
      name: 'Equipo de Desarrollo UNEMI',
      email: username,
      role: 'Administrador'
    });
  };

  return (
    <div style={{ maxWidth: '420px', margin: '4rem auto', padding: '0 1rem' }}>
      <div className="card">
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div className="brand-icon" style={{ margin: '0 auto 1rem', width: '48px', height: '48px', fontSize: '1.5rem' }}>
            V
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700 }}>Iniciar Sesión</h2>
          <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '4px' }}>
            {variantConfig.name} - Línea de Productos de Software
          </p>
        </div>

        {error && (
          <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '0.6rem', borderRadius: '6px', fontSize: '0.85rem', marginBottom: '1rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: '1rem' }}>
            <label>Correo Electrónico / Usuario:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin@unemi.edu.ec"
              required
            />
          </div>

          <div className="form-group" style={{ marginBottom: '1.25rem' }}>
            <label>Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            Ingresar al Sistema
          </button>
        </form>

        <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid #e2e8f0', fontSize: '0.75rem', color: '#64748b', textAlign: 'center' }}>
          Característica obligatoria compartida en todas las variantes funcionales.
        </div>
      </div>
    </div>
  );
}
