import { spawnSync } from "node:child_process"
import { createRequire } from "node:module"
import { existsSync } from "node:fs"
import path from "node:path"

const require = createRequire(import.meta.url)

function hasModule(name) {
  try {
    require.resolve(name)
    return true
  } catch {
    return false
  }
}

const eslintInstalled = hasModule("eslint")
const nextConfigInstalled = hasModule("eslint-config-next")
const hasConfigFile = existsSync(path.resolve("eslint.config.mjs"))

if (eslintInstalled && nextConfigInstalled && hasConfigFile) {
  const nextBin = path.resolve("node_modules", "next", "dist", "bin", "next")
  const result = spawnSync(process.execPath, [nextBin, "lint"], {
    stdio: "inherit",
    env: { ...process.env, FORCE_COLOR: process.env.FORCE_COLOR ?? "1" },
  })
  process.exit(result.status ?? 1)
}

console.warn(
  "ESLint no está instalado en el entorno; ejecutando verificación de TypeScript en su lugar."
)

const tscBin = path.resolve("node_modules", "typescript", "lib", "tsc.js")
const typeCheck = spawnSync(process.execPath, [tscBin, "--noEmit"], {
  stdio: "inherit",
  env: { ...process.env, FORCE_COLOR: process.env.FORCE_COLOR ?? "1" },
})

process.exit(typeCheck.status ?? 1)
