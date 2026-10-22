/*
 * DAIMA COMMUNICATIONS — original SVG art asset generator
 * -------------------------------------------------------
 * Produces original, licence-free illustrative product renders and concept
 * visuals used across the demonstration. These are NOT photographs of Daima
 * stock or premises. Run: node tools/generate-assets.js
 */
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '..', 'assets', 'images');
fs.mkdirSync(OUT, { recursive: true });

const NAVY = '#0a1020';

function svgDoc(body, w = 800, h = 800, title = 'Illustrative product render') {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${title}">
<title>${title}</title>
${body}
</svg>`;
}

function commonDefs(p, accent = '#3470ff', tint = '#eef2fa') {
  return `<defs>
    <linearGradient id="${p}-bg" x1="0" y1="0" x2=".85" y2="1">
      <stop offset="0" stop-color="#fcfdff"/>
      <stop offset=".55" stop-color="${tint}"/>
      <stop offset="1" stop-color="#e2e8f2"/>
    </linearGradient>
    <radialGradient id="${p}-glow" cx="50%" cy="40%" r="60%">
      <stop offset="0" stop-color="${accent}" stop-opacity=".30"/>
      <stop offset=".55" stop-color="${accent}" stop-opacity=".08"/>
      <stop offset="1" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
    <pattern id="${p}-dots" width="28" height="28" patternUnits="userSpaceOnUse">
      <circle cx="1.2" cy="1.2" r="1.1" fill="${NAVY}" opacity=".06"/>
    </pattern>
    <filter id="${p}-sh" x="-60%" y="-60%" width="220%" height="220%">
      <feDropShadow dx="0" dy="26" stdDeviation="24" flood-color="#081020" flood-opacity=".26"/>
    </filter>
    <filter id="${p}-sh-soft" x="-60%" y="-60%" width="220%" height="220%">
      <feDropShadow dx="0" dy="14" stdDeviation="18" flood-color="#081020" flood-opacity=".18"/>
    </filter>
    <filter id="${p}-blur" x="-60%" y="-60%" width="220%" height="220%">
      <feGaussianBlur stdDeviation="30"/>
    </filter>
    <filter id="${p}-blur-s" x="-60%" y="-60%" width="220%" height="220%">
      <feGaussianBlur stdDeviation="8"/>
    </filter>
    <linearGradient id="${p}-sweep" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#ffffff" stop-opacity=".0"/>
      <stop offset=".45" stop-color="#ffffff" stop-opacity=".55"/>
      <stop offset=".55" stop-color="#ffffff" stop-opacity=".16"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
  </defs>`;
}

function stage(p, accent = '#3470ff', tint = '#eef2fa', floorY = 705) {
  return `<rect width="800" height="800" fill="url(#${p}-bg)"/>
  <rect width="800" height="800" fill="url(#${p}-dots)"/>
  <circle cx="400" cy="330" r="340" fill="url(#${p}-glow)"/>
  <ellipse cx="400" cy="${floorY}" rx="230" ry="38" fill="#0a1020" opacity=".18" filter="url(#${p}-blur)"/>
  <path d="M0 610 L800 320 L800 800 L0 800 Z" fill="#ffffff" opacity=".16"/>`;
}

function ring(x, y, r, color = '#ffffff', opacity = 0.2) {
  return `<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="${color}" stroke-opacity="${opacity}" stroke-width="1"/>`;
}

/* ------------------------------------------------------------------ */
/* Phone renderers                                                     */
/* ------------------------------------------------------------------ */

function phoneDefs(p, o) {
  const bodyA = o.bodyA || '#454e60';
  const bodyB = o.bodyB || '#222937';
  const bodyC = o.bodyC || '#343d4e';
  const scrA = (o.screen && o.screen[0]) || '#10296b';
  const scrB = (o.screen && o.screen[1]) || '#6d3ff0';
  const scrC = (o.screen && o.screen[2]) || '#04a6c8';
  return `<defs>
    <linearGradient id="${p}-body" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${bodyA}"/>
      <stop offset=".42" stop-color="${bodyB}"/>
      <stop offset=".62" stop-color="${bodyC}"/>
      <stop offset="1" stop-color="${bodyB}"/>
    </linearGradient>
    <linearGradient id="${p}-frame" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${bodyA}"/>
      <stop offset=".08" stop-color="${bodyC}"/>
      <stop offset=".5" stop-color="${bodyB}"/>
      <stop offset=".92" stop-color="${bodyC}"/>
      <stop offset="1" stop-color="${bodyA}"/>
    </linearGradient>
    <linearGradient id="${p}-screen" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${scrA}"/>
      <stop offset=".55" stop-color="${scrB}"/>
      <stop offset="1" stop-color="${scrC}"/>
    </linearGradient>
    <radialGradient id="${p}-sglow" cx="30%" cy="24%" r="72%">
      <stop offset="0" stop-color="#8fd8ff" stop-opacity=".9"/>
      <stop offset=".5" stop-color="#3f7dff" stop-opacity=".28"/>
      <stop offset="1" stop-color="#0a1030" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="${p}-edge" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#ffffff" stop-opacity=".55"/>
      <stop offset=".18" stop-color="#ffffff" stop-opacity=".05"/>
      <stop offset=".82" stop-color="#ffffff" stop-opacity=".03"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity=".42"/>
    </linearGradient>
    <linearGradient id="${p}-lens" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#3f4a5e"/>
      <stop offset=".45" stop-color="#10151f"/>
      <stop offset="1" stop-color="#03050a"/>
    </linearGradient>
    <clipPath id="${p}-scrclip"><rect x="16" y="16" width="268" height="578" rx="34"/></clipPath>
  </defs>`;
}

function phoneBack(p, cx = 400, cy = 392, rot = -9, scale = 1, w = 300, h = 610) {
  return `<g transform="translate(${cx} ${cy}) rotate(${rot}) scale(${scale}) translate(${-w / 2} ${-h / 2})" filter="url(#${p}-sh)">
    <rect width="${w}" height="${h}" rx="46" fill="url(#${p}-body)" stroke="#ffffff" stroke-opacity=".38" stroke-width="1.4"/>
    <rect x="2" y="2" width="${w - 4}" height="${h - 4}" rx="44" fill="none" stroke="#000" stroke-opacity=".22"/>
    <path d="M${w - 16} 34 L${w - 8} 54 L${w - 8} ${h - 90} L${w - 20} ${h - 60} Z" fill="#0a0f1a" opacity=".35"/>
    <path d="M24 8 L${w - 130} 8 L${w - 220} ${h - 8} L24 ${h - 8} Z" fill="#ffffff" opacity=".045"/>
    <path d="M${w * 0.62} 2 L${w - 40} 2 L${w - 4} 120 L${w - 4} 60 Z" fill="#ffffff" opacity=".06"/>
    <!-- camera island -->
    <rect x="18" y="18" width="136" height="166" rx="36" fill="#111722" stroke="#ffffff" stroke-opacity=".14"/>
    <rect x="24" y="24" width="124" height="154" rx="31" fill="none" stroke="#000" stroke-opacity=".4"/>
    <g>
      <circle cx="62" cy="62" r="24" fill="#05080e" stroke="#465268" stroke-width="2"/>
      <circle cx="62" cy="62" r="16" fill="url(#${p}-lens)"/>
      <circle cx="55" cy="55" r="5.5" fill="#8fd0ff" opacity=".65"/>
      <circle cx="62" cy="122" r="24" fill="#05080e" stroke="#465268" stroke-width="2"/>
      <circle cx="62" cy="122" r="16" fill="url(#${p}-lens)"/>
      <circle cx="55" cy="115" r="5.5" fill="#ffd7a1" opacity=".5"/>
      <circle cx="124" cy="92" r="20" fill="#05080e" stroke="#465268" stroke-width="2"/>
      <circle cx="124" cy="92" r="13" fill="url(#${p}-lens)"/>
      <circle cx="118" cy="86" r="4.4" fill="#a5e6ff" opacity=".6"/>
      <circle cx="120" cy="42" r="7" fill="#f7e8c4" opacity=".85"/>
      <circle cx="120" cy="42" r="3" fill="#ffffff"/>
    </g>
    <text x="30" y="205" fill="#ffffff" fill-opacity=".22" font-family="Segoe UI, Arial" font-size="9" letter-spacing="2">DEMO RENDER</text>
    <rect x="${w / 2 - 42}" y="${h - 18}" width="84" height="3" rx="1.5" fill="#ffffff" opacity=".28"/>
  </g>`;
}

function phoneFront(p, cx = 400, cy = 392, rot = -9, scale = 1, w = 300, h = 610, time = '9:41') {
  return `<g transform="translate(${cx} ${cy}) rotate(${rot}) scale(${scale}) translate(${-w / 2} ${-h / 2})" filter="url(#${p}-sh)">
    <rect width="${w}" height="${h}" rx="46" fill="url(#${p}-frame)" stroke="#ffffff" stroke-opacity=".5" stroke-width="1.4"/>
    <rect x="5" y="5" width="${w - 10}" height="${h - 10}" rx="41" fill="#04060b"/>
    <rect x="14" y="14" width="${w - 28}" height="${h - 28}" rx="35" fill="#050810" stroke="#ffffff" stroke-opacity=".08"/>
    <rect x="16" y="16" width="${w - 32}" height="${h - 32}" rx="34" fill="url(#${p}-screen)"/>
    <g clip-path="url(#${p}-scrclip)">
      <rect x="16" y="16" width="${w - 32}" height="${h - 32}" fill="url(#${p}-screen)"/>
      <ellipse cx="120" cy="180" rx="200" ry="230" fill="url(#${p}-sglow)" opacity=".9"/>
      <ellipse cx="270" cy="470" rx="170" ry="220" fill="#ff5fa2" opacity=".28" filter="url(#${p}-blur-s)"/>
      <ellipse cx="80" cy="520" rx="150" ry="130" fill="#00e5c3" opacity=".2" filter="url(#${p}-blur-s)"/>
      <path d="M16 380 C 120 300, 200 470, 300 350" fill="none" stroke="#ffffff" stroke-opacity=".22" stroke-width="1.2"/>
      <path d="M16 420 C 130 330, 210 500, 300 390" fill="none" stroke="#a9e4ff" stroke-opacity=".18" stroke-width="1"/>
      <path d="M-20 250 C 100 120, 220 240, 310 80" fill="none" stroke="#ffffff" stroke-opacity=".13" stroke-width="44" filter="url(#${p}-blur-s)"/>
      <circle cx="250" cy="620" r="120" fill="#0b1b4d" opacity=".4" filter="url(#${p}-blur-s)"/>
      <rect x="16" y="16" width="${w - 32}" height="${h - 32}" fill="url(#${p}-sweep)" opacity=".14"/>
    </g>
    <rect x="20" y="330" width="4" height="90" rx="2" fill="#ffffff" opacity=".2"/>
    <circle cx="150" cy="34" r="6.5" fill="#020306"/>
    <text x="34" y="50" fill="#ffffff" fill-opacity=".9" font-family="Segoe UI, Arial" font-size="13" font-weight="600">${time}</text>
    <g fill="#ffffff" fill-opacity=".78">
      <rect x="228" y="42" width="3" height="7" rx="1"/>
      <rect x="233" y="39" width="3" height="10" rx="1"/>
      <rect x="238" y="36" width="3" height="13" rx="1"/>
      <rect x="243" y="33" width="3" height="16" rx="1"/>
      <rect x="253" y="36" width="18" height="10" rx="3" fill="none" stroke="#ffffff" stroke-opacity=".6"/>
      <rect x="255" y="38" width="12" height="6" rx="1.6"/>
    </g>
    <rect x="140" y="46" width="20" height="4" rx="2" fill="#ffffff" opacity=".5"/>
    <rect x="106" y="${h - 26}" width="88" height="4" rx="2" fill="#ffffff" opacity=".65"/>
    <rect x="1" y="140" width="3.5" height="34" rx="2" fill="#ffffff" opacity=".3"/>
    <rect x="1" y="188" width="3.5" height="58" rx="2" fill="#ffffff" opacity=".22"/>
    <rect x="${w - 4.5}" y="170" width="3.5" height="76" rx="2" fill="#ffffff" opacity=".28"/>
    <rect x="2" y="2" width="${w - 4}" height="${h - 4}" rx="44" fill="none" stroke="#ffffff" opacity=".16"/>
  </g>`;
}

function featurePhone(p, cx = 400, cy = 400, rot = -7, scale = 1, body = '#232a36', accent = '#2f7da8') {
  const w = 224, h = 452;
  const keys = [];
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 3; c++) {
      const kx = -74 + c * 52, ky = 66 + r * 44;
      keys.push(`<rect x="${kx}" y="${ky}" width="42" height="34" rx="9" fill="#323b4a" stroke="#ffffff" stroke-opacity=".10"/>
        <text x="${kx + 21}" y="${ky + 22}" text-anchor="middle" fill="#dfe8f4" fill-opacity=".72" font-family="Segoe UI, Arial" font-size="13">${['1','2','3','4','5','6','7','8','9','*','0','#'][r * 3 + c]}</text>`);
    }
  }
  return `<g transform="translate(${cx} ${cy}) rotate(${rot}) scale(${scale}) translate(${-w / 2} ${-h / 2})" filter="url(#${p}-sh)">
    <rect width="${w}" height="${h}" rx="30" fill="${body}" stroke="#ffffff" stroke-opacity=".28"/>
    <rect x="3" y="3" width="${w - 6}" height="${h - 6}" rx="28" fill="none" stroke="#000" stroke-opacity=".3"/>
    <rect x="16" y="18" width="${w - 32}" height="164" rx="14" fill="#070c12" stroke="#ffffff" stroke-opacity=".1"/>
    <rect x="22" y="24" width="${w - 44}" height="152" rx="9" fill="url(#${p}-screen)"/>
    <rect x="22" y="24" width="${w - 44}" height="152" rx="9" fill="#ffffff" opacity=".12"/>
    <text x="${w / 2}" y="78" text-anchor="middle" fill="#ffffff" fill-opacity=".92" font-family="Segoe UI, Arial" font-size="15" font-weight="600">Daima</text>
    <text x="${w / 2}" y="98" text-anchor="middle" fill="#ffffff" fill-opacity=".55" font-family="Segoe UI, Arial" font-size="9" letter-spacing="2">DEMO</text>
    <text x="${w / 2}" y="150" text-anchor="middle" fill="#ffffff" fill-opacity=".8" font-family="Segoe UI, Arial" font-size="22" font-weight="600">${timeNow()}</text>
    <circle cx="${w / 2}" cy="202" r="16" fill="#3a4454" stroke="#ffffff" stroke-opacity=".18"/>
    <g transform="translate(${w / 2} ${h - 188})">${keys.join('')}</g>
    <circle cx="${w / 2}" cy="${h - 22}" r="4" fill="#ffffff" opacity=".22"/>
  </g>`;
}

function timeNow() { return '9:41'; }

/* ------------------------------------------------------------------ */
/* Accessory renderers                                                 */
/* ------------------------------------------------------------------ */

function earbuds(p, o = {}) {
  const shell = o.shell || '#fbfcfe';
  const shellEdge = o.shellEdge || '#c9d2e0';
  const bud = o.bud || '#eef2f8';
  const face = o.budFace || '#2a3140';
  const led = o.led || '#2f6bff';
  return `<g transform="translate(400 410) rotate(-5)" filter="url(#${p}-sh)">
    <g transform="translate(0 96)">
      <rect x="-142" y="-74" width="284" height="212" rx="78" fill="${shell}" stroke="${shellEdge}" stroke-width="2"/>
      <path d="M-142 -18 Q 0 16 142 -18" fill="none" stroke="${shellEdge}" stroke-width="2.2" opacity=".9"/>
      <path d="M-140 -26 Q 0 8 140 -26" fill="none" stroke="#ffffff" stroke-width="2.6" opacity=".75"/>
      <rect x="-126" y="-62" width="252" height="74" rx="52" fill="#ffffff" opacity=".45"/>
      <circle cx="0" cy="82" r="4.5" fill="${led}"/>
      <circle cx="0" cy="82" r="13" fill="${led}" opacity=".18"/>
    </g>
    <g transform="translate(-104 -196) rotate(-14)">
      <ellipse cx="0" cy="0" rx="35" ry="40" fill="${bud}" stroke="${shellEdge}" stroke-width="1.5"/>
      <path d="M-7 26 C -12 60, -14 84, -14 110 C -14 122, 14 122, 14 110 C 14 84, 12 60, 7 26 Z" fill="${bud}" stroke="${shellEdge}" stroke-width="1.5"/>
      <ellipse cx="-3" cy="-5" rx="21" ry="24" fill="${face}"/>
      <ellipse cx="-3" cy="-5" rx="13" ry="16" fill="#0b0f16"/>
      <g fill="#ffffff" opacity=".24">
        <circle cx="-9" cy="-13" r="1.2"/><circle cx="-4" cy="-15" r="1.2"/><circle cx="1" cy="-15" r="1.2"/>
        <circle cx="-10" cy="-8" r="1.2"/><circle cx="-5" cy="-10" r="1.2"/><circle cx="0" cy="-10" r="1.2"/>
        <circle cx="-9" cy="-3" r="1.2"/><circle cx="-4" cy="-5" r="1.2"/>
      </g>
      <rect x="-6" y="100" width="12" height="4" rx="2" fill="${led}" opacity=".75"/>
      <circle cx="-12" cy="-24" r="5" fill="#ffffff" opacity=".4"/>
    </g>
    <g transform="translate(104 -196) rotate(14)">
      <ellipse cx="0" cy="0" rx="35" ry="40" fill="${bud}" stroke="${shellEdge}" stroke-width="1.5"/>
      <path d="M-7 26 C -12 60, -14 84, -14 110 C -14 122, 14 122, 14 110 C 14 84, 12 60, 7 26 Z" fill="${bud}" stroke="${shellEdge}" stroke-width="1.5"/>
      <ellipse cx="3" cy="-5" rx="21" ry="24" fill="${face}"/>
      <ellipse cx="3" cy="-5" rx="13" ry="16" fill="#0b0f16"/>
      <g fill="#ffffff" opacity=".24">
        <circle cx="-3" cy="-13" r="1.2"/><circle cx="2" cy="-15" r="1.2"/><circle cx="7" cy="-15" r="1.2"/>
        <circle cx="-4" cy="-8" r="1.2"/><circle cx="1" cy="-10" r="1.2"/><circle cx="6" cy="-10" r="1.2"/>
        <circle cx="-3" cy="-3" r="1.2"/><circle cx="2" cy="-5" r="1.2"/>
      </g>
      <rect x="-6" y="100" width="12" height="4" rx="2" fill="${led}" opacity=".75"/>
      <circle cx="12" cy="-24" r="5" fill="#ffffff" opacity=".4"/>
    </g>
    <ellipse cx="-104" cy="10" rx="56" ry="12" fill="#0a1020" opacity=".08" filter="url(#${p}-blur-s)"/>
    <ellipse cx="104" cy="10" rx="56" ry="12" fill="#0a1020" opacity=".08" filter="url(#${p}-blur-s)"/>
  </g>`;
}

function headphones(p, o = {}) {
  const body = o.body || '#242a36';
  const cushion = o.cushion || '#11151f';
  return `<g transform="translate(400 390) rotate(-6)" filter="url(#${p}-sh)">
    <path d="M-138 -44 C -168 -232, 168 -232, 138 -44" fill="none" stroke="${body}" stroke-width="32" stroke-linecap="round"/>
    <path d="M-138 -44 C -168 -232, 168 -232, 138 -44" fill="none" stroke="#ffffff" stroke-opacity=".18" stroke-width="4" stroke-linecap="round"/>
    <path d="M-108 -52 C -130 -190, 130 -190, 108 -52" fill="none" stroke="${cushion}" stroke-width="16" stroke-linecap="round"/>
    <g transform="translate(-136 -24)">
      <rect x="-48" y="-66" width="96" height="132" rx="44" fill="${body}" stroke="#ffffff" stroke-opacity=".16"/>
      <rect x="-35" y="-53" width="70" height="106" rx="34" fill="${cushion}"/>
      <ellipse cx="0" cy="0" rx="24" ry="34" fill="#05080e" opacity=".55"/>
      <rect x="-52" y="-18" width="8" height="36" rx="4" fill="#ffffff" opacity=".1"/>
    </g>
    <g transform="translate(136 -24)">
      <rect x="-48" y="-66" width="96" height="132" rx="44" fill="${body}" stroke="#ffffff" stroke-opacity=".16"/>
      <rect x="-35" y="-53" width="70" height="106" rx="34" fill="${cushion}"/>
      <ellipse cx="0" cy="0" rx="24" ry="34" fill="#05080e" opacity=".55"/>
      <rect x="44" y="-18" width="8" height="36" rx="4" fill="#ffffff" opacity=".1"/>
      <circle cx="0" cy="38" r="7" fill="${o.accent || '#3470ff'}"/>
    </g>
    <path d="M-110 -70 C -80 -190, 80 -190, 110 -70" fill="none" stroke="#ffffff" stroke-opacity=".06" stroke-width="7"/>
  </g>`;
}

function powerBank(p, o = {}) {
  const body = o.body || '#20262f';
  const accent = o.accent || '#3b7bff';
  return `<g transform="translate(400 400) rotate(-12)" filter="url(#${p}-sh)">
    <rect x="-122" y="-192" width="244" height="384" rx="34" fill="${body}" stroke="#ffffff" stroke-opacity=".18"/>
    <rect x="-114" y="-184" width="228" height="368" rx="28" fill="none" stroke="#000" stroke-opacity=".3"/>
    <path d="M-122 -160 L122 -192 L122 -120 L-122 -88 Z" fill="#ffffff" opacity=".05"/>
    <rect x="-84" y="-140" width="168" height="88" rx="14" fill="#0b1018" stroke="#ffffff" stroke-opacity=".1"/>
    <text x="0" y="-96" text-anchor="middle" fill="${accent}" font-family="Segoe UI, Arial" font-size="30" font-weight="700">${o.capacity || '20K'}</text>
    <text x="0" y="-72" text-anchor="middle" fill="#ffffff" fill-opacity=".45" font-family="Segoe UI, Arial" font-size="10" letter-spacing="3">mAh · DEMO</text>
    <g transform="translate(-44 30)">
      ${[0, 1, 2, 3].map((i) => `<rect x="${i * 26}" y="0" width="18" height="6" rx="3" fill="${i < 3 ? accent : '#37404f'}"/>`).join('')}
    </g>
    <rect x="-84" y="72" width="64" height="26" rx="8" fill="#090d14" stroke="#ffffff" stroke-opacity=".14"/>
    <rect x="-74" y="80" width="44" height="10" rx="5" fill="#1d2531"/>
    <rect x="20" y="72" width="64" height="26" rx="8" fill="#090d14" stroke="#ffffff" stroke-opacity=".14"/>
    <rect x="30" y="80" width="44" height="10" rx="5" fill="#1d2531"/>
    <text x="0" y="150" text-anchor="middle" fill="#ffffff" fill-opacity=".25" font-family="Segoe UI, Arial" font-size="9" letter-spacing="4">FAST CHARGE</text>
    <rect x="-122" y="-192" width="244" height="384" rx="34" fill="url(#${p}-sweep)" opacity=".12"/>
  </g>`;
}

function charger(p, o = {}) {
  const body = o.body || '#f8fafc';
  const edge = o.edge || '#c9d3e2';
  const accent = o.accent || '#2f6bff';
  return `<g transform="translate(392 382) rotate(-8)" filter="url(#${p}-sh)">
    <rect x="-104" y="-104" width="208" height="208" rx="44" fill="${body}" stroke="${edge}" stroke-width="2"/>
    <rect x="-96" y="-96" width="192" height="192" rx="38" fill="none" stroke="#ffffff" stroke-opacity=".65"/>
    <text x="0" y="-32" text-anchor="middle" fill="#2a3342" font-family="Segoe UI, Arial" font-size="13" font-weight="700" letter-spacing="1">${o.label || '30W'}</text>
    <text x="0" y="-14" text-anchor="middle" fill="#6b7688" font-family="Segoe UI, Arial" font-size="8" letter-spacing="2">USB-C · DEMO</text>
    <rect x="-48" y="20" width="96" height="22" rx="11" fill="#0a0f17"/>
    <rect x="-42" y="25" width="84" height="12" rx="6" fill="#232c38"/>
    <rect x="-14" y="29" width="28" height="4" rx="2" fill="${accent}" opacity=".6"/>
    <rect x="-104" y="-104" width="208" height="208" rx="44" fill="url(#${p}-sweep)" opacity=".24"/>
    <path d="M104 110 C 180 150, 200 220, 120 260" fill="none" stroke="${o.cable || '#1b2230'}" stroke-width="9" stroke-linecap="round"/>
    <rect x="98" y="252" width="36" height="16" rx="7" fill="#c9d0da" transform="rotate(16 116 260)"/>
  </g>
  <ellipse cx="400" cy="700" rx="210" ry="32" fill="#0a1020" opacity=".14" filter="url(#${p}-blur)"/>`;
}

function cable(p, o = {}) {
  const cord = o.cord || '#20262f';
  return `<g transform="translate(400 396) rotate(-10)" filter="url(#${p}-sh)">
    <path d="M-160 60 C -220 -80, -60 -170, 30 -90 C 130 -10, 150 110, 40 130 C -30 142, -80 60, 0 10 C 90 -50, 170 20, 150 88" fill="none" stroke="${cord}" stroke-width="17" stroke-linecap="round"/>
    <path d="M-160 60 C -220 -80, -60 -170, 30 -90 C 130 -10, 150 110, 40 130 C -30 142, -80 60, 0 10 C 90 -50, 170 20, 150 88" fill="none" stroke="#ffffff" stroke-opacity=".13" stroke-width="4" stroke-linecap="round" stroke-dasharray="3 7"/>
    <g transform="translate(-163 62) rotate(38)">
      <rect x="-26" y="-16" width="52" height="32" rx="10" fill="#dfe5ec" stroke="#aeb8c6"/>
      <rect x="26" y="-8" width="26" height="16" rx="6" fill="#aab4c2"/>
      <rect x="-18" y="-7" width="26" height="14" rx="4" fill="#5a6473"/>
    </g>
    <g transform="translate(150 90) rotate(116)">
      <rect x="-26" y="-16" width="52" height="32" rx="10" fill="#dfe5ec" stroke="#aeb8c6"/>
      <rect x="26" y="-8" width="26" height="16" rx="6" fill="#aab4c2"/>
      <rect x="-18" y="-7" width="26" height="14" rx="4" fill="#5a6473"/>
    </g>
    <rect x="-74" y="-58" width="112" height="34" rx="17" fill="${cord}" transform="rotate(-55)"/>
    <text x="0" y="-6" fill="#ffffff" fill-opacity=".35" font-family="Segoe UI, Arial" font-size="9" letter-spacing="3" transform="rotate(-55)">BRAIDED</text>
  </g>`;
}

function phoneCase(p, o = {}) {
  const tint = o.tint || '#b9d4ff';
  return `<g transform="translate(400 395) rotate(-10)" filter="url(#${p}-sh)">
    <rect x="-130" y="-252" width="260" height="504" rx="52" fill="${tint}" fill-opacity=".26" stroke="${o.edge || '#a9c6ee'}" stroke-width="2"/>
    <rect x="-117" y="-239" width="234" height="478" rx="44" fill="#ffffff" fill-opacity=".18" stroke="#ffffff" stroke-opacity=".65"/>
    <rect x="-118" y="-180" width="46" height="120" rx="22" fill="#0b1220" fill-opacity=".16"/>
    <rect x="-76" y="-238" width="152" height="140" rx="30" fill="#0b1220" fill-opacity=".10"/>
    <circle cx="-38" cy="-194" r="13" fill="#0b1220" fill-opacity=".22"/>
    <circle cx="-38" cy="-156" r="13" fill="#0b1220" fill-opacity=".22"/>
    <circle cx="14" cy="-175" r="11" fill="#0b1220" fill-opacity=".18"/>
    <path d="M-130 -120 L-60 -252" stroke="#ffffff" stroke-opacity=".5" stroke-width="3"/>
    <path d="M-20 250 L110 120" stroke="#ffffff" stroke-opacity=".28" stroke-width="2"/>
    <rect x="-130" y="-252" width="260" height="504" rx="52" fill="url(#${p}-sweep)" opacity=".2"/>
    <text x="0" y="210" text-anchor="middle" fill="#233149" fill-opacity=".45" font-family="Segoe UI, Arial" font-size="10" letter-spacing="4">DEMO · CASE</text>
  </g>
  <g opacity=".6">
    <circle cx="585" cy="240" r="4" fill="${o.edge || '#8db6ec'}"/>
    <circle cx="615" cy="280" r="2.5" fill="${o.edge || '#8db6ec'}"/>
    <circle cx="222" cy="550" r="3" fill="${o.edge || '#8db6ec'}"/>
  </g>`;
}

function screenGlass(p) {
  return `<g transform="translate(400 392) rotate(-8)" filter="url(#${p}-sh)">
    <rect x="-136" y="-256" width="272" height="512" rx="46" fill="#d9e9ff" fill-opacity=".28" stroke="#a8c6ef" stroke-width="1.6"/>
    <rect x="-126" y="-246" width="252" height="492" rx="38" fill="none" stroke="#ffffff" stroke-opacity=".75"/>
    <path d="M-136 -150 L-20 -256 L120 -256 L-136 -30 Z" fill="#ffffff" opacity=".38"/>
    <path d="M-40 256 L136 80 L136 160 L26 256 Z" fill="#7db1ff" opacity=".14"/>
    <rect x="-136" y="-256" width="272" height="512" rx="46" fill="url(#${p}-sweep)" opacity=".28"/>
    <circle cx="-58" cy="-156" r="7" fill="#0b1220" fill-opacity=".14"/>
    <circle cx="-42" cy="-190" r="7" fill="#0b1220" fill-opacity=".14"/>
    <circle cx="70" cy="140" r="22" fill="none" stroke="#ffffff" stroke-opacity=".6"/>
    <path d="M170 -100 l10 16 18 4 -14 12 4 18 -18 -9 -16 10 3 -19 -15 -12 19 -3 Z" fill="#ffffff" opacity=".55"/>
    <path d="M198 180 l6 10 12 2 -9 8 3 12 -12 -6 -10 7 2 -13 -10 -8 13 -1 Z" fill="#ffffff" opacity=".4"/>
  </g>`;
}

function watch(p, o = {}) {
  const strap = o.strap || '#20252f';
  const caseCol = o.caseCol || '#2c3340';
  const accent = o.accent || '#41d1ff';
  return `<g transform="translate(400 392) rotate(-7)" filter="url(#${p}-sh)">
    <rect x="-62" y="-300" width="124" height="600" rx="58" fill="${strap}"/>
    <path d="M-62 -250 L62 -250 L62 -180 L-62 -180 Z" fill="#ffffff" opacity=".06"/>
    <path d="M-62 210 L62 210 L62 250 L-62 250 Z" fill="#000" opacity=".2"/>
    <g>
      <rect x="-118" y="-152" width="236" height="288" rx="72" fill="${caseCol}" stroke="#ffffff" stroke-opacity=".28" stroke-width="2"/>
      <rect x="-104" y="-138" width="208" height="260" rx="60" fill="#05080e"/>
      <rect x="-96" y="-130" width="192" height="244" rx="53" fill="#081019"/>
      <circle cx="0" cy="-8" r="82" fill="none" stroke="${accent}" stroke-opacity=".35" stroke-width="2"/>
      <circle cx="0" cy="-8" r="66" fill="none" stroke="${accent}" stroke-opacity=".18" stroke-width="10"/>
      <path d="M0 -90 A82 82 0 0 1 72 24" fill="none" stroke="${accent}" stroke-width="7" stroke-linecap="round"/>
      <text x="0" y="4" text-anchor="middle" fill="#ffffff" font-family="Segoe UI, Arial" font-size="38" font-weight="600">9:41</text>
      <text x="0" y="34" text-anchor="middle" fill="${accent}" font-family="Segoe UI, Arial" font-size="10" letter-spacing="2">DEMO</text>
      <rect x="-26" y="66" width="52" height="4" rx="2" fill="#ffffff" opacity=".35"/>
      <rect x="118" y="-46" width="7" height="38" rx="3.5" fill="${caseCol}" stroke="#ffffff" stroke-opacity=".2"/>
      <rect x="118" y="18" width="7" height="18" rx="3.5" fill="${caseCol}"/>
    </g>
    <rect x="-62" y="-300" width="124" height="600" rx="58" fill="url(#${p}-sweep)" opacity=".08"/>
  </g>`;
}

function speaker(p, o = {}) {
  const body = o.body || '#2a3240';
  const accent = o.accent || '#3b82f6';
  const dots = [];
  for (let y = -8; y < 96; y += 12) {
    for (let x = -88; x < 92; x += 12) {
      dots.push(`<circle cx="${x}" cy="${y}" r="2.1" fill="#ffffff" opacity=".18"/>`);
    }
  }
  return `<g transform="translate(400 400) rotate(-5)" filter="url(#${p}-sh)">
    <rect x="-128" y="-176" width="256" height="352" rx="66" fill="${body}" stroke="#ffffff" stroke-opacity=".18"/>
    <rect x="-118" y="-166" width="236" height="332" rx="58" fill="none" stroke="#000" stroke-opacity=".25"/>
    <rect x="-104" y="-60" width="208" height="180" rx="42" fill="#1b222d"/>
    ${dots.join('')}
    <rect x="-104" y="-60" width="208" height="180" rx="42" fill="url(#${p}-sweep)" opacity=".1"/>
    <circle cx="-75" cy="-126" r="17" fill="#121821" stroke="${accent}" stroke-opacity=".7" stroke-width="2"/>
    <circle cx="-75" cy="-126" r="6" fill="${accent}"/>
    <g transform="translate(40 -132)">
      <rect x="-16" y="-6" width="32" height="12" rx="6" fill="#ffffff" opacity=".3"/>
      <rect x="34" y="-6" width="12" height="12" rx="6" fill="#ffffff" opacity=".2"/>
    </g>
    <path d="M128 118 C 188 86, 188 18, 132 -14" fill="none" stroke="${accent}" stroke-opacity=".5" stroke-width="4" stroke-linecap="round"/>
    <path d="M150 146 C 236 100, 236 -10, 154 -58" fill="none" stroke="${accent}" stroke-opacity=".22" stroke-width="4" stroke-linecap="round"/>
    <path d="M-128 -120 C -92 -176, 92 -176, 128 -120" fill="none" stroke="#ffffff" stroke-opacity=".18" stroke-width="3"/>
  </g>`;
}

function mouse(p) {
  return `<g transform="translate(400 396) rotate(-12)" filter="url(#${p}-sh)">
    <path d="M0 -172 C 88 -172, 124 -92, 124 18 C 124 132, 78 194, 0 194 C -78 194, -124 132, -124 18 C -124 -92, -88 -172, 0 -172 Z" fill="#e8ecf2" stroke="#c3ccd9" stroke-width="2"/>
    <path d="M0 -172 C 42 -172, 78 -140, 96 -94 L-96 -94 C -78 -140, -42 -172, 0 -172 Z" fill="#f8fafc"/>
    <path d="M0 -94 L0 194" stroke="#c3ccd9" stroke-width="1.4"/>
    <rect x="-9" y="-118" width="18" height="52" rx="9" fill="#2b3340"/>
    <rect x="-5" y="-112" width="10" height="26" rx="5" fill="#4e5a6c"/>
    <path d="M-124 20 C -70 44, 70 44, 124 20" fill="none" stroke="#ffffff" stroke-opacity=".6" stroke-width="2"/>
    <ellipse cx="0" cy="-40" rx="70" ry="36" fill="url(#${p}-sweep)" opacity=".18"/>
  </g>`;
}

function keyboard(p) {
  const keys = [];
  const rows = [14, 14, 14, 13, 11];
  rows.forEach((count, r) => {
    const totalW = 444;
    const gap = 5;
    const kw = (totalW - gap * (count - 1)) / count;
    for (let c = 0; c < count; c++) {
      const x = -222 + c * (kw + gap);
      const y = -78 + r * 38;
      const isWide = r === 4 && (c === 0 || c === count - 1);
      keys.push(`<rect x="${x}" y="${y}" width="${isWide ? kw * 1.6 : kw}" height="30" rx="6" fill="${r === 0 ? '#39424f' : '#2c333e'}" stroke="#ffffff" stroke-opacity=".07"/>`);
    }
  });
  return `<g transform="translate(400 400) rotate(-7)" filter="url(#${p}-sh)">
    <rect x="-250" y="-118" width="500" height="236" rx="24" fill="#f1f4f8" stroke="#c2ccda" stroke-width="2"/>
    <rect x="-238" y="-106" width="476" height="212" rx="18" fill="#dfe5ed"/>
    ${keys.join('')}
    <rect x="70" y="86" width="120" height="18" rx="6" fill="#c8d0da"/>
    <rect x="-250" y="-118" width="500" height="236" rx="24" fill="url(#${p}-sweep)" opacity=".22"/>
  </g>`;
}

function hub(p) {
  const ports = [0, 1, 2, 3].map((i) => `<rect x="${-86 + i * 38}" y="-9" width="26" height="18" rx="5" fill="#1a2230"/><rect x="${-80 + i * 38}" y="-3" width="14" height="5" rx="2.5" fill="#3e4a5b"/>`).join('');
  return `<g transform="translate(400 400) rotate(-8)" filter="url(#${p}-sh)">
    <rect x="-190" y="-58" width="380" height="116" rx="26" fill="#cfd6df" stroke="#ffffff" stroke-opacity=".7" stroke-width="2"/>
    <rect x="-190" y="-58" width="380" height="26" rx="13" fill="#e6ebf1"/>
    <rect x="-154" y="-14" width="302" height="42" rx="12" fill="#b6c0cc"/>
    <g transform="translate(44 7)">${ports}</g>
    <rect x="-134" y="1" width="42" height="22" rx="6" fill="#232c39"/>
    <rect x="-122" y="7" width="18" height="10" rx="4" fill="#0a0e15"/>
    <path d="M190 16 C 260 6, 268 -58, 214 -92" fill="none" stroke="#2b3340" stroke-width="10" stroke-linecap="round"/>
    <rect x="196" y="-116" width="38" height="18" rx="7" fill="#d7dde5" transform="rotate(-20 215 -107)"/>
    <text x="-60" y="-38" fill="#4a5565" font-family="Segoe UI, Arial" font-size="9" letter-spacing="3">MULTI-PORT · DEMO</text>
  </g>`;
}

function stand(p) {
  return `<g transform="translate(400 410) rotate(-4)" filter="url(#${p}-sh)">
    <path d="M-178 98 L-112 -120 L-82 -120 L-148 98 Z" fill="#cfd6df" stroke="#aeb8c5" stroke-width="2"/>
    <path d="M178 98 L112 -120 L82 -120 L148 98 Z" fill="#cfd6df" stroke="#aeb8c5" stroke-width="2"/>
    <path d="M-148 98 L148 98 L170 124 L-170 124 Z" fill="#aab5c3"/>
    <path d="M-178 98 L-148 98 L-170 124 L-202 124 Z" fill="#9ca8b7" opacity=".6"/>
    <path d="M178 98 L148 98 L170 124 L202 124 Z" fill="#9ca8b7" opacity=".6"/>
    <rect x="-146" y="-34" width="292" height="20" rx="10" fill="#e4e9ef" stroke="#b5bfcc"/>
    <rect x="-146" y="-96" width="292" height="20" rx="10" fill="#d6dde6" stroke="#b5bfcc"/>
    <rect x="-136" y="-22" width="22" height="130" rx="10" fill="#bcc6d2"/>
    <rect x="114" y="-22" width="22" height="130" rx="10" fill="#bcc6d2"/>
    <path d="M-178 -120 L178 -120" stroke="#ffffff" stroke-opacity=".5" stroke-width="2"/>
    <text x="0" y="60" text-anchor="middle" fill="#6b7686" font-family="Segoe UI, Arial" font-size="9" letter-spacing="4">ALUMINIUM · DEMO</text>
  </g>`;
}

function router(p) {
  return `<g transform="translate(400 410) rotate(-4)" filter="url(#${p}-sh)">
    <g stroke="#d6dee8" stroke-width="9" stroke-linecap="round">
      <path d="M-108 -38 L-160 -190"/>
      <path d="M-56 -48 L-82 -206"/>
      <path d="M56 -48 L82 -206"/>
      <path d="M108 -38 L160 -190"/>
    </g>
    <g fill="#eef2f7" stroke="#c3cedb" stroke-width="2">
      <rect x="-152" y="-90" width="304" height="132" rx="32" transform="rotate(-4)"/>
    </g>
    <rect x="-132" y="-64" width="264" height="80" rx="22" fill="#f9fbfd"/>
    <circle cx="-88" cy="-24" r="5" fill="#2f6bff"/>
    <circle cx="-68" cy="-24" r="5" fill="#39c98a"/>
    <circle cx="-48" cy="-24" r="5" fill="#ffc247"/>
    <text x="80" y="-18" fill="#7a8698" font-family="Segoe UI, Arial" font-size="9" letter-spacing="2">DEMO</text>
    <path d="M-152 -10 L152 -10" stroke="#dfe6ef" stroke-width="2"/>
    <path d="M-152 42 L152 42" stroke="#ffffff" stroke-opacity=".7" stroke-width="2"/>
  </g>`;
}

function bulb(p, o = {}) {
  const glow = o.glow || '#8fd2ff';
  return `<g transform="translate(400 386) rotate(-5)" filter="url(#${p}-sh)">
    <circle cx="0" cy="-56" r="150" fill="${glow}" opacity=".14" filter="url(#${p}-blur)"/>
    <path d="M0 -216 C 92 -216, 152 -142, 152 -48 C 152 32, 104 86, 68 122 L68 156 L-68 156 L-68 122 C -104 86, -152 32, -152 -48 C -152 -142, -92 -216, 0 -216 Z" fill="#eef8ff" stroke="#bcd7ea" stroke-width="2"/>
    <path d="M-104 -128 C -64 -196, 44 -200, 104 -134" fill="none" stroke="#ffffff" stroke-opacity=".9" stroke-width="5"/>
    <path d="M-86 -34 C -70 -84, -20 -110, 30 -96" fill="none" stroke="#a8e0ff" stroke-opacity=".8" stroke-width="4" stroke-linecap="round"/>
    <rect x="-70" y="156" width="140" height="26" rx="8" fill="#c8d2de"/>
    <rect x="-62" y="182" width="124" height="18" rx="6" fill="#b3bfcd"/>
    <rect x="-54" y="200" width="108" height="12" rx="6" fill="#a4b1c0"/>
    <path d="M-110 60 L110 60" stroke="#ffffff" stroke-opacity=".4" stroke-width="2"/>
    <path d="M0 -180 L0 80" stroke="#ffffff" stroke-opacity=".2"/>
  </g>`;
}

/* ------------------------------------------------------------------ */
/* Product catalogue images                                            */
/* ------------------------------------------------------------------ */

const P = (bodyA, bodyB, bodyC, accent, screen) => ({ bodyA, bodyB, bodyC, accent, screen });

const products = [
  { slug: 'galaxy-s24-ultra', type: 'phoneBack', alt: 'phoneFront', tint: '#eaeffb', accent: '#3f6dff', bodyA: '#4b5363', bodyB: '#222836', bodyC: '#3a4150', screen: ['#0a1a4d', '#3a5cff', '#65d7ff'] },
  { slug: 'iphone-15-pro-max', type: 'phoneFront', alt: 'phoneBack', tint: '#f1eeea', accent: '#b9a888', bodyA: '#b7b0a3', bodyB: '#7c766b', bodyC: '#9c9588', screen: ['#2b1838', '#b4487a', '#ff9a6b'] },
  { slug: 'iphone-15', type: 'phoneFront', alt: 'phoneBack', tint: '#edf3fa', accent: '#6aa8d8', bodyA: '#adc6dd', bodyB: '#6388a8', bodyC: '#8fb0ca', screen: ['#0b2a4a', '#1e8fc4', '#8ee6dd'] },
  { slug: 'redmi-note-13-pro', type: 'phoneBack', alt: 'phoneFront', tint: '#f0edfb', accent: '#8b6cf5', bodyA: '#8268df', bodyB: '#392a72', bodyC: '#5b46aa', screen: ['#160a3f', '#7a3cff', '#ff9ad5'] },
  { slug: 'redmi-13c', type: 'phoneBack', alt: 'phoneFront', tint: '#eaf4f0', accent: '#2f9271', bodyA: '#347a63', bodyB: '#123c30', bodyC: '#27664f', screen: ['#052a21', '#17a07a', '#b7f2d8'] },
  { slug: 'infinix-hot-50', type: 'phoneBack', alt: 'phoneFront', tint: '#eaf1fe', accent: '#2f6bff', bodyA: '#3a79ee', bodyB: '#123a85', bodyC: '#2b60c4', screen: ['#071a4f', '#2f6bff', '#7ce8ff'] },
  { slug: 'infinix-note-40', type: 'phoneBack', alt: 'phoneFront', tint: '#f3f0ea', accent: '#d1a75a', bodyA: '#3b3732', bodyB: '#0b0b0d', bodyC: '#252320', screen: ['#241503', '#b17417', '#ffd899'] },
  { slug: 'tecno-camon-30', type: 'phoneBack', alt: 'phoneFront', tint: '#edf3ef', accent: '#57a784', bodyA: '#28463a', bodyB: '#0b1713', bodyC: '#1b332a', screen: ['#04231c', '#12836a', '#8ef2c8'] },
  { slug: 'tecno-spark-20', type: 'phoneBack', alt: 'phoneFront', tint: '#eaf3fb', accent: '#3d93d6', bodyA: '#3f8fc4', bodyB: '#173e60', bodyC: '#2f719e', screen: ['#03243a', '#1d8bc4', '#8be9ff'] },
  { slug: 'galaxy-a55', type: 'phoneBack', alt: 'phoneFront', tint: '#f1eff9', accent: '#7970c9', bodyA: '#8f88cf', bodyB: '#443e78', bodyC: '#6f68b0', screen: ['#160a3a', '#6c5cff', '#ffb3e6'] },

  { slug: 'nokia-105', type: 'feature', tint: '#eef1f6', accent: '#3c7cb8', feature: { body: '#232a36', accent: '#3c7cb8' } },
  { slug: 'nokia-110', type: 'feature', tint: '#e9f0fa', accent: '#2f6bff', feature: { body: '#274b7c', accent: '#8fd0ff' } },
  { slug: 'tecno-t301', type: 'feature', tint: '#f2f1ee', accent: '#8b8f98', feature: { body: '#303339', accent: '#f0b13b' } },

  { slug: 'oraimo-freepods', type: 'earbuds', tint: '#eef3f9', accent: '#3d7bff', earbuds: { shell: '#fbfcfe', shellEdge: '#c9d2e0', bud: '#eef2f8', led: '#2f6bff' } },
  { slug: 'galaxy-buds-fe', type: 'earbuds', tint: '#eef0f5', accent: '#5b7bb5', earbuds: { shell: '#333a46', shellEdge: '#161b23', bud: '#222833', budFace: '#0c1016', led: '#62a8ff' } },
  { slug: 'soundcore-buds', type: 'earbuds', tint: '#eaf1fa', accent: '#2f5fd6', earbuds: { shell: '#1e335c', shellEdge: '#0c1730', bud: '#1a2a4a', budFace: '#060b14', led: '#57a0ff' } },
  { slug: 'oraimo-headphones', type: 'headphones', tint: '#f0f1f4', accent: '#3b7bff', headphones: { body: '#2a303c', cushion: '#11151f', accent: '#3b7bff' } },

  { slug: 'oraimo-powerbank', type: 'power', tint: '#edf1f7', accent: '#3b7bff', power: { body: '#232a34', accent: '#3b7bff', capacity: '20K' } },
  { slug: 'anker-powerbank', type: 'power', tint: '#eef4f6', accent: '#37c2b0', power: { body: '#1c2530', accent: '#39d0b8', capacity: '20K' } },
  { slug: 'xiaomi-powerbank', type: 'power', tint: '#f1f2f4', accent: '#6a7688', power: { body: '#c9d0d8', accent: '#2d3540', capacity: '10K' } },

  { slug: 'anker-charger-30w', type: 'charger', tint: '#edf3fb', accent: '#2f6bff', charger: { body: '#f9fbfd', edge: '#c9d3e2', accent: '#2f6bff', label: '30W' } },
  { slug: 'oraimo-charger-33w', type: 'charger', tint: '#edf1fa', accent: '#3f7bff', charger: { body: '#f4f8ff', edge: '#bccbe2', accent: '#3f7bff', label: '33W', cable: '#2a3240' } },
  { slug: 'samsung-charger-25w', type: 'charger', tint: '#eff1f4', accent: '#7a8698', charger: { body: '#2a303b', edge: '#0f141c', accent: '#9fc4ff', label: '25W', cable: '#0f141c' } },
  { slug: 'usbc-cable', type: 'cable', tint: '#eff2f6', accent: '#3b7bff', cable: { cord: '#242b37' } },

  { slug: 'clear-case', type: 'case', tint: '#edf3fb', accent: '#6aa6ff', case: { tint: '#b9d4ff', edge: '#9cbde9' } },
  { slug: 'tempered-glass', type: 'glass', tint: '#edf3fb', accent: '#78aaff' },
  { slug: 'rugged-case', type: 'case', tint: '#edf0f5', accent: '#405a86', case: { tint: '#5d7396', edge: '#304463' } },

  { slug: 'galaxy-watch-fe', type: 'watch', tint: '#eef1f7', accent: '#48b9ff', watch: { strap: '#222834', caseCol: '#2f3643', accent: '#48b9ff' } },
  { slug: 'oraimo-watch', type: 'watch', tint: '#edf4ef', accent: '#42d68f', watch: { strap: '#1f3a30', caseCol: '#263f35', accent: '#48e59c' } },
  { slug: 'redmi-watch', type: 'watch', tint: '#f1f2f4', accent: '#ff9f5a', watch: { strap: '#c7ced8', caseCol: '#aab3c0', accent: '#ff9f5a' } },

  { slug: 'jbl-go4', type: 'speaker', tint: '#eaf2fb', accent: '#2f6bff', speaker: { body: '#1c3f77', accent: '#4f9bff' } },
  { slug: 'oraimo-speaker', type: 'speaker', tint: '#f1f1f3', accent: '#ff7a3d', speaker: { body: '#24262c', accent: '#ff7a3d' } },

  { slug: 'logitech-mouse', type: 'mouse', tint: '#f0f2f5', accent: '#5c6a7e' },
  { slug: 'hp-keyboard', type: 'keyboard', tint: '#eef2f7', accent: '#4a5768' },
  { slug: 'usbc-hub', type: 'hub', tint: '#eff2f6', accent: '#4a5768' },
  { slug: 'laptop-stand', type: 'stand', tint: '#eff2f6', accent: '#4a5768' },

  { slug: 'wifi-router', type: 'router', tint: '#edf4fa', accent: '#2f6bff' },
  { slug: 'smart-bulb', type: 'bulb', tint: '#eff4fa', accent: '#66bfff', bulb: { glow: '#8fd2ff' } },
];

function renderProduct(spec) {
  const p = `a${spec.slug.replace(/[^a-z0-9]/g, '')}`;
  const accent = spec.accent || '#3470ff';
  const tint = spec.tint || '#eef2fa';
  const stageMarkup = stage(p, accent, tint, 705);
  const defs = commonDefs(p, accent, tint) + phoneDefs(p, spec);
  let art = '';

  switch (spec.type) {
    case 'phoneBack':
      art = phoneBack(p, 400, 390, -9, 1, 300, 610); break;
    case 'phoneFront':
      art = phoneFront(p, 400, 390, -9, 1, 300, 610); break;
    case 'feature':
      art = featurePhone(p, 400, 396, -7, 1, spec.feature.body, spec.feature.accent); break;
    case 'earbuds':
      art = earbuds(p, spec.earbuds); break;
    case 'headphones':
      art = headphones(p, spec.headphones); break;
    case 'power':
      art = powerBank(p, spec.power); break;
    case 'charger':
      art = charger(p, spec.charger); break;
    case 'cable':
      art = cable(p, spec.cable); break;
    case 'case':
      art = phoneCase(p, spec.case); break;
    case 'glass':
      art = screenGlass(p); break;
    case 'watch':
      art = watch(p, spec.watch); break;
    case 'speaker':
      art = speaker(p, spec.speaker); break;
    case 'mouse':
      art = mouse(p); break;
    case 'keyboard':
      art = keyboard(p); break;
    case 'hub':
      art = hub(p); break;
    case 'stand':
      art = stand(p); break;
    case 'router':
      art = router(p); break;
    case 'bulb':
      art = bulb(p, spec.bulb); break;
    default:
      art = '';
  }

  fs.writeFileSync(
    path.join(OUT, `${spec.slug}.svg`),
    svgDoc(`${defs}\n${stageMarkup}\n${art}`, 800, 800, 'Illustrative product render — demonstration catalogue'),
    'utf8'
  );

  if (spec.alt) {
    const p2 = `${p}alt`;
    const altTint = spec.tint || '#eef2fa';
    const altDefs = commonDefs(p2, accent, altTint) + phoneDefs(p2, spec);
    const altStage = stage(p2, accent, altTint, 705);
    const altArt = spec.alt === 'phoneFront'
      ? phoneFront(p2, 400, 390, 8, 1, 300, 610)
      : phoneBack(p2, 400, 390, 8, 1, 300, 610);
    fs.writeFileSync(
      path.join(OUT, `${spec.slug}-alt.svg`),
      svgDoc(`${altDefs}\n${altStage}\n${altArt}`, 800, 800, 'Illustrative product render — alternate view'),
      'utf8'
    );
  }
}

products.forEach(renderProduct);

/* ------------------------------------------------------------------ */
/* Hero composition                                                    */
/* ------------------------------------------------------------------ */

function buildHero() {
  const p = 'hero';
  const accent = '#3b7bff';
  const phoneA = { bodyA: '#4b5363', bodyB: '#1c2230', bodyC: '#3a4150', screen: ['#0a1a4d', '#3a5cff', '#65d7ff'] };
  const phoneB = { bodyA: '#c9c2b4', bodyB: '#7c766b', bodyC: '#a8a195', screen: ['#241436', '#a3487f', '#ffa36f'] };
  const defs = `<defs>
    <radialGradient id="hero-glow" cx="50%" cy="50%" r="50%">
      <stop offset="0" stop-color="#3b7bff" stop-opacity=".5"/>
      <stop offset=".55" stop-color="#1f4fd8" stop-opacity=".14"/>
      <stop offset="1" stop-color="#081226" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="hero-ring" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#9dc4ff" stop-opacity=".55"/>
      <stop offset=".5" stop-color="#9dc4ff" stop-opacity=".06"/>
      <stop offset="1" stop-color="#9dc4ff" stop-opacity=".3"/>
    </linearGradient>
    <filter id="hero-blur"><feGaussianBlur stdDeviation="34"/></filter>
    <filter id="hero-sh" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="0" dy="40" stdDeviation="40" flood-color="#02060f" flood-opacity=".65"/>
    </filter>
    <filter id="hero-sh-soft" x="-60%" y="-60%" width="220%" height="220%">
      <feDropShadow dx="0" dy="18" stdDeviation="24" flood-color="#02060f" flood-opacity=".45"/>
    </filter>
    <linearGradient id="hero-body-a" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#5a6478"/><stop offset=".45" stop-color="#242c3c"/><stop offset=".7" stop-color="#3d4658"/><stop offset="1" stop-color="#151b27"/>
    </linearGradient>
    <linearGradient id="hero-body-b" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#c9c2b4"/><stop offset=".5" stop-color="#817b70"/><stop offset="1" stop-color="#b4ad9f"/>
    </linearGradient>
    <linearGradient id="hero-screen" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#081445"/><stop offset=".45" stop-color="#3b63ff"/><stop offset="1" stop-color="#6fe8ff"/>
    </linearGradient>
    <radialGradient id="hero-sglow" cx="30%" cy="20%" r="80%">
      <stop offset="0" stop-color="#b7f4ff" stop-opacity=".95"/>
      <stop offset=".45" stop-color="#3f7dff" stop-opacity=".3"/>
      <stop offset="1" stop-color="#050a1c" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="hero-sweep" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#fff" stop-opacity="0"/>
      <stop offset=".45" stop-color="#fff" stop-opacity=".45"/>
      <stop offset=".6" stop-color="#fff" stop-opacity=".1"/>
      <stop offset="1" stop-color="#fff" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="hero-case" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#fdfeff"/><stop offset=".6" stop-color="#dfe6f2"/><stop offset="1" stop-color="#b9c5d8"/>
    </linearGradient>
    <clipPath id="hero-scr"><rect x="-146" y="-316" width="292" height="632" rx="44"/></clipPath>
    <linearGradient id="hero-lens" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#3f4a5e"/><stop offset=".5" stop-color="#10151f"/><stop offset="1" stop-color="#03050a"/>
    </linearGradient>
  </defs>`;

  const backPhone = `<g transform="translate(430 610) rotate(13) scale(1.1)" filter="url(#hero-sh)">
    <rect x="-164" y="-342" width="328" height="684" rx="54" fill="url(#hero-body-b)" stroke="#ffffff" stroke-opacity=".35"/>
    <rect x="2" y="-340" width="162" height="680" rx="52" fill="#000" opacity=".2"/>
    <rect x="-146" y="-314" width="152" height="192" rx="42" fill="#161c27" stroke="#fff" stroke-opacity=".14"/>
    <g>
      <circle cx="-104" cy="-270" r="30" fill="#05080e" stroke="#5c6474" stroke-width="2"/><circle cx="-104" cy="-270" r="20" fill="url(#hero-lens)"/><circle cx="-113" cy="-279" r="7" fill="#8fd0ff" opacity=".6"/>
      <circle cx="-104" cy="-198" r="30" fill="#05080e" stroke="#5c6474" stroke-width="2"/><circle cx="-104" cy="-198" r="20" fill="url(#hero-lens)"/><circle cx="-113" cy="-207" r="7" fill="#ffd7a1" opacity=".5"/>
      <circle cx="-38" cy="-234" r="25" fill="#05080e" stroke="#5c6474" stroke-width="2"/><circle cx="-38" cy="-234" r="16" fill="url(#hero-lens)"/>
      <circle cx="-38" cy="-290" r="9" fill="#fff7dd"/><circle cx="-38" cy="-290" r="4" fill="#fff"/>
    </g>
    <path d="M-164 60 L164 -120 L164 -40 L-164 150 Z" fill="#ffffff" opacity=".07"/>
    <text x="-164" y="300" fill="#ffffff" fill-opacity=".16" font-family="Segoe UI, Arial" font-size="11" letter-spacing="5">DAIMA · CONCEPT</text>
  </g>`;

  const frontPhone = `<g transform="translate(612 640) rotate(-7) scale(1.28)" filter="url(#hero-sh)">
    <rect x="-160" y="-330" width="320" height="660" rx="56" fill="url(#hero-body-a)" stroke="#ffffff" stroke-opacity=".55" stroke-width="2"/>
    <rect x="-153" y="-323" width="306" height="646" rx="49" fill="#04060b"/>
    <rect x="-146" y="-316" width="292" height="632" rx="44" fill="url(#hero-screen)"/>
    <g clip-path="url(#hero-scr)">
      <rect x="-146" y="-316" width="292" height="632" fill="url(#hero-screen)"/>
      <ellipse cx="-60" cy="-150" rx="230" ry="250" fill="url(#hero-sglow)"/>
      <ellipse cx="150" cy="120" rx="200" ry="250" fill="#ff5fa2" opacity=".38" filter="url(#hero-blur)"/>
      <ellipse cx="-130" cy="300" rx="180" ry="220" fill="#00e5c3" opacity=".26" filter="url(#hero-blur)"/>
      <path d="M-200 60 C -30 -80, 80 120, 220 -40" fill="none" stroke="#ffffff" stroke-opacity=".28" stroke-width="1.5"/>
      <path d="M-200 130 C -30 -10, 80 190, 220 30" fill="none" stroke="#b7f4ff" stroke-opacity=".22" stroke-width="1"/>
      <path d="M-200 200 C -30 60, 80 260, 220 100" fill="none" stroke="#ffffff" stroke-opacity=".1" stroke-width="1"/>
      <circle cx="30" cy="230" r="130" fill="#071232" opacity=".45" filter="url(#hero-blur)"/>
      <path d="M-146 -40 C 10 -146, 150 -50, 146 120" fill="none" stroke="#ffffff" stroke-opacity=".16" stroke-width="34" filter="url(#hero-blur)"/>
      <rect x="-146" y="-316" width="292" height="632" fill="url(#hero-sweep)" opacity=".13"/>
    </g>
    <circle cx="0" cy="-306" r="7" fill="#020306"/>
    <text x="-112" y="-288" fill="#ffffff" fill-opacity=".94" font-family="Segoe UI, Arial" font-size="15" font-weight="600">9:41</text>
    <g fill="#ffffff" fill-opacity=".8">
      <rect x="46" y="-300" width="3" height="8" rx="1"/><rect x="52" y="-303" width="3" height="11" rx="1"/><rect x="58" y="-306" width="3" height="14" rx="1"/><rect x="64" y="-309" width="3" height="17" rx="1"/>
      <rect x="78" y="-306" width="20" height="11" rx="3" fill="none" stroke="#fff" stroke-opacity=".6"/><rect x="80" y="-304" width="13" height="7" rx="2"/>
    </g>
    <rect x="-48" y="298" width="96" height="5" rx="2.5" fill="#ffffff" opacity=".7"/>
    <rect x="-165" y="-90" width="4" height="96" rx="2" fill="#ffffff" opacity=".42"/>
    <rect x="-165" y="-190" width="4" height="48" rx="2" fill="#ffffff" opacity=".3"/>
    <rect x="161" y="-130" width="4" height="110" rx="2" fill="#ffffff" opacity=".35"/>
  </g>`;

  const buds = `<g transform="translate(258 1030) rotate(-10) scale(.84)" filter="url(#hero-sh-soft)">
    <g transform="translate(0 78)">
      <rect x="-138" y="-70" width="276" height="204" rx="76" fill="url(#hero-case)" stroke="#ffffff" stroke-opacity=".75"/>
      <path d="M-138 -16 Q 0 18 138 -16" fill="none" stroke="#9fadc2" stroke-width="2.5"/>
      <path d="M-136 -24 Q 0 10 136 -24" fill="none" stroke="#ffffff" stroke-width="2" opacity=".8"/>
      <circle cx="0" cy="78" r="6" fill="#4f9bff"/><circle cx="0" cy="78" r="16" fill="#4f9bff" opacity=".18"/>
    </g>
    <g transform="translate(-96 -150) rotate(-16)">
      <ellipse cx="0" cy="0" rx="34" ry="38" fill="#fafcff" stroke="#c3cddc" stroke-width="1.5"/>
      <path d="M-7 24 C -12 58, -14 82, -14 104 C -14 116, 14 116, 14 104 C 14 82, 12 58, 7 24 Z" fill="#fafcff" stroke="#c3cddc" stroke-width="1.5"/>
      <ellipse cx="0" cy="-4" rx="20" ry="23" fill="#232a36"/>
      <ellipse cx="0" cy="-4" rx="12" ry="15" fill="#0a0f18"/>
      <circle cx="-10" cy="-20" r="5" fill="#fff" opacity=".45"/>
      <rect x="-5" y="94" width="10" height="4" rx="2" fill="#4f9bff" opacity=".7"/>
    </g>
    <g transform="translate(96 -150) rotate(16)">
      <ellipse cx="0" cy="0" rx="34" ry="38" fill="#fafcff" stroke="#c3cddc" stroke-width="1.5"/>
      <path d="M-7 24 C -12 58, -14 82, -14 104 C -14 116, 14 116, 14 104 C 14 82, 12 58, 7 24 Z" fill="#fafcff" stroke="#c3cddc" stroke-width="1.5"/>
      <ellipse cx="0" cy="-4" rx="20" ry="23" fill="#232a36"/>
      <ellipse cx="0" cy="-4" rx="12" ry="15" fill="#0a0f18"/>
      <circle cx="-10" cy="-20" r="5" fill="#fff" opacity=".45"/>
      <rect x="-5" y="94" width="10" height="4" rx="2" fill="#4f9bff" opacity=".7"/>
    </g>
    <ellipse cx="-96" cy="6" rx="50" ry="11" fill="#02060f" opacity=".25" filter="url(#hero-blur-s)"/>
    <ellipse cx="96" cy="6" rx="50" ry="11" fill="#02060f" opacity=".25" filter="url(#hero-blur-s)"/>
  </g>`;

  const watchArt = `<g transform="translate(892 985) rotate(14) scale(.62)" filter="url(#hero-sh-soft)">
    <rect x="-62" y="-300" width="124" height="600" rx="58" fill="#202633"/>
    <rect x="-118" y="-152" width="236" height="288" rx="72" fill="#2c3441" stroke="#ffffff" stroke-opacity=".3" stroke-width="2"/>
    <rect x="-104" y="-138" width="208" height="260" rx="60" fill="#05080e"/>
    <circle cx="0" cy="-8" r="82" fill="none" stroke="#48b9ff" stroke-opacity=".35" stroke-width="2"/>
    <circle cx="0" cy="-8" r="66" fill="none" stroke="#48b9ff" stroke-opacity=".2" stroke-width="10"/>
    <path d="M0 -90 A82 82 0 0 1 72 24" fill="none" stroke="#48b9ff" stroke-width="7" stroke-linecap="round"/>
    <text x="0" y="4" text-anchor="middle" fill="#fff" font-family="Segoe UI, Arial" font-size="38" font-weight="600">9:41</text>
    <text x="0" y="34" text-anchor="middle" fill="#48b9ff" font-family="Segoe UI, Arial" font-size="10" letter-spacing="2">DEMO</text>
  </g>`;

  const particles = `
    <circle cx="180" cy="280" r="3" fill="#9dc4ff" opacity=".55"/>
    <circle cx="960" cy="330" r="2.5" fill="#9dc4ff" opacity=".4"/>
    <circle cx="1010" cy="640" r="4" fill="#6fe8ff" opacity=".35"/>
    <circle cx="120" cy="760" r="2" fill="#ffffff" opacity=".3"/>
    <circle cx="760" cy="1030" r="3" fill="#9dc4ff" opacity=".3"/>
    <circle cx="1050" cy="900" r="2" fill="#ffffff" opacity=".3"/>`;

  const body = `<defs>${defs.replace('<defs>', '').replace('</defs>', '')}</defs>
  <circle cx="560" cy="650" r="520" fill="url(#hero-glow)"/>
  <circle cx="560" cy="650" r="470" fill="none" stroke="url(#hero-ring)" stroke-width="1.2" opacity=".55"/>
  <circle cx="560" cy="650" r="600" fill="none" stroke="#9dc4ff" stroke-opacity=".08"/>
  <path d="M60 1180 C 300 980, 760 1120, 1060 820" fill="none" stroke="#9dc4ff" stroke-opacity=".07" stroke-width="1"/>
  ${backPhone}
  ${frontPhone}
  ${buds}
  ${watchArt}
  ${particles}`;

  fs.writeFileSync(path.join(OUT, 'hero-composition.svg'), svgDoc(body, 1120, 1300, 'Illustrative smartphone and accessories composition'), 'utf8');
}

buildHero();

/* ------------------------------------------------------------------ */
/* Branch concept visuals                                              */
/* ------------------------------------------------------------------ */

function branchScene(slug, opts) {
  const p = slug;
  const skyTop = opts.skyTop, skyMid = opts.skyMid, skyLow = opts.skyLow;
  const sun = opts.sun, hill1 = opts.hill1, hill2 = opts.hill2, ground = opts.ground;
  const warm = opts.warm, tree = opts.tree, tag = opts.tag;
  const body = `<defs>
    <linearGradient id="${p}-sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${skyTop}"/><stop offset=".55" stop-color="${skyMid}"/><stop offset="1" stop-color="${skyLow}"/>
    </linearGradient>
    <radialGradient id="${p}-sun" cx="50%" cy="50%" r="50%">
      <stop offset="0" stop-color="${sun}" stop-opacity=".95"/>
      <stop offset=".22" stop-color="${sun}" stop-opacity=".55"/>
      <stop offset="1" stop-color="${sun}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="${p}-glass" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#0b1424" stop-opacity=".92"/>
      <stop offset=".35" stop-color="#13233c" stop-opacity=".8"/>
      <stop offset="1" stop-color="#2e3b4a" stop-opacity=".65"/>
    </linearGradient>
    <linearGradient id="${p}-warm" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${warm}" stop-opacity=".95"/>
      <stop offset=".6" stop-color="${warm}" stop-opacity=".55"/>
      <stop offset="1" stop-color="${warm}" stop-opacity=".08"/>
    </linearGradient>
    <linearGradient id="${p}-floor" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${ground}"/><stop offset="1" stop-color="#0a0f18"/>
    </linearGradient>
    <linearGradient id="${p}-sign" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#111a2b"/><stop offset=".5" stop-color="#1b2740"/><stop offset="1" stop-color="#111a2b"/>
    </linearGradient>
    <filter id="${p}-blur"><feGaussianBlur stdDeviation="28"/></filter>
    <filter id="${p}-blur-s"><feGaussianBlur stdDeviation="8"/></filter>
    <filter id="${p}-soft" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="18" stdDeviation="24" flood-color="#03070f" flood-opacity=".55"/></filter>
    <radialGradient id="${p}-vig" cx="50%" cy="48%" r="72%">
      <stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".5"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="800" fill="url(#${p}-sky)"/>
  <circle cx="${opts.sunX}" cy="${opts.sunY}" r="300" fill="url(#${p}-sun)"/>
  <circle cx="${opts.sunX}" cy="${opts.sunY}" r="58" fill="${sun}" opacity=".75"/>
  <path d="M0 ${opts.hillY} C 180 ${opts.hillY - 90}, 330 ${opts.hillY - 40}, 520 ${opts.hillY - 8} C 720 ${opts.hillY + 30}, 900 ${opts.hillY - 60}, 1200 ${opts.hillY + 10} L1200 560 L0 560 Z" fill="${hill2}" opacity=".8"/>
  <path d="M0 ${opts.hillY + 60} C 220 ${opts.hillY - 20}, 430 ${opts.hillY + 70}, 620 ${opts.hillY + 30} C 860 ${opts.hillY - 20}, 1010 ${opts.hillY + 50}, 1200 ${opts.hillY + 20} L1200 620 L0 620 Z" fill="${hill1}"/>
  <rect y="560" width="1200" height="240" fill="url(#${p}-floor)"/>
  <path d="M0 620 C 240 596, 380 640, 620 620 C 840 602, 1020 640, 1200 612 L1200 800 L0 800 Z" fill="#0b111c" opacity=".55"/>
  <g filter="url(#${p}-soft)">
    <rect x="176" y="268" width="848" height="296" rx="4" fill="#1a2232"/>
    <rect x="176" y="268" width="848" height="46" fill="url(#${p}-sign)"/>
    <text x="600" y="298" text-anchor="middle" fill="#eef4ff" font-family="Segoe UI, Arial" font-size="23" font-weight="700" letter-spacing="8">DAIMA</text>
    <text x="600" y="309" text-anchor="middle" fill="#7fa6e0" font-family="Segoe UI, Arial" font-size="5.5" letter-spacing="5">COMMUNICATIONS · CONCEPT</text>
    <rect x="160" y="308" width="880" height="10" fill="#0d1420"/>
    <rect x="160" y="308" width="880" height="3" fill="${opts.accent}" opacity=".8"/>
    <rect x="196" y="330" width="808" height="218" fill="url(#${p}-glass)"/>
    <g>
      <rect x="210" y="344" width="112" height="190" fill="${warm}" opacity=".18"/>
      <rect x="338" y="344" width="112" height="190" fill="${warm}" opacity=".13"/>
      <rect x="466" y="344" width="112" height="190" fill="${warm}" opacity=".17"/>
      <rect x="594" y="344" width="112" height="190" fill="${warm}" opacity=".12"/>
      <rect x="722" y="344" width="112" height="190" fill="${warm}" opacity=".16"/>
      <rect x="850" y="344" width="140" height="190" fill="${warm}" opacity=".1"/>
    </g>
    <g opacity=".9">
      <rect x="252" y="410" width="260" height="6" fill="#dfe9f7" opacity=".18"/>
      <rect x="252" y="456" width="260" height="6" fill="#dfe9f7" opacity=".14"/>
      <rect x="252" y="502" width="260" height="6" fill="#dfe9f7" opacity=".12"/>
      <g fill="#cfe0f9" opacity=".4">
        <rect x="258" y="382" width="12" height="22" rx="2"/><rect x="278" y="378" width="14" height="26" rx="2"/><rect x="300" y="384" width="12" height="20" rx="2"/>
        <rect x="330" y="380" width="16" height="24" rx="2"/><rect x="354" y="385" width="10" height="19" rx="2"/><rect x="372" y="377" width="18" height="27" rx="2"/>
        <rect x="258" y="428" width="14" height="24" rx="2"/><rect x="280" y="424" width="12" height="28" rx="2"/>
        <rect x="304" y="430" width="16" height="22" rx="2"/><rect x="330" y="426" width="12" height="26" rx="2"/>
        <rect x="352" y="432" width="18" height="20" rx="2"/><rect x="378" y="425" width="10" height="27" rx="2"/>
      </g>
    </g>
    <g opacity=".85">
      <rect x="812" y="382" width="118" height="126" rx="4" fill="#0b1420" opacity=".55"/>
      <rect x="826" y="396" width="42" height="62" rx="3" fill="#dce9f8" opacity=".22"/>
      <rect x="878" y="396" width="38" height="62" rx="3" fill="#dce9f8" opacity=".16"/>
      <text x="870" y="486" text-anchor="middle" fill="#e6f0ff" opacity=".55" font-family="Segoe UI, Arial" font-size="7" letter-spacing="2">DEMO CATALOGUE</text>
    </g>
    <g>
      <rect x="600" y="438" width="86" height="110" rx="3" fill="#0a111c" opacity=".8"/>
      <rect x="606" y="444" width="74" height="98" fill="${warm}" opacity=".12"/>
      <rect x="640" y="464" width="3" height="16" fill="${warm}" opacity=".6"/>
      <rect x="636" y="516" width="14" height="32" fill="#dce9f8" opacity=".18"/>
      <circle cx="643" cy="464" r="5" fill="#dce9f8" opacity=".18"/>
    </g>
    <g opacity=".55" fill="#e9f2ff">
      <ellipse cx="470" cy="512" rx="12" ry="27" opacity=".28"/>
      <circle cx="470" cy="470" r="10" opacity=".32"/>
      <ellipse cx="548" cy="514" rx="11" ry="25" opacity=".22"/>
      <circle cx="548" cy="474" r="9" opacity=".26"/>
    </g>
    <g>
      <rect x="210" y="330" width="4" height="218" fill="#8ba0b8" opacity=".3"/>
      <rect x="332" y="330" width="3" height="218" fill="#8ba0b8" opacity=".25"/>
      <rect x="460" y="330" width="3" height="218" fill="#8ba0b8" opacity=".25"/>
      <rect x="588" y="330" width="3" height="218" fill="#8ba0b8" opacity=".25"/>
      <rect x="716" y="330" width="3" height="218" fill="#8ba0b8" opacity=".25"/>
      <rect x="844" y="330" width="3" height="218" fill="#8ba0b8" opacity=".25"/>
      <rect x="986" y="330" width="4" height="218" fill="#8ba0b8" opacity=".3"/>
    </g>
    <rect x="196" y="536" width="808" height="12" fill="#0d1420"/>
    <rect x="176" y="548" width="848" height="16" fill="#141c2a"/>
  </g>
  <g opacity=".55">
    <path d="M320 564 L520 800 L780 800 L520 564 Z" fill="${warm}" opacity=".2" filter="url(#${p}-blur)"/>
    <rect x="600" y="564" width="86" height="8" fill="${warm}" opacity=".3"/>
  </g>
  <g fill="${tree}" opacity=".9">
    <path d="M112 600 L120 430 L128 600 Z"/>
    <path d="M120 470 C 60 450, 42 400, 76 390 C 84 350, 148 344, 166 386 C 206 382, 210 432, 168 448 C 158 470, 132 480, 120 470 Z"/>
    <path d="M1058 610 L1066 460 L1074 610 Z"/>
    <path d="M1066 500 C 1012 486, 1000 442, 1034 432 C 1046 398, 1100 398, 1112 436 C 1146 442, 1142 488, 1098 496 C 1088 512, 1072 512, 1066 500 Z"/>
  </g>
  <g opacity=".35" fill="${tree}">
    <path d="M980 600 L986 520 L992 600 Z"/>
    <path d="M986 548 C 950 540, 944 512, 966 508 C 972 486, 1008 488, 1012 510 C 1034 516, 1028 544, 1000 548 Z"/>
  </g>
  <g opacity=".22" stroke="${opts.accent}" stroke-width="1">
    <path d="M176 330 L1024 330"/>
  </g>
  <rect width="1200" height="800" fill="url(#${p}-vig)"/>
  <g opacity=".55">
    <circle cx="1030" cy="180" r="3" fill="#fff" opacity=".5"/>
    <circle cx="220" cy="150" r="2" fill="#fff" opacity=".35"/>
    <circle cx="880" cy="130" r="2.4" fill="#fff" opacity=".3"/>
  </g>
  <text x="1184" y="782" text-anchor="end" fill="#ffffff" fill-opacity=".42" font-family="Segoe UI, Arial" font-size="10" letter-spacing="3">CONCEPT VISUAL — NOT AN ACTUAL BRANCH PHOTOGRAPH</text>`;

  fs.writeFileSync(path.join(OUT, `${slug}.svg`), svgDoc(body, 1200, 800, 'Concept visual of the proposed Daima Communications storefront'), 'utf8');
}

branchScene('branch-sirare', {
  skyTop: '#0b1a38', skyMid: '#2a466e', skyLow: '#d9865a',
  sun: '#ffb36c', sunX: 930, sunY: 230, hillY: 400,
  hill1: '#182a3c', hill2: '#243b50', ground: '#16202b',
  warm: '#ffcf94', tree: '#0d1722', accent: '#5fa8ff',
});
branchScene('branch-kehancha', {
  skyTop: '#081a2c', skyMid: '#12405e', skyLow: '#4e857e',
  sun: '#c9f2d8', sunX: 990, sunY: 190, hillY: 380,
  hill1: '#102a2a', hill2: '#1c3d38', ground: '#131f22',
  warm: '#d8f0cf', tree: '#0a1717', accent: '#63e0bd',
});

/* ------------------------------------------------------------------ */
/* Social card + favicon                                               */
/* ------------------------------------------------------------------ */

function socialCard() {
  const body = `<defs>
    <linearGradient id="sc-bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#070c18"/><stop offset=".6" stop-color="#0b1428"/><stop offset="1" stop-color="#0e1b36"/>
    </linearGradient>
    <radialGradient id="sc-glow" cx="50%" cy="50%" r="50%">
      <stop offset="0" stop-color="#2f6bff" stop-opacity=".45"/><stop offset="1" stop-color="#2f6bff" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="sc-phone" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#4b5363"/><stop offset=".5" stop-color="#1b2230"/><stop offset="1" stop-color="#3a4150"/>
    </linearGradient>
    <linearGradient id="sc-scr" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0a1a4d"/><stop offset=".5" stop-color="#3762ff"/><stop offset="1" stop-color="#6fe8ff"/>
    </linearGradient>
    <filter id="sc-sh"><feDropShadow dx="0" dy="22" stdDeviation="30" flood-color="#000" flood-opacity=".6"/></filter>
  </defs>
  <rect width="1200" height="630" fill="url(#sc-bg)"/>
  <circle cx="980" cy="300" r="430" fill="url(#sc-glow)"/>
  <circle cx="980" cy="300" r="300" fill="none" stroke="#7fa6ff" stroke-opacity=".15"/>
  <text x="80" y="112" fill="#ffffff" font-family="Segoe UI, Arial" font-size="30" font-weight="700" letter-spacing="5">DAIMA</text>
  <text x="80" y="136" fill="#7fa6e0" font-family="Segoe UI, Arial" font-size="11" letter-spacing="6">COMMUNICATIONS</text>
  <rect x="80" y="170" width="48" height="4" fill="#3b7bff"/>
  <text x="80" y="280" fill="#ffffff" font-family="Segoe UI, Arial" font-size="62" font-weight="700" letter-spacing="-1">Technology that</text>
  <text x="80" y="350" fill="#ffffff" font-family="Segoe UI, Arial" font-size="62" font-weight="700" letter-spacing="-1">moves with you.</text>
  <text x="80" y="410" fill="#b7c5dc" font-family="Segoe UI, Arial" font-size="21">Smartphones · Accessories · Everyday technology</text>
  <text x="80" y="442" fill="#7fa6e0" font-family="Segoe UI, Arial" font-size="17">Sirare &amp; Kehancha · Migori County, Kenya</text>
  <rect x="80" y="500" width="238" height="52" rx="26" fill="#2f6bff"/>
  <text x="199" y="532" text-anchor="middle" fill="#ffffff" font-family="Segoe UI, Arial" font-size="15" font-weight="600">Website concept · 2026</text>
  <text x="80" y="592" fill="#5f7597" font-family="Segoe UI, Arial" font-size="12">Concept &amp; development by Thomas Hondo Chacha · Illustrative product render</text>
  <g transform="translate(965 330) rotate(-8)" filter="url(#sc-sh)">
    <rect x="-150" y="-280" width="300" height="560" rx="50" fill="url(#sc-phone)" stroke="#fff" stroke-opacity=".35" stroke-width="2"/>
    <rect x="-136" y="-266" width="272" height="532" rx="40" fill="url(#sc-scr)"/>
    <ellipse cx="-20" cy="-80" rx="180" ry="220" fill="#8fd8ff" opacity=".25" filter="url(#sc-sh)"/>
    <circle cx="0" cy="-236" r="7" fill="#020306"/>
    <rect x="-40" y="222" width="80" height="4" rx="2" fill="#fff" opacity=".65"/>
  </g>
</svg>`;
  fs.writeFileSync(path.join(OUT, 'social-card.svg'), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630" role="img" aria-label="Daima Communications concept social card">${body}</svg>`, 'utf8');
}
socialCard();

function favicon() {
  const body = `<defs><linearGradient id="f" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3f7cff"/><stop offset="1" stop-color="#1747c4"/></linearGradient></defs>
  <rect width="64" height="64" rx="16" fill="#070c18"/>
  <path d="M18 44V20h13c8.3 0 14 4.8 14 12s-5.7 12-14 12H18Zm8-7h5c3.9 0 6.3-2 6.3-5s-2.4-5-6.3-5h-5v10Z" fill="url(#f)"/>
  <circle cx="49" cy="17" r="3" fill="#6fe8ff"/>`;
  fs.writeFileSync(path.join(OUT, 'favicon.svg'), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">${body}</svg>`, 'utf8');
}
favicon();

console.log(`Generated ${products.length} product renders (+${products.filter((x) => x.alt).length} alternate views), hero, 2 branch concepts, social card and favicon.`);
