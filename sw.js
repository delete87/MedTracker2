// sw.js — offline-capable service worker for Med Tracker PWA
const CACHE_NAME = 'med-tracker-cache-v1';
const FILES_TO_CACHE = [
  './index.html',
  './style.css',
  './sw.js',
  './manifest.json',
  './icon-192.png'
];

// Install: cache files
self.addEventListener('install', event => {
  console.log('Service Worker installing and caching files...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

// Activate: cleanup old caches
self.addEventListener('activate', event => {
  console.log('Service Worker activating...');
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
  self.clients.claim();
});

// Fetch: respond with cached file when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResp => {
      return cachedResp || fetch(event.request);
    })
  );
});
