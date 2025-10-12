import fs from "fs"
import path from "path"
import { products } from "@/data/products"

export default function Page() {
  const pub = path.join(process.cwd(), "public")
  const rows = products.map((p) => {
    const rel = p.image.startsWith("/") ? p.image : `/${p.image}`
    const abs = path.join(pub, rel)
    const exists = fs.existsSync(abs)
    return { slug: p.slug, image: rel, exists }
  })

  const missing = rows.filter((r) => !r.exists)
  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="text-2xl font-semibold">Asset check</h1>
      <p className="mt-2">
        Public base: <code>/public</code>
      </p>
      <h2 className="mt-6 font-semibold">Missing images ({missing.length})</h2>
      <ul className="list-disc pl-6">
        {missing.map((m) => (
          <li key={m.slug}>
            <code>{m.image}</code> ← from <code>{m.slug}</code>
          </li>
        ))}
      </ul>
      <h2 className="mt-6 font-semibold">Sample (first 10)</h2>
      <ul className="list-disc pl-6">
        {rows.slice(0, 10).map((r) => (
          <li key={r.slug}>
            <code>{r.image}</code> — {r.exists ? "OK" : "MISSING"}
          </li>
        ))}
      </ul>
    </main>
  )
}
