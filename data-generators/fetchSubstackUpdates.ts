import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { XMLParser } from 'fast-xml-parser';
import sanitizeHtml from 'sanitize-html';

const DEFAULT_FEED_URL = 'https://argonnetwork.substack.com/feed';
const OUTPUT_PATH = resolve(dirname(fileURLToPath(import.meta.url)), '../public/data/updates.json');
const REQUEST_HEADERS = {
  Accept: 'application/rss+xml, application/xml;q=0.9, text/xml;q=0.8',
  'User-Agent': 'ArgonProtocolWebsite/1.0 (+https://argonprotocol.org)',
};

export interface SubstackUpdate {
  id: string;
  title: string;
  summary: string;
  url: string;
  publishedAt: string;
  author: string;
  imageUrl?: string;
  categories: string[];
  contentHtml: string;
  archiveMetadata?: {
    title: string;
    summary: string;
    tags: string[];
    wordCount: number;
  };
}

export interface SubstackUpdatesFeed {
  publication: string;
  publicationUrl: string;
  subscribeUrl: string;
  generatedAt: string;
  items: SubstackUpdate[];
}

function asArray<T>(value: T | T[] | undefined): T[] {
  if (value === undefined) return [];
  return Array.isArray(value) ? value : [value];
}

function text(value: unknown): string {
  if (typeof value === 'string' || typeof value === 'number') return String(value);
  if (value && typeof value === 'object' && '#text' in value) {
    return text((value as { '#text': unknown })['#text']);
  }
  return '';
}

function stripHtml(value: string): string {
  return value
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&mdash;/gi, '—')
    .replace(/&ndash;/gi, '–')
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCodePoint(Number(code)))
    .replace(/\s+/g, ' ')
    .trim();
}

function normalizeUrl(value: unknown): string {
  if (typeof value === 'string') return value;
  if (value && typeof value === 'object') {
    const record = value as Record<string, unknown>;
    return text(record['@_href'] ?? record['@_url'] ?? record['#text']);
  }
  return '';
}

function itemId(url: string): string {
  return url.split('/').filter(Boolean).at(-1) || url;
}

export function sanitizeArticleHtml(value: string): string {
  return sanitizeHtml(value, {
    allowedTags: [
      'p', 'br', 'hr', 'h2', 'h3', 'h4', 'h5', 'strong', 'b', 'em', 'i', 's',
      'blockquote', 'ul', 'ol', 'li', 'a', 'figure', 'figcaption', 'img', 'pre',
      'code', 'div', 'span', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'iframe',
    ],
    allowedAttributes: {
      a: ['href', 'title', 'rel'],
      img: ['src', 'alt', 'title', 'width', 'height', 'loading'],
      iframe: ['src', 'title', 'width', 'height', 'allow', 'allowfullscreen'],
      ol: ['start'],
      td: ['colspan', 'rowspan'],
      th: ['colspan', 'rowspan', 'scope'],
    },
    allowedSchemes: ['http', 'https', 'mailto'],
    allowedIframeHostnames: [
      'www.youtube.com',
      'youtube.com',
      'player.vimeo.com',
      'open.spotify.com',
    ],
    exclusiveFilter: frame => frame.tag === 'iframe' && !frame.attribs.src,
    transformTags: {
      a: sanitizeHtml.simpleTransform('a', { rel: 'noopener noreferrer' }),
      img: sanitizeHtml.simpleTransform('img', { loading: 'lazy' }),
    },
  }).trim();
}

export function parseSubstackFeed(xml: string, generatedAt = new Date()): SubstackUpdatesFeed {
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
    trimValues: true,
  });
  const parsed = parser.parse(xml) as Record<string, any>;
  const channel = parsed?.rss?.channel;

  if (!channel || !channel.item) {
    throw new Error('The Substack RSS feed did not contain any articles.');
  }

  const publicationUrl = normalizeUrl(channel.link);
  const items = asArray<Record<string, any>>(channel.item)
    .map((item): SubstackUpdate | null => {
      const url = normalizeUrl(item.link || item.guid);
      const title = stripHtml(text(item.title));
      const description = stripHtml(text(item.description));
      const rawContent = text(item['content:encoded']);
      const fullContent = stripHtml(rawContent);
      const categories = asArray(item.category).map(text).filter(Boolean);

      const publishedAt = new Date(text(item.pubDate));
      if (!url || !title || Number.isNaN(publishedAt.valueOf())) return null;

      return {
        id: itemId(url),
        title,
        summary: description || fullContent.slice(0, 220),
        url,
        publishedAt: publishedAt.toISOString(),
        author: text(item['dc:creator']),
        imageUrl: normalizeUrl(item.enclosure) || undefined,
        categories,
        contentHtml: sanitizeArticleHtml(rawContent),
      };
    })
    .filter((item): item is SubstackUpdate => item !== null)
    .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));

  return {
    publication: text(channel.title),
    publicationUrl,
    subscribeUrl: `${publicationUrl.replace(/\/$/, '')}/subscribe`,
    generatedAt: generatedAt.toISOString(),
    items,
  };
}

async function loadExistingFeed(error: unknown, outputPath: string): Promise<SubstackUpdatesFeed> {
  try {
    const feed = JSON.parse(await readFile(outputPath, 'utf8')) as SubstackUpdatesFeed;
    if (!feed.publication || !Array.isArray(feed.items)) {
      throw new Error('Existing Substack data is invalid.');
    }
    console.warn(
      `Unable to refresh the Substack feed; keeping existing data from ${feed.generatedAt}.`,
      error,
    );
    return feed;
  } catch {
    throw error;
  }
}

interface ArchivePost {
  slug: string;
  title: string;
  post_date: string;
  canonical_url: string;
  description?: string;
  subtitle?: string;
  cover_image?: string;
  body_html?: string;
  publishedBylines?: { name: string }[];
  postTags?: { name: string }[];
  wordcount?: number;
}

function archiveMetadata(post: ArchivePost | undefined): SubstackUpdate['archiveMetadata'] {
  if (!post || typeof post.title !== 'string' || !Array.isArray(post.postTags) ||
      typeof post.wordcount !== 'number' || !Number.isFinite(post.wordcount)) return undefined;
  return {
    title: stripHtml(post.title),
    summary: stripHtml(post.description || post.subtitle || ''),
    tags: [...new Set(post.postTags.map(tag => tag.name))].sort(),
    wordCount: post.wordcount,
  };
}

interface RequestTiming {
  nextRequestAt: number;
}

async function requestSubstack(url: URL, accept: string, timing: RequestTiming): Promise<Response> {
  url.searchParams.set('refresh', Date.now().toString());
  for (let attempt = 0; ; attempt++) {
    while (timing.nextRequestAt > Date.now()) {
      await new Promise(resolve => setTimeout(resolve, Math.min(timing.nextRequestAt - Date.now(), 60_000)));
    }
    timing.nextRequestAt = Date.now() + 1_000;
    const response = await fetch(url, {
      headers: { ...REQUEST_HEADERS, Accept: accept },
      signal: AbortSignal.timeout(30_000),
    });
    if (response.status === 429 && attempt < 3) {
      const retryAfter = response.headers.get('Retry-After');
      const retryDelay = retryAfter?.trim()
        ? /^\d+(\.\d+)?$/.test(retryAfter.trim())
          ? Number(retryAfter) * 1_000
          : Date.parse(retryAfter) - Date.now()
        : NaN;
      const backoff = Number.isFinite(retryDelay) && retryDelay >= 0
        ? retryDelay
        : 5_000 * 2 ** attempt;
      timing.nextRequestAt = Math.max(timing.nextRequestAt, Date.now() + backoff);
      await response.body?.cancel();
      console.warn(`Substack rate limit reached; retry ${attempt + 1}/3 in ${Math.ceil((timing.nextRequestAt - Date.now()) / 1_000)} seconds.`);
      continue;
    }
    if (!response.ok) {
      throw new Error(`Substack request failed with ${response.status} ${response.statusText}`);
    }
    return response;
  }
}

async function fetchArchive(feed: SubstackUpdatesFeed, origin: string, timing: RequestTiming, existingItems: SubstackUpdate[]): Promise<SubstackUpdate[]> {
  const posts = new Map<string, ArchivePost>();
  let offset = 0;
  let pageNumber = 1;
  while (true) {
    console.log(`Loading Substack archive page ${pageNumber}…`);
    const url = new URL('/api/v1/archive', origin);
    url.searchParams.set('sort', 'new');
    url.searchParams.set('offset', String(offset));
    url.searchParams.set('limit', '20');
    const page: unknown = await (await requestSubstack(url, 'application/json', timing)).json();
    if (!Array.isArray(page)) throw new Error('Invalid Substack archive response.');
    if (!page.length) break;
    const previousSize = posts.size;
    for (const post of page) {
      if (!post || typeof post.slug !== 'string' || !post.slug) {
        throw new Error('Substack archive post is missing its slug.');
      }
      posts.set(post.slug, post);
    }
    if (posts.size === previousSize) throw new Error('Substack archive pagination made no progress.');
    offset += page.length;
    pageNumber++;
  }
  if (!posts.size) {
    throw new Error('Substack archive did not contain any articles.');
  }

  // Archive pagination can skip recent posts that are still present in RSS.
  const existing = new Map(existingItems.map(item => [item.id, item]));
  const slugs = new Set([...posts.keys(), ...feed.items.map(item => item.id), ...existing.keys()]);
  console.log(`Checking ${slugs.size} articles for tag, title, summary, or word count changes…`);
  const items: SubstackUpdate[] = [];
  let loaded = 0;
  let unchanged = 0;
  let retained = 0;
  for (const slug of slugs) {
    const cached = existing.get(slug);
    const metadata = archiveMetadata(posts.get(slug));
    const title = posts.get(slug)?.title || feed.items.find(item => item.id === slug)?.title || cached?.title || slug;
    if (cached && (!metadata || (cached.archiveMetadata &&
        JSON.stringify(metadata) === JSON.stringify(cached.archiveMetadata)))) {
      if (metadata) unchanged++;
      else retained++;
      console.log(`[${items.length + 1}/${slugs.size}] ${metadata ? 'Unchanged' : 'Keeping cached (archive metadata unavailable)'}: ${stripHtml(title)}`);
      items.push(cached);
      continue;
    }
    console.log(`[${items.length + 1}/${slugs.size}] Loading ${stripHtml(title)}…`);
    const url = new URL(`/api/v1/posts/${encodeURIComponent(slug)}`, origin);
    const post: ArchivePost = await (await requestSubstack(url, 'application/json', timing)).json();
    if (!post || post.slug !== slug || !post.title || !post.canonical_url ||
        !Number.isFinite(Date.parse(post.post_date)) || typeof post.body_html !== 'string') {
      throw new Error(`Invalid or missing Substack article content: ${slug}`);
    }
    items.push({
      id: slug,
      title: stripHtml(post.title),
      summary: stripHtml(post.description || post.subtitle || '') || stripHtml(post.body_html).slice(0, 220),
      url: post.canonical_url,
      publishedAt: new Date(post.post_date).toISOString(),
      author: (post.publishedBylines || []).map(byline => byline.name).join(', '),
      imageUrl: post.cover_image || undefined,
      categories: (post.postTags || []).map(tag => tag.name),
      contentHtml: sanitizeArticleHtml(post.body_html),
      archiveMetadata: metadata,
    });
    loaded++;
  }
  console.log(`Articles: ${loaded} loaded, ${unchanged} unchanged, ${retained} kept without archive metadata.`);
  return items.sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));
}

export default async function fetchSubstackUpdates(
  feedUrl = process.env.SUBSTACK_FEED_URL || DEFAULT_FEED_URL,
  outputPath = OUTPUT_PATH,
): Promise<SubstackUpdatesFeed> {
  let feed: SubstackUpdatesFeed;
  const timing: RequestTiming = { nextRequestAt: 0 };
  try {
    let existingItems: SubstackUpdate[] = [];
    try {
      const existing = JSON.parse(await readFile(outputPath, 'utf8')) as SubstackUpdatesFeed;
      if (Array.isArray(existing.items)) {
        existingItems = existing.items.filter(item => item && typeof item.id === 'string' &&
          typeof item.title === 'string' && typeof item.contentHtml === 'string' && Array.isArray(item.categories));
      }
    } catch (error) {
      if (!(error instanceof SyntaxError) && (error as NodeJS.ErrnoException).code !== 'ENOENT') throw error;
    }
    const requestUrl = new URL(feedUrl);
    console.log('Loading Substack RSS feed…');
    const response = await requestSubstack(requestUrl, REQUEST_HEADERS.Accept, timing);
    feed = parseSubstackFeed(await response.text());
    console.log(`Found ${feed.items.length} articles in RSS. Checking the full archive…`);
    feed.items = await fetchArchive(feed, requestUrl.origin, timing, existingItems);
  } catch (error) {
    return loadExistingFeed(error, outputPath);
  }

  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(feed, null, 2)}\n`, 'utf8');
  console.log(`Saved ${feed.items.length} Substack updates to ${outputPath}`);
  return feed;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  fetchSubstackUpdates().catch(error => {
    console.error('Unable to update the Substack feed:', error);
    process.exit(1);
  });
}
