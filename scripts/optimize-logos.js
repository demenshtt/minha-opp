const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const IMG_DIR = path.join(__dirname, '..', 'public', 'img');
const OUT_DIR = path.join(IMG_DIR, 'optimized');
const TARGET_WIDTH = 800;

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR);

const svgFiles = fs.readdirSync(IMG_DIR)
  .filter(f => f.startsWith('logo-rebrand-gopp-') && f.endsWith('.svg'));

console.log(`Converting ${svgFiles.length} SVGs to PNG (${TARGET_WIDTH}px width)...\n`);

(async () => {
  let totalBefore = 0;
  let totalAfter = 0;

  for (const file of svgFiles) {
    const inputPath = path.join(IMG_DIR, file);
    const outputName = file.replace('.svg', '.png');
    const outputPath = path.join(OUT_DIR, outputName);

    const inputSize = fs.statSync(inputPath).size;
    totalBefore += inputSize;

    try {
      await sharp(inputPath, { density: 150 })
        .resize(TARGET_WIDTH)
        .png({ quality: 85, compressionLevel: 9 })
        .toFile(outputPath);

      const outputSize = fs.statSync(outputPath).size;
      totalAfter += outputSize;
      const reduction = ((1 - outputSize / inputSize) * 100).toFixed(1);

      console.log(`  ${file}`);
      console.log(`    ${(inputSize/1024).toFixed(0)}KB -> ${(outputSize/1024).toFixed(0)}KB (${reduction}% reduction)`);
    } catch (err) {
      console.error(`  FAILED: ${file} - ${err.message}`);
    }
  }

  console.log(`\nTotal: ${(totalBefore/1024/1024).toFixed(1)}MB -> ${(totalAfter/1024/1024).toFixed(1)}MB`);
  console.log(`Reduction: ${((1 - totalAfter/totalBefore) * 100).toFixed(1)}%`);
  console.log(`\nOptimized files saved to: ${OUT_DIR}`);
})();
