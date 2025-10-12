"use client"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

function toggleMulti(sp: URLSearchParams, key: string, val: string) {
  const vals = sp.getAll(key)
  const has = vals.includes(val)
  sp.delete(key)
  ;(has ? vals.filter((v) => v !== val) : [...vals, val]).forEach((v) => sp.append(key, v))
}

function toggleSingle(sp: URLSearchParams, key: string, val: string) {
  if (sp.get(key) === val) sp.delete(key)
  else sp.set(key, val)
}

export default function ProductFilters() {
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()

  function apply(fn: (sp: URLSearchParams) => void) {
    const sp = new URLSearchParams(params?.toString())
    fn(sp)
    router.replace(`${pathname}?${sp.toString()}`, { scroll: false })
  }

  const isOn = (k: string, v: string) => params?.getAll(k).includes(v)
  const fabricOn = params?.get("fabric")

  const sizes = ["XS", "S", "M", "L", "XL"]
  const colors = ["Negro", "Blanco", "Gris", "Rojo", "Azul", "Beige"]
  const fabrics = ["suplex", "algodon"]

  return (
    <aside className="rounded-2xl border border-neutral-200 p-4 bg-white">
      <h4 className="font-semibold">Talla</h4>
      <div className="mt-2 flex flex-wrap gap-2">
        {sizes.map((s) => (
          <button
            key={s}
            onClick={() => apply((sp) => toggleMulti(sp, "size", s))}
            className={`px-3 py-1.5 rounded-full text-sm ${isOn("size", s) ? "bg-rose-600 text-white" : "bg-neutral-100"}`}
          >
            {s}
          </button>
        ))}
      </div>

      <h4 className="mt-4 font-semibold">Color</h4>
      <div className="mt-2 flex flex-wrap gap-2">
        {colors.map((c) => (
          <button
            key={c}
            onClick={() => apply((sp) => toggleMulti(sp, "color", c))}
            className={`px-3 py-1.5 rounded-full text-sm ${isOn("color", c) ? "bg-rose-600 text-white" : "bg-neutral-100"}`}
          >
            {c}
          </button>
        ))}
      </div>

      <h4 className="mt-4 font-semibold">Tejido</h4>
      <div className="mt-2 flex flex-wrap gap-2">
        {fabrics.map((f) => (
          <button
            key={f}
            onClick={() => apply((sp) => toggleSingle(sp, "fabric", f))}
            className={`px-3 py-1.5 rounded-full text-sm ${fabricOn === f ? "bg-rose-600 text-white" : "bg-neutral-100"}`}
          >
            {f[0].toUpperCase() + f.slice(1)}
          </button>
        ))}
        {fabricOn && (
          <button
            onClick={() => apply((sp) => sp.delete("fabric"))}
            className="px-3 py-1.5 rounded-full text-sm bg-neutral-200"
          >
            Quitar tejido
          </button>
        )}
      </div>

      <h4 className="mt-4 font-semibold">Ordenar por</h4>
      <select
        className="mt-2 w-full rounded-xl border border-neutral-300 p-2"
        value={params?.get("sort") ?? ""}
        onChange={(e) =>
          apply((sp) => {
            const v = e.target.value
            v ? sp.set("sort", v) : sp.delete("sort")
          })
        }
      >
        <option value="">Más recientes</option>
        <option value="price-asc">Precio: menor a mayor</option>
        <option value="price-desc">Precio: mayor a menor</option>
      </select>

      <button
        onClick={() => router.replace(pathname, { scroll: false })}
        className="mt-4 text-sm text-rose-700 underline underline-offset-4"
      >
        Limpiar filtros
      </button>
    </aside>
  )
}
