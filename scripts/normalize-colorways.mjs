// Normalize colorway hero shots so the product has the same VISUAL MASS in every
// frame, regardless of how the chair was posed or how close the camera was.
//
// SOURCE: /public/colorways/_source/*.jpg  (originally-recolored set, never touched)
// OUTPUT: /public/colorways/*.jpg          (what the hero serves)
//
// Algorithm (silhouette-area-based — v3):
//   1. Measure the source: count "chair pixels" (pixels darker than a bg threshold).
//      This is the true on-screen footprint, not just the bounding rectangle.
//   2. Compute factor = sqrt(TARGET_AREA / silhouette_area). Area scales as factor²,
//      so a sqrt gives the correct linear scale.
//   3. Trim to the bbox, resize by factor (aspect preserved), pad to canvas.
//
// Why this beats bbox/gmean normalization: two chair poses can have the same bbox
// dimensions but very different silhouette fills (a "spread" pose fills its bbox,
// a "compact" pose has more empty corners). Counting actual chair pixels normalizes
// what the eye actually sees.
//
// Re-run after dropping a new colorway into _source/:
//   node scripts/normalize-colorways.mjs
import sharp from "sharp"
import { readdir, mkdir } from "node:fs/promises"
import path from "node:path"

const SRC_DIR = path.resolve("public/colorways/_source")
const OUT_DIR = path.resolve("public/colorways")

// 43:24 hero box ratio.
const CANVAS_W = 2752
const CANVAS_H = 1536

// Target silhouette area (chair pixels in the output). Chosen as a typical value
// from the current set so most images need only minor scaling. Bigger = chair fills
// more of the frame.
const TARGET_AREA = 700_000

// Grayscale threshold below which a pixel counts as "chair" (vs the #FAF7F1 bg).
// 230 / 255 catches the lightest canvas highlights without including bg JPEG noise.
const SILHOUETTE_THRESHOLD = 230

// Page background token (--background in globals.css).
const BG = { r: 0xfa, g: 0xf7, b: 0xf1 }

async function silhouetteArea(input) {
  const { data } = await sharp(input)
    .greyscale()
    .raw()
    .toBuffer({ resolveWithObject: true })
  let count = 0
  for (let i = 0; i < data.length; i++) {
    if (data[i] < SILHOUETTE_THRESHOLD) count++
  }
  return count
}

async function run() {
  await mkdir(OUT_DIR, { recursive: true })
  const files = (await readdir(SRC_DIR)).filter((f) => /\.jpe?g$/i.test(f))
  if (files.length === 0) {
    console.error("No .jpg files found in", SRC_DIR)
    process.exit(1)
  }
  for (const file of files) {
    const src = path.join(SRC_DIR, file)
    const out = path.join(OUT_DIR, file)

    // 1. Measure the source silhouette.
    const srcBuf = await sharp(src).toBuffer()
    const area = await silhouetteArea(srcBuf)

    // 2. Per-image linear scale factor.
    const factor = Math.sqrt(TARGET_AREA / area)

    // 3a. Trim the source bg to get the product bbox.
    const trimmed = await sharp(srcBuf).trim({ threshold: 35 }).toBuffer()
    const { width: bw, height: bh } = await sharp(trimmed).metadata()
    if (!bw || !bh) {
      console.warn(`!! ${file}: could not determine bbox; skipping`)
      continue
    }

    // 3b. Resize bbox by the factor (aspect preserved).
    const targetW = Math.max(1, Math.round(bw * factor))
    const targetH = Math.max(1, Math.round(bh * factor))
    const resized = await sharp(trimmed)
      .resize(targetW, targetH, { fit: "fill" })
      .toBuffer()

    // 3c. Pad symmetrically to the canvas. extend takes integer margins; any odd-pixel
    // parity goes to the right/bottom.
    const padX = Math.max(0, CANVAS_W - targetW)
    const padY = Math.max(0, CANVAS_H - targetH)
    const padL = Math.floor(padX / 2)
    const padR = padX - padL
    const padT = Math.floor(padY / 2)
    const padB = padY - padT

    await sharp(resized)
      .extend({ top: padT, bottom: padB, left: padL, right: padR, background: BG })
      .jpeg({ quality: 88, mozjpeg: true })
      .toFile(out)

    console.log(
      `${file.padEnd(22)} src-area=${String(area).padStart(7)} factor=${factor.toFixed(3)} bbox ${bw}x${bh} → ${targetW}x${targetH}`,
    )
  }
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
