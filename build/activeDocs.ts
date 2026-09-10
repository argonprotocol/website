import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { Plugin } from 'vite';

type TocGroup = { base: string; items: { link: string; isActive: boolean }[] };

export function activeDocImports(groups: TocGroup[], docsDirectory: string): string {
  const paths = new Set<string>();
  for (const group of groups) {
    for (const item of group.items) {
      if (!item.isActive) continue;
      const route = [group.base, item.link].join('/').replace(/\/+/g, '/').replace(/^\/|\/$/g, '') || 'getting-started';
      const candidates = [`${route}.vue`, `${route}/Index.vue`];
      const path = candidates.find(candidate => existsSync(resolve(docsDirectory, candidate)));
      if (!path) throw new Error(`Active documentation page has no component: ${route}`);
      paths.add(`./${path}`);
    }
  }
  return `{${[...paths].map(path => `${JSON.stringify(path)}: () => import(${JSON.stringify(path)})`).join(',\n')}}`;
}

export function activeDocsPlugin(): Plugin {
  let enabled = false;
  let docsDirectory = '';
  return {
    name: 'active-docs-only',
    enforce: 'pre',
    configResolved(config) {
      enabled = config.command === 'build' && config.isProduction;
      docsDirectory = resolve(config.root, 'src/screens/docs');
    },
    transform(source, id) {
      if (!enabled || id !== resolve(docsDirectory, 'DocLoader.vue')) return;
      const glob = "import.meta.glob<DocModule>('./**/*.vue')";
      if (source.split(glob).length !== 2) {
        throw new Error('Cannot restrict production documentation: DocLoader import glob has changed.');
      }
      const tocPath = resolve(docsDirectory, 'toc.json');
      this.addWatchFile(tocPath);
      const groups = JSON.parse(readFileSync(tocPath, 'utf8')) as TocGroup[];
      return { code: source.replace(glob, activeDocImports(groups, docsDirectory)), map: null };
    },
  };
}
