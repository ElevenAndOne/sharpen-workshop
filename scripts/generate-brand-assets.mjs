/**
 * Generate the favicon set and the Open Graph share card.
 *
 * Both were stock Astro before this: the page shipped the framework's default
 * rocket favicon, and it declared `twitter:card=summary_large_image` while
 * supplying no image at all — so every share on WhatsApp, LinkedIn, Facebook
 * and iMessage rendered as a bare grey link.
 *
 * Nothing here is drawn by hand. The icon glyph is lifted straight out of the
 * client's own SHARPEN wordmark — the "A" whose crossbar is a chef's knife,
 * the most distinctive shape the brand owns and one of the few that survives
 * being shrunk to 16px. The share card reuses the hero's photograph, scrim
 * geometry and lower-left composition, so the card and the first screen are
 * recognisably the same page. Re-run after any brand asset changes:
 *
 *   node scripts/generate-brand-assets.mjs
 *
 * Text on the card is set in Mulish, the brand face. librsvg renders SVG text
 * with system fonts and Mulish is only present here as woff2 inside
 * node_modules, which fontconfig cannot read — so the script provisions the
 * upstream variable TTF into a cache under node_modules and points a scoped
 * fontconfig at it. Nothing is installed into the system font path.
 */
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PUB = path.join(ROOT, 'public');

const RED = '#c73935'; // --color-brand
const INK = '#161616'; // --color-gray-950

/* ------------------------------------------------------------------ fonts */

const FONT_DIR = path.join(ROOT, 'node_modules/.cache/sharpen-fonts');
const FONT_TTF = path.join(FONT_DIR, 'Mulish.ttf');
const FONT_URL =
  'https://github.com/google/fonts/raw/main/ofl/mulish/Mulish%5Bwght%5D.ttf';

/**
 * Must run before the first SVG render — fontconfig reads its config once, on
 * first use, and sharp initialises librsvg lazily.
 */
async function provisionFont() {
  fs.mkdirSync(FONT_DIR, { recursive: true });

  if (!fs.existsSync(FONT_TTF)) {
    const res = await fetch(FONT_URL);
    if (!res.ok) throw new Error(`Mulish download failed: HTTP ${res.status}`);
    fs.writeFileSync(FONT_TTF, Buffer.from(await res.arrayBuffer()));
    console.log('fetched Mulish variable TTF -> node_modules/.cache');
  }

  const conf = path.join(FONT_DIR, 'fonts.conf');
  fs.writeFileSync(
    conf,
    `<?xml version="1.0"?>
<!DOCTYPE fontconfig SYSTEM "fonts.dtd">
<fontconfig>
  <dir>${FONT_DIR}</dir>
  <cachedir>${path.join(FONT_DIR, 'cache')}</cachedir>
  <include ignore_missing="yes">/etc/fonts/fonts.conf</include>
</fontconfig>
`,
  );
  fs.mkdirSync(path.join(FONT_DIR, 'cache'), { recursive: true });
  process.env.FONTCONFIG_FILE = conf;
}

/* ------------------------------------------------------------------ glyph */

const wordmarkSrc = fs.readFileSync(
  path.join(ROOT, 'src/assets/brand/sharpen-wordmark.svg'),
  'utf8',
);

/** The wordmark's seven paths are S H A R P E N; the knife-"A" is the third. */
const glyphA = [...wordmarkSrc.matchAll(/<path[^>]*d="([^"]+)"/g)]
  .map((m) => m[1])
  .find((d) => {
    const xs = d.match(/-?\d+\.?\d*/g).map(Number).filter((_, i) => i % 2 === 0);
    return Math.min(...xs) > 340 && Math.max(...xs) < 540;
  });
if (!glyphA) throw new Error('knife-"A" path not found in the wordmark');

/** Ink bounds of that path, measured off the source, used to centre it. */
const A = { x0: 351.8, y0: 6.9, x1: 525.7, y1: 154.6 };
const AW = A.x1 - A.x0;
const AH = A.y1 - A.y0;

/**
 * The icon tile: white knife-"A" on brand red, square with no radius. The
 * brand's own lockup is a white mark on a red square, and DESIGN.md holds
 * every plate and button to sharp corners.
 *
 * `inset` is the share of the tile height the glyph occupies. It varies by
 * target: small sizes need the glyph bigger to stay readable, Apple crops
 * less than Android's maskable circle.
 */
function tile(size, inset) {
  const scale = (size * inset) / AH;
  const tx = (size - AW * scale) / 2 - A.x0 * scale;
  const ty = (size - AH * scale) / 2 - A.y0 * scale;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" fill="${RED}"/>
  <g transform="translate(${tx.toFixed(3)} ${ty.toFixed(3)}) scale(${scale.toFixed(6)})">
    <path d="${glyphA}" fill="#ffffff"/>
  </g>
</svg>`;
}

const png = (size, inset) =>
  sharp(Buffer.from(tile(size, inset))).png({ compressionLevel: 9 }).toBuffer();

/* -------------------------------------------------------------------- ICO */

/** Minimal ICO container wrapping PNG frames — supported everywhere since Vista. */
function buildIco(frames) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(frames.length, 4);

  let offset = 6 + frames.length * 16;
  const entries = frames.map(({ size, data }) => {
    const e = Buffer.alloc(16);
    e.writeUInt8(size >= 256 ? 0 : size, 0); // width  (0 means 256)
    e.writeUInt8(size >= 256 ? 0 : size, 1); // height
    e.writeUInt16LE(1, 4); // colour planes
    e.writeUInt16LE(32, 6); // bits per pixel
    e.writeUInt32LE(data.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += data.length;
    return e;
  });

  return Buffer.concat([header, ...entries, ...frames.map((f) => f.data)]);
}

/* ------------------------------------------------------------- share card */

const OG_W = 1200;
const OG_H = 630;

async function shareCard() {
  /* The same photograph the hero runs, cropped by hand rather than by a
     saliency strategy. The source is 3200x2400 and the card is 1.905:1, so the
     window is the full width by 1680px, leaving 720px of vertical travel. It
     is placed at 38% of that travel — the hero's own `position: 50% 38%` — so
     the card and the first screen frame the room identically.

     That bias also does necessary work: this frame carries a photographer's
     watermark across the bottom ~2%, and a lower crop drags it into shot. */
  const src = path.join(ROOT, 'src/assets/images/sharpen-room-hands-raised.jpg');
  const { width: sw, height: sh } = await sharp(src).metadata();
  const windowH = Math.round(sw / (OG_W / OG_H));
  const photo = await sharp(src)
    .extract({
      left: 0,
      top: Math.round((sh - windowH) * 0.38),
      width: sw,
      height: windowH,
    })
    .resize(OG_W, OG_H)
    .toBuffer();

  const markW = 620;
  const markH = Math.round((markW * 152.88) / 1120.08);
  const L = 72;

  /* Bottom-anchored stack, mirroring the hero's lower-left composition. */
  const subBase = OG_H - 66;
  const dateBase = subBase - 48;
  const markTop = dateBase - 58 - markH;
  const eyebrowBase = markTop - 30;

  /* The source carries its fill on the root <svg> element, not on the paths,
     so dropping that wrapper drops the colour with it — the fill is restored
     on the <g> below rather than left to default to black. */
  const wordmarkInner = wordmarkSrc
    .replace(/^[\s\S]*?<svg[^>]*>/, '')
    .replace(/<\/svg>\s*$/, '');

  const overlay = `<svg xmlns="http://www.w3.org/2000/svg" width="${OG_W}" height="${OG_H}">
  <defs>
    <linearGradient id="veil" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0%"   stop-color="${INK}" stop-opacity="0.94"/>
      <stop offset="42%"  stop-color="${INK}" stop-opacity="0.72"/>
      <stop offset="78%"  stop-color="${INK}" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="${INK}" stop-opacity="0.06"/>
    </linearGradient>
    <linearGradient id="side" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%"   stop-color="${INK}" stop-opacity="0.55"/>
      <stop offset="55%"  stop-color="${INK}" stop-opacity="0.10"/>
      <stop offset="100%" stop-color="${INK}" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <rect width="${OG_W}" height="${OG_H}" fill="url(#veil)"/>
  <rect width="${OG_W}" height="${OG_H}" fill="url(#side)"/>

  <text x="${L}" y="${eyebrowBase}" font-family="Mulish" font-size="23" font-weight="900"
        letter-spacing="3.4" fill="${RED}">11TH ANNUAL</text>

  <g fill="#ffffff" fill-rule="nonzero"
     transform="translate(${L} ${markTop}) scale(${(markW / 1120.08).toFixed(6)}) translate(-29.52 -4.32)">
    ${wordmarkInner}
  </g>

  <text x="${L}" y="${dateBase}" font-family="Mulish" font-size="37" font-weight="900"
        fill="#ffffff">Jan. 28–29, 2027 · Fort Worth, Texas</text>

  <text x="${L}" y="${subBase}" font-family="Mulish" font-size="25" font-weight="400"
        fill="#dcdcdc">Two days on price, cost and volume — run against your own numbers.</text>

  <rect x="0" y="${OG_H - 7}" width="${OG_W}" height="7" fill="${RED}"/>
</svg>`;

  return sharp(photo)
    .composite([{ input: Buffer.from(overlay), top: 0, left: 0 }])
    .jpeg({ quality: 86, mozjpeg: true, chromaSubsampling: '4:4:4' })
    .toBuffer();
}

/* ------------------------------------------------------------------ write */

await provisionFont();

fs.writeFileSync(path.join(PUB, 'favicon.svg'), tile(512, 0.6));

/* 16 and 32 carry the glyph larger — below ~20px it closes up otherwise. */
fs.writeFileSync(
  path.join(PUB, 'favicon.ico'),
  buildIco([
    { size: 16, data: await png(16, 0.68) },
    { size: 32, data: await png(32, 0.68) },
    { size: 48, data: await png(48, 0.64) },
  ]),
);

/* iOS rounds the corners itself and honours no transparency. */
fs.writeFileSync(path.join(PUB, 'apple-touch-icon.png'), await png(180, 0.56));
fs.writeFileSync(path.join(PUB, 'icon-192.png'), await png(192, 0.6));
fs.writeFileSync(path.join(PUB, 'icon-512.png'), await png(512, 0.6));
/* Android crops maskable icons to a circle, so this one sits well inside the
   80% safe zone — it looks over-padded on its own, and correct in use. */
fs.writeFileSync(path.join(PUB, 'icon-maskable-512.png'), await png(512, 0.42));

fs.writeFileSync(path.join(PUB, 'og-image.jpg'), await shareCard());

for (const f of [
  'favicon.svg',
  'favicon.ico',
  'apple-touch-icon.png',
  'icon-192.png',
  'icon-512.png',
  'icon-maskable-512.png',
  'og-image.jpg',
]) {
  console.log(
    `${f.padEnd(26)} ${(fs.statSync(path.join(PUB, f)).size / 1024).toFixed(1)} KB`,
  );
}
