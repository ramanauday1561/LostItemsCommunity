// Service Worker for caching images and static assets with optimized cache lifetimes
const CACHE_NAME = 'lost-items-community-v2';
const IMAGE_CACHE_NAME = 'lost-items-images-v2';
const STATIC_CACHE_NAME = 'lost-items-static-v2';

// Cache expiration times (in milliseconds)
const CACHE_EXPIRATION = {
  images: 7 * 24 * 60 * 60 * 1000, // 7 days for images
  static: 24 * 60 * 60 * 1000, // 1 day for static assets
  default: 60 * 60 * 1000 // 1 hour for other resources
};

// Static assets to precache
const STATIC_ASSETS = [
  './images/Background2.webp',
  './images/HomePage1.webp',
];

// Install event - precache critical assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && 
              cacheName !== IMAGE_CACHE_NAME && 
              cacheName !== STATIC_CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Helper function to check if cache is expired
function isCacheExpired(cachedResponse, maxAge) {
  if (!cachedResponse) return true;
  
  const cachedDate = cachedResponse.headers.get('sw-cache-date');
  if (!cachedDate) return false; // If no date, treat as valid
  
  const age = Date.now() - new Date(cachedDate).getTime();
  return age > maxAge;
}

// Helper function to create response with cache date
function createCachedResponse(response) {
  const headers = new Headers(response.headers);
  headers.set('sw-cache-date', new Date().toISOString());
  headers.set('Cache-Control', 'public, max-age=604800'); // 7 days
  
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: headers
  });
}

// Fetch event - serve from cache with expiration checks
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Handle image requests with cache-first strategy and expiration
  if (request.destination === 'image' || url.pathname.includes('/images/') || 
      url.pathname.endsWith('.webp') || url.pathname.endsWith('.png') || 
      url.pathname.endsWith('.jpg') || url.pathname.endsWith('.jpeg')) {
    event.respondWith(
      caches.open(IMAGE_CACHE_NAME).then((cache) => {
        return cache.match(request).then((cachedResponse) => {
          // Check if cache is expired
          if (cachedResponse && !isCacheExpired(cachedResponse, CACHE_EXPIRATION.images)) {
            return cachedResponse;
          }

          // Fetch from network and cache with date
          return fetch(request).then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const responseToCache = createCachedResponse(networkResponse.clone());
              cache.put(request, responseToCache);
            }
            return networkResponse;
          }).catch(() => {
            // Return cached version even if expired when offline
            if (cachedResponse) return cachedResponse;
            return new Response('Image not available offline', {
              status: 503,
              statusText: 'Service Unavailable'
            });
          });
        });
      })
    );
    return;
  }

  // Handle static asset requests (CSS, JS)
  if (url.pathname.endsWith('.css') || url.pathname.endsWith('.js')) {
    event.respondWith(
      caches.open(STATIC_CACHE_NAME).then((cache) => {
        return cache.match(request).then((cachedResponse) => {
          // Use cache if not expired
          if (cachedResponse && !isCacheExpired(cachedResponse, CACHE_EXPIRATION.static)) {
            return cachedResponse;
          }

          // Network first for static assets
          return fetch(request).then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const responseToCache = createCachedResponse(networkResponse.clone());
              cache.put(request, responseToCache);
            }
            return networkResponse;
          }).catch(() => {
            if (cachedResponse) return cachedResponse;
            return new Response('Resource not available', { status: 503 });
          });
        });
      })
    );
    return;
  }

  // Handle other requests with network-first strategy
  event.respondWith(
    fetch(request)
      .then((response) => {
        // Cache successful responses with default expiration
        if (response && response.status === 200) {
          const responseClone = createCachedResponse(response.clone());
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        // Try to serve from cache if network fails
        return caches.match(request);
      })
  );
});
