const CACHE_NAME = 'horco-molle-v8'; 

const ASSETS = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './manifest.json',
  './mapa.jpg',

  // IMÁGENES
  './assets/images/caraya_1.jpg',
  './assets/images/caraya_2.jpg',
  './assets/images/caraya_3.jpg',
  './assets/images/zorro gris_1.jpg',
  './assets/images/zorro gris_2.jpg',
  './assets/images/zorro gris_3.jpg',
  './assets/images/tapir_1.jpg',
  './assets/images/tapir_2.jpg',
  './assets/images/tapir_3.jpg',
  './assets/images/pecari_1.jpg',
  './assets/images/pecari_2.jpg',
  './assets/images/pecari_3.jpg',
  './assets/images/corzuela colorada_1.jpg',
  './assets/images/corzuela colorada_2.jpg',
  './assets/images/corzuela colorada_3.jpg',
  './assets/images/mara_1.jpg',
  './assets/images/mara_2.jpg',
  './assets/images/mara_3.jpg',
  './assets/images/suri_1.jpg',
  './assets/images/suri_2.jpg',
  './assets/images/suri_3.jpg',
  './assets/images/tortuga_1.jpg',
  './assets/images/tortuga_2.webp',
  './assets/images/tortuga acuatica_1.jpg',
  './assets/images/tortuga acuatica_2.webp',
  './assets/images/yacare_1.jpg',
  './assets/images/yacare_2.png',
  './assets/images/yacare_3.jpg', 
  './assets/images/guacamayo_1.jpg',
  './assets/images/guacamayo_2.jpg',
  './assets/images/guacamayo_3.jpg',
  './assets/images/yaguarundi_1.jpg',
  './assets/images/yaguarundi_2.jpg',
  './assets/images/yaguarundi_3.jpg',
  './assets/images/corzuela parda_1.jpg',
  './assets/images/corzuela parda_2.webp',
  './assets/images/corzuela parda_3.webp',
  './assets/images/coipo_1.jpg',
  './assets/images/coipo_2.jpg',
  './assets/images/coipo_3.jpg',
  './assets/images/tucan_1.jpg',
  './assets/images/tucan_2.jpg',
  './assets/images/tucan_3.jpg',
  './assets/images/loro_1.jpg',
  './assets/images/loro_2.webp',
  './assets/images/loro_3.webp',
  './assets/images/cata_1.jpg',
  './assets/images/cata_2.webp',
  './assets/images/cata_3.webp',
  './assets/images/tortuga carbonaria_1.jpg',
  './assets/images/tortuga carbonaria_2.jpg',
  './assets/images/tortuga carbonaria_3.jpg',
  './assets/images/mono cai_1.jpeg',
  './assets/images/mono cai_2.jpeg',
  './assets/images/mono cai_3.jpeg',
  './assets/images/puma_1.jpg',
  './assets/images/puma_2.webp',
  './assets/images/puma_3.jpg',
  './assets/images/entrada2_1.jpeg',
  './assets/images/entrada.webp',
  './assets/images/entrada2_2.jpeg',
  './assets/images/entrada1_1.jpeg',
  './assets/images/entrada1_2.webp',
  './assets/images/boleteria_1.jpeg',
  './assets/images/boleteria_2.jpeg',
  './assets/images/baños_1.jpeg',
  './assets/images/baños_2.jpeg',
  './assets/images/baños_3.jpeg',
  './assets/images/baños_4.jpeg',
  './assets/images/guardia_1.jpeg',
  './assets/images/guardia_2.jpeg',
  './assets/images/juegos_1.jpeg',
  './assets/images/juegos_2.jpeg',
  './assets/images/oficina1.jpeg',
  './assets/images/oficina2.jpeg',
  './assets/images/merenderos_1.jpeg',
  './assets/images/merenderos_2.jpeg',
  './assets/images/merenderos_3.jpeg',
  './assets/images/merenderos_4.jpeg',
  './assets/images/merenderos_5.jpeg',
  './assets/images/merenderos_6.jpeg',
  './assets/images/merenderos_7.jpeg',
  './assets/images/reserva_1.png',
  './assets/images/reserva_2.jpeg',
  './assets/images/reserva_3.jpeg',
  './assets/images/logo.jpg',

  // AUDIOS
  './assets/audio/caraya.m4a',
  './assets/audio/zorro gris.m4a',
  './assets/audio/tapir.m4a',
  './assets/audio/pecari.m4a',
  './assets/audio/corzuela colorada.m4a',
  './assets/audio/mara.m4a',
  './assets/audio/suri.m4a',
  './assets/audio/tortuga.m4a',
  './assets/audio/tortuga acuatica.m4a',
  './assets/audio/yacare.m4a', 
  './assets/audio/guacamayo.m4a',
  './assets/audio/yaguarundi.m4a',
  './assets/audio/corzuela parda.m4a',
  './assets/audio/coipo.m4a',
  './assets/audio/tucan.m4a',
  './assets/audio/loro.m4a',
  './assets/audio/cata.m4a',
  './assets/audio/tortuga carbonaria.m4a',
  './assets/audio/mono cai.m4a',
  './assets/audio/puma.m4a',
  './assets/audio/ayuda.m4a',
  './assets/audio/ayuda_en.m4a',
  './assets/audio/caraya_en.m4a',
  './assets/audio/zorro gris_en.m4a',
  './assets/audio/tapir_en.m4a',
  './assets/audio/pecari_en.m4a',
  './assets/audio/corzuela colorada_en.m4a',
  './assets/audio/mara_en.m4a',
  './assets/audio/suri_en.m4a',
  './assets/audio/tortuga_en.m4a',
  './assets/audio/tortuga acuatica_en.m4a',
  './assets/audio/yacare_en.m4a', 
  './assets/audio/guacamayo_en.m4a',
  './assets/audio/yaguarundi_en.m4a',
  './assets/audio/corzuela parda_en.m4a',
  './assets/audio/coipo_en.m4a',
  './assets/audio/tucan_en.m4a',
  './assets/audio/loro_en.m4a',
  './assets/audio/cata_en.m4a',
  './assets/audio/tortuga carbonaria_en.m4a',
  './assets/audio/mono cai_en.m4a',
  './assets/audio/puma_en.m4a',
];

// Instalación: Guarda todo en la memoria interna del teléfono
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Precargando PWA Horco Molle para uso sin conexión...');
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// Activación: Limpia versiones anteriores
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      );
    })
  );
  self.clients.claim();
});

// Intercepción de peticiones (Soporte para audios m4a en móviles)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Manejo de reproducción parcial de audio en iPhone/Android
        if (event.request.headers.get('range')) {
          return returnRangeResponse(cachedResponse, event.request.headers.get('range'));
        }
        return cachedResponse;
      }
      return fetch(event.request);
    })
  );
});

// Función para servir fragmentos de audio desde la memoria sin internet
async function returnRangeResponse(response, rangeHeader) {
  const buf = await response.arrayBuffer();
  const range = rangeHeader.match(/bytes=(\d+)-(\d+)?/);
  const start = parseInt(range[1], 10);
  const end = range[2] ? parseInt(range[2], 10) : buf.byteLength - 1;

  const mimeType = response.headers.get('Content-Type') || 'audio/mp4';

  return new Response(buf.slice(start, end + 1), {
    status: 206,
    statusText: 'Partial Content',
    headers: {
      'Content-Type': mimeType,
      'Content-Range': `bytes ${start}-${end}/${buf.byteLength}`,
      'Content-Length': end - start + 1,
      'Accept-Ranges': 'bytes'
    }
  });
}