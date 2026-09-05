// Configuración de la ruta de audios en inglés
const AUDIO_BASE_PATH = 'assets/audio/en/';

// --- SISTEMA DE IDIOMA ---
let currentLang = 'es'; // Idioma por inicialización

const textosUI = {
  es: {
    sub1: "Circuito Autoguiado - Toca cada número para explorar",
    sub2: "Servicios - Toca cada servicio para explorar",
    ubicacionBtn: "📍 Mi Ubicación",
    buscandoGPS: "Buscando señal GPS...",
    gpsActivo: "📍 GPS Activo (Desactivar)",
    errorGPS: "📍 Error / Activar GPS",
    activarUbi: "📍 Activar Ubicación",
    etiquetaRecinto: "Recinto",
    etiquetaServicio: "Servicio",
    btnLangText: "🇬🇧 English",
    ayudaBtn: "❓ Ayuda"
  },
  en: {
    sub1: "Self-Guided Tour - Tap each number to explore",
    sub2: "Services - Tap each service to explore",
    ubicacionBtn: "📍 My Location",
    buscandoGPS: "Searching for GPS signal...",
    gpsActivo: "📍 GPS Active (Disable)",
    errorGPS: "📍 Error / Enable GPS",
    activarUbi: "📍 Enable Location",
    etiquetaRecinto: "Enclosure",
    etiquetaServicio: "Service",
    btnLangText: "🇪🇸 Español",
    ayudaBtn: "❓ Help"
  }
};

// --- GEOLOCALIZACIÓN EN VIVO ---
const controlPoints = [
  { lat: -26.7939554, lng: -65.3179425, top: 18.0, left: 40.0 },
  { lat: -26.7921860, lng: -65.3173973, top: 25.0, left: 98.0 },
  { lat: -26.7945575, lng: -65.3154289, top: 61.0, left: 9.0 },
  { lat: -26.7933245, lng: -65.3150893, top: 65.0, left: 58.0 }
];

const locateBtn = document.getElementById('locate-btn');
const userMarker = document.getElementById('user-marker');
const langToggleBtn = document.getElementById('lang-toggle-btn');
const txtSub1 = document.getElementById('txt-sub1');
const txtSub2 = document.getElementById('txt-sub2');

let watchId = null;
let isTracking = false;
let ultimoElementoAbierto = null;

if (locateBtn) {
  locateBtn.addEventListener('click', () => {
    if (!navigator.geolocation) {
      alert(currentLang === 'es' ? "Tu navegador no soporta geolocalización." : "Your browser does not support geolocation.");
      return;
    }

    if (!isTracking) {
      locateBtn.textContent = textosUI[currentLang].buscandoGPS;
      locateBtn.style.backgroundColor = "#ff9800";

      const options = { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 };

      watchId = navigator.geolocation.watchPosition(
        (position) => {
          isTracking = true;
          locateBtn.textContent = textosUI[currentLang].gpsActivo;
          locateBtn.style.backgroundColor = "#2e7d32";

          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;
          const coords = affineTransform(userLat, userLng, controlPoints);

          userMarker.classList.remove('hidden');
          userMarker.style.top = `${coords.top}%`;
          userMarker.style.left = `${coords.left}%`;
        },
        (error) => {
          console.warn("Error de GPS: ", error.message);
          locateBtn.textContent = textosUI[currentLang].errorGPS;
          locateBtn.style.backgroundColor = "";
          alert(currentLang === 'es' ? "No se pudo obtener tu ubicación. Asegúrate de otorgar permisos de GPS." : "Could not get your location. Make sure to grant GPS permissions.");
          isTracking = false;
        },
        options
      );
    } else {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
        watchId = null;
      }
      isTracking = false;
      locateBtn.textContent = textosUI[currentLang].activarUbi;
      locateBtn.style.backgroundColor = "";
      userMarker.classList.add('hidden');
    }
  });
}

function affineTransform(lat, lng, pts) {
  let pC = pts[0], pD = pts[1], pB = pts[2], pA = pts[3];
  let dC = Math.hypot(lat - pC.lat, lng - pC.lng);
  let dD = Math.hypot(lat - pD.lat, lng - pD.lng);
  let dB = Math.hypot(lat - pB.lat, lng - pB.lng);
  let dA = Math.hypot(lat - pA.lat, lng - pA.lng);

  let wC = 1 / (dC || 0.00001);
  let wD = 1 / (dD || 0.00001);
  let wB = 1 / (dB || 0.00001);
  let wA = 1 / (dA || 0.00001);

  let totalW = wC + wD + wB + wA;
  let finalTop = (pC.top * wC + pD.top * wD + pB.top * wB + pA.top * wA) / totalW;
  let finalLeft = (pC.left * wC + pD.left * wD + pB.left * wB + pA.left * wA) / totalW;

  return { top: finalTop, left: finalLeft };
}

// --- BASE DE DATOS DE RECINTOS Y SERVICIOS ---
const recintosData = {
  1: {
    titulo: { es: "Mono Carayá", en: "Black Howler Monkey" },
    animales: [
      {
        nombre: { es: "Mono Carayá (Alouatta caraya)", en: "Black Howler Monkey (Alouatta caraya)" },
        descripcion: { 
          es: "Conocido por sus potentes aullidos que se escuchan a kilómetros. Es de hábitos arborícolas y se alimenta principalmente de hojas y frutos.",
          en: "Known for its powerful howls that can be heard for miles. It has arboreal habits and feeds mainly on leaves and fruits."
        },
        imagenes: [
          "assets/images/caraya_1.jpg",
          "assets/images/caraya_2.jpg", 
          "assets/images/caraya_3.jpg"
        ],
        audioBase: "caraya"
      }
    ]
  },
  2: {
    titulo: { es: "Mono Carayá", en: "Black Howler Monkey" },
    animales: [
      {
        nombre: { es: "Mono Carayá", en: "Black Howler Monkey" },
        descripcion: { 
          es: "Segundo recinto destinado a la conservación y rehabilitación de ejemplares de Mono Carayá.",
          en: "Second enclosure dedicated to the conservation and rehabilitation of Black Howler Monkeys."
        },
        imagenes: [
          "assets/images/caraya_1.jpg",
          "assets/images/caraya_2.jpg", 
          "assets/images/caraya_3.jpg"
        ],
        audioBase: "caraya"
      }
    ]
  },
  3: {
    titulo: { es: "Zorro Gris", en: "South American Grey Fox" },
    animales: [
      {
        nombre: { es: "Zorro Gris Pampeano (Lycalopex gymnocercus)", en: "Pampean Grey Fox (Lycalopex gymnocercus)" },
        descripcion: { 
          es: "Cánido autóctono de cuerpo ágil y pelaje grisáceo. Posee un rol clave en el control de roedores en los ecosistemas.",
          en: "Native canid with an agile body and greyish coat. It plays a key role in rodent control within ecosystems."
        },
        imagenes: [
          "assets/images/zorro gris_1.jpg",
          "assets/images/zorro gris_2.jpg", 
          "assets/images/zorro gris_3.jpg"
        ],
        audioBase: "zorro gris"
      }
    ]
  },
  4: {
    titulo: { es: "Tapires y Pecarí de Collar", en: "Tapirs and Collared Peccary" },
    animales: [
      {
        nombre: { es: "Tapir (Tapirus terrestris)", en: "Tapir (Tapirus terrestris)" },
        descripcion: { 
          es: "El mamífero terrestre más grande de Sudamérica. Excelente nadador y dispersor de semillas.",
          en: "The largest terrestrial mammal in South America. An excellent swimmer and seed disperser."
        },
        imagenes: [
          "assets/images/tapir_1.jpg",
          "assets/images/tapir_2.jpg", 
          "assets/images/tapir_3.jpg"
        ],
        audioBase: "tapir"
      },
      {
        nombre: { es: "Pecarí de Collar (Pecari tajacu)", en: "Collared Peccary (Pecari tajacu)" },
        descripcion: { 
          es: "Mamífero parecido al jabalí pero más pequeño, habita en grupos y posee una mancha blanca distintiva en el cuello.",
          en: "A mammal similar to a wild boar but smaller, living in groups with a distinctive white collar on its neck."
        },
        imagenes: [
          "assets/images/pecari_1.jpg",
          "assets/images/pecari_2.jpg", 
          "assets/images/pecari_3.jpg"
        ],
        audioBase: "pecari"
      }
    ]
  },
  5: {
    titulo: { es: "Fauna de Yungas y Chaco", en: "Yungas and Chaco Fauna" },
    animales: [
      {
        nombre: { es: "Corzuela Colorada", en: "Red Brocket Deer" },
        descripcion: { 
          es: "Pequeño ciervo autóctono de pelaje rojizo y hábitos solitarios.",
          en: "Small native deer with reddish fur and solitary habits."
        },
        imagenes: [
          "assets/images/corzuela colorada_1.jpg",
          "assets/images/corzuela colorada_2.jpg", 
          "assets/images/corzuela colorada_3.jpg"
        ],
        audioBase: "corzuela colorada"
      },
      {
        nombre: { es: "Mara Patagónica", en: "Patagonian Mara" },
        descripcion: { 
          es: "Uno de los roedores más grandes del mundo, caracterizado por sus patas largas adaptadas a la carrera.",
          en: "One of the largest rodents in the world, characterized by long legs adapted for running."
        },
        imagenes: [
          "assets/images/mara_1.jpg",
          "assets/images/mara_2.jpg", 
          "assets/images/mara_3.jpg"
        ],
        audioBase: "mara"
      },
      {
        nombre: { es: "Suri (Ñandú)", en: "Lesser Rhea (Suri)" },
        descripcion: { 
          es: "Ave no voladora de gran tamaño adaptada a las llanuras y pastizales.",
          en: "Large flightless bird adapted to plains and grasslands."
        },
        imagenes: [
          "assets/images/suri_1.jpg",
          "assets/images/suri_2.jpg", 
          "assets/images/suri_3.jpg"
        ],
        audioBase: "suri"
      }
    ]
  },
  6: {
    titulo: { es: "Tortugas Terrestres", en: "Land Tortoises" },
    animales: [
      {
        nombre: { es: "Tortuga Terrestre", en: "Chaco Tortoise" },
        descripcion: { 
          es: "Reptiles de caparazón abombado y desplazamiento lento, amantes de los frutos y hojas verdes.",
          en: "Reptiles with a domed shell and slow movement, fond of fruits and green leaves."
        },
        imagenes: [
          "assets/images/tortuga_1.jpg",
          "assets/images/tortuga_2.webp"
        ],
        audioBase: "tortuga"
      }
    ]
  },
  7: {
    titulo: { es: "Yacaré y Tortugas Acuáticas", en: "Caiman and Aquatic Turtles" },
    animales: [
      {
        nombre: { es: "Yacaré Overo (Caiman latirostris)", en: "Broad-snouted Caiman (Caiman latirostris)" },
        descripcion: { 
          es: "Reptil acuático adaptado a ríos y lagunas. Desempeña un rol vital en el equilibrio acuático.",
          en: "Aquatic reptile adapted to rivers and lagoons. It plays a vital role in aquatic balance."
        },
        imagenes: [
          "assets/images/yacare_1.jpg",
          "assets/images/yacare_2.png", 
          "assets/images/yacare_3.jpg"
        ],
        audioBase: "yacare"
      },
      {
        nombre: { es: "Tortuga Acuática", en: "Aquatic Turtle" },
        descripcion: { 
          es: "Especie adaptada a la vida en ambientes acuáticos de la región.",
          en: "Species adapted to living in the region's aquatic environments."
        },
        imagenes: [
          "assets/images/tortuga acuatica_1.jpg",
          "assets/images/tortuga acuatica_2.webp"
        ],
        audioBase: "tortuga acuatica"
      }
    ]
  },
  8: {
    titulo: { es: "Guacamayos", en: "Macaws" },
    animales: [
      {
        nombre: { es: "Guacamayo", en: "Macaw" },
        descripcion: { 
          es: "Aves de vistosos colores y gran inteligencia. Parte indispensable de programas de conservación y reintroducción.",
          en: "Brightly colored, highly intelligent birds. An essential part of conservation and reintroduction programs."
        },
        imagenes: [
          "assets/images/guacamayo_1.jpg",
          "assets/images/guacamayo_2.jpg", 
          "assets/images/guacamayo_3.jpg"
        ],
        audioBase: "guacamayo"
      }
    ]
  },
  9: {
    titulo: { es: "Yaguarundí", en: "Jaguarundi" },
    animales: [
      {
        nombre: { es: "Yaguarundí (Herpailurus yagouaroundi)", en: "Jaguarundi (Herpailurus yagouaroundi)" },
        descripcion: { 
          es: "Felino silvestre de cuerpo alargado y orejas pequeñas. Es de hábitos diurnos y excelente cazador.",
          en: "Wild feline with an elongated body and small ears. It has diurnal habits and is an excellent hunter."
        },
        imagenes: [
          "assets/images/yaguarundi_1.jpg",
          "assets/images/yaguarundi_2.jpg", 
          "assets/images/yaguarundi_3.jpg"
        ],
        audioBase: "yaguarundi"
      }
    ]
  },
  10: {
    titulo: { es: "Corzuela Parda y Coipo", en: "Brown Brocket Deer and Coypu" },
    animales: [
      {
        nombre: { es: "Corzuela Parda", en: "Brown Brocket Deer" },
        descripcion: { 
          es: "Ciervo silvestre adaptado a zonas de vegetación densa.",
          en: "Wild deer adapted to areas of dense vegetation."
        },
        imagenes: [
          "assets/images/corzuela parda_1.jpg",
          "assets/images/corzuela parda_2.webp", 
          "assets/images/corzuela parda_3.webp"
        ],
        audioBase: "corzuela parda"
      },
      {
        nombre: { es: "Coipo (Myocastor coypus)", en: "Coypu / Nutria (Myocastor coypus)" },
        descripcion: { 
          es: "Roedor semiacuático que habita en ríos y lagunas.",
          en: "Semiaquatic rodent that inhabits rivers and lagoons."
        },
        imagenes: [
          "assets/images/coipo_1.jpg",
          "assets/images/coipo_2.jpg", 
          "assets/images/coipo_3.jpg"
        ],
        audioBase: "coipo"
      }
    ]
  },
  11: {
    titulo: { es: "Aves: Tucán, Loro y Cata", en: "Birds: Toucan, Parrot and Monk Parakeet" },
    animales: [
      {
        nombre: { es: "Tucán", en: "Toucan" },
        descripcion: { 
          es: "Imponente ave de pico naranja brillante. Crucial para la siembra natural de árboles en la selva.",
          en: "Imposing bird with a bright orange beak. Crucial for the natural planting of trees in the jungle."
        },
        imagenes: [
          "assets/images/tucan_1.jpg",
          "assets/images/tucan_2.jpg", 
          "assets/images/tucan_3.jpg"
        ],
        audioBase: "tucan"
      },
      {
        nombre: { es: "Loro", en: "Parrot" },
        descripcion: { 
          es: "Los loros son aves inteligentes y coloridas que destacan por su fuerte pico y su capacidad para imitar sonidos.",
          en: "Parrots are intelligent and colorful birds noted for their strong beak and ability to mimic sounds."
        },
        imagenes: [
          "assets/images/loro_1.jpg",
          "assets/images/loro_2.webp", 
          "assets/images/loro_3.webp"
        ],
        audioBase: "loro"
      },
      {
        nombre: { es: "Cata", en: "Monk Parakeet" },
        descripcion: { 
          es: "La cata, también conocida como cotorra argentina, es una pequeña especie de ave conocida por su plumaje colorido y su gran inteligencia.",
          en: "Also known as the Argentine parakeet, it is a small bird species known for its colorful plumage and high intelligence."
        },
        imagenes: [
          "assets/images/cata_1.jpg",
          "assets/images/cata_2.webp", 
          "assets/images/cata_3.webp"
        ],
        audioBase: "cata"
      }
    ]
  },
  12: {
    titulo: { es: "Tortuga Carbonaria", en: "Red-footed Tortoise" },
    animales: [
      {
        nombre: { es: "Tortuga de patas rojas (Chelonoidis carbonarius)", en: "Red-footed Tortoise (Chelonoidis carbonarius)" },
        descripcion: { 
          es: "Especie de tortuga de tierra caracterizada por las manchas rojas o amarillas en sus patas y cabeza.",
          en: "Land tortoise species characterized by red or yellow spots on its legs and head."
        },
        imagenes: [
          "assets/images/tortuga carbonaria_1.jpg",
          "assets/images/tortuga carbonaria_2.jpg", 
          "assets/images/tortuga carbonaria_3.jpg"
        ],
        audioBase: "tortuga carbonaria"
      }
    ]
  },
  13: {
    titulo: { es: "Recinto en Mantenimiento", en: "Enclosure Under Maintenance" },
    animales: [
      {
        nombre: { es: "Zona en descanso", en: "Resting Zone" },
        descripcion: { 
          es: "Este recinto se encuentra temporalmente sin animales o en acondicionamiento.",
          en: "This enclosure is temporarily without animals or undergoing conditioning."
        },
        imagenes: [],
        audioBase: ""
      }
    ]
  },
  14: {
    titulo: { es: "Mono Caí", en: "Tufted Capuchin" },
    animales: [
      {
        nombre: { es: "Mono Caí (Sapajus cay)", en: "Tufted Capuchin (Sapajus cay)" },
        descripcion: { 
          es: "Primate muy inquieto e inteligente. Posee una cola prensil que utiliza como quinta extremidad.",
          en: "Very restless and intelligent primate. It has a prehensile tail used as a fifth limb."
        },
        imagenes: [
          "assets/images/mono cai_1.jpg",
          "assets/images/mono cai_2.jpg", 
          "assets/images/mono cai_3.jpg"
        ],
        audioBase: "mono cai"
      },
      {
        nombre: { es: "Pecarí de Collar (Pecari tajacu)", en: "Collared Peccary (Pecari tajacu)" },
        descripcion: { 
          es: "Mamífero parecido al jabalí pero más pequeño, habita en grupos.",
          en: "A mammal similar to a wild boar but smaller, living in groups."
        },
        imagenes: [
          "assets/images/pecari_1.jpg",
          "assets/images/pecari_2.jpg", 
          "assets/images/pecari_3.jpg"
        ],
        audioBase: "pecari"
      }
    ]
  },
  15: {
    titulo: { es: "Puma", en: "Puma" },
    animales: [
      {
        nombre: { es: "Puma (Puma concolor)", en: "Puma (Puma concolor)" },
        descripcion: { 
          es: "El superdepredador de la región. Posee una fuerza y agilidad extraordinarias.",
          en: "The apex predator of the region. It possesses extraordinary strength and agility."
        },
        imagenes: [
          "assets/images/puma_1.jpg",
          "assets/images/puma_2.webp", 
          "assets/images/puma_3.jpg"
        ],
        audioBase: "puma"
      }
    ]
  }
};

const serviciosData = {
  boleteria: { 
    titulo: { es: "Boletería", en: "Ticket Office" }, 
    imagenes: ["assets/images/boleteria_1.jpeg", "assets/images/boleteria_2.jpeg"], 
    descripcion: { es: "Punto de venta de entradas y asesoramiento general para el recorrido por la reserva.", en: "Ticket sales point and general advice for touring the reserve." } 
  },
  entrada: { 
    titulo: { es: "Entrada y Salida", en: "Entrance and Exit" }, 
    imagenes: ["assets/images/entrada.webp"], 
    descripcion: { es: "Entrada y Salida principal.", en: "Main Entrance and Exit." } 
  },
  entrada1: { 
    titulo: { es: "Entrada y Salida ISLAS", en: "ISLANDS Entrance and Exit" }, 
    imagenes: ["assets/images/entrada1_1.jpeg", "assets/images/entrada1_2.webp"], 
    descripcion: { es: "Entrada y Salida de circuito autoguiado.", en: "Self-guided circuit entrance and exit." },
    audioBase: "normas" 
  },
  entrada2: { 
    titulo: { es: "Entrada y Salida AVES", en: "BIRDS Entrance and Exit" }, 
    imagenes: ["assets/images/entrada2_1.jpeg", "assets/images/entrada2_2.jpeg"], 
    descripcion: { es: "Entrada y Salida de circuito autoguiado.", en: "Self-guided circuit entrance and exit." },
    audioBase: "normas" 
  },
  guardia: { 
    titulo: { es: "Control y Guardia", en: "Security and Guard" }, 
    imagenes: ["assets/images/guardia_1.jpeg", "assets/images/guardia_2.jpeg"], 
    descripcion: { es: "Puesto de seguridad y asistencia general para visitantes.", en: "Security and general assistance post for visitors." } 
  },
  banos: { 
    titulo: { es: "Baños Accesibles", en: "Accessible Restrooms" }, 
    imagenes: ["assets/images/baños_1.jpeg", "assets/images/baños_2.jpeg", "assets/images/baños_3.jpeg", "assets/images/baños_4.jpeg"], 
    descripcion: { es: "Instalaciones sanitarias adaptadas y provistas de rampas y barras de apoyo.", en: "Restroom facilities adapted and provided with ramps and grab bars." } 
  },
  admin1: { 
    titulo: { es: "Administración", en: "Administration" }, 
    imagenes: ["assets/images/oficina1.jpeg"], 
    descripcion: { es: "Oficinas administrativas y de gestión de la reserva.", en: "Administrative and management offices of the reserve." } 
  },
  admin2: { 
    titulo: { es: "Administración", en: "Administration" }, 
    imagenes: ["assets/images/oficina2.jpeg"], 
    descripcion: { es: "Oficinas administrativas y de gestión de la reserva.", en: "Administrative and management offices of the reserve." } 
  },
  reserva: { 
    titulo: { es: "Reserva Horco Molle", en: "Horco Molle Reserve" }, 
    imagenes: ["assets/images/reserva_1.png", "assets/images/reserva_2.jpeg", "assets/images/reserva_3.jpeg"], 
    descripcion: { es: "Área con cartel y esculturas.", en: "Area with sign and sculptures." } 
  },
  juegos: { 
    titulo: { es: "Área de Juegos", en: "Playground Area" }, 
    imagenes: ["assets/images/juegos_1.webp", "assets/images/juegos_2.jpeg"], 
    descripcion: { es: "Espacio recreativo y de descanso equipado con juegos infantiles.", en: "Recreational and resting space equipped with children's playground equipment." } 
  },
  merendero1: { 
    titulo: { es: "Merendero", en: "Picnic Area" }, 
    imagenes: ["assets/images/merenderos_1.jpeg", "assets/images/merenderos_2.jpeg", "assets/images/merenderos_3.jpeg"], 
    descripcion: { es: "Zona de descanso provista de mesas y bancos para almorzar o merendar al aire libre con parrilla.", en: "Resting area provided with tables and benches for outdoor dining with grills." } 
  },
  merendero2: { 
    titulo: { es: "Merendero", en: "Picnic Area" }, 
    imagenes: ["assets/images/merenderos_4.jpeg", "assets/images/merenderos_5.jpeg", "assets/images/merenderos_6.jpeg"], 
    descripcion: { es: "Zona de descanso provista de mesas y bancos para almorzar o merendar al aire libre con parrilla.", en: "Resting area provided with tables and benches for outdoor dining with grills." } 
  },
  merendero3: { 
    titulo: { es: "Merendero", en: "Picnic Area" }, 
    imagenes: ["assets/images/merenderos_7.jpeg"], 
    descripcion: { es: "Zona de descanso provista de mesas y bancos para almorzar o merendar al aire libre con parrilla.", en: "Resting area provided with tables and benches for outdoor dining with grills." } 
  }
};

const modal = document.getElementById('modal');
const closeBtn = document.getElementById('close-btn');
const modalTitle = document.getElementById('modal-title');
const modalRecintoNum = document.getElementById('modal-recinto-num');
const animalesContainer = document.getElementById('animales-container');

document.querySelectorAll('.hotspot-btn, .map-area-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const numRecinto = e.target.getAttribute('data-recinto');
    const serviceKey = e.target.getAttribute('data-service');

    if (numRecinto) {
      ultimoElementoAbierto = { tipo: 'recinto', id: numRecinto };
      abrirRecinto(numRecinto);
    } else if (serviceKey) {
      ultimoElementoAbierto = { tipo: 'servicio', key: serviceKey };
      abrirServicio(serviceKey);
    }
  });
});

function getAudioSrc(audioBase) {
  if (!audioBase) return '';
  return currentLang === 'en' ? `${AUDIO_BASE_PATH}${audioBase}_en.m4a` : `assets/audio/${audioBase}.m4a`;
}

// --- VISOR DE IMAGEN AMPLIADA (LIGHTBOX) CON GALERÍA ---
const imageModal = document.getElementById('image-modal');
const imgZoomed = document.getElementById('img-zoomed');
const closeZoomBtn = imageModal ? imageModal.querySelector('.close-zoom') : null;

let galeriaActual = [];
let indiceActual = 0;

let prevBtn = document.getElementById('prev-img-btn');
let nextBtn = document.getElementById('next-img-btn');

if (imageModal && !prevBtn) {
  prevBtn = document.createElement('button');
  prevBtn.id = 'prev-img-btn';
  prevBtn.innerHTML = '❮';
  prevBtn.style.cssText = 'position:absolute; left:5%; top:50%; transform:translateY(-50%); font-size:30px; background:rgba(0,0,0,0.6); color:white; border:none; cursor:pointer; padding:15px; border-radius:50%; z-index:1000; width:60px; height:60px; display:flex; align-items:center; justify-content:center;';
  imageModal.appendChild(prevBtn);
  
  nextBtn = document.createElement('button');
  nextBtn.id = 'next-img-btn';
  nextBtn.innerHTML = '❯';
  nextBtn.style.cssText = 'position:absolute; right:5%; top:50%; transform:translateY(-50%); font-size:30px; background:rgba(0,0,0,0.6); color:white; border:none; cursor:pointer; padding:15px; border-radius:50%; z-index:1000; width:60px; height:60px; display:flex; align-items:center; justify-content:center;';
  imageModal.appendChild(nextBtn);

  prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    cambiarImagen(-1);
  });
  nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    cambiarImagen(1);
  });
}

function cambiarImagen(direccion) {
  if (galeriaActual.length === 0) return;
  indiceActual += direccion;
  
  if (indiceActual < 0) indiceActual = galeriaActual.length - 1;
  if (indiceActual >= galeriaActual.length) indiceActual = 0;
  
  imgZoomed.src = galeriaActual[indiceActual];
}

animalesContainer.addEventListener('click', (e) => {
  if (e.target.tagName === 'IMG' && e.target.classList.contains('animal-img')) {
    const galeriaData = e.target.getAttribute('data-galeria');
    
    if (galeriaData) {
      galeriaActual = JSON.parse(decodeURIComponent(galeriaData));
    } else if (e.target.src) {
      galeriaActual = [e.target.src];
    }

    if (galeriaActual.length > 0) {
      indiceActual = 0;
      imgZoomed.src = galeriaActual[indiceActual];
      
      if (galeriaActual.length > 1) {
        prevBtn.style.display = 'flex';
        nextBtn.style.display = 'flex';
      } else {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
      }

      imageModal.classList.add('active');
    }
  }
});

if (closeZoomBtn) {
  closeZoomBtn.addEventListener('click', () => {
    imageModal.classList.remove('active');
  });
}
if (imageModal) {
  imageModal.addEventListener('click', (e) => {
    if (e.target === imageModal) {
      imageModal.classList.remove('active');
    }
  });
}

function abrirRecinto(id) {
  const data = recintosData[id];
  if (!data) return;

  modalRecintoNum.textContent = `${textosUI[currentLang].etiquetaRecinto} #${id}`;
  modalTitle.textContent = data.titulo[currentLang];
  animalesContainer.innerHTML = '';

  data.animales.forEach(animal => {
    const card = document.createElement('div');
    card.className = 'animal-card';

    let imgsArray = animal.imagenes || (animal.imagen ? [animal.imagen] : []);
    let galeriaData = encodeURIComponent(JSON.stringify(imgsArray));
    
    let imgHTML = imgsArray.length > 0 
      ? `<img src="${imgsArray[0]}" alt="${animal.nombre[currentLang]}" class="animal-img" data-galeria="${galeriaData}">` 
      : '';
    
    let contenidoAudioPersona = '';
    if (animal.persona) {
      const rolTexto = typeof animal.persona.rol === 'object' ? animal.persona.rol[currentLang] : animal.persona.rol;
      const personaAudioSrc = getAudioSrc(animal.persona.audioBase);
      contenidoAudioPersona = `
        <div class="persona-container" style="display: flex; align-items: center; margin-top: 12px; padding-top: 10px; border-top: 1px solid #eee;">
          <img src="${animal.persona.foto}" alt="${animal.persona.nombre}" class="animal-img persona-img" style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover; margin-right: 12px;">
          <div>
            <h4 style="margin: 0; font-size: 0.95rem; color: #2e7d32;">${animal.persona.nombre}</h4>
            <p style="margin: 2px 0 6px 0; font-size: 0.8rem; color: #666;">${rolTexto}</p>
            <audio class="animal-audio" controls src="${personaAudioSrc}"></audio>
          </div>
        </div>
      `;
    } else {
      const animalAudioSrc = getAudioSrc(animal.audioBase);
      contenidoAudioPersona = animalAudioSrc ? `<audio class="animal-audio" controls src="${animalAudioSrc}"></audio>` : '';
    }

    card.innerHTML = `
      <h3>${animal.nombre[currentLang]}</h3>
      ${imgHTML}
      <p style="font-size:0.9rem; color:#444; margin-top:6px;">${animal.descripcion[currentLang]}</p>
      ${contenidoAudioPersona}
    `;

    animalesContainer.appendChild(card);
  });

  modal.classList.remove('hidden');

  const primerAudio = animalesContainer.querySelector('audio');
  if (primerAudio) {
    primerAudio.play().catch(() => {});
  }
}

function abrirServicio(key) {
  const data = serviciosData[key];
  if (!data) return;

  modalRecintoNum.textContent = textosUI[currentLang].etiquetaServicio;
  modalTitle.textContent = data.titulo[currentLang];
  animalesContainer.innerHTML = '';

  const card = document.createElement('div');
  card.className = 'animal-card';

  let imgsArray = data.imagenes || (data.imagen ? [data.imagen] : []);
  let galeriaData = encodeURIComponent(JSON.stringify(imgsArray));
  
  let imgHTML = imgsArray.length > 0 
    ? `<img src="${imgsArray[0]}" alt="${data.titulo[currentLang]}" class="animal-img" data-galeria="${galeriaData}">` 
    : '';

  // 🔊 Generar el reproductor de audio si el servicio tiene audioBase definido
  let contenidoAudioServicio = '';
  if (data.audioBase) {
    const audioSrc = getAudioSrc(data.audioBase);
    contenidoAudioServicio = `<audio class="animal-audio" controls src="${audioSrc}" style="width: 100%; margin-top: 12px;"></audio>`;
  }

  card.innerHTML = `
    ${imgHTML}
    <p style="font-size: 1rem; color: #333; line-height: 1.5; margin-top: 10px;">${data.descripcion[currentLang]}</p>
    ${contenidoAudioServicio}
  `;

  animalesContainer.appendChild(card);
  modal.classList.remove('hidden');

  // 🔊 Reproducir automáticamente el audio si existe
  const primerAudio = animalesContainer.querySelector('audio');
  if (primerAudio) {
    primerAudio.play().catch(() => {});
  }
}

closeBtn.addEventListener('click', cerrarModal);

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    cerrarModal();
  }
});

function cerrarModal() {
  modal.classList.add('hidden');
  ultimoElementoAbierto = null;
  document.querySelectorAll('audio').forEach(audio => {
    audio.pause();
    audio.currentTime = 0;
  });
}

// --- BOTÓN DE CAMBIO DE IDIOMA ---
if (langToggleBtn) {
  langToggleBtn.addEventListener('click', () => {
    currentLang = currentLang === 'es' ? 'en' : 'es';
    
    const mapImg = document.getElementById('map-img');
    if (mapImg) {
      mapImg.src = currentLang === 'en' ? 'mapa_en.jpg' : 'mapa.jpg';
    }

    langToggleBtn.textContent = textosUI[currentLang].btnLangText;
    if (txtSub1) txtSub1.textContent = textosUI[currentLang].sub1;
    if (txtSub2) txtSub2.textContent = textosUI[currentLang].sub2;

    const helpBtnElement = document.getElementById('help-btn');
    if (helpBtnElement) {
      helpBtnElement.textContent = textosUI[currentLang].ayudaBtn;
    }

    if (!isTracking) {
      locateBtn.textContent = textosUI[currentLang].activarUbi;
    }

    if (!modal.classList.contains('hidden') && ultimoElementoAbierto) {
      if (ultimoElementoAbierto.tipo === 'recinto') {
        abrirRecinto(ultimoElementoAbierto.id);
      } else if (ultimoElementoAbierto.tipo === 'servicio') {
        abrirServicio(ultimoElementoAbierto.key);
      }
    }
  });
}

document.addEventListener('play', (e) => {
  if (e.target.tagName === 'AUDIO') {
    document.querySelectorAll('audio').forEach(audio => {
      if (audio !== e.target) {
        audio.pause();
        audio.currentTime = 0;
      }
    });
  }
}, true);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js')
      .then(reg => console.log('PWA Service Worker listo:', reg.scope))
      .catch(err => console.error('Error cargando SW:', err));
  });
}

// --- GUÍA DE USO (AYUDA) CON AUDIO ---
const ayudaTextos = {
  es: {
    titulo: "📖 Guía de uso del mapa",
    audio: "assets/audio/ayuda.m4a",
    contenido: `
      <p style="margin-bottom: 10px;">¡Bienvenido a nuestra reserva! Para aprovechar al máximo tu recorrido, te invitamos a conocer las funciones de este mapa interactivo:</p>
      <ul style="padding-left: 20px; text-align: left;">
        <li><b>Explora los recintos:</b> Toca cualquiera de los números sobre el mapa para ver la información, descripciones y escuchar audios de cada animal.</li>
        <li><b>Descubre los servicios:</b> Toca las áreas marcadas (baños, boleterías, merenderos) para ver su ubicación exacta.</li>
        <li><b>Amplía las imágenes:</b> Toca cualquier fotografía dentro de las tarjetas para abrirla en pantalla completa (zoom) y deslizar entre varias fotos.</li>
        <li><b>Ubícate en tiempo real:</b> Presiona <b>"Mi Ubicación"</b> para activar tu posición GPS en vivo mientras te desplazas.</li>
        <li><b>Cambia de idioma:</b> Usa el botón superior para alternar entre Español e Inglés al instante.</li>
      </ul>
    `
  },
  en: {
    titulo: "📖 Interactive Map Guide",
    audio: `${AUDIO_BASE_PATH}ayuda_en.m4a`,
    contenido: `
      <p style="margin-bottom: 10px;">Welcome to our reserve! To make the most of your visit, here is how to use this interactive map:</p>
      <ul style="padding-left: 20px; text-align: left;">
        <li><b>Explore enclosures:</b> Tap any numbered button on the map to view animal details, descriptions, and audio guides.</li>
        <li><b>Find services:</b> Tap designated service areas (restrooms, ticket office, picnic spots) for details.</li>
        <li><b>Zoom in on images:</b> Tap any photo inside the cards to open it in full screen and swipe through multiple photos.</li>
        <li><b>Track your location:</b> Press <b>"My Location"</b> to turn on live GPS tracking as you explore.</li>
        <li><b>Switch languages:</b> Use the top language button to toggle between Spanish and English instantly.</li>
      </ul>
    `
  }
};

const helpModal = document.getElementById('help-modal');
const helpBody = document.getElementById('help-body');
const helpTitle = document.getElementById('help-title');
const helpBtn = document.getElementById('help-btn');
const closeHelpBtn = document.getElementById('close-help-btn');
const helpAudio = document.getElementById('help-audio');

function actualizarContenidoAyuda() {
  if (helpTitle && helpBody) {
    helpTitle.textContent = ayudaTextos[currentLang].titulo;
    helpBody.innerHTML = ayudaTextos[currentLang].contenido;
    if (helpAudio) {
      helpAudio.src = ayudaTextos[currentLang].audio;
    }
  }
}

if (helpBtn) {
  helpBtn.addEventListener('click', () => {
    actualizarContenidoAyuda();
    if (helpModal) {
      helpModal.classList.remove('hidden');
      if (helpAudio) {
        helpAudio.play().catch(() => {});
      }
    }
  });
}

if (closeHelpBtn) {
  closeHelpBtn.addEventListener('click', () => {
    if (helpModal) helpModal.classList.add('hidden');
    if (helpAudio) {
      helpAudio.pause();
      helpAudio.currentTime = 0;
    }
  });
}

if (helpModal) {
  helpModal.addEventListener('click', (e) => {
    if (e.target === helpModal) {
      helpModal.classList.add('hidden');
      if (helpAudio) {
        helpAudio.pause();
        helpAudio.currentTime = 0;
      }
    }
  });
}