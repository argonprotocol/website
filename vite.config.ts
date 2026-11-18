import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';
import svgLoader from 'vite-svg-loader';
import { activeDocsPlugin } from './build/activeDocs';
// import vueDevTools from 'vite-plugin-vue-devtools';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    activeDocsPlugin(),
    {
      name: 'hidden-trade-page',
      generateBundle: {
        order: 'post',
        handler(_options, bundle) {
          const index = bundle['index.html'];
          if (index?.type !== 'asset' || typeof index.source !== 'string') return;
          this.emitFile({
            type: 'asset',
            fileName: 'trade/index.html',
            source: index.source.replace('<head>', '<head>\n    <meta name="robots" content="noindex, nofollow">'),
          });
        },
      },
    },
    vue(),
    tailwindcss(),
    svgLoader(),
    // vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
