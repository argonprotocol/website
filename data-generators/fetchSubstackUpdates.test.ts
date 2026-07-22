import { describe, expect, it } from 'vitest';
import { parseSubstackFeed, sanitizeArticleHtml } from './fetchSubstackUpdates';

describe('parseSubstackFeed', () => {
  it('normalizes and sorts Argon articles while excluding unrelated posts', () => {
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
    expect(feed.items.map(item => item.id)).toEqual(['newest', 'older']);
    expect(feed.items[0].contentHtml).toBe('<p>Read the <strong>full release</strong>.</p>');
    expect(feed.items[1]).toMatchObject({
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
