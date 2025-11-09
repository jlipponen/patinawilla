/**
 * Hook for loading gallery images from a public S3 bucket.
 */
import { useEffect, useState } from 'react';

export interface GalleryItem {
  key: string;
  alt: string;
  url: string;
}

interface UseS3GalleryOptions {
  bucket: string;
  region?: string;
  prefix?: string;
}

interface UseS3GalleryResult {
  items: GalleryItem[];
  loading: boolean;
  error: string | null;
}

function sanitizeAlt(key: string): string {
  const base = key.replaceAll(/[-_]+/g, ' ').replace(/\.[^.]+$/, '').trim();
  return base || 'Gallery image';
}

export function useS3Gallery({ bucket, region = 'eu-north-1', prefix }: UseS3GalleryOptions): UseS3GalleryResult {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const baseUrl = `https://${bucket}.s3.${region}.amazonaws.com`;
        let listUrl = `${baseUrl}?list-type=2`;
        if (prefix) {
          listUrl += `&prefix=${encodeURIComponent(prefix)}`;
        }

        const response = await fetch(listUrl);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const xmlText = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(xmlText, 'application/xml');

        const contents = Array.from(doc.getElementsByTagName('Contents'));
        const images = contents
          .map(item => {
            const key = item.getElementsByTagName('Key')[0]?.textContent || '';
            if (!key || !/\.(jpe?g|png|gif|webp|avif)$/i.test(key)) return null;
            return {
              key,
              alt: sanitizeAlt(key),
              url: `${baseUrl}/${encodeURIComponent(key)}`,
            };
          })
          .filter((item): item is GalleryItem => item !== null)
          .reverse(); // Reverse to show newest first

        setItems(images);
        setError(null);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to load images');
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [bucket, region, prefix]);

  return { items, loading, error };
}

export default useS3Gallery;
