"use client"
import { useEffect } from 'react'

// ✅ Transformaciones con containerWidth - Sistema proporcional
const SAVED_TRANSFORMS = {
    "camiseta-cuello-alto-azul-marino-cuello-alto": {
      "azulmarino": {
        "0": {
          "rail": {
            "x": 0,
            "y": 110,
            "scale": 1.68,
            "context": "rail",
            "containerWidth": 483
          },
          "card": {
            "x": 0,
            "y": 48,
            "scale": 1.35,
            "context": "card",
            "containerWidth": 220
          }
        }
      }
    },
    "camiseta-manga-larga-azul-marino-manga-larga-azul": {
      "marino": {
        "1": {
          "rail": {
            "x": 0,
            "y": 133,
            "scale": 1.62,
            "context": "rail",
            "containerWidth": 483
          },
          "card": {
            "x": 0,
            "y": 0,
            "scale": 1,
            "context": "card",
            "containerWidth": 220
          }
        }
      }
    },
    "camiseta-manga-corta-azul-marino-camiseta": {
      "azulmarino": {
        "0": {
          "rail": {
            "x": 0,
            "y": 110,
            "scale": 1.68,
            "context": "rail",
            "containerWidth": 483
          },
          "card": {
            "x": 0,
            "y": 53,
            "scale": 1.38,
            "context": "card",
            "containerWidth": 220
          }
        }
      }
    },
    "camiseta-tropical": {
      "placeholder.svg": {
        "0": {
          "rail": {
            "x": 0,
            "y": 0,
            "scale": 1,
            "context": "rail",
            "containerWidth": 483
          }
        }
      }
    },
    "camiseta-gia-blanco-camiseta-gia": {
      "blanco": {
        "0": {
          "rail": {
            "x": 0,
            "y": 122,
            "scale": 1.68,
            "context": "rail",
            "containerWidth": 483
          },
          "card": {
            "x": 0,
            "y": 64,
            "scale": 1.38,
            "context": "card",
            "containerWidth": 220
          }
        }
      }
    },
    "short-slim-suplex-liso-premium-acero-short-slim": {
      "acero": {
        "0": {
          "rail": {
            "x": 0,
            "y": -158,
            "scale": 1.68,
            "context": "rail",
            "containerWidth": 483
          },
          "card": {
            "x": 0,
            "y": -25,
            "scale": 1.25,
            "context": "card",
            "containerWidth": 220
          }
        }
      }
    },
    "short-ciclista-active": {
      "aqua": {
        "0": {
          "rail": {
            "x": 0,
            "y": -99,
            "scale": 1.51,
            "context": "rail",
            "containerWidth": 483
          },
          "card": {
            "x": 0,
            "y": -64,
            "scale": 1.44,
            "context": "card",
            "containerWidth": 220
          }
        }
      }
    },
    "short-lux": {
      "aqua": {
        "0": {
          "rail": {
            "x": 0,
            "y": -108,
            "scale": 1.51,
            "context": "rail",
            "containerWidth": 483
          },
          "card": {
            "x": 0,
            "y": -57,
            "scale": 1.4,
            "context": "card",
            "containerWidth": 220
          }
        }
      }
    },
    "short-brasil-beige-short-brasil": {
      "beige": {
        "0": {
          "rail": {
            "x": 0,
            "y": -106,
            "scale": 1.51,
            "context": "rail",
            "containerWidth": 483
          },
          "card": {
            "x": 0,
            "y": -64,
            "scale": 1.44,
            "context": "card",
            "containerWidth": 220
          }
        }
      }
    },
    "maxi-short-beige-MAXI-SHORT": {
      "BEIGE": {
        "0": {
          "rail": {
            "x": 0,
            "y": -103,
            "scale": 1.51,
            "context": "rail",
            "containerWidth": 483
          },
          "card": {
            "x": 0,
            "y": -64,
            "scale": 1.44,
            "context": "card",
            "containerWidth": 220
          }
        }
      }
    },
    "camiseta-deportiva": {
      "placeholder.svg": {
        "0": {
          "card": {
            "x": 0,
            "y": 0,
            "scale": 1,
            "context": "card",
            "containerWidth": 220
          }
        }
      }
    },
    "short-clasico": {
      "negro": {
        "0": {
          "card": {
            "x": 0,
            "y": -62,
            "scale": 1.44,
            "context": "card",
            "containerWidth": 220
          },
          "rail": {
            "x": 0,
            "y": -103,
            "scale": 1.51,
            "context": "rail",
            "containerWidth": 483
          }
        }
      }
    },
    "mini-short-beige-mini-short": {
      "beige": {
        "0": {
          "card": {
            "x": 0,
            "y": -64,
            "scale": 1.44,
            "context": "card",
            "containerWidth": 220
          },
          "rail": {
            "x": 0,
            "y": -103,
            "scale": 1.51,
            "context": "rail",
            "containerWidth": 483
          }
        }
      }
    },
    "body-manga-corta-suplex-azul": {
      "marino": {
        "0": {
          "card": {
            "x": 0,
            "y": 0,
            "scale": 1,
            "context": "card",
            "containerWidth": 220
          },
          "rail": {
            "x": 0,
            "y": 78,
            "scale": 1.42,
            "context": "rail",
            "containerWidth": 483
          }
        }
      }
    },
    "body-manga-larga-beige-manga-larga": {
      "beige": {
        "0": {
          "card": {
            "x": 0,
            "y": 53,
            "scale": 1.38,
            "context": "card",
            "containerWidth": 220
          }
        }
      }
    },
    "top-afrodita-suplex-liso-premium-azulino-afrodita": {
      "azulino": {
        "0": {
          "card": {
            "x": 0,
            "y": 0,
            "scale": 1.01,
            "context": "card",
            "containerWidth": 220
          }
        }
      }
    },
    "top-venus": {
      "azulino": {
        "0": {
          "card": {
            "x": 0,
            "y": 0,
            "scale": 1,
            "context": "card",
            "containerWidth": 220
          }
        }
      }
    },
    "top-soporte": {
      "beige": {
        "0": {
          "card": {
            "x": 0,
            "y": 0,
            "scale": 1,
            "context": "card",
            "containerWidth": 220
          }
        }
      }
    },
    "top-zafiro": {
      "blanco": {
        "0": {
          "card": {
            "x": 0,
            "y": 0,
            "scale": 1,
            "context": "card",
            "containerWidth": 220
          }
        }
      }
    },
    "top-luna": {
      "beige": {
        "0": {
          "card": {
            "x": 0,
            "y": 44,
            "scale": 1.31,
            "context": "card",
            "containerWidth": 220
          }
        }
      }
    },
    "top-arena": {
      "blanco": {
        "0": {
          "card": {
            "x": 0,
            "y": 0,
            "scale": 1,
            "context": "card",
            "containerWidth": 220
          }
        }
      }
    },
    "top-perla": {
      "blanco": {
        "0": {
          "card": {
            "x": 0,
            "y": 0,
            "scale": 1.04,
            "context": "card",
            "containerWidth": 220
          }
        }
      }
    },
    "enterizo-manga-cero": {
      "azulino": {
        "0": {
          "card": {
            "x": 0,
            "y": 0,
            "scale": 1,
            "context": "card",
            "containerWidth": 220
          }
        }
      }
    },
    "cafarena-nina": {
      "azulmarino": {
        "0": {
          "rail": {
            "x": 0,
            "y": 101,
            "scale": 1.53,
            "context": "rail",
            "containerWidth": 483
          },
          "card": {
            "x": 0,
            "y": 0,
            "scale": 1,
            "context": "card",
            "containerWidth": 220
          }
        }
      }
    },
    "enterizo-manga-corta-nina": {
      "amarillo": {
        "0": {
          "rail": {
            "x": 2,
            "y": 92,
            "scale": 1.58,
            "context": "rail",
            "containerWidth": 483
          },
          "card": {
            "x": 0,
            "y": 0,
            "scale": 1,
            "context": "card",
            "containerWidth": 220
          }
        }
      }
    },
    "enterizo-manga-larga-nina": {
      "amarillo": {
        "0": {
          "rail": {
            "x": 0,
            "y": 103,
            "scale": 1.5,
            "context": "rail",
            "containerWidth": 483
          },
          "card": {
            "x": 0,
            "y": 0,
            "scale": 1,
            "context": "card",
            "containerWidth": 220
          }
        }
      }
    },
    "legging-nina": {
      "blanco": {
        "0": {
          "rail": {
            "x": 0,
            "y": -122,
            "scale": 1.55,
            "context": "rail",
            "containerWidth": 483
          },
          "card": {
            "x": 0,
            "y": 0,
            "scale": 1,
            "context": "card",
            "containerWidth": 220
          }
        }
      }
    },
    "maxi-short-nina": {
      "azulmarino": {
        "0": {
          "rail": {
            "x": 0,
            "y": -110,
            "scale": 1.55,
            "context": "rail",
            "containerWidth": 483
          },
          "card": {
            "x": 0,
            "y": 0,
            "scale": 1,
            "context": "card",
            "containerWidth": 220
          }
        }
      }
    },
    "panty-nina": {
      "azulmarino": {
        "0": {
          "rail": {
            "x": 0,
            "y": -110,
            "scale": 1.55,
            "context": "rail",
            "containerWidth": 483
          },
          "card": {
            "x": 0,
            "y": 0,
            "scale": 1,
            "context": "card",
            "containerWidth": 220
          }
        }
      }
    },
    "short-juvenil-nina": {
      "azulmarino": {
        "0": {
          "rail": {
            "x": 0,
            "y": -131,
            "scale": 1.55,
            "context": "rail",
            "containerWidth": 483
          },
          "card": {
            "x": 0,
            "y": 0,
            "scale": 1,
            "context": "card",
            "containerWidth": 220
          }
        }
      }
    },
    "top-jazmin": {
      "beige": {
        "0": {
          "rail": {
            "x": 0,
            "y": 120,
            "scale": 1.65,
            "context": "rail",
            "containerWidth": 483
          },
          "card": {
            "x": 0,
            "y": 0,
            "scale": 1,
            "context": "card",
            "containerWidth": 220
          }
        }
      }
    },
    "top-margarita": {
      "beige": {
        "0": {
          "rail": {
            "x": 0,
            "y": 120,
            "scale": 1.5,
            "context": "rail",
            "containerWidth": 483
          },
          "card": {
            "x": 0,
            "y": 0,
            "scale": 1,
            "context": "card",
            "containerWidth": 220
          }
        }
      }
    },
    "top-vani": {
      "blanco": {
        "0": {
          "rail": {
            "x": 0,
            "y": 120,
            "scale": 1.5,
            "context": "rail",
            "containerWidth": 483
          },
          "card": {
            "x": 0,
            "y": 0,
            "scale": 1,
            "context": "card",
            "containerWidth": 220
          }
        }
      }
    }
  }

export default function ImageTransformLoader() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Cargar los transforms al localStorage
      localStorage.setItem('imageTransforms', JSON.stringify(SAVED_TRANSFORMS))
      console.log('✅ Transforms cargados con containerWidth:', Object.keys(SAVED_TRANSFORMS).length, 'productos')
      console.log('🔄 Deployed at:', new Date().toISOString())

      // Emitir evento para actualizar las imágenes
      window.dispatchEvent(new CustomEvent('imageTransformsUpdated'))
    }
  }, [])

  return null
}
