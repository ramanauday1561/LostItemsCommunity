// Service Worker for caching images and static assets with optimized cache lifetimes
const CACHE_NAME = 'lost-items-community-v3';
const IMAGE_CACHE_NAME = 'lost-items-images-v3';
const STATIC_CACHE_NAME = 'lost-items-static-v3';

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
function createCachedResponse(response, maxAge) {
  const clonedResponse = response.clone();
  const headers = new Headers(clonedResponse.headers);
  headers.set('sw-cache-date', new Date().toISOString());
  headers.set('Cache-Control', `public, max-age=${maxAge}`);
  
  return clonedResponse.blob().then(blob => {
    return new Response(blob, {
      status: clonedResponse.status,
      statusText: clonedResponse.statusText,
      headers: headers
    });
  });
}

// Stale-while-revalidate strategy
function staleWhileRevalidate(request, cacheName, maxAge) {
  return caches.open(cacheName).then((cache) => {
    return cache.match(request).then((cachedResponse) => {
      const fetchPromise = fetch(request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          return createCachedResponse(networkResponse, Math.floor(maxAge / 1000)).then(responseToCache => {
            cache.put(request, responseToCache);
            return networkResponse;
          });
        }
        return networkResponse;
      }).catch(() => {
        // Network fetch failed - will use cached response if available
        return null;
      });

      // Return cached response immediately if available, fetch in background
      if (cachedResponse) {
        // If cache is expired, still return it but fetch fresh in background
        if (isCacheExpired(cachedResponse, maxAge)) {
          fetchPromise.catch(() => {}); // Trigger background fetch, ignore errors
        }
        return cachedResponse;
      }
      
      // No cache, wait for network
      return fetchPromise.then(response => {
        if (response) {
          return response;
        }
        return new Response('Resource not available', { status: 503 });
      });
    });
  });
}

// Fetch event - serve from cache with expiration checks
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Handle image requests with stale-while-revalidate strategy
  if (request.destination === 'image' || url.pathname.includes('/images/') || 
      url.pathname.endsWith('.webp') || url.pathname.endsWith('.png') || 
      url.pathname.endsWith('.jpg') || url.pathname.endsWith('.jpeg')) {
    event.respondWith(staleWhileRevalidate(request, IMAGE_CACHE_NAME, CACHE_EXPIRATION.images));
    return;
  }

  // Handle static asset requests (CSS, JS) with stale-while-revalidate
  if (url.pathname.endsWith('.css') || url.pathname.endsWith('.js')) {
    event.respondWith(staleWhileRevalidate(request, STATIC_CACHE_NAME, CACHE_EXPIRATION.static));
    return;
  }

  // Handle other requests with network-first strategy
  event.respondWith(
    fetch(request)
      .then((response) => {
        // Cache successful responses with default expiration
        if (response && response.status === 200) {
          createCachedResponse(response, Math.floor(CACHE_EXPIRATION.default / 1000)).then(responseClone => {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
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
