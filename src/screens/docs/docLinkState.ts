import toc from './toc.json';

export const enableAllDocs = import.meta.env.DEV && import.meta.env.VITE_ENABLE_ALL_DOCS === 'true';

function normalizeDocPath(path: string): string {
  return path.split(/[?#]/)[0]
    .replace(/\/+$/, '')
    .replace(/\/(index|overview)$/i, '')
    .replace(/^\/docs\/getting-started$/, '/docs')
    .toLowerCase();
}

const itemStates = new Map<string, boolean>();
const sectionStates = new Map<string, boolean>();

for (const group of toc) {
  const base = `/docs/${group.base.replace(/^\/+|\/+$/g, '')}`;
  sectionStates.set(normalizeDocPath(base), group.items.some(item => item.isActive));
  for (const item of group.items) {
    const path = `${base.replace(/\/+$/, '')}/${item.link.replace(/^\/+/, '')}`;
    itemStates.set(normalizeDocPath(path), item.isActive);
  }
}

export function isDocLinkActive(path: string, override = enableAllDocs): boolean {
  if (override) return true;
  const normalized = normalizeDocPath(path);
  const itemState = itemStates.get(normalized);
  if (itemState !== undefined) return itemState;
  const section = normalized.match(/^\/docs(?:\/[^/]+)?/)?.[0];
  return sectionStates.get(section ?? '') ?? true;
}
