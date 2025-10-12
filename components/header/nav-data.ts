export type NavColumn = { title: string; items: { label: string; href: string }[] }
export type MegaItem = { key: "mujer" | "nina"; label: string; columns: NavColumn[] }

export const MEGA_MENU: MegaItem[] = [
  {
    key: "mujer",
    label: "Mujer",
    columns: [
      {
        title: "Ropa",
        items: [
          { label: "Ver todo", href: "/mujer" },
          { label: "Tops", href: "/mujer/tops" },
          { label: "Camisetas", href: "/mujer/camisetas" },
          { label: "Body", href: "/mujer/body" },
          { label: "Enterizo", href: "/mujer/enterizo" },
          { label: "Legging", href: "/mujer/legging" },
          { label: "Pescador", href: "/mujer/pescador" },
          { label: "Short", href: "/mujer/short" },
          { label: "Torero", href: "/mujer/torero" },
        ],
      },
      {
        title: "Favoritos",
        items: [
          { label: "Novedades", href: "/mujer?novedades=1" },
          { label: "Superventas", href: "/mujer?best=1" },
        ],
      },
      {
        title: "Por actividad",
        items: [
          { label: "Yoga", href: "/mujer?actividad=yoga" },
          { label: "Entrenar", href: "/mujer?actividad=entrenar" },
        ],
      },
      {
        title: "Ayuda",
        items: [
          { label: "Guía de tallas", href: "/guias/tallas" },
          { label: "Cambios y devoluciones", href: "/ayuda/devoluciones" },
        ],
      },
    ],
  },
  {
    key: "nina",
    label: "Niña",
    columns: [
      {
        title: "Ropa",
        items: [
          { label: "Ver todo", href: "/nina" },
          { label: "Tops niñas", href: "/nina/tops" },
          { label: "Short niñas", href: "/nina/shorts" },
          { label: "Legging de niña", href: "/nina/legging" },
          { label: "Enterizos niña", href: "/nina/enterizos" },
          { label: "Cafarenas niña", href: "/nina/cafarenas" },
          { label: "Panty de niña", href: "/nina/panty" },
        ],
      },
      {
        title: "Favoritos",
        items: [
          { label: "Lo nuevo", href: "/nina?novedades=1" },
          { label: "Populares", href: "/nina?best=1" },
        ],
      },
      {
        title: "Por actividad",
        items: [
          { label: "Ballet / Danza", href: "/nina?actividad=danza" },
          { label: "Entrenar", href: "/nina?actividad=entrenar" },
        ],
      },
      {
        title: "Ayuda",
        items: [{ label: "Guía de tallas", href: "/guias/tallas" }],
      },
    ],
  },
]

// Si más adelante vuelven "Tejidos / Colecciones", se agregan aquí.
export const SIMPLE_LINKS: { label: string; href: string }[] = [
  // { label: "Tejidos", href: "/tejidos" },
  // { label: "Colecciones", href: "/colecciones" },
]
