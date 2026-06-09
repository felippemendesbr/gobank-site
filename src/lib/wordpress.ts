const DEFAULT_POST_IMAGE = '/images/background.webp';

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
