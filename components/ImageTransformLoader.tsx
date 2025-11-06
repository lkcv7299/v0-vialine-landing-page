"use client"
import { useEffect } from 'react'

// Transformaciones exactas del debugger
const SAVED_TRANSFORMS = {
  "camiseta-cuello-alto-azul-marino-cuello-alto": {
    "azulmarino": {
      "0": {
        "card": { x: 0, y: 64, scale: 1.5, context: "card" },
        "rail": { x: 0, y: 163, scale: 1.97, context: "rail" }
      }
    }
  },
  "camiseta-manga-larga-azul-marino-manga-larga-azul": {
    "marino": {
      "1": {
        "card": { x: 0, y: 0, scale: 1, context: "card" },
        "rail": { x: 0, y: 108, scale: 1.5, context: "rail" }
      }
    }
  },
  "camiseta-manga-corta-azul-marino-camiseta": {
    "azulmarino": {
      "0": {
        "card": { x: 0, y: 64, scale: 1.5, context: "card" },
        "rail": { x: 0, y: 119, scale: 1.74, context: "rail" }
      }
    }
  },
  "camiseta-gia-blanco-camiseta-gia": {
    "blanco": {
      "0": {
        "card": { x: 6, y: 80, scale: 1.5, context: "card" },
        "rail": { x: 0, y: 131, scale: 1.69, context: "rail" }
      }
    }
  },
  "short-slim-suplex-liso-premium-acero-short-slim": {
    "acero": {
      "0": {
        "card": { x: 0, y: -53, scale: 1.36, context: "card" },
        "rail": { x: 0, y: -128, scale: 1.53, context: "rail" }
      }
    }
  },
  "short-ciclista-active": {
    "aqua": {
      "0": {
        "card": { x: 0, y: -69, scale: 1.49, context: "card" },
        "rail": { x: 0, y: -122, scale: 1.7, context: "rail" }
      }
    }
  },
  "short-lux": {
    "aqua": {
      "0": {
        "card": { x: 0, y: -60, scale: 1.4, context: "card" },
        "rail": { x: 0, y: -122, scale: 1.57, context: "rail" }
      }
    }
  },
  "short-brasil-beige-short-brasil": {
    "beige": {
      "0": {
        "card": { x: 0, y: -69, scale: 1.49, context: "card" },
        "rail": { x: 0, y: -122, scale: 1.57, context: "rail" }
      }
    }
  },
  "maxi-short-beige-MAXI-SHORT": {
    "BEIGE": {
      "0": {
        "card": { x: 0, y: -69, scale: 1.49, context: "card" },
        "rail": { x: 0, y: -122, scale: 1.57, context: "rail" }
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
      // ✅ SISTEMA NUEVO: Limpiamos los transforms antiguos que no tienen containerWidth
      // El usuario necesita re-ajustar con Ctrl+Shift+F para que se guarde correctamente
      const existingTransforms = localStorage.getItem('imageTransforms')

      if (existingTransforms) {
        try {
          const parsed = JSON.parse(existingTransforms)
          // Verificar si algún transform tiene containerWidth
          let hasContainerWidth = false
          Object.values(parsed).forEach((product: any) => {
            Object.values(product || {}).forEach((color: any) => {
              Object.values(color || {}).forEach((index: any) => {
                Object.values(index || {}).forEach((transform: any) => {
                  if (transform?.containerWidth) {
                    hasContainerWidth = true
                  }
                })
              })
            })
          })

          // Si no tienen containerWidth, limpiar
          if (!hasContainerWidth) {
            console.log('🔄 Sistema actualizado: Limpiando transforms antiguos. Re-ajusta las imágenes con Ctrl+Shift+F')
            localStorage.removeItem('imageTransforms')
          }
        } catch (e) {
          console.error('Error verificando transforms:', e)
        }
      }
    }
  }, [])

  return null
}
