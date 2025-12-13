import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import EnvironmentPlugin from 'vite-plugin-environment';
import ElementPlus from 'unplugin-element-plus/vite';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from 'path';
import vueDevTools from 'vite-plugin-vue-devtools';

// Clear specific environment variables
delete process.env['CommonProgramFiles(x86)'];
delete process.env['ProgramFiles(x86)'];

export default defineConfig({
  plugins: [
    vue(),
    EnvironmentPlugin('all', { prefix: '' }),
    ElementPlus(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      symbolId: 'icon-[dir]-[name]',
      inject: 'body-first',
      customDomId: '__svg__icons__dom__',
    }),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
