// Validación del código de invitación
document.addEventListener("DOMContentLoaded", async () => {
    // 1. Obtener el parámetro 'c0d3' de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const inviteCode = urlParams.get("c0d3");
    const invitedData = {}

    // 2. Si no hay código en la URL, redirigir a la página callback
    if (!inviteCode) {
        console.error('Sin codigo de invitación')
        window.location.href = "callback.html";
        return;
    }

    // 3. Validar el código con el API externo
    try {
        const response = await fetch(`https://hook.us2.make.com/1bs3fr8ptb8uku2aw6rcdfnrdvudbewe?code=${inviteCode}`, {
            method: "GET", // o POST según tu API
            headers: { "Content-Type": "application/json" }
        });

        const data = await response.json();
        console.log(data)

        if (!response.ok || !data.row) {
            // Si el código no es válido, redirigir al callback (o mostrar Not Found)
            window.location.href = "callback.html";
            return;
        }

        Object.assign(invitedData, data)

        // 4. Si es válido, personalizamos la invitación con los datos del invitado
        // document.getElementById("nombre-invitado").textContent = data.name;

    } catch (error) {
        console.error("Error al validar el código:", error);
        window.location.href = "callback.html";
    }

    // Manejo de la confirmación de asistencia (RSVP)
    const rsvpForm = document.getElementById("rsvp-button");
    if (rsvpForm) {
        rsvpForm.addEventListener("click", async (e) => {
            e.preventDefault();
            try {
              const response = await fetch(`https://hook.us2.make.com/bauh3ixu02mj9locvgzfz1ruauosdp7o?code=${inviteCode}&row=${invitedData.row}&accept=true`, {
                  method: "GET", // o POST según tu API
                  headers: { "Content-Type": "application/json" }
              });

              const data = await response.json();
              console.log(data)
            } catch (error) {
              console.error("Error al confirmar asistencia:", error);
            }
            // Lógica para enviar asistencia con fetch/axios y luego...
            // Redirigir opcionalmente al formulario:
            // window.location.href = `formulario.html?code=${inviteCode}`;
        });
    }
});

// Número de WhatsApp para recibir confirmaciones (código de país + número, sin "+").
// Si se deja vacío, el botón muestra un mensaje de agradecimiento.
const RSVP_WHATSAPP = '';
const RSVP_MESSAGE = '¡Hola! Confirmo mi asistencia a la carrera de cumpleaños de Alejandro el domingo 22 de noviembre a las 3:00 PM. 🏁';
const DESKTOP_MAPS_URL = 'https://maps.app.goo.gl/tpK1xGdTqgEz1wPb7';

document.documentElement.classList.add('js');
const animate = typeof anime === 'function';
const calm = matchMedia('(prefers-reduced-motion: reduce)').matches; // menos autos y destellos
const lite = matchMedia('(max-width: 768px), (pointer: coarse)').matches; // móviles: menos partículas a la vez
if (lite) document.documentElement.classList.add('lite');
const rand = (min, max) => Math.random() * (max - min) + min;
const pick = list => list[Math.floor(Math.random() * list.length)];
const RACE = ['#ff2d2d', '#ffd400', '#ffffff', '#111111'];
const CAR_COLORS = ['#ff2d2d', '#ffd400', '#2f8cff', '#2ee86b', '#ff8a00', '#b15cff'];
const PARTY = ['#ff4d5e', '#ff8c42', '#ffd23f', '#2fbf4a', '#2f8cff', '#8b5cf6', '#ff5fa2', '#19c3c3'];
const NAME_COLORS = ['#ff2d2d', '#ffd400', '#2f8cff', '#ffffff', '#ff8a00', '#2ee86b'];

/* ---------- Piezas SVG ---------- */
const sideCar = (color, number) => `
  <svg viewBox="0 0 140 64">
    <path d="M4 24h20v6h-7v9h-4v-9H4z" fill="#111"/>
    <path d="M10 46c0-10 8-15 20-16l5-1c6-16 18-14 32-14h15c0 0 12 10 20 13l19 3c8 2 12 8 12 14v3H10z" fill="${color}" stroke="#111" stroke-width="3" stroke-linejoin="round"/>
    <path d="M60 29c1-7 12-10 17-10h8l4 10z" fill="#bfe8ff" stroke="#111" stroke-width="2.5"/>
    <circle cx="75" cy="23" r="4.5" fill="#fff" stroke="#111" stroke-width="2.5"/>
    <path d="M75 20h6a3 3 0 0 1 0 5h-6z" fill="#2f8cff"/>
    <rect x="12" y="40" width="122" height="3.5" fill="#fff" opacity=".7"/>
    <circle cx="55" cy="38" r="8.5" fill="#fff" stroke="#111" stroke-width="2"/>
    <text x="55" y="42.5" text-anchor="middle" font-family="Lilita One, sans-serif" font-size="12" fill="#111">${number}</text>
    <g class="wheel"><circle cx="34" cy="50" r="12" fill="#1b1b1b" stroke="#111" stroke-width="2"/><circle cx="34" cy="50" r="5.5" fill="#d6d9e2"/><path d="M34 41v18M25 50h18" stroke="#d6d9e2" stroke-width="2.5"/></g>
    <g class="wheel"><circle cx="112" cy="50" r="12" fill="#1b1b1b" stroke="#111" stroke-width="2"/><circle cx="112" cy="50" r="5.5" fill="#d6d9e2"/><path d="M112 41v18M103 50h18" stroke="#d6d9e2" stroke-width="2.5"/></g>
  </svg>`;

const checkeredFlag = (size = 6) => {
  let squares = '';
  for (let r = 0; r < 4; r++) for (let c = 0; c < 6; c++) if ((r + c) % 2 === 0)
    squares += `<rect x="${8 + c * size}" y="${4 + r * size}" width="${size}" height="${size}" fill="#111"/>`;
  return `<svg viewBox="0 0 ${12 + size * 6} 64">
    <rect x="3" y="2" width="4" height="60" rx="2" fill="#c9ced9" stroke="#111" stroke-width="1.5"/>
    <g class="cloth"><rect x="8" y="4" width="${size * 6}" height="${size * 4}" fill="#fff" stroke="#111" stroke-width="1.5"/>${squares}</g>
  </svg>`;
};

const tireStack = `
  <svg viewBox="0 0 120 80">
    ${[[30, 62, '#ff2d2d'], [90, 62, '#fff'], [60, 62, '#111'], [45, 34, '#fff'], [75, 34, '#ff2d2d'], [60, 8, '#111']].map(([x, y, c]) =>
      `<ellipse cx="${x}" cy="${y}" rx="17" ry="13" fill="${c}" stroke="#111" stroke-width="3"/><ellipse cx="${x}" cy="${y - 2}" rx="7" ry="4" fill="#2c3142"/>`).join('')}
  </svg>`;

/* ---------- Escenografía ---------- */
let buntingWidth = 0;
function buildBunting() {
  const W = Math.max(Math.round(innerWidth), 320), H = 130;
  if (W === buntingWidth) return;
  buntingWidth = W;
  const colors = ['#ff2d2d', '#ffd400', '#2f8cff', '#ffffff', '#2ee86b', '#ff8a00'];
  let svg = '';
  [[10, 46, 34], [-30, 82, 26]].forEach(([offset, sag, size], row) => {
    const spans = Math.max(2, Math.round(W / 420));
    const span = W / spans;
    for (let s = 0; s < spans; s++) {
      const x0 = s * span + offset * row, x1 = x0 + span, y0 = row ? 26 : 2;
      svg += `<path d="M${x0} ${y0}Q${x0 + span / 2} ${y0 + sag * 2} ${x1} ${y0}" fill="none" stroke="#c9ced9" stroke-width="2"/>`;
      const count = Math.floor(span / (size + 6));
      for (let i = 1; i < count; i++) {
        const t = i / count, x = x0 + span * t;
        const y = (1 - t) * (1 - t) * y0 + 2 * (1 - t) * t * (y0 + sag * 2) + t * t * y0;
        svg += `<path class="pennant" d="M${(x - size / 2).toFixed(1)} ${y.toFixed(1)}h${size}l${-size / 2} ${size * 1.25}z" fill="${colors[(i + s + row) % colors.length]}" stroke="#111" stroke-width="2" stroke-linejoin="round"/>`;
      }
    }
  });
  const bunting = document.querySelector('.bunting');
  bunting.querySelector('svg')?.remove();
  bunting.insertAdjacentHTML('beforeend', `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMin meet">${svg}</svg>`);
}

function buildScenery() {
  buildBunting();
  const finish = document.querySelector('.finish');
  finish.insertAdjacentHTML('beforeend', `<div class="tires left">${tireStack}</div><div class="tires right">${tireStack}</div>`);
  document.querySelector('.flags').innerHTML =
    `<div class="flag-left"><div class="mirror">${checkeredFlag(9)}</div></div><div class="flag-right">${checkeredFlag(9)}</div>`;
}
buildScenery();

/* ---------- Nombre con letras de colores ---------- */
const nameEl = document.getElementById('name');
nameEl.innerHTML = [...nameEl.textContent].map((ch, i) =>
  `<span class="ch" aria-hidden="true" style="--c:${NAME_COLORS[i % NAME_COLORS.length]};--i:${i}">${ch}</span>`).join('');

/* ---------- Parallax ligado al scroll ---------- */
const bunting = document.querySelector('.bunting');
const finish = document.querySelector('.finish');
const track = document.querySelector('.track');
const roadLine = document.querySelector('.road-line');
const kerbStripes = document.querySelectorAll('.kerb .stripes i');
const kerbChecks = document.querySelectorAll('.kerb .checks i');
let ticking = false, maxScroll = 1;
const measureScroll = () => { maxScroll = document.documentElement.scrollHeight - innerHeight; };
measureScroll();
addEventListener('load', () => { measureScroll(); requestParallax(); });

function updateParallax() {
  ticking = false;
  const max = maxScroll;
  const p = max > 0 ? Math.min(Math.max(scrollY / max, 0), 1) : 0;
  // Los banderines se van hacia arriba, la pista avanza como si manejáramos y la línea de meta aparece al final.
  bunting.style.transform = `translate3d(0, ${(-Math.min(scrollY * .9, bunting.offsetHeight + 30)).toFixed(1)}px, 0)`;
  track.style.transform = `translate3d(0, ${(-p * 50).toFixed(2)}vh, 0)`;
  roadLine.style.strokeDashoffset = (scrollY * 1.2).toFixed(1);
  const stripeShift = ((scrollY * 1.6) % 44).toFixed(1), checkShift = (-(scrollY * .6) % 12).toFixed(1);
  kerbStripes.forEach(k => { k.style.transform = `translate3d(0, ${stripeShift}px, 0)`; });
  kerbChecks.forEach(k => { k.style.transform = `translate3d(0, ${checkShift}px, 0)`; });
  finish.style.transform = `translate3d(0, ${((1 - Math.pow(p, 1.6)) * 62).toFixed(2)}%, 0)`;
  document.body.style.setProperty('--p', p.toFixed(3));
}
const requestParallax = () => { if (!ticking) { ticking = true; requestAnimationFrame(updateParallax); } };
updateParallax();

/* ---------- Autos y destellos que cruzan la pantalla, globos que suben ---------- */
const runnerLayer = document.querySelector('.runners');
const sparkLayer = document.querySelector('.sparks');
let runnerCount = 0, lineCount = 0, sparkCount = 0, balloonCount = 0;

function spawnRunner(opts = {}) {
  if (!animate || runnerCount > (calm ? 3 : lite ? 4 : 8)) return;
  runnerCount++;
  const rtl = opts.rtl ?? Math.random() < .5;
  const width = opts.width ?? rand(70, 120);
  const el = document.createElement('div');
  el.className = `runner${rtl ? ' rtl' : ''}`;
  el.style.width = width + 'px';
  el.style.top = (opts.top ?? rand(18, 82)) + 'vh';
  el.innerHTML = `<div class="flip">${sideCar(pick(CAR_COLORS), Math.ceil(rand(0, 9)))}</div>`;
  runnerLayer.appendChild(el);
  const from = rtl ? innerWidth + 40 : -width * 2.4;
  const to = rtl ? -width * 2.4 : innerWidth + 40;
  anime({
    targets: el,
    translateX: [from, to],
    translateY: [{ value: -3, duration: 120 }, { value: 0, duration: 120 }],
    duration: opts.duration ?? rand(2200, 3800) * (calm ? 1.6 : 1),
    easing: 'easeInOutQuad',
    complete: () => { el.remove(); runnerCount--; }
  });
}

function spawnBalloon() {
  if (!animate || balloonCount > (calm ? 5 : lite ? 7 : 12)) return;
  balloonCount++;
  const el = document.createElement('div');
  const c = pick(PARTY);
  el.className = 'balloon';
  el.style.width = rand(40, 66) + 'px';
  el.style.left = rand(2, 92) + 'vw';
  el.innerHTML = `<svg viewBox="0 0 60 130"><path d="M30 2c18 0 28 16 28 32 0 22-16 38-28 42C18 72 2 56 2 34 2 18 12 2 30 2z" fill="${c}"/><ellipse cx="19" cy="22" rx="6" ry="11" fill="#fff" opacity=".45" transform="rotate(-20 19 22)"/><path d="M25 76h10l-5 7z" fill="${c}"/><path d="M30 83c-7 12 6 22-2 45" stroke="#c9ced9" stroke-width="1.6" fill="none"/></svg>`;
  runnerLayer.appendChild(el);
  const duration = rand(8000, 13000);
  const drift = rand(-60, 60);
  anime({
    targets: el,
    translateY: [0, -(innerHeight + 320)],
    translateX: [
      { value: drift, duration: duration / 2, easing: 'easeInOutSine' },
      { value: -drift * .5, duration: duration / 2, easing: 'easeInOutSine' }
    ],
    rotate: [{ value: rand(-8, 8), duration: duration / 2 }, { value: rand(-8, 8), duration: duration / 2 }],
    duration,
    easing: 'linear',
    complete: () => { el.remove(); balloonCount--; }
  });
}

function spawnSpeedLine() {
  if (!animate || calm || lineCount > (lite ? 5 : 14)) return;
  lineCount++;
  const el = document.createElement('div');
  const w = rand(80, 220);
  el.className = 'speed-line';
  el.style.width = w + 'px';
  el.style.top = rand(10, 90) + 'vh';
  el.style.setProperty('--c', pick(['#ffffff', '#ffd400', '#2f8cff', '#ff2d2d']));
  sparkLayer.appendChild(el);
  const rtl = Math.random() < .5;
  anime({
    targets: el,
    translateX: rtl ? [innerWidth, -w] : [-w, innerWidth],
    scaleX: rtl ? [-1, -1] : [1, 1],
    opacity: [{ value: [0, .8], duration: 120 }, { value: 0, duration: 200, delay: 300 }],
    duration: rand(500, 800),
    easing: 'easeInQuad',
    complete: () => { el.remove(); lineCount--; }
  });
}

function spawnSpark() {
  if (!animate || sparkCount > (calm ? 4 : lite ? 6 : 12)) return;
  sparkCount++;
  const el = document.createElement('div');
  el.className = 'spark';
  el.style.left = rand(4, 94) + 'vw';
  el.style.top = rand(15, 85) + 'vh';
  el.style.setProperty('--c', pick(['#ffd400', '#ffffff', '#ff2d2d']));
  sparkLayer.appendChild(el);
  anime({
    targets: el,
    scale: [{ value: [0, rand(.8, 1.6)], duration: 350, easing: 'easeOutBack' }, { value: 0, duration: 400, delay: 200, easing: 'easeInQuad' }],
    rotate: [0, 180],
    duration: 950,
    easing: 'linear',
    complete: () => { el.remove(); sparkCount--; }
  });
}

let rippling = false;
function rippleBunting() {
  if (!animate || calm || lite || rippling) return;
  rippling = true;
  anime({
    targets: '.bunting .pennant',
    rotate: [{ value: () => rand(-14, 14), duration: 220 }, { value: 0, duration: 600 }],
    easing: 'easeOutSine',
    delay: anime.stagger(12),
    complete: () => { rippling = false; }
  });
}

let lastY = scrollY, carTravel = 0, lineTravel = 0, sparkTravel = 0, balloonTravel = 0;
addEventListener('scroll', () => {
  requestParallax();
  const delta = Math.abs(scrollY - lastY);
  lastY = scrollY;
  carTravel += delta; lineTravel += delta; sparkTravel += delta; balloonTravel += delta;
  if (delta > 4) rippleBunting();
  const lineStep = lite ? 110 : 45;
  while (lineTravel > lineStep) { lineTravel -= lineStep; spawnSpeedLine(); }
  while (sparkTravel > 110) { sparkTravel -= 110; spawnSpark(); }
  while (carTravel > 200) { carTravel -= 200; spawnRunner(); }
  while (balloonTravel > 180) { balloonTravel -= 180; spawnBalloon(); }
}, { passive: true });

addEventListener('resize', () => { buildBunting(); measureScroll(); requestParallax(); });

if (animate) {
  setInterval(() => { if (!document.hidden) spawnRunner(); }, calm ? 5500 : 2600);
  setInterval(() => { if (!document.hidden) spawnSpark(); }, calm ? 3000 : 1300);
  setInterval(() => { if (!document.hidden) spawnSpeedLine(); }, 900);
  setInterval(() => { if (!document.hidden) spawnBalloon(); }, calm ? 5000 : 2400);
  for (let i = 0; i < 5; i++) setTimeout(spawnBalloon, i * 450);
}

/* ---------- Confeti de colores alrededor del 2 ---------- */
const confettiBox = document.getElementById('confetti');
let confettiAnims = [];
function buildConfetti() {
  confettiAnims.forEach(a => a.pause());
  confettiAnims = [];
  const shapes = ['rect', 'rect', 'dot', 'tri', 'star'];
  const R = confettiBox.offsetWidth / 2;
  const count = lite ? 24 : 42;
  confettiBox.innerHTML = '';
  for (let i = 0; i < count; i++) {
    const piece = document.createElement('i');
    piece.className = pick(shapes);
    piece.style.setProperty('--c', PARTY[i % PARTY.length]);
    confettiBox.appendChild(piece);
    const base = (i / count) * Math.PI * 2;
    const point = offset => {
      const a = base + offset, r = R * rand(.58, 1);
      return { x: Math.cos(a) * r, y: Math.sin(a) * r };
    };
    const pts = [point(0), point(rand(.3, .7)), point(rand(.8, 1.3)), point(rand(1.4, 1.9))];
    if (!animate) { piece.style.transform = `translate(${pts[0].x}px, ${pts[0].y}px)`; continue; }
    const leg = rand(1400, 2300) * (calm ? 1.8 : 1);
    confettiAnims.push(anime({
      targets: piece,
      translateX: pts.map(p => ({ value: p.x, duration: leg })),
      translateY: pts.map(p => ({ value: p.y, duration: leg })),
      rotate: { value: rand(360, 900) * (Math.random() < .5 ? -1 : 1), duration: leg * 4, easing: 'linear' },
      scale: [{ value: rand(.7, 1.4), duration: leg * 2 }, { value: rand(.6, 1.2), duration: leg * 2 }],
      opacity: [{ value: [0, 1], duration: 600 }],
      easing: 'easeInOutSine',
      direction: 'alternate',
      loop: true,
      delay: i * 25
    }));
  }
}
buildConfetti();
let confettiWidth = innerWidth;
addEventListener('resize', () => {
  if (Math.abs(innerWidth - confettiWidth) < 40) return;
  confettiWidth = innerWidth;
  clearTimeout(buildConfetti.t);
  buildConfetti.t = setTimeout(buildConfetti, 250);
});

/* ---------- Las animaciones de la portada se pausan fuera de pantalla ---------- */
const heroAnims = [];
let heroVisible = true;
if ('IntersectionObserver' in window) {
  new IntersectionObserver(([entry]) => {
    heroVisible = entry.isIntersecting;
    document.documentElement.classList.toggle('hero-off', !heroVisible);
    [...confettiAnims, ...heroAnims].forEach(a => heroVisible ? a.play() : a.pause());
  }).observe(document.querySelector('.hero'));
}

/* ---------- Semáforo de salida ---------- */
const lamps = [...document.querySelectorAll('.lamp')];
const goText = document.querySelector('.go');
const wait = ms => new Promise(r => setTimeout(r, ms));
async function lightSequence() {
  lamps.forEach(l => l.classList.remove('on'));
  goText.style.opacity = 0;
  for (const lamp of lamps) {
    await wait(550);
    lamps.forEach(l => l.classList.remove('on'));
    lamp.classList.add('on');
    if (animate) anime({ targets: lamp, scale: [1.3, 1], duration: 500, easing: 'easeOutElastic(1, .5)' });
  }
  if (animate) anime({ targets: goText, opacity: [0, 1], scale: [.4, 1], duration: 700, easing: 'easeOutElastic(1, .5)' });
  else goText.style.opacity = 1;
}
async function lightLoop() {
  while (true) {
    await wait(5500);
    if (!document.hidden && heroVisible) await lightSequence();
  }
}

/* ---------- Entrada animada: ¡semáforo y arranque! ---------- */
(async () => {
  if (!animate) {
    lamps[2].classList.add('on');
    goText.style.opacity = 1;
    nameEl.classList.add('idle');
    return;
  }
  anime.set(['.badge', '#name .ch', '.cumple', '.number-zone', '.years'], { opacity: 0 });
  await lightSequence();
  spawnRunner({ rtl: false, top: 22, width: 150, duration: 1300 });
  anime.timeline({ easing: 'easeOutExpo' })
    .add({ targets: '.badge', opacity: [0, 1], translateX: [-innerWidth, 0], duration: 800 })
    .add({ targets: '#name .ch', opacity: [0, 1], translateX: [-innerWidth * .8, 0], skewX: [-40, 0], duration: 900, delay: anime.stagger(55) }, '-=500')
    .add({ targets: '.cumple', opacity: [0, 1], translateX: [innerWidth * .6, 0], duration: 700 }, '-=600')
    .add({ targets: '.number-zone', opacity: [0, 1], scale: [.3, 1], rotate: [-25, 0], duration: 1300, easing: 'easeOutElastic(1, .6)' }, '-=400')
    .add({ targets: '.years', opacity: [0, 1], scale: [0, 1], duration: 800, easing: 'easeOutBack' }, '-=900')
    .finished.then(() => {
      nameEl.classList.add('idle');
      heroAnims.push(
        anime({ targets: '.roundel', scale: [1, 1.05], duration: 900, direction: 'alternate', loop: true, easing: 'easeInOutSine' }),
        anime({ targets: '.two', rotate: [-4, 4], duration: 1400, direction: 'alternate', loop: true, easing: 'easeInOutSine' })
      );
      if (!heroVisible) heroAnims.forEach(a => a.pause());
      lightLoop();
    });
})();

/* ---------- Aparición de secciones al hacer scroll ---------- */
const reveals = document.querySelectorAll('.reveal');
if (animate && 'IntersectionObserver' in window) {
  let side = 1;
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      io.unobserve(entry.target);
      side *= -1;
      anime({ targets: entry.target, opacity: [0, 1], translateX: [side * 120, 0], duration: 900, easing: 'easeOutBack' });
    });
  }, { threshold: .18 });
  reveals.forEach(el => io.observe(el));
} else {
  reveals.forEach(el => { el.style.opacity = 1; });
}

/* ---------- Explosión de partículas en botones ---------- */
function burst(x, y) {
  if (!animate) return;
  for (let i = 0; i < 40; i++) {
    const smoke = i % 5 === 0;
    const p = document.createElement('span');
    p.className = 'burst-piece' + (smoke ? ' smoke' : '');
    p.style.left = x + 'px';
    p.style.top = y + 'px';
    if (!smoke) {
      const c = pick(RACE);
      p.style.background = c;
      if (c === '#111111') p.style.outline = '1.5px solid #fff';
    }
    document.body.appendChild(p);
    const angle = rand(0, Math.PI * 2), dist = rand(60, 210);
    anime({
      targets: p,
      translateX: Math.cos(angle) * dist,
      translateY: smoke
        ? Math.sin(angle) * dist * .5 - 40
        : [{ value: Math.sin(angle) * dist - 60, duration: 600, easing: 'easeOutCubic' },
           { value: Math.sin(angle) * dist + 160, duration: 900, easing: 'easeInQuad' }],
      scale: smoke ? [.5, 3] : 1,
      rotate: smoke ? 0 : rand(-720, 720),
      opacity: smoke ? [.8, 0] : [{ value: 1, duration: 900 }, { value: 0, duration: 600 }],
      duration: smoke ? 1100 : 1500,
      easing: 'easeOutCubic',
      complete: () => p.remove()
    });
  }
}
const centerOf = el => { const r = el.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; };
const zoomPast = el => {
  const top = el.getBoundingClientRect().top / innerHeight * 100 - 4;
  spawnRunner({ rtl: Math.random() < .5, top, width: 110, duration: 1200 });
};

/* ---------- Diálogos ---------- */
function openDialog(dialog) {
  if (typeof dialog.showModal !== 'function') return false;
  dialog.showModal();
  if (animate) anime({ targets: dialog, scale: [.6, 1], opacity: [0, 1], duration: 600, easing: 'easeOutBack' });
  return true;
}
document.querySelectorAll('dialog').forEach(dialog => {
  dialog.addEventListener('click', e => {
    if (e.target === dialog || e.target.hasAttribute('data-close')) dialog.close();
  });
});

/* ---------- Ubicación: móvil elige app, escritorio abre Google Maps ---------- */
const ua = navigator.userAgent;
const isMobile = /Android|iPhone|iPad|iPod|Mobile|Opera Mini|IEMobile|webOS|BlackBerry/i.test(ua)
  || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
const mapDialog = document.getElementById('map-dialog');
mapDialog.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mapDialog.close()));

document.getElementById('location-button').addEventListener('click', e => {
  burst(...centerOf(e.currentTarget));
  zoomPast(e.currentTarget);
  if (isMobile && openDialog(mapDialog)) return;
  window.open(DESKTOP_MAPS_URL, '_blank', 'noopener');
});

// /* ---------- Confirmación de asistencia ---------- */
// document.getElementById('rsvp-button').addEventListener('click', e => {
//   burst(...centerOf(e.currentTarget));
//   zoomPast(e.currentTarget);
//   if (RSVP_WHATSAPP) {
//     window.open(`https://wa.me/${RSVP_WHATSAPP}?text=${encodeURIComponent(RSVP_MESSAGE)}`, '_blank', 'noopener');
//   } else if (!openDialog(document.getElementById('rsvp-dialog'))) {
//     alert('¡Lugar en la parrilla asegurado! Gracias por confirmar.');
//   }
// });