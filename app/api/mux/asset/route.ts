import { NextRequest, NextResponse } from "next/server"
import Mux from "@mux/mux-node"

const mux = new Mux({
  tokenId: process.env.MUX_TOKEN_ID!,
  tokenSecret: process.env.MUX_TOKEN_SECRET!,
})

// GET: Obtener el playback ID de un upload completado
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const uploadId = searchParams.get("uploadId")

  if (!uploadId) {
    return NextResponse.json(
      { error: "uploadId is required" },
      { status: 400 }
    )
  }

  try {
    const upload = await mux.video.uploads.retrieve(uploadId)

    if (upload.status === "asset_created" && upload.asset_id) {
      const asset = await mux.video.assets.retrieve(upload.asset_id)
      const playbackId = asset.playback_ids?.[0]?.id

      return NextResponse.json({
        status: upload.status,
        assetId: upload.asset_id,
        playbackId,
        duration: asset.duration,
      })
    }

    return NextResponse.json({
      status: upload.status,
      message: "Video is still processing",
    })
  } catch (error) {
    console.error("Error getting MUX asset:", error)
    return NextResponse.json(
      { error: "Failed to get asset" },
      { status: 500 }
    )
  }
}

// POST: Listar todos los assets
export async function POST() {
  try {
    const assets = await mux.video.assets.list()

    const formattedAssets = assets.data.map((asset) => ({
      id: asset.id,
      playbackId: asset.playback_ids?.[0]?.id,
      status: asset.status,
      duration: asset.duration,
      createdAt: asset.created_at,
    }))

    return NextResponse.json({ assets: formattedAssets })
  } catch (error) {
    console.error("Error listing MUX assets:", error)
    return NextResponse.json(
      { error: "Failed to list assets" },
      { status: 500 }
    )
  }
}
