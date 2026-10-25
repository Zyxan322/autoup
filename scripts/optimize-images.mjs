import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ASSETS_DIR = path.resolve("src/assets");

// Recursive search for all image files
function getFiles(dir, exts = [".jpg", ".jpeg", ".png"]) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(fullPath, exts));
    } else {
      const ext = path.extname(file).toLowerCase();
      if (exts.includes(ext) && !file.endsWith(".webp")) {
        results.push(fullPath);
      }
    }
  }
  return results;
}

async function optimizeAll() {
  const imageFiles = getFiles(ASSETS_DIR);
  console.log(`Found ${imageFiles.length} images to optimize.`);

  let totalOriginal = 0;
  let totalOptimized = 0;

  for (const srcPath of imageFiles) {
    const ext = path.extname(srcPath);
    const destPath = srcPath.slice(0, -ext.length) + ".webp";

    const originalStat = fs.statSync(srcPath);
    const originalSize = originalStat.size;
    totalOriginal += originalSize;

    const img = sharp(srcPath);
    const meta = await img.metadata();

    let pipeline = sharp(srcPath);

    // If hero or very large image (> 1920px), scale down nicely to 1920 width
    if (meta.width && meta.width > 1920) {
      pipeline = pipeline.resize({ width: 1920, withoutEnlargement: true });
    }

    // Convert to WebP with high visual quality (85) and effort 6
    await pipeline.webp({ quality: 85, effort: 6 }).toFile(destPath);

    const destStat = fs.statSync(destPath);
    totalOptimized += destStat.size;

    const savedPercent = Math.round((1 - destStat.size / originalSize) * 100);
    console.log(
      `${path.relative(ASSETS_DIR, srcPath)} -> ${Math.round(originalSize / 1024)}KB to ${Math.round(destStat.size / 1024)}KB (${savedPercent}% saved)`,
    );
  }

  console.log("\n=================================");
  console.log(`Total Original: ${Math.round(totalOriginal / (1024 * 1024))} MB`);
  console.log(`Total Optimized WebP: ${Math.round(totalOptimized / (1024 * 1024))} MB`);
  console.log(`Overall Size Reduction: ${Math.round((1 - totalOptimized / totalOriginal) * 100)}%`);
  console.log("=================================\n");
}

optimizeAll().catch(console.error);
