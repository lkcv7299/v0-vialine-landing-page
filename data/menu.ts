import { getAllCollections, getUniqueFabrics } from "./products"
import { FABRICS, fabricFamilies } from "./fabrics"

export const WOMEN_MENU = {
  rootHref: "/mujer",
  clothing: [
    { label: "Leggings", href: "/shop/mujer/leggings" },
    { label: "Short", href: "/shop/mujer/short" },
    { label: "Pescador", href: "/shop/mujer/pescador" },
    { label: "Torero", href: "/shop/mujer/torero" },
    { label: "Bodys", href: "/shop/mujer/bodys" },
    { label: "Enterizos", href: "/shop/mujer/enterizos" },
    { label: "Tops", href: "/shop/mujer/tops" },
    { label: "Camisetas", href: "/shop/mujer/camisetas" },
  ],
  featured: [
    { label: "Popular ahora", href: "/mujer#popular" },
    { label: "Novedades", href: "/mujer#novedades" },
    { label: "Ofertas", href: "/mujer#ofertas" },
  ],
}

export const GIRL_MENU = {
  rootHref: "/nina",
  clothing: [
    { label: "Cafarenas", href: "/shop/nina/cafarena" },
    { label: "Enterizos", href: "/shop/nina/enterizos" },
    { label: "Leggins", href: "/shop/nina/legging" },
    { label: "Pantys", href: "/shop/nina/panty" },
    { label: "Shorts", href: "/shop/nina/short" },
    { label: "Tops", href: "/shop/nina/tops" },
  ],
  featured: [
    { label: "Popular ahora", href: "/nina#popular" },
    { label: "Novedades", href: "/nina#novedades" },
  ],
}

// ✨ NUEVAS SECCIONES DINÁMICAS
export function getCollectionsMenu() {
  const collections = getAllCollections()
  return collections.map(c => ({
    label: c.name,
    href: `/colecciones/${c.slug}`,
    count: c.count
  }))
}

export function getFabricsMenu() {
  const fabrics = getUniqueFabrics()
  return fabrics.map(f => ({
    label: f.name,
    href: `/tejido/${f.slug}`,
    count: f.count
  }))
}

// Menu de tejidos con variantes (nuevo sistema profesional)
export function getFabricsMenuExpanded() {
  return [
    {
      family: "suplex",
      familyName: fabricFamilies.suplex.name,
      familyIcon: "Zap",
      variants: FABRICS.filter(f => f.family === "suplex").map(f => ({
        label: f.name,
        shortLabel: f.name.replace("Suplex ", ""),
        href: `/tejido/${f.slug}`,
        description: f.summary
      }))
    },
    {
      family: "algodon",
      familyName: fabricFamilies.algodon.name,
      familyIcon: "Feather",
      variants: FABRICS.filter(f => f.family === "algodon").map(f => ({
        label: f.name,
        shortLabel: f.name.replace("Algodón ", ""),
        href: `/tejido/${f.slug}`,
        description: f.summary
      }))
    }
  ]
}
