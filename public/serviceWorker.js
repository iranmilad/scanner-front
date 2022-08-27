const APP_CACHE = 'tseshow';

// Install a service worker
self.addEventListener('install', (event) => {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});


// Update a service worker
self.addEventListener('activate', (event) => {
  var cacheWhitelist = ['tseshow'];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
