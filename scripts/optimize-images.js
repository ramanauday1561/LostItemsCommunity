const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Images that need optimization (large PNGs that don't have webp versions)
const imagesToOptimize = [
  'feature-report-found.png',
  'feature-search-system.png',
  'illustration-person-question.png',
  'illustration-exchange-item.png',
  'AboutUs1.png',
  'AboutUs2.png',
  'AboutUs3.png',
  'AboutUs4.png',
  'LoginNeeded.png',
  'LoginSignup.png',
  'feature-success-stories.png',
  'screenshot.png',
  'Homepage1.png',
  'hero-boy-with-dog.png'
];

const publicDir = path.join(__dirname, '..', 'public', 'images');

async function optimizeImage(filename) {
  const inputPath = path.join(publicDir, filename);
  const outputPath = path.join(publicDir, filename.replace('.png', '.webp'));
  
  // Skip if webp version already exists and is newer
  if (fs.existsSync(outputPath)) {
    const inputStat = fs.statSync(inputPath);
    const outputStat = fs.statSync(outputPath);
    if (outputStat.mtime > inputStat.mtime) {
      console.log(`Skipping ${filename} - WebP version is already up to date`);
      return;
    }
  }
  
  try {
    await sharp(inputPath)
      .webp({ quality: 85, effort: 6 })
      .toFile(outputPath);
    
    const inputSize = fs.statSync(inputPath).size;
    const outputSize = fs.statSync(outputPath).size;
    const savings = ((inputSize - outputSize) / inputSize * 100).toFixed(2);
    
    console.log(`Optimized ${filename}:`);
    console.log(`  Original: ${(inputSize / 1024).toFixed(2)} KB`);
    console.log(`  WebP: ${(outputSize / 1024).toFixed(2)} KB`);
    console.log(`  Savings: ${savings}%`);
  } catch (error) {
    console.error(`Error optimizing ${filename}:`, error.message);
  }
}

async function optimizeAllImages() {
  console.log('Starting image optimization...\n');
  
  for (const image of imagesToOptimize) {
    await optimizeImage(image);
  }
  
  console.log('\nImage optimization complete!');
}

optimizeAllImages();
