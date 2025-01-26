import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  root: 'client', // Set root to the client directory
  build: {
    outDir: '../dist', // Output to the dist directory
    emptyOutDir: true, // Clear the dist directory on build
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './client/src'), // Alias for src directory
    },
  },
  server: {
    port: 5173,
    host: '0.0.0.0',
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3003', // Proxy API requests to the server
        changeOrigin: true,
      },
    },
  },
});