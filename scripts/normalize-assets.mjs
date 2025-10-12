import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const productosDir = path.join(projectRoot, 'public', 'productos');

const renames = [];

function normalizeFilename(filename) {
  // Rule 1: .jpg.webp or .JPG.WEBP -> .webp
  if (filename.endsWith('.jpg.webp') || filename.endsWith('.JPG.webp')) {
    return filename.replace(/\.jpg\.webp$/i, '.webp');
  }
  
  // Rule 2: Uppercase extensions to lowercase
  if (filename.endsWith('.JPG')) {
    return filename.replace(/\.JPG$/, '.jpg');
  }
  if (filename.endsWith('.JPEG')) {
    return filename.replace(/\.JPEG$/, '.jpeg');
  }
  if (filename.endsWith('.WEBP')) {
    return filename.replace(/\.WEBP$/, '.webp');
  }
  
  return null; // No change needed
}

function scanDirectory(dir) {
  if (!fs.existsSync(dir)) {
    console.log(`[v0] Directory does not exist: ${dir}`);
    return;
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      scanDirectory(fullPath);
    } else if (entry.isFile()) {
      const newName = normalizeFilename(entry.name);
      
      if (newName) {
        const newPath = path.join(dir, newName);
        const relativePath = path.relative(productosDir, fullPath);
        const relativeNewPath = path.relative(productosDir, newPath);
        
        console.log(`[v0] Renaming: ${relativePath} -> ${relativeNewPath}`);
        
        try {
          fs.renameSync(fullPath, newPath);
          renames.push({ old: relativePath, new: relativeNewPath });
        } catch (err) {
          console.error(`[v0] Error renaming ${relativePath}:`, err.message);
        }
      }
    }
  }
}

// Scan and rename
console.log('[v0] Starting asset normalization...');
scanDirectory(productosDir);

// Generate report
const reportPath = path.join(projectRoot, 'scripts', 'asset-normalize-report.md');
const reportContent = [
  '# Asset Normalization Report',
  '',
  `Generated: ${new Date().toISOString()}`,
  '',
  '## Renamed Files',
  '',
  renames.length === 0 
    ? 'No files needed renaming.' 
    : renames.map(r => `- \`${r.old}\` → \`${r.new}\``).join('\n'),
  '',
  `Total files renamed: ${renames.length}`,
].join('\n');

fs.writeFileSync(reportPath, reportContent, 'utf-8');
console.log(`[v0] Report generated at: ${reportPath}`);
console.log(`[v0] Total files renamed: ${renames.length}`);
