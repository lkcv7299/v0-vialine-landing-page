"use client"
import { useWishlist } from "@/components/providers/WishlistContext"

export default function WishlistPage() {
  const { items } = useWishlist()
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-2xl font-semibold mb-6">Favoritos</h1>
      {items.length === 0 ? (
        <p>No tienes productos en favoritos.</p>
      ) : (
        <ul className="list-disc pl-6 space-y-1">
          {items.map((slug) => (
            <li key={slug}>{slug}</li>
          ))}
        </ul>
      )}
    </main>
  )
}
