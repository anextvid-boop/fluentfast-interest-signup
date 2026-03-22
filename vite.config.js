import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: './', // Allows relative paths, preventing broken static assets on GitHub Pages or anywhere else
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        v2: resolve(__dirname, 'v2.html')
      }
    }
  }
});
