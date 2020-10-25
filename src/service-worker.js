/* eslint-disable eqeqeq */
/* eslint-disable no-console */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-restricted-globals */
const CACHE_NAME = 'firstpwa';
const urlsToCache = [
  '/',
  '/nav.html',
  '/index.html',
  '/pages/home.html',
  '/pages/projects.html',
  '/pages/certifications.html',
  '/pages/experiences.html',
  '/js/materialize.min.js',
  '/js/script.js',
  '/css/materialize.min.css',
  '/css/styles.css',
  '/css/arrow.css',
  '/images/icon/icon-512.png',
  '/images/icon/android-icon-192x192-dunplab-manifest-21625.png',
  '/images/icon/apple-icon-180x180-dunplab-manifest-21625.png',
  '/images/icon/apple-icon-152x152-dunplab-manifest-21625.png',
  '/images/icon/apple-icon-144x144-dunplab-manifest-21625.png',
  '/images/icon/apple-icon-120x120-dunplab-manifest-21625.png',
  '/images/icon/apple-icon-114x114-dunplab-manifest-21625.png',
  '/images/icon/favicon-96x96-dunplab-manifest-21625.png',
  '/images/icon/apple-icon-76x76-dunplab-manifest-21625.png',
  '/images/icon/apple-icon-72x72-dunplab-manifest-21625.png',
  '/images/icon/apple-icon-60x60-dunplab-manifest-21625.png',
  '/images/icon/apple-icon-57x57-dunplab-manifest-21625.png',
  '/images/icon/favicon-32x32-dunplab-manifest-21625.png',
  '/images/icon/favicon-16x16-dunplab-manifest-21625.png',
  '/images/android_menengah.png',
  '/images/android_pemula.png',
  '/images/web_pemula.png',
  'https://fonts.googleapis.com/icon?family=Material+Icons&display=swap',
  'https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/css/all.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/webfonts/fa-brands-400.woff2',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/webfonts/fa-solid-900.woff2',
  '/manifest.json',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache)),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName != CACHE_NAME) {
            console.log(`ServiceWorker: cache ${cacheName} dihapus`);
            return caches.delete(cacheName);
          }
        }),
      )),
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request, { cacheName: CACHE_NAME })
      .then((response) => {
        if (response) {
          console.log('ServiceWorker: Gunakan aset dari cache: ', response.url);
          return response;
        }

        console.log('ServiceWorker: Memuat aset dari server: ', event.request.url);
        return fetch(event.request);
      }),
  );
});
