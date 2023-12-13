import { defineConfig } from 'vite';
import copy from 'rollup-plugin-copy';
import scss from 'rollup-plugin-scss';
import react from '@vitejs/plugin-react';
import * as sass from 'sass';

const LIBRARY_NAME = 'sgds-x-react-select';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    fs: {
      // Allow serving files from one level up to the project root
      allow: ['..'],
    },
  },
  plugins: [
    react(),
    {
      ...scss({
        fileName: 'index.css',
        sass,
        outputStyle: 'compressed',
        include: ['/**/*.scss', '/**/*.sass'],
      }),
    },
    {
      ...copy({
        targets: [{ src: 'dist/index.css', dest: './' }],
      }),
    },
  ],
  build: {
    sourcemap: true,
    lib: {
      entry: 'src/main.jsx',
      name: LIBRARY_NAME,
      formats: ['es'],
      fileName: LIBRARY_NAME,
    },
  },
});
