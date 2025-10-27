/**
 * Hook for loading gallery images from a public S3 bucket.
 * Preferred approach: host a small JSON manifest in the bucket (e.g. manifest.json)
 * to avoid listing APIs and keep bandwidth low.
 *
 * Manifest shape (example):
 * {
 *   "items": [
 *     { "key": "chair-restoration-1.jpg", "alt": "Restored vintage chair" },
 *     { "key": "sofa-upholstery-2.jpg", "alt": "Custom upholstered sofa" }
 *   ]
 * }
 *
 * Bucket must enable CORS for GET on manifest + images.
 */
import { useEffect, useState } from 'react';

export interface GalleryItem {
  key: string; // object key (filename)
  alt: string; // alt text
  url: string; // full resolved URL
}

interface UseS3GalleryOptions {
  bucket: string; // bucket name
  region?: string; // optional region, default eu-north-1
  prefix?: string; // optional key prefix (folder) to filter
  limit?: number; // optionally limit items
  cacheMinutes?: number; // TTL for cache in minutes (sessionStorage)
}

interface UseS3GalleryResult {
  items: GalleryItem[];
  loading: boolean;
  error: string | null;
  retry(): void;
}

function buildBaseUrl(bucket: string, region: string): string {
  // Path-style is deprecated for new buckets; use virtual-hosted-style.
  return `https://${bucket}.s3.${region}.amazonaws.com`;
}

function sanitizeAlt(alt?: string, key?: string): string {
  const base = (alt || key || '').replaceAll(/[-_]+/g, ' ').replace(/\.[^.]+$/, '').trim();
  return base.length ? base : 'Gallery image';
}

export function useS3Gallery({ bucket, region = 'eu-north-1', prefix, limit, cacheMinutes }: UseS3GalleryOptions): UseS3GalleryResult {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const baseOverride = (import.meta.env.VITE_GALLERY_BASE_URL as string | undefined)?.trim();
  const baseUrl = baseOverride || buildBaseUrl(bucket, region);
  let listUrl = baseUrl + '?list-type=2';
  if (prefix) {
    listUrl += '&prefix=' + encodeURIComponent(prefix);
  }

  const CACHE_KEY = `s3Gallery:${bucket}:${prefix || ''}`;
  const ttlMinutes = typeof cacheMinutes === 'number' ? cacheMinutes : (Number(import.meta.env.VITE_GALLERY_CACHE_MINUTES) || 360);
  let ignoreCache = false; // toggled in retry

  const fetchAndCache = () => {
    fetch(listUrl)
      .then(async r => {
        if (!r.ok) throw new Error(`list_http_${r.status}`);
        const xmlText = await r.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(xmlText, 'application/xml');
        const contents = Array.from(doc.getElementsByTagName('Contents'));
        const mapped: GalleryItem[] = contents.map(c => {
          const key = c.getElementsByTagName('Key')[0]?.textContent || '';
          if (!key || !/\.(jpe?g|png|gif|webp|avif)$/i.test(key)) return null;
          const url = baseUrl + '/' + encodeURIComponent(key);
          return {
            key,
            alt: sanitizeAlt(undefined, key),
            url
          };
        }).filter(Boolean) as GalleryItem[];
        const finalItems = limit ? mapped.slice(0, limit) : mapped;
        setItems(finalItems);
        try {
          if (typeof sessionStorage !== 'undefined') {
            const payload = { ts: Date.now(), items: finalItems };
            sessionStorage.setItem(CACHE_KEY, JSON.stringify(payload));
          }
        } catch { /* ignore quota errors */ }
      })
      .catch(e => setError(e.message || 'unknown_error'))
      .finally(() => setLoading(false));
  };

  const load = () => {
    setLoading(true);
    setError(null);

    if (!ignoreCache && tryLoadFromCache()) {
        return; // served from cache
    }

    fetchAndCache();
  };

  const tryLoadFromCache = (): boolean => {
    try {
        if (typeof sessionStorage !== 'undefined') {
            const raw = sessionStorage.getItem(CACHE_KEY);
            if (raw) {
                const parsed = JSON.parse(raw) as { ts?: number; items?: GalleryItem[] };
                if (parsed.ts && parsed.items && Array.isArray(parsed.items)) {
                    const ageMinutes = (Date.now() - parsed.ts) / 60000;
                    if (ageMinutes < ttlMinutes) {
                        setItems(limit ? parsed.items.slice(0, limit) : parsed.items);
                        setLoading(false);
                        return true;
                    }
                }
            }
        }
    } catch {
      /* ignore malformed cache */
    }
    return false;
};

  useEffect(load, [bucket, region, prefix, baseOverride, limit, ttlMinutes]);

  return {
    items,
    loading,
    error,
    retry: () => { ignoreCache = true; load(); }
  };
}
export default useS3Gallery;
