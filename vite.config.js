import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // Permite despliegue relativo en GitHub Pages o cualquier host
  test: {
    globals: true,
    environment: 'node'
  }
});
