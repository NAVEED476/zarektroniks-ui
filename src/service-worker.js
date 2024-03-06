// service-worker.js

const CACHE_NAME = 'my-pwa-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles/main.css',
  '/scripts/main.js',
  '/src/components/Register.jsx' // Adjusted URL to match your component file name
  // Add more URLs to cache as needed
];
// eslint-disable-next-line no-restricted-globals
// self.addEventListener('install', event => {
//   event.waitUntil(
//     caches.open(CACHE_NAME)
//       .then(cache => cache.addAll(urlsToCache))
//   );
// });
// // eslint-disable-next-line no-restricted-globals
// self.addEventListener('fetch', event => {
//   event.respondWith(
//     caches.match(event.request)
//       .then(response => {
//         // Cache hit - return response
//         if (response) {
//           return response;
//         }

//         // Clone the request since it's a stream and can only be consumed once
//         const fetchRequest = event.request.clone();

//         return fetch(fetchRequest).then(
//           response => {
//             // Check if we received a valid response
//             if (!response || response.status !== 200 || response.type !== 'basic') {
//               return response;
//             }

//             // Clone the response since it's a stream and can only be consumed once
//             const responseToCache = response.clone();

//             caches.open(CACHE_NAME)
//               .then(cache => {
//                 cache.put(event.request, responseToCache);
//               });

//             return response;
//           }
//         );
//       })
//   );
// });
// // eslint-disable-next-line no-restricted-globals
// self.addEventListener('activate', event => {
//   event.waitUntil(
//     caches.keys().then(cacheNames => {
//       return Promise.all(
//         cacheNames.map(cacheName => {
//           if (cacheName !== CACHE_NAME) {
//             return caches.delete(cacheName);
//           }
//         })
//       );
//     })
//   );
// });


// const CACHE_NAME = 'offline';
// const OFFLINE_URL = 'offline.html';


// const isLocalhost = Boolean(
//     window.location.hostname === 'localhost' ||
//       // [::1] is the IPv6 localhost address.
//       window.location.hostname === '[::1]' ||
//       // 127.0.0.0/8 are considered localhost for IPv4.
//       window.location.hostname.match(
//         /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
//       )
//   );
  
  export function register(config) {
    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
      // The URL constructor is available in all browsers that support SW.
      const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
      if (publicUrl.origin !== window.location.origin) {
        // Our service worker won't work if PUBLIC_URL is on a different origin
        // from what our page is served on. This might happen if a CDN is used to
        // serve assets; see https://github.com/facebook/create-react-app/issues/2374
        return;
      }
  // eslint-disable-next-line no-restricted-globals
      self.addEventListener('install', event => {
        event.waitUntil(
          caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
        );
      });
      // eslint-disable-next-line no-restricted-globals
      self.addEventListener('fetch', event => {
        event.respondWith(
          caches.match(event.request)
            .then(response => {
              // Cache hit - return response
              if (response) {
                return response;
              }
      
              // Clone the request since it's a stream and can only be consumed once
              const fetchRequest = event.request.clone();
      
              return fetch(fetchRequest).then(
                response => {
                  // Check if we received a valid response
                  if (!response || response.status !== 200 || response.type !== 'basic') {
                    return response;
                  }
      
                  // Clone the response since it's a stream and can only be consumed once
                  const responseToCache = response.clone();
      
                  caches.open(CACHE_NAME)
                    .then(cache => {
                      cache.put(event.request, responseToCache);
                    });
      
                  return response;
                }
              );
            })
        );
      });
      // eslint-disable-next-line no-restricted-globals
      self.addEventListener('activate', event => {
        event.waitUntil(
          caches.keys().then(cacheNames => {
            return Promise.all(
              cacheNames.map(cacheName => {
                if (cacheName !== CACHE_NAME) {
                  return caches.delete(cacheName);
                }
              })
            );
          })
        );
      });
    }
  }
  
  // function registerValidSW(swUrl, config) {
  //   navigator.serviceWorker
  //     .register(swUrl)
  //     .then(registration => {
  //       registration.onupdatefound = () => {
  //         const installingWorker = registration.installing;
  //         if (installingWorker == null) {
  //           return;
  //         }
  //         installingWorker.onstatechange = () => {
  //           if (installingWorker.state === 'installed') {
  //             if (navigator.serviceWorker.controller) {
  //               // At this point, the updated precached content has been fetched,
  //               // but the previous service worker will still serve the older
  //               // content until all client tabs are closed.
  //               console.log(
  //                 'New content is available and will be used when all '
  //               );
  
  //               // Execute callback
  //               if (config && config.onUpdate) {
  //                 config.onUpdate(registration);
  //               }
  //             } else {
  //               // At this point, everything has been precached.
  //               // It's the perfect time to display a
  //               // "Content is cached for offline use." message.
  //               console.log('Content is cached for offline use.');
  
  //               // Execute callback
  //               if (config && config.onSuccess) {
  //                 config.onSuccess(registration);
  //               }
  //             }
  //           }
  //         };
  //       };
  //     })
  //     .catch(error => {
  //       console.error('Error during service worker registration:', error);
  //     });
  // }
  
  // function checkValidServiceWorker(swUrl, config) {
  //   // Check if the service worker can be found. If it can't reload the page.
  //   fetch(swUrl, {
  //     headers: { 'Service-Worker': 'script' },
  //   })
  //     .then(response => {
  //       // Ensure service worker exists, and that we really are getting a JS file.
  //       const contentType = response.headers.get('content-type');
  //       if (
  //         response.status === 404 ||
  //         (contentType != null && contentType.indexOf('javascript') === -1)
  //       ) {
  //         // No service worker found. Probably a different app. Reload the page.
  //         navigator.serviceWorker.ready.then(registration => {
  //           registration.unregister().then(() => {
  //             window.location.reload();
  //           });
  //         });
  //       } else {
  //         // Service worker found. Proceed as normal.
  //         registerValidSW(swUrl, config);
  //       }
  //     })
  //     .catch(() => {
  //       console.log(
  //         'No internet connection found. App is running in offline mode.'
  //       );

  //       const cache = caches.open(CACHE_NAME);
  //       const cachedResponse = cache.match(OFFLINE_URL);

  //       return cachedResponse;
  //     });
  // }
  
  // export function unregister() {
  //   if ('serviceWorker' in navigator) {
  //     navigator.serviceWorker.ready
  //       .then(registration => {
  //         registration.unregister();
  //       })
  //       .catch(error => {
  //         console.error(error.message);
  //       });
  //   }
  // }