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
          { label: "Tops", href: "/shop/mujer/tops" },
          { label: "Camisetas", href: "/shop/mujer/camisetas" },
          { label: "Body", href: "/shop/mujer/body" },
          { label: "Enterizo", href: "/shop/mujer/enterizo" },
          { label: "Legging", href: "/shop/mujer/legging" },
          { label: "Pescador", href: "/shop/mujer/pescador" },
          { label: "Short", href: "/shop/mujer/short" },
          { label: "Torero", href: "/shop/mujer/torero" },
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
          { label: "Guía de tallas", href: "/pages/guia-de-tallas" },
          { label: "Cambios y devoluciones", href: "/pages/envios-y-devoluciones" },
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
          { label: "Tops niñas", href: "/shop/nina/tops" },
          { label: "Short niñas", href: "/shop/nina/shorts" },
          { label: "Legging de niña", href: "/shop/nina/legging" },
          { label: "Enterizos niña", href: "/shop/nina/enterizos" },
          { label: "Cafarenas niña", href: "/shop/nina/cafarenas" },
          { label: "Panty de niña", href: "/shop/nina/panty" },
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
        items: [{ label: "Guía de tallas", href: "/pages/guia-de-tallas" }],
      },
    ],
  },
]

// Si más adelante vuelven "Tejidos / Colecciones", se agregan aquí.
export const SIMPLE_LINKS: { label: string; href: string }[] = [
  // { label: "Tejidos", href: "/tejidos" },
  // { label: "Colecciones", href: "/colecciones" },
]
