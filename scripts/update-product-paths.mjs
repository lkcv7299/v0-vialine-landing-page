import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, "..")

// Read the products.ts file
const productsPath = path.join(rootDir, "data", "products.ts")
let productsContent = fs.readFileSync(productsPath, "utf-8")

// Track changes and missing files
const changes = []
const missing = []

// Function to check if a file exists
function fileExists(filePath) {
  const fullPath = path.join(rootDir, "public", filePath)
  return fs.existsSync(fullPath)
}

// Function to find closest matching file in the same directory
function findClosestMatch(imagePath) {
  const dir = path.dirname(imagePath)
  const fullDir = path.join(rootDir, "public", dir)
  
  if (!fs.existsSync(fullDir)) {
    return null
  }
  
  const files = fs.readdirSync(fullDir)
  if (files.length === 0) return null
  
  // Return the first file as a suggestion
  return path.join(dir, files[0])
}

// Extract all image paths from products.ts
const imagePathRegex = /image:\s*"([^"]+)"/g
let match

const imagePaths = []
while ((match = imagePathRegex.exec(productsContent)) !== null) {
  imagePaths.push(match[1])
}

console.log(`Found ${imagePaths.length} image paths in data/products.ts`)

// Process each image path
for (const imagePath of imagePaths) {
  let updatedPath = imagePath
  let changed = false
  
  // Rule 1: Replace .jpg.webp with .webp
  if (imagePath.endsWith(".jpg.webp") || imagePath.endsWith(".JPG.WEBP")) {
    updatedPath = imagePath.replace(/\.(jpg|JPG)\.webp$/i, ".webp")
    changed = true
  }
  
  // Rule 2: Lowercase extensions
  if (/\.(JPG|JPEG|WEBP)$/.test(updatedPath)) {
    updatedPath = updatedPath.replace(/\.(JPG|JPEG|WEBP)$/, (match) => match.toLowerCase())
    changed = true
  }
  
  // Rule 3: Prefer .webp over .jpg if it exists
  if (updatedPath.endsWith(".jpg")) {
    const webpPath = updatedPath.replace(/\.jpg$/, ".webp")
    if (fileExists(webpPath)) {
      updatedPath = webpPath
      changed = true
    }
  }
  
  // Update the content if changed
  if (changed) {
    productsContent = productsContent.replace(
      `image: "${imagePath}"`,
      `image: "${updatedPath}"`
    )
    changes.push({ old: imagePath, new: updatedPath })
    console.log(`✓ Updated: ${imagePath} -> ${updatedPath}`)
  }
  
  // Check if the final path exists
  if (!fileExists(updatedPath)) {
    const closest = findClosestMatch(updatedPath)
    missing.push({
      path: updatedPath,
      suggestion: closest || "No files found in directory",
    })
    console.log(`✗ Missing: ${updatedPath}`)
  }
}

// Write updated products.ts
if (changes.length > 0) {
  fs.writeFileSync(productsPath, productsContent, "utf-8")
  console.log(`\n✓ Updated ${changes.length} image paths in data/products.ts`)
} else {
  console.log("\n✓ No changes needed in data/products.ts")
}

// Generate missing files report
if (missing.length > 0) {
  const reportPath = path.join(rootDir, "scripts", "asset-missing.md")
  let report = "# Missing Product Assets\n\n"
  report += `Generated: ${new Date().toISOString()}\n\n`
  report += `Found ${missing.length} missing image(s):\n\n`
  
  for (const item of missing) {
    report += `## Missing: \`${item.path}\`\n`
    report += `**Suggested:** \`${item.suggestion}\`\n\n`
  }
  
  fs.writeFileSync(reportPath, report, "utf-8")
  console.log(`\n✓ Generated missing files report: scripts/asset-missing.md`)
} else {
  console.log("\n✓ All image paths verified - no missing files!")
}

console.log("\n✓ Done!")
