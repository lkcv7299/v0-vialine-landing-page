"use client"

import { useState, useRef } from "react"
import MuxPlayer from "@mux/mux-player-react"

export default function VideosAdminPage() {
  const [uploadUrl, setUploadUrl] = useState<string | null>(null)
  const [uploadId, setUploadId] = useState<string | null>(null)
  const [status, setStatus] = useState<string>("")
  const [playbackId, setPlaybackId] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [assets, setAssets] = useState<any[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Paso 1: Crear URL de upload
  const createUploadUrl = async () => {
    setStatus("Creando URL de upload...")
    try {
      const res = await fetch("/api/mux/upload", { method: "POST" })
      const data = await res.json()
      if (data.uploadUrl) {
        setUploadUrl(data.uploadUrl)
        setUploadId(data.uploadId)
        setStatus("URL creada. Selecciona un video para subir.")
      } else {
        setStatus("Error: " + data.error)
      }
    } catch (error) {
      setStatus("Error creando URL de upload")
    }
  }

  // Paso 2: Subir video
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !uploadUrl) return

    setIsUploading(true)
    setStatus(`Subiendo ${file.name}...`)

    try {
      const xhr = new XMLHttpRequest()

      xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100)
          setUploadProgress(percent)
          setStatus(`Subiendo... ${percent}%`)
        }
      })

      xhr.addEventListener("load", async () => {
        if (xhr.status === 200) {
          setStatus("Video subido! Procesando en MUX...")
          setUploadProgress(100)
          // Esperar y verificar el estado
          setTimeout(() => checkAssetStatus(), 3000)
        } else {
          setStatus("Error al subir el video")
        }
        setIsUploading(false)
      })

      xhr.addEventListener("error", () => {
        setStatus("Error de red al subir")
        setIsUploading(false)
      })

      xhr.open("PUT", uploadUrl)
      xhr.send(file)
    } catch (error) {
      setStatus("Error al subir video")
      setIsUploading(false)
    }
  }

  // Paso 3: Verificar estado del asset
  const checkAssetStatus = async () => {
    if (!uploadId) return

    setStatus("Verificando estado del video...")
    try {
      const res = await fetch(`/api/mux/asset?uploadId=${uploadId}`)
      const data = await res.json()

      if (data.playbackId) {
        setPlaybackId(data.playbackId)
        setStatus(`Video listo! Playback ID: ${data.playbackId}`)
      } else if (data.status === "waiting" || data.status === "processing") {
        setStatus("Video procesando... espera unos segundos")
        setTimeout(() => checkAssetStatus(), 5000)
      } else {
        setStatus(`Estado: ${data.status}`)
      }
    } catch (error) {
      setStatus("Error verificando estado")
    }
  }

  // Listar todos los assets
  const listAssets = async () => {
    setStatus("Cargando videos...")
    try {
      const res = await fetch("/api/mux/asset", { method: "POST" })
      const data = await res.json()
      if (data.assets) {
        setAssets(data.assets)
        setStatus(`${data.assets.length} videos encontrados`)
      }
    } catch (error) {
      setStatus("Error listando videos")
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setStatus(`Copiado: ${text}`)
  }

  return (
    <div className="min-h-screen bg-neutral-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Admin - Videos MUX</h1>

        {/* Upload Section */}
        <div className="bg-white rounded-lg p-6 mb-8 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Subir nuevo video</h2>

          <div className="space-y-4">
            <button
              onClick={createUploadUrl}
              disabled={isUploading}
              className="px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-neutral-800 disabled:bg-neutral-400"
            >
              1. Crear URL de Upload
            </button>

            {uploadUrl && (
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="video/*"
                  onChange={handleFileUpload}
                  disabled={isUploading}
                  className="block w-full text-sm text-neutral-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-neutral-800"
                />
              </div>
            )}

            {isUploading && (
              <div className="w-full bg-neutral-200 rounded-full h-4">
                <div
                  className="bg-black h-4 rounded-full transition-all"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            )}

            {uploadId && !playbackId && (
              <button
                onClick={checkAssetStatus}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
              >
                Verificar estado
              </button>
            )}

            <p className="text-sm text-neutral-600">{status}</p>

            {playbackId && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="font-semibold text-green-800">Video listo!</p>
                <p className="text-sm text-green-700 mt-1">
                  Playback ID:{" "}
                  <code
                    className="bg-green-100 px-2 py-1 rounded cursor-pointer"
                    onClick={() => copyToClipboard(playbackId)}
                  >
                    {playbackId}
                  </code>
                </p>
                <p className="text-xs text-green-600 mt-2">
                  Click en el ID para copiar
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Preview Section */}
        {playbackId && (
          <div className="bg-white rounded-lg p-6 mb-8 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Preview</h2>
            <MuxPlayer
              playbackId={playbackId}
              streamType="on-demand"
              autoPlay
              muted
              loop
              className="w-full aspect-video rounded-lg"
            />
          </div>
        )}

        {/* List Assets Section */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Videos existentes</h2>
            <button
              onClick={listAssets}
              className="px-4 py-2 bg-neutral-100 text-neutral-800 rounded-lg font-medium hover:bg-neutral-200"
            >
              Cargar lista
            </button>
          </div>

          {assets.length > 0 && (
            <div className="space-y-3">
              {assets.map((asset) => (
                <div
                  key={asset.id}
                  className="p-4 border rounded-lg flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium">
                      {asset.playbackId || "Sin playback ID"}
                    </p>
                    <p className="text-sm text-neutral-500">
                      Estado: {asset.status} | Duración:{" "}
                      {asset.duration ? `${Math.round(asset.duration)}s` : "N/A"}
                    </p>
                  </div>
                  {asset.playbackId && (
                    <button
                      onClick={() => copyToClipboard(asset.playbackId)}
                      className="px-3 py-1 bg-black text-white text-sm rounded hover:bg-neutral-800"
                    >
                      Copiar ID
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="mt-8 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h3 className="font-semibold text-yellow-800 mb-2">Instrucciones</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm text-yellow-700">
            <li>Click en "Crear URL de Upload"</li>
            <li>Selecciona el archivo de video</li>
            <li>Espera a que suba y se procese</li>
            <li>Copia el Playback ID</li>
            <li>Usa ese ID en el componente HeroMujerVideo</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
