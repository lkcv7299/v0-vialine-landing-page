"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import type { Product } from '@/data/products'
import { toast } from 'sonner'
import { trackAddToCart } from '@/lib/analytics'

export type CartItem = {
  product: Product
  quantity: number
  selectedColor: string
  selectedSize: string
}

export type AppliedCoupon = {
  code: string
  discount: number
  type: "percentage" | "fixed"
}

type CartContextType = {
  items: CartItem[]
  addItem: (product: Product, color: string, size: string, quantity?: number) => void
  removeItem: (productSlug: string, color: string, size: string) => void
  updateQuantity: (productSlug: string, color: string, size: string, quantity: number) => void
  clearCart: () => void
  total: number
  itemCount: number
  appliedCoupon: AppliedCoupon | null
  applyCoupon: (coupon: AppliedCoupon) => void
  removeCoupon: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(null)
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

    const savedCoupon = localStorage.getItem('vialine-coupon')
    if (savedCoupon) {
      try {
        setAppliedCoupon(JSON.parse(savedCoupon))
      } catch (e) {
        console.error('Error loading coupon:', e)
      }
    }
  }, [])

  // Guardar en localStorage cuando cambie
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('vialine-cart', JSON.stringify(items))
    }
  }, [items, mounted])

  useEffect(() => {
    if (mounted) {
      if (appliedCoupon) {
        localStorage.setItem('vialine-coupon', JSON.stringify(appliedCoupon))
      } else {
        localStorage.removeItem('vialine-coupon')
      }
    }
  }, [appliedCoupon, mounted])

  const addItem = (product: Product, color: string, size: string, quantity: number = 1) => {
    setItems(current => {
      const existing = current.find(
        item => item.product.slug === product.slug &&
                item.selectedColor === color &&
                item.selectedSize === size
      )

      if (existing) {
        // Check stock limit before adding more
        const newQuantity = existing.quantity + quantity
        const stockLimit = product.inventory || 999

        if (newQuantity > stockLimit) {
          toast.error(`Stock máximo alcanzado (${stockLimit} unidades)`)
          return current // Don't add if exceeds stock
        }

        toast.success(`Producto actualizado en el carrito (${newQuantity})`)
        return current.map(item =>
          item.product.slug === product.slug &&
          item.selectedColor === color &&
          item.selectedSize === size
            ? { ...item, quantity: newQuantity }
            : item
        )
      }

      toast.success(`${quantity > 1 ? `${quantity} productos agregados` : 'Producto agregado'} al carrito`)

      // Track add to cart event
      trackAddToCart({
        id: product.slug,
        name: product.title,
        price: product.price,
        quantity: quantity,
      })

      return [...current, { product, quantity, selectedColor: color, selectedSize: size }]
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
    setAppliedCoupon(null)
  }

  const applyCoupon = (coupon: AppliedCoupon) => {
    setAppliedCoupon(coupon)
    toast.success(`Cupón ${coupon.code} aplicado`)
  }

  const removeCoupon = () => {
    setAppliedCoupon(null)
    toast.success('Cupón removido')
  }

  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      total,
      itemCount,
      appliedCoupon,
      applyCoupon,
      removeCoupon
    }}>
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
