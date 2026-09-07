/**
 * Normalize supplied sponsor logos into web-ready plates.
 *
 * Sponsors send whatever their brand kit holds, and the canvases disagree
 * wildly: Serenity's mark fills 99% of its file, re•tool's fills 14% of a
 * 6250x6250 square. Dropped straight into equal boxes with `object-contain`,
 * the padded ones render tiny and the wall looks broken.
 *
 * So each logo is trimmed to its true ink bounds. After that a file's
 * intrinsic aspect ratio IS the mark's aspect ratio, which is what lets
 * Sponsors.astro size every logo from one formula instead of a per-logo
 * fudge factor. The long edge is capped because these render ~120px wide.
 *
 * Originals stay untouched in src/assets/images/ — this only writes the
 * derivatives in src/assets/images/sponsors/. Re-run after adding a logo:
 *   node scripts/normalize-sponsor-logos.mjs
 */
import sharp from 'sharp';
import { mkdirSync, readdirSync } from 'node:fs';
import { basename, join } from 'node:path';

const SRC = 'src/assets/images';
const OUT = join(SRC, 'sponsors');
/** Alpha at or below this is treated as empty canvas. */
const ALPHA_FLOOR = 8;
/** Plenty for a ~120px-wide render at 3x DPR. */
const MAX_EDGE = 1200;

/** Tightest rectangle containing every pixel more opaque than ALPHA_FLOOR. */
async function inkBounds(file) {
  const { data, info } = await sharp(file)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  let minX = width, minY = height, maxX = -1, maxY = -1;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (data[(y * width + x) * channels + 3] > ALPHA_FLOOR) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  if (maxX < 0) throw new Error(`${file} is fully transparent`);
  return { left: minX, top: minY, width: maxX - minX + 1, height: maxY - minY + 1 };
}

mkdirSync(OUT, { recursive: true });

const files = readdirSync(SRC).filter((f) => f.endsWith('-logo.png'));
if (!files.length) throw new Error(`no *-logo.png files in ${SRC}`);

for (const file of files) {
  const from = join(SRC, file);
  const box = await inkBounds(from);
  const { width: W, height: H } = await sharp(from).metadata();

  const scale = Math.min(1, MAX_EDGE / Math.max(box.width, box.height));
  const out = join(OUT, basename(file));

  await sharp(from)
    .extract(box)
    .resize({
      width: Math.round(box.width * scale),
      height: Math.round(box.height * scale),
      fit: 'fill',
      kernel: 'lanczos3',
    })
    .png({ compressionLevel: 9, palette: false })
    .toFile(out);

  const kept = ((box.width * box.height) / (W * H)) * 100;
  console.log(
    `${basename(file).padEnd(36)} ${W}x${H} -> ${Math.round(box.width * scale)}x${Math.round(box.height * scale)}` +
      `  ratio ${(box.width / box.height).toFixed(2)}  (ink was ${kept.toFixed(0)}% of canvas)`
  );
}
