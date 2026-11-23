import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
  },
  build: {
    // Las escenas R3F/globo se cargan con React.lazy en chunks independientes.
    // Su tamaño sin comprimir es esperado (~900 kB) y no afecta al bundle inicial.
    chunkSizeWarningLimit: 1200,
  },
});
