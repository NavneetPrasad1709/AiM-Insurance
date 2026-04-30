import { readdir, stat, unlink } from 'node:fs/promises';
import { join, parse } from 'node:path';
import sharp from 'sharp';

const DIR = 'public/brand/illustrations';
const MAX_WIDTH = 1600;
const QUALITY = 82;

const files = await readdir(DIR);
const pngs = files.filter((f) => f.toLowerCase().endsWith('.png'));

let totalIn = 0;
let totalOut = 0;

for (const file of pngs) {
  const inPath = join(DIR, file);
  const { name } = parse(file);
  const outPath = join(DIR, `${name}.webp`);

  const inStat = await stat(inPath);
  totalIn += inStat.size;

  const img = sharp(inPath);
  const meta = await img.metadata();
  const targetWidth = Math.min(MAX_WIDTH, meta.width ?? MAX_WIDTH);

  await img
    .resize({ width: targetWidth, withoutEnlargement: true })
    .webp({ quality: QUALITY, effort: 6 })
    .toFile(outPath);

  const outStat = await stat(outPath);
  totalOut += outStat.size;

  const inKB = (inStat.size / 1024).toFixed(0);
  const outKB = (outStat.size / 1024).toFixed(0);
  const pct = ((1 - outStat.size / inStat.size) * 100).toFixed(0);
  console.log(`${file.padEnd(32)} ${inKB.padStart(5)}KB -> ${outKB.padStart(4)}KB  (-${pct}%)`);

  await unlink(inPath);
}

const inMB = (totalIn / 1024 / 1024).toFixed(2);
const outMB = (totalOut / 1024 / 1024).toFixed(2);
const totalPct = ((1 - totalOut / totalIn) * 100).toFixed(0);
console.log(`\nTotal: ${inMB}MB -> ${outMB}MB  (-${totalPct}%)`);
