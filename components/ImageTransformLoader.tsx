"use client"
import { useEffect } from 'react'

// Transformaciones exactas del debugger
const SAVED_TRANSFORMS = {
  "camiseta-cuello-alto-azul-marino-cuello-alto": {
    "azulmarino": {
      "0": {
        "card": { x: 0, y: 64, scale: 1.5, context: "card" }
      }
    }
  },
  "camiseta-manga-larga-azul-marino-manga-larga-azul": {
    "marino": {
      "1": {
        "card": { x: 0, y: 0, scale: 1, context: "card" }
      }
    }
  },
  "camiseta-manga-corta-azul-marino-camiseta": {
    "azulmarino": {
      "0": {
        "card": { x: 0, y: 64, scale: 1.5, context: "card" }
      }
    }
  },
  "camiseta-gia-blanco-camiseta-gia": {
    "blanco": {
      "0": {
        "card": { x: 6, y: 80, scale: 1.5, context: "card" }
      }
    }
  },
  "short-slim-suplex-liso-premium-acero-short-slim": {
    "acero": {
      "0": {
        "card": { x: 0, y: -53, scale: 1.36, context: "card" }
      }
    }
  },
  "short-ciclista-active": {
    "aqua": {
      "0": {
        "card": { x: 0, y: -69, scale: 1.49, context: "card" }
      }
    }
  },
  "short-lux": {
    "aqua": {
      "0": {
        "card": { x: 0, y: -60, scale: 1.4, context: "card" }
      }
    }
  },
  "short-brasil-beige-short-brasil": {
    "beige": {
      "0": {
        "card": { x: 0, y: -69, scale: 1.49, context: "card" }
      }
    }
  },
  "maxi-short-beige-MAXI-SHORT": {
    "BEIGE": {
      "0": {
        "card": { x: 0, y: -69, scale: 1.49, context: "card" }
      }
    }
  },
  "short-clasico": {
    "negro": {
      "0": {
        "card": { x: 0, y: -69, scale: 1.49, context: "card" }
      }
    }
  },
  "mini-short-beige-mini-short": {
    "beige": {
      "0": {
        "card": { x: 0, y: -69, scale: 1.49, context: "card" }
      }
    }
  },
  "body-manga-larga-beige-manga-larga": {
    "beige": {
      "0": {
        "card": { x: 0, y: 64, scale: 1.5, context: "card" }
      }
    }
  },
  "top-afrodita-suplex-liso-premium-azulino-afrodita": {
    "azulino": {
      "0": {
        "card": { x: 0, y: 2, scale: 1, context: "card" }
      }
    }
  },
  "top-venus": {
    "azulino": {
      "0": {
        "card": { x: 0, y: 0, scale: 1, context: "card" }
      }
    }
  },
  "top-paradise-suplex-liso-premium-azulino-paradise": {
    "azulino": {
      "0": {
        "card": { x: 0, y: 0, scale: 1, context: "card" }
      }
    }
  },
  "top-soporte": {
    "beige": {
      "0": {
        "card": { x: 0, y: 0, scale: 1, context: "card" }
      }
    }
  },
  "top-arena": {
    "blanco": {
      "0": {
        "card": { x: 0, y: 0, scale: 1, context: "card" }
      }
    }
  },
  "top-zafiro": {
    "blanco": {
      "0": {
        "card": { x: 0, y: 0, scale: 1, context: "card" }
      }
    }
  },
  "top-perla": {
    "blanco": {
      "0": {
        "card": { x: 0, y: 0, scale: 1, context: "card" }
      }
    }
  },
  "top-luna": {
    "beige": {
      "0": {
        "card": { x: 9, y: 64, scale: 1.5, context: "card" }
      }
    }
  },
  "enterizo-manga-cero": {
    "azulino": {
      "0": {
        "card": { x: 0, y: 0, scale: 1, context: "card" }
      }
    }
  },
  "top-jungle": {
    "azulino": {
      "0": {
        "card": { x: 0, y: 0, scale: 1, context: "card" }
      }
    }
  },
  "camiseta-tropical": {
    "": {
      "0": {
        "undefined": { x: 0, y: 0, scale: 1 }
      }
    }
  }
}

export default function ImageTransformLoader() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('imageTransforms', JSON.stringify(SAVED_TRANSFORMS))
      console.log('✅ Transformaciones cargadas:', Object.keys(SAVED_TRANSFORMS).length, 'productos')
    }
  }, [])

  return null
}
