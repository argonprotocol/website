import { createServer as createHttpServer } from 'node:http';
import { createServer, type Plugin, type ResolvedConfig } from 'vite';

export function prerenderExplainerPlugin(): Plugin {
  let config: ResolvedConfig;

  return {
    name: 'prerender-existing-explainer',
    apply: 'build',
    configResolved(resolved) {
      config = resolved;
    },
    generateBundle: {
      order: 'post',
      async handler(_options, bundle) {
        const index = bundle['index.html'];
        if (index?.type !== 'asset' || typeof index.source !== 'string') {
          throw new Error('Cannot prerender the explainer without the built index.html.');
        }

        const server = await createServer({
          configFile: config.configFile,
          root: config.root,
          mode: config.mode,
          appType: 'custom',
          server: { middlewareMode: true, hmr: { server: createHttpServer() }, watch: null },
          optimizeDeps: { noDiscovery: true, include: [] },
          ssr: { noExternal: ['gsap'] },
        });

        try {
          const { renderExplainer } = await server.ssrLoadModule('/src/entry-prerender.ts');
          const { html, head } = await renderExplainer();
          if (!html.includes('The Better Stablecoin')) {
            throw new Error('The prerendered explainer is missing its heading.');
          }

          const styles = new Set<string>();
          const visited = new Set<string>();

          function collectStyles(fileName: string) {
            if (visited.has(fileName)) return;
            visited.add(fileName);
            const chunk = bundle[fileName];
            if (chunk?.type !== 'chunk') return;
            const metadata = (chunk as typeof chunk & { viteMetadata?: { importedCss: Set<string> } }).viteMetadata;
            metadata?.importedCss.forEach(file => styles.add(file));
            chunk.imports.forEach(collectStyles);
          }

          const page = Object.values(bundle).find(chunk => chunk.type === 'chunk'
            && chunk.facadeModuleId?.endsWith('/src/screens/why-its-better/Index.vue'));
          if (!page) throw new Error('The explainer client bundle is missing.');
          collectStyles(page.fileName);

          const stylesheetLinks = [...styles]
            .filter(file => !index.source.toString().includes(`href="${config.base}${file}"`))
            .map(file => `<link rel="stylesheet" href="${config.base}${file}">`)
            .join('\n    ');

          this.emitFile({
            type: 'asset',
            fileName: 'why-its-better/index.html',
            source: index.source
              .replace(/<title>[^<]*<\/title>/, `${head}\n    ${stylesheetLinks}`)
              .replace('<div id="app"></div>', `<div id="app" data-prerendered>${html}</div>`),
          });
        } finally {
          await server.close();
        }
      },
    },
  };
}
