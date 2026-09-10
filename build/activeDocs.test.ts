import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import type { ResolvedConfig } from 'vite';
import { activeDocImports, activeDocsPlugin } from './activeDocs';
import toc from '../src/screens/docs/toc.json';

const directories: string[] = [];

afterEach(() => {
  for (const directory of directories.splice(0)) rmSync(directory, { recursive: true, force: true });
});

describe('production documentation imports', () => {
  it('includes every active TOC page and excludes all inactive pages and helper components', () => {
    const source = activeDocImports(toc, resolve('src/screens/docs'));
    expect(source).toContain('./getting-started/Index.vue');
    expect(source).toContain('./system-design/Index.vue');
    expect(source).toContain('./economic-pillars/protection-from-inflation.vue');
    expect(source).not.toMatch(/desktop-app|bridgeless-transfers|assets-and-entities|engine-modeling|DocLink|DocHeader/);
    expect(source.match(/import\(/g)).toHaveLength(toc.flatMap(group => group.items).filter(item => item.isActive).length);
  });

  it.each([true, false])('respects an individual flag inside an otherwise active section: %s', active => {
    const source = activeDocImports([{ base: '/system-design', items: [
      { link: '/', isActive: true },
      { link: '/economic-drivers', isActive: active },
    ] }], resolve('src/screens/docs'));
    expect(source.includes('./system-design/economic-drivers.vue')).toBe(active);
  });

  it('fails the build for an active page with no component', () => {
    expect(() => activeDocImports([{ base: '/missing', items: [{ link: '/', isActive: true }] }],
      resolve('src/screens/docs'))).toThrow('Active documentation page has no component: missing');
  });

  it.each([
    ['build', true, true],
    ['build', false, false],
    ['serve', true, false],
    ['serve', false, false],
  ] as const)('restricts imports only for production builds: %s / %s', (command, isProduction, restricted) => {
    const root = mkdtempSync(resolve(tmpdir(), 'argon-doc-build-'));
    directories.push(root);
    const docsDirectory = resolve(root, 'src/screens/docs');
    mkdirSync(docsDirectory, { recursive: true });
    writeFileSync(resolve(docsDirectory, 'toc.json'), '[]');
    const plugin = activeDocsPlugin();
    if (typeof plugin.configResolved !== 'function' || typeof plugin.transform !== 'function') throw new Error('Missing hooks');
    plugin.configResolved({ root, command, isProduction } as ResolvedConfig);
    const transform = plugin.transform;
    const context = { addWatchFile() {} } as unknown as ThisParameterType<typeof transform>;
    const source = "const pageModules = import.meta.glob<DocModule>('./**/*.vue');";
    const result = transform.call(context, source, resolve(docsDirectory, 'DocLoader.vue'));
    expect(result).toEqual(restricted ? { code: 'const pageModules = {};', map: null } : undefined);
    if (restricted) {
      expect(() => transform.call(context, 'changed glob', resolve(docsDirectory, 'DocLoader.vue')))
        .toThrow('DocLoader import glob has changed');
    }
  });
});
