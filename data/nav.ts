export const NAV = {
  mujer: {
    verTodo: { label: "Ver todo", href: "/mujer" },
    cols: [
      {
        title: "Ropa",
        links: [
          { label: "Leggings", href: "/mujer/legging" },
          { label: "Short", href: "/mujer/short" },
          { label: "Pescador", href: "/mujer/pescador" },
          { label: "Torero", href: "/mujer/torero" },
          { label: "Bodys", href: "/mujer/bodys" },
          { label: "Enterizos", href: "/mujer/enterizo" },
          { label: "Tops", href: "/mujer/tops" },
          { label: "Camisetas", href: "/mujer/camisetas" },
        ],
      },
      {
        title: "Destacados",
        links: [
          { label: "Popular ahora", href: "/mujer?sort=popular" },
          { label: "Novedades", href: "/mujer?sort=new" },
          { label: "Ofertas", href: "/mujer?sort=sale" },
        ],
      },
    ],
  },
  nina: {
    verTodo: { label: "Ver todo", href: "/nina" },
    cols: [
      {
        title: "Ropa",
        links: [
          { label: "Cafarenas", href: "/nina/cafarenas" },
          { label: "Enterizos", href: "/nina/enterizos" },
          { label: "Legging", href: "/nina/legging" },
          { label: "Short", href: "/nina/shorts" },
          { label: "Panty", href: "/nina/panty" },
          { label: "Tops", href: "/nina/tops" },
        ],
      },
    ],
  },
}
