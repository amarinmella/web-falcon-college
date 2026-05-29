import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        falcon: resolve(__dirname, 'falcon-college.html'),
        little: resolve(__dirname, 'falcon-little.html'),
        nosotrosMedia: resolve(__dirname, 'nosotros-media.html'),
        nosotrosLittle: resolve(__dirname, 'nosotros-little.html'),
        admisionMedia: resolve(__dirname, 'admision-media.html'),
        admisionLittle: resolve(__dirname, 'admision-little.html'),
        tecnicoProfesional: resolve(__dirname, 'tecnico-profesional.html'),
        academicoLittle: resolve(__dirname, 'academico-little.html'),
        contactoMedia: resolve(__dirname, 'contacto-media.html'),
        contactoLittle: resolve(__dirname, 'contacto-little.html'),
        noticiasMedia: resolve(__dirname, 'noticias-media.html'),
        noticiasLittle: resolve(__dirname, 'noticias-little.html'),
        galeriaMedia: resolve(__dirname, 'galeria-media.html'),
        galeriaLittle: resolve(__dirname, 'galeria-little.html'),
        convivenciaMedia: resolve(__dirname, 'convivencia-media.html'),
        convivenciaLittle: resolve(__dirname, 'convivencia-little.html'),
      },
    },
  },
});
