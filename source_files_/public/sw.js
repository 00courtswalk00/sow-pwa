const staticCacheName = 'pwa-statv1'; // Storing a string in a constant, with the cache names.
const dynCache = 'pwa-dynv1'; // The dynamic cache - assets that are stored upon interaction with them.
const resources = [ // An array with strings that reference the core resources (requests) necessary to build up the app shell, stored in a variable.
    '/', // A single request url   
    '/index.html', 
    '/pages/offlinepage.html',
    '/pwa.js',
    '/java/interface.js', 
    '/css/main.css', 
    '/images/sow.png', 
    '/images/demo/demo1.png', 
    '/images/demo/demo2.png', 
    '/images/demo/demo3.png', 
    'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css', 
    'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js', 
    'https://fonts.gstatic.com/s/materialicons/v50/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2'
]; // Storing all 13 request url's as static.
// Limiting cache size function. 
const cacheSize = (name, size) => { // This function is going to take in 2 arguments; name and size. 
    caches.open(name).then(cache => { // Opening cache that has been passed in, and then returns the cache that has been opened. 
        cache.keys().then(keys => { // Then gets the keys (resources) from the open cache.
            if (keys.length > size) { // Checks if the array is over the size (established in the fetch event). 
                cache.delete(keys[0]).then(cacheSize(name, size)); // Deletes the first item in the keys array from the cache. Then recalls the cacheSize function to check if they keys.length is still over the size (15).  
            }
        });
    });
};
// Installing ServiceWorker. Souce: https://developers.google.com/web/ilt/pwa/caching-files-with-service-worker
//Here, core assets are being cached during the installation of the service worker. 
self.addEventListener('install', evt => {
    console.log('Serice Worker: Installed');
    evt.waitUntil( // Method waits until the promise (caching of resources)is resolved, before install event is finished. 
        caches.open(staticCacheName).then(cache => { // Accessing the cache API and opening the cache (this is an asyncronous task so may take time). A callback function is then fired once the promise is resolved.  
            console.log('caching shell resources');
            cache.addAll(resources); // Passing the array of resources/requests to the cache.
        }).then(() => self.skipWaiting()) 
    );
});
// Listening for ServiceWorker activation.
self.addEventListener('activate', evt => {
    console.log('Service Worker: Activated');
    // Removing unwanted caches. Source: https://developer.mozilla.org/en-US/docs/Web/API/Cache
    evt.waitUntil( // Extending the life of the activate event, so promise can resolve.
        caches.keys().then(keys => { // Returning an array of keys (cache names).
            console.log(keys);
            return Promise.all(keys // Takes an array of promises and once they're all reolved, the 'Promise.all' resolves. 
                .filter(key => key !== staticCacheName && key !== dynCache) // If key doesn't match the name, the statement returns true and stays in the array.
                .map(key => caches.delete(key)) // Mapping through the array and deletes old cache.
            )
        }));
});
//Fetch Event. Source:https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage
self.addEventListener('fetch', evt => {
    console.log('fetch event', evt);
    evt.respondWith( // Pauses fetch event and reponds with custom event, in the form of a resource from the cache.
        caches.match(evt.request).then(cacheResponse => { // Checks if there's a matching resource in the cache, to the request.
            return cacheResponse || fetch(evt.request).then(fetchResponse => { // Returns the cache response or returns the inital fetch request that was made. 
                return caches.open(dynCache).then(cache => { // Opens the cache & takes what is returned and caches it the dynamic cache. 
                    cache.put(evt.request.url, fetchResponse.clone()); // The event object and request url are being put in the new cache. A clone of the response is then made and put inside the cache. 
                    cacheSize(dynCache, 15); // Eveytime something is put in the cache, this checks to see if the cache is over 15, if so will delete the oldest resource in the cache limiting function.   
                    return fetchResponse; // Returning the original response to the application.
                })
            });
        }).catch(() => { // In the scenario the user attempts to visit a page offline that they never visited online, a fallback page is returned. Error is caught.
            if (evt.request.url.includes('.html') > -1) { // If the .html is not in the string, it'll return -1. 
                return caches.match('/pages/offlinepage.html'); // if .html is in the url & greater than -1, returns the fallback page. 
            }
        }));
});

