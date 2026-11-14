/* Service worker de Défis photo : l'app fonctionne hors connexion et charge toujours la dernière version quand il y a du réseau. */
const CACHE = "defis-photo-21"; // à changer à chaque version (comme VERSION dans index.html)
const COEUR = ["./", "./manifest.webmanifest", "./icons/icon-192.png", "./icons/icon-512.png", "./icons/apple-touch-icon.png"];

self.addEventListener("install", e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(COEUR.map(u=>new Request(u, {cache:"reload"})))).then(()=>self.skipWaiting()));
});
self.addEventListener("activate", e=>{
  e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(n=>n!==CACHE).map(n=>caches.delete(n)))).then(()=>self.clients.claim()));
});
self.addEventListener("fetch", e=>{
  const req = e.request, url = new URL(req.url);
  if(req.method !== "GET") return;
  // Polices Google : servies depuis le cache, mises à jour en arrière-plan
  if(url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com"){
    e.respondWith(caches.open(CACHE).then(async c=>{
      const enCache = await c.match(req);
      const reseau = fetch(req).then(r=>{ if(r.ok || r.type==="opaque") c.put(req, r.clone()); return r; }).catch(()=>enCache);
      return enCache || reseau;
    }));
    return;
  }
  if(url.origin !== location.origin || url.searchParams.has("maj")) return; // météo, Gemini, vérification de version : réseau direct
  // La page : d'abord le réseau (sans cache HTTP, pour avoir la dernière version), sinon la copie hors connexion
  if(req.mode === "navigate" || url.pathname.endsWith("/index.html")){
    e.respondWith(fetch(req, {cache:"no-cache"}).then(r=>{
      if(r.ok){ const copie = r.clone(); caches.open(CACHE).then(c=>c.put("./", copie)); }
      return r;
    }).catch(()=>caches.match("./")));
    return;
  }
  // Icônes, manifeste : depuis le cache, sinon le réseau
  e.respondWith(caches.match(req).then(r=>r || fetch(req).then(res=>{
    if(res.ok){ const copie = res.clone(); caches.open(CACHE).then(c=>c.put(req, copie)); }
    return res;
  })));
});
