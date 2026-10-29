import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';
import { compileTemplate, parse } from 'vue/compiler-sfc';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const reviewRoot = resolve(projectRoot, '.docs-review');
const reviewPath = '/__docs_review';
const docsDirectory = 'src/screens/docs/';
const textElements = new Set([
  'p', 'li', 'aside', 'blockquote', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'dt', 'dd', 'th', 'td', 'DocLink', 'DocHeader',
]);
const tableElements = new Set(['table', 'thead', 'tbody', 'tfoot', 'tr', 'colgroup']);

const reviewStyles = `
  [data-review-mark="removed"] { color:#942e32; background:#fce6e7; text-decoration:line-through; text-decoration-thickness:1.5px; }
  [data-review-mark="added"] { color:#17633e; background:#e1f3e8; text-decoration:underline; text-underline-offset:3px; }
  [data-review-block], p > [data-review-mark], li > [data-review-mark], aside > [data-review-mark] { display:block; padding:5px 8px; border-radius:2px; }
  [data-review-mark] a { color:inherit !important; }
`;

function normalize(value) {
  return value.replace(/\s+/g, ' ').trim();
}

function nodeKey(node) {
  if (node.tag === 'MathFormula') return 'MathFormula';
  return normalize(node.loc.source.replace(/\s(?:class|style)=(?:"[^"]*"|'[^']*')/g, ''));
}

function children(node) {
  return (node.children ?? []).filter(child => child.type !== 3 && (child.type !== 2 || child.content.trim()));
}

function replacementCost(left, right) {
  if (nodeKey(left) === nodeKey(right)) return 0;
  if (left.type !== right.type || left.tag !== right.tag) return Infinity;
  const words = new Set(normalize(left.loc.source.replace(/<[^>]*>/g, ' ')).split(' '));
  const other = new Set(normalize(right.loc.source.replace(/<[^>]*>/g, ' ')).split(' '));
  const common = [...words].filter(word => other.has(word)).length;
  return 1.4 - 0.3 * common / Math.max(words.size, other.size, 1);
}

// Align by content and order, then edit source offsets. Repeated paragraphs do
// not depend on a globally unique search string; moves become removal/addition.
function align(left, right) {
  const costs = Array.from({ length: left.length + 1 }, () => new Float64Array(right.length + 1));
  for (let i = left.length; i >= 0; i--) {
    for (let j = right.length; j >= 0; j--) {
      if (i === left.length) costs[i][j] = right.length - j;
      else if (j === right.length) costs[i][j] = left.length - i;
      else costs[i][j] = Math.min(
        replacementCost(left[i], right[j]) + costs[i + 1][j + 1],
        1 + costs[i + 1][j],
        1 + costs[i][j + 1],
      );
    }
  }
  const steps = [];
  let i = 0;
  let j = 0;
  while (i < left.length || j < right.length) {
    const paired = i < left.length && j < right.length
      && replacementCost(left[i], right[j]) + costs[i + 1][j + 1] <= costs[i][j] + 1e-8;
    if (paired) steps.push({ before: left[i++], after: right[j++] });
    else if (i < left.length && (j === right.length || 1 + costs[i + 1][j] <= costs[i][j] + 1e-8)) {
      steps.push({ before: left[i++], next: right[j] });
    } else steps.push({ after: right[j++] });
  }
  return steps;
}

function markNode(node, kind) {
  const markup = node.loc.source;
  const wrapper = kind === 'removed' ? 'del' : 'ins';
  const opening = markup.match(/^<[\w.-]+\b(?:"[^"]*"|'[^']*'|[^'">])*>/);
  if (node.type === 1 && opening && !opening[0].endsWith('/>')) {
    const closing = markup.lastIndexOf('</');
    if (closing >= opening[0].length) {
      if (tableElements.has(node.tag)) {
        return markup.replace(opening[0], opening[0].replace(/>$/, ` data-review-mark="${kind}">`));
      }
      return `${opening[0]}<${wrapper} data-review-mark="${kind}">${markup.slice(opening[0].length, closing)}</${wrapper}>${markup.slice(closing)}`;
    }
  }
  const block = node.type === 1 ? ' data-review-block' : '';
  return `<${wrapper} data-review-mark="${kind}"${block}>${markup}</${wrapper}>`;
}

function templateOf(source, filename) {
  const parsed = parse(source, { filename });
  if (parsed.errors.length || !parsed.descriptor.template) {
    throw new Error(`Cannot parse ${filename}: ${parsed.errors.join('; ') || 'missing template'}`);
  }
  return parsed.descriptor.template;
}

export function compareDocument(before, after, filename = 'document.vue') {
  const previous = before ? templateOf(before, filename) : null;
  const current = templateOf(after, filename);
  const edits = [];
  let passages = 0;

  function addEdit(start, end, content) {
    edits.push({ start, end, content, order: edits.length });
    passages++;
  }

  function compareChildren(left, right, innerEnd) {
    for (const step of align(left, right)) {
      const old = step.before;
      const fresh = step.after;
      if (!old) {
        addEdit(fresh.loc.start.offset, fresh.loc.end.offset, markNode(fresh, 'added'));
      } else if (!fresh) {
        const offset = step.next?.loc.start.offset ?? innerEnd;
        addEdit(offset, offset, markNode(old, 'removed'));
      } else if (nodeKey(old) !== nodeKey(fresh)) {
        if (old.type === 1 && fresh.type === 1 && old.tag === fresh.tag
          && !textElements.has(fresh.tag) && children(fresh).length) {
          const close = fresh.loc.source.lastIndexOf('</');
          compareChildren(children(old), children(fresh), fresh.loc.start.offset + close);
        } else if (old.tag === fresh.tag && ['td', 'th'].includes(fresh.tag)) {
          const removed = markNode(old, 'removed').replace(/^<[^>]+>/, '').replace(/<\/(?:td|th)>$/, '');
          const added = markNode(fresh, 'added').replace(/^<[^>]+>/, '').replace(/<\/(?:td|th)>$/, '');
          const content = fresh.loc.source.replace(/^(<[^>]+>)[\s\S]*(<\/(?:td|th)>)$/, `$1${removed}${added}$2`);
          addEdit(fresh.loc.start.offset, fresh.loc.end.offset, content);
        } else {
          addEdit(fresh.loc.start.offset, fresh.loc.end.offset, markNode(old, 'removed') + markNode(fresh, 'added'));
        }
      }
    }
  }

  compareChildren(previous ? children(previous.ast) : [], children(current.ast), current.loc.end.offset);
  let marked = after;
  edits.sort((a, b) => b.start - a.start || b.end - a.end || b.order - a.order);
  for (const edit of edits) marked = marked.slice(0, edit.start) + edit.content + marked.slice(edit.end);
  const markedTemplate = templateOf(marked, filename).content;
  const content = `<template v-if="$route.query.reviewMode === 'original'">${previous?.content ?? ''}</template>
<template v-else-if="$route.query.reviewMode === 'revised'">${current.content}</template>
<template v-else>${markedTemplate}</template>`;
  const code = after.slice(0, current.loc.start.offset) + content + after.slice(current.loc.end.offset);
  const compiled = compileTemplate({ source: content, filename, id: filename });
  if (compiled.errors.length) throw new Error(`Cannot render review for ${filename}: ${compiled.errors.join('; ')}`);
  return { code, passages };
}

function git(args) {
  return execFileSync('git', args, { cwd: projectRoot, encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 });
}

function isDocument(path, source) {
  return path.startsWith(docsDirectory) && !path.startsWith(`${docsDirectory}whitepapers/`)
    && path.endsWith('.vue') && /<DocHeader(?:\s|>)/.test(source);
}

function readBaseline(base) {
  const commit = git(['rev-parse', '--verify', '--end-of-options', `${base}^{commit}`]).trim();
  const before = {};
  for (const path of git(['ls-tree', '-r', '--name-only', '-z', commit, '--', docsDirectory]).split('\0').filter(Boolean)) {
    if (!path.endsWith('.vue') || path.startsWith(`${docsDirectory}whitepapers/`)) continue;
    const source = git(['show', `${commit}:${path}`]);
    if (isDocument(path, source)) before[path] = source;
  }
  return { commit, before };
}

function readCurrent() {
  const after = {};
  const paths = new Set(git(['ls-files', '-z', '--cached', '--others', '--exclude-standard', '--', docsDirectory]).split('\0').filter(Boolean));
  for (const path of paths) {
    if (!path.endsWith('.vue') || !existsSync(resolve(projectRoot, path))) continue;
    const source = readFileSync(resolve(projectRoot, path), 'utf8');
    if (isDocument(path, source)) after[path] = source;
  }
  return after;
}

function routeFor(path) {
  const key = path.slice(docsDirectory.length).replace(/\.vue$/, '');
  return key === 'getting-started/Index' ? '/docs' : `/docs/${key.replace(/\/Index$/, '')}`;
}

function titleFor(source, path) {
  return normalize(source.match(/<DocHeader[^>]*>([\s\S]*?)<\/DocHeader>/)?.[1].replace(/<[^>]+>/g, ' ') ?? path);
}

function sessionFile(name) {
  if (!/^[\w][\w.-]*$/.test(name)) throw new Error('Use letters, numbers, dots, underscores, or hyphens in a session name.');
  return resolve(reviewRoot, 'sessions', `${name}.json`);
}

function saveSession(name, snapshot) {
  const path = sessionFile(name);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, JSON.stringify({ version: 1, ...snapshot }, null, 2) + '\n');
  return path;
}

function readSession(name) {
  const snapshot = JSON.parse(readFileSync(sessionFile(name), 'utf8'));
  if (snapshot.version !== 1 || !snapshot.before || !snapshot.after) throw new Error('Unsupported or incomplete review session.');
  for (const [path, source] of Object.entries({ ...snapshot.before, ...snapshot.after })) {
    if (typeof source !== 'string' || !isDocument(path, source) || path.split('/').includes('..')) {
      throw new Error(`Invalid document in session: ${path}`);
    }
  }
  return snapshot;
}

function reviewPages(snapshot) {
  const toc = JSON.parse(readFileSync(resolve(projectRoot, docsDirectory, 'toc.json'), 'utf8'));
  const order = toc.flatMap(group => group.items.map(item => `/docs${`${group.base}/${item.link}`.replace(/\/+/g, '/').replace(/\/$/, '')}`));
  return [...new Set([...Object.keys(snapshot.before), ...Object.keys(snapshot.after)])]
    .filter(path => snapshot.before[path] !== snapshot.after[path])
    .map(path => {
      const before = snapshot.before[path];
      const after = snapshot.after[path];
      const page = {
        path, route: routeFor(path), title: titleFor(after ?? before, path),
        status: !after ? 'deleted' : !before ? 'added' : 'modified',
      };
      try {
        page.passages = after ? compareDocument(before, after, path).passages : 0;
      } catch (error) {
        page.error = error.message;
      }
      return page;
    }).sort((a, b) => {
      const left = order.indexOf(a.route);
      const right = order.indexOf(b.route);
      return (left < 0 ? Infinity : left) - (right < 0 ? Infinity : right) || a.path.localeCompare(b.path);
    });
}

function optionsFrom(args) {
  const options = { base: 'HEAD', port: 5180 };
  for (let i = 0; i < args.length; i++) {
    const argument = args[i];
    if (argument === '--help' || argument === '-h') options.help = true;
    else if (['--base', '--port', '--save', '--session'].includes(argument)) {
      const value = args[++i];
      if (!value || value.startsWith('--')) throw new Error(`Missing value for ${argument}.`);
      options[argument.slice(2)] = value;
    } else throw new Error(`Unknown option: ${argument}`);
  }
  options.port = Number(options.port);
  if (!Number.isInteger(options.port) || options.port < 1 || options.port > 65535) throw new Error('Port must be between 1 and 65535.');
  if (options.session && (options.save || args.includes('--base'))) throw new Error('Use --session on its own, or --base with --save.');
  return options;
}

async function main() {
  const options = optionsFrom(process.argv.slice(2));
  if (options.help) {
    process.stdout.write(`Usage: yarn docs:review [--base HEAD] [--port 5180] [--save NAME]\n       yarn docs:review --session NAME\n\nFull-page documentation redlines. Whitepapers are excluded.\n--save captures the current comparison; --session reopens a saved snapshot.\n`);
    return;
  }
  let snapshot = options.session ? readSession(options.session) : {
    ...readBaseline(options.base), after: readCurrent(), createdAt: new Date().toISOString(),
  };
  let pages = reviewPages(snapshot);
  let revision = 0;
  if (options.save) process.stdout.write(`Saved review: ${saveSession(options.save, snapshot)}\n`);
  const generated = resolve(reviewRoot, 'cache');
  mkdirSync(generated, { recursive: true });
  const html = readFileSync(new URL('./docs-review/index.html', import.meta.url), 'utf8');
  let server;
  let refreshTimer;

  function refresh() {
    try {
      const after = readCurrent();
      if (JSON.stringify(after) === JSON.stringify(snapshot.after)) return;
      snapshot = { ...snapshot, after };
      pages = reviewPages(snapshot);
      revision++;
    } catch (error) {
      process.stderr.write(`Review refresh failed: ${error.message}\n`);
    }
  }

  const plugin = {
    name: 'documentation-review',
    enforce: 'pre',
    transform(source, id) {
      if (id.includes('?')) return;
      const path = relative(projectRoot, id.split('?')[0]).replaceAll('\\', '/');
      if (!Object.hasOwn(snapshot.after, path)) return;
      const current = options.session ? snapshot.after[path] : source;
      const previous = snapshot.before[path];
      if (previous === current) return options.session ? { code: current, map: null } : undefined;
      return { code: compareDocument(previous, current, id).code, map: null };
    },
    transformIndexHtml(document) {
      return document.replace('</head>', `<style>${reviewStyles}</style></head>`);
    },
    configureServer(vite) {
      vite.middlewares.use((request, response, next) => {
        const path = request.url?.split('?')[0];
        if (path !== reviewPath && path !== `${reviewPath}/` && path !== `${reviewPath}/state`) return next();
        response.setHeader('Cache-Control', 'no-store');
        if (path.endsWith('/state')) {
          response.setHeader('Content-Type', 'application/json');
          response.end(JSON.stringify({
            base: snapshot.commit, session: options.session ?? null, revision,
            pages, fingerprint: createHash('sha256').update(JSON.stringify(pages)).digest('hex'),
          }));
        } else {
          response.setHeader('Content-Type', 'text/html; charset=utf-8');
          response.end(html);
        }
      });
      if (!options.session) {
        vite.watcher.on('all', (event, path) => {
          if (!['add', 'change', 'unlink'].includes(event) || !path.startsWith(resolve(projectRoot, docsDirectory))) return;
          clearTimeout(refreshTimer);
          refreshTimer = setTimeout(refresh, 100);
        });
      }
    },
  };
  server = await createServer({
    root: projectRoot,
    configFile: resolve(projectRoot, 'vite.config.ts'),
    cacheDir: generated,
    plugins: [plugin],
    server: {
      host: '127.0.0.1', port: options.port, strictPort: false, open: false,
      watch: { ignored: ['**/.docs-review/**'] },
    },
    logLevel: 'error',
  });
  await server.listen();
  const address = server.httpServer.address();
  const url = `http://127.0.0.1:${address.port}${reviewPath}`;
  writeFileSync(resolve(reviewRoot, 'server.json'), JSON.stringify({ url, pid: process.pid, base: snapshot.commit }, null, 2) + '\n');
  process.stdout.write(`Review ${pages.length} changed pages against ${snapshot.commit.slice(0, 8)}:\n${url}\n`);
  for (const page of pages.filter(page => page.error)) process.stderr.write(`${page.path}: ${page.error}\n`);

  async function stop() {
    clearTimeout(refreshTimer);
    await server.close();
    process.exit(0);
  }

  process.once('SIGINT', stop);
  process.once('SIGTERM', stop);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch(error => {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
  });
}
