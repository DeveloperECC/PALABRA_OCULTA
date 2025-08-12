// service-worker.js
const CACHE_NAME = 'palabra-oculta-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  // Si tuvieras iconos, imágenes o CSS externos, irían aquí
];

// Instalar el Service Worker y precachear los recursos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache abierto, precacheando recursos...');
        return cache.addAll(urlsToCache);
      })
  );
});

// Interceptar las peticiones de red para servir los recursos desde la caché
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Si el recurso está en la caché, lo devuelve
        if (response) {
          return response;
        }
        // Si no, realiza la petición a la red
        return fetch(event.request);
      })
  );
});
