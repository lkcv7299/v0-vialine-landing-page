// scripts/process-new-batch.mjs
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const SOURCE_DIR = 'C:/Users/USER/Downloads/drive-download-20260105T161111Z-3-001';
const DEST_DIR = path.join(projectRoot, 'public/productos/mujer');

// Mapping: source folder -> { dest folder, product slug, color mappings }
const MAPPINGS = [
  {
    source: 'CAMISETA DEPORTIVA - ALGODON PREMIUM - NEW',
    dest: 'camisetas',
    slug: 'camiseta-deportiva',
    colors: {
      'COLOR NEGRO': 'negro',
      'COLOR VINO': 'vino'
    }
  },
  {
    source: 'CAMISETA TIRAS FIJAS - ALOGODON PREMIUM - NEW',
    dest: 'camisetas',
    slug: 'camiseta-tiras-fijas',
    colors: {
      'COLOR BLANCO': 'blanco'
    }
  },
  {
    source: 'CAMISETA TROPICAL - ALGODON PREMIUM - NEW',
    dest: 'camisetas',
    slug: 'camiseta-tropical',
    colors: {
      'COLOR BLANCO': 'blanco'
    }
  },
  {
    source: 'LEGGING ALGODON FRENCH TERRY - NEW',
    dest: 'legging',
    slug: 'legging-realce-fresh-terry',
    colors: {
      'COLOR CHARCOAL': 'charcoal',
      'COLOR MELANGE': 'melange',
      'COLOR NEGRO': 'negro',
      'COLOR VINO': 'vino'
    }
  },
  {
    source: 'LEGGING CLASICA - ALGODON GAMUSA - NEW',
    dest: 'legging',
    slug: 'legging-clasica-gamuza',
    colors: {
      'COLOR BLANCO': 'blanco'
    }
  },
  {
    source: 'LEGGING FUNTIONAL - SUPLEX LISO PREMIUM - NEW',
    dest: 'legging',
    slug: 'legging-functional',
    colors: {
      'COLOR AZUL MARINO': 'azul-marino',
      'COLOR NEGRO': 'negro'
    }
  },
  {
    source: 'LEGGING SLIM SUPLEX PERCHADO - NEW',
    dest: 'legging',
    slug: 'legging-slim-suplex-perchado',
    colors: {
      'COLOR AZUL MARINO': 'azul-marino',
      'COLOR NEGRO': 'negro'
    }
  },
  {
    source: 'PESCADOR REALCE - SUPLEX LISO PREMIUM - NEW',
    dest: 'pescador',
    slug: 'pescador-realce',
    colors: {
      'COLOR AZULINO': 'azulino',
      'COLOR NEGRO': 'negro',
      'COLOR ROJO': 'rojo'
    }
  },
  {
    source: 'TOP DEPORTIVO - ALGODON PREMIUM - NEW',
    dest: 'tops',
    slug: 'top-deportivo',
    colors: {
      'COLOR BLANCO': 'blanco',
      'COLOR NEGRO': 'negro'
    }
  },
  {
    source: 'TOP STRAPLE - ALGODON PREMIUM - NEW',
    dest: 'tops',
    slug: 'straple-chanel',
    colors: {
      'COLOR BLANCO': 'blanco'
    }
  },
  {
    source: 'TOP TIRAS FIJAS - ALGODON PREMIUM - NEW',
    dest: 'tops',
    slug: 'top-tira-fijas',
    colors: {
      'COLOR BLANCO': 'blanco'
    }
  }
];

async function processImages() {
  const results = {};

  for (const mapping of MAPPINGS) {
    const sourceFolder = path.join(SOURCE_DIR, mapping.source);
    const destFolder = path.join(DEST_DIR, mapping.dest);

    // Ensure dest folder exists
    if (!fs.existsSync(destFolder)) {
      fs.mkdirSync(destFolder, { recursive: true });
    }

    if (!fs.existsSync(sourceFolder)) {
      console.log(`⚠️ Source folder not found: ${mapping.source}`);
      continue;
    }

    const files = fs.readdirSync(sourceFolder);
    results[mapping.slug] = {};

    // Group files by color
    const colorFiles = {};
    for (const file of files) {
      if (!file.toLowerCase().endsWith('.jpg')) continue;

      // Find which color this file belongs to
      for (const [colorPattern, colorSlug] of Object.entries(mapping.colors)) {
        if (file.toUpperCase().startsWith(colorPattern.toUpperCase())) {
          if (!colorFiles[colorSlug]) colorFiles[colorSlug] = [];
          colorFiles[colorSlug].push(file);
          break;
        }
      }
    }

    // Process each color
    for (const [colorSlug, files] of Object.entries(colorFiles)) {
      // Sort files to ensure consistent ordering
      files.sort();

      const webpPaths = [];
      let index = 1;

      for (const file of files) {
        const sourcePath = path.join(sourceFolder, file);
        const destFileName = `${mapping.slug}-${colorSlug}${index}.webp`;
        const destPath = path.join(destFolder, destFileName);

        try {
          await sharp(sourcePath)
            .webp({ quality: 85 })
            .toFile(destPath);

          const relativePath = `/productos/mujer/${mapping.dest}/${destFileName}`;
          webpPaths.push(relativePath);
          console.log(`✅ ${destFileName}`);
          index++;
        } catch (err) {
          console.error(`❌ Error processing ${file}:`, err.message);
        }
      }

      results[mapping.slug][colorSlug] = webpPaths;
    }
  }

  // Output the results for products.ts update
  console.log('\n\n📋 Results for products.ts update:\n');
  console.log(JSON.stringify(results, null, 2));

  // Save to file for reference
  fs.writeFileSync(
    path.join(projectRoot, 'scripts/image-mapping-results.json'),
    JSON.stringify(results, null, 2)
  );

  console.log('\n✅ Results saved to scripts/image-mapping-results.json');
}

processImages().catch(console.error);
