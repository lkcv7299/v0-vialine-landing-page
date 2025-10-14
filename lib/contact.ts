export const WHATSAPP_NUMBER = "51972327236"

export function buildWhatsAppUrl(message?: string) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`
  if (!message) return base
  return `${base}?text=${encodeURIComponent(message)}`
}
