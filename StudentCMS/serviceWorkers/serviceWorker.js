const staticCacheVersion = "s-app-v21";

const assetsFiles = [
  "index.html",
  "mainPageStyle.css",
  "studentsStyle.css",
  "studFormStyle.css",
  "studDelStyle.css",
  "errorMsgStyle.css",
  "mainPageScript.js",
  "studentsScript.js",
  "paginationScript.js",
  "pictures/MessageProfile.jpg",
  "pictures/ProfilePicture.jpg",
];

self.addEventListener("install", async (event) => {
  const cache = await caches.open(staticCacheVersion);
  cache.addAll(assetsFiles);
});

self.addEventListener("activate", async (event) => {
  const cacheVersions = await caches.keys();
  await Promise.all(
    cacheVersions
      .filter((version) => version != staticCacheVersion)
      .map((version) => caches.delete(version))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(networkFirst(event.request));
});

async function cacheFirst(request) {
  const cachedData = await caches.match(request);
  return cachedData ?? fetch(request);
}

async function networkFirst(request) {
  const networkData = fetch(request);
  return networkData ?? chaces.match(request);
}
