/**
 * Converts all images in images/thumbnail/{commission,residential,selected}/
 * to WebP and saves them in each folder's webp/ subfolder.
 *
 * Run from project root: node scripts/thumbnails-to-webp.js
 * Requires: npm install
 */

const path = require('path');
const fs = require('fs');

const THUMBNAIL_FOLDERS = ['commission', 'residential', 'selected'];
const SUPPORTED_EXT = /\.(jpg|jpeg|png|gif|tiff|bmp)$/i;

async function convertFolder(sharp, folderName) {
  const inputDir = path.join(__dirname, '..', 'images', 'thumbnail', folderName);
  const outputDir = path.join(inputDir, 'webp');

  if (!fs.existsSync(inputDir)) {
    console.log('Skipping (folder not found):', inputDir);
    return;
  }

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
    console.log('Created folder:', outputDir);
  }

  const files = fs.readdirSync(inputDir).filter((f) => SUPPORTED_EXT.test(f));
  if (files.length === 0) {
    console.log('No image files in', folderName);
    return;
  }

  console.log('\n' + folderName + ':', files.length, 'image(s)');
  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const base = path.basename(file, path.extname(file));
    const outputPath = path.join(outputDir, base + '.webp');
    try {
      await sharp(inputPath)
        .webp({ quality: 85 })
        .toFile(outputPath);
      console.log('  OK:', file, '->', base + '.webp');
    } catch (err) {
      console.error('  FAIL:', file, err.message);
    }
  }
}

async function main() {
  let sharp;
  try {
    sharp = require('sharp');
  } catch (e) {
    console.error('Missing dependency. Run from project root: npm install');
    process.exit(1);
  }

  const baseDir = path.join(__dirname, '..', 'images', 'thumbnail');
  if (!fs.existsSync(baseDir)) {
    console.error('Base folder not found:', baseDir);
    process.exit(1);
  }

  console.log('Converting thumbnails to WebP...');
  for (const folder of THUMBNAIL_FOLDERS) {
    await convertFolder(sharp, folder);
  }
  console.log('\nDone.');
}

main();
