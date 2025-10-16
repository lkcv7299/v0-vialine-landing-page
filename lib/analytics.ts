/**
 * Google Analytics 4 + Meta Pixel Event Tracking
 * Documentación: 
 * - GA4: https://developers.google.com/analytics/devguides/collection/ga4/events
 * - Meta: https://developers.facebook.com/docs/meta-pixel/reference
 */

declare global {
  interface Window {
    gtag: (...args: any[]) => void
    fbq: (...args: any[]) => void
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
  // Google Analytics
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

  // Meta Pixel
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "ViewContent", {
      content_ids: [product.id],
      content_name: product.name,
      content_type: "product",
      value: product.price,
      currency: "PEN",
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
  // Google Analytics
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

  // Meta Pixel
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "AddToCart", {
      content_ids: [product.id],
      content_name: product.name,
      content_type: "product",
      value: product.price * product.quantity,
      currency: "PEN",
    })
  }
}

/**
 * Ver el carrito
 */
export const trackViewCart = (cartItems: Array<{ id: string; name: string; price: number; quantity: number }>) => {
  const totalValue = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  // Google Analytics
  if (typeof window !== "undefined" && window.gtag) {
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
  const totalValue = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  // Google Analytics
  if (typeof window !== "undefined" && window.gtag) {
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

  // Meta Pixel
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "InitiateCheckout", {
      content_ids: cartItems.map((item) => item.id),
      contents: cartItems.map((item) => ({
        id: item.id,
        quantity: item.quantity,
      })),
      value: totalValue,
      currency: "PEN",
      num_items: cartItems.length,
    })
  }
}

/**
 * Búsqueda
 */
export const trackSearch = (searchTerm: string) => {
  // Google Analytics
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "search", {
      search_term: searchTerm,
    })
  }

  // Meta Pixel
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "Search", {
      search_string: searchTerm,
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
  // Google Analytics
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "newsletter_subscribe", {
      event_category: "conversion",
      event_label: "Newsletter Subscription",
    })
  }

  // Meta Pixel - Lead event
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "Lead", {
      content_name: "Newsletter Subscription",
    })
  }
}

/**
 * Agregar a wishlist
 */
export const trackAddToWishlist = (product: { id: string; name: string; price: number }) => {
  // Google Analytics
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

  // Meta Pixel
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "AddToWishlist", {
      content_ids: [product.id],
      content_name: product.name,
      value: product.price,
      currency: "PEN",
    })
  }
}

/**
 * Compra completada (para futuro checkout)
 */
export const trackPurchase = (
  orderId: string,
  cartItems: Array<{ id: string; name: string; price: number; quantity: number }>,
  totalValue: number
) => {
  // Google Analytics
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "purchase", {
      transaction_id: orderId,
      value: totalValue,
      currency: "PEN",
      items: cartItems.map((item) => ({
        item_id: item.id,
        item_name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
    })
  }

  // Meta Pixel
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "Purchase", {
      content_ids: cartItems.map((item) => item.id),
      contents: cartItems.map((item) => ({
        id: item.id,
        quantity: item.quantity,
      })),
      value: totalValue,
      currency: "PEN",
      num_items: cartItems.length,
    })
  }
}
