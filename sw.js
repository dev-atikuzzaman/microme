const CACHE_NAME = 'tottokosh-cache-v9';
const ASSETS = [
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './icons/icon-maskable-192.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png',
  './icons/favicon.ico',
  './icons/favicon-16.png',
  './icons/favicon-32.png',
  './icons/favicon-48.png',
  './css/style.css',
  './js/tailwind-config.js',
  './js/fonts.js',
  './js/tabs.js',
  './js/tts.js',
  './js/swipe-gestures.js',
  './js/tab1-numbers.js',
  './js/tab2-ordinals.js',
  './js/tab3-weekdays.js',
  './js/tab4-months.js',
  './js/tab5-seasons.js',
  './js/tab6-roman.js',
  './js/tab7-converter.js',
  './js/tab8-custom.js',
  './js/export-import.js',
  './js/tab9-bangladesh.js',
  './js/tab10-continents.js',
  './js/tab11-oceans.js',
  './js/global-search.js',
  './js/voice-input.js',
  './js/favorites-history.js',
  './js/cloud-sync.js',
  './js/main.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)).catch(()=>{})
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Never intercept third-party CDN or cross-origin requests (Tailwind, xlsx, fonts etc.)
  if (!event.request.url.startsWith(self.location.origin)) return;

  // Never cache API routes (e.g. /api/config) — always go to the network so
  // Supabase credentials / sync status stay current.
  if (event.request.url.includes('/api/')) {
    event.respondWith(fetch(event.request));
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request).then((response) => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        return response;
      }).catch(() => cached);
    })
  );
});
