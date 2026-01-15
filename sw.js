// sw.js — minimal service worker for Med Tracker PWA

self.addEventListener('install', event => {
  console.log('Service Worker installing...');
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  console.log('Service Worker activating...');
});

self.addEventListener('fetch', event => {
  // Simple network pass-through (no caching yet)
  event.respondWith(fetch(event.request));
});
