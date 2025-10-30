"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import type { Product } from '@/data/products'
import { toast } from 'sonner'

export type CartItem = {
  product: Product
  quantity: number
  selectedColor: string
  selectedSize: string
}

type CartContextType = {
  items: CartItem[]
  addItem: (product: Product, color: string, size: string) => void
  removeItem: (productSlug: string, color: string, size: string) => void
  updateQuantity: (productSlug: string, color: string, size: string, quantity: number) => void
  clearCart: () => void
  total: number
  itemCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [mounted, setMounted] = useState(false)

  // Cargar del localStorage al montar
  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('vialine-cart')
    if (saved) {
      try {
        setItems(JSON.parse(saved))
      } catch (e) {
        console.error('Error loading cart:', e)
      }
    }
  }, [])

  // Guardar en localStorage cuando cambie
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('vialine-cart', JSON.stringify(items))
    }
  }, [items, mounted])

  const addItem = (product: Product, color: string, size: string) => {
    setItems(current => {
      const existing = current.find(
        item => item.product.slug === product.slug &&
                item.selectedColor === color &&
                item.selectedSize === size
      )

      if (existing) {
        // Check stock limit before adding more
        const newQuantity = existing.quantity + 1
        const stockLimit = product.inventory || 999

        if (newQuantity > stockLimit) {
          toast.error(`Stock máximo alcanzado (${stockLimit} unidades)`)
          return current // Don't add if exceeds stock
        }

        toast.success('Producto actualizado en el carrito')
        return current.map(item =>
          item.product.slug === product.slug &&
          item.selectedColor === color &&
          item.selectedSize === size
            ? { ...item, quantity: newQuantity }
            : item
        )
      }

      toast.success('Producto agregado al carrito')
      return [...current, { product, quantity: 1, selectedColor: color, selectedSize: size }]
    })
  }

  const removeItem = (productSlug: string, color: string, size: string) => {
    setItems(current =>
      current.filter(
        item => !(item.product.slug === productSlug &&
                  item.selectedColor === color &&
                  item.selectedSize === size)
      )
    )
    toast.success('Producto eliminado del carrito')
  }

  const updateQuantity = (productSlug: string, color: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productSlug, color, size)
      return
    }

    setItems(current =>
      current.map(item => {
        if (item.product.slug === productSlug &&
            item.selectedColor === color &&
            item.selectedSize === size) {
          // Check stock limit
          const stockLimit = item.product.inventory || 999
          const validQuantity = Math.min(quantity, stockLimit)

          if (quantity > stockLimit) {
            console.warn('Stock máximo alcanzado')
          }

          return { ...item, quantity: validQuantity }
        }
        return item
      })
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, total, itemCount }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}
