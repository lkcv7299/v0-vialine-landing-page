"use client"
import { useEffect } from 'react'

// Transformaciones del debugger guardadas
const SAVED_TRANSFORMS = {
  "camiseta-cuello-alto": {
    "azulmarino": {
      "0": {
        "card": { x: 0, y: 64, scale: 1.5, context: "card" }
      }
    }
  },
  "camiseta-manga-larga": {
    "marino": {
      "1": {
        "card": { x: 0, y: 0, scale: 1, context: "card" }
      }
    }
  },
  "camiseta-manga-corta": {
    "azulmarino": {
      "0": {
        "card": { x: 0, y: 64, scale: 1.5, context: "card" }
      }
    }
  },
  "camiseta-gia": {
    "blanco": {
      "0": {
        "card": { x: 6, y: 80, scale: 1.5, context: "card" }
      }
    }
  },
  "short-slim": {
    "acero": {
      "0": {
        "card": { x: 0, y: -53, scale: 1.36, context: "card" }
      }
    }
  },
  "short-ciclista": {
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
  "short-brasil": {
    "beige": {
      "0": {
        "card": { x: 0, y: -69, scale: 1.49, context: "card" }
      }
    }
  },
  "maxi-short": {
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
  "mini-short": {
    "beige": {
      "0": {
        "card": { x: 0, y: -69, scale: 1.49, context: "card" }
      }
    }
  },
  "body-manga-larga": {
    "beige": {
      "0": {
        "card": { x: 0, y: 64, scale: 1.5, context: "card" }
      }
    }
  },
  "top-afrodita": {
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
  "top-paradise": {
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
  }
}

export default function ImageTransformLoader() {
  useEffect(() => {
    // Cargar transformaciones automáticamente en localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('imageTransforms', JSON.stringify(SAVED_TRANSFORMS))
      console.log('✅ Transformaciones cargadas en localStorage')
    }
  }, [])

  return null
}
