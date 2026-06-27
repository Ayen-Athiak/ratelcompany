import sharp from 'sharp'
import { readdirSync, statSync } from 'fs'
import { join, extname, basename } from 'path'

const IMAGES_DIR = './public/images'
const QUALITY = 78

const files = readdirSync(IMAGES_DIR).filter(f => {
  const ext = extname(f).toLowerCase()
  return ['.jpg', '.jpeg', '.png'].includes(ext)
})

let totalBefore = 0
let totalAfter = 0

for (const file of files) {
  const inputPath = join(IMAGES_DIR, file)
  const stat = statSync(inputPath)
  if (!stat.isFile()) continue

  const sizeBefore = stat.size
  const nameNoExt = basename(file, extname(file))
  const outputPath = join(IMAGES_DIR, nameNoExt + '.webp')

  try {
    await sharp(inputPath).webp({ quality: QUALITY }).toFile(outputPath)

    const sizeAfter = statSync(outputPath).size
    totalBefore += sizeBefore
    totalAfter += sizeAfter

    const saved = (((sizeBefore - sizeAfter) / sizeBefore) * 100).toFixed(0)
    console.log(`${file.padEnd(50)} ${(sizeBefore/1024).toFixed(0).padStart(6)}KB  ->  ${(sizeAfter/1024).toFixed(0).padStart(5)}KB  (-${saved}%)`)
  } catch (err) {
    console.log(`SKIP ${file}: ${err.message}`)
  }
}

console.log(`\nTotal saved: ${(totalBefore/1024/1024).toFixed(1)} MB  ->  ${(totalAfter/1024/1024).toFixed(1)} MB  (saved ${((totalBefore-totalAfter)/1024/1024).toFixed(1)} MB)`)
