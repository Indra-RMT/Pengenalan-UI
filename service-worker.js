const CACHE_NAME = 'pengenalan-ui-v5';
const urlToCache = [
  '/',
  '/nav.html',
  '/index.html',
  '/pages/alat.html',
  '/pages/prinsip-dasar.html',
  '/pages/tentang.html',
  '/pages/tren-ui.html',
  '/css/material-icons.css',
  '/css/materialize.min.css',
  '/css/style.css',
  '/js/materialize.min.js',
  '/js/nav.js',
  '/images/header-image.jpg',
  '/images/icon-512x512.png',
  '/images/icon-384x384.png',
  '/images/icon-256x256.png',
  '/images/icon-192x192-non_transparent.jpg',
  '/images/icon-192x192.png',
  '/images/icon-128x128.png',
  '/images/alat/adobe-comp.jpg',
  '/images/alat/adobe-xd.jpg',
  '/images/alat/atomic.jpg',
  '/images/alat/axure.jpg',
  '/images/alat/balsamic.jpg',
  '/images/alat/figma.jpg',
  '/images/alat/flinto.jpg',
  '/images/alat/framer-x.jpg',
  '/images/alat/invision-studio.jpg',
  '/images/alat/marvel.jpg',
  '/images/alat/mock-flow.jpg',
  '/images/alat/principle.jpg',
  '/images/alat/proto-io.jpg',
  '/images/alat/sketch.jpg',
  '/images/alat/uxpin.jpg',
  '/images/tren-ui/3d.jpg',
  '/images/tren-ui/asimetri.jpg',
  '/images/tren-ui/bbc.jpg',
  '/images/tren-ui/color-trend.jpg',
  '/images/tren-ui/deformation.jpg',
  '/images/tren-ui/everest.png',
  '/images/tren-ui/font.jpg',
  '/images/tren-ui/gradient.jpg',
  '/images/tren-ui/isometri.jpg',
  '/images/tren-ui/siggraph.jpg',
  '/images/tren-ui/sterling.jpg',
  '/images/tentang/about.jpg',
  '/images/tentang/user.jpg'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlToCache);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches
      .match(event.request, { cacheName: CACHE_NAME })
      .then(function(response) {
        if (response) {
          console.log('ServiceWorker: Gunakan aset dari cache: ', response.url);
          return response;
        }

        console.log(
          'ServiceWorker: Memuat aset dari server: ',
          event.request.url
        );
        return fetch(event.request);
      })
  )
})

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log('ServiceWorker: cache ' + cacheName + ' dihapus');
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});