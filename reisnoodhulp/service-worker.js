const CACHE_NAME = "reisnoodhulp-v7";
const APP_FILES = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon.svg",
  "./assets/app-icons/icon-emergency-192.png",
  "./assets/app-icons/icon-emergency-512.png",
  "./assets/icons/arrow-left.svg",
  "./assets/icons/car-front.svg",
  "./assets/icons/circle-check-big.svg",
  "./assets/icons/credit-card.svg",
  "./assets/icons/globe-2.svg",
  "./assets/icons/house.svg",
  "./assets/icons/id-card.svg",
  "./assets/icons/luggage.svg",
  "./assets/icons/map-pin.svg",
  "./assets/icons/phone-call.svg",
  "./assets/icons/shield-check.svg",
  "./assets/icons/siren.svg",
  "./assets/icons/smartphone.svg",
  "./assets/icons/triangle-alert.svg",
  "./assets/icons/wallet-cards.svg"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_FILES))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;

  const requestUrl = new URL(event.request.url);
  if (requestUrl.origin !== self.location.origin) return;

  event.respondWith(
    fetch(event.request)
      .then(response => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
        }
        return response;
      })
      .catch(() => caches.match(event.request).then(cached => cached || caches.match("./index.html")))
  );
});
