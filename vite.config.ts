import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  plugins: [react()],
  base: '/sample-bakery-demo/',
  resolve: {
    alias: {
      '@instinct/files': fileURLToPath(new URL('./src/instinct-files.ts', import.meta.url)),
    },
  },
});
