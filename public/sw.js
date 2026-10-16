// Audio-only offline cache: built-in voice files are cached the first time they play,
// so lessons already heard keep working without network. App pages are never cached.
const CACHE = "sayup-audio-v2";
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (event.request.method !== "GET" || url.origin !== self.location.origin || !url.pathname.startsWith("/audio/")) return;
  event.respondWith(
    caches.open(CACHE).then(async (cache) => {
      const isIndex = url.pathname.endsWith("index.json");
      const hit = await cache.match(event.request);
      if (hit && !isIndex) return hit;
      try {
        const res = await fetch(event.request);
        if (res.ok && res.status === 200) cache.put(event.request, res.clone());
        return res;
      } catch (err) {
        if (hit) return hit;
        throw err;
      }
    }),
  );
});
