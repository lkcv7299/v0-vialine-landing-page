import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const toSlug = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")

export function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl

  if (pathname === "/productos") {
    const genero = toSlug(searchParams.get("genero") ?? "")
    const categoria = toSlug(searchParams.get("categoria") ?? "")
    if (genero && categoria) {
      const url = req.nextUrl.clone()
      url.pathname = `/shop/${genero}/${categoria}`
      url.search = ""
      return NextResponse.redirect(url, 308)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/productos"],
}
