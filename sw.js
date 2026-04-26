/* PWA Service Worker - Football App */
const CACHE_NAME = "football-app-20260425-v9-football-landing";
const ASSETS = ["/", "/manifest.json", "/pwa-install.js", "/icon-192.png", "/icon-512.png"]; 

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(Promise.all([
    self.clients.claim(),
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
  ]));
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  event.respondWith(caches.match(req).then((cached) => {
    if (cached && !req.url.endsWith("firebase-config.js") && !req.url.endsWith("script.js") && !req.url.endsWith("app.html") && !req.url.endsWith("index.html")) return cached;
    return fetch(req)
      .then((res) => {
        try {
          const url = new URL(req.url);
          if (url.origin === self.location.origin && res && res.status === 200 && res.type === "basic") {
            const copy = res.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
          }
        } catch (e) {}
        return res;
      })
      .catch(() => {
        if (req.mode === "navigate") return caches.match("/app.html") || caches.match("/index.html");
        return cached || caches.match("/app.html");
      });
  }));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const targetUrl = (event.notification && event.notification.data && event.notification.data.url) || "/app";
  event.waitUntil((async () => {
    const allClients = await clients.matchAll({ type: "window", includeUncontrolled: true });
    for (const client of allClients) {
      try {
        const url = new URL(client.url);
        const target = new URL(targetUrl, self.location.origin);
        if (url.origin === target.origin) {
          await client.focus();
          if ("navigate" in client) await client.navigate(target.href);
          return;
        }
      } catch (e) {}
    }
    await clients.openWindow(targetUrl);
  })());
});
