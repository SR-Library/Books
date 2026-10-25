const CACHE = 'sajjad-library-v3';
/* الملفات الأساسية فقط — لو أي ملف هنا ناقص ما تفشل بقية الملفات */
const ASSETS = [
  './', './index.html', './styles.css', './app.js', './library.js',
  './manifest.webmanifest', './books/book-02.js', './covers/cover1.jpeg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => Promise.allSettled(ASSETS.map(url => cache.add(url))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

/* الشبكة أولًا (حتى تظهر التحديثات فورًا)، وإذا ما في إنترنت نرجع للنسخة المخزّنة */
self.addEventListener('fetch', event => {
  const { request } = event;
  if (request.method !== 'GET') return;
  const sameOrigin = new URL(request.url).origin === self.location.origin;
  if (!sameOrigin) return;

  event.respondWith(
    fetch(request)
      .then(response => {
        if (response && response.ok) {
          const copy = response.clone();
          caches.open(CACHE).then(cache => cache.put(request, copy));
        }
        return response;
      })
      .catch(() => caches.match(request).then(cached => cached || caches.match('./index.html')))
  );
});
