import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { readFile, stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, resolve, sep } from 'node:path';
import { pathToFileURL } from 'node:url';
import { JSDOM } from 'jsdom';

const fragment = JSON.parse(readFileSync(new URL('../.do/explainer-ingress.json', import.meta.url), 'utf8'));
const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.woff2': 'font/woff2',
};

// Model the proposed exact ingress rules and the current static error document.
// This server is only for local verification, not production hosting.
export function createProductionPreview(directory = resolve('dist-production')) {
  return createServer(async (request, response) => {
    try {
      const url = new URL(request.url, 'http://localhost');
      const rule = fragment.ingress.rules.find(item => item.match.path.exact === url.pathname);
      if (rule?.redirect) {
        response.writeHead(rule.redirect.redirect_code, { Location: rule.redirect.uri });
        response.end();
        return;
      }

      const pathname = rule?.component?.rewrite ?? decodeURIComponent(url.pathname);
      let file = resolve(directory, `.${pathname}`);
      if (file !== directory && !file.startsWith(`${directory}${sep}`)) {
        response.writeHead(404);
        response.end();
        return;
      }

      let status = 200;
      try {
        if ((await stat(file)).isDirectory()) file = resolve(file, 'index.html');
        if (!(await stat(file)).isFile()) throw new Error('Missing file');
      } catch {
        status = 404;
        file = resolve(directory, 'index.html');
      }

      const body = await readFile(file);
      response.writeHead(status, { 'Content-Type': contentTypes[extname(file)] ?? 'application/octet-stream' });
      response.end(body);
    } catch (error) {
      response.writeHead(500);
      response.end(String(error));
    }
  });
}

export async function verifyProduction(origin) {
  const home = await fetch(`${origin}/`);
  assert.equal(home.status, 200, 'Homepage must return 200');

  const canonical = await fetch(`${origin}/why-its-better`, { redirect: 'manual' });
  assert.equal(canonical.status, 200, 'Canonical URL must return 200 directly');
  const document = new JSDOM(await canonical.text()).window.document;
  const normalize = value => value.replace(/\s+/g, ' ').trim();
  assert.equal(normalize(document.querySelector('#app h1')?.textContent ?? ''), 'The Better Stablecoin');
  assert.equal(document.title, 'The Better Stablecoin | Argon');
  assert.equal(document.querySelectorAll('title').length, 1);
  assert.equal(document.querySelector('link[rel="canonical"]')?.getAttribute('href'),
    'https://argon.network/why-its-better');
  assert.match(document.querySelector('meta[name="description"]')?.getAttribute('content') ?? '',
    /inflation.*collapse of fiat money.*death spirals/);
  assert.equal(document.querySelector('meta[name="robots"]'), null);
  assert.ok(document.querySelector('#app[data-prerendered]'));

  const copy = normalize(document.querySelector('#app')?.textContent ?? '');
  for (const passage of [
    'Argon Solves the Biggest Problems of Fiat Money and Digital Stablecoins',
    'Understanding Fiat Money and Digital Stablecoins',
    'History of Money',
    'Argon\'s stabilization mechanism uses Bitcoin as a fully exogenous asset',
    'Argon is the only stablecoin in production that is fully decentralized, protected from inflation, insulated from the collapse of fiat money, and immune to death spirals.',
  ]) {
    assert.ok(copy.includes(passage), `Initial HTML is missing: ${passage}`);
  }
  assert.ok(document.querySelector('a[href="/"]'), 'Explainer must retain its homepage link');

  for (const link of document.querySelectorAll('link[rel="stylesheet"]')) {
    const href = link.getAttribute('href');
    if (!href?.startsWith('/')) continue;
    const stylesheet = await fetch(new URL(href, origin));
    assert.equal(stylesheet.status, 200, `Missing stylesheet: ${href}`);
    assert.match(stylesheet.headers.get('content-type'), /text\/css/);
  }

  const alternate = await fetch(`${origin}/why-its-better/`, { redirect: 'manual' });
  assert.equal(alternate.status, 301);
  assert.equal(alternate.headers.get('location'), '/why-its-better');
  assert.equal((await fetch(`${origin}/why-its-better/`)).status, 200);

  for (const path of ['/__unknown_explainer_test', '/why-its-better/unknown', '/why-its-betterish']) {
    assert.equal((await fetch(`${origin}${path}`)).status, 404, `Unknown URL must return 404: ${path}`);
  }

  const trade = await fetch(`${origin}/trade/`);
  assert.equal(trade.status, 200);
  const tradeDocument = new JSDOM(await trade.text()).window.document;
  assert.match(tradeDocument.querySelector('meta[name="robots"]')?.getAttribute('content') ?? '', /noindex/);
  assert.equal(tradeDocument.querySelector('link[rel="canonical"]'), null);

  console.log('PASS: homepage 200; explainer 200; trailing slash 301 → canonical 200; unknown URLs 404.');
  console.log('PASS: initial HTML contains the H1, core copy, metadata, homepage link, and available styles.');
  console.log('PASS: /trade/ stays noindex. No JavaScript ran during these HTML checks.');
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const server = createProductionPreview(resolve(process.argv[3] ?? 'dist-production'));
  await new Promise(resolveListening => server.listen(0, '127.0.0.1', resolveListening));
  const origin = `http://127.0.0.1:${server.address().port}`;

  if (process.argv[2] === '--serve') {
    console.log(`Production build preview with proposed DigitalOcean rules: ${origin}`);
  } else {
    try {
      await verifyProduction(origin);
    } finally {
      server.closeAllConnections();
      await new Promise(resolveClosed => server.close(resolveClosed));
    }
  }
}
