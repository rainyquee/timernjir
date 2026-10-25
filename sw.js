const C='timer-v3',F=['./','manifest.webmanifest','icon-192.png','icon-512.png'];
async function clean(r){if(!r.redirected)return r;const b=await r.blob();return new Response(b,{status:r.status,statusText:r.statusText,headers:r.headers})}
self.addEventListener('install',e=>{e.waitUntil((async()=>{const c=await caches.open(C);
 for(const u of F){try{const r=await fetch(u,{cache:'reload'});if(r.ok)await c.put(u,await clean(r))}catch(_){}}})());self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener('fetch',e=>{const q=e.request;if(q.method!=='GET')return;
 if(q.mode==='navigate'){e.respondWith((async()=>{const c=await caches.open(C),hit=await c.match('./');
  e.waitUntil(fetch('./',{cache:'reload'}).then(async r=>{if(r.ok)await c.put('./',await clean(r))}).catch(()=>{}));
  return hit||fetch(q)})());return}
 e.respondWith(caches.match(q).then(r=>r||fetch(q)))});
self.addEventListener('notificationclick',e=>{e.notification.close();e.waitUntil(clients.matchAll({type:'window'}).then(l=>l.length?l[0].focus():clients.openWindow('./')))});
