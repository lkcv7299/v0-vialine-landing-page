import type { FabricFamily, FabricVariant, FabricFamilyId, FabricSlug } from "@/types/fabric"

// ============================================================================
// FAMILIAS DE TEJIDOS
// ============================================================================

export const fabricFamilies: Record<FabricFamilyId, FabricFamily> = {
  suplex: {
    id: "suplex",
    name: "Suplex",
    icon: "Zap",
    description: "Tejidos de alto rendimiento diseñados para el movimiento. Perfectos para entrenamientos intensos, ofrecen máxima elasticidad, compresión y secado rápido.",
    color: "violet",
    gradient: "from-violet-500 to-purple-600"
  },
  algodon: {
    id: "algodon",
    name: "Algodón",
    icon: "Feather",
    description: "Tejidos naturales que priorizan la comodidad y suavidad. Ideales para uso diario y casual, con excelente transpirabilidad y sensación al tacto.",
    color: "amber",
    gradient: "from-amber-400 to-orange-500"
  }
}

// ============================================================================
// VARIANTES DE TEJIDOS
// ============================================================================

export const fabricVariants: Record<FabricSlug, FabricVariant> = {
  // ─────────────────────────────────────────────────────────────────────────
  // FAMILIA SUPLEX
  // ─────────────────────────────────────────────────────────────────────────
  "suplex-liso-premium": {
    slug: "suplex-liso-premium",
    family: "suplex",
    name: "Suplex Liso Premium",
    shortName: "Liso Premium",
    tagline: "Máximo rendimiento para entrenamientos intensos",
    description: "Nuestro tejido estrella para deportistas exigentes. El Suplex Liso Premium combina una superficie ultra suave con tecnología de compresión que moldea tu figura mientras entrenas. Su acabado liso permite un deslizamiento perfecto y evita rozaduras incluso en los movimientos más intensos.",
    composition: "88% Poliéster, 12% Elastano",
    benefits: [
      "Compresión suave que moldea la figura",
      "Secado ultra rápido (3x más rápido que algodón)",
      "Resistente al cloro y sudor",
      "No transparenta ni con estiramientos",
      "Retención de forma después de múltiples lavados",
      "Protección UV 50+"
    ],
    careInstructions: [
      { icon: "Droplets", text: "Lavar en agua fría (máx 30°C)" },
      { icon: "Wind", text: "Secar a la sombra" },
      { icon: "X", text: "No usar secadora" },
      { icon: "X", text: "No usar blanqueador" },
      { icon: "Shirt", text: "Planchar a baja temperatura si es necesario" }
    ],
    ratings: {
      elasticity: 5,
      breathability: 4,
      softness: 4,
      durability: 5,
      quickDry: 5,
      compression: 5
    },
    idealFor: [
      "Gimnasio y pesas",
      "CrossFit",
      "Running",
      "Yoga y Pilates",
      "Ciclismo indoor",
      "HIIT"
    ],
    notRecommendedFor: [
      "Uso como ropa de dormir",
      "Climas muy fríos sin capa adicional"
    ],
    image: "/images/fabrics/suplex-liso-premium.jpg",
    badgeColor: "bg-violet-100 text-violet-700 border-violet-200",
    applicableCategories: ["mujer", "nina"],
    seo: {
      title: "Suplex Liso Premium | Tejido Deportivo de Alto Rendimiento",
      description: "Descubre nuestra colección en Suplex Liso Premium. Tejido deportivo con compresión, secado rápido y máxima durabilidad para tus entrenamientos más intensos.",
      keywords: ["suplex premium", "ropa deportiva", "leggings compresión", "tejido deportivo"]
    }
  },

  "suplex-perchado": {
    slug: "suplex-perchado",
    family: "suplex",
    name: "Suplex Perchado",
    shortName: "Perchado",
    tagline: "Calidez y rendimiento para días fríos",
    description: "La evolución del Suplex para temporadas frías. El interior perchado (afelpado) proporciona una capa de calidez extra sin sacrificar las propiedades técnicas del Suplex. Perfecto para entrenamientos al aire libre o gimnasios con aire acondicionado.",
    composition: "85% Poliéster, 15% Elastano (interior perchado)",
    benefits: [
      "Interior afelpado que retiene el calor corporal",
      "Exterior liso que repele humedad",
      "Misma elasticidad que el Suplex tradicional",
      "Ideal para entrenamientos en climas fríos",
      "Mayor grosor sin perder flexibilidad",
      "Tacto ultra suave en contacto con la piel"
    ],
    careInstructions: [
      { icon: "Droplets", text: "Lavar en agua fría (máx 30°C)" },
      { icon: "RotateCcw", text: "Lavar del revés para proteger el perchado" },
      { icon: "Wind", text: "Secar a la sombra" },
      { icon: "X", text: "No usar secadora (daña las fibras)" },
      { icon: "X", text: "No usar suavizante (reduce absorción)" }
    ],
    ratings: {
      elasticity: 4,
      breathability: 3,
      softness: 5,
      durability: 4,
      quickDry: 3,
      compression: 4
    },
    idealFor: [
      "Entrenamientos de invierno",
      "Running al aire libre",
      "Gimnasios con AC fuerte",
      "Yoga en estudios fríos",
      "Senderismo ligero"
    ],
    notRecommendedFor: [
      "Entrenamientos de alta intensidad en verano",
      "Natación o deportes acuáticos"
    ],
    image: "/images/fabrics/suplex-perchado.jpg",
    badgeColor: "bg-purple-100 text-purple-700 border-purple-200",
    applicableCategories: ["mujer"],
    seo: {
      title: "Suplex Perchado | Tejido Térmico Deportivo",
      description: "Leggings y ropa deportiva en Suplex Perchado. Interior afelpado para máxima calidez sin perder rendimiento. Ideal para entrenamientos de invierno.",
      keywords: ["suplex perchado", "leggings térmicos", "ropa deportiva invierno", "tejido afelpado"]
    }
  },

  // ─────────────────────────────────────────────────────────────────────────
  // FAMILIA ALGODÓN
  // ─────────────────────────────────────────────────────────────────────────
  "algodon-premium": {
    slug: "algodon-premium",
    family: "algodon",
    name: "Algodón Premium",
    shortName: "Premium",
    tagline: "Suavidad natural para el día a día",
    description: "Algodón de fibra larga peinado que ofrece una suavidad excepcional. Nuestro Algodón Premium es perfecto para prendas de uso diario que requieren comodidad sin sacrificar estilo. Transpirable, hipoalergénico y amigable con pieles sensibles.",
    composition: "95% Algodón peinado, 5% Elastano",
    benefits: [
      "Fibra natural hipoalergénica",
      "Máxima transpirabilidad",
      "Suavidad que mejora con cada lavado",
      "Ideal para pieles sensibles",
      "No genera estática",
      "Termorregulador natural"
    ],
    careInstructions: [
      { icon: "Droplets", text: "Lavar en agua tibia (máx 40°C)" },
      { icon: "Sun", text: "Se puede secar al sol" },
      { icon: "Check", text: "Se puede usar secadora (baja temperatura)" },
      { icon: "Shirt", text: "Planchar a temperatura media" },
      { icon: "Check", text: "Admite blanqueador sin cloro" }
    ],
    ratings: {
      elasticity: 3,
      breathability: 5,
      softness: 5,
      durability: 4,
      quickDry: 2,
      compression: 2
    },
    idealFor: [
      "Uso diario casual",
      "Yoga suave",
      "Loungewear",
      "Pijamas deportivas",
      "Caminatas ligeras",
      "Actividades de bajo impacto"
    ],
    notRecommendedFor: [
      "Entrenamientos de alta intensidad",
      "Deportes acuáticos",
      "Actividades donde el secado rápido es crucial"
    ],
    image: "/images/fabrics/algodon-premium.jpg",
    badgeColor: "bg-amber-100 text-amber-700 border-amber-200",
    applicableCategories: ["mujer", "nina"],
    seo: {
      title: "Algodón Premium | Comodidad Natural Premium",
      description: "Ropa en Algodón Premium de fibra larga. Suavidad excepcional, transpirabilidad natural e hipoalergénico. Perfecto para uso diario.",
      keywords: ["algodón premium", "ropa casual", "algodón suave", "ropa hipoalergénica"]
    }
  },

  "algodon-french-terry": {
    slug: "algodon-french-terry",
    family: "algodon",
    name: "Algodón French Terry",
    shortName: "French Terry",
    tagline: "El abrazo perfecto entre comodidad y estilo",
    description: "French Terry es un tejido de punto con un lado liso y uno con bucles suaves. Esta estructura única ofrece la transpirabilidad del algodón con un toque de calidez extra. Perfecto para prendas athleisure que van del gimnasio a la calle sin esfuerzo.",
    composition: "80% Algodón, 15% Poliéster, 5% Elastano",
    benefits: [
      "Textura de bucles que atrapa aire (calidez ligera)",
      "Exterior liso perfecto para estampados",
      "Más grueso que algodón regular sin ser pesado",
      "Excelente para layering (capas)",
      "Absorbe humedad sin sentirse mojado",
      "Look athleisure versátil"
    ],
    careInstructions: [
      { icon: "Droplets", text: "Lavar en agua fría a tibia (30-40°C)" },
      { icon: "RotateCcw", text: "Lavar del revés para preservar textura" },
      { icon: "Wind", text: "Preferible secar al aire" },
      { icon: "Check", text: "Secadora en ciclo delicado" },
      { icon: "Shirt", text: "Planchar del revés a temperatura media" }
    ],
    ratings: {
      elasticity: 3,
      breathability: 4,
      softness: 5,
      durability: 4,
      quickDry: 2,
      compression: 2
    },
    idealFor: [
      "Athleisure / Street style",
      "Días de descanso activo",
      "Yoga restaurativo",
      "Viajes",
      "Work from home",
      "Entrenamientos ligeros en clima fresco"
    ],
    notRecommendedFor: [
      "Entrenamientos de alta intensidad",
      "Climas muy calurosos",
      "Deportes de contacto"
    ],
    image: "/images/fabrics/algodon-french-terry.jpg",
    badgeColor: "bg-orange-100 text-orange-700 border-orange-200",
    applicableCategories: ["mujer", "nina"],
    seo: {
      title: "Algodón French Terry | Tejido Athleisure Premium",
      description: "Colección en Algodón French Terry. El tejido perfecto para athleisure: comodidad, estilo y versatilidad del gym a la calle.",
      keywords: ["french terry", "athleisure", "algodón french terry", "ropa casual deportiva"]
    }
  },

  "algodon-gamusa": {
    slug: "algodon-gamusa",
    family: "algodon",
    name: "Algodón Gamusa",
    shortName: "Gamusa",
    tagline: "Lujo táctil en cada movimiento",
    description: "Nuestro Algodón Gamusa presenta un acabado aterciopelado que imita la suavidad de la gamuza natural. Este proceso especial crea una superficie ultra suave con un aspecto premium. La sensación de lujo perfecta para quienes buscan comodidad excepcional.",
    composition: "92% Algodón cepillado, 8% Elastano",
    benefits: [
      "Acabado aterciopelado ultra suave",
      "Aspecto premium y elegante",
      "Mayor retención de calor que algodón regular",
      "Excelente para climas frescos",
      "No genera pelusa después de lavados",
      "Ideal para pieles sensibles"
    ],
    careInstructions: [
      { icon: "Droplets", text: "Lavar en agua fría (máx 30°C)" },
      { icon: "RotateCcw", text: "Siempre lavar del revés" },
      { icon: "X", text: "No usar secadora" },
      { icon: "Wind", text: "Secar en horizontal a la sombra" },
      { icon: "X", text: "No planchar directamente (usar tela protectora)" }
    ],
    ratings: {
      elasticity: 3,
      breathability: 3,
      softness: 5,
      durability: 3,
      quickDry: 2,
      compression: 2
    },
    idealFor: [
      "Loungewear de lujo",
      "Yoga en casa",
      "Días de descanso",
      "Viajes largos",
      "Outfit casual elegante",
      "Temporada de otoño-invierno"
    ],
    notRecommendedFor: [
      "Entrenamientos intensos",
      "Uso en verano/climas calurosos",
      "Actividades con alta fricción"
    ],
    image: "/images/fabrics/algodon-gamusa.jpg",
    badgeColor: "bg-yellow-100 text-yellow-700 border-yellow-200",
    applicableCategories: ["mujer"],
    seo: {
      title: "Algodón Gamusa | Suavidad Premium Aterciopelada",
      description: "Ropa en Algodón Gamusa con acabado aterciopelado. Lujo táctil y comodidad excepcional para tu día a día.",
      keywords: ["algodón gamusa", "ropa suave", "algodón aterciopelado", "loungewear premium"]
    }
  }
}

// ============================================================================
// HELPERS
// ============================================================================

export function getFabricBySlug(slug: FabricSlug): FabricVariant | undefined {
  return fabricVariants[slug]
}

export function getFabricFamily(familyId: FabricFamilyId): FabricFamily {
  return fabricFamilies[familyId]
}

export function getFabricsByFamily(familyId: FabricFamilyId): FabricVariant[] {
  return Object.values(fabricVariants).filter(f => f.family === familyId)
}

export function getAllFabrics(): FabricVariant[] {
  return Object.values(fabricVariants)
}

export function getAllFabricSlugs(): FabricSlug[] {
  return Object.keys(fabricVariants) as FabricSlug[]
}

export function getFabricsForCategory(category: "mujer" | "nina"): FabricVariant[] {
  return Object.values(fabricVariants).filter(f =>
    f.applicableCategories.includes(category)
  )
}

// Rating labels para UI
export const ratingLabels: Record<keyof import("@/types/fabric").FabricRatings, string> = {
  elasticity: "Elasticidad",
  breathability: "Transpirabilidad",
  softness: "Suavidad",
  durability: "Durabilidad",
  quickDry: "Secado Rápido",
  compression: "Compresión"
}

// Para el comparador
export function compareFabrics(slugs: FabricSlug[]): FabricVariant[] {
  return slugs.map(slug => fabricVariants[slug]).filter(Boolean)
}
