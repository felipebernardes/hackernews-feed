const CONFIG = {
  cacheName: 'hackernews-feed',
  apiURL: 'hacker-news.firebaseio.com',
  staticFiles: [
    './',
    './manifest.json',
    './index.html',
    './main.js',
    './style.css',
    './icon/favicon.ico',
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
    caches.open(CONFIG.cacheName).then((cache) => {
      console.info('[ServiceWorker] Caching static files');
      return cache.addAll(CONFIG.staticFiles);
    })
  );
});

this.addEventListener('activate', (e) => {
  console.info('[ServiceWorker] Activate');

  e.waitUntil(
    // eslint-disable-next-line array-callback-return,consistent-return
    caches.keys().then((keyList) => Promise.all(keyList.map((key) => {
      if (key !== CONFIG.cacheName) {
        console.info('[ServiceWorker] Removing old cache: ', key);
        return caches.delete(key);
      }
    })))
  );

  // runs SW instantly in any existing tab previously from SW activation
  // eslint-disable-next-line no-restricted-globals
  return self.clients.claim();
});


self.addEventListener('fetch', function(e) {
  console.log('[Service Worker] Fetch', e.request.url);
  const isApiRequest = e.request.url.indexOf(CONFIG.apiURL) > -1;

  if (isApiRequest) {
    // get network response, cache and return it
    e.respondWith(
      caches.open(CONFIG.cacheName).then(function(cache) {
        return fetch(e.request).then(function(response){
          cache.put(e.request.url, response.clone());
          return response;
        });
      })
    );
  } else {
    // deliver from cache, if not available, request it
    e.respondWith(
      caches.match(e.request).then(function(response) {
        return response || fetch(e.request);
      })
    );
  }
});