"use client"

import { useEffect } from "react"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Error global capturado:", error)
  }, [error])

  return (
    <html lang="es">
      <body>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
            fontFamily: "system-ui, sans-serif",
            backgroundColor: "#fafafa",
          }}
        >
          <div style={{ textAlign: "center", maxWidth: "400px" }}>
            <div
              style={{
                width: "64px",
                height: "64px",
                backgroundColor: "#ffe4e6",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 24px",
              }}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#e11d48"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>

            <h1
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: "#171717",
                marginBottom: "8px",
              }}
            >
              ¡Algo salió mal!
            </h1>

            <p
              style={{
                color: "#525252",
                marginBottom: "24px",
                lineHeight: 1.5,
              }}
            >
              Ocurrió un error crítico. Por favor recarga la página o intenta más tarde.
            </p>

            {error.digest && (
              <p
                style={{
                  fontSize: "0.75rem",
                  color: "#a3a3a3",
                  marginBottom: "24px",
                  fontFamily: "monospace",
                }}
              >
                Error: {error.digest}
              </p>
            )}

            <button
              onClick={() => reset()}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                padding: "12px 24px",
                backgroundColor: "#e11d48",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontWeight: 600,
                cursor: "pointer",
                fontSize: "1rem",
              }}
            >
              Recargar página
            </button>

            <p
              style={{
                marginTop: "32px",
                fontSize: "0.875rem",
                color: "#737373",
              }}
            >
              ¿Necesitas ayuda?{" "}
              <a
                href="https://wa.me/51972327236"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#e11d48" }}
              >
                Contáctanos
              </a>
            </p>
          </div>
        </div>
      </body>
    </html>
  )
}
