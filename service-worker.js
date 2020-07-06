const CONFIG = {
  cacheName: 'hackernews-feed',
  apiURL: 'https://hacker-news.firebaseio.com',
  staticFiles: [
    './',
    './manifest.json',
    './index.html',
    './main.js',
    './style.css',
    './icon/16.png',
    './icon/32.png',
    './icon/192.png',
    './icon/180.png',
    './icon/512.png'
  ]
};

this.addEventListener('install', (e) => {
  console.info('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(CONFIG.cacheName).then(cache => {
      console.info('[ServiceWorker] Caching static files');
      return cache.addAll(CONFIG.staticFiles);
    })
  );
});


this.addEventListener('activate', e => {
  console.info('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CONFIG.cacheName) {
          console.info('[ServiceWorker] Removing old cache: ', key);
          return caches.delete(key);
        }
      }));
    })
  );
  // runs SW instantly in any existing tab previously from SW activation
  return self.clients.claim();
});

this.addEventListener('fetch', function(e) {
  console.log('[Service Worker] Fetch', e.request.url);
  const isApiRequest = e.request.url.indexOf(CONFIG.apiURL) > -1;

  if (isApiRequest) {
    e.respondWith(
      caches.open(CONFIG.cacheName).then(function(cache) {
        return fetch(e.request).then(function(response){
          console.log('[ServiceWorker] Caching: ', e.request.url, response);
          cache.put(e.request.url, response.clone());
          return response;
        });
      }).catch((err) => {
        console.log('[ServiceWorker] Error: ', err);
      })
    );
  } else {
    e.respondWith(
      caches.match(e.request).then(function(response) {
        return response || fetch(e.request);
      }).catch((err) => {
        console.log('[ServiceWorker] Error: ', err);
      })
    );
  }
});