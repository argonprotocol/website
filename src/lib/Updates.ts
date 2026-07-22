export interface UpdateArticle {
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

export function updatePath(article: Pick<UpdateArticle, 'id'>): string {
  return `/updates/${encodeURIComponent(article.id)}`;
}

export interface UpdatesFeed {
  publication: string;
  publicationUrl: string;
  subscribeUrl: string;
  generatedAt: string;
  items: UpdateArticle[];
}

export async function loadUpdates(): Promise<UpdatesFeed> {
  const response = await fetch('/data/updates.json');
  if (!response.ok) throw new Error(`Updates request failed with status ${response.status}`);
  return response.json() as Promise<UpdatesFeed>;
}

export function formatUpdateDate(value: string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value));
}
