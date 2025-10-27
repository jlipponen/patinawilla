// Lightweight media query hook for responsive logic.
// Returns boolean match state and updates on resize.
import { useEffect, useState } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof globalThis === 'undefined') return false;
    return globalThis.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof globalThis === 'undefined') return;
    const mql = globalThis.matchMedia(query);
    const handler = () => setMatches(mql.matches);
    handler();
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [query]);

  return matches;
}

export default useMediaQuery;
