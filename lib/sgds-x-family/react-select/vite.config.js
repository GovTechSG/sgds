import { defineConfig } from 'vite';
import scss from 'rollup-plugin-scss';
import react from '@vitejs/plugin-react';
import * as sass from 'sass';

const LIBRARY_NAME = 'sgds-x-react-select';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      ...scss({
        fileName: `${LIBRARY_NAME}.css`,
        sass,
        outputStyle: 'compressed',
        include: ['/**/*.scss', '/**/*.sass'],
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
