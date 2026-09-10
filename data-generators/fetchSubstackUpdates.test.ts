import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import refreshSubstackUpdates, { parseSubstackFeed, sanitizeArticleHtml } from './fetchSubstackUpdates';

const temporaryDirectories: string[] = [];

beforeEach(() => {
  vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout', 'Date'] });
  vi.setSystemTime(new Date('2026-09-10T00:00:00Z'));
});

async function fetchSubstackUpdates(...args: Parameters<typeof refreshSubstackUpdates>) {
  const result = refreshSubstackUpdates(...args);
  let settled = false;
  void result.then(() => { settled = true; }, () => { settled = true; });
  while (!settled) {
    await vi.runOnlyPendingTimersAsync();
    await new Promise(resolve => setImmediate(resolve));
  }
  return result;
}

afterEach(async () => {
  vi.useRealTimers();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  await Promise.all(temporaryDirectories.splice(0).map(path => rm(path, { recursive: true })));
});

describe('parseSubstackFeed', () => {
  it('normalizes and sorts every published article', () => {
    const feed = parseSubstackFeed(
      `<?xml version="1.0" encoding="UTF-8"?>
      <rss xmlns:dc="http://purl.org/dc/elements/1.1/" version="2.0">
        <channel>
          <title><![CDATA[Clark & Byrnes]]></title>
          <link>https://example.substack.com</link>
          <item>
            <title><![CDATA[Older Argon update]]></title>
            <description><![CDATA[An <strong>Argon</strong> announcement.]]></description>
            <link>https://example.substack.com/p/older</link>
            <dc:creator>Caleb</dc:creator>
            <pubDate>Mon, 01 Jun 2026 12:00:00 GMT</pubDate>
            <category>Network</category>
            <enclosure url="https://example.com/older.png" type="image/png" />
          </item>
          <item>
            <title>Newest release</title>
            <description>Argon Desktop is available.</description>
            <content:encoded xmlns:content="http://purl.org/rss/1.0/modules/content/"><![CDATA[
              <p>Read the <strong>full release</strong>.</p>
              <script>alert('unsafe')</script>
            ]]></content:encoded>
            <link>https://example.substack.com/p/newest</link>
            <pubDate>Tue, 02 Jun 2026 12:00:00 GMT</pubDate>
          </item>
          <item>
            <title>Ulixee only</title>
            <description>An unrelated project update.</description>
            <link>https://example.substack.com/p/unrelated</link>
            <pubDate>Wed, 03 Jun 2026 12:00:00 GMT</pubDate>
          </item>
        </channel>
      </rss>`,
      new Date('2026-06-04T00:00:00Z'),
    );

    expect(feed.publication).toBe('Clark & Byrnes');
    expect(feed.subscribeUrl).toBe('https://example.substack.com/subscribe');
    expect(feed.generatedAt).toBe('2026-06-04T00:00:00.000Z');
    expect(feed.items.map(item => item.id)).toEqual(['unrelated', 'newest', 'older']);
    expect(feed.items[1].contentHtml).toBe('<p>Read the <strong>full release</strong>.</p>');
    expect(feed.items[2]).toMatchObject({
      summary: 'An Argon announcement.',
      author: 'Caleb',
      imageUrl: 'https://example.com/older.png',
      categories: ['Network'],
    });
  });

  it('rejects feeds without articles', () => {
    expect(() => parseSubstackFeed('<rss><channel /></rss>')).toThrow(
      'The Substack RSS feed did not contain any articles.',
    );
  });

  it('keeps article formatting while removing unsafe markup', () => {
    expect(
      sanitizeArticleHtml(
        '<h2>Heading</h2><p><a href="javascript:alert(1)" onclick="bad()">Link</a></p><iframe src="https://evil.example/embed"></iframe>',
      ),
    ).toBe('<h2>Heading</h2><p><a rel="noopener noreferrer">Link</a></p>');
  });
});

describe('fetchSubstackUpdates', () => {
  it('keeps valid existing data when Substack rejects the refresh', async () => {
    const directory = await mkdtemp(join(tmpdir(), 'argon-substack-'));
    temporaryDirectories.push(directory);
    const outputPath = join(directory, 'updates.json');
    const existingFeed = {
      publication: 'Clark & Byrnes',
      publicationUrl: 'https://argonnetwork.substack.com',
      subscribeUrl: 'https://argonnetwork.substack.com/subscribe',
      generatedAt: '2026-07-22T02:33:36.184Z',
      items: [],
    };
    await writeFile(outputPath, JSON.stringify(existingFeed));
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('', {
      status: 403,
      statusText: 'Forbidden',
    })));
    const warning = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

    await expect(fetchSubstackUpdates('https://example.com/feed', outputPath))
      .resolves.toEqual(existingFeed);
    expect(warning).toHaveBeenCalledWith(
      expect.stringContaining('keeping existing data'),
      expect.any(Error),
    );
  });

  it('fails when a refresh fails and no existing data is available', async () => {
    const directory = await mkdtemp(join(tmpdir(), 'argon-substack-'));
    temporaryDirectories.push(directory);
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network unavailable')));

    await expect(fetchSubstackUpdates(
      'https://example.com/feed',
      join(directory, 'missing.json'),
    )).rejects.toThrow('network unavailable');
  });
});

const archiveRss = `<rss><channel><title>Argon Network</title>
  <link>https://example.com</link><item><title>Newest</title>
  <link>https://example.com/p/post-0</link>
  <pubDate>Tue, 02 Jun 2026 12:00:00 GMT</pubDate>
  </item></channel></rss>`;

function mockArchive(failure?: string) {
  return vi.fn(async (input: URL) => {
    const url = new URL(input);
    if (url.pathname === '/feed') return new Response(archiveRss);
    if (url.pathname === '/api/v1/archive') {
      const offset = Number(url.searchParams.get('offset'));
      if (offset && failure === 'archive') return new Response('', { status: 503 });
      if (offset && failure === 'malformed') return Response.json({ error: 'bad response' });
      if (offset && failure === 'repeated') {
        return Response.json(Array.from({ length: 20 }, (_, i) => ({ slug: `post-${i}` })));
      }
      const slugs = offset === 0
        ? Array.from({ length: 20 }, (_, i) => `post-${i}`)
        : offset === 20 ? ['post-19', 'argon-is-live'] : [];
      return Response.json(slugs.map(slug => ({ slug })));
    }
    const slug = url.pathname.split('/').at(-1);
    if (slug === 'argon-is-live' && failure === 'article') return new Response('', { status: 404 });
    return Response.json({
      slug,
      title: slug === 'argon-is-live' ? 'Argon Is Live' : 'Release',
      post_date: slug === 'argon-is-live' ? '2025-01-16T01:48:38Z' : '2026-06-02T12:00:00Z',
      canonical_url: `https://example.com/p/${slug}`,
      description: 'An <b>update.</b>',
      body_html: failure === 'content' ? null : '<p>Full article</p><script>bad()</script>',
      publishedBylines: [{ name: 'Caleb' }],
      postTags: [{ name: 'Network' }],
      cover_image: 'https://example.com/image.png',
    });
  });
}

describe('Substack archive refresh', () => {
  it('retains cached articles omitted from both RSS and the archive', async () => {
    const directory = await mkdtemp(join(tmpdir(), 'argon-substack-'));
    temporaryDirectories.push(directory);
    const outputPath = join(directory, 'updates.json');
    const cached = {
      id: 'omitted', title: 'Older article', contentHtml: '<p>Saved content</p>',
      categories: ['Milestones'], publishedAt: '2025-01-01T00:00:00Z',
    };
    await writeFile(outputPath, JSON.stringify({ publication: 'Argon Network', items: [cached] }));
    const fetch = mockArchive();
    vi.stubGlobal('fetch', fetch);
    const result = await fetchSubstackUpdates('https://example.com/feed', outputPath);
    expect(result.items).toHaveLength(22);
    expect(result.items.find(item => item.id === 'omitted')).toEqual(cached);
    expect(fetch.mock.calls.some(([url]) => url.pathname === '/api/v1/posts/omitted')).toBe(false);
  });

  it.each(['unchanged', 'title', 'summary', 'tags', 'wordcount', 'tag order', 'body only', 'missing metadata', 'missing baseline'])(
    'reuses cached content according to archive metadata: %s', async change => {
      const directory = await mkdtemp(join(tmpdir(), 'argon-substack-'));
      temporaryDirectories.push(directory);
      const outputPath = join(directory, 'updates.json');
      const post = {
        slug: 'post-0', title: 'Original title', description: 'Original summary', wordcount: 2,
        postTags: [{ name: 'Milestones' }, { name: 'Deep Dives' }],
        canonical_url: 'https://example.com/p/post-0', post_date: '2026-06-02T12:00:00Z',
        body_html: '<p>Original content</p>',
      };
      let secondRun = false;
      const fetch = vi.fn(async (input: URL) => {
        if (input.pathname === '/feed') return new Response(archiveRss);
        if (input.pathname === '/api/v1/archive') {
          return Response.json(Number(input.searchParams.get('offset')) ? [] : [{
            ...post, wordcount: secondRun && change === 'missing metadata' ? undefined : post.wordcount,
          }]);
        }
        return Response.json(post);
      });
      vi.stubGlobal('fetch', fetch);
      const initial = await fetchSubstackUpdates('https://example.com/feed', outputPath);
      expect(initial.items[0].archiveMetadata?.wordCount).toBe(2);
      if (change === 'missing baseline') {
        delete initial.items[0].archiveMetadata;
        await writeFile(outputPath, JSON.stringify(initial));
      }
      if (change === 'title') post.title = 'Changed title';
      if (change === 'summary') post.description = 'Changed summary';
      if (change === 'tags') post.postTags = [{ name: 'Releases' }];
      if (change === 'wordcount') post.wordcount = 3;
      if (change === 'tag order') post.postTags.reverse();
      post.body_html = '<p>Updated content</p>';
      secondRun = true;
      fetch.mockClear();
      const result = await fetchSubstackUpdates('https://example.com/feed', outputPath);
      const shouldReload = ['title', 'summary', 'tags', 'wordcount', 'missing baseline'].includes(change);
      const articleRequests = fetch.mock.calls.filter(([url]) => url.pathname.startsWith('/api/v1/posts/'));
      expect(articleRequests).toHaveLength(shouldReload ? 1 : 0);
      expect(result.items[0].contentHtml).toBe(shouldReload ? '<p>Updated content</p>' : '<p>Original content</p>');
      expect(JSON.parse(await readFile(outputPath, 'utf8'))).toEqual(result);
    },
  );

  it.each(['seconds', 'date', 'missing', 'invalid'])(
    'paces requests and recovers from an article rate limit with %s Retry-After', async mode => {
      const directory = await mkdtemp(join(tmpdir(), 'argon-substack-'));
      temporaryDirectories.push(directory);
      const requestTimes: number[] = [];
      const articleTimes: number[] = [];
      const archiveFetch = mockArchive();
      vi.stubGlobal('fetch', vi.fn(async (input: URL) => {
        requestTimes.push(Date.now());
        if (input.pathname === '/api/v1/posts/post-0') {
          articleTimes.push(Date.now());
          if (articleTimes.length <= 2) {
            const retryAfter = mode === 'seconds' ? '7'
              : mode === 'date' ? new Date(Date.now() + 7_000).toUTCString()
              : mode === 'invalid' ? 'invalid' : undefined;
            return new Response('', {
              status: 429,
              headers: retryAfter ? { 'Retry-After': retryAfter } : {},
            });
          }
        }
        return archiveFetch(input);
      }));
      const warning = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
      const feed = await fetchSubstackUpdates('https://example.com/feed', join(directory, 'updates.json'));
      expect(feed.items).toHaveLength(21);
      expect(articleTimes).toHaveLength(3);
      expect(articleTimes[1] - articleTimes[0]).toBeGreaterThanOrEqual(mode === 'seconds' || mode === 'date' ? 7_000 : 5_000);
      expect(articleTimes[2] - articleTimes[1]).toBeGreaterThanOrEqual(mode === 'seconds' || mode === 'date' ? 7_000 : 10_000);
      expect(requestTimes.slice(1).every((time, i) => time - requestTimes[i] >= 1_000)).toBe(true);
      expect(warning).toHaveBeenCalledTimes(2);
    },
  );

  it('stops after three retries and leaves the saved file untouched', async () => {
    const directory = await mkdtemp(join(tmpdir(), 'argon-substack-'));
    temporaryDirectories.push(directory);
    const outputPath = join(directory, 'updates.json');
    const existing = { publication: 'Argon Network', items: [{ id: 'saved' }] };
    const saved = JSON.stringify(existing);
    await writeFile(outputPath, saved);
    const fetch = vi.fn(async () => new Response('', { status: 429, statusText: 'Too Many Requests' }));
    vi.stubGlobal('fetch', fetch);
    const warning = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    await expect(fetchSubstackUpdates('https://example.com/feed', outputPath)).resolves.toEqual(existing);
    expect(fetch).toHaveBeenCalledTimes(4);
    expect(warning).toHaveBeenCalledWith(expect.stringContaining('retry 3/3 in 20 seconds'));
    expect(await readFile(outputPath, 'utf8')).toBe(saved);
  });

  it.each([false, true])('fetches RSS-only articles and preserves saved data on failure: %s', async failArticle => {
    const directory = await mkdtemp(join(tmpdir(), 'argon-substack-'));
    temporaryDirectories.push(directory);
    const outputPath = join(directory, 'updates.json');
    const existing = { publication: 'Argon Network', items: [{ id: 'saved' }] };
    const saved = JSON.stringify(existing);
    await writeFile(outputPath, saved);
    const archiveFetch = mockArchive();
    const fetch = vi.fn(async (input: URL) => {
      const url = new URL(input);
      if (url.pathname === '/feed') {
        return new Response(archiveRss.replace('</channel>', `<item>
          <title>RSS-only article</title><link>https://example.com/p/rss-only</link>
          <pubDate>Wed, 03 Jun 2026 12:00:00 GMT</pubDate>
          <category>Old tag</category></item></channel>`));
      }
      if (url.pathname === '/api/v1/posts/rss-only' && failArticle) {
        return new Response('', { status: 503 });
      }
      return archiveFetch(input);
    });
    vi.stubGlobal('fetch', fetch);
    vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    const feed = await fetchSubstackUpdates('https://example.com/feed', outputPath);
    if (failArticle) {
      expect(feed).toEqual(existing);
      expect(await readFile(outputPath, 'utf8')).toBe(saved);
    } else {
      expect(feed.items).toHaveLength(22);
      expect(feed.items.find(item => item.id === 'rss-only')).toMatchObject({
        contentHtml: '<p>Full article</p>', categories: ['Network'],
      });
      expect(JSON.parse(await readFile(outputPath, 'utf8'))).toEqual(feed);
    }
    const paths = fetch.mock.calls.map(([url]) => new URL(url).pathname);
    expect(paths.filter(path => path === '/api/v1/posts/post-0')).toHaveLength(1);
    expect(paths.filter(path => path === '/api/v1/posts/rss-only')).toHaveLength(1);
  });

  it('paginates past RSS, deduplicates posts, and fetches sanitized full content', async () => {
    const directory = await mkdtemp(join(tmpdir(), 'argon-substack-'));
    temporaryDirectories.push(directory);
    const outputPath = join(directory, 'updates.json');
    const fetch = mockArchive();
    vi.stubGlobal('fetch', fetch);
    const feed = await fetchSubstackUpdates('https://example.com/feed', outputPath);
    expect(feed.items).toHaveLength(21);
    expect(feed.items.at(-1)).toMatchObject({
      id: 'argon-is-live', title: 'Argon Is Live', author: 'Caleb',
      summary: 'An update.', categories: ['Network'],
      imageUrl: 'https://example.com/image.png', contentHtml: '<p>Full article</p>',
    });
    const urls = fetch.mock.calls.map(([url]) => new URL(url));
    expect(urls.filter(url => url.pathname === '/api/v1/archive')
      .map(url => url.searchParams.get('offset'))).toEqual(['0', '20', '22']);
    expect(urls.filter(url => url.pathname === '/api/v1/posts/post-19')).toHaveLength(1);
    expect(JSON.parse(await readFile(outputPath, 'utf8'))).toEqual(feed);
  });

  it.each(['archive', 'article', 'malformed', 'repeated', 'content'])(
    'leaves the saved file untouched on %s failure', async failure => {
      const directory = await mkdtemp(join(tmpdir(), 'argon-substack-'));
      temporaryDirectories.push(directory);
      const outputPath = join(directory, 'updates.json');
      const existing = { publication: 'Argon Network', items: [{ id: 'saved' }] };
      const saved = JSON.stringify(existing);
      await writeFile(outputPath, saved);
      vi.stubGlobal('fetch', mockArchive(failure));
      vi.spyOn(console, 'warn').mockImplementation(() => undefined);
      await expect(fetchSubstackUpdates('https://example.com/feed', outputPath)).resolves.toEqual(existing);
      expect(await readFile(outputPath, 'utf8')).toBe(saved);
    },
  );
});
