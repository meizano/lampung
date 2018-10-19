var cacheName = "KamusAksaraLampung-v1";

var fileCache = [
  // './',
  './index.html',
  './js/jquery-1.11.3.min.js',
  './js/bootstrap.min.js',
  './js/main.js',
  './js/offline.js',
  './css/bootstrap.min.css',
  './css/style.css',
  './fonts/aksara-Lampung-Unila-v2.ttf'
];


self.addEventListener('install', function (event) {
  console.log('SW terinstal');
  event.waitUntil(
    caches.open(cacheName)
    .then(function (cache) {
      // Menambahkan file ke cache
      return cache.addAll(fileCache);
    })
  );
});

self.addEventListener('activate', function (event) {
  console.log('SW aktif');
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(cacheNames.map(function (key) {
        if (key !== cacheName) {
          console.log('Service Worker: menghapus cache lama', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
    .then(function (res) {
      if (res) {
        return res;
      } else {
        return fetch(event.request);
      }
    })
  );
});