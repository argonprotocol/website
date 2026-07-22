import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { XMLParser } from 'fast-xml-parser';
import sanitizeHtml from 'sanitize-html';

const DEFAULT_FEED_URL = 'https://clarkbyrnes.substack.com/feed';
const OUTPUT_PATH = resolve(dirname(fileURLToPath(import.meta.url)), '../public/data/updates.json');

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
      const searchable = `${title} ${description} ${fullContent} ${categories.join(' ')}`;

      // This publication also covers Ulixee. Only surface posts connected to Argon.
      if (!/\bargon(?:ot|s)?\b/i.test(searchable)) return null;

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

export default async function fetchSubstackUpdates(): Promise<SubstackUpdatesFeed> {
  const feedUrl = process.env.SUBSTACK_FEED_URL || DEFAULT_FEED_URL;
  const response = await fetch(feedUrl);
  if (!response.ok) {
    throw new Error(`Substack RSS request failed with ${response.status} ${response.statusText}`);
  }

  const feed = parseSubstackFeed(await response.text());
  await mkdir(dirname(OUTPUT_PATH), { recursive: true });
  await writeFile(OUTPUT_PATH, `${JSON.stringify(feed, null, 2)}\n`, 'utf8');
  console.log(`Saved ${feed.items.length} Argon updates to ${OUTPUT_PATH}`);
  return feed;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  fetchSubstackUpdates().catch(error => {
    console.error('Unable to update the Substack feed:', error);
    process.exit(1);
  });
}
