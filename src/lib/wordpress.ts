const DEFAULT_POST_IMAGE = '/images/background.webp';

export const WP_API_BASE = 'https://admin.gobank.com.br/wp-json/wp/v2';

export function getFeaturedMediaUrl(
  post: { _embedded?: Record<string, unknown> },
  fallback = DEFAULT_POST_IMAGE,
): string {
  const media = post._embedded?.['wp:featuredmedia'] as Array<{ source_url?: string }> | undefined;
  return media?.[0]?.source_url ?? fallback;
}

export function hasFeaturedMedia(post: { _embedded?: Record<string, unknown> }): boolean {
  return Boolean(getFeaturedMediaUrl(post, ''));
}

export function getPrimaryCategory(post: { _embedded?: Record<string, unknown> }): { id: number; name: string } | null {
  const terms = post._embedded?.['wp:term'] as Array<Array<{ id: number; name: string }>> | undefined;
  return terms?.[0]?.[0] ?? null;
}

export function filterPostsWithFeaturedMedia<T extends { _embedded?: Record<string, unknown> }>(posts: unknown): T[] {
  return Array.isArray(posts) ? posts.filter(hasFeaturedMedia) : [];
}

/** Safe WordPress REST fetch — returns null when the API replies with HTML/errors instead of JSON. */
export async function fetchWordpressJson<T = unknown>(url: string): Promise<T | null> {
  try {
    const response = await fetch(url);
    const contentType = response.headers.get('content-type') || '';

    if (!response.ok || !contentType.includes('application/json')) {
      console.error(`WordPress fetch failed (${response.status}, ${contentType}): ${url}`);
      return null;
    }

    return (await response.json()) as T;
  } catch (error) {
    console.error(`WordPress fetch error: ${url}`, error);
    return null;
  }
}

export async function fetchWordpressCollection(url: string): Promise<{ data: any[]; total: number }> {
  try {
    const response = await fetch(url);
    const contentType = response.headers.get('content-type') || '';

    if (!response.ok || !contentType.includes('application/json')) {
      console.error(`WordPress collection fetch failed (${response.status}, ${contentType}): ${url}`);
      return { data: [], total: 0 };
    }

    const data = await response.json();
    const total = Number(response.headers.get('x-wp-total') || 0);

    return {
      data: Array.isArray(data) ? data : [],
      total,
    };
  } catch (error) {
    console.error(`WordPress collection fetch error: ${url}`, error);
    return { data: [], total: 0 };
  }
}
