/**
 * Resolves API paths. In Capacitor native iOS/Android, maps relative /api/* paths
 * to the production cloud backend (https://sayup-english.lovable.app).
 */
export function getApiUrl(path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (typeof window !== 'undefined') {
    const isCapacitor = !!(window as unknown as { Capacitor?: { isNativePlatform?: () => boolean } }).Capacitor?.isNativePlatform?.();
    const isLocalhost = window.location.origin.includes('localhost') && !window.location.port;
    if (isCapacitor || isLocalhost) {
      return `https://sayup-english.lovable.app${clean}`;
    }
  }
  return clean;
}
