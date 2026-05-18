import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        falcon: resolve(__dirname, 'falcon-college.html'),
        little: resolve(__dirname, 'falcon-little.html'),
      },
    },
  },
});
