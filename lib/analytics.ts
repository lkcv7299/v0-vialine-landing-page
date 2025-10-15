/**
 * Google Analytics 4 Event Tracking
 * Documentación: https://developers.google.com/analytics/devguides/collection/ga4/events
 */

declare global {
  interface Window {
    gtag: (...args: any[]) => void
  }
}

/**
 * Ver un producto
 */
export const trackViewItem = (product: {
  id: string
  name: string
  price: number
  category?: string
}) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "view_item", {
      currency: "PEN",
      value: product.price,
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          price: product.price,
          item_category: product.category || "uncategorized",
          quantity: 1,
        },
      ],
    })
  }
}

/**
 * Agregar al carrito
 */
export const trackAddToCart = (product: {
  id: string
  name: string
  price: number
  quantity: number
}) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "add_to_cart", {
      currency: "PEN",
      value: product.price * product.quantity,
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          price: product.price,
          quantity: product.quantity,
        },
      ],
    })
  }
}

/**
 * Ver el carrito
 */
export const trackViewCart = (cartItems: Array<{ id: string; name: string; price: number; quantity: number }>) => {
  if (typeof window !== "undefined" && window.gtag) {
    const totalValue = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    
    window.gtag("event", "view_cart", {
      currency: "PEN",
      value: totalValue,
      items: cartItems.map((item) => ({
        item_id: item.id,
        item_name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
    })
  }
}

/**
 * Iniciar checkout
 */
export const trackBeginCheckout = (cartItems: Array<{ id: string; name: string; price: number; quantity: number }>) => {
  if (typeof window !== "undefined" && window.gtag) {
    const totalValue = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    
    window.gtag("event", "begin_checkout", {
      currency: "PEN",
      value: totalValue,
      items: cartItems.map((item) => ({
        item_id: item.id,
        item_name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
    })
  }
}

/**
 * Búsqueda
 */
export const trackSearch = (searchTerm: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "search", {
      search_term: searchTerm,
    })
  }
}

/**
 * Ver lista de productos (categoría)
 */
export const trackViewItemList = (listName: string, items: Array<{ id: string; name: string; price: number }>) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "view_item_list", {
      item_list_name: listName,
      items: items.slice(0, 10).map((item, index) => ({
        item_id: item.id,
        item_name: item.name,
        price: item.price,
        index: index,
      })),
    })
  }
}

/**
 * Newsletter popup visto
 */
export const trackNewsletterPopupView = () => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "newsletter_popup_view", {
      event_category: "engagement",
      event_label: "Newsletter Popup Shown",
    })
  }
}

/**
 * Suscripción a newsletter
 */
export const trackNewsletterSubscribe = () => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "newsletter_subscribe", {
      event_category: "conversion",
      event_label: "Newsletter Subscription",
    })
  }
}

/**
 * Agregar a wishlist
 */
export const trackAddToWishlist = (product: { id: string; name: string; price: number }) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "add_to_wishlist", {
      currency: "PEN",
      value: product.price,
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          price: product.price,
        },
      ],
    })
  }
}