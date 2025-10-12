import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const publicDir = path.join(rootDir, "public");
const productosDir = path.join(publicDir, "productos");
const productsFile = path.join(rootDir, "data", "products.ts");

// Recursively get all files in a directory
async function getAllFiles(dir, fileList = []) {
  try {
    const files = await fs.readdir(dir, { withFileTypes: true });
    for (const file of files) {
      const filePath = path.join(dir, file.name);
      if (file.isDirectory()) {
        await getAllFiles(filePath, fileList);
      } else {
        fileList.push(filePath);
      }
    }
  } catch (err) {
    console.log(`Directory not found: ${dir}`);
  }
  return fileList;
}

// Extract image paths from products.ts
function extractImagePaths(content) {
  const regex = /image:\s*["']([^"']+)["']/g;
  const paths = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    paths.push(match[1]);
  }
  return paths;
}

async function main() {
  console.log("🔍 Verifying product assets...\n");

  // Read products.ts
  const productsContent = await fs.readFile(productsFile, "utf-8");
  const imagePaths = extractImagePaths(productsContent);
  console.log(`Found ${imagePaths.length} image references in data/products.ts\n`);

  // Get all actual files in /public/productos
  const allFiles = await getAllFiles(productosDir);
  const relativeFiles = allFiles.map((f) =>
    f.replace(publicDir, "").replace(/\\/g, "/")
  );
  console.log(`Found ${relativeFiles.length} files in /public/productos\n`);

  // Track changes and missing files
  const updates = [];
  const missing = [];
  let updatedContent = productsContent;

  // Check each image path
  for (const imagePath of imagePaths) {
    const fullPath = path.join(publicDir, imagePath);
    const basePath = imagePath.replace(/\.(jpg|jpeg|webp)$/i, "");
    
    // Check for .webp version first (preferred)
    const webpPath = `${basePath}.webp`;
    const webpFullPath = path.join(publicDir, webpPath);
    
    // Check for .jpg version
    const jpgPath = `${basePath}.jpg`;
    const jpgFullPath = path.join(publicDir, jpgPath);
    
    // Check for .jpeg version
    const jpegPath = `${basePath}.jpeg`;
    const jpegFullPath = path.join(publicDir, jpegPath);

    let exists = false;
    let preferredPath = imagePath;

    // Prefer .webp if it exists
    try {
      await fs.access(webpFullPath);
      exists = true;
      preferredPath = webpPath;
      if (imagePath !== webpPath) {
        updates.push({ old: imagePath, new: webpPath, reason: "prefer .webp" });
      }
    } catch {
      // Try .jpg
      try {
        await fs.access(jpgFullPath);
        exists = true;
        preferredPath = jpgPath;
        if (imagePath !== jpgPath) {
          updates.push({ old: imagePath, new: jpgPath, reason: "normalize to .jpg" });
        }
      } catch {
        // Try .jpeg
        try {
          await fs.access(jpegFullPath);
          exists = true;
          preferredPath = jpegPath;
          if (imagePath !== jpegPath) {
            updates.push({ old: imagePath, new: jpegPath, reason: "normalize to .jpeg" });
          }
        } catch {
          // File doesn't exist
          exists = false;
        }
      }
    }

    if (!exists) {
      // Find closest match in the same directory
      const dir = path.dirname(imagePath);
      const filename = path.basename(imagePath, path.extname(imagePath));
      const filesInDir = relativeFiles.filter((f) => f.startsWith(dir));
      
      let suggestion = "No similar files found";
      if (filesInDir.length > 0) {
        // Find closest filename match
        const closest = filesInDir
          .map((f) => ({
            file: f,
            similarity: similarity(filename, path.basename(f, path.extname(f))),
          }))
          .sort((a, b) => b.similarity - a.similarity)[0];
        
        if (closest.similarity > 0.5) {
          suggestion = closest.file;
        } else {
          suggestion = `Files in ${dir}: ${filesInDir.slice(0, 3).join(", ")}`;
        }
      }
      
      missing.push({ path: imagePath, suggestion });
    }

    // Update content if path changed
    if (preferredPath !== imagePath) {
      const oldPattern = new RegExp(`image:\\s*["']${imagePath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']`, 'g');
      updatedContent = updatedContent.replace(oldPattern, `image: "${preferredPath}"`);
    }
  }

  // Write updated products.ts if there are changes
  if (updates.length > 0) {
    await fs.writeFile(productsFile, updatedContent, "utf-8");
    console.log(`✅ Updated ${updates.length} image paths in data/products.ts\n`);
    
    updates.forEach(({ old, new: newPath, reason }) => {
      console.log(`  ${old} → ${newPath} (${reason})`);
    });
    console.log();
  } else {
    console.log("✅ All image paths are already correct\n");
  }

  // Generate missing files report
  if (missing.length > 0) {
    const reportLines = [
      "# Missing Product Assets Report",
      "",
      `Generated: ${new Date().toISOString()}`,
      "",
      `Found ${missing.length} missing image files referenced in data/products.ts`,
      "",
      "## Missing Files",
      "",
    ];

    missing.forEach(({ path, suggestion }) => {
      reportLines.push(`### ${path}`);
      reportLines.push(`**Suggestion:** ${suggestion}`);
      reportLines.push("");
    });

    const reportPath = path.join(rootDir, "scripts", "asset-missing.md");
    await fs.writeFile(reportPath, reportLines.join("\n"), "utf-8");
    console.log(`⚠️  Generated missing files report: scripts/asset-missing.md`);
    console.log(`   ${missing.length} files are missing\n`);
  } else {
    console.log("✅ All image files exist!\n");
  }

  console.log("Done! 🎉");
}

// Simple string similarity function (Levenshtein distance)
function similarity(s1, s2) {
  const longer = s1.length > s2.length ? s1 : s2;
  const shorter = s1.length > s2.length ? s2 : s1;
  if (longer.length === 0) return 1.0;
  return (longer.length - editDistance(longer, shorter)) / longer.length;
}

function editDistance(s1, s2) {
  s1 = s1.toLowerCase();
  s2 = s2.toLowerCase();
  const costs = [];
  for (let i = 0; i <= s1.length; i++) {
    let lastValue = i;
    for (let j = 0; j <= s2.length; j++) {
      if (i === 0) {
        costs[j] = j;
      } else if (j > 0) {
        let newValue = costs[j - 1];
        if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
          newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
        }
        costs[j - 1] = lastValue;
        lastValue = newValue;
      }
    }
    if (i > 0) costs[s2.length] = lastValue;
  }
  return costs[s2.length];
}

main().catch(console.error);
